import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  X, 
  Sparkles, 
  SlidersHorizontal,
  Compass,
  MapPin
} from 'lucide-react';
import { ClarePlace, RegionId, ItemType, WeatherSuitability } from '../types';
import { CLARE_PUBLISHED_PLACES, CLARE_REGIONS } from '../data/clareData';
import { getLocalityById } from '../data/localities';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';
import { rankPlacesDeterministically } from '../utils/discoveryEngine';

interface ExploreViewProps {
  initialSearchQuery?: string;
  onSelectPlace?: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialSearchQuery = '',
  onSelectPlace,
  isSaved,
  onToggleSave
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || initialSearchQuery;
  const urlRegion = searchParams.get('region') as RegionId | null;
  const urlLocality = searchParams.get('locality') || null;

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>(urlRegion || 'all');
  const [selectedLocality, setSelectedLocality] = useState<string | 'all'>(urlLocality || 'all');
  const [selectedType, setSelectedType] = useState<ItemType | 'all'>('all');
  const [selectedWeather, setSelectedWeather] = useState<WeatherSuitability | 'all'>('all');
  const [familyFriendlyOnly, setFamilyFriendlyOnly] = useState(false);
  const [dogFriendlyOnly, setDogFriendlyOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
    const r = searchParams.get('region') as RegionId | null;
    if (r !== null) {
      setSelectedRegion(r);
    }
    const l = searchParams.get('locality');
    if (l !== null && l.trim().length > 0) {
      setSelectedLocality(l);
    } else {
      setSelectedLocality('all');
    }
  }, [searchParams]);

  const updateSearchParam = (key: string, val: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (val && val !== 'all' && val.trim().length > 0) {
      newParams.set(key, val);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleRegionChange = (reg: RegionId | 'all') => {
    setSelectedRegion(reg);
    updateSearchParam('region', reg === 'all' ? null : reg);
  };

  const clearLocalityFilter = () => {
    setSelectedLocality('all');
    updateSearchParam('locality', null);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedLocality('all');
    setSelectedType('all');
    setSelectedWeather('all');
    setFamilyFriendlyOnly(false);
    setDogFriendlyOnly(false);
    setFreeOnly(false);
    setHiddenGemsOnly(false);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Deterministic evaluation & ranking
  const rankedResults = rankPlacesDeterministically(CLARE_PUBLISHED_PLACES, {
    searchQuery,
    region: selectedRegion,
    locality: selectedLocality,
    type: selectedType,
    weather: selectedWeather,
    familyFriendlyOnly,
    dogFriendlyOnly,
    freeOnly,
    hiddenGemsOnly
  });

  const activeLocalityInfo = selectedLocality !== 'all' ? getLocalityById(selectedLocality) : undefined;

  const activeFilterCount = 
    (selectedRegion !== 'all' ? 1 : 0) +
    (selectedLocality !== 'all' ? 1 : 0) +
    (selectedType !== 'all' ? 1 : 0) +
    (selectedWeather !== 'all' ? 1 : 0) +
    (familyFriendlyOnly ? 1 : 0) +
    (dogFriendlyOnly ? 1 : 0) +
    (freeOnly ? 1 : 0) +
    (hiddenGemsOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <SEO
        title={searchQuery.trim() ? `Search Results for "${searchQuery.trim()}" | Discover Clare` : 'Explore County Clare | Discover Clare'}
        description="Search, filter, and discover all verified attractions, hiking trails, coastal gems, traditional music pubs, and accommodations across County Clare."
        canonical="/explore"
        noIndex={activeFilterCount > 0}
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Compass className="w-3.5 h-3.5" />
            Curated Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Explore County Clare
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Search and filter through all verified attractions, outdoor adventures, food spots, stays, and hidden gems across Clare.
          </p>
        </div>
      </div>

      {/* Main Search & Filter Control Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#5A6363] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, town (Doolin, Kilkee, Ennis), activity, seafood..."
              className="w-full pl-11 pr-10 py-3.5 bg-white rounded-full border border-[#E8E4DB] text-[#2C3333] placeholder-[#5A6363] text-sm focus:outline-none focus:border-[#1B4B66] focus:ring-1 focus:ring-[#1B4B66] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A6363] hover:text-[#2C3333]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle on Mobile */}
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="sm:hidden px-4 py-3 bg-[#F2EFE9] rounded-full border border-[#E8E4DB] text-[#2C3333] text-sm font-semibold flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#1B4B66]" />
            <span>Filters ({activeFilterCount})</span>
          </button>
        </div>

        {/* Primary Filter Rows */}
        <div className={`space-y-3 bg-white p-5 rounded-2xl border border-[#E8E4DB] shadow-sm ${showFiltersMobile ? 'block' : 'hidden sm:block'}`}>
          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#5A6363] uppercase tracking-wider shrink-0 w-16">
              Region:
            </span>
            <button
              onClick={() => handleRegionChange('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                selectedRegion === 'all'
                  ? 'bg-[#1B4B66] text-white shadow-sm'
                  : 'bg-[#F2EFE9] text-[#2C3333] hover:bg-[#E8E4DB]'
              }`}
            >
              All Regions
            </button>
            {CLARE_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => handleRegionChange(r.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                  selectedRegion === r.id
                    ? 'bg-[#1B4B66] text-white shadow-sm'
                    : 'bg-[#F2EFE9] text-[#2C3333] hover:bg-[#E8E4DB]'
                }`}
              >
                {r.name.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Type Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#5A6363] uppercase tracking-wider shrink-0 w-16">
              Type:
            </span>
            {[
              { id: 'all', label: 'All Types' },
              { id: 'attraction', label: 'Attractions' },
              { id: 'activity', label: 'Things To Do' },
              { id: 'food', label: 'Food & Drink' },
              { id: 'stay', label: 'Where to Stay' },
              { id: 'hidden-gem', label: 'Hidden Gems' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                  selectedType === t.id
                    ? 'bg-[#2C3333] text-white shadow-sm'
                    : 'bg-[#F2EFE9] text-[#2C3333] hover:bg-[#E8E4DB]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Active Locality Filter Notice if present */}
          {selectedLocality !== 'all' && (
            <div className="p-3 bg-[#FAF8F5] border border-[#C88A1E]/30 rounded-xl flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#2C3333]">
                <MapPin className="w-4 h-4 text-[#C88A1E] shrink-0" />
                <span>
                  Filtered by locality: <strong className="font-semibold text-[#1B4B66]">{activeLocalityInfo ? activeLocalityInfo.name : selectedLocality}</strong>
                  {activeLocalityInfo && <span className="hidden sm:inline text-[#5A6363] ml-1.5 font-light font-sans">— {activeLocalityInfo.tagline}</span>}
                </span>
              </div>
              <button
                onClick={clearLocalityFilter}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white hover:bg-[#F2EFE9] text-[#5A6363] hover:text-[#2C3333] border border-[#E8E4DB] shrink-0 transition-colors shadow-2xs"
                title="Remove locality filter"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear locality</span>
              </button>
            </div>
          )}

          {/* Quick Toggle Checkboxes */}
          <div className="pt-2 border-t border-[#E8E4DB] flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setHiddenGemsOnly(!hiddenGemsOnly)}
              className={`px-3.5 py-1.5 rounded-full font-medium border flex items-center gap-1.5 transition-colors ${
                hiddenGemsOnly 
                  ? 'bg-[#DCD6C8] border-[#CBC4B4] text-[#2C3333] font-bold' 
                  : 'bg-[#F9F8F5] border-[#E8E4DB] text-[#2C3333] hover:bg-[#F2EFE9]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
              <span>Hidden Gems Only</span>
            </button>

            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`px-3.5 py-1.5 rounded-full font-medium border flex items-center gap-1.5 transition-colors ${
                freeOnly 
                  ? 'bg-[#EBF3F8] border-[#C5DCEB] text-[#1B4B66] font-bold' 
                  : 'bg-[#F9F8F5] border-[#E8E4DB] text-[#2C3333] hover:bg-[#F2EFE9]'
              }`}
            >
              <span>Free to Visit</span>
            </button>

            <button
              onClick={() => setFamilyFriendlyOnly(!familyFriendlyOnly)}
              className={`px-3.5 py-1.5 rounded-full font-medium border flex items-center gap-1.5 transition-colors ${
                familyFriendlyOnly 
                  ? 'bg-[#EBF3F8] border-[#C5DCEB] text-[#1B4B66] font-bold' 
                  : 'bg-[#F9F8F5] border-[#E8E4DB] text-[#2C3333] hover:bg-[#F2EFE9]'
              }`}
            >
              <span>Family Friendly</span>
            </button>

            <button
              onClick={() => setDogFriendlyOnly(!dogFriendlyOnly)}
              className={`px-3.5 py-1.5 rounded-full font-medium border flex items-center gap-1.5 transition-colors ${
                dogFriendlyOnly 
                  ? 'bg-[#EBF3F8] border-[#C5DCEB] text-[#1B4B66] font-bold' 
                  : 'bg-[#F9F8F5] border-[#E8E4DB] text-[#2C3333] hover:bg-[#F2EFE9]'
              }`}
            >
              <span>Dog Friendly</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-rose-700 hover:text-rose-900 font-semibold underline underline-offset-2 px-2"
              >
                Reset All Filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#2C3333]">
          Showing {rankedResults.length} of {CLARE_PUBLISHED_PLACES.length} verified experiences
        </span>
      </div>

      {/* Places Grid */}
      {rankedResults.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E4DB] text-[#5A6363]">
          <Compass className="w-12 h-12 text-[#DCD6C8] mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-[#2C3333]">No matching places found</h3>
          <p className="text-sm text-[#5A6363] mt-1 max-w-sm mx-auto font-light">
            Try resetting your filters or searching for broader terms like "Doolin", "Cliffs", "surf", or "caves".
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-5 py-2.5 rounded-full bg-[#1B4B66] text-white text-xs font-semibold hover:bg-[#123447] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rankedResults.map(({ place, matchReasons }) => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={onSelectPlace}
              isSaved={isSaved(place.id)}
              onToggleSave={onToggleSave}
              matchReasons={matchReasons}
            />
          ))}
        </div>
      )}
    </div>
  );
};
