# Forgot Password Feature Documentation

## Overview
A secure password recovery system has been implemented for the super admin account of T-Imoexo admin portal. This feature is designed specifically for the super admin account registered with info@imoexo.com.

## Features Implemented

### 1. Backend API Endpoint
- **URL**: `/server/auth-admin.php?action=forgot-password`
- **Method**: POST
- **Security**: Only works for super admin with email info@imoexo.com
- **Functionality**: Generates temporary password and sends via email

### 2. Frontend Integration
- Added "Forgot Password" link on admin login page
- Integrated with AdminAuthContext for state management
- User-friendly loading states and error handling

### 3. Admin Tools
- Password reset functionality in admin management tools
- Database schema verification and updating
- Testing and diagnostic tools

## How It Works

1. **User clicks "Forgot Password"** on login page
2. **System verifies** super admin account exists with email info@imoexo.com
3. **Generates temporary password** (format: TempAdmin####)
4. **Sends email** with new credentials to info@imoexo.com
5. **User receives email** with temporary login credentials
6. **User logs in** with temporary password
7. **User should change password** immediately after login

## API Endpoints

### Forgot Password
```
POST /server/auth-admin.php?action=forgot-password
Content-Type: application/json
Body: {}

Response:
{
    "success": true,
    "message": "Temporary password sent to your email address"
}
```

## Email Template
The system sends an email with:
- Subject: "T-Imoexo Admin - Password Reset"
- Contains: Username and temporary password
- Instructions to change password after login
- Login URL: https://t-imoexo.com/admin

## Security Features

1. **Email Restriction**: Only works for info@imoexo.com
2. **Role Restriction**: Only works for super_admin role
3. **Account Status**: Only works for active accounts
4. **Temporary Password**: Auto-generated secure password
5. **Email Logging**: Failed emails logged for troubleshooting

## Testing Tools

### 1. Fix Admin Login Tool
**URL**: `/server/fix_admin_login.php`
- Complete diagnosis and repair tool
- Database schema checking
- Admin user management
- Password reset functionality

### 2. Test Forgot Password
**URL**: `/server/test_forgot_password.php`
- Direct API testing interface
- Frontend simulation

### 3. Quick Admin Test
**URL**: `/server/quick_admin_test.php`
- Quick status check
- Basic connectivity test

## Installation Steps

1. **Upload files** to server/domain
2. **Run schema update**: Access `/server/update_admin_schema.php`
3. **Verify admin user**: Access `/server/fix_admin_login.php`
4. **Test functionality**: Access `/server/test_forgot_password.php`

## Current Admin Credentials
- **Username**: admin
- **Password**: admin123
- **Email**: info@imoexo.com

## Frontend Usage

The forgot password link appears on the admin login page. When clicked:
1. Makes API call to forgot-password endpoint
2. Shows loading state during request
3. Displays success/error messages
4. Guides user to check email

## Error Handling

### Common Scenarios:
- **No super admin found**: "Super admin account not found or not active"
- **Email send failure**: Password updated but email notification shows fallback
- **Network error**: "Network error. Please try again or contact support"

### Logging:
- All password resets are logged
- Email failures are logged with temporary password
- Database errors are logged for debugging

## File Structure

```
server/
├── auth-admin.php (Enhanced with forgot-password action)
├── fix_admin_login.php (Complete admin management tool)
├── test_forgot_password.php (Testing interface)
├── quick_admin_test.php (Quick status check)
├── forgot-password.html (Standalone reset page)
└── update_admin_schema.php (Schema update script)

client/src/
├── admin/contexts/AdminAuthContext.tsx (Added forgotPassword function)
├── admin/services/api.ts (Added forgotPassword API call)
└── admin/pages/AdminLogin.tsx (Added forgot password UI)
```

## Troubleshooting

### If forgot password doesn't work:
1. Check if super admin exists with correct email
2. Verify email server configuration
3. Check server error logs
4. Use fix_admin_login.php for manual reset

### If email not received:
1. Check spam folder
2. Verify email server settings
3. Check server logs for email errors
4. Use manual password from logs

## Maintenance

- Monitor email delivery success rates
- Regularly test the functionality
- Keep backup admin access method
- Update email templates as needed

## Security Recommendations

1. Change temporary password immediately after login
2. Use strong passwords for admin accounts
3. Regularly review admin user access
4. Monitor login attempts and password resets
5. Keep email account secure (info@imoexo.com)

## Support

For issues with the forgot password feature:
1. Check server error logs
2. Use diagnostic tools provided
3. Verify database connectivity
4. Contact system administrator if needed