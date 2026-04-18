import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Thermometer, MapPin, Clock, RefreshCw } from 'lucide-react';
import { DAY_COLORS, DAY_NAMES, wmoText, type Waypoint } from '@/data/trip';
import type { WeatherPoint } from '@/hooks/useWeather';
import { cn } from '@/lib/utils';

function wmoIcon(code: number | undefined) {
  if (code === undefined) return <Cloud className="h-5 w-5" />;
  if ([0, 1].includes(code)) return <Sun className="h-5 w-5 text-amber-500" />;
  if ([2, 3, 45, 48].includes(code)) return <Cloud className="h-5 w-5 text-slate-500" />;
  if (code >= 71 && code <= 77) return <CloudSnow className="h-5 w-5 text-sky-400" />;
  if (code >= 80 || (code >= 51 && code <= 67)) return <CloudRain className="h-5 w-5 text-sky-600" />;
  if (code >= 95) return <CloudRain className="h-5 w-5 text-purple-600" />;
  return <Cloud className="h-5 w-5" />;
}

export function WeatherDays({
  waypoints, weather, updatedAt, loading, onRefresh,
}: {
  waypoints: Waypoint[];
  weather: WeatherPoint[];
  updatedAt: Date | null;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <section className="mt-10 md:mt-14">
      <div className="flex items-end justify-between flex-wrap gap-2 mb-5">
        <div>
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-teal-700/80">Předpověď</div>
          <h2 className="section-title">Počasí podle dnů</h2>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="btn bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-60">
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
          {updatedAt ? `aktualizováno ${updatedAt.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}` : 'Obnovit'}
        </button>
      </div>
      <div className="grid gap-4 md:gap-5">
        {([1, 2, 3] as const).map((day) => {
          const wps = waypoints.map((w, i) => ({ w, i })).filter(({ w }) => w.day === day);
          const temps = wps.map(({ i }) => weather[i]).filter((x) => x && !x.error && x.temp !== undefined).map((x) => x!.temp!);
          const tMin = temps.length ? Math.min(...temps) : null;
          const tMax = temps.length ? Math.max(...temps) : null;
          const totalRain = wps.reduce((s, { i }) => s + ((weather[i] && !weather[i].error) ? (weather[i].precip ?? 0) : 0), 0);
          const dayKm = wps.length >= 2 ? wps[wps.length - 1].w.dist - wps[0].w.dist : 0;
          const start = wps.length ? wps[0].w.dist : 0;
          const color = DAY_COLORS[day];

          return (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              key={day}
              className="card p-4 md:p-5">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                  <h3 className="font-display font-bold text-lg">{DAY_NAMES[day]}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {dayKm > 0 && <Badge icon={<MapPin className="h-3 w-3" />} label={`${dayKm.toFixed(0)} km`} />}
                  {tMin !== null && (
                    <Badge icon={<Thermometer className="h-3 w-3" />} label={`${tMin.toFixed(0)}–${tMax!.toFixed(0)} °C`} />
                  )}
                  <Badge icon={<CloudRain className="h-3 w-3" />} label={`Σ ${totalRain.toFixed(1)} mm`} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
                {wps.map(({ w, i }) => {
                  const wx = weather[i];
                  const time = new Date(w.time).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
                  const segKm = (w.dist - start).toFixed(0);
                  return (
                    <div key={i} className="rounded-xl border border-slate-200/80 bg-white/60 backdrop-blur p-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {time}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] rounded-full bg-slate-100 px-1.5 py-0.5 tabular-nums">
                          {segKm} km
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-slate-800 truncate" title={w.name}>{w.name}</div>
                      {!wx ? (
                        <div className="text-sm italic text-slate-400">načítá …</div>
                      ) : wx.error ? (
                        <div className="text-sm italic text-slate-400">—</div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            {wmoIcon(wx.code)}
                            <span className="font-display text-2xl font-bold tabular-nums">{wx.temp?.toFixed(0)}°</span>
                          </div>
                          <div className="text-xs text-slate-500">{wmoText(wx.code)}</div>
                          <div className="flex justify-between text-xs text-slate-500 tabular-nums">
                            <span className="inline-flex items-center gap-1 text-sky-700"><CloudRain className="h-3 w-3" />{wx.precip?.toFixed(1)} mm</span>
                            <span className="inline-flex items-center gap-1"><Wind className="h-3 w-3" />{wx.wind?.toFixed(0)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-600 px-2 py-0.5 tabular-nums">
      {icon}
      {label}
    </span>
  );
}
