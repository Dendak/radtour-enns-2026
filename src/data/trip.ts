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

export const TEAM: string[] = [
  'Dagmar Nutterová',
  'Franz Ferdinand',
  'Denis Holub',
  'Karolína Masarová',
  'Kevin Holub',
  'Vojtěch Lapáček',
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
  { day: 1, dist: 0,   lat: 47.3853, lon: 13.4536, name: 'Radstadt (nádraží)', time: '2026-05-01T09:00', tag: 'Start' },
  { day: 1, dist: 20,  lat: 47.3950, lon: 13.6858, name: 'Schladming',         time: '2026-05-01T10:00', tag: 'Přestávka' },
  { day: 1, dist: 42,  lat: 47.4403, lon: 13.9067, name: 'Gröbming',           time: '2026-05-01T12:00', tag: 'Oběd' },
  { day: 1, dist: 60,  lat: 47.4944, lon: 14.1042, name: 'Irdning',            time: '2026-05-01T14:00', tag: 'Přestávka' },
  { day: 1, dist: 77,  lat: 47.5664, lon: 14.2406, name: 'Liezen',             time: '2026-05-01T15:30', tag: 'Přestávka' },
  { day: 1, dist: 99,  lat: 47.5749, lon: 14.4601, name: 'Admont',             time: '2026-05-01T17:00', tag: 'Nocleh 1' },
  { day: 2, dist: 99,  lat: 47.5749, lon: 14.4601, name: 'Admont',             time: '2026-05-02T09:00', tag: 'Start' },
  { day: 2, dist: 118, lat: 47.5747, lon: 14.6200, name: 'Gesäuse',            time: '2026-05-02T11:00', tag: 'Zajímavost' },
  { day: 2, dist: 125, lat: 47.6067, lon: 14.7489, name: 'Hieflau',            time: '2026-05-02T12:30', tag: 'Přestávka' },
  { day: 2, dist: 134, lat: 47.6956, lon: 14.7283, name: 'Großreifling',       time: '2026-05-02T13:00', tag: 'Průjezd' },
  { day: 2, dist: 145, lat: 47.6833, lon: 14.6333, name: 'Altenmarkt u St. Gallen', time: '2026-05-02T13:30', tag: 'Oběd' },
  { day: 2, dist: 167, lat: 47.8547, lon: 14.6636, name: 'Weyer',              time: '2026-05-02T16:00', tag: 'Přestávka' },
  { day: 2, dist: 176, lat: 47.8906, lon: 14.5264, name: 'Großraming',         time: '2026-05-02T17:00', tag: 'Nocleh 2' },
  { day: 3, dist: 176, lat: 47.8906, lon: 14.5264, name: 'Großraming',         time: '2026-05-03T09:00', tag: 'Start' },
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
  photoUrl: string;
  photoCredit: string;
  description: string;
  amenities: string[];
  website?: string;
  pricePerPerson?: string;
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
};

