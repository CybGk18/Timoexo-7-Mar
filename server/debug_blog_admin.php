<?php
/**
 * Blog Admin Debug Script
 * Tests blog creation with detailed error output
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Blog Admin Debug</title>
    <style>
        body { font-family: monospace; padding: 20px; background: #f5f5f5; }
        .success { color: green; font-weight: bold; }
        .error { color: red; font-weight: bold; }
        .info { color: blue; }
        .section { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border: 1px solid #ddd; }
        pre { background: #f8f8f8; padding: 10px; border-radius: 3px; overflow-x: auto; }
    </style>
</head>
<body>
    <h1>🔍 Blog Admin Debug</h1>
    
    <?php
    echo "<div class='section'>";
    echo "<h2>1. Database Connection</h2>";
    try {
        $db = getDbConnection();
        echo "<p class='success'>✓ Database connected successfully</p>";
        echo "<p class='info'>Host: " . DB_HOST . "</p>";
        echo "<p class='info'>Database: " . DB_NAME . "</p>";
    } catch (Exception $e) {
        echo "<p class='error'>✗ Database connection failed: " . $e->getMessage() . "</p>";
        exit();
    }
    echo "</div>";

    echo "<div class='section'>";
    echo "<h2>2. Check blog_posts Table</h2>";
    try {
        $stmt = $db->query("SHOW TABLES LIKE 'blog_posts'");
        if ($stmt->rowCount() > 0) {
            echo "<p class='success'>✓ blog_posts table exists</p>";
            
            // Show table structure
            $stmt = $db->query("DESCRIBE blog_posts");
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo "<p class='info'>Columns:</p>";
            echo "<pre>";
            foreach ($columns as $col) {
                echo $col['Field'] . " (" . $col['Type'] . ")\n";
            }
            echo "</pre>";
            
            // Count records
            $stmt = $db->query("SELECT COUNT(*) as count FROM blog_posts");
            $count = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            echo "<p class='info'>Total blog posts: $count</p>";
        } else {
            echo "<p class='error'>✗ blog_posts table does NOT exist!</p>";
            echo "<p class='error'>Run this SQL to create it: backend/admin_schema.sql</p>";
            exit();
        }
    } catch (Exception $e) {
        echo "<p class='error'>✗ Error checking table: " . $e->getMessage() . "</p>";
    }
    echo "</div>";

    echo "<div class='section'>";
    echo "<h2>3. Test Blog Post Creation</h2>";
    try {
        $testData = [
            'title' => 'Test Blog Post ' . date('Y-m-d H:i:s'),
            'excerpt' => 'This is a test excerpt',
            'content' => 'This is test content for debugging',
            'status' => 'draft',
            'type' => 'Blog Post',
            'author' => 'Test Author',
            'featured_image' => '',
            'slug' => 'test-blog-post-' . time(),
            'tags' => 'test,debug',
            'author_title' => 'Developer',
            'author_linkedin' => ''
        ];

        $query = "INSERT INTO blog_posts (title, excerpt, content, status, type, author, featured_image, slug, tags, author_title, author_linkedin) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $db->prepare($query);
        $result = $stmt->execute([
            $testData['title'],
            $testData['excerpt'],
            $testData['content'],
            $testData['status'],
            $testData['type'],
            $testData['author'],
            $testData['featured_image'],
            $testData['slug'],
            $testData['tags'],
            $testData['author_title'],
            $testData['author_linkedin']
        ]);

        if ($result && $stmt->rowCount() > 0) {
            $id = $db->lastInsertId();
            echo "<p class='success'>✓ Test blog post created successfully!</p>";
            echo "<p class='info'>New post ID: $id</p>";
            
            // Verify it was created
            $verifyStmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ?");
            $verifyStmt->execute([$id]);
            $post = $verifyStmt->fetch(PDO::FETCH_ASSOC);
            
            echo "<p class='info'>Created post data:</p>";
            echo "<pre>" . print_r($post, true) . "</pre>";
            
            // Clean up - delete test post
            $deleteStmt = $db->prepare("DELETE FROM blog_posts WHERE id = ?");
            $deleteStmt->execute([$id]);
            echo "<p class='info'>Test post deleted (cleanup)</p>";
        } else {
            echo "<p class='error'>✗ Failed to create test post</p>";
        }
    } catch (PDOException $e) {
        echo "<p class='error'>✗ Database error: " . $e->getMessage() . "</p>";
        echo "<pre>" . $e->getTraceAsString() . "</pre>";
    } catch (Exception $e) {
        echo "<p class='error'>✗ Error: " . $e->getMessage() . "</p>";
    }
    echo "</div>";

    echo "<div class='section'>";
    echo "<h2>4. Test Session</h2>";
    session_start();
    if (isset($_SESSION['admin_id'])) {
        echo "<p class='success'>✓ Admin session exists</p>";
        echo "<p class='info'>Admin ID: " . $_SESSION['admin_id'] . "</p>";
        echo "<p class='info'>Admin Username: " . ($_SESSION['admin_username'] ?? 'N/A') . "</p>";
    } else {
        echo "<p class='error'>✗ No admin session found</p>";
        echo "<p class='info'>Please login first at /admin/login</p>";
    }
    echo "</div>";

    echo "<div class='section'>";
    echo "<h2>5. PHP Configuration</h2>";
    echo "<p class='info'>PHP Version: " . phpversion() . "</p>";
    echo "<p class='info'>Error Reporting: " . error_reporting() . "</p>";
    echo "<p class='info'>Display Errors: " . ini_get('display_errors') . "</p>";
    echo "<p class='info'>Log Errors: " . ini_get('log_errors') . "</p>";
    echo "<p class='info'>Error Log: " . ini_get('error_log') . "</p>";
    echo "</div>";
    ?>

    <div class='section'>
        <h2>📝 Summary</h2>
        <p>If all checks pass above, your blog admin should work correctly.</p>
        <p>If you're still getting errors, check the server error logs for more details.</p>
    </div>
</body>
</html>
