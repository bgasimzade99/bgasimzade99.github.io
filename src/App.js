import React from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";

import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Skills from "./components/Skills.tsx";
import Portfolio from "./components/Portfolio.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";

function AppContent() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-slate-900">
      <Header />
      <main className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
