/**
 * Discover Clare - Central SEO Configuration
 * Single source of truth for site URLs, brand metadata, and canonical generation.
 */

// Default fallback domain identifier (used when VITE_SITE_URL is not set in env)
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
 * 2. Browser runtime origin (window.location.origin)
 * 3. Default production URL fallback
 */
export function getSiteUrl(): string {
  // Check if defined in Vite env
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SITE_URL : undefined;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() && !envUrl.includes('YOUR-DOMAIN-HERE.com')) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // If in browser runtime, use active window origin for canonicals
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }

  return DEFAULT_SITE_URL.replace(/\/+$/, '');
}

/**
 * Returns a normalized, absolute canonical URL for any internal route.
 * Strips queries, hashes, and ensures consistent single leading slash.
 */
export function getCanonicalUrl(path: string = '/'): string {
  const baseUrl = getSiteUrl();
  
  if (!path || path === '/') {
    return `${baseUrl}/`;
  }

  // Strip queries and hashes
  const cleanPath = path.split('?')[0].split('#')[0];
  // Ensure starts with '/' and remove trailing slash for sub-routes
  const normalizedPath = `/${cleanPath.replace(/^\/+/, '').replace(/\/+$/, '')}`;

  return `${baseUrl}${normalizedPath}`;
}
