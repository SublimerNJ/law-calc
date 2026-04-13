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
  const categoryNextSteps: Record<string, string[]> = {
    court: [
      '입력값(청구금액, 심급, 당사자 수)을 판결문/소장 기준으로 다시 대조해 보세요.',
      '결과를 기준으로 소송비용·절차 선택(소송, 지급명령, 조정)을 비교 검토해 보세요.',
      '실제 진행 전에는 사건 관할 법원 서식과 최신 규칙 개정 여부를 확인하세요.',
    ],
    family: [
      '혼인기간, 소득, 부양관계, 특유재산 등 핵심 사실관계를 문서로 정리해 두세요.',
      '계산 결과를 협의안의 출발점으로 사용하되, 조정·소송 단계에서 달라질 수 있음을 전제로 보세요.',
      '자녀·상속 관련 사건은 일정과 기한을 먼저 확인한 뒤 전문가 검토를 받는 것이 안전합니다.',
    ],
    labor: [
      '급여명세서, 근로계약서, 출퇴근/근로시간 기록을 먼저 모아 계산 근거를 명확히 하세요.',
      '결과값은 1차 점검용으로 사용하고, 실제 청구·신청 금액은 증빙 범위에 맞춰 조정하세요.',
      '노동청 진정·위원회 신청 등 절차는 사안별 요건이 달라 사전 확인이 필요합니다.',
    ],
    tax: [
      '취득·보유·양도 시점과 금액, 공제 항목을 최신 신고 기준으로 다시 검토하세요.',
      '결과를 신고 전 시뮬레이션으로 활용하고, 실제 신고서는 홈택스 기준으로 대조하세요.',
      '세법은 개정 주기가 빨라 신고 연도 기준 고시·예규를 확인하는 것이 중요합니다.',
    ],
    realty: [
      '계약서, 등기사항, 보증금·월세·대출조건을 최신 값으로 맞춰 입력하세요.',
      '결과를 협상/의사결정 참고치로 사용하고, 계약 조항은 별도로 점검하세요.',
      '지역·주택유형·규제 상태에 따라 실제 적용 기준이 달라질 수 있습니다.',
    ],
    traffic: [
      '사고기록, 진단서, 보험사 자료 등 사실관계 자료를 먼저 정리하세요.',
      '계산값은 협상 범위의 참고치이며, 과실비율/처분 수위는 별도 판단될 수 있습니다.',
      '형사·행정 절차는 사건별로 달라질 수 있어 관할 기관 확인이 필요합니다.',
    ],
    debt: [
      '원금, 이율, 기산일, 변제 내역을 기준 문서(계약서/송금내역)로 맞춰 입력하세요.',
      '지연손해금·이자 계산은 기간 구분이 핵심이므로 날짜를 우선 점검하세요.',
      '청구 전 소멸시효 및 절차(지급명령/소송) 일정을 함께 검토하세요.',
    ],
    damages: [
      '치료비·휴업손해·후유장해 등 손해 항목별 근거를 분리해서 정리하세요.',
      '결과값은 합의/청구 준비 단계의 참조치로 보고 증빙 중심으로 재검토하세요.',
      '과실상계·인과관계 판단에 따라 실제 인정액은 달라질 수 있습니다.',
    ],
    misc: [
      '해당 절차의 기한·요건·필수서류를 먼저 체크리스트로 정리해 두세요.',
      '계산 결과/안내 문구는 초기 판단용으로 사용하고 공식 서식과 대조하세요.',
      '권리 보전이 필요한 사안은 시효·기한을 우선 관리하세요.',
    ],
  };

  const categoryPitfalls: Record<string, string[]> = {
    court: ['소가를 실제 청구 구조와 다르게 입력해 비용이 과대·과소 추정되는 경우', '심급별(1심/항소심/상고심) 기준을 혼용하는 경우'],
    family: ['위자료, 재산분할, 양육비를 같은 성격의 금액으로 오해하는 경우', '특유재산/공동재산 구분을 누락하는 경우'],
    labor: ['통상임금과 평균임금을 구분하지 않고 계산하는 경우', '근무기록 없이 수당을 단정하는 경우'],
    tax: ['신고 연도 기준 대신 과거 세율을 그대로 사용하는 경우', '공제 요건 충족 여부 확인 없이 금액만 반영하는 경우'],
    realty: ['보증금·월세 환산 기준을 임의로 적용하는 경우', '규제지역 여부를 최신 상태로 반영하지 않는 경우'],
    traffic: ['초기 과실비율을 확정값으로 오해하는 경우', '치료 종결 전 최종 합의로 가정하는 경우'],
    debt: ['기산일(지연 시작일) 설정 오류로 이자가 크게 달라지는 경우', '약정이율과 법정이율 적용 구간을 혼동하는 경우'],
    damages: ['손해 항목을 중복 합산하는 경우', '장해·휴업 관련 자료 없이 결과를 확정적으로 해석하는 경우'],
    misc: ['시효/기한 계산에서 기준일을 잘못 잡는 경우', '안내 문구를 개별 사건의 결론으로 단정하는 경우'],
  };

  const nextSteps = categoryNextSteps[category.id] ?? categoryNextSteps.misc;
  const pitfalls = categoryPitfalls[category.id] ?? categoryPitfalls.misc;

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
          <Link aria-label="Navigation link" href="/" className="hover:text-slate-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
            홈
          </Link>
          <span>/</span>
          <Link aria-label="Navigation link" href={`/#${category.id}`} className="hover:text-slate-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
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
        <div className="flex flex-wrap items-center gap-4 mb-8 text-xs text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-lg w-fit shadow-sm glassmorphism glass-panel">
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
          <Link aria-label="Navigation link" href="/editorial-policy" className="text-blue-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">데이터 검증 정책</Link>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {children}
            
            {/* Extended Editorial Guide for Thin Content Prevention */}
            {tool.extendedGuide && (
              <article className="mt-10 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm prose prose-slate max-w-none glassmorphism glass-panel">
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
              <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm glassmorphism glass-panel">
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
                    <details key={i} className="group bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden glassmorphism glass-panel">
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

            <section className="mt-10 grid gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm glassmorphism glass-panel">
                <h2 className="text-xl font-bold text-slate-900 mb-4">결과 해석 가이드</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  이 페이지의 계산 결과는 <strong>의사결정 보조용 1차 추정치</strong>입니다. 실제 금액, 책임 범위, 절차 결과는
                  사실관계, 증빙, 관할 기관 또는 법원의 판단에 따라 달라질 수 있습니다.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                  {pitfalls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">실무 다음 단계 체크리스트</h2>
                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                  {nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm glassmorphism glass-panel">
                <h2 className="text-lg font-bold text-slate-900 mb-3">관련 읽을거리 및 정책</h2>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Link aria-label="Navigation link" href="/guides" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드 모아보기</Link>
                  <Link aria-label="Navigation link" href="/editorial-policy" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">편집/검증 정책</Link>
                  <Link aria-label="Navigation link" href="/about" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">서비스 소개</Link>
                  <Link aria-label="Navigation link" href="/terms" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">이용약관</Link>
                  <Link aria-label="Navigation link" href="/privacy" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">개인정보처리방침</Link>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            {/* Sidebar ad disabled for review */}
            {/* <div className="sticky top-24">
              <AdBanner format="rectangle" className="rounded-2xl overflow-hidden" />
            </div> */}

            {/* Related tools */}
            {tool.relatedTools && tool.relatedTools.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24 glassmorphism glass-panel">
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
                        <Link aria-label="Navigation link"
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
        <div className="mt-12 p-5 bg-slate-100 rounded-xl border border-slate-200 glassmorphism glass-panel">
          <p className="text-xs text-slate-500 leading-relaxed text-justify">
            <strong className="text-slate-700">법적 면책 조항 (Legal Disclaimer):</strong> law-calc.kr에서 제공하는 모든 계산 결과 및 법률 가이드는 참고 목적으로만 제공되며, 법적 구속력이 없습니다. 본 서비스는 최대한 정확한 최신 법령 및 판례(2026년 기준)를 반영하고자 노력하나, 개별 사건의 특수한 사실관계나 향후 법령 개정에 따라 실제 산정 결과와 차이가 발생할 수 있습니다. 본 사이트의 정보를 바탕으로 한 법적 조치에 대해 당사는 어떠한 책임도 지지 않으며, 실제 법적 분쟁 및 소송 진행 전에는 반드시 대한변호사협회 등록 전문 변호사, 법무사, 노무사, 세무사 등 관련 자격을 갖춘 법률 전문가와 직접 상담하시기 바랍니다.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link aria-label="Navigation link"
            href={`/#${category.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-6 py-3 rounded-full shadow-sm hover:shadow glassmorphism glass-panel"
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
