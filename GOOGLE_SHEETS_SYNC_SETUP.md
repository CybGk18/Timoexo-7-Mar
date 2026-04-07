# Google Sheets to PHP MySQL Auto-Sync Integration

## Complete Setup Guide

This guide will help you automatically sync inquiry data from Google Sheets to your PHP MySQL database.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [JSON Structure](#json-structure)
3. [Setup Steps](#setup-steps)
4. [Testing](#testing)
5. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**What This Does:**
- Automatically detects when you add/edit rows in Google Sheets
- Sends the data to your PHP API endpoint
- Inserts/updates the data in your MySQL database
- Works in real-time without manual intervention

**Components:**
1. **Google Apps Script** (`google-sheets-sync.gs`) - Runs in Google Sheets
2. **PHP API Endpoint** (`sync-google-sheet.php`) - Receives and processes data
3. **MySQL Database** - Stores the inquiry data

---

## 📊 JSON Structure

### Data Sent from Google Sheets to PHP 

```json
{
  "api_key": "your-secret-api-key-here-change-this",
  "source": "google_sheets",
  "row_number": 2,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "type": "buyer",
    "company": "ABC Corporation",
    "country": "USA",
    "category": "Electronics",
    "message": "Need 1000 units of LED displays",
    "status": "new",
    "submitted_at": "2025-11-24T10:30:00.000Z"
  }
}
```

### Response from PHP to Google Sheets

**Success:**
```json
{
  "success": true,
  "message": "Inquiry created successfully",
  "id": 123,
  "type": "buyer",
  "action": "created",
  "row_number": 2
}
```

**Error:**
```json
{
  "success": false,
  "message": "Invalid email format",
  "error": "Invalid email format"
}
```

---

## 🚀 Setup Steps

### Step 1: Prepare Your Google Sheet

1. **Open your Google Sheet:**
   - https://docs.google.com/spreadsheets/d/1AIC3h6vA1EXFlnbaodsetOFJwv1ZnVYEnIw4Q6rNggU/edit

2. **Set up columns in this exact order:**
   
   | A | B | C | D | E | F | G | H | I | J |
   |---|---|---|---|---|---|---|---|---|---|
   | Name | Email | Phone | Inquiry Type | Company | Country | Category | Message | Status | Submitted At |

3. **Add header row (Row 1):**
   ```
   Name | Email | Phone | Inquiry Type | Company | Country | Category | Message | Status | Submitted At
   ```

4. **Example data row (Row 2):**
   ```
   John Doe | john@example.com | +1234567890 | Buyer | ABC Corp | USA | Electronics | Need 1000 units | new | 2025-11-24
   ```

---

### Step 2: Install Google Apps Script

1. **Open Apps Script Editor:**
   - In your Google Sheet, click: **Extensions** → **Apps Script**

2. **Delete existing code:**
   - Select all code in the editor (Ctrl+A / Cmd+A)
   - Delete it

3. **Paste the script:**
   - Open `google-sheets-sync.gs` file
   - Copy ALL the code
   - Paste into Apps Script editor

4. **Configure the script:**
   - Find the `CONFIG` section at the top
   - Update these values:
   
   ```javascript
   const CONFIG = {
     API_URL: 'https://yourdomain.com/server/sync-google-sheet.php',  // ← Your domain
     API_KEY: 'your-secret-api-key-here-change-this',                  // ← Create a strong key
     SHEET_NAME: 'Sheet1',                                              // ← Your sheet name
     // ... rest stays the same
   };
   ```

5. **Save the script:**
   - Click the **Save** icon (💾) or press Ctrl+S / Cmd+S
   - Give your project a name (e.g., "Inquiry Sync")

---

### Step 3: Set Up PHP API Endpoint

1. **Upload PHP file:**
   - Upload `sync-google-sheet.php` to your server
   - Location: `https://yourdomain.com/server/sync-google-sheet.php`

2. **Update API Key:**
   - Open `sync-google-sheet.php`
   - Find line: `define('API_KEY', 'your-secret-api-key-here-change-this');`
   - Change to match the key in your Google Script
   - **IMPORTANT:** Use a strong, unique key!

3. **Verify database connection:**
   - The script uses `db_config.php` for database connection
   - Make sure your database credentials are correct

4. **Test the endpoint:**
   - Visit: `https://yourdomain.com/server/sync-google-sheet.php`
   - You should see: `{"success":false,"message":"Method not allowed. Use POST."}`
   - This confirms the file is accessible

---

### Step 4: Set Up Trigger in Google Sheets

1. **Open Triggers:**
   - In Apps Script editor, click the **Clock icon** (⏰) on the left sidebar
   - Or go to: **Triggers** in the left menu

2. **Add New Trigger:**
   - Click **+ Add Trigger** (bottom right)

3. **Configure Trigger:**
   - **Choose which function to run:** `onEdit`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On edit`
   - **Failure notification settings:** `Notify me immediately`

4. **Save Trigger:**
   - Click **Save**
   - You may need to authorize the script:
     - Click **Review permissions**
     - Choose your Google account
     - Click **Advanced** → **Go to [Project Name] (unsafe)**
     - Click **Allow**

---

### Step 5: Add Custom Menu (Optional but Recommended)

1. **Refresh your Google Sheet:**
   - Close and reopen the sheet
   - Or reload the page (F5)

2. **You should see a new menu:**
   - Look for **📊 Inquiry Sync** in the menu bar
   - This menu provides:
     - 🔄 Sync All Rows - Manually sync all existing data
     - 🧪 Test API Connection - Verify everything works
     - 📋 View Logs - See sync activity

---

## ✅ Testing

### Test 1: API Connection

1. In Google Sheets, click: **📊 Inquiry Sync** → **🧪 Test API Connection**
2. You should see: "Success! API connection is working correctly."
3. Check your database - you should see a test inquiry

### Test 2: Add New Row

1. Add a new row to your sheet with valid data:
   ```
   Jane Smith | jane@example.com | +9876543210 | Contact | XYZ Ltd | UK | General | Test message | new | 2025-11-24
   ```

2. Wait a few seconds

3. Check your database - the new inquiry should appear

4. Check the admin panel - it should show in the inquiries table

### Test 3: Sync All Existing Rows

1. Click: **📊 Inquiry Sync** → **🔄 Sync All Rows**
2. Wait for completion message
3. Verify all rows are in your database

### Test 4: View Logs

1. Click: **📊 Inquiry Sync** → **📋 View Logs**
2. Check for any errors
3. Verify successful sync messages

---

## 🔧 Troubleshooting

### Issue: "Invalid API key"

**Solution:**
- Make sure API_KEY in Google Script matches API_KEY in PHP file
- Both should be identical, case-sensitive

### Issue: "Failed to sync"

**Solution:**
1. Check View Logs in Google Sheets
2. Verify API_URL is correct (include https://)
3. Test the PHP endpoint directly
4. Check PHP error logs on server

### Issue: "Duplicate entries"

**Solution:**
- The script checks for duplicate emails
- If email exists, it updates the record instead of creating new
- To allow duplicates, remove the duplicate check in PHP

### Issue: Trigger not firing

**Solution:**
1. Go to Apps Script → Triggers
2. Delete existing trigger
3. Create new trigger following Step 4
4. Make sure you authorized the script

### Issue: "Column not found"

**Solution:**
- Verify column order matches CONFIG.COLUMNS in script
- Column A = Name, B = Email, etc.
- Update COLUMNS mapping if your layout is different

### Issue: Database connection failed

**Solution:**
1. Check `db_config.php` credentials
2. Verify database exists
3. Run migration: `php server/add_inquiry_status_column.php`
4. Check MySQL user permissions

---

## 📝 Column Mapping Reference

| Google Sheet Column | Database Field | Required | Valid Values |
|---------------------|----------------|----------|--------------|
| Name (A) | name/contact_person | ✅ Yes | Any text |
| Email (B) | email | ✅ Yes | Valid email |
| Phone (C) | phone | No | Any format |
| Inquiry Type (D) | type | No | buyer, manufacturer, contact |
| Company (E) | company_name | No | Any text |
| Country (F) | country | No | Any text |
| Category (G) | product_category | No | Any text |
| Message (H) | requirements/requirement | No | Any text |
| Status (I) | status | No | new, contacted, in_progress, closed, dead_lead |
| Submitted At (J) | created_at | No | Date/time |

---

## 🔐 Security Notes

1. **Change the API Key:**
   - Never use the default key
   - Use a strong, random string
   - Keep it secret!

2. **HTTPS Required:**
   - Always use HTTPS for your API endpoint
   - Never use HTTP in production

3. **Database Security:**
   - Use prepared statements (already implemented)
   - Validate all input (already implemented)
   - Keep database credentials secure

---

## 📧 Email Notifications

The system sends email notifications to `info@imoexo.com` when:
- New inquiry is created
- Existing inquiry is updated

To disable notifications:
- Comment out the `sendNotificationEmail()` call in `sync-google-sheet.php`

---

## 🎉 Success Checklist

- [ ] Google Sheet has correct column headers
- [ ] Apps Script is installed and configured
- [ ] API_KEY matches in both Google Script and PHP
- [ ] PHP file is uploaded to server
- [ ] Database migration is complete (status column exists)
- [ ] Trigger is set up and authorized
- [ ] Test API Connection shows success
- [ ] Test row syncs successfully
- [ ] Data appears in admin panel

---

## 📞 Support

If you encounter issues:

1. **Check Logs:**
   - Google Sheets: 📊 Inquiry Sync → 📋 View Logs
   - PHP: Check server error logs

2. **Verify Configuration:**
   - API_URL is correct
   - API_KEY matches
   - Database credentials are correct

3. **Test Components:**
   - Test API Connection in Google Sheets
   - Visit PHP endpoint in browser
   - Check database connection

---

**🎊 Congratulations!** Your Google Sheets to PHP MySQL auto-sync is now set up and running!
