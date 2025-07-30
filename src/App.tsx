import React from "react";
// Make sure the Header component exists at the specified path.
// If it does not exist, create the file 'src/components/Header.tsx' with a basic component:
import Header from "./components/Header";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10">
        <About />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;