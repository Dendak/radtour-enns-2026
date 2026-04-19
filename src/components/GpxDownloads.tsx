import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { splitTrackByDay, type TrackPoint } from '@/hooks/useGpxTrack';
import { DAY_COLORS, DAY_NAMES } from '@/data/trip';

function escapeXml(s: string): string {
  return s.replace(
    /[<>&"']/g,
    (c) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c] ?? c),
  );
}

function buildGpx(points: TrackPoint[], name: string): string {
  const pts = points
    .map(
      (p) =>
        `    <trkpt lat="${p.lat.toFixed(7)}" lon="${p.lon.toFixed(7)}"><ele>${p.ele.toFixed(1)}</ele></trkpt>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Ennsradweg 2026" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata><name>${escapeXml(name)}</name></metadata>
  <trk><name>${escapeXml(name)}</name><trkseg>
${pts}
  </trkseg></trk>
</gpx>`;
}

function downloadGpx(points: TrackPoint[], name: string, filename: string) {
  const gpx = buildGpx(points, name);
  const blob = new Blob([gpx], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export type GpxDownloadsProps = {
  track: TrackPoint[];
  dayEnd: Record<1 | 2, number>;
};

export function GpxDownloads({ track, dayEnd }: GpxDownloadsProps) {
  const hasTrack = track.length > 0;
  const byDay = hasTrack ? splitTrackByDay(track, dayEnd) : null;

  const items: {
    label: string;
    name: string;
    filename: string;
    points: TrackPoint[];
    color?: string;
    km?: number;
  }[] = hasTrack
    ? [
        {
          label: 'Celá trasa',
          name: 'Ennsradweg 2026 — celá trasa',
          filename: 'ennsradweg-2026-cela-trasa.gpx',
          points: track,
          km: Math.round(track[track.length - 1].dist),
        },
        ...([1, 2, 3] as const).map((d) => ({
          label: `Den ${d} · ${DAY_NAMES[d]}`,
          name: `Ennsradweg 2026 — den ${d} (${DAY_NAMES[d]})`,
          filename: `ennsradweg-2026-den${d}.gpx`,
          points: byDay![d],
          color: DAY_COLORS[d],
          km:
            byDay![d].length > 0
              ? Math.round(
                  byDay![d][byDay![d].length - 1].dist - byDay![d][0].dist,
                )
              : undefined,
        })),
      ]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="card p-5 mt-4 md:mt-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
          <Download className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display font-bold text-base text-ink leading-tight">
            GPX ke stažení
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Nahraj do Komoot, Garmin, Wahoo, Strava nebo OsmAnd
          </div>
        </div>
      </div>

      {!hasTrack ? (
        <div className="text-sm text-slate-400 italic">Trasa se načítá …</div>
      ) : (
        <>
          <div className="grid gap-2 sm:grid-cols-2">
            {items.map((it) => (
              <button
                key={it.filename}
                type="button"
                onClick={() => downloadGpx(it.points, it.name, it.filename)}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left hover:border-amber-300 hover:bg-amber-50/40 transition">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: it.color ?? '#0f172a' }}
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-ink truncate">
                    {it.label}
                  </span>
                  {it.km !== undefined && (
                    <span className="block text-xs text-slate-500 tabular-nums">
                      {it.km} km · {it.points.length.toLocaleString('cs-CZ')} bodů
                    </span>
                  )}
                </span>
                <Download className="h-4 w-4 text-slate-400 group-hover:text-amber-700 shrink-0" />
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Tip: v Komoot naimportuj jako „Tour" pro zachování etap, v Garmin Connect
            jako „Course".
          </p>
        </>
      )}
    </motion.div>
  );
}
