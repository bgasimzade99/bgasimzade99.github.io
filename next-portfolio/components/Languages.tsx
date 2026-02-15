'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Languages() {
  if (!profile.languages || profile.languages.length === 0) return null;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { t } = useLanguage();
  const levels = (t('profile.languageLevels') as unknown as Record<string, string>) ?? {};
  const names = (t('profile.langNames') as unknown as Record<string, string>) ?? {};

  return (
    <section
      id="languages"
      ref={ref}
      className="relative py-12 lg:py-14 pb-6 lg:pb-8 border-t border-white/[0.04]"
      aria-labelledby="languages-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <h2
            id="languages-heading"
            className="text-[1.25rem] sm:text-[1.375rem] font-semibold tracking-[-0.02em] text-white mb-2"
          >
            {String(t('about.languages') ?? 'Languages')}
          </h2>
          <p className="text-[13px] text-white/45 leading-relaxed max-w-xl">
            {String(t('about.languagesSubtitle') ?? 'Spoken languages and proficiency.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl p-5 sm:p-6 bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_2px_12px_-4px_rgba(0,0,0,0.3)]"
        >
          <div className="flex gap-4 md:gap-6 pb-2 md:pb-0 flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible scroll-x-touch">
            {profile.languages.map(({ lang, level }, i) => {
              const displayName = names[lang] ?? lang;
              const displayLevel = levels[level] ?? level;
              return (
                <motion.span
                  key={`${lang}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.04 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-white/75 bg-white/[0.03] border border-white/[0.06] shadow-[0_1px_4px_-2px_rgba(0,0,0,0.2)] transition-colors duration-200 hover:text-white/85 hover:border-white/[0.08] shrink-0"
                >
                  <span>{displayName}</span>
                  <span className="text-white/40 text-[11px] font-normal uppercase tracking-wider">
                    {displayLevel}
                  </span>
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
