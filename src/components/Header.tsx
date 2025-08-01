import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import Logo from "./Logo.tsx";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", key: "nav.home" },
    { href: "#about", key: "nav.about" },
    { href: "#skills", key: "nav.skills" },
    { href: "#portfolio", key: "nav.portfolio" },
    { href: "#contact", key: "nav.contact" },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    const homeElement = document.querySelector('#home');
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark 
            ? "bg-slate-900/90 backdrop-blur-md shadow-2xl border-b border-white/10"
            : "bg-white/90 backdrop-blur-md shadow-2xl border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              scrollToTop();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 cursor-pointer z-10 relative"
            type="button"
          >
            <Logo size={35} />
            <div className="flex flex-col">
              <span className={`text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ${isDark ? 'text-white' : 'text-gray-900'}`}>
                BGDev
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Welcome to my portfolio
              </span>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${isDark ? 'text-white/80 hover:text-white' : 'text-gray-700 hover:text-gray-900'} font-medium transition-colors duration-200`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {t(item.key)}
              </motion.a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-gray-200'} transition-colors duration-200 flex items-center space-x-2`}
              >
                <Globe size={20} className={isDark ? 'text-white' : 'text-gray-700'} />
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
                <ChevronDown size={16} className={isDark ? 'text-white' : 'text-gray-700'} />
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full right-0 mt-2 py-2 rounded-lg shadow-2xl border ${isDark ? 'bg-slate-800 border-white/20' : 'bg-white border-gray-200'}`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-opacity-10 transition-colors duration-200 flex items-center space-x-2 ${
                          language === lang.code 
                            ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600')
                            : (isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100')
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-gray-200'} transition-colors duration-200`}
            >
              {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-gray-700" />}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              {t('nav.contact')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-gray-200'} transition-colors duration-200`}
          >
            {isMenuOpen ? <X size={24} className={isDark ? 'text-white' : 'text-gray-700'} /> : <Menu size={24} className={isDark ? 'text-white' : 'text-gray-700'} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden mt-4 ${isDark ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-md rounded-lg shadow-2xl border ${isDark ? 'border-white/10' : 'border-gray-200'} overflow-hidden`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`block px-4 py-2 ${isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} transition-colors duration-200`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {t(item.key)}
                  </motion.a>
                ))}
                <div className="px-4 py-2 flex space-x-2">
                  <button 
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
                  >
                    {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-gray-700" />}
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                      className={`p-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200 flex items-center space-x-2`}
                    >
                      <Globe size={20} className={isDark ? 'text-white' : 'text-gray-700'} />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        {languages.find(lang => lang.code === language)?.flag}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isLanguageOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`absolute top-full left-0 mt-2 py-2 rounded-lg shadow-2xl border ${isDark ? 'bg-slate-800 border-white/20' : 'bg-white border-gray-200'} z-50`}
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code as any);
                                setIsLanguageOpen(false);
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-opacity-10 transition-colors duration-200 flex items-center space-x-2 ${
                                language === lang.code 
                                  ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600')
                                  : (isDark ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100')
                              }`}
                            >
                              <span>{lang.flag}</span>
                              <span className="text-sm">{lang.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;