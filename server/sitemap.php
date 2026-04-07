<?php
/**
 * Auto-Generated Sitemap
 * Dynamically generates sitemap.xml including all published blog posts
 */

header('Content-Type: application/xml; charset=utf-8');

require_once 'db_config.php';

// Base URL for the website
$baseUrl = 'https://www.t-imoexo.com';

// Start XML output
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Static pages
$staticPages = [
    [
        'loc' => '/',
        'lastmod' => '2025-11-25',
        'changefreq' => 'weekly',
        'priority' => '1.0'
    ],
    [
        'loc' => '/services',
        'lastmod' => '2025-11-25',
        'changefreq' => 'weekly',
        'priority' => '0.8'
    ],
    [
        'loc' => '/solutions',
        'lastmod' => '2025-11-25',
        'changefreq' => 'weekly',
        'priority' => '0.8'
    ],
    [
        'loc' => '/about',
        'lastmod' => '2025-11-25',
        'changefreq' => 'monthly',
        'priority' => '0.7'
    ],
    [
        'loc' => '/contact',
        'lastmod' => '2025-11-25',
        'changefreq' => 'monthly',
        'priority' => '0.9'
    ],
    [
        'loc' => '/resources',
        'lastmod' => '2025-11-25',
        'changefreq' => 'weekly',
        'priority' => '0.8'
    ]
];

// Output static pages
foreach ($staticPages as $page) {
    echo "  <url>\n";
    echo "    <loc>{$baseUrl}{$page['loc']}</loc>\n";
    echo "    <lastmod>{$page['lastmod']}</lastmod>\n";
    echo "    <changefreq>{$page['changefreq']}</changefreq>\n";
    echo "    <priority>{$page['priority']}</priority>\n";
    echo "  </url>\n";
}

// Fetch and output blog posts
    $pdo = getDbConnection();
    
    $query = "SELECT 
                slug,
                updated_at,
                created_at
              FROM blog_posts 
              WHERE status = 'published'
              ORDER BY created_at DESC";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $blogPosts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($blogPosts as $post) {
        // Use updated_at if available, otherwise created_at
        $lastmod = !empty($post['updated_at']) ? $post['updated_at'] : $post['created_at'];
        
        // Format date as YYYY-MM-DD
        $lastmodDate = date('Y-m-d', strtotime($lastmod));
        
        echo "  <url>\n";
        echo "    <loc>{$baseUrl}/blog-post/{$post['slug']}/</loc>\n";
        echo "    <lastmod>{$lastmodDate}</lastmod>\n";
        echo "    <changefreq>weekly</changefreq>\n";
        echo "    <priority>0.6</priority>\n";
        echo "  </url>\n";
    }
    
} catch (Exception $e) {
    error_log("Error generating sitemap: " . $e->getMessage());
    // Continue with static pages only if database fails
}

// Close XML
echo '</urlset>';
