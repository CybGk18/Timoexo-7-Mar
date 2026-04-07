<?php
// Database configuration - Using environment variables for security
// IMPORTANT: Set these in Replit Secrets or cPanel environment variables

// Load .env file if exists
$envFile = __DIR__ . '/../backend/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            if (!getenv($key)) {
                putenv("$key=$value");
            }
        }
    }
}

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: 3306);
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASSWORD') ?: getenv('DB_PASS') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'test_db');

// Verify environment variables are set for production
if (getenv('DB_HOST') === false) {
    error_log('WARNING: Database credentials not found in environment variables. Using fallback values for local development only.');
}

// Create database connection
function getDbConnection()
{
    static $pdo = null;

    if ($pdo === null) {
        try {
            // Validate connection parameters
            if (empty(DB_HOST) || empty(DB_NAME) || empty(DB_USER)) {
                throw new Exception("Database configuration is incomplete");
            }

            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 10, // Connection timeout
            ];

            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            
            // Test the connection
            $pdo->query('SELECT 1');
            
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            error_log("Connection details: host=" . DB_HOST . ", port=" . DB_PORT . ", database=" . DB_NAME . ", user=" . DB_USER);
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    return $pdo;
}

// Initialize database tables
function initializeDatabase()
{
    try {
        $pdo = getDbConnection();

        // Create contact form submissions table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                country VARCHAR(100),
                requirement TEXT,
                source_page VARCHAR(255),
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(20) DEFAULT 'new'
            )
        ");

        // Create buyer inquiry form submissions table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS buyer_inquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                company_name VARCHAR(255) NOT NULL,
                contact_person VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                country VARCHAR(100),
                product_category VARCHAR(255),
                quantity VARCHAR(100),
                requirements TEXT,
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(20) DEFAULT 'new'
            )
        ");

        // Create manufacturer inquiry form submissions table
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS manufacturer_inquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                company_name VARCHAR(255) NOT NULL,
                contact_person VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                country VARCHAR(100),
                product_category VARCHAR(255),
                production_capacity VARCHAR(100),
                requirements TEXT,
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(20) DEFAULT 'new'
            )
        ");

        error_log("Database tables initialized successfully");
    } catch (Exception $e) {
        error_log("Error initializing database: " . $e->getMessage());
    }
}

// Save contact form submission
function saveContactSubmission($data)
{
    try {
        $pdo = getDbConnection();

        $stmt = $pdo->prepare("
            INSERT INTO contact_submissions 
            (name, email, phone, country, requirement, source_page, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $data['name'],
            $data['email'],
            $data['phone'] ?? null,
            $data['country'] ?? null,
            $data['requirement'],
            $data['source_page'] ?? null,
            $data['ip_address'] ?? null
        ]);

        return $pdo->lastInsertId();
    } catch (Exception $e) {
        error_log("Error saving contact submission: " . $e->getMessage());
        throw $e;
    }
}

// Save buyer inquiry submission
function saveBuyerInquiry($data)
{
    try {
        $pdo = getDbConnection();

        $stmt = $pdo->prepare("
            INSERT INTO buyer_inquiries 
            (company_name, contact_person, email, phone, country, product_category, quantity, requirements, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $data['company_name'],
            $data['contact_person'],
            $data['email'],
            $data['phone'] ?? null,
            $data['country'] ?? null,
            $data['product_category'] ?? null,
            $data['quantity'] ?? null,
            $data['requirements'] ?? null,
            $data['ip_address'] ?? null
        ]);

        return $pdo->lastInsertId();
    } catch (Exception $e) {
        error_log("Error saving buyer inquiry: " . $e->getMessage());
        throw $e;
    }
}

// Save manufacturer inquiry submission
function saveManufacturerInquiry($data)
{
    try {
        $pdo = getDbConnection();

        $stmt = $pdo->prepare("
            INSERT INTO manufacturer_inquiries 
            (company_name, contact_person, email, phone, country, product_category, production_capacity, requirements, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $data['company_name'],
            $data['contact_person'],
            $data['email'],
            $data['phone'] ?? null,
            $data['country'] ?? null,
            $data['product_category'] ?? null,
            $data['production_capacity'] ?? null,
            $data['requirements'] ?? null,
            $data['ip_address'] ?? null
        ]);

        return $pdo->lastInsertId();
    } catch (Exception $e) {
        error_log("Error saving manufacturer inquiry: " . $e->getMessage());
        throw $e;
    }
}

// ----------------------------
// ✅ EMAIL CONFIGURATION (Using PHP mail() function)
// ----------------------------

/**
 * Send email using PHP's mail() function with proper headers
 * 
 * @param string $toEmail Recipient email address
 * @param string $toName Recipient name
 * @param string $subject Email subject
 * @param string $htmlBody Email body (HTML format)
 * @param string $fromEmail Sender email (default: no-reply@t-imoexo.com)
 * @param string $fromName Sender name (default: T-IMOEXO)
 * @return bool True if email sent successfully, false otherwise
 */
function sendSMTPEmail($toEmail, $toName, $subject, $htmlBody, $fromEmail = 'no-reply@t-imoexo.com', $fromName = 'T-IMOEXO')
{
    // Email headers
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$fromName} <{$fromEmail}>\r\n";
    $headers .= "Reply-To: T-IMOEXO Support <info@imoexo.com>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Additional headers for better deliverability
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-MSMail-Priority: Normal\r\n";
    
    try {
        // Send email using PHP's mail() function
        $result = mail($toEmail, $subject, $htmlBody, $headers);
        
        if (!$result) {
            error_log("Email sending failed to: {$toEmail}");
            return false;
        }
        
        return true;
    } catch (Exception $e) {
        error_log("Email sending error: " . $e->getMessage());
        return false;
    }
}