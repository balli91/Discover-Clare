import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  MapPin, 
  Camera, 
  Search, 
  Menu, 
  X, 
  Heart,
  Info
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  savedCount,
  onOpenSaved
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore Clare' },
    { path: '/attractions', label: 'Attractions' },
    { path: '/things-to-do', label: 'Things To Do' },
    { path: '/food-drink', label: 'Food & Drink' },
    { path: '/stay', label: 'Where to Stay' },
    { path: '/events', label: 'Events' },
    { path: '/regions', label: 'Regions' },
    { path: '/plan-your-trip', label: 'Plan Your Trip' },
  ];

  const secondaryItems = [
    { path: '/hidden-gems', label: 'Hidden Gems', icon: Sparkles },
    { path: '/regions', label: '5 Regions of Clare', icon: MapPin },
    { path: '/share-your-clare', label: 'Share Your Clare', icon: Camera },
    { path: '/about', label: 'About & Business Guide', icon: Info },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md text-[#2C3333] shadow-md border-b border-[#E8E4DB]' 
        : 'bg-white text-[#2C3333] border-b border-[#E8E4DB]'
    }`}>
      {/* Top Banner with Local Context & Quick Links */}
      <div className="bg-[#2C3333] text-stone-200 text-xs px-4 py-1.5 border-b border-[#3D4545]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#DCD6C8] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Today in Clare: 14°C & Sunny • Independent County Guide
            </span>
            <span className="hidden sm:inline text-stone-500">|</span>
            <span className="hidden sm:inline text-stone-400 text-[11px] uppercase tracking-widest">Wild Atlantic Way • The Burren • Shannon Estuary</span>
          </div>
          <div className="flex items-center gap-4 text-stone-300 text-xs">
            <Link 
              id="top-nav-hidden-gems"
              to="/hidden-gems"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3 text-[#DCD6C8]" />
              <span>Hidden Gems</span>
            </Link>
            <Link 
              id="top-nav-share-photo"
              to="/share-your-clare"
              className="hover:text-white transition-colors hidden md:flex items-center gap-1"
            >
              <Camera className="w-3 h-3 text-[#DCD6C8]" />
              <span>Share Your Clare</span>
            </Link>
            <Link 
              id="top-nav-about"
              to="/about"
              className="hover:text-white transition-colors hidden lg:inline"
            >
              About & Mission
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link 
              id="brand-logo-btn"
              to="/"
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-8 h-8 bg-[#1B4B66] rounded-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-serif italic text-lg font-bold">C</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#1B4B66] font-sans">
                  DISCOVER CLARE
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-[13px] font-semibold uppercase tracking-wider text-[#5A6363]">
            {navItems.map((item) => {
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`transition-all whitespace-nowrap pb-1 ${
                    isActive
                      ? 'text-[#1B4B66] border-b-2 border-[#1B4B66]'
                      : 'hover:text-[#1B4B66]'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Action Buttons: Search, Saved Bookmarks, Plan CTA, Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              aria-label="Search Discover Clare"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F0F4F8] hover:bg-[#E2EAF1] text-[#2C3333] transition-colors text-xs sm:text-sm border border-[#E8E4DB]"
            >
              <Search className="w-4 h-4 text-[#1B4B66]" />
              <span className="hidden md:inline text-xs font-medium text-[#5A6363]">Search...</span>
              <kbd className="hidden lg:inline-block text-[10px] bg-white text-[#5A6363] px-1.5 py-0.5 rounded-full border border-[#E8E4DB]">⌘K</kbd>
            </button>

            <button
              id="saved-places-btn"
              onClick={onOpenSaved}
              className="relative p-2 sm:px-3 sm:py-2 rounded-full bg-[#F0F4F8] hover:bg-[#E2EAF1] text-[#2C3333] transition-colors border border-[#E8E4DB] flex items-center gap-1.5"
              aria-label="Saved Places"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-[#5A6363]'}`} />
              <span className="hidden sm:inline text-xs font-medium text-[#2C3333]">Saved</span>
              {savedCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1B4B66] text-white text-[11px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <Link
              to="/plan-your-trip"
              className="hidden sm:flex bg-[#1B4B66] hover:bg-[#153a4f] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors shadow-sm"
            >
              Plan Your Trip
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#F0F4F8] text-[#2C3333] hover:bg-[#E2EAF1] transition-colors border border-[#E8E4DB]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#E8E4DB] px-4 pt-3 pb-6 max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F0F4F8] text-[#1B4B66] font-bold border border-[#E8E4DB]'
                      : 'text-[#5A6363] hover:bg-[#F9F8F5] hover:text-[#1B4B66]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#1B4B66]"></span>}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E8E4DB]">
            <span className="text-xs uppercase tracking-wider text-[#8C9292] font-semibold px-2 mb-2 block">
              Curated Guides & Local Info
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {secondaryItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#5A6363] hover:bg-[#F0F4F8] text-sm hover:text-[#1B4B66] text-left"
                >
                  <item.icon className="w-4 h-4 text-[#1B4B66] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
