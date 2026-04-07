-- Migration: Add status column to inquiry tables
-- Date: 2025-11-24
-- Description: Adds status tracking to buyer_inquiries, manufacturer_inquiries, and contact_submissions tables

-- Add status column to buyer_inquiries
ALTER TABLE buyer_inquiries 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' AFTER created_at;

-- Add status column to manufacturer_inquiries
ALTER TABLE manufacturer_inquiries 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' AFTER created_at;

-- Add status column to contact_submissions
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'new' AFTER created_at;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_buyer_inquiries_status ON buyer_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_manufacturer_inquiries_status ON manufacturer_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Update existing records to have 'new' status if NULL
UPDATE buyer_inquiries SET status = 'new' WHERE status IS NULL;
UPDATE manufacturer_inquiries SET status = 'new' WHERE status IS NULL;
UPDATE contact_submissions SET status = 'new' WHERE status IS NULL;

SELECT 'Migration completed successfully - status columns added to all inquiry tables' AS message;
