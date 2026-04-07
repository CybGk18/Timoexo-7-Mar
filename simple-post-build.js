import fs from 'fs';
import path from 'path';

console.log('🚀 Starting simple post-build SEO setup...');

const clientDir = './client';
const distDir = './dist';

// List of SEO HTML files to copy
const seoFiles = [
    'about.html',
    'contact.html', 
    'services.html',
    'solutions.html',
    'resources.html'
];

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
    console.log('❌ Dist directory not found.');
    process.exit(1);
}

console.log('📁 Found dist directory');

// Copy each SEO HTML file to dist
seoFiles.forEach(file => {
    const sourcePath = path.join(clientDir, file);
    const destPath = path.join(distDir, file);
    
    try {
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`✅ Copied ${file}`);
        } else {
            console.log(`⚠️  ${file} not found`);
        }
    } catch (error) {
        console.log(`❌ Error copying ${file}:`, error.message);
    }
});

console.log('🎉 Post-build SEO setup completed!');