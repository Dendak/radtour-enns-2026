import { motion } from 'framer-motion';
import { ExternalLink, BedDouble, AlertCircle } from 'lucide-react';
import { STAYS } from '@/data/trip';

export function Stays() {
  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">Nocleh</div>
        <h2 className="section-title">Ubytování</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {STAYS.map((s, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="card overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500">{s.night}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <BedDouble className="h-5 w-5 text-emerald-700" />
                    <h3 className="font-display text-xl font-bold text-ink">{s.name}</h3>
                    {s.tentative && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-2 py-0.5">
                        <AlertCircle className="h-3 w-3" /> předběžně
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{s.loc}</div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`}
                  target="_blank" rel="noopener"
                  className="btn bg-slate-900 text-white hover:bg-slate-700 text-xs">
                  Google Maps <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <iframe
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(s.embedQuery)}&output=embed&hl=cs&z=15`}
              title={`${s.name} — mapa`}
              className="w-full h-[260px] border-0 block"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
