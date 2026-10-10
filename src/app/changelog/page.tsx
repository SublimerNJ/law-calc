import type { Metadata } from 'next';
import Link from 'next/link';
import { CHANGELOG_ENTRIES, CHANGELOG_LAST_MODIFIED } from '@/lib/changelog';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const DESCRIPTION =
  'law-calc.kr의 계산기와 안내가 실제로 어떻게 바뀌었는지, 변경 날짜·내용·Git 커밋·공식 출처를 함께 공개합니다.';

export const metadata: Metadata = {
  title: '변경 이력 | law-calc.kr 계산기·콘텐츠 기록',
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/changelog` },
  openGraph: {
    title: '변경 이력 | law-calc.kr',
    description: DESCRIPTION,
    url: `${BASE_URL}/changelog`,
    type: 'website',
  },
};

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${year}.${month}.${day}`;
}

export default function ChangelogPage() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'law-calc.kr 변경 이력',
    description: DESCRIPTION,
    url: `${BASE_URL}/changelog`,
    dateModified: CHANGELOG_LAST_MODIFIED,
    inLanguage: 'ko-KR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: CHANGELOG_ENTRIES.length,
      itemListElement: CHANGELOG_ENTRIES.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.title,
        url: `${BASE_URL}/changelog#${entry.commit}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-teal-800">
            홈
          </Link>
          <span>/</span>
          <span className="text-zinc-700">변경 이력</span>
        </nav>

        <header className="max-w-3xl mb-12">
          <p className="text-xs font-medium text-zinc-500 mb-2">law-calc.kr 실제 변경 기록</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            계산기와 안내를 어떻게 고쳤는지
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 mt-4 leading-relaxed">
            법령 수치·산식·계산 범위·운영 안내를 실제로 바꾼 기록입니다. 각 항목에는 변경한 내용과 해당 Git 커밋을 적고,
            법령이나 공식 자료를 직접 대조한 경우 그 출처도 함께 연결합니다.
          </p>
          <p className="text-xs text-zinc-500 mt-4">
            이 페이지의 마지막 기록 갱신일: <time dateTime={CHANGELOG_LAST_MODIFIED}>{formatDate(CHANGELOG_LAST_MODIFIED)}</time>
          </p>
        </header>

        <section aria-labelledby="changelog-list-heading">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 id="changelog-list-heading" className="text-xl font-bold text-zinc-900 tracking-tight">
                변경 항목
              </h2>
              <p className="text-sm text-zinc-600 mt-2">최신 변경부터 표시합니다.</p>
            </div>
            <Link href="/about" className="hidden sm:inline-flex text-sm font-medium text-teal-900 hover:underline">
              운영·검증 원칙
            </Link>
          </div>

          <div className="space-y-5">
            {CHANGELOG_ENTRIES.map((entry) => (
              <article
                key={entry.commit}
                id={entry.commit}
                className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7 shadow-[var(--shadow-card)] scroll-mt-24"
              >
                <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <time dateTime={entry.date} className="text-xs font-medium text-teal-800">
                      {formatDate(entry.date)}
                    </time>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 leading-relaxed mt-1">
                      {entry.title}
                    </h3>
                  </div>
                  <Link
                    href={entry.commitUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-xs font-mono text-zinc-500 hover:text-teal-900 hover:underline"
                  >
                    커밋 {entry.commit}
                  </Link>
                </header>

                <p className="text-sm text-zinc-700 leading-relaxed mt-4">{entry.summary}</p>

                <ul className="mt-5 space-y-2 text-sm text-zinc-700 leading-relaxed list-disc list-inside">
                  {entry.changes.map((change) => (
                    <li key={change}>{change}</li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <p className="text-xs font-semibold text-zinc-600 mb-2">변경 근거</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
                    {entry.sources.map((source) => (
                      <li key={source.href}>
                        <Link
                          href={source.href}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-teal-900 hover:underline"
                        >
                          {source.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 border-t border-stone-200 pt-8">
          <p className="text-sm text-zinc-600 leading-relaxed">
            변경 이력은 계산 결과를 보증하는 페이지가 아닙니다. 중요한 신고·청구·소송 전에는 각 계산기의 출처 링크와 시행일,
            관할 기관의 최신 안내를 다시 확인하세요.
          </p>
        </section>
      </div>
    </div>
  );
}
