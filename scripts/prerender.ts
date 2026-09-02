import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from '../src/App';
import { getPlaceBySlug, CLARE_REGIONS, getLocalityById } from '../src/data/clareData';
import { generatePlaceJsonLd, generateBreadcrumbJsonLd, generateWebsiteJsonLd } from '../src/utils/seo';
import { SITE_NAME } from '../src/config/seo';
import {
  DocumentMetaOptions,
  resolveDocumentMeta,
  MANAGED_DATA_ATTR,
  MANAGED_ATTR_VALUE,
  JSON_LD_SCRIPT_ID
} from '../src/utils/documentMetaCore';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface PocRouteConfig {
  url: string;
  outputPath: string;
  metaOptions: DocumentMetaOptions;
}

function getPocRoutes(): PocRouteConfig[] {
  const routes: PocRouteConfig[] = [];

  // Route 1: Homepage (/)
  routes.push({
    url: '/',
    outputPath: path.resolve('dist/index.html'),
    metaOptions: {
      title: 'Discover Clare | Explore County Clare, Ireland',
      description:
        'Independent travel and discovery guide to County Clare, Ireland. Explore the Cliffs of Moher, the Burren, hidden coastal gems, traditional music pubs, Atlantic surf, walks, dining and authentic local experiences.',
      canonical: '/',
      ogTitle: 'Discover Clare | Explore County Clare, Ireland',
      ogDescription:
        'Independent travel and discovery guide to County Clare, Ireland. Explore the Cliffs of Moher, the Burren, hidden coastal gems, traditional music pubs, Atlantic surf, walks, dining and authentic local experiences.',
      type: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Discover Clare | Explore County Clare, Ireland',
      twitterDescription: 'Independent travel and discovery guide to County Clare, Ireland.',
      jsonLd: generateWebsiteJsonLd()
    }
  });

  // Route 2: Cliffs of Moher (/places/cliffs-of-moher)
  const place = getPlaceBySlug('cliffs-of-moher');
  if (!place) {
    throw new Error('POC Error: cliffs-of-moher place record not found in published catalog.');
  }

  const regionInfo = CLARE_REGIONS.find(r => r.id === place.region);
  const localityInfo = place.localityId ? getLocalityById(place.localityId) : undefined;
  const descriptiveImageAlt = place.imageAlt || `${place.name} in ${place.locationName}, County Clare`;
  const placeJsonLd = generatePlaceJsonLd(place);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Explore', url: '/explore' },
    { name: regionInfo ? regionInfo.name : 'Regions', url: regionInfo ? `/regions/${regionInfo.id}` : '/regions' },
    ...(localityInfo ? [{ name: localityInfo.name, url: `/explore?locality=${localityInfo.id}` }] : []),
    { name: place.name, url: `/places/${place.slug}` }
  ]);

  routes.push({
    url: `/places/${place.slug}`,
    outputPath: path.resolve('dist/places/cliffs-of-moher/index.html'),
    metaOptions: {
      title: place.seoTitle || `${place.name} | Discover Clare`,
      description: place.seoDescription || `${place.name} in ${place.locationName}, County Clare: ${place.tagline} Practical visitor guide, coordinates, local tips, and travel details.`,
      canonical: `/places/${place.slug}`,
      image: place.heroImage,
      imageAlt: descriptiveImageAlt,
      type: 'article',
      ogTitle: `${place.name} — Visitor Guide & Location`,
      ogDescription: place.description || place.tagline,
      twitterCard: 'summary_large_image',
      twitterTitle: `${place.name} | Discover Clare`,
      twitterDescription: place.description || place.tagline,
      jsonLd: [placeJsonLd, breadcrumbJsonLd]
    }
  });

  return routes;
}

function buildHeadTags(options: DocumentMetaOptions): string {
  const meta = resolveDocumentMeta(options);
  const tags: string[] = [];

  tags.push(`<title>${escapeHtml(meta.title)}</title>`);
  tags.push(`<meta name="description" content="${escapeHtml(meta.description)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  
  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  }

  tags.push(`<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  tags.push(`<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  tags.push(`<meta property="og:type" content="${escapeHtml(meta.ogType)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  
  if (meta.ogUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(meta.ogUrl)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  }
  
  tags.push(`<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  
  if (meta.image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(meta.image)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
    if (meta.imageAlt) {
      tags.push(`<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
    }
  }

  tags.push(`<meta name="twitter:card" content="${escapeHtml(meta.twitterCard)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.twitterTitle)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.twitterDescription)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  
  if (meta.twitterImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(meta.twitterImage)}" ${MANAGED_DATA_ATTR}="${MANAGED_ATTR_VALUE}" />`);
  }

  if (meta.jsonLd) {
    const serializedJsonLd = Array.isArray(meta.jsonLd)
      ? JSON.stringify(meta.jsonLd.length === 1 ? meta.jsonLd[0] : meta.jsonLd)
      : JSON.stringify(meta.jsonLd);
    tags.push(`<script id="${JSON_LD_SCRIPT_ID}" type="application/ld+json">${serializedJsonLd}</script>`);
  }

  return tags.join('\n    ');
}

export function prerender() {
  const startTime = performance.now();
  console.log('🚀 Starting Phase 2.5B Hybrid SSG Proof-of-Concept Prerender...');

  const templatePath = path.resolve('dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Prerender Error: Client template not found at ${templatePath}. Ensure "vite build" runs first.`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const routes = getPocRoutes();

  for (const route of routes) {
    const routeStartTime = performance.now();
    console.log(`  Rendering route: ${route.url} ...`);

    const appHtml = renderToString(
      React.createElement(
        StaticRouter,
        { location: route.url },
        React.createElement(App, null)
      )
    );

    const headTags = buildHeadTags(route.metaOptions);

    // Replace generic meta/title tags in head
    let html = template;

    // Replace generic head tags from <title> down to before <link rel="preconnect"
    const headReplaceRegex = /<title>[\s\S]*?<meta name="twitter:card" content="summary_large_image"\s*\/>/i;
    if (headReplaceRegex.test(html)) {
      html = html.replace(headReplaceRegex, headTags);
    } else {
      // Fallback: replace </head> with headTags + </head>
      html = html.replace('</head>', `    ${headTags}\n  </head>`);
    }

    // Replace <div id="root"></div> with prerendered app
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Ensure target directory exists
    const targetDir = path.dirname(route.outputPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(route.outputPath, html, 'utf-8');
    const elapsed = (performance.now() - routeStartTime).toFixed(2);
    console.log(`  ✅ Generated ${path.relative(process.cwd(), route.outputPath)} (${html.length} bytes, ${elapsed}ms)`);
  }

  const totalElapsed = (performance.now() - startTime).toFixed(2);
  console.log(`🎉 Phase 2.5B SSG POC Prerender completed in ${totalElapsed}ms across ${routes.length} routes.`);
}

// Execute if run directly
prerender();

