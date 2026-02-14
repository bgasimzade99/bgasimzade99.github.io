'use client';

import Experience from '@/components/Experience';
import NotableProjects from '@/components/NotableProjects';

export default function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-white/[0.05]"
      aria-label="Work — Experience and Projects"
    >
      <Experience />
      <NotableProjects />
    </section>
  );
}
