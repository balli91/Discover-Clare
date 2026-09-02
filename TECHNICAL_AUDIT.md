# Discover Clare | Technical Architecture Audit Report

**Audit Date**: September 2026  
**Auditor**: Lead Frontend & Systems Architect  
**Scope**: Full application codebase (`src/`, `index.html`, `metadata.json`, `package.json`, `vite.config.ts`, `scripts/`)  
**Living Document Status**: Authoritative Technical Audit Record

---

## Executive Summary

Discover Clare has established a robust architectural baseline with **URL-based routing (`react-router-dom` v7)**, a **zero-dependency dynamic SEO metadata management engine (`useDocumentMeta`)**, strict **editorial verification data integrity**, optimized media loading attributes (Phase 2.2), and a validated dataset across all County Clare regions.

This technical audit serves as the **living source of truth** for architectural baselines, resolved historical findings, current unresolved audit findings, confirmed limitations, and the official project roadmap status.

---

## 1. Issue Severity & Status Matrix

This matrix clearly delineates **historical resolved findings**, **current unresolved technical SEO findings**, and **open information-architecture / SEO opportunities**.

### Historical Resolved Issues (Phases 1, 2.1, 2.2)

| Issue ID | Severity | Category | Status | Summary of Resolution |
| :--- | :---: | :---: | :---: | :--- |
| **HIST-01** | **HIGH** | Routing | **Resolved** | URL sharing deep-link inconsistencies fixed; all primary interactions now route via canonical URL paths (`/places/:slug`, `/regions/:regionId`). |
| **HIST-02** | **HIGH** | Data Integrity | **Resolved** | Verification data fabrication safeguard implemented. Verification engine fully decoupled from commercial promotion (`PlacePromotion`). |
| **HIST-03** | **MEDIUM** | SEO Engine | **Resolved** | Phase 2.1 zero-dependency Dynamic Head Metadata Engine (`useDocumentMeta` / `<SEO>`) implemented with idempotent DOM reconciliation. |
| **HIST-04** | **MEDIUM** | Code Hygiene | **Resolved** | Unused legacy packages removed, clean import hygiene enforced, TypeScript strict typing passing. |
| **HIST-05** | **LOW** | Performance | **Resolved** | Phase 2.2 Image Loading & Core Web Vitals optimization completed (`fetchPriority="high"`, `decoding="async"`, `loading="lazy"`, fixed aspect ratios). |

### Current Technical SEO Findings (Phase 2.3 — Unresolved)

| Finding ID | Severity | Category | Status | Description |
| :--- | :---: | :---: | :---: | :--- |
| **SEO-01** | **MEDIUM** | Rendering | **UNRESOLVED** | **Client-Side Rendering Dependency**: Important SEO content and route-specific metadata depend on client-side JavaScript execution because the application is a React 19 CSR SPA. Raw HTML responses contain an initial SPA shell (`<div id="root"></div>`) with generic title and description tags. Crawlers that do not execute JavaScript receive only the initial shell, and search engines capable of executing JavaScript encounter a rendering dependency that can delay or complicate discovery compared with directly available static HTML. |
| **SEO-02** | **MEDIUM** | Status Codes | **UNRESOLVED** | **SPA Soft-404 Status Code Behaviour**: Unknown or non-existent URLs (e.g., `/places/unknown-slug`) return an HTTP 200 OK status code with the generic SPA shell. The client-side application subsequently renders a visual "Not Found" view and injects `<meta name="robots" content="noindex, follow">`. In search indexing, this is categorized as a soft-404 because the transport layer emits HTTP 200 rather than an HTTP 404 status code. |
| **SEO-03** | **LOW** | Directives | **UNRESOLVED** | **Robots.txt Disallow on Query Strings**: `robots.txt` contains `Disallow: /*?*`. The factual consequence is that crawlers adhering to `robots.txt` cannot crawl URLs containing query strings, which includes locality breadcrumbs such as `/explore?locality=doolin`. *(Note: Disallow prevents crawling of query paths; it does not guarantee de-indexation if external links exist, nor does it replace canonical URL management).* |
| **SEO-04** | **LOW / OPPORTUNITY** | Information Architecture | **OPEN OPPORTUNITY** | **Absence of Dedicated Event & Itinerary Detail URLs**: 5 annual cultural events and 3 curated multi-day itineraries currently exist within aggregate views (`/events`, `/plan-your-trip`) but do not have dedicated `/events/:slug` or `/itineraries/:slug` URLs. This represents an information-architecture and organic search expansion opportunity rather than a broken technical implementation. |

