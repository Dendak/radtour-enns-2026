export type Waypoint = {
  day: 1 | 2 | 3;
  dist: number;
  lat: number;
  lon: number;
  name: string;
  time: string;
  tag: string;
};

export const TRIP = {
  title: 'Ennsradweg 2026',
  subtitle: 'Radstadt → Linec',
  dateLabel: 'Pá 1. – Ne 3. května 2026',
  totalKm: 263,
  days: 3,
  riders: 6,
};

export type TeamMember = { nick: string; full: string };

export const TEAM: TeamMember[] = [
  { nick: 'Dáša', full: 'Dagmar Nutterová' },
  { nick: 'Franz', full: 'Franz Ferdinand' },
  { nick: 'Denis', full: 'Denis Holub' },
  { nick: 'Kája', full: 'Karolína Masarová' },
  { nick: 'Kevin', full: 'Kevin Holub' },
  { nick: 'Vojta', full: 'Vojtěch Lapáček' },
];

export const DAY_COLORS: Record<1 | 2 | 3, string> = {
  1: '#b45309',
  2: '#15803d',
  3: '#0369a1',
};
export const DONAU_COLOR = '#1e40af';

export const DAY_NAMES: Record<1 | 2 | 3, string> = {
  1: 'Den 1 — Pá 1. května',
  2: 'Den 2 — So 2. května',
  3: 'Den 3 — Ne 3. května',
};

// Cumulative km at start of each day (derived from waypoints).
// Used to convert global `dist` into day-local km for UI display.
export const DAY_START_KM: Record<1 | 2 | 3, number> = {
  1: 0,
  2: 99,
  3: 176,
};

export const DAY_CAPTIONS: Record<1 | 2 | 3, string> = {
  1: 'Radstadt → Admont · sjezd z Vysokých Taur',
  2: 'Admont → Großraming · soutěska Gesäuse',
  3: 'Großraming → Linec · Donauradweg',
};

// Real photos from Wikimedia Commons (stable Special:FilePath redirects, CC/PD licensed)
export const DAY_PHOTOS: Record<1 | 2 | 3, { url: string; credit: string }> = {
  1: {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ennsradweg_bei_Radstadt.jpg?width=1600',
    credit: 'Wikimedia Commons · Ennsradweg bei Radstadt',
  },
  2: {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gesaeuseeingang.jpg?width=1600',
    credit: 'Wikimedia Commons · Gesäuseeingang',
  },
  3: {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Donauufer_Linz_Urfahr_1.jpg?width=1600',
    credit: 'Wikimedia Commons · Donauufer Linz',
  },
};

export const WAYPOINTS: Waypoint[] = [
  { day: 1, dist: 0,   lat: 47.3853, lon: 13.4536, name: 'Radstadt (nádraží)', time: '2026-05-01T10:45', tag: 'Start' },
  { day: 1, dist: 20,  lat: 47.3950, lon: 13.6858, name: 'Schladming',         time: '2026-05-01T11:45', tag: 'Přestávka' },
  { day: 1, dist: 42,  lat: 47.4403, lon: 13.9067, name: 'Gröbming',           time: '2026-05-01T13:45', tag: 'Oběd' },
  { day: 1, dist: 60,  lat: 47.4944, lon: 14.1042, name: 'Irdning',            time: '2026-05-01T15:45', tag: 'Přestávka' },
  { day: 1, dist: 77,  lat: 47.5664, lon: 14.2406, name: 'Liezen',             time: '2026-05-01T17:15', tag: 'Přestávka' },
  { day: 1, dist: 99,  lat: 47.5749, lon: 14.4601, name: 'Admont',             time: '2026-05-01T18:45', tag: 'Nocleh 1' },
  { day: 2, dist: 99,  lat: 47.5749, lon: 14.4601, name: 'Admont',             time: '2026-05-02T09:00', tag: 'Start' },
  { day: 2, dist: 118, lat: 47.5747, lon: 14.6200, name: 'Gesäuse',            time: '2026-05-02T11:00', tag: 'Zajímavost' },
  { day: 2, dist: 125, lat: 47.6067, lon: 14.7489, name: 'Hieflau',            time: '2026-05-02T12:30', tag: 'Přestávka' },
  { day: 2, dist: 134, lat: 47.6956, lon: 14.7283, name: 'Großreifling',       time: '2026-05-02T13:00', tag: 'Průjezd' },
  { day: 2, dist: 145, lat: 47.6833, lon: 14.6333, name: 'Altenmarkt u St. Gallen', time: '2026-05-02T13:30', tag: 'Oběd' },
  { day: 2, dist: 167, lat: 47.8547, lon: 14.6636, name: 'Weyer',              time: '2026-05-02T16:00', tag: 'Přestávka' },
  { day: 2, dist: 176, lat: 47.8866, lon: 14.5498, name: 'Großraming',         time: '2026-05-02T17:00', tag: 'Nocleh 2' },
  { day: 3, dist: 176, lat: 47.8866, lon: 14.5498, name: 'Großraming',         time: '2026-05-03T09:00', tag: 'Start' },
  { day: 3, dist: 185, lat: 47.9489, lon: 14.4769, name: 'Reichraming',        time: '2026-05-03T09:30', tag: 'Přestávka' },
  { day: 3, dist: 191, lat: 47.9597, lon: 14.4253, name: 'Losenstein',         time: '2026-05-03T10:00', tag: 'Přestávka' },
  { day: 3, dist: 214, lat: 48.0381, lon: 14.4181, name: 'Steyr',              time: '2026-05-03T12:00', tag: 'Oběd' },
  { day: 3, dist: 239, lat: 48.2158, lon: 14.4775, name: 'Enns',               time: '2026-05-03T14:30', tag: 'Přestávka' },
  { day: 3, dist: 243, lat: 48.2397, lon: 14.5156, name: 'Mauthausen',         time: '2026-05-03T14:45', tag: 'Donauradweg' },
  { day: 3, dist: 255, lat: 48.2881, lon: 14.3600, name: 'Steyregg',           time: '2026-05-03T15:30', tag: 'Přestávka' },
  { day: 3, dist: 263, lat: 48.2906, lon: 14.2903, name: 'Linec hlavní nádraží', time: '2026-05-03T16:00', tag: 'Cíl' },
];

