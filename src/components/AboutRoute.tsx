import { motion } from 'framer-motion';
import { Route, Mountain, Flag, Signpost, BedDouble, Gauge } from 'lucide-react';

const FACTS: { icon: React.ReactNode; label: string; value: string; hint?: string }[] = [
  {
    icon: <Signpost className="h-5 w-5" />,
    label: 'Značení',
    value: 'R7',
    hint: 'zelené cedule „R7 Ennsradweg“ po celé trase',
  },
  {
    icon: <Route className="h-5 w-5" />,
    label: 'Celková délka',
    value: '≈ 263 km',
    hint: 'Flachauwinkl → Enns · varianty 258–280 km',
  },
  {
    icon: <Flag className="h-5 w-5" />,
    label: 'Tři spolkové země',
    value: 'S · ST · OÖ',
    hint: 'Salzbursko, Štýrsko, Horní Rakousko',
  },
  {
    icon: <Mountain className="h-5 w-5" />,
    label: 'Převýšení',
    value: '~ 600 m ↓',
    hint: 'převážně z kopce — od Taur k Dunaji',
  },
  {
    icon: <BedDouble className="h-5 w-5" />,
    label: 'bett+bike',
    value: 'ADFC síť',
    hint: 'cyklo-friendly ubytování podél trasy',
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    label: 'Obtížnost',
    value: 'Střední',
    hint: 'touring · ambiciózní amatér',
  },
];

export function AboutRoute() {
  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
          O cyklostezce
        </div>
        <h2 className="section-title">Ennsradweg — co to vlastně je</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.45 }}
        className="card p-5 md:p-6">
        <div className="prose prose-slate max-w-none text-[0.95rem] leading-relaxed">
          <p className="text-slate-700">
            <strong>Ennsradweg</strong> je jedna ze zakládajících rakouských
            řekoradweg — „říčních cyklostezek“ typu Donauradweg, Drauradweg,
            Mur­radweg. Vede podél řeky <strong>Enns</strong> (levý přítok Dunaje) od
            jejího horního toku ve{' '}
            <strong>Vysokých Taurách</strong> u Flachauwinkelu přes <strong>
              Národní park Gesäuse
            </strong>{' '}
            až do města <strong>Enns</strong> — nejstaršího města Rakouska — kde se
            Enns vlévá do Dunaje.
          </p>
          <p className="text-slate-700 mt-3">
            Trasa je v celém průběhu značena jako rakouská národní cyklostezka{' '}
            <strong>R7</strong> (zelené tabule s číslem). Prochází třemi spolkovými
            zeměmi — Salzbursko, Štýrsko a Horní Rakousko — a kombinuje samostatné
            asfaltové stezky podél řeky s klidnými vedlejšími silnicemi. Díky
            souběžné železnici ÖBB (Ennstalbahn) lze trasu kdykoli zkrátit nebo
            přerušit vlakem — ideál pro vícedenní etapu.
          </p>
          <p className="text-slate-700 mt-3">
            Trasa je <em>převážně z kopce</em> (pramen Enns &gt; 1 000 m n. m.,
            soutok s Dunajem 248 m), takže i přes 263 km je zvládnutelná ve
            třech dnech bez extrémní kondice. Nejkrásnější úsek — průlom Enns
            v Gesäuse — je zároveň nejbohatší na výhledy a nejméně zatížený
            motorizmem. Ubytování podél trasy je často v síti{' '}
            <strong>ADFC bett+bike</strong> (uzamykatelná garáž kol, časná
            snídaně, drobné nářadí).
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-slate-200 bg-white p-3.5 flex items-start gap-3">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 shrink-0">
                {f.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wider text-slate-500">
                  {f.label}
                </div>
                <div className="font-display font-bold text-lg text-ink leading-tight">
                  {f.value}
                </div>
                {f.hint && (
                  <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {f.hint}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-4 leading-relaxed">
          Oficiální zdroj trasy:{' '}
          <a
            href="https://www.ennsradweg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-700">
            ennsradweg.com
          </a>
          . Pozn.: přesný rok oficiálního vyznačení R7 a statistiky nájezdů se
          v otevřených zdrojích nepodařilo dohledat; údaje v tabulce pocházejí
          z tourism boardů a ADFC.
        </p>
      </motion.div>
    </section>
  );
}
