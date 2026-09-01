import { LocalityInfo, LocalityId, RegionId } from '../types';

export const CLARE_LOCALITIES: LocalityInfo[] = [
  // Ennis Region
  {
    id: 'ennis',
    name: 'Ennis',
    regionId: 'ennis',
    tagline: 'Medieval laneways, Franciscan friary & traditional music capital',
    description: 'The historic capital of County Clare, known for its picturesque cobblestone bow-ways, rich traditional music hearths, and the 13th-century Franciscan friary.',
    keyHighlights: ['Ennis Friary', 'Clare Museum', 'Abbey Street & Bow-ways', 'Trad Pub Trail']
  },
  {
    id: 'quin',
    name: 'Quin',
    regionId: 'ennis',
    tagline: 'Historic village featuring one of Ireland’s most intact medieval abbeys',
    description: 'A charming, peaceful village nestled along the River Rine, dominated by the magnificent 15th-century Quin Franciscan Abbey.',
    keyHighlights: ['Quin Franciscan Abbey', 'River Rine Walk', 'Village Green']
  },
  {
    id: 'crusheen',
    name: 'Crusheen',
    regionId: 'ennis',
    tagline: 'Quiet lakeland gateway between Ennis and Gort',
    description: 'A pastoral community surrounded by serene freshwater angling lakes and woodland walkways.',
    keyHighlights: ['Inchicronan Lough', 'Lakeside Trails', 'Angling Waters']
  },

  // North Clare & The Burren
  {
    id: 'doolin',
    name: 'Doolin',
    regionId: 'north-clare-burren',
    tagline: 'Traditional music haven, Aran ferry port & coastal gateway',
    description: 'A coastal village world-renowned for spontaneous pub sessions, the Doolin Cave giant stalactite, and direct passenger ferries to the Aran Islands.',
    keyHighlights: ['Doolin Trad Pubs', 'Doolin Cave', 'Cliffs of Moher Cruises', 'Doolin Pier']
  },
  {
    id: 'ballyvaughan',
    name: 'Ballyvaughan',
    regionId: 'north-clare-burren',
    tagline: 'Picturesque coastal harbour on Galway Bay nestled against Burren hills',
    description: 'A seaside haven with thatched cottages, artisan seafood restaurants, and gateway to Aillwee Cave.',
    keyHighlights: ['Aillwee Cave & Birds of Prey', 'Ballyvaughan Harbour', 'Burren Craft Food']
  },
  {
    id: 'fanore',
    name: 'Fanore',
    regionId: 'north-clare-burren',
    tagline: 'Golden sand dunes and the lunar limestone coastline of Black Head',
    description: 'An open Atlantic settlement with an extensive dune system, Blue Flag surf beach, and the ancient Black Head Green Road.',
    keyHighlights: ['Fanore Beach', 'Black Head Green Road', 'Burren Shore Angling']
  },
  {
    id: 'corofin',
    name: 'Corofin',
    regionId: 'north-clare-burren',
    tagline: 'Gateway to Burren National Park, Mullaghmór & Lake Inchiquin',
    description: 'A historic angling village and home to the Burren National Park Information Point, framed by limestone terraces and deep lakes.',
    keyHighlights: ['Burren National Park', 'Lake Inchiquin', 'Clare Heritage Centre']
  },
  {
    id: 'liscannor',
    name: 'Liscannor',
    regionId: 'north-clare-burren',
    tagline: 'Historic fishing village at the southern foot of the Cliffs of Moher',
    description: 'Famous for its distinctive Liscannor flagstone, traditional seafood pubs, and direct proximity to the Cliffs of Moher coastal walk.',
    keyHighlights: ['Cliffs of Moher Access', 'Liscannor Harbour', 'Seafood Dining']
  },

  // West Clare & Atlantic Coast
  {
    id: 'lahinch',
    name: 'Lahinch',
    regionId: 'west-clare-atlantic-coast',
    tagline: 'Ireland’s surf capital, crescent strand & championship links golf',
    description: 'A bustling Atlantic coastal hub drawing surfers, links golfers, and food lovers to its lively promenade and sandy bay.',
    keyHighlights: ['Lahinch Beach & Surf Breaks', 'Hugo’s Bakery', 'Lahinch Golf Club', 'Promenade']
  },
  {
    id: 'kilkee',
    name: 'Kilkee',
    regionId: 'west-clare-atlantic-coast',
    tagline: 'Victorian seaside resort with dramatic cliff amphitheatre & Pollock Holes',
    description: 'A horseshoe bay sheltered by the Duggerna Reef, featuring dramatic cliff walks, natural tidal swimming pools, and sea kayaking.',
    keyHighlights: ['Kilkee Cliff Walk', 'Pollock Holes Tidal Pools', 'Pollnashanthana (The Churn)', 'Kilkee Horseshoe Strand']
  },
  {
    id: 'miltown-malbay',
    name: 'Miltown Malbay',
    regionId: 'west-clare-atlantic-coast',
    tagline: 'Home of the Willie Clancy Summer School & traditional music heartland',
    description: 'A legendary town for traditional fiddling and uilleann piping, celebrated for its historic pubs and close connection to the Atlantic coast.',
    keyHighlights: ['Willie Clancy Heritage', 'Traditional Music Pubs', 'Spanish Point Proximity']
  },
  {
    id: 'spanish-point',
    name: 'Spanish Point',
    regionId: 'west-clare-atlantic-coast',
    tagline: 'Expansive golden surf strand and Spanish Armada maritime heritage',
    description: 'Named after the Spanish Armada ships wrecked here in 1588, offering panoramic Atlantic horizons and wide sandy beaches.',
    keyHighlights: ['Spanish Point Strand', 'Armada Monument', 'Coastal Hotels']
  },
  {
    id: 'loop-head',
    name: 'Loop Head',
    regionId: 'west-clare-atlantic-coast',
    tagline: 'Dramatic ocean peninsula with historic lighthouse and Bridges of Ross',
    description: 'A remote, elemental finger of land jutting into the Atlantic where the ocean meets the Shannon, home to seabirds and sea arches.',
    keyHighlights: ['Loop Head Lighthouse', 'Bridges of Ross Sea Arch', 'Kilbaha Harbour', 'Dolphin Watching']
  },

  // East Clare & Lough Derg
  {
    id: 'killaloe',
    name: 'Killaloe',
    regionId: 'east-clare-lough-derg',
    tagline: 'Ancient seat of High King Brian Boru & Lough Derg boating capital',
    description: 'A historic twin town linked by a 13-arch bridge, offering lakeside cruising, cathedral heritage, Sunday markets, and artisan dining.',
    keyHighlights: ['St. Flannan’s Cathedral', 'Killaloe Farmers Market', 'Wood Brothers Café', 'Lakeside Cruising']
  },
  {
    id: 'mountshannon',
    name: 'Mountshannon',
    regionId: 'east-clare-lough-derg',
    tagline: 'Lakeside harbour village and departure point for Inis Cealtra (Holy Island)',
    description: 'An idyllic, tree-shaded harbour village on the western shore of Lough Derg with nesting white-tailed sea eagles and monastic history.',
    keyHighlights: ['Inis Cealtra Ferry', 'Mountshannon Harbour', 'Aistear Park & Labyrinth']
  },
  {
    id: 'feakle',
    name: 'Feakle',
    regionId: 'east-clare-lough-derg',
    tagline: 'Renowned sanctuary of pure East Clare traditional fiddling',
    description: 'A quiet inland village world-famous in traditional music circles for its annual August festival and distinctive sweet fiddling style.',
    keyHighlights: ['Feakle Trad Festival', 'Historic Session Pubs', 'East Clare Way']
  },
  {
    id: 'scariff',
    name: 'Scariff',
    regionId: 'east-clare-lough-derg',
    tagline: 'Market hub on the Scariff River connecting to Lough Derg waterways',
    description: 'A lively market community nestled at the base of the Slieve Aughty Mountains, serving as a hub for river cruisers and walking routes.',
    keyHighlights: ['Scariff Harbour & River', 'East Clare Craft Co-op', 'Raheen Wood Proximity']
  },

  // South Clare & Shannon Estuary
  {
    id: 'bunratty',
    name: 'Bunratty',
    regionId: 'south-clare-shannon-estuary',
    tagline: 'Iconic 15th-century castle, 19th-century folk park & Durty Nelly’s',
    description: 'One of Ireland’s premier heritage destinations, featuring the restored medieval fortress of Bunratty and an immersive living folk park.',
    keyHighlights: ['Bunratty Castle & Folk Park', 'Durty Nelly’s 1620 Pub', 'Bunratty Mills']
  },
  {
    id: 'kilrush',
    name: 'Kilrush',
    regionId: 'south-clare-shannon-estuary',
    tagline: 'Historic Georgian heritage town, deep-water marina & Scattery Island gateway',
    description: 'A planned market town on the Shannon Estuary with wide Georgian streets, a modern yacht marina, and the departure pier for Scattery Island.',
    keyHighlights: ['Scattery Island Monastic Ferry', 'Kilrush Marina', 'Vandeleur Walled Garden']
  },
  {
    id: 'shannon-town',
    name: 'Shannon',
    regionId: 'south-clare-shannon-estuary',
    tagline: 'Gateway international airport, aviation heritage & estuary wetland trails',
    description: 'Home to Shannon International Airport and bordering protected mudflats and wetland bird sanctuaries along the Shannon estuary.',
    keyHighlights: ['Shannon Aviation Museum', 'Shannon Estuary Trails', 'Dromoland Estate Proximity']
  },
  {
    id: 'newmarket-on-fergus',
    name: 'Newmarket-on-Fergus',
    regionId: 'south-clare-shannon-estuary',
    tagline: 'Historic estate village home to Dromoland Castle & woodland grounds',
    description: 'A picturesque heritage village framed by the historic 5-star Dromoland Castle estate and the ancient O’Brien clan territories.',
    keyHighlights: ['Dromoland Castle Estate', 'Lough Gash Turlough', 'Mooghaun Hillfort']
  }
];

export function getLocalityById(id: LocalityId | string): LocalityInfo | undefined {
  return CLARE_LOCALITIES.find(loc => loc.id === id);
}

export function getLocalitiesByRegion(regionId: RegionId): LocalityInfo[] {
  return CLARE_LOCALITIES.filter(loc => loc.regionId === regionId);
}
