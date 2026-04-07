<?php
require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    echo "Database connection successful!\n";
    echo "Host: " . $database->host . "\n";
    echo "Database: " . $database->db_name . "\n";
    echo "User: " . $database->username . "\n";

    // Test a simple query
    $stmt = $db->query("SELECT 1 as test");
    $result = $stmt->fetch();

    if ($result) {
        echo "Database query test successful!\n";
    } else {
        echo "Database query test failed.\n";
    }
} catch (Exception $e) {
    echo "Database connection failed: " . $e->getMessage() . "\n";
}
