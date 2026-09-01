import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
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
  BookOpen
} from 'lucide-react';
import { ClarePlace } from '../types';
import { VerifiedBadge } from './VerifiedBadge';
import { isPlaceVerified, getPlaceVerification } from '../utils/verificationEngine';

interface PlaceModalProps {
  place: ClarePlace | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectRelated?: (place: ClarePlace) => void;
}

export const PlaceModal: React.FC<PlaceModalProps> = ({
  place,
  onClose,
  isSaved,
  onToggleSave,
  onSelectRelated
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (place) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [place, onClose]);

  if (!place) return null;

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/places/${place.slug}`;
    if (navigator.share) {
      navigator.share({
        title: `${place.name} | Discover Clare`,
        text: place.tagline,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' County Clare Ireland')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3333]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div 
        id="place-modal-dialog"
        className="relative bg-[#F9F8F5] text-[#2C3333] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DB] my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="modal-close-btn"
          aria-label="Close details"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#2C3333]/80 hover:bg-[#2C3333] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#2C3333]">
          <img
            src={place.heroImage}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333] via-[#2C3333]/40 to-transparent"></div>

          {/* Top floating badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {isPlaceVerified(place) && (
              <VerifiedBadge verification={getPlaceVerification(place)} variant="compact" />
            )}
            {place.isHiddenGem && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DCD6C8] text-[#2C3333] shadow-md border border-[#CBC4B4]">
                <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
                Hidden Gem
              </span>
            )}
            {place.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1B4B66] text-white shadow-md border border-[#246488]">
                {place.badge}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C3333]/80 text-stone-200 border border-stone-600 backdrop-blur-sm">
              {place.category}
            </span>
          </div>

          {/* Bottom title info over hero */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#DCD6C8] font-medium mb-1">
              <MapPin className="w-4 h-4 text-[#DCD6C8]" />
              <span>{place.locationName} • {place.region.replace('-', ' ').toUpperCase()}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {place.name}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-1 line-clamp-2 max-w-2xl font-light">
              {place.tagline}
            </p>
          </div>

          {/* Photographer Credit */}
          {place.imageCredit && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 hidden md:block text-[11px] bg-[#2C3333]/70 text-stone-300 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
              {place.imageCredit}
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F2EFE9] rounded-2xl border border-[#E8E4DB] text-xs">
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Duration</span>
              <span className="font-semibold text-[#2C3333] flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#1B4B66]" />
                {place.estimatedDuration}
              </span>
            </div>
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Price Level</span>
              <span className="font-semibold text-[#2C3333] mt-0.5 block">
                {place.priceIndicator} ({place.priceIndicator === 'Free' ? 'No admission fee' : 'Standard admission / pricing'})
              </span>
            </div>
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Weather Fit</span>
              <span className="font-semibold text-[#2C3333] mt-0.5 flex items-center gap-1 capitalize">
                {place.weatherSuitability.replace(/-/g, ' ')}
              </span>
            </div>
            <div>
              <span className="text-[#5A6363] block text-[10px] uppercase font-bold tracking-wider">Setting</span>
              <span className="font-semibold text-[#2C3333] mt-0.5 capitalize">
                {place.practicalInfo.indoorOutdoor}
              </span>
            </div>
          </div>

          {/* Local Insider Tip Box */}
          {place.localTip && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F2EFE9] border border-[#E8E4DB] text-[#2C3333]">
              <div className="flex items-center gap-2 mb-1.5 text-[#1B4B66] font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#1B4B66]" />
                <span className="font-serif">The Discover Clare Local Tip</span>
              </div>
              <p className="text-[#5A6363] text-sm leading-relaxed">
                "{place.localTip}"
              </p>
            </div>
          )}

          {/* Narrative Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#1B4B66] mb-2">
              About This Experience
            </h4>
            <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed">
              {place.description}
            </p>
          </div>

          {/* Practical Guide & Visitor Info */}
          <div className="border-t border-[#E8E4DB] pt-6">
            <h4 className="text-base font-serif font-bold text-[#2C3333] mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#1B4B66]" />
              <span>Practical Visitor Information</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {place.practicalInfo.gettingThere && (
                <div className="p-3.5 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB]">
                  <span className="font-bold text-[#2C3333] block mb-1 flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-[#1B4B66]" />
                    How to Get There
                  </span>
                  <p className="text-[#5A6363] leading-relaxed">
                    {place.practicalInfo.gettingThere}
                  </p>
                </div>
              )}

              {place.practicalInfo.parking && (
                <div className="p-3.5 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB]">
                  <span className="font-bold text-[#2C3333] block mb-1 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#1B4B66]" />
                    Parking & Arrival
                  </span>
                  <p className="text-[#5A6363] leading-relaxed">
                    {place.practicalInfo.parking}
                  </p>
                </div>
              )}

              {place.practicalInfo.bestTimeToVisit && (
                <div className="p-3.5 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB]">
                  <span className="font-bold text-[#2C3333] block mb-1 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#1B4B66]" />
                    Best Time to Visit
                  </span>
                  <p className="text-[#5A6363] leading-relaxed">
                    {place.practicalInfo.bestTimeToVisit}
                  </p>
                </div>
              )}

              {place.practicalInfo.accessibility && (
                <div className="p-3.5 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB]">
                  <span className="font-bold text-[#2C3333] block mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1B4B66]" />
                    Accessibility & Terrain
                  </span>
                  <p className="text-[#5A6363] leading-relaxed">
                    {place.practicalInfo.accessibility}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Checks for Dogs, Family, Facilities */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium ${
                place.practicalInfo.dogFriendly 
                  ? 'bg-[#EBF3F8] text-[#1B4B66] border border-[#C5DCEB]' 
                  : 'bg-[#F2EFE9] text-[#5A6363]'
              }`}>
                {place.practicalInfo.dogFriendly ? <Check className="w-3.5 h-3.5 text-[#1B4B66]" /> : <XIcon className="w-3.5 h-3.5 text-stone-400" />}
                {place.practicalInfo.dogFriendly ? 'Dog Friendly (on leads)' : 'No Dogs Permitted'}
              </span>

              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium ${
                place.practicalInfo.familyFriendly 
                  ? 'bg-[#EBF3F8] text-[#1B4B66] border border-[#C5DCEB]' 
                  : 'bg-[#F2EFE9] text-[#5A6363]'
              }`}>
                {place.practicalInfo.familyFriendly ? <Check className="w-3.5 h-3.5 text-[#1B4B66]" /> : <XIcon className="w-3.5 h-3.5 text-stone-400" />}
                {place.practicalInfo.familyFriendly ? 'Family & Child Friendly' : 'Adult / Strenuous'}
              </span>

              {place.practicalInfo.facilities && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F2EFE9] text-[#5A6363] border border-[#E8E4DB]">
                  <Info className="w-3.5 h-3.5 text-[#1B4B66]" />
                  <span>Facilities: {place.practicalInfo.facilities}</span>
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {place.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-md bg-[#F2EFE9] text-[#5A6363] text-xs font-medium border border-[#E8E4DB]">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-6 bg-[#F2EFE9] border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleSave(place.id)}
              id="modal-toggle-save-btn"
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors border ${
                isSaved 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' 
                  : 'bg-white border-[#E8E4DB] text-[#2C3333] hover:bg-white/80'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : 'text-stone-400'}`} />
              <span>{isSaved ? 'Saved to My Clare' : 'Save Place'}</span>
            </button>

            <button
              onClick={handleShare}
              id="modal-share-btn"
              className="p-2.5 rounded-full bg-white border border-[#E8E4DB] text-[#2C3333] hover:bg-white/80 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                navigate(`/places/${place.slug}`);
              }}
              id="modal-view-full-guide-btn"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[#DCD6C8]" />
              <span>View Full Guide</span>
            </button>

            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-[#2C3333] hover:bg-[#1a1f1f] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#DCD6C8]" />
              <span>Directions</span>
            </a>

            {place.practicalInfo.websiteUrl && (
              <a
                href={place.practicalInfo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex flex-initial px-4 py-2.5 rounded-full bg-white text-[#2C3333] hover:bg-stone-100 font-medium text-sm items-center justify-center gap-2 transition-colors border border-[#E8E4DB] shadow-sm"
              >
                <Globe className="w-4 h-4 text-[#1B4B66]" />
                <span>Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#5A6363]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
