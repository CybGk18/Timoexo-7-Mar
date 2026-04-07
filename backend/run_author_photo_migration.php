<?php
/**
 * Migration Script: Add author_photo column to blog_posts table
 * Run this script once to update the database schema
 */

require_once __DIR__ . '/../server/db_config.php';

try {
    $db = getDbConnection();
    
    echo "Starting migration...\n";
    
    // Check if author_photo column already exists
    $checkQuery = "SHOW COLUMNS FROM blog_posts LIKE 'author_photo'";
    $result = $db->query($checkQuery);
    
    if ($result->rowCount() > 0) {
        echo "Column 'author_photo' already exists. Migration skipped.\n";
        exit(0);
    }
    
    // Add author_photo column
    $alterQuery = "ALTER TABLE blog_posts ADD COLUMN author_photo VARCHAR(500) AFTER author_title";
    $db->exec($alterQuery);
    echo "✓ Added 'author_photo' column to blog_posts table\n";
    
    // Add index for better performance
    $indexQuery = "CREATE INDEX idx_blog_author_photo ON blog_posts(author_photo)";
    $db->exec($indexQuery);
    echo "✓ Added index for author_photo column\n";
    
    echo "\nMigration completed successfully!\n";
    
} catch (PDOException $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
?>
