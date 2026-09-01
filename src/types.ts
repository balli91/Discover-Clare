export type RegionId = 
  | 'ennis' 
  | 'north-clare-burren' 
  | 'west-clare-atlantic-coast' 
  | 'east-clare-lough-derg' 
  | 'south-clare-shannon-estuary';

export interface RegionInfo {
  id: RegionId;
  name: string;
  tagline: string;
  description: string;
  keyTowns: string[];
  highlights: string[];
  heroImage: string;
  imageCredit: string;
  character: string;
}

/**
 * High-level browsing classification
 */
export type ItemType = 'attraction' | 'activity' | 'food' | 'stay' | 'hidden-gem';

/**
 * Granular content architectural type
 * Distinguishes between physical commercial venues and natural places/experiences
 */
export type ContentType = 
  | 'venue'          // Pubs, restaurants, cafes, hotels, guesthouses, craft shops
  | 'attraction'     // Castles, museums, visitor centres, heritage parks, formal visitor attractions
  | 'natural_place'  // Natural parks, karst areas, coves, sea stacks, waterfalls, caves
  | 'beach'          // Coastal beaches, strands, swimming coves
  | 'walk'           // Walking trails, cliff paths, loop walks, mountain routes
  | 'viewpoint'      // Scenic viewing points, headlands, discovery points
  | 'scenic_route'   // Driving / cycling routes (e.g. Wild Atlantic Way loop)
  | 'experience';    // Guided tours, surf schools, boat trips, workshops

export type WeatherSuitability = 'all-weather' | 'dry-only' | 'rainy-day-favourite' | 'outdoor-dependent';

export type PriceIndicator = 'Free' | '€' | '€€' | '€€€';

export type ListingTier = 'free' | 'featured' | 'partner';

/**
 * Editorial Trust System
 * Distinguishes between publication state, factual verification state, and commercial/promotional status
 */
export type VerificationStatus = 
  | 'unverified' 
  | 'partially_verified' 
  | 'verified' 
  | 'needs_review';

export type EditorialStatus = 'draft' | 'published' | 'hidden';

export interface VerificationChecks {
  location: boolean;
  website: boolean;
  contact: boolean;
  openingHours: boolean;
  description: boolean;
  pricing: boolean;
  images: boolean;
  category: boolean;
}

export interface VerificationHistoryEntry {
  date: string; // Machine-readable ISO format: "YYYY-MM-DD"
  status: VerificationStatus;
  notes?: string;
  checks?: Partial<VerificationChecks>;
  reviewedBy?: string;
}

export interface PlaceVerification {
  status: VerificationStatus;
  lastVerified: string | null; // Machine-readable ISO date: "YYYY-MM-DD" or null
  lastVerifiedDisplay?: string | null; // Human-readable e.g. "August 2025" or "September 2026"
  nextReview: string | null; // Machine-readable ISO date: "YYYY-MM-DD" or null
  checks: VerificationChecks;
  notes?: string;
  history?: VerificationHistoryEntry[];
  reviewedBy?: string;
}

/**
 * Commercial / Visibility System (Strictly separate from Editorial Verification)
 */
export type PromotionStatus = 'none' | 'spotlight_candidate' | 'spotlight_partner';

export interface PlacePromotion {
  status: PromotionStatus;
  tier?: 'standard' | 'premium';
  startedAt?: string | null;
  expiresAt?: string | null;
  commercialNotes?: string;
}

export type LocalityId = 
  | 'ennis' 
  | 'doolin' 
  | 'lahinch' 
  | 'kilkee' 
  | 'killaloe' 
  | 'kilrush' 
  | 'ennistymon' 
  | 'ballyvaughan' 
  | 'corofin' 
  | 'bunratty' 
  | 'loop-head' 
  | 'spanish-point' 
  | 'mountshannon' 
  | 'quin' 
  | 'liscannor' 
  | 'miltown-malbay' 
  | 'fanore' 
  | 'shannon-town'
  | 'newmarket-on-fergus' 
  | 'crusheen' 
  | 'feakle' 
  | 'scariff';

export interface LocalityInfo {
  id: LocalityId;
  name: string;
  regionId: RegionId;
  tagline: string;
  description?: string;
  keyHighlights: string[];
}

/**
 * Specialized Content-Type Details (Structural, Non-Forced)
 */
