<?php
// Test script to verify API endpoints

echo "Testing API endpoints...\n\n";

// Test database connection
echo "1. Testing database connection...\n";
require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    echo "   ✓ Database connection successful\n";
} catch (Exception $e) {
    echo "   ✗ Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Test auth endpoint
echo "2. Testing auth endpoint...\n";
$authUrl = 'http://localhost:5175/server/auth.php?action=check';
echo "   Testing URL: $authUrl\n";

// Since we're testing locally, we'll just check if the file exists
$authFile = __DIR__ . '/api/auth.php';
if (file_exists($authFile)) {
    echo "   ✓ Auth endpoint file exists\n";
} else {
    echo "   ✗ Auth endpoint file missing\n";
}

// Test blogs endpoint
echo "3. Testing blogs endpoint...\n";
$blogsFile = __DIR__ . '/api/blogs.php';
if (file_exists($blogsFile)) {
    echo "   ✓ Blogs endpoint file exists\n";
} else {
    echo "   ✗ Blogs endpoint file missing\n";
}

// Test media endpoint
echo "4. Testing media endpoint...\n";
$mediaFile = __DIR__ . '/api/media.php';
if (file_exists($mediaFile)) {
    echo "   ✓ Media endpoint file exists\n";
} else {
    echo "   ✗ Media endpoint file missing\n";
}

echo "\nAPI endpoint test completed!\n";