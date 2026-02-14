'use client';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import PageLoadAnimation from '@/components/PageLoadAnimation';

export default function Home() {
  return (
    <PageLoadAnimation>
      <ScrollProgress />
      <main role="main" aria-label="Main content">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
        <Footer />
      </main>
      <ScrollIndicator />
      <BackToTop />
    </PageLoadAnimation>
  );
}
