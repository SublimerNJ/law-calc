'use client';

import { CATEGORIES, getToolsByCategory } from '@/lib/tools-data';
import ParallaxLayer from '@/components/ui/ParallaxLayer';

interface HeroSectionProps {
  totalTools: number;
}

export default function HeroSection({ totalTools }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center bg-slate-50 border-b border-slate-200">
      {/* Subtle grid background for professional look */}
      <ParallaxLayer speed={0.2} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </ParallaxLayer>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Eyebrow badge */}
        <ParallaxLayer speed={-0.1} className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white text-slate-600 text-xs font-medium tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-slate-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>{totalTools}개 무료 법률 계산기</span>
          </div>
        </ParallaxLayer>

        {/* Main heading */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-[9rem] font-sans font-black tracking-tight leading-[1] mb-6 text-slate-900">
          법률 계산기
        </h1>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-blue-700 mt-2">
          정확하고 빠른 법률 비용 계산
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 font-normal max-w-2xl mx-auto mb-12 mt-6 leading-relaxed tracking-wide">
          변호사 비용부터 세금까지, 70개 법률 계산기를 무료로 이용하세요
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => {
            const count = getToolsByCategory(cat.id).length;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-full
                  bg-white border border-slate-200 shadow-sm
                  hover:bg-slate-50 hover:border-blue-300
                  transition-all duration-300 ease-out"
              >
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity text-slate-600 group-hover:text-blue-600">
                  {cat.icon}
                </span>
                <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors tracking-wide">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono group-hover:text-blue-500 transition-colors">{count}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
