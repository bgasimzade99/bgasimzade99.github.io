import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Mail, Phone, Linkedin, Github, ArrowUp, Heart, Sparkles, MapPin, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";
import { AnimatePresence } from "framer-motion";

const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showScrollTop, setShowScrollTop] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const homeElement = document.querySelector('#home');
    if (homeElement) {
      homeElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/babak-gasimzade-b939a5234/',
      label: 'LinkedIn',
      color: 'text-blue-500',
      hoverColor: 'hover:bg-blue-500/10',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Github,
      href: 'https://github.com/bgasimzade99',
      label: 'GitHub',
      color: isDark ? 'text-white' : 'text-gray-900',
      hoverColor: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100',
      bgColor: isDark ? 'bg-white/10' : 'bg-gray-100',
      borderColor: isDark ? 'border-white/20' : 'border-gray-200'
    },
    {
      icon: Mail,
      href: 'mailto:gasimzadababak@gmail.com',
      label: 'Email',
      color: 'text-red-500',
      hoverColor: 'hover:bg-red-500/10',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    }
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gasimzadabababak@gmail.com',
      href: 'mailto:gasimzadababak@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+994 55 451 19 99',
      href: 'tel:+994554511999'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Azerbaijan',
      href: null
    }
  ];

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gray-900'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Brand Section */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4"
              >
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  BGDev
                </span>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Babak Gasimzade
              </h3>
              <p className={`text-gray-300 mb-6 leading-relaxed`}>
                {t('footer.description')}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -3,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    className={`p-3 rounded-xl ${social.bgColor} border ${social.borderColor} ${social.hoverColor} transition-all duration-300`}
                  >
                    <social.icon size={20} className={social.color} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                {t('footer.quickLinks')}
              </h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ 
                      x: 5,
                      color: '#3B82F6'
                    }}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                {t('footer.contact')}
              </h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    className="flex items-center space-x-3"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20"
                    >
                      <info.icon size={16} className="text-blue-400" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray-400">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter/CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-white mb-6">
                {t('footer.workTogether')}
              </h4>
              <p className="text-gray-300 mb-6">
                {t('footer.workTogetherDesc')}
              </p>
              <motion.a
                href="#contact"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Mail size={16} />
                <span>{t('footer.getInTouch')}</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-400 text-center md:text-left"
            >
              {t('footer.copyright')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <span>{t('footer.madeWith')}</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            title="Scroll to Top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

              {/* Top Scroll to Top Button - More Visible */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          title="Scroll to Top"
        >
          <ArrowUp size={24} />
        </motion.button>
  </footer>
);
};

export default Footer;