import Link from 'next/link';
import type { Tool, Category } from '@/lib/tools-data';
import { TOOLS } from '@/lib/tools-data';
// import AdBanner from '@/components/ads/AdBanner'; // Temporarily disabled for AdSense review to improve content-to-ad ratio

interface CalculatorLayoutProps {
  tool: Tool;
  category: Category;
  children: React.ReactNode;
}

export default function CalculatorLayout({ tool, category, children }: CalculatorLayoutProps) {
  // Generate Schema.org JSON-LD for SoftwareApplication & FAQ to improve E-E-A-T and SEO
  const schemaLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        author: {
          '@type': 'Organization',
          name: tool.expertReviewer || 'law-calc.kr 법률 데이터 분석팀'
        }
      },
      ...(tool.faqItems && tool.faqItems.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: tool.faqItems.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }] : [])
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
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
        <div className="flex items-center gap-4 mb-4">
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

        {/* Trust Signals Badge (E-E-A-T) */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-lg w-fit shadow-sm">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-semibold text-slate-800">작성 및 감수:</span> {tool.expertReviewer || 'law-calc.kr 법률 데이터 분석팀'}
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold text-slate-800">최근 검토일:</span> {tool.updatedAt || '2026.04.08'}
          </div>
          <span className="text-slate-300">|</span>
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">데이터 검증 정책</Link>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {children}
            
            {/* Extended Editorial Guide for Thin Content Prevention */}
            {tool.extendedGuide && (
              <article className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm prose prose-slate max-w-none">
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">상세 법률 가이드: {tool.name}의 이해</h2>
                <div 
                  className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: tool.extendedGuide }}
                />
              </article>
            )}

            {/* Legal Citations (E-E-A-T) */}
            {tool.legalCitations && tool.legalCitations.length > 0 && (
              <section className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  참고 법령 및 판례 근거
                </h3>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 pl-2">
                  {tool.legalCitations.map((citation, idx) => (
                    <li key={idx}>{citation}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Long description fallback */}
            {tool.longDescription && !tool.extendedGuide && (
              <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-3">계산기 요약 설명</h2>
                <p className="text-sm text-slate-700 leading-relaxed">{tool.longDescription}</p>
              </section>
            )}

            {/* FAQ */}
            {tool.faqItems && tool.faqItems.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900 mb-5">자주 묻는 질문 (FAQ)</h2>
                <div className="space-y-3">
                  {tool.faqItems.map((faq, i) => (
                    <details key={i} className="group bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                      <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                        <span>Q. {faq.question}</span>
                        <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Sidebar ad disabled for review */}
            {/* <div className="sticky top-24">
              <AdBanner format="rectangle" className="rounded-2xl overflow-hidden" />
            </div> */}

            {/* Related tools */}
            {tool.relatedTools && tool.relatedTools.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  관련 법률 계산기
                </h3>
                <ul className="space-y-1">
                  {tool.relatedTools.map((rid) => {
                    const related = TOOLS.find((t) => t.id === rid);
                    if (!related) return null;
                    return (
                      <li key={rid}>
                        <Link
                          href={related.route}
                          className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 p-2.5 rounded-lg transition-all"
                        >
                          <span className="text-lg">{related.icon}</span>
                          <span className="font-medium">{related.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-5 bg-slate-100 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 leading-relaxed text-justify">
            <strong className="text-slate-700">법적 면책 조항 (Legal Disclaimer):</strong> law-calc.kr에서 제공하는 모든 계산 결과 및 법률 가이드는 참고 목적으로만 제공되며, 법적 구속력이 없습니다. 본 서비스는 최대한 정확한 최신 법령 및 판례(2026년 기준)를 반영하고자 노력하나, 개별 사건의 특수한 사실관계나 향후 법령 개정에 따라 실제 산정 결과와 차이가 발생할 수 있습니다. 본 사이트의 정보를 바탕으로 한 법적 조치에 대해 당사는 어떠한 책임도 지지 않으며, 실제 법적 분쟁 및 소송 진행 전에는 반드시 대한변호사협회 등록 전문 변호사, 법무사, 노무사, 세무사 등 관련 자격을 갖춘 법률 전문가와 직접 상담하시기 바랍니다.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href={`/#${category.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-6 py-3 rounded-full shadow-sm hover:shadow"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {category.name} 카테고리로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
