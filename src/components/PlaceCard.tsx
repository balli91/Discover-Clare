import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles, 
  Sun, 
  Umbrella, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { ClarePlace } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import { isPlaceVerified, getPlaceVerification } from '../utils/verificationEngine';

interface PlaceCardProps {
  place: ClarePlace;
  onSelect?: (place: ClarePlace) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  matchReasons?: string[];
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onSelect,
  isSaved,
  onToggleSave,
  matchReasons
}) => {
  const getWeatherIcon = (suitability: ClarePlace['weatherSuitability']) => {
    switch (suitability) {
      case 'rainy-day-favourite':
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#1B4B66] bg-[#F0F4F8] px-2.5 py-0.5 rounded-full border border-[#E8E4DB]"><Umbrella className="w-3 h-3" /> Great in Rain</span>;
      case 'dry-only':
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#8C6B28] bg-[#FFF8EB] px-2.5 py-0.5 rounded-full border border-[#E8E4DB]"><Sun className="w-3 h-3" /> Best on Dry Days</span>;
      case 'all-weather':
        return <span className="inline-flex items-center gap-1 text-[11px] text-[#2C3333] bg-[#F2EFE9] px-2.5 py-0.5 rounded-full border border-[#E8E4DB]"><Check className="w-3 h-3" /> All Weather</span>;
      default:
        return null;
    }
  };

  const getRegionName = (region: ClarePlace['region']) => {
    switch (region) {
      case 'ennis':
      case 'central-clare' as any:
        return 'Ennis';
      case 'north-clare-burren':
      case 'north-clare' as any:
        return 'North Clare & Burren';
      case 'west-clare-atlantic-coast':
      case 'west-clare' as any:
        return 'West Clare Coast';
      case 'south-clare-shannon-estuary':
      case 'south-clare' as any:
        return 'South Clare & Shannon';
      case 'east-clare-lough-derg':
      case 'east-clare' as any:
        return 'East Clare & Lough Derg';
      default:
        return 'County Clare';
    }
  };

  return (
    <div 
      id={`place-card-${place.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Card Image Header */}
      <Link 
        to={`/places/${place.slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-[#F0F4F8] block cursor-pointer"
      >
        <img
          src={place.heroImage}
          alt={place.imageAlt || `${place.name} in ${place.locationName}, County Clare`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333]/85 via-[#2C3333]/20 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {isPlaceVerified(place) && (
              <VerifiedBadge verification={getPlaceVerification(place)} variant="compact" />
            )}
            {place.isHiddenGem && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#DCD6C8] text-[#2C3333] shadow-md border border-[#CBC4B4]">
                <Sparkles className="w-3 h-3 text-[#1B4B66]" />
                Hidden Gem
              </span>
            )}
            {place.badge && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-white shadow-md border border-[#246488]">
                {place.badge}
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave(place.id);
            }}
            id={`bookmark-btn-${place.id}`}
            aria-label={isSaved ? "Remove from saved places" : "Save place"}
            className="pointer-events-auto w-8 h-8 rounded-full bg-[#2C3333]/80 hover:bg-[#2C3333] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md hover:scale-110"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-300'}`} />
          </button>
        </div>

        {/* Location Overlay at Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-stone-100 text-xs">
          <span className="flex items-center gap-1 font-medium bg-[#2C3333]/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-[#DCD6C8]" />
            {place.locationName} • {getRegionName(place.region)}
          </span>
          <span className="font-semibold bg-[#2C3333]/80 px-2.5 py-1 rounded-full backdrop-blur-sm text-[#DCD6C8]">
            {place.priceIndicator === 'Free' ? 'Free Access' : place.priceIndicator}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Match Explanation Tags if passed */}
          {matchReasons && matchReasons.length > 0 && (
            <div className="mb-2.5 flex flex-wrap gap-1">
              {matchReasons.slice(0, 2).map((reason, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium bg-[#F2EFE9] text-[#1B4B66] px-2 py-0.5 rounded-md border border-[#E8E4DB]"
                >
                  ✓ {reason}
                </span>
              ))}
            </div>
          )}

          {/* Category & Duration Tags */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B4B66]">
              {place.category}
            </span>
            <span className="text-xs text-[#5A6363] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {place.estimatedDuration}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-[#2C3333] group-hover:text-[#1B4B66] transition-colors leading-snug">
            <Link to={`/places/${place.slug}`}>
              {place.name}
            </Link>
          </h3>

          {/* Tagline */}
          <p className="text-[#5A6363] text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
            {place.tagline}
          </p>

          {/* Local Insider Tip Box */}
          {place.localTip && (
            <div className="mt-3.5 p-3 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB] text-xs text-[#2C3333] flex gap-2.5 items-start">
              <span className="p-1 rounded bg-[#DCD6C8] text-[#1B4B66] shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3" />
              </span>
              <div className="leading-snug">
                <span className="font-bold text-[#1B4B66] block text-[11px] uppercase tracking-wider">
                  Local Tip
                </span>
                <p className="text-[#5A6363] text-[11px] line-clamp-2 mt-0.5">
                  {place.localTip}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Meta & Button */}
        <div className="mt-4 pt-3 border-t border-[#E8E4DB] flex items-center justify-between gap-2">
          <div>
            {getWeatherIcon(place.weatherSuitability)}
          </div>
          <Link
            to={`/places/${place.slug}`}
            id={`view-details-btn-${place.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B4B66] hover:text-[#123447] transition-colors group-hover:translate-x-0.5 transition-transform"
          >
            <span>View Full Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
