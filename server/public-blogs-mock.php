<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_config.php';

// Mock data commented out - now using real database
/*
$mockBlogs = [
    [
        'id' => 1,
        'title' => 'T-IMOEXO International Expands Global Trade Network',
        'content' => 'T-IMOEXO International continues to strengthen its position as a leading trading company, expanding operations across multiple continents and establishing new partnerships with key industry players.',
        'excerpt' => 'T-IMOEXO International continues to strengthen its position as a leading trading company...',
        'category' => 'Company News',
        'author' => 'T-IMOEXO Editorial Team',
        'published_date' => '2024-12-01',
        'image_url' => '/partnership/fieo-handshake.jpg',
        'status' => 'published'
    ],
    [
        'id' => 2,
        'title' => 'Sustainable Trade Practices: Our Commitment to the Future',
        'content' => 'At T-IMOEXO, we believe in responsible trading that considers environmental impact and social responsibility. Learn about our initiatives to promote sustainable business practices.',
        'excerpt' => 'At T-IMOEXO, we believe in responsible trading that considers environmental impact...',
        'category' => 'Sustainability',
        'author' => 'Sustainability Team',
        'published_date' => '2024-11-28',
        'image_url' => '/partnership/warehouse-visit.jpg',
        'status' => 'published'
    ],
    [
        'id' => 3,
        'title' => 'Agricultural Export Excellence: From Farm to Global Markets',
        'content' => 'Discover how T-IMOEXO is revolutionizing agricultural exports, connecting farmers with international markets and ensuring quality throughout the supply chain.',
        'excerpt' => 'Discover how T-IMOEXO is revolutionizing agricultural exports...',
        'category' => 'Agriculture',
        'author' => 'Agriculture Division',
        'published_date' => '2024-11-25',
        'image_url' => '/partnership/farmer-partnership.jpg',
        'status' => 'published'
    ],
    [
        'id' => 4,
        'title' => 'Technology Integration in Modern Trading',
        'content' => 'Explore how T-IMOEXO leverages cutting-edge technology to streamline operations, enhance transparency, and deliver superior service to clients worldwide.',
        'excerpt' => 'Explore how T-IMOEXO leverages cutting-edge technology...',
        'category' => 'Technology',
        'author' => 'Tech Innovation Team',
        'published_date' => '2024-11-20',
        'image_url' => '/partnership/ai-global-event.jpg',
        'status' => 'published'
    ],
    [
        'id' => 5,
        'title' => 'Partnership Spotlight: Building Strong Business Relationships',
        'content' => 'Our success is built on strong partnerships. Learn about T-IMOEXO\'s collaborative approach and how we create win-win situations for all stakeholders.',
        'excerpt' => 'Our success is built on strong partnerships...',
        'category' => 'Partnerships',
        'author' => 'Business Development',
        'published_date' => '2024-11-15',
        'image_url' => '/partnership/team-facility.jpg',
        'status' => 'published'
    ],
    [
        'id' => 6,
        'title' => 'Quality Assurance: Maintaining Excellence in Every Transaction',
        'content' => 'Quality is at the heart of everything we do. Discover T-IMOEXO\'s rigorous quality control processes that ensure customer satisfaction.',
        'excerpt' => 'Quality is at the heart of everything we do...',
        'category' => 'Quality',
        'author' => 'Quality Assurance Team',
        'published_date' => '2024-11-10',
        'image_url' => '/partnership/team-facility-2.jpg',
        'status' => 'published'
    ]
];
*/

try {
    $pdo = getDbConnection();
    
    // Get parameters
    $category = isset($_GET['category']) ? $_GET['category'] : 'all';
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
    
    // Build query
    $query = "SELECT 
                id,
                title,
                slug,
                type,
                excerpt,
                content,
                author,
                author_title,
                featured_image,
                tags,
                status,
                views,
                created_at as published_date,
                updated_at
              FROM blog_posts 
              WHERE status = 'published'";
    
    // Add category filter if specified
    if ($category !== 'all') {
        $query .= " AND type = :category";
    }
    
    $query .= " ORDER BY created_at DESC LIMIT :limit";
    
    $stmt = $pdo->prepare($query);
    
    if ($category !== 'all') {
        $stmt->bindValue(':category', $category, PDO::PARAM_STR);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    
    $stmt->execute();
    $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Sanitize HTML content
    foreach ($blogs as &$blog) {
        $blog['content'] = htmlspecialchars_decode($blog['content']);
        $blog['excerpt'] = htmlspecialchars_decode($blog['excerpt']);
        // Map database fields to expected format
        $blog['category'] = $blog['type'] ?? 'General';
        $blog['image_url'] = $blog['featured_image'] ?? '';
    }
    
    echo json_encode([
        'success' => true,
        'blogs' => $blogs,
        'total' => count($blogs)
    ]);
    
} catch (Exception $e) {
    error_log("Error fetching blogs: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error fetching blog posts',
        'error' => $e->getMessage()
    ]);
}