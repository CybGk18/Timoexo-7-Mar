# PHP Backend for T-ImoExo

This directory contains the PHP backend implementation for the T-ImoExo website.

## Files

- `send_email.php` - Contact form handler with database storage
- `buyer_inquiry.php` - Buyer inquiry form handler with database storage
- `manufacturer_inquiry.php` - Manufacturer inquiry form handler with database storage
- `db_config.php` - Database configuration and connection functions

## Database Tables

The system automatically creates the following tables:

1. `contact_submissions` - Stores contact form submissions
2. `buyer_inquiries` - Stores buyer inquiry form submissions
3. `manufacturer_inquiries` - Stores manufacturer inquiry form submissions

## API Endpoints

All endpoints accept POST requests with JSON data and return JSON responses.

### Contact Form

- **URL**: `https://www.t-imoexo.com/send_email.php`
- **Method**: POST
- **Data**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "country": "India",
    "requirement": "I need help with...",
    "sourcePage": "/contact"
  }
  ```

### Buyer Inquiry Form

- **URL**: `https://www.t-imoexo.com/buyer_inquiry.php`
- **Method**: POST
- **Data**:
  ```json
  {
    "companyName": "ABC Company",
    "contactPerson": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "country": "India",
    "productCategory": "Electronics",
    "quantity": "100 units",
    "requirements": "Looking for high-quality products...",
    "sourcePage": "/home"
  }
  ```

### Manufacturer Inquiry Form

- **URL**: `https://www.t-imoexo.com/manufacturer_inquiry.php`
- **Method**: POST
- **Data**:
  ```json
  {
    "companyName": "XYZ Manufacturing",
    "contactPerson": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "country": "India",
    "productCategory": "Textiles",
    "productionCapacity": "5000 units/month",
    "requirements": "Looking to export our products...",
    "sourcePage": "/home"
  }
  ```

## Database Configuration

The database connection is configured in `db_config.php` with the following constants:

- `DB_HOST`: Database host (82.25.105.94)
- `DB_PORT`: Database port (3306)
- `DB_USER`: Database username (timoexo_db)
- `DB_PASS`: Database password (Cybaem@000)
- `DB_NAME`: Database name (timoexo_db)

## Features

1. **Database Storage**: All form submissions are stored in MySQL database tables
2. **Email Notifications**: Both admin and user receive email notifications
3. **CORS Support**: Proper CORS headers for cross-origin requests
4. **Input Validation**: Server-side validation of form data
5. **Error Handling**: Comprehensive error handling and logging
