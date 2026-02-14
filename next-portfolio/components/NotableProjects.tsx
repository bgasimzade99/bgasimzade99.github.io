'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  mobile: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  saas: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  web: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9a9 9 0 009 9m-9-9a9 9 0 009-9m9 9h-9" />
    </svg>
  ),
  ecommerce: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
};

const CATEGORY_COLORS: Record<string, string> = {
  mobile: '#0c4a6e',
  saas: '#581c87',
  web: '#14532d',
  ecommerce: '#422006',
};

function HoverIcons({
  project,
  onOpenImage,
}: {
  project: (typeof profile.projects)[0];
  onOpenImage: () => void;
}) {
  const linkUrl = project.liveUrl ?? `/projects/${project.slug}`;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity duration-300">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenImage();
        }}
        className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/25 transition-colors cursor-pointer"
        aria-label="View image full size"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      <a
        href={linkUrl}
        target={project.liveUrl ? '_blank' : undefined}
        rel={project.liveUrl ? 'noopener noreferrer' : undefined}
        onClick={(e) => e.stopPropagation()}
        className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/25 transition-colors"
        aria-label="Open project"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

function ProjectPreviewArea({
  project,
  onOpenImage,
  previewLabel = 'Preview',
}: {
  project: (typeof profile.projects)[0];
  onOpenImage: () => void;
  previewLabel?: string;
}) {
  const color = CATEGORY_COLORS[project.category] ?? '#0c4a6e';
  return (
    <div
      className="relative h-44 rounded-t-xl overflow-hidden"
      style={{
        background: project.gradient ?? `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      }}
    >
      <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-medium text-white/95 uppercase tracking-wider">
        ▷ {previewLabel}
      </span>
      {project.image ? (
        <>
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl border-2 border-white/30 bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{project.title.slice(0, 2)}</span>
          </div>
        </div>
      )}
      <HoverIcons project={project} onOpenImage={onOpenImage} />
      <span className="absolute bottom-3 left-0 right-0 text-center text-xs font-semibold text-white drop-shadow-sm">
        {previewLabel}
      </span>
    </div>
  );
}

export default function NotableProjects() {
  const reduced = useReducedMotion();
  const [lightboxProject, setLightboxProject] = useState<(typeof profile.projects)[0] | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      id="projects"
      className="relative py-16 lg:py-20 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            id="projects-heading"
            className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-3"
          >
            {String(t('projects.title') ?? 'Projects')}
          </h2>
          <p className="text-base text-white/58 max-w-xl mb-12 leading-relaxed">
            {String(t('projects.subtitle') ?? 'Selected work — web apps, mobile apps, and SaaS platforms.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.projects.map((project, i) => {
            const projData = (t('profile.projects') as unknown as Record<string, { shortDesc: string; highlights: string[] }>) ?? {};
            const translated = projData[project.slug];
            const shortDesc = translated?.shortDesc ?? project.shortDesc;
            const highlights = translated?.highlights ?? project.highlights ?? project.stack.slice(0, 4);
            return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduced ? {} : { y: -4 }}
              className="group relative rounded-xl overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.2)] hover:border-teal-500/25 hover:shadow-[0_8px_32px_rgba(20,184,166,0.08)] transition-all duration-300"
            >
              <ProjectPreviewArea
                project={project}
                onOpenImage={() => project.image && setLightboxProject(project)}
                previewLabel={String(t('projects.preview') ?? 'Preview')}
              />

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold tracking-[-0.02em] text-white group-hover:text-teal-400/90 transition-colors">
                    {project.title}
                  </h3>
                  <span
                    className="text-teal-400"
                    style={{ color: CATEGORY_COLORS[project.category] ?? '#2dd4bf' }}
                  >
                    {CATEGORY_ICONS[project.category] ?? CATEGORY_ICONS.web}
                  </span>
                </div>

                <p className="text-sm text-white/55 mb-3 leading-relaxed line-clamp-3">
                  {shortDesc}
                </p>

                <p className="text-xs text-teal-400/90 font-medium mb-3">
                  ▷ {project.liveUrl ? String(t('projects.liveDemo') ?? 'Live Demo Available') : String(t('projects.caseStudy') ?? 'Case Study')}
                </p>
                <p className="text-[11px] text-white/40 mb-4">
                  {project.liveUrl
                    ? String(t('projects.clickToExplore') ?? 'Click View Project to explore the live site')
                    : String(t('projects.hoverToExplore') ?? 'Hover over the card to explore project features')}
                </p>

                <div className="mb-4">
                  <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">{String(t('projects.features') ?? 'Features')}:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {highlights.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.stack
                      .filter((tech) => !highlights.includes(tech))
                      .slice(0, 5)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-md border border-white/15 text-white/55 bg-white/[0.02] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500/90 hover:bg-teal-500 text-white text-sm font-semibold transition-colors group/btn"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {String(t('projects.viewProject') ?? 'View Project')}
                    </a>
                  ) : (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500/90 hover:bg-teal-500 text-white text-sm font-semibold transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {String(t('projects.caseStudy') ?? 'Case Study')}
                    </Link>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/[0.1] text-white/45 hover:bg-white/[0.06] hover:text-teal-400 hover:border-teal-500/30 transition-colors"
                    aria-label="View case study"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://bgdevofficial.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500/90 hover:bg-teal-500 text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            {String(t('projects.viewMore') ?? 'View more')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxProject?.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxProject(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-[90vw] h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxProject.image}
                alt={lightboxProject.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
