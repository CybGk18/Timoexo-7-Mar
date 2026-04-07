<?php
// Quick Admin Auth Test - Run this to verify auth endpoint works

header('Content-Type: application/json');

// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

try {
    require_once 'db_config.php';
    
    // Test database connection
    $db = getDbConnection();
    
    // Check if admin_users table exists and has data
    $stmt = $db->query("SELECT COUNT(*) as count FROM admin_users WHERE status = 'active'");
    $result = $stmt->fetch();
    
    if ($result['count'] == 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'No active admin users found. Please create an admin user first.',
            'fix_url' => 'fix_admin_login.php'
        ]);
        exit;
    }
    
    // Get sample admin user for testing
    $stmt = $db->query("SELECT username FROM admin_users WHERE status = 'active' LIMIT 1");
    $admin = $stmt->fetch();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Database connection and admin_users table OK',
        'admin_count' => $result['count'],
        'sample_username' => $admin['username'],
        'auth_endpoint' => 'auth-admin.php',
        'test_instructions' => [
            '1. Go to: https://t-imoexo.com/admin',
            '2. Try logging in with username: ' . $admin['username'],
            '3. If you don\'t know the password, use fix_admin_login.php to create a new admin user'
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage(),
        'fix_actions' => [
            'Check database credentials in .env file',
            'Verify database server is running',
            'Run fix_admin_login.php to diagnose and fix issues'
        ]
    ]);
}
?>