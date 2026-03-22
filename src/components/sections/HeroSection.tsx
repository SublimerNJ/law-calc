'use client';

import ParallaxLayer from '@/components/ui/ParallaxLayer';
import { CATEGORIES, getToolsByCategory } from '@/lib/tools-data';

interface HeroSectionProps {
  totalTools: number;
}

export default function HeroSection({ totalTools }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden min-h-[85vh] flex items-center justify-center"
      style={{ background: 'var(--color-background)' }}
    >
      {/* Layer 1: Ambient glow orbs - gold and blue */}
      <ParallaxLayer
        speed={-0.15}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#c9a84c]/[0.04] blur-[120px]" />
        <div className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#3b82f6]/[0.03] blur-[150px]" />
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-[#c9a84c]/[0.02] blur-[100px]" />
      </ParallaxLayer>

      {/* Layer 2: Fine grain dot texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Layer 3: Subtle vertical lines with gold tint */}
      <ParallaxLayer
        speed={-0.05}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.3) 0px, transparent 1px, transparent 120px)',
          }}
        />
      </ParallaxLayer>

      {/* Layer 4: Scale-of-justice inspired geometric shapes */}
      <ParallaxLayer
        speed={-0.12}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rotate-45 border border-white/[0.03] rounded-[2rem]"
        />
        <div
          className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[240px] h-[240px] rotate-45 border border-[#c9a84c]/[0.04] rounded-[1.5rem]"
        />
      </ParallaxLayer>

      {/* Layer 5: Horizontal gold accent line */}
      <ParallaxLayer
        speed={-0.03}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[60%] max-w-md h-px bg-gradient-to-r from-transparent via-[#c9a84c]/10 to-transparent" />
      </ParallaxLayer>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Eyebrow badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-sm text-gray-400 text-xs font-medium tracking-[0.2em] uppercase px-5 py-2 rounded-full border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span>{totalTools}개 무료 법률 계산기</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-sans font-black tracking-tight leading-[0.9] mb-6">
          <span className="block text-white">법률 계산기</span>
        </h1>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-sans font-medium text-[#c9a84c] mt-2">
          정확하고 빠른 법률 비용 계산
        </p>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-500 font-light max-w-2xl mx-auto mb-12 mt-6 leading-relaxed tracking-wide">
          변호사 비용부터 세금까지, 70개 법률 계산기를 무료로 이용하세요
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((cat) => {
            const count = getToolsByCategory(cat.id).length;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="group flex items-center gap-2 px-4 py-2 rounded-full
                  bg-white/[0.03] border border-white/[0.06]
                  hover:bg-white/[0.06] hover:border-[#c9a84c]/20
                  transition-all duration-500 ease-out"
              >
                <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                  {cat.icon}
                </span>
                <span className="text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors tracking-wide">
                  {cat.name}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">{count}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-light">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
    </section>
  );
}
