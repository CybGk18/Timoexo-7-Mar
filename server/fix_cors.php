<?php
// Complete CORS fix for all endpoints
function handleCors()
{
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
        header("Vary: Origin");
        header("Access-Control-Allow-Credentials: true");
    }

    // Always set these headers
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-API-Key");
    header("Access-Control-Max-Age: 86400");
    header("Content-Type: application/json");
}

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    handleCors();
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "CORS preflight request successful",
        "timestamp" => date('Y-m-d H:i:s')
    ]);
    exit();
}

// Handle regular requests
handleCors();

// Return success response for testing
echo json_encode([
    "success" => true,
    "message" => "CORS configuration is working",
    "origin" => $_SERVER['HTTP_ORIGIN'] ?? 'none',
    "method" => $_SERVER['REQUEST_METHOD'],
    "timestamp" => date('Y-m-d H:i:s')
]);
