import { ClarePlace, WeatherSuitability, ItemType, RegionId } from '../types';
import { normalizeRegionId } from '../data/clareData';

export interface DiscoveryCriteria {
  scenario?: 'rain' | 'sun' | 'few-hours' | 'kids' | 'music' | 'free' | 'hidden-gem' | 'accessible';
  region?: RegionId | 'all';
  locality?: string | 'all';
  type?: ItemType | 'all';
  weather?: WeatherSuitability | 'all';
  familyFriendlyOnly?: boolean;
  dogFriendlyOnly?: boolean;
  freeOnly?: boolean;
  hiddenGemsOnly?: boolean;
  indoorOnly?: boolean;
  searchQuery?: string;
}

export interface MatchResult {
  place: ClarePlace;
  score: number;
  matchReasons: string[];
}

/**
 * Filter out drafts and hidden items.
 * Only published content is presented to users or search engines.
 */
export function isPublishedPlace(place: ClarePlace): boolean {
  if (place.editorialStatus === 'draft' || place.editorialStatus === 'hidden') {
    return false;
  }
  return true;
}

/**
 * Evaluates practical access / opening status safely without false certainty.
 */
export interface PlaceOpeningStatus {
  kind: 'open_access' | 'scheduled_hours' | 'seasonal' | 'check_hours';
  label: string;
  detail?: string;
  badgeColor: 'emerald' | 'stone' | 'amber' | 'blue';
}

export function getPlaceOpeningStatus(place: ClarePlace): PlaceOpeningStatus {
  const hours = place.practicalInfo.openingHours;
  const seasonal = place.practicalInfo.seasonalAvailability;

  // 1. Natural landscapes, public trails, outdoor beaches, and free ruins
  if (
    place.priceIndicator === 'Free' &&
    place.practicalInfo.indoorOutdoor === 'outdoor' &&
    (!hours || hours.toLowerCase().includes('open daily') || hours.toLowerCase().includes('daylight') || hours.toLowerCase().includes('year-round'))
  ) {
    return {
      kind: 'open_access',
      label: 'Open Daylight Access',
      detail: hours || 'Open year-round during daylight hours',
      badgeColor: 'emerald'
    };
  }

  // 2. Specific opening schedule present
  if (hours && hours.trim().length > 0) {
    return {
      kind: 'scheduled_hours',
      label: 'Scheduled Hours',
      detail: hours,
      badgeColor: 'blue'
    };
  }

  // 3. Seasonal operating window
  if (seasonal && seasonal.trim().length > 0) {
    return {
      kind: 'seasonal',
      label: 'Seasonal Operating',
      detail: seasonal,
      badgeColor: 'amber'
    };
  }

  // 4. Unknown / unverified hours - Be honest!
  return {
    kind: 'check_hours',
    label: 'Check before visiting',
    detail: 'Opening times vary seasonally. Check official website or call ahead.',
    badgeColor: 'stone'
  };
}

/**
 * Deterministically evaluate a place against discovery criteria.
 * Returns an integer score and human-readable explanation tags.
 */
