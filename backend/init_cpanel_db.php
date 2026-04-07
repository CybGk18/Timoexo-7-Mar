<?php
require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    echo "Database connection successful!\n";
    // Note: Properties are private, so we can't access them directly
    // But the connection is established with the correct credentials

    // Create tables
    echo "Creating database tables...\n";

    // Create admin_users table
    $db->exec("
        CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Create blog_posts table
    $db->exec("
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

    // Create media_library table
    $db->exec("
        CREATE TABLE IF NOT EXISTS media_library (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            url TEXT NOT NULL,
            file_type VARCHAR(50),
            file_size VARCHAR(50),
            uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Create blog_comments table
    $db->exec("
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

    // Create jobs table
    $db->exec("
        CREATE TABLE IF NOT EXISTS jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            department VARCHAR(100),
            location VARCHAR(100),
            type VARCHAR(50),
            salary VARCHAR(100),
            description TEXT,
            requirements TEXT,
            responsibilities TEXT,
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Create job_applications table
    $db->exec("
        CREATE TABLE IF NOT EXISTS job_applications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            job_id INT NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            resume_url TEXT,
            cover_letter TEXT,
            status VARCHAR(20) DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    // Create gallery table
    $db->exec("
        CREATE TABLE IF NOT EXISTS gallery (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            image_url TEXT NOT NULL,
            category VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ");

    echo "Database tables created successfully!\n";

    // Check if admin user exists
    $stmt = $db->prepare("SELECT id FROM admin_users WHERE username = ?");
    $stmt->execute(['admin']);

    if ($stmt->rowCount() > 0) {
        // Update admin user password
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $updateStmt = $db->prepare("UPDATE admin_users SET password = ?, email = ? WHERE username = ?");
        $updateStmt->execute([$hashedPassword, 'admin@t-imoexo.com', 'admin']);

        echo "Admin user password updated successfully!\n";
    } else {
        // Create admin user
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $insertStmt = $db->prepare("INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)");
        $insertStmt->execute(['admin', $hashedPassword, 'admin@t-imoexo.com']);

        echo "Admin user created successfully!\n";
    }

    echo "Admin credentials:\n";
    echo "Username: admin\n";
    echo "Password: admin123\n";
    echo "Email: admin@t-imoexo.com\n";

    // Add indexes for better performance
    $db->exec("CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_blog_created ON blog_posts(created_at);");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_media_type ON media_library(file_type);");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_comment_status ON blog_comments(status);");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_comment_blog_id ON blog_comments(blog_post_id);");

    echo "Database initialization completed successfully!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
