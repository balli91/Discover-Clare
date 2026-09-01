import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace?: (place: ClarePlace) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlace
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Rainy day activities',
    'Beaches near Kilkee',
    'Walks in the Burren',
    'Traditional music pubs',
    'Things to do with kids',
    'Atlantic seafood',
    'Hidden gems',
    'Free to visit'
  ];

  // Natural language query filter matching
  const filteredPlaces = CLARE_PUBLISHED_PLACES.filter((place) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();

    // Check weather-specific queries
    if (q.includes('rain') && (place.weatherSuitability === 'rainy-day-favourite' || place.weatherSuitability === 'all-weather' || place.practicalInfo.indoorOutdoor === 'indoor')) {
      return true;
    }
    // Check beach / coastal
    if ((q.includes('beach') || q.includes('coast') || q.includes('surf')) && (place.category.toLowerCase().includes('coastal') || place.category.toLowerCase().includes('surf') || place.tags.some(t => t.toLowerCase().includes('beach')))) {
      return true;
    }
    // Check kids / family
    if ((q.includes('kid') || q.includes('child') || q.includes('family')) && place.practicalInfo.familyFriendly) {
      return true;
    }
    // Check music / pub
    if ((q.includes('music') || q.includes('pub') || q.includes('trad') || q.includes('session')) && (place.category.toLowerCase().includes('music') || place.category.toLowerCase().includes('pub') || place.tags.some(t => t.toLowerCase().includes('music')))) {
      return true;
    }
    // Check seafood / food
    if ((q.includes('food') || q.includes('seafood') || q.includes('eat') || q.includes('restaurant')) && place.type === 'food') {
      return true;
    }
    // Check hidden gem / secret
    if ((q.includes('hidden') || q.includes('secret') || q.includes('quiet') || q.includes('gem')) && place.isHiddenGem) {
      return true;
    }
    // Check free
    if ((q.includes('free') || q.includes('budget')) && place.priceIndicator === 'Free') {
      return true;
    }

    // Standard string matching
    return (
      place.name.toLowerCase().includes(q) ||
      place.locationName.toLowerCase().includes(q) ||
      place.tagline.toLowerCase().includes(q) ||
      place.category.toLowerCase().includes(q) ||
      place.tags.some(t => t.toLowerCase().includes(q)) ||
      place.region.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C3333]/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20">
      <div 
        id="search-modal-dialog"
        className="relative bg-[#F9F8F5] text-[#2C3333] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8E4DB] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Header */}
        <div className="p-4 border-b border-[#E8E4DB] flex items-center gap-3 bg-[#F2EFE9]">
          <Search className="w-5 h-5 text-[#1B4B66] shrink-0" />
          <input
            ref={inputRef}
            id="search-dialog-input"
            aria-label="Search attractions, walks, seafood, and towns in County Clare"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search attractions, walks, rainy day spots, seafood, towns..."
            className="w-full bg-transparent text-[#2C3333] placeholder-[#5A6363] text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#5A6363] hover:text-[#2C3333]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-md bg-[#E8E4DB] text-[#2C3333] text-xs font-semibold hover:bg-[#DCD6C8] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Suggested Quick Queries if empty */}
        {!query.trim() && (
          <div className="p-5">
            <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block mb-3">
              Popular Searches & Natural Questions
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setQuery(prompt)}
                  className="px-3 py-1.5 rounded-full bg-[#F2EFE9] hover:bg-[#1B4B66] hover:text-white hover:border-[#1B4B66] border border-[#E8E4DB] text-xs font-medium text-[#2C3333] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#1B4B66]" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E8E4DB] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#5A6363]">
              <div>
                <span className="font-semibold text-[#2C3333] block mb-1">North Clare</span>
                <span>Cliffs, Burren, Doolin</span>
              </div>
              <div>
                <span className="font-semibold text-[#2C3333] block mb-1">West Clare</span>
                <span>Lahinch, Kilkee, Coast</span>
              </div>
              <div>
                <span className="font-semibold text-[#2C3333] block mb-1">East Clare</span>
                <span>Killaloe, Lough Derg</span>
              </div>
              <div>
                <span className="font-semibold text-[#2C3333] block mb-1">Central Clare</span>
                <span>Ennis, Bunratty Castle</span>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="p-3 max-h-[60vh] overflow-y-auto divide-y divide-[#E8E4DB]">
            {filteredPlaces.length === 0 ? (
              <div className="py-12 text-center text-[#5A6363] text-sm">
                <p>No places found matching "{query}".</p>
                <p className="text-xs text-[#5A6363] mt-1">Try broader terms like "Burren", "seafood", "walks", or "caves".</p>
              </div>
            ) : (
              <div>
                <div className="px-3 py-1.5 text-xs text-[#5A6363] font-semibold">
                  Found {filteredPlaces.length} matching {filteredPlaces.length === 1 ? 'place' : 'places'} in County Clare
                </div>
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    onClick={() => {
                      if (onSelectPlace) {
                        onSelectPlace(place);
                      }
                      navigate(`/places/${place.slug}`);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#F2EFE9] transition-colors cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={place.heroImage}
                      alt={place.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#F0F4F8] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#2C3333] group-hover:text-[#1B4B66] text-sm truncate">
                          {place.name}
                        </span>
                        {place.isHiddenGem && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCD6C8] text-[#2C3333]">
                            Hidden Gem
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5A6363] truncate mt-0.5">
                        {place.locationName} • {place.category} • {place.estimatedDuration}
                      </p>
                      <p className="text-[11px] text-[#5A6363] truncate font-light">
                        {place.tagline}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#DCD6C8] group-hover:text-[#1B4B66] group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-[#F2EFE9] border-t border-[#E8E4DB] text-xs text-[#5A6363] flex items-center justify-between">
          <span>Search understands natural queries like "rainy day" or "surf breaks"</span>
          <span className="flex items-center gap-1 font-medium text-[#2C3333]">
            <span>Select to open guide</span>
            <CornerDownLeft className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
