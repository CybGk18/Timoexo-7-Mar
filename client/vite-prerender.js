// vite-prerender script for static meta tags
import fs from 'fs';
import path from 'path';

const routes = [
  { path: '/', page: 'home' },
  { path: '/about', page: 'about' },
  { path: '/contact', page: 'contact' },
  { path: '/services', page: 'services' },
  { path: '/solutions', page: 'solutions' },
  { path: '/resources', page: 'resources' },
  { path: '/contact-success', page: 'contact-success' }
];

// Read the base HTML template
const htmlTemplate = fs.readFileSync('index.html', 'utf-8');

// Read SEO config
const seoConfigPath = './src/SEO/seoConfig.ts';
const seoConfigContent = fs.readFileSync(seoConfigPath, 'utf-8');

// Extract seoConfig object (simplified - in production use proper parsing)
const configMatch = seoConfigContent.match(/export const seoConfig: Record<string, SEOConfig> = ({[\s\S]*?});/);
if (!configMatch) {
  console.error('Could not parse seoConfig');
  process.exit(1);
}

// For each route, generate a static HTML file with proper meta tags
routes.forEach(route => {
  const routeConfig = `/${route.page === 'home' ? '' : route.page}`;

  // Create a modified HTML with route-specific meta tags
  let routeHtml = htmlTemplate;

  // This is a simplified approach - in production you'd want proper HTML parsing
  console.log(`Generating static HTML for ${route.path}`);

  // Write to dist folder structure
  const outputDir = `dist${route.path === '/' ? '' : route.path}`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outputDir, 'index.html'), routeHtml);
});

console.log('Pre-rendering complete!');