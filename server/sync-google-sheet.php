<?php
/**
 * Google Sheets Sync API Endpoint
 * 
 * Receives inquiry data from Google Sheets and inserts into MySQL database
 * 
 * Endpoint: https://yourdomain.com/server/sync-google-sheet.php
 * Method: POST
 * Content-Type: application/json
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('log_errors_max_len', 0);

// Enable CORS for Google Apps Script
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST.'
    ]);
    exit();
}

// ==================== CONFIGURATION ====================

// API Key for security (CHANGE THIS!)
define('API_KEY', 'your-secret-api-key-here-change-this');

// Database configuration
require_once __DIR__ . '/db_config.php';

// ==================== MAIN LOGIC ====================

try {
    // Get JSON input
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    
    // Log the request for debugging
    error_log("Google Sheets Sync Request: " . $rawInput);
    
    // Validate JSON
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg());
    }
    
    // Validate API key
    if (!isset($input['api_key']) || $input['api_key'] !== API_KEY) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid API key'
        ]);
        exit();
    }
    
    // Validate required data
    if (!isset($input['data'])) {
        throw new Exception('Missing data field');
    }
    
    $data = $input['data'];
    
    // Validate required fields
    if (empty($data['name']) || empty($data['email'])) {
        throw new Exception('Name and Email are required fields');
    }
    
    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Get database connection
    $db = getDbConnection();
    
    // Determine inquiry type and table
    $type = strtolower($data['type'] ?? 'contact');
    $table = '';
    $fields = [];
    $values = [];
    
    switch ($type) {
        case 'buyer':
            $table = 'buyer_inquiries';
            $fields = [
                'company_name',
                'contact_person',
                'email',
                'phone',
                'country',
                'product_category',
                'quantity',
                'requirements',
                'status',
                'created_at'
            ];
            $values = [
                $data['company'] ?? '',
                $data['name'] ?? '',
                $data['email'],
                $data['phone'] ?? '',
                $data['country'] ?? '',
                $data['category'] ?? '',
                $data['quantity'] ?? '',
                $data['message'] ?? '',
                $data['status'] ?? 'new',
                formatDateTime($data['submitted_at'] ?? null)
            ];
            break;
            
        case 'manufacturer':
            $table = 'manufacturer_inquiries';
            $fields = [
                'company_name',
                'contact_person',
                'email',
                'phone',
                'country',
                'product_category',
                'production_capacity',
                'requirements',
                'status',
                'created_at'
            ];
            $values = [
                $data['company'] ?? '',
                $data['name'] ?? '',
                $data['email'],
                $data['phone'] ?? '',
                $data['country'] ?? '',
                $data['category'] ?? '',
                $data['production_capacity'] ?? '',
                $data['message'] ?? '',
                $data['status'] ?? 'new',
                formatDateTime($data['submitted_at'] ?? null)
            ];
            break;
            
        case 'contact':
        default:
            $table = 'contact_submissions';
            $fields = [
                'name',
                'email',
                'phone',
                'country',
                'requirement',
                'source_page',
                'status',
                'created_at'
            ];
            $values = [
                $data['name'],
                $data['email'],
                $data['phone'] ?? '',
                $data['country'] ?? '',
                $data['message'] ?? '',
                'Google Sheets',
                $data['status'] ?? 'new',
                formatDateTime($data['submitted_at'] ?? null)
            ];
            break;
    }
    
    // Check for duplicate email (optional - remove if you want to allow duplicates)
    $checkQuery = "SELECT id FROM $table WHERE email = ? LIMIT 1";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->execute([$data['email']]);
    $existing = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
    if ($existing) {
        // Update existing record instead of creating duplicate
        $updateFields = [];
        foreach ($fields as $index => $field) {
            if ($field !== 'created_at' && $field !== 'email') {
                $updateFields[] = "$field = ?";
            }
        }
        
        $updateQuery = "UPDATE $table SET " . implode(', ', $updateFields) . " WHERE email = ?";
        $updateValues = array_filter($values, function($key) use ($fields) {
            return $fields[$key] !== 'created_at' && $fields[$key] !== 'email';
        }, ARRAY_FILTER_USE_KEY);
        $updateValues[] = $data['email'];
        
        $stmt = $db->prepare($updateQuery);
        $result = $stmt->execute(array_values($updateValues));
        
        $inquiryId = $existing['id'];
        $action = 'updated';
        
    } else {
        // Insert new record
        $placeholders = array_fill(0, count($fields), '?');
        $insertQuery = "INSERT INTO $table (" . implode(', ', $fields) . ") 
                        VALUES (" . implode(', ', $placeholders) . ")";
        
        $stmt = $db->prepare($insertQuery);
        $result = $stmt->execute($values);
        
        $inquiryId = $db->lastInsertId();
        $action = 'created';
    }
    
    if ($result) {
        // Send email notification (optional)
        sendNotificationEmail($data, $type, $inquiryId, $action);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Inquiry ' . $action . ' successfully',
            'id' => $inquiryId,
            'type' => $type,
            'action' => $action,
            'row_number' => $input['row_number'] ?? null
        ]);
        
        error_log("Google Sheets Sync Success: ID $inquiryId, Type: $type, Action: $action");
        
    } else {
        throw new Exception('Failed to insert/update inquiry in database');
    }
    
} catch (Exception $e) {
    error_log("Google Sheets Sync Error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error' => $e->getMessage()
    ]);
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Format date/time for MySQL
 */
function formatDateTime($dateString) {
    if (empty($dateString)) {
        return date('Y-m-d H:i:s');
    }
    
    try {
        $timestamp = strtotime($dateString);
        if ($timestamp === false) {
            return date('Y-m-d H:i:s');
        }
        return date('Y-m-d H:i:s', $timestamp);
    } catch (Exception $e) {
        return date('Y-m-d H:i:s');
    }
}

/**
 * Send email notification (optional)
 */
function sendNotificationEmail($data, $type, $id, $action) {
    try {
        $to = 'info@imoexo.com';
        $subject = 'New Inquiry from Google Sheets - ' . ucfirst($type) . ' #' . $id;
        
        $message = "A new inquiry has been synced from Google Sheets.\n\n";
        $message .= "Action: " . ucfirst($action) . "\n";
        $message .= "Source: Google Sheets Auto-Sync\n";
        $message .= "Time: " . date('F j, Y, g:i a') . "\n\n";
        $message .= "--- Inquiry Details ---\n";
        $message .= "Inquiry ID: #$id\n";
        $message .= "Inquiry Type: " . ucfirst($type) . "\n";
        $message .= "Name: " . ($data['name'] ?? 'N/A') . "\n";
        $message .= "Email: " . ($data['email'] ?? 'N/A') . "\n";
        $message .= "Phone: " . ($data['phone'] ?? 'N/A') . "\n";
        $message .= "Company: " . ($data['company'] ?? 'N/A') . "\n";
        $message .= "Country: " . ($data['country'] ?? 'N/A') . "\n";
        $message .= "Category: " . ($data['category'] ?? 'N/A') . "\n";
        $message .= "Message: " . ($data['message'] ?? 'N/A') . "\n";
        $message .= "Status: " . ($data['status'] ?? 'new') . "\n";
        
        $headers = "From: T-IMOEXO Google Sheets Sync <noreply@imoexo.com>\r\n";
        $headers .= "Reply-To: info@imoexo.com\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        @mail($to, $subject, $message, $headers);
        
    } catch (Exception $e) {
        error_log("Failed to send notification email: " . $e->getMessage());
    }
}
