# CPANEL EMAIL CONFIGURATION GUIDE

## 🚨 Current Issue: 500 Internal Server Error

The 500 error was caused by PHPMailer not being installed. I've updated the code to use PHP's built-in `mail()` function instead.

## ✅ **Solution 1: Use cPanel's Default Mail System (EASIEST)**

### Files Already Updated:
- ✅ `db_config.php` - Now uses PHP's `mail()` function
- ✅ `send_email.php` - Uses the updated email function
- ✅ `buyer_inquiry.php` - Uses the updated email function
- ✅ `manufacturer_inquiry.php` - Uses the updated email function

### What You Need to Do:

1. **Upload Updated Files to cPanel:**
   - `db_config.php`
   - `send_email.php`
   - `buyer_inquiry.php`
   - `manufacturer_inquiry.php`

2. **Configure Email Account in cPanel:**
   - Go to cPanel → **Email Accounts**
   - Create/verify email account: `no-reply@t-imoexo.com`
   - Password: `Timoexo@2025`
   - Also verify: `info@imoexo.com` exists

3. **Set Default "From" Address (Optional):**
   - Go to cPanel → **Email Routing**
   - Select your domain
   - Set routing to "Local Mail Exchanger"

4. **Test the Forms:**
   - Submit a test form
   - Check `info@imoexo.com` inbox for admin notifications
   - Check user's email for confirmation messages

---

## 🔧 **Solution 2: Configure SMTP in PHP.ini (ADVANCED)**

If you need explicit SMTP authentication, you'll need to modify `php.ini`:

### Steps:

1. **Find php.ini in cPanel:**
   - cPanel → **MultiPHP INI Editor**
   - Select your domain

2. **Add SMTP Configuration:**
   ```ini
   [mail function]
   SMTP = mail.t-imoexo.com
   smtp_port = 465
   sendmail_from = no-reply@t-imoexo.com
   ```

3. **Save and Restart:**
   - Save changes
   - PHP will automatically reload

---

## 🛠️ **Solution 3: Install PHPMailer via cPanel (RECOMMENDED FOR PRODUCTION)**

If you want full SMTP control with authentication:

### Using cPanel Terminal:

1. **Access Terminal:**
   - cPanel → **Terminal**

2. **Navigate to Server Folder:**
   ```bash
   cd public_html/server
   ```

3. **Install PHPMailer via Composer:**
   ```bash
   composer require phpmailer/phpmailer
   ```

4. **If Composer Not Installed:**
   ```bash
   # Install Composer first
   curl -sS https://getcomposer.org/installer | php
   
   # Then install PHPMailer
   php composer.phar require phpmailer/phpmailer
   ```

### Manual Installation (If No Terminal Access):

1. **Download PHPMailer:**
   - Go to: https://github.com/PHPMailer/PHPMailer/releases
   - Download latest version (ZIP file)

2. **Extract and Upload:**
   - Extract the ZIP file
   - Via cPanel File Manager:
     - Navigate to `public_html/server/`
     - Upload the entire `PHPMailer` folder
     - Or create `vendor/phpmailer/phpmailer/src/` structure

3. **Update db_config.php Path:**
   Replace the require_once lines with:
   ```php
   require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
   require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/SMTP.php';
   require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/Exception.php';
   ```

---

## 🔍 **Debugging Tips**

### Enable Error Reporting:

Temporarily add this to the top of your PHP files:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

### Check PHP Error Logs:

- cPanel → **Errors**
- Look for email-related errors

### Test Email Sending:

Create a simple test file (`test_email_simple.php`):
```php
<?php
$to = "info@imoexo.com";
$subject = "Test Email";
$message = "This is a test email from cPanel";
$headers = "From: no-reply@t-imoexo.com\r\n";
$headers .= "Reply-To: info@imoexo.com\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed!";
}
?>
```

Upload this to `public_html/server/` and access via:
`https://www.t-imoexo.com/server/test_email_simple.php`

---

## 📝 **Current Email Configuration**

With the updated code (Solution 1):

- **Admin Email**: `info@imoexo.com` (receives form submissions)
- **Reply-From**: `no-reply@t-imoexo.com` (users see this as sender)
- **Reply-To**: `info@imoexo.com` (users can reply to this address)
- **Method**: PHP `mail()` function with proper headers

---

## ⚠️ **Important Notes**

1. **SPF Records**: Ensure your domain has proper SPF records to prevent emails from going to spam
2. **DKIM**: Configure DKIM in cPanel → **Email Deliverability**
3. **Email Limits**: cPanel may have hourly email sending limits
4. **Spam Filters**: Test emails might go to spam initially

---

## ✅ **Quick Fix Checklist**

- [ ] Upload updated `db_config.php` to cPanel
- [ ] Upload updated `send_email.php` to cPanel
- [ ] Upload updated `buyer_inquiry.php` to cPanel
- [ ] Upload updated `manufacturer_inquiry.php` to cPanel
- [ ] Verify email accounts exist in cPanel
- [ ] Test form submission
- [ ] Check inbox for emails
- [ ] If issues persist, enable error reporting and check logs
