'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is in view using IntersectionObserver.
 * Returns the id of the section with the largest intersection ratio.
 */
export function useScrollSpy(sectionIds: string[], options?: { rootMargin?: string; threshold?: number }) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? 'home');

  useEffect(() => {
    const ids = sectionIds.filter(Boolean);
    if (ids.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (id && ids.includes(id)) {
            ratios.set(id, entry.intersectionRatio);
          }
        });

        let maxRatio = 0;
        let leader = ids[0];
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            leader = id;
          }
        });

        if (maxRatio > 0) {
          setActiveSection(leader);
        }
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? '-20% 0px -65% 0px',
        threshold: options?.threshold ?? [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const timeout = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [sectionIds.join(',')]);

  return activeSection;
}
