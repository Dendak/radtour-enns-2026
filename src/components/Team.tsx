import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { TEAM } from '@/data/trip';

export function Team() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45 }}
      className="mt-8 md:mt-10">
      <div className="card p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
              Tým
            </div>
            <h2 className="font-display font-bold text-lg md:text-xl text-ink leading-tight">
              {TEAM.length} cyklistů na trase
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-sm md:text-base text-slate-700">
          {TEAM.map((name) => (
            <li key={name} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
              <span className="font-medium">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
