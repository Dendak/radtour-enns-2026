import { motion } from 'framer-motion';
import { ExternalLink, BedDouble, AlertCircle, MapPin, Globe, Check, Euro } from 'lucide-react';
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
      <div className="relative h-56 md:h-64 bg-slate-100 overflow-hidden">
        <img
          src={s.photoUrl}
          alt={`${s.name} — ${s.loc}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 right-3 text-[10px] text-white/70 tracking-wide">
          {s.photoCredit}
        </div>
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-700 shadow-sm">
          <BedDouble className="h-3.5 w-3.5 text-emerald-700" /> {s.night}
        </div>
        {s.tentative && (
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-50/95 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2 py-0.5">
            <AlertCircle className="h-3 w-3" /> předběžně
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display text-xl font-bold text-ink leading-tight">{s.name}</h3>
          <div className="text-sm text-slate-500 mt-0.5">{s.loc}</div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">{s.description}</p>

        {s.pricePerPerson && (
          <div className="inline-flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2">
            <Euro className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span className="leading-snug">{s.pricePerPerson}</span>
          </div>
        )}

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
