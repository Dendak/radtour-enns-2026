import { useMemo, useState } from 'react';
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
  Clock,
  LayoutGrid,
  Star,
  ChevronDown,
  ChevronUp,
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
  {
    label: string;
    icon: React.ReactNode;
    bigIcon: React.ReactNode;
    tint: string;
    gradient: string;
  }
> = {
  kultura: {
    label: 'Kultura',
    icon: <BookOpen className="h-3.5 w-3.5" />,
    bigIcon: <BookOpen className="h-14 w-14" />,
    tint: 'bg-violet-50 text-violet-800 border-violet-200',
    gradient: 'from-violet-400 via-violet-500 to-violet-700',
  },
  příroda: {
    label: 'Příroda',
    icon: <Leaf className="h-3.5 w-3.5" />,
    bigIcon: <Leaf className="h-14 w-14" />,
    tint: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-700',
  },
  historie: {
    label: 'Historie',
    icon: <Landmark className="h-3.5 w-3.5" />,
    bigIcon: <Landmark className="h-14 w-14" />,
    tint: 'bg-amber-50 text-amber-800 border-amber-200',
    gradient: 'from-amber-400 via-amber-500 to-amber-700',
  },
  gastro: {
    label: 'Gastro',
    icon: <Utensils className="h-3.5 w-3.5" />,
    bigIcon: <Utensils className="h-14 w-14" />,
    tint: 'bg-rose-50 text-rose-800 border-rose-200',
    gradient: 'from-rose-400 via-rose-500 to-rose-700',
  },
  kavárna: {
    label: 'Kavárna',
    icon: <Coffee className="h-3.5 w-3.5" />,
    bigIcon: <Coffee className="h-14 w-14" />,
    tint: 'bg-orange-50 text-orange-800 border-orange-200',
    gradient: 'from-orange-400 via-orange-500 to-orange-700',
  },
  památka: {
    label: 'Památka',
    icon: <Church className="h-3.5 w-3.5" />,
    bigIcon: <Church className="h-14 w-14" />,
    tint: 'bg-sky-50 text-sky-800 border-sky-200',
    gradient: 'from-sky-400 via-sky-500 to-sky-700',
  },
};

export type HighlightsProps = { embedded?: boolean };

