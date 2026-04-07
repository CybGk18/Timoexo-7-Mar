<?php
/**
 * Public Blog Posts API
 * Returns published blog posts for the Resources page
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    
    // Check if requesting a single blog post by slug or id
    if (isset($_GET['slug'])) {
        // Fetch single post by slug
        $query = "SELECT 
                    id,
                    title,
                    slug,
                    type,
                    excerpt,
                    content,
                    author,
                    author_title,
                    author_linkedin,
                    author_photo,
                    featured_image,
                    tags,
                    status,
                    views,
                    created_at,
                    updated_at
                  FROM blog_posts 
                  WHERE slug = ? AND status = 'published'
                  LIMIT 1";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$_GET['slug']]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post) {
            // Increment view count
            $updateViews = $pdo->prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?");
            $updateViews->execute([$post['id']]);
            
            // Sanitize HTML content
            $post['content'] = htmlspecialchars_decode($post['content']);
            $post['excerpt'] = htmlspecialchars_decode($post['excerpt']);
            
            echo json_encode([
                'success' => true,
                'data' => $post
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Blog post not found'
            ]);
        }
        
    } elseif (isset($_GET['id'])) {
        // Fetch single post by id (legacy support)
        $query = "SELECT 
                    id,
                    title,
                    slug,
                    type,
                    excerpt,
                    content,
                    author,
                    author_title,
                    author_linkedin,
                    author_photo,
                    featured_image,
                    tags,
                    status,
                    views,
                    created_at,
                    updated_at
                  FROM blog_posts 
                  WHERE id = ? AND status = 'published'
                  LIMIT 1";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$_GET['id']]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($post) {
            // Increment view count
            $updateViews = $pdo->prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?");
            $updateViews->execute([$post['id']]);
            
            // Sanitize HTML content
            $post['content'] = htmlspecialchars_decode($post['content']);
            $post['excerpt'] = htmlspecialchars_decode($post['excerpt']);
            
            echo json_encode([
                'success' => true,
                'data' => $post
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'message' => 'Blog post not found'
            ]);
        }
        
    } else {
        // Fetch all published blog posts
        $query = "SELECT 
                    id,
                    title,
                    slug,
                    type,
                    excerpt,
                    content,
                    author,
                    author_title,
                    author_linkedin,
                    author_photo,
                    featured_image,
                    tags,
                    status,
                    views,
                    created_at,
                    updated_at
                  FROM blog_posts 
                  WHERE status = 'published'
                  ORDER BY created_at DESC";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Sanitize HTML content for security
        foreach ($posts as &$post) {
            // Keep HTML tags for content but ensure they're safe
            $post['content'] = htmlspecialchars_decode($post['content']);
            $post['excerpt'] = htmlspecialchars_decode($post['excerpt']);
        }
        
        echo json_encode([
            'success' => true,
            'data' => $posts,
            'count' => count($posts)
        ]);
    }
    
} catch (Exception $e) {
    error_log("Error fetching public blogs: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching blog posts'
    ]);
}
