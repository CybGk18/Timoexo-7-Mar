-- Add status column to inquiry tables
-- Migration: add_inquiry_status_columns
-- Created: 2025-11-20

-- Add status to buyer_inquiries table
ALTER TABLE `buyer_inquiries` 
ADD COLUMN `status` ENUM('new', 'contacted', 'in_progress', 'closed', 'dead_lead') 
NOT NULL DEFAULT 'new' 
AFTER `created_at`;

-- Add status to manufacturer_inquiries table
ALTER TABLE `manufacturer_inquiries` 
ADD COLUMN `status` ENUM('new', 'contacted', 'in_progress', 'closed', 'dead_lead') 
NOT NULL DEFAULT 'new' 
AFTER `created_at`;

-- Add status to contact_submissions table
ALTER TABLE `contact_submissions` 
ADD COLUMN `status` ENUM('new', 'contacted', 'in_progress', 'closed', 'dead_lead') 
NOT NULL DEFAULT 'new' 
AFTER `created_at`;

-- Create index for better query performance
CREATE INDEX idx_buyer_status ON `buyer_inquiries`(`status`);
CREATE INDEX idx_manufacturer_status ON `manufacturer_inquiries`(`status`);
CREATE INDEX idx_contact_status ON `contact_submissions`(`status`);
