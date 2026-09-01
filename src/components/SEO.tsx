import React, { useEffect } from 'react';
import { 
  SITE_NAME, 
  DEFAULT_TITLE, 
  DEFAULT_DESCRIPTION, 
  DEFAULT_OG_IMAGE, 
  getCanonicalUrl 
} from '../config/seo';
import { formatMetaDescription } from '../utils/seo';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Helper to update or create a <meta> element in document.head
 */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string | null) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  
  if (!content) {
    if (element) {
      element.remove();
    }
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Helper to update or create the <link rel="canonical"> tag in document.head
 */
function setCanonicalLink(url: string | null) {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (!url) {
    if (link) {
      link.remove();
    }
    return;
  }

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

/**
 * Helper to manage JSON-LD <script> tags in document.head
 */
function setJsonLdScript(data: Record<string, unknown> | Record<string, unknown>[] | undefined) {
  const SCRIPT_ID = 'discover-clare-seo-json-ld';
  let script = document.getElementById(SCRIPT_ID);

  if (!data) {
    if (script) {
      script.remove();
    }
    return;
  }

  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

/**
 * Reusable SEO component for Discover Clare.
 * Safely synchronizes document.title, Open Graph, Twitter cards, canonical links,
 * robots directives, and JSON-LD structured data.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  image,
  imageAlt,
  type = 'website',
  noIndex = false,
  jsonLd
}) => {
  // Format title: append site name if not already included
  const resolvedTitle = title
    ? title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`
    : DEFAULT_TITLE;

  const resolvedDescription = description 
    ? formatMetaDescription(description, 160) 
    : DEFAULT_DESCRIPTION;

  const resolvedCanonical = canonical ? getCanonicalUrl(canonical) : undefined;
  const resolvedImage = image || DEFAULT_OG_IMAGE;
  const resolvedImageAlt = imageAlt || resolvedTitle;

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
    // Only set canonical if not explicitly noIndex (or if canonical specified)
    if (noIndex && !canonical) {
      setCanonicalLink(null);
    } else {
      setCanonicalLink(resolvedCanonical || null);
    }

    // 5. Open Graph Meta Tags
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:title', resolvedTitle);
    setMetaTag('property', 'og:description', resolvedDescription);
    setMetaTag('property', 'og:type', type);
    if (resolvedCanonical) {
      setMetaTag('property', 'og:url', resolvedCanonical);
    }
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:image:alt', resolvedImageAlt);

    // 6. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', resolvedTitle);
    setMetaTag('name', 'twitter:description', resolvedDescription);
    setMetaTag('name', 'twitter:image', resolvedImage);

    // 7. Structured Data (JSON-LD)
    setJsonLdScript(jsonLd);

    // Cleanup when component unmounts or changes
    return () => {
      // We don't necessarily clear immediately to avoid flashing,
      // the next SEO component mount will overwrite atomically.
    };
  }, [
    resolvedTitle,
    resolvedDescription,
    resolvedCanonical,
    resolvedImage,
    resolvedImageAlt,
    type,
    noIndex,
    jsonLd
  ]);

  return null; // Headless component
};
