import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import Card from '@/components/ui/Card';
import { CATEGORIES, TOOLS, getToolsByCategory } from '@/lib/tools-data';

export default function Home() {
  const totalTools = TOOLS.length;

  return (
    <>
      {/* Hero with parallax */}
      <HeroSection totalTools={totalTools} />

      {/* Categories + Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          return (
            <CategorySection
              key={category.id}
              category={category}
              toolCount={tools.length}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {tools.map((tool) => (
                  <Card key={tool.id} href={tool.route} className="p-4 group">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300 ease-out inline-block">
                        {tool.icon}
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-gray-700 group-hover:text-[var(--color-brand-primary)] transition-colors duration-300 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-200 group-hover:text-white leading-tight transition-colors duration-300 mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-gray-600 group-hover:text-gray-500 line-clamp-2 leading-relaxed transition-colors duration-300">
                      {tool.description}
                    </p>
                  </Card>
                ))}
              </div>
            </CategorySection>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="relative border-t border-white/[0.05]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[var(--color-brand-primary)]/[0.02] blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <h2 className="text-xl font-semibold text-white mb-3">
            찾고 있는 법률 계산기가 있나요?
          </h2>
          <p className="text-sm text-gray-500 font-light tracking-wide">
            {totalTools}개의 법률 계산기가 준비되어 있어요.
          </p>
        </div>
      </section>
    </>
  );
}
