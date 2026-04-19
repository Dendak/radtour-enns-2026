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
import { FunFacts } from '@/components/FunFacts';

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
          O trase & zajímavosti
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
          <div className="mt-3 space-y-4 text-[0.95rem] leading-relaxed text-slate-700">
            <div>
              <h3 className="font-display font-semibold text-ink mb-1">
                Kudy a proč
              </h3>
              <p>
                Ennsradweg patří mezi klasické rakouské dálkové cyklostezky
                vedené podél řek — stejná rodina jako Dunajská, Drávská nebo
                Murská cyklostezka. Kopíruje řeku Enns (největší alpský přítok
                Dunaje) od jejího horního toku u Flachauwinkelu až po město
                Enns — nejstarší město Rakouska — kde se řeka vlévá do Dunaje.
              </p>
              <p className="mt-2">
                Značka R7 (zelená cedule s číslem) provází trasu přes
                Salzbursko, Štýrsko a Horní Rakousko. Střídá samostatné
                asfaltové stezky u řeky s klidnými vedlejšími silnicemi.
                Souběžná železnice ÖBB Ennstalbahn umožňuje kteroukoli etapu
                zkrátit nebo přerušit vlakem.
              </p>
            </div>

            <div>
              <h3 className="font-display font-semibold text-ink mb-1">
                Kousek historie
              </h3>
              <p>
                Z velkých rakouských „řekoradweg" patří Ennsradweg k nejmladším —
                Dunajská (Donauradweg) se budovala už od 80. let,
                Ennsradweg vznikal postupně v průběhu 90. a 2000. let, jak
                jednotlivé zemské správy napojovaly místní úseky do jedné
                značené trasy. Oficiální značení rakouskou národní jedničkou R7
                dalo celé trase její dnešní jméno.
              </p>
              <p className="mt-2">
                Zásadním zlomem byla <strong>povodeň v srpnu 2002</strong>,
                která Ennstal silně poškodila — trhala břehové úseky trasy
                zejména mezi Liezenem, Admontem a Gesäuse. Následná
                rekonstrukce pak řadu úseků zvedla výš nad hladinu, dostala
                nový asfalt a vybudovaly se některé nové mosty a lávky.
                Od té doby trasa postupně dorůstá — přibývají cyklo­průjezdy
                kolem měst, nové úseky mimo silnice a bett+bike ubytování.
              </p>
              <p className="mt-2 text-sm text-slate-500 italic">
                Přesný rok vyznačení R7 ani roční statistiky projetí se
                v otevřených zdrojích nepodařilo spolehlivě ověřit — tourism
                boardy i Wikipedia uvádějí jen obecné „postupně budována od
                90. let".
              </p>
            </div>

            <div>
              <h3 className="font-display font-semibold text-ink mb-1">
                Proč to jede
              </h3>
              <p>
                Trasa je převážně z kopce (pramen nad 1 000 m, Dunaj ve 248 m),
                takže 263 km se dá v klidu ujet za tři dny bez vrcholové
                kondice. Nejhezčí úsek — průlom Enns skrz Gesäuse — je zároveň
                nejvýhledovější a s nejmenším provozem. Velká část ubytování
                podél trasy je v síti ADFC bett+bike (uzamykatelná garáž,
                časná snídaně, základní nářadí).
              </p>
            </div>

            <p className="text-xs text-slate-500">
              Oficiální zdroj:{' '}
              <a
                href="https://www.ennsradweg.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-700">
                ennsradweg.com
              </a>
              {' · '}
              <a
                href="https://de.wikipedia.org/wiki/Ennsradweg"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-700">
                de.wikipedia
              </a>
              {' · '}
              <a
                href="https://www.ennstalwiki.at/wiki/index.php/Ennsradweg_R_7"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-700">
                EnnstalWiki
              </a>
            </p>
          </div>
        </details>
      </motion.div>

      <div className="mt-6 md:mt-8">
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display font-bold text-lg md:text-xl text-ink">
            Fun Facts — co asi nevíš
          </h3>
          <span className="text-xs text-slate-400">ověřené zdroje</span>
        </div>
        <FunFacts embedded />
      </div>
    </section>
  );
}
