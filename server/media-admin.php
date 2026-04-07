<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';

// Use the database connection function from db_config.php
$db = getDbConnection();

session_start();

// Check authentication
if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all media
        $query = "SELECT * FROM media_library ORDER BY uploaded_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $media = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $media]);
        break;

    case 'POST':
        // Handle file upload
        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES['file'];
            $fileName = isset($_POST['name']) ? $_POST['name'] : pathinfo($file['name'], PATHINFO_FILENAME);
            
            // Validate file type (allow images only)
            $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!in_array($file['type'], $allowedTypes)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid file type. Only images are allowed.']);
                exit();
            }

            // Validate file size (max 5MB)
            if ($file['size'] > 5 * 1024 * 1024) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'File size exceeds 5MB limit.']);
                exit();
            }

            // Create uploads directory if it doesn't exist
            $uploadDir = __DIR__ . '/uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            // Generate unique filename
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $uniqueFileName = $fileName . '_' . time() . '.' . $extension;
            $uploadPath = $uploadDir . $uniqueFileName;

            // Move uploaded file
            if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
                // Get the base URL for the uploaded file
                $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $fileUrl = $protocol . "://" . $host . "/server/uploads/" . $uniqueFileName;

                // Save to database
                $query = "INSERT INTO media_library (name, url, file_type, file_size) VALUES (?, ?, ?, ?)";
                $stmt = $db->prepare($query);
                $fileSize = round($file['size'] / 1024, 2) . ' KB';
                
                $stmt->execute([$fileName, $fileUrl, $extension, $fileSize]);

                if ($stmt->rowCount() > 0) {
                    $id = $db->lastInsertId();
                    echo json_encode([
                        'success' => true, 
                        'message' => 'File uploaded successfully',
                        'data' => [
                            'id' => $id,
                            'url' => $fileUrl,
                            'name' => $fileName,
                            'type' => $extension,
                            'size' => $fileSize
                        ]
                    ]);
                } else {
                    // Delete uploaded file if database insert fails
                    unlink($uploadPath);
                    http_response_code(500);
                    echo json_encode(['success' => false, 'message' => 'Failed to save file info to database']);
                }
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
            }
        } 
        // Handle URL-based media (legacy support)
        else {
            $data = json_decode(file_get_contents("php://input"));

            if (isset($data->url) && isset($data->name)) {
                $query = "INSERT INTO media_library (name, url, file_type, file_size) VALUES (?, ?, ?, ?)";
                $stmt = $db->prepare($query);

                // Determine file type from URL
                $fileType = '';
                $pathInfo = pathinfo($data->url);
                if (isset($pathInfo['extension'])) {
                    $fileType = $pathInfo['extension'];
                }

                $stmt->execute([$data->name, $data->url, $fileType, '']);

                if ($stmt->rowCount() > 0) {
                    $id = $db->lastInsertId();
                    echo json_encode(['success' => true, 'message' => 'Media added', 'id' => $id]);
                } else {
                    http_response_code(500);
                    echo json_encode(['success' => false, 'message' => 'Failed to add media']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Either file upload or URL and name required']);
            }
        }
        break;

    case 'DELETE':
        // Delete media
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Media ID required']);
            exit();
        }

        $query = "DELETE FROM media_library WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$_GET['id']]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Media deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete media']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}