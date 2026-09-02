import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Utensils, 
  Bed, 
  Calendar, 
  Camera, 
  Footprints, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';
import { ClarePlace } from '../types';
import { CLARE_PUBLISHED_PLACES, CLARE_REGIONS, CLARE_ITINERARIES, CLARE_COMMUNITY_PHOTOS } from '../data/clareData';
import { PlaceCard } from '../components/PlaceCard';
import { TodayWidget } from '../components/TodayWidget';
import { ClareMapSection } from '../components/ClareMapSection';
import { SEO } from '../components/SEO';
import { generateWebsiteJsonLd } from '../utils/seo';

interface HomeViewProps {
  onNavigate?: (route: string, param?: string) => void;
  onSelectPlace: (place: ClarePlace) => void;
  onOpenSearch: () => void;
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectPlace,
  onOpenSearch,
  isSaved,
  onToggleSave
}) => {
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const navigate = useNavigate();

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      navigate(`/explore?q=${encodeURIComponent(heroSearchInput.trim())}`);
    } else {
      onOpenSearch();
    }
  };

  const featuredMajorPlaces = CLARE_PUBLISHED_PLACES.filter(p => p.isMajor).slice(0, 4);
  const hiddenGems = CLARE_PUBLISHED_PLACES.filter(p => p.isHiddenGem).slice(0, 4);

  const quickCategories = [
    { id: 'attractions', label: 'Places to Visit', icon: Compass, color: 'hover:border-emerald-500' },
    { id: 'things-to-do', label: 'Things To Do', icon: Footprints, color: 'hover:border-sky-500' },
    { id: 'food-drink', label: 'Food & Drink', icon: Utensils, color: 'hover:border-amber-500' },
    { id: 'stay', label: 'Where to Stay', icon: Bed, color: 'hover:border-indigo-500' },
    { id: 'hidden-gems', label: 'Hidden Gems', icon: Sparkles, color: 'hover:border-amber-400' },
    { id: 'events', label: 'Events & Trad', icon: Calendar, color: 'hover:border-rose-500' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <SEO
        title="Discover Clare | Explore County Clare, Ireland"
        description="Independent travel and discovery guide to County Clare, Ireland. Explore the Cliffs of Moher, the Burren, hidden coastal gems, traditional music pubs, Atlantic surf, walks, dining and authentic local experiences."
        canonical="/"
        jsonLd={generateWebsiteJsonLd()}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center bg-[#34495E] text-white overflow-hidden">
        {/* Full-width High-Res Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=85"
            alt="Cliffs of Moher and County Clare Atlantic Coastline"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Natural Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333] via-[#34495E]/60 to-[#1B4B66]/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] bg-black/40 text-[#DCD6C8] border border-[#E8E4DB]/30 backdrop-blur-md mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Independent Travel & Discovery Guide
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-md">
            DISCOVER <span className="text-[#DCD6C8] font-serif italic font-normal">CLARE</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-stone-200 mt-4 max-w-2xl font-light leading-relaxed drop-shadow">
            Experience the wild cliffs, limestone karst, traditional tunes, and coastal hospitality that define County Clare.
          </p>

          {/* Prominent Search / Discovery Field */}
          <form 
            onSubmit={handleHeroSearchSubmit}
            className="w-full max-w-2xl mt-8 bg-white p-2 rounded-full shadow-2xl border border-[#E8E4DB] flex items-center gap-2"
          >
            <div className="flex items-center gap-3 flex-1 pl-4 sm:pl-6">
              <Search className="w-5 h-5 text-[#1B4B66] shrink-0" />
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="Search places, towns, rainy day spots, seafood..."
                className="w-full bg-transparent text-[#2C3333] placeholder-stone-400 text-sm sm:text-base focus:outline-none"
              />
            </div>
            <button
              type="submit"
              id="hero-search-btn"
              className="px-6 sm:px-8 py-3 rounded-full bg-[#1B4B66] hover:bg-[#153a4f] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 shrink-0 shadow-md"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Discovery Tags below search */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-[#E8E4DB]">
            <span className="text-stone-300 font-medium">Popular:</span>
            <Link to="/explore?q=Cliffs%20of%20Moher" className="hover:text-white underline decoration-[#E8E4DB]/50 underline-offset-2">Cliffs of Moher</Link>
            <span>•</span>
            <Link to="/explore?q=The%20Burren" className="hover:text-white underline decoration-[#E8E4DB]/50 underline-offset-2">The Burren</Link>
            <span>•</span>
            <Link to="/explore?q=Doolin" className="hover:text-white underline decoration-[#E8E4DB]/50 underline-offset-2">Doolin Trad</Link>
            <span>•</span>
            <Link to="/explore?q=Lahinch" className="hover:text-white underline decoration-[#E8E4DB]/50 underline-offset-2">Lahinch Surf</Link>
            <span>•</span>
            <Link to="/hidden-gems" className="text-[#DCD6C8] hover:text-white font-semibold underline decoration-[#DCD6C8]/60 underline-offset-2">Bridges of Ross</Link>
          </div>
        </div>

        {/* Hero Photo Credit */}
        <div className="absolute bottom-3 right-4 text-[10px] text-stone-300/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
          Cliffs of Moher • County Clare
        </div>
      </section>

      {/* 2. EXPLORE CLARE: CATEGORY SHORTCUTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                id={`quick-cat-${cat.id}`}
                to={`/${cat.id}`}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E4DB] shadow-sm hover:shadow-md hover:bg-[#F2F4F7] transition-all text-left group flex flex-col justify-between h-28 sm:h-32"
              >
                <div className="w-10 h-10 rounded-full bg-[#F0F4F8] flex items-center justify-center text-[#1B4B66] group-hover:bg-[#1B4B66] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2C3333] text-xs sm:text-sm group-hover:text-[#1B4B66] transition-colors">
                    {cat.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#1B4B66] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. "WHAT CAN I DO TODAY?" DYNAMIC WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TodayWidget onSelectPlace={onSelectPlace} />
      </section>

      {/* 4. FEATURED MAJOR ATTRACTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#1B4B66] block mb-1">
              Iconic Clare
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
              Featured Clare Destinations
            </h2>
            <p className="text-[#5A6363] text-sm mt-1 max-w-xl">
              From monumental Atlantic sea cliffs to ancient karst pavement and living medieval folk castles.
            </p>
          </div>
          <Link
            to="/attractions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B4B66] hover:text-[#123447] transition-colors"
          >
            <span>View all attractions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMajorPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onSelect={onSelectPlace}
              isSaved={isSaved(place.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      {/* 5. HIDDEN SIDE OF CLARE (PROMINENT SECTION) */}
      <section className="bg-[#2C3333] text-white py-16 sm:py-20 border-y border-[#3D4545] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#DCD6C8] text-[#2C3333] shadow-md mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
                Go Beyond The Tourist Trail
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
                Discover the Hidden Side of Clare
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-light">
                Natural sea arches carved by Atlantic breakers, thunderous sea caverns, peaceful 15th-century cloistered friaries, and artisan farmsteads unknown to tour coaches.
              </p>
            </div>
            <Link
              to="/hidden-gems"
              className="px-6 py-3 rounded-full bg-[#DCD6C8] hover:bg-[#CBC4B4] text-[#2C3333] font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg self-start md:self-auto"
            >
              <span>Explore All Hidden Gems</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiddenGems.map((place) => (
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
      </section>

      {/* 6. EXPLORE BY 5 REGIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#1B4B66] block mb-1">
            Geographic Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C3333]">
            Explore County Clare by Region
          </h2>
          <p className="text-[#5A6363] text-sm sm:text-base mt-2">
            Each corner of Clare has its own distinct soul — from wild limestone pavement in the north to the tranquil lakelands of Lough Derg in the east.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLARE_REGIONS.map((region, idx) => (
            <Link
              key={region.id}
              to={`/regions/${region.id}`}
              id={`region-card-${region.id}`}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-[#E8E4DB] transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 min-h-[340px] text-white ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Background Image */}
              <img
                src={region.heroImage}
                alt={region.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333] via-[#2C3333]/50 to-[#1B4B66]/30"></div>

              {/* Top tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C3333]/80 text-[#DCD6C8] border border-[#E8E4DB]/30 backdrop-blur-sm">
                  Region 0{idx + 1}
                </span>
                <span className="text-xs text-stone-200 font-medium">
                  {region.keyTowns.slice(0, 3).join(' • ')}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#DCD6C8] transition-colors">
                  {region.name}
                </h3>
                <p className="text-stone-200 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                  {region.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#DCD6C8] group-hover:translate-x-1 transition-transform">
                  <span>Explore {region.name.split('&')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClareMapSection onSelectPlace={onSelectPlace} isSaved={isSaved} onToggleSave={onToggleSave} />
      </section>

      {/* 8. CURATED ITINERARIES TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F2EFE9] border border-[#E8E4DB]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1B4B66]/10 text-[#1B4B66] border border-[#1B4B66]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#1B4B66]" />
                Tailored Travel Plans
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
                Plan Your Trip with Curated Clare Itineraries
              </h2>
              <p className="text-[#5A6363] text-sm leading-relaxed">
                Whether you have 24 hours, a weekend, or a week, our step-by-step routes guide you through sunrise viewpoints, lunch spots, and evening fireside sessions with local insider tips.
              </p>
              <Link
                to="/plan-your-trip"
                className="inline-flex px-6 py-3 rounded-full bg-[#1B4B66] hover:bg-[#153a4f] text-white font-semibold text-sm transition-colors items-center gap-2 shadow-md"
              >
                <span>Browse All Itineraries</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CLARE_ITINERARIES.slice(0, 2).map((itinerary) => (
                <Link
                  key={itinerary.id}
                  to="/plan-your-trip"
                  className="group bg-white rounded-2xl p-5 border border-[#E8E4DB] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-[#F0F4F8]">
                      <img
                        src={itinerary.heroImage}
                        alt={itinerary.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#2C3333]/90 text-white backdrop-blur-sm">
                        {itinerary.durationDays} Days • {itinerary.pace}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-[#2C3333] text-base group-hover:text-[#1B4B66] transition-colors">
                      {itinerary.title}
                    </h3>
                    <p className="text-[#5A6363] text-xs mt-1 line-clamp-2">
                      {itinerary.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E8E4DB] flex items-center justify-between text-xs font-semibold text-[#1B4B66]">
                    <span>{itinerary.idealFor}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. SHARE YOUR CLARE COMMUNITY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#1B4B66] block mb-1">
              Through The Lens
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2C3333]">
              Share Your Clare
            </h2>
            <p className="text-[#5A6363] text-sm mt-1 max-w-xl">
              Authentic moments captured by visitors and locals across the cliffs, bays, and pubs of Clare.
            </p>
          </div>
          <Link
            to="/share-your-clare"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B4B66] hover:text-[#123447] transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>Submit your photography</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CLARE_COMMUNITY_PHOTOS.map((photo) => (
            <Link
              key={photo.id}
              to="/share-your-clare"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#F0F4F8] cursor-pointer shadow-sm hover:shadow-lg border border-[#E8E4DB] transition-all"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3333]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                <span className="text-xs font-bold leading-tight">{photo.title}</span>
                <span className="text-[10px] text-[#DCD6C8] mt-0.5">{photo.authorHandle}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. INDEPENDENT LOCAL MISSION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1B4B66] text-white p-8 sm:p-12 border border-[#246488] flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[#DCD6C8] font-semibold text-xs uppercase tracking-[0.2em]">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent & Locally Focused</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Built by people who genuinely know County Clare
            </h3>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-light">
              Discover Clare is an independent platform. We are not an official government agency or a generic aggregator — we are dedicated to helping visitors discover authentic heritage, protect our wild landscapes, and support local Clare businesses.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <Link
              to="/about"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#F0F4F8] text-[#1B4B66] font-bold text-sm transition-colors text-center shadow-md"
            >
              Read Our Mission
            </Link>
            <Link
              to="/suggest-a-place"
              className="px-6 py-3 rounded-full bg-[#123447] hover:bg-[#0e2736] text-[#DCD6C8] border border-[#246488] font-medium text-sm transition-colors text-center"
            >
              Suggest a Place
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