export function evaluatePlaceMatch(place: ClarePlace, criteria: DiscoveryCriteria): MatchResult {
  let score = 0;
  const matchReasons: string[] = [];

  // Exclude non-published places completely
  if (!isPublishedPlace(place)) {
    return { place, score: -1, matchReasons: [] };
  }

  // Base trust score: Verified listings receive baseline editorial weight
  if (place.verificationStatus === 'verified') {
    score += 5;
  }
  if (place.isFeatured) {
    score += 3;
  }
  if (place.isMajor) {
    score += 2;
  }

  // Text search match
  if (criteria.searchQuery && criteria.searchQuery.trim()) {
    const q = criteria.searchQuery.trim().toLowerCase();
    const nameMatch = place.name.toLowerCase().includes(q);
    const locMatch = place.locationName.toLowerCase().includes(q);
    const tagMatch = place.tags.some(t => t.toLowerCase().includes(q));
    const catMatch = place.category.toLowerCase().includes(q);
    const descMatch = place.tagline.toLowerCase().includes(q) || place.description.toLowerCase().includes(q);

    if (nameMatch) {
      score += 40;
      matchReasons.push(`Matches name "${place.name}"`);
    } else if (locMatch) {
      score += 30;
      matchReasons.push(`Located in ${place.locationName}`);
    } else if (tagMatch) {
      score += 25;
      matchReasons.push(`Tagged #${q}`);
    } else if (catMatch) {
      score += 20;
      matchReasons.push(`Category: ${place.category}`);
    } else if (descMatch) {
      score += 10;
      matchReasons.push('Keyword in guide text');
    } else {
      // Failed text search
      return { place, score: -1, matchReasons: [] };
    }
  }

  // Scenario matching
  if (criteria.scenario) {
    switch (criteria.scenario) {
      case 'rain': {
        const isRainFriendly =
          place.weatherSuitability === 'rainy-day-favourite' ||
          place.practicalInfo.indoorOutdoor === 'indoor' ||
          place.practicalInfo.indoorOutdoor === 'both' ||
          place.tags.some(t => t.toLowerCase().includes('rain') || t.toLowerCase().includes('cave') || t.toLowerCase().includes('pub') || t.toLowerCase().includes('museum'));
        
        if (isRainFriendly) {
          score += 30;
          if (place.weatherSuitability === 'rainy-day-favourite') {
            matchReasons.push('Rainy-day favourite');
          } else if (place.practicalInfo.indoorOutdoor === 'indoor') {
            matchReasons.push('Sheltered indoor venue');
          } else {
            matchReasons.push('All-weather shelter available');
          }
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
      case 'sun': {
        const isSunSuitable =
          place.weatherSuitability === 'dry-only' ||
          place.practicalInfo.indoorOutdoor === 'outdoor' ||
          place.category.includes('Coastal') ||
          place.category.includes('Surfing') ||
          place.tags.some(t => t.toLowerCase().includes('view') || t.toLowerCase().includes('cliff') || t.toLowerCase().includes('beach'));

        if (isSunSuitable) {
          score += 30;
          matchReasons.push('Scenic outdoor & coastal conditions');
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
      case 'few-hours': {
        const isQuick =
          place.estimatedDuration.includes('45 mins') ||
          place.estimatedDuration.includes('1 hour') ||
          place.estimatedDuration.includes('1.5') ||
          place.estimatedDuration.includes('1–2');

        if (isQuick) {
          score += 30;
          matchReasons.push(`Quick visit (${place.estimatedDuration})`);
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
      case 'kids': {
        if (place.practicalInfo.familyFriendly) {
          score += 30;
          matchReasons.push('Family friendly & engaging');
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
      case 'music': {
        const isMusic =
          place.category.toLowerCase().includes('music') ||
          place.category.toLowerCase().includes('pub') ||
          place.tags.some(t => t.toLowerCase().includes('music') || t.toLowerCase().includes('trad'));

        if (isMusic) {
          score += 30;
          matchReasons.push('Traditional music & fireside sessions');
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
      case 'free': {
        if (place.priceIndicator === 'Free') {
          score += 30;
          matchReasons.push('Free public access');
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
      case 'hidden-gem': {
        if (place.isHiddenGem) {
          score += 30;
          matchReasons.push('Curated quiet secret spot');
        } else {
          return { place, score: -1, matchReasons: [] };
        }
        break;
      }
    }
  }

  // Region Filter
  if (criteria.region && criteria.region !== 'all') {
    if (normalizeRegionId(place.region) === normalizeRegionId(criteria.region)) {
      score += 15;
      matchReasons.push(`${place.locationName}`);
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  // Locality Filter
  if (criteria.locality && criteria.locality !== 'all') {
    if (place.localityId === criteria.locality) {
      score += 20;
      matchReasons.push(`Locality: ${place.locationName}`);
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  // Category / ItemType Filter
  if (criteria.type && criteria.type !== 'all') {
    if (place.type === criteria.type) {
      score += 15;
      matchReasons.push(`${place.category}`);
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  // Weather Filter
  if (criteria.weather && criteria.weather !== 'all') {
    if (place.weatherSuitability === criteria.weather) {
      score += 10;
      matchReasons.push(`Weather: ${place.weatherSuitability}`);
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  // Boolean Filters
  if (criteria.familyFriendlyOnly) {
    if (place.practicalInfo.familyFriendly) {
      score += 10;
      matchReasons.push('Family friendly');
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  if (criteria.dogFriendlyOnly) {
    if (place.practicalInfo.dogFriendly) {
      score += 10;
      matchReasons.push('Dog friendly');
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  if (criteria.freeOnly) {
    if (place.priceIndicator === 'Free') {
      score += 10;
      matchReasons.push('Free entry');
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  if (criteria.hiddenGemsOnly) {
    if (place.isHiddenGem) {
      score += 10;
      matchReasons.push('Hidden gem');
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  if (criteria.indoorOnly) {
    if (place.practicalInfo.indoorOutdoor === 'indoor' || place.practicalInfo.indoorOutdoor === 'both') {
      score += 10;
      matchReasons.push('Indoor shelter');
    } else {
      return { place, score: -1, matchReasons: [] };
    }
  }

  // Data completeness bonus
  if (place.practicalInfo.websiteUrl) score += 1;
  if (place.practicalInfo.accessibility) score += 1;
  if (place.localTip) score += 2;

  return {
    place,
    score,
    matchReasons: Array.from(new Set(matchReasons))
  };
}

/**
 * Strictly deterministic ranking.
 * Orders results by:
 * 1. Match score descending
 * 2. Verification status (verified first)
 * 3. Featured / Major status
 * 4. Stable alphabetical tie-breaker by name
 */
export function rankPlacesDeterministically(
  places: ClarePlace[],
  criteria: DiscoveryCriteria = {}
): MatchResult[] {
  const evaluated: MatchResult[] = [];

  for (const place of places) {
    const res = evaluatePlaceMatch(place, criteria);
    if (res.score >= 0) {
      evaluated.push(res);
    }
  }

  evaluated.sort((a, b) => {
    // 1. Match score
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    // 2. Verification status
    const aVerified = a.place.verificationStatus === 'verified' ? 1 : 0;
    const bVerified = b.place.verificationStatus === 'verified' ? 1 : 0;
    if (bVerified !== aVerified) {
      return bVerified - aVerified;
    }

    // 3. Featured
    const aFeatured = a.place.isFeatured ? 1 : 0;
    const bFeatured = b.place.isFeatured ? 1 : 0;
    if (bFeatured !== aFeatured) {
      return bFeatured - aFeatured;
    }

    // 4. Stable tie-breaker: alphabetical by place name
    return a.place.name.localeCompare(b.place.name);
  });

  return evaluated;
}
