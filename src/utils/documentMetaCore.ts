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

export interface ResolvedDocumentMeta {
  title: string;
  description: string;
  canonical?: string;
  image: string;
  imageAlt: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogUrl?: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterImageAlt: string;
  noIndex: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
}

export const MANAGED_DATA_ATTR = 'data-managed-by';
export const MANAGED_ATTR_VALUE = 'discover-clare-seo';
export const JSON_LD_SCRIPT_ID = 'discover-clare-seo-json-ld';

/**
 * Pure function to resolve raw SEO inputs into fully normalized metadata.
 * Shared isomorphically between client-side useDocumentMeta and build-time prerenderer.
 */
export function resolveDocumentMeta(options: DocumentMetaOptions): ResolvedDocumentMeta {
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

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: resolvedCanonical,
    image: resolvedImage,
    imageAlt: resolvedImageAlt,
    ogTitle: resolvedOgTitle,
    ogDescription: resolvedOgDescription,
    ogType: resolvedOgType,
    ogUrl: resolvedOgUrl,
    twitterCard,
    twitterTitle: resolvedTwitterTitle,
    twitterDescription: resolvedTwitterDescription,
    twitterImage: resolvedTwitterImage,
    twitterImageAlt: resolvedTwitterImageAlt,
    noIndex,
    jsonLd
  };
}
