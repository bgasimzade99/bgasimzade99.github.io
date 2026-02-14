import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#151520',
          600: '#1a1a28',
        },
        teal: {
          glow: 'rgba(20, 184, 166, 0.4)',
        },
      },
      animation: {
        'gradient-drift': 'gradient-drift 20s ease-in-out infinite',
      },
      keyframes: {
        'gradient-drift': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.6' },
        },
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
