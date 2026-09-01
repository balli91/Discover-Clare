import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, ArrowRight, Home } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFoundView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
      <SEO
        title="Page Not Found | Discover Clare"
        description="The page you are looking for does not exist on Discover Clare. Explore our curated attractions, hidden gems, and travel guides across County Clare."
        noIndex={true}
      />

      {/* Visual Marker */}
      <div className="w-20 h-20 rounded-full bg-[#F2EFE9] text-[#1B4B66] mx-auto flex items-center justify-center border border-[#E8E4DB] shadow-sm">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#1B4B66] block">
          404 • Page Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2C3333] leading-tight">
          Lost somewhere in County Clare?
        </h1>
        <p className="text-[#5A6363] text-base sm:text-lg max-w-lg mx-auto font-light leading-relaxed">
          Even the best wanderers take a wrong turn on the coastal boreens. The page you're looking for doesn't exist or has moved.
        </p>
      </div>

      {/* Recommended Routes Grid */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-4">
        <Link
          to="/explore"
          className="group p-5 rounded-2xl bg-white border border-[#E8E4DB] hover:border-[#1B4B66] shadow-sm hover:shadow-md transition-all space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66]">All Guides</span>
            <ArrowRight className="w-4 h-4 text-[#1B4B66] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-[#2C3333] text-base">Explore All of Clare</h3>
          <p className="text-xs text-[#5A6363] font-light">Browse all curated attractions, walks, food, and stays.</p>
        </Link>

        <Link
          to="/attractions"
          className="group p-5 rounded-2xl bg-white border border-[#E8E4DB] hover:border-[#1B4B66] shadow-sm hover:shadow-md transition-all space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66]">Landmarks</span>
            <ArrowRight className="w-4 h-4 text-[#1B4B66] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-[#2C3333] text-base">Major Attractions</h3>
          <p className="text-xs text-[#5A6363] font-light">Cliffs of Moher, Bunratty Castle, Burren, and iconic sites.</p>
        </Link>

        <Link
          to="/hidden-gems"
          className="group p-5 rounded-2xl bg-white border border-[#E8E4DB] hover:border-[#1B4B66] shadow-sm hover:shadow-md transition-all space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#1B4B66]" />
              Quiet Spots
            </span>
            <ArrowRight className="w-4 h-4 text-[#1B4B66] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-[#2C3333] text-base">Hidden Gems</h3>
          <p className="text-xs text-[#5A6363] font-light">Lesser-known sea arches, sacred wells, and quiet paths.</p>
        </Link>

        <Link
          to="/regions"
          className="group p-5 rounded-2xl bg-white border border-[#E8E4DB] hover:border-[#1B4B66] shadow-sm hover:shadow-md transition-all space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4B66] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#1B4B66]" />
              County Zones
            </span>
            <ArrowRight className="w-4 h-4 text-[#1B4B66] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-serif font-bold text-[#2C3333] text-base">5 Regions of Clare</h3>
          <p className="text-xs text-[#5A6363] font-light">Explore North, West, South, East, and Central Clare.</p>
        </Link>
      </div>

      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-medium text-sm transition-colors shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
