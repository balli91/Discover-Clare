import { RegionInfo, ClarePlace, EventItem, ItineraryPlan, CommunityPhoto, RegionId } from '../types';
import { ENNIS_PLACES } from './regions/ennis';
import { NORTH_CLARE_PLACES } from './regions/northClare';
import { WEST_CLARE_PLACES } from './regions/westClare';
import { EAST_CLARE_PLACES } from './regions/eastClare';
import { SOUTH_CLARE_PLACES } from './regions/southClare';

export const CLARE_REGIONS: RegionInfo[] = [
  {
    id: 'ennis',
    name: 'Ennis',
    tagline: 'Medieval laneways, 13th-century friary & vibrant traditional music capital',
    description: 'The cultural beating heart of Clare, Ennis is celebrated for its historic pedestrian bow-ways, the magnificent 13th-century Franciscan friary, lively session pubs, independent boutiques, and rich community life.',
    keyTowns: ['Ennis', 'Clarecastle', 'Quin'],
    highlights: ['Ennis Friary', 'Historic Medieval Bow-ways', 'Quin Franciscan Abbey', 'Clare Museum', 'Traditional Music Pub Trail'],
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
    imageCredit: 'Photo by Henrique Ferreira / Unsplash',
    character: 'Cobblestone pedestrian alleys, atmospheric session hearths, medieval stone friary, and civic charm.'
  },
  {
    id: 'north-clare-burren',
    name: 'North Clare & The Burren',
    tagline: 'Ancient limestone karst, towering Atlantic cliffs & rich trad music heritage',
    description: 'A moon-like limestone landscape home to rare arctic-alpine flora, prehistoric monuments, dramatic Atlantic sea cliffs, and the vibrant music hub of Doolin.',
    keyTowns: ['Doolin', 'Lisdoonvarna', 'Ballyvaughan', 'Fanore', 'Kilfenora', 'Corofin'],
    highlights: ['Cliffs of Moher', 'Burren National Park', 'Doolin Traditional Music', 'Aillwee Caves', 'Fanore Beach'],
    heroImage: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1600&q=80',
    imageCredit: 'Photo by K. Mitch Hodge / Unsplash',
    character: 'Wild limestone pavement, vibrant pub sessions, and the gateway to the Aran Islands.'
  },
  {
    id: 'west-clare-atlantic-coast',
    name: 'West Clare & Atlantic Coast',
    tagline: 'World-class surf breaks, sheer ocean cliffs & authentic coastal villages',
    description: 'Stretching from the rolling surf of Lahinch through the musical sanctuary of Miltown Malbay down to the dramatic cliff amphitheatre of Kilkee and Loop Head peninsula.',
    keyTowns: ['Lahinch', 'Kilkee', 'Miltown Malbay', 'Spanish Point', 'Doonbeg', 'Kilbaha'],
    highlights: ['Lahinch Surf Beach', 'Kilkee Cliff Walk', 'Loop Head Lighthouse', 'Bridges of Ross', 'Spanish Point Strand'],
    heroImage: 'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=1600&q=80',
    imageCredit: 'Photo by Wynand van Poortvliet / Unsplash',
    character: 'Bracing Atlantic air, golden sand beaches, championship links golf, and coastal hospitality.'
  },
  {
    id: 'east-clare-lough-derg',
    name: 'East Clare & Lough Derg',
    tagline: 'Lakeside twin towns, wooded hills, cruising waters & ancient monasteries',
    description: 'A lush playground bordered by the sparkling waters of Lough Derg and the River Shannon, featuring twin heritage towns, peaceful cruising waterways, and scenic hiking trails.',
    keyTowns: ['Killaloe', 'Mountshannon', 'Scariff', 'Tuamgraney', 'Feakle', 'Tulla'],
    highlights: ['Lough Derg Cruising', 'Inis Cealtra (Holy Island)', 'Killaloe Heritage Town', 'East Clare Way', 'Raheen Oakwoods'],
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    imageCredit: 'Photo by Bailey Zindel / Unsplash',
    character: 'Calm lakelands, water adventures, oak forests, and rich traditional fiddling traditions.'
  },
  {
    id: 'south-clare-shannon-estuary',
    name: 'South Clare & Shannon Estuary',
    tagline: 'Monastic river islands, castle heritage, maritime ports & estuary waters',
    description: 'Flanking the mighty Shannon Estuary, where calm waters meet historical market towns, world-famous Bunratty Castle, sixth-century round towers on Scattery Island, and tranquil waterfront trails.',
    keyTowns: ['Bunratty', 'Kilrush', 'Shannon', 'Newmarket-on-Fergus', 'Labasheeda', 'Carrigaholt', 'Killimer'],
    highlights: ['Bunratty Castle & Folk Park', 'Scattery Island Monastic Site', 'Kilrush Marina', 'Shannon Estuary Dolphin Watching', 'Vandeleur Walled Gardens'],
    heroImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1600&q=80',
    imageCredit: 'Photo by Robert Bye / Unsplash',
    character: 'Historic maritime architecture, castle heritage, serene estuary viewpoints, and unhurried coastal pace.'
  }
];