---

## 2. Detailed Findings & Historical Remediation

### 2.1 Routing & Navigation Architecture
- **Status**: **STABILIZED & VERIFIED**
- **Architecture**:
  - `main.tsx` wraps `<BrowserRouter>` around `<App />` using React 19 and `react-router-dom` v7.
  - Total route definitions in `App.tsx`: **23 routes** (17 distinct functional route patterns, 5 backwards-compatible alias/redirect routes, and 1 wildcard 404 route).
  - Navigation across views utilizes semantic `<Link to="...">` (`<a href="...">`) elements.
- **Verification**:
  - `useParams<{ slug: string }>()` dynamically resolves published places in `PlaceDetailView.tsx`.
  - `useParams<{ regionId?: string }>()` resolves region tabs in `RegionsView.tsx`.
  - `useSearchParams()` manages filter state on `/explore`.

### 2.2 Dynamic SEO & Head Metadata Foundation (Phase 2.1)
- **Status**: **IMPLEMENTED & VERIFIED (Zero New Dependencies)**
- **Architecture**:
  - **`useDocumentMeta`**: Lightweight, dependency-free React hook (`src/utils/useDocumentMeta.ts`, re-exported via `src/hooks/useDocumentMeta.ts`).
  - **`<SEO>` Component**: Declarative wrapper (`src/components/SEO.tsx`) integrated across views.
  - **Supported Properties**: Document `<title>`, `<meta name="description">`, canonical `<link rel="canonical">` via `getCanonicalUrl`, Open Graph (`og:*`), Twitter Cards (`twitter:*`), Robots directives (`index, follow` / `noindex, follow`), and Schema.org JSON-LD scripts.
  - **Deduplication & Safety**: Managed tags utilize `data-managed-by="discover-clare-seo"` and are updated idempotently on route change, preventing tag duplication.
  - **Structured Data (Schema.org JSON-LD)**: Generates valid entities (`TouristAttraction`, `TouristDestination`, `WebSite`, `Organization`, `BreadcrumbList`, hospitality subtypes) mapped directly from genuine dataset fields (`geo`, `address`, `telephone`, `sameAs`). Zero fabrication of reviews, ratings, or unverified hours.

### 2.3 Place Dataset & Verification System Integrity
- **Status**: **VERIFIED (100% PASS — Zero Fabrication)**
- **Audit Checks**:
  1. **Published Places**: 36 curated, published listings across 5 regions.
  2. **Total Catalog Records**: 178 places (36 published, 142 unverified draft records).
  3. **Slug Uniqueness**: All slugs are unique, valid lowercase kebab-case strings.
  4. **Geographic Coordinates**: All published places feature valid coordinates within County Clare bounds (`52.0°N – 53.5°N`, `-10.5°W – -8.0°W`).
  5. **Verification Model**: Canonical `PlaceVerification` model in `verificationEngine.ts`. No automatic fallbacks to fabricated audit dates or checklists.
  6. **Commercial Independence**: Editorial verification status is decoupled from commercial promotion (`PlacePromotion`).

### 2.4 Build System & Asset Generation
- **Status**: **VERIFIED**
- **Scripts**:
  - `scripts/generate-seo-files.ts`: Automated pre-build generator creating `public/sitemap.xml` and `public/robots.txt` based on validated published listings and routes.
  - `package.json` build command: `"build": "tsx scripts/generate-seo-files.ts && vite build"`.

