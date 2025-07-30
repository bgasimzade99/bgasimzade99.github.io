import React from "react";

const Navbar = ({ changeLanguage, currentLang }) => {
  return (
    <nav className="w-full bg-black p-4 flex justify-between items-center text-white sticky top-0 z-50">
      <div className="text-xl font-bold">BgDev</div>
      <ul className="flex space-x-6">
        <li>
          <a href="#about" className="hover:text-purple-400">
            About
          </a>
        </li>
        <li>
          <a href="#projects" className="hover:text-purple-400">
            Projects
          </a>
        </li>
        <li>
          <a href="#skills" className="hover:text-purple-400">
            Skills
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-purple-400">
            Contact
          </a>
        </li>
      </ul>

      {/* Dil Değiştirme Butonları */}
      <div className="space-x-3">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded font-semibold transition ${
            currentLang === "en"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-purple-500"
          }`}
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => changeLanguage("az")}
          className={`px-3 py-1 rounded font-semibold transition ${
            currentLang === "az"
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-purple-500"
          }`}
        >
          🇦🇿 AZ
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
