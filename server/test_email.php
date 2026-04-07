<?php
// Test email functionality for cPanel hosting

$to = "info@t-imoexo.com";
$subject = "Test Email from T-ImoExo Contact Form";
$message = "
<html>
<head>
<title>Test Email</title>
</head>
<body>
<h2>Test Email from T-ImoExo</h2>
<p>This is a test email to verify that the email functionality is working correctly on cPanel.</p>
<p>If you receive this email, the contact form should be able to send notifications.</p>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: info@t-imoexo.com" . "\r\n";
$headers .= "Reply-To: info@t-imoexo.com" . "\r\n";

if(mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully!";
} else {
    echo "Failed to send test email. Check your cPanel email settings.";
}
?>