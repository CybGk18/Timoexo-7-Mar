<?php
header('Content-Type: application/json');

require_once __DIR__ . '/db_config.php';

try {
    $pdo = getDbConnection();
    
    // Check if blog_comments table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'blog_comments'");
    $tableExists = $stmt->rowCount() > 0;
    
    $result = [
        'table_exists' => $tableExists
    ];
    
    if ($tableExists) {
        // Get table structure
        $stmt = $pdo->query("DESCRIBE blog_comments");
        $result['columns'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get row count
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM blog_comments");
        $result['row_count'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        // Get sample data
        $stmt = $pdo->query("SELECT * FROM blog_comments LIMIT 3");
        $result['sample_data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $result['message'] = 'Table blog_comments does not exist. You need to create it.';
        $result['create_table_sql'] = "
            CREATE TABLE blog_comments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                blog_post_id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                comment TEXT NOT NULL,
                status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
                INDEX idx_blog_post_id (blog_post_id),
                INDEX idx_status (status)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ";
    }
    
    echo json_encode($result, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
