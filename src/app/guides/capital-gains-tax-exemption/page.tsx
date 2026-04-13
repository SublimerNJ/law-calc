import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '1세대 1주택 양도소득세 비과세 요건과 장기보유특별공제 | law-calc.kr',
  description: '부동산 매도 시 가장 큰 절세 수단인 1세대 1주택 비과세 거주 요건과 최대 80% 장기보유특별공제 적용 방법을 해설합니다.',
};

export default function CapitalGainsGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '1세대 1주택 양도소득세 비과세 요건과 장기보유특별공제',
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 세금 데이터 분석팀'
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link aria-label="Navigation link" href="/guides" className="text-emerald-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">세금</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        1세대 1주택 양도소득세 비과세 요건과 장특공제
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 세금 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          집값이 크게 올라 차익이 발생했을 때, 이 차익(양도소득)에 대해 수천만 원에서 수억 원의 세금이 매겨질 수 있습니다. 
          하지만 세법은 서민의 주거 안정을 위해 <strong>1세대 1주택자</strong>에게 엄청난 세제 혜택을 제공합니다. 비과세 요건과 장기보유특별공제의 핵심을 정리합니다.
        </p>

        <h2>1. 1세대 1주택 '비과세'의 3가지 핵심 조건</h2>
        <p>
          양도가액 12억 원 이하까지 세금을 전액 면제받기 위해서는 다음 요건을 모두 충족해야 합니다.
        </p>
        <ul>
          <li><strong>1세대 1주택:</strong> 양도일 현재 대한민국에 주민등록상 동일 세대원이 1주택만을 보유해야 합니다. (일시적 2주택 특례 있음)</li>
          <li><strong>2년 보유 요건:</strong> 주택을 취득한 날부터 양도한 날까지의 보유 기간이 2년 이상이어야 합니다.</li>
          <li><strong>2년 거주 요건 (조정대상지역 한정):</strong> <strong>2017년 8월 3일 이후</strong> 취득 당시 해당 주택이 '조정대상지역'에 지정되어 있었다면, 단순히 2년을 보유하는 것을 넘어 세대 전원이 <strong>실제로 2년 이상 거주</strong>해야 비과세를 받습니다. 취득 후 비규제지역으로 해제되었더라도, 취득 당시 규제지역이었다면 거주 요건을 지켜야 합니다.</li>
        </ul>

        <h2>2. 고가주택 (12억 원 초과) 양도 시 세금 계산</h2>
        <p>
          실거래가 12억 원을 넘는 이른바 '고가주택'은 1세대 1주택 비과세 요건을 완벽히 갖추었더라도 12억 원을 초과하는 비율만큼은 양도소득세가 부과됩니다.
        </p>
        <p>
          예를 들어, 10억 원에 사서 15억 원에 팔아 5억 원의 차익이 발생했다면, 전체 차익 5억 원 중 (15억 - 12억) / 15억 = 20% 인 '1억 원'에 대해서만 과세 대상이 됩니다.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl my-8">
          <h3 className="text-emerald-800 mt-0">💡 복잡한 12억 초과분 세금, 1초 만에 확인</h3>
          <p className="mb-4 text-sm text-slate-700">
            취득가액과 양도가액, 거주 기간만 입력하면 12억 초과분 비율 계산부터 장기보유특별공제, 지방소득세까지 최신 세법으로 자동 계산합니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link aria-label="Navigation link" href="/tools/tax/capital-gains-tax" className="inline-block bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
              양도소득세 계산기
            </Link>
            <Link aria-label="Navigation link" href="/tools/tax/acquisition-tax" className="inline-block bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px] glassmorphism glass-panel">
              부동산 취득세 계산기
            </Link>
          </div>
        </div>

        <h2>3. 세금 폭탄을 막는 방패: 장기보유특별공제(장특공제)</h2>
        <p>
          12억 초과분으로 세금이 부과되더라도, 3년 이상 장기 보유했다면 물가 상승분을 감안해 양도차익에서 일정 비율을 깎아주는 것이 장특공제입니다.
        </p>
        <p>
          다주택자나 거주 요건을 못 채운 1주택자는 3년 보유부터 1년에 2%씩, 최대 30%(15년 보유)까지만 공제됩니다 (표 1).
        </p>
        <p>
          반면, 1세대 1주택 비과세 요건을 갖추고 <strong>2년 이상 실거주</strong>한 사람은 파격적인 공제를 받습니다 (표 2).<br/>
          보유 기간 1년당 4% (최대 40%) + 거주 기간 1년당 4% (최대 40%)를 합산하여, <strong>10년 보유 및 거주 시 최대 80%</strong>의 양도차익을 공제받아 세금이 극적으로 줄어듭니다.
        </p>

        <h2>마치며</h2>
        <p>
          양도소득세는 수천만 원이 왔다 갔다 하는 중대한 세금입니다. 
          취득 시 세금계산서, 샷시 교체 비용 등 자본적 지출 증빙(필요경비)을 철저히 챙기고, 
          매도 전 반드시 세무 전문가와 상담하여 비과세 요건과 장특공제율을 이중 점검하시기 바랍니다.
        </p>
      </article>
    </main>
  );
}