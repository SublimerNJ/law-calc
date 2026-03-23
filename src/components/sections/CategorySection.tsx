'use client';

import { useEffect, useRef, useState } from 'react';
import type { Category } from '@/lib/tools-data';

interface CategorySectionProps {
  category: Category;
  children: React.ReactNode;
  toolCount: number;
}

export default function CategorySection({ category, children, toolCount }: CategorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={category.id}
      className="scroll-mt-24"
      style={{
        opacity: isVisible || isReducedMotion ? 1 : 0,
        transform: isVisible || isReducedMotion ? 'translate3d(0, 0, 0)' : 'translate3d(0, 30px, 0)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {!isReducedMotion && (
        <style dangerouslySetInnerHTML={{__html: `
          #${category.id} .stagger-container > * > * {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
          ${isVisible ? `
            #${category.id} .stagger-container > * > * {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
            ${Array.from({ length: 30 }).map((_, i) => `
              #${category.id} .stagger-container > * > *:nth-child(${i + 1}) {
                transition-delay: ${0.1 + i * 0.05}s;
              }
            `).join('')}
          ` : ''}
        `}} />
      )}

      {/* Category header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-xl text-lg"
          style={{ backgroundColor: `${category.color}1a` }}
        >
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">{category.name}</h2>
          <p className="text-xs text-slate-500">{category.description}</p>
        </div>
        <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
          {toolCount} tools
        </span>
      </div>

      {/* Gradient divider */}
      <div
        className="h-px mb-6"
        style={{
          background: `linear-gradient(to right, ${category.color}33, transparent)`,
        }}
      />

      {/* Tool cards slot */}
      <div className="stagger-container">
        {children}
      </div>
    </section>
  );
}
