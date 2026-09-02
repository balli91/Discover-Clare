import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from '../src/App';
import { getPublishedPlaces, CLARE_REGIONS, getLocalityById } from '../src/data/clareData';
import {
  generatePlaceJsonLd,
  generateBreadcrumbJsonLd,
  generateWebsiteJsonLd,
  generateRegionJsonLd
} from '../src/utils/seo';
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

interface PrerenderRouteConfig {
  url: string;
  outputPath: string;
  metaOptions: DocumentMetaOptions;
}

function getPrerenderRoutes(): PrerenderRouteConfig[] {
  const routes: PrerenderRouteConfig[] = [];

  const getOutputPath = (routeUrl: string) => {
    if (routeUrl === '/') {
      return path.resolve('dist/index.html');
    }
    const clean = routeUrl.replace(/^\/+/, '').replace(/\/+$/, '');
    return path.resolve(`dist/${clean}/index.html`);
  };

  // 1. Static Core Routes (15 routes)
  routes.push({
    url: '/',
    outputPath: getOutputPath('/'),
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

  routes.push({
    url: '/explore',
    outputPath: getOutputPath('/explore'),
    metaOptions: {
      title: 'Explore County Clare | Discover Clare',
      description:
        'Search, filter, and discover all verified attractions, hiking trails, coastal gems, traditional music pubs, and accommodations across County Clare.',
      canonical: '/explore',
      type: 'website',
      ogTitle: 'Explore County Clare | Discover Clare',
      ogDescription:
        'Search, filter, and discover all verified attractions, hiking trails, coastal gems, traditional music pubs, and accommodations across County Clare.',
      twitterTitle: 'Explore County Clare | Discover Clare',
      twitterDescription:
        'Search, filter, and discover all verified attractions, hiking trails, coastal gems, traditional music pubs, and accommodations across County Clare.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Explore', url: '/explore' }
      ])
    }
  });

  routes.push({
    url: '/attractions',
    outputPath: getOutputPath('/attractions'),
    metaOptions: {
      title: 'Major Attractions & Heritage in Clare | Discover Clare',
      description:
        "Explore County Clare's iconic landmarks and heritage sites including the Cliffs of Moher, Bunratty Castle, The Burren National Park, Doolin Cave, and Quin Abbey.",
      canonical: '/attractions',
      type: 'website',
      ogTitle: 'Major Attractions & Heritage in Clare | Discover Clare',
      ogDescription:
        "Explore County Clare's iconic landmarks and heritage sites including the Cliffs of Moher, Bunratty Castle, The Burren National Park, Doolin Cave, and Quin Abbey.",
      twitterTitle: 'Major Attractions & Heritage in Clare | Discover Clare',
      twitterDescription:
        "Explore County Clare's iconic landmarks and heritage sites including the Cliffs of Moher, Bunratty Castle, The Burren National Park, Doolin Cave, and Quin Abbey.",
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Attractions', url: '/attractions' }
      ])
    }
  });

  routes.push({
    url: '/things-to-do',
    outputPath: getOutputPath('/things-to-do'),
    metaOptions: {
      title: 'Things to Do in County Clare | Outdoor & Cultural Activities',
      description:
        'Find outdoor adventures, surfing at Lahinch, hiking the Burren Way, sea kayaking in Kilkee, boat trips, and traditional Irish music sessions in Clare.',
      canonical: '/things-to-do',
      type: 'website',
      ogTitle: 'Things to Do in County Clare | Outdoor & Cultural Activities',
      ogDescription:
        'Find outdoor adventures, surfing at Lahinch, hiking the Burren Way, sea kayaking in Kilkee, boat trips, and traditional Irish music sessions in Clare.',
      twitterTitle: 'Things to Do in County Clare | Outdoor & Cultural Activities',
      twitterDescription:
        'Find outdoor adventures, surfing at Lahinch, hiking the Burren Way, sea kayaking in Kilkee, boat trips, and traditional Irish music sessions in Clare.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Things to Do', url: '/things-to-do' }
      ])
    }
  });

  routes.push({
    url: '/food-drink',
    outputPath: getOutputPath('/food-drink'),
    metaOptions: {
      title: 'Places to Eat & Drink in Clare | Seafood & Traditional Pubs',
      description:
        "Discover fresh Atlantic seafood at Linnane's, dining at Wild Honey Inn, Burren Smokehouse salmon, and traditional music pubs across County Clare.",
      canonical: '/food-drink',
      type: 'website',
      ogTitle: 'Places to Eat & Drink in Clare | Seafood & Traditional Pubs',
      ogDescription:
        "Discover fresh Atlantic seafood at Linnane's, dining at Wild Honey Inn, Burren Smokehouse salmon, and traditional music pubs across County Clare.",
      twitterTitle: 'Places to Eat & Drink in Clare | Seafood & Traditional Pubs',
      twitterDescription:
        "Discover fresh Atlantic seafood at Linnane's, dining at Wild Honey Inn, Burren Smokehouse salmon, and traditional music pubs across County Clare.",
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Food & Drink', url: '/food-drink' }
      ])
    }
  });

  routes.push({
    url: '/stay',
    outputPath: getOutputPath('/stay'),
    metaOptions: {
      title: 'Where to Stay in County Clare | Hotels, B&Bs & Unique Stays',
      description:
        'Find the best places to stay in County Clare, from historic manor houses like Gregans Castle to coastal lodges like Armada Hotel and boutique village hotels.',
      canonical: '/stay',
      type: 'website',
      ogTitle: 'Where to Stay in County Clare | Hotels, B&Bs & Unique Stays',
      ogDescription:
        'Find the best places to stay in County Clare, from historic manor houses like Gregans Castle to coastal lodges like Armada Hotel and boutique village hotels.',
      twitterTitle: 'Where to Stay in County Clare | Hotels, B&Bs & Unique Stays',
      twitterDescription:
        'Find the best places to stay in County Clare, from historic manor houses like Gregans Castle to coastal lodges like Armada Hotel and boutique village hotels.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Where to Stay', url: '/stay' }
      ])
    }
  });

  routes.push({
    url: '/events',
    outputPath: getOutputPath('/events'),
    metaOptions: {
      title: 'Events & Festivals in County Clare | Music, Trad & Culture',
      description:
        'Explore premier festivals and traditional Irish music gatherings in Clare: Willie Clancy Summer School, Fleadh Cheoil, Lisdoonvarna Matchmaking Festival, and Doolin Folk Festival.',
      canonical: '/events',
      type: 'website',
      ogTitle: 'Events & Festivals in County Clare | Music, Trad & Culture',
      ogDescription:
        'Explore premier festivals and traditional Irish music gatherings in Clare: Willie Clancy Summer School, Fleadh Cheoil, Lisdoonvarna Matchmaking Festival, and Doolin Folk Festival.',
      twitterTitle: 'Events & Festivals in County Clare | Music, Trad & Culture',
      twitterDescription:
        'Explore premier festivals and traditional Irish music gatherings in Clare: Willie Clancy Summer School, Fleadh Cheoil, Lisdoonvarna Matchmaking Festival, and Doolin Folk Festival.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Events', url: '/events' }
      ])
    }
  });

  routes.push({
    url: '/plan-your-trip',
    outputPath: getOutputPath('/plan-your-trip'),
    metaOptions: {
      title: 'Plan Your Trip to County Clare | Custom Itineraries & Routes',
      description:
        'Craft the perfect County Clare itinerary: 48 hours along the Atlantic Edge, 3 days in the Burren & Cliffs of Moher, or a 5-day Grand Tour.',
      canonical: '/plan-your-trip',
      type: 'website',
      ogTitle: 'Plan Your Trip to County Clare | Custom Itineraries & Routes',
      ogDescription:
        'Craft the perfect County Clare itinerary: 48 hours along the Atlantic Edge, 3 days in the Burren & Cliffs of Moher, or a 5-day Grand Tour.',
      twitterTitle: 'Plan Your Trip to County Clare | Custom Itineraries & Routes',
      twitterDescription:
        'Craft the perfect County Clare itinerary: 48 hours along the Atlantic Edge, 3 days in the Burren & Cliffs of Moher, or a 5-day Grand Tour.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Plan Your Trip', url: '/plan-your-trip' }
      ])
    }
  });

  routes.push({
    url: '/hidden-gems',
    outputPath: getOutputPath('/hidden-gems'),
    metaOptions: {
      title: 'Hidden Gems & Secret Spots in County Clare | Discover Clare',
      description:
        'Discover quiet secret spots and off-the-beaten-path locations in Clare: Bridges of Ross, Pollnashanthana Puffing Hole, Inis Cealtra, and St. Tola Goat Farm.',
      canonical: '/hidden-gems',
      type: 'website',
      ogTitle: 'Hidden Gems & Secret Spots in County Clare | Discover Clare',
      ogDescription:
        'Discover quiet secret spots and off-the-beaten-path locations in Clare: Bridges of Ross, Pollnashanthana Puffing Hole, Inis Cealtra, and St. Tola Goat Farm.',
      twitterTitle: 'Hidden Gems & Secret Spots in County Clare | Discover Clare',
      twitterDescription:
        'Discover quiet secret spots and off-the-beaten-path locations in Clare: Bridges of Ross, Pollnashanthana Puffing Hole, Inis Cealtra, and St. Tola Goat Farm.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Hidden Gems', url: '/hidden-gems' }
      ])
    }
  });

  routes.push({
    url: '/regions',
    outputPath: getOutputPath('/regions'),
    metaOptions: {
      title: 'The 5 Regions of County Clare | Discover Clare',
      description:
        'County Clare encompasses five distinct landscapes: Ennis, North Clare & The Burren, West Clare & Atlantic Coast, East Clare & Lough Derg, and South Clare & Shannon Estuary.',
      canonical: '/regions',
      type: 'website',
      ogTitle: 'The 5 Regions of County Clare | Discover Clare',
      ogDescription:
        'County Clare encompasses five distinct landscapes: Ennis, North Clare & The Burren, West Clare & Atlantic Coast, East Clare & Lough Derg, and South Clare & Shannon Estuary.',
      twitterTitle: 'The 5 Regions of County Clare | Discover Clare',
      twitterDescription:
        'County Clare encompasses five distinct landscapes: Ennis, North Clare & The Burren, West Clare & Atlantic Coast, East Clare & Lough Derg, and South Clare & Shannon Estuary.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Regions', url: '/regions' }
      ])
    }
  });

  routes.push({
    url: '/share-your-clare',
    outputPath: getOutputPath('/share-your-clare'),
    metaOptions: {
      title: 'Share Your Clare | Community Gallery & Stories',
      description:
        'Explore authentic photographs and stories shared by visitors and locals across County Clare, or submit your own favorite moments.',
      canonical: '/share-your-clare',
      type: 'website',
      ogTitle: 'Share Your Clare | Community Gallery & Stories',
      ogDescription:
        'Explore authentic photographs and stories shared by visitors and locals across County Clare, or submit your own favorite moments.',
      twitterTitle: 'Share Your Clare | Community Gallery & Stories',
      twitterDescription:
        'Explore authentic photographs and stories shared by visitors and locals across County Clare, or submit your own favorite moments.',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Share Your Clare', url: '/share-your-clare' }
      ])
    }
  });

  routes.push({
    url: '/about',
    outputPath: getOutputPath('/about'),
    metaOptions: {
      title: 'About Discover Clare | Editorial Standards & Verification',
      description:
        "Learn about Discover Clare's editorial standards, how our independent verification badge works, and our mission to highlight the best of County Clare.",
      canonical: '/about',
      type: 'website',
      ogTitle: 'About Discover Clare | Editorial Standards & Verification',
      ogDescription:
        "Learn about Discover Clare's editorial standards, how our independent verification badge works, and our mission to highlight the best of County Clare.",
      twitterTitle: 'About Discover Clare | Editorial Standards & Verification',
      twitterDescription:
        "Learn about Discover Clare's editorial standards, how our independent verification badge works, and our mission to highlight the best of County Clare.",
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' }
      ])
    }
  });

  routes.push({
    url: '/how-we-verify',
    outputPath: getOutputPath('/how-we-verify'),
    metaOptions: {
      title: 'How We Verify Listings | Editorial Standards & Fact-Checking | Discover Clare',
      description:
        "Discover Clare's independent verification process. Learn how our editorial desk fact-checks locations, access, opening patterns, and practical details across County Clare.",
      canonical: '/how-we-verify',
      type: 'website',
      ogTitle: 'How We Verify Listings | Editorial Standards & Fact-Checking | Discover Clare',
      ogDescription:
        "Discover Clare's independent verification process. Learn how our editorial desk fact-checks locations, access, opening patterns, and practical details across County Clare.",
      twitterTitle: 'How We Verify Listings | Editorial Standards & Fact-Checking | Discover Clare',
      twitterDescription:
        "Discover Clare's independent verification process.",
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'How We Verify', url: '/how-we-verify' }
      ])
    }
  });

  routes.push({
    url: '/contact',
    outputPath: getOutputPath('/contact'),
    metaOptions: {
      title: 'Contact Discover Clare | Editorial Corrections & Inquiries',
      description:
        "Get in touch with Discover Clare's independent editorial team. Report factual corrections, ask questions, or connect with our County Clare researchers.",
      canonical: '/contact',
      type: 'website',
      ogTitle: 'Contact Discover Clare | Editorial Corrections & Inquiries',
      ogDescription:
        "Get in touch with Discover Clare's independent editorial team. Report factual corrections, ask questions, or connect with our County Clare researchers.",
      twitterTitle: 'Contact Discover Clare | Editorial Corrections & Inquiries',
      twitterDescription:
        "Get in touch with Discover Clare's independent editorial team.",
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' }
      ])
    }
  });

  routes.push({
    url: '/suggest-a-place',
    outputPath: getOutputPath('/suggest-a-place'),
    metaOptions: {
      title: 'Suggest a Place or Experience | Discover Clare',
      description:
        'Know a special limestone boreen, quiet Atlantic cove, or authentic family business in County Clare? Suggest a place for independent review by Discover Clare.',
      canonical: '/suggest-a-place',
      type: 'website',
      ogTitle: 'Suggest a Place or Experience | Discover Clare',
      ogDescription:
        'Know a special limestone boreen, quiet Atlantic cove, or authentic family business in County Clare? Suggest a place for independent review by Discover Clare.',
      twitterTitle: 'Suggest a Place or Experience | Discover Clare',
      twitterDescription:
        'Know a special limestone boreen, quiet Atlantic cove, or authentic family business in County Clare?',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Suggest a Place', url: '/suggest-a-place' }
      ])
    }
  });

  // 2. Regional Routes (5 routes)
  for (const region of CLARE_REGIONS) {
    const regionBreadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Regions', url: '/regions' },
      { name: region.name, url: `/regions/${region.id}` }
    ];

    routes.push({
      url: `/regions/${region.id}`,
      outputPath: getOutputPath(`/regions/${region.id}`),
      metaOptions: {
        title: `${region.name} | Discover Clare`,
        description: `${region.description} Explore towns including ${region.keyTowns.join(', ')} and key highlights.`,
        canonical: `/regions/${region.id}`,
        image: region.heroImage,
        imageAlt: `${region.name}, County Clare`,
        ogTitle: `${region.name} Region Guide | Discover Clare`,
        ogDescription: region.description,
        twitterTitle: `${region.name} | Discover Clare`,
        twitterDescription: region.description,
        jsonLd: generateRegionJsonLd(region, regionBreadcrumbs)
      }
    });
  }

  // 3. Published Places Routes (36 routes)
  const publishedPlaces = getPublishedPlaces();
  for (const place of publishedPlaces) {
    const regionInfo = CLARE_REGIONS.find((r) => r.id === place.region);
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
      outputPath: getOutputPath(`/places/${place.slug}`),
      metaOptions: {
        title: place.seoTitle || `${place.name} | Discover Clare`,
        description:
          place.seoDescription ||
          `${place.name} in ${place.locationName}, County Clare: ${place.tagline} Practical visitor guide, coordinates, local tips, and travel details.`,
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
  }

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
  console.log('🚀 Starting Phase 2.6 Full Hybrid SSG Prerender...');

  const templatePath = path.resolve('dist/index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Prerender Error: Client template not found at ${templatePath}. Ensure "vite build" runs first.`);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const routes = getPrerenderRoutes();

  console.log(`📋 Total routes in prerender manifest: ${routes.length}`);

  let totalBytes = 0;
  const renderedFiles: { path: string; size: number; duration: number }[] = [];

  for (const route of routes) {
    const routeStartTime = performance.now();

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
    const elapsed = performance.now() - routeStartTime;
    const fileSize = Buffer.byteLength(html, 'utf-8');
    totalBytes += fileSize;
    renderedFiles.push({
      path: path.relative(process.cwd(), route.outputPath),
      size: fileSize,
      duration: elapsed
    });
  }

  const totalElapsed = (performance.now() - startTime).toFixed(2);
  const totalKb = (totalBytes / 1024).toFixed(2);
  console.log(`\n🎉 Phase 2.6 SSG Rollout completed in ${totalElapsed}ms across ${routes.length} routes (${totalKb} KB total HTML).`);
}

// Execute if run directly
prerender();

