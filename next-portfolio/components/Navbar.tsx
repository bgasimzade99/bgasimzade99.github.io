'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useScrollState } from '@/hooks/useScrollState';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const NAV_ITEMS = [
  { href: '/#home', label: 'Home', id: 'home' },
  { href: '/#about', label: 'About', id: 'about' },
  { href: '/#skills', label: 'Skills', id: 'skills' },
  { href: '/#projects', label: 'Projects', id: 'projects' },
  { href: '/#contact', label: 'Contact', id: 'contact' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function NavLink({
  item,
  isActive,
  onNavigate,
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  onNavigate: (href: string) => void;
}) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onNavigate(item.href);
    },
    [item.href, onNavigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onNavigate(item.href);
      }
    },
    [item.href, onNavigate]
  );

  return (
    <Link
      href={item.href}
      prefetch={false}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="menuitem"
      aria-current={isActive ? 'page' : undefined}
      className={`relative py-2 text-sm font-medium tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded ${
        isActive ? 'text-white' : 'text-white/75 hover:text-white'
      }`}
    >
      {item.label}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-px bg-teal-400 rounded-full"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ originX: 0 }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const activeSection = useScrollSpy(pathname === '/' ? SECTION_IDS : []);
  const scrolled = useScrollState(40);
  const scrollTo = useSmoothScroll();

  const handleNavigate = useCallback(
    (href: string) => {
      if (pathname === '/') {
        const id = href.split('#')[1];
        if (id) scrollTo(id);
      }
      setMobileOpen(false);
    },
    [pathname, scrollTo]
  );

  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>('a[href]');
    const first = focusable[0];
    if (first) first.focus();
  }, [mobileOpen]);

  const handleMobileKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key !== 'Tab') return;
      const menu = mobileMenuRef.current;
      if (!menu) return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a[href]'));
      if (e.shiftKey) {
        if (index === 0) {
          e.preventDefault();
          focusable[focusable.length - 1]?.focus();
        }
      } else {
        if (index === focusable.length - 1) {
          e.preventDefault();
          focusable[0]?.focus();
        }
      }
    },
    []
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.03)]'
          : 'bg-transparent'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <nav
        className="w-full max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link
          href="/#home"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              handleNavigate('/#home');
            }
          }}
          onKeyDown={(e) => {
            if (pathname === '/' && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleNavigate('/#home');
            }
          }}
          className="font-semibold text-lg tracking-[0.12em] hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] rounded"
          style={{
            background: 'linear-gradient(90deg, #2dd4bf, #38bdf8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
          aria-label="BGDev - Go to home"
        >
          BGDev
        </Link>

        <ul
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8"
          role="menubar"
          aria-label="Section navigation"
        >
          {NAV_ITEMS.filter((i) => i.id !== 'contact').map((item) => (
            <li key={item.href} role="none">
              <NavLink item={item} isActive={activeSection === item.id} onNavigate={handleNavigate} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                handleNavigate('/#contact');
              }
            }}
            onKeyDown={(e) => {
              if (pathname === '/' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleNavigate('/#contact');
              }
            }}
            className="hidden lg:inline-flex px-5 py-2.5 rounded-full border border-teal-500/50 bg-teal-500/10 text-white text-sm font-medium hover:border-teal-500/70 hover:bg-teal-500/15 hover:shadow-[0_0_24px_rgba(20,184,166,0.2)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            aria-label="Contact me"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.06]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <ul className="py-4 px-6 space-y-1 max-h-[70vh] overflow-y-auto" role="menu">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.href);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigate(item.href);
                      }
                      handleMobileKeyDown(e, index);
                    }}
                    className={`block py-3 px-3 rounded-lg transition-colors tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-inset ${
                      activeSection === item.id
                        ? 'text-teal-400 font-medium bg-white/5'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
