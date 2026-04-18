import { useEffect, useMemo, useState } from 'react';
import { haversineKm } from '@/lib/utils';
import { WAYPOINTS, type Waypoint } from '@/data/trip';

export type TrackPoint = { lat: number; lon: number; ele: number; dist: number };

export type TrackData = {
  track: TrackPoint[];
  waypoints: Waypoint[];
  dayEnd: Record<1 | 2, number>;
  donauStart: number;
  totalKm: number;
  loaded: boolean;
};

const DEFAULT: TrackData = {
  track: [],
  waypoints: WAYPOINTS,
  dayEnd: { 1: 77, 2: 176 },
  donauStart: 239,
  totalKm: 263,
  loaded: false,
};

async function fetchGpx(url: string): Promise<TrackPoint[] | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'text/xml');
    const pts: TrackPoint[] = [];
    let cum = 0;
    let prev: { lat: number; lon: number } | null = null;
    xml.querySelectorAll('trkpt').forEach((tp) => {
      const lat = parseFloat(tp.getAttribute('lat') || '0');
      const lon = parseFloat(tp.getAttribute('lon') || '0');
      const eleEl = tp.querySelector('ele');
      const ele = eleEl ? parseFloat(eleEl.textContent || '0') : 0;
      if (prev) cum += haversineKm(prev, { lat, lon });
      pts.push({ lat, lon, ele, dist: cum });
      prev = { lat, lon };
    });
    return pts.length >= 2 ? pts : null;
  } catch {
    return null;
  }
}

function synthesizeTrack(): TrackPoint[] {
  const WP_ELEV: Record<string, number> = {
    'Radstadt (nádraží)': 856, 'Schladming': 745, 'Gröbming': 768, 'Irdning': 640, 'Liezen': 659,
    'Klášter Admont': 638, 'Gesäuse': 580, 'Hieflau': 498, 'Großreifling': 480,
    'Altenmarkt u St. Gallen': 490, 'Weyer': 420, 'Großraming': 347,
    'Reichraming': 345, 'Losenstein': 329, 'Steyr': 311, 'Enns': 281,
    'Mauthausen': 250, 'Steyregg': 249, 'Linec hlavní nádraží': 266,
  };
  const unique: Waypoint[] = [];
  for (const w of WAYPOINTS) {
    if (!unique.length || unique[unique.length - 1].dist !== w.dist) unique.push(w);
  }
  const pts: TrackPoint[] = [];
  for (let i = 0; i < unique.length - 1; i++) {
    const a = unique[i], b = unique[i + 1];
    const segKm = b.dist - a.dist;
    const steps = Math.max(2, Math.round(segKm * 20));
    const aEle = WP_ELEV[a.name] ?? 400;
    const bEle = WP_ELEV[b.name] ?? 400;
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const ease = t * t * (3 - 2 * t);
      pts.push({
        lat: a.lat + (b.lat - a.lat) * t,
        lon: a.lon + (b.lon - a.lon) * t,
        ele: aEle + (bEle - aEle) * ease,
        dist: a.dist + segKm * t,
      });
    }
  }
  const last = unique[unique.length - 1];
  pts.push({ lat: last.lat, lon: last.lon, ele: WP_ELEV[last.name] ?? 280, dist: last.dist });
  return pts;
}

function snapWaypoints(track: TrackPoint[]): {
  waypoints: Waypoint[];
  dayEnd: Record<1 | 2, number>;
  donauStart: number;
} {
  const snapped: Waypoint[] = WAYPOINTS.map((w) => {
    let best: TrackPoint | null = null;
    let bestD = Infinity;
    for (const p of track) {
      const dLat = p.lat - w.lat;
      const dLon = p.lon - w.lon;
      const d = dLat * dLat + dLon * dLon;
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best ? { ...w, lat: best.lat, lon: best.lon, dist: best.dist } : w;
  });
  const n1 = snapped.find((w) => w.day === 1 && w.tag === 'Nocleh 1');
  const n2 = snapped.find((w) => w.day === 2 && w.tag === 'Nocleh 2');
  const enns = snapped.find((w) => w.name === 'Enns');
  const dayEnd = { 1: n1?.dist ?? 77, 2: n2?.dist ?? 176 };
  const donauStart = enns?.dist ?? 239;
  snapped.forEach((w) => {
    if (w.day === 2 && w.tag === 'Start') w.dist = dayEnd[1];
    if (w.day === 3 && w.tag === 'Start') w.dist = dayEnd[2];
  });
  return { waypoints: snapped, dayEnd, donauStart };
}

export function useGpxTrack(url: string) {
  const [data, setData] = useState<TrackData>(DEFAULT);

  useEffect(() => {
    let alive = true;
    (async () => {
      let track = await fetchGpx(url);
      const fromGpx = !!track;
      if (!track) track = synthesizeTrack();
      const snap = fromGpx ? snapWaypoints(track) : {
        waypoints: WAYPOINTS,
        dayEnd: { 1: 77, 2: 176 } as Record<1 | 2, number>,
        donauStart: 239,
      };
      if (alive) {
        setData({
          track,
          waypoints: snap.waypoints,
          dayEnd: snap.dayEnd,
          donauStart: snap.donauStart,
          totalKm: track[track.length - 1].dist,
          loaded: true,
        });
      }
    })();
    return () => {
      alive = false;
    };
  }, [url]);

  return data;
}

export function splitTrackByDay(track: TrackPoint[], dayEnd: Record<1 | 2, number>) {
  return {
    1: track.filter((p) => p.dist <= dayEnd[1] + 0.01),
    2: track.filter((p) => p.dist >= dayEnd[1] - 0.01 && p.dist <= dayEnd[2] + 0.01),
    3: track.filter((p) => p.dist >= dayEnd[2] - 0.01),
  } as const;
}

export function dayForDist(d: number, dayEnd: Record<1 | 2, number>): 1 | 2 | 3 {
  return d <= dayEnd[1] ? 1 : d <= dayEnd[2] ? 2 : 3;
}

export function pointAtDist(track: TrackPoint[], d: number): TrackPoint {
  if (!track.length) return { lat: 0, lon: 0, ele: 0, dist: 0 };
  let lo = 0, hi = track.length - 1;
  while (lo < hi - 1) {
    const m = (lo + hi) >> 1;
    if (track[m].dist < d) lo = m;
    else hi = m;
  }
  const a = track[lo], b = track[hi];
  const f = (d - a.dist) / Math.max(0.0001, b.dist - a.dist);
  return {
    lat: a.lat + (b.lat - a.lat) * f,
    lon: a.lon + (b.lon - a.lon) * f,
    ele: a.ele + (b.ele - a.ele) * f,
    dist: d,
  };
}

// Helper for components that need memoized day split
export function useDaySplit(track: TrackPoint[], dayEnd: Record<1 | 2, number>) {
  return useMemo(() => splitTrackByDay(track, dayEnd), [track, dayEnd]);
}
