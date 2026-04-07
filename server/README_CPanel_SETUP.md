# T-ImoExo Contact Form - cPanel Setup Instructions

This document provides step-by-step instructions for setting up the simplified contact form on cPanel hosting.

## 1. File Upload

1. Upload the following files to your cPanel file manager in the public_html directory:
   - `send_email.php` (simplified email-only handler)
   - `test_email_only.php` (test script)

## 2. Email Configuration

1. The form is configured to send notifications to `ganesh.kale@cybaemtech.com`
2. No additional email setup is required if this is your preferred notification email

## 3. Features

1. **Email-Only Solution**: No database storage, only email notifications
2. **Admin Notification**: Sends email to admin (ganesh.kale@cybaemtech.com)
3. **User Confirmation**: Sends confirmation email to submitting user
4. **Form Validation**: Validates all required fields including 10-digit phone numbers
5. **CORS Support**: Properly configured for your domain
6. **Responsive Design**: Works on all device sizes

## 4. Testing

1. Run the test script to verify email functionality:
   ```
   https://www.yourdomain.com/test_email_only.php
   ```
2. If the test passes, the contact form should work correctly.

## 5. Troubleshooting

### If emails are not being received:

- Check spam/junk folders
- Verify email addresses in the send_email.php file
- Contact your hosting provider about email restrictions

### If the form is not submitting:

- Check the browser console for JavaScript errors
- Verify the form action URL in Contact.jsx matches your domain
- Check server error logs in cPanel

## 6. Final Steps

1. After confirming everything works, you can delete the test file:

   - `test_email_only.php`
   - `README_CPanel_SETUP.md`

2. Make sure your frontend is pointing to the correct endpoint in production.
