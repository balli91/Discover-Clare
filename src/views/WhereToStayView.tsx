import React, { useState } from 'react';
import { Bed } from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';

interface WhereToStayViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onNavigateToBusinessPortal?: () => void;
}

export const WhereToStayView: React.FC<WhereToStayViewProps> = ({
  onSelectPlace,
  isSaved,
  onToggleSave,
  onNavigateToBusinessPortal
}) => {
  const [selectedStayType, setSelectedStayType] = useState<string>('all');

  const stayPlaces = CLARE_PUBLISHED_PLACES.filter(p => p.type === 'stay');

  const filteredStays = stayPlaces.filter(p => {
    if (selectedStayType === 'all') return true;
    if (selectedStayType === 'luxury') return p.category.includes('Luxury') || p.tags.includes('Luxury Hotel');
    if (selectedStayType === 'oceanfront') return p.category.includes('Coastal') || p.tags.includes('Oceanfront');
    if (selectedStayType === 'boutique') return p.category.includes('Boutique') || p.tags.includes('Boutique');
    if (selectedStayType === 'glamping') return p.category.includes('Glamping') || p.tags.includes('Eco Farm');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Where to Stay in County Clare | Hotels, B&Bs & Unique Stays"
        description="Find the best places to stay in County Clare, from historic manor houses like Gregans Castle to coastal lodges like Armada Hotel and boutique village hotels."
        canonical="/stay"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Bed className="w-3.5 h-3.5" />
            Curated Accommodation
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Where to Stay in County Clare
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            From luxury 18th-century country manors in the Burren to oceanfront surf hotels, boutique music retreats, and tranquil eco-glamping farms.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Stays' },
          { id: 'luxury', label: 'Luxury Country Manors' },
          { id: 'oceanfront', label: 'Oceanfront & Surf Hotels' },
          { id: 'boutique', label: 'Boutique Village Hotels' },
          { id: 'glamping', label: 'Eco-Glamping & Unique Stays' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedStayType(cat.id)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
              selectedStayType === cat.id
                ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-sm'
                : 'bg-[#F2EFE9] text-[#2C3333] border-[#E8E4DB] hover:bg-[#E8E4DB]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStays.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            isSaved={isSaved(place.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Business Listing Callout */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#F2EFE9] border border-[#E8E4DB] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66]">
            For Hotel, B&B and Self-Catering Owners
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#2C3333]">
            List Your Accommodation on Discover Clare
          </h3>
          <p className="text-[#5A6363] text-sm leading-relaxed font-light">
            Reach engaged visitors planning trips to County Clare with direct booking links, zero commission fees on reservations, and high-visibility photography.
          </p>
        </div>
        {onNavigateToBusinessPortal && (
          <button
            onClick={onNavigateToBusinessPortal}
            className="px-6 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
          >
            Learn About Partner Listings
          </button>
        )}
      </div>
    </div>
  );
};
