'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const highlights = (t('about.highlights') as unknown as string[] | undefined) ?? profile.aboutHighlights;
  const metrics = [
    { value: '10+', labelKey: 'projects' as const },
    { value: '5+', labelKey: 'team' as const },
    { value: 'Production', labelKey: 'production' as const },
  ];

  const animate = (opacity: number, y: number) => ({ opacity, y });
  const trans = (d: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration: d, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-10 md:py-16 lg:py-20 border-t border-white/[0.05]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr,auto] gap-14 items-start">
          <motion.div
            initial={animate(0, 36)}
            animate={isInView ? animate(1, 0) : animate(0, 36)}
            transition={trans(0.65)}
            viewport={{ once: true, margin: '-60px' }}
          >
            <h2 id="about-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-4 md:mb-5">
              {String(t('about.title') ?? 'About')}
            </h2>
            <div className="text-sm md:text-base lg:text-lg text-white/62 leading-[1.6] md:leading-[1.7] mb-6 md:mb-8">
              <p className={expanded ? '' : 'line-clamp-4 md:line-clamp-none'}>
                {String(t('about.summary') ?? profile.summary)}
              </p>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="text-teal-400/90 text-sm font-medium mt-2 min-h-[44px] md:hidden"
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            </div>
            <ul className="space-y-2 md:space-y-2.5 mb-6 md:mb-10">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={animate(0, -10)}
                  animate={isInView ? animate(1, 0) : animate(0, -10)}
                  transition={trans(0.35, i * 0.06)}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-white/65 text-[0.95rem] leading-relaxed"
                >
                  <span className="text-teal-500/90 mt-0.5 shrink-0">▸</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={animate(0, 14)}
              animate={isInView ? animate(1, 0) : animate(0, 14)}
              transition={trans(0.5, 0.1)}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white text-sm font-medium hover:border-white/[0.18] hover:bg-white/[0.05] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                {String(t('about.downloadCV') ?? 'Download CV')}
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-teal-500/90 hover:bg-teal-500 text-white text-sm font-semibold transition-colors duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                {String(t('about.letsTalk') ?? "Let's talk")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={animate(0, 16)}
            animate={isInView ? animate(1, 0) : animate(0, 20)}
            transition={trans(0.5, 0.08)}
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-5"
          >
            {metrics.map((m) => (
              <div
                key={m.labelKey}
                className="px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm min-w-[120px] sm:min-w-[140px]"
              >
                <div className="text-2xl font-bold tracking-[-0.02em] text-teal-400/95 mb-0.5">{m.value}</div>
                <div className="text-xs text-white/48 uppercase tracking-wider">
                  {String((t('about.metrics') as unknown as Record<string, string>)?.[m.labelKey] ?? m.labelKey)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Education & Certifications block */}
        <motion.div
          initial={animate(0, 24)}
          animate={isInView ? animate(1, 0) : animate(0, 24)}
          transition={trans(0.5, 0.2)}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-white/[0.06]"
        >
          <h3 className="text-xl font-semibold text-white mb-6">{String(t('about.education') ?? 'Education & Certifications')}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {((t('profile.education') as unknown as Array<{ degree: string; school: string; dates: string; notes?: string }>) ?? profile.education).map((edu, i) => (
              <motion.div
                key={`${edu.school}-${edu.degree}-${i}`}
                initial={animate(0, 12)}
                animate={isInView ? animate(1, 0) : animate(0, 12)}
                transition={trans(0.4, 0.25 + i * 0.06)}
                viewport={{ once: true }}
                className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06]"
              >
                <h4 className="text-sm font-semibold text-white mb-1">{edu.degree}</h4>
                <p className="text-teal-400/85 text-xs mb-1">{edu.school}</p>
                <p className="text-xs text-white/45">{edu.dates}</p>
                {edu.notes && <p className="text-xs text-white/55 mt-2">{edu.notes}</p>}
              </motion.div>
            ))}
            {profile.certifications.map((cert, i) => (
              <motion.div
                key={`${cert.name}-${cert.issuer}`}
                initial={animate(0, 12)}
                animate={isInView ? animate(1, 0) : animate(0, 12)}
                transition={trans(0.4, 0.25 + (profile.education.length + i) * 0.06)}
                viewport={{ once: true }}
                className="rounded-xl p-5 bg-white/[0.02] border border-white/[0.06]"
              >
                <h4 className="text-sm font-semibold text-white mb-1">{cert.name}</h4>
                <p className="text-teal-400/85 text-xs mb-1">{cert.issuer}</p>
                <p className="text-xs text-white/45">{cert.year}</p>
              </motion.div>
            ))}
            {profile.education.length === 0 && profile.certifications.length === 0 && (
              <p className="text-white/45 text-sm">—</p>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
