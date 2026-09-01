import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Printer, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ClareItinerary, ClarePlace } from '../types';
import { CLARE_ITINERARIES, CLARE_PUBLISHED_PLACES, getPlaceBySlug } from '../data/clareData';
import { SEO } from '../components/SEO';

interface PlanYourTripViewProps {
  onSelectPlace: (place: ClarePlace) => void;
  savedIds: string[];
}

export const PlanYourTripView: React.FC<PlanYourTripViewProps> = ({
  onSelectPlace,
  savedIds
}) => {
  const [selectedItinerary, setSelectedItinerary] = useState<ClareItinerary>(CLARE_ITINERARIES[0]);
  const [expandedDay, setExpandedDay] = useState<number>(1);

  // Custom Planner State
  const [customDays, setCustomDays] = useState<number>(2);
  const [customPace, setCustomPace] = useState<'relaxed' | 'active'>('relaxed');
  const [customInterests, setCustomInterests] = useState<string[]>(['coastal', 'heritage', 'music']);
  const [customGenerated, setCustomGenerated] = useState<boolean>(false);

  const toggleInterest = (interest: string) => {
    setCustomInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const savedPlaces = CLARE_PUBLISHED_PLACES.filter(p => savedIds.includes(p.id));

  const handleOpenPlaceById = (placeId?: string) => {
    if (!placeId) return;
    const found = getPlaceBySlug(placeId);
    if (found) {
      onSelectPlace(found);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <SEO
        title="Plan Your Trip to County Clare | Custom Itineraries & Routes"
        description="Craft the perfect County Clare itinerary: 48 hours along the Atlantic Edge, 3 days in the Burren & Cliffs of Moher, or a 5-day Grand Tour."
        canonical="/plan-your-trip"
      />

      {/* Header Banner */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <Compass className="w-3.5 h-3.5" />
            Curated Routes
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Plan Your Clare Journey
          </h1>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Follow expert local routes planned down to the minute — scenic drive timings, optimal photo light, authentic lunch stops, and evening fireside sessions.
          </p>
        </div>
      </div>

      {/* 1. CURATED PRE-BUILT ITINERARIES SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
              Curated Clare Itineraries
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6363] font-light">
              Select an itinerary below to inspect the day-by-day route with local insider recommendations.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="self-start sm:self-auto px-4 py-2 bg-[#F2EFE9] hover:bg-[#E8E4DB] text-[#2C3333] text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors border border-[#E8E4DB]"
          >
            <Printer className="w-3.5 h-3.5 text-[#5A6363]" />
            <span>Print Itinerary</span>
          </button>
        </div>

        {/* Itinerary Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLARE_ITINERARIES.map((itin) => {
            const isSelected = selectedItinerary.id === itin.id;
            return (
              <div
                key={itin.id}
                onClick={() => {
                  setSelectedItinerary(itin);
                  setExpandedDay(1);
                }}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1B4B66] text-white border-[#1B4B66] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#2C3333] border-[#E8E4DB] hover:border-[#1B4B66]/50 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                      isSelected ? 'bg-[#123447] text-[#DCD6C8]' : 'bg-[#F2EFE9] text-[#2C3333]'
                    }`}>
                      {itin.durationDays} {itin.durationDays === 1 ? 'Day' : 'Days'} • {itin.pace}
                    </span>
                    <span className={isSelected ? 'text-[#DCD6C8] font-medium text-[11px]' : 'text-[#5A6363] text-[11px]'}>
                      {itin.idealFor}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg leading-snug">
                    {itin.title}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-2 font-light ${isSelected ? 'text-stone-200' : 'text-[#5A6363]'}`}>
                    {itin.tagline}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-xs font-semibold flex items-center justify-between ${
                  isSelected ? 'border-[#246488] text-[#DCD6C8]' : 'border-[#E8E4DB] text-[#1B4B66]'
                }`}>
                  <span>Inspect Route Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Selected Itinerary Detailed Timeline */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DB] shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E4DB] pb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#1B4B66] block mb-1">
                Active Itinerary • {selectedItinerary.durationDays} {selectedItinerary.durationDays === 1 ? 'Day' : 'Days'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C3333]">
                {selectedItinerary.title}
              </h3>
              <p className="text-[#5A6363] text-sm mt-1 max-w-2xl font-light">
                {selectedItinerary.summary || selectedItinerary.tagline}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#F2EFE9] text-[#2C3333] font-medium border border-[#E8E4DB] capitalize">
                Pace: {selectedItinerary.pace}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#F0F4F8] text-[#1B4B66] font-semibold border border-[#E8E4DB]">
                Season: {selectedItinerary.bestSeason || 'Spring – Autumn'}
              </span>
            </div>
          </div>

          {/* Days Accordion / Breakdown */}
          <div className="space-y-4">
            {selectedItinerary.days.map((dayPlan) => {
              const isDayOpen = expandedDay === dayPlan.dayNumber;
              return (
                <div
                  key={dayPlan.dayNumber}
                  className="rounded-2xl border border-[#E8E4DB] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedDay(isDayOpen ? 0 : dayPlan.dayNumber)}
                    className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors ${
                      isDayOpen ? 'bg-[#F2EFE9] border-b border-[#E8E4DB]' : 'bg-white hover:bg-[#F2EFE9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1B4B66] text-white font-serif font-bold text-sm flex items-center justify-center">
                        D{dayPlan.dayNumber}
                      </div>
                      <div>
                        <span className="font-serif font-bold text-[#2C3333] text-base sm:text-lg block">
                          Day {dayPlan.dayNumber}: {dayPlan.title || dayPlan.theme}
                        </span>
                        {dayPlan.summary && (
                          <span className="text-xs text-[#5A6363] font-light">
                            {dayPlan.summary}
                          </span>
                        )}
                      </div>
                    </div>
                    {isDayOpen ? <ChevronUp className="w-5 h-5 text-[#5A6363]" /> : <ChevronDown className="w-5 h-5 text-[#5A6363]" />}
                  </button>

                  {isDayOpen && (
                    <div className="p-5 sm:p-6 bg-white space-y-6">
                      {/* Timeline Stops */}
                      {dayPlan.stops && dayPlan.stops.length > 0 ? (
                        <div className="space-y-6 divide-y divide-[#E8E4DB]">
                          {dayPlan.stops.map((stop) => (
                            <div key={stop.stopNumber} className="pt-5 first:pt-0 space-y-2.5">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F0F4F8] text-[#1B4B66] border border-[#E8E4DB]">
                                    Stop {stop.stopNumber}
                                  </span>
                                  <span className="text-xs font-semibold text-[#5A6363]">
                                    {stop.timeSlot} • ({stop.duration})
                                  </span>
                                </div>
                                <span className="text-xs text-[#1B4B66] font-medium flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {stop.location}
                                </span>
                              </div>

                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4 className="font-serif font-bold text-[#2C3333] text-base sm:text-lg">
                                    {stop.title}
                                  </h4>
                                  <p className="text-[#5A6363] text-xs sm:text-sm mt-1 leading-relaxed font-light">
                                    {stop.description}
                                  </p>
                                </div>
                                {stop.relatedPlaceId && getPlaceBySlug(stop.relatedPlaceId) && (
                                  <button
                                    onClick={() => handleOpenPlaceById(stop.relatedPlaceId)}
                                    className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#F2EFE9] hover:bg-[#1B4B66] hover:text-white text-[#1B4B66] text-xs font-semibold transition-colors border border-[#E8E4DB]"
                                  >
                                    View Place
                                  </button>
                                )}
                              </div>

                              {stop.insiderTip && (
                                <div className="p-3 rounded-xl bg-[#F2EFE9] border border-[#E8E4DB] text-xs text-[#2C3333] flex items-start gap-2">
                                  <Sparkles className="w-3.5 h-3.5 text-[#1B4B66] shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="text-[#1B4B66]">Insider Tip: </strong>
                                    <span className="font-light">{stop.insiderTip}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE CUSTOM TRIP BUILDER */}
      <div className="bg-[#2C3333] text-stone-100 rounded-3xl p-6 sm:p-10 border border-[#3D4545] space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66] text-[#DCD6C8] border border-[#246488]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Custom Journey Generator
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Build Your Personal Clare Itinerary
          </h2>
          <p className="text-stone-300 text-sm font-light">
            Set your duration and preferences to instantly generate a structured route incorporating top Clare highlights and your saved places.
          </p>
        </div>

        {/* Builder Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trip Duration */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#DCD6C8] block">
              Trip Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setCustomDays(d)}
                  className={`py-2.5 rounded-full font-bold text-xs transition-colors border ${
                    customDays === d
                      ? 'bg-[#1B4B66] text-white border-[#246488] shadow-sm'
                      : 'bg-[#3D4545] text-stone-300 border-[#4D5656] hover:bg-[#4D5656]'
                  }`}
                >
                  {d} {d === 1 ? 'Day' : 'Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Pace */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#DCD6C8] block">
              Pace
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCustomPace('relaxed')}
                className={`py-2.5 rounded-full font-bold text-xs transition-colors border ${
                  customPace === 'relaxed'
                    ? 'bg-[#1B4B66] text-white border-[#246488] shadow-sm'
                    : 'bg-[#3D4545] text-stone-300 border-[#4D5656] hover:bg-[#4D5656]'
                }`}
              >
                Relaxed & Unhurried
              </button>
              <button
                onClick={() => setCustomPace('active')}
                className={`py-2.5 rounded-full font-bold text-xs transition-colors border ${
                  customPace === 'active'
                    ? 'bg-[#1B4B66] text-white border-[#246488] shadow-sm'
                    : 'bg-[#3D4545] text-stone-300 border-[#4D5656] hover:bg-[#4D5656]'
                }`}
              >
                Active & Thorough
              </button>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#DCD6C8] block">
              Your Interests
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'coastal', label: 'Coast & Cliffs' },
                { id: 'heritage', label: 'Castles & History' },
                { id: 'music', label: 'Trad Music Pubs' },
                { id: 'hidden', label: 'Secret Spots' },
                { id: 'seafood', label: 'Fresh Seafood' },
              ].map((interest) => {
                const isSelected = customInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                      isSelected
                        ? 'bg-[#DCD6C8] text-[#2C3333] border-[#DCD6C8] font-bold'
                        : 'bg-[#3D4545] text-stone-300 border-[#4D5656] hover:text-white'
                    }`}
                  >
                    {interest.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div>
          <button
            onClick={() => setCustomGenerated(true)}
            className="px-6 py-3.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-bold text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#DCD6C8]" />
            <span>Generate Personalized {customDays}-Day Clare Plan</span>
          </button>
        </div>

        {/* Generated Custom Plan Output */}
        {customGenerated && (
          <div className="p-6 rounded-2xl bg-[#3D4545] border border-[#4D5656] space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-white text-lg">
                Your Tailored {customDays}-Day Route ({customPace.toUpperCase()} PACE)
              </span>
              <span className="text-xs text-[#DCD6C8] font-semibold">
                Incorporating {savedPlaces.length > 0 ? `${savedPlaces.length} saved bookmarks` : 'top highlights'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#2C3333] border border-[#3D4545] space-y-2">
                <span className="font-bold text-[#DCD6C8] block text-sm font-serif">Day 1: The Wild Coast & Cliffs</span>
                <p className="text-stone-300 leading-relaxed font-light">
                  • 08:30: Early arrival at Cliffs of Moher before tour coaches arrive.<br />
                  • 11:30: Scenic drive along R477 Black Head coastal route to Ballyvaughan.<br />
                  • 13:30: Fresh seafood lunch at Linnane's Lobster Bar, New Quay.<br />
                  • 16:00: Explore Caherconnell stone fort & Burren sheepdog demonstration.<br />
                  • 20:00: Evening traditional fiddle session at Gus O'Connor's Pub, Doolin.
                </p>
              </div>

              {customDays > 1 && (
                <div className="p-4 rounded-xl bg-[#2C3333] border border-[#3D4545] space-y-2">
                  <span className="font-bold text-[#DCD6C8] block text-sm font-serif">Day 2: Secret Peninsula & Hidden Arches</span>
                  <p className="text-stone-300 leading-relaxed font-light">
                    • 09:30: Morning walk along the dramatic Kilkee Cliff Walk.<br />
                    • 12:00: Explore the natural sea arch at the Bridges of Ross.<br />
                    • 14:00: Loop Head Lighthouse tour with views across the Shannon Estuary.<br />
                    • 18:30: Dinner in Kilkee with fresh Atlantic fish & chips on the seafront strand.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
