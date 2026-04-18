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

export const DAY_COLORS: Record<1 | 2 | 3, string> = {
  1: '#e11d48',
  2: '#f97316',
  3: '#14b8a6',
};
export const DONAU_COLOR = '#1d4ed8';

export const DAY_NAMES: Record<1 | 2 | 3, string> = {
  1: 'Den 1 — Pá 1. května',
  2: 'Den 2 — So 2. května',
  3: 'Den 3 — Ne 3. května',
};

export const WAYPOINTS: Waypoint[] = [
  { day: 1, dist: 0,   lat: 47.3853, lon: 13.4536, name: 'Radstadt (nádraží)', time: '2026-05-01T09:00', tag: 'Start' },
  { day: 1, dist: 20,  lat: 47.3950, lon: 13.6858, name: 'Schladming',         time: '2026-05-01T10:00', tag: 'Přestávka' },
  { day: 1, dist: 42,  lat: 47.4403, lon: 13.9067, name: 'Gröbming',           time: '2026-05-01T12:00', tag: 'Oběd' },
  { day: 1, dist: 60,  lat: 47.4944, lon: 14.1042, name: 'Irdning',            time: '2026-05-01T14:00', tag: 'Přestávka' },
  { day: 1, dist: 77,  lat: 47.5664, lon: 14.2406, name: 'Liezen',             time: '2026-05-01T15:30', tag: 'Nocleh 1' },
  { day: 2, dist: 77,  lat: 47.5664, lon: 14.2406, name: 'Liezen',             time: '2026-05-02T09:00', tag: 'Start' },
  { day: 2, dist: 99,  lat: 47.5749, lon: 14.4601, name: 'Klášter Admont',     time: '2026-05-02T10:30', tag: 'Přestávka' },
  { day: 2, dist: 118, lat: 47.5747, lon: 14.6200, name: 'Gesäuse',            time: '2026-05-02T12:00', tag: 'Zajímavost' },
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

export const STAYS = [
  {
    night: 'Nocleh 1 · Pá 1. května',
    name: 'EEE Hotel Liezen',
    loc: 'Liezen',
    tentative: true,
    mapsQuery: 'EEE Hotel Liezen',
    embedQuery: 'EEE Hotel Liezen',
  },
  {
    night: 'Nocleh 2 · So 2. května',
    name: 'Landgasthof Kirchenwirt',
    loc: 'Großraming',
    tentative: false,
    mapsQuery: 'Landgasthof Kirchenwirt Kirchenplatz 4 Großraming',
    embedQuery: 'Landgasthof Kirchenwirt, Kirchenplatz 4, 4463 Großraming, Österreich',
  },
] as const;