export interface WalkDetails {
  trailhead?: string;
  distanceKm?: number;
  difficulty?: 'easy' | 'moderate' | 'strenuous';
  terrain?: string;
  routeType?: 'loop' | 'out_and_back' | 'point_to_point' | 'linear';
  estimatedDuration?: string;
  estimatedTime?: string;
  dogPolicy?: 'allowed_on_lead' | 'not_allowed' | 'seasonal' | 'farmland_restricted';
  parking?: string;
  safetyNotes?: string;
  trailheadCoordinates?: { lat: number; lng: number };
}

export interface BeachDetails {
  lifeguardStatus?: 'seasonal' | 'summer_weekends' | 'none' | 'blue_flag' | string;
  lifeguardSeasonal?: boolean;
  lifeguardSeasonDetails?: string;
  blueFlagStatus?: boolean;
  blueFlagYear?: string;
  swimmingSuitability?: 'safe_designated' | 'strong_swimmers_only' | 'caution_tides' | 'not_recommended' | string;
  swimmingSafety?: string;
  surfSuitability?: 'beginner_friendly' | 'intermediate_advanced' | 'experienced_only' | 'not_suitable' | string;
  surfaceType?: 'sand' | 'fine_sand' | 'golden_sand' | 'pebble' | 'rocky_shelf' | 'mixed' | string;
  beachType?: string;
  waterSportsNotes?: string;
  facilities?: string | string[];
  parking?: string;
  dogPolicy?: 'allowed_on_lead' | 'restricted_summer' | 'allowed' | string;
  safetyNotes?: string;
}

export interface ScenicRouteDetails {
  startPoint: string;
  endPoint: string;
  routeDistanceKm: number;
  estimatedDrivingTime: string;
  keyStops: string[];
  roadConditionNotes?: string;
  bestDirection?: string;
  highlights?: string[];
}

export interface NaturalPlaceDetails {
  accessNotes?: string;
  parking?: string;
  terrain?: string;
  safetyAdvice?: string;
  bestTimeToVisit?: string;
  panoramicView?: string;
}

export interface ViewpointDetails {
  viewDirection?: string;
  accessNotes?: string;
  parking?: string;
  bestLighting?: string;
  safetyAdvice?: string;
}

export interface ExperienceDetails {
  providerName?: string;
  activityType?: string;
  bookingRequired?: boolean;
  bookingRequirements?: 'advance_booking_required' | 'seasonal' | 'walk_ins_welcome' | 'online_recommended' | string;
  meetingPoint?: string;
  seasonality?: string;
  seasonalAvailability?: string;
  skillLevel?: 'all_levels' | 'beginner' | 'intermediate' | 'advanced' | string;
  experienceLevel?: 'all_levels' | 'beginner' | 'intermediate' | 'advanced' | string;
  minimumAge?: number | string;
  equipmentProvided?: string[] | string;
}

export interface VenueDetails {
  address?: string;
  websiteUrl?: string;
  phone?: string;
  openingHours?: string;
  bookingUrl?: string;
  facilities?: string | string[];
}

export interface AttractionDetails {
  address?: string;
  websiteUrl?: string;
  openingHours?: string;
  admissionType?: 'free' | 'ticketed' | 'paid' | 'opw_heritage_card' | 'donations_welcome' | string;
  ticketPricing?: string;
  guidedTours?: boolean | string;
  recommendedAgeGroup?: string;
  facilities?: string | string[];
}

export interface PracticalInfo {
  gettingThere?: string;
  parking?: string;
  bestTimeToVisit?: string;
  accessibility?: string;
  facilities?: string | string[];
  dogFriendly?: boolean;
  familyFriendly?: boolean;
  indoorOutdoor?: 'indoor' | 'outdoor' | 'both';
  websiteUrl?: string;
  bookingUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  openingHours?: string;
  seasonalAvailability?: string;
  accessNotes?: string;
  trailDetails?: WalkDetails;
  beachDetails?: BeachDetails;
}

export interface ClarePlace {
  id: string;
  slug: string;
  name: string;
  type: ItemType;
  contentType?: ContentType;
  category: string;
  region: RegionId;
  localityId?: LocalityId;
  locationName: string;
  tagline: string;
  description: string;
  localTip: string;
  heroImage: string;
  imageAlt?: string;
  galleryImages?: string[];
  imageCredit: string;
  isMajor: boolean;
  isHiddenGem: boolean;
  isFeatured: boolean;
  listingTier?: ListingTier;
  
