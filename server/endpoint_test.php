<?php
// Endpoint test to verify which endpoint is being used

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

echo json_encode([
    "status" => "success",
    "message" => "Endpoint test successful",
    "endpoint" => "endpoint_test.php",
    "timestamp" => date("Y-m-d H:i:s")
]);
?>