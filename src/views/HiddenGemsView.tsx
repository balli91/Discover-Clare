import React, { useState } from 'react';
import { 
  Sparkles, 
  HeartHandshake
} from 'lucide-react';
import { ClarePlace, RegionId } from '../types';
import { CLARE_PUBLISHED_PLACES, CLARE_REGIONS } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';

interface HiddenGemsViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const HiddenGemsView: React.FC<HiddenGemsViewProps> = ({
  onSelectPlace,
  isSaved,
  onToggleSave
}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');

  const hiddenGems = CLARE_PUBLISHED_PLACES.filter(p => p.isHiddenGem);

  const filteredGems = hiddenGems.filter(p => {
    if (selectedRegion === 'all') return true;
    return p.region === selectedRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Hidden Gems & Secret Spots in County Clare | Discover Clare"
        description="Discover quiet secret spots and off-the-beaten-path locations in Clare: Bridges of Ross, Pollnashanthana Puffing Hole, Inis Cealtra, and St. Tola Goat Farm."
        canonical="/hidden-gems"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Sparkles className="w-3.5 h-3.5" />
            Beyond The Coach Tours
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            County Clare Hidden Gems
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Quiet Atlantic sea arches, thunderous cliff chasms, secluded monastic ruins, and artisan farmsteads that most visitors never discover.
          </p>
        </div>
      </div>

      {/* Region Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedRegion('all')}
          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
            selectedRegion === 'all'
              ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-sm font-bold'
              : 'bg-[#F2EFE9] text-[#2C3333] border-[#E8E4DB] hover:bg-[#E8E4DB]'
          }`}
        >
          All Hidden Gems ({hiddenGems.length})
        </button>
        {CLARE_REGIONS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRegion(r.id)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
              selectedRegion === r.id
                ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-sm font-bold'
                : 'bg-[#F2EFE9] text-[#2C3333] border-[#E8E4DB] hover:bg-[#E8E4DB]'
            }`}
          >
            {r.name.split('&')[0]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGems.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            isSaved={isSaved(place.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Responsible Visiting & Leave No Trace Principles */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#2C3333] text-stone-100 border border-[#3D4545] space-y-6">
        <div className="flex items-center gap-2 text-[#DCD6C8] font-bold text-xs uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4" />
          <span>Responsible Exploration & Conservation</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-white">
          Respecting Clare's Fragile Landscapes & Communities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-300">
          <div className="p-5 rounded-2xl bg-[#3D4545] border border-[#4D5656] space-y-2">
            <span className="font-bold text-white block text-sm font-serif">1. Protect The Burren Karst</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Never build stone cairns or remove limestone pieces. The unique grykes shelter rare Arctic-Alpine and Mediterranean flora that take decades to establish.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#3D4545] border border-[#4D5656] space-y-2">
            <span className="font-bold text-white block text-sm font-serif">2. Park with Courtesy</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Narrow rural boreens are actively used by local farmers and emergency services. Always use designated lay-bys and never block farm gates or narrow bends.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-[#3D4545] border border-[#4D5656] space-y-2">
            <span className="font-bold text-white block text-sm font-serif">3. Leave No Trace</span>
            <p className="text-stone-300 leading-relaxed font-light">
              County Clare's beauty relies on pristine coasts and countryside. Bring all litter home with you and keep dogs on leads near livestock and cliff edges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