export const WMO: Record<number, string> = {
  0: 'Jasno', 1: 'Převážně jasno', 2: 'Polojasno', 3: 'Zataženo',
  45: 'Mlha', 48: 'Namrzající mlha',
  51: 'Slabé mrholení', 53: 'Mrholení', 55: 'Silné mrholení',
  56: 'Mrznoucí mrholení', 57: 'Mrznoucí mrholení',
  61: 'Slabý déšť', 63: 'Déšť', 65: 'Silný déšť',
  66: 'Mrznoucí déšť', 67: 'Mrznoucí déšť',
  71: 'Slabé sněžení', 73: 'Sněžení', 75: 'Silné sněžení',
  77: 'Sněhová zrna',
  80: 'Přeháňky', 81: 'Silné přeháňky', 82: 'Prudké přeháňky',
  85: 'Sněhové přeháňky', 86: 'Silné sněhové přeháňky',
  95: 'Bouřka', 96: 'Bouřka s kroupami', 99: 'Bouřka s kroupami',
};

export const wmoText = (code: number | undefined) =>
  code === undefined ? 'neznámo' : (WMO[code] ?? 'neznámo');

export type Stay = {
  night: string;
  name: string;
  loc: string;
  tentative: boolean;
  mapsQuery: string;
  photos: string[];
  photoCredit: string;
  description: string;
  /** Historický kontext nebo zajímavost — volitelné rozšíření k description. */
  history?: string;
  amenities: string[];
  website?: string;
  pricePerPerson?: string;
  /** Potvrzená rezervace (vyplněno, když máme potvrzení na e-mail). */
  booking?: {
    code: string;
    source: string;
    address: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    rooms: string;
    pairs: string[];
    total?: string;
  };
};

export type Highlight = {
  day: 1 | 2 | 3;
  kind: 'kultura' | 'příroda' | 'historie' | 'gastro' | 'kavárna' | 'památka';
  name: string;
  where: string;
  dist?: number;
  blurb: string;
  tip?: string;
  mapsQuery?: string;
  website?: string;
  photos?: string[];
  /** True when photos are stock illustrations (e.g. generic Schnitzel from Wikimedia)
   * rather than real shots from this specific establishment. Triggers a small
   * "Ilustrační foto" badge on the card. */
  photosAreIllustrative?: boolean;
  /** Opening hours on the day of the trip — e.g. "Pá 1.5. (svátek): 11–22". */
  hours?: string;
  /** Google Maps / review aggregator rating. */
  rating?: { stars: number; count: number; source?: 'Google' | 'TripAdvisor' };
};

