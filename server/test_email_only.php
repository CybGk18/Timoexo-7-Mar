<?php
// Test script for email-only contact form functionality

// Test data
$testData = [
    'name' => 'Test User',
    'email' => 'test@t-imoexo.com',
    'phone' => '1234567890',
    'country' => 'Test Country',
    'requirement' => 'This is a test submission to verify the email-only contact form is working correctly.',
    'sourcePage' => '/test'
];

// Convert to JSON
$jsonData = json_encode($testData);

// Set up the request
$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => $jsonData
    ]
]);

// Send the request to the new email-only endpoint
$response = file_get_contents('https://www.t-imoexo.com/send_email.php', false, $context);

// Display the response
echo "Response from email-only contact form:\n";
echo $response;
?>