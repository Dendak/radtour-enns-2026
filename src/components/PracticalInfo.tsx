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
          subtitle="ÖBB s 6 koly">
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
                <strong>Pátek — do Radstadtu není přímý spoj.</strong> Musí se
                přestupovat v <strong>Bischofshofenu</strong>:
                <br />
                1. <strong>Salzburg Hbf → Bischofshofen</strong> (REX 5, ~55 min)
                <br />
                2. přestup ~10–15 min
                <br />
                3. <strong>Bischofshofen → Radstadt</strong> (S3 nebo REX,
                ~35 min)
                <br />
                Celkem <strong>~1 h 45 min</strong>. Jede zhruba každou hodinu
                ráno — před cestou ověřit na scotty.at.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Kapacita kol:</strong> REX i S-Bahn mají cyklovůz
                obvykle na 10–15 kol — 6 se vejde, ale{' '}
                <em>rezervace Radkarte</em> (€ 2 / kolo pro regionální spoj)
                nutná na <strong>oba úseky zvlášť</strong> přes ÖBB app.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Spoj potvrzený:</strong> příjezd do{' '}
                <strong>Radstadtu v 10:35</strong>, start na trase ~10:45
                (čas na složení kol). Přesné odjezdové časy ze Salzburgu
                a přestup v Bischofshofenu před cestou ještě ověřit na
                scotty.at.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Zpět z Lince (ne večer):</strong> skupina se rozdělí —
                <br />
                <em>Denis + Kevin + Kája</em> → Salzburg Hbf (RJ ~1 h 15 min)
                <br />
                <em>Vojta</em> → České Budějovice (přes Summerau ~4 h)
                <br />
                <em>Dáša</em> → zůstává v Linci
                <br />
                <em>Franz Ferdinand</em> → upřesnit
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Radkarte pro RJ € 10 / kolo, rezervace povinná. Pro regionální
                vlak do Budějovic € 5.
              </span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-3">
            <a
              href="https://fahrplan.oebb.at/webapp/?S=Salzburg+Hbf&Z=Radstadt&date=01.05.2026&time=07:00&timesel=depart"
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs bg-slate-900 text-white hover:bg-slate-700">
              ÖBB spojení (pá 1. 5., od 7:00)
            </a>
            <a
              href="https://www.oebb.at/en/reiseplanung-services/rad-und-bahn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              Radkarte info
            </a>
          </div>
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
