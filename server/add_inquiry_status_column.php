<?php
/**
 * Migration Script: Add status column to inquiry tables
 * Run this script once to update the database schema
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/db_config.php';

try {
    $db = getDbConnection();
    
    echo "Starting migration: Adding status column to inquiry tables...\n\n";
    
    // Add status column to buyer_inquiries
    echo "1. Adding status column to buyer_inquiries table...\n";
    $db->exec("ALTER TABLE buyer_inquiries ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' AFTER created_at");
    echo "   ✓ Done\n\n";
    
    // Add status column to manufacturer_inquiries
    echo "2. Adding status column to manufacturer_inquiries table...\n";
    $db->exec("ALTER TABLE manufacturer_inquiries ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' AFTER created_at");
    echo "   ✓ Done\n\n";
    
    // Add status column to contact_submissions
    echo "3. Adding status column to contact_submissions table...\n";
    $db->exec("ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' AFTER created_at");
    echo "   ✓ Done\n\n";
    
    // Create indexes for better performance
    echo "4. Creating indexes for status columns...\n";
    $db->exec("CREATE INDEX IF NOT EXISTS idx_buyer_inquiries_status ON buyer_inquiries(status)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_manufacturer_inquiries_status ON manufacturer_inquiries(status)");
    $db->exec("CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status)");
    echo "   ✓ Done\n\n";
    
    // Update existing records
    echo "5. Updating existing records with default status...\n";
    $buyerCount = $db->exec("UPDATE buyer_inquiries SET status = 'new' WHERE status IS NULL");
    $manufacturerCount = $db->exec("UPDATE manufacturer_inquiries SET status = 'new' WHERE status IS NULL");
    $contactCount = $db->exec("UPDATE contact_submissions SET status = 'new' WHERE status IS NULL");
    echo "   ✓ Updated $buyerCount buyer inquiries\n";
    echo "   ✓ Updated $manufacturerCount manufacturer inquiries\n";
    echo "   ✓ Updated $contactCount contact submissions\n\n";
    
    // Verify the changes
    echo "6. Verifying schema changes...\n";
    $tables = ['buyer_inquiries', 'manufacturer_inquiries', 'contact_submissions'];
    foreach ($tables as $table) {
        $stmt = $db->query("SHOW COLUMNS FROM $table LIKE 'status'");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo "   ✓ $table: status column exists (Type: {$result['Type']}, Default: {$result['Default']})\n";
        } else {
            echo "   ✗ $table: status column NOT found!\n";
        }
    }
    
    echo "\n✅ Migration completed successfully!\n";
    echo "\nValid status values:\n";
    echo "  - new\n";
    echo "  - contacted\n";
    echo "  - in_progress\n";
    echo "  - closed\n";
    echo "  - dead_lead\n";
    
} catch (Exception $e) {
    echo "\n❌ Migration failed: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
    exit(1);
}
