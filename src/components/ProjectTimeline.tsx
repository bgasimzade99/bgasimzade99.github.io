import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { Calendar, GitBranch, Star, TrendingUp } from 'lucide-react';

const ProjectTimeline = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState(null);

  const timelineProjects = [
    {
      id: 1,
      title: 'First Steps',
      period: 'Jan 2024',
      description: 'Started learning web development basics',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      difficulty: 'Beginner',
      learning: 'Fundamentals of web development',
      color: 'from-green-500 to-emerald-500',
      icon: <Star size={20} />,
      status: 'completed'
    },
    {
      id: 2,
      title: 'React Journey',
      period: 'Mar 2024',
      description: 'Dived into React ecosystem and modern development',
      technologies: ['React', 'JSX', 'Components'],
      difficulty: 'Intermediate',
      learning: 'Component-based architecture',
      color: 'from-blue-500 to-cyan-500',
      icon: <GitBranch size={20} />,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Mobile Development',
      period: 'May 2024',
      description: 'Explored React Native for mobile app development',
      technologies: ['React Native', 'Expo', 'Mobile UI'],
      difficulty: 'Intermediate',
      learning: 'Cross-platform development',
      color: 'from-purple-500 to-pink-500',
      icon: <TrendingUp size={20} />,
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Advanced Concepts',
      period: 'Jul 2024',
      description: 'Learning advanced React patterns and state management',
      technologies: ['TypeScript', 'Context API', 'Hooks'],
      difficulty: 'Advanced',
      learning: 'Type safety and state management',
      color: 'from-orange-500 to-red-500',
      icon: <Calendar size={20} />,
      status: 'planned'
    },
    {
      id: 5,
      title: 'Full-Stack Development',
      period: 'Sep 2024',
      description: 'Expanding to backend development and databases',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      difficulty: 'Advanced',
      learning: 'Backend development and APIs',
      color: 'from-indigo-500 to-purple-500',
      icon: <TrendingUp size={20} />,
      status: 'planned'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planned': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planned': return 'Planned';
      default: return 'Unknown';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📅 {t('portfolio.timeline')}
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('portfolio.timelineDesc')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start space-x-8"
              >
                {/* Timeline Dot */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-white shadow-lg`}>
                    {project.icon}
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full ${getStatusColor(project.status)} border-2 border-white`}></div>
                </div>

                {/* Project Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`flex-1 p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${
                    isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {project.period}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Learning Focus */}
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-blue-50'
                  }`}>
                    <p className={`text-xs font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      🎯 Learning: {project.learning}
                    </p>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                          <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            What I Learned
                          </h4>
                          <ul className={`space-y-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <li>• Understanding of {project.difficulty.toLowerCase()} concepts</li>
                            <li>• Practical experience with {project.technologies.join(', ')}</li>
                            <li>• Real-world project implementation</li>
                            <li>• Problem-solving and debugging skills</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Timeline Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`mt-12 p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📊 Learning Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>In Progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Planned</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectTimeline; 