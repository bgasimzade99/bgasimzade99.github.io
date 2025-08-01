import React from "react";
import { motion } from "framer-motion";
import { Code, Users, Clock, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const About = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stats = [
    {
      icon: Code,
      number: "15+",
      label: "about.projects",
      description: "about.projectsDesc"
    },
    {
      icon: Users,
      number: "5+",
      label: "about.teamProjects",
      description: "about.teamProjectsDesc"
    },
    {
      icon: Clock,
      number: t('about.experienceYear'),
      label: "about.experience",
      description: "about.experienceDesc"
    }
  ];

  const services = [
    "about.service1",
    "about.service2",
    "about.service3",
    "about.service4",
    "about.service5",
    "about.service6"
  ];

  return (
    <section id="about" className={`py-16 md:py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('about.title')}
          </h2>
          <p className={`text-base max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('about.subtitle')}
          </p>
        </motion.div>

                  <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('about.journey')}
              </h3>
              <div className={`space-y-4 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <p>
                  {t('about.description1')}
                </p>
                <p>
                  {t('about.description2')}
                </p>
                <p>
                  {t('about.description3')}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`text-center p-6 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-white'} shadow-lg border ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <div className={`inline-flex p-3 rounded-lg mb-4 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <stat.icon size={24} className="text-blue-500" />
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.number}
                  </div>
                  <div className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t(stat.label)}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t(stat.description)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Services */}
            <div>
              <h4 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('about.focus')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">{t(service)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;