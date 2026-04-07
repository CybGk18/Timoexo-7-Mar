<?php
// Test database connection
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    echo json_encode([
        "success" => true,
        "message" => "Database connection successful",
        "endpoint" => "test_db_connection.php"
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed: " . $e->getMessage(),
        "endpoint" => "test_db_connection.php"
    ]);
}