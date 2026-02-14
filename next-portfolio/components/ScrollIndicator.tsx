'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-8 h-8 rounded-full border border-white/[0.12] flex items-center justify-center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
