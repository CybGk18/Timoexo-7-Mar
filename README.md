# T-IMOEXO Website

This is the official website for T-IMOEXO, your trusted partner in global trade and supply chain solutions.

## Project Structure

- `client/` - Frontend React application
- `backend/` - PHP API backend
- `server/` - Server configuration and utilities
- `chatbot/` - AI chatbot implementation

## Setup Instructions

### For cPanel Hosting

1. Upload all files to your cPanel hosting
2. Configure your database in `backend/.env`:

   ```
   DB_HOST=82.25.105.94
   DB_NAME=timoexo_db
   DB_USER=timoexo_db
   DB_PASSWORD=Cybaem@000
   DB_PORT=3306
   ```

3. Initialize the database by running:

   ```
   https://www.t-imoexo.com/backend/init_cpanel_db.php
   ```

4. Access the admin panel at:
   ```
   https://www.t-imoexo.com/admin
   ```

### Admin Credentials

- Username: admin
- Password: admin123

**Important**: Change the default password after first login!

## Features

- Responsive design
- Blog management system
- Media library
- Comment moderation
- Job listings
- Contact forms
- AI chatbot integration

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS
- Backend: PHP, MySQL
- Deployment: cPanel compatible

## Support

For issues or questions, contact the development team.
