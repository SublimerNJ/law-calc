import Link from 'next/link';
import type { Tool, Category } from '@/lib/tools-data';
import { TOOLS } from '@/lib/tools-data';
import { TOOL_QUALITY } from '@/lib/tool-quality';
import {
  buildCalculatorDisclaimer,
  getDistinctQualityEdges,
  getDistinctQualityExamples,
} from './calculator-layout-content';

interface CalculatorLayoutProps {
  tool: Tool;
  category: Category;
  children: React.ReactNode;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

export default function CalculatorLayout({ tool, category, children }: CalculatorLayoutProps) {
  const quality = TOOL_QUALITY[tool.id];
  const isChecklist = tool.id === 'defamation' || tool.id === 'alimony' || tool.id === 'bail';
  const reviewedAt = quality?.reviewedAt || tool.updatedAt || '2026-08-19';
  const qualityExamples = quality ? getDistinctQualityExamples(tool, quality) : [];
  const qualityEdges = quality ? getDistinctQualityEdges(tool, quality) : [];

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
  const focusedGuide = tool.extendedGuide?.trim();

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
        publisher: { '@type': 'Organization', name: '개인 운영', url: BASE_URL },
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

            {focusedGuide && (
              <article className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] prose prose-zinc max-w-none">
                <h2 className="text-xl font-bold text-zinc-900 mb-4 !mt-0 border-b border-stone-100 pb-3">
                  {tool.name} 핵심 {tool.id === 'bail' ? '보석 요건 확인' : isChecklist ? '확인' : '산정'} 기준
                </h2>
                <div
                  className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: focusedGuide }}
                />
              </article>
            )}

            {quality && (
            <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <h2 className="text-xl font-bold text-zinc-900 mb-5">
                {isChecklist ? '점검 기준과 확인 방법' : '계산 기준과 검산 방법'}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">
                    {isChecklist ? '이 점검표가 확인하는 항목' : '이 계산기가 쓰는 공식'}
                  </h3>
                  <p className="text-sm text-zinc-700 leading-relaxed">{quality.formula}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">{isChecklist ? '확인 항목 정의' : '입력값 정의'}</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-700">
                    {quality.inputs.map((input) => (
                      <li key={input}>{input}</li>
                    ))}
                  </ul>
                </div>
                {qualityExamples.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">
                    {isChecklist ? '검토 예시' : '숫자 예시'}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {qualityExamples.map((example) => (
                      <article key={example.title} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                        <h4 className="text-sm font-semibold text-zinc-900 mb-2">{example.title}</h4>
                        <p className="text-sm text-zinc-600 leading-relaxed mb-2">{example.setup}</p>
                        <p className="text-sm text-zinc-800 leading-relaxed">{example.result}</p>
                      </article>
                    ))}
                  </div>
                </div>
                )}
                {qualityEdges.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-2">결과가 달라지는 조건</h3>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-700">
                    {qualityEdges.map((edge) => (
                      <li key={edge}>{edge}</li>
                    ))}
                  </ul>
                </div>
                )}
              </div>
            </section>
            )}

            {tool.legalCitations && tool.legalCitations.length > 0 && (
              <section className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
                <h2 className="text-sm font-bold text-zinc-900 mb-3">참고 법령 및 근거</h2>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-zinc-700">
                  {(quality?.sources ?? []).map((source) => (
                    <li key={source.url + source.label}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-800 hover:underline"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                  {(tool.legalCitations ?? []).map((citation, idx) => (
                    <li key={`cite-${idx}`}>{citation}</li>
                  ))}
                </ul>
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
              <p className="rounded-xl border border-stone-200 bg-stone-100/80 p-4 text-xs text-zinc-600 leading-relaxed">
                {buildCalculatorDisclaimer(tool, reviewedAt)}
              </p>
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
