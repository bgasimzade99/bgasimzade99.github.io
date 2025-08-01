import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import SkillTree from "./components/SkillTree";
import Portfolio from "./components/Portfolio";
import LiveCodeEditor from "./components/LiveCodeEditor";
import ProjectTimeline from "./components/ProjectTimeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <SkillTree />
        <Portfolio />
        <LiveCodeEditor />
        <ProjectTimeline />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;