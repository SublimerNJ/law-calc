import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, getToolsByCategory } from '@/lib/tools-data';
import { CATEGORY_HUBS } from '@/lib/category-hubs';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const HUB_REVIEW_DATE = '2026-10-09';

export const metadata: Metadata = {
  title: '법률 계산기 분야별 디렉터리',
  description: '소송·가족법·노동·세금·부동산 등 상황에 맞는 law-calc.kr 법률 계산기를 분야별로 고르는 안내입니다.',
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: {
    title: '법률 계산기 분야별 디렉터리',
    description: '계산하려는 법률 문제에 맞는 도구를 분야별로 찾아보세요.',
    url: `${BASE_URL}/tools`,
    type: 'website',
  },
};

export default function ToolsDirectoryPage() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '법률 계산기 분야별 디렉터리',
    description: metadata.description,
    url: `${BASE_URL}/tools`,
    dateModified: HUB_REVIEW_DATE,
    inLanguage: 'ko-KR',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CATEGORIES.map((category, index) => {
        const content = CATEGORY_HUBS[category.id];
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: content.title,
          url: `${BASE_URL}/tools/${category.id}`,
        };
      }),
    },
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-teal-800">
            홈
          </Link>
          <span>/</span>
          <span className="text-zinc-700">전체 도구</span>
        </nav>

        <header className="max-w-3xl mb-10">
          <p className="text-xs font-medium text-zinc-500 mb-2">law-calc.kr 도구 디렉터리</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            법률 계산기를 상황별로 고르는 페이지
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 mt-4 leading-relaxed">
            법률 문제의 이름만으로는 어떤 계산기를 써야 할지 모호할 수 있습니다. 먼저 분쟁의 분야와 필요한 자료를 좁힌 다음, 분야별 허브에서 도구의 입력 범위와 선택 기준을 읽어 보세요.
          </p>
        </header>

        <section className="mb-12 rounded-2xl border border-stone-200 bg-white p-5 sm:p-7 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">도구를 고르는 세 단계</h2>
          <ol className="space-y-3 text-sm text-zinc-700 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-zinc-400 tabular-nums font-medium">1</span>
              어떤 사건이나 거래에서 숫자가 생겼는지 한 문장으로 적습니다.
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-400 tabular-nums font-medium">2</span>
              계약서·급여명세서·영수증처럼 실제로 확인할 수 있는 자료를 고릅니다.
            </li>
            <li className="flex gap-3">
              <span className="text-zinc-400 tabular-nums font-medium">3</span>
              분야 허브의 선택 기준을 읽고 계산 결과와 공식 안내를 대조합니다.
            </li>
          </ol>
        </section>

        <section aria-labelledby="category-list-heading">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 id="category-list-heading" className="text-xl font-bold text-zinc-900 tracking-tight">
                분야별 계산기 허브
              </h2>
              <p className="text-sm text-zinc-600 mt-2">각 허브는 도구를 고르는 이유와 입력 전에 확인할 자료를 따로 설명합니다.</p>
            </div>
            <Link href="/" className="hidden sm:inline-flex text-sm font-medium text-teal-900 hover:underline">
              홈의 전체 목록
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {CATEGORIES.map((category) => {
              const content = CATEGORY_HUBS[category.id];
              const toolCount = getToolsByCategory(category.id).length;

              return (
                <article
                  key={category.id}
                  className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 hover:border-stone-300 transition-colors"
                >
                  <p className="text-xs text-zinc-500 mb-2">{toolCount}개 도구</p>
                  <h3 className="text-lg font-bold text-zinc-900 leading-relaxed">{content.title}</h3>
                  <p className="text-sm text-zinc-600 mt-2 leading-relaxed">{category.description}을 다루는 도구를 묶었습니다.</p>
                  <Link
                    href={`/tools/${category.id}`}
                    aria-label={`${content.title} 허브 보기`}
                    className="inline-flex mt-4 text-sm font-semibold text-teal-900 hover:underline underline-offset-2"
                  >
                    {content.title} 허브 보기
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-12 border-t border-stone-200 pt-8">
          <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
            모든 결과는 입력한 자료를 바탕으로 한 참고 정보입니다. 법령 시행일, 기관별 심사 기준, 사건의 구체적인 사실관계가 결과를 바꿀 수 있으므로 중요한 신고·청구·소송 전에는 해당 기관이나 전문가의 최신 안내를 확인하세요.
          </p>
        </section>
      </div>
    </div>
  );
}
