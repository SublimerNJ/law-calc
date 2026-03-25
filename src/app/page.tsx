import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import Card from '@/components/ui/Card';
import AdBanner from '@/components/ads/AdBanner';
import { CATEGORIES, TOOLS, getToolsByCategory } from '@/lib/tools-data';

export default function Home() {
  const totalTools = TOOLS.length;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'law-calc.kr 법률 계산기',
    url: 'https://law-calc.kr',
    description: '대한민국 법률 기준 51개 무료 법률 계산기',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://law-calc.kr/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Hero with parallax */}
      <HeroSection totalTools={totalTools} />

      {/* Categories + Tools */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-16 space-y-16">
        {CATEGORIES.map((category, index) => {
          const tools = getToolsByCategory(category.id);
          return (
            <div key={category.id}>
              <CategorySection
                category={category}
                toolCount={tools.length}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {tools.map((tool) => (
                    <Card key={tool.id} href={tool.route} className="p-4 group bg-white border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-300 ease-out inline-block">
                          {tool.icon}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors duration-300 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-slate-900 group-hover:text-blue-700 leading-tight transition-colors duration-300 mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 group-hover:text-slate-600 line-clamp-2 leading-relaxed transition-colors duration-300">
                        {tool.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </CategorySection>
              {/* Ad every 3 categories */}
              {(index === 2 || index === 5) && (
                <div className="mt-8">
                  <AdBanner format="horizontal" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="relative border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            찾고 있는 법률 계산기가 있나요?
          </h2>
          <p className="text-sm text-slate-500 font-normal tracking-wide">
            {totalTools}개의 법률 계산기가 준비되어 있어요.
          </p>
        </div>
      </section>
    </>
  );
}