### 2.5 Image Loading & Core Web Vitals (Phase 2.2)
- **Status**: **IMPLEMENTED & VERIFIED (Zero New Dependencies)**
- **Audit & Architecture**:
  - **LCP Optimization (Above the Fold)**:
    - `HomeView.tsx` hero image: Configured with `fetchPriority="high"` and `decoding="async"`. Not lazy-loaded.
    - `PlaceDetailView.tsx` hero image: Configured with `fetchPriority="high"`, `decoding="async"`, and `loading="eager"`.
    - `RegionsView.tsx` regional hero banner: Configured with `fetchPriority="high"` and `decoding="async"`.
  - **Native Lazy Loading (Below the Fold & Lists)**:
    - Applied `loading="lazy"` and `decoding="async"` across `PlaceCard.tsx`, region spotlights, itinerary teasers, community galleries, event cards, and modal thumbnails.
  - **CLS Prevention (Layout Stability)**:
    - Image containers utilize explicit aspect ratios (`aspect-[16/10]`, `aspect-[4/3]`, `aspect-square`) and dimensional bounds with placeholder background colors (`bg-[#F0F4F8]`, `bg-[#2C3333]`).
  - **Accessibility**:
    - Descriptive `alt` attributes (`place.imageAlt || place.name`) maintained across all `<img>` elements.

---

## 3. Codebase Metrics Census

```
Primary Framework:             React 19.0.1 with Vite 6.2.3 & TypeScript 5.8.2
Routing Engine:                react-router-dom 7.18.2 (HTML5 History API)
Total TypeScript / TSX Files:  20
Total Components & Views:      20
Total Static Catalog Records:  178 Total Places (36 Published | 142 Draft)
Geographic Regions:            5 Regions
Events & Itineraries:          5 Events | 3 Curated Itineraries
Total Routes in App.tsx:       23 Route Definitions (17 Functional | 5 Aliases | 1 Wildcard)
Total Sitemap URLs:            56 Validated Canonical URLs
TypeScript Diagnostics:        0 errors (tsc --noEmit passed)
Vite Build Status:             Success (Built clean with automated SEO pre-build)
External SEO / Image Libs:     0 (100% dependency-free custom hooks & standard HTML/React attributes)
```

---

## 4. Phase 2.3 — SEO Foundation, Crawlability & Indexation Audit

### 4.1 Audit Objective
Perform a forensic technical SEO audit to determine whether Discover Clare's current architecture can reliably expose, crawl, index, understand, and rank a large-scale set of high-quality County Clare tourism and local-discovery pages, and identify technical SEO limitations before scaling.

### 4.2 Current SEO Architecture Baseline
- **Rendering Model**: Client-side rendered (CSR) Single-Page Application (React 19 + Vite).
- **Routing Engine**: `react-router-dom` v7 with client-side HTML5 history navigation.
- **Dynamic Head Management**: Custom `useDocumentMeta` hook wrapped by `<SEO>` component.
- **Structured Data**: Schema.org JSON-LD generation (`TouristAttraction`, `TouristDestination`, `WebSite`, `Organization`, `BreadcrumbList`, hospitality subtypes) mapped from real dataset records.
- **Build-Time Generation**: `scripts/generate-seo-files.ts` generates `public/sitemap.xml` and `public/robots.txt` at build time.

### 4.3 Initial HTML vs. Client-Rendered DOM

