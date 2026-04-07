# Database Remote Access Setup Guide

## Problem
Your cPanel MySQL database is blocking connections from the Replit server with the error:
```
Access denied for user 'timoexo_db'@'34.83.84.228' (using password: YES)
```

## Solution: Whitelist Replit IP in cPanel

### Step 1: Login to cPanel
1. Go to your hosting cPanel (https://your-hosting-domain.com:2083)
2. Login with your cPanel credentials

### Step 2: Allow Remote MySQL® Access
1. Find and click on **"Remote MySQL®"** in the Databases section
2. In the "Add Access Host" section:
   - **Host**: Enter `34.83.84.228` (Replit server IP)
   - Or use `%` to allow all IPs (less secure but easier)
3. Click **"Add Host"**

### Step 3: Verify Database User Permissions
1. Go to **"MySQL® Databases"** in cPanel
2. Scroll to "Current Users" section
3. Find user `timoexo_db` and verify it exists
4. If needed, click "Add User to Database" and grant ALL PRIVILEGES

### Step 4: Test Connection
1. Open your Replit project
2. Visit: `/server/test-db-connection.php`
3. You should see "✓ SUCCESS! Database connection established!"

## Alternative Solutions

### Option A: Allow All Remote IPs (Less Secure)
Instead of adding just Replit's IP, you can use:
- Host: `%`
- This allows connections from any IP address
- **Warning**: Less secure, but easier for testing

### Option B: Use cPanel Database Migration Tools
If remote access is restricted by your host:
1. Export database from cPanel phpMyAdmin
2. Import to Replit's PostgreSQL database
3. Update application to use PostgreSQL instead

## Current Database Configuration

Your database credentials are securely stored in Replit Secrets:
- **DB_HOST**: 82.25.105.94
- **DB_PORT**: 3306
- **DB_NAME**: timoexo_db
- **DB_USER**: timoexo_db
- **DB_PASSWORD**: *(stored securely)*

## Troubleshooting

### Still Getting "Access Denied"?
1. Double-check the password in Replit Secrets matches cPanel
2. Verify the username is exact (case-sensitive)
3. Check if your hosting provider blocks remote MySQL (contact support)

### Connection Timeout?
1. Verify the host IP is correct
2. Check if port 3306 is open
3. Contact hosting support to enable remote MySQL

### Database Not Found?
1. Verify database name in Replit Secrets
2. Check if the database exists in cPanel

## Need Help?
- Test connection: Visit `/server/test-db-connection.php`
- Check cPanel documentation for Remote MySQL®
- Contact your hosting provider's support team
