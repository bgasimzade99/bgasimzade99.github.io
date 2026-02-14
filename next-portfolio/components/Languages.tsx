'use client';

import { motion } from 'framer-motion';
import { profile } from '@/content/profile';

export default function Languages() {
  if (!profile.languages || profile.languages.length === 0) return null;

  return (
    <section
      id="languages"
      className="relative py-16 lg:py-20 border-t border-white/[0.05]"
      aria-labelledby="languages-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          <h2
            id="languages-heading"
            className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-3"
          >
            Languages
          </h2>
          <p className="text-base text-white/58 max-w-xl mb-8 leading-relaxed">
            Spoken languages and proficiency levels.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-wrap gap-3"
        >
          {profile.languages.map(({ lang, level }, i) => (
            <motion.span
              key={lang}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] text-white/75 text-sm"
            >
              <span className="font-medium text-white/90">{lang}</span>
              <span className="text-white/45 text-xs uppercase tracking-wider">{level}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
