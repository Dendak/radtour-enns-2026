import { useCallback, useEffect, useState } from 'react';
import type { Waypoint } from '@/data/trip';

export type WeatherPoint = {
  temp?: number;
  precip?: number;
  wind?: number;
  code?: number;
  error?: string;
};

export type WeatherState = {
  byWaypoint: WeatherPoint[];
  updatedAt: Date | null;
  loading: boolean;
  error: string | null;
};

const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';
const CACHE_KEY = 'ennsradweg-weather-v1';

type CacheShape = { byWaypoint: WeatherPoint[]; updatedAt: string };

function loadCache(): { byWaypoint: WeatherPoint[]; updatedAt: Date } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheShape;
    return { byWaypoint: parsed.byWaypoint, updatedAt: new Date(parsed.updatedAt) };
  } catch {
    return null;
  }
}

function saveCache(byWaypoint: WeatherPoint[], updatedAt: Date) {
  try {
    const data: CacheShape = { byWaypoint, updatedAt: updatedAt.toISOString() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // storage full / disabled — ignore
  }
}

function buildUrl(waypoints: Waypoint[]) {
  const lat = waypoints.map((w) => w.lat.toFixed(4)).join(',');
  const lon = waypoints.map((w) => w.lon.toFixed(4)).join(',');
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: 'temperature_2m,precipitation,weather_code,wind_speed_10m',
    timezone: 'Europe/Vienna',
    forecast_days: '16',
  });
  return `${OPEN_METEO}?${params.toString()}`;
}

function pickHour(
  iso: string,
  times: string[],
  temps: number[],
  precips: number[],
  codes: number[],
  winds: number[],
): WeatherPoint {
  const target = new Date(iso).getTime();
  let bestIdx = -1;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(new Date(times[i]).getTime() - target);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIdx = i;
    }
  }
  if (bestIdx < 0) return { error: 'no data' };
  return {
    temp: temps[bestIdx],
    precip: precips[bestIdx] ?? 0,
    wind: winds[bestIdx],
    code: codes[bestIdx],
  };
}

export function useWeather(waypoints: Waypoint[], refreshMs = 10 * 60 * 1000) {
  const [state, setState] = useState<WeatherState>(() => {
    const cached = loadCache();
    return cached
      ? { byWaypoint: cached.byWaypoint, updatedAt: cached.updatedAt, loading: false, error: null }
      : { byWaypoint: [], updatedAt: null, loading: false, error: null };
  });

  const fetchAll = useCallback(async () => {
    if (!waypoints.length) return;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch(buildUrl(waypoints));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const results: WeatherPoint[] = waypoints.map((w, i) => {
        const block = Array.isArray(data) ? data[i] : data;
        const hourly = block?.hourly;
        if (!hourly) return { error: 'no hourly' };
        return pickHour(
          w.time,
          hourly.time,
          hourly.temperature_2m,
          hourly.precipitation,
          hourly.weather_code,
          hourly.wind_speed_10m,
        );
      });
      const now = new Date();
      setState({ byWaypoint: results, updatedAt: now, loading: false, error: null });
      saveCache(results, now);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'fetch failed';
      setState((s) => ({ ...s, loading: false, error: msg }));
    }
  }, [waypoints]);

  useEffect(() => {
    fetchAll();
    const id = window.setInterval(fetchAll, refreshMs);
    return () => window.clearInterval(id);
  }, [fetchAll, refreshMs]);

  return { ...state, refresh: fetchAll };
}
