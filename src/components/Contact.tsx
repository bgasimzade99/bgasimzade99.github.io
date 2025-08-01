import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, Sparkles, MapPin, Clock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.tsx";
import { useTheme } from "../contexts/ThemeContext.tsx";

const Contact = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // İLETİŞİM BİLGİLERİNİ STATE İLE DEĞİL, FONKSİYON/CONST İLE OLUŞTUR
  const contactInfo = [
    {
      icon: <Mail size={24} className="text-red-400" />,
      label: t('contact.email'),
      value: 'gasimzadababak@gmail.com',
      type: 'email',
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400/20',
    },
    {
      icon: <Phone size={24} className="text-green-400" />,
      label: t('contact.phone'),
      value: '+994 55 451 19 99',
      type: 'phone',
      color: 'green',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/20',
    },
    {
      icon: <Linkedin size={24} className="text-blue-400" />,
      label: t('contact.linkedin'),
      value: 'Babak Gasimzade',
      type: 'linkedin',
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/20',
      link: 'https://www.linkedin.com/in/babak-gasimzade-b939a5234/'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/babak-gasimzade-b939a5234/',
      label: 'LinkedIn',
      color: 'text-blue-500',
      hoverColor: 'hover:bg-blue-500/10'
    },
    {
      icon: Github,
      href: 'https://github.com/bgasimzade99',
      label: 'GitHub',
      color: isDark ? 'text-white' : 'text-gray-900',
      hoverColor: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
    },
    {
      icon: Mail,
      href: 'mailto:gasimzadababak@gmail.com',
      label: 'Email',
      color: 'text-red-500',
      hoverColor: 'hover:bg-red-500/10'
    }
  ];

  return (
    <section id="contact" className={`py-16 md:py-20 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        />
        
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'white' : 'black'} 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
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
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 mb-6"
          >
            <Sparkles size={20} className="text-green-400" />
            <span className={`text-sm font-medium ${isDark ? 'text-green-300' : 'text-green-600'}`}>
              Let's Connect
            </span>
          </motion.div>
          
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('contact.getInTouch')}
          </h2>
          <p className={`text-base max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('contact.ready')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} border ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-sm`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('contact.available')}
                </h3>
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('contact.availableDesc')}
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link || '#'} // Use info.link if available, otherwise #
                  target={info.link ? '_blank' : undefined}
                  rel={info.link ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 5,
                    boxShadow: isDark 
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)" 
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                  className={`group flex items-center space-x-4 p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${info.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`p-3 rounded-lg ${info.bgColor}`}
                  >
                    {info.icon}
                  </motion.div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {info.label}
                    </p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {info.value}
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`p-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'} group-hover:scale-110 transition-transform`}
                  >
                    <Send size={16} className={info.color} />
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-4"
            >
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Follow Me
              </h3>
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
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.9 + (index * 0.1) }}
                    className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-sm ${social.hoverColor} transition-all duration-300`}
                  >
                    <social.icon size={24} className={social.color} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`p-8 rounded-2xl relative overflow-hidden ${isDark ? 'bg-slate-800/50' : 'bg-white'} border ${isDark ? 'border-white/10' : 'border-gray-200'} backdrop-blur-sm shadow-xl`}
          >
            {/* Form Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
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

            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="relative"
                  >
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.name')}
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        focusedField === 'name'
                          ? isDark 
                            ? 'border-blue-400 bg-slate-700/50' 
                            : 'border-blue-400 bg-blue-50'
                          : isDark 
                            ? 'border-white/20 bg-slate-700/30' 
                            : 'border-gray-300 bg-gray-50'
                      } ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                      placeholder={t('contact.placeholder.name')}
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative"
                  >
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.email')}
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                        focusedField === 'email'
                          ? isDark 
                            ? 'border-blue-400 bg-slate-700/50' 
                            : 'border-blue-400 bg-blue-50'
                          : isDark 
                            ? 'border-white/20 bg-slate-700/30' 
                            : 'border-gray-300 bg-gray-50'
                      } ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                      placeholder={t('contact.placeholder.email')}
                    />
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="relative"
                >
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.subject')}
                  </label>
                  <motion.input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      focusedField === 'subject'
                        ? isDark 
                          ? 'border-blue-400 bg-slate-700/50' 
                          : 'border-blue-400 bg-blue-50'
                        : isDark 
                          ? 'border-white/20 bg-slate-700/30' 
                          : 'border-gray-300 bg-gray-50'
                    } ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.placeholder.subject')}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="relative"
                >
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t('contact.message')}
                  </label>
                  <motion.textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    whileFocus={{ scale: 1.02 }}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                      focusedField === 'message'
                        ? isDark 
                          ? 'border-blue-400 bg-slate-700/50' 
                          : 'border-blue-400 bg-blue-50'
                        : isDark 
                          ? 'border-white/20 bg-slate-700/30' 
                          : 'border-gray-300 bg-gray-50'
                    } ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                    placeholder={t('contact.placeholder.message')}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : isDark 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>{t('contact.sending')}</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      <span>{t('contact.messageSent')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t('contact.sendMessage')}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
  </section>
);
};

export default Contact;