import { useEffect } from 'react';
import { SITE_NAME } from '../config/seo';
import {
  DocumentMetaOptions,
  ResolvedDocumentMeta,
  resolveDocumentMeta,
  MANAGED_DATA_ATTR,
  MANAGED_ATTR_VALUE,
  JSON_LD_SCRIPT_ID
} from './documentMetaCore';

export type { DocumentMetaOptions, ResolvedDocumentMeta };

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
  const resolved = resolveDocumentMeta(options);
  const rawCanonical = options.canonicalUrl || options.canonical;
  const jsonLdSerialized = resolved.jsonLd ? JSON.stringify(resolved.jsonLd) : null;

  useEffect(() => {
    // 1. Document Title
    document.title = resolved.title;

    // 2. Primary Meta Description
    setMetaTag('name', 'description', resolved.description);

    // 3. Robots meta (Index / Noindex)
    if (resolved.noIndex) {
      setMetaTag('name', 'robots', 'noindex, follow');
    } else {
      setMetaTag('name', 'robots', 'index, follow');
    }

    // 4. Canonical Link
    if (resolved.noIndex && !rawCanonical) {
      setCanonicalLink(null);
    } else {
      setCanonicalLink(resolved.canonical || null);
    }

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:title', resolved.ogTitle);
    setMetaTag('property', 'og:description', resolved.ogDescription);
    setMetaTag('property', 'og:type', resolved.ogType);
    if (resolved.ogUrl) {
      setMetaTag('property', 'og:url', resolved.ogUrl);
    } else {
      setMetaTag('property', 'og:url', null);
    }
    setMetaTag('property', 'og:image', resolved.image);
    setMetaTag('property', 'og:image:alt', resolved.imageAlt);

    // 6. Twitter / X Cards
    setMetaTag('name', 'twitter:card', resolved.twitterCard);
    setMetaTag('name', 'twitter:title', resolved.twitterTitle);
    setMetaTag('name', 'twitter:description', resolved.twitterDescription);
    setMetaTag('name', 'twitter:image', resolved.twitterImage);
    setMetaTag('name', 'twitter:image:alt', resolved.twitterImageAlt);

    // 7. Structured Data (JSON-LD)
    setJsonLdScript(resolved.jsonLd);
  }, [
    resolved.title,
    resolved.description,
    resolved.canonical,
    rawCanonical,
    resolved.image,
    resolved.imageAlt,
    resolved.ogTitle,
    resolved.ogDescription,
    resolved.ogType,
    resolved.ogUrl,
    resolved.twitterCard,
    resolved.twitterTitle,
    resolved.twitterDescription,
    resolved.twitterImage,
    resolved.twitterImageAlt,
    resolved.noIndex,
    jsonLdSerialized
  ]);
}

