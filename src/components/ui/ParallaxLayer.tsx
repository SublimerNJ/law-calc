'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxLayerProps {
  speed: number;
  className?: string;
  children: React.ReactNode;
}

export default function ParallaxLayer({ speed, className = '', children }: ParallaxLayerProps) {
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion.current) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const transform = prefersReducedMotion.current ? undefined : `translateY(${offset * speed}px)`;

  return (
    <div
      className={`parallax-layer ${className}`}
      style={{ transform, willChange: prefersReducedMotion.current ? undefined : 'transform' }}
    >
      {children}
    </div>
  );
}
