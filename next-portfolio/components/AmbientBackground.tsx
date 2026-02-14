'use client';

import { useEffect, useState } from 'react';

const PARTICLE_COUNT = 20;

function Particle({
  delay,
  duration,
  startX,
  startY,
  reduced,
}: {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-teal-500/15"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animation: `particle-float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function AmbientBackground() {
  const [particles, setParticles] = useState<{ delay: number; duration: number; x: number; y: number }[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, () => ({
        delay: Math.random() * 6,
        duration: 14 + Math.random() * 12,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
    );
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          animation: reduced ? 'none' : 'grid-drift 40s linear infinite',
        }}
      />

      {/* Terminal shimmer - horizontal sweep */}
      {!reduced && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                transparent 40%,
                rgba(20,184,166,0.03) 48%,
                rgba(20,184,166,0.08) 50%,
                rgba(20,184,166,0.03) 52%,
                transparent 60%,
                transparent 100%
              )
            `,
            backgroundSize: '200% 100%',
            animation: 'terminal-shimmer 8s ease-in-out infinite',
          }}
        />
      )}

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} delay={p.delay} duration={p.duration} startX={p.x} startY={p.y} reduced={reduced} />
      ))}
    </div>
  );
}
