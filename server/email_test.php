<?php
// Simple email test

$to = "info@imoexo.com";
$subject = "Test Email from T-IMOEXO";
$message = "This is a test email to verify that the email functionality is working correctly.";
$headers = "From: info@imoexo.com\r\n";
$headers .= "Reply-To: info@imoexo.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully!";
} else {
    echo "Failed to send test email.";
}