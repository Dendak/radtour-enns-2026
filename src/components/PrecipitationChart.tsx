import { useEffect, useRef } from 'react';
import { DAY_COLORS, type Waypoint } from '@/data/trip';
import { dayForDist } from '@/hooks/useGpxTrack';
import type { WeatherPoint } from '@/hooks/useWeather';

export function PrecipitationChart({ waypoints, weather, dayEnd }: {
  waypoints: Waypoint[];
  weather: WeatherPoint[];
  dayEnd: Record<1 | 2, number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = rect.width, H = rect.height;
    ctx.clearRect(0, 0, W, H);

    const padL = 38, padR = 10, padT = 14, padB = 36;
    const innerW = W - padL - padR, innerH = H - padT - padB;

    const mms = waypoints.map((_, i) => {
      const wx = weather[i];
      return wx && !wx.error ? (wx.precip ?? 0) : 0;
    });
    const maxMm = Math.max(1, ...mms);

    ctx.font = '10px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const v = maxMm * (i / steps);
      const y = padT + innerH - (v / maxMm) * innerH;
      ctx.strokeStyle = '#e5e7eb';
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText(v.toFixed(1), padL - 4, y);
    }

    const bw = Math.max(4, (innerW / waypoints.length) * 0.6);
    waypoints.forEach((w, i) => {
      const x = padL + (i + 0.5) * (innerW / waypoints.length);
      const mm = mms[i];
      const day = dayForDist(w.dist, dayEnd);
      const color = DAY_COLORS[day];
      const y = padT + innerH - (mm / maxMm) * innerH;
      ctx.fillStyle = color;
      ctx.globalAlpha = mm > 0 ? 0.85 : 0.2;
      ctx.fillRect(x - bw / 2, y, bw, padT + innerH - y);
      ctx.globalAlpha = 1;
      if (mm > 0) {
        ctx.fillStyle = '#0f172a'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(mm.toFixed(1), x, y - 2);
      }
    });

    ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, padT + innerH); ctx.lineTo(W - padR, padT + innerH); ctx.stroke();

    ctx.fillStyle = '#64748b'; ctx.font = '9px Inter, system-ui, sans-serif'; ctx.textBaseline = 'top';
    waypoints.forEach((w, i) => {
      const x = padL + (i + 0.5) * (innerW / waypoints.length);
      ctx.save();
      ctx.translate(x, padT + innerH + 4);
      ctx.rotate(-Math.PI / 6);
      ctx.textAlign = 'right';
      ctx.fillText(w.name.length > 13 ? w.name.slice(0, 12) + '…' : w.name, 0, 0);
      ctx.restore();
    });
  };

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoints, weather, dayEnd]);

  return (
    <div className="p-4 md:p-5 border-t border-slate-200/70">
      <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">Srážky</div>
      <div className="font-display text-lg font-bold text-ink mb-2">Předpověď srážek (mm/h)</div>
      <canvas ref={canvasRef} className="w-full h-[180px] block" />
    </div>
  );
}
