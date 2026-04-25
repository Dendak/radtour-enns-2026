import { useState } from 'react';
import { Image as ImageIcon, Landmark } from 'lucide-react';
import { Highlights } from '@/components/Highlights';
import { Cities } from '@/components/Cities';

type Tab = 'fotky' | 'mesta';

export function OnRoute() {
  const [tab, setTab] = useState<Tab>('fotky');

  return (
    <section className="mt-10 md:mt-14">
      <div className="mb-5">
        <div className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-700/90">
          Na trase
        </div>
        <h2 className="section-title">Co uvidíme a kam zajet</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          Všechno, co stojí za zastávku — fotky, tipy na jídlo a kafe, plus
          historie každého města, kterým projedeme.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Obsah na trase"
        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 mb-6 shadow-sm">
        <TabButton
          id="tab-fotky"
          panelId="panel-fotky"
          active={tab === 'fotky'}
          onClick={() => setTab('fotky')}
          icon={<ImageIcon className="h-4 w-4" />}
          label="Fotky & tipy"
        />
        <TabButton
          id="tab-mesta"
          panelId="panel-mesta"
          active={tab === 'mesta'}
          onClick={() => setTab('mesta')}
          icon={<Landmark className="h-4 w-4" />}
          label="Města & historie"
        />
      </div>

      <div
        role="tabpanel"
        id={tab === 'fotky' ? 'panel-fotky' : 'panel-mesta'}
        aria-labelledby={tab === 'fotky' ? 'tab-fotky' : 'tab-mesta'}>
        {tab === 'fotky' ? <Highlights embedded /> : <Cities embedded />}
      </div>
    </section>
  );
}

function TabButton({
  id,
  panelId,
  active,
  onClick,
  icon,
  label,
}: {
  id: string;
  panelId: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-controls={panelId}
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
        active
          ? 'bg-ink text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-50'
      }`}>
      {icon}
      {label}
    </button>
  );
}
