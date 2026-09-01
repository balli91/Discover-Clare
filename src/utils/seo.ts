import { ClarePlace } from '../types';
import { getSiteUrl, getCanonicalUrl, SITE_NAME } from '../config/seo';

/**
 * Formats and cleanly truncates a string for meta descriptions (~150-160 characters).
 * Avoids awkward word cuts and trailing punctuation.
 */
export function formatMetaDescription(text: string, maxLength = 155): string {
  if (!text) return '';
  // Clean up whitespace and newlines
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;

  // Cut at last space before maxLength
  const truncated = cleaned.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  const safeText = lastSpaceIndex > 60 ? truncated.slice(0, lastSpaceIndex) : truncated;
  
  // Strip trailing punctuation like comma, colon, semicolon, hyphen
  const cleanEnd = safeText.replace(/[,:;\-\s]+$/, '');
  return `${cleanEnd}…`;
}

/**
 * Maps a ClarePlace to its most accurate Schema.org type based on real dataset properties.
 */
export function getSchemaTypeForPlace(place: ClarePlace): string {
  switch (place.type) {
    case 'food': {
      const catLower = place.category.toLowerCase();
      const nameLower = place.name.toLowerCase();
      if (catLower.includes('cafe') || catLower.includes('bakery') || nameLower.includes('bakery')) {
        return 'CafeOrCoffeeShop';
      }
      if (catLower.includes('pub') || catLower.includes('tavern') || catLower.includes('bar')) {
        return 'BarOrPub';
      }
      return 'Restaurant';
    }
    case 'stay': {
      const catLower = place.category.toLowerCase();
      if (catLower.includes('hotel') || place.name.toLowerCase().includes('hotel')) {
        return 'Hotel';
      }
      if (catLower.includes('b&b') || catLower.includes('bed & breakfast')) {
        return 'BedAndBreakfast';
      }
      return 'LodgingBusiness';
    }
    case 'activity': {
      const catLower = place.category.toLowerCase();
      if (catLower.includes('surf') || catLower.includes('kayak') || catLower.includes('trail') || catLower.includes('walk')) {
        return 'SportsActivityLocation';
      }
      return 'TouristAttraction';
    }
    case 'attraction':
    case 'hidden-gem':
    default:
      return 'TouristAttraction';
  }
}

/**
 * Generates valid JSON-LD structured data for a ClarePlace using only real, verified dataset fields.
 * strictly adheres to the truth-in-data policy (no invented reviews, ratings, or fake hours).
 */
export function generatePlaceJsonLd(place: ClarePlace, canonicalUrl?: string): Record<string, unknown> {
  const url = canonicalUrl || getCanonicalUrl(`/places/${place.slug}`);
  const schemaType = getSchemaTypeForPlace(place);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: place.name,
    description: place.description || place.tagline,
    url: url,
    image: place.heroImage,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: place.coordinates.lat,
      longitude: place.coordinates.lng
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: place.locationName,
      addressRegion: 'County Clare',
      addressCountry: 'IE'
    }
  };

  // Add optional verified fields if present in dataset
  if (place.practicalInfo?.phone) {
    schema.telephone = place.practicalInfo.phone;
  }

  if (place.practicalInfo?.websiteUrl) {
    schema.sameAs = place.practicalInfo.websiteUrl;
  }

  if (place.practicalInfo?.address) {
    (schema.address as Record<string, unknown>).streetAddress = place.practicalInfo.address;
  }

  // Price Range indicator if available
  if (place.priceIndicator) {
    schema.priceRange = place.priceIndicator;
  }

  return schema;
}

/**
 * Generates BreadcrumbList structured data matching visible UI breadcrumbs.
 */
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : getCanonicalUrl(item.url)
    }))
  };
}

/**
 * Generates WebSite and Organization structured data for the homepage.
 */
export function generateWebsiteJsonLd(): Record<string, unknown>[] {
  const siteUrl = getSiteUrl();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${siteUrl}/`,
    description:
      'Independent guide to County Clare, Ireland. Explore the Cliffs of Moher, the Burren, hidden coastal gems, traditional music pubs, Atlantic surf, walks, dining and authentic local experiences.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/explore?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/favicon.ico`,
    description: 'Independent curated digital guide and travel companion for County Clare, Ireland.'
  };

  return [websiteSchema, organizationSchema];
}
