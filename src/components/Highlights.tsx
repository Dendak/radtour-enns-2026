import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  Leaf,
  BookOpen,
  Utensils,
  Coffee,
  Church,
  MapPin,
  ExternalLink,
  Lightbulb,
  ChevronDown,
  Clock,
  LayoutGrid,
} from 'lucide-react';
import {
  HIGHLIGHTS,
  DAY_NAMES,
  DAY_COLORS,
  DAY_START_KM,
  type Highlight,
} from '@/data/trip';

type KindKey = Highlight['kind'];
type FilterKey = 'all' | KindKey;

const KIND_META: Record<
  Highlight['kind'],
  { label: string; icon: React.ReactNode; tint: string }
> = {
  kultura: {
    label: 'Kultura',
    icon: <BookOpen className="h-3.5 w-3.5" />,
    tint: 'bg-violet-50 text-violet-800 border-violet-200',
  },
  příroda: {
    label: 'Příroda',
    icon: <Leaf className="h-3.5 w-3.5" />,
    tint: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  historie: {
    label: 'Historie',
    icon: <Landmark className="h-3.5 w-3.5" />,
    tint: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  gastro: {
    label: 'Gastro',
    icon: <Utensils className="h-3.5 w-3.5" />,
    tint: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  kavárna: {
    label: 'Kavárna',
    icon: <Coffee className="h-3.5 w-3.5" />,
    tint: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  památka: {
    label: 'Památka',
    icon: <Church className="h-3.5 w-3.5" />,
    tint: 'bg-sky-50 text-sky-800 border-sky-200',
  },
};

export function Highlights() {
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = HIGHLIGHTS.reduce(
    (acc, h) => {
      acc[h.kind] = (acc[h.kind] ?? 0) + 1;
      return acc;
    },
    {} as Record<KindKey, number>,
  );
  const filterKinds: FilterKey[] = [
    'all',
    'gastro',
    'kavárna',
    'kultura',
    'památka',
    'historie',
    'příroda',
  ];

  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
          Co uvidíme
        </div>
        <h2 className="section-title">Zajímavosti, památky & gastro tipy</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          Enns teče kolem klášterů, národních parků a nejstaršího města Rakouska.
          Tady je kultura, kterou míjíme, a místa, kde se vyplatí zastavit — na
          oběd, kafe nebo fotku.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {filterKinds.map((key) => {
          const active = filter === key;
          const label = key === 'all' ? 'Vše' : KIND_META[key].label;
          const count = key === 'all' ? HIGHLIGHTS.length : counts[key] ?? 0;
          if (key !== 'all' && count === 0) return null;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                active
                  ? 'bg-ink text-white border-ink shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}>
              {key === 'all' ? <LayoutGrid className="h-3.5 w-3.5" /> : KIND_META[key].icon}
              {label}
              <span
                className={`tabular-nums text-[10px] font-semibold rounded-full px-1.5 ${
                  active ? 'bg-white/20' : 'bg-slate-100 text-slate-600'
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {([1, 2, 3] as const).map((day) => {
          const items = HIGHLIGHTS.filter(
            (h) => h.day === day && (filter === 'all' || h.kind === filter),
          );
          if (!items.length) return null;
          const color = DAY_COLORS[day];
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="card overflow-hidden">
              <div
                className="px-5 py-3 flex items-center gap-3 border-b border-slate-200/60"
                style={{
                  background: `linear-gradient(90deg, ${color}12 0%, transparent 70%)`,
                }}>
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <h3 className="font-display font-bold text-base md:text-lg text-ink">
                  {DAY_NAMES[day]}
                </h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {items.map((h, idx) => {
                  const meta = KIND_META[h.kind];
                  const hasPhoto = Boolean(h.photoUrl);
                  const dayKm =
                    h.dist !== undefined
                      ? Math.max(0, h.dist - DAY_START_KM[h.day])
                      : undefined;
                  return (
                    <li key={idx}>
                      <details className="group">
                        <summary
                          className={`relative flex items-center gap-4 cursor-pointer list-none transition-colors overflow-hidden ${
                            hasPhoto
                              ? 'p-4 md:p-5 text-white'
                              : 'p-4 md:p-5 hover:bg-slate-50/60'
                          }`}>
                          {hasPhoto && (
                            <>
                              <img
                                src={h.photoUrl}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  e.currentTarget.parentElement?.classList.add('bg-slate-50');
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
                            </>
                          )}
                          <div
                            className={`relative inline-flex items-center justify-center h-10 w-10 rounded-full border shrink-0 ${
                              hasPhoto
                                ? 'bg-white/90 border-white/40 text-slate-800'
                                : meta.tint
                            }`}>
                            {meta.icon}
                          </div>
                          <div className="relative flex-1 min-w-0">
                            <div
                              className={`font-display font-semibold text-base leading-tight truncate ${
                                hasPhoto ? 'text-white drop-shadow' : 'text-ink'
                              }`}>
                              {h.name}
                            </div>
                            <div
                              className={`text-xs mt-1 flex items-center gap-2 flex-wrap ${
                                hasPhoto ? 'text-white/85' : 'text-slate-500'
                              }`}>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${
                                  hasPhoto
                                    ? 'bg-white/15 backdrop-blur border-white/30 text-white'
                                    : meta.tint
                                }`}>
                                {meta.label}
                              </span>
                              <span className="inline-flex items-center gap-1 min-w-0">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{h.where}</span>
                                {dayKm !== undefined && (
                                  <span
                                    className={`tabular-nums shrink-0 ${
                                      hasPhoto ? 'text-white/70' : 'text-slate-400'
                                    }`}
                                    title={`${h.dist} km od startu trasy (Radstadt)`}>
                                    · km {dayKm} dne
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            className={`relative h-5 w-5 shrink-0 group-open:rotate-180 transition-transform ${
                              hasPhoto ? 'text-white/80' : 'text-slate-400'
                            }`}
                          />
                        </summary>
                        <div className="px-4 md:px-5 pb-5 pl-[4.5rem]">
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {h.blurb}
                          </p>
                          {h.hours && (
                            <p className="text-sm text-sky-900/90 mt-3 flex gap-2 rounded-lg bg-sky-50 border border-sky-200 px-3 py-2">
                              <Clock className="h-4 w-4 shrink-0 mt-0.5 text-sky-600" />
                              <span>{h.hours}</span>
                            </p>
                          )}
                          {h.tip && (
                            <p className="text-sm text-amber-900/90 mt-3 flex gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                              <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                              <span>{h.tip}</span>
                            </p>
                          )}
                          {(h.mapsQuery || h.website) && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {h.website && (
                                <a
                                  href={h.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn text-xs bg-slate-900 text-white hover:bg-slate-700">
                                  {h.kind === 'gastro' || h.kind === 'kavárna'
                                    ? 'Menu / web'
                                    : 'Web'}{' '}
                                  <ExternalLink className="h-3 w-3 opacity-80" />
                                </a>
                              )}
                              {h.mapsQuery && (
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapsQuery)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn text-xs bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
                                  <MapPin className="h-3.5 w-3.5" /> Maps{' '}
                                  <ExternalLink className="h-3 w-3 opacity-70" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </details>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