  // Editorial Trust & Verification System V1
  verification?: PlaceVerification;
  verificationStatus?: VerificationStatus;
  verifiedAt?: string;
  lastVerifiedAt?: string;
  verificationNotes?: string;
  verifiedBy?: string;
  editorialStatus?: EditorialStatus;

  // Commercial / Promotion Status (Strictly independent from Verification)
  promotionStatus?: PromotionStatus;
  promotion?: PlacePromotion;

  // Specialized Architectural Details
  walkDetails?: WalkDetails;
  beachDetails?: BeachDetails;
  scenicRouteDetails?: ScenicRouteDetails;
  naturalPlaceDetails?: NaturalPlaceDetails;
  viewpointDetails?: ViewpointDetails;
  experienceDetails?: ExperienceDetails;
  venueDetails?: VenueDetails;
  attractionDetails?: AttractionDetails;

  // Context-specific discovery fields (optional for types where not applicable)
  weatherSuitability?: WeatherSuitability;
  priceIndicator?: PriceIndicator;
  estimatedDuration?: string;
  tags: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  practicalInfo: PracticalInfo;
  badge?: string;

  // Metadata / Preparation for future persistence
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'traditional-music' | 'festival' | 'food-drink' | 'arts-culture' | 'outdoors-sport' | 'community';
  dateDisplay: string;
  month: string;
  day: string;
  location: string;
  region: RegionId;
  description: string;
  admission: string;
  heroImage: string;
  imageCredit: string;
  isAnnualFestival: boolean;
  organizer?: string;
  ticketUrl?: string;
  schedule?: string;
  editorialStatus?: EditorialStatus;
}

export interface PlaceSuggestion {
  id: string;
  placeName: string;
  contentType?: ContentType;
  category: string;
  town: string;
  region: RegionId;
  description: string;
  whySpecial?: string;
  addressOrDirections?: string;
  website?: string;
  seasonalNotes?: string;
  submitterName: string;
  submitterEmail: string;
  submittedAt: string;
  status: 'pending_review' | 'accepted' | 'declined';
}

export type ContactEnquiryCategory = 'general' | 'suggest-place' | 'report-correction' | 'business';

export interface ContactEnquiry {
  id: string;
  category: ContactEnquiryCategory;
  name: string;
  email: string;
  subject?: string;
  relatedPlaceName?: string;
  message: string;
  submittedAt: string;
}

export interface ItineraryStop {
  stopNumber: number;
  timeSlot: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  travelNote?: string;
  insiderTip: string;
  relatedPlaceId?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  summary: string;
  stops: ItineraryStop[];
}

export interface ItineraryPlan {
  id: string;
  title: string;
  tagline: string;
  durationDays: number;
  pace: 'relaxed' | 'moderate' | 'active';
  idealFor: string;
  bestSeason?: string;
  summary?: string;
  heroImage: string;
  imageCredit?: string;
  highlights?: string[];
  days: {
    dayNumber: number;
    title?: string;
    theme?: string;
    summary?: string;
    morning?: {
      title: string;
      description: string;
    };
    afternoon?: {
      title: string;
      description: string;
    };
    evening?: {
      title: string;
      description: string;
    };
    foodStop?: {
      name: string;
      location: string;
      specialty: string;
    };
    proTip?: string;
    stops?: ItineraryStop[];
  }[];
}

export type ClareItinerary = ItineraryPlan;

export interface CommunityPhoto {
  id: string;
  title: string;
  location: string;
  region: RegionId;
  authorName: string;
  authorHandle: string;
  imageUrl: string;
  caption: string;
  dateTaken?: string;
  submittedDate?: string;
  likesCount?: number;
  featured?: boolean;
  featuredStory?: string;
}

export interface FilterState {
  searchQuery: string;
  region: RegionId | 'all';
  type: ItemType | 'all';
  category: string | 'all';
  weather: WeatherSuitability | 'all';
  familyFriendlyOnly: boolean;
  dogFriendlyOnly: boolean;
  freeOnly: boolean;
  hiddenGemsOnly: boolean;
  indoorOnly: boolean;
}
