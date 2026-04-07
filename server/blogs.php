<?php
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';

// Use the database connection function from db_config.php
$db = getDbConnection();

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Get blog ID from URL if present
$blogId = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($blogId) {
            // Get specific blog post
            $stmt = $db->prepare("SELECT * FROM blog_posts WHERE id = ? AND status = 'published'");
            $stmt->execute([$blogId]);
            $blog = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($blog) {
                // Increment view count
                $updateStmt = $db->prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?");
                $updateStmt->execute([$blogId]);

                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'data' => $blog
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Blog post not found'
                ]);
            }
        } else {
            // Get all blog posts
            $status = isset($_GET['status']) ? $_GET['status'] : 'published';
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

            $stmt = $db->prepare("SELECT * FROM blog_posts WHERE status = ? ORDER BY created_at DESC LIMIT ? OFFSET ?");
            $stmt->execute([$status, $limit, $offset]);
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Get total count
            $countStmt = $db->prepare("SELECT COUNT(*) as total FROM blog_posts WHERE status = ?");
            $countStmt->execute([$status]);
            $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

            http_response_code(200);
            echo json_encode([
                'success' => true,
                'data' => $blogs,
                'total' => (int)$total,
                'limit' => $limit,
                'offset' => $offset
            ]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
        break;
}