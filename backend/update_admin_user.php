<?php
require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    echo "Database connection successful!\n";

    // Check if admin user exists
    $stmt = $db->prepare("SELECT id FROM admin_users WHERE username = ?");
    $stmt->execute(['admin']);

    if ($stmt->rowCount() > 0) {
        // Update admin user password
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $updateStmt = $db->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
        $updateStmt->execute([$hashedPassword, 'admin']);

        echo "Admin user password updated successfully!\n";
        echo "Username: admin\n";
        echo "Password: admin123\n";
    } else {
        // Create admin user
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $insertStmt = $db->prepare("INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)");
        $insertStmt->execute(['admin', $hashedPassword, 'admin@t-imoexo.com']);

        echo "Admin user created successfully!\n";
        echo "Username: admin\n";
        echo "Password: admin123\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
