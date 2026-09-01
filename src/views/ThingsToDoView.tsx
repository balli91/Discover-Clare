import React, { useState } from 'react';
import { 
  Footprints, 
  Waves, 
  Music, 
  Mountain, 
  Ship, 
  CloudRain, 
  Compass, 
  CheckCircle2
} from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { SEO } from '../components/SEO';

interface ThingsToDoViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const ThingsToDoView: React.FC<ThingsToDoViewProps> = ({
  onSelectPlace,
  isSaved,
  onToggleSave
}) => {
  const [selectedActivityCategory, setSelectedActivityCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Activities', icon: Compass },
    { id: 'walking', label: 'Walking & Hiking', icon: Footprints, match: ['Walking', 'Hiking', 'Trail', 'Coastal Walk'] },
    { id: 'surfing', label: 'Surfing & Watersports', icon: Waves, match: ['Surfing', 'Kayaking', 'Water Sports', 'Beach'] },
    { id: 'music', label: 'Traditional Music', icon: Music, match: ['Traditional Music', 'Trad Pub', 'Music'] },
    { id: 'caves', label: 'Caves & Geology', icon: Mountain, match: ['Cave', 'Stalactite', 'Geology', 'Karst'] },
    { id: 'boating', label: 'Boat Trips & Islands', icon: Ship, match: ['Boat', 'Cruise', 'Island', 'Ferry'] },
    { id: 'rainy-day', label: 'Rainy-Day Friendly', icon: CloudRain, match: ['Rainy-Day Friendly', 'all-weather'] },
  ];

  const activities = CLARE_PUBLISHED_PLACES.filter((p) => {
    if (p.type !== 'activity' && !p.tags.some(t => ['Hiking', 'Surfing', 'Music', 'Kayaking', 'Cave', 'Boat'].includes(t))) {
      return false;
    }
    if (selectedActivityCategory === 'all') return true;

    const currentCat = categories.find(c => c.id === selectedActivityCategory);
    if (!currentCat || !currentCat.match) return true;

    if (selectedActivityCategory === 'rainy-day') {
      return p.weatherSuitability === 'rainy-day-favourite' || p.weatherSuitability === 'all-weather' || p.practicalInfo.indoorOutdoor === 'indoor';
    }

    return currentCat.match.some(keyword => 
      p.category.toLowerCase().includes(keyword.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(keyword.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <SEO
        title="Things to Do in County Clare | Outdoor & Cultural Activities"
        description="Find outdoor adventures, surfing at Lahinch, hiking the Burren Way, sea kayaking in Kilkee, boat trips, and traditional Irish music sessions in Clare."
        canonical="/things-to-do"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Footprints className="w-3.5 h-3.5" />
            Adventures & Culture
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Things To Do in County Clare
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            From riding Atlantic waves in Lahinch and walking ancient limestone green roads to fireside fiddles in Doolin and boat trips beneath colossal sea cliffs.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedActivityCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedActivityCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-sm'
                  : 'bg-[#F2EFE9] text-[#2C3333] border-[#E8E4DB] hover:bg-[#E8E4DB]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#DCD6C8]' : 'text-[#1B4B66]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            isSaved={isSaved(place.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>

      {/* Practical Guide Tips for Activities */}
      <div className="bg-[#F2EFE9] rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
        <div className="space-y-1.5">
          <span className="font-bold text-[#2C3333] block flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#1B4B66]" />
            Atlantic Weather & Tides
          </span>
          <p className="text-[#5A6363] leading-relaxed font-light">
            Coastal walks and surf breaks vary significantly with the tides. Check local tide charts for Lahinch and Kilkee before setting out for optimum conditions.
          </p>
        </div>
        <div className="space-y-1.5">
          <span className="font-bold text-[#2C3333] block flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#1B4B66]" />
            Footwear & Limestone
          </span>
          <p className="text-[#5A6363] leading-relaxed font-light">
            Limestone pavement in the Burren can be slippery when damp. Always wear boots with ankle support and deep tread when traversing the rocky fissures.
          </p>
        </div>
        <div className="space-y-1.5">
          <span className="font-bold text-[#2C3333] block flex items-center gap-1.5 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#1B4B66]" />
            Music Sessions
          </span>
          <p className="text-[#5A6363] leading-relaxed font-light">
            Trad sessions in Doolin and Ennis start between 8:30 PM and 9:30 PM. Arrive early for dinner to secure a comfortable seat near the fireside musicians.
          </p>
        </div>
      </div>
    </div>
  );
};
