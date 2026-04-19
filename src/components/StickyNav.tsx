import { useEffect, useState } from 'react';
import {
  Map,
  CloudSun,
  Sparkles,
  BedDouble,
  Landmark,
  Lightbulb,
  Info,
  Route,
} from 'lucide-react';

const SECTIONS: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'mapa', label: 'Mapa', icon: <Map className="h-3.5 w-3.5" /> },
  { id: 'pocasi', label: 'Počasí', icon: <CloudSun className="h-3.5 w-3.5" /> },
  { id: 'poi', label: 'Co uvidíme', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'ubytovani', label: 'Nocleh', icon: <BedDouble className="h-3.5 w-3.5" /> },
  { id: 'mesta', label: 'Města', icon: <Landmark className="h-3.5 w-3.5" /> },
  { id: 'fun-facts', label: 'Fun facts', icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { id: 'o-trase', label: 'O trase', icon: <Route className="h-3.5 w-3.5" /> },
  { id: 'info', label: 'Info', icon: <Info className="h-3.5 w-3.5" /> },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>('mapa');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Sekce"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
      <div className="bg-white/85 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 md:px-6 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-ink mr-2 shrink-0 hover:text-amber-700 transition">
            Enns 2026
          </a>
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shrink-0 whitespace-nowrap transition ${
                  active === s.id
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}>
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
