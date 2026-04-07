# Database Schema Update - Add Status Column to Inquiry Tables

## ⚠️ IMPORTANT: You MUST run this migration before using the Import/Add Inquiry features!

The new Import and Add Inquiry functionality requires a `status` column in all inquiry tables. This migration adds that column.

## What This Migration Does

Adds a `status` column to three tables:
- `buyer_inquiries`
- `manufacturer_inquiries`
- `contact_submissions`

The status column supports these values:
- `new` (default)
- `contacted`
- `in_progress`
- `closed`
- `dead_lead`

## How to Run the Migration

### Option 1: Run the PHP Script (Recommended)

1. **Via Browser:**
   ```
   http://your-domain.com/server/add_inquiry_status_column.php
   ```

2. **Via Command Line:**
   ```bash
   cd server
   php add_inquiry_status_column.php
   ```

The script will:
- ✅ Add status column to all three tables
- ✅ Create indexes for better performance
- ✅ Update existing records with default 'new' status
- ✅ Verify the changes
- ✅ Show detailed output

### Option 2: Run SQL Directly

If you prefer to run SQL directly in phpMyAdmin or MySQL command line:

```bash
cd server/migrations
mysql -u your_username -p your_database < 002_add_inquiry_status.sql
```

Or copy the SQL from `server/migrations/002_add_inquiry_status.sql` and run it in phpMyAdmin.

### Option 3: Manual SQL Execution

Run these SQL commands in your database:

```sql
-- Add status column to buyer_inquiries
ALTER TABLE buyer_inquiries 
ADD COLUMN status VARCHAR(20) DEFAULT 'new' AFTER created_at;

-- Add status column to manufacturer_inquiries
ALTER TABLE manufacturer_inquiries 
ADD COLUMN status VARCHAR(20) DEFAULT 'new' AFTER created_at;

-- Add status column to contact_submissions
ALTER TABLE contact_submissions 
ADD COLUMN status VARCHAR(20) DEFAULT 'new' AFTER created_at;

-- Create indexes
CREATE INDEX idx_buyer_inquiries_status ON buyer_inquiries(status);
CREATE INDEX idx_manufacturer_inquiries_status ON manufacturer_inquiries(status);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Update existing records
UPDATE buyer_inquiries SET status = 'new' WHERE status IS NULL;
UPDATE manufacturer_inquiries SET status = 'new' WHERE status IS NULL;
UPDATE contact_submissions SET status = 'new' WHERE status IS NULL;
```

## Verification

After running the migration, verify it worked:

1. **Check the PHP script output** - It will show ✓ for each successful step

2. **Check in phpMyAdmin:**
   - Open each table structure
   - Verify `status` column exists
   - Default value should be 'new'
   - Type should be VARCHAR(20)

3. **Check in admin panel:**
   - Go to Inquiries page
   - All existing inquiries should show "New" status
   - Status dropdown should work

## Troubleshooting

### Error: "Column 'status' already exists"
This is fine! The migration uses `IF NOT EXISTS` so it's safe to run multiple times.

### Error: "Table doesn't exist"
Run the database initialization first:
```bash
php server/init_db.php
```

### Error: "Access denied"
Make sure your database user has ALTER TABLE permissions.

## Files Created/Modified

- ✅ `server/migrations/002_add_inquiry_status.sql` - SQL migration file
- ✅ `server/add_inquiry_status_column.php` - PHP migration script
- ✅ `server/db_config.php` - Updated to include status in table creation
- ✅ `DATABASE_MIGRATION_INSTRUCTIONS.md` - This file

## After Migration

Once the migration is complete:
1. ✅ Import Excel functionality will work
2. ✅ Add Inquiry form will work
3. ✅ Status dropdown will be functional
4. ✅ All existing inquiries will have 'new' status
5. ✅ Email notifications will include status

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Verify database connection in `server/db_config.php`
3. Ensure you have proper database permissions
4. Check PHP error logs

---

**Note:** This migration is backward compatible. Existing code will continue to work, and the status column will default to 'new' for all new inquiries.
