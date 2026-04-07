<?php
// Quick test to check if blog_posts table exists
require_once __DIR__ . '/db_config.php';

header('Content-Type: application/json');

try {
    $db = getDbConnection();
    
    // Check if table exists
    $stmt = $db->query("SHOW TABLES LIKE 'blog_posts'");
    
    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'blog_posts table exists',
            'table_exists' => true
        ]);
        
        // Show table structure
        $stmt = $db->query("DESCRIBE blog_posts");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo "\n\nTable Structure:\n";
        print_r($columns);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'blog_posts table does NOT exist',
            'table_exists' => false,
            'action' => 'Please run backend/admin_schema.sql to create the table'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>