const wiki = (filename: string, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}?width=${width}`;

export const HIGHLIGHTS: Highlight[] = [
  // Day 1 — Radstadt → Admont
  {
    day: 1,
    kind: 'historie',
    name: 'Radstadt — středověké město hradeb',
    where: 'Radstadt (start)',
    dist: 0,
    blurb:
      'Opevněné město se třemi dochovanými obrannými věžemi a náměstím z 13. století. Okruh hradbami trvá ~20 minut.',
    mapsQuery: 'Hauptplatz Radstadt',
    photos: [wiki('Radstadt,_Hauptplatz.jpg')],
  },
  {
    day: 1,
    kind: 'příroda',
    name: 'Dachstein panorama',
    where: 'mezi Schladmingem a Gröbmingem',
    dist: 30,
    blurb:
      'Nejvyšší hora Štýrska (2 995 m) se otevírá ze sedla nad údolím. Za jasného dne vidět ledovec Hallstätter.',
    tip: 'Výhled nejlepší dopoledne, kdy slunce svítí zepředu.',
    photos: [wiki('Dachstein_Para.JPG')],
  },
  {
    day: 1,
    kind: 'historie',
    name: 'Schladming — horské staré město',
    where: 'Schladming',
    dist: 20,
    blurb:
      'Hornické město pod Dachsteinem od 11. století. Dnes zimní středisko, Hauptplatz ale drží historickou tvář.',
    mapsQuery: 'Hauptplatz Schladming',
    photos: [wiki('Schladming-aerial.jpg')],
  },
  {
    day: 1,
    kind: 'památka',
    name: 'Gröbming — staré centrum',
    where: 'Gröbming',
    dist: 42,
    blurb:
      'Malé historické jádro se štýrskými měšťanskými domy a krámky. Kolem poledne ~km 42.',
    mapsQuery: 'Altstadt Gröbming',
    photos: [wiki('Altstadt_Groebming.jpg')],
  },
  {
    day: 1,
    kind: 'památka',
    name: 'Liezen — brána do Ennstalu',
    where: 'Liezen',
    dist: 77,
    blurb:
      'Největší město horního Ennstalu. Obchody, lékárna, cukrárna — poslední zastávka před tahem do Admontu.',
    mapsQuery: 'Liezen Hauptplatz',
    photos: [wiki('Liezen_294A2422_Styria.jpg')],
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Stiegenwirt Pichl',
    where: 'Pichl-Mandling',
    dist: 22,
    blurb:
      '„Pfandl wie bei Oma" — tradiční štýrské pánvičkové jídlo s pečeným masem, zemáky a kyselím zelím je zdejší specialita. Schnitzel, Backhendl, domácí strudel. Zahrada s parkováním kol přímo u terasy.',
    tip: 'Polední menu cca € 12–15. Ve svátek plno — rezervovat.',
    mapsQuery: 'Stiegenwirt Pichl Mandling',
    website: 'https://www.stiegenwirt.at/',
    photos: [
      wiki('2017-05-28_Wiener_Schnitzel_mit_Pommes_frites_anagoria.jpg'),
      'https://stiegenwirt.at/wp-content/uploads/2026/01/032-Stiegenwirt_Steirisches-Wirtshaus-kumpPhotography-scaled.jpg',
      'https://stiegenwirt.at/wp-content/uploads/2026/01/002-Stiegenwirt_Steirisches-Wirtshaus-kumpPhotography-Kopie.jpg',
      'https://stiegenwirt.at/wp-content/uploads/2026/01/044-Stiegenwirt_Steirisches-Wirtshaus-kumpPhotography-scaled.jpg',
      'https://stiegenwirt.at/wp-content/uploads/2026/01/065-Stiegenwirt_Steirisches-Wirtshaus-kumpPhotography-scaled.jpg',
    ],
    hours: 'Pá 1.5. (st. svátek): obvykle 11–22 · ve svátek bývá plno, rezervovat',
    rating: { stars: 4.4, count: 300, source: 'Google' },
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Gasthof Goldener Hirsch Liezen',
    where: 'Liezen · Ausseer Straße 7',
    dist: 77,
    blurb:
      'Rakouská domácí kuchyně na náměstí. Polední bufet (každé 11. menu zdarma), Sonntagsbrunch, sezónní bílý chřest. „Ausgezeichnete Küche, großzügige Portionen."',
    tip: 'Polední bufet, každé 11. menu zdarma.',
    mapsQuery: 'Gasthof Goldener Hirsch Liezen Ausseer Straße',
    photos: [
      wiki('Tafelspitz.jpg'),
      wiki('Liezen-stadt1386.JPG'),
    ],
    photosAreIllustrative: true,
    hours: 'Pá 1.5. (st. svátek): obvykle 11–22 · o svátku zkrácené, telefonem ověřit',
    rating: { stars: 4.2, count: 312, source: 'Google' },
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Gasthof Kirchenwirt Admont',
    where: 'Admont · u kláštera',
    dist: 99,
    blurb:
      'Hostinec hned vedle Stift Admont. V recenzích „best Schnitzel v okolí", domácí Bauerngröstl, štýrské suroviny. Bezpečné parkování kol.',
    tip: 'Otevřeno do 23 i ve svátek. Bezpečné parkování kol u restaurace.',
    mapsQuery: 'Gasthof Kirchenwirt Admont',
    website: 'https://www.kirchenwirt-admont.at/',
    photos: [
      wiki('2017-05-28_Wiener_Schnitzel_mit_Pommes_frites_anagoria.jpg'),
      wiki('Alte_kath._Pfarrkirche,_Admont.jpg'),
    ],
    photosAreIllustrative: true,
    hours: 'Pá 1.5. (st. svátek): obvykle 11–23 · o svátku stabilně otevřeno',
    rating: { stars: 4.4, count: 486, source: 'Google' },
  },
  {
    day: 1,
    kind: 'kultura',
    name: 'Stift Admont — benediktinské opatství',
    where: 'Admont (cíl dne)',
    dist: 99,
    blurb:
      'Největší klášterní knihovna na světě (70 000 svazků, 70 m dlouhá, strop od Altomonteho). Založena 1074. Muzeum přírody, moderní umění.',
    tip: 'Vstupné cca € 13,50. Otevřeno sezónně 18.3.–1.11.',
    mapsQuery: 'Stift Admont Bibliothek',
    website: 'https://www.stiftadmont.at/',
    photos: [
      wiki('Stift_Admont_03.jpg'),
      wiki('Stiftsbibliothek_Admont_01.jpg'),
      wiki('Admont_-_Benediktinerstift.JPG'),
      wiki('Stiftskirche_Admont.jpg'),
    ],
    hours: 'Pá 1.5.: 10–17 (poslední vstup 16:15) · sezona 18.3.–1.11.',
  },
  {
    day: 1,
    kind: 'kavárna',
    name: 'Café-Konditorei Landgraf',
    where: 'Schladming · Hauptplatz 37',
    dist: 20,
    blurb:
      'Rodinná Konditorei na hlavním náměstí — ručně dělané zákusky, vlastní zmrzlina, vlastní dorty. „Good coffee and excellent cakes, everything is fresh."',
    tip: 'Otevřeno denně 8–22. Káva + zákusek ~€ 6.',
    mapsQuery: 'Café Landgraf Schladming Hauptplatz',
    website: 'https://landgraf.cc/',
    photos: [
      'https://landgraf.cc/wp-content/uploads/2024/05/cafe-konditorei-restaurant-landgraf.jpg',
      'https://landgraf.cc/wp-content/uploads/2024/05/IMG_4492-scaled.jpg',
      'https://landgraf.cc/wp-content/uploads/2024/05/07-20190118_182628.jpg',
    ],
    hours: 'Pá 1.5.: 8–22 · otevřeno denně',
    rating: { stars: 4.0, count: 1200, source: 'Google' },
  },
  {
    day: 1,
    kind: 'kavárna',
    name: 'Cafe-Konditorei Stefflbäck',
    where: 'Gröbming · Hauptplatz 110',
    dist: 42,
    blurb:
      'Štýrská pekárna-kavárna na náměstí — čerstvé pečivo, zákusky, káva z malé štýrské pražírny.',
    tip: 'Otevřeno denně 7:30–20.',
    mapsQuery: 'Stefflbäck Gröbming Hauptplatz',
    website: 'https://www.stefflbaeck.at/',
    photos: [
      wiki('Apfelstrudel_with_whipped_cream.jpg'),
      wiki('Kulturhalle_Groebming.jpg'),
    ],
    photosAreIllustrative: true,
    hours: 'Pá 1.5.: 7:30–20',
    rating: { stars: 4.3, count: 80, source: 'Google' },
  },
  {
    day: 1,
    kind: 'kavárna',
    name: 'Konditorei Stockhammer',
    where: 'Admont · Hauptstraße 346',
    dist: 99,
    blurb:
      'Signature „Admonter Marzizoni" — mandlový zákusek podle receptu z archivu benediktinského opatství. „Popular with locals — friendly service, delicious cakes, fantastic ice cream."',
    tip: 'Úterý zavřeno. Kousek od Stift Admont.',
    mapsQuery: 'Konditorei Stockhammer Admont',
    website: 'https://konditorei-stockhammer.at/',
    photos: [
      'https://konditorei-stockhammer.at/00_Regionen/01_Gesaeuse/intern/medienarchiv/bilder/Microsites/konditorei-Stockhammer/6843440/image-thumb__6843440__img-text-slide/Marzizoni.fe173873.jpg',
      'https://konditorei-stockhammer.at/00_Regionen/01_Gesaeuse/intern/medienarchiv/bilder/Microsites/konditorei-Stockhammer/6843188/image-thumb__6843188__content-teaser--landscape/Konditorei-Stockhammer_c-Stefan-Leitner_Gesaeuse_2-scaled.a3733178.jpg',
    ],
    hours: 'Pá 1.5.: 10–17:30',
    rating: { stars: 4.6, count: 180, source: 'Google' },
  },

  // Day 2 — Admont → Großraming
  {
    day: 2,
    kind: 'příroda',
    name: 'Nationalpark Gesäuse',
    where: 'mezi Admontem a Hieflau',
    dist: 115,
    blurb:
      'Divoká soutěska Enns, vápencové stěny Buchsteinu a Hochtoru. UNESCO-kandidát. Trasa vede přímo dnem údolí podél řeky.',
    tip: 'U Gstatterboden je infocentrum parku a přístup k řece.',
    mapsQuery: 'Gesäuse Nationalpark',
    photos: [wiki('Gesaeuseeingang.jpg')],
  },
  {
    day: 2,
    kind: 'historie',
    name: 'Hieflau — stará huť',
    where: 'Hieflau',
    dist: 125,
    blurb:
      'Po staletí centrum zpracování železné rudy z Erzbergu. Dochovaný industriální ráz, vodní kanál a most.',
    mapsQuery: 'Hieflau',
    photos: [wiki('Hieflau_Ort.jpg')],
  },
  {
    day: 2,
    kind: 'gastro',
    name: 'Gasthof Post Altenmarkt',
    where: 'Altenmarkt bei St. Gallen',
    dist: 145,
    blurb:
      'Překvapení ve vesnici: premium steak z vlastního dry-ageru, sezónní Wild- a Gansl-týdny. „Honest regional cooking and an atmospheric summer garden under the giant linden." Google 4.4★ (436 recenzí).',
    tip: 'Dry-aged rump steak cca € 30. Velká zahrada pod lípou.',
    mapsQuery: 'Gasthof Post Altenmarkt bei Sankt Gallen',
    website: 'https://www.gasthofpost-altenmarkt.at/',
    photos: [
      wiki('Strip-steak-MCB-MaggieO.jpg'),
      wiki('Bunter_Salatteller_mit_Rumpsteak_und_Champignons.JPG'),
    ],
    photosAreIllustrative: true,
    hours: 'So 2.5.: obvykle 11–22 · teplé jídlo do 21',
    rating: { stars: 4.4, count: 436, source: 'Google' },
  },
  {
    day: 2,
    kind: 'gastro',
    name: 'Gasthof Kaiser von Österreich',
    where: 'Weyer',
    dist: 167,
    blurb:
      'Barokní hostinec na náměstí Weyer se šéfkuchařem Hermannem Haidingerem. „Mix rakouské a středomořské kuchyně gelingt äußerst überzeugend" — hausgemachte pasta a chléb, istrijský olivový olej. Oceňováno Falstaff.',
    tip: 'Hausgemachte pasta a chléb. Některé soboty zavřeno kvůli akcím — ověřit.',
    mapsQuery: 'Gasthof Kaiser von Österreich Weyer',
    website: 'https://www.kaiservonoesterreich.at/',
    photos: [
      wiki('2012.01.15_-_Weyer15_-_Bürgerhaus,_Dreherhaus,_Kompaniehof,_Marktplatz_1_-_01.jpg'),
      wiki('2012.01.15_-_Weyer27_-_Schloss_Weyer,_Egerer_Schlössel,_Marktplatz_30_-_01.jpg'),
    ],
    photosAreIllustrative: true,
    hours: 'So 2.5.: 11–22 · ověřit, některé soboty zavřeno kvůli akcím',
    rating: { stars: 4.5, count: 150, source: 'Google' },
  },
  {
    day: 2,
    kind: 'památka',
    name: 'Weyer — dřevěné měšťanské náměstí',
    where: 'Weyer',
    dist: 167,
    blurb:
      'Barevné kupecké domy ze 16.–18. století okolo dlouhého dřevěného náměstí, nepoznamenané válkou.',
    tip: 'Projít pěšky od kostela k dolnímu konci náměstí, ~10 minut.',
    mapsQuery: 'Marktplatz Weyer',
    photos: [wiki('2012.01.15_-_Weyer31_-_Ehem._Marktgericht,_Soldatenhaus,_Marktplatz_8_-_01.jpg')],
  },
  {
    day: 2,
    kind: 'kavárna',
    name: 'Cafe-Konditorei Schwarzlmüller',
    where: 'Weyer · Oberer Markt 6',
    dist: 167,
    blurb:
      'Ručně dělané Mehlspeis-kreace, pralinky a přes 20 druhů domácí zmrzliny v létě. Rodinný podnik Hannese Schwarzlmüllera, 20+ let.',
    tip: 'V sobotu plno, rezervace vhodná.',
    mapsQuery: 'Schwarzlmüller Weyer Oberer Markt',
    website: 'https://www.schwarzlmueller.at/',
    photos: [
      wiki('Kaiserschmarrn_und_Apfelmus.jpg'),
      wiki('Apfelstrudel_with_whipped_cream.jpg'),
    ],
    photosAreIllustrative: true,
    hours: 'So 2.5.: obvykle 7:30–18 · ověřit telefonem',
    rating: { stars: 4.5, count: 100, source: 'Google' },
  },

  // Day 3 — Großraming → Linec
  {
    day: 3,
    kind: 'kultura',
    name: 'Steyr — historické jádro',
    where: 'Steyr',
    dist: 214,
    blurb:
      'Soutok Enns a Steyr, gotické a barokní jádro, slavný Bummerlhaus (1497). Město železářské tradice a Schubertových letních pobytů.',
    tip: 'Od mostu k Bummerlhausu na Stadtplatz cca 10 minut pěšky.',
    mapsQuery: 'Stadtplatz Steyr',
    photos: [wiki('Blick_ueber_die_Steyrer_Altstadt.jpg')],
  },
  {
    day: 3,
    kind: 'příroda',
    name: 'Losenstein — hradní skála',
    where: 'Losenstein',
    dist: 191,
    blurb:
      'Romantická zřícenina hradu ze 12. století na skále nad Ennsem. Symbol Ennstalu, trasa vede přímo pod skalou.',
    tip: 'Od mostu pod skalou je záběr na hrad i Enns.',
    mapsQuery: 'Burgruine Losenstein',
    photos: [wiki('Losenstein_-_Westsüdwestansicht_(2).JPG')],
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Rahofer Bräu Steyr',
    where: 'Steyr · Stadtplatz 9',
    dist: 214,
    blurb:
      'Mikropivovar v renesančním dvoře s toskánskými sloupy. „Perfectly cooked steaks in one of Steyr\'s most beautiful courtyards." Wagyu rump steak (BMS 6–8) s gnocchi, grilovaná chobotnice v sezóně. Google 4.7★.',
    tip: 'Renesanční dvůr se stoly. Teplá kuchyně 11–14 a 17–21.',
    mapsQuery: 'Rahofer Bräu Steyr Stadtplatz',
    website: 'https://www.rahofer.at/',
    photos: [
      'https://static.wixstatic.com/media/31ef28_0d8887efa11c41f6b0e6ca927cbd9c6a~mv2.jpg',
      'https://static.wixstatic.com/media/31ef28_b08359ddc5ee48849a68bc9ffd2cacb5~mv2.jpg',
      'https://static.wixstatic.com/media/31ef28_344e0fa09cc84801bf2027b8c1d6c09a~mv2.jpg',
      'https://static.wixstatic.com/media/31ef28_06781307a909423db446596e1cffd618~mv2.jpg',
    ],
    hours: 'Ne 3.5.: 11–14 & 17–22 · teplá kuchyně do 21',
    rating: { stars: 4.7, count: 187, source: 'Google' },
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Café Werndl — vídeňská kavárna nad soutokem',
    where: 'Steyr · Zwischenbrücken 3–4',
    dist: 214,
    blurb:
      'Vídeňský kaffeehaus u soutoku Enns a Steyr. Domácí Malakoff torte, krémové řezy, snídaně a brunch. Nabíječka na e-kola.',
    tip: 'V neděli otevřeno 8–18 (na rozdíl od většiny cukráren v Steyru). Káva + dílek cca € 7.',
    mapsQuery: 'Café Werndl Steyr Zwischenbrücken',
    photos: [
      wiki('Sacher_Torte_sliced,_closeup,_February_2010.jpg'),
      wiki('Wiener_Melange_im_Sacher.JPG'),
    ],
    photosAreIllustrative: true,
    hours: 'Ne 3.5.: 8–18 · v neděli otevřeno',
    rating: { stars: 4.3, count: 241, source: 'Google' },
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Platzhirsch Enns',
    where: 'Enns · Hauptplatz',
    dist: 239,
    blurb:
      'Mladý hostinec na hlavním náměstí pod Stadtturmem. Signature „Pfandl" — pánvička s bramborami, knedlíky a pečení, navrch volské oko. K tomu studený Mostdudler (mošt + tonic). „Pfandl mit eiskaltem Mostdudler ist sehr zu empfehlen."',
    tip: 'Pfandl pro dva + Mostdudler.',
    mapsQuery: 'Platzhirsch Enns Hauptplatz',
    photos: [
      wiki('2017-05-28_Wiener_Schnitzel_mit_Pommes_frites_anagoria.jpg'),
      wiki('Enns_-_Hauptplatz_mit_Stadtturm.JPG'),
    ],
    photosAreIllustrative: true,
    hours: 'Ne 3.5.: 10–22 · v neděli otevřeno',
    rating: { stars: 4.4, count: 100, source: 'TripAdvisor' },
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Donauhof Mauthausen',
    where: 'Mauthausen · u přívozu',
    dist: 243,
    blurb:
      'Hostinec u Dunaje na Donauradwegu, kousek za Ennsem. Sezónní speciality — Spargel (chřest), Eierschwammerl (lišky), Wildwochen, Martinigansl. „Hearty homemade dishes with fantastic wine recommendations."',
    tip: 'Terasa nad Dunajem. Teplá kuchyně do 20.',
    mapsQuery: 'Donauhof Mauthausen',
    website: 'https://www.donau-hof.at/',
    photos: [
      'https://www.donau-hof.at/assets/Uploads/header_essen2x-v2__FillWzE5MjAsNTAwXQ.png',
      'https://www.donau-hof.at/assets/Uploads/aussicht-6__FillMaxWzgwMCw4MDBd_FillWzMyMCwyNjBd.jpeg',
      'https://www.donau-hof.at/assets/Uploads/CIMG4241__FillMaxWzgwMCw4MDBd_FillWzMyMCwyNjBd.JPG',
      'https://www.donau-hof.at/assets/Uploads/saisonales_neu_03__FillMaxWzgwMCw4MDBd_FillWzMyMCwyNjBd.png',
    ],
    hours: 'Ne 3.5.: obvykle 11–21 · v neděli otevřeno, teplá kuchyně do 20',
    rating: { stars: 4.3, count: 404, source: 'Google' },
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Gasthaus Panglmayr Steyregg',
    where: 'Steyregg · nad Dunajem',
    dist: 255,
    blurb:
      'Hornorakouský Gasthof v Steyreggu, 8 km před Lincem. Signature Steckerlfisch (ryba na špejli), v recenzích „vynikající a hostinští velmi milí".',
    tip: '8 km před Lincem, poslední hospoda na trase.',
    mapsQuery: 'Gasthaus Panglmayr Steyregg',
    hours: 'Ne 3.5.: obvykle 11–22 · v neděli ověřit',
    rating: { stars: 4.2, count: 120, source: 'Google' },
    photos: [
      'https://assets.sta.io/site_media/u/si/2016/06/08/essen2.jpg',
      'https://assets.sta.io/site_media/u/si/2016/06/08/essen3.jpg',
      'https://assets.sta.io/site_media/u/si/2016/06/08/startimg.jpg',
    ],
  },
  {
    day: 3,
    kind: 'historie',
    name: 'Enns — nejstarší město Rakouska',
    where: 'Enns',
    dist: 239,
    blurb:
      'Městská práva 1212, římské kořeny (Lauriacum). Stadtturm z 1568, 60 m vysoká renesanční zvonice uprostřed náměstí.',
    mapsQuery: 'Stadtturm Enns',
    photos: [wiki('Enns_-_Hauptplatz_mit_Stadtturm.JPG')],
  },
  {
    day: 3,
    kind: 'kultura',
    name: 'Linec — cíl u Dunaje',
    where: 'Linec (cíl)',
    dist: 263,
    blurb:
      'Hlavní město Horního Rakouska, barokní Hauptplatz, Ars Electronica Center u Dunaje, Nový dóm — největší kostel Rakouska.',
    tip: 'Z nádraží 10 min tramvají do starého města.',
    mapsQuery: 'Hauptplatz Linz',
    photos: [wiki('Linz_Altstadt_17.jpg')],
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Konditorei-Cafe Hofer',
    where: 'Enns · Wiener Straße 8',
    dist: 239,
    blurb:
      '30 průběžně se měnících domácích zmrzlinových příchutí a 45 zmrzlinových kreací, perníky, lanýže. Podloubí dvůr. Falstaff: 86 bodů.',
    tip: 'Pondělí zavřeno. Dvůr s podloubím místo stolů u ulice.',
    mapsQuery: 'Konditorei Hofer Enns Wiener Straße',
    website: 'https://erlebe.enns.at/geschaefte/cafe-konditorei-hofer/935',
    photos: [
      'https://erlebe.enns.at/uploads/images/thumbs_height_320/46be9a07-86e4-4d54-ae24-be3694acfc2b.jpg',
    ],
    hours: 'Ne 3.5.: 8:30–19',
    rating: { stars: 4.3, count: 376, source: 'Google' },
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Konditorei Jindrak (Stammhaus)',
    where: 'Linec · Herrenstraße 22–24',
    dist: 263,
    blurb:
      'Rodinná Konditorei od roku 1929, peče přes 100 000 Linzer Torten ročně — nejznámější výrobce originálního Linzer Torte. „You can taste tradition in every bite."',
    tip: 'Stammhaus Herrenstraße — pobočka Landstraße má v neděli zavřeno. Dort i s sebou v krabici.',
    mapsQuery: 'Jindrak Herrenstraße Linz',
    website: 'https://www.linzertorte.at/',
    photos: [
      'https://www.linzertorte.at/app/uploads/2025/07/original-linzer-torte-1.webp',
    ],
    hours: 'Ne 3.5.: obchod 9–18 · kavárna 10–17',
    rating: { stars: 4.5, count: 1500, source: 'Google' },
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Café Traxlmayr',
    where: 'Linec · Promenade 16',
    dist: 263,
    blurb:
      'Jediné zachované Altwiener Kaffeehaus v Linci, rodinné od 1847. Interiér 1905 od žáka Otto Wagnera. „Kaiserschmarrn a aromatické kávové variace."',
    tip: 'Otevřeno do 20 i v neděli, funguje i jako bar.',
    mapsQuery: 'Café Traxlmayr Linz Promenade',
    website: 'https://www.cafe-traxlmayr.at/',
    photos: [
      'https://www.cafe-traxlmayr.at/wp-content/uploads/2020/01/Bild_1_neu.png',
      'https://www.cafe-traxlmayr.at/wp-content/uploads/2020/01/Bild_3.png',
      'https://www.cafe-traxlmayr.at/wp-content/uploads/2020/01/Bild_4_neu.png',
    ],
    hours: 'Ne 3.5.: 9–20',
    rating: { stars: 4.1, count: 600, source: 'Google' },
  },
  {
    day: 3,
    kind: 'památka',
    name: 'KZ-Gedenkstätte Mauthausen',
    where: 'Mauthausen (2 km z trasy)',
    dist: 243,
    blurb:
      'Bývalý koncentrační tábor, dnes památník. Zajížďka 2 km kopcem z Mauthausenu.',
    tip: 'Vstup zdarma. V neděli otevřeno od 10. Počítej 60–90 min.',
    mapsQuery: 'KZ-Gedenkstätte Mauthausen',
    website: 'https://www.mauthausen-memorial.org/',
    hours: 'Ne 3.5.: 9–17:30 (poslední vstup 16:45) · muzeum od 10',
    photos: [wiki('Mauthausen-Retaining_Wall.jpg')],
  },
];

export type PackingSection = {
  title: string;
  items: string[];
};

export const PACKING: PackingSection[] = [
  {
    title: 'Kolo & nářadí',
    items: [
      'Kolo s funkčními brzdami a převody (servis před výjezdem)',
      'Helma',
      'Kolárenské rukavice',
      'Náhradní duše (2×) + lepení, pumpa, multitool, imbusy',
      'Spojka řetězu + nýtovač',
      'Zámek (každý kolo vlastní)',
      'Přední a zadní světlo + baterie',
    ],
  },
  {
    title: 'Oblečení',
    items: [
      'Cyklo kraťasy s vložkou (2 páry na střídání)',
      'Funkční tričko 2×, větrovka',
      'Pláštěnka / nepromokavá bunda',
      'Civilní outfit na večer',
      'Teplá vrstva (večery v Ennstalu mohou být chladné, 8–12 °C)',
      'Náhradní ponožky, spodní prádlo',
    ],
  },
  {
    title: 'Doklady & peníze',
    items: [
      'Občanka nebo pas',
      'Evropský průkaz zdravotního pojištění (EHIC)',
      'Cestovní pojištění (doporučeno)',
      'Hotovost € + karta (Rakousko hodně preferuje kartu, ale menší Gasthausy ne)',
    ],
  },
  {
    title: 'Lékárnička & hygiena',
    items: [
      'Obinadlo, náplasti, dezinfekce',
      'Ibalgin, probiotika, tablety proti nevolnosti',
      'Opalovací krém SPF 30+ a balzám na rty',
      'Repelent',
      'Chapstick na rty — alpské slunce vysušuje',
    ],
  },
  {
    title: 'Elektronika',
    items: [
      'Telefon + powerbank',
      'Nabíječky (typ F / Schuko — rakouská zásuvka = stejná jako ČR)',
      'Cyklo-navigace (Komoot / Mapy.cz s offline mapami)',
      'Čelová lampa',
    ],
  },
];

export const STAYS: Stay[] = [
  {
    night: 'Nocleh 1 · Pá 1. května',
    name: 'Hotel Spirodom Admont',
    loc: 'Admont · u benediktinského opatství',
    tentative: false,
    mapsQuery: 'Hotel Spirodom Admont',
    photos: [
      'https://www.spirodom.at/fileadmin/spirodom/aussen/winter/spirodom-winteransicht-hotel-aussen.jpg',
      'https://www.spirodom.at/fileadmin/spirodom/wellness/spirodom-pool-ausblick-sommer.jpg',
      'https://www.spirodom.at/fileadmin/spirodom/zimmer/spirodom-superior-zimmer.jpg',
      'https://www.spirodom.at/fileadmin/spirodom/kulinarik/spirodom-kulinarik-tischgedeck.jpg',
      'https://www.spirodom.at/fileadmin/spirodom/kulinarik/spirodom-nachspeise-kulinarik.jpg',
      'https://www.spirodom.at/fileadmin/spirodom/kulinarik/spirodom-buffet-zum-fruehstueck.jpg',
      'https://www.spirodom.at/fileadmin/spirodom/kulinarik/spirodom-terrasse-am-abend.jpg',
    ],
    photoCredit: 'spirodom.at',
    description:
      'Čtyřhvězdičkový hotel kousek od slavné klášterní knihovny. 3× Superior Doppelzimmer Bergblick (pokoj s výhledem na hory) s polopenzí, wellness s bazénem a uzamykatelná kolárna.',
    history:
      'Hotel otevřelo benediktinské opatství Stift Admont v říjnu 2012 — jméno „Spirodom" vzniklo spojením latinského spiro (dýchám) a domus (dům), tedy „dům dechu". Až do 1. února 2026 patřil přímo klášteru (provoz pod 1912 Hotel GmbH), pak jej Stift prodal zkušenému rakouskému hoteliérovi Thomasi Neblovi, který provozuje i Pavilon národního parku v Gstatterbodenu a oživený Xeis NeSt ve Wengu. Spíme tam tedy de facto „v klášterním hotelu" jen pár měsíců po změně majitele.',
    amenities: [
      'Polopenze',
      'Bergblick',
      'Uzamykatelná kolárna',
      'Wellness & bazén',
      'Restaurace',
      'WiFi zdarma',
      'Parking',
    ],
    website: 'https://www.spirodom.at/',
    pricePerPerson: '€ 93 / os. · 3× Superior Doppelzimmer s polopenzí · zaplaceno',
    booking: {
      code: '5527750965',
      source: 'booking.com',
      address: 'Eichenweg 616, 8911 Admont',
      phone: '+43 3613 36600',
      checkIn: 'od 15:00',
      checkOut: 'do 11:00',
      rooms: '3× Superior Doppelzimmer Bergblick s polopenzí',
      pairs: ['Denis + Kája', 'Kevin + Vojta', 'Franz + Dáša'],
      total: '€ 560 celkem (6 osob, 1 noc)',
    },
  },
  {
    night: 'Nocleh 2 · So 2. května',
    name: 'Landgasthof Kirchenwirt',
    loc: 'Großraming · náměstí u kostela',
    tentative: false,
    mapsQuery: 'Landgasthof Kirchenwirt Kirchenplatz 4 Großraming',
    photos: [
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/2019/12/Kirchenwirt-013-1900x500.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/hausansicht1-600x400.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/2019/07/Kirchenwirt37.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/2019/07/Kirchenwirt43.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/2019/07/Kirchenwirt25.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/2019/07/Kirchenwirt54.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/dsc2082-kopie.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/dsc2025-kopie.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/Kirchenwirt-118-600x399.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/Kirchenwirt-133-600x459.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/Kirchenwirt-044-600x399.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/dsc_9651-bearbeitet1-600x399.jpg',
    ],
    photoCredit: 'kirchenwirt-grossraming.at',
    description:
      'Tradiční hostinec v srdci Großramingu. Domácí kuchyně s rakouskými klasikami (Schnitzel, Tafelspitz), pivo Stiegl, pokoje nad restaurací.',
    history:
      'Jeden z nejstarších hostinců v regionu — první písemná zmínka je z roku 1524 jako „Wirth bey der Kirchen" (hostinský u kostela) s výčepním právem pod panstvím Steyr. V roce 2024 oslavil 500 let nepřetržitého provozu. Masivní klenby a zakouřený dřevěný strop v šenku jsou přímým dědictvím té doby. Kirchenwirt je také označován za „rodiště" Národního parku Kalkalpen — právě zde probíhala klíčová jednání o jeho založení.',
    amenities: ['WiFi zdarma', 'Snídaně', 'Úschovna kol', 'Restaurace', 'Centrum obce', 'Sauna'],
    website: 'https://www.kirchenwirt-grossraming.at/',
    pricePerPerson: '€ 67 / os. / noc se snídaní · + místní poplatek € 2,40',
  },
];
