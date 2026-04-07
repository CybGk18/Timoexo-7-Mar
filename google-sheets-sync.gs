/**
 * Google Apps Script for Auto-Syncing Inquiries to PHP Backend
 * 
 * This script automatically sends new inquiry data from Google Sheets
 * to your PHP API endpoint when a new row is added.
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Update the CONFIG section below with your details
 * 6. Save the script (Ctrl+S or Cmd+S)
 * 7. Set up trigger (see instructions at bottom)
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Your PHP API endpoint URL
  API_URL: 'https://yourdomain.com/server/sync-google-sheet.php',
  
  // API Key for security (must match the key in PHP file)
  API_KEY: 'your-secret-api-key-here-change-this',
  
  // Sheet name (usually "Sheet1" or the name of your tab)
  SHEET_NAME: 'Sheet1',
  
  // Column mapping (1-based index, A=1, B=2, etc.)
  COLUMNS: {
    NAME: 1,           // Column A
    EMAIL: 2,          // Column B
    PHONE: 3,          // Column C
    TYPE: 4,           // Column D (Inquiry Type)
    COMPANY: 5,        // Column E
    COUNTRY: 6,        // Column F
    CATEGORY: 7,       // Column G
    MESSAGE: 8,        // Column H
    STATUS: 9,         // Column I
    SUBMITTED_AT: 10   // Column J
  },
  
  // Starting row (2 = skip header row)
  HEADER_ROW: 1,
  DATA_START_ROW: 2
};

// ==================== MAIN FUNCTIONS ====================

/**
 * Trigger function that runs when sheet is edited
 * This is the function you'll set up in the trigger
 */
function onEdit(e) {
  try {
    const sheet = e.source.getActiveSheet();
    
    // Only process if it's the correct sheet
    if (sheet.getName() !== CONFIG.SHEET_NAME) {
      Logger.log('Edit was in different sheet, ignoring');
      return;
    }
    
    const range = e.range;
    const row = range.getRow();
    
    // Only process if edit is in data rows (not header)
    if (row < CONFIG.DATA_START_ROW) {
      Logger.log('Edit was in header row, ignoring');
      return;
    }
    
    // Check if this is a new row or significant edit
    const rowData = getRowData(sheet, row);
    
    // Only sync if we have at least name and email
    if (rowData.name && rowData.email) {
      Logger.log('Valid data found, syncing row ' + row);
      syncRowToAPI(rowData, row);
    } else {
      Logger.log('Incomplete data in row ' + row + ', skipping sync');
    }
    
  } catch (error) {
    Logger.log('Error in onEdit: ' + error.toString());
    logError('onEdit', error);
  }
}

/**
 * Manual function to sync all rows
 * Run this once to sync existing data
 */
function syncAllRows() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    const lastRow = sheet.getLastRow();
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let row = CONFIG.DATA_START_ROW; row <= lastRow; row++) {
      const rowData = getRowData(sheet, row);
      
      if (rowData.name && rowData.email) {
        const success = syncRowToAPI(rowData, row);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }
        
        // Add small delay to avoid rate limiting
        Utilities.sleep(500);
      }
    }
    
    Logger.log('Sync complete: ' + successCount + ' successful, ' + errorCount + ' errors');
    SpreadsheetApp.getUi().alert(
      'Sync Complete',
      successCount + ' rows synced successfully\n' + errorCount + ' errors',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    
  } catch (error) {
    Logger.log('Error in syncAllRows: ' + error.toString());
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}

/**
 * Test function to verify API connection
 */
