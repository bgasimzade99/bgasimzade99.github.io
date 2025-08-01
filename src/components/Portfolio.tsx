import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ArrowRight, Sparkles, Filter, Eye, Smartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const Portfolio = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const categories = [
  { id: 'all', label: t('portfolio.all'), icon: Filter },
  { id: 'web', label: t('portfolio.web'), icon: ExternalLink },
  { id: 'mobile', label: t('portfolio.mobile'), icon: Smartphone },
  { id: 'responsive', label: t('portfolio.responsive'), icon: Eye },
  { id: 'interactive', label: t('portfolio.interactive'), icon: Sparkles }
];

  const projects = [
    {
      id: 1,
      title: t('portfolio.project1.title'),
      description: t('portfolio.project1.desc'),
      category: 'web',
      image: '/project-images/bgautosales.svg',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'Responsive Design'],
      features: [t('portfolio.project1.feature1'), t('portfolio.project1.feature2'), t('portfolio.project1.feature3')],
      liveUrl: 'https://www.bgdev.dev/BGAutoSales/',
      githubUrl: 'https://github.com/bgasimzade99/BGAutoSales'
    },
    {
      id: 2,
      title: t('portfolio.project2.title'),
      description: t('portfolio.project2.desc'),
      category: 'mobile',
      image: '/project-images/buldum-app.svg',
      technologies: ['React Native', 'Expo', 'JavaScript', 'API Integration', 'Mobile UI'],
      features: [t('portfolio.project2.feature1'), t('portfolio.project2.feature2'), t('portfolio.project2.feature3')],
      liveUrl: 'https://github.com/Bayturan/buldum-app',
      githubUrl: 'https://github.com/Bayturan/buldum-app'
    },
    {
      id: 3,
      title: t('portfolio.project3.title'),
      description: t('portfolio.project3.desc'),
      category: 'web',
      image: '/project-images/udemy-clone.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Full Stack', 'REST API'],
      features: [t('portfolio.project3.feature1'), t('portfolio.project3.feature2'), t('portfolio.project3.feature3')],
      liveUrl: 'https://github.com/bgasimzade99/UDEMY-BG',
      githubUrl: 'https://github.com/bgasimzade99/UDEMY-BG'
    },
    {
      id: 4,
      title: t('portfolio.project4.title'),
      description: t('portfolio.project4.desc'),
      category: 'mobile',
      image: '/vesh.png',
      technologies: ['React Native', 'Mobile UI', 'Play Store', '80k Users'],
      features: [t('portfolio.project4.feature1'), t('portfolio.project4.feature2'), t('portfolio.project4.feature3')],
      liveUrl: 'https://play.google.com/store/apps/details?id=com.vesh&pcampaignid=web_share',
      githubUrl: 'https://github.com/bgasimzade99/vesh-frontend'
    },
    {
      id: 5,
      title: t('portfolio.project5.title'),
      description: t('portfolio.project5.desc'),
      category: 'web',
      image: '/project-images/thesis.svg',
      technologies: ['Python', 'Flask', 'Machine Learning', 'Recommendation System'],
      features: [t('portfolio.project5.feature1'), t('portfolio.project5.feature2'), t('portfolio.project5.feature3')],
      liveUrl: 'https://github.com/bgasimzade99/Thesis',
      githubUrl: 'https://github.com/bgasimzade99/Thesis'
    },
    {
      id: 6,
      title: t('portfolio.project6.title'),
      description: t('portfolio.project6.desc'),
      category: 'web',
      image: '/project-images/frontend-portfolio.svg',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Portfolio Design', 'Responsive'],
      features: [t('portfolio.project6.feature1'), t('portfolio.project6.feature2'), t('portfolio.project6.feature3')],
      liveUrl: 'http://bgdev.dev/frontend-portfolio/',
      githubUrl: 'https://github.com/bgasimzade99/frontend-portfolio'
    },
    {
      id: 7,
      title: t('portfolio.project7.title'),
      description: t('portfolio.project7.desc'),
      category: 'interactive',
      image: '/project-images/todo-app.svg',
      technologies: ['JavaScript', 'Local Storage', 'DOM Manipulation', 'Task Management'],
      features: [t('portfolio.project7.feature1'), t('portfolio.project7.feature2'), t('portfolio.project7.feature3')],
      liveUrl: '',
      githubUrl: ''
    },
    {
      id: 8,
      title: t('portfolio.project8.title'),
      description: t('portfolio.project8.desc'),
      category: 'responsive',
      image: '/project-images/weather-app.svg',
      technologies: ['JavaScript', 'API Integration', 'Weather API', 'Responsive Design'],
      features: [t('portfolio.project8.feature1'), t('portfolio.project8.feature2'), t('portfolio.project8.feature3')],
      liveUrl: '',
      githubUrl: ''
    },
    {
      id: 9,
      title: t('portfolio.project9.title'),
      description: t('portfolio.project9.desc'),
      category: 'web',
      image: '/project-images/modern-portfolio.svg',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'i18n'],
      features: [t('portfolio.project9.feature1'), t('portfolio.project9.feature2'), t('portfolio.project9.feature3')],
      liveUrl: 'https://www.bgdev.dev',
      githubUrl: 'https://github.com/bgasimzade99/bgasimzade99.github.io'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="portfolio" className={`py-16 md:py-20 relative overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
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
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
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
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-xl"
      />

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
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6"
          >
            <Sparkles size={20} className="text-purple-400" />
            <span className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
              Featured Projects
            </span>
          </motion.div>
          
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('portfolio.title')}
          </h2>
          <p className={`text-base max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: isDark 
                  ? "0 10px 25px -5px rgba(147, 51, 234, 0.3)" 
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? isDark 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : isDark
                    ? 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-white/10'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <category.icon size={18} className="group-hover:rotate-12 transition-transform" />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
                          <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: 5,
                boxShadow: isDark 
                  ? "0 25px 50px -12px rgba(147, 51, 234, 0.25)" 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              className={`group relative overflow-hidden rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-sm hover:shadow-2xl transition-all duration-500`}
            >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal(project)}
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full mr-4 hover:bg-white/30 transition-colors"
                    >
                      <Eye size={20} />
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Github size={20} />
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (techIndex * 0.1) }}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                            : 'bg-purple-100 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(project)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30' 
                        : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100 border border-purple-200'
                    }`}
                  >
                    <span>{t('portfolio.viewDetails')}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/bgasimzade99"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            <Github size={20} />
            <span>{t('portfolio.githubProfile')}</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedProject.title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className={`p-2 rounded-full ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} transition-colors`}
                >
                  <X size={24} className={isDark ? 'text-white' : 'text-gray-900'} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('portfolio.features')}
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('portfolio.technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          isDark 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                            : 'bg-purple-100 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    }`}
                  >
                    <ExternalLink size={20} />
                    <span>{t('portfolio.liveDemo')}</span>
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-700 text-white hover:bg-slate-600 border border-white/10' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    <Github size={20} />
                    <span>{t('portfolio.github')}</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  </section>
);
};

export default Portfolio;