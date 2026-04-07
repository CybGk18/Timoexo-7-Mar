<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';

// Use the database connection function from db_config.php
$db = getDbConnection();

$data = json_decode(file_get_contents("php://input"));
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'login') {
    if (!empty($data->username) && !empty($data->password)) {
        $query = "SELECT id, username, password, email FROM admin_users WHERE username = ? LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->execute([$data->username]);

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (password_verify($data->password, $row['password'])) {
                // Start session and create token
                session_start();
                $_SESSION['admin_id'] = $row['id'];
                $_SESSION['admin_username'] = $row['username'];

                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'user' => [
                        'id' => $row['id'],
                        'username' => $row['username'],
                        'email' => $row['email']
                    ]
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ]);
            }
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'User not found'
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Username and password required'
        ]);
    }
} elseif ($action === 'logout') {
    session_start();
    session_destroy();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Logout successful'
    ]);
} elseif ($action === 'check') {
    session_start();

    if (isset($_SESSION['admin_id'])) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'user' => [
                'id' => $_SESSION['admin_id'],
                'username' => $_SESSION['admin_username']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'authenticated' => false
        ]);
    }
} elseif ($action === 'get-profile') {
    session_start();

    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Not authenticated'
        ]);
        exit;
    }

    // Fetch full admin profile from database
    $query = "SELECT id, username, email FROM admin_users WHERE id = ? LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->execute([$_SESSION['admin_id']]);

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email']
            ]
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
} elseif ($action === 'change-password') {
    session_start();

    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Not authenticated'
        ]);
        exit;
    }

    if (empty($data->currentPassword) || empty($data->newPassword)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Current password and new password are required'
        ]);
        exit;
    }

    // Get current user
    $query = "SELECT id, password FROM admin_users WHERE id = ? LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->execute([$_SESSION['admin_id']]);

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verify current password
        if (password_verify($data->currentPassword, $row['password'])) {
            // Hash new password
            $hashedPassword = password_hash($data->newPassword, PASSWORD_DEFAULT);

            // Update password
            $updateQuery = "UPDATE admin_users SET password = ? WHERE id = ?";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->execute([$hashedPassword, $_SESSION['admin_id']]);

            if ($updateStmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Password updated successfully'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to update password'
                ]);
            }
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'message' => 'Current password is incorrect'
            ]);
        }
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'User not found'
        ]);
    }
} elseif ($action === 'update-profile') {
    session_start();

    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Not authenticated'
        ]);
        exit;
    }

    if (empty($data->username) || empty($data->email)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Username and email are required'
        ]);
        exit;
    }

    // Validate email format
    if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format'
        ]);
        exit;
    }

    // Check if username is already taken by another user
    $checkQuery = "SELECT id FROM admin_users WHERE username = ? AND id != ? LIMIT 1";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->execute([$data->username, $_SESSION['admin_id']]);

    if ($checkStmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Username already taken'
        ]);
        exit;
    }

    // Update profile
    $updateQuery = "UPDATE admin_users SET username = ?, email = ? WHERE id = ?";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->execute([$data->username, $data->email, $_SESSION['admin_id']]);

    if ($updateStmt->rowCount() > 0 || $updateStmt->rowCount() === 0) {
        // Get old username for email notification
        $oldUsername = $_SESSION['admin_username'];
        
        // Update session username
        $_SESSION['admin_username'] = $data->username;

        // Send email notification
        require_once __DIR__ . '/email_notifications.php';
        
        $emailDetails = [
            'previous_username' => $oldUsername,
            'new_username' => $data->username,
            'new_email' => $data->email,
            'updated_at' => date('F j, Y, g:i a')
        ];
        
        $adminInfo = [
            'email' => $data->email,
            'name' => $data->username,
            'role' => 'Admin'
        ];
        
        sendAdminProfileUpdateEmail($emailDetails, $adminInfo);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => [
                'username' => $data->username,
                'email' => $data->email
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to update profile'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid action'
    ]);
}
