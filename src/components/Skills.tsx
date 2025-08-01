import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Code, Smartphone, Globe, Zap, Palette, Database, Sparkles, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const Skills = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // KATEGORİLERİ VE TEKNOLOJİLERİ STATE İLE DEĞİL, FONKSİYON/CONST İLE OLUŞTUR
  const skillCategories = [
    {
      icon: Globe,
      title: t('skills.frontend'),
      skills: [
        { name: t('skills.tech.htmlcss'), level: 85 },
        { name: t('skills.tech.javascript'), level: 80 },
        { name: t('skills.tech.react'), level: 75 },
        { name: t('skills.tech.typescript'), level: 65 },
        { name: t('skills.tech.tailwind'), level: 85 }
      ]
    },
    {
      icon: Smartphone,
      title: t('skills.mobile'),
      skills: [
        { name: t('skills.tech.reactNative'), level: 70 },
        { name: t('skills.tech.expo'), level: 75 },
        { name: "Mobile UI/UX", level: 80 },
        { name: "App Store Deploy", level: 60 },
        { name: "Mobile Testing", level: 65 }
      ]
    },
    {
      icon: Code,
      title: t('skills.tools'),
      skills: [
        { name: "Git/GitHub", level: 80 },
        { name: "VS Code", level: 90 },
        { name: t('skills.tech.figma'), level: 75 },
        { name: "Postman", level: 70 },
        { name: "npm/yarn", level: 85 }
      ]
    }
  ];

  const technologies = [
    { name: t('skills.tech.react'), icon: "⚛️", level: t('skills.level.good') },
    { name: t('skills.tech.reactNative'), icon: "📱", level: t('skills.level.good') },
    { name: t('skills.tech.javascript'), icon: "🟨", level: t('skills.level.good') },
    { name: t('skills.tech.htmlcss'), icon: "🎨", level: t('skills.level.veryGood') },
    { name: t('skills.tech.expo'), icon: "⚡", level: t('skills.level.good') },
    { name: t('skills.tech.typescript'), icon: "🔷", level: t('skills.level.medium') },
    { name: t('skills.tech.figma'), icon: "🎨", level: t('skills.level.good') },
    { name: t('skills.tech.tailwind'), icon: "🎯", level: t('skills.level.veryGood') }
  ];

  const learningItems = [
    { name: t('skills.learning.flutter'), icon: "🦋" },
    { name: t('skills.learning.swift'), icon: "🍎" },
    { name: t('skills.learning.kotlin'), icon: "🤖" },
    { name: t('skills.learning.nextjs'), icon: "⚡" },
    { name: t('skills.learning.testing'), icon: "🧪" }
  ];

  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls, t]);

  return (
    <section id="skills" className={`py-16 md:py-20 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6"
          >
            <Sparkles size={20} className="text-blue-400" />
            <span className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
              Technical Expertise
            </span>
          </motion.div>
          
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('skills.title')}
          </h2>
          <p className={`text-base max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                boxShadow: isDark 
                  ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)" 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} border ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-sm transition-all duration-300`}
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon size={24} className="text-blue-500" />
                </motion.div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    onHoverStart={() => setHoveredSkill(skillIndex)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {skill.name}
                      </span>
                      <motion.span 
                        className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                        animate={{ scale: hoveredSkill === skillIndex ? 1.1 : 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className={`w-full h-3 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-200'} overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={controls}
                        variants={{
                          visible: { width: `${skill.level}%` }
                        }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) + 0.3 }}
                        className={`h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ["-100%", "100%"]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 mb-4"
            >
              <TrendingUp size={20} className="text-green-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                Technology Stack
              </span>
            </motion.div>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('skills.technologies')}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: isDark 
                    ? "0 20px 40px -12px rgba(59, 130, 246, 0.3)" 
                    : "0 20px 40px -12px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} border ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              >
                <motion.div 
                  className="text-3xl mb-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {tech.icon}
                </motion.div>
                <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {tech.name}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {tech.level}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`p-8 rounded-2xl relative overflow-hidden ${isDark ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                "linear-gradient(45deg, rgba(236, 72, 153, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-4"
            >
              <Sparkles size={20} className="text-yellow-400" />
              <span className={`text-sm font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-600'}`}>
                Continuous Learning
              </span>
            </motion.div>
            
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🚀 {t('skills.learning')}
            </h3>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('skills.learningDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {learningItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                  className={`px-4 py-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-white/80'} border ${isDark ? 'border-white/20' : 'border-gray-200'} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 