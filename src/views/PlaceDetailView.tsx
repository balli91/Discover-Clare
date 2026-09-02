import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Heart, 
  ExternalLink, 
  Sparkles, 
  Car, 
  Navigation, 
  Calendar, 
  Check, 
  X as XIcon, 
  Info, 
  Globe, 
  Share2, 
  ShieldCheck,
  Umbrella,
  ChevronRight,
  ArrowLeft,
  Compass,
  Flag,
  Footprints,
  Waves,
  Mountain,
  Eye,
  Ticket,
  Store,
  ShieldAlert,
  Landmark
} from 'lucide-react';
import { getPlaceBySlug, getRelatedPlaces, CLARE_REGIONS, getLocalityById } from '../data/clareData';
import { ClarePlace } from '../types';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';
import { generatePlaceJsonLd, generateBreadcrumbJsonLd } from '../utils/seo';
import { VerifiedBadge } from '../components/VerifiedBadge';
import { getPlaceOpeningStatus } from '../utils/discoveryEngine';
import { getPlaceVerification, isPlaceVerified } from '../utils/verificationEngine';

interface PlaceDetailViewProps {
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onSelectPlace?: (place: ClarePlace) => void;
}

export const PlaceDetailView: React.FC<PlaceDetailViewProps> = ({
  isSaved,
  onToggleSave,
  onSelectPlace
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const place = slug ? getPlaceBySlug(slug) : undefined;

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!place) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
        <SEO
          title="Place Guide Not Found | Discover Clare"
          description="We could not locate this place guide on Discover Clare. It may have been renamed or moved."
          noIndex={true}
        />
        <div className="w-16 h-16 rounded-full bg-[#F2EFE9] text-[#1B4B66] mx-auto flex items-center justify-center border border-[#E8E4DB]">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C3333]">
          Place Guide Not Found
        </h1>
        <p className="text-[#5A6363] text-base max-w-md mx-auto font-light">
          We couldn't locate a guide for "{slug}". It may have been renamed or moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to="/explore"
            className="px-6 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-medium text-sm transition-colors shadow-sm"
          >
            Explore All Places
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-[#F2EFE9] hover:bg-[#E8E4DB] text-[#2C3333] font-medium text-sm transition-colors border border-[#E8E4DB]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const regionInfo = CLARE_REGIONS.find(r => r.id === place.region);
  const localityInfo = place.localityId ? getLocalityById(place.localityId) : undefined;
  const relatedPlaces = getRelatedPlaces(place, 3);
  const saved = isSaved(place.id);
  const openingStatus = getPlaceOpeningStatus(place);

  // Structured Data (Place schema + BreadcrumbList schema)
  const placeJsonLd = generatePlaceJsonLd(place);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Explore', url: '/explore' },
    { name: regionInfo ? regionInfo.name : 'Regions', url: regionInfo ? `/regions/${regionInfo.id}` : '/regions' },
    ...(localityInfo ? [{ name: localityInfo.name, url: `/explore?locality=${localityInfo.id}` }] : []),
    { name: place.name, url: `/places/${place.slug}` }
  ]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${place.name} | Discover Clare Guide`,
        text: place.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Guide link copied to clipboard!');
    }
  };

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.locationName + ' County Clare Ireland')}`;
  };

  const isOutdoorOrNatural = 
    place.contentType === 'natural_place' || 
    place.contentType === 'walk' || 
    place.contentType === 'beach' || 
    place.contentType === 'viewpoint' || 
    place.contentType === 'scenic_route' ||
    (place.type === 'attraction' && place.priceIndicator === 'Free' && place.practicalInfo.indoorOutdoor === 'outdoor');

  const descriptiveImageAlt = place.imageAlt || `${place.name} in ${place.locationName}, County Clare`;

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEO
        title={place.seoTitle || `${place.name} | Discover Clare`}
        description={place.seoDescription || `${place.name} in ${place.locationName}, County Clare: ${place.tagline} Practical visitor guide, coordinates, local tips, and travel details.`}
        canonical={`/places/${place.slug}`}
        image={place.heroImage}
        imageAlt={descriptiveImageAlt}
        type="article"
        ogTitle={`${place.name} — Visitor Guide & Location`}
        ogDescription={place.description || place.tagline}
        twitterTitle={`${place.name} | Discover Clare`}
        twitterDescription={place.description || place.tagline}
        jsonLd={[placeJsonLd, breadcrumbJsonLd]}
      />

      {/* Top Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5A6363] flex-wrap">
        <Link to="/" className="hover:text-[#1B4B66] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <Link to="/explore" className="hover:text-[#1B4B66] transition-colors">Explore</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <Link to={`/regions/${place.region}`} className="hover:text-[#1B4B66] transition-colors">
          {regionInfo ? regionInfo.name.split('&')[0] : place.region}
        </Link>
        {localityInfo && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link to={`/explore?locality=${localityInfo.id}`} className="hover:text-[#1B4B66] transition-colors">
              {localityInfo.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="text-[#2C3333] font-medium truncate">{place.name}</span>
      </nav>

      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#F2EFE9] text-[#5A6363] hover:text-[#2C3333] text-xs font-medium transition-colors border border-[#E8E4DB] shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to previous page</span>
        </button>
      </div>

      {/* Hero Presentation Header */}
      <div className="bg-[#2C3333] rounded-3xl overflow-hidden shadow-md border border-[#3D4545] relative">
        <div className="relative h-72 sm:h-96 md:h-[450px] w-full bg-[#2C3333]">
          <img
            src={place.heroImage}
            alt={descriptiveImageAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333] via-[#2C3333]/50 to-transparent"></div>

          {/* Floating Badges */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap gap-2 z-10">
            {isPlaceVerified(place) && (
              <VerifiedBadge verification={getPlaceVerification(place)} variant="compact" />
            )}
            {place.isHiddenGem && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#DCD6C8] text-[#2C3333] shadow-md border border-[#CBC4B4]">
                <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
                Hidden Gem
              </span>
            )}
            {place.badge && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1B4B66] text-white shadow-md border border-[#246488]">
                {place.badge}
              </span>
            )}
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2C3333]/80 text-stone-200 border border-stone-600 backdrop-blur-sm">
              {place.category}
            </span>
          </div>

          {/* Title & Region Info over Hero */}
          <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white space-y-2 max-w-3xl z-10">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#DCD6C8] font-medium">
              <MapPin className="w-4 h-4 text-[#DCD6C8]" />
              <Link to={`/regions/${place.region}`} className="hover:underline">
                {place.locationName} • {regionInfo ? regionInfo.name : place.region}
              </Link>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {place.name}
            </h1>
            <p className="text-stone-300 text-sm sm:text-lg font-light leading-relaxed">
              {place.tagline}
            </p>
          </div>

          {/* Image Credit */}
          {place.imageCredit && (
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 hidden sm:block text-[11px] bg-[#2C3333]/80 text-stone-300 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
              {place.imageCredit}
            </div>
          )}
        </div>

        {/* Action Toolbar */}
        <div className="p-4 sm:p-6 bg-[#2C3333] border-t border-[#3D4545] flex flex-wrap items-center justify-between gap-3 text-stone-100">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onToggleSave(place.id)}
              id={`place-detail-save-btn-${place.id}`}
              className={`px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm flex items-center gap-2 transition-all border shadow-sm ${
                saved
                  ? 'bg-rose-600 border-rose-500 text-white hover:bg-rose-700'
                  : 'bg-[#3D4545] border-[#4D5656] text-white hover:bg-[#4D5656]'
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? 'fill-white text-white' : 'text-stone-300'}`} />
              <span>{saved ? 'Saved to My Clare' : 'Save Place'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-[#3D4545] hover:bg-[#4D5656] text-white border border-[#4D5656] transition-colors"
              aria-label="Share guide"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#1B4B66] hover:bg-[#153a4f] text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#DCD6C8]" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-[#DCD6C8]" />
            </a>

            {place.practicalInfo.websiteUrl && (
              <a
                href={place.practicalInfo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white text-[#2C3333] hover:bg-stone-100 font-medium text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
              >
                <Globe className="w-4 h-4 text-[#1B4B66]" />
                <span>Official Website</span>
                <ExternalLink className="w-3 h-3 text-[#5A6363]" />
              </a>
            )}

            {place.practicalInfo.bookingUrl && (
              <a
                href={place.practicalInfo.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#DCD6C8] text-[#2C3333] hover:bg-[#CBC4B4] font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
              >
                <span>Book Tickets / Reservation</span>
                <ExternalLink className="w-3 h-3 text-[#2C3333]" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Narrative & Practical Guide */}
        <div className="lg:col-span-8 space-y-8">
          {/* Editorial Verification Trust Box */}
          {isPlaceVerified(place) && (
            <VerifiedBadge
              verification={getPlaceVerification(place)}
              variant="detailed"
            />
          )}

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-[#E8E4DB] shadow-sm text-xs">
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Duration</span>
              <span className="font-semibold text-[#2C3333] flex items-center gap-1.5 mt-1 text-sm">
                <Clock className="w-4 h-4 text-[#1B4B66]" />
                {place.estimatedDuration}
              </span>
            </div>
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">
                {isOutdoorOrNatural ? 'Public Access' : 'Admission / Price'}
              </span>
              <span className="font-semibold text-[#2C3333] mt-1 block text-sm">
                {place.priceIndicator === 'Free' ? 'Free Public Access' : `${place.priceIndicator} (${place.priceIndicator === '€' ? 'Budget / Low Cost' : place.priceIndicator === '€€' ? 'Standard Tier' : 'Premium Tier'})`}
              </span>
            </div>
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Weather Fit</span>
              <span className="font-semibold text-[#2C3333] mt-1 flex items-center gap-1.5 capitalize text-sm">
                <Umbrella className="w-4 h-4 text-[#1B4B66]" />
                {place.weatherSuitability.replace(/-/g, ' ')}
              </span>
            </div>
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Access Status</span>
              <span className="font-semibold text-[#2C3333] mt-1 block text-sm truncate" title={openingStatus.detail}>
                {openingStatus.label}
              </span>
            </div>
          </div>

          {/* Local Tip Box */}
          {place.localTip && (
            <div className="p-6 rounded-3xl bg-[#F2EFE9] border border-[#E8E4DB] space-y-2">
              <div className="flex items-center gap-2 text-[#1B4B66] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#1B4B66]" />
                <span className="font-serif text-base">The Discover Clare Local Tip</span>
              </div>
              <p className="text-[#2C3333] text-sm sm:text-base leading-relaxed font-light italic">
                "{place.localTip}"
              </p>
            </div>
          )}

          {/* Editorial Narrative */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
              Editorial Guide
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
              About {place.name}
            </h2>
            <div className="text-[#5A6363] text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p>{place.description}</p>
            </div>
          </div>

          {/* Specialized Detail Card: Walk / Trail */}
          {place.walkDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                    Trail & Route Profile
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Walk & Trail Details
                  </h3>
                </div>
                <Footprints className="w-5 h-5 text-[#1B4B66]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] text-xs">
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Distance</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block">{place.walkDetails.distanceKm} km</span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Difficulty</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">{place.walkDetails.difficulty}</span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Route Type</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">{place.walkDetails.routeType.replace(/_/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Est. Duration</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block">{place.walkDetails.estimatedDuration}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Navigation className="w-4 h-4 text-[#1B4B66]" />
                    Trailhead & Start Point
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.walkDetails.trailhead}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Mountain className="w-4 h-4 text-[#1B4B66]" />
                    Underfoot Terrain
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.walkDetails.terrain}</p>
                </div>
              </div>

              {place.walkDetails.safetyNotes && (
                <div className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#EADBCC] flex items-start gap-3 text-xs sm:text-sm text-[#7D4F27]">
                  <ShieldAlert className="w-4 h-4 text-[#C16622] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#C16622]">Trail Safety & Preparedness</span>
                    <p className="mt-0.5 leading-relaxed text-[#7D4F27] font-light">{place.walkDetails.safetyNotes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specialized Detail Card: Beach */}
          {place.beachDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                    Coastal & Water Profile
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Beach & Water Conditions
                  </h3>
                </div>
                <Waves className="w-5 h-5 text-[#1B4B66]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] text-xs">
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Beach Type</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">
                    {(place.beachDetails.surfaceType || place.beachDetails.beachType || 'Sand').replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Blue Flag</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block">
                    {place.beachDetails.blueFlagStatus ? 'Yes (Certified)' : 'Uncertified'}
                  </span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Lifeguards</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">
                    {(place.beachDetails.lifeguardStatus || 'Seasonal').replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Swimming</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">
                    {(place.beachDetails.swimmingSuitability || place.beachDetails.swimmingSafety || 'Caution Tides').replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {place.beachDetails.waterSportsNotes && (
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Waves className="w-4 h-4 text-[#1B4B66]" />
                    Surfing & Water Activities
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.beachDetails.waterSportsNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Specialized Detail Card: Natural Place / Geology */}
          {place.naturalPlaceDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                    Geological & Environmental Feature
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Natural Landmark Profile
                  </h3>
                </div>
                <Mountain className="w-5 h-5 text-[#1B4B66]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Navigation className="w-4 h-4 text-[#1B4B66]" />
                    Access & Approach
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.naturalPlaceDetails.accessNotes}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Compass className="w-4 h-4 text-[#1B4B66]" />
                    Landscape & Terrain
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.naturalPlaceDetails.terrain}</p>
                </div>
              </div>

              {place.naturalPlaceDetails.safetyAdvice && (
                <div className="p-4 rounded-2xl bg-[#FBF7F0] border border-[#EADBCC] flex items-start gap-3 text-xs sm:text-sm text-[#7D4F27]">
                  <ShieldAlert className="w-4 h-4 text-[#C16622] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#C16622]">Safety & Environment Advice</span>
                    <p className="mt-0.5 leading-relaxed font-light">{place.naturalPlaceDetails.safetyAdvice}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specialized Detail Card: Scenic Driving Route */}
          {place.scenicRouteDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#C88A1E] block">
                    Scenic Driving Experience
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Scenic Touring Route Profile
                  </h3>
                </div>
                <Car className="w-5 h-5 text-[#1B4B66]" />
              </div>

              {/* Route Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] text-xs">
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Start Point</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block truncate">
                    {place.scenicRouteDetails.startPoint}
                  </span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Destination</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block truncate">
                    {place.scenicRouteDetails.endPoint}
                  </span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Route Distance</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block">
                    {place.scenicRouteDetails.routeDistanceKm} km
                  </span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Estimated Time</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block">
                    {place.scenicRouteDetails.estimatedDrivingTime}
                  </span>
                </div>
              </div>

              {/* Route Direction & Road Characteristics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                {place.scenicRouteDetails.bestDirection && (
                  <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                    <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                      <Compass className="w-4 h-4 text-[#1B4B66]" />
                      Recommended Direction & Flow
                    </span>
                    <p className="text-[#5A6363] leading-relaxed font-light">
                      {place.scenicRouteDetails.bestDirection}
                    </p>
                  </div>
                )}
                {place.scenicRouteDetails.roadConditionNotes && (
                  <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                    <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                      <Car className="w-4 h-4 text-[#1B4B66]" />
                      Road Conditions & Driving Advice
                    </span>
                    <p className="text-[#5A6363] leading-relaxed font-light">
                      {place.scenicRouteDetails.roadConditionNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* Key Scenic Stops */}
              {place.scenicRouteDetails.keyStops && place.scenicRouteDetails.keyStops.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#2C3333] uppercase tracking-wider block">
                    Key Scenic Stops Along the Route
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {place.scenicRouteDetails.keyStops.map((stop, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#F9F8F5] border border-[#E8E4DB] flex items-center gap-2.5 text-xs sm:text-sm text-[#2C3333]">
                        <span className="w-5 h-5 rounded-full bg-[#1B4B66] text-[#DCD6C8] font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-medium">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights if provided */}
              {place.scenicRouteDetails.highlights && place.scenicRouteDetails.highlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#E8E4DB]">
                  <span className="text-xs font-bold text-[#2C3333] uppercase tracking-wider block">
                    Route Highlights & Viewpoints
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {place.scenicRouteDetails.highlights.map((highlight, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-[#F2EFE9] text-[#2C3333] text-xs font-medium border border-[#E8E4DB]">
                        ★ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specialized Detail Card: Venue Details */}
          {place.venueDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                    Venue Information
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Visiting {place.name}
                  </h3>
                </div>
                <Store className="w-5 h-5 text-[#1B4B66]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <MapPin className="w-4 h-4 text-[#1B4B66]" />
                    Physical Address
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.venueDetails.address}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Clock className="w-4 h-4 text-[#1B4B66]" />
                    Verified Service Hours
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.venueDetails.openingHours}</p>
                </div>
              </div>

              {place.venueDetails.facilities && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#2C3333] uppercase tracking-wider block">
                    Venue Amenities & Features
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(place.venueDetails.facilities) ? (
                      place.venueDetails.facilities.map((fac, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full bg-[#F2EFE9] text-[#2C3333] text-xs font-medium border border-[#E8E4DB]">
                          ✓ {fac}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1.5 rounded-full bg-[#F2EFE9] text-[#2C3333] text-xs font-medium border border-[#E8E4DB]">
                        ✓ {place.venueDetails.facilities}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specialized Detail Card: Attraction Details */}
          {place.attractionDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                    Heritage & Visitor Attraction
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Attraction Visitor Profile
                  </h3>
                </div>
                <Landmark className="w-5 h-5 text-[#1B4B66]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Ticket className="w-4 h-4 text-[#1B4B66]" />
                    Admission & Tickets
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">
                    {place.attractionDetails.ticketPricing || (place.attractionDetails.admissionType ? place.attractionDetails.admissionType.replace(/_/g, ' ') : 'Standard Admission')}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Clock className="w-4 h-4 text-[#1B4B66]" />
                    Opening Schedule
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">{place.attractionDetails.openingHours || 'See visitor reception'}</p>
                </div>
              </div>

              {place.attractionDetails.guidedTours && (
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1 text-xs sm:text-sm">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Sparkles className="w-4 h-4 text-[#1B4B66]" />
                    Guided Tours & Interpretive Experience
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">
                    {typeof place.attractionDetails.guidedTours === 'string' ? place.attractionDetails.guidedTours : 'Guided interpretive tours available on site.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Specialized Detail Card: Experience / Activity */}
          {place.experienceDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                    Curated Experience
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                    Experience Particulars
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-[#1B4B66]" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] text-xs">
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Activity</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block truncate">{place.experienceDetails.activityType}</span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Booking</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">{place.experienceDetails.bookingRequirements.replace(/_/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Season</span>
                  <span className="font-semibold text-[#2C3333] text-sm mt-0.5 block">{place.experienceDetails.seasonality}</span>
                </div>
                <div>
                  <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Skill Level</span>
                  <span className="font-semibold text-[#2C3333] capitalize text-sm mt-0.5 block">{place.experienceDetails.skillLevel ? place.experienceDetails.skillLevel.replace(/_/g, ' ') : 'All Levels'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1 text-xs sm:text-sm">
                <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                  <MapPin className="w-4 h-4 text-[#1B4B66]" />
                  Meeting Point & Assembly
                </span>
                <p className="text-[#5A6363] leading-relaxed font-light">{place.experienceDetails.meetingPoint}</p>
              </div>
            </div>
          )}

          {/* Practical Visitor Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E4DB] pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                  Trip Planning
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                  Practical Visitor Information
                </h3>
              </div>
              <Info className="w-5 h-5 text-[#1B4B66]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {place.practicalInfo.gettingThere && (
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Navigation className="w-4 h-4 text-[#1B4B66]" />
                    How to Get There
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">
                    {place.practicalInfo.gettingThere}
                  </p>
                </div>
              )}

              {place.practicalInfo.parking && (
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Car className="w-4 h-4 text-[#1B4B66]" />
                    Parking & Arrival
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">
                    {place.practicalInfo.parking}
                  </p>
                </div>
              )}

              {place.practicalInfo.bestTimeToVisit && (
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <Calendar className="w-4 h-4 text-[#1B4B66]" />
                    Best Time to Visit
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">
                    {place.practicalInfo.bestTimeToVisit}
                  </p>
                </div>
              )}

              {place.practicalInfo.accessibility && (
                <div className="p-4 rounded-2xl bg-[#F9F8F5] border border-[#E8E4DB] space-y-1">
                  <span className="font-bold text-[#2C3333] flex items-center gap-2 text-sm font-serif">
                    <ShieldCheck className="w-4 h-4 text-[#1B4B66]" />
                    Accessibility & Terrain
                  </span>
                  <p className="text-[#5A6363] leading-relaxed font-light">
                    {place.practicalInfo.accessibility}
                  </p>
                </div>
              )}
            </div>

            {/* Feature Pills */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium ${
                place.practicalInfo.dogFriendly 
                  ? 'bg-[#EBF3F8] text-[#1B4B66] border border-[#C5DCEB]' 
                  : 'bg-[#F2EFE9] text-[#5A6363]'
              }`}>
                {place.practicalInfo.dogFriendly ? <Check className="w-4 h-4 text-[#1B4B66]" /> : <XIcon className="w-4 h-4 text-stone-400" />}
                {place.practicalInfo.dogFriendly ? 'Dog Friendly (on leads)' : 'No Dogs Permitted'}
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium ${
                place.practicalInfo.familyFriendly 
                  ? 'bg-[#EBF3F8] text-[#1B4B66] border border-[#C5DCEB]' 
                  : 'bg-[#F2EFE9] text-[#5A6363]'
              }`}>
                {place.practicalInfo.familyFriendly ? <Check className="w-4 h-4 text-[#1B4B66]" /> : <XIcon className="w-4 h-4 text-stone-400" />}
                {place.practicalInfo.familyFriendly ? 'Family & Child Friendly' : 'Adult / Strenuous'}
              </span>

              {place.practicalInfo.facilities && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F2EFE9] text-[#5A6363] border border-[#E8E4DB]">
                  <Info className="w-4 h-4 text-[#1B4B66]" />
                  <span>Facilities: {Array.isArray(place.practicalInfo.facilities) ? place.practicalInfo.facilities.join(', ') : place.practicalInfo.facilities}</span>
                </span>
              )}

              {place.practicalInfo.openingHours && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F2EFE9] text-[#5A6363] border border-[#E8E4DB]">
                  <Clock className="w-4 h-4 text-[#1B4B66]" />
                  <span>Hours: {place.practicalInfo.openingHours}</span>
                </span>
              )}
            </div>

            {/* Editorial Correction Callout */}
            <div className="pt-4 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5A6363]">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-stone-400" />
                <span>Notice an error or outdated detail for {place.name}?</span>
              </div>
              <Link
                to={`/contact?category=report-error&subject=${encodeURIComponent(`Correction for ${place.name}`)}`}
                className="font-semibold text-[#1B4B66] hover:underline underline-offset-2 shrink-0"
              >
                Report a correction to our editorial team →
              </Link>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {place.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-white text-[#5A6363] text-xs font-medium border border-[#E8E4DB] shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Region info, Location Card, Related Places */}
        <div className="lg:col-span-4 space-y-6">
          {/* Region Quick Card */}
          {regionInfo && (
            <div className="bg-white rounded-3xl p-6 border border-[#E8E4DB] shadow-sm space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                Region Overview
              </span>
              <h4 className="text-lg font-serif font-bold text-[#2C3333]">
                {regionInfo.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#5A6363] leading-relaxed font-light">
                {regionInfo.tagline}
              </p>
              <div className="pt-2">
                <Link
                  to={`/regions/${regionInfo.id}`}
                  className="w-full py-2.5 px-4 rounded-full bg-[#F2EFE9] hover:bg-[#E8E4DB] text-[#1B4B66] font-semibold text-xs transition-colors flex items-center justify-between border border-[#E8E4DB]"
                >
                  <span>Explore all in this region</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Directions / Location Summary */}
          <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 border border-[#3D4545] space-y-4">
            <div className="flex items-center gap-2 text-[#DCD6C8] font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Location & Coordinates</span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white">
              {place.locationName}, County Clare
            </h4>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              GPS: {place.coordinates.lat.toFixed(4)}° N, {Math.abs(place.coordinates.lng).toFixed(4)}° W
            </p>
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#1B4B66] hover:bg-[#153a4f] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#DCD6C8]" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Suggest a Place Banner in Sidebar */}
          <div className="bg-[#F2EFE9] rounded-3xl p-5 border border-[#E8E4DB] space-y-2.5 text-xs">
            <span className="font-bold text-[#1B4B66] uppercase tracking-wider text-[10px] block">
              Know a Hidden Gem?
            </span>
            <p className="text-[#5A6363] leading-relaxed font-light">
              Know a special spot in Clare that deserves to be researched and curated?
            </p>
            <Link
              to="/suggest-a-place"
              className="inline-flex items-center gap-1 font-semibold text-[#1B4B66] hover:underline"
            >
              <span>Suggest a Place for Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Related Experiences */}
          {relatedPlaces.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-base font-serif font-bold text-[#2C3333]">
                Nearby & Similar Experiences
              </h4>
              <div className="space-y-4">
                {relatedPlaces.map(rel => (
                  <Link
                    key={rel.id}
                    to={`/places/${rel.slug}`}
                    className="group bg-white rounded-2xl p-3 border border-[#E8E4DB] shadow-sm hover:shadow-md transition-all flex gap-3 items-center block"
                  >
                    <img
                      src={rel.heroImage}
                      alt={rel.name}
                      loading="lazy"
                      decoding="async"
                      className="w-20 h-20 rounded-xl object-cover bg-[#F0F4F8] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B4B66] block truncate">
                        {rel.category}
                      </span>
                      <h5 className="font-serif font-bold text-sm text-[#2C3333] group-hover:text-[#1B4B66] transition-colors truncate">
                        {rel.name}
                      </h5>
                      <span className="text-xs text-[#5A6363] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#1B4B66]" />
                        {rel.locationName}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
