<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection();

    // Check if admin_users table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'admin_users'");
    if ($stmt->rowCount() > 0) {
        echo "✅ admin_users table exists\n";

        // Check if admin user exists
        $stmt = $pdo->prepare("SELECT id, username, email FROM admin_users WHERE username = ?");
        $stmt->execute(['admin']);

        if ($stmt->rowCount() > 0) {
            $admin = $stmt->fetch(PDO::FETCH_ASSOC);
            echo "✅ Admin user found:\n";
            echo "  ID: " . $admin['id'] . "\n";
            echo "  Username: " . $admin['username'] . "\n";
            echo "  Email: " . $admin['email'] . "\n";
        } else {
            echo "❌ Admin user not found\n";

            // Try to create admin user
            echo "Creating admin user...\n";
            $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
            $insertStmt = $pdo->prepare("INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)");

            if ($insertStmt->execute(['admin', $hashedPassword, 'admin@t-imoexo.com'])) {
                echo "✅ Admin user created successfully!\n";
                echo "Username: admin\n";
                echo "Password: admin123\n";
            } else {
                echo "❌ Failed to create admin user\n";
            }
        }
    } else {
        echo "❌ admin_users table does not exist\n";
        echo "Please run the database initialization script\n";
    }
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
}
