import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { Code, Smartphone, Globe, Database, Zap, Target } from 'lucide-react';

const SkillTree = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillNodes = [
    {
      id: 'foundation',
      title: 'Foundation',
      icon: <Code size={24} />,
      skills: ['HTML', 'CSS', 'JavaScript'],
      level: 'Strong',
      color: 'from-blue-500 to-cyan-500',
      position: 'top-1/2 left-1/4'
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: <Globe size={24} />,
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      level: 'Intermediate',
      color: 'from-purple-500 to-pink-500',
      position: 'top-1/3 right-1/4',
      dependsOn: 'foundation'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      icon: <Smartphone size={24} />,
      skills: ['React Native', 'Expo', 'Mobile UI'],
      level: 'Learning',
      color: 'from-green-500 to-emerald-500',
      position: 'bottom-1/3 right-1/4',
      dependsOn: 'frontend'
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: <Database size={24} />,
      skills: ['Node.js', 'Express', 'MongoDB'],
      level: 'Basic',
      color: 'from-orange-500 to-red-500',
      position: 'bottom-1/2 left-1/4',
      dependsOn: 'foundation'
    },
    {
      id: 'tools',
      title: 'Tools',
      icon: <Zap size={24} />,
      skills: ['Git', 'VS Code', 'Figma'],
      level: 'Intermediate',
      color: 'from-yellow-500 to-orange-500',
      position: 'top-1/4 left-1/2',
      dependsOn: 'foundation'
    },
    {
      id: 'next',
      title: 'Next Steps',
      icon: <Target size={24} />,
      skills: ['Next.js', 'Testing', 'Deployment'],
      level: 'Planning',
      color: 'from-indigo-500 to-purple-500',
      position: 'bottom-1/4 left-1/2',
      dependsOn: 'frontend'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🎯 {t('skills.treeTitle')}
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('skills.treeDesc')}
          </p>
        </motion.div>

        <div className="relative h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(147,51,234,0.3),transparent_50%)]" />
          </div>

          {/* Skill Nodes */}
          {skillNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`absolute ${node.position} transform -translate-x-1/2 -translate-y-1/2`}
            >
              <motion.button
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSkill(selectedSkill === node.id ? null : node.id)}
                className={`group relative p-6 rounded-2xl bg-gradient-to-r ${node.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {node.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">{node.title}</h3>
                    <p className="text-sm opacity-90">{node.level}</p>
                  </div>
                </div>

                {/* Connection Lines */}
                {node.dependsOn && (
                  <svg
                    className="absolute w-full h-full pointer-events-none"
                    style={{ top: '-50%', left: '-50%', width: '200%', height: '200%' }}
                  >
                    <motion.line
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      x1="50%"
                      y1="50%"
                      x2="25%"
                      y2="50%"
                      stroke="rgba(147, 51, 234, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  </svg>
                )}

                {/* Skill Details Popup */}
                <AnimatePresence>
                  {selectedSkill === node.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-xl bg-white shadow-xl border border-gray-200 min-w-[200px] z-10"
                    >
                      <div className="text-gray-900">
                        <h4 className="font-bold mb-2">{node.title} Skills</h4>
                        <div className="space-y-1">
                          {node.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm">{skill}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <span className="text-xs text-gray-500">Level: {node.level}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}

          {/* Learning Path Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-white/80'} backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-gray-200'}`}>
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                🚀 Click nodes to see details
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillTree; 