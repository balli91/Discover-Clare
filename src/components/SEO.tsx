import React from 'react';
import { useDocumentMeta, DocumentMetaOptions } from '../utils/useDocumentMeta';

export interface SEOProps extends DocumentMetaOptions {}

/**
 * Reusable SEO component for Discover Clare.
 * Wraps useDocumentMeta hook in a headless React component.
 * Safely synchronizes document.title, Open Graph, Twitter cards, canonical links,
 * robots directives, and JSON-LD structured data.
 */
export const SEO: React.FC<SEOProps> = (props) => {
  useDocumentMeta(props);
  return null;
};

export { useDocumentMeta };
export type { DocumentMetaOptions };
