<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to output
ini_set('log_errors', 1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';
require_once __DIR__ . '/email_notifications.php';

try {
    // Use the database connection function from db_config.php
    $db = getDbConnection();

    session_start();

    // Check authentication
    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit();
    }

    $method = $_SERVER['REQUEST_METHOD'];
    $data = json_decode(file_get_contents("php://input"));

    // Check if JSON decode failed
    if ($data === null && $method !== 'GET' && $method !== 'DELETE') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
        exit();
    }
} catch (Exception $e) {
    error_log("Error in blogs-admin.php initialization: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    exit();
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single blog post
            $query = "SELECT * FROM blog_posts WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->execute([$_GET['id']]);

            $post = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($post) {
                echo json_encode(['success' => true, 'data' => $post]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Post not found']);
            }
        } else {
            // Get all blog posts
            $query = "SELECT * FROM blog_posts ORDER BY created_at DESC";
            $stmt = $db->prepare($query);
            $stmt->execute();

            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $posts]);
        }
        break;

    case 'POST':
        try {
            // Validate required fields
            if (empty($data->title)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Title is required']);
                exit();
            }

            if (empty($data->content)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Content is required']);
                exit();
            }

            // Create new blog post
            $query = "INSERT INTO blog_posts (title, excerpt, content, status, type, author, featured_image, slug, tags, author_title, author_linkedin, author_photo) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $db->prepare($query);
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->title)));
            
            // Handle tags - check if it's array or string
            $tags = '';
            if (isset($data->tags)) {
                if (is_array($data->tags)) {
                    $tags = implode(',', $data->tags);
                } else if (is_string($data->tags)) {
                    $tags = $data->tags;
                }
            }

            $stmt->execute([
                $data->title,
                $data->excerpt ?? '',
                $data->content,
                $data->status ?? 'draft',
                $data->type ?? 'Blog Post',
                $data->author ?? '',
                $data->image ?? $data->featured_image ?? '',
                $slug,
                $tags,
                $data->author_title ?? $data->authorTitle ?? '',
                $data->author_linkedin ?? $data->authorLinkedIn ?? '',
                $data->author_photo ?? $data->authorPhoto ?? ''
            ]);

            if ($stmt->rowCount() > 0) {
                $id = $db->lastInsertId();
                
                // Send email notification
                sendAdminNotificationEmail('blog_created', [
                    'id' => $id,
                    'title' => $data->title,
                    'author' => $data->author ?? '',
                    'status' => $data->status ?? 'draft',
                    'type' => $data->type ?? 'Blog Post'
                ]);
                
                echo json_encode(['success' => true, 'message' => 'Post created', 'id' => $id]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to create post']);
            }
        } catch (PDOException $e) {
            error_log("Database error in POST: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        } catch (Exception $e) {
            error_log("Error in POST: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
        }
        break;

    case 'PUT':
        try {
            // Update blog post
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Post ID required']);
                exit();
            }

            // Validate required fields
            if (empty($data->title)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Title is required']);
                exit();
            }

            if (empty($data->content)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Content is required']);
                exit();
            }

            $query = "UPDATE blog_posts SET 
                      title = ?, 
                      excerpt = ?, 
                      content = ?, 
                      status = ?, 
                      type = ?, 
                      author = ?, 
                      featured_image = ?,
                      slug = ?,
                      tags = ?,
                      author_title = ?,
                      author_linkedin = ?,
                      author_photo = ?,
                      updated_at = CURRENT_TIMESTAMP
                      WHERE id = ?";

            $stmt = $db->prepare($query);
            $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $data->title)));
            
            // Handle tags - check if it's array or string
            $tags = '';
            if (isset($data->tags)) {
                if (is_array($data->tags)) {
                    $tags = implode(',', $data->tags);
                } else if (is_string($data->tags)) {
                    $tags = $data->tags;
                }
            }

            $stmt->execute([
                $data->title,
                $data->excerpt ?? '',
                $data->content,
                $data->status ?? 'draft',
                $data->type ?? 'Blog Post',
                $data->author ?? '',
                $data->image ?? $data->featured_image ?? '',
                $slug,
                $tags,
                $data->author_title ?? $data->authorTitle ?? '',
                $data->author_linkedin ?? $data->authorLinkedIn ?? '',
                $data->author_photo ?? $data->authorPhoto ?? '',
                $_GET['id']
            ]);
            
            // Send email notification
            sendAdminNotificationEmail('blog_updated', [
                'id' => $_GET['id'],
                'title' => $data->title,
                'author' => $data->author ?? '',
                'status' => $data->status ?? 'draft',
                'type' => $data->type ?? 'Blog Post'
            ]);

            echo json_encode(['success' => true, 'message' => 'Post updated']);
        } catch (PDOException $e) {
            error_log("Database error in PUT: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        } catch (Exception $e) {
            error_log("Error in PUT: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        // Delete blog post
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Post ID required']);
            exit();
        }
        
        // Get blog details before deletion
        $getQuery = "SELECT * FROM blog_posts WHERE id = ?";
        $getStmt = $db->prepare($getQuery);
        $getStmt->execute([$_GET['id']]);
        $blogPost = $getStmt->fetch(PDO::FETCH_ASSOC);

        $query = "DELETE FROM blog_posts WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$_GET['id']]);

        if ($stmt->rowCount() > 0) {
            // Send email notification
            if ($blogPost) {
                sendAdminNotificationEmail('blog_deleted', [
                    'id' => $_GET['id'],
                    'title' => $blogPost['title'] ?? 'Untitled',
                    'author' => $blogPost['author'] ?? '',
                    'status' => $blogPost['status'] ?? '',
                    'type' => $blogPost['type'] ?? 'Blog Post'
                ]);
            }
            echo json_encode(['success' => true, 'message' => 'Post deleted']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to delete post']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}