| Aspect | Initial Raw HTML Response (`dist/index.html`) | Client-Rendered DOM (After JS Execution) | Crawler & Indexation Implications |
| :--- | :--- | :--- | :--- |
| **`<title>`** | Generic: `<title>Discover Clare</title>` | Route-specific (e.g., `Cliffs of Moher \| Discover Clare`) | Crawlers that do not execute JavaScript receive the generic brand title. |
| **`<meta name="description">`** | Generic site summary | Route-specific summary (~155 characters) | Social link preview scrapers (WhatsApp, Twitter/X, LinkedIn) parse raw HTML and display fallback text unless prerendered. |
| **`<link rel="canonical">`** | Missing from raw HTML | Dynamically injected via `useDocumentMeta` | Dependent on client-side script execution. |
| **Open Graph / Twitter Cards** | Generic fallback image & site copy | Route-specific hero image, title, and tagline | Social media sharing displays generic brand card rather than place-specific photos on scrapers lacking full JS rendering. |
| **Content & Headings (`<h1>`–`<h3>`)** | `<div id="root"></div>` (0 bytes of content) | Complete semantic layout, prose, and metadata | Crawlers that do not execute JS see an empty page. For JS-capable search engines (e.g. Googlebot), rendering the client application introduces a processing dependency that can delay or complicate discovery and indexing compared with directly available static HTML. |
| **Internal Links (`<a href>`)** | 0 internal links in initial HTML | Full internal link graph dynamically rendered | Crawlers must execute JavaScript to discover internal links from deep pages. |
| **Schema.org JSON-LD** | Not present | Injected `<script type="application/ld+json">` | Fully readable by JavaScript-capable search engines post-render; unreadable to simple non-JS parsers. |

### 4.4 Route & Indexability Inventory

- **Distinct Functional Routes (17)**:
  - `/` (Home): Indexable. Highlights, quick filters, region spotlight. JSON-LD: `WebSite`, `Organization`.
  - `/explore` (Directory & Map): Indexable. Filterable directory of all published places. JSON-LD: `BreadcrumbList`.
  - `/attractions` (Iconic Landmarks): Indexable. Curated landmarks & natural wonders.
  - `/things-to-do` (Activities & Trails): Indexable. Outdoor adventures, walks, water sports.
  - `/food-drink` (Gastronomy): Indexable. Pubs, seafood, bakeries, cafes.
  - `/stay` (Accommodations): Indexable. Hotels, B&Bs, castles, glamping.
  - `/events` (Festivals): Indexable. Annual festivals & cultural sessions list.
  - `/regions` & `/regions/:regionId` (5 Regions): Indexable. Regional guides, highlights, place cards. JSON-LD: `TouristDestination`, `BreadcrumbList`.
  - `/places/:slug` (Place Guides): Indexable (36 published listings). Verified editorial place dossiers. JSON-LD: `TouristAttraction` / hospitality schemas, `BreadcrumbList`.
  - `/hidden-gems` (Quiet Discoveries): Indexable. Curated off-the-beaten-track locations.
  - `/plan-your-trip` (Itinerary Planner): Indexable. Multi-day itineraries & custom trip builder.
  - `/share-your-clare` (Community): Indexable. Visitor photography gallery.
  - `/about`, `/how-we-verify`, `/contact`, `/suggest-a-place`: Indexable informational/editorial pages.
- **Compatibility / Alias Routes (5)**:
  - `/plan-trip` (Redirects to `/plan-your-trip`), `/areas` (Redirects to `/regions`), `/areas/:regionId` (Renders `RegionsView`), `/verification` (Redirects to `/how-we-verify`), `/suggest-place` (Redirects to `/suggest-a-place`).
- **Utility / Non-Indexable Routes (1)**:
  - `*` (Wildcard Not Found): Renders `NotFoundView` with `noIndex={true}`.

### 4.5 Sitemap Findings
- **File Location**: `public/sitemap.xml` (copied to `dist/sitemap.xml` on build).
- **Verified URL Count**: **56 valid, canonical URLs**.
  - 15 Core static routes.
  - 5 Regional routes (`/regions/ennis`, `/regions/north-clare-burren`, `/regions/west-clare-atlantic-coast`, `/regions/east-clare-lough-derg`, `/regions/south-clare-shannon-estuary`).
  - 36 Published place guide routes (`/places/:slug`).
- **Integrity**: 100% verified. 142 unverified/draft catalog items are strictly excluded. Build fails if duplicate slugs, invalid slug formatting, or out-of-bounds coordinates are detected.

