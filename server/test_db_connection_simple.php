<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    echo "Database connection successful!\n";
    echo "Host: " . DB_HOST . "\n";
    echo "Database: " . DB_NAME . "\n";
    echo "User: " . DB_USER . "\n";

    // Test a simple query
    $stmt = $pdo->query("SELECT VERSION() as version");
    $result = $stmt->fetch();

    if ($result) {
        echo "MySQL Version: " . $result['version'] . "\n";
    }

    echo "Database test completed successfully!\n";
} catch (Exception $e) {
    echo "Database connection failed: " . $e->getMessage() . "\n";
}
