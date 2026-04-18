import { motion } from 'framer-motion';

export function SectionTitle({ eyebrow, title, hint }: { eyebrow?: string; title: string; hint?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="mb-5 md:mb-7">
      {eyebrow && (
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90 mb-1">{eyebrow}</div>
      )}
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="section-title">{title}</h2>
        {hint && <div className="text-sm text-slate-500">{hint}</div>}
      </div>
    </motion.div>
  );
}