### 4.6 Robots.txt Findings
- **File Location**: `public/robots.txt` (copied to `dist/robots.txt`).
- **Directives**:
  ```txt
  User-agent: *
  Allow: /
  Disallow: /*?*
  Sitemap: https://discoverclare.ie/sitemap.xml
  ```
- **Factual Consequence**:
  - `Disallow: /*?*` instructs crawlers not to request URLs containing query parameters.
  - This prevents crawling of dynamic filter combinations on `/explore`.
  - It also means that internal breadcrumb links formatted with query strings (e.g., `/explore?locality=doolin`) will not be crawled.
  - *(Note: Disallow prevents crawling, not indexation if external links exist; it does not replace canonical tag consolidation).*

### 4.7 Internal Crawlability & Link Graph
- **Homepage to Regions**: Semantic `<Link to="/regions/...">` and `<Link to="/explore">`.
- **Regions to Places**: Semantic `<Link to="/places/:slug">` on place cards.
- **Place to Place**: Contextual internal linking via `getRelatedPlaces` in `PlaceDetailView.tsx`.
- **Crawl Paths per Listing**: Verified that every one of the 36 published places is reachable through **at least 3 distinct crawl paths**:
  1. The master directory view (`/explore`),
  2. Its respective primary category view (`/attractions`, `/things-to-do`, `/food-drink`, or `/stay`),
  3. Its respective regional guide view (`/regions/:regionId`).
- **Anchor Semantics**: All primary navigation controls use semantic HTML anchor tags via `react-router-dom` `<Link>` components rather than script-only button click handlers.

### 4.8 Canonical URL Strategy Findings
- **Consistency**: High. Canonicals are centrally computed via `getCanonicalUrl()` in `src/config/seo.ts`.
- **Normalization**: Strips query strings, hash fragments, and trailing slashes (except root `/`).
- **Domain Source**: Respects `process.env.VITE_SITE_URL` / `process.env.APP_URL` during build and defaults to `https://discoverclare.ie`.
- **Limitation**: In the pure CSR SPA model, canonical tags are injected into `document.head` via JavaScript on the client, rather than appearing in the initial HTTP response.

### 4.9 Structured Data (JSON-LD) Findings
- **Vocabulary**: Valid Schema.org entities (`TouristAttraction`, `TouristDestination`, `WebSite`, `Organization`, `BreadcrumbList`, `Restaurant`, `Hotel`, `Park`, `Beach`, `SportsActivityLocation`).
- **Truth-in-Data**: **100% Pass**. All coordinates, addresses, phone numbers, and categories are mapped from genuine dataset records. Zero fabricated reviews, fake star ratings, or invented opening hours.
- **Execution**: Scripts are injected dynamically by `useDocumentMeta` inside `useEffect`.

### 4.10 Dataset & Indexation Controls
- **Dataset Census**: 178 Total Catalog Places | 36 Published Places | 142 Draft / Unverified Places | 5 Regions | 5 Events | 3 Itineraries.
- **Draft Isolation**: `getPlaceBySlug()` filters exclusively against `getPublishedPlaces()`. If an unpublished draft slug is requested, the application returns `undefined`, triggering the 404 UI with `noIndex={true}`. Drafts never enter the sitemap, structured data, or internal link graph.

### 4.11 Duplicate Content & Soft-404 Risks
- **SPA Soft-404 Behaviour**: When a non-existent URL is requested, the server returns `index.html` with an HTTP 200 OK status code. The client application renders a visual 404 view and injects `<meta name="robots" content="noindex, follow">`. In search indexing, this is categorized as a soft-404 because the transport layer emits HTTP 200.
- **Query Parameter Duplication**: Filter combinations on `/explore` are canonicalized to `/explore` and crawling is disallowed via `robots.txt`.

---

## 5. Architectural Assessment: Classification & Scaling Analysis

### Assessment Classification:
**Category B — "SEO foundation is workable for the current curated catalog, but has identifiable technical limitations that should be evaluated before large-scale organic expansion."**

