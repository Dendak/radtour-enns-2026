import { useEffect, useMemo, useRef, useState } from 'react';
import { DAY_COLORS, type Waypoint, wmoText } from '@/data/trip';
import { dayForDist, pointAtDist, splitTrackByDay, type TrackPoint } from '@/hooks/useGpxTrack';
import type { WeatherPoint } from '@/hooks/useWeather';

export type ElevationProfileProps = {
  track: TrackPoint[];
  waypoints: Waypoint[];
  weather: WeatherPoint[];
  dayEnd: Record<1 | 2, number>;
  onHover: (point: { lat: number; lon: number; label: string } | null) => void;
  userLoc?: { distKm: number; accuracy: number } | null;
};

type HoverInfo = {
  x: number;
  canvasWidth: number;
  km: number;
  ele: number;
  time: string;
  wpName: string;
  weather: string;
  day: 1 | 2 | 3;
};

export function ElevationProfile({ track, waypoints, weather, dayEnd, onHover, userLoc }: ElevationProfileProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const hoverXRef = useRef<number | undefined>(undefined);
  const rafRef = useRef<number | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);

  const scheduleDraw = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  };

  const byDay = useMemo(() => splitTrackByDay(track, dayEnd), [track, dayEnd]);

  const stats = useMemo(() => {
    if (track.length < 2) return { up: 0, down: 0, min: 0, max: 0 };
    let up = 0, down = 0;
    let min = Infinity, max = -Infinity;
    for (let i = 1; i < track.length; i++) {
      const diff = track[i].ele - track[i - 1].ele;
      if (diff > 0) up += diff;
      else down -= diff;
    }
    for (const p of track) {
      if (p.ele < min) min = p.ele;
      if (p.ele > max) max = p.ele;
    }
    return { up: Math.round(up), down: Math.round(down), min: Math.round(min), max: Math.round(max) };
  }, [track]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || track.length < 2) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = rect.width, H = rect.height;
    ctx.clearRect(0, 0, W, H);

    const padL = 50, padR = 14, padT = 16, padB = 34;
    const innerLeft = padL, innerRight = W - padR;
    const innerTop = padT, innerBottom = H - padB;

    const eles = track.map((p) => p.ele);
    const rawMin = Math.min(...eles), rawMax = Math.max(...eles);
    const pad = Math.max(25, (rawMax - rawMin) * 0.08);
    const minE = Math.floor((rawMin - pad) / 50) * 50;
    const maxE = Math.ceil((rawMax + pad) / 50) * 50;
    const maxD = track[track.length - 1].dist;

    const xForDist = (d: number) => innerLeft + (d / maxD) * (innerRight - innerLeft);
    const yForEle = (e: number) => innerTop + (1 - (e - minE) / (maxE - minE)) * (innerBottom - innerTop);

    const bg = ctx.createLinearGradient(0, innerTop, 0, innerBottom);
    bg.addColorStop(0, 'rgba(14,165,233,0.08)');
    bg.addColorStop(1, 'rgba(14,165,233,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(innerLeft, innerTop, innerRight - innerLeft, innerBottom - innerTop);

    ctx.strokeStyle = 'rgba(15,23,42,0.04)'; ctx.lineWidth = 1;
    for (let e = minE; e <= maxE; e += 50) {
      const y = yForEle(e);
      ctx.beginPath(); ctx.moveTo(innerLeft, y); ctx.lineTo(innerRight, y); ctx.stroke();
    }
    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';
    for (let e = Math.ceil(minE / 200) * 200; e <= maxE; e += 200) {
      const y = yForEle(e);
      ctx.strokeStyle = 'rgba(15,23,42,0.10)';
      ctx.beginPath(); ctx.moveTo(innerLeft, y); ctx.lineTo(innerRight, y); ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${e} m`, innerLeft - 6, y);
    }

    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    const distMarks = new Set<number>([0, Math.round(maxD)]);
    for (let d = 50; d < maxD; d += 50) distMarks.add(d);
    distMarks.forEach((d) => {
      const x = xForDist(d);
      ctx.strokeStyle = 'rgba(15,23,42,0.12)';
      ctx.beginPath(); ctx.moveTo(x, innerBottom); ctx.lineTo(x, innerBottom + 3); ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.fillText(`${d} km`, x, innerBottom + 6);
    });

    for (const d of [1, 2, 3] as const) {
      const pts = byDay[d];
      if (!pts.length) continue;
      const color = DAY_COLORS[d];

      const fill = ctx.createLinearGradient(0, innerTop, 0, innerBottom);
      fill.addColorStop(0, color + '66');
      fill.addColorStop(0.7, color + '22');
      fill.addColorStop(1, color + '0a');
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(xForDist(pts[0].dist), yForEle(pts[0].ele));
      for (let i = 1; i < pts.length; i++) ctx.lineTo(xForDist(pts[i].dist), yForEle(pts[i].ele));
      ctx.lineTo(xForDist(pts[pts.length - 1].dist), innerBottom);
      ctx.lineTo(xForDist(pts[0].dist), innerBottom);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(xForDist(pts[0].dist), yForEle(pts[0].ele));
      for (let i = 1; i < pts.length; i++) ctx.lineTo(xForDist(pts[i].dist), yForEle(pts[i].ele));
      ctx.stroke();
    }

    [dayEnd[1], dayEnd[2]].forEach((d) => {
      const x = xForDist(d);
      ctx.strokeStyle = 'rgba(15,23,42,0.22)'; ctx.setLineDash([2, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, innerTop); ctx.lineTo(x, innerBottom); ctx.stroke();
      ctx.setLineDash([]);
    });

    waypoints.forEach((w) => {
      const x = xForDist(w.dist);
      const eleAtWp = pointAtDist(track, w.dist).ele;
      const yDot = yForEle(eleAtWp);
      ctx.strokeStyle = DAY_COLORS[w.day] + '55';
      ctx.setLineDash([1, 3]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, yDot); ctx.lineTo(x, innerBottom); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(x, yDot, 3.4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = DAY_COLORS[w.day]; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.arc(x, yDot, 3.4, 0, Math.PI * 2); ctx.stroke();
    });

    if (userLoc && userLoc.distKm >= 0 && userLoc.distKm <= maxD) {
      const x = xForDist(userLoc.distKm);
      const p = pointAtDist(track, userLoc.distKm);
      const yDot = yForEle(p.ele);
      ctx.strokeStyle = 'rgba(37,99,235,0.9)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(x, innerTop);
      ctx.lineTo(x, innerBottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(37,99,235,0.18)';
      ctx.beginPath(); ctx.arc(x, yDot, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#2563eb';
      ctx.beginPath(); ctx.arc(x, yDot, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, yDot, 5, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#2563eb';
      ctx.font = '600 11px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`Ty · km ${userLoc.distKm.toFixed(0)}`, x, yDot - 14);
    }

    const hoverX = hoverXRef.current;
    if (hoverX !== undefined) {
      ctx.strokeStyle = 'rgba(14,165,233,0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(hoverX, innerTop); ctx.lineTo(hoverX, innerBottom); ctx.stroke();
      ctx.setLineDash([]);
      const d = ((hoverX - innerLeft) / (innerRight - innerLeft)) * maxD;
      const p = pointAtDist(track, d);
      const day = dayForDist(d, dayEnd);
      const yDot = yForEle(p.ele);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(hoverX, yDot, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = DAY_COLORS[day]; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(hoverX, yDot, 5, 0, Math.PI * 2); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(15,23,42,0.15)'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(innerLeft, innerTop);
    ctx.lineTo(innerLeft, innerBottom);
    ctx.lineTo(innerRight, innerBottom);
    ctx.stroke();
  };

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track, waypoints, byDay, dayEnd, userLoc]);

  const timeForDist = (d: number): string => {
    let lo: Waypoint | null = null, hi: Waypoint | null = null;
    for (const w of waypoints) {
      if (w.dist <= d) lo = w;
      if (w.dist >= d && !hi) hi = w;
    }
    if (!lo) lo = waypoints[0];
    if (!hi) hi = waypoints[waypoints.length - 1];
    const f = hi.dist === lo.dist ? 0 : (d - lo.dist) / (hi.dist - lo.dist);
    const t = new Date(lo.time).getTime() + f * (new Date(hi.time).getTime() - new Date(lo.time).getTime());
    return new Date(t).toLocaleString('cs-CZ', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const onMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
    if (clientX === undefined) return;
    const x = clientX - rect.left;
    hoverXRef.current = x;
    scheduleDraw();
    const padL = 50, padR = 14;
    const innerLeft = padL, innerRight = rect.width - padR;
    const maxD = track.length ? track[track.length - 1].dist : 0;
    const d = ((x - innerLeft) / (innerRight - innerLeft)) * maxD;
    const p = pointAtDist(track, d);
    const day = dayForDist(d, dayEnd);
    // Nearest waypoint weather
    let nearWp = waypoints[0]; let nearIdx = 0; let best = Infinity;
    waypoints.forEach((w, i) => {
      const diff = Math.abs(w.dist - d);
      if (diff < best) { best = diff; nearWp = w; nearIdx = i; }
    });
    const wx = weather[nearIdx];
    const time = timeForDist(d);
    const wline = !wx ? 'Načítání počasí …'
      : wx.error ? 'předpověď nedostupná'
      : `${wmoText(wx.code)} · ${wx.temp?.toFixed(0)} °C · ${wx.precip?.toFixed(1)} mm · ${wx.wind?.toFixed(0)} km/h`;
    setHoverInfo({
      x,
      canvasWidth: rect.width,
      km: d,
      ele: Math.round(p.ele),
      time,
      wpName: nearWp.name,
      weather: wline,
      day,
    });
    onHover({ lat: p.lat, lon: p.lon, label: '' });
  };

  const onLeave = () => {
    hoverXRef.current = undefined;
    scheduleDraw();
    setHoverInfo(null);
    onHover(null);
  };

  return (
    <div className="p-4 md:p-5" ref={wrapRef}>
      <div className="flex items-end justify-between flex-wrap gap-2 mb-2">
        <div>
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">Profil</div>
          <div className="font-display text-lg font-bold text-ink">Výškový profil</div>
        </div>
        <div className="text-xs text-slate-500 flex gap-3">
          <span
            title={`Celkové stoupání za všechny 3 dny: ${stats.up} m převýšení`}
            className="cursor-help underline decoration-dotted decoration-slate-300 underline-offset-2">
            ↑ {stats.up} m
          </span>
          <span
            title={`Celkové klesání za všechny 3 dny: ${stats.down} m`}
            className="cursor-help underline decoration-dotted decoration-slate-300 underline-offset-2">
            ↓ {stats.down} m
          </span>
          <span
            title={`Nejnižší bod ${stats.min} m n. m. · nejvyšší bod ${stats.max} m n. m.`}
            className="cursor-help underline decoration-dotted decoration-slate-300 underline-offset-2">
            {stats.min}–{stats.max} m n. m.
          </span>
        </div>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onTouchMove={(e) => { onMove(e); e.preventDefault(); }}
          onTouchEnd={onLeave}
          className="w-full h-[320px] md:h-[360px] block rounded-xl bg-gradient-to-b from-white to-slate-50 shadow-inner"
          style={{ touchAction: 'none' }}
        />
        {hoverInfo && (
          <div
            className="absolute pointer-events-none rounded-lg bg-white/95 text-slate-800 text-[11px] leading-snug px-3 py-2 shadow-lg ring-1 ring-slate-200 backdrop-blur whitespace-nowrap"
            style={{
              left: Math.min(Math.max(hoverInfo.x, 90), hoverInfo.canvasWidth - 90),
              top: 8,
              transform: 'translateX(-50%)',
            }}>
            <div style={{ fontWeight: 700, color: DAY_COLORS[hoverInfo.day] }}>
              {hoverInfo.time} · km {hoverInfo.km.toFixed(0)} · {hoverInfo.ele} m n. m.
            </div>
            <div className="text-slate-600">{hoverInfo.wpName}</div>
            <div className="text-slate-500">{hoverInfo.weather}</div>
          </div>
        )}
      </div>
      <div className="text-xs text-slate-500 mt-2">Přejeďte myší po křivce — ukáže polohu na mapě a aktuální výšku, čas i počasí.</div>
    </div>
  );
}
