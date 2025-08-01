import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Download, Mail, Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      background: [
        "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [controls]);

  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Dynamic Gradient Background */}
      <motion.div
        animate={controls}
        className="absolute inset-0 opacity-20"
      />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      </div>

             {/* Enhanced Mouse Tracking Particles */}
       {particles.map((_, index) => (
         <motion.div
           key={index}
           className="absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none"
           animate={{
             x: mousePosition.x + Math.sin(index * 0.5) * 50,
             y: mousePosition.y + Math.cos(index * 0.5) * 50,
             opacity: [0, 1, 0],
             scale: [0, 1, 0],
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             delay: index * 0.1,
             ease: "easeOut"
           }}
         />
       ))}

       {/* Floating Code Elements */}
       <motion.div
         animate={{
           y: [0, -30, 0],
           rotate: [0, 5, 0],
           opacity: [0.3, 0.7, 0.3],
         }}
         transition={{
           duration: 8,
           repeat: Infinity,
           ease: "easeInOut"
         }}
         className="absolute top-32 left-10 text-blue-400/30 text-sm font-mono pointer-events-none"
       >
         &lt;React /&gt;
       </motion.div>

       <motion.div
         animate={{
           y: [0, 20, 0],
           rotate: [0, -5, 0],
           opacity: [0.3, 0.7, 0.3],
         }}
         transition={{
           duration: 10,
           repeat: Infinity,
           ease: "easeInOut",
           delay: 2
         }}
         className="absolute top-64 right-16 text-purple-400/30 text-sm font-mono pointer-events-none"
       >
         {`{ code }`}
       </motion.div>

       <motion.div
         animate={{
           y: [0, -15, 0],
           rotate: [0, 3, 0],
           opacity: [0.2, 0.6, 0.2],
         }}
         transition={{
           duration: 12,
           repeat: Infinity,
           ease: "easeInOut",
           delay: 4
         }}
         className="absolute bottom-32 left-20 text-pink-400/30 text-sm font-mono pointer-events-none"
       >
         &lt;/&gt;
       </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 blur-xl"
      />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
                         {/* Welcome Badge */}
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.2, delay: 0.5 }}
               className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
             >
              <Sparkles size={16} className="text-blue-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                {t('hero.welcome')}
              </span>
            </motion.div>

                         {/* Main Title with Typewriter Effect */}
                           <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1.0 }}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                               <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('hero.title')}
                </span>
                                 <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 1.2, delay: 2.5 }}
                   className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2"
                 >
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {t('hero.subtitle')}
                  </span>
                </motion.div>
             </motion.h1>

                           {/* Animated Description */}
                             <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1.2, delay: 4.0 }}
                 className={`text-base md:text-lg leading-relaxed max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
               >
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('hero.description')}
                </span>
              </motion.div>

                         {/* CTA Buttons */}
                           <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 5.5 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = process.env.PUBLIC_URL + '/CV%20-%20Babak%20Gasimzade%20Latvia%20eu.pdf';
                  link.download = 'CV - Babak Gasimzade.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download size={20} />
                <span>{t('hero.cv')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500 text-blue-500 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Mail size={20} />
                <span>{t('hero.cta')}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

                         {/* Social Links */}
                           <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 6.5 }}
                className="flex space-x-6"
              >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/babak-gasimzade-b939a5234/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Linkedin size={24} className="text-blue-600" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:gasimzadababak@gmail.com"
                className={`p-3 rounded-full ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Mail size={24} className="text-red-500" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/bgasimzade99"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Github size={24} className={isDark ? 'text-white' : 'text-gray-900'} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
                     <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.5, delay: 2.0 }}
             className="flex justify-center lg:justify-end"
           >
            <div className="relative">
              {/* Glowing Background */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl"
              />
              
                             {/* Image Container */}
               <motion.div
                 whileHover={{ scale: 1.05, rotateY: 5 }}
                 transition={{ duration: 0.3 }}
                 className="relative"
               >
                                                      <motion.img
                     src={process.env.PUBLIC_URL + '/me2.jpg'}
                     alt="Babak Gasimzade"
                     className="w-96 h-96 rounded-3xl object-cover shadow-2xl border-4 border-white/20"
                     initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                     animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                     transition={{ duration: 1.5, delay: 3.5, type: "spring", stiffness: 80 }}
                     onError={(e) => {
                       console.log('Image failed to load:', e);
                       e.target.style.display = 'none';
                     }}
                   />
                
                                 {/* Floating Badge */}
                                   <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 5.0 }}
                    className="absolute -top-4 -right-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg"
                  >
                  <div className="flex items-center space-x-2">
                    <Sparkles size={16} className="text-yellow-300" />
                    <span className="text-white font-semibold text-sm">
                      Mobile & Frontend Developer
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

             {/* Enhanced Scroll Indicator */}
               <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 7.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
         <motion.div
           animate={{ 
             y: [0, 10, 0],
             scale: [1, 1.1, 1]
           }}
           transition={{ duration: 2, repeat: Infinity }}
           className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center cursor-pointer"
           whileHover={{ scale: 1.2 }}
         >
           <motion.div
             animate={{ y: [0, 12, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-1 h-3 bg-blue-400 rounded-full mt-2"
           />
         </motion.div>
                   <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 8.0 }}
            className="text-center text-blue-400 text-sm mt-2 font-medium"
          >
           Scroll Down
         </motion.p>
       </motion.div>
    </section>
  );
};

export default Hero; 