### Rationale:
1. **Strengths of Current Codebase**:
   - Zero-dependency, idempotent head metadata management engine (`useDocumentMeta`).
   - Clean, slug-based semantic URL hierarchy with validated County Clare coordinate bounds.
   - Comprehensive, 100% truthful Schema.org JSON-LD generation with zero AI fabrication.
   - Automated build-time sitemap and robots.txt generation.
   - Semantic `<a href>` link graph across all views with at least 3 distinct crawl paths per published place.
2. **Identified Technical Limitations**:
   - The application relies on client-side JavaScript execution to populate HTML content, titles, meta tags, and structured data.
   - Crawlers that do not execute JavaScript receive an empty shell. For JavaScript-capable search engines, client-side rendering introduces a processing dependency that can delay or complicate discovery compared with directly available static HTML.
   - HTTP response codes are uniformly 200 OK for all routes, creating SPA soft-404 behaviour for non-existent URLs.

---

## 6. Potential Future Architecture / SEO Options — NOT APPROVED

*Note: The following architectural options are technical observations and possibilities for future discussion with the project owner. They are NOT approved implementation decisions and do NOT form part of the agreed development roadmap.*

### Option A: Static Site Generation (SSG) / Build-Time Prerendering (Unapproved Option)
- **Concept**: Generate static HTML snapshots for all 56+ indexable routes at build time (e.g., using Vite SSG or an automated prerender script).
- **Advantages**: Preserves the existing React/Vite stack without framework migration; provides instant initial HTML, full Open Graph social card support on all scrapers, and eliminates JavaScript rendering dependencies for search engines.
- **Trade-offs**: Requires adding a pre-rendering step to the build pipeline.

### Option B: Dedicated Town / Locality Information Architecture (Unapproved Option)
- **Concept**: Expand routing hierarchy from query parameters (`/explore?locality=doolin`) to dedicated crawlable routes (e.g., `/towns/doolin`, `/towns/lahinch`, `/towns/ennis`, `/towns/kilkee`).
- **Advantages**: Directly targets high-volume search intents ("things to do in Doolin", "Lahinch surfing") with dedicated static pages, unique meta titles, and localized breadcrumbs.
- **Trade-offs**: Requires creating dedicated view components or dynamic route handlers.

### Option C: Dedicated Detail Routes for Events & Curated Itineraries (Unapproved Option)
- **Concept**: Add `/events/:slug` and `/itineraries/:slug` routes with dedicated Schema.org `Event` and `TouristTrip` JSON-LD schemas.
- **Advantages**: Unlocks organic search visibility for seasonal festivals, music gatherings, and multi-day road trips.
- **Trade-offs**: Requires expanding the route table in `App.tsx` and sitemap generator.

### Option D: Server-Side Rendering (SSR) / Edge Hybrid (Unapproved Option)
- **Concept**: Deploy a Node/Express or edge server layer that dynamically renders route-specific HTML and returns true HTTP 404 status codes for non-existent routes.
- **Advantages**: Emits native HTTP 404 headers and server-rendered HTML for all requests.
- **Trade-offs**: Increases deployment hosting complexity compared with static hosting.

---

## 7. Unresolved Questions & Documentation Notices

1. **Audit Document Authority**:
   - `TECHNICAL_AUDIT.md` is the sole authoritative living technical audit document for Discover Clare.
   - Any duplicate or secondary audit markdown files have been removed to maintain absolute single-source-of-truth integrity.
2. **Hosting & Deployment Architecture Decision (Unresolved Question)**:
   - Does Discover Clare intend to remain on static SPA hosting (where build-time SSG/prerendering is the natural optimization), or will a Node / Cloud Run backend service be used for runtime rendering?
3. **Locality & Event Routing Expansion (Unresolved Question)**:
   - Should town-level landing pages and standalone event pages be scheduled for a future Information Architecture phase?

---

## 8. Approved Roadmap Status & POC Verification Record

