/**
 * Discover Clare - Central SEO Configuration
 * Single source of truth for site URLs, brand metadata, and canonical generation.
 */

// Default canonical production domain identifier
export const DEFAULT_SITE_URL = 'https://discoverclare.ie';

export const SITE_NAME = 'Discover Clare';

export const DEFAULT_TITLE = 'Discover Clare | Explore County Clare, Ireland';

export const DEFAULT_DESCRIPTION =
  'Independent curated guide to County Clare, Ireland. Explore the Cliffs of Moher, the Burren, hidden coastal gems, traditional music pubs, Atlantic surf, walks, dining and authentic local experiences.';

export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80';

/**
 * Resolves the base site URL for SEO, canonical links, and Open Graph.
 * Priority:
 * 1. import.meta.env.VITE_SITE_URL (Build/Runtime environment override)
 * 2. Default production URL fallback (https://discoverclare.ie)
 */
export function getSiteUrl(): string {
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SITE_URL : undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() && !envUrl.includes('YOUR-DOMAIN-HERE.com')) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  return DEFAULT_SITE_URL.replace(/\/+$/, '');
}

/**
 * Returns a normalized, absolute canonical URL for any internal route.
 * Strips queries, hashes, and ensures consistent single leading slash.
 */
export function getCanonicalUrl(path: string = '/'): string {
  if (path && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  }

  const baseUrl = getSiteUrl();
  
  if (!path || path === '/' || path === '') {
    return `${baseUrl}/`;
  }

  // Strip queries and hashes, normalize slashes
  const cleanPath = path.split('?')[0].split('#')[0].replace(/^\/+/, '').replace(/\/+$/, '');
  return `${baseUrl}/${cleanPath}`;
}
