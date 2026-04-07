import { readFileSync, writeFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const clientDir = path.join(__dirname, 'client');

console.log('\n🔧 Post-build: Updating HTML files with compiled assets...\n');

// Read the compiled index.html to extract asset references
const indexHtmlPath = path.join(distDir, 'index.html');
const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

// Extract the compiled JS and CSS file names from index.html
const jsMatch = indexHtml.match(/<script[^>]*src="([^"]*\.js)"[^>]*>/);
const cssMatch = indexHtml.match(/<link[^>]*href="([^"]*\.css)"[^>]*>/);

if (!jsMatch || !cssMatch) {
    console.error('❌ Could not find compiled JS or CSS files in index.html');
    process.exit(1);
}

const compiledJs = jsMatch[1];
const compiledCss = cssMatch[1];

console.log(`✓ Found compiled JS: ${compiledJs}`);
console.log(`✓ Found compiled CSS: ${compiledCss}`);

// List of SEO HTML files to update
const seoFiles = [
    'about.html',
    'services.html',
    'solutions.html',
    'resources.html',
    'contact.html',
    'privacy-policy.html',
    'terms-and-conditions.html'
];

seoFiles.forEach(filename => {
    const sourcePath = path.join(clientDir, filename);
    const destPath = path.join(distDir, filename);

    try {
        // Read the source HTML file
        let html = readFileSync(sourcePath, 'utf-8');

        // Some route files are stored as SEO fragments only.
        // Wrap them into a full HTML document so direct requests still render the SPA.
        if (!/<html\b/i.test(html)) {
            html = `<!doctype html>\n<html lang="en">\n  <head>\n${html.trim()}\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>\n`;
        }

        // Remove Vite development scripts
        html = html.replace(/<script type="module">import.*?<\/script>\s*/gs, '');
        html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>\s*/g, '');
        html = html.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/g, '');

        // Add the compiled CSS before </head>
        html = html.replace('</head>', `    <link rel="stylesheet" href="${compiledCss}">\n  </head>`);

        // Add the compiled JS before </body>
        html = html.replace('</body>', `    <script type="module" src="${compiledJs}"></script>\n  </body>`);

        // Write the updated HTML to dist
        writeFileSync(destPath, html, 'utf-8');
        console.log(`✓ Updated ${filename} with compiled assets`);

    } catch (error) {
        console.error(`✗ Failed to process ${filename}:`, error.message);
    }
});

console.log('\n✅ All SEO HTML files updated successfully!\n');