- **Phase 1: Core Navigation & Editorial Integrity** — **COMPLETED & VERIFIED**
- **Phase 2.1: Dynamic SEO Head Management Foundation** — **COMPLETED & VERIFIED**
- **Phase 2.2: Image Loading & Core Web Vitals Optimization** — **COMPLETED & VERIFIED**
- **Phase 2.3: SEO Foundation, Crawlability & Indexation Audit** — **COMPLETED**
- **Phase 2.4: Hybrid SSG + React Architecture Assessment** — **ASSESSMENT COMPLETED**
  - **Approved Architectural Direction**: **Hybrid SSG + React** (Public/indexable content pages will be statically pre-rendered as real HTML for maximum SEO robustness and crawlability, while interactive functionality remains client-side React).
- **Phase 2.5: Hybrid SSG Implementation Design & Proof-of-Concept Plan** — **DESIGN COMPLETED**
- **Phase 2.5B: Hybrid SSG Proof-of-Concept Implementation & Verification** — **COMPLETED & VERIFIED**
  - **Proof-of-Concept Scope**: Two-route static pre-rendering pilot (`/` and `/places/cliffs-of-moher`) utilizing `tsx` + `StaticRouter` + `react-dom/server` with isomorphic SEO metadata extraction (`src/utils/documentMetaCore.ts`), `hydrateRoot()` client-side hydration, and zero new runtime dependencies.

### 8.1 Proof-of-Concept Verification Breakdown

#### PROVEN BY POC:
- **Static HTML Generation**: Generated deterministic static HTML snapshots for `/` (`dist/index.html` — 186 KB) and `/places/cliffs-of-moher` (`dist/places/cliffs-of-moher/index.html` — 51 KB) with complete semantic HTML prose inside `#root`.
- **Build-Time Metadata & Tags**: Pre-rendered exact route-specific `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, and Twitter Cards into initial raw HTML without requiring JavaScript execution.
- **Embedded Schema.org JSON-LD**: Injected valid `TouristAttraction`, `BreadcrumbList`, and `WebSite` structured data schemas directly into raw HTML `<head>`.
- **Isomorphic Architecture**: Shared resolution logic via `documentMetaCore.ts` ensures complete parity between build-time server rendering and client-side `useDocumentMeta` runtime updates.
- **Hydration Safety**: Adapted `src/utils/useSavedPlaces.ts` to defer `localStorage` reading until after mount, avoiding hydration mismatch warnings.
- **Draft Safety**: Verified that only published catalog items are generated; 142 unverified draft items remain strictly excluded.
- **Build Repeatability**: Verified clean repeatable builds via `"tsx scripts/generate-seo-files.ts && vite build && tsx scripts/prerender.ts"`. Pre-render execution time measured at ~224ms for 2 routes (total build ~8.5s).

#### NOT YET PROVEN / SCOPE LIMITATIONS:
- **Full Catalog SSG**: Scaling from 2 test routes to all 56+ public sitemap routes (regions, category views, static informational pages, and remaining 35 published place guides) is designed but not yet generated (scheduled for Phase 2.6).
- **Production Hosting Behaviour**: Behaviour in production hosting/CDN edge tiers (e.g. Firebase Hosting, Cloud Run edge cache headers).
- **True HTTP 404 Status Codes (`SEO-02`)**: Remains **UNRESOLVED**. Static hosting delivers 200 OK with client-side noindex/404 view rather than native HTTP 404 response headers.
- **Crawler Directives vs Query Strings (`SEO-03`)**: Remains **UNRESOLVED**. Internal breadcrumb links containing query strings (e.g., `/explore?locality=...`) remain disallowed by `robots.txt`.
- **Browser Automation in Container**: Direct browser automation (Playwright/Puppeteer) is unavailable in the sandboxed container environment; client hydration relies on node SSR validation and standard React 19 hydration architecture.
- **Large-Scale Build Performance**: Performance when pre-rendering hundreds of dynamic routes.
- **External Database Integration**: Firestore/Cloud SQL as future dynamic build-time data sources.

- **Next Step**: **Phase 2.6 — Full Hybrid SSG Rollout (All 56+ Public Routes)**.



