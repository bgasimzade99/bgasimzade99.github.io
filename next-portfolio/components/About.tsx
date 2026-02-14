'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { profile } from '@/content/profile';

const METRICS = [
  { value: '10+', label: 'Projects shipped' },
  { value: '5+', label: 'Team projects' },
  { value: 'Production', label: 'Real user delivery' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  const animate = (opacity: number, y: number) => ({ opacity, y });
  const trans = (d: number, delay = 0) =>
    reduced ? { duration: 0 } : { duration: d, delay, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 lg:py-20 border-t border-white/[0.05]"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,auto] gap-14 items-start">
          <motion.div
            initial={animate(0, 36)}
            animate={isInView ? animate(1, 0) : animate(0, 36)}
            transition={trans(0.65)}
            viewport={{ once: true, margin: '-60px' }}
          >
            <h2 id="about-heading" className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-5">
              About
            </h2>
            <p className="text-base lg:text-lg text-white/62 leading-[1.7] mb-8">{profile.summary}</p>
            <ul className="space-y-2.5 mb-10">
              {profile.aboutHighlights.map((item, i) => (
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white text-sm font-medium hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                Download CV
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/90 hover:bg-teal-500 text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
              >
                Let&apos;s talk
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
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="px-5 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm min-w-[140px]"
              >
                <div className="text-2xl font-bold tracking-[-0.02em] text-teal-400/95 mb-0.5">{m.value}</div>
                <div className="text-xs text-white/48 uppercase tracking-wider">{m.label}</div>
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
          <h3 className="text-xl font-semibold text-white mb-6">Education & Certifications</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {profile.education.map((edu, i) => (
              <motion.div
                key={`${edu.school}-${edu.degree}`}
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

        {/* Languages block */}
        {profile.languages && profile.languages.length > 0 && (
          <motion.div
            initial={animate(0, 16)}
            animate={isInView ? animate(1, 0) : animate(0, 16)}
            transition={trans(0.45, 0.3)}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/[0.06]"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map(({ lang, level }, i) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/75 text-sm"
                >
                  <span className="font-medium text-white/90">{lang}</span>
                  <span className="text-white/45 text-xs uppercase">{level}</span>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
