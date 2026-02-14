'use client';

import { motion } from 'framer-motion';
import { profile } from '@/content/profile';

export default function Certifications() {
  if (profile.certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="relative py-20 lg:py-24 border-t border-white/[0.05]"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="certifications-heading"
            className="text-4xl font-bold tracking-[-0.025em] leading-[1.15] text-white mb-4"
          >
            Certifications
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mb-14 leading-relaxed">
            Professional certifications and credentials.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.certifications.map((cert, i) => (
            <motion.div
              key={`${cert.name}-${cert.issuer}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{cert.name}</h3>
              <p className="text-teal-400/90 text-sm mb-1">{cert.issuer}</p>
              <p className="text-sm text-white/45">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
