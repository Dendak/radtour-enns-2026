import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ExternalLink,
  BedDouble,
  AlertCircle,
  MapPin,
  Globe,
  Check,
  Euro,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Phone,
  Clock,
  Users,
  BookOpen,
} from 'lucide-react';
import { STAYS, type Stay } from '@/data/trip';

export function Stays() {
  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">Nocleh</div>
        <h2 className="section-title">Ubytování</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {STAYS.map((s, i) => (
          <StayCard key={i} stay={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StayCard({ stay: s, index: i }: { stay: Stay; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      className="card overflow-hidden flex flex-col">
      <PhotoGallery photos={s.photos} alt={`${s.name} — ${s.loc}`} credit={s.photoCredit}>
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-700 shadow-sm">
          <BedDouble className="h-3.5 w-3.5 text-emerald-700" /> {s.night}
        </div>
        {s.tentative && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-50/95 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2 py-0.5">
            <AlertCircle className="h-3 w-3" /> předběžně
          </div>
        )}
        {s.booking && !s.tentative && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-emerald-50/95 border border-emerald-200 text-emerald-800 text-[11px] font-semibold px-2 py-0.5">
            <CheckCircle2 className="h-3 w-3" /> potvrzeno
          </div>
        )}
      </PhotoGallery>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display text-xl font-bold text-ink leading-tight">{s.name}</h3>
          <div className="text-sm text-slate-500 mt-0.5">{s.loc}</div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">{s.description}</p>

        {s.history && (
          <details className="group rounded-xl border border-amber-200/70 bg-amber-50/50 open:bg-amber-50/80 transition-colors">
            <summary className="list-none cursor-pointer px-3 py-2 flex items-center justify-between gap-2 text-xs font-semibold text-amber-900">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                Historie &amp; zajímavost
              </span>
              <span className="text-amber-700 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-3 pb-3 pt-1 text-xs leading-relaxed text-slate-700">
              {s.history}
            </div>
          </details>
        )}

        {s.pricePerPerson && (
          <div className="inline-flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2">
            <Euro className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span className="leading-snug">{s.pricePerPerson}</span>
          </div>
        )}

        {s.booking && <BookingDetails booking={s.booking} />}

        <ul className="flex flex-wrap gap-1.5">
          {s.amenities.map((a) => (
            <li
              key={a}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs font-medium px-2 py-0.5">
              <Check className="h-3 w-3" /> {a}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {s.website && (
            <a
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-slate-900 text-white hover:bg-slate-700 text-xs">
              <Globe className="h-3.5 w-3.5" /> Web hotelu <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs">
            <MapPin className="h-3.5 w-3.5" /> Google Maps <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function BookingDetails({ booking: b }: { booking: NonNullable<Stay['booking']> }) {
  return (
    <details className="group rounded-xl border border-emerald-200 bg-emerald-50/60 open:bg-emerald-50/80 transition-colors">
      <summary className="list-none cursor-pointer px-3 py-2 flex items-center justify-between gap-2 text-xs font-semibold text-emerald-900">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Rezervace potvrzena · {b.source} {b.code}
        </span>
        <span className="text-emerald-700 group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <div className="px-3 pb-3 pt-1 space-y-2 text-xs text-slate-700">
        <div className="flex items-start gap-2">
          <MapPin className="h-3.5 w-3.5 mt-0.5 text-emerald-700 shrink-0" />
          <span>{b.address}</span>
        </div>
        <div className="flex items-start gap-2">
          <Phone className="h-3.5 w-3.5 mt-0.5 text-emerald-700 shrink-0" />
          <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="hover:underline">
            {b.phone}
          </a>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="h-3.5 w-3.5 mt-0.5 text-emerald-700 shrink-0" />
          <span>
            Check-in {b.checkIn} · check-out {b.checkOut}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <BedDouble className="h-3.5 w-3.5 mt-0.5 text-emerald-700 shrink-0" />
          <span>{b.rooms}</span>
        </div>
        <div className="flex items-start gap-2">
          <Users className="h-3.5 w-3.5 mt-0.5 text-emerald-700 shrink-0" />
          <span>{b.pairs.join(' · ')}</span>
        </div>
        {b.total && (
          <div className="flex items-start gap-2 pt-1 border-t border-emerald-200/70">
            <Euro className="h-3.5 w-3.5 mt-0.5 text-emerald-700 shrink-0" />
            <span className="font-semibold">{b.total}</span>
          </div>
        )}
      </div>
    </details>
  );
}

function PhotoGallery({
  photos,
  alt,
  credit,
  children,
}: {
  photos: string[];
  alt: string;
  credit: string;
  children?: React.ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState<Set<number>>(new Set());
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Build the list of photos that have loaded successfully so far.
  const valid = photos.filter((_, i) => !broken.has(i));
  const total = valid.length;
  const current = total > 0 ? valid[idx % total] : null;

  // Auto-advance every 4s unless paused (hover / focus).
  useEffect(() => {
    if (paused || total <= 1) return;
    timerRef.current = window.setTimeout(() => {
      setIdx((v) => (v + 1) % total);
    }, 4000);
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [idx, paused, total]);

  const go = (delta: number) => {
    if (total === 0) return;
    setIdx((v) => (v + delta + total) % total);
  };

  return (
    <div
      className="relative h-56 md:h-64 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      {total === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
          Fotky se nenačetly
        </div>
      )}
      <AnimatePresence initial={false} mode="popLayout">
        {current && (
          <motion.img
            key={current}
            src={current}
            alt={alt}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 1, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => {
              const realIndex = photos.indexOf(current);
              if (realIndex >= 0) {
                setBroken((prev) => {
                  const next = new Set(prev);
                  next.add(realIndex);
                  return next;
                });
              }
            }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-2 right-3 text-[10px] text-white/70 tracking-wide pointer-events-none">
        {credit}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Předchozí fotka"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white transition">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Další fotka"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white transition">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {valid.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Fotka ${i + 1} z ${total}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx % total ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {children}
    </div>
  );
}
