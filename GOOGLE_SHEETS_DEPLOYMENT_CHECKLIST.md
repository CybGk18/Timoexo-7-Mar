# Google Sheets Sync - Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Get Your Domain URL
- [ ] Find where you'll upload the PHP file
- [ ] Example: `https://imoexo.com/server/sync-google-sheet.php`
- [ ] Or: `https://www.yourdomain.com/server/sync-google-sheet.php`

### 2. Create API Key
- [ ] Generate a strong, random API key
- [ ] Example: `MyCompany2024!SecretKey#XYZ789`
- [ ] Keep it secret and secure!

### 3. Check Google Sheet
- [ ] Open your Google Sheet
- [ ] Note the tab name (e.g., "Sheet1", "Inquiries", etc.)
- [ ] Verify columns are in correct order:
  ```
  A: Name
  B: Email
  C: Phone
  D: Inquiry Type
  E: Company
  F: Country
  G: Category
  H: Message
  I: Status
  J: Submitted At
  ```

---

## 🔧 Configuration Steps

### Step 1: Update Google Apps Script

1. **Open Google Sheet**
   - Go to: Extensions → Apps Script

2. **Paste the code**
   - Copy all code from `google-sheets-sync.gs`
   - Paste into Apps Script editor

3. **Update CONFIG (around line 20):**
   ```javascript
   const CONFIG = {
     API_URL: 'https://YOUR-DOMAIN.com/server/sync-google-sheet.php',  // ← Your URL
     API_KEY: 'YOUR-SECRET-API-KEY',                                     // ← Your key
     SHEET_NAME: 'Sheet1',                                               // ← Your tab name
     // ... rest stays the same
   };
   ```

4. **Save**
   - Click Save icon or Ctrl+S
   - Name: "Inquiry Sync"

---

### Step 2: Update PHP File

1. **Open file:** `server/sync-google-sheet.php`

2. **Find line 27:**
   ```php
   define('API_KEY', 'your-secret-api-key-here-change-this');
   ```

3. **Change to:**
   ```php
   define('API_KEY', 'YOUR-SECRET-API-KEY');  // ← MUST match Google Script!
   ```

4. **Save the file**

---

### Step 3: Upload PHP File

- [ ] Upload `sync-google-sheet.php` to your server
- [ ] Location: `/server/` folder
- [ ] Full URL should be: `https://yourdomain.com/server/sync-google-sheet.php`

---

### Step 4: Run Database Migration

**IMPORTANT:** Make sure status column exists!

```bash
# Option 1: Via browser
https://yourdomain.com/server/add_inquiry_status_column.php

# Option 2: Via command line
cd server
php add_inquiry_status_column.php
```

You should see:
```
✓ Adding status column to buyer_inquiries table...
✓ Adding status column to manufacturer_inquiries table...
✓ Adding status column to contact_submissions table...
✅ Migration completed successfully!
```

---

### Step 5: Set Up Trigger

1. **In Apps Script editor:**
   - Click Clock icon ⏰ (Triggers)
   - Click "+ Add Trigger"

2. **Configure:**
   - Function: `onEdit`
   - Deployment: `Head`
   - Event source: `From spreadsheet`
   - Event type: `On edit`
   - Failure notifications: `Notify me immediately`

3. **Save & Authorize:**
   - Click Save
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"

---

## 🧪 Testing

### Test 1: API Connection
1. Refresh your Google Sheet
2. Look for menu: **📊 Inquiry Sync**
3. Click: **🧪 Test API Connection**
4. Should see: "Success! API connection is working correctly."

### Test 2: Add Test Row
1. Add a new row with data:
   ```
   John Test | test@example.com | +1234567890 | Contact | Test Co | USA | General | Test message | new | 2025-11-24
   ```
2. Wait 2-3 seconds
3. Check your database - should see new inquiry
4. Check admin panel - should appear there too

### Test 3: Check Logs
1. Click: **📊 Inquiry Sync** → **📋 View Logs**
2. Should see: "Row X synced successfully. ID: XXX"

---

## 🔍 Verification Checklist

- [ ] PHP file uploaded to server
- [ ] PHP file accessible (visit URL, should see "Method not allowed")
- [ ] Database migration completed (status column exists)
- [ ] API_KEY matches in both files
- [ ] Google Apps Script saved
- [ ] Trigger created and authorized
- [ ] Custom menu appears in Google Sheets
- [ ] Test API Connection shows success
- [ ] Test row syncs to database
- [ ] Data appears in admin panel
- [ ] Email notification received

---

## 📝 Your Configuration

**Fill this out for reference:**

```
Domain URL: _________________________________

API Key: ____________________________________

Sheet Name: _________________________________

Database Name: ______________________________

Email for notifications: ____________________
```

---

## ⚠️ Common Issues

### "Invalid API key"
→ API_KEY in Google Script ≠ API_KEY in PHP
→ Make sure they match EXACTLY (case-sensitive)

### "404 Not Found"
→ Check API_URL in Google Script
→ Make sure file is uploaded to correct location

### "No menu appearing"
→ Refresh the Google Sheet
→ Or close and reopen it

### "Trigger not firing"
→ Go to Triggers, delete and recreate
→ Make sure you authorized the script

---

## 🎉 Success!

When everything works:
- ✅ New rows sync automatically
- ✅ Data appears in database instantly
- ✅ Admin panel shows inquiries
- ✅ Email notifications arrive
- ✅ No errors in logs

---

## 📞 Need Help?

1. Check logs: 📊 Inquiry Sync → 📋 View Logs
2. Check PHP error logs on server
3. Verify all configuration values
4. Review GOOGLE_SHEETS_SYNC_SETUP.md

---

**Last Updated:** 2025-11-24
