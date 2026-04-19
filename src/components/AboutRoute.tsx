import { motion } from 'framer-motion';
import {
  Route,
  Mountain,
  Flag,
  Signpost,
  BedDouble,
  Gauge,
  ChevronDown,
} from 'lucide-react';

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
        <p className="text-slate-700 text-[0.95rem] leading-relaxed">
          Rakouská národní cyklotrasa <strong>R7</strong> podél řeky Enns — od
          ledovců <strong>Vysokých Taur</strong> přes{' '}
          <strong>Národní park Gesäuse</strong> až k Dunaji. Třemi spolkovými
          zeměmi, převážně z kopce, se souběžnou železnicí ÖBB pro případný
          vlakový bailout.
        </p>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-3">
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

        <details className="group mt-4">
          <summary className="list-none cursor-pointer inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 hover:text-amber-900">
            <span>Přečíst víc o trase</span>
            <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
          </summary>
          <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-slate-700">
            <p>
              Ennsradweg patří mezi klasické rakouské dálkové cyklostezky vedené
              podél řek — stejná rodina jako Dunajská, Drávská nebo Murská
              cyklostezka. Kopíruje řeku Enns (největší alpský přítok Dunaje)
              od jejího horního toku u Flachauwinkelu až po město Enns —
              nejstarší město Rakouska — kde se řeka vlévá do Dunaje.
            </p>
            <p>
              Značka R7 (zelená cedule s číslem) provází trasu přes
              Salzbursko, Štýrsko a Horní Rakousko. Střídá samostatné asfaltové
              stezky u řeky s klidnými vedlejšími silnicemi. Souběžná železnice
              ÖBB Ennstalbahn umožňuje kteroukoli etapu zkrátit nebo přerušit
              vlakem — ideální pro vícedenní výjezd.
            </p>
            <p>
              Trasa je převážně z kopce (pramen nad 1 000 m, Dunaj ve 248 m),
              takže 263 km se dá v klidu ujet za tři dny bez vrcholové kondice.
              Nejhezčí úsek — průlom Enns skrz Gesäuse — je zároveň
              nejvýhledovější a s nejmenším provozem. Ubytování podél trasy je
              často v síti ADFC bett+bike (uzamykatelná garáž, časná snídaně,
              základní nářadí).
            </p>
            <p className="text-xs text-slate-500">
              Oficiální zdroj:{' '}
              <a
                href="https://www.ennsradweg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-700">
                ennsradweg.com
              </a>
              . Pozn.: přesný rok oficiálního vyznačení R7 a statistiky jezdců
              se v otevřených zdrojích nepodařilo dohledat.
            </p>
          </div>
        </details>
      </motion.div>
    </section>
  );
}
