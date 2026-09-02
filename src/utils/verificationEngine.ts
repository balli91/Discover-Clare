import { ClarePlace, PlaceVerification, VerificationStatus, VerificationChecks } from '../types';

/**
 * Empty/default unverified check state (all false)
 */
export const DEFAULT_UNVERIFIED_CHECKS: VerificationChecks = {
  location: false,
  website: false,
  contact: false,
  openingHours: false,
  description: false,
  pricing: false,
  images: false,
  category: false,
};

/**
 * Standard complete check state template for fully audited listings
 */
export const COMPLETE_VERIFIED_CHECKS: VerificationChecks = {
  location: true,
  website: true,
  contact: true,
  openingHours: true,
  description: true,
  pricing: true,
  images: true,
  category: true,
};

/**
 * Resolves the canonical PlaceVerification object for any ClarePlace.
 * Never fabricates data: respects explicit existing verification state,
 * and preserves existing status without inventing missing dates, checks, or history.
 */
export function getPlaceVerification(place: ClarePlace): PlaceVerification {
  // 1. Canonical source: If place.verification is explicitly defined, use it directly
  if (place.verification) {
    return place.verification;
  }

  // 2. Legacy fallback: Derive status from existing explicit legacy fields without fabricating details
  const status: VerificationStatus = 
    place.verificationStatus === 'verified' ? 'verified' :
    place.verificationStatus === 'partially_verified' ? 'partially_verified' :
    place.verificationStatus === 'needs_review' ? 'needs_review' : 
    'unverified';

  if (status === 'verified') {
    return {
      status: 'verified',
      lastVerified: place.verifiedAt || null,
      lastVerifiedDisplay: place.lastVerifiedAt || null,
      nextReview: null,
      checks: undefined, // Do not invent checks if not explicitly provided
      notes: place.verificationNotes || undefined,
      history: [],
      reviewedBy: place.verifiedBy || undefined,
    };
  }

  if (status === 'partially_verified') {
    return {
      status: 'partially_verified',
      lastVerified: place.verifiedAt || null,
      lastVerifiedDisplay: place.lastVerifiedAt || null,
      nextReview: null,
      checks: undefined,
      notes: place.verificationNotes || undefined,
      history: [],
      reviewedBy: place.verifiedBy || undefined,
    };
  }

  if (status === 'needs_review') {
    return {
      status: 'needs_review',
      lastVerified: place.verifiedAt || null,
      lastVerifiedDisplay: place.lastVerifiedAt || null,
      nextReview: null,
      checks: undefined,
      notes: place.verificationNotes || undefined,
      history: [],
      reviewedBy: place.verifiedBy || undefined,
    };
  }

  // Default: unverified
  return {
    status: 'unverified',
    lastVerified: null,
    lastVerifiedDisplay: null,
    nextReview: null,
    checks: undefined,
    notes: undefined,
    history: [],
  };
}

/**
 * Public trust guard: Returns true ONLY if the listing has met the strict 'verified' editorial standard.
 */
export function isPlaceVerified(place: ClarePlace): boolean {
  return getPlaceVerification(place).status === 'verified';
}

/**
 * Format a machine-readable date string (e.g., "2025-06-01") into human-readable text (e.g., "June 2025")
 */
export function formatVerificationDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  // If already in text format e.g. "August 2025"
  if (/^[A-Za-z]+\s+\d{4}$/.test(dateStr.trim())) {
    return dateStr.trim();
  }
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

/* =========================================================================
   FUTURE EDITORIAL & ADMIN QUERY HELPERS (Requirement H)
   ========================================================================= */

/**
 * Filter places that have not yet undergone independent editorial review.
 */
export function getUnverifiedPlaces(places: ClarePlace[]): ClarePlace[] {
  return places.filter(p => getPlaceVerification(p).status === 'unverified');
}

/**
 * Filter places with partial checks completed.
 */
export function getPartiallyVerifiedPlaces(places: ClarePlace[]): ClarePlace[] {
  return places.filter(p => getPlaceVerification(p).status === 'partially_verified');
}

/**
 * Filter places that are currently verified.
 */
export function getVerifiedPlaces(places: ClarePlace[]): ClarePlace[] {
  return places.filter(p => getPlaceVerification(p).status === 'verified');
}

/**
 * Filter places flagged as requiring editorial review/re-verification.
 */
export function getNeedsReviewPlaces(places: ClarePlace[]): ClarePlace[] {
  return places.filter(p => getPlaceVerification(p).status === 'needs_review');
}

/**
 * Filter verified places whose next scheduled review date is on or before a given cutoff date.
 */
export function getPlacesDueForReview(places: ClarePlace[], asOfIsoDate: string = new Date().toISOString().split('T')[0]): ClarePlace[] {
  return places.filter(p => {
    const v = getPlaceVerification(p);
    if (v.status !== 'verified' || !v.nextReview) return false;
    return v.nextReview <= asOfIsoDate;
  });
}

export interface VerificationMetrics {
  total: number;
  verified: number;
  partiallyVerified: number;
  needsReview: number;
  unverified: number;
  dueForReview: number;
  verificationRatePct: number;
}

/**
 * Computes high-level editorial verification metrics across any collection of places.
 */
export function getVerificationMetrics(places: ClarePlace[]): VerificationMetrics {
  const total = places.length;
  let verified = 0;
  let partiallyVerified = 0;
  let needsReview = 0;
  let unverified = 0;
  const today = new Date().toISOString().split('T')[0];
  let dueForReview = 0;

  for (const place of places) {
    const v = getPlaceVerification(place);
    switch (v.status) {
      case 'verified':
        verified++;
        if (v.nextReview && v.nextReview <= today) {
          dueForReview++;
        }
        break;
      case 'partially_verified':
        partiallyVerified++;
        break;
      case 'needs_review':
        needsReview++;
        break;
      case 'unverified':
      default:
        unverified++;
        break;
    }
  }

  return {
    total,
    verified,
    partiallyVerified,
    needsReview,
    unverified,
    dueForReview,
    verificationRatePct: total > 0 ? Math.round((verified / total) * 100) : 0,
  };
}
