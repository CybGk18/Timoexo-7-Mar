# T-IMOEXO Admin Panel Setup for cPanel

## Database Configuration

The application is configured to connect to your cPanel MySQL database with the following settings:

- Host: 82.25.105.94
- Port: 3306
- Database: timoexo_db
- Username: timoexo_db
- Password: Cybaem@000

These settings are stored in `backend/.env` file.

## Setting Up Database Tables

To initialize the database tables and admin user:

1. Upload all files to your cPanel hosting
2. Run the database initialization script by accessing this URL in your browser:
   ```
   https://www.t-imoexo.com/backend/init_cpanel_db.php
   ```

This will:

- Create all required database tables
- Set up the admin user with credentials:
  - Username: admin
  - Password: admin123

## Accessing the Admin Panel

After database initialization, you can access the admin panel at:

```
https://www.t-imoexo.com/admin
```

Use the credentials:

- Username: admin
- Password: admin123

## Changing Admin Password

After first login, you should change the default password:

1. Log in to the admin panel
2. Go to Settings page
3. Use the "Change Password" form to update your password

## API Connection

The frontend is configured to connect to the backend API at `/server` path. This should work automatically with your cPanel setup.

## Troubleshooting

If you encounter connection issues:

1. Verify database credentials in `backend/.env`
2. Check that all PHP files are uploaded correctly
3. Ensure the database user has proper permissions
4. Test the connection by accessing:
   ```
   https://www.t-imoexo.com/server/test_api_connection.php
   ```

## Customizing Content

Once logged in, you can:

- Create and manage blog posts
- Upload media files
- Manage comments
- Add job listings
- Update site settings
