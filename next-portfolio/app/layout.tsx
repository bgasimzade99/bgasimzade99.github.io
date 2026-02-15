import type { Metadata, Viewport } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AmbientBackground from '@/components/AmbientBackground';
import { LanguageProvider } from '@/contexts/LanguageContext';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Babak Gasimzade | Front-End & Mobile Developer',
  icons: {
    icon: '/image.png',
    apple: '/image.png',
  },
  description:
    "Junior Front-End & Mobile Developer. I build web and mobile applications with React and React Native. Looking for opportunities to grow and deliver real results.",
  keywords: [
    'Babak Gasimzade',
    'Frontend Developer',
    'Mobile Developer',
    'React',
    'Next.js',
    'SaaS',
  ],
  authors: [{ name: 'Babak Gasimzade', url: 'https://www.bgdev.dev' }],
  openGraph: {
    title: 'Babak Gasimzade | Junior Front-End & Mobile Developer',
    description:
      "I build web and mobile applications with React and React Native. Looking for opportunities to grow and deliver real results.",
    url: 'https://www.bgdev.dev',
    siteName: 'Babak Gasimzade | Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babak Gasimzade | Junior Front-End & Mobile Developer',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased bg-dark-900 text-white overflow-x-hidden">
        <LanguageProvider>
          <AmbientBackground />
          <Navbar />
          <div className="overflow-x-hidden w-full max-w-[100vw] min-w-0">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
