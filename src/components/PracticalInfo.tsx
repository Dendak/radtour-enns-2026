import { motion } from 'framer-motion';
import {
  Check,
  Phone,
  Users,
  Train,
  Languages,
  CloudRain,
  Wrench,
  Info,
} from 'lucide-react';
import { PACKING, EMERGENCIES, TEAM } from '@/data/trip';

export function PracticalInfo() {
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
          icon={<Users className="h-5 w-5" />}
          title="Tým"
          subtitle={`${TEAM.length} cyklisté`}>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-slate-700">
            {TEAM.map((name) => (
              <li key={name} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                {name}
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard
          icon={<Train className="h-5 w-5" />}
          title="Doprava — pátek ráno"
          subtitle="Salzburg → Radstadt s 6 koly">
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
                <strong>Pátek:</strong> linka <strong>REX 5 / S3</strong>{' '}
                Salzburg Hbf → Bischofshofen → Radstadt. Přímo ~ 1 h 20 min, bez
                přestupů pokud chytneme REX. Jede zhruba každou hodinu ráno
                (cca 7:04, 8:04, 9:04 — před cestou ověřit na scotty.at).
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Kapacita kol:</strong> REX má cyklovůz obvykle na 10–15 kol
                — 6 se tam vejde, ale <em>rezervaci</em> Radkarte (€ 2 / kolo pro
                regionální spoj) udělat předem přes ÖBB app.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Doporučený spoj:</strong> odjezd ~8:04 z Salzburg Hbf,
                v Radstadtu ~9:25 — v devět doražíme, v 9:30 na kolech, před
                Admont dojedeme na večer.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Zpět (neděle):</strong> z Linec Hbf — RJ/EC do Vídně nebo
                Mnichova, odtamtud domů. Radkarte pro RJ € 10 / kolo, rezervace
                povinná.
              </span>
            </li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-3">
            <a
              href="https://fahrplan.oebb.at/webapp/?S=Salzburg+Hbf&Z=Radstadt&date=01.05.2026"
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs bg-slate-900 text-white hover:bg-slate-700">
              ÖBB spojení (pá 1. 5.)
            </a>
            <a
              href="https://www.oebb.at/en/tickets-kundenkarten/oesterreich/fahrradtickets"
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">
              Radkarte info
            </a>
          </div>
        </InfoCard>

        <InfoCard
          icon={<Languages className="h-5 w-5" />}
          title="Jazyk & platba"
          subtitle="Německy, € / karta">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Hlavní jazyk: němčina (dialekt štýrský / hornorakouský).
                Angličtina zřídka mimo hotely.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Platba: euro. Menší hostince pouze hotovost, supermarkety a
                hotely berou kartu. Bankomaty v každém městě.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Spropitné: 5–10 % v restauraci je zvykem; říká se „stimmt so".
              </span>
            </li>
          </ul>
        </InfoCard>

        <InfoCard
          icon={<CloudRain className="h-5 w-5" />}
          title="Počasí v květnu"
          subtitle="8–18 °C, déšť možný">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Dolní Ennstal: 12–18 °C ve dne, pod 10 °C ráno. U Dachsteinu a
                Gesäuse může být chladněji a mokřeji.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Srážky nad 800 m n. m. padají často jako chladné přeháňky —
                pláštěnku mít po ruce.
              </span>
            </li>
            <li className="flex gap-2">
              <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Radstadt (v den 1 ráno) leží v 850 m, Linec (den 3 večer) v 260
                m — půjdeme převážně z kopce.
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

        <InfoCard
          icon={<Phone className="h-5 w-5" />}
          title="Tísňové kontakty"
          subtitle="Uložte si do mobilu">
          <ul className="space-y-2 text-sm">
            {EMERGENCIES.map((e) => (
              <li
                key={e.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-white px-3 py-2">
                <div className="min-w-0">
                  <div className="text-slate-700 font-medium">{e.label}</div>
                  {e.note && (
                    <div className="text-xs text-slate-400">{e.note}</div>
                  )}
                </div>
                <a
                  href={`tel:${e.value.replace(/\s/g, '')}`}
                  className="font-mono tabular-nums text-sm font-semibold text-amber-800 hover:underline shrink-0">
                  {e.value}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-3 flex gap-2">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Poruchovou vozidla / kolo — ÖAMTC: 120 (pomoc i cyklistům).
          </p>
        </InfoCard>
      </div>
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
