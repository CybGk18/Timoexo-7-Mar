# T-IMOEXO Admin Panel Setup Instructions

## Database Configuration

The database is already configured with your cPanel settings:

- Host: 82.25.105.94
- Port: 3306
- Database: timoexo_db
- User: timoexo_db
- Password: Cybaem@000

## Admin Panel Access

URL: https://www.t-imoexo.com/admin

Default Admin Credentials:

- Username: admin
- Password: admin123

**Important:** Change the default password after first login for security.

## Setup Steps

1. **Database Tables Creation:**
   Run the initial migration script to create all required tables:

   ```bash
   php backend/run_initial_migration.php
   ```

2. **Admin User Setup:**
   Ensure the admin user exists and has the correct credentials:

   ```bash
   php backend/update_admin_user.php
   ```

3. **Frontend Build:**
   Make sure the frontend is built and deployed:

   ```bash
   cd client
   npm install
   npm run build
   ```

4. **Access Admin Panel:**
   Visit https://www.t-imoexo.com/admin and log in with the admin credentials.

## Troubleshooting

### Database Connection Issues

- Verify the database credentials in `backend/.env` file
- Ensure the database server is accessible from your hosting environment
- Check firewall settings if applicable

### Admin Login Issues

- Run `backend/update_admin_user.php` to reset the admin password
- Clear browser cookies and cache
- Check browser console for any JavaScript errors

### API Endpoint Issues

- Ensure all PHP files in the `backend/api/` directory are uploaded
- Check file permissions on the server
- Verify the web server is properly configured to serve PHP files

## File Structure

```
backend/
├── api/                 # API endpoints
├── config/              # Database configuration
├── migrations/          # Database migration files
├── .env                 # Database credentials (important!)
├── run_initial_migration.php  # Initial setup script
└── update_admin_user.php      # Admin user management script

client/
├── src/
│   ├── admin/           # Admin panel frontend
│   └── ...              # Public website frontend
└── dist/                # Built frontend files
```

## Security Recommendations

1. Change the default admin password immediately
2. Regularly update dependencies
3. Monitor access logs
4. Backup database regularly
5. Use HTTPS for all admin panel access
