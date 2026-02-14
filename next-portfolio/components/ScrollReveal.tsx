'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Variant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';

const variants: Record<Variant, object> = {
  fadeUp: { initial: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  fadeIn: { initial: { opacity: 0 }, visible: { opacity: 1 } },
  slideLeft: { initial: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  slideRight: { initial: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const v = variants[variant];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={(v as { initial: object }).initial}
      whileInView={(v as { visible: object }).visible}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
