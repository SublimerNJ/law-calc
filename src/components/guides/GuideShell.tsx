import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

export interface GuideShellProps {
  title: string;
  category: string;
  accentClass?: string;
  ctaBgClass?: string;
  datePublished: string;
  dateModified: string;
  description: string;
  path: string;
  toolHref?: string;
  toolLabel?: string;
  children: React.ReactNode;
}

export default function GuideShell({
  title,
  category,
  ctaBgClass = 'bg-teal-800 hover:bg-teal-900',
  datePublished,
  dateModified,
  description,
  path,
  toolHref,
  toolLabel,
  children,
}: GuideShellProps) {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        description,
        datePublished,
        dateModified,
        inLanguage: 'ko-KR',
        author: {
          '@type': 'Organization',
          name: 'law-calc.kr 편집팀',
          url: `${BASE_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'law-calc.kr',
          url: BASE_URL,
        },
        mainEntityOfPage: `${BASE_URL}${path}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: '법률 가이드', item: `${BASE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: title, item: `${BASE_URL}${path}` },
        ],
      },
    ],
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />

      <nav className="mb-5 flex items-center gap-2 text-sm" aria-label="breadcrumb">
        <Link href="/guides" className="text-teal-800 hover:underline font-medium">
          법률 가이드
        </Link>
        <span className="text-zinc-400">/</span>
        <span className="text-zinc-600">{category}</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-5 leading-tight tracking-tight">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500 mb-8 pb-6 border-b border-stone-200">
        <span className="font-medium text-zinc-700">law-calc.kr 편집팀</span>
        <span className="text-stone-300">|</span>
        <span>게시 {datePublished}</span>
        <span className="text-stone-300">|</span>
        <span>갱신 {dateModified}</span>
        <span className="text-stone-300">|</span>
        <Link href="/editorial-policy" className="text-teal-800 hover:underline">
          검증 정책
        </Link>
      </div>

      <article className="prose prose-zinc prose-lg max-w-none prose-headings:scroll-mt-24 prose-a:text-teal-800">
        {children}

        {toolHref && toolLabel && (
          <div className="not-prose rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 my-10 shadow-[var(--shadow-card)]">
            <h3 className="text-base font-bold text-zinc-900 mb-2">관련 계산기</h3>
            <p className="text-sm text-zinc-600 mb-4">
              본인 수치로 1차 추정값을 확인하세요. 결과는 참고용입니다.
            </p>
            <Link
              href={toolHref}
              className={`inline-flex items-center ${ctaBgClass} text-white px-5 py-2.5 rounded-[10px] text-sm font-semibold transition-colors min-h-[44px]`}
            >
              {toolLabel} →
            </Link>
          </div>
        )}

        <div className="not-prose mt-10 p-4 rounded-xl border border-stone-200 bg-stone-100/80">
          <p className="text-xs text-zinc-500 leading-relaxed">
            <strong className="text-zinc-700">면책:</strong> 본 가이드는 공개 법령 기준 일반 정보이며 자문을
            대체하지 않습니다.{' '}
            <Link href="/contact" className="text-teal-800 hover:underline">
              오류 제보
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
