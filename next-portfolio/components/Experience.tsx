'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Experience() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  return (
    <div
      id="experience"
      className="relative pt-12 pb-16 lg:pt-14 lg:pb-20"
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
            className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-3"
          >
            {String(t('work.title') ?? 'Experience')}
          </h2>
          <p className="text-base text-white/58 max-w-xl mb-12 leading-relaxed">
            {String(t('work.subtitle') ?? 'Professional journey — roles, responsibilities, and tech stacks.')}
          </p>
        </motion.div>

        <div className="space-y-6">
          {profile.experience.map((job, i) => {
            const expData = ((t('profile.experience') as unknown as Array<{ role: string; period: string; bullets: string[] }>) ?? [])[i];
            const role = expData?.role ?? job.role;
            const period = expData?.period ?? job.period;
            const bullets = expData?.bullets ?? job.bullets;
            return (
              <motion.article
                key={`${job.company}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduced ? {} : { x: 4 }}
                className="relative pl-6 pb-6 border-l-2 border-white/[0.06] last:pb-0 last:border-l-transparent"
              >
                <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-teal-500/50 border-2 border-[#0a0a0f]" />
                <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-white">{role}</h3>
                  <span className="text-white/35">·</span>
                  <span className="text-teal-400/85 text-sm">{job.company}</span>
                </div>
                <p className="text-xs text-white/42 mb-3">{period}</p>
                <ul className="space-y-1.5 mb-3">
                  {bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-white/62 text-sm leading-[1.5]">
                      <span className="text-teal-500/80 mt-0.5 shrink-0 text-[10px]">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                {job.tech && job.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
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
          })}
        </div>
      </div>
    </div>
  );
}
