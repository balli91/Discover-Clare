import React, { useState } from 'react';
import { Utensils, Coffee } from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';

interface FoodDrinkViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onNavigateToBusinessPortal?: () => void;
}

export const FoodDrinkView: React.FC<FoodDrinkViewProps> = ({
  onSelectPlace,
  isSaved,
  onToggleSave,
  onNavigateToBusinessPortal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const foodPlaces = CLARE_PUBLISHED_PLACES.filter(p => p.type === 'food' || p.tags.some(t => ['Seafood', 'Pubs', 'Bakery', 'Cheese', 'Smoked Salmon'].includes(t)));

  const filteredPlaces = foodPlaces.filter(p => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'seafood') return p.category.includes('Seafood') || p.tags.includes('Seafood') || p.tags.includes('Lobster') || p.tags.includes('Smoked Salmon');
    if (selectedCategory === 'pub') return p.category.includes('Pub') || p.tags.includes('Traditional Pub') || p.tags.includes('Trad Pub');
    if (selectedCategory === 'fine-dining') return p.category.includes('Fine Dining') || p.tags.includes('Michelin');
    if (selectedCategory === 'cafe') return p.category.includes('Café') || p.tags.includes('Bakery') || p.tags.includes('Coffee');
    if (selectedCategory === 'artisan') return p.tags.includes('Artisan') || p.tags.includes('Cheese') || p.tags.includes('Farm');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Places to Eat & Drink in Clare | Seafood & Traditional Pubs"
        description="Discover fresh Atlantic seafood at Linnane's, dining at Wild Honey Inn, Burren Smokehouse salmon, and traditional music pubs across County Clare."
        canonical="/food-drink"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Utensils className="w-3.5 h-3.5" />
            Culinary Clare
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Food, Seafood & Traditional Pubs
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Fresh Atlantic lobster on the pier, Michelin-starred Burren dining, oak-smoked wild salmon, warm soda bread, and craft ales beside crackling turf fires.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Food & Drink' },
          { id: 'seafood', label: 'Fresh Seafood & Oysters' },
          { id: 'pub', label: 'Traditional Fireside Pubs' },
          { id: 'fine-dining', label: 'Fine Dining & Michelin' },
          { id: 'cafe', label: 'Artisan Cafés & Bakeries' },
          { id: 'artisan', label: 'Farmsteads & Smokehouse Producers' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
              selectedCategory === cat.id
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
        {filteredPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            isSaved={isSaved(place.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Local Food Producers Highlight Banner */}
      <div className="rounded-3xl bg-[#2C3333] text-white p-8 sm:p-10 border border-[#3D4545] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs uppercase font-bold tracking-wider text-[#DCD6C8]">
            The Burren Food Trail
          </span>
          <h3 className="text-2xl font-serif font-bold text-white">
            Do you operate a restaurant, café, or artisan food business in Clare?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm font-light">
            Join the Discover Clare Business Directory to connect with quality-focused visitors seeking authentic local gastronomy and verified local provenance.
          </p>
        </div>
        {onNavigateToBusinessPortal && (
          <button
            onClick={onNavigateToBusinessPortal}
            className="px-6 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-semibold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
          >
            Add Your Food Business
          </button>
        )}
      </div>
    </div>
  );
};
