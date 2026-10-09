import Link from 'next/link';
import type { Category, Tool } from '@/lib/tools-data';
import type { CategoryHubContent } from '@/lib/category-hubs';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

interface CategoryHubPageProps {
  category: Category;
  content: CategoryHubContent;
  tools: Tool[];
}

export default function CategoryHubPage({ category, content, tools }: CategoryHubPageProps) {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.intro,
    url: `${BASE_URL}/tools/${category.id}`,
    inLanguage: 'ko-KR',
    isPartOf: { '@type': 'WebSite', name: 'law-calc.kr', url: BASE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.name,
        url: `${BASE_URL}${tool.route}`,
      })),
    },
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
          <Link href="/tools" className="hover:text-teal-800">
            전체 도구
          </Link>
          <span>/</span>
          <span className="text-zinc-700">{category.name}</span>
        </nav>

        <header className="mb-9">
          <p className="text-xs font-medium text-zinc-500 mb-2">{category.name}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">{content.title}</h1>
          <p className="text-sm sm:text-base text-zinc-600 mt-4 max-w-3xl leading-relaxed">{content.intro}</p>
        </header>

        <section className="mb-10 rounded-2xl border border-stone-200 bg-white p-5 sm:p-7 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-bold text-zinc-900 mb-3">{content.selectionHeading}</h2>
          <p className="text-sm text-zinc-600 leading-relaxed">{content.selectionIntro}</p>
        </section>

        <section aria-labelledby="tool-list-heading">
          <h2 id="tool-list-heading" className="text-xl font-bold text-zinc-900 tracking-tight">
            {content.toolListHeading}
          </h2>
          <p className="text-sm text-zinc-600 mt-3 mb-5 max-w-3xl leading-relaxed">{content.toolListIntro}</p>
          <div className="grid gap-4">
            {tools.map((tool) => {
              const note = content.toolNotes[tool.id];
              if (!note) return null;

              return (
                <article
                  key={tool.id}
                  className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 hover:border-stone-300 transition-colors"
                >
                  <h3 className="text-base font-bold text-zinc-900 leading-relaxed">{note}</h3>
                  <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
                    {tool.name} 페이지에서 입력 항목과 계산 범위를 먼저 확인한 뒤 결과를 검산하세요.
                  </p>
                  <Link
                    href={tool.route}
                    className="inline-flex mt-4 text-sm font-semibold text-teal-900 hover:underline underline-offset-2"
                  >
                    {tool.name} 열기
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-7">
          <h2 className="text-lg font-bold text-zinc-900 mb-3">{content.closingHeading}</h2>
          <p className="text-sm text-zinc-700 leading-relaxed">{content.closingText}</p>
          <Link
            href={content.relatedLinkHref}
            className="inline-flex mt-4 text-sm font-semibold text-teal-900 hover:underline underline-offset-2"
          >
            {content.relatedLinkLabel}
          </Link>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center rounded-[10px] border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 hover:border-teal-700 hover:text-teal-900"
          >
            {category.name}의 다른 도구 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
