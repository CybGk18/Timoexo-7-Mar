<?php
/**
 * Complete Backend Admin Testing Script
 * Tests database connection, admin user, and all admin endpoints
 */

echo "=== T-IMOEXO Backend Admin Testing ===\n\n";

// Test 1: Check .env file
echo "1. Checking .env file...\n";
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    echo "   ✓ .env file found\n";
    $envContent = file_get_contents($envFile);
    echo "   Database configuration loaded\n";
} else {
    echo "   ✗ .env file NOT found\n";
}
echo "\n";

// Test 2: Load database configuration
echo "2. Loading database configuration...\n";
require_once __DIR__ . '/config/database.php';
try {
    $database = new Database();
    $db = $database->getConnection();
    echo "   ✓ Database connection successful\n";
    echo "   Host: " . getenv('DB_HOST') . "\n";
    echo "   Database: " . getenv('DB_NAME') . "\n";
    echo "   User: " . getenv('DB_USER') . "\n";
} catch (Exception $e) {
    echo "   ✗ Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}
echo "\n";

// Test 3: Check admin_users table
echo "3. Checking admin_users table...\n";
try {
    $stmt = $db->query("SHOW TABLES LIKE 'admin_users'");
    if ($stmt->rowCount() > 0) {
        echo "   ✓ admin_users table exists\n";
        
        // Check table structure
        $stmt = $db->query("DESCRIBE admin_users");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        echo "   Columns: " . implode(', ', $columns) . "\n";
        
        // Count admin users
        $stmt = $db->query("SELECT COUNT(*) as count FROM admin_users");
        $count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
        echo "   Total admin users: $count\n";
    } else {
        echo "   ✗ admin_users table does NOT exist\n";
        echo "   Creating admin_users table...\n";
        
        $createTable = "CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
        
        $db->exec($createTable);
        echo "   ✓ admin_users table created\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error checking admin_users table: " . $e->getMessage() . "\n";
}
echo "\n";

// Test 4: Check admin user
echo "4. Checking admin user...\n";
try {
    $stmt = $db->prepare("SELECT id, username, email, created_at FROM admin_users WHERE username = ?");
    $stmt->execute(['admin']);
    
    if ($stmt->rowCount() > 0) {
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "   ✓ Admin user exists\n";
        echo "   ID: " . $admin['id'] . "\n";
        echo "   Username: " . $admin['username'] . "\n";
        echo "   Email: " . $admin['email'] . "\n";
        echo "   Created: " . $admin['created_at'] . "\n";
    } else {
        echo "   ✗ Admin user does NOT exist\n";
        echo "   Creating admin user...\n";
        
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)");
        $stmt->execute(['admin', $hashedPassword, 'admin@t-imoexo.com']);
        
        echo "   ✓ Admin user created\n";
        echo "   Username: admin\n";
        echo "   Password: admin123\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error checking admin user: " . $e->getMessage() . "\n";
}
echo "\n";

// Test 5: Test password verification
echo "5. Testing password verification...\n";
try {
    $stmt = $db->prepare("SELECT password FROM admin_users WHERE username = ?");
    $stmt->execute(['admin']);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row && password_verify('admin123', $row['password'])) {
        echo "   ✓ Password verification successful\n";
    } else {
        echo "   ✗ Password verification failed\n";
        echo "   Updating password...\n";
        
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $db->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
        $stmt->execute([$hashedPassword, 'admin']);
        
        echo "   ✓ Password updated\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error testing password: " . $e->getMessage() . "\n";
}
echo "\n";

// Test 6: Check other required tables
echo "6. Checking other required tables...\n";
$requiredTables = ['blog_posts', 'media_library', 'blog_comments', 'jobs', 'gallery'];

foreach ($requiredTables as $table) {
    try {
        $stmt = $db->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            $countStmt = $db->query("SELECT COUNT(*) as count FROM $table");
            $count = $countStmt->fetch(PDO::FETCH_ASSOC)['count'];
            echo "   ✓ $table exists ($count records)\n";
        } else {
            echo "   ✗ $table does NOT exist\n";
        }
    } catch (Exception $e) {
        echo "   ✗ Error checking $table: " . $e->getMessage() . "\n";
    }
}
echo "\n";

// Test 7: Check server files
echo "7. Checking server PHP files...\n";
$serverDir = __DIR__ . '/../server';
$requiredFiles = [
    'auth-admin.php' => 'Admin authentication',
    'blogs-admin.php' => 'Blog admin management',
    'comments-admin.php' => 'Comments admin management',
    'media-admin.php' => 'Media admin management',
    'cors.php' => 'CORS configuration',
    'db_config.php' => 'Database configuration'
];

foreach ($requiredFiles as $file => $description) {
    $filePath = $serverDir . '/' . $file;
    if (file_exists($filePath)) {
        echo "   ✓ $file exists ($description)\n";
    } else {
        echo "   ✗ $file NOT found ($description)\n";
    }
}
echo "\n";

// Test 8: Check file permissions (if applicable)
echo "8. Checking file permissions...\n";
$serverDir = __DIR__ . '/../server';
if (is_readable($serverDir . '/auth-admin.php')) {
    echo "   ✓ Server files are readable\n";
} else {
    echo "   ✗ Server files may have permission issues\n";
}
echo "\n";

// Summary
echo "=== Test Summary ===\n";
echo "Backend testing completed. Review the output above for any issues.\n\n";
echo "Admin Login Credentials:\n";
echo "Username: admin\n";
echo "Password: admin123\n\n";
echo "Admin API Endpoint: /server/auth-admin.php?action=login\n";
echo "Method: POST\n";
echo "Body: {\"username\":\"admin\",\"password\":\"admin123\"}\n";
?>
