<?php
/**
 * Database Connection Test Script
 * This script tests the database connection and helps diagnose issues
 */

echo "<h1>Database Connection Test</h1>";
echo "<hr>";

// Display environment variables (without showing actual passwords)
echo "<h2>1. Environment Variables Check:</h2>";
$db_host = getenv('DB_HOST');
$db_port = getenv('DB_PORT');
$db_name = getenv('DB_NAME');
$db_user = getenv('DB_USER');
$db_pass = getenv('DB_PASSWORD');

echo "DB_HOST: " . ($db_host ? "✓ Set ($db_host)" : "✗ Not set") . "<br>";
echo "DB_PORT: " . ($db_port ? "✓ Set ($db_port)" : "✗ Not set") . "<br>";
echo "DB_NAME: " . ($db_name ? "✓ Set ($db_name)" : "✗ Not set") . "<br>";
echo "DB_USER: " . ($db_user ? "✓ Set ($db_user)" : "✗ Not set") . "<br>";
echo "DB_PASSWORD: " . ($db_pass ? "✓ Set (***hidden***)" : "✗ Not set") . "<br>";

echo "<hr>";
echo "<h2>2. Connection Test:</h2>";

require_once 'db_config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    echo "Attempting to connect to database...<br>";
    echo "DSN: mysql:host=" . DB_HOST . ":". DB_PORT . "/". DB_NAME . "<br>";
    
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    echo "<br><strong style='color: green;'>✓ SUCCESS!</strong> Database connection established!<br>";
    
    // Test query
    echo "<br><h2>3. Database Tables Check:</h2>";
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    if (count($tables) > 0) {
        echo "Found " . count($tables) . " tables:<br><ul>";
        foreach ($tables as $table) {
            echo "<li>$table</li>";
        }
        echo "</ul>";
    } else {
        echo "<p style='color: orange;'>No tables found in database. You may need to import your database schema.</p>";
    }
    
    echo "<br><h2>4. Blog Posts Check:</h2>";
    try {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM blog_posts");
        $result = $stmt->fetch();
        echo "Total blog posts: " . $result['count'] . "<br>";
        
        if ($result['count'] > 0) {
            $stmt = $pdo->query("SELECT id, title, status, created_at FROM blog_posts LIMIT 5");
            $posts = $stmt->fetchAll();
            echo "<br>Recent posts:<br><ul>";
            foreach ($posts as $post) {
                echo "<li>[{$post['status']}] {$post['title']} (ID: {$post['id']})</li>";
            }
            echo "</ul>";
        }
    } catch (PDOException $e) {
        echo "<p style='color: orange;'>blog_posts table not found. You may need to import your database schema.</p>";
    }
    
} catch (PDOException $e) {
    echo "<br><strong style='color: red;'>✗ FAILED!</strong> Database connection failed!<br>";
    echo "<br><strong>Error:</strong> " . $e->getMessage() . "<br>";
    
    echo "<br><h2>Common Solutions:</h2>";
    echo "<ul>";
    echo "<li><strong>If error is 'Access denied':</strong><br>";
    echo "   - Check cPanel → Remote MySQL® and add this IP: <strong>34.83.84.228</strong> (or use % for all IPs)<br>";
    echo "   - Verify your database credentials are correct</li>";
    echo "<li><strong>If error is 'Unknown database':</strong><br>";
    echo "   - Verify the database name is correct in your Replit Secrets</li>";
    echo "<li><strong>If error is 'Can't connect to MySQL server':</strong><br>";
    echo "   - Check if the host IP/domain is correct<br>";
    echo "   - Verify port 3306 is accessible</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<p><em>Run this script from: /server/test-db-connection.php</em></p>";
?>