const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const matter = require('gray-matter');

const SITE_URL = 'https://digindominic.me';
const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');

const toDay = value => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString().slice(0, 10) : null;
};

// Last time a file or folder changed in git (needs full history in CI:
// actions/checkout with fetch-depth: 0). Falls back to null if unavailable.
function gitDate(relPath) {
  try {
    return toDay(execFileSync('git', ['log', '-1', '--format=%cI', '--', relPath], { cwd: ROOT, encoding: 'utf8' }).trim());
  } catch {
    return null;
  }
}

function contentEntries(type) {
  const dir = path.join(CONTENT, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        lastmod: gitDate(`content/${type}/${file}`) || toDay(data.date),
      };
    });
}

const latest = (...dates) => dates.flat().filter(Boolean).sort().pop() || toDay(new Date());

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
}

function generateSitemap() {
  const projects = contentEntries('projects');
  const posts = contentEntries('blog');
  const projectDates = projects.map(p => p.lastmod);
  const postDates = posts.map(p => p.lastmod);

  const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: latest(projectDates, postDates, gitDate('app'), gitDate('content')) },
    { path: '/projects/', changefreq: 'weekly', priority: '0.9', lastmod: latest(projectDates, gitDate('app/projects')) },
    { path: '/publications/', changefreq: 'monthly', priority: '0.9', lastmod: latest(gitDate('content/publications'), gitDate('app/publications')) },
    { path: '/blog/', changefreq: 'monthly', priority: '0.8', lastmod: latest(postDates, gitDate('app/blog')) },
    { path: '/about/', changefreq: 'monthly', priority: '0.8', lastmod: latest(gitDate('content/about'), gitDate('app/about')) },
    { path: '/contact/', changefreq: 'yearly', priority: '0.6', lastmod: latest(gitDate('app/contact')) },
  ];

  let urls = '';
  staticPages.forEach(page => { urls += urlEntry(page.path, page.lastmod, page.changefreq, page.priority); });
  projects.forEach(p => { urls += urlEntry(`/projects/${p.slug}/`, p.lastmod || latest(), 'monthly', '0.7'); });
  posts.forEach(p => { urls += urlEntry(`/blog/${p.slug}/`, p.lastmod || latest(), 'monthly', '0.7'); });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>
`;

  fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), sitemap);
  console.log(`✓ Sitemap generated with ${staticPages.length + projects.length + posts.length} URLs`);
}

generateSitemap();
