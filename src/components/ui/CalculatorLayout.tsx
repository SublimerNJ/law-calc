import Link from 'next/link';
import type { Tool, Category } from '@/lib/tools-data';
import { TOOLS } from '@/lib/tools-data';
import AdBanner from '@/components/ads/AdBanner';

interface CalculatorLayoutProps {
  tool: Tool;
  category: Category;
  children: React.ReactNode;
}

export default function CalculatorLayout({ tool, category, children }: CalculatorLayoutProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            홈
          </Link>
          <span>/</span>
          <Link href={`/#${category.id}`} className="hover:text-slate-900 transition-colors">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-slate-600">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl"
            style={{ backgroundColor: `${category.color}1a` }}
          >
            {tool.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{tool.name}</h1>
            <p className="text-sm text-slate-500">{tool.description}</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {children}
            {/* Ad after calculator result */}
            <div className="mt-6">
              <AdBanner format="horizontal" />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-4">
            {/* Sidebar ad */}
            <div className="sticky top-24">
              <AdBanner format="rectangle" className="rounded-2xl overflow-hidden" />
            </div>

            {/* Related tools */}
            {tool.relatedTools && tool.relatedTools.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">관련 계산기</h3>
                <ul className="space-y-2">
                  {tool.relatedTools.map((rid) => {
                    const related = TOOLS.find((t) => t.id === rid);
                    if (!related) return null;
                    return (
                      <li key={rid}>
                        <Link
                          href={related.route}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors py-1"
                        >
                          <span className="text-base">{related.icon}</span>
                          <span>{related.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Long description */}
        {tool.longDescription && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">이 계산기에 대하여</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{tool.longDescription}</p>
          </section>
        )}

        {/* FAQ */}
        {tool.faqItems && tool.faqItems.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-4">
              {tool.faqItems.map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-200 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors">
                    <span>Q. {faq.question}</span>
                    <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Ad between FAQ and disclaimer */}
        <div className="mt-8">
          <AdBanner format="horizontal" />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-600">면책 안내:</strong> 본 계산기의 결과는 참고용이며, 법률 자문을 대체하지 않습니다.
            실제 법률 문제에 대해서는 반드시 변호사 등 전문가와 상담하시기 바랍니다.
            계산 기준일 및 적용 법령에 따라 실제 금액과 차이가 있을 수 있습니다.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href={`/#${category.id}`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {category.name} 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