export const CLARE_PLACES: ClarePlace[] = [
  ...ENNIS_PLACES,
  ...NORTH_CLARE_PLACES,
  ...WEST_CLARE_PLACES,
  ...EAST_CLARE_PLACES,
  ...SOUTH_CLARE_PLACES
];

export const CLARE_EVENTS: EventItem[] = [
  {
    id: 'willie-clancy-summer-school',
    title: 'Scoil Samhraidh Willie Clancy',
    category: 'traditional-music',
    dateDisplay: 'July 4 – 12, 2026',
    month: 'JUL',
    day: '04',
    location: 'Miltown Malbay',
    region: 'west-clare-atlantic-coast',
    description: 'Ireland’s biggest and most prestigious traditional music, song, and dance summer school. Thousands of musicians from across the world descend for masterclasses, concerts, and 24-hour street sessions.',
    admission: 'Free street sessions & ticketed concerts (€15–€25)',
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Gabriel Baranski / Unsplash',
    isAnnualFestival: true,
    organizer: 'Willie Clancy Memorial Board',
    ticketUrl: 'https://www.scoilsamhraidhwillieclancy.com'
  },
  {
    id: 'doolin-folk-festival',
    title: 'Doolin Folk Festival',
    category: 'festival',
    dateDisplay: 'June 12 – 14, 2026',
    month: 'JUN',
    day: '12',
    location: 'Hotel Doolin Marquee',
    region: 'north-clare-burren',
    description: 'An intimate, eclectic weekend festival celebrating the best of modern and traditional folk, roots, and trad music in the heart of Doolin with craft beer and local food stalls.',
    admission: 'Weekend Pass from €110',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Colin Lloyd / Unsplash',
    isAnnualFestival: true,
    organizer: 'Hotel Doolin Arts',
    ticketUrl: 'https://www.doolinfolkfestival.com'
  },
  {
    id: 'burren-slow-food-festival',
    title: 'Burren Slow Food & Wild Food Festival',
    category: 'food-drink',
    dateDisplay: 'May 15 – 17, 2026',
    month: 'MAY',
    day: '15',
    location: 'Lisdoonvarna & Burren Geopark',
    region: 'north-clare-burren',
    description: 'Celebrating the incredible artisan food producers of the Burren with coastal foraging tours, chef masterclasses, farmer markets, and banquets featuring fresh oysters and smoked salmon.',
    admission: 'Free market access; ticketed masterclasses',
    heroImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Jay Wennington / Unsplash',
    isAnnualFestival: true,
    organizer: 'Slow Food Clare'
  },
  {
    id: 'lisdoonvarna-matchmaking-festival',
    title: 'Lisdoonvarna Matchmaking Festival',
    category: 'festival',
    dateDisplay: 'September 4 – October 4, 2026',
    month: 'SEP',
    day: '04',
    location: 'Lisdoonvarna Town',
    region: 'north-clare-burren',
    description: 'A month-long legendary festival running for over 160 years where traditional matchmaker Willie Daly pairs hopeful romantics alongside non-stop country music, dancing, and craic.',
    admission: 'Free entry to town pubs; dance tickets €10–€20',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Samantha Gades / Unsplash',
    isAnnualFestival: true,
    organizer: 'Lisdoonvarna Festival'
  },
  {
    id: 'ennis-tradfest',
    title: 'Ennis TradFest Winter Music Festival',
    category: 'traditional-music',
    dateDisplay: 'November 12 – 16, 2026',
    month: 'NOV',
    day: '12',
    location: 'Ennis Town Centre',
    region: 'ennis',
    description: 'A celebrated winter gathering of top-tier traditional musicians, pipers, and singers taking over cosy pubs, abbey venues, and hotels throughout the medieval town of Ennis.',
    admission: 'Free session trails & ticketed headliners',
    heroImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Kevin Schmid / Unsplash',
    isAnnualFestival: true,
    organizer: 'Ennis TradFest Committee'
  }
];

