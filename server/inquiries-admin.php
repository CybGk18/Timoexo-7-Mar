<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db_config.php';

try {
    $db = getDbConnection();
    session_start();

    if (!isset($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit();
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['action'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing action parameter']);
                exit();
            }
            
            $action = $input['action'];
            
            if ($action === 'create') {
                // Single inquiry creation
                if (!isset($input['data'])) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Missing inquiry data']);
                    exit();
                }
                
                $data = $input['data'];
                
                // Validate required fields
                if (!isset($data['type']) || !isset($data['email']) || !isset($data['name'])) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Missing required fields: type, email, name']);
                    exit();
                }
                
                $type = $data['type'];
                $table = '';
                $fields = [];
                $values = [];
                $placeholders = [];
                
                // Determine table and fields based on type
                switch ($type) {
                    case 'buyer':
                        $table = 'buyer_inquiries';
                        $fields = ['company_name', 'contact_person', 'email', 'phone', 'country', 
                                   'product_category', 'quantity', 'requirements', 'status', 'created_at'];
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
                            isset($data['date']) && !empty($data['date']) ? $data['date'] . ' ' . date('H:i:s') : date('Y-m-d H:i:s')
                        ];
                        break;
                    case 'manufacturer':
                        $table = 'manufacturer_inquiries';
                        $fields = ['company_name', 'contact_person', 'email', 'phone', 'country', 
                                   'product_category', 'production_capacity', 'requirements', 'status', 'created_at'];
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
                            isset($data['date']) && !empty($data['date']) ? $data['date'] . ' ' . date('H:i:s') : date('Y-m-d H:i:s')
                        ];
                        break;
                    case 'contact':
                        $table = 'contact_submissions';
                        $fields = ['name', 'email', 'phone', 'country', 'requirement', 'source_page', 'status', 'created_at'];
                        $values = [
                            $data['name'],
                            $data['email'],
                            $data['phone'] ?? '',
                            $data['country'] ?? '',
                            $data['message'] ?? '',
                            'Admin Panel',
                            $data['status'] ?? 'new',
                            isset($data['date']) && !empty($data['date']) ? $data['date'] . ' ' . date('H:i:s') : date('Y-m-d H:i:s')
                        ];
                        break;
                    default:
                        http_response_code(400);
                        echo json_encode(['success' => false, 'message' => 'Invalid inquiry type']);
                        exit();
                }
                
                // Build query
                $placeholders = array_fill(0, count($fields), '?');
                $query = "INSERT INTO $table (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $placeholders) . ")";
                
                try {
                    $stmt = $db->prepare($query);
                    $result = $stmt->execute($values);
                    
                    if ($result) {
                        $newId = $db->lastInsertId();
                        
                        // Send email notification
                        $adminEmail = $_SESSION['admin_email'] ?? 'Unknown Admin';
                        $adminName = $_SESSION['admin_name'] ?? 'Admin User';
                        
                        $to = 'info@imoexo.com';
                        $subject = 'New Inquiry Added - ' . ucfirst($type) . ' Inquiry #' . $newId;
                        
                        $message = "A new inquiry has been added to the system.\n\n";
                        $message .= "Added By: $adminName ($adminEmail)\n";
                        $message .= "Time: " . date('F j, Y, g:i a') . "\n\n";
                        $message .= "--- Inquiry Details ---\n";
                        $message .= "Inquiry ID: #$newId\n";
                        $message .= "Inquiry Type: " . ucfirst($type) . " Inquiry\n";
                        $message .= "Name: " . ($data['name'] ?? 'N/A') . "\n";
                        $message .= "Email: " . ($data['email'] ?? 'N/A') . "\n";
                        $message .= "Phone: " . ($data['phone'] ?? 'N/A') . "\n";
                        $message .= "Company: " . ($data['company'] ?? 'N/A') . "\n";
                        $message .= "Country: " . ($data['country'] ?? 'N/A') . "\n";
                        $message .= "Category: " . ($data['category'] ?? 'N/A') . "\n";
                        $message .= "Message: " . ($data['message'] ?? 'N/A') . "\n";
                        $message .= "Status: " . ($data['status'] ?? 'new') . "\n";
                        
                        $headers = "From: T-IMOEXO CMS <noreply@imoexo.com>\r\n";
                        $headers .= "Reply-To: info@imoexo.com\r\n";
                        $headers .= "X-Mailer: PHP/" . phpversion();
                        
                        @mail($to, $subject, $message, $headers);
                        
                        echo json_encode([
                            'success' => true, 
                            'message' => 'Inquiry created successfully',
                            'id' => $newId
                        ]);
                    } else {
                        http_response_code(500);
                        echo json_encode(['success' => false, 'message' => 'Failed to create inquiry']);
                    }
                } catch (Exception $e) {
                    error_log("Error creating inquiry: " . $e->getMessage());
                    http_response_code(500);
                    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
                }
                
            } elseif ($action === 'bulk_import') {
                // Bulk import from Excel
                if (!isset($input['data']) || !is_array($input['data'])) {
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Missing or invalid bulk data']);
                    exit();
                }
                
                $inquiries = $input['data'];
                $successCount = 0;
                $errorCount = 0;
                $errors = [];
                
                foreach ($inquiries as $index => $data) {
                    // Validate required fields
                    if (!isset($data['type']) || !isset($data['email']) || !isset($data['name'])) {
                        $errors[] = "Row " . ($index + 1) . ": Missing required fields";
                        $errorCount++;
                        continue;
                    }
                    
                    $type = strtolower($data['type']);
                    $table = '';
                    $fields = [];
                    $values = [];
                    
                    // Determine table and fields based on type
                    switch ($type) {
                        case 'buyer':
                        case 'buyer inquiry':
                            $table = 'buyer_inquiries';
                            $fields = ['company_name', 'contact_person', 'email', 'phone', 'country', 
                                       'product_category', 'quantity', 'requirements', 'status'];
                            $values = [
                                $data['company'] ?? '',
                                $data['name'] ?? '',
                                $data['email'],
                                $data['phone'] ?? '',
                                $data['country'] ?? '',
                                $data['category'] ?? '',
                                $data['quantity'] ?? '',
                                $data['message'] ?? '',
                                $data['status'] ?? 'new'
                            ];
                            break;
                        case 'manufacturer':
                        case 'manufacturer inquiry':
                            $table = 'manufacturer_inquiries';
                            $fields = ['company_name', 'contact_person', 'email', 'phone', 'country', 
                                       'product_category', 'production_capacity', 'requirements', 'status'];
                            $values = [
                                $data['company'] ?? '',
                                $data['name'] ?? '',
                                $data['email'],
                                $data['phone'] ?? '',
                                $data['country'] ?? '',
                                $data['category'] ?? '',
                                $data['production_capacity'] ?? '',
                                $data['message'] ?? '',
                                $data['status'] ?? 'new'
                            ];
                            break;
                        case 'contact':
                        case 'contact inquiry':
                            $table = 'contact_submissions';
                            $fields = ['name', 'email', 'phone', 'country', 'requirement', 'source_page', 'status'];
                            $values = [
                                $data['name'],
                                $data['email'],
                                $data['phone'] ?? '',
                                $data['country'] ?? '',
                                $data['message'] ?? '',
                                'Excel Import',
                                $data['status'] ?? 'new'
                            ];
                            break;
                        default:
                            $errors[] = "Row " . ($index + 1) . ": Invalid inquiry type '" . $data['type'] . "'";
                            $errorCount++;
                            continue 2;
                    }
                    
                    // Build and execute query
                    $placeholders = array_fill(0, count($fields), '?');
                    $query = "INSERT INTO $table (" . implode(', ', $fields) . ") VALUES (" . implode(', ', $placeholders) . ")";
                    
                    try {
                        $stmt = $db->prepare($query);
                        $result = $stmt->execute($values);
                        
                        if ($result) {
                            $successCount++;
                        } else {
                            $errors[] = "Row " . ($index + 1) . ": Failed to insert";
                            $errorCount++;
                        }
                    } catch (Exception $e) {
                        $errors[] = "Row " . ($index + 1) . ": " . $e->getMessage();
                        $errorCount++;
                    }
                }
                
                // Send summary email
                $adminEmail = $_SESSION['admin_email'] ?? 'Unknown Admin';
                $adminName = $_SESSION['admin_name'] ?? 'Admin User';
                
                $to = 'info@imoexo.com';
                $subject = 'Bulk Inquiry Import - ' . $successCount . ' Imported';
                
                $message = "Bulk inquiry import completed.\n\n";
                $message .= "Imported By: $adminName ($adminEmail)\n";
                $message .= "Time: " . date('F j, Y, g:i a') . "\n\n";
                $message .= "--- Import Summary ---\n";
                $message .= "Total Records: " . count($inquiries) . "\n";
                $message .= "Successfully Imported: $successCount\n";
                $message .= "Failed: $errorCount\n";
                
                if (!empty($errors)) {
                    $message .= "\n--- Errors ---\n";
                    $message .= implode("\n", $errors);
                }
                
                $headers = "From: T-IMOEXO CMS <noreply@imoexo.com>\r\n";
                $headers .= "Reply-To: info@imoexo.com\r\n";
                $headers .= "X-Mailer: PHP/" . phpversion();
                
                @mail($to, $subject, $message, $headers);
                
                echo json_encode([
                    'success' => true,
                    'message' => "Import completed: $successCount successful, $errorCount failed",
                    'successCount' => $successCount,
                    'errorCount' => $errorCount,
                    'errors' => $errors
                ]);
                
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid action']);
            }
            break;

        case 'GET':
            if (isset($_GET['id'])) {
                $id = intval($_GET['id']);
                $type = isset($_GET['type']) ? $_GET['type'] : null;
                
                $inquiry = null;
                $foundType = null;
                
                if ($type) {
                    $table = '';
                    switch ($type) {
                        case 'buyer':
                            $table = 'buyer_inquiries';
                            break;
                        case 'manufacturer':
                            $table = 'manufacturer_inquiries';
                            break;
                        case 'contact':
                            $table = 'contact_submissions';
                            break;
                        default:
                            $type = null;
                    }
                    
                    if ($table) {
                        // Use SELECT * for buyer and manufacturer, but specific fields with alias for contact
                        if ($type === 'contact') {
                            $query = "SELECT id, name, email, phone, country, requirement as requirements, 
                                      source_page, created_at, status FROM $table WHERE id = ?";
                        } else {
                            $query = "SELECT * FROM $table WHERE id = ?";
                        }
                        $stmt = $db->prepare($query);
                        $stmt->execute([$id]);
                        $inquiry = $stmt->fetch(PDO::FETCH_ASSOC);
                        if ($inquiry) {
                            $foundType = $type;
                        }
                    }
                }
                
                if (!$inquiry) {
                    $tables = [
                        'buyer' => 'buyer_inquiries',
                        'manufacturer' => 'manufacturer_inquiries',
                        'contact' => 'contact_submissions'
                    ];
                    
                    foreach ($tables as $searchType => $table) {
                        // Use SELECT * for buyer and manufacturer, but specific fields with alias for contact
                        if ($searchType === 'contact') {
                            $query = "SELECT id, name, email, phone, country, requirement as requirements, 
                                      source_page, created_at, status FROM $table WHERE id = ?";
                        } else {
                            $query = "SELECT * FROM $table WHERE id = ?";
                        }
                        $stmt = $db->prepare($query);
                        $stmt->execute([$id]);
                        $result = $stmt->fetch(PDO::FETCH_ASSOC);
                        
                        if ($result) {
                            $inquiry = $result;
                            $foundType = $searchType;
                            break;
                        }
                    }
                }

                if ($inquiry) {
                    $inquiry['inquiry_type'] = $foundType;
                    echo json_encode(['success' => true, 'data' => $inquiry]);
                } else {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Inquiry not found']);
                }
            } else {
                $filterType = isset($_GET['filter']) ? $_GET['filter'] : 'all';
                $inquiries = [];

                if ($filterType === 'all' || $filterType === 'buyer') {
                    $query = "SELECT id, company_name as name, contact_person, email, phone, country, 
                              product_category, quantity, requirements, created_at, status 
                              FROM buyer_inquiries ORDER BY created_at DESC";
                    $stmt = $db->prepare($query);
                    $stmt->execute();
                    $buyers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    foreach ($buyers as $buyer) {
                        $buyer['inquiry_type'] = 'buyer';
                        $buyer['type_label'] = 'Buyer Inquiry';
                        $inquiries[] = $buyer;
                    }
                }

                if ($filterType === 'all' || $filterType === 'manufacturer') {
                    $query = "SELECT id, company_name as name, contact_person, email, phone, country, 
                              product_category, production_capacity, requirements, created_at, status 
                              FROM manufacturer_inquiries ORDER BY created_at DESC";
                    $stmt = $db->prepare($query);
                    $stmt->execute();
                    $manufacturers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    foreach ($manufacturers as $manufacturer) {
                        $manufacturer['inquiry_type'] = 'manufacturer';
                        $manufacturer['type_label'] = 'Manufacturer Inquiry';
                        $inquiries[] = $manufacturer;
                    }
                }

                if ($filterType === 'all' || $filterType === 'contact') {
                    $query = "SELECT id, name, email, phone, country, requirement as requirements, 
                              source_page, created_at, status 
                              FROM contact_submissions ORDER BY created_at DESC";
                    $stmt = $db->prepare($query);
                    $stmt->execute();
                    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    foreach ($contacts as $contact) {
                        $contact['inquiry_type'] = 'contact';
                        $contact['type_label'] = 'Contact Inquiry';
                        $inquiries[] = $contact;
                    }
                }

                usort($inquiries, function($a, $b) {
                    return strtotime($b['created_at']) - strtotime($a['created_at']);
                });

                echo json_encode(['success' => true, 'data' => $inquiries]);
            }
            break;

        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['id']) || !isset($input['type']) || !isset($input['status'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                exit();
            }
            
            $id = intval($input['id']);
            $type = $input['type'];
            $status = $input['status'];
            
            // Validate status value
            $validStatuses = ['new', 'contacted', 'in_progress', 'closed', 'dead_lead'];
            if (!in_array($status, $validStatuses)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid status value']);
                exit();
            }
            
            // Determine table based on type
            $table = '';
            switch ($type) {
                case 'buyer':
                    $table = 'buyer_inquiries';
                    break;
                case 'manufacturer':
                    $table = 'manufacturer_inquiries';
                    break;
                case 'contact':
                    $table = 'contact_submissions';
                    break;
                default:
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Invalid inquiry type']);
                    exit();
            }
            
            // Update status
            $query = "UPDATE $table SET status = ? WHERE id = ?";
            $stmt = $db->prepare($query);
            $result = $stmt->execute([$status, $id]);
            
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Status updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to update status']);
            }
            break;

        case 'DELETE':
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($input['id']) || !isset($input['type'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                exit();
            }
            
            $id = intval($input['id']);
            $type = $input['type'];
            
            // Determine table based on type
            $table = '';
            switch ($type) {
                case 'buyer':
                    $table = 'buyer_inquiries';
                    break;
                case 'manufacturer':
                    $table = 'manufacturer_inquiries';
                    break;
                case 'contact':
                    $table = 'contact_submissions';
                    break;
                default:
                    http_response_code(400);
                    echo json_encode(['success' => false, 'message' => 'Invalid inquiry type']);
                    exit();
            }
            
            // Get inquiry details before deletion for email
            $query = "SELECT * FROM $table WHERE id = ?";
            $stmt = $db->prepare($query);
            $stmt->execute([$id]);
            $inquiry = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$inquiry) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Inquiry not found']);
                exit();
            }
            
            // Delete inquiry
            $deleteQuery = "DELETE FROM $table WHERE id = ?";
            $deleteStmt = $db->prepare($deleteQuery);
            $result = $deleteStmt->execute([$id]);
            
            if ($result) {
                // Send email notification
                $adminEmail = $_SESSION['admin_email'] ?? 'Unknown Admin';
                $adminName = $_SESSION['admin_name'] ?? 'Admin User';
                
                $to = 'info@imoexo.com';
                $subject = 'Inquiry Deleted - ' . ucfirst($type) . ' Inquiry #' . $id;
                
                $message = "An inquiry has been deleted from the system.\n\n";
                $message .= "Deleted By: $adminName ($adminEmail)\n";
                $message .= "Deletion Time: " . date('F j, Y, g:i a') . "\n\n";
                $message .= "--- Deleted Inquiry Details ---\n";
                $message .= "Inquiry ID: #$id\n";
                $message .= "Inquiry Type: " . ucfirst($type) . " Inquiry\n";
                
                foreach ($inquiry as $key => $value) {
                    if ($key !== 'id' && $key !== 'ip_address') {
                        $label = ucwords(str_replace('_', ' ', $key));
                        $message .= "$label: " . ($value ?? 'N/A') . "\n";
                    }
                }
                
                $headers = "From: T-IMOEXO CMS <noreply@imoexo.com>\r\n";
                $headers .= "Reply-To: info@imoexo.com\r\n";
                $headers .= "X-Mailer: PHP/" . phpversion();
                
                @mail($to, $subject, $message, $headers);
                
                echo json_encode(['success' => true, 'message' => 'Inquiry deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to delete inquiry']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    error_log("Error in inquiries-admin.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
}