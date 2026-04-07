# T-IMOEXO Admin Panel Setup Guide

## Overview

This guide provides step-by-step instructions to set up and access the admin panel for your T-IMOEXO website. The admin panel allows you to manage content, blog posts, media, and other website elements.

## Database Configuration

Your database is already configured with the following settings:

- Host: `82.25.105.94`
- Port: `3306`
- Database Name: `timoexo_db`
- Username: `timoexo_db`
- Password: `Cybaem@000`

These credentials are stored in:

- Backend: `backend/.env`
- Server: `server/db_config.php`

## Admin Panel Access

URL: https://www.t-imoexo.com/admin

Default Login Credentials:

- Username: `admin`
- Password: `admin123`

**Important Security Note:** Change the default password immediately after your first login.

## Setup Instructions

### 1. Upload Files to cPanel

Ensure all files are uploaded to your cPanel hosting account:

- All files in the `backend/` directory should be uploaded to your backend directory
- All files in the `server/` directory should be uploaded to your server directory
- The built frontend files from `client/dist/` should be uploaded to your public HTML directory

### 2. Database Setup

The database tables will be created automatically when you first access the admin panel. However, if you need to manually create them:

1. Upload `backend/run_initial_migration.php` to your backend directory
2. Access the file via your browser: `https://www.t-imoexo.com/backend/run_initial_migration.php`
3. This will create all necessary tables: `admin_users`, `blog_posts`, `media_library`, `blog_comments`, `jobs`, `job_applications`, and `gallery`

### 3. Admin User Setup

To ensure the admin user exists with the correct credentials:

1. Upload `backend/update_admin_user.php` to your backend directory
2. Access the file via your browser: `https://www.t-imoexo.com/backend/update_admin_user.php`
3. This will create or update the admin user with username `admin` and password `admin123`

### 4. Verify Installation

1. Visit https://www.t-imoexo.com/admin
2. Log in with the default credentials (admin / admin123)
3. If login is successful, you've completed the setup

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify database credentials in `backend/.env` and `server/db_config.php`
2. Ensure the database server is accessible
3. Check that the database `timoexo_db` exists and the user `timoexo_db` has proper permissions

### Login Problems

If you can't log in to the admin panel:

1. Run the `update_admin_user.php` script to reset credentials
2. Clear your browser cache and cookies
3. Check browser console for JavaScript errors

### Missing Pages or 404 Errors

If admin pages show 404 errors:

1. Ensure all files from `client/src/admin/` are properly built and deployed
2. Check that your web server supports URL rewriting for React Router
3. Verify the `.htaccess` file is properly configured

## File Structure

Key directories and files:

```
backend/
├── api/                 # API endpoints (auth.php, blogs.php, etc.)
├── config/              # Database configuration (database.php)
├── .env                 # Database credentials
├── run_initial_migration.php  # Database setup script
└── update_admin_user.php      # Admin user management

server/
├── db_config.php        # Database configuration for server scripts
├── *.php                # Server-side form handlers and utilities

client/
├── src/
│   ├── admin/           # Admin panel frontend code
│   └── ...              # Public website frontend
└── dist/                # Built frontend files for deployment
```

## Security Recommendations

1. Change the default admin password immediately
2. Regularly update your website files and dependencies
3. Monitor access logs for suspicious activity
4. Keep regular backups of your database
5. Use strong, unique passwords for all accounts
6. Enable HTTPS for all admin panel access

## Support

For additional help with setup or troubleshooting, please contact your development team or hosting provider.
