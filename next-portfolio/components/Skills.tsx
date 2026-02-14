'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

const SKILL_GROUP_KEYS = ['frontend', 'mobile', 'backend', 'tools'] as const;

function SkillCard({
  group,
  label,
  index,
  isInView,
}: {
  group: (typeof profile.skillGroups)[0];
  label: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl p-6 bg-white/[0.025] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-teal-400/90 text-lg">{group.icon ?? '◆'}</span>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{label}</h3>
      </div>
      <div className="space-y-3">
        {group.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-white/65">{skill.name}</span>
              {skill.level != null && (
                <span className="text-xs text-white/40">{skill.level}%</span>
              )}
            </div>
            {skill.level != null && (
              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500/80 to-teal-400/60 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: skill.level / 100 } : { scaleX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + index * 0.05 + i * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            )}
            {skill.level == null && (
              <span className="text-xs text-white/45 block mt-0.5">{skill.name}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-16 lg:py-20 border-t border-white/[0.05] overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="skills-heading"
            className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-3"
          >
            {String(t('skills.title') ?? 'Skills')}
          </h2>
          <p className="text-base text-white/58 max-w-xl mb-12 leading-relaxed">
            {String(t('skills.subtitle') ?? 'Technologies and tools I work with — proficiency based on project experience.')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.skillGroups.map((group, i) => {
            const labels = (t('profile.skillGroupLabels') as unknown as Record<string, string>) ?? {};
            const label = labels[SKILL_GROUP_KEYS[i]] ?? group.label;
            return <SkillCard key={group.label} group={group} label={label} index={i} isInView={isInView} />;
          })}
        </div>

        {profile.learning && profile.learning.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 rounded-xl p-5 bg-white/[0.02] border border-white/[0.04] border-dashed"
          >
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">{String(t('skills.learning') ?? 'Currently Learning')}</h4>
            <div className="flex flex-wrap gap-2">
              {profile.learning.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/55 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
