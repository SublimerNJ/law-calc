import Link from 'next/link';
import dynamic from 'next/dynamic';
import CategorySection from '@/components/sections/CategorySection';
import { CATEGORIES, TOOLS, getToolsByCategory } from '@/lib/tools-data';

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: true });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';

export default function Home() {
  const totalTools = TOOLS.length;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'law-calc.kr 법률 계산기',
        url: BASE_URL,
        description: `대한민국 법령 기준 ${totalTools}개 무료 법률·노무·세무 계산기`,
        inLanguage: 'ko-KR',
        publisher: {
          '@type': 'Organization',
          name: 'law-calc.kr',
          url: BASE_URL,
          email: 'sublimernj@gmail.com',
        },
      },
      {
        '@type': 'Organization',
        name: 'law-calc.kr',
        url: BASE_URL,
        email: 'sublimernj@gmail.com',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <HeroSection totalTools={totalTools} />

      {/* Trust as prose band, not three identical icon cards */}
      <section className="border-b border-stone-200 bg-[var(--color-background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="max-w-3xl space-y-4 text-[15px] text-zinc-700 leading-relaxed">
            <p>
              <strong className="text-zinc-900">법령 근거를 페이지에 둡니다.</strong> 각 계산기는 적용 조문과
              산정 구조를 같이 보여 줍니다.
            </p>
            <p>
              <strong className="text-zinc-900">입력값은 브라우저에서 처리합니다.</strong> 회원가입 없이
              쓰고, 민감 정보를 서버에 쌓지 않는 구조를 유지합니다.
            </p>
            <p>
              <strong className="text-zinc-900">법률 자문이 아닙니다.</strong> 1차 참고용이며, 신고·청구·소송
              전에는 자격 있는 전문가 확인을 권합니다.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <Link href="/editorial-policy" className="text-teal-900 underline-offset-2 hover:underline">
              검증 정책
            </Link>
            <Link href="/about" className="text-teal-900 underline-offset-2 hover:underline">
              운영 주체
            </Link>
            <Link href="/contact" className="text-teal-900 underline-offset-2 hover:underline">
              오류 제보
            </Link>
          </div>
        </div>
      </section>

      {/* How-to as numbered list, not card grid of numbered circles */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-5">이용 순서</h2>
          <ol className="max-w-2xl space-y-3 text-[15px] text-zinc-700">
            <li className="flex gap-3">
              <span className="tabular-nums text-zinc-400 font-medium w-5 shrink-0">1</span>
              아래 목록에서 계산기를 고릅니다.
            </li>
            <li className="flex gap-3">
              <span className="tabular-nums text-zinc-400 font-medium w-5 shrink-0">2</span>
              계약서·명세서 기준 숫자를 입력합니다.
            </li>
            <li className="flex gap-3">
              <span className="tabular-nums text-zinc-400 font-medium w-5 shrink-0">3</span>
              같은 페이지의 법령 근거와 FAQ를 확인합니다.
            </li>
            <li className="flex gap-3">
              <span className="tabular-nums text-zinc-400 font-medium w-5 shrink-0">4</span>
              중요 조치는 전문가 또는 관할 기관 안내와 대조합니다.
            </li>
          </ol>
        </div>
      </section>

      {/* Tools */}
      <div id="tools" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        {CATEGORIES.map((category) => {
          const tools = getToolsByCategory(category.id);
          return (
            <CategorySection key={category.id} category={category} toolCount={tools.length}>
              <ul className="divide-y divide-stone-200 border border-stone-200 rounded-[12px] bg-white overflow-hidden">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={tool.route}
                      className="flex items-start sm:items-center gap-3 sm:gap-4 px-4 py-3.5 hover:bg-stone-50 transition-colors group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-900 group-hover:text-teal-900">
                          {tool.name}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{tool.description}</p>
                      </div>
                      <span className="text-xs text-zinc-400 group-hover:text-teal-800 shrink-0 pt-0.5">
                        열기
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CategorySection>
          );
        })}
      </div>

      {/* Guides - asymmetric: one lead + two compact */}
      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">실무 가이드</h2>
            <Link href="/guides" className="text-sm font-medium text-teal-900 hover:underline">
              전체
            </Link>
          </div>
          <div className="grid lg:grid-cols-5 gap-6">
            <Link
              href="/guides/understanding-severance-pay"
              className="lg:col-span-3 block border border-stone-200 rounded-[12px] p-6 sm:p-8 bg-stone-50 hover:bg-white hover:border-stone-300 transition-colors"
            >
              <p className="text-xs font-medium text-zinc-500 mb-2">노동</p>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                퇴직금: 평균임금과 계속근로기간
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                산입 항목, 중간정산, 지급 기한, 3년 시효까지 퇴사 전후 체크리스트로 정리했습니다.
              </p>
            </Link>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <Link
                href="/guides/how-to-calculate-attorney-fee"
                className="flex-1 border border-stone-200 rounded-[12px] p-5 hover:border-stone-300 transition-colors"
              >
                <p className="text-xs font-medium text-zinc-500 mb-1">소송</p>
                <h3 className="text-base font-bold text-zinc-900">변호사보수 산입 한도</h3>
              </Link>
              <Link
                href="/guides/deposit-return-dispute"
                className="flex-1 border border-stone-200 rounded-[12px] p-5 hover:border-stone-300 transition-colors"
              >
                <p className="text-xs font-medium text-zinc-500 mb-1">부동산</p>
                <h3 className="text-base font-bold text-zinc-900">전세금 미반환 대응 순서</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[var(--color-background)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <p className="text-sm text-zinc-600 max-w-xl leading-relaxed">
            {totalTools}개 계산기는 모두 무료입니다. 결과는 참고용이며 실제 법적 조치 전 전문가 확인을
            권장합니다.
          </p>
        </div>
      </section>
    </>
  );
}
