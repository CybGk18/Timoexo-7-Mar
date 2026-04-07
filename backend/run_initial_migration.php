<?php
require_once __DIR__ . '/config/database.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    echo "Database connection successful!\n";

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

    echo "admin_users table created or already exists.\n";

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

    echo "blog_posts table created or already exists.\n";

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

    echo "media_library table created or already exists.\n";

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

    echo "blog_comments table created or already exists.\n";

    // Create jobs table
    $db->exec("
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

    echo "jobs table created or already exists.\n";

    // Create job_applications table
    $db->exec("
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

    echo "job_applications table created or already exists.\n";

    // Create gallery table
    $db->exec("
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

    echo "gallery table created or already exists.\n";

    // Insert default admin user if not exists
    $stmt = $db->prepare("
        INSERT IGNORE INTO admin_users (username, password, email) 
        VALUES (?, ?, ?)
    ");

    // Default admin user: admin / admin123
    $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt->execute(['admin', $hashedPassword, 'admin@t-imoexo.com']);

    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo "Default admin user created.\n";
    } else {
        echo "Default admin user already exists.\n";
    }

    echo "All tables created successfully!\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
