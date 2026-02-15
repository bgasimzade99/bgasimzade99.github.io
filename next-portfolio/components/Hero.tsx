'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { profile } from '@/content/profile';
import HeroPhrase from '@/components/HeroPhrase';
import TypewriterText from '@/components/TypewriterText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLanguage } from '@/contexts/LanguageContext';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedVariants = {
  container: { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } } },
  item: { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } },
};

export default function Hero() {
  const techBadges = profile.skillGroups[0]?.skills.slice(0, 4).map((s) => s.name) ?? ['React', 'Next.js', 'Tailwind'];
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const el = document.getElementById('home');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setHeroVisible(e.isIntersecting),
      { threshold: 0.1, rootMargin: '0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row md:items-center pt-14 pb-24 md:pb-0 md:pt-16 overflow-hidden bg-[#0a0a0f]"
      aria-label="Hero introduction"
    >
      {/* Background: gradient + orbs only */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-40 w-[420px] h-[420px] bg-teal-500/6 rounded-full blur-[140px] gradient-orb" />
        <div className="absolute bottom-1/4 -right-40 w-[420px] h-[420px] bg-cyan-500/4 rounded-full blur-[140px] gradient-orb" style={{ animationDelay: '-11s' }} />
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-teal-400/5 rounded-full blur-[80px] animate-float-drift" />
      </div>

      {/* Optional: subtle portrait background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute right-0 top-0 bottom-0 w-[70%] min-w-0 md:min-w-[400px] lg:min-w-[500px] max-w-full opacity-[0.12]"
          style={{
            maskImage: 'radial-gradient(ellipse 60% 80% at 85% 45%, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 85% 45%, black 20%, transparent 70%)',
          }}
        >
          <Image
            src="/meq2w.jpg"
            alt=""
            fill
            sizes="70vw"
            className="object-cover object-[65%_50%]"
            style={{ filter: 'brightness(0.6) contrast(1.1)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.6) 40%, transparent 70%)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center md:justify-center w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-12 lg:gap-16">
          <div className="flex-1 min-w-0 order-1 lg:order-1">
            <motion.div
              variants={reduced ? reducedVariants.container : container}
              initial="hidden"
              animate="visible"
            >
              {/* Title — compact on mobile, full on desktop */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[3.1rem] xl:text-[3.5rem] font-bold tracking-[-0.032em] leading-[1.2] text-white mb-3 md:mb-5"
              >
                <span className="block">
                  {reduced ? (
                    <>
                      {profile.fullName}
                      <br />
                      <span className="text-[0.92em] text-white/90">{String(t('profile.headline') ?? profile.headline)}</span>
                    </>
                  ) : (
                    <>
                      <TypewriterText
                        text={profile.fullName}
                        speed={55}
                        delay={300}
                        cursor={true}
                      />
                      <br />
                      <span className="text-[0.92em] text-white/90">
                        <TypewriterText
                          text={String(t('profile.headline') ?? profile.headline)}
                          speed={42}
                          delay={300 + profile.fullName.length * 55 + 400}
                          cursor={true}
                        />
                      </span>
                    </>
                  )}
                </span>
              </h1>

              {/* Subtitle — short on mobile, full on desktop */}
              <motion.p
                variants={reduced ? reducedVariants.item : item}
                className="text-sm md:text-lg lg:text-xl text-white/60 leading-[1.6] mb-6 md:mb-10 max-w-md md:max-w-none"
              >
                <span className="md:hidden">{String(t('hero.subtitle') ?? 'Building web and mobile apps.')}</span>
                <span className="hidden md:inline">{String(t('hero.subtitle') ?? 'Building web and mobile apps with React and React Native.')} <HeroPhrase /></span>
              </motion.p>

              <motion.div
                variants={reduced ? reducedVariants.item : item}
                className="flex flex-wrap gap-2.5 md:gap-3 mb-6 md:mb-10"
              >
                <motion.a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduced ? {} : { scale: 1.02, y: -2 }}
                  whileTap={reduced ? {} : { scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 md:px-6 py-3 md:py-3.5 rounded-xl border border-teal-500/50 bg-teal-500/10 text-white text-sm md:text-base font-medium hover:border-teal-500/70 hover:bg-teal-500/15 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {String(t('hero.downloadCV') ?? 'Download CV')}
                </motion.a>
                <motion.div
                  whileHover={reduced ? {} : { scale: 1.02, y: -2 }}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Link
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white font-medium hover:bg-white/[0.08] hover:border-white/[0.18] hover:shadow-[0_0_16px_rgba(255,255,255,0.04)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                  >
                    {String(t('hero.viewProjects') ?? 'View Projects')}
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={reduced ? {} : { scale: 1.02, y: -2 }}
                  whileTap={reduced ? {} : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.15] bg-white/[0.04] text-white font-medium hover:border-white/[0.22] hover:bg-white/[0.06] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
                  >
                    {String(t('hero.contactMe') ?? 'Contact Me')}
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={reduced ? reducedVariants.item : item}
                className="flex flex-wrap items-center gap-5 text-sm text-white/50"
              >
                {techBadges.map((tech, i) => (
                  <span key={tech} className="flex items-center gap-2">
                    {i > 0 && <span className="text-white/20">·</span>}
                    <span>{tech}</span>
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Portrait card — compact circle on mobile, full card on desktop */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 order-2 lg:order-2 w-28 h-28 sm:w-36 sm:h-36 md:w-full md:h-auto md:max-w-[400px] lg:max-w-[520px] lg:w-[480px] xl:w-[500px] mx-auto lg:mx-0"
          >
            <div
              className="relative overflow-hidden rounded-full md:rounded-[24px] aspect-square md:aspect-[4/5] w-full"
              style={{
                boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              <Image
                src="/meq2w.jpg"
                alt={`${profile.fullName} — ${profile.headline}`}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-[50%_30%]"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(ellipse 80% 60% at 50% 20%, transparent 30%, rgba(0,0,0,0.4) 100%),
                    radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%),
                    linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.85) 100%)
                  `,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: fixed bottom CTA bar — app onboarding style, hides when scrolled past hero */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 pb-6 pt-3 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/[0.06] transition-transform duration-300 ${
          heroVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex gap-3 max-w-[1200px] mx-auto">
          <Link
            href="#projects"
            className="flex-1 min-h-[48px] flex items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.12] text-white font-semibold text-sm active:scale-[0.98] transition-transform"
          >
            {String(t('hero.viewProjects') ?? 'View Projects')}
          </Link>
          <Link
            href="#contact"
            className="flex-1 min-h-[48px] flex items-center justify-center rounded-xl bg-teal-500/90 text-white font-semibold text-sm active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(20,184,166,0.2)]"
          >
            {String(t('hero.contactMe') ?? 'Contact Me')}
          </Link>
        </div>
      </div>
    </section>
  );
}
