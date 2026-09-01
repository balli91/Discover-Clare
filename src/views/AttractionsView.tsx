import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, Info } from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';

interface AttractionsViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onNavigateToHidden: () => void;
}

export const AttractionsView: React.FC<AttractionsViewProps> = ({
  onSelectPlace,
  isSaved,
  onToggleSave,
  onNavigateToHidden
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'major' | 'lesser-known'>('all');

  const allAttractions = CLARE_PUBLISHED_PLACES.filter(p => p.type === 'attraction' || p.isHiddenGem);
  const majorAttractions = allAttractions.filter(p => p.isMajor);
  const lesserKnownAttractions = allAttractions.filter(p => !p.isMajor);

  const displayedAttractions = 
    activeTab === 'all' 
      ? allAttractions 
      : activeTab === 'major' 
      ? majorAttractions 
      : lesserKnownAttractions;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Major Attractions & Heritage in Clare | Discover Clare"
        description="Explore County Clare's iconic landmarks and heritage sites including the Cliffs of Moher, Bunratty Castle, The Burren National Park, Doolin Cave, and Quin Abbey."
        canonical="/attractions"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Compass className="w-3.5 h-3.5" />
            Landmarks & Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            County Clare Attractions
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            From monumental Atlantic cliff faces and subterranean karst caverns to medieval fortresses and quiet monastic island ruins.
          </p>
        </div>
      </div>

      {/* Tabs Switcher: All vs Major vs Lesser-Known */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E8E4DB] pb-4">
        <div className="flex items-center gap-2 p-1.5 bg-[#F2EFE9] rounded-full border border-[#E8E4DB] w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-[#1B4B66] text-white shadow-sm'
                : 'text-[#5A6363] hover:text-[#2C3333]'
            }`}
          >
            All Attractions ({allAttractions.length})
          </button>
          <button
            onClick={() => setActiveTab('major')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'major'
                ? 'bg-[#1B4B66] text-white shadow-sm'
                : 'text-[#5A6363] hover:text-[#2C3333]'
            }`}
          >
            Major Icons ({majorAttractions.length})
          </button>
          <button
            onClick={() => setActiveTab('lesser-known')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'lesser-known'
                ? 'bg-[#DCD6C8] text-[#2C3333] shadow-sm font-bold'
                : 'text-[#5A6363] hover:text-[#2C3333]'
            }`}
          >
            Lesser-Known & Quiet ({lesserKnownAttractions.length})
          </button>
        </div>

        <div className="text-xs text-[#5A6363] flex items-center gap-2">
          <Info className="w-4 h-4 text-[#1B4B66]" />
          <span>Includes verified parking, best times, and local insider tips</span>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedAttractions.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            isSaved={isSaved(place.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Dedicated Callout for Hidden Gems */}
      <div className="p-8 rounded-3xl bg-[#F2EFE9] border border-[#E8E4DB] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCD6C8] text-[#2C3333]">
            <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
            Discover The Hidden Side
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2C3333]">
            Looking for secret sea arches and quiet limestone boreens?
          </h3>
          <p className="text-[#5A6363] text-sm max-w-2xl font-light">
            Our curated Hidden Gems section is dedicated exclusively to lesser-known locations and intimate local experiences across the county.
          </p>
        </div>
        <button
          onClick={onNavigateToHidden}
          className="px-6 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 shadow-sm"
        >
          <span>View Hidden Gems Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