export const CLARE_ITINERARIES: ItineraryPlan[] = [
  {
    id: 'essential-clare-2-day',
    title: 'The Essential Clare: 2-Day Classic',
    tagline: 'The definitive journey through Clare’s world-famous cliffs, lunar limestone & fireside tunes',
    durationDays: 2,
    pace: 'moderate',
    idealFor: 'First-time visitors & weekend explorers',
    bestSeason: 'Spring to Autumn',
    summary: 'Experience the crown jewels of County Clare in 48 unforgettable hours: sunrise at the Cliffs of Moher, exploring the Burren National Park, an authentic pub session in Doolin, and the wild cliffs of Loop Head.',
    heroImage: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by K. Mitch Hodge / Unsplash',
    highlights: ['Cliffs of Moher at golden hour', 'Doolin live music session', 'Burren limestone exploration', 'Loop Head Lighthouse panoramic drive'],
    days: [
      {
        dayNumber: 1,
        title: 'Cliffs of Moher, Doolin & The Burren Karst',
        summary: 'Start with Ireland’s grandest coastal vista, savour fresh ocean seafood, and end the night with traditional fiddlers in Doolin.',
        stops: [
          {
            stopNumber: 1,
            timeSlot: '08:30 – 11:00',
            title: 'Cliffs of Moher & Coastal Path',
            location: 'Liscannor',
            description: 'Beat the tour coaches by arriving early. Take in the Atlantic breeze from O’Brien’s Tower and hike south along the designated coastal cliff path.',
            duration: '2.5 hours',
            insiderTip: 'Book the first morning slot online for discounted tickets and quiet pathways.',
            relatedPlaceId: 'cliffs-of-moher'
          },
          {
            stopNumber: 2,
            timeSlot: '11:30 – 14:00',
            title: 'Doolin Cave & Underground Stalactite',
            location: 'Doolin',
            description: 'Descend into the underground world beneath the limestone to marvel at Europe’s largest hanging stalactite.',
            duration: '1.5 hours',
            insiderTip: 'Grab a warm coffee and homemade flapjack in the eco-café afterwards.',
            relatedPlaceId: 'doolin-cave-stalactite'
          },
          {
            stopNumber: 3,
            timeSlot: '14:30 – 17:00',
            title: 'Burren National Park Walk at Mullaghmór',
            location: 'Corofin / Tubber',
            description: 'Drive the scenic inland road to walk the remarkable limestone terraces and discover wild orchids blooming between the grikes.',
            duration: '2.5 hours',
            insiderTip: 'Wear sturdy shoes with good grip on the limestone flags.',
            relatedPlaceId: 'burren-national-park'
          },
          {
            stopNumber: 4,
            timeSlot: '18:30 – Late',
            title: 'Seafood Dinner & Live Trad Session in Doolin',
            location: 'Fisherstreet, Doolin',
            description: 'Enjoy steaming bowls of Atlantic chowder at Gus O’Connor’s or McGann’s followed by world-class live fiddle and concertina music.',
            duration: 'Evening',
            insiderTip: 'Arrive before 8:00 PM to secure seats near the musician circle.',
            relatedPlaceId: 'traditional-music-session-crawl'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Lahinch Surf, Spanish Point & The Edge at Loop Head',
        summary: 'Follow the Wild Atlantic Way south through surf villages, historic ruins, and out to the dramatic Loop Head peninsula.',
        stops: [
          {
            stopNumber: 1,
            timeSlot: '09:00 – 11:30',
            title: 'Lahinch Promenade & Beach Walk',
            location: 'Lahinch',
            description: 'Watch the morning surfers from the promenade and grab freshly baked cinnamon cruffins and specialty espresso at Hugo’s Bakery.',
            duration: '2 hours',
            insiderTip: 'Walk the full length of the strand at low tide for invigorating Atlantic air.',
            relatedPlaceId: 'hugos-bakery-lahinch'
          },
          {
            stopNumber: 2,
            timeSlot: '12:30 – 14:30',
            title: 'Kilkee Cliff Walk & Pollock Holes',
            location: 'Kilkee',
            description: 'Marvel at the dramatic sea amphitheatre of the Kilkee cliffs, often quieter and just as spectacular as Moher.',
            duration: '2 hours',
            insiderTip: 'Look for Pollnashanthana (The Churn) where waves erupt through the blowhole.',
            relatedPlaceId: 'pollnashanthana-churn-kilkee'
          },
          {
            stopNumber: 3,
            timeSlot: '15:00 – 17:30',
            title: 'Loop Head Lighthouse & Bridges of Ross',
            location: 'Kilbaha, Loop Head',
            description: 'Travel to the extreme southwestern tip of Clare to stand under the iconic lighthouse and discover the natural sea arch at Bridges of Ross.',
            duration: '2.5 hours',
            insiderTip: 'Stop in Kilbaha Gallery for local art, artisan crafts, and friendly local stories.',
            relatedPlaceId: 'loop-head-lighthouse'
          }
        ]
      }
    ]
  },
  {
    id: 'rainy-day-clare',
    title: 'Rainy Day Clare: Cosy Sanctuaries & Underground Wonders',
    tagline: 'How to make the most of an authentic Irish mist day in County Clare',
    durationDays: 1,
    pace: 'relaxed',
    idealFor: 'Wet weather, couples, foodies & families',
    bestSeason: 'Year-Round',
    summary: 'When the Atlantic clouds roll in, Clare comes alive indoors. Explore vast dry show caves, living medieval folk cottages, artisan smokehouses, and crackling fireside pub hearths.',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Chris Lawton / Unsplash',
    highlights: ['Aillwee subterranean caverns', 'Burren Smokehouse masterclass', 'Bunratty Castle interior banquet hall', 'Fireside pint at The Roadside Tavern'],
    days: [
      {
        dayNumber: 1,
        title: 'Subterranean Wonders & Fireside Feasts',
        summary: 'Warm, sheltered, and deeply atmospheric places where rain adds to the charm.',
        stops: [
          {
            stopNumber: 1,
            timeSlot: '10:00 – 12:00',
            title: 'Aillwee Cave & Burren Gold Cheese Dairy',
            location: 'Ballyvaughan',
            description: 'Step into the constant 10°C shelter of Aillwee cavern to see frozen underground waterfalls, followed by cheese tasting at the farm shop.',
            duration: '2 hours',
            insiderTip: 'The cave is completely dry inside regardless of downpours outside.',
            relatedPlaceId: 'aillwee-burren-experience'
          },
          {
            stopNumber: 2,
            timeSlot: '12:30 – 14:30',
            title: 'Burren Smokehouse & Roadside Tavern Lunch',
            location: 'Lisdoonvarna',
            description: 'Discover how organic Atlantic salmon is cold-smoked over oak shavings, then pull up a wooden stool beside the open peat fire in the 1865 pub.',
            duration: '2 hours',
            insiderTip: 'Order the warm smoked salmon platter with a pint of locally brewed Burren Black stout.',
            relatedPlaceId: 'roadside-tavern-microbrewery'
          },
          {
            stopNumber: 3,
            timeSlot: '15:30 – 18:00',
            title: 'Bunratty Castle Medieval Fortress Interior',
            location: 'Bunratty',
            description: 'Wander the Great Hall, Earl’s chambers, and ancient vaulted rooms filled with 15th-century tapestries and historic weapons.',
            duration: '2.5 hours',
            insiderTip: 'Check the working blacksmiths in the folk park cottages who keep turf fires burning all day.',
            relatedPlaceId: 'bunratty-castle-folk-park'
          }
        ]
      }
    ]
  },
  {
    id: 'secret-clare-hidden-gems',
    title: 'Secret Clare: 2-Day Hidden Gems & Quiet Trails',
    tagline: 'Escape the tourist trail to discover secret sea arches, holy islands & monastic ruins',
    durationDays: 2,
    pace: 'relaxed',
    idealFor: 'Photographers, hikers, heritage lovers & repeat visitors',
    bestSeason: 'Spring, Summer & Autumn',
    summary: 'A curated route crafted for those who want to discover the Clare known to locals — from ancient monastic island ruins on Lough Derg to secret blowholes, artisan goat farms, and quiet limestone coastal green roads.',
    heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    imageCredit: 'Photo by Peter Conlan / Unsplash',
    highlights: ['Bridges of Ross sea arch', 'Quin Franciscan Abbey cloister', 'Inis Cealtra Holy Island', 'Black Head coastal green road'],
    days: [
      {
        dayNumber: 1,
        title: 'East & Central Clare Hidden Heritage',
        summary: 'Explore medieval cloisters in Quin, sail to 7th-century Holy Island on Lough Derg, and sample artisan goat cheese.',
        stops: [
          {
            stopNumber: 1,
            timeSlot: '09:30 – 11:00',
            title: 'Quin Franciscan Abbey',
            location: 'Quin',
            description: 'Wander the peaceful, intact gothic cloisters and climb the belfry tower in near complete silence.',
            duration: '1.5 hours',
            insiderTip: 'Admission is free; take your time photographing the light pouring through the stone tracery.',
            relatedPlaceId: 'quin-abbey'
          },
          {
            stopNumber: 2,
            timeSlot: '11:45 – 14:30',
            title: 'Inis Cealtra (Holy Island) Boat Crossing',
            location: 'Mountshannon',
            description: 'Take a small local wooden boat across Lough Derg to wander among ancient round towers and Celtic carved crosses.',
            duration: '2.5 hours',
            insiderTip: 'Pack a picnic to enjoy under the trees on the island.',
            relatedPlaceId: 'inis-cealtra-holy-island'
          },
          {
            stopNumber: 3,
            timeSlot: '15:30 – 17:00',
            title: 'St. Tola Organic Goat Cheese Farm',
            location: 'Inagh',
            description: 'Meet the friendly goats and taste fresh artisan goat cheeses right on the farm.',
            duration: '1.5 hours',
            insiderTip: 'Pre-book your farm tour slot online.',
            relatedPlaceId: 'st-tola-goat-farm-tours'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Secret Coastlines of Loop Head & Black Head',
        summary: 'Discover the dramatic sea arch at Bridges of Ross, the roar of the Kilkee Churn, and the smooth stone terraces of Black Head.',
        stops: [
          {
            stopNumber: 1,
            timeSlot: '10:00 – 12:00',
            title: 'Bridges of Ross Sea Arch',
            location: 'Kilbaha',
            description: 'Walk the hidden headland trail to stand beside the immense natural stone bridge carved by the Atlantic.',
            duration: '2 hours',
            insiderTip: 'Look out for gannets diving like arrows into the ocean just offshore.',
            relatedPlaceId: 'bridges-of-ross'
          },
          {
            stopNumber: 2,
            timeSlot: '12:30 – 14:00',
            title: 'Kilkee Cliff Walk & Intrinsic Bay',
            location: 'Kilkee Cliffs',
            description: 'Witness the sea spray and echoing roar of Kilkee’s secret sea amphitheatres and natural blowholes.',
            duration: '1.5 hours',
            insiderTip: 'Stop at the Diamond Rocks Café for freshly made seafood chowder.',
            relatedPlaceId: 'pollnashanthana-churn-kilkee'
          },
          {
            stopNumber: 3,
            timeSlot: '16:00 – 18:30',
            title: 'Fanore & Black Head Coastal Route Sunset',
            location: 'Fanore',
            description: 'Walk where limestone pavement steps directly into Atlantic surf as the sun sinks towards the Aran Islands.',
            duration: '2.5 hours',
            insiderTip: 'The sunset light turns the grey Burren limestone a radiant soft rose gold.',
            relatedPlaceId: 'fanore-blackhead-green-road'
          }
        ]
      }
    ]
  }
];

export const CLARE_COMMUNITY_PHOTOS: CommunityPhoto[] = [
  {
    id: 'photo-1',
    title: 'Sunset over O’Brien’s Tower',
    location: 'Cliffs of Moher',
    region: 'north-clare-burren',
    authorName: 'Ciarán O’Donnell',
    authorHandle: '@ciaran_clare_lens',
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1000&q=80',
    caption: 'Waited 2 hours after the tourist buses cleared. The golden light over the Atlantic was pure magic.',
    dateTaken: 'August 2025'
  },
  {
    id: 'photo-2',
    title: 'Spring Gentian blooming in the limestone',
    location: 'Burren National Park',
    region: 'north-clare-burren',
    authorName: 'Aoife Kelly',
    authorHandle: '@aoifek_wildnature',
    imageUrl: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80',
    caption: 'The electric blue of the Burren gentian pushing through millions-of-years-old rock.',
    dateTaken: 'May 2025'
  },
  {
    id: 'photo-3',
    title: 'Storm surge at Bridges of Ross',
    location: 'Loop Head',
    region: 'west-clare-atlantic-coast',
    authorName: 'Liam MacCarthy',
    authorHandle: '@liammaccarthy_photo',
    imageUrl: 'https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?auto=format&fit=crop&w=1000&q=80',
    caption: 'Nowhere on earth feels as raw and elemental as the tip of Loop Head after an autumn front.',
    dateTaken: 'October 2025'
  },
  {
    id: 'photo-4',
    title: 'Late session in Fisherstreet',
    location: 'Doolin',
    region: 'north-clare-burren',
    authorName: 'Sarah Jenkins',
    authorHandle: '@sarahj_travels',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80',
    caption: 'Fiddles, uilleann pipes, and the smell of peat smoke. Doolin hospitality at its purest.',
    dateTaken: 'July 2025'
  },
  {
    id: 'photo-5',
    title: 'Early morning glassy surf',
    location: 'Lahinch Beach',
    region: 'west-clare-atlantic-coast',
    authorName: 'Conor Walsh',
    authorHandle: '@conor_surf_clare',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
    caption: 'First light at Lahinch before the breeze picked up. Best way to start any day in Clare.',
    dateTaken: 'September 2025'
  },
  {
    id: 'photo-6',
    title: 'Reflections on Lough Derg',
    location: 'Mountshannon',
    region: 'east-clare-lough-derg',
    authorName: 'Emma Ryan',
    authorHandle: '@emmaryan_outdoors',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    caption: 'Quiet morning paddle around Inis Cealtra. Not another soul in sight.',
    dateTaken: 'June 2025'
  }
];

// Locality Exports
export { CLARE_LOCALITIES, getLocalityById, getLocalitiesByRegion } from './localities';

// Helper Functions for Data Lookup
export function getPublishedPlaces(): ClarePlace[] {
  return CLARE_PLACES.filter(p => p.editorialStatus !== 'draft' && p.editorialStatus !== 'hidden');
}

export const CLARE_PUBLISHED_PLACES: ClarePlace[] = getPublishedPlaces();

export function getPlaceBySlug(slug: string): ClarePlace | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  const published = getPublishedPlaces();
  return published.find(p => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized);
}

export function normalizeRegionId(regionId: string): RegionId {
  const norm = regionId.toLowerCase().trim();
  if (norm === 'ennis' || norm === 'central-clare' || norm === 'central') return 'ennis';
  if (norm === 'north-clare-burren' || norm === 'north-clare' || norm === 'north') return 'north-clare-burren';
  if (norm === 'west-clare-atlantic-coast' || norm === 'west-clare' || norm === 'west') return 'west-clare-atlantic-coast';
  if (norm === 'east-clare-lough-derg' || norm === 'east-clare' || norm === 'east') return 'east-clare-lough-derg';
  if (norm === 'south-clare-shannon-estuary' || norm === 'south-clare' || norm === 'south') return 'south-clare-shannon-estuary';
  return (norm as RegionId) || 'ennis';
}

export function getRegionInfo(regionId: string): RegionInfo | undefined {
  const canonical = normalizeRegionId(regionId);
  return CLARE_REGIONS.find(r => r.id === canonical);
}

export function getPlacesByRegion(regionId: string): ClarePlace[] {
  const canonical = normalizeRegionId(regionId);
  return getPublishedPlaces().filter(p => p.region === canonical || p.region === regionId);
}

/**
 * Deterministic Related Content Engine
 * Strictly rule-based without AI fabrication:
 * 1. Same Locality / Immediate Town
 * 2. Same Category within the Same Region
 * 3. Same Region highlights
 * 4. Same Category county-wide
 */
export function getRelatedPlaces(place: ClarePlace, limit = 3): ClarePlace[] {
  const placeRegion = normalizeRegionId(place.region);
  const published = getPublishedPlaces().filter(p => p.id !== place.id);
  const results: ClarePlace[] = [];
  const seenIds = new Set<string>();

  const add = (p: ClarePlace) => {
    if (!seenIds.has(p.id)) {
      seenIds.add(p.id);
      results.push(p);
    }
  };

  // Tier 1: Same Locality (if locality is defined)
  if (place.localityId) {
    const sameLocality = published.filter(p => p.localityId === place.localityId);
    sameLocality.forEach(add);
  }

  // Tier 2: Same Category & Same Region
  if (results.length < limit) {
    const sameCatRegion = published.filter(
      p => normalizeRegionId(p.region) === placeRegion && (p.category === place.category || p.contentType === place.contentType)
    );
    sameCatRegion.forEach(add);
  }

  // Tier 3: Same Region Highlights
  if (results.length < limit) {
    const sameRegion = published.filter(p => normalizeRegionId(p.region) === placeRegion);
    sameRegion.forEach(add);
  }

  // Tier 4: Same Category County-wide
  if (results.length < limit) {
    const sameCat = published.filter(p => p.category === place.category || p.contentType === place.contentType);
    sameCat.forEach(add);
  }

  return results.slice(0, limit);
}