function testAPIConnection() {
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      type: 'contact',
      company: 'Test Company',
      country: 'USA',
      category: 'Test',
      message: 'This is a test inquiry from Google Sheets',
      status: 'new',
      submitted_at: new Date().toISOString()
    };
    
    const success = syncRowToAPI(testData, 'TEST');
    
    if (success) {
      SpreadsheetApp.getUi().alert(
        'Success!',
        'API connection is working correctly.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    } else {
      SpreadsheetApp.getUi().alert(
        'Error',
        'API connection failed. Check the logs (View > Logs)',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
    }
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get data from a specific row
 */
function getRowData(sheet, row) {
  const cols = CONFIG.COLUMNS;
  
  return {
    name: getCellValue(sheet, row, cols.NAME),
    email: getCellValue(sheet, row, cols.EMAIL),
    phone: getCellValue(sheet, row, cols.PHONE),
    type: normalizeInquiryType(getCellValue(sheet, row, cols.TYPE)),
    company: getCellValue(sheet, row, cols.COMPANY),
    country: getCellValue(sheet, row, cols.COUNTRY),
    category: getCellValue(sheet, row, cols.CATEGORY),
    message: getCellValue(sheet, row, cols.MESSAGE),
    status: normalizeStatus(getCellValue(sheet, row, cols.STATUS)),
    submitted_at: formatDate(getCellValue(sheet, row, cols.SUBMITTED_AT))
  };
}

/**
 * Get cell value safely
 */
function getCellValue(sheet, row, col) {
  try {
    const value = sheet.getRange(row, col).getValue();
    return value ? value.toString().trim() : '';
  } catch (error) {
    return '';
  }
}

/**
 * Normalize inquiry type to match database values
 */
function normalizeInquiryType(type) {
  if (!type) return 'contact';
  
  const normalized = type.toLowerCase().trim();
  
  if (normalized.includes('buyer')) return 'buyer';
  if (normalized.includes('manufacturer')) return 'manufacturer';
  if (normalized.includes('contact')) return 'contact';
  
  return 'contact'; // default
}

/**
 * Normalize status to match database values
 */
function normalizeStatus(status) {
  if (!status) return 'new';
  
  const normalized = status.toLowerCase().trim().replace(/\s+/g, '_');
  
  const validStatuses = ['new', 'contacted', 'in_progress', 'closed', 'dead_lead'];
  
  if (validStatuses.includes(normalized)) {
    return normalized;
  }
  
  return 'new'; // default
}

/**
 * Format date for database
 */
function formatDate(dateValue) {
  if (!dateValue) {
    return new Date().toISOString();
  }
  
  try {
    const date = new Date(dateValue);
    return date.toISOString();
  } catch (error) {
    return new Date().toISOString();
  }
}

/**
 * Send data to PHP API
 */
function syncRowToAPI(rowData, rowNumber) {
  try {
    const payload = {
      api_key: CONFIG.API_KEY,
      data: rowData,
      source: 'google_sheets',
      row_number: rowNumber
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    Logger.log('Sending to API: ' + JSON.stringify(payload));
    
    const response = UrlFetchApp.fetch(CONFIG.API_URL, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    Logger.log('API Response Code: ' + responseCode);
    Logger.log('API Response: ' + responseText);
    
    if (responseCode === 200) {
      const result = JSON.parse(responseText);
      if (result.success) {
        Logger.log('Row ' + rowNumber + ' synced successfully. ID: ' + result.id);
        return true;
      } else {
        Logger.log('API returned error: ' + result.message);
        return false;
      }
    } else {
      Logger.log('HTTP Error: ' + responseCode);
      return false;
    }
    
  } catch (error) {
    Logger.log('Error syncing row ' + rowNumber + ': ' + error.toString());
    logError('syncRowToAPI', error);
    return false;
  }
}

/**
 * Log errors to a separate sheet (optional)
 */
function logError(functionName, error) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let errorSheet = ss.getSheetByName('Sync Errors');
    
    // Create error sheet if it doesn't exist
    if (!errorSheet) {
      errorSheet = ss.insertSheet('Sync Errors');
      errorSheet.appendRow(['Timestamp', 'Function', 'Error Message']);
    }
    
    errorSheet.appendRow([
      new Date().toISOString(),
      functionName,
      error.toString()
    ]);
    
  } catch (e) {
    // If we can't log the error, just continue
    Logger.log('Could not log error to sheet: ' + e.toString());
  }
}

// ==================== MENU FUNCTIONS ====================

/**
 * Create custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📊 Inquiry Sync')
    .addItem('🔄 Sync All Rows', 'syncAllRows')
    .addItem('🧪 Test API Connection', 'testAPIConnection')
    .addSeparator()
    .addItem('📋 View Logs', 'showLogs')
    .addToUi();
}

/**
 * Show logs in a dialog
 */
function showLogs() {
  const logs = Logger.getLog();
  const ui = SpreadsheetApp.getUi();
  
  const html = HtmlService.createHtmlOutput(
    '<pre style="font-family: monospace; font-size: 12px;">' + 
    logs + 
    '</pre>'
  )
  .setWidth(600)
  .setHeight(400);
  
  ui.showModalDialog(html, 'Sync Logs');
}
