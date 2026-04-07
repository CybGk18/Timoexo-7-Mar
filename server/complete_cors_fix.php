<?php
// COMPLETE CORS FIX - This file should be uploaded to your server
// It demonstrates the exact fix needed for all your PHP endpoints

// 1. ENSURE THIS CORS CONFIGURATION IS IN ALL YOUR PHP FILES
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',  // <- THIS IS CRITICAL FOR YOUR LOCAL DEV
    'https://t-imoexo.com',
    'https://www.t-imoexo.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// 2. SET CORS HEADERS PROPERLY
if ($origin && in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
    header("Access-Control-Allow-Credentials: true");
} else if ($origin) {
    // Handle unauthorized origins
    http_response_code(403);
    header("Content-Type: application/json");
    echo json_encode([
        "success" => false,
        "error" => "CORS origin not allowed",
        "received_origin" => $origin,
        "allowed_origins" => $allowed_origins
    ]);
    exit();
}

// 3. ALWAYS SET THESE HEADERS
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-API-Key");
header("Access-Control-Max-Age: 86400");
header("Content-Type: application/json");

// 4. HANDLE PREFLIGHT REQUESTS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "CORS preflight successful",
        "endpoint" => "complete_cors_fix.php"
    ]);
    exit();
}

// 5. YOUR ACTUAL ENDPOINT LOGIC GOES HERE
// For testing purposes, we'll just return a success message
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    echo json_encode([
        "success" => true,
        "message" => "CORS configuration is working correctly!",
        "received_data" => $input,
        "origin" => $origin,
        "endpoint" => "complete_cors_fix.php"
    ]);
} else {
    echo json_encode([
        "success" => true,
        "message" => "CORS fix file loaded successfully",
        "method" => $_SERVER['REQUEST_METHOD'],
        "origin" => $origin,
        "endpoint" => "complete_cors_fix.php"
    ]);
}