-- User Management Schema Migration
-- Adds role-based access control to admin_users table

-- Add new columns to admin_users table if they don't exist
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user',
ADD COLUMN IF NOT EXISTS permissions TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP NULL DEFAULT NULL,
ADD COLUMN IF NOT EXISTS created_by INT NULL DEFAULT NULL,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Update existing admin user to super_admin role
UPDATE admin_users 
SET role = 'super_admin', status = 'active' 
WHERE id = 1 
LIMIT 1;

-- Create index for faster role-based queries
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_status ON admin_users(status);

-- Add comment for permissions column
-- Permissions will be stored as JSON string containing array of allowed modules:
-- Example: ["dashboard", "content", "comments", "inquiries", "gallery", "media", "settings"]
-- NULL or empty means no special permissions (will inherit from role)
