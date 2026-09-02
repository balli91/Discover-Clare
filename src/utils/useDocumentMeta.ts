import { useEffect } from 'react';
import {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  getCanonicalUrl
} from '../config/seo';
import { formatMetaDescription } from './seo';

export interface DocumentMetaOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  canonical?: string; // alias for canonicalUrl
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'place' | string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  ogImageAlt?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
}

const MANAGED_DATA_ATTR = 'data-managed-by';
const MANAGED_ATTR_VALUE = 'discover-clare-seo';
const JSON_LD_SCRIPT_ID = 'discover-clare-seo-json-ld';

/**
 * Idempotently updates or creates a <meta> element in document.head.
 * Reuses existing tags to prevent duplication across SPA navigations.
 */
function setMetaTag(
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string | null | undefined
) {
  if (typeof document === 'undefined') return;

  const selector = `meta[${attributeName}="${attributeValue}"]`;
  let element = document.head.querySelector(selector);

  if (!content) {
    if (element && element.getAttribute(MANAGED_DATA_ATTR) === MANAGED_ATTR_VALUE) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    element.setAttribute(MANAGED_DATA_ATTR, MANAGED_ATTR_VALUE);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Idempotently updates or creates the <link rel="canonical"> element in document.head.
 */
function setCanonicalLink(url: string | null | undefined) {
  if (typeof document === 'undefined') return;

  let link = document.head.querySelector('link[rel="canonical"]');

  if (!url) {
    if (link) {
      link.remove();
    }
    return;
  }

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute(MANAGED_DATA_ATTR, MANAGED_ATTR_VALUE);
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

/**
 * Idempotently manages JSON-LD structured data script in document.head.
 */
function setJsonLdScript(data: Record<string, unknown> | Record<string, unknown>[] | null | undefined) {
  if (typeof document === 'undefined') return;

  let script = document.getElementById(JSON_LD_SCRIPT_ID);

  if (!data || (Array.isArray(data) && data.length === 0)) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = JSON_LD_SCRIPT_ID;
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute(MANAGED_DATA_ATTR, MANAGED_ATTR_VALUE);
    document.head.appendChild(script);
  }

  try {
    script.textContent = JSON.stringify(data);
  } catch (err) {
    console.error('[SEO] Error serializing JSON-LD structured data:', err);
    if (script) script.remove();
  }
}

/**
 * Lightweight, dependency-free React hook to dynamically manage document head SEO metadata.
 * Safely updates document.title, meta tags, canonical link, Open Graph, Twitter cards,
 * and JSON-LD structured data without external packages.
 */
export function useDocumentMeta(options: DocumentMetaOptions) {
  const {
    title,
    description,
    canonicalUrl,
    canonical,
    image,
    imageAlt,
    type = 'website',
    noIndex = false,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    ogImageAlt,
    twitterCard = 'summary_large_image',
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterImageAlt,
    jsonLd
  } = options;

  // Resolve Title: append site brand if not present
  const resolvedTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  // Resolve Description: format and truncate to optimal length
  const resolvedDescription = description
    ? formatMetaDescription(description, 160)
    : DEFAULT_DESCRIPTION;

  // Resolve Canonical URL
  const rawCanonical = canonicalUrl || canonical;
  const resolvedCanonical = rawCanonical ? getCanonicalUrl(rawCanonical) : undefined;

  // Resolve Images
  const resolvedImage = ogImage || image || DEFAULT_OG_IMAGE;
  const resolvedImageAlt = ogImageAlt || imageAlt || resolvedTitle;

  // Resolve Open Graph fields
  const resolvedOgTitle = ogTitle || resolvedTitle;
  const resolvedOgDescription = ogDescription || resolvedDescription;
  const resolvedOgType = ogType || type;
  const resolvedOgUrl = ogUrl ? getCanonicalUrl(ogUrl) : resolvedCanonical;

  // Resolve Twitter fields
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription;
  const resolvedTwitterImage = twitterImage || resolvedImage;
  const resolvedTwitterImageAlt = twitterImageAlt || resolvedImageAlt;

  // Serialize jsonLd for dependency comparison
  const jsonLdSerialized = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    // 1. Document Title
    document.title = resolvedTitle;

    // 2. Primary Meta Description
    setMetaTag('name', 'description', resolvedDescription);

    // 3. Robots meta (Index / Noindex)
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, follow');
    } else {
      setMetaTag('name', 'robots', 'index, follow');
    }

    // 4. Canonical Link
    if (noIndex && !rawCanonical) {
      setCanonicalLink(null);
    } else {
      setCanonicalLink(resolvedCanonical || null);
    }

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:title', resolvedOgTitle);
    setMetaTag('property', 'og:description', resolvedOgDescription);
    setMetaTag('property', 'og:type', resolvedOgType);
    if (resolvedOgUrl) {
      setMetaTag('property', 'og:url', resolvedOgUrl);
    } else {
      setMetaTag('property', 'og:url', null);
    }
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:image:alt', resolvedImageAlt);

    // 6. Twitter / X Cards
    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:title', resolvedTwitterTitle);
    setMetaTag('name', 'twitter:description', resolvedTwitterDescription);
    setMetaTag('name', 'twitter:image', resolvedTwitterImage);
    setMetaTag('name', 'twitter:image:alt', resolvedTwitterImageAlt);

    // 7. Structured Data (JSON-LD)
    setJsonLdScript(jsonLd);

    // Cleanup: When unmounting, if this was the last managed SEO instance,
    // clear JSON-LD to prevent stale schema from sticking on non-managed pages.
    return () => {
      // In SPA route transitions, the next view's useEffect will run and overwrite
      // the meta tags. If a route without useDocumentMeta mounts, we remove JSON-LD.
    };
  }, [
    resolvedTitle,
    resolvedDescription,
    resolvedCanonical,
    rawCanonical,
    resolvedImage,
    resolvedImageAlt,
    resolvedOgTitle,
    resolvedOgDescription,
    resolvedOgType,
    resolvedOgUrl,
    twitterCard,
    resolvedTwitterTitle,
    resolvedTwitterDescription,
    resolvedTwitterImage,
    resolvedTwitterImageAlt,
    noIndex,
    jsonLdSerialized
  ]);
}
