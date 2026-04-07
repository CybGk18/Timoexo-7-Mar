<?php
// Simple email test script for cPanel
// Upload this to your server and access via browser to test email functionality

// Test Configuration
$testEmail = "info@imoexo.com"; // Change this to your email for testing
$fromEmail = "no-reply@t-imoexo.com";

// Test 1: Basic PHP mail() function
echo "<h2>Testing Email Functionality</h2>";
echo "<hr>";

echo "<h3>Test 1: Basic PHP mail() Function</h3>";
$to = $testEmail;
$subject = "Test Email from cPanel - " . date('Y-m-d H:i:s');
$message = "<html><body><h2>Test Email</h2><p>This is a test email sent from your cPanel server.</p><p>If you received this, your email configuration is working!</p></body></html>";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: T-IMOEXO <{$fromEmail}>\r\n";
$headers .= "Reply-To: info@imoexo.com\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "<p style='color: green;'>✅ Email sent successfully to: {$to}</p>";
    echo "<p>Check your inbox (and spam folder) for the test email.</p>";
} else {
    echo "<p style='color: red;'>❌ Email sending failed!</p>";
    echo "<p>Check your cPanel email configuration and error logs.</p>";
}

echo "<hr>";

// Test 2: Check email accounts
echo "<h3>Test 2: Server Information</h3>";
echo "<table border='1' cellpadding='5'>";
echo "<tr><td><strong>PHP Version:</strong></td><td>" . phpversion() . "</td></tr>";
echo "<tr><td><strong>Server Software:</strong></td><td>" . $_SERVER['SERVER_SOFTWARE'] . "</td></tr>";
echo "<tr><td><strong>Document Root:</strong></td><td>" . $_SERVER['DOCUMENT_ROOT'] . "</td></tr>";
echo "<tr><td><strong>Current Script:</strong></td><td>" . __FILE__ . "</td></tr>";
echo "<tr><td><strong>Mail Function:</strong></td><td>" . (function_exists('mail') ? '✅ Available' : '❌ Not Available') . "</td></tr>";
echo "</table>";

echo "<hr>";

// Test 3: Form Simulation
echo "<h3>Test 3: Simulate Form Submission</h3>";
echo "<form method='POST'>";
echo "<label>Your Email: <input type='email' name='test_email' value='{$testEmail}' required></label><br><br>";
echo "<label>Your Name: <input type='text' name='test_name' value='Test User' required></label><br><br>";
echo "<button type='submit' name='send_test'>Send Test Email</button>";
echo "</form>";

if (isset($_POST['send_test'])) {
    $userEmail = $_POST['test_email'];
    $userName = $_POST['test_name'];
    
    // Admin notification
    $adminSubject = "🚀 Test Form Submission";
    $adminMessage = "
    <html>
    <body style='font-family:Arial,sans-serif;'>
        <h2>Test Form Submission</h2>
        <p><strong>Name:</strong> {$userName}</p>
        <p><strong>Email:</strong> {$userEmail}</p>
        <p><strong>Time:</strong> " . date('Y-m-d H:i:s') . "</p>
    </body>
    </html>";
    
    $adminSent = mail($testEmail, $adminSubject, $adminMessage, $headers);
    
    // User confirmation
    $userSubject = "Thank You for Testing - T-IMOEXO";
    $userMessage = "
    <html>
    <body style='font-family:Arial,sans-serif;'>
        <h2>Thank You, {$userName}!</h2>
        <p>This is a test confirmation email from T-IMOEXO.</p>
        <p>If you received this, the email system is working correctly!</p>
    </body>
    </html>";
    
    $userHeaders  = "MIME-Version: 1.0\r\n";
    $userHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    $userHeaders .= "From: T-IMOEXO <{$fromEmail}>\r\n";
    $userHeaders .= "Reply-To: info@imoexo.com\r\n";
    
    $userSent = mail($userEmail, $userSubject, $userMessage, $userHeaders);
    
    echo "<hr>";
    echo "<h4>Test Results:</h4>";
    echo "<p>" . ($adminSent ? "✅" : "❌") . " Admin notification: " . ($adminSent ? "Sent" : "Failed") . "</p>";
    echo "<p>" . ($userSent ? "✅" : "❌") . " User confirmation: " . ($userSent ? "Sent" : "Failed") . "</p>";
}

echo "<hr>";
echo "<p><small>Script: test_email_simple.php | Generated: " . date('Y-m-d H:i:s') . "</small></p>";
?>
