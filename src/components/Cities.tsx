import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { DAY_COLORS, DAY_NAMES, DAY_START_KM } from '@/data/trip';

type CityInfo = {
  day: 1 | 2 | 3;
  name: string;
  km: number;
  ele?: number;
  teaser: string;
  body: React.ReactNode;
};

const CITIES: CityInfo[] = [
  {
    day: 1,
    name: 'Radstadt',
    km: 0,
    ele: 856,
    teaser: 'Jediné opevněné město v Salzbursku — tři věže a hradby ze 13. stol.',
    body: (
      <>
        <p>
          Jediné město v Salzbursku kromě samotného Salzburgu se zachovalými{' '}
          <strong>městskými hradbami</strong>. Městská práva udělil císař{' '}
          <strong>Rudolf I. Habsburský roku 1289</strong>. Poloha na staré
          obchodní cestě přes Tauernský průsmyk (Tauernpass) — tudy se vozila sůl
          ze salzburských dolů do Štýrska.
        </p>
        <p className="mt-2">
          Tři dochované obranné věže — <em>Kapuzinerturm</em>, <em>Frauenturm</em>{' '}
          a <em>Schrannerturm</em> — lemují okruh hradeb, který se dá obejít za
          20 minut. Dnes hlavně lyžařské středisko Ski Amadé, ale centrum si
          udrželo ráz pozdně gotického Stadtplatzu s renesančními měšťanskými
          domy.
        </p>
      </>
    ),
  },
  {
    day: 1,
    name: 'Schladming',
    km: 20,
    ele: 745,
    teaser: 'MS v alpském lyžování 2013. Dříve hornické město, stříbro a kobalt.',
    body: (
      <>
        <p>
          Hostitelské město <strong>Mistrovství světa v alpském lyžování 2013</strong>{' '}
          — vrchol turistické infrastruktury Rakouska. Dříve ale hornické: od 14.
          století se zde těžilo <strong>stříbro, měď a kobalt</strong> z žilných
          ložisek v pohoří Schladminger Tauern.
        </p>
        <p className="mt-2">
          V roce <strong>1525 padlo město obětí selské války</strong>{' '}
          (Bauernkrieg) — poté co rolníci odmítli platit vysoké daně
          salzburskému arcibiskupovi, byl Schladming zničen jako výstraha.
          Dnešní kašna na Hauptplatzu z roku 1629 stojí na místě původního
          středověkého tržiště.
        </p>
      </>
    ),
  },
  {
    day: 1,
    name: 'Gröbming',
    km: 42,
    ele: 768,
    teaser: 'Dachstein z náměstí. Pozdně gotický kostel, v reformaci protestantské.',
    body: (
      <>
        <p>
          Menší obec s dominantním výhledem na <strong>Dachstein</strong>{' '}
          z hlavního náměstí. Pozdně gotický <strong>kostel sv. Martina</strong>{' '}
          z 15. století patří k nejstarším dochovaným v oblasti — zajímavé je
          jeho propojení pozdně gotického presbytáře s renesanční úpravou lodi.
        </p>
        <p className="mt-2">
          V reformaci patřilo Gröbming mezi <strong>centra protestantismu v Štýrsku</strong>.
          Po rekatolizaci v 17. století stál místní protestantský obyvatelstvo
          před volbou: buď konvertovat, nebo emigrovat do Pruska či Slezska
          (několik „Exulantendörfer" v Bavorsku a Hesensku založili právě lidé
          z této oblasti).
        </p>
      </>
    ),
  },
  {
    day: 1,
    name: 'Irdning',
    km: 60,
    ele: 640,
    teaser: 'Římské kořeny, dnes centrum rakouského výzkumu horského zemědělství.',
    body: (
      <>
        <p>
          Malá obec s kořeny v římském osídlení provincie <strong>Noricum</strong>.
          Dnes zde sídlí <strong>LFZ Raumberg-Gumpenstein</strong> — rakouský
          federální výzkumný institut pro horské zemědělství. Řeší vše od
          šlechtění travin po chov skotu v alpských podmínkách — tedy to, co je
          pro Ennstal ekonomicky zásadní.
        </p>
        <p className="mt-2">
          V nedalekém <strong>zámku Trautenfels</strong> (14. stol.) je
          regionální muzeum ennské kotliny — archeologie, národopis a přírodní
          historie v jednom.
        </p>
      </>
    ),
  },
  {
    day: 1,
    name: 'Liezen',
    km: 77,
    ele: 659,
    teaser: 'Dopravní uzel středního Ennstalu — A9, Pyhrnstrecke a Ennstalbahn.',
    body: (
      <>
        <p>
          Dopravní uzel středního Ennstalu — křižují se zde{' '}
          <strong>dálnice A9 Pyhrn</strong> a dvě železnice:{' '}
          <strong>Ennstalbahn</strong> (podél naší trasy) a{' '}
          <strong>Pyhrnstrecke</strong> (z Lince do Selzthalu). Hospodářské
          centrum oblasti — nákupy, úřady, okresní nemocnice pro okolní horské
          obce.
        </p>
        <p className="mt-2">
          Poloha na úpatí <strong>Totes Gebirge</strong> (Mrtvé hory — impozantní
          plochý vápencový masiv) a národního parku <strong>Kalkalpen</strong>{' '}
          z ní dělá i nástupní bod k horské turistice mimo sezónu.
        </p>
      </>
    ),
  },
  {
    day: 1,
    name: 'Admont',
    km: 99,
    ele: 638,
    teaser: 'Stift Admont — největší klášterní knihovna na světě (70 000 svazků).',
    body: (
      <>
        <p>
          Benediktinské opatství <strong>Stift Admont</strong>, založené roku{' '}
          <strong>1074</strong>, má <strong>největší klášterní knihovnu na světě</strong>:
          70 000 svazků v 70 m dlouhém dvoupatrovém sále, strop vyzdobil
          Bartolomeo Altomonte (1776) alegoriemi vědy a víry.
        </p>
        <p className="mt-2">
          V 19. století bylo admontské skriptorium celosvětového významu. V roce{' '}
          <strong>1865 zachvátil klášter rozsáhlý požár</strong> — zachránila se
          právě jen knihovna, protože mniši stihli zavřít její požárotěsné dveře.
          Restaurovaný barokní komplex dnes obsahuje i muzeum přírodnin s jednou
          z největších <strong>entomologických sbírek na světě</strong>{' '}
          (~252 000 exemplářů hmyzu).
        </p>
      </>
    ),
  },
  {
    day: 2,
    name: 'Hieflau',
    km: 125,
    ele: 498,
    teaser: 'Překladiště na Eisenstraße — vory s železem po Enns do hutí na Dunaji.',
    body: (
      <>
        <p>
          Malé městečko v úzkém údolí, historicky klíčový bod{' '}
          <strong>Eisenstraße</strong> — „železné stezky" vedoucí z hory{' '}
          <strong>Erzberg</strong> (Eisenerz) do hutí na Dunaji.
        </p>
        <p className="mt-2">
          Hieflau byl důležité <strong>překladiště</strong>: zde se železná ruda
          a surové železo převáděly z povozů na <strong>vory</strong>, které pak
          po řece Enns pluly dál do hutí ve Steyru, Mauthausenu a Kastenreith.
          Plavci na Enns (Flößer) byli specializovaná profese s vlastním
          cechem — cesta s vorem nabitým hematitem vyžadovala zkušenost s
          říčními soutěskami.
        </p>
      </>
    ),
  },
  {
    day: 2,
    name: 'Großreifling',
    km: 134,
    ele: 470,
    teaser: 'Hammer — dochovaná preindustriální huť na kraji NP Kalkalpen.',
    body: (
      <p>
        Historické hutnictví a dřevozpracujicí průmysl. Dnes malá obec na
        pomezí Štýrska a Horního Rakouska, na kraji národního parku{' '}
        <strong>Kalkalpen</strong>. Objekt <strong>„Hammer"</strong> — stará
        hutní stavba s vodním pohonem kladiva — je dochovanou ukázkou
        preindustriálního průmyslu regionu <strong>Eisenwurzen</strong>{' '}
        („železné kořeny"), kde se těžba a zpracování železa provozovaly již
        od 13. století.
      </p>
    ),
  },
  {
    day: 2,
    name: 'Altenmarkt u St. Gallen',
    km: 145,
    ele: 490,
    teaser: 'Starý trh na středověké obchodní stezce k Erzbergu.',
    body: (
      <p>
        Obec u poutního místa <strong>St. Gallen</strong> s barokním klášterem
        (původ zhruba 1160). V okolí impozantní vápencové stěny{' '}
        <strong>Hochhaide</strong>. Název „Altenmarkt" (starý trh) odkazuje na
        středověké tržiště, které se tu konalo na staré obchodní stezce k{' '}
        <strong>Erzbergu</strong> — tudy se vozila ruda do hutí v Pyhrn-Priel
        oblasti.
      </p>
    ),
  },
  {
    day: 2,
    name: 'Weyer',
    km: 167,
    ele: 420,
    teaser: 'Jedno z nejhezčích tržních měst Ennstalu — arkýřové domy 16.–18. stol.',
    body: (
      <>
        <p>
          Historické tržní město s významným obdobím v 16.–18. století, kdy
          bylo <strong>střediskem železářství a obchodu se dřevem</strong>.
          Zachovaná historická zástavba s arkýřovými měšťanskými domy patří
          mezi <strong>nejhezčí v celém Ennstalu</strong>.
        </p>
        <p className="mt-2">
          Tržní náměstí má typickou rakouskou <strong>„Marktgasse"</strong>{' '}
          podobu — dlouhou ulici rozšířenou v obou koncích pro trhy, s fontánami
          a dochovanými kašnami. Weyer patří do sítě rakouských „historických
          městských center" (Denkmalgeschützte Ortsbilder).
        </p>
      </>
    ),
  },
  {
    day: 2,
    name: 'Großraming',
    km: 176,
    ele: 347,
    teaser: 'Brána do národního parku Kalkalpen. Náš nocleh v Kirchenwirtu.',
    body: (
      <p>
        Tržní obec v údolí Enns, <strong>brána do národního parku Kalkalpen</strong>{' '}
        (rakouský národní park z roku 1997, největší lesní chráněná oblast
        v zemi). Hlavní ekonomika dnes — turistika a lesnictví. V obci
        zachovalý pozdně gotický kostel a hostinec{' '}
        <strong>Kirchenwirt</strong>, který stojí zde nepřetržitě od 17. století.
        Právě tam spíme náš druhý nocleh.
      </p>
    ),
  },
  {
    day: 3,
    name: 'Reichraming',
    km: 185,
    ele: 345,
    teaser: 'Centrum NP Kalkalpen + muzeum železářství Eisenwurzen.',
    body: (
      <p>
        Správní centrum národního parku <strong>Kalkalpen</strong>. Historicky
        součást <strong>Eisenwurzen</strong> — regionu těžby železa, jehož
        produkce ve 16. století zásobovala <strong>celou rakouskou monarchii</strong>.
        V obci je stará železárna <strong>Hammerwerk</strong>, dnes muzeum
        s funkčním vodním kladivem — ukázka toho, jak se surové železo kovalo
        do polotovarů před nástupem parního stroje.
      </p>
    ),
  },
  {
    day: 3,
    name: 'Losenstein',
    km: 191,
    ele: 329,
    teaser: 'Zřícenina hradu Losensteinerleiten — sídlo mocného rodu Losensteinů.',
    body: (
      <>
        <p>
          Dominantou obce je zřícenina hradu{' '}
          <strong>Burg Losensteinerleiten</strong>, založeného kolem roku{' '}
          <strong>1212</strong>. Rod <strong>Losensteinů</strong> byl jedním
          z nejmocnějších šlechtických rodů v Horním Rakousku.
        </p>
        <p className="mt-2">
          V raném novověku vlastnili rozsáhlé panství od Ennstalu po hrady
          v Uhrách — Losensteinové byli i dvorskými maršály habsburské
          monarchie. Hrad byl opuštěn v 17. století a postupně chátrá. Vystup
          k zřícenině nabízí jeden z nejhezčích výhledů na údolí Enns.
        </p>
      </>
    ),
  },
  {
    day: 3,
    name: 'Steyr',
    km: 214,
    ele: 311,
    teaser:
      'Jedno z nejkrásnějších náměstí Rakouska. Zbrojovka Steyr Mannlicher.',
    body: (
      <>
        <p>
          Třetí největší město Horního Rakouska na soutoku Enns a Steyr.{' '}
          <strong>Renesanční Stadtplatz patří k nejkrásnějším náměstím v Rakousku</strong>{' '}
          — <em>Bummerlhaus</em> z 15. století s výraznými arkýři,{' '}
          <em>Lamberg-Schloss</em>, radnice z roku 1765.
        </p>
        <p className="mt-2">
          Historicky klíčové obchodní město se železem (<em>
            Innerberger Hauptgewerkschaft
          </em>). V 19. století zde vznikla firma{' '}
          <strong>Steyr-Daimler-Puch</strong> — zbraně, automobily, kola, jízdní
          motocykly. <strong>Steyr Mannlicher</strong> je dodnes světově proslulý
          výrobce zbraní (lovecké pušky, sportovní biatlonové pušky). V Steyru
          také krátce působil jako varhaník skladatel{' '}
          <strong>Anton Bruckner</strong>.
        </p>
      </>
    ),
  },
  {
    day: 3,
    name: 'Enns',
    km: 239,
    ele: 281,
    teaser: 'Nejstarší město Rakouska (1212). Římské Lauriacum, Stadtturm 59 m.',
    body: (
      <>
        <p>
          <strong>Nejstarší oficiálně dokumentované město v Rakousku</strong>{' '}
          — městská privilegia udělena <strong>22. dubna 1212</strong>{' '}
          markraběm Leopoldem VI. Babenberským.
        </p>
        <p className="mt-2">
          Osídlení zde ale existuje nepřerušeně od doby římské:{' '}
          <strong>Lauriacum</strong> byl legionářský tábor{' '}
          <strong>II. italské legie</strong> (2. století) a později sídlo
          biskupství — jedno z nejranějších křesťanských center v Podunají.
          Dominantou je 59 m vysoký <strong>Stadtturm</strong> (1564–1568) —
          volně stojící hodinová věž uprostřed Hauptplatz. Zde Enns ústí do{' '}
          <strong>Dunaje</strong>.
        </p>
      </>
    ),
  },
  {
    day: 3,
    name: 'Mauthausen',
    km: 243,
    ele: 250,
    teaser:
      'KZ-Gedenkstätte — památník. Před válkou granitové lomy pro dláždění Vídně.',
    body: (
      <>
        <p>
          Obec s tíživou historií: <strong>KZ Mauthausen-Gusen</strong>{' '}
          (1938–1945) byl <strong>nejkrutější nacistický koncentrační tábor
          v Rakousku</strong>, dnes národní památník (KZ-Gedenkstätte).
        </p>
        <p className="mt-2">
          Před válkou bylo Mauthausen proslulé <strong>granitovými lomy</strong>{' '}
          — „Wiener Pflastersteiner", dlažební kostky pro Vídeň, se těžily právě
          zde. Těžba kamene v lomech tábora pak byla hlavní pracovní činností
          vězňů — nechvalně známé <strong>„Schody smrti"</strong> (Todesstiege)
          vedoucí do lomu, po kterých vězni vynášeli žulové kvádry, jsou
          zachovány dodnes.
        </p>
      </>
    ),
  },
  {
    day: 3,
    name: 'Steyregg',
    km: 255,
    ele: 249,
    teaser: 'Zámek Steyregg ze 12. stol. — jedno z nejstarších sídel v Horním Rakousku.',
    body: (
      <p>
        Obec na severním břehu Dunaje naproti Linci, s dominantním zámkem{' '}
        <strong>Schloss Steyregg</strong> ze 12. století — jedním z nejstarších
        šlechtických sídel v Horním Rakousku. Zámek vlastnili postupně{' '}
        <em>Kuenringové</em>, <em>Starhembergové</em> a od 20. století rod{' '}
        <em>Alfreda von Liechtensteina</em>. Dnes soukromý a nepřístupný, ale
        impozantní ze strany Dunaje.
      </p>
    ),
  },
  {
    day: 3,
    name: 'Linec',
    km: 263,
    ele: 266,
    teaser:
      'UNESCO City of Media Arts. Ars Electronica, Nová katedrála, Linecký koláč.',
    body: (
      <>
        <p>
          Třetí největší město Rakouska a hlavní město Horního Rakouska.{' '}
          <strong>Hauptplatz</strong> s vysokou barokní mariánskou sloupem
          (1723) patří k nejkrásnějším náměstím střední Evropy.
        </p>
        <p className="mt-2">
          <strong>Nová katedrála</strong> (Neuer Dom, 1862–1935) je{' '}
          <strong>největší katedrála v Rakousku</strong> — pojme 20 000 lidí,
          věž měří 134 m. Linec je <strong>UNESCO City of Media Arts</strong> —{' '}
          <strong>Ars Electronica Center</strong> na druhém břehu Dunaje je
          špičkové muzeum digitálního umění a robotiky.
        </p>
        <p className="mt-2">
          Sladký symbol města: <strong>Linecký koláč</strong> (Linzer Torte) —{' '}
          <strong>nejstarší doložený recept na dort na světě</strong>{' '}
          (1653, zapsán mimochodem právě v klášteře Admont, odkud naše trasa
          vede).
        </p>
      </>
    ),
  },
];

export type CitiesProps = { embedded?: boolean };

export function Cities({ embedded = false }: CitiesProps = {}) {
  const outerClass = embedded ? '' : 'mt-10 md:mt-14';
  const Wrapper = (props: React.HTMLAttributes<HTMLElement>) =>
    embedded ? <div {...props} /> : <section {...props} />;

  return (
    <Wrapper className={outerClass}>
      {!embedded && (
        <div className="mb-5">
          <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
            Města na trase
          </div>
          <h2 className="section-title">Čím jsou tady zajímavé</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Devatenáct měst mezi Radstadtem a Lincem — každé se svou historií.
            Klikni na libovolné pro více kontextu.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {([1, 2, 3] as const).map((day) => {
          const items = CITIES.filter((c) => c.day === day);
          if (!items.length) return null;
          const color = DAY_COLORS[day];
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="card overflow-hidden">
              <div
                className="px-5 py-3 flex items-center gap-3 border-b border-slate-200/60"
                style={{
                  background: `linear-gradient(90deg, ${color}12 0%, transparent 70%)`,
                }}>
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <h3 className="font-display font-bold text-base md:text-lg text-ink">
                  {DAY_NAMES[day]}
                </h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {items.map((c) => {
                  const kmInDay = Math.max(0, c.km - DAY_START_KM[c.day]);
                  return (
                    <li key={`${c.day}-${c.name}`}>
                      <details className="group">
                        <summary className="cursor-pointer list-none p-4 md:p-5 flex items-start gap-4 hover:bg-slate-50/60 transition">
                          <div
                            className="inline-flex items-center justify-center h-10 w-10 rounded-full border shrink-0"
                            style={{
                              color,
                              background: `${color}12`,
                              borderColor: `${color}55`,
                            }}>
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-0.5">
                              <span className="font-display font-semibold text-base md:text-lg text-ink leading-tight">
                                {c.name}
                              </span>
                              <span
                                className="text-[11px] tabular-nums text-slate-400"
                                title={`${c.km} km od startu`}>
                                km {kmInDay} dne
                              </span>
                              {c.ele !== undefined && (
                                <span className="text-[11px] tabular-nums text-slate-400">
                                  · {c.ele} m n. m.
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-slate-500 mt-0.5 leading-snug">
                              {c.teaser}
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-slate-400 shrink-0 group-open:rotate-180 transition-transform mt-0.5" />
                        </summary>
                        <div className="px-4 md:px-5 pb-5 pt-1 md:pl-[4.5rem] text-[0.95rem] leading-relaxed text-slate-700">
                          {c.body}
                        </div>
                      </details>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Wrapper>
  );
}
