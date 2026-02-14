'use client';

import { motion } from 'framer-motion';
import { profile } from '@/content/profile';

export default function Education() {
  if (profile.education.length === 0) return null;

  return (
    <section
      id="education"
      className="relative py-16 lg:py-20 border-t border-white/[0.05]"
      aria-labelledby="education-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          <h2
            id="education-heading"
            className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-3"
          >
            Education
          </h2>
          <p className="text-base text-white/58 max-w-xl mb-12 leading-relaxed">
            Academic background.
          </p>
        </motion.div>

        <div className="space-y-4">
          {profile.education.map((edu, i) => (
            <motion.div
              key={`${edu.school}-${edu.degree}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl p-5 bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm"
            >
              <h3 className="text-base font-semibold text-white mb-1">{edu.degree}</h3>
              <p className="text-teal-400/85 text-sm mb-1">{edu.school}</p>
              <p className="text-xs text-white/45 mb-2">{edu.dates}</p>
              {edu.notes && <p className="text-sm text-white/58 mt-2 leading-relaxed">{edu.notes}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
