import { copyFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n📄 Copying .htaccess to dist...\n');

// Copy .htaccess from client/public to dist
const htaccessSrc = path.join(__dirname, 'client', 'public', '.htaccess');
const htaccessDest = path.join(__dirname, 'dist', '.htaccess');

if (existsSync(htaccessSrc)) {
    try {
        copyFileSync(htaccessSrc, htaccessDest);
        console.log('✓ Copied .htaccess to dist/');
    } catch (error) {
        console.error('✗ Failed to copy .htaccess:', error.message);
    }
} else {
    console.warn('⚠ .htaccess not found in client/public/');
}

console.log('\n✅ .htaccess copy complete!\n');
