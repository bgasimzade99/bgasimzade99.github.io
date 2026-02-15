'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

function ExperienceCard({
  job,
  i,
  expData,
  reduced,
  t,
}: {
  job: (typeof profile.experience)[0];
  i: number;
  expData: { role?: string; period?: string; bullets?: string[] } | undefined;
  reduced: boolean;
  t: (key: string) => unknown;
}) {
  const [expanded, setExpanded] = useState(false);
  const role = expData?.role ?? job.role;
  const period = expData?.period ?? job.period;
  const bullets = expData?.bullets ?? job.bullets;
  const showExpand = bullets.length > 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="rounded-2xl p-4 md:p-0 md:pl-6 md:pb-6 md:border-l-2 md:border-white/[0.06] md:relative md:last:pb-0 md:last:border-l-transparent bg-white/[0.02] md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-white/[0.06] md:border-0 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.3)] md:shadow-none"
    >
      <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-teal-500/50 border-2 border-[#0a0a0f] hidden md:block" />
      <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
        <h3 className="text-base font-semibold text-white">{role}</h3>
        <span className="text-white/35">·</span>
        <span className="text-teal-400/85 text-sm">{job.company}</span>
      </div>
      <p className="text-xs text-white/42 mb-3">{period}</p>
      <ul className="space-y-1.5 mb-3">
        {(showExpand && !expanded ? bullets.slice(0, 2) : bullets).map((bullet, j) => (
          <motion.li
            key={j}
            initial={false}
            className="flex items-start gap-2 text-white/62 text-sm leading-[1.5]"
          >
            <span className="text-teal-500/80 mt-0.5 shrink-0 text-[10px]">▸</span>
            {bullet}
          </motion.li>
        ))}
      </ul>
      {showExpand && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-teal-400/90 font-medium flex items-center gap-1 min-h-[44px] md:hidden"
        >
          {expanded ? 'Show less' : `+${bullets.length - 2} more`}
        </button>
      )}
      {job.tech && job.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-white/35 px-1.5 py-0.5 rounded bg-white/[0.04]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function Experience() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  return (
    <div
      id="experience"
      className="relative pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="experience-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-2 md:mb-3"
          >
            {String(t('work.title') ?? 'Experience')}
          </h2>
          <p className="text-sm md:text-base text-white/58 max-w-xl mb-8 md:mb-12 leading-relaxed">
            {String(t('work.subtitle') ?? 'Professional journey — roles, responsibilities, and tech stacks.')}
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {profile.experience.map((job, i) => {
            const expData = ((t('profile.experience') as unknown as Array<{ role: string; period: string; bullets: string[] }>) ?? [])[i];
            return (
              <ExperienceCard
                key={`${job.company}-${i}`}
                job={job}
                i={i}
                expData={expData}
                reduced={reduced}
                t={t}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
