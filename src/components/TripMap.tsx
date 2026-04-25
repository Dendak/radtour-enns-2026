import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  LayersControl,
  LayerGroup,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import type { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { DAY_COLORS, DAY_NAMES, DONAU_COLOR, STAYS, wmoText, type Waypoint } from '@/data/trip';
import { splitTrackByDay, type TrackPoint } from '@/hooks/useGpxTrack';
import type { WeatherPoint } from '@/hooks/useWeather';
import { useHover } from '@/hooks/useHoverStore';
import { cn } from '@/lib/utils';
import { Layers, LocateFixed, LocateOff } from 'lucide-react';

function FitBounds({
  bounds,
  animate = true,
}: {
  bounds: LatLngBoundsExpression | null;
  animate?: boolean;
}) {
  const map = useMap();
  useEffect(() => {
    if (!bounds) return;
    map.flyToBounds(bounds, {
      padding: [40, 40],
      animate,
      duration: 0.9,
      easeLinearity: 0.25,
    });
  }, [bounds, map, animate]);
  return null;
}

export type UserLocation = {
  lat: number;
  lon: number;
  accuracy: number;
  distKm: number;
};

function nearestDistKm(track: TrackPoint[], lat: number, lon: number): number {
  if (!track.length) return 0;
  const cosLat = Math.cos((lat * Math.PI) / 180);
  let best = Infinity;
  let bestIdx = 0;
  for (let i = 0; i < track.length; i++) {
    const dx = (track[i].lon - lon) * cosLat;
    const dy = track[i].lat - lat;
    const d2 = dx * dx + dy * dy;
    if (d2 < best) {
      best = d2;
      bestIdx = i;
    }
  }
  return track[bestIdx].dist;
}

function LocateLayer({
  active,
  track,
  onLocate,
  onStop,
}: {
  active: boolean;
  track: TrackPoint[];
  onLocate: (loc: UserLocation) => void;
  onStop: (reason?: string) => void;
}) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const firstFixRef = useRef<boolean>(true);

  useEffect(() => {
    if (!active) {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (circleRef.current) {
        circleRef.current.remove();
        circleRef.current = null;
      }
      map.stopLocate();
      firstFixRef.current = true;
      return;
    }

    const onFound = (e: L.LocationEvent) => {
      const { lat, lng } = e.latlng;
      const acc = e.accuracy;
      const icon = L.divIcon({
        className: 'user-loc',
        html:
          '<div style="width:16px;height:16px;border-radius:999px;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 3px rgba(37,99,235,.28)"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      if (!markerRef.current) {
        markerRef.current = L.marker([lat, lng], { icon, interactive: false, keyboard: false }).addTo(map);
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }
      if (!circleRef.current) {
        circleRef.current = L.circle([lat, lng], {
          radius: acc,
          color: '#2563eb',
          weight: 1,
          fillColor: '#2563eb',
          fillOpacity: 0.08,
          interactive: false,
        }).addTo(map);
      } else {
        circleRef.current.setLatLng([lat, lng]);
        circleRef.current.setRadius(acc);
      }
      if (firstFixRef.current) {
        firstFixRef.current = false;
        map.flyTo([lat, lng], Math.max(map.getZoom(), 13), { duration: 0.6 });
      }
      onLocate({ lat, lon: lng, accuracy: acc, distKm: nearestDistKm(track, lat, lng) });
    };

    const onError = (e: L.ErrorEvent) => {
      onStop(e.message || 'Geolokace nedostupná');
    };

    map.on('locationfound', onFound);
    map.on('locationerror', onError);
    map.locate({ watch: true, enableHighAccuracy: true, setView: false });

    return () => {
      map.off('locationfound', onFound);
      map.off('locationerror', onError);
      map.stopLocate();
    };
  }, [active, map, track, onLocate, onStop]);

  return null;
}

function HoverMarkerLayer() {
  const map = useMap();
  const hover = useHover();
  const markerRef = useRef<L.Marker | null>(null);
  useEffect(() => {
    if (!hover) {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      return;
    }
    const icon = L.divIcon({
      className: 'hover-cursor',
      html: '<div style="width:14px;height:14px;border-radius:999px;background:#fff;border:3px solid #0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,.25)"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    if (!markerRef.current) {
      markerRef.current = L.marker([hover.lat, hover.lon], { icon, interactive: false, keyboard: false }).addTo(map);
    } else {
      markerRef.current.setLatLng([hover.lat, hover.lon]);
    }
  }, [hover, map]);
  return null;
}

function stayIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: 'stay-pin',
    html: `
      <div style="position:relative;width:36px;height:44px;filter:drop-shadow(0 4px 6px rgba(15,23,42,0.35));">
        <div style="
          position:absolute;left:0;right:0;top:0;height:36px;
          background:${color};
          border:3px solid #fff;
          border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;
          display:flex;align-items:center;justify-content:center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
          </svg>
        </div>
        <div style="
          position:absolute;left:50%;bottom:0;transform:translateX(-50%);
          width:0;height:0;
          border-left:7px solid transparent;border-right:7px solid transparent;
          border-top:10px solid ${color};"></div>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -38],
  });
}

export type TripMapProps = {
  track: TrackPoint[];
  waypoints: Waypoint[];
  dayEnd: Record<1 | 2, number>;
  donauStart: number;
  weather: WeatherPoint[];
  onLocate: (loc: UserLocation | null) => void;
};

function TripMapInner({ track, waypoints, dayEnd, donauStart, weather, onLocate }: TripMapProps) {
  // null = celá trasa. 1|2|3 = vybraná etapa (mapa přiblíží na ni).
  const [focusDay, setFocusDay] = useState<1 | 2 | 3 | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);

  const handleLocationFound = useCallback(
    (loc: UserLocation) => {
      setLocError(null);
      onLocate(loc);
    },
    [onLocate],
  );
  const handleLocationStop = useCallback(
    (reason?: string) => {
      if (reason) setLocError(reason);
      setLocating(false);
      onLocate(null);
    },
    [onLocate],
  );

  const byDay = useMemo(() => splitTrackByDay(track, dayEnd), [track, dayEnd]);
  const totalKm = useMemo(() => (track.length ? track[track.length - 1].dist : 0), [track]);
  const dayKm = useMemo<Record<1 | 2 | 3, number>>(() => {
    const km = (d: 1 | 2 | 3) => {
      const pts = byDay[d];
      if (!pts || pts.length < 2) return 0;
      return pts[pts.length - 1].dist - pts[0].dist;
    };
    return { 1: km(1), 2: km(2), 3: km(3) };
  }, [byDay]);
  const fullBounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (!track.length) return null;
    return L.latLngBounds(track.map((p) => [p.lat, p.lon] as LatLngTuple));
  }, [track]);
  const dayBounds = useMemo<Record<1 | 2 | 3, LatLngBoundsExpression | null>>(() => {
    const mk = (d: 1 | 2 | 3): LatLngBoundsExpression | null => {
      const pts = byDay[d];
      if (!pts?.length) return null;
      return L.latLngBounds(pts.map((p) => [p.lat, p.lon] as LatLngTuple));
    };
    return { 1: mk(1), 2: mk(2), 3: mk(3) };
  }, [byDay]);

  const activeBounds = focusDay ? dayBounds[focusDay] : fullBounds;

  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleString('cs-CZ', { weekday: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-3 md:p-4 bg-slate-50/60 border-b border-slate-200/70">
        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium mr-1">
          <Layers className="h-3.5 w-3.5" /> Etapa:
        </div>
        <button
          onClick={() => setFocusDay(null)}
          className={cn(
            'chip cursor-pointer select-none border transition',
            focusDay === null
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
          )}>
          Celá trasa
          {totalKm > 0 && (
            <span className={cn('ml-1 text-[11px]', focusDay === null ? 'text-white/70' : 'text-slate-400')}>
              · {totalKm.toFixed(0)} km
            </span>
          )}
        </button>
        {[1, 2, 3].map((d) => {
          const day = d as 1 | 2 | 3;
          const active = focusDay === day;
          return (
            <button
              key={d}
              onClick={() => setFocusDay(active ? null : day)}
              className={cn(
                'chip cursor-pointer select-none border transition',
                active ? 'shadow-sm ring-2' : 'bg-white border-slate-200 hover:bg-slate-50',
              )}
              style={{
                color: DAY_COLORS[day],
                background: active ? `${DAY_COLORS[day]}15` : undefined,
                borderColor: active ? DAY_COLORS[day] : undefined,
                boxShadow: active ? `0 0 0 2px ${DAY_COLORS[day]}40` : undefined,
              }}
              title={active ? 'Zpět na celou trasu' : `Přiblížit na ${DAY_NAMES[day]} (${dayKm[day].toFixed(0)} km)`}>
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: DAY_COLORS[day] }} />
              {DAY_NAMES[day]}
              {dayKm[day] > 0 && (
                <span className="ml-1 text-[11px] opacity-70">· {dayKm[day].toFixed(0)} km</span>
              )}
            </button>
          );
        })}
        <button
          onClick={() => {
            if (locating) {
              setLocating(false);
              onLocate(null);
            } else {
              setLocError(null);
              setLocating(true);
            }
          }}
          className={cn(
            'chip cursor-pointer select-none border transition ml-auto',
            locating
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50',
          )}
          title={locating ? 'Vypnout sledování polohy' : 'Zjistit moji polohu'}>
          {locating ? <LocateFixed className="h-3.5 w-3.5" /> : <LocateOff className="h-3.5 w-3.5" />}
          Moje poloha
        </button>
      </div>
      {locError && (
        <div className="px-3 md:px-4 py-2 text-xs bg-rose-50 text-rose-800 border-b border-rose-200">
          Polohu se nepodařilo zjistit ({locError}). Zkontroluj oprávnění v prohlížeči.
        </div>
      )}
      <div className="relative">
        <MapContainer
          style={{ height: 520, width: '100%' }}
          scrollWheelZoom
          center={[47.8, 14.0]}
          zoom={9}
          className="z-0">
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="CyclOSM">
              <TileLayer
                url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
                subdomains={['a', 'b', 'c']}
                maxZoom={18}
                attribution='© <a href="https://www.cyclosm.org">CyclOSM</a> · © OpenStreetMap'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
                attribution="© OpenStreetMap"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenTopoMap">
              <TileLayer
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                maxZoom={17}
                attribution="© OpenTopoMap (CC-BY-SA)"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {([1, 2, 3] as const).map((d) => {
            const pts = byDay[d];
            if (!pts.length) return null;
            const color = DAY_COLORS[d];
            const dimmed = focusDay !== null && focusDay !== d;
            const weight = dimmed ? 3 : 5;
            const opacity = dimmed ? 0.3 : 0.9;
            if (d === 3) {
              const main = pts.filter((p) => p.dist <= donauStart).map((p) => [p.lat, p.lon] as LatLngTuple);
              const donau = pts.filter((p) => p.dist >= donauStart).map((p) => [p.lat, p.lon] as LatLngTuple);
              return (
                <LayerGroup key={d}>
                  {main.length > 0 && <Polyline positions={main} pathOptions={{ color, weight, opacity }} />}
                  {donau.length > 0 && (
                    <Polyline positions={donau} pathOptions={{ color: DONAU_COLOR, weight, opacity, dashArray: '8 6' }} />
                  )}
                </LayerGroup>
              );
            }
            return (
              <Polyline
                key={d}
                positions={pts.map((p) => [p.lat, p.lon] as LatLngTuple)}
                pathOptions={{ color, weight, opacity }}
              />
            );
          })}

          {waypoints.map((w, i) => {
            const dimmed = focusDay !== null && focusDay !== w.day;
            const wx = weather[i];
            const stay = w.tag === 'Nocleh 1' ? STAYS[0] : w.tag === 'Nocleh 2' ? STAYS[1] : null;
            if (stay) {
              return (
                <Marker
                  key={i}
                  position={[w.lat, w.lon]}
                  icon={stayIcon(DAY_COLORS[w.day])}
                  opacity={dimmed ? 0.4 : 1}
                  zIndexOffset={dimmed ? 200 : 1000}>
                  <Popup>
                    <div className="min-w-[200px]">
                      <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-amber-700">
                        {stay.tentative ? 'Nocleh · předběžně' : 'Nocleh'}
                      </div>
                      <div className="text-base font-bold text-slate-900 mt-0.5">{stay.name}</div>
                      <div className="text-xs text-slate-500 mb-2">{stay.loc} · km {w.dist.toFixed(0)}</div>
                      {wx && !wx.error && (
                        <div className="grid grid-cols-2 gap-y-0.5 text-xs mb-2 pb-2 border-b border-slate-200">
                          <span className="text-slate-500">Příjezd</span><b>{fmtTime(w.time)}</b>
                          <span className="text-slate-500">Počasí</span><b>{wmoText(wx.code)}</b>
                          <span className="text-slate-500">Teplota</span><b>{wx.temp?.toFixed(1)} °C</b>
                        </div>
                      )}
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stay.mapsQuery)}`}
                        target="_blank" rel="noopener"
                        className="inline-block text-xs font-semibold text-slate-700 hover:text-slate-900">
                        Otevřít v Google Maps ↗
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            }
            return (
              <CircleMarker
                key={i}
                center={[w.lat, w.lon]}
                radius={dimmed ? 4 : 7}
                pathOptions={{
                  color: DAY_COLORS[w.day],
                  weight: 2,
                  fillColor: '#fff',
                  fillOpacity: dimmed ? 0.6 : 1,
                  opacity: dimmed ? 0.5 : 1,
                }}>
                <Popup>
                  <div className="min-w-[170px]">
                    <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">{w.tag}</div>
                    <div className="text-base font-semibold text-slate-900">{w.name}</div>
                    <div className="text-xs text-slate-500 mb-2">{fmtTime(w.time)} · km {w.dist.toFixed(0)}</div>
                    {!wx ? (
                      <div className="text-sm italic text-slate-400">Načítání počasí …</div>
                    ) : wx.error ? (
                      <div className="text-sm italic text-slate-400">Předpověď není dostupná</div>
                    ) : (
                      <div className="grid grid-cols-2 gap-y-0.5 text-xs">
                        <span className="text-slate-500">Stav</span><b>{wmoText(wx.code)}</b>
                        <span className="text-slate-500">Teplota</span><b>{wx.temp?.toFixed(1)} °C</b>
                        <span className="text-slate-500">Srážky</span><b>{wx.precip?.toFixed(1)} mm</b>
                        <span className="text-slate-500">Vítr</span><b>{wx.wind?.toFixed(0)} km/h</b>
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          <FitBounds bounds={activeBounds} />
          <HoverMarkerLayer />
          <LocateLayer
            active={locating}
            track={track}
            onLocate={handleLocationFound}
            onStop={handleLocationStop}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export const TripMap = memo(TripMapInner);
