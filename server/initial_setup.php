<?php
// Initial setup script for T-IMOEXO admin panel

echo "T-IMOEXO Admin Panel Initial Setup\n";
echo "==================================\n\n";

// Include database configuration
require_once 'db_config.php';

try {
    $pdo = getDbConnection();
    echo "✓ Database connection successful\n\n";

    // Create all required tables
    echo "Creating database tables...\n";

    // Create admin_users table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified admin_users table\n";

    // Create blog_posts table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS blog_posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255),
            tags TEXT,
            excerpt TEXT,
            content TEXT NOT NULL,
            status VARCHAR(20) DEFAULT 'draft',
            type VARCHAR(50) DEFAULT 'Blog Post',
            author VARCHAR(100),
            author_linkedin VARCHAR(500),
            author_title VARCHAR(255),
            featured_image VARCHAR(500),
            views INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified blog_posts table\n";

    // Create media_library table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS media_library (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            url TEXT NOT NULL,
            file_type VARCHAR(50),
            file_size VARCHAR(50),
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified media_library table\n";

    // Create blog_comments table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS blog_comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            blog_post_id INT NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            comment TEXT NOT NULL,
            status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified blog_comments table\n";

    // Create jobs table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            department VARCHAR(100),
            location VARCHAR(100),
            type VARCHAR(50),
            description TEXT,
            requirements TEXT,
            salary VARCHAR(100),
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified jobs table\n";

    // Create job_applications table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS job_applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            job_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            resume_url TEXT,
            cover_letter TEXT,
            status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified job_applications table\n";

    // Create gallery table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS gallery (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url VARCHAR(500) NOT NULL,
            category VARCHAR(100),
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");
    echo "✓ Created/verified gallery table\n";

    // Create or update admin user
    echo "\nSetting up admin user...\n";

    // Check if admin user exists
    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE username = ?");
    $stmt->execute(['admin']);

    if ($stmt->rowCount() > 0) {
        // Update admin user password
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $updateStmt = $pdo->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
        $updateStmt->execute([$hashedPassword, 'admin']);
        echo "✓ Updated admin user password\n";
    } else {
        // Create admin user
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $insertStmt = $pdo->prepare("INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)");
        $insertStmt->execute(['admin', $hashedPassword, 'admin@t-imoexo.com']);
        echo "✓ Created admin user (username: admin, password: admin123)\n";
    }

    echo "\n✓ Initial setup completed successfully!\n\n";
    echo "You can now access the admin panel at: https://www.t-imoexo.com/admin\n";
    echo "Login with username 'admin' and password 'admin123'\n";
    echo "Remember to change the password after your first login for security.\n";
} catch (Exception $e) {
    echo "✗ Setup failed: " . $e->getMessage() . "\n";
    exit(1);
}
