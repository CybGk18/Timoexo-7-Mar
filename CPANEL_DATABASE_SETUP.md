# cPanel Database Configuration Guide

## Current Issue

Your database connection is being rejected with this error:
```
Access denied for user 'timoexo_db'@'104.196.233.86' (using password: YES)
```

This happens because your cPanel MySQL database is blocking remote connections from the Replit server.

## Solution: Enable Remote MySQL Access

### Step 1: Login to cPanel
1. Go to your cPanel dashboard
2. Find the **"Databases"** section

### Step 2: Add Remote MySQL Host
1. Click on **"Remote MySQL®"**
2. In the **"Add Access Host"** field, enter:  
   `104.196.233.86`
   
   (This is the Replit server IP that needs access)
3. Click **"Add Host"**

### Step 3: Verify Database Credentials
Make sure your cPanel database credentials are set in Replit Secrets:
- **DB_HOST:** Your cPanel database host (e.g., `your-server-ip` or `localhost`)
- **DB_PORT:** `3306` (default MySQL port)
- **DB_NAME:** Your database name
- **DB_USER:** Your database username  
- **DB_PASS:** Your database password

These values are stored securely in Replit Secrets and are NOT visible in the code.

### Step 4: Test Connection
After adding the IP to Remote MySQL:
1. Refresh your Replit website
2. Visit the `/resources` page
3. Visit the `/admin/login` page

Blog posts should now load correctly!

## Security Note

The database credentials are now securely stored in Replit Secrets (environment variables) and are NOT visible in the code. This is the secure way to handle sensitive information.

## Alternative: Use cPanel Database Manager
If you can't add the IP address:
1. Contact your hosting provider
2. Ask them to enable remote MySQL access
3. Or use a MySQL user that allows connections from any host (less secure)

## For Production Deployment
When deploying to your own cPanel server:
1. The database will be on the same server (localhost)
2. No remote access configuration needed
3. Environment variables can be set in `.htaccess` or `php.ini`

---

**Need Help?** Contact your hosting provider's support team if you can't access Remote MySQL settings.