export function Highlights({ embedded = false }: HighlightsProps = {}) {
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

  const outerClass = embedded ? '' : 'mt-10 md:mt-14';
  const Wrapper = (props: React.HTMLAttributes<HTMLElement>) =>
    embedded ? <div {...props} /> : <section {...props} />;

  return (
    <Wrapper className={outerClass}>
      {!embedded && (
        <div className="mb-5">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
            Co uvidíme
          </div>
          <h2 className="section-title">Zajímavosti, památky & gastro tipy</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Enns teče kolem klášterů, národních parků a nejstaršího města
            Rakouska. Tady je kultura, kterou míjíme, a místa, kde se vyplatí
            zastavit — na oběd, kafe nebo fotku.
          </p>
        </div>
      )}

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

      <div className="space-y-8">
        {([1, 2, 3] as const).map((day) => {
          const items = HIGHLIGHTS.filter(
            (h) => h.day === day && (filter === 'all' || h.kind === filter),
          );
          if (!items.length) return null;
          return (
            <DayGroup
              key={day}
              day={day}
              items={items}
              color={DAY_COLORS[day]}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}

const INITIAL_VISIBLE = 3;

function DayGroup({
  day,
  items,
  color,
}: {
  day: 1 | 2 | 3;
  items: Highlight[];
  color: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, INITIAL_VISIBLE);
  const hiddenCount = items.length - visible.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}>
      <div className="flex items-center gap-3 mb-3">
        <span
          className="h-3 w-3 rounded-full shrink-0"
          style={{ background: color }}
        />
        <h3 className="font-display font-bold text-base md:text-lg text-ink">
          {DAY_NAMES[day]}
        </h3>
        <span className="text-xs text-slate-400 tabular-nums">
          · {items.length}{' '}
          {items.length === 1 ? 'místo' : items.length < 5 ? 'místa' : 'míst'}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((h, idx) => (
          <HighlightCard key={`${day}-${idx}`} h={h} accent={color} />
        ))}
      </div>
      {items.length > INITIAL_VISIBLE && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-amber-300 transition">
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                Skrýt zbytek
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                Ukázat dalších {hiddenCount}
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}

function HighlightCard({ h, accent }: { h: Highlight; accent: string }) {
  const photos = h.photos ?? [];
  const [failedUrls, setFailedUrls] = useState<Set<string>>(() => new Set());
  const validPhotos = useMemo(
    () => photos.filter((url) => !failedUrls.has(url)),
    [photos, failedUrls],
  );
  const [photoIdx, setPhotoIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const n = validPhotos.length;
  const hasPhoto = n > 0;
  const currentPhoto = hasPhoto ? validPhotos[Math.min(photoIdx, n - 1)] : null;

  const meta = KIND_META[h.kind];
  const dayKm =
    h.dist !== undefined ? Math.max(0, h.dist - DAY_START_KM[h.day]) : undefined;

  const markFailed = (url: string) =>
    setFailedUrls((prev) => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });

  return (
    <article
      className="card overflow-hidden flex flex-col group"
      style={{ borderTop: `3px solid ${accent}` }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative block aspect-[4/3] w-full bg-slate-100 overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
        {hasPhoto ? (
          <img
            src={currentPhoto!}
            alt={h.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => currentPhoto && markFailed(currentPhoto)}
          />
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-gradient-to-br ${meta.gradient}`}>
            <div className="opacity-90">{meta.bigIcon}</div>
            <div className="px-3 text-center font-display font-bold text-sm md:text-base leading-tight drop-shadow">
              {h.name}
            </div>
          </div>
        )}
        {hasPhoto && (
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        )}
        <div className="absolute top-2 left-2 flex gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
              hasPhoto
                ? 'bg-white/95 backdrop-blur border-white/60 text-slate-800'
                : meta.tint
            }`}>
            {meta.icon}
            {meta.label}
          </span>
          {dayKm !== undefined && (
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums ${
                hasPhoto
                  ? 'bg-black/55 text-white backdrop-blur'
                  : 'bg-slate-100 text-slate-600'
              }`}
              title={`${h.dist} km od startu`}>
              km {dayKm}
            </span>
          )}
        </div>
        {h.rating && (
          <span
            className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-full bg-yellow-400/95 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-slate-900 shadow-sm"
            title={`${h.rating.source ?? 'Google'}: ${h.rating.stars}★ z ${h.rating.count} recenzí`}>
            <Star className="h-3 w-3 fill-current" />
            {h.rating.stars.toFixed(1)}
          </span>
        )}
        {n > 1 && (
          <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-1">
            {validPhotos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Fotka ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoIdx(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === photoIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
        {hasPhoto && h.photosAreIllustrative && (
          <span
            className="absolute bottom-2 right-2 z-10 inline-flex items-center rounded-full bg-black/55 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/90"
            title="Fotka pochází z Wikimedia Commons, ne přímo od tohoto podniku">
            ilustrační foto
          </span>
        )}
      </button>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-display font-semibold text-base text-ink leading-tight mb-1">
          {h.name}
        </h4>
        <div className="text-xs text-slate-500 flex items-center gap-1 mb-2 min-w-0">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{h.where}</span>
          {h.rating && (
            <span className="text-slate-400 tabular-nums shrink-0">
              · {h.rating.count}+ recenzí
            </span>
          )}
        </div>
        <p
          className={`text-sm text-slate-600 leading-relaxed ${
            open ? '' : 'line-clamp-3'
          }`}>
          {h.blurb}
        </p>

        {open && (
          <div className="mt-3 space-y-2.5">
            {h.hours && (
              <p className="text-sm text-sky-900/90 flex gap-2 rounded-lg bg-sky-50 border border-sky-200 px-3 py-2">
                <Clock className="h-4 w-4 shrink-0 mt-0.5 text-sky-600" />
                <span>{h.hours}</span>
              </p>
            )}
            {h.tip && (
              <p className="text-sm text-amber-900/90 flex gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                <span>{h.tip}</span>
              </p>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-xs font-medium text-amber-800 hover:text-amber-900 inline-flex items-center gap-0.5">
            {open ? 'Skrýt' : 'Detaily'}
          </button>
          {(h.mapsQuery || h.website) && (
            <span className="text-slate-200">·</span>
          )}
          {h.website && (
            <a
              href={h.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-700 hover:text-amber-800 inline-flex items-center gap-0.5">
              Web <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )}
          {h.mapsQuery && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-slate-700 hover:text-amber-800 inline-flex items-center gap-0.5">
              Maps <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
