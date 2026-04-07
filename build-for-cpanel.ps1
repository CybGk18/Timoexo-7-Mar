#!/bin/bash

echo "🚀 Starting T-Imoexo Production Build..."

# Clean previous build
echo "🧹 Cleaning previous build..."
Remove-Item -Path ".\dist" -Recurse -Force -ErrorAction SilentlyContinue

# Build the React app
echo "⚛️ Building React application..."
npx vite build --mode production

# Check if build succeeded
if (Test-Path ".\dist\index.html") {
    echo "✅ Build successful!"
    
    # Copy SEO files
    echo "📄 Copying SEO files..."
    if (Test-Path ".\client\about.html") {
        Copy-Item ".\client\about.html" ".\dist\" -Force
        Copy-Item ".\client\contact.html" ".\dist\" -Force
        Copy-Item ".\client\services.html" ".\dist\" -Force
        Copy-Item ".\client\solutions.html" ".\dist\" -Force
        Copy-Item ".\client\resources.html" ".\dist\" -Force
        Copy-Item ".\client\privacy-policy.html" ".\dist\" -Force
        Copy-Item ".\client\terms-and-conditions.html" ".\dist\" -Force
    }
    
    # Create .htaccess file
    echo "⚙️ Creating .htaccess..."
    $htaccessContent = @"
RewriteEngine On

# Set proper MIME types for JavaScript modules
<FilesMatch "\.(js|mjs)$">
    Header set Content-Type "text/javascript; charset=utf-8"
</FilesMatch>

AddType text/javascript .js
AddType text/css .css
AddType application/json .json

# Handle SEO pages
RewriteRule ^about/?$ about.html [L,QSA]
RewriteRule ^contact/?$ contact.html [L,QSA]
RewriteRule ^services/?$ services.html [L,QSA]
RewriteRule ^solutions/?$ solutions.html [L,QSA]
RewriteRule ^resources/?$ resources.html [L,QSA]
RewriteRule ^privacy-policy/?$ privacy-policy.html [L,QSA]
RewriteRule ^terms-and-conditions/?$ terms-and-conditions.html [L,QSA]

# Serve assets directly
RewriteCond %{REQUEST_URI} ^/assets/
RewriteRule ^(.*)$ $1 [L]

# React Router fallback
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/assets/
RewriteCond %{REQUEST_URI} !\.html$
RewriteRule . /index.html [L]
"@
    
    Set-Content -Path ".\dist\.htaccess" -Value $htaccessContent
    
    echo "🎉 Build completed successfully!"
    echo "📁 Files ready for cPanel deployment in .\dist folder"
    
    # List what was built
    echo "📋 Built files:"
    Get-ChildItem ".\dist" | Select-Object Name, Length | Format-Table
    
} else {
    echo "❌ Build failed! Check the errors above."
}
