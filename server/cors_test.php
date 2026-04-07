<?php
// CORS test file
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://t-imoexo.com',
    'https://www.t-imoexo.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin && in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Vary: Origin");
    header("Access-Control-Allow-Credentials: true");
} else if ($origin) {
    // Origin present but not allowed
    http_response_code(403);
    echo json_encode(["success" => false, "error" => "CORS origin not allowed"]);
    exit();
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Max-Age: 86400");
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Preflight OK"]);
    exit();
}

// Handle actual POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo json_encode([
        "success" => true,
        "message" => "CORS configuration is working correctly",
        "origin" => $origin
    ]);
}