export const HIGHLIGHTS: Highlight[] = [
  // Day 1 — Radstadt → Admont
  {
    day: 1,
    kind: 'historie',
    name: 'Radstadt — středověké město hradeb',
    where: 'Radstadt (start)',
    dist: 0,
    blurb:
      'Jedno z nejlépe dochovaných opevněných měst v Alpách. Tři obranné věže, 800 let staré náměstí. Krátká okruhová procházka před vyjetím.',
    mapsQuery: 'Hauptplatz Radstadt',
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
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Brauhaus Falkenstein',
    where: 'Pichl bei Schladming',
    dist: 25,
    blurb: 'Lokální pivovar s vlastním ležákem a štýrskou kuchyní (Brettljause, Kaspressknödel).',
    tip: 'Otevřeno od 11:30, ideální oběd.',
    mapsQuery: 'Brauhaus Falkenstein Pichl',
  },
  {
    day: 1,
    kind: 'kultura',
    name: 'Stift Admont — benediktinské opatství',
    where: 'Admont (cíl dne)',
    dist: 99,
    blurb:
      'Největší klášterní knihovna na světě (70 000 svazků, 70 m dlouhá, strop od Altomonteho). Založena 1074. Muzeum přírody, moderní umění.',
    tip: 'Vstupné cca € 13,50. Otevřeno 10–17. Unbedingt zajít — i zvenčí za fotku.',
    mapsQuery: 'Stift Admont Bibliothek',
    website: 'https://www.stiftadmont.at/',
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
    tip: 'Nejkrásnější úsek celé cesty. Dej si čas na focení u Gstatterboden.',
    mapsQuery: 'Gesäuse Nationalpark',
  },
  {
    day: 2,
    kind: 'historie',
    name: 'Hieflau — stará huť',
    where: 'Hieflau',
    dist: 125,
    blurb:
      'Po staletí centrum zpracování železné rudy z Erzbergu. Dochovaný industriální ráz, vodní kanál a most.',
  },
  {
    day: 2,
    kind: 'gastro',
    name: 'Gasthaus zur Post Altenmarkt',
    where: 'Altenmarkt bei St. Gallen',
    dist: 145,
    blurb: 'Klasický štýrský hostinec. Tafelspitz a domácí strudel. Rychlá obsluha, velké porce pro hladové cyklisty.',
    tip: 'Oběd den 2 — po Gesäuse dobré doplnit kalorie.',
    mapsQuery: 'Gasthaus zur Post Altenmarkt bei Sankt Gallen',
  },
  {
    day: 2,
    kind: 'památka',
    name: 'Weyer — dřevěné měšťanské náměstí',
    where: 'Weyer',
    dist: 167,
    blurb:
      'Jedno z nejkrásnějších náměstí v Horním Rakousku — barevné kupecké domy ze 16.–18. století, nepoznamenané válkou.',
    tip: 'Krátká zastávka, 10 minut projít pěšky.',
    mapsQuery: 'Marktplatz Weyer',
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
    tip: 'Procházka od nádraží k náměstí Stadtplatz — 10 minut a odrovná tě to.',
    mapsQuery: 'Stadtplatz Steyr',
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Café Werner — pravý Linzer Torte',
    where: 'Steyr',
    dist: 214,
    blurb:
      'Cukrárna v Steyru s nejstarší recepturou Linzer Torte v regionu. Tradiční mříž z mandlového těsta, rybízová marmeláda.',
    tip: 'Uzavřený obvykle pondělí — ve sobotu ok. Káva + dílek € 7.',
    mapsQuery: 'Café Werner Steyr',
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
  },
  {
    day: 3,
    kind: 'památka',
    name: 'KZ-Gedenkstätte Mauthausen',
    where: 'Mauthausen (2 km z trasy)',
    dist: 243,
    blurb:
      'Bývalý koncentrační tábor, dnes památník. Důstojné, tiché místo. Pokud čas dovolí, zajížďka 2 km kopcem stojí za to.',
    tip: 'Vstup zdarma. Ne neděle před polednem. Počítej 60–90 min.',
    mapsQuery: 'KZ-Gedenkstätte Mauthausen',
    website: 'https://www.mauthausen-memorial.org/',
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Café Traxlmayr — nejstarší kavárna v Linci',
    where: 'Linec (cíl)',
    dist: 263,
    blurb:
      'Vídeňská kavárenská kultura od roku 1847. Mramorové stolky, noviny na tyči, Linzer Torte a Melange. Perfektní finiš.',
    tip: 'V pěší zóně, 5 minut od hlavního nádraží.',
    mapsQuery: 'Café Traxlmayr Linz',
    website: 'https://www.cafe-traxlmayr.at/',
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Konditorei Jindrak — Linzer Torte',
    where: 'Linec',
    dist: 263,
    blurb:
      'Rodinná cukrárna pečující o originální recept Linzer Torte (nejstarší torta světa, první zmínka 1653). Několik poboček, hlavní u Landstraße.',
    tip: 'Torta do kufru jede i několik týdnů. Dárek domů.',
    mapsQuery: 'Konditorei Jindrak Landstraße Linz',
    website: 'https://www.jindrak.at/',
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

export type EmergencyContact = { label: string; value: string; note?: string };
export const EMERGENCIES: EmergencyContact[] = [
  { label: 'Tísňové volání (EU)', value: '112' },
  { label: 'Záchranka AT', value: '144' },
  { label: 'Policie AT', value: '133' },
  { label: 'Horská služba AT', value: '140' },
  { label: 'ÖBB (info o vlacích)', value: '+43 5 1717', note: 'čeština dostupná' },
];

export const STAYS: Stay[] = [
  {
    night: 'Nocleh 1 · Pá 1. května',
    name: 'Hotel Spirodom Admont',
    loc: 'Admont · u benediktinského opatství',
    tentative: false,
    mapsQuery: 'Hotel Spirodom Admont',
    photoUrl: 'https://www.spirodom.at/fileadmin/spirodom/wellness/spirodom-pool-ausblick-sommer.jpg',
    photoCredit: 'spirodom.at',
    description:
      'Čtyřhvězdičkový hotel kousek od slavné klášterní knihovny. Vlastní restaurace, wellness s bazénem, uzamykatelná kolárna a snídaně v ceně.',
    amenities: ['WiFi zdarma', 'Snídaně', 'Uzamykatelná kolárna', 'Restaurace', 'Wellness', 'Parking'],
    website: 'https://www.spirodom.at/',
  },
  {
    night: 'Nocleh 2 · So 2. května',
    name: 'Landgasthof Kirchenwirt',
    loc: 'Großraming · náměstí u kostela',
    tentative: false,
    mapsQuery: 'Landgasthof Kirchenwirt Kirchenplatz 4 Großraming',
    photoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grossraming_Ortszentrum.jpg?width=1400',
    photoCredit: 'Wikimedia Commons · Großraming',
    description:
      'Tradiční hostinec v srdci Großramingu. Domácí kuchyně s rakouskými klasikami (Schnitzel, Tafelspitz), pivo Stiegl, pokoje nad restaurací.',
    amenities: ['WiFi zdarma', 'Snídaně', 'Úschovna kol', 'Restaurace', 'Centrum obce', 'Sauna'],
    website: 'https://www.kirchenwirt-grossraming.at/',
    pricePerPerson: '€ 63–67 / os. / noc se snídaní (DZ) · EZ +€ 16 · místní poplatek € 2,40',
  },
];
