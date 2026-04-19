import { motion } from 'framer-motion';
import {
  BookOpen,
  MapPin,
  Mountain,
  Hammer,
  ScrollText,
  Cake,
} from 'lucide-react';

type Fact = {
  stat: string;
  statLabel?: string;
  title: string;
  body: React.ReactNode;
  icon: React.ReactNode;
  source?: { label: string; url: string };
};

const FACTS: Fact[] = [
  {
    stat: '1653',
    statLabel: 'rok',
    title: 'Nejstarší recept na dort na světě',
    icon: <Cake className="h-5 w-5" />,
    body: (
      <>
        <strong>Linzer Torte</strong> má nejstarší dochovaný recept na dort
        vůbec — z kuchařky hraběnky Sagramosy z roku 1653. Rukopis byl{' '}
        <strong>objeven až v roce 2005 v archivech Admontu</strong> — naše
        trasa tak propojuje obě místa.
      </>
    ),
    source: {
      label: 'Wikipedia — Linzertorte',
      url: 'https://en.wikipedia.org/wiki/Linzertorte',
    },
  },
  {
    stat: '70 000',
    statLabel: 'svazků',
    title: 'Největší klášterní knihovna na světě',
    icon: <BookOpen className="h-5 w-5" />,
    body: (
      <>
        Barokní sál ve Stift Admont měří <strong>70 × 14 × 13 m</strong>,{' '}
        48 oken, 7 kupolí s freskami od 80letého Altomonta. Celý fond kláštera{' '}
        má <strong>200 000 svazků</strong> včetně 1 500 středověkých rukopisů.
      </>
    ),
    source: {
      label: 'Wikipedia — Admont Abbey Library',
      url: 'https://en.wikipedia.org/wiki/Admont_Abbey_Library',
    },
  },
  {
    stat: '1212',
    statLabel: 'město od',
    title: 'Nejstarší rakouské město',
    icon: <ScrollText className="h-5 w-5" />,
    body: (
      <>
        Enns dostal městská privilegia <strong>22. dubna 1212</strong> od
        vévody Leopolda VI. Jde o nejstarší dochovanou městskou listinu
        v Rakousku — <strong>o 9 let dříve než Vídeň</strong> (1221).
      </>
    ),
    source: {
      label: 'Wikipedia — Enns (town)',
      url: 'https://en.wikipedia.org/wiki/Enns_(town)',
    },
  },
  {
    stat: '500 m',
    statLabel: 'stěny',
    title: 'Gesäuse znamená „řvoucí"',
    icon: <Mountain className="h-5 w-5" />,
    body: (
      <>
        Soutěska z druhého dne je <strong>15 km dlouhá</strong>, vápencové
        stěny se tyčí <strong>až 500 m nad řekou</strong>. Jméno v němčině
        doslova „řvoucí" — podle hluku peřejí. Třetí největší NP Rakouska.
      </>
    ),
    source: {
      label: 'Nationalpark Gesäuse',
      url: 'https://nationalpark-gesaeuse.at/en/',
    },
  },
  {
    stat: '2',
    statLabel: 'spolkové státy',
    title: 'Řeka pojmenovala dva státy',
    icon: <MapPin className="h-5 w-5" />,
    body: (
      <>
        Severně od Steyru tvoří Enns hranici zemí. Historické názvy:{' '}
        <em>Österreich ob der Enns</em> (nad Enns) a <em>unter der Enns</em>{' '}
        (pod Enns) — dnešní <strong>Horní a Dolní Rakousko</strong>.
      </>
    ),
    source: {
      label: 'Wikipedia — Upper Austria',
      url: 'https://en.wikipedia.org/wiki/Upper_Austria',
    },
  },
  {
    stat: '1 300+',
    statLabel: 'let těžby',
    title: 'Největší povrchový důl Evropy',
    icon: <Hammer className="h-5 w-5" />,
    body: (
      <>
        <strong>Erzberg</strong> u Eisenerzu je největší povrchový důl
        v Evropě a zároveň <strong>největší ložisko sideritu na světě</strong>.
        Celé údolí se historicky jmenuje <em>Eisenwurzen</em> („železné kořeny").
      </>
    ),
    source: {
      label: 'Wikipedia — Erzberg mine',
      url: 'https://en.wikipedia.org/wiki/Erzberg_mine',
    },
  },
];

export type FunFactsProps = { embedded?: boolean };

export function FunFacts({ embedded = false }: FunFactsProps = {}) {
  const outerClass = embedded ? '' : 'mt-10 md:mt-14';
  const Wrapper = (props: React.HTMLAttributes<HTMLElement>) =>
    embedded ? <div {...props} /> : <section {...props} />;

  return (
    <Wrapper className={outerClass}>
      {!embedded && (
        <div className="mb-5">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
            Zajímavosti
          </div>
          <h2 className="section-title">Fun Facts</h2>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FACTS.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.2) }}
            className="card p-4 flex flex-col">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display font-black text-2xl text-ink leading-none tabular-nums">
                {f.stat}
              </span>
              {f.statLabel && (
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  {f.statLabel}
                </span>
              )}
              <span className="ml-auto inline-flex items-center justify-center h-7 w-7 rounded-full bg-amber-50 text-amber-700 border border-amber-100 shrink-0">
                {f.icon}
              </span>
            </div>
            <h3 className="font-display font-bold text-sm text-ink leading-tight mb-1.5">
              {f.title}
            </h3>
            <div className="text-[13px] text-slate-600 leading-relaxed flex-1">
              {f.body}
            </div>
            {f.source && (
              <a
                href={f.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-amber-700 mt-2.5 pt-2 border-t border-slate-100 transition truncate">
                <span className="shrink-0">zdroj:</span>
                <span className="truncate">{f.source.label}</span>
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </Wrapper>
  );
}
