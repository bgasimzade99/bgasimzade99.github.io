'use client';

import { useCallback } from 'react';

/**
 * Returns a function that smoothly scrolls to an element by id (hash without #).
 */
export function useSmoothScroll() {
  return useCallback((hash: string) => {
    const id = hash.startsWith('#') ? hash.slice(1) : hash;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
}
