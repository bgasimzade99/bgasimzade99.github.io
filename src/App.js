import React from "react";
import "./i18n";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white flex flex-col">
      <Navbar changeLanguage={changeLanguage} currentLang={i18n.language} />
      <main className="flex-grow container mx-auto px-6 py-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
