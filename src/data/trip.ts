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
  photos: string[];
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
  photoUrl?: string;
  /** Opening hours on the day of the trip — e.g. "Pá 1.5. (svátek): 11–22". */
  hours?: string;
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
      'Jedno z nejlépe dochovaných opevněných měst v Alpách. Tři obranné věže, 800 let staré náměstí. Krátká okruhová procházka před vyjetím.',
    mapsQuery: 'Hauptplatz Radstadt',
    photoUrl: wiki('Radstadt,_Hauptplatz.jpg'),
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
    tip: 'Otevřeno od 11:30, ideální brzká svačina.',
    mapsQuery: 'Brauhaus Falkenstein Pichl',
    website: 'https://www.falkenstein-braeu.at/',
    hours: 'Pá 1.5. (st. svátek): obvykle 11:30–22 · před cestou ověřit',
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Stiegenwirt Pichl',
    where: 'Pichl-Mandling',
    dist: 22,
    blurb:
      'Tradiční štýrský Gasthof na cyklostezce. Schnitzel, Backhendl, domácí strudel. Zahrada pro kola přímo u terasy.',
    tip: 'Polední menu cca € 12–15.',
    mapsQuery: 'Stiegenwirt Pichl Mandling',
    website: 'https://www.stiegenwirt.at/',
    hours: 'Pá 1.5. (st. svátek): obvykle 11–22 · ve svátek bývá plno, rezervovat',
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Landhotel Postgut Tweng / Hofwirt Gröbming',
    where: 'Gröbming',
    dist: 42,
    blurb:
      'Oběd v půlce dne — klasický rakouský Gasthof na hlavním náměstí. Denní menu, polévka + hlavní cca € 14.',
    tip: 'Na náměstí je i pekařství Strasser — chleba s Aufstrichem na cestu.',
    mapsQuery: 'Gasthof Hofwirt Gröbming',
    hours: 'Pá 1.5. (st. svátek): obvykle 11–21 · přes svátek zkrácené, telefon',
  },
  {
    day: 1,
    kind: 'kavárna',
    name: 'Café Konditorei Bäckerei Lukas',
    where: 'Liezen',
    dist: 77,
    blurb:
      'Stará cukrárna v centru Liezenu. Apfelstrudel, Sachr, espresso. Dobrý poslední refill před Admontem.',
    tip: 'Otevřeno 6–18, v neděli zavřeno.',
    mapsQuery: 'Konditorei Bäckerei Lukas Liezen',
    hours: 'Pá 1.5. (st. svátek): pravděpodobně ZAVŘENO · o svátku bývá zavřeno',
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Gasthof zum Hirschen Liezen',
    where: 'Liezen',
    dist: 77,
    blurb:
      'Rodinný Gasthof v centru Liezenu — rakouská klasika, velké porce, pivo Gösser. Kousek od Hauptplatzu, kola na dvoře.',
    tip: 'Hlavní pozdní oběd dne 1 — po 75. km ideální stop před posledním tahem do Admontu.',
    mapsQuery: 'Gasthof zum Hirschen Liezen',
    hours: 'Pá 1.5. (st. svátek): obvykle 11–22 · o svátku zkrácené, telefonem ověřit',
  },
  {
    day: 1,
    kind: 'gastro',
    name: 'Gasthof Kirchenwirt Admont',
    where: 'Admont · u kláštera',
    dist: 99,
    blurb:
      'Tradiční hostinec přímo vedle Stift Admont. Štýrská kuchyně, domácí Schnitzel, Bauerngröstl. Bezpečné parkování kol.',
    tip: 'Pozdní oběd / první pivo po příjezdu do cíle dne 1 (~17:00).',
    mapsQuery: 'Gasthof Kirchenwirt Admont',
    website: 'https://www.kirchenwirt-admont.at/',
    hours: 'Pá 1.5. (st. svátek): obvykle 11–23 · o svátku stabilně otevřeno',
  },
  {
    day: 1,
    kind: 'kultura',
    name: 'Stift Admont — benediktinské opatství',
    where: 'Admont (cíl dne)',
    dist: 99,
    blurb:
      'Největší klášterní knihovna na světě (70 000 svazků, 70 m dlouhá, strop od Altomonteho). Založena 1074. Muzeum přírody, moderní umění.',
    tip: 'Vstupné cca € 13,50. Unbedingt zajít — i zvenčí za fotku.',
    mapsQuery: 'Stift Admont Bibliothek',
    website: 'https://www.stiftadmont.at/',
    photoUrl: wiki('Stift_Admont_03.jpg'),
    hours: 'Pá 1.5.: 10–17 (poslední vstup 16:15) · sezona 18.3.–1.11.',
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
    photoUrl: wiki('Gesaeuseeingang.jpg'),
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
    name: 'Kölblwirt — Johnsbach im Gesäuse',
    where: 'Johnsbach (malá odbočka z Gstatterboden)',
    dist: 118,
    blurb:
      'Legendární horský Gasthof na okraji národního parku. Wildragout, domácí knedlíky, vlastní zvěřina. Terasa s výhledem na Hochtor.',
    tip: 'Odbočka ~4 km do kopce — pro fajnšmekry. Denní menu cca € 16.',
    mapsQuery: 'Kölblwirt Johnsbach',
    website: 'https://www.koelblwirt.at/',
    hours: 'So 2.5.: 11:30–21 · sobota standardně otevřeno',
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
    hours: 'So 2.5.: obvykle 11–22 · teplé jídlo do 21',
  },
  {
    day: 2,
    kind: 'gastro',
    name: 'Gasthof Kaiser von Österreich',
    where: 'Weyer',
    dist: 167,
    blurb:
      'Barokní hostinec přímo na náměstí Weyer. Forelle (pstruh) z Ennsu, domácí Schnitzel, zahrada.',
    tip: 'Pokud byl oběd v Altenmarktu, tady stačí káva + Apfelstrudel.',
    mapsQuery: 'Gasthof Kaiser von Österreich Weyer',
    website: 'https://www.kaiservonoesterreich.at/',
    hours: 'So 2.5.: 11–22 · ověřit, některé soboty zavřeno kvůli akcím',
  },
  {
    day: 2,
    kind: 'gastro',
    name: 'Gasthof Schober Großraming',
    where: 'Großraming · u nádraží',
    dist: 176,
    blurb:
      'Rodinný Gasthof blízko cíle dne 2. Hornorakouské Schnitzel, domácí guláš, Bauernkrapfen. Pokud náš Kirchenwirt bude plný, dobrá záloha.',
    tip: 'Pozdní oběd / první pivo po příjezdu na nocleh 2 (~17:00).',
    mapsQuery: 'Gasthof Schober Großraming',
    hours: 'So 2.5.: obvykle 11:30–22 · sobota večer rezervovat',
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
    photoUrl: wiki('Blick_ueber_die_Steyrer_Altstadt_29-06-2011.jpg'),
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Rahofer Bräu Steyr',
    where: 'Steyr · Stadtplatz',
    dist: 214,
    blurb:
      'Mikropivovar v historickém domě v centru Steyru. Vlastní piva, rustikální hornorakouská kuchyně, Grillteller, Ennstaler Forelle.',
    tip: 'Ideální oběd dne 3 — velké porce, přímo na trase.',
    mapsQuery: 'Rahofer Bräu Steyr Stadtplatz',
    website: 'https://www.rahofer.at/',
    hours: 'Ne 3.5.: 11–14 & 17–22 · teplá kuchyně do 21',
  },
  {
    day: 3,
    kind: 'kavárna',
    name: 'Café Werner — pravý Linzer Torte',
    where: 'Steyr',
    dist: 214,
    blurb:
      'Cukrárna v Steyru s nejstarší recepturou Linzer Torte v regionu. Tradiční mříž z mandlového těsta, rybízová marmeláda.',
    tip: 'Káva + dílek € 7.',
    mapsQuery: 'Café Werner Steyr',
    hours: 'Ne 3.5.: 8–18 · v neděli otevřeno (pondělí běžně zavřeno)',
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Stadtwirt Enns',
    where: 'Enns · Hauptplatz',
    dist: 239,
    blurb:
      'Hornorakouský hostinec na hlavním náměstí pod Stadtturmem. Svíčková, Schnitzel, Knödel. Rychlá zastávka s parkováním kol.',
    tip: 'Pokud je Steyr už za tebou, tady jen káva a malé jídlo.',
    mapsQuery: 'Stadtwirt Enns Hauptplatz',
    hours: 'Ne 3.5.: 10–22 · v neděli otevřeno',
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Donauhof Mauthausen',
    where: 'Mauthausen · u přívozu',
    dist: 243,
    blurb:
      'Hostinec přímo u Dunaje na Donauradwegu, po odbočce 2 km z Ennsu. Rybí speciality (Saibling, Forelle), terasa s výhledem na řeku.',
    tip: 'Po památníku Mauthausen — pozdní oběd nebo velká svačina před finálním tahem do Lince.',
    mapsQuery: 'Donauhof Mauthausen',
    hours: 'Ne 3.5.: obvykle 11–21 · v neděli otevřeno, teplá kuchyně do 20',
  },
  {
    day: 3,
    kind: 'gastro',
    name: 'Brückenwirt Steyregg',
    where: 'Steyregg · u mostu na Linec',
    dist: 255,
    blurb:
      'Klasický hornorakouský Gasthof na pravém břehu Dunaje, poslední zastávka před Lincem. Bauernkrapfen, palačinky, velký výběr piv.',
    tip: 'Perfektní finální pivo / kafe 8 km před cílem, pokud zbývá čas do vlaku.',
    mapsQuery: 'Brückenwirt Steyregg Donau',
    hours: 'Ne 3.5.: obvykle 11–22 · v neděli ověřit',
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
    hours: 'Ne 3.5.: 9–17:30 (poslední vstup 16:45) · muzeum od 10',
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
    ],
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
    photos: [
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/2019/12/Kirchenwirt-013-1900x500.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/hausansicht1-600x400.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/Kirchenwirt-118-600x399.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/Kirchenwirt-133-600x459.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/Kirchenwirt-044-600x399.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/dsc1921-kopie.jpg',
      'https://www.kirchenwirt-grossraming.at/wp/wp-content/uploads/kirchenwirt-grossraming-zi_10.jpg',
    ],
    photoCredit: 'kirchenwirt-grossraming.at',
    description:
      'Tradiční hostinec v srdci Großramingu. Domácí kuchyně s rakouskými klasikami (Schnitzel, Tafelspitz), pivo Stiegl, pokoje nad restaurací.',
    amenities: ['WiFi zdarma', 'Snídaně', 'Úschovna kol', 'Restaurace', 'Centrum obce', 'Sauna'],
    website: 'https://www.kirchenwirt-grossraming.at/',
    pricePerPerson: '€ 67 / os. / noc se snídaní · + místní poplatek € 2,40',
  },
];
