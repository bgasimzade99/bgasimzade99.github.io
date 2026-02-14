import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import AmbientBackground from '@/components/AmbientBackground';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Babak Gasimzade | Front-End & Mobile Developer',
  icons: {
    icon: '/image.png',
    apple: '/image.png',
  },
  description:
    "Senior Front-End & Mobile Developer. I build exceptional SaaS platforms & mobile applications. Real-world projects driving results through cutting-edge technology.",
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
    title: 'Babak Gasimzade | Senior Front-End & Mobile Developer',
    description:
      "I build exceptional SaaS platforms & mobile applications. Real-world projects driving results through cutting-edge technology.",
    url: 'https://www.bgdev.dev',
    siteName: 'Babak Gasimzade | Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babak Gasimzade | Senior Front-End & Mobile Developer',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans antialiased bg-dark-900 text-white">
        <AmbientBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
