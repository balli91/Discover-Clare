import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ClarePlace } from './types';
import { useSavedPlaces } from './utils/useSavedPlaces';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PlaceModal } from './components/PlaceModal';
import { SearchModal } from './components/SearchModal';
import { SavedModal } from './components/SavedModal';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { AttractionsView } from './views/AttractionsView';
import { ThingsToDoView } from './views/ThingsToDoView';
import { FoodDrinkView } from './views/FoodDrinkView';
import { WhereToStayView } from './views/WhereToStayView';
import { EventsView } from './views/EventsView';
import { PlanYourTripView } from './views/PlanYourTripView';
import { HiddenGemsView } from './views/HiddenGemsView';
import { RegionsView } from './views/RegionsView';
import { PlaceDetailView } from './views/PlaceDetailView';
import { ShareYourClareView } from './views/ShareYourClareView';
import { AboutView } from './views/AboutView';
import { HowWeVerifyView } from './views/HowWeVerifyView';
import { ContactView } from './views/ContactView';
import { SuggestPlaceView } from './views/SuggestPlaceView';
import { NotFoundView } from './views/NotFoundView';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export function App() {
  const navigate = useNavigate();
  
  // Modals state for quick preview and overlay interactions
  const [selectedPlace, setSelectedPlace] = useState<ClarePlace | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSavedOpen, setIsSavedOpen] = useState<boolean>(false);

  // Persistent Saved Places
  const { savedIds, isSaved, toggleSave } = useSavedPlaces();

  // Global Keyboard shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Backwards compatibility helper for existing child callbacks
  const handleNavigate = (route: string, param?: string) => {
    switch (route) {
      case 'home':
        navigate('/');
        break;
      case 'explore':
        navigate(param ? `/explore?q=${encodeURIComponent(param)}` : '/explore');
        break;
      case 'attractions':
        navigate('/attractions');
        break;
      case 'things-to-do':
        navigate('/things-to-do');
        break;
      case 'food-drink':
        navigate('/food-drink');
        break;
      case 'stay':
        navigate('/stay');
        break;
      case 'events':
        navigate('/events');
        break;
      case 'plan-trip':
      case 'plan-your-trip':
        navigate('/plan-your-trip');
        break;
      case 'hidden-gems':
        navigate('/hidden-gems');
        break;
      case 'regions':
        navigate(param ? `/regions/${param}` : '/regions');
        break;
      case 'share-your-clare':
        navigate('/share-your-clare');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'how-we-verify':
        navigate('/how-we-verify');
        break;
      case 'map':
        navigate('/explore');
        break;
      default:
        navigate(route.startsWith('/') ? route : `/${route}`);
    }
  };

  const handleSelectPlace = (place: ClarePlace) => {
    setSelectedPlace(place);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F5] text-[#2C3333] font-sans selection:bg-[#1B4B66] selection:text-white">
      <ScrollToTop />

      {/* Top Main Navigation */}
      <Navbar
        savedCount={savedIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSaved={() => setIsSavedOpen(true)}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                onNavigate={handleNavigate}
                onSelectPlace={handleSelectPlace}
                onOpenSearch={() => setIsSearchOpen(true)}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <ExploreView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/attractions"
            element={
              <AttractionsView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
                onNavigateToHidden={() => navigate('/hidden-gems')}
              />
            }
          />
          <Route
            path="/things-to-do"
            element={
              <ThingsToDoView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/food-drink"
            element={
              <FoodDrinkView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
                onNavigateToBusinessPortal={() => navigate('/about')}
              />
            }
          />
          <Route
            path="/stay"
            element={
              <WhereToStayView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
                onNavigateToBusinessPortal={() => navigate('/about')}
              />
            }
          />
          <Route
            path="/events"
            element={<EventsView />}
          />
          <Route
            path="/plan-your-trip"
            element={
              <PlanYourTripView
                onSelectPlace={handleSelectPlace}
                savedIds={savedIds}
              />
            }
          />
          {/* Legacy route alias */}
          <Route
            path="/plan-trip"
            element={<Navigate to="/plan-your-trip" replace />}
          />
          <Route
            path="/hidden-gems"
            element={
              <HiddenGemsView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/regions"
            element={
              <RegionsView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/regions/:regionId"
            element={
              <RegionsView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          {/* Areas Aliases */}
          <Route
            path="/areas"
            element={<Navigate to="/regions" replace />}
          />
          <Route
            path="/areas/:regionId"
            element={
              <RegionsView
                onSelectPlace={handleSelectPlace}
                isSaved={isSaved}
                onToggleSave={toggleSave}
              />
            }
          />
          <Route
            path="/places/:slug"
            element={
              <PlaceDetailView
                isSaved={isSaved}
                onToggleSave={toggleSave}
                onSelectPlace={handleSelectPlace}
              />
            }
          />
          <Route
            path="/share-your-clare"
            element={<ShareYourClareView />}
          />
          <Route
            path="/about"
            element={<AboutView />}
          />
          <Route
            path="/how-we-verify"
            element={<HowWeVerifyView />}
          />
          <Route
            path="/verification"
            element={<Navigate to="/how-we-verify" replace />}
          />
          <Route
            path="/contact"
            element={<ContactView />}
          />
          <Route
            path="/suggest-a-place"
            element={<SuggestPlaceView />}
          />
          <Route
            path="/suggest-place"
            element={<Navigate to="/suggest-a-place" replace />}
          />
          <Route
            path="*"
            element={<NotFoundView />}
          />
        </Routes>
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Quick Preview Modal (for map / quick preview) */}
      <PlaceModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        isSaved={selectedPlace ? isSaved(selectedPlace.id) : false}
        onToggleSave={toggleSave}
        onSelectRelated={handleSelectPlace}
      />

      {/* Natural Language Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPlace={handleSelectPlace}
      />

      {/* Saved Places Drawer */}
      <SavedModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        onToggleSave={toggleSave}
        onSelectPlace={handleSelectPlace}
        onNavigateToPlanner={() => navigate('/plan-your-trip')}
      />
    </div>
  );
}

export default App;
