import { motion } from 'framer-motion';
import {
  BookOpen,
  Sparkles,
  MapPin,
  Mountain,
  Hammer,
  Flame,
  Church,
  Crosshair,
  Zap,
  Waves,
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
        vůbec — z rukopisné kuchařky hraběnky{' '}
        <em>Anny Margarity Sagramosy</em> z roku 1653. Zajímavost: rukopis byl{' '}
        <strong>objeven až v roce 2005</strong>, a to v archivech{' '}
        <strong>kláštera Admont</strong>. Naše trasa tak propojuje místo, kde
        se recept našel (Admont), s Lincem, po kterém je koláč pojmenovaný.
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
        Barokní sál knihovny ve Stift Admont měří{' '}
        <strong>70 m na délku, 14 m na šířku a 13 m do výšky</strong>, osvětluje
        ho 48 oken a zdobí 7 kupolí s freskami od{' '}
        <strong>Bartolomea Altomonta</strong>, který je maloval ve věku{' '}
        <strong>80 let</strong> (1775–1776). Celý klášterní fond má kolem{' '}
        200 000 svazků včetně <em>1 500 středověkých rukopisů</em> a 900
        prvotisků.
      </>
    ),
    source: {
      label: 'Wikipedia — Admont Abbey Library',
      url: 'https://en.wikipedia.org/wiki/Admont_Abbey_Library',
    },
  },
  {
    stat: '1865',
    statLabel: 'požár',
    title: 'Knihovna, která přežila zkázu',
    icon: <Flame className="h-5 w-5" />,
    body: (
      <>
        27. dubna 1865 <strong>zničil rozsáhlý požár téměř celý klášter</strong>{' '}
        Admont. Knihovní sál byl však jediný prostor, který zůstal{' '}
        <strong>nedotčený</strong> — byl oddělen požárotěsnými dveřmi. Dnes je
        tak barokní knihovna z roku 1776 <strong>jediná autentická část</strong>{' '}
        původního kláštera; zbytek byl přestavěn v neogotickém stylu.
      </>
    ),
    source: {
      label: 'Wikipedia — Admont Abbey',
      url: 'https://en.wikipedia.org/wiki/Admont_Abbey',
    },
  },
  {
    stat: '1212',
    statLabel: 'město od',
    title: 'Nejstarší rakouské město',
    icon: <ScrollText className="h-5 w-5" />,
    body: (
      <>
        Enns získal městská privilegia <strong>22. dubna 1212</strong>{' '}
        od babenberského vévody <strong>Leopolda VI. Slavného</strong> — je to
        <em> nejstarší dochovaná městská listina v Rakousku</em>. Pro srovnání:
        Vídeň dostala stejná práva <strong>až o 9 let později</strong> (1221),
        Eferding v roce 1222. Originál listiny je v Museum Lauriacum.
      </>
    ),
    source: {
      label: 'Wikipedia — Enns (town)',
      url: 'https://en.wikipedia.org/wiki/Enns_(town)',
    },
  },
  {
    stat: '205',
    statLabel: 'n. l.',
    title: 'Římský tábor pro 6 000 legionářů',
    icon: <Church className="h-5 w-5" />,
    body: (
      <>
        Na místě dnešního Ennsu stál římský legionářský tábor{' '}
        <strong>Lauriacum</strong> — kolem roku 200 n. l. tam byla přesunuta{' '}
        <strong>Legio II Italica</strong>. Tábor měřil{' '}
        <strong>539 × 398 m a byl větší než Carnuntum</strong>. Kolem roku{' '}
        <strong>370 n. l. zde vznikl první křesťanský kostel v Rakousku</strong>{' '}
        — jeho základy se zachovaly v podzemí dnešní baziliky sv. Vavřince.
      </>
    ),
    source: {
      label: 'Wikipedia — Lauriacum',
      url: 'https://en.wikipedia.org/wiki/Lauriacum',
    },
  },
  {
    stat: '2. stol.',
    statLabel: 'poprvé',
    title: 'Řeka jménem „Anisus"',
    icon: <Waves className="h-5 w-5" />,
    body: (
      <>
        Latinské jméno Enns bylo <strong>Anisus</strong> (nebo Anasus) a
        poprvé ho zapsal řecký geograf <strong>Klaudios Ptolemaios</strong>{' '}
        ve své <em>Geografii</em> v <strong>2. století n. l.</strong>{' '}
        Původ jména zůstává nejistý — nejčastější teorie je z
        indoevropského kořene <em>*on-</em> („voda") s hydronymickým suffixem{' '}
        <em>*-is-</em>.
      </>
    ),
    source: {
      label: 'Wikipedia — Enns (river)',
      url: 'https://en.wikipedia.org/wiki/Enns_(river)',
    },
  },
  {
    stat: '2 spolkové státy',
    title: 'Řeka, která pojmenovala dva státy',
    icon: <MapPin className="h-5 w-5" />,
    body: (
      <>
        Severně od Steyru tvoří Enns <strong>hranici dvou spolkových zemí</strong>.
        Historické názvy byly „<em>Österreich ob der Enns</em>" (nad Enns) a „
        <em>Österreich unter der Enns</em>" (pod Enns) — tedy dnešní{' '}
        <strong>Horní a Dolní Rakousko</strong>. Řeka tak pojmenovala obě země.
      </>
    ),
    source: {
      label: 'Wikipedia — Upper Austria',
      url: 'https://en.wikipedia.org/wiki/Upper_Austria',
    },
  },
  {
    stat: '253 km',
    statLabel: 'celá řeka',
    title: 'Jedeme od pramene do ústí',
    icon: <Waves className="h-5 w-5" />,
    body: (
      <>
        Enns měří celkem <strong>253 km</strong> a my za tři dny najedeme{' '}
        <strong>263 km</strong> — jedeme prakticky celou délku řeky od pramenů
        v Radstädter Tauern až po soutok s Dunajem. Povodí Enns má{' '}
        <strong>přes 6 000 km²</strong> (páté největší v Rakousku) a průměrný
        průtok v ústí je 201 m³/s.
      </>
    ),
    source: {
      label: 'Wikipedia — Enns (river)',
      url: 'https://en.wikipedia.org/wiki/Enns_(river)',
    },
  },
  {
    stat: '500 m',
    statLabel: 'stěny',
    title: 'Gesäuse znamená „řvoucí"',
    icon: <Mountain className="h-5 w-5" />,
    body: (
      <>
        Soutěska <strong>Gesäuse</strong> — po které jedeme 2. den — je{' '}
        <strong>15 km dlouhá</strong> a vápencové stěny se v ní tyčí{' '}
        <strong>až 500 m nad řekou</strong>. Jméno znamená v němčině
        „řvoucí" — odkazuje na hluk peřejí. Je to{' '}
        <strong>třetí největší národní park Rakouska</strong> (12 000 ha) a
        zároveň jediný úsek Enns, kde řeka teče <em>zcela neregulovaná</em>.
      </>
    ),
    source: {
      label: 'Nationalpark Gesäuse',
      url: 'https://nationalpark-gesaeuse.at/en/',
    },
  },
  {
    stat: '1 300+',
    statLabel: 'let těžby',
    title: 'Největší povrchový důl Evropy',
    icon: <Hammer className="h-5 w-5" />,
    body: (
      <>
        <strong>Erzberg</strong> u Eisenerzu (přítok Enns) je{' '}
        <strong>největší povrchový důl v Evropě</strong> a zároveň{' '}
        <strong>největší ložisko sideritu na světě</strong>. Železo se tu těží{' '}
        přes <strong>1 300 let</strong>, roční produkce je 3,2 mil. tun rudy.
        Celé údolí Enns se historicky jmenuje <em>Eisenwurzen</em> („železné
        kořeny") a v minulosti tvořilo páteř rakouského hutnictví.
      </>
    ),
    source: {
      label: 'Wikipedia — Erzberg mine',
      url: 'https://en.wikipedia.org/wiki/Erzberg_mine',
    },
  },
  {
    stat: '1915',
    statLabel: 'světový №1',
    title: 'Steyr — největší zbrojovka světa',
    icon: <Crosshair className="h-5 w-5" />,
    body: (
      <>
        V roce <strong>1915 byla Steyr největším výrobcem střelných zbraní
        na světě</strong>. Tradice kovářství sahá do 12.–13. století, v roce{' '}
        <strong>1287 udělil Habsburk Albrecht městu zvláštní privilegia</strong>{' '}
        pro zpracování železa. V roce 1864 zakládá <em>Josef Werndl</em>{' '}
        továrnu, která se spojí s geniálním konstruktérem{' '}
        <strong>Ferdinandem Mannlicherem</strong> — vzniká značka Steyr
        Mannlicher, dodnes světový výrobce loveckých a biatlonových pušek.
      </>
    ),
    source: {
      label: 'Wikipedia — Steyr Arms',
      url: 'https://en.wikipedia.org/wiki/Steyr_Arms',
    },
  },
  {
    stat: '1979',
    statLabel: 'od roku',
    title: 'Ars Electronica — průkopník digitálního umění',
    icon: <Zap className="h-5 w-5" />,
    body: (
      <>
        Festival <strong>Ars Electronica</strong> v Linci se konal poprvé{' '}
        <strong>18. září 1979</strong> — patří mezi <em>nejstarší festivaly
        digitálního a mediálního umění na světě</em>. První ročník přilákal{' '}
        <strong>100 000 návštěvníků</strong>. UNESCO za to Linci v roce 2014
        udělilo titul <strong>City of Media Arts</strong>.
      </>
    ),
    source: {
      label: 'Wikipedia — Ars Electronica',
      url: 'https://en.wikipedia.org/wiki/Ars_Electronica',
    },
  },
  {
    stat: '−780 m',
    statLabel: 'převýšení',
    title: 'Prakticky celé z kopce',
    icon: <Sparkles className="h-5 w-5" />,
    body: (
      <>
        Z Radstadtu (856 m n. m.) do Lince (266 m n. m.) klesáme celkem{' '}
        <strong>o 780 m</strong>. Podle oficiálních dat Ennsradweg R7 má na
        celé trase <strong>asi 1 500 m stoupání a 2 250 m klesání</strong> —
        tedy <em>o 750 m více klesání než stoupání</em>. To je příjemný
        bonus, který z této trasy dělá klasiku pro rodiny i pohodářské
        cyklisty.
      </>
    ),
    source: {
      label: 'Radstadt — Ennsradweg data',
      url: 'https://www.radstadt.com/en/holidays/cycling-mountain-biking-salzburg/ennsradweg-cycle-route/data-facts/',
    },
  },
];

export function FunFacts() {
  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
          Zajímavosti
        </div>
        <h2 className="section-title">Fun Facts — co asi nevíš</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          Třináct ověřených faktů o řece Enns, cyklostezce a městech na
          trase. Každý má odkaz na zdroj — všechno jsou doložené informace,
          nic vymyšleného.
        </p>
      </div>

      <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FACTS.map((f, i) => (
          <motion.article
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
            className="card p-5 flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-amber-50 text-amber-700 border border-amber-100 shrink-0">
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-display font-black text-2xl md:text-[1.65rem] text-ink leading-none tabular-nums">
                    {f.stat}
                  </span>
                  {f.statLabel && (
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                      {f.statLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <h3 className="font-display font-bold text-base text-ink leading-tight mb-2">
              {f.title}
            </h3>
            <div className="text-sm text-slate-600 leading-relaxed flex-1">
              {f.body}
            </div>
            {f.source && (
              <a
                href={f.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-700 mt-3 pt-3 border-t border-slate-100 transition">
                <span>zdroj:</span>
                <span className="truncate">{f.source.label}</span>
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
