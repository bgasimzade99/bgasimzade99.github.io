'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Locale = 'en' | 'az' | 'tr';

const STORAGE_KEY = 'portfolio-locale';

const locales: Locale[] = ['en', 'az', 'tr'];

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && locales.includes(stored)) return stored;
  return 'en';
}

type Translations = Record<string, unknown>;

async function loadLocale(locale: Locale): Promise<Translations> {
  const mod = await import(`@/locales/${locale}.json`);
  return mod.default;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string | string[] | Record<string, string> | undefined;
  isLoading: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    loadLocale(locale).then((t) => {
      if (!cancelled) {
        setTranslations(t);
        setIsLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l === 'az' ? 'az' : l === 'tr' ? 'tr' : 'en';
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'az' ? 'az' : locale === 'tr' ? 'tr' : 'en';
  }, [locale]);

  const t = useCallback(
    (key: string): string | string[] | Record<string, string> | undefined => {
      if (!translations) return undefined;
      const parts = key.split('.');
      let cur: unknown = translations;
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
          cur = (cur as Record<string, unknown>)[p];
        } else {
          return undefined;
        }
      }
      return cur as string | string[] | Record<string, string>;
    },
    [translations]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
