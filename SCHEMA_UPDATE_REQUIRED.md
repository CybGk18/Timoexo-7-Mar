# Schema Update Summary

## Yes, you need to update the database schema!

The Import and Add Inquiry features require a `status` column in the inquiry tables.

## Quick Answer

**Run this command:**
```
http://your-domain.com/server/add_inquiry_status_column.php
```

Or via command line:
```bash
cd server
php add_inquiry_status_column.php
```

## What Gets Added

The `status` column will be added to:
- ✅ `buyer_inquiries` table
- ✅ `manufacturer_inquiries` table  
- ✅ `contact_submissions` table

**Column Details:**
- Type: VARCHAR(20)
- Default: 'new'
- Valid values: new, contacted, in_progress, closed, dead_lead

## Files to Use

1. **PHP Script (Recommended):**
   - `server/add_inquiry_status_column.php`
   - Run in browser or command line
   - Shows detailed output and verification

2. **SQL File:**
   - `server/migrations/002_add_inquiry_status.sql`
   - Run directly in MySQL/phpMyAdmin

3. **Instructions:**
   - `DATABASE_MIGRATION_INSTRUCTIONS.md`
   - Complete step-by-step guide

## Why This Is Needed

The new features use the `status` field to:
- Track inquiry lifecycle (new → contacted → in_progress → closed/dead_lead)
- Filter inquiries by status
- Update status via dropdown
- Include status in Excel imports/exports

## Safe to Run

- ✅ Uses `IF NOT EXISTS` - safe to run multiple times
- ✅ Won't affect existing data
- ✅ Sets all existing inquiries to 'new' status
- ✅ Backward compatible

## After Migration

Once complete, you can:
- ✅ Use Import button to upload Excel files
- ✅ Use Add Inquiry button to create new inquiries
- ✅ Update status via dropdown in the table
- ✅ Filter inquiries by status

---

**Bottom Line:** Run the migration script once, then all features will work perfectly!
