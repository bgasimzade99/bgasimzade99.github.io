import React from "react";

export default function Navbar({ changeLanguage, currentLang }) {
  return (
    <nav className="sticky top-0 bg-black bg-opacity-70 backdrop-blur-md z-50 flex justify-between items-center px-6 py-3">
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Kanka Dev
      </div>
      <div className="space-x-3">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded transition ${
            currentLang === "en"
              ? "bg-pink-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-pink-600 hover:text-white"
          }`}
        >
          🇬🇧 EN
        </button>
        <button
          onClick={() => changeLanguage("az")}
          className={`px-3 py-1 rounded transition ${
            currentLang === "az"
              ? "bg-pink-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-pink-600 hover:text-white"
          }`}
        >
          🇦🇿 AZ
        </button>
      </div>
    </nav>
  );
}
