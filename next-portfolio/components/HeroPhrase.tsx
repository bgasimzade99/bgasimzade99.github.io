'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PHRASES = [
  'From concept to production.',
  'React · Next.js · React Native.',
  'Clean code, scalable systems.',
];

const TYPE_SPEED = 50;
const PAUSE_AFTER = 1800;
const DELETE_SPEED = 35;
const START_DELAY = 2200;

export default function HeroPhrase() {
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'paused' | 'deleting'>('waiting');
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const reduced = useReducedMotion();

  const fullText = PHRASES[index];

  useEffect(() => {
    if (reduced) return;
    if (phase !== 'waiting') return;
    const id = setTimeout(() => setPhase('typing'), START_DELAY);
    return () => clearTimeout(id);
  }, [phase, reduced]);

  useEffect(() => {
    if (reduced) {
      setDisplay(PHRASES[0]);
      return;
    }
    if (phase === 'waiting') return;

    if (phase === 'typing') {
      if (display.length >= fullText.length) {
        setPhase('paused');
        return;
      }
      const id = setTimeout(() => setDisplay(fullText.slice(0, display.length + 1)), TYPE_SPEED);
      return () => clearTimeout(id);
    }

    if (phase === 'paused') {
      const id = setTimeout(() => setPhase('deleting'), PAUSE_AFTER);
      return () => clearTimeout(id);
    }

    if (phase === 'deleting') {
      if (display.length === 0) {
        setIndex((i) => (i + 1) % PHRASES.length);
        setPhase('typing');
        return;
      }
      const id = setTimeout(() => setDisplay(display.slice(0, -1)), DELETE_SPEED);
      return () => clearTimeout(id);
    }
  }, [phase, display, fullText, index, reduced]);

  if (reduced) {
    return <span>{PHRASES[0]}</span>;
  }

  return (
    <span className="inline-block">
      <span className="inline">
        {display}
      </span>
      {phase !== 'deleting' && (
        <span
          className="inline-block w-0.5 h-[0.9em] ml-0.5 align-middle bg-teal-400/90"
          style={{ animation: 'cursor-blink 0.7s ease-in-out infinite' }}
          aria-hidden
        />
      )}
    </span>
  );
}
