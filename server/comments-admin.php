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
        // Get all comments
        $query = "SELECT c.*, p.title as blog_title FROM blog_comments c 
                  LEFT JOIN blog_posts p ON c.blog_post_id = p.id 
                  ORDER BY c.created_at DESC";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $comments]);
        break;

    case 'PUT':
        // Update comment status
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Comment ID required']);
            exit();
        }

        $data = json_decode(file_get_contents("php://input"));
        $query = "UPDATE blog_comments SET status = ? WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$data->status, $_GET['id']]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Comment updated']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to update comment']);
        }
        break;

    case 'DELETE':
        // Delete comment
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Comment ID required']);
            exit();
        }

        $query = "DELETE FROM blog_comments WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$_GET['id']]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Comment deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete comment']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
