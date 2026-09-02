import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_REGIONS, CLARE_PUBLISHED_PLACES, normalizeRegionId, getRegionInfo } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';
import { generateBreadcrumbJsonLd, generateRegionJsonLd } from '../utils/seo';

interface RegionsViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const RegionsView: React.FC<RegionsViewProps> = ({
  onSelectPlace,
  isSaved,
  onToggleSave
}) => {
  const { regionId } = useParams<{ regionId?: string }>();

  const canonicalId = regionId ? normalizeRegionId(regionId) : 'ennis';
  const isSpecificRegion = Boolean(regionId);
  const currentRegion = getRegionInfo(canonicalId) || CLARE_REGIONS[0];
  const regionPlaces = CLARE_PUBLISHED_PLACES.filter(p => normalizeRegionId(p.region) === currentRegion.id);

  const breadcrumbs = isSpecificRegion
    ? [
        { name: 'Home', url: '/' },
        { name: 'Regions', url: '/regions' },
        { name: currentRegion.name, url: `/regions/${currentRegion.id}` }
      ]
    : [
        { name: 'Home', url: '/' },
        { name: 'Regions', url: '/regions' }
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title={isSpecificRegion ? `${currentRegion.name} | Discover Clare` : 'The 5 Regions of County Clare | Discover Clare'}
        description={
          isSpecificRegion
            ? `${currentRegion.description} Explore towns including ${currentRegion.keyTowns.join(', ')} and key highlights.`
            : 'County Clare encompasses five distinct landscapes: Ennis, North Clare & The Burren, West Clare & Atlantic Coast, East Clare & Lough Derg, and South Clare & Shannon Estuary.'
        }
        canonical={isSpecificRegion ? `/regions/${currentRegion.id}` : '/regions'}
        image={currentRegion.heroImage}
        imageAlt={`${currentRegion.name}, County Clare`}
        ogTitle={isSpecificRegion ? `${currentRegion.name} Region Guide | Discover Clare` : 'The 5 Regions of County Clare | Discover Clare'}
        ogDescription={currentRegion.description}
        twitterTitle={isSpecificRegion ? `${currentRegion.name} | Discover Clare` : 'The 5 Regions of County Clare | Discover Clare'}
        twitterDescription={currentRegion.description}
        jsonLd={isSpecificRegion ? generateRegionJsonLd(currentRegion, breadcrumbs) : generateBreadcrumbJsonLd(breadcrumbs)}
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Compass className="w-3.5 h-3.5" />
            Geographic Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            The 5 Regions of Clare
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            County Clare encompasses five distinct landscapes — explore the unique culture, towns, and scenic routes of each region.
          </p>
        </div>
      </div>

      {/* Region Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CLARE_REGIONS.map((region, idx) => {
          const isSelected = currentRegion.id === region.id;
          return (
            <Link
              key={region.id}
              to={`/regions/${region.id}`}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-sm scale-[1.02]'
                  : 'bg-white text-[#2C3333] border-[#E8E4DB] hover:bg-[#F2EFE9] hover:border-[#1B4B66]/50'
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                  isSelected ? 'text-[#DCD6C8]' : 'text-[#5A6363]'
                }`}>
                  Region 0{idx + 1}
                </span>
                <span className="font-serif font-bold text-sm sm:text-base leading-tight block">
                  {region.name.split('&')[0]}
                </span>
              </div>
              <span className={`text-[11px] mt-2 block truncate font-light ${
                isSelected ? 'text-stone-200' : 'text-[#5A6363]'
              }`}>
                {region.keyTowns.slice(0, 2).join(', ')}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Selected Region Detailed Spotlight */}
      <div className="bg-white rounded-3xl border border-[#E8E4DB] overflow-hidden shadow-sm">
        {/* Region Banner Hero */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#2C3333]">
          <img
            src={currentRegion.heroImage}
            alt={currentRegion.name}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333] via-[#2C3333]/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 max-w-3xl">
            <span className="text-xs text-[#DCD6C8] font-bold uppercase tracking-wider block">
              Key Towns: {currentRegion.keyTowns.join(' • ')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {currentRegion.name}
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light">
              {currentRegion.tagline}
            </p>
          </div>
        </div>

        {/* Region Narrative & Highlights */}
        <div className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                About this Region
              </h3>
              <p className="text-[#5A6363] text-sm sm:text-base leading-relaxed font-light">
                {currentRegion.description}
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F2EFE9] rounded-2xl p-5 border border-[#E8E4DB] space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block">
                Region Highlights
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#2C3333]">
                {currentRegion.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4B66] shrink-0 mt-1.5"></span>
                    <span className="font-light">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Places in this Region */}
          <div className="pt-6 border-t border-[#E8E4DB] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-[#2C3333]">
                Things to See & Do in {currentRegion.name.split('&')[0]} ({regionPlaces.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onSelect={onSelectPlace}
                  isSaved={isSaved(place.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
