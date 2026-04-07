<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors in output
ini_set('log_errors', 1); // Log errors instead

// Start output buffering to prevent any unwanted output
ob_start();

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';

// Clear any previous output
ob_clean();

session_start();

// Get input data and action
$input = file_get_contents("php://input");
$data = json_decode($input);
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Initialize database connection with error handling
try {
    $db = getDbConnection();
    if (!$db) {
        throw new Exception("Database connection failed");
    }
} catch (Exception $e) {
    error_log("Database error in auth-admin.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database connection error'
    ]);
    exit;
}

if ($action === 'login') {
    try {
        // Validate input data
        if (!$data || !is_object($data)) {
            throw new Exception("Invalid JSON input");
        }

        if (empty($data->username) || empty($data->password)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Username and password required'
            ]);
            exit;
        }

        // Prepare and execute query
        $query = "SELECT id, username, password, email, role, permissions, status FROM admin_users WHERE username = ? LIMIT 1";
        $stmt = $db->prepare($query);
        if (!$stmt) {
            throw new Exception("Failed to prepare statement");
        }
        
        $stmt->execute([$data->username]);

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Check if account is active
            if (isset($row['status']) && $row['status'] === 'disabled') {
                http_response_code(403);
                echo json_encode([
                    'success' => false,
                    'message' => 'Your account has been disabled. Please contact administrator.'
                ]);
                exit;
            }

            // Verify password
            if (password_verify($data->password, $row['password'])) {
                // Parse permissions safely
                $permissions = null;
                if (!empty($row['permissions'])) {
                    $permissions = json_decode($row['permissions'], true);
                    if (json_last_error() !== JSON_ERROR_NONE) {
                        $permissions = null; // Fallback if JSON is invalid
                    }
                }
                
                // Start session and store user info
                $_SESSION['admin_id'] = $row['id'];
                $_SESSION['admin_username'] = $row['username'];
                $_SESSION['admin_email'] = $row['email'];
                $_SESSION['admin_role'] = $row['role'] ?? 'user';
                $_SESSION['admin_permissions'] = $permissions;
                
                // Update last_login safely
                try {
                    $updateStmt = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
                    $updateStmt->execute([$row['id']]);
                } catch (Exception $e) {
                    // Log but don't fail login for this
                    error_log("Failed to update last_login: " . $e->getMessage());
                }

                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'user' => [
                        'id' => $row['id'],
                        'username' => $row['username'],
                        'email' => $row['email'],
                        'role' => $row['role'] ?? 'user',
                        'permissions' => $permissions
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
    } catch (Exception $e) {
        error_log("Login error in auth-admin.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Internal server error'
        ]);
    }
} elseif ($action === 'logout') {
    try {
        session_destroy();
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Logout successful'
        ]);
    } catch (Exception $e) {
        error_log("Logout error in auth-admin.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Internal server error'
        ]);
    }
} elseif ($action === 'check') {
    try {
        if (isset($_SESSION['admin_id'])) {
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'authenticated' => true,
                'user' => [
                    'id' => $_SESSION['admin_id'],
                    'username' => $_SESSION['admin_username'],
                    'email' => $_SESSION['admin_email'] ?? null,
                    'role' => $_SESSION['admin_role'] ?? 'user',
                    'permissions' => $_SESSION['admin_permissions'] ?? null
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                'success' => false,
                'authenticated' => false
            ]);
        }
    } catch (Exception $e) {
        error_log("Check auth error in auth-admin.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Internal server error'
        ]);
    }
} elseif ($action === 'forgot-password') {
    try {
        // Only allow for super admin with specific email
        $stmt = $db->prepare("SELECT id, username, email FROM admin_users WHERE role = 'super_admin' AND email = 'info@imoexo.com' AND status = 'active' LIMIT 1");
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $admin = $stmt->fetch();
            
            // Generate a temporary password
            $tempPassword = 'TempAdmin' . rand(1000, 9999);
            $hashedTempPassword = password_hash($tempPassword, PASSWORD_DEFAULT);
            
            // Update password in database
            $updateStmt = $db->prepare("UPDATE admin_users SET password = ? WHERE id = ?");
            $updateStmt->execute([$hashedTempPassword, $admin['id']]);
            
            // Send email with temporary password
            $to = 'info@imoexo.com';
            $subject = 'T-Imoexo Admin - Password Reset';
            $message = "
Hello Super Admin,

Your admin password has been reset. Here are your new login credentials:

Username: {$admin['username']}
Temporary Password: {$tempPassword}

Please log in with these credentials and change your password immediately for security.

Login URL: https://t-imoexo.com/admin

Best regards,
T-Imoexo System
            ";
            
            $headers = "From: noreply@t-imoexo.com\r\n";
            $headers .= "Reply-To: info@imoexo.com\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            
            if (mail($to, $subject, $message, $headers)) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Temporary password sent to your email address'
                ]);
            } else {
                // Log the temporary password for manual retrieval if email fails
                error_log("Temporary password for super admin: $tempPassword");
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Password reset completed. Check with system administrator if you don\'t receive the email.'
                ]);
            }
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Super admin account not found or not active'
            ]);
        }
    } catch (Exception $e) {
        error_log("Forgot password error in auth-admin.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Internal server error'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid action'
    ]);
}

// Clean any remaining output buffer
ob_end_flush();
