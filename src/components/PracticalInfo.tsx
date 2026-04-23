import { motion } from 'framer-motion';
import { Check, Train, Wrench } from 'lucide-react';
import { PACKING } from '@/data/trip';
import { GpxDownloads } from '@/components/GpxDownloads';
import type { TrackPoint } from '@/hooks/useGpxTrack';

export type PracticalInfoProps = {
  track: TrackPoint[];
  dayEnd: Record<1 | 2, number>;
};

export function PracticalInfo({ track, dayEnd }: PracticalInfoProps) {
  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
          Info
        </div>
        <h2 className="section-title">Praktické informace</h2>
      </div>

      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        <InfoCard
          icon={<Train className="h-5 w-5" />}
          title="Doprava"
          subtitle="Lístky koupené ✓">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Čtvrtek:</strong> všichni přijedou k Denisovi do
                Salzburgu, kola přespí u nás.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Pátek:</strong> příjezd do{' '}
                <strong>Radstadtu v 10:35</strong>, start na trase ~10:45
                (čas na složení kol).
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Zpět z Lince (ne večer):</strong> skupina se rozdělí —
                <br />
                <em>Denis + Kevin + Kája</em> → Salzburg Hbf
                <br />
                <em>Vojta</em> → České Budějovice (přes Summerau)
                <br />
                <em>Dáša</em> → zůstává v Linci
                <br />
                <em>Franz Ferdinand</em> → upřesnit
              </span>
            </li>
          </ul>
        </InfoCard>

        <InfoCard
          icon={<Wrench className="h-5 w-5" />}
          title="Co sebou"
          subtitle="Kolo, vrstvy, doklady">
          <div className="space-y-3">
            {PACKING.map((sec) => (
              <details key={sec.title} className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-ink hover:text-amber-700">
                  <span>{sec.title}</span>
                  <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 text-sm text-slate-600 pl-1">
                  {sec.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-emerald-600 shrink-0">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </InfoCard>
      </div>

      <GpxDownloads track={track} dayEnd={dayEnd} />
    </section>
  );
}

function InfoCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
          {icon}
        </div>
        <div>
          <div className="font-display font-bold text-base text-ink leading-tight">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-slate-500 mt-0.5">{subtitle}</div>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}
