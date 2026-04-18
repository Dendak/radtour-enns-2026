export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 text-sm text-slate-500 flex flex-wrap gap-x-6 gap-y-2 justify-between">
        <span>Cyklovýlet 1.–3. května 2026</span>
        <span>
          Počasí: <a className="hover:text-slate-800" href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a>
          {' · '}
          Mapa: <a className="hover:text-slate-800" href="https://www.cyclosm.org" target="_blank" rel="noreferrer">CyclOSM</a>
          {' / '}
          <a className="hover:text-slate-800" href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a>
        </span>
      </div>
    </footer>
  );
}
