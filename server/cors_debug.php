<?php
// Debug CORS configuration

header("Content-Type: application/json");

// Echo all the CORS headers that are set
$headers = [];
foreach (getallheaders() as $name => $value) {
    if (stripos($name, 'access-control') !== false) {
        $headers[$name] = $value;
    }
}

echo json_encode([
    "method" => $_SERVER['REQUEST_METHOD'],
    "origin" => $_SERVER['HTTP_ORIGIN'] ?? 'Not set',
    "headers" => $headers,
    "all_server" => [
        "HTTP_ORIGIN" => $_SERVER['HTTP_ORIGIN'] ?? 'Not set',
        "REQUEST_METHOD" => $_SERVER['REQUEST_METHOD'] ?? 'Not set'
    ]
]);
?>