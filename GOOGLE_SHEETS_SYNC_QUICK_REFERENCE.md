# Google Sheets Auto-Sync - Quick Reference

## 🎯 Quick Setup (5 Minutes)

### 1. Google Sheet Setup
```
Column Order: Name | Email | Phone | Type | Company | Country | Category | Message | Status | Submitted At
```

### 2. Install Apps Script
1. Extensions → Apps Script
2. Paste code from `google-sheets-sync.gs`
3. Update CONFIG:
   - `API_URL`: `https://yourdomain.com/server/sync-google-sheet.php`
   - `API_KEY`: `your-unique-secret-key-123456`
4. Save (Ctrl+S)

### 3. Upload PHP File
1. Upload `sync-google-sheet.php` to `/server/` folder
2. Update API_KEY to match Google Script
3. Verify: Visit URL, should see "Method not allowed"

### 4. Create Trigger
1. Apps Script → Clock icon ⏰
2. Add Trigger:
   - Function: `onEdit`
   - Event: `On edit`
3. Authorize when prompted

### 5. Test
1. 📊 Inquiry Sync → 🧪 Test API Connection
2. Add a test row
3. Check database

---

## 📊 JSON Structure

### Request (Google Sheets → PHP)
```json
{
  "api_key": "your-secret-key",
  "source": "google_sheets",
  "row_number": 2,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "type": "buyer",
    "company": "ABC Corp",
    "country": "USA",
    "category": "Electronics",
    "message": "Need 1000 units",
    "status": "new",
    "submitted_at": "2025-11-24T10:30:00Z"
  }
}
```

### Response (PHP → Google Sheets)
```json
{
  "success": true,
  "message": "Inquiry created successfully",
  "id": 123,
  "type": "buyer",
  "action": "created"
}
```

---

## 🔑 Valid Values

### Inquiry Type
- `buyer` → buyer_inquiries table
- `manufacturer` → manufacturer_inquiries table
- `contact` → contact_submissions table

### Status
- `new` (default)
- `contacted`
- `in_progress`
- `closed`
- `dead_lead`

---

## 🛠️ Useful Commands

### Test API from Command Line
```bash
curl -X POST https://yourdomain.com/server/sync-google-sheet.php \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "your-secret-key",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "type": "contact"
    }
  }'
```

### View Google Apps Script Logs
```
Apps Script Editor → View → Logs
```

### Manual Sync All Rows
```
Google Sheets → 📊 Inquiry Sync → 🔄 Sync All Rows
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Invalid API key | Match API_KEY in both files |
| 404 Not Found | Check API_URL path |
| No data syncing | Verify trigger is set up |
| Duplicate entries | Script updates existing emails |
| Column errors | Check column order A-J |

---

## 📁 Files

1. **`google-sheets-sync.gs`** - Google Apps Script
2. **`sync-google-sheet.php`** - PHP API endpoint
3. **`GOOGLE_SHEETS_SYNC_SETUP.md`** - Full setup guide

---

## 🎯 Trigger Setup

**Function:** `onEdit`  
**Event Source:** From spreadsheet  
**Event Type:** On edit  
**Failure Notifications:** Notify me immediately

---

## 📧 Email Notifications

Sent to: `info@imoexo.com`  
When: New inquiry created or updated  
Disable: Comment out `sendNotificationEmail()` in PHP

---

## ✅ Success Indicators

- ✅ Test API Connection shows "Success!"
- ✅ New rows appear in database within seconds
- ✅ Admin panel shows synced inquiries
- ✅ Email notifications received
- ✅ Logs show "synced successfully"

---

**Need Help?** See `GOOGLE_SHEETS_SYNC_SETUP.md` for detailed instructions.
