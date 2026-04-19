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
} from 'lucide-react';
import {
  HIGHLIGHTS,
  DAY_NAMES,
  DAY_COLORS,
  type Highlight,
} from '@/data/trip';

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

      <div className="space-y-6">
        {([1, 2, 3] as const).map((day) => {
          const items = HIGHLIGHTS.filter((h) => h.day === day);
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
                  return (
                    <li key={idx} className="p-5 flex gap-4">
                      <div
                        className={`mt-0.5 inline-flex items-center justify-center h-10 w-10 rounded-full border shrink-0 ${meta.tint}`}>
                        {meta.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start flex-wrap gap-2 justify-between">
                          <div>
                            <div className="font-display font-bold text-base text-ink leading-tight">
                              {h.name}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${meta.tint}`}>
                                {meta.icon}
                                {meta.label}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {h.where}
                                {h.dist !== undefined && (
                                  <span className="tabular-nums text-slate-400">
                                    · km {h.dist}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                          {h.blurb}
                        </p>
                        {h.tip && (
                          <p className="text-sm text-amber-900/90 mt-2 flex gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                            <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                            <span>{h.tip}</span>
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-2">
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
                          {h.website && (
                            <a
                              href={h.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn text-xs bg-slate-900 text-white hover:bg-slate-700">
                              Web <ExternalLink className="h-3 w-3 opacity-80" />
                            </a>
                          )}
                        </div>
                      </div>
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
