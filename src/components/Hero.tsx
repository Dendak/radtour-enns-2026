import { motion } from 'framer-motion';
import { Bike, Calendar, MapPin, Users, MoveRight } from 'lucide-react';
import { TRIP } from '@/data/trip';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.6, 0.2, 1] } },
};

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-hero-grad text-white">
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M0 50 Q25 20 50 50 T100 50' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: '140px 140px',
        }} />
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-14 md:pb-20">
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-5">
          <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-3 py-1 text-xs tracking-wider uppercase text-teal-200">
            <Bike className="h-3.5 w-3.5" /> Cyklovýlet · R7 + R1
          </motion.div>
          <motion.h1 variants={item} className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {TRIP.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-orange-300">
              {TRIP.subtitle}
            </span>
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-xl text-white/80 max-w-2xl">
            Tři dny podél řeky Enns — z Vysokých Taur přes Gesäuse až k Dunaji.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap items-center gap-2 md:gap-3 pt-2">
            <Stat icon={<Calendar className="h-4 w-4" />} label={TRIP.dateLabel} />
            <Stat icon={<MapPin className="h-4 w-4" />} label={`${TRIP.totalKm} km`} />
            <Stat icon={<MoveRight className="h-4 w-4" />} label={`${TRIP.days} dny`} />
            <Stat icon={<Users className="h-4 w-4" />} label={`${TRIP.riders} kola`} />
          </motion.div>
        </motion.div>
      </div>
      <svg className="block w-full h-10 md:h-16 -mb-px text-paper" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 60 L0 30 C240 60 480 0 720 20 C960 40 1200 10 1440 30 L1440 60 Z" />
      </svg>
    </header>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-sm backdrop-blur">
      <span className="text-teal-200">{icon}</span>
      <span>{label}</span>
    </span>
  );
}
