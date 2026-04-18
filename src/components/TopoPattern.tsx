import { cn } from '@/lib/utils';

export function TopoPattern({ className, stroke = 'currentColor' }: { className?: string; stroke?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 w-full h-full', className)}>
      <g fill="none" stroke={stroke} strokeWidth="1.1" strokeLinecap="round">
        <path d="M-40 110 C 180 60, 380 160, 600 110 C 820 60, 1020 160, 1240 110" />
        <path d="M-40 150 C 180 100, 380 200, 600 150 C 820 100, 1020 200, 1240 150" opacity="0.85" />
        <path d="M-40 195 C 180 145, 380 245, 600 195 C 820 145, 1020 245, 1240 195" opacity="0.7" />
        <path d="M-40 245 C 180 195, 380 295, 600 245 C 820 195, 1020 295, 1240 245" opacity="0.55" />
        <path d="M-40 310 C 220 260, 420 360, 640 310 C 860 260, 1020 360, 1240 310" opacity="0.4" />
        <path d="M-40 380 C 220 330, 420 430, 640 380 C 860 330, 1020 430, 1240 380" opacity="0.3" />
        <path d="M-40 460 C 220 410, 420 510, 640 460 C 860 410, 1020 510, 1240 460" opacity="0.22" />
        <path d="M-40 540 C 220 490, 420 590, 640 540 C 860 490, 1020 590, 1240 540" opacity="0.16" />
      </g>
    </svg>
  );
}
