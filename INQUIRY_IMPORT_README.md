# Inquiry Import Template

This CSV file can be used as a template for importing inquiries into the admin panel.

## How to Use

1. Open this file in Excel or any spreadsheet application
2. Fill in your inquiry data following the example rows
3. Save the file (Excel will convert it to .xlsx format)
4. In the admin panel, go to Inquiries page
5. Click the "Import" button
6. Select your Excel file
7. All valid inquiries will be imported automatically

## Column Descriptions

- **Name**: Contact person's full name (Required)
- **Email**: Valid email address (Required)
- **Phone**: Phone number with country code
- **Type**: One of: Buyer, Manufacturer, Contact
- **Company**: Company or organization name
- **Country**: Country name
- **Category**: Product category or industry
- **Message**: Inquiry message or requirements
- **Status**: One of: new, contacted, in_progress, closed, dead_lead

## Important Notes

- Name and Email are required fields
- Type will default to "Contact" if not specified
- Status will default to "new" if not specified
- You can delete the example rows and add your own data
- The import will skip any rows with invalid data and show errors
- Column names are case-insensitive (Name, name, NAME all work)

## Example Data

The template includes 5 sample inquiries showing different types and statuses.
Feel free to modify or delete these examples.
