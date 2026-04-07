<?php
/**
 * Admin Login Diagnostic Tool
 * Run this at: https://t-imoexo.com/server/diagnose_login.php
 * This will help identify why login is failing
 */

header('Content-Type: text/html; charset=UTF-8');
echo "<h1>T-Imoexo Admin Login Diagnostic</h1>";
echo "<style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .success { color: green; } .error { color: red; } .warning { color: orange; } .info { color: blue; }
    .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    .button { padding: 10px 15px; background: #007cba; color: white; border: none; border-radius: 3px; cursor: pointer; }
    pre { background: #f5f5f5; padding: 10px; border-radius: 3px; overflow-x: auto; }
</style>";

echo "<div class='section'>";
echo "<h2>🔍 1. File Structure Check</h2>";

$required_files = [
    'auth-admin.php',
    'db_config.php', 
    'cors.php'
];

foreach ($required_files as $file) {
    if (file_exists(__DIR__ . '/' . $file)) {
        echo "<p class='success'>✓ $file exists</p>";
    } else {
        echo "<p class='error'>✗ $file missing</p>";
    }
}
echo "</div>";

echo "<div class='section'>";
echo "<h2>🔍 2. Database Connection Test</h2>";

try {
    require_once 'db_config.php';
    $db = getDbConnection();
    echo "<p class='success'>✓ Database connection successful</p>";
    
    // Check if admin_users table exists
    $stmt = $db->query("SHOW TABLES LIKE 'admin_users'");
    if ($stmt->rowCount() > 0) {
        echo "<p class='success'>✓ admin_users table exists</p>";
        
        // Check table structure
        echo "<h3>Table Structure:</h3>";
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
            echo "<td>" . ($column['Default'] ?? 'NULL') . "</td>";
            echo "</tr>";
        }
        echo "</table>";
        
        // Check required columns
        $required_cols = ['role', 'permissions', 'status', 'last_login'];
        $existing_cols = array_column($columns, 'Field');
        $missing_cols = array_diff($required_cols, $existing_cols);
        
        if (empty($missing_cols)) {
            echo "<p class='success'>✓ All required columns exist</p>";
        } else {
            echo "<p class='error'>✗ Missing columns: " . implode(', ', $missing_cols) . "</p>";
            echo "<p class='info'>Run the complete_admin_setup.sql script to fix this.</p>";
        }
        
        // Check admin users
        echo "<h3>Admin Users:</h3>";
        $stmt = $db->query("SELECT id, username, email, role, status, created_at FROM admin_users");
        $users = $stmt->fetchAll();
        
        if (count($users) > 0) {
            echo "<table>";
            echo "<tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th></tr>";
            foreach ($users as $user) {
                echo "<tr>";
                echo "<td>" . $user['id'] . "</td>";
                echo "<td>" . $user['username'] . "</td>";
                echo "<td>" . ($user['email'] ?? 'NULL') . "</td>";
                echo "<td>" . ($user['role'] ?? 'NULL') . "</td>";
                echo "<td>" . ($user['status'] ?? 'NULL') . "</td>";
                echo "<td>" . ($user['created_at'] ?? 'NULL') . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p class='error'>✗ No admin users found</p>";
            echo "<p class='info'>You need to run the complete_admin_setup.sql script.</p>";
        }
        
    } else {
        echo "<p class='error'>✗ admin_users table does not exist</p>";
        echo "<p class='info'>Run the complete_admin_setup.sql script to create the table.</p>";
    }
    
} catch (Exception $e) {
    echo "<p class='error'>✗ Database error: " . $e->getMessage() . "</p>";
}
echo "</div>";

echo "<div class='section'>";
echo "<h2>🔍 3. Authentication Endpoint Test</h2>";

if (isset($_POST['test_auth'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    echo "<h3>Testing authentication for: " . htmlspecialchars($username) . "</h3>";
    
    // Test the auth endpoint directly
    $postData = json_encode(['username' => $username, 'password' => $password]);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://t-imoexo.com/server/auth-admin.php?action=login');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($postData)
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For testing
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    echo "<p><strong>HTTP Status:</strong> $httpCode</p>";
    if ($curlError) {
        echo "<p class='error'><strong>CURL Error:</strong> $curlError</p>";
    }
    echo "<p><strong>Response:</strong></p>";
    echo "<pre>" . htmlspecialchars($response) . "</pre>";
    
    // Try to decode JSON
    $jsonResponse = json_decode($response, true);
    if ($jsonResponse) {
        echo "<h4>Parsed Response:</h4>";
        echo "<pre>" . print_r($jsonResponse, true) . "</pre>";
    } else {
        echo "<p class='error'>Response is not valid JSON</p>";
    }
}

echo "<form method='post'>";
echo "<h3>Test Authentication:</h3>";
echo "<p><label>Username: <input type='text' name='username' value='admin' required></label></p>";
echo "<p><label>Password: <input type='password' name='password' value='admin123' required></label></p>";
echo "<p><button type='submit' name='test_auth' class='button'>Test Authentication</button></p>";
echo "</form>";

echo "</div>";

echo "<div class='section'>";
echo "<h2>🔍 4. Environment Check</h2>";
echo "<p><strong>Server:</strong> " . $_SERVER['SERVER_NAME'] . "</p>";
echo "<p><strong>PHP Version:</strong> " . PHP_VERSION . "</p>";
echo "<p><strong>Current URL:</strong> " . (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'] . "</p>";

// Check database configuration
if (defined('DB_HOST')) {
    echo "<p><strong>DB Host:</strong> " . DB_HOST . "</p>";
    echo "<p><strong>DB Name:</strong> " . DB_NAME . "</p>";
    echo "<p><strong>DB User:</strong> " . DB_USER . "</p>";
} else {
    echo "<p class='error'>Database configuration not loaded</p>";
}

echo "</div>";

echo "<div class='section'>";
echo "<h2>📋 Next Steps</h2>";
echo "<ol>";
echo "<li>If admin_users table is missing columns, run: <strong>complete_admin_setup.sql</strong></li>";
echo "<li>If no admin users exist, the setup script will create one</li>";
echo "<li>Test the authentication above with username: <strong>admin</strong> and password: <strong>admin123</strong></li>";
echo "<li>If still having issues, check server error logs</li>";
echo "</ol>";

echo "<p><strong>Admin Credentials:</strong><br>";
echo "Username: admin<br>";
echo "Password: admin123<br>";
echo "Email: info@imoexo.com</p>";

echo "</div>";
?>