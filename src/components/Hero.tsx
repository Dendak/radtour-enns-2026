import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Calendar, MapPin, Users, MoveRight, Hourglass } from 'lucide-react';
import { TRIP, TEAM } from '@/data/trip';
import { TopoPattern } from './TopoPattern';

const TRIP_START = new Date('2026-05-01T09:00:00+02:00');
function daysUntilTrip() {
  const ms = TRIP_START.getTime() - Date.now();
  return Math.ceil(ms / 86_400_000);
}
function plural(n: number, one: string, few: string, many: string) {
  const abs = Math.abs(n);
  if (abs === 1) return one;
  if (abs >= 2 && abs <= 4) return few;
  return many;
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.6, 0.2, 1] } },
};

// Austrian Alps / Enns valley photo (Unsplash, public)
const HERO_PHOTO =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=75';

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-hero-fallback text-white">
      {/* Photo layer */}
      <img
        src={HERO_PHOTO}
        alt=""
        aria-hidden
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
      />
      {/* Gradient overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950/85 via-stone-900/50 to-stone-900/25" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-stone-950/90" />
      {/* Topographic contour lines decoration */}
      <TopoPattern className="text-amber-100/20 mix-blend-screen" />

      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-28 pb-20 md:pb-28">
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-5 max-w-3xl">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1.5 text-xs tracking-[0.18em] uppercase text-amber-200 shadow-sm">
            <Bike className="h-3.5 w-3.5" /> Cyklovýlet
          </motion.div>
          <motion.h1 variants={item} className="font-display font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight drop-shadow-sm">
            {TRIP.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-200 to-emerald-200">
              {TRIP.subtitle}
            </span>
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-xl text-stone-100/85 max-w-2xl leading-relaxed">
            Tři dny podél řeky Enns — z Vysokých Taur přes Národní park Gesäuse až k Dunaji v Linci.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center gap-2 md:gap-3 pt-2">
            <Stat icon={<Calendar className="h-4 w-4" />} label={TRIP.dateLabel} />
            <Stat icon={<MapPin className="h-4 w-4" />} label={`${TRIP.totalKm} km`} />
            <Stat icon={<MoveRight className="h-4 w-4" />} label={`${TRIP.days} dny`} />
            <Stat icon={<Users className="h-4 w-4" />} label={`${TRIP.riders} lidí`} />
          </motion.div>
          <motion.div variants={item} className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-amber-200/90 mr-1">
              <Users className="h-3.5 w-3.5" /> Tým
            </span>
            {TEAM.map((m) => (
              <span
                key={m.nick}
                title={m.full}
                className="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-2.5 py-1 text-sm font-medium backdrop-blur">
                {m.nick}
              </span>
            ))}
          </motion.div>
          <motion.div variants={item}>
            <Countdown />
          </motion.div>
        </motion.div>
      </div>

      {/* Paper wave transition */}
      <svg className="block w-full h-10 md:h-16 -mb-px text-paper" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0 60 L0 30 C240 60 480 0 720 20 C960 40 1200 10 1440 30 L1440 60 Z" />
      </svg>
    </header>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-sm backdrop-blur">
      <span className="text-amber-200">{icon}</span>
      <span>{label}</span>
    </span>
  );
}

function Countdown() {
  const [n, setN] = useState(() => daysUntilTrip());
  useEffect(() => {
    const id = window.setInterval(() => setN(daysUntilTrip()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  let text: string;
  let tone = 'text-amber-100';
  if (n > 0) {
    text = `Za ${n} ${plural(n, 'den', 'dny', 'dní')} vyrážíme`;
    if (n <= 14) tone = 'text-amber-200';
    if (n <= 3) tone = 'text-emerald-200';
  } else if (n === 0) {
    text = 'Vyrážíme dnes!';
    tone = 'text-emerald-200';
  } else if (n >= -2) {
    text = 'Cyklovýlet právě probíhá';
    tone = 'text-emerald-200';
  } else {
    text = 'Cyklovýlet už máme za sebou';
    tone = 'text-stone-200';
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-black/20 border border-white/20 px-3 py-1.5 text-sm font-semibold backdrop-blur ${tone}`}>
      <Hourglass className="h-4 w-4" />
      {text}
    </span>
  );
}
