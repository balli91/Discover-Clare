import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, Trash2, MapPin, ArrowRight, Printer } from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectPlace?: (place: ClarePlace) => void;
  onNavigateToPlanner?: () => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
  onSelectPlace,
  onNavigateToPlanner
}) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const savedPlaces = CLARE_PUBLISHED_PLACES.filter(p => savedIds.includes(p.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3333]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        id="saved-places-dialog"
        className="relative bg-[#F9F8F5] text-[#2C3333] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DB] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8E4DB] flex items-center justify-between bg-[#F2EFE9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <Heart className="w-5 h-5 fill-rose-600" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2C3333]">
                My Saved Places
              </h2>
              <p className="text-xs text-[#5A6363]">
                {savedPlaces.length} {savedPlaces.length === 1 ? 'place' : 'places'} bookmarked for your trip
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#E8E4DB] hover:bg-[#DCD6C8] text-[#2C3333] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {savedPlaces.length === 0 ? (
            <div className="py-12 text-center text-[#5A6363]">
              <Heart className="w-12 h-12 text-[#DCD6C8] mx-auto mb-3 stroke-1" />
              <p className="font-semibold text-[#2C3333]">No saved places yet</p>
              <p className="text-xs text-[#5A6363] mt-1 max-w-sm mx-auto">
                Tap the heart icon on any attraction, restaurant, walk, or hidden gem to bookmark it for your visit.
              </p>
            </div>
          ) : (
            savedPlaces.map((place) => (
              <div
                key={place.id}
                className="p-3.5 rounded-2xl bg-white border border-[#E8E4DB] shadow-sm hover:border-[#1B4B66]/50 flex items-center gap-3.5 transition-all group"
              >
                <img
                  src={place.heroImage}
                  alt={place.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                  onClick={() => {
                    navigate(`/places/${place.slug}`);
                    onClose();
                  }}
                />
                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    navigate(`/places/${place.slug}`);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-[#2C3333] group-hover:text-[#1B4B66] text-sm truncate">
                      {place.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#1B4B66] px-2 py-0.5 bg-[#F0F4F8] rounded-full border border-[#E8E4DB]">
                      {place.priceIndicator}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A6363] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#1B4B66]" />
                    {place.locationName} • {place.category}
                  </p>
                  <p className="text-[11px] text-[#5A6363] line-clamp-1 mt-0.5 font-light">
                    {place.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onToggleSave(place.id)}
                    title="Remove from saved"
                    className="p-2 rounded-full text-[#5A6363] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      navigate(`/places/${place.slug}`);
                      onClose();
                    }}
                    className="p-2 rounded-full text-[#1B4B66] hover:bg-[#F0F4F8] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedPlaces.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#F2EFE9] border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white border border-[#E8E4DB] text-[#2C3333] hover:bg-[#F9F8F5] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#5A6363]" />
              <span>Print My Clare List</span>
            </button>

            <button
              onClick={() => {
                onClose();
                if (onNavigateToPlanner) {
                  onNavigateToPlanner();
                } else {
                  navigate('/plan-your-trip');
                }
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Build Trip Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
