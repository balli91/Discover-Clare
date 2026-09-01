import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { ClarePlace, RegionId } from '../types';
import { CLARE_PUBLISHED_PLACES, CLARE_REGIONS, normalizeRegionId } from '../data/clareData';

interface ClareMapSectionProps {
  onSelectPlace?: (place: ClarePlace) => void;
  onNavigateToRegion?: (regionId: RegionId) => void;
  isSaved?: (id: string) => boolean;
  onToggleSave?: (id: string) => void;
}

export const ClareMapSection: React.FC<ClareMapSectionProps> = ({
  onSelectPlace,
  onNavigateToRegion,
  isSaved,
  onToggleSave
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [activePin, setActivePin] = useState<ClarePlace | null>(CLARE_PUBLISHED_PLACES[0] || null);

  // Geographical bounds for County Clare:
  // Lat: ~52.50 to ~53.20 (minLat: 52.50, maxLat: 53.20)
  // Lng: ~ -10.00 to ~ -8.35 (minLng: -10.00, maxLng: -8.35)
  const minLat = 52.50;
  const maxLat = 53.20;
  const minLng = -10.00;
  const maxLng = -8.35;

  const latToPercent = (lat: number) => {
    return 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
  };

  const lngToPercent = (lng: number) => {
    return ((lng - minLng) / (maxLng - minLng)) * 100;
  };

  const filteredPlaces = CLARE_PUBLISHED_PLACES.filter((p) => {
    const matchesCategory = 
      selectedCategory === 'all' ||
      (selectedCategory === 'attractions' && p.type === 'attraction') ||
      (selectedCategory === 'activities' && p.type === 'activity') ||
      (selectedCategory === 'food' && p.type === 'food') ||
      (selectedCategory === 'stay' && p.type === 'stay') ||
      (selectedCategory === 'hidden' && p.isHiddenGem);

    const matchesRegion = selectedRegion === 'all' || normalizeRegionId(p.region) === normalizeRegionId(selectedRegion);

    return matchesCategory && matchesRegion;
  });

  return (
    <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-8 border border-[#3D4545] shadow-2xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488] mb-2">
            <Compass className="w-3.5 h-3.5" />
            Geographic Explorer
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Interactive County Clare Map
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl font-light">
            Explore major attractions, wild Atlantic sea arches, traditional music hubs, and hidden gems across all 5 regions.
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
              selectedRegion === 'all'
                ? 'bg-[#1B4B66] text-white border-[#246488] shadow-md'
                : 'bg-white/10 text-stone-200 border-stone-600 hover:bg-white/20'
            }`}
          >
            All Clare
          </button>
          {CLARE_REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
                selectedRegion === r.id
                  ? 'bg-[#1B4B66] text-white border-[#246488] shadow-md'
                  : 'bg-white/10 text-stone-200 border-stone-600 hover:bg-white/20'
              }`}
            >
              {r.name.split('&')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Locations' },
          { id: 'attractions', label: 'Major Attractions' },
          { id: 'activities', label: 'Activities & Walks' },
          { id: 'hidden', label: 'Hidden Gems' },
          { id: 'food', label: 'Food & Pubs' },
          { id: 'stay', label: 'Stays' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-[#DCD6C8] text-[#2C3333] font-bold'
                : 'bg-white/5 text-stone-300 hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Map Layout Grid: SVG Map Canvas + Selected Pin Details Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Visual Map Area */}
        <div className="lg:col-span-8 bg-[#1B2424] rounded-2xl p-4 sm:p-6 border border-[#3D4545] relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Lines & Compass Watermark */}
          <div className="absolute inset-0 bg-[radial-gradient(#34495E_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
          
          {/* Regional Zones Watermark Labels */}
          <div className="absolute top-8 left-1/3 text-[11px] uppercase tracking-widest text-[#DCD6C8] font-bold pointer-events-none opacity-40">
            The Burren & North Clare
          </div>
          <div className="absolute top-1/2 left-6 text-[11px] uppercase tracking-widest text-[#DCD6C8] font-bold pointer-events-none opacity-40">
            West Clare Atlantic Coast
          </div>
          <div className="absolute bottom-12 left-1/4 text-[11px] uppercase tracking-widest text-[#DCD6C8] font-bold pointer-events-none opacity-40">
            Shannon Estuary
          </div>
          <div className="absolute top-1/3 right-8 text-[11px] uppercase tracking-widest text-[#DCD6C8] font-bold pointer-events-none opacity-40">
            Lough Derg & East Clare
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-widest text-[#DCD6C8] font-bold pointer-events-none opacity-40">
            Ennis
          </div>

          {/* SVG Outline for County Clare */}
          <svg
            viewBox="0 0 800 600"
            className="w-full h-full max-h-[460px] opacity-75 filter drop-shadow-[0_0_20px_rgba(27,75,102,0.25)]"
          >
            {/* County Clare Abstract Stylized Geometry Boundary */}
            <path
              d="M 280 80 
                 Q 360 60 480 80 
                 Q 600 110 680 180 
                 Q 740 260 700 350 
                 Q 660 420 540 450 
                 Q 420 480 340 540 
                 Q 260 560 160 520 
                 Q 100 480 140 420 
                 Q 180 360 120 300 
                 Q 80 240 180 180 
                 Q 220 120 280 80 Z"
              fill="#263842"
              stroke="#3D5666"
              strokeWidth="2"
              className="transition-all duration-300"
            />
            {/* Shannon Estuary water path cutout */}
            <path
              d="M 120 500 Q 240 480 380 470 Q 500 460 540 500"
              fill="none"
              stroke="#1B4B66"
              strokeWidth="4"
              strokeDasharray="6 4"
              opacity="0.6"
            />
            {/* Lough Derg water body representation */}
            <ellipse cx="660" cy="240" rx="35" ry="90" fill="#1B4B66" stroke="#246488" strokeWidth="2" opacity="0.6" />
          </svg>

          {/* Map Pins Placed Geographically */}
          <div className="absolute inset-0 p-6">
            {filteredPlaces.map((place) => {
              const top = `${latToPercent(place.coordinates.lat)}%`;
              const left = `${lngToPercent(place.coordinates.lng)}%`;
              const isCurrent = activePin?.id === place.id;

              return (
                <div
                  key={place.id}
                  style={{ top, left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onClick={() => setActivePin(place)}
                >
                  {/* Outer pulse when active */}
                  {isCurrent && (
                    <span className="absolute -inset-2 rounded-full bg-[#1B4B66] animate-ping opacity-60"></span>
                  )}

                  {/* Pin Circle */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-125 border ${
                    isCurrent
                      ? 'bg-[#1B4B66] text-white border-white scale-125'
                      : place.isHiddenGem
                      ? 'bg-[#DCD6C8] text-[#2C3333] border-[#CBC4B4]'
                      : 'bg-[#2C3333] text-[#DCD6C8] border-stone-600'
                  }`}>
                    {place.isHiddenGem ? (
                      <Sparkles className="w-3.5 h-3.5" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>

                  {/* Pin Hover Tag */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-[#2C3333] text-stone-100 text-[10px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-stone-600 z-30">
                    {place.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-3 left-3 bg-[#2C3333]/90 backdrop-blur-sm p-2.5 rounded-xl border border-[#3D4545] text-[11px] flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#1B4B66]"></span>
              <span className="text-stone-300">Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#DCD6C8]"></span>
              <span className="text-stone-300">Hidden Gem</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-[#2C3333] border border-stone-500"></span>
              <span className="text-stone-300">Place</span>
            </div>
          </div>
        </div>

        {/* Selected Place Preview Panel */}
        <div className="lg:col-span-4 bg-[#34495E]/40 rounded-2xl p-5 border border-[#3D4545] flex flex-col justify-between">
          {activePin ? (
            <div className="space-y-4">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#2C3333]">
                <img
                  src={activePin.heroImage}
                  alt={activePin.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  {activePin.isHiddenGem && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCD6C8] text-[#2C3333]">
                      Hidden Gem
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2C3333]/90 text-stone-200">
                    {activePin.category}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[#DCD6C8] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {activePin.locationName} • {activePin.region.replace('-', ' ').toUpperCase()}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {activePin.name}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2 font-light">
                  {activePin.tagline}
                </p>
              </div>

              {/* Local Tip */}
              {activePin.localTip && (
                <div className="p-3 rounded-xl bg-[#2C3333]/80 border border-[#3D4545] text-xs text-stone-200 flex gap-2">
                  <Sparkles className="w-4 h-4 text-[#DCD6C8] shrink-0 mt-0.5" />
                  <p className="line-clamp-2">
                    <strong className="text-[#DCD6C8]">Local Tip:</strong> {activePin.localTip}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-[#3D4545]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activePin.estimatedDuration}
                </span>
                <span className="font-semibold text-[#DCD6C8]">
                  {activePin.priceIndicator}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-stone-400 text-sm">
              <MapPin className="w-8 h-8 text-stone-600 mx-auto mb-2" />
              <p>Click any map pin to inspect its details</p>
            </div>
          )}

          {activePin && (
            <div className="mt-4 pt-4 border-t border-[#3D4545] flex items-center gap-2">
              <Link
                to={`/places/${activePin.slug}`}
                id="map-open-guide-btn"
                className="flex-1 py-2.5 rounded-xl bg-[#1B4B66] hover:bg-[#123447] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md border border-[#246488]"
              >
                <span>Open Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
