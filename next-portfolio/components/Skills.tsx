'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

const CATEGORY_KEYS = ['coreStack', 'frontend', 'backend', 'mobile', 'engineering'] as const;

function SkillPill({ name, isAccent = false }: { name: string; isAccent?: boolean }) {
  return (
    <motion.span
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={`
        inline-flex items-center rounded-full font-medium
        transition-all duration-250 ease-out
        ${isAccent
          ? 'px-5 py-2.5 text-[14px] text-white bg-gradient-to-b from-teal-500/25 to-teal-600/8 border border-teal-500/35 shadow-[0_4px_14px_-3px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-teal-400/55 hover:shadow-[0_8px_24px_-6px_rgba(20,184,166,0.3),0_0_0_1px_rgba(20,184,166,0.2)]'
          : 'px-4 py-2 text-[13px] text-white/88 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.25)] hover:border-white/[0.15] hover:from-white/[0.08] hover:to-white/[0.04] hover:text-white hover:shadow-[0_4px_18px_-4px_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.05)]'
        }
      `}
    >
      {name}
    </motion.span>
  );
}

function SkillCard({
  group,
  label,
  index,
  isInView,
  isPrimary = false,
  className = '',
}: {
  group: (typeof profile.skillGroups)[0];
  label: string;
  index: number;
  isInView: boolean;
  isPrimary?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className={`
        relative rounded-2xl p-6 sm:p-8
        bg-white/[0.03] backdrop-blur-2xl
        border
        shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_32px_-8px_rgba(0,0,0,0.5)]
        transition-all duration-300 ease-out
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_40px_-12px_rgba(0,0,0,0.4)]
        ${isPrimary
          ? 'border-teal-500/25 shadow-[0_0_0_1px_rgba(20,184,166,0.08),0_8px_40px_-8px_rgba(0,0,0,0.5),0_0_40px_-20px_rgba(20,184,166,0.06)] hover:border-teal-500/40 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.12),0_12px_48px_-12px_rgba(0,0,0,0.4),0_0_60px_-24px_rgba(20,184,166,0.08)]'
          : 'border-white/[0.06] hover:border-white/[0.1]'
        }
        ${className}
      `}
    >
      <h3 className={`uppercase tracking-[0.14em] mb-5 font-medium ${isPrimary ? 'text-teal-400/90 text-[11px]' : 'text-white/45 text-[11px]'}`}>
        {label}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {group.skills.map((skill) => (
          <SkillPill key={skill.name} name={skill.name} isAccent={isPrimary} />
        ))}
      </div>
    </motion.div>
  );
}

const LABELS: Record<(typeof CATEGORY_KEYS)[number], string> = {
  coreStack: 'Core Stack',
  frontend: 'Frontend Development',
  backend: 'Backend & Databases',
  mobile: 'Mobile Development',
  engineering: 'Engineering & Tools',
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  const coreGroup = profile.skillGroups[0];
  const otherGroups = profile.skillGroups.slice(1);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative pt-10 lg:pt-12 pb-20 lg:pb-24 border-t border-white/[0.03] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Depth: subtle gradient + noise inherits from body */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 60%, rgba(20,184,166,0.015) 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-14"
        >
          <h2
            id="skills-heading"
            className="text-xl md:text-[1.625rem] lg:text-2xl font-semibold tracking-[-0.025em] text-white mb-2 md:mb-3 leading-tight"
          >
            {String(t('skills.title') ?? 'Skills')} & Tech Stack
          </h2>
          <p className="text-[13px] md:text-[15px] text-white/48 leading-[1.65] max-w-xl">
            {String(t('skills.subtitle') ?? 'Technologies and tools I work with.')}
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll tag rows */}
        <div className="md:hidden space-y-5">
          {profile.skillGroups.map((group, i) => {
            const labels = (t('profile.skillGroupLabels') as unknown as Record<string, string>) ?? {};
            const key = CATEGORY_KEYS[i];
            const label = labels[key] ?? LABELS[key] ?? group.label;
            return (
              <div key={group.label}>
                <p className="text-[10px] font-medium text-white/40 uppercase tracking-wider mb-2">{label}</p>
                <div className="flex gap-2 pb-2 -mx-1 scroll-x-touch">
                  {group.skills.map((skill) => (
                    <span key={skill.name} className="shrink-0">
                      <SkillPill name={skill.name} isAccent={i === 0} />
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: card layout */}
        <div className="hidden md:block">
        {/* Core Stack — dominant, full width, larger */}
        {coreGroup && (
          <div className="mb-6 lg:mb-8">
            <SkillCard
              group={coreGroup}
              label={LABELS.coreStack}
              index={0}
              isInView={isInView}
              isPrimary
              className="scale-[1.02] origin-top sm:p-9 lg:p-10"
            />
          </div>
        )}

        {/* Secondary categories — 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6 mb-6">
          {otherGroups.map((group, i) => {
            const labels = (t('profile.skillGroupLabels') as unknown as Record<string, string>) ?? {};
            const key = CATEGORY_KEYS[i + 1];
            const label = labels[key] ?? LABELS[key] ?? group.label;
            return (
              <SkillCard
                key={group.label}
                group={group}
                label={label}
                index={i + 1}
                isInView={isInView}
              />
            );
          })}
        </div>

        {/* Currently Learning — subtle, smaller */}
        {profile.learning && profile.learning.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-xl p-5 sm:p-6 bg-white/[0.015] backdrop-blur-xl border border-white/[0.04] border-dashed"
          >
            <h4 className="text-[10px] font-medium text-white/35 uppercase tracking-[0.16em] mb-3">
              {String(t('skills.learning') ?? 'Currently Learning')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.learning.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-[12px] text-white/45 bg-white/[0.02] border border-white/[0.03] transition-colors duration-200 hover:text-white/55 hover:border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
