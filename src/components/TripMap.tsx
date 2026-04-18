import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  LayersControl,
  LayerGroup,
  Popup,
  useMap,
} from 'react-leaflet';
import type { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import L from 'leaflet';
import { DAY_COLORS, DAY_NAMES, DONAU_COLOR, wmoText, type Waypoint } from '@/data/trip';
import { splitTrackByDay, type TrackPoint } from '@/hooks/useGpxTrack';
import type { WeatherPoint } from '@/hooks/useWeather';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

function FitBounds({ bounds }: { bounds: LatLngBoundsExpression | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [30, 30] });
  }, [bounds, map]);
  return null;
}

function HoverMarkerLayer({ hover }: { hover: { lat: number; lon: number; label: string } | null }) {
  const map = useMap();
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
      markerRef.current.bindTooltip('', {
        permanent: true, direction: 'top', offset: [0, -12], opacity: 1,
        className: 'hover-weather-tooltip',
      });
    } else {
      markerRef.current.setLatLng([hover.lat, hover.lon]);
    }
    markerRef.current.getTooltip()?.setContent(hover.label);
  }, [hover, map]);
  return null;
}

export type TripMapProps = {
  track: TrackPoint[];
  waypoints: Waypoint[];
  dayEnd: Record<1 | 2, number>;
  donauStart: number;
  weather: WeatherPoint[];
  hover: { lat: number; lon: number; label: string } | null;
};

export function TripMap({ track, waypoints, dayEnd, donauStart, weather, hover }: TripMapProps) {
  const [visibleDays, setVisibleDays] = useState<Record<1 | 2 | 3, boolean>>({ 1: true, 2: true, 3: true });

  const byDay = useMemo(() => splitTrackByDay(track, dayEnd), [track, dayEnd]);
  const bounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (!track.length) return null;
    const pts: LatLngTuple[] = track.map((p) => [p.lat, p.lon]);
    return L.latLngBounds(pts);
  }, [track]);

  const toggleDay = (d: 1 | 2 | 3) => setVisibleDays((v) => ({ ...v, [d]: !v[d] }));

  const fmtTime = (iso: string) =>
    new Date(iso).toLocaleString('cs-CZ', { weekday: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-3 md:p-4 bg-slate-50/60 border-b border-slate-200/70">
        <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium mr-1">
          <Layers className="h-3.5 w-3.5" /> Dny:
        </div>
        {[1, 2, 3].map((d) => (
          <button
            key={d}
            onClick={() => toggleDay(d as 1 | 2 | 3)}
            className={cn(
              'chip cursor-pointer select-none border transition',
              visibleDays[d as 1 | 2 | 3]
                ? 'bg-white border-slate-200 shadow-sm'
                : 'bg-slate-100 border-slate-200/50 opacity-50 line-through',
            )}
            style={{ color: DAY_COLORS[d as 1 | 2 | 3] }}>
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: DAY_COLORS[d as 1 | 2 | 3] }} />
            {DAY_NAMES[d as 1 | 2 | 3]}
          </button>
        ))}
      </div>
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
            if (!visibleDays[d]) return null;
            const pts = byDay[d];
            if (!pts.length) return null;
            const color = DAY_COLORS[d];
            if (d === 3) {
              const main = pts.filter((p) => p.dist <= donauStart).map((p) => [p.lat, p.lon] as LatLngTuple);
              const donau = pts.filter((p) => p.dist >= donauStart).map((p) => [p.lat, p.lon] as LatLngTuple);
              return (
                <LayerGroup key={d}>
                  {main.length > 0 && <Polyline positions={main} pathOptions={{ color, weight: 5, opacity: 0.9 }} />}
                  {donau.length > 0 && (
                    <Polyline positions={donau} pathOptions={{ color: DONAU_COLOR, weight: 5, opacity: 0.9, dashArray: '8 6' }} />
                  )}
                </LayerGroup>
              );
            }
            return (
              <Polyline
                key={d}
                positions={pts.map((p) => [p.lat, p.lon] as LatLngTuple)}
                pathOptions={{ color, weight: 5, opacity: 0.9 }}
              />
            );
          })}

          {waypoints.map((w, i) => {
            if (!visibleDays[w.day]) return null;
            const wx = weather[i];
            return (
              <CircleMarker
                key={i}
                center={[w.lat, w.lon]}
                radius={7}
                pathOptions={{ color: DAY_COLORS[w.day], weight: 2, fillColor: '#fff', fillOpacity: 1 }}>
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

          <FitBounds bounds={bounds} />
          <HoverMarkerLayer hover={hover} />
        </MapContainer>
      </div>
      <style>{`
        .hover-weather-tooltip {
          background: rgba(15, 23, 42, 0.92);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 6px 10px;
          font-size: 12px;
          box-shadow: 0 10px 20px -8px rgba(0,0,0,.35);
        }
        .hover-weather-tooltip::before { display: none; }
      `}</style>
    </div>
  );
}
