import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPublishedPlaces, CLARE_REGIONS } from '../src/data/clareData';

// Resolve current directory for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// Base Site URL: Use process.env.VITE_SITE_URL or process.env.APP_URL
const rawSiteUrl = process.env.VITE_SITE_URL || process.env.APP_URL;

if (!rawSiteUrl || rawSiteUrl.includes('YOUR-DOMAIN-HERE.com')) {
  console.warn('\n⚠️ [SEO BUILD WARNING] VITE_SITE_URL is not set in environment.');
  console.warn('⚠️ Sitemap and canonical URLs are using default production domain (https://discoverclare.ie).');
  console.warn('⚠️ To override for production deployment, set VITE_SITE_URL="https://your-custom-domain.ie".\n');
}

const SITE_URL = (rawSiteUrl && !rawSiteUrl.includes('YOUR-DOMAIN-HERE.com'))
  ? rawSiteUrl.trim().replace(/\/+$/, '')
  : 'https://discoverclare.ie';

function getCanonicalUrl(routePath: string): string {
  if (!routePath || routePath === '/') return `${SITE_URL}/`;
  const cleanPath = routePath.split('?')[0].split('#')[0].replace(/^\/+/, '').replace(/\/+$/, '');
  return `${SITE_URL}/${cleanPath}`;
}

// Current date in YYYY-MM-DD format for sitemap lastmod
const TODAY = new Date().toISOString().split('T')[0];

console.log('🔍 Starting Discover Clare SEO build-time audit and asset generator...');
console.log(`🌐 Configured Base Site URL: ${SITE_URL}`);

// 1. DATASET VALIDATION (Published Places Only)
console.log('\n--- Step 1: Validating Dataset Integrity ---');

const publishedPlaces = getPublishedPlaces();

// Validate Slugs Uniqueness & Format
const seenSlugs = new Set<string>();
const slugFormatRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

for (const place of publishedPlaces) {
  if (!place.slug || typeof place.slug !== 'string') {
    throw new Error(`[FATAL SEO ERROR] Place "${place.name}" (ID: ${place.id}) is missing a valid slug!`);
  }
  if (!slugFormatRegex.test(place.slug)) {
    throw new Error(`[FATAL SEO ERROR] Place "${place.name}" has an invalid slug format: "${place.slug}". Must be lowercase kebab-case.`);
  }
  if (seenSlugs.has(place.slug)) {
    throw new Error(`[FATAL SEO ERROR] Duplicate place slug detected: "${place.slug}" for place "${place.name}"!`);
  }
  seenSlugs.add(place.slug);

  // Validate coordinates
  if (!place.coordinates || typeof place.coordinates.lat !== 'number' || typeof place.coordinates.lng !== 'number') {
    throw new Error(`[FATAL SEO ERROR] Place "${place.name}" has invalid geographic coordinates!`);
  }
  if (place.coordinates.lat < 52.0 || place.coordinates.lat > 53.5 || place.coordinates.lng < -10.5 || place.coordinates.lng > -8.0) {
    throw new Error(`[FATAL SEO ERROR] Place "${place.name}" coordinates (${place.coordinates.lat}, ${place.coordinates.lng}) are outside County Clare bounds!`);
  }
}

console.log(`✅ All ${publishedPlaces.length} published place records validated successfully (Unique slugs, valid formats & coordinates).`);

// 2. BUILD SITEMAP URL COLLECTION
console.log('\n--- Step 2: Generating Sitemaps & URLs ---');

interface SitemapEntry {
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod: string;
}

const sitemapEntries: SitemapEntry[] = [];

// A. Static Core Routes
const staticRoutes: { path: string; priority: string; changefreq: SitemapEntry['changefreq'] }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/explore', priority: '0.9', changefreq: 'weekly' },
  { path: '/attractions', priority: '0.8', changefreq: 'weekly' },
  { path: '/things-to-do', priority: '0.8', changefreq: 'weekly' },
  { path: '/food-drink', priority: '0.8', changefreq: 'weekly' },
  { path: '/stay', priority: '0.8', changefreq: 'weekly' },
  { path: '/events', priority: '0.8', changefreq: 'weekly' },
  { path: '/regions', priority: '0.8', changefreq: 'weekly' },
  { path: '/hidden-gems', priority: '0.8', changefreq: 'weekly' },
  { path: '/plan-your-trip', priority: '0.8', changefreq: 'weekly' },
  { path: '/share-your-clare', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/suggest-a-place', priority: '0.6', changefreq: 'monthly' }
];

for (const route of staticRoutes) {
  sitemapEntries.push({
    loc: getCanonicalUrl(route.path),
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: TODAY
  });
}

// B. Regional Routes
for (const region of CLARE_REGIONS) {
  sitemapEntries.push({
    loc: getCanonicalUrl(`/regions/${region.id}`),
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: TODAY
  });
}

// C. Place Detail Routes (Published Listings Only)
for (const place of publishedPlaces) {
  sitemapEntries.push({
    loc: getCanonicalUrl(`/places/${place.slug}`),
    changefreq: 'monthly',
    priority: place.isMajor ? '0.9' : '0.8',
    lastmod: TODAY
  });
}

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Construct XML Sitemap
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent, 'utf8');
console.log(`✅ Generated public/sitemap.xml with ${sitemapEntries.length} verified URLs.`);

// 3. GENERATE ROBOTS.TXT
console.log('\n--- Step 3: Generating robots.txt ---');

const robotsContent = `# Discover Clare - Crawler Directives
User-agent: *
Allow: /

# Prevent crawl engines from wasting crawl budget on dynamic query combinations
Disallow: /*?*

# Sitemap index location
Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf8');
console.log(`✅ Generated public/robots.txt pointing to ${SITE_URL}/sitemap.xml.`);

console.log('\n🎉 SEO Build-time Generation Completed Successfully!\n');
