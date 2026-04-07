<?php
// Contact form handler with database storage and email notifications
require_once 'db_config.php';

// Initialize database tables
initializeDatabase();

// ----------------------------
// ✅ CORS CONFIGURATION
// ----------------------------

// --- CORS: Allow localhost:5173 and production domain ---

// --- CORS: Allow localhost and production domain securely ---
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://t-imoexo.com',
    'https://www.t-imoexo.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Set CORS headers for allowed origins
if ($origin && in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");
    header("Access-Control-Allow-Credentials: true");
    header("Vary: Origin");
}

header("Content-Type: application/json");

// Handle preflight OPTIONS request first
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Max-Age: 86400");
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Preflight OK", "endpoint" => "send_email.php"]);
    exit();
}

// ----------------------------
// ✅ ERROR REPORTING (Disabled for production)
// ----------------------------
error_reporting(0);
ini_set('display_errors', 0);

// ----------------------------
// ✅ READ INPUT
// ----------------------------
$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

// Debug: Log the request
error_log("Send email request received: " . $raw);

if (!$input) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid input format", "endpoint" => "send_email.php"]);
    exit();
}

$name        = htmlspecialchars($input['name'] ?? '');
$country     = htmlspecialchars($input['country'] ?? '');
$email       = htmlspecialchars($input['email'] ?? '');
$phone       = htmlspecialchars($input['phone'] ?? '');
$requirement = htmlspecialchars($input['requirement'] ?? '');
$sourcePage  = htmlspecialchars($input['sourcePage'] ?? '');
$ip_address  = $_SERVER['REMOTE_ADDR'] ?? '';

// ----------------------------
// ✅ VALIDATION
// ----------------------------
// Check required fields
if (empty($name) || empty($email) || empty($requirement)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Required fields are missing", "endpoint" => "send_email.php"]);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid email format", "endpoint" => "send_email.php"]);
    exit();
}

// Validate phone number (10 digits)
if (!empty($phone)) {
    // Remove any non-digit characters
    $cleanPhone = preg_replace('/[^0-9]/', '', $phone);

    // Check if it's exactly 10 digits
    if (strlen($cleanPhone) != 10) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Phone number must be exactly 10 digits", "endpoint" => "send_email.php"]);
        exit();
    }

    // Update phone with cleaned version
    $phone = $cleanPhone;
}

// ----------------------------
// ✅ EMAIL NOTIFICATIONS
// ----------------------------
// Admin email (your personal email)
$adminEmail   = "info@imoexo.com";
$adminSubject = "🚀 New Contact Submission - T-IMOEXO";
$userSubject  = "Thank You for Contacting T-IMOEXO";

// Admin email content
$adminMessage = "
<html>
<head>
    <title>New Contact Submission</title>
</head>
<body style='font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f5f7fa;'>
    <div style='max-width:600px;margin:0 auto;background:white;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:30px;'>
        <h2 style='color:#1E3A8A;margin-top:0;'>New Contact Submission</h2>
        <table style='width:100%;border-collapse:collapse;'>
            <tr>
                <td style='padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#333;'>Name:</td>
                <td style='padding:10px;border-bottom:1px solid #eee;color:#555;'>{$name}</td>
            </tr>
            <tr>
                <td style='padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#333;'>Email:</td>
                <td style='padding:10px;border-bottom:1px solid #eee;color:#555;'>{$email}</td>
            </tr>
            <tr>
                <td style='padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#333;'>Phone:</td>
                <td style='padding:10px;border-bottom:1px solid #eee;color:#555;'>{$phone}</td>
            </tr>
            <tr>
                <td style='padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#333;'>Country:</td>
                <td style='padding:10px;border-bottom:1px solid #eee;color:#555;'>{$country}</td>
            </tr>
            <tr>
                <td style='padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#333;'>Requirement:</td>
                <td style='padding:10px;border-bottom:1px solid #eee;color:#555;white-space:pre-wrap;'>{$requirement}</td>
            </tr>
            <tr>
                <td style='padding:10px;border-bottom:1px solid #eee;font-weight:bold;color:#333;'>Source Page:</td>
                <td style='padding:10px;border-bottom:1px solid #eee;color:#555;'>{$sourcePage}</td>
            </tr>
            <tr>
                <td style='padding:10px;font-weight:bold;color:#333;'>IP Address:</td>
                <td style='padding:10px;color:#555;'>{$ip_address}</td>
            </tr>
        </table>
        <p style='margin-top:20px;color:#777;font-size:14px;'>Submission Date: " . date("Y-m-d H:i:s") . "</p>
    </div>
</body>
</html>";

// User email content
$userMessage = "
<html>
<head>
    <title>Thank You for Contacting T-IMOEXO</title>
</head>
<body style='font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f5f7fa;'>
    <div style='max-width:600px;margin:0 auto;background:white;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:30px;text-align:center;'>
        <h2 style='color:#0D9488;margin-top:0;'>Thank You, {$name}!</h2>
        <p style='color:#555;font-size:16px;line-height:1.6;'>We received your inquiry and will respond within 24 hours.</p>
        <div style='margin:30px 0;'>
            <a href='https://www.t-imoexo.com' style='display:inline-block;padding:12px 30px;background:linear-gradient(to right, #1E3A8A, #0D9488);color:white;text-decoration:none;border-radius:6px;font-weight:bold;'>Visit Our Website</a>
        </div>
        <p style='color:#777;font-size:14px;margin-top:30px;'>If you have any urgent questions, feel free to call us at +91 82374 39036</p>
    </div>
</body>
</html>";

// Email headers
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: info@imoexo.com\r\n";
$headers .= "Reply-To: info@imoexo.com\r\n";

// Save to database
try {
    saveContactSubmission([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'country' => $country,
        'requirement' => $requirement,
        'source_page' => $sourcePage,
        'ip_address' => $ip_address
    ]);
} catch (Exception $e) {
    error_log("Database error: " . $e->getMessage());
    // Don't fail the request if database save fails, just log it
}

// ----------------------------
// ✅ SEND EMAILS USING SMTP
// ----------------------------
// Send email to admin (info@imoexo.com)
$adminMailSent = sendSMTPEmail(
    $adminEmail,
    'Admin',
    $adminSubject,
    $adminMessage,
    'no-reply@t-imoexo.com',
    'T-IMOEXO Website'
);

// Send confirmation email to user
$userMailSent = sendSMTPEmail(
    $email,
    $name,
    $userSubject,
    $userMessage,
    'no-reply@t-imoexo.com',
    'T-IMOEXO'
);

// Check if emails were sent successfully
if ($adminMailSent && $userMailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Thank you for contacting us! We've received your message and sent a confirmation to your email.",
        "endpoint" => "send_email.php"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Failed to send email notifications. Please try again later.",
        "endpoint" => "send_email.php",
        "debug" => [
            "admin_mail_sent" => $adminMailSent,
            "user_mail_sent" => $userMailSent
        ]
    ]);
}