import Link from 'next/link';
import type { Tool, Category } from '@/lib/tools-data';
import { TOOLS } from '@/lib/tools-data';

interface CalculatorLayoutProps {
  tool: Tool;
  category: Category;
  children: React.ReactNode;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

export default function CalculatorLayout({ tool, category, children }: CalculatorLayoutProps) {
  const reviewer = tool.expertReviewer || 'law-calc.kr 편집팀 (법령·판례 근거 공개)';
  const reviewedAt = tool.updatedAt || '2026-07-19';

  const nextSteps = [
    `${tool.name} 입력값을 계약서·명세서·고지서 등 원본 서류와 다시 대조하세요.`,
    tool.legalCitations?.[0]
      ? `적용 근거(${tool.legalCitations[0]})가 본인 사안에 해당하는지 국가법령정보센터에서 현행 조문을 확인하세요.`
      : '적용 법령이 현행 기준인지 국가법령정보센터(law.go.kr)에서 확인하세요.',
    '계산 결과는 1차 추정치입니다. 청구·신고·소송 전에는 자격 있는 전문가와 사실관계를 점검하세요.',
  ];

  const pitfalls = [
    `${tool.name} 결과를 개별 사건의 확정 금액·확정 처분으로 단정하는 경우`,
    '입력 기준일·기간·공제 요건을 실제 사실관계와 다르게 넣는 경우',
    tool.faqItems?.[0]
      ? `FAQ의 일반 설명("${tool.faqItems[0].question}")을 본인 사안의 결론으로 그대로 적용하는 경우`
      : '일반적인 안내 문구를 본인 사안의 결론으로 그대로 적용하는 경우',
  ];

  const relatedGuides: Record<string, { href: string; label: string }[]> = {
    court: [
      { href: '/guides/how-to-calculate-attorney-fee', label: '변호사보수 산입 가이드' },
      { href: '/guides/civil-mediation-vs-lawsuit', label: '조정 vs 소송' },
    ],
    labor: [
      { href: '/guides/understanding-severance-pay', label: '퇴직금 가이드' },
      { href: '/guides/unfair-dismissal-relief', label: '부당해고 가이드' },
    ],
    tax: [
      { href: '/guides/capital-gains-tax-exemption', label: '양도세 비과세' },
      { href: '/guides/comprehensive-income-tax-freelancer', label: '프리랜서 종소세' },
    ],
    realty: [{ href: '/guides/deposit-return-dispute', label: '전세금 미반환' }],
    damages: [{ href: '/guides/defamation-sns', label: 'SNS 명예훼손' }],
    family: [{ href: '/guides', label: '가이드 전체' }],
    traffic: [{ href: '/guides', label: '가이드 전체' }],
    debt: [{ href: '/guides', label: '가이드 전체' }],
    misc: [{ href: '/guides', label: '가이드 전체' }],
  };

  const guides = relatedGuides[category.id] ?? relatedGuides.misc;

  const schemaLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.longDescription || tool.description,
        url: `${BASE_URL}${tool.route}`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        inLanguage: 'ko-KR',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
        publisher: { '@type': 'Organization', name: 'law-calc.kr', url: BASE_URL },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: category.name,
            item: `${BASE_URL}/#${category.id}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.name,
            item: `${BASE_URL}${tool.route}`,
          },
        ],
      },
      ...(tool.faqItems && tool.faqItems.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: tool.faqItems.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-teal-800">
            홈
          </Link>
          <span>/</span>
          <Link href={`/#${category.id}`} className="hover:text-teal-800">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-zinc-700">{tool.name}</span>
        </nav>

        <header className="mb-5">
          <p className="text-xs font-medium text-zinc-500 mb-1.5">{category.name}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">{tool.name}</h1>
          <p className="text-sm text-zinc-500 mt-1.5 max-w-2xl">{tool.description}</p>
        </header>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-xs text-zinc-600 bg-white border border-stone-200 px-4 py-2.5 rounded-xl">
          <span>
            <strong className="text-zinc-800">작성·검토:</strong> {reviewer}
          </span>
          <span className="text-stone-300">|</span>
          <span>
            <strong className="text-zinc-800">검토일:</strong> {reviewedAt}
          </span>
          <span className="text-stone-300">|</span>
          <Link href="/editorial-policy" className="text-teal-800 font-medium hover:underline">
            검증 정책
          </Link>
          <span className="text-stone-300">|</span>
          <Link href="/about" className="text-teal-800 font-medium hover:underline">
            운영 주체
          </Link>
        </div>

        {tool.longDescription && (
          <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-card)]">
            <h2 className="text-base font-bold text-zinc-900 mb-2">이 계산기가 하는 일</h2>
            <p className="text-sm text-zinc-600 leading-relaxed">{tool.longDescription}</p>
            {tool.legalCitations && tool.legalCitations.length > 0 && (
              <p className="mt-3 text-xs text-zinc-500">
                주요 근거: {tool.legalCitations.slice(0, 2).join(' · ')}
              </p>
            )}
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-[var(--shadow-card)]">
              {children}
            </div>

            {tool.extendedGuide && (
              <article className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] prose prose-zinc max-w-none">
                <h2 className="text-xl font-bold text-zinc-900 mb-4 !mt-0 border-b border-stone-100 pb-3">
                  {tool.name} 상세 가이드
                </h2>
                <div
                  className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: tool.extendedGuide }}
                />
              </article>
            )}

            {tool.legalCitations && tool.legalCitations.length > 0 && (
              <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
                <h2 className="text-sm font-bold text-zinc-900 mb-3">참고 법령 및 근거</h2>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-700">
                  {tool.legalCitations.map((citation, idx) => (
                    <li key={idx}>{citation}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-zinc-500">
                  조문 원문:{' '}
                  <a
                    href="https://www.law.go.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-800 hover:underline"
                  >
                    국가법령정보센터
                  </a>
                </p>
              </section>
            )}

            {tool.faqItems && tool.faqItems.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-zinc-900 mb-4">{tool.name} FAQ</h2>
                <div className="space-y-2">
                  {tool.faqItems.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-stone-200 bg-white overflow-hidden"
                    >
                      <summary className="cursor-pointer p-4 text-sm font-semibold text-zinc-800 hover:bg-stone-50 list-none flex justify-between gap-3">
                        <span>Q. {faq.question}</span>
                        <span className="text-zinc-400 group-open:rotate-180 transition-transform">▾</span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-zinc-600 leading-relaxed border-t border-stone-100 pt-3">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="grid gap-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <h2 className="text-lg font-bold text-zinc-900 mb-3">결과 해석 시 주의점</h2>
                <p className="text-sm text-zinc-600 leading-relaxed mb-3">
                  계산 결과는 <strong className="text-zinc-800">의사결정 보조용 1차 추정치</strong>입니다. 실제
                  금액·절차 결과는 사실관계와 관할 기관 판단에 따라 달라질 수 있습니다.
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-700">
                  {pitfalls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-5">
                <h2 className="text-lg font-bold text-zinc-900 mb-3">실무 다음 단계</h2>
                <ol className="list-decimal list-inside space-y-1.5 text-sm text-zinc-700">
                  {nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5">
                <h2 className="text-base font-bold text-zinc-900 mb-3">관련 자료</h2>
                <div className="flex flex-wrap gap-2">
                  {guides.map((g) => (
                    <Link
                      key={g.href}
                      href={g.href}
                      className="px-3 py-1.5 rounded-[10px] border border-stone-200 text-sm text-zinc-700 hover:border-teal-700 hover:text-teal-800 transition-colors"
                    >
                      {g.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="px-3 py-1.5 rounded-[10px] border border-stone-200 text-sm text-zinc-700 hover:border-teal-700 hover:text-teal-800 transition-colors"
                  >
                    오류 제보
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            {tool.relatedTools && tool.relatedTools.length > 0 && (
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-card)] sticky top-20">
                <h2 className="text-base font-bold text-zinc-900 mb-3">관련 계산기</h2>
                <ul className="space-y-1">
                  {tool.relatedTools.map((rid) => {
                    const related = TOOLS.find((t) => t.id === rid);
                    if (!related) return null;
                    return (
                      <li key={rid}>
                        <Link
                          href={related.route}
                          className="block text-sm text-zinc-600 hover:text-teal-900 hover:bg-stone-50 px-2 py-2 rounded-[8px] transition-colors font-medium"
                        >
                          {related.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-10 rounded-xl border border-stone-200 bg-stone-100/80 p-4">
          <p className="text-xs text-zinc-500 leading-relaxed">
            <strong className="text-zinc-700">면책:</strong> 계산 결과와 가이드는 참고 정보이며 법률·노무·세무
            자문을 대체하지 않습니다. 문의:{' '}
            <a href="mailto:sublimernj@gmail.com" className="text-teal-800 hover:underline">
              sublimernj@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/#${category.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-teal-800 border border-stone-200 bg-white px-5 py-2.5 rounded-[10px]"
          >
            {category.name}으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
