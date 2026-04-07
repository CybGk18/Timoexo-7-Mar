# SMTP Email Configuration Setup Instructions

## ✅ Files Updated

All three form handler files have been updated to use SMTP email with PHPMailer:

1. **`send_email.php`** - Contact form handler
2. **`buyer_inquiry.php`** - Buyer inquiry form handler  
3. **`manufacturer_inquiry.php`** - Manufacturer inquiry form handler
4. **`db_config.php`** - Added `sendSMTPEmail()` helper function

## 📧 Email Configuration

- **Admin Email**: `info@imoexo.com` (receives all form submissions)
- **User Reply Email**: `no-reply@t-imoexo.com` (users receive confirmation from this address)
- **SMTP Server**: `no-reply@t-imoexo.com`
- **SMTP Port**: `465` (SSL)
- **SMTP Username**: `no-reply@t-imoexo.com`
- **SMTP Password**: `Timoexo@2025`

## 📦 Required: Install PHPMailer

### Option 1: Using Composer (Recommended)

If your cPanel has Composer installed:

```bash
cd /home/your-username/public_html/server
composer require phpmailer/phpmailer
```

### Option 2: Manual Installation

1. **Download PHPMailer** from: https://github.com/PHPMailer/PHPMailer/releases
2. **Extract the files** and create this folder structure in your `server` folder:
   ```
   server/
   ├── PHPMailer/
   │   ├── PHPMailer.php
   │   ├── SMTP.php
   │   ├── Exception.php
   │   └── ... (other files)
   ├── send_email.php
   ├── buyer_inquiry.php
   ├── manufacturer_inquiry.php
   └── db_config.php
   ```

3. **Upload via cPanel File Manager**:
   - Go to cPanel → File Manager
   - Navigate to `public_html/server/`
   - Create a new folder called `PHPMailer`
   - Upload the three required files:
     - `PHPMailer.php`
     - `SMTP.php`
     - `Exception.php`

## 🚀 Upload Files to cPanel

Upload these **4 updated files** to your cPanel server in the `public_html/server/` directory:

1. ✅ `db_config.php` (contains the SMTP helper function)
2. ✅ `send_email.php` (contact form with SMTP)
3. ✅ `buyer_inquiry.php` (buyer inquiry with SMTP)
4. ✅ `manufacturer_inquiry.php` (manufacturer inquiry with SMTP)

## 🔧 File Permissions

Set correct permissions on cPanel:
- PHP files: `644`
- PHPMailer folder: `755`

## ✅ Testing

After uploading:

1. **Test Contact Form**: Submit a test contact form
2. **Check Admin Email**: Verify `info@imoexo.com` receives the notification
3. **Check User Email**: Verify the user receives confirmation from `no-reply@t-imoexo.com`
4. **Check Database**: Verify submissions are saved in the database

## 🐛 Troubleshooting

### If emails are not sending:

1. **Check SMTP Credentials**: Verify the SMTP username and password are correct
2. **Check Error Logs**: View cPanel error logs for any SMTP connection errors
3. **Enable Debug Mode**: Temporarily change `$mail->SMTPDebug = 2;` in `db_config.php`
4. **Verify PHPMailer Installation**: Ensure all three PHPMailer files are uploaded correctly
5. **Check Port and SSL**: Try changing from SSL (465) to TLS (587) if needed

### Common Errors:

- **"Class 'PHPMailer' not found"**: PHPMailer files are not in the correct location
- **"SMTP connect() failed"**: Check SMTP credentials and port settings
- **"Could not authenticate"**: Verify username and password

## 📝 Notes

- All form submissions are still saved to the database even if email sending fails
- Users receive replies from `no-reply@t-imoexo.com` with `info@imoexo.com` as the reply-to address
- Admin receives all form submissions at `info@imoexo.com`
- Email content is HTML formatted with professional styling
