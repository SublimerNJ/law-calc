'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxLayerProps {
  speed: number;
  className?: string;
  children: React.ReactNode;
}

export default function ParallaxLayer({ speed, className = '', children }: ParallaxLayerProps) {
  const [offset, setOffset] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Check initial preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const checkActive = () => {
      const isMobile = window.innerWidth < 768;
      const shouldBeActive = !prefersReducedMotion && !isMobile;
      
      setIsActive(shouldBeActive);
      if (!shouldBeActive) {
        setOffset(0);
      }
    };

    // Initial check
    checkActive();

    // Listen to resize
    window.addEventListener('resize', checkActive, { passive: true });

    return () => {
      window.removeEventListener('resize', checkActive);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial offset in case scroll is not at top when active
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isActive]);

  const transform = isActive ? `translate3d(0, ${offset * speed}px, 0)` : undefined;
  const willChange = isActive ? 'transform' : undefined;

  return (
    <div
      className={`parallax-layer ${className}`}
      style={{ transform, willChange }}
    >
      {children}
    </div>
  );
}
