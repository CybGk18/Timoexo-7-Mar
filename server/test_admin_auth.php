<?php
/**
 * Admin Authentication Test Script
 * Tests the admin authentication system and verifies admin users
 */

header('Content-Type: text/html; charset=UTF-8');
echo "<h1>Admin Authentication Test</h1>";
echo "<hr>";

// Test 1: Database Connection
echo "<h2>1. Database Connection Test</h2>";
require_once 'db_config.php';

try {
    $db = getDbConnection();
    echo "<p style='color: green;'>✓ Database connection successful</p>";
    
    // Test 2: Check admin_users table exists
    echo "<h2>2. Admin Users Table Check</h2>";
    $stmt = $db->query("SHOW TABLES LIKE 'admin_users'");
    if ($stmt->rowCount() > 0) {
        echo "<p style='color: green;'>✓ admin_users table exists</p>";
        
        // Test 3: List admin users
        echo "<h2>3. Admin Users List</h2>";
        $stmt = $db->query("SELECT id, username, email, role, status, created_at, last_login FROM admin_users");
        $users = $stmt->fetchAll();
        
        if (count($users) > 0) {
            echo "<p style='color: green;'>✓ Found " . count($users) . " admin user(s)</p>";
            echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
            echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th>Last Login</th></tr>";
            foreach ($users as $user) {
                $status_color = $user['status'] === 'disabled' ? 'red' : 'green';
                echo "<tr>";
                echo "<td>" . htmlspecialchars($user['id']) . "</td>";
                echo "<td>" . htmlspecialchars($user['username']) . "</td>";
                echo "<td>" . htmlspecialchars($user['email'] ?? 'N/A') . "</td>";
                echo "<td>" . htmlspecialchars($user['role'] ?? 'user') . "</td>";
                echo "<td style='color: $status_color;'>" . htmlspecialchars($user['status'] ?? 'active') . "</td>";
                echo "<td>" . htmlspecialchars($user['created_at'] ?? 'N/A') . "</td>";
                echo "<td>" . htmlspecialchars($user['last_login'] ?? 'Never') . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p style='color: orange;'>⚠ No admin users found in database</p>";
            echo "<p>You may need to create an admin user first.</p>";
        }
        
        // Test 4: Test sample authentication
        if (count($users) > 0) {
            echo "<h2>4. Authentication Test Form</h2>";
            echo "<form method='post'>";
            echo "<p><label>Username: <input type='text' name='test_username' placeholder='Enter username'></label></p>";
            echo "<p><label>Password: <input type='password' name='test_password' placeholder='Enter password'></label></p>";
            echo "<p><input type='submit' name='test_auth' value='Test Authentication'></p>";
            echo "</form>";
            
            if (isset($_POST['test_auth'])) {
                echo "<h3>Authentication Test Result:</h3>";
                $username = $_POST['test_username'];
                $password = $_POST['test_password'];
                
                if (!empty($username) && !empty($password)) {
                    $stmt = $db->prepare("SELECT id, username, password, status FROM admin_users WHERE username = ? LIMIT 1");
                    $stmt->execute([$username]);
                    
                    if ($stmt->rowCount() > 0) {
                        $user = $stmt->fetch();
                        if ($user['status'] === 'disabled') {
                            echo "<p style='color: red;'>✗ Account is disabled</p>";
                        } elseif (password_verify($password, $user['password'])) {
                            echo "<p style='color: green;'>✓ Authentication successful for user: " . htmlspecialchars($user['username']) . "</p>";
                        } else {
                            echo "<p style='color: red;'>✗ Invalid password</p>";
                        }
                    } else {
                        echo "<p style='color: red;'>✗ User not found</p>";
                    }
                } else {
                    echo "<p style='color: red;'>✗ Please enter both username and password</p>";
                }
            }
        }
        
    } else {
        echo "<p style='color: red;'>✗ admin_users table does not exist</p>";
        echo "<p>You need to run the database setup scripts first.</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>✗ Database error: " . htmlspecialchars($e->getMessage()) . "</p>";
}

echo "<hr>";
echo "<h2>5. Create Admin User (if needed)</h2>";
echo "<p>If no admin users exist, you can create one here:</p>";
echo "<form method='post'>";
echo "<p><label>Username: <input type='text' name='create_username' placeholder='admin'></label></p>";
echo "<p><label>Email: <input type='email' name='create_email' placeholder='admin@example.com'></label></p>";
echo "<p><label>Password: <input type='password' name='create_password' placeholder='Enter password'></label></p>";
echo "<p><label>Role: <select name='create_role'><option value='super_admin'>Super Admin</option><option value='admin'>Admin</option></select></label></p>";
echo "<p><input type='submit' name='create_user' value='Create Admin User'></p>";
echo "</form>";

if (isset($_POST['create_user'])) {
    try {
        $username = trim($_POST['create_username']);
        $email = trim($_POST['create_email']);
        $password = $_POST['create_password'];
        $role = $_POST['create_role'];
        
        if (empty($username) || empty($email) || empty($password)) {
            throw new Exception("All fields are required");
        }
        
        // Check if user already exists
        $stmt = $db->prepare("SELECT id FROM admin_users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        if ($stmt->rowCount() > 0) {
            throw new Exception("User with this username or email already exists");
        }
        
        // Create user
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $permissions = json_encode([
            'blogs' => ['create', 'read', 'update', 'delete'],
            'users' => ['create', 'read', 'update', 'delete'],
            'comments' => ['create', 'read', 'update', 'delete'],
            'settings' => ['read', 'update']
        ]);
        
        $stmt = $db->prepare("
            INSERT INTO admin_users (username, email, password, role, permissions, status, created_at) 
            VALUES (?, ?, ?, ?, ?, 'active', NOW())
        ");
        $stmt->execute([$username, $email, $hashedPassword, $role, $permissions]);
        
        echo "<p style='color: green;'>✓ Admin user created successfully!</p>";
        echo "<p>Username: " . htmlspecialchars($username) . "<br>";
        echo "Email: " . htmlspecialchars($email) . "<br>";
        echo "Role: " . htmlspecialchars($role) . "</p>";
        
    } catch (Exception $e) {
        echo "<p style='color: red;'>✗ Error creating user: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
}

echo "<hr>";
echo "<p><strong>Note:</strong> After testing, you should remove or secure this file for production use.</p>";
?>