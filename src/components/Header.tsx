import React from "react";

const Header = () => (
  <header className="bg-white shadow">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Your Name</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#portfolio" className="hover:text-blue-600">Portfolio</a></li>
          <li><a href="#skills" className="hover:text-blue-600">Skills</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;