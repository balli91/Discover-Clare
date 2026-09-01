# Discover Clare | Comprehensive Technical Documentation & Architecture Guide

**Discover Clare** is an independent, curated digital guide and travel companion for County Clare, Ireland. It provides visitors and locals with deep, high-craft insights across iconic landmarks (Cliffs of Moher, The Burren, Bunratty Castle), quiet coastal and inland hidden gems (Bridges of Ross, Loop Head, Killaloe), outdoor pursuits, culinary traditions, boutique accommodations, seasonal festivals, and curated multi-day itineraries.

---

## 1. Project Purpose & Vision

Unlike generic scrapers or algorithmic aggregator sites, Discover Clare is designed with an authentic, local-first ethos:
- **Natural Tones Aesthetic**: Warm neutral backgrounds (`#F9F8F5`, `#F2EFE9`), Atlantic deep slate blues (`#1B4B66`), Burren limestone accents (`#DCD6C8`), and rich peat charcoal text (`#2C3333`).
- **Independent Curation**: Clear differentiation between major tourist sites and quiet, fragile natural gems, with Leave No Trace guidance and tide/weather warnings.
- **Actionable Utility**: Practical visit metrics (pricing, estimated duration, best weather conditions, child suitability, parking availability, dogs policy).
- **Traveler Tools**: Interactive geographic discovery map, client-side saved places bookmarks with printable itinerary summaries, and responsive natural language query search.

---

## 2. Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **UI Framework** | React 18 / 19 | Declarative component hierarchy and custom hooks |
| **Language** | TypeScript 5.6+ | Strict static typing, type interfaces, and validation |
| **Routing** | `react-router-dom` (v7) | URL-based routing (`BrowserRouter`, `Routes`, `Route`, `useParams`, `useSearchParams`, `Link`, `useNavigate`) |
| **Styling** | Tailwind CSS (v4) | Utility-first CSS using `@import "tailwindcss"` in `index.css` |
| **Icons** | `lucide-react` | Standardized icon library |
| **Build Tooling** | Vite + ESBuild | Instant dev-server HMR and optimized production bundle compilation |
| **State Persistence** | LocalStorage (`useSavedPlaces`) | Client-side bookmarking without requiring login |

---

## 3. Installation & Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (runs on port 3000)
npm run dev

# 3. Type-check & lint codebase
npm run lint

