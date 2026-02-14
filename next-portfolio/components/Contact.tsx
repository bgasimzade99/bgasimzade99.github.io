'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/content/profile';
import { useLanguage } from '@/contexts/LanguageContext';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: profile.socials.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.42 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: profile.socials.github,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'BGDev Official',
    href: 'https://bgdevofficial.com/',
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
        <defs>
          <linearGradient id="bgdev-contact-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path fill="url(#bgdev-contact-icon)" d="M5 4h2.2c2.5 0 4.3 1.8 4.3 4.2 0 1.4-.6 2.6-1.6 3.4.9.7 1.5 1.8 1.5 3.1 0 2.5-1.9 4.5-4.4 4.5H5V4zm1.5 6.2h.7c1.3 0 2.2-.9 2.2-2.2s-.9-2.2-2.2-2.2h-.7v4.4zm0 5.6h1.2c1.5 0 2.6-1.1 2.6-2.5s-1.1-2.5-2.6-2.5H6.5v5z" />
        <path fill="url(#bgdev-contact-icon)" d="M13.5 8.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 1.5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm-1 2.5v2h2.5v1h-2.5v2.5h-1.2v-6h3.7v1h-2.5z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${profile.socials.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useLanguage();

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = 'Invalid email format';
    if (!formData.message.trim()) next.message = 'Message is required';
    else if (formData.message.trim().length < 10) next.message = 'Message must be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (status === 'error') setStatus('idle');
    if (status === 'success') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to send message');
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/30 focus:border-white/[0.15] focus:ring-1 focus:ring-white/[0.08] focus:outline-none transition-all disabled:opacity-60';

  return (
    <section id="contact" className="relative py-16 lg:py-20 border-t border-white/[0.05]" aria-labelledby="contact-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-[1fr,1fr] gap-14 items-start"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 id="contact-heading" className="text-3xl lg:text-4xl font-bold tracking-[-0.028em] leading-[1.2] text-white mb-3">
              {String(t('contact.title') ?? 'Contact')}
            </h2>
            <p className="text-base text-white/58 mb-6 leading-relaxed">
              {String(t('contact.subtitle') ?? 'Ready to discuss your next project.')}
            </p>
            <p className="text-white/68 mb-1.5 text-xs font-medium uppercase tracking-wider">{String(t('contact.emailLabel') ?? t('contact.email') ?? 'Email')}</p>
            <a
              href={`mailto:${profile.socials.email}`}
              className="text-teal-400/95 hover:text-teal-400 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              {profile.socials.email}
            </a>
            {profile.socials.phone && (
              <>
                <p className="text-white/68 mb-1.5 mt-4 text-xs font-medium uppercase tracking-wider">{String(t('contact.phoneLabel') ?? 'Phone')}</p>
                <a
                  href={`tel:${profile.socials.phone.replace(/\s/g, '')}`}
                  className="text-teal-400/95 hover:text-teal-400 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                >
                  {profile.socials.phone}
                </a>
              </>
            )}
            <motion.div
              className="mt-6 flex gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {SOCIAL_LINKS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/55 hover:text-teal-400/90 hover:border-white/[0.12] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            aria-labelledby="contact-heading"
          >
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-white/62 mb-1">
                {String(t('contact.name') ?? 'Name')}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder={String(t('contact.namePlaceholder') ?? 'Your name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                disabled={status === 'submitting'}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-white/62 mb-1">
                {String(t('contact.email') ?? 'Email')}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder={String(t('contact.emailPlaceholder') ?? 'your@email.com')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                disabled={status === 'submitting'}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-white/62 mb-1">
                {String(t('contact.message') ?? 'Message')}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder={String(t('contact.messagePlaceholder') ?? 'Tell me about your project...')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                disabled={status === 'submitting'}
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-xs text-red-400" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
            {errorMessage && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-teal-500/90 hover:bg-teal-500 hover:shadow-[0_0_24px_rgba(20,184,166,0.2)] disabled:bg-teal-500/50 text-white text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? String(t('contact.sending') ?? 'Sending...') : status === 'success' ? String(t('contact.sent') ?? 'Message sent ✓') : String(t('contact.send') ?? 'Send message')}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
