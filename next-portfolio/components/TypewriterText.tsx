'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 45,
  delay = 0,
  cursor = true,
  className = '',
}: TypewriterTextProps) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }

    const startTimer = setTimeout(() => setStarted(true), delay);

    return () => clearTimeout(startTimer);
  }, [text, delay, reduced]);

  useEffect(() => {
    if (!started || reduced || display.length >= text.length) return;

    const id = setTimeout(() => {
      setDisplay(text.slice(0, display.length + 1));
    }, speed);

    return () => clearTimeout(id);
  }, [started, display, text, speed, reduced]);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {display}
      {cursor && display.length < text.length && (
        <span
          className="inline-block w-0.5 h-[0.9em] ml-0.5 align-middle bg-teal-400 animate-pulse"
          style={{ animationDuration: '0.8s' }}
          aria-hidden
        />
      )}
    </span>
  );
}