# 4. Build production distribution
npm run build
```

---

## 4. Project Folder Structure

```
discover-clare/
├── index.html                  # HTML entry point with Google Fonts preconnect & root meta tags
├── metadata.json               # AI Studio project metadata & capability permissions
├── package.json                # Project dependencies, scripts, and runtime engines
├── vite.config.ts              # Vite build tool and Tailwind integration configuration
├── src/
│   ├── main.tsx                # React root bootstrap wrapping <BrowserRouter>
│   ├── App.tsx                 # Root layout, router Switch table, modal controllers & navigation
│   ├── index.css               # Global CSS entry importing Tailwind CSS & theme definitions
│   ├── types.ts                # TypeScript domain models, interfaces, and union types
│   ├── data/
│   │   └── clareData.ts        # Central dataset (CLARE_PLACES, CLARE_REGIONS, CLARE_EVENTS, CLARE_ITINERARIES, CLARE_COMMUNITY_PHOTOS)
│   ├── utils/
│   │   └── useSavedPlaces.ts   # Custom hook managing local storage bookmark state
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive navigation bar with search & saved places triggers
│   │   ├── Footer.tsx          # Brand footer, newsletter signup, quick links, region directory
│   │   ├── PlaceCard.tsx       # Reusable place card component with save toggle & slug links
│   │   ├── TodayWidget.tsx     # Scenario-based activity finder (Rainy day, Sun, Kids, Free, Trad music)
│   │   ├── ClareMapSection.tsx # Interactive SVG geographic discovery map with region/category filters
│   │   ├── PlaceModal.tsx      # Quick-view slide-over modal for detailed place inspections
│   │   ├── SavedModal.tsx      # Saved itinerary manager modal with print & trip planner links
│   │   └── SearchModal.tsx     # Natural language full-text search dialogue (Cmd+K / Ctrl+K)
│   └── views/
│       ├── HomeView.tsx        # Homepage featuring hero search, categories, featured, gems, map & itineraries
│       ├── ExploreView.tsx     # Comprehensive filterable catalog with search params sync
│       ├── AttractionsView.tsx # Major cultural landmarks & historic heritage sites
│       ├── ThingsToDoView.tsx  # Outdoor adventures, walks, water sports, cycling, and family pursuits
│       ├── FoodDrinkView.tsx   # Atlantic seafood, traditional music pubs, artisan bakeries & cafes
│       ├── WhereToStayView.tsx # Coastal hotels, boutique b&bs, glamping & country houses
│       ├── EventsView.tsx      # Festival calendar with community submission modal
│       ├── RegionsView.tsx     # The 5 geographic regions of Clare with regional place listings
│       ├── PlaceDetailView.tsx # Dedicated SEO-ready place profile page (`/places/:slug`)
│       ├── HiddenGemsView.tsx  # Dedicated showcase of fragile, off-the-beaten-track locations
│       ├── PlanYourTripView.tsx# Curated step-by-step travel routes & custom itinerary builder
│       ├── ShareYourClareView.tsx# Community photo gallery with upload dialog & photo viewer
│       ├── AboutView.tsx       # Independent mission statement & local business directory registration
│       └── NotFoundView.tsx    # Branded 404 error page with route recovery shortcuts
```

---

## 5. Application Architecture

Discover Clare follows a clean, single-page application (SPA) architecture with URL-based routing:
1. **Root Bootstrap (`src/main.tsx`)**: Mounts the React tree inside `BrowserRouter`.
2. **Core Layout (`src/App.tsx`)**: 
   - Renders the global responsive `<Navbar />` and `<Footer />`.
   - Manages top-level modal states (`selectedModalPlace`, `isSearchOpen`, `isSavedOpen`).
   - Hooks into `useSavedPlaces()` to provide synchronized bookmarking across cards, modals, and views.
   - Houses the `<Routes>` hierarchy for route matching.
3. **View Layer (`src/views/`)**: Screen-level components mapped directly to canonical URL paths.
4. **Shared Component Layer (`src/components/`)**: Modular visual blocks (cards, widgets, modals, maps) receiving props and triggering router transitions.
5. **Data Layer (`src/data/clareData.ts`)**: Structured, strongly typed static dataset with lookup helpers (`getPlaceBySlug`, `getPlacesByRegion`, `getPlacesByType`, `getRelatedPlaces`).

---

## 6. Routing Architecture

Every screen and entity in Discover Clare is bound to a persistent, shareable URL path:

| URL Route | View Component | Description |
| :--- | :--- | :--- |
| `/` | `HomeView` | County Clare overview, hero search, dynamic widgets, region highlights |
| `/explore` | `ExploreView` | Filterable directory with query parameters (`?q=`, `?type=`, `?region=`, `?weather=`) |
| `/attractions` | `AttractionsView` | Curated major & heritage attractions with category tabs |
| `/things-to-do` | `ThingsToDoView` | Outdoor activities, walks, coastal trails, water sports, and family fun |
| `/food-drink` | `FoodDrinkView` | Seafood, traditional music pubs, artisan dining, and farm gates |
| `/stay` | `WhereToStayView` | Accommodation directory (luxury, coastal, boutique, eco-glamping) |
| `/events` | `EventsView` | County-wide festival calendar & community event submission |
| `/regions` | `RegionsView` | 5 Regions index (defaults to North Clare) |
| `/regions/:regionId` | `RegionsView` | Dynamic region view for `north-clare`, `west-clare`, `south-clare`, `east-clare`, `central-clare` |
| `/places/:slug` | `PlaceDetailView` | Dedicated place profile page with full practical guide, specs, and related places |
| `/hidden-gems` | `HiddenGemsView` | Off-the-beaten-track locations and conservation guidelines |
| `/plan-your-trip` | `PlanYourTripView` | Multi-day curated itineraries and custom saved-place trip planner |
| `/share-your-clare`| `ShareYourClareView`| Community photographic gallery and visitor submission portal |
| `/about` | `AboutView` | Platform manifesto and local business listing application |
| `*` | `NotFoundView` | 404 fallback page |

---

## 7. Data Architecture & Type Structures

All data definitions live in `src/types.ts`. Key data models include:

### `ClarePlace`
```typescript
export interface ClarePlace {
  id: string;
  name: string;
  slug: string;
  type: ItemType; // 'attraction' | 'food' | 'stay' | 'activity' | 'gem'
  category: string;
  region: RegionId; // 'north-clare' | 'west-clare' | 'south-clare' | 'east-clare' | 'central-clare'
  locationName: string;
  tagline: string;
  description: string;
  insiderTip: string;
  bestTime: string;
  estimatedDuration: string;
  priceIndicator: 'Free' | '€' | '€€' | '€€€';
  weatherSuitability: WeatherSuitability; // 'all-weather' | 'rainy-day-favourite' | 'dry-only'
  heroImage: string;
  galleryImages: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
  practicalInfo: PracticalInfo;
  isMajor: boolean;
  isHiddenGem: boolean;
  badge?: string;
  imageCredit?: string;
}
```

### `PracticalInfo`
```typescript
export interface PracticalInfo {
  parkingAvailable: boolean;
  parkingDetails?: string;
  toiletsOnSite: boolean;
  wheelchairAccessible: 'full' | 'partial' | 'no';
  childFriendly: boolean;
  dogFriendly: 'yes' | 'no' | 'on-leash';
  admissionFee?: string;
  openingHours?: string;
  phone?: string;
  websiteUrl?: string;
  indoorOutdoor: 'indoor' | 'outdoor' | 'mixed';
  recommendedSeason?: string;
}
```

### `ClareRegion`
```typescript
export interface ClareRegion {
  id: RegionId;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  keyTowns: string[];
  highlights: string[];
  landscapeType: string;
}
```

### `ClareItinerary`
```typescript
export interface ClareItinerary {
  id: string;
  title: string;
  tagline: string;
  durationDays: number;
  pace: 'Relaxed' | 'Moderate' | 'Active';
  idealFor: string;
  heroImage: string;
  days: {
    dayNumber: number;
    title: string;
    description: string;
    morning: { title: string; desc: string; placeId?: string };
    afternoon: { title: string; desc: string; placeId?: string };
    evening: { title: string; desc: string; placeId?: string };
    localTip: string;
  }[];
}
```

---

## 8. State Management & Subsystems

### Saved Places Architecture
- **Hook**: `src/utils/useSavedPlaces.ts`
- **Storage Key**: `discover_clare_saved_v1` in browser `localStorage`.
- **State**: Array of place IDs (`string[]`).
- **Features**: Real-time badge counter in Navbar, heart toggle across cards/modals/details, modal manager with print layout support and direct export to the trip itinerary builder.

### Search Implementation
- **Component**: `src/components/SearchModal.tsx`
- **Trigger**: Navbar search button, hero search submit, or `Cmd+K` / `Ctrl+K` global keyboard shortcut.
- **Matching Engine**: Multi-field full-text and semantic filter matching over place names, categories, tags, descriptions, insider tips, towns, and weather suitability.
- **Routing Sync**: Submitting search routes directly to `/explore?q=<query>`.

### Interactive Geographic Map
- **Component**: `src/components/ClareMapSection.tsx`
- **Vector Canvas**: Scaled SVG rendering County Clare's coastline, Shannon Estuary, Galway Bay border, Aran Islands, and Lough Derg.
- **Interactivity**: Dynamic pin markers colored by place category with hover cards, region switching, and direct `<Link>` navigation to `/places/:slug`.

### Modal Subsystem
- **PlaceModal (`src/components/PlaceModal.tsx`)**: Quick slide-over preview with full metrics bar, accessibility checklist, insider tips, Google Directions deep-link, and canonical URL sharing.
- **SavedModal (`src/components/SavedModal.tsx`)**: Saved place list drawer with item deletion, print preview, and trip builder handover.

---

## 9. SEO & Metadata Preparation

Discover Clare is architected for search engine indexing:
1. **Semantic HTML**: `<article>`, `<nav>`, `<header>`, `<footer>`, `<section>`, and hierarchical headings (`<h1>` through `<h3>`).
2. **Semantic URL Links**: All interactive navigation controls use React Router `<Link to="...">` tags to render crawlable `<a>` elements with `href`.
3. **Place Profile Pages**: Every place is accessible at a permanent URL (`/places/:slug`).
4. **Roadmap for Head Tags**: Ready for `react-helmet-async` or server-side head injection to provide dynamic Open Graph (`og:image`, `og:title`), Twitter Card, and `schema.org` JSON-LD (`TouristAttraction`, `Restaurant`, `LodgingBusiness`, `Event`).

---

## 10. Future Migration Roadmaps

### Phase 2: Firebase Integration Roadmap
- **Firestore DB**: Migrate `CLARE_PLACES`, `CLARE_REGIONS`, `CLARE_EVENTS`, and `CLARE_COMMUNITY_PHOTOS` from static code to Firestore collections.
- **Firebase Auth**: User accounts for saving itineraries to the cloud and submitting community photos.
- **Security Rules**: Public read-only for places/events; authenticated write with schema validation for submissions.

### Phase 3: Business Portal Roadmap
- Self-service portal for Clare pubs, restaurants, craft shops, and accommodations to claim or create their listing.
- Verified badge review workflow.

### Phase 4: Google Maps Platform Integration
- Interactive Maps JavaScript API embed with custom map styling matching the Natural Tones palette (`#F9F8F5` land, `#1B4B66` water).

---

## 11. Verification & Integrity Checklist

- [x] **No Duplicate Slugs**: All place entries have unique, kebab-case URL slugs.
- [x] **Clean Imports**: All unused imports and unused icon bindings removed.
- [x] **TypeScript Compliance**: Full `tsc --noEmit` validation passing with zero warnings.
- [x] **Build Verification**: `npm run build` succeeds cleanly producing static bundle output.
- [x] **Natural Tones Integrity**: Visual design and color palette preserved without drift.
