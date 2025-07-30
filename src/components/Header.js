import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
            className="w-10 h-10 rounded-full border-2 border-white shadow animate-spin"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">Gasim Mobile</h1>
        </div>
        {/* Hamburger icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
        {/* Menu */}
        <nav>
          <ul className={`md:flex space-x-8 md:space-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-gradient-to-r from-blue-700 to-purple-700 md:bg-none shadow-lg md:shadow-none transition-all duration-300 z-40 ${menuOpen ? "block" : "hidden"} md:block`}>
            <li><a href="#about" className="block px-6 py-3 md:p-0 text-white hover:text-yellow-300 transition">About</a></li>
            <li><a href="#portfolio" className="block px-6 py-3 md:p-0 text-white hover:text-yellow-300 transition">Portfolio</a></li>
            <li><a href="#skills" className="block px-6 py-3 md:p-0 text-white hover:text-yellow-300 transition">Skills</a></li>
            <li><a href="#contact" className="block px-6 py-3 md:p-0 text-white hover:text-yellow-300 transition">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;