import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { Play, Copy, Check } from 'lucide-react';

const LiveCodeEditor = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const sampleCode = `import React from 'react';

const WelcomeCard = ({ name }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-2">
        ${t('portfolio.codeEditor.hello')}, {name}! 👋
      </h2>
      <p className="opacity-90">
        ${t('portfolio.codeEditor.welcome')}
      </p>
    </div>
  );
};

export default WelcomeCard;`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const syntaxHighlight = (code: string) => {
    return code
      .replace(/\b(import|from|React|const|return|export|default)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(div|h2|p|className)\b/g, '<span class="text-blue-400">$1</span>')
      .replace(/\b(Hello|Welcome|portfolio)\b/g, '<span class="text-green-400">$1</span>')
      .replace(/\b(name)\b/g, '<span class="text-yellow-400">$1</span>')
      .replace(/\b(blue-500|purple-600|text-2xl|font-bold|mb-2|opacity-90)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/\b(div|span)\b/g, '<span class="text-blue-400">$1</span>')
      .replace(/\b(Hello|Welcome|portfolio)\b/g, '<span class="text-green-400">$1</span>')
      .replace(/\b(name)\b/g, '<span class="text-yellow-400">$1</span>')
      .replace(/\b(blue-500|purple-600|text-2xl|font-bold|mb-2|opacity-90)\b/g, '<span class="text-orange-400">$1</span>');
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
            💻 {t('portfolio.codeEditor')}
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('portfolio.codeEditorDesc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}
          >
            {/* Editor Header */}
            <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                WelcomeCard.jsx
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} transition-colors`}
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </motion.button>
              </div>
            </div>

            {/* Code Content */}
            <div className={`p-6 font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              <pre className="whitespace-pre-wrap leading-relaxed">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(sampleCode) }} />
              </pre>
            </div>

            {/* Line Numbers */}
            <div className={`absolute left-0 top-0 bottom-0 w-12 p-6 pt-20 text-xs text-right ${isDark ? 'text-gray-600 bg-gray-800' : 'text-gray-400 bg-gray-200'}`}>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="h-6">{i + 1}</div>
              ))}
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className={`rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Preview Header */}
              <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2">
                  <Play size={16} className="text-green-400" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Live Preview
                  </span>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                  <h2 className="text-2xl font-bold mb-2">
                    Hello, Recruiter! 👋
                  </h2>
                  <p className="opacity-90">
                    Welcome to my portfolio
                  </p>
                </div>
              </div>
            </div>

            {/* Code Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`mt-6 p-6 rounded-2xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                🎯 What This Shows
              </h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Clean, readable code structure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Modern React patterns and hooks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Tailwind CSS for styling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Component reusability</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveCodeEditor; 