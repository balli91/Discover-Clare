import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Sparkles, 
  Camera, 
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C3333] text-stone-100 border-t border-[#3D4545]">
      {/* Newsletter / Local Dispatch Strip */}
      <div className="border-b border-[#3D4545] bg-[#222828]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DCD6C8] block">
                The Banner Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Get monthly Clare insider discoveries & seasonal trails
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm font-light">
                No spam. Only handpicked walks, traditional music sessions, food recommendations, and quiet corners.
              </p>
            </div>
            <div className="lg:col-span-6">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to The Banner Dispatch!');
                }}
                className="flex flex-col sm:flex-row gap-2.5 max-w-md lg:ml-auto"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for The Banner Dispatch newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full bg-[#2C3333] border border-[#485353] text-white placeholder:text-stone-400 text-sm focus:outline-none focus:border-[#1B4B66]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#1B4B66] hover:bg-[#123447] text-white font-medium text-sm transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-[#1B4B66] rounded-sm flex items-center justify-center shadow-sm">
                <span className="text-white font-serif italic text-lg font-bold">C</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                DISCOVER CLARE
              </span>
            </Link>

            <p className="text-stone-300 text-sm leading-relaxed max-w-sm font-light">
              The independent, comprehensive guide to County Clare, Ireland. From the limestone wilderness of the Burren to the surf breaks of Lahinch and the tranquil waters of Lough Derg.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-300">
              <span className="px-3 py-1 rounded-full bg-[#3D4545] border border-[#4E5858]">
                ☘️ Independent County Guide
              </span>
              <span className="px-3 py-1 rounded-full bg-[#3D4545] border border-[#4E5858]">
                🌊 Wild Atlantic Way
              </span>
            </div>
          </div>

          {/* Column 1: Explore */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-200 mb-4">
              Explore Clare
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/attractions" className="text-stone-400 hover:text-white transition-colors block">
                  Major Attractions
                </Link>
              </li>
              <li>
                <Link to="/hidden-gems" className="text-stone-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DCD6C8]" />
                  <span>Hidden Gems</span>
                </Link>
              </li>
              <li>
                <Link to="/things-to-do" className="text-stone-400 hover:text-white transition-colors block">
                  Things To Do & Walks
                </Link>
              </li>
              <li>
                <Link to="/food-drink" className="text-stone-400 hover:text-white transition-colors block">
                  Food, Seafood & Pubs
                </Link>
              </li>
              <li>
                <Link to="/stay" className="text-stone-400 hover:text-white transition-colors block">
                  Where to Stay
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-stone-400 hover:text-white transition-colors block">
                  Events & Festivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The 5 Regions */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-200 mb-4">
              The 5 Regions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/regions/ennis" className="text-stone-400 hover:text-white transition-colors block">
                  Ennis
                </Link>
              </li>
              <li>
                <Link to="/regions/north-clare-burren" className="text-stone-400 hover:text-white transition-colors block">
                  North Clare & The Burren
                </Link>
              </li>
              <li>
                <Link to="/regions/west-clare-atlantic-coast" className="text-stone-400 hover:text-white transition-colors block">
                  West Clare & Atlantic Coast
                </Link>
              </li>
              <li>
                <Link to="/regions/east-clare-lough-derg" className="text-stone-400 hover:text-white transition-colors block">
                  East Clare & Lough Derg
                </Link>
              </li>
              <li>
                <Link to="/regions/south-clare-shannon-estuary" className="text-stone-400 hover:text-white transition-colors block">
                  South Clare & Shannon Estuary
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-stone-400 hover:text-white transition-colors flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#DCD6C8]" />
                  <span>Interactive Map</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community & Trip Planning */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-200 mb-4">
              Local Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/plan-your-trip" className="text-stone-400 hover:text-white transition-colors block">
                  Itinerary Planner
                </Link>
              </li>
              <li>
                <Link to="/share-your-clare" className="text-stone-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#DCD6C8]" />
                  <span>Share Your Photos</span>
                </Link>
              </li>
              <li>
                <Link to="/suggest-a-place" className="text-stone-400 hover:text-white transition-colors block">
                  Suggest a Place
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-white transition-colors block">
                  Business Directory Portal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-400 hover:text-white transition-colors block">
                  Contact & Corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#3D4545] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-stone-300">Today in Clare: 14°C & Sunny</span>
            </div>
            <div className="w-px h-3.5 bg-white/20"></div>
            <div className="uppercase tracking-widest text-[11px]">
              Local Expertise Since 2024
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-widest text-stone-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/suggest-a-place" className="hover:text-white transition-colors">Suggest a Place</Link>
            <Link to="/hidden-gems" className="hover:text-white transition-colors">Hidden Gems</Link>
            <Link to="/share-your-clare" className="hover:text-white transition-colors">Share Your Clare</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
