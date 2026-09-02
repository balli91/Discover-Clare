import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CloudRain, 
  Sun, 
  Clock, 
  Users, 
  Music, 
  PiggyBank, 
  ArrowRight,
  MapPin,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES } from '../data/clareData';
import { rankPlacesDeterministically } from '../utils/discoveryEngine';

interface TodayWidgetProps {
  onSelectPlace?: (place: ClarePlace) => void;
}

type TodayScenario = 'rain' | 'sun' | 'few-hours' | 'kids' | 'music' | 'free' | 'hidden-gem';

export const TodayWidget: React.FC<TodayWidgetProps> = ({ onSelectPlace }) => {
  const [activeScenario, setActiveScenario] = useState<TodayScenario>('rain');

  const scenarios: { id: TodayScenario; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
    { id: 'rain', label: "It's Raining", icon: CloudRain, description: 'Underground show caves, living farm cottages, artisan cheese & fireside pubs' },
    { id: 'sun', label: 'Clear & Sunny', icon: Sun, description: 'Dramatic coastal cliffs, golden surf beaches, sea arches & island cruises' },
    { id: 'few-hours', label: 'Few Hours Only', icon: Clock, description: 'High-impact, quick-access viewpoints and historic ruins under 90 minutes' },
    { id: 'kids', label: 'With Children', icon: Users, description: 'Castle folk parks, baby goat petting farms, birds of prey & gentle strands' },
    { id: 'music', label: 'Fireside Music', icon: Music, description: 'Evening traditional sessions, fiddle tunes & Atlantic seafood pints' },
    { id: 'free', label: 'Free to Explore', icon: PiggyBank, description: 'National park karst trails, abbey ruins, blowholes & scenic green roads' },
    { id: 'hidden-gem', label: 'Quiet & Secret', icon: Sparkles, description: 'Off-the-beaten-path limestone boreens, holy wells & tranquil bays' },
  ];

  // Strictly deterministic matching & ranking
  const rankedResults = rankPlacesDeterministically(CLARE_PUBLISHED_PLACES, {
    scenario: activeScenario
  }).slice(0, 4);

  const activeScenarioConfig = scenarios.find(s => s.id === activeScenario);

  return (
    <div className="bg-[#2C3333] text-white rounded-3xl p-6 sm:p-8 border border-[#3D4545] shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B4B66]/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#DCD6C8] block mb-1">
            Deterministic Decision Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            What Can I Do Today?
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 font-light">
            Select what matches your mood, company, or the Wild Atlantic weather right now:
          </p>
        </div>
        {activeScenarioConfig && (
          <p className="text-xs text-[#DCD6C8] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm self-start md:self-auto">
            {activeScenarioConfig.description}
          </p>
        )}
      </div>

      {/* Scenario Pill Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isActive = activeScenario === scenario.id;
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              id={`today-scenario-${scenario.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-[#1B4B66] text-white border-[#246488] shadow-lg scale-105'
                  : 'bg-white/10 text-stone-200 border-stone-600 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#DCD6C8]' : 'text-stone-300'}`} />
              <span>{scenario.label}</span>
            </button>
          );
        })}
      </div>

      {/* Recommended Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rankedResults.map(({ place, matchReasons }) => (
          <Link
            key={place.id}
            to={`/places/${place.slug}`}
            id={`today-place-${place.id}`}
            className="group bg-[#34495E]/50 hover:bg-[#34495E]/80 rounded-2xl p-3.5 border border-[#3D4545] hover:border-[#1B4B66] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-[#2C3333]">
                <img
                  src={place.heroImage}
                  alt={place.imageAlt || `${place.name} in ${place.locationName}, County Clare`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#2C3333]/90 text-[#DCD6C8] backdrop-blur-sm">
                    {place.category}
                  </span>
                  {place.verificationStatus === 'verified' && (
                    <span className="p-1 rounded-md text-[10px] bg-[#1B4B66]/90 text-white backdrop-blur-sm" title="Verified by Discover Clare">
                      <ShieldCheck className="w-3 h-3 text-[#DCD6C8]" />
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1B4B66] text-white border border-[#246488]">
                    {place.priceIndicator}
                  </span>
                </div>
              </div>

              {/* Match Reason Tag */}
              {matchReasons && matchReasons.length > 0 && (
                <div className="mb-2">
                  <span className="inline-block text-[10px] text-[#DCD6C8] bg-white/10 px-2 py-0.5 rounded-md">
                    ✓ {matchReasons[0]}
                  </span>
                </div>
              )}

              <h3 className="font-serif font-bold text-white text-sm group-hover:text-[#DCD6C8] transition-colors line-clamp-1">
                {place.name}
              </h3>
              <p className="text-xs text-stone-300 flex items-center gap-1 mt-1 font-light">
                <MapPin className="w-3 h-3 text-[#DCD6C8]" />
                {place.locationName} • {place.estimatedDuration}
              </p>
              <p className="text-stone-300 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                {place.tagline}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#3D4545] flex items-center justify-between text-xs text-[#DCD6C8] font-semibold group-hover:text-white">
              <span>View Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
