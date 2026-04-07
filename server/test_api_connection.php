<?php
// Test API connection
require_once 'db_config.php';

header('Content-Type: application/json');

try {
    // Test database connection
    $pdo = getDbConnection();

    // Test a simple query
    $stmt = $pdo->query("SELECT 1 as test");
    $result = $stmt->fetch();

    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'API connection successful!',
            'database' => 'Connected',
            'test' => $result['test']
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Database query failed'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'API connection failed: ' . $e->getMessage()
    ]);
}
