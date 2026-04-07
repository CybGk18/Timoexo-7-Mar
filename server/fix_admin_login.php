<?php
/**
 * Admin Login Fix Script
 * Comprehensive script to diagnose and fix admin login issues
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>

<head>
    <title>Admin Login Fix Tool</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }

    .success {
        color: green;
    }

    .error {
        color: red;
    }

    .warning {
        color: orange;
    }

    .info {
        color: blue;
    }

    .section {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    .button {
        padding: 10px 15px;
        background: #007cba;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    .button:hover {
        background: #005a87;
    }
    </style>
</head>

<body>

    <h1>Admin Login Fix Tool</h1>
    <p class="info">This tool will diagnose and fix common admin login issues.</p>

    <?php
require_once 'db_config.php';

$fixes_applied = [];
$errors = [];

try {
    echo "<div class='section'>";
    echo "<h2>🔍 Step 1: Database Connection Test</h2>";
    
    $db = getDbConnection();
    echo "<p class='success'>✓ Database connection successful</p>";
    
    // Check environment variables
    echo "<h3>Environment Configuration:</h3>";
    echo "<ul>";
    echo "<li>DB_HOST: " . DB_HOST . "</li>";
    echo "<li>DB_NAME: " . DB_NAME . "</li>";
    echo "<li>DB_USER: " . DB_USER . "</li>";
    echo "<li>DB_PORT: " . DB_PORT . "</li>";
    echo "</ul>";
    echo "</div>";
    
    echo "<div class='section'>";
    echo "<h2>🔍 Step 2: Check admin_users Table Schema</h2>";
    
    // Check if table exists
    $stmt = $db->query("SHOW TABLES LIKE 'admin_users'");
    if ($stmt->rowCount() > 0) {
        echo "<p class='success'>✓ admin_users table exists</p>";
        
        // Check table structure
        echo "<h3>Current Table Structure:</h3>";
        $stmt = $db->query("DESCRIBE admin_users");
        $columns = $stmt->fetchAll();
        
        echo "<table>";
        echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th></tr>";
        foreach ($columns as $column) {
            echo "<tr>";
            echo "<td>" . $column['Field'] . "</td>";
            echo "<td>" . $column['Type'] . "</td>";
            echo "<td>" . $column['Null'] . "</td>";
            echo "<td>" . $column['Key'] . "</td>";
            echo "<td>" . $column['Default'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Check for required columns
        $required_columns = ['role', 'permissions', 'status', 'last_login'];
        $existing_columns = array_column($columns, 'Field');
        $missing_columns = array_diff($required_columns, $existing_columns);
        
        if (!empty($missing_columns)) {
            echo "<p class='warning'>⚠ Missing columns: " . implode(', ', $missing_columns) . "</p>";
            
            if (isset($_POST['fix_schema'])) {
                echo "<h3>Fixing Schema...</h3>";
                
                $column_definitions = [
                    'role' => "VARCHAR(50) DEFAULT 'user'",
                    'permissions' => "TEXT",
                    'status' => "VARCHAR(20) DEFAULT 'active'", 
                    'last_login' => "TIMESTAMP NULL"
                ];
                
                foreach ($missing_columns as $column) {
                    try {
                        $sql = "ALTER TABLE admin_users ADD COLUMN $column " . $column_definitions[$column];
                        $db->exec($sql);
                        echo "<p class='success'>✓ Added column: $column</p>";
                        $fixes_applied[] = "Added missing column: $column";
                    } catch (PDOException $e) {
                        echo "<p class='error'>✗ Error adding column $column: " . $e->getMessage() . "</p>";
                        $errors[] = "Failed to add column $column: " . $e->getMessage();
                    }
                }
            } else {
                echo "<form method='post'><button type='submit' name='fix_schema' class='button'>Fix Schema</button></form>";
            }
        } else {
            echo "<p class='success'>✓ All required columns exist</p>";
        }
        
    } else {
        echo "<p class='error'>✗ admin_users table does not exist</p>";
        if (isset($_POST['create_table'])) {
            echo "<h3>Creating admin_users table...</h3>";
            try {
                $sql = "
                CREATE TABLE admin_users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(100),
                    role VARCHAR(50) DEFAULT 'user',
                    permissions TEXT,
                    status VARCHAR(20) DEFAULT 'active',
                    last_login TIMESTAMP NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
                ";
                $db->exec($sql);
                echo "<p class='success'>✓ admin_users table created successfully</p>";
                $fixes_applied[] = "Created admin_users table";
            } catch (PDOException $e) {
                echo "<p class='error'>✗ Error creating table: " . $e->getMessage() . "</p>";
                $errors[] = "Failed to create admin_users table: " . $e->getMessage();
            }
        } else {
            echo "<form method='post'><button type='submit' name='create_table' class='button'>Create Table</button></form>";
        }
    }
    echo "</div>";
    
    echo "<div class='section'>";
    echo "<h2>🔍 Step 3: Check Admin Users</h2>";
    
    try {
        $stmt = $db->query("SELECT * FROM admin_users");
        $users = $stmt->fetchAll();
        
        if (count($users) > 0) {
            echo "<p class='success'>✓ Found " . count($users) . " admin user(s)</p>";
            
            echo "<table>";
            echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr>";
            foreach ($users as $user) {
                $status_class = $user['status'] === 'disabled' ? 'error' : 'success';
                echo "<tr>";
                echo "<td>" . $user['id'] . "</td>";
                echo "<td>" . htmlspecialchars($user['username']) . "</td>";
                echo "<td>" . htmlspecialchars($user['email'] ?? 'N/A') . "</td>";
                echo "<td>" . htmlspecialchars($user['role'] ?? 'user') . "</td>";
                echo "<td class='$status_class'>" . htmlspecialchars($user['status'] ?? 'active') . "</td>";
                echo "<td>" . htmlspecialchars($user['last_login'] ?? 'Never') . "</td>";
                echo "<td>";
                if ($user['status'] === 'disabled') {
                    echo "<form method='post' style='display: inline;'>";
                    echo "<input type='hidden' name='user_id' value='" . $user['id'] . "'>";
                    echo "<button type='submit' name='enable_user' class='button'>Enable</button>";
                    echo "</form>";
                }
                echo "</td>";
                echo "</tr>";
            }
            echo "</table>";
            
            // Handle user enabling
            if (isset($_POST['enable_user'])) {
                $user_id = $_POST['user_id'];
                $stmt = $db->prepare("UPDATE admin_users SET status = 'active' WHERE id = ?");
                $stmt->execute([$user_id]);
                echo "<p class='success'>✓ User enabled successfully</p>";
                $fixes_applied[] = "Enabled user ID: $user_id";
                echo "<script>location.reload();</script>";
            }
            
        } else {
            echo "<p class='warning'>⚠ No admin users found</p>";
            
            if (isset($_POST['create_admin'])) {
                $username = $_POST['username'];
                $email = $_POST['email'];
                $password = $_POST['password'];
                
                if (!empty($username) && !empty($email) && !empty($password)) {
                    try {
                        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                        $permissions = json_encode([
                            'blogs' => ['create', 'read', 'update', 'delete'],
                            'users' => ['create', 'read', 'update', 'delete'],
                            'comments' => ['create', 'read', 'update', 'delete'],
                            'media' => ['create', 'read', 'update', 'delete'],
                            'settings' => ['read', 'update']
                        ]);
                        
                        $stmt = $db->prepare("
                            INSERT INTO admin_users (username, email, password, role, permissions, status, created_at) 
                            VALUES (?, ?, ?, 'super_admin', ?, 'active', NOW())
                        ");
                        $stmt->execute([$username, $email, $hashedPassword, $permissions]);
                        
                        echo "<p class='success'>✓ Admin user created successfully!</p>";
                        echo "<p><strong>Username:</strong> " . htmlspecialchars($username) . "</p>";
                        echo "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
                        $fixes_applied[] = "Created admin user: $username";
                        
                    } catch (PDOException $e) {
                        echo "<p class='error'>✗ Error creating admin user: " . $e->getMessage() . "</p>";
                        $errors[] = "Failed to create admin user: " . $e->getMessage();
                    }
                } else {
                    echo "<p class='error'>✗ All fields are required</p>";
                }
            } else {
                echo "<h3>Create Admin User:</h3>";
                echo "<form method='post'>";
                echo "<p><label>Username: <input type='text' name='username' required></label></p>";
                echo "<p><label>Email: <input type='email' name='email' required></label></p>";
                echo "<p><label>Password: <input type='password' name='password' required></label></p>";
                echo "<p><button type='submit' name='create_admin' class='button'>Create Admin User</button></p>";
                echo "</form>";
            }
        }
    } catch (PDOException $e) {
        echo "<p class='error'>✗ Error checking admin users: " . $e->getMessage() . "</p>";
    }
    echo "</div>";
    
    echo "<div class='section'>";
    echo "<h2>🔑 Step 4: Forgot Password (Super Admin Only)</h2>";
    
    if (isset($_POST['forgot_password'])) {
        try {
            // Check if super admin exists
            $stmt = $db->prepare("SELECT id, username, email, password FROM admin_users WHERE role = 'super_admin' AND email = 'info@imoexo.com' LIMIT 1");
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
                    echo "<p class='success'>✓ Temporary password sent to info@imoexo.com</p>";
                    echo "<p class='info'>Check your email for the new temporary password. Please change it after logging in.</p>";
                    $fixes_applied[] = "Password reset email sent to info@imoexo.com";
                } else {
                    echo "<p class='error'>✗ Failed to send email. Password was updated in database.</p>";
                    echo "<p class='warning'>Temporary Password: <strong>$tempPassword</strong></p>";
                    echo "<p class='info'>Please save this password and change it after logging in.</p>";
                    $fixes_applied[] = "Password reset manually (email failed)";
                }
            } else {
                echo "<p class='error'>✗ Super admin with email info@imoexo.com not found</p>";
                echo "<p class='info'>Create a super admin user first with the email info@imoexo.com</p>";
            }
        } catch (Exception $e) {
            echo "<p class='error'>✗ Error resetting password: " . $e->getMessage() . "</p>";
            $errors[] = "Password reset failed: " . $e->getMessage();
        }
    } else {
        echo "<p class='info'>Reset password for super admin (info@imoexo.com only)</p>";
        echo "<form method='post'>";
        echo "<p><strong>Warning:</strong> This will generate a new temporary password and send it to info@imoexo.com</p>";
        echo "<p><button type='submit' name='forgot_password' class='button' onclick='return confirm(\"Are you sure you want to reset the super admin password?\")'>Reset Super Admin Password</button></p>";
        echo "</form>";
    }
    echo "</div>";
    
    echo "<div class='section'>";
    echo "<h2>🔍 Step 5: Test Authentication Endpoint</h2>";
    
    if (isset($_POST['test_login'])) {
        $test_username = $_POST['test_username'];
        $test_password = $_POST['test_password'];
        
        echo "<h3>Testing login for: " . htmlspecialchars($test_username) . "</h3>";
        
        // Simulate the auth request
        $postData = json_encode(['username' => $test_username, 'password' => $test_password]);
        
        // Test the actual auth endpoint
        $url = 'https://t-imoexo.com/server/auth-admin.php?action=login';
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($postData)
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        echo "<p><strong>HTTP Status Code:</strong> $httpCode</p>";
        echo "<p><strong>Response:</strong></p>";
        echo "<pre>" . htmlspecialchars($response) . "</pre>";
        
        if ($httpCode == 200) {
            $jsonResponse = json_decode($response, true);
            if ($jsonResponse && isset($jsonResponse['success']) && $jsonResponse['success']) {
                echo "<p class='success'>✓ Authentication test successful!</p>";
            } else {
                echo "<p class='error'>✗ Authentication failed: " . ($jsonResponse['message'] ?? 'Unknown error') . "</p>";
            }
        } else {
            echo "<p class='error'>✗ HTTP Error $httpCode - Authentication endpoint not responding correctly</p>";
        }
    } else {
        echo "<form method='post'>";
        echo "<p><label>Test Username: <input type='text' name='test_username' placeholder='admin'></label></p>";
        echo "<p><label>Test Password: <input type='password' name='test_password' placeholder='password'></label></p>";
        echo "<p><button type='submit' name='test_login' class='button'>Test Login</button></p>";
        echo "</form>";
    }
    echo "</div>";
    
} catch (Exception $e) {
    echo "<div class='section'>";
    echo "<p class='error'>✗ Critical Error: " . $e->getMessage() . "</p>";
    echo "</div>";
}

// Summary
echo "<div class='section'>";
echo "<h2>📋 Summary</h2>";
if (!empty($fixes_applied)) {
    echo "<h3 class='success'>Fixes Applied:</h3>";
    echo "<ul>";
    foreach ($fixes_applied as $fix) {
        echo "<li class='success'>✓ $fix</li>";
    }
    echo "</ul>";
}

if (!empty($errors)) {
    echo "<h3 class='error'>Errors Encountered:</h3>";
    echo "<ul>";
    foreach ($errors as $error) {
        echo "<li class='error'>✗ $error</li>";
    }
    echo "</ul>";
}

echo "<p><strong>Next Steps:</strong></p>";
echo "<ol>";
echo "<li>Test the admin login at: <a href='https://t-imoexo.com/admin' target='_blank'>https://t-imoexo.com/admin</a></li>";
echo "<li>Check browser developer console for any remaining errors</li>";
echo "<li>If issues persist, check server error logs</li>";
echo "</ol>";
echo "</div>";
?>

</body>

</html>