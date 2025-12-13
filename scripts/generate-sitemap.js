const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://digindominic.me';

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects/', changefreq: 'weekly', priority: '0.9' },
  { path: '/publications/', changefreq: 'weekly', priority: '0.9' },
  { path: '/blog/', changefreq: 'weekly', priority: '0.9' },
  { path: '/about/', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact/', changefreq: 'monthly', priority: '0.8' },
];

function getContentSlugs(contentType) {
  const contentDir = path.join(__dirname, '..', 'content', contentType);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  // Get dynamic content
  const projectSlugs = getContentSlugs('projects');
  const blogSlugs = getContentSlugs('blog');

  // Build URL entries
  let urls = '';

  // Add static pages
  staticPages.forEach(page => {
    urls += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
  });

  // Add project pages
  projectSlugs.forEach(slug => {
    urls += `  <url>
    <loc>${SITE_URL}/projects/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  // Add blog pages
  blogSlugs.forEach(slug => {
    urls += `  <url>
    <loc>${SITE_URL}/blog/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  // Write to public folder
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);

  console.log(`✓ Sitemap generated with ${staticPages.length + projectSlugs.length + blogSlugs.length} URLs`);
  console.log(`  - ${staticPages.length} static pages`);
  console.log(`  - ${projectSlugs.length} projects`);
  console.log(`  - ${blogSlugs.length} blog posts`);
}

generateSitemap();
