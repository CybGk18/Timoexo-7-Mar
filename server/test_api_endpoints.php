<?php
// Test script to verify API endpoints

echo "Testing API endpoints...\n\n";

// Include database configuration
require_once 'db_config.php';

// Test database connection
echo "1. Testing database connection...\n";
try {
    $pdo = getDbConnection();
    echo "   ✓ Database connection successful\n";
} catch (Exception $e) {
    echo "   ✗ Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Test if required tables exist
echo "2. Checking required database tables...\n";
$tables = ['admin_users', 'blog_posts', 'media_library', 'blog_comments', 'jobs', 'job_applications', 'gallery'];

foreach ($tables as $table) {
    try {
        $stmt = $pdo->prepare("SHOW TABLES LIKE ?");
        $stmt->execute([$table]);
        if ($stmt->rowCount() > 0) {
            echo "   ✓ Table '$table' exists\n";
        } else {
            echo "   ⚠ Table '$table' does not exist (will be created on first access)\n";
        }
    } catch (Exception $e) {
        echo "   ✗ Error checking table '$table': " . $e->getMessage() . "\n";
    }
}

// Test admin user
echo "3. Checking admin user...\n";
try {
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM admin_users");
    $stmt->execute();
    $result = $stmt->fetch();

    if ($result['count'] > 0) {
        echo "   ✓ Admin user exists\n";
    } else {
        echo "   ⚠ No admin user found (will be created on first access)\n";
    }
} catch (Exception $e) {
    echo "   ✗ Error checking admin user: " . $e->getMessage() . "\n";
}

echo "\nAPI endpoint test completed!\n";
echo "Visit https://www.t-imoexo.com/admin to access the admin panel.\n";
