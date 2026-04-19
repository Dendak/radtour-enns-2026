import { useSyncExternalStore } from 'react';

export type HoverPoint = { lat: number; lon: number; label: string } | null;

let current: HoverPoint = null;
const listeners = new Set<() => void>();

export function setHover(next: HoverPoint) {
  if (current === next) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): HoverPoint {
  return current;
}

export function useHover(): HoverPoint {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
