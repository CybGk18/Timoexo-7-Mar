-- Enhanced setup script that combines schema migration and admin user creation
-- Run this in your cPanel phpMyAdmin

-- First, ensure the admin_users table exists with all required fields
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user',
    permissions TEXT DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'active',
    last_login TIMESTAMP NULL DEFAULT NULL,
    created_by INT NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add columns if they don't exist (for existing tables)
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user',
ADD COLUMN IF NOT EXISTS permissions TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP NULL DEFAULT NULL,
ADD COLUMN IF NOT EXISTS created_by INT NULL DEFAULT NULL,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Create super admin user with all permissions
INSERT INTO admin_users (username, password, email, role, permissions, status) 
VALUES (
    'admin', 
    '$2y$12$.jKbAGdJ7xcv79xIFOE.DeDhc4ea.Tmogb6XepaJx6nhfqLoBTDfu',  -- Password: admin123
    'info@imoexo.com',
    'super_admin',
    '["dashboard", "content", "comments", "inquiries", "gallery", "media", "settings"]',
    'active'
)
ON DUPLICATE KEY UPDATE 
    password = '$2y$12$.jKbAGdJ7xcv79xIFOE.DeDhc4ea.Tmogb6XepaJx6nhfqLoBTDfu',
    email = 'info@imoexo.com',
    role = 'super_admin',
    permissions = '["dashboard", "content", "comments", "inquiries", "gallery", "media", "settings"]',
    status = 'active';

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_status ON admin_users(status);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Verify the admin user was created correctly
SELECT 
    id, 
    username, 
    email, 
    role, 
    status, 
    CASE WHEN password IS NOT NULL THEN 'SET' ELSE 'NULL' END as password_status,
    created_at 
FROM admin_users 
WHERE username = 'admin';

-- Show table structure to verify all columns exist
DESCRIBE admin_users;