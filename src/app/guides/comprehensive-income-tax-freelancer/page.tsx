import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '프리랜서 3.3% 종합소득세 신고 방법과 절세 팁 | law-calc.kr',
  description: '매달 3.3% 원천징수되는 프리랜서, 크리에이터의 5월 종합소득세 확정신고 원리와 환급금 추계신고 방법에 대해 설명합니다.',
};

export default function FreelancerTaxGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '프리랜서 3.3% 종합소득세 신고 방법과 절세 팁',
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
        프리랜서 3.3% 종합소득세 신고 방법과 환급의 비밀
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 세금 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          배달 라이더, 웹 개발 외주, 학원 강사, 유튜브 크리에이터 등 매달 급여에서 3.3%를 떼고 입금받는 분들이 늘고 있습니다. 
          이들은 근로소득자가 아닌 <strong>세법상 개인사업자(사업소득자)</strong>이므로 연말정산을 하지 않고, 이듬해 5월 직접 종합소득세 신고를 해야 합니다.
        </p>

        <h2>1. 3.3%는 왜 떼는 것이고, 환급은 왜 발생할까?</h2>
        <p>
          소득을 지급하는 회사(원천징수의무자)는 프리랜서의 정확한 연소득을 알 수 없으므로, 임시로 국가에 국세 3% + 지방세 0.3%를 먼저 떼어서 납부합니다 (원천징수).
        </p>
        <p>
          5월이 되면 프리랜서는 국세청 홈택스에 지난 1년간 벌어들인 총 수입과 업무에 쓴 경비, 그리고 각종 공제(부양가족 등)를 합산하여 '진짜 나의 세금(결정세액)'을 계산합니다.
        </p>
        <ul>
          <li><strong>결정세액 &lt; 미리 낸 3.3% 세금:</strong> 국가가 세금을 많이 뗐으므로 <strong>환급(돌려받음)</strong>.</li>
          <li><strong>결정세액 &gt; 미리 낸 3.3% 세금:</strong> 세금을 덜 냈으므로 5월에 <strong>추가 납부(토해냄)</strong>.</li>
        </ul>

        <h2>2. 세금 폭탄의 갈림길: 단순경비율 vs 기준경비율</h2>
        <p>
          사업자는 장부를 작성해 진짜 쓴 돈을 증빙하는 것이 원칙이나, 영세 사업자를 위해 국세청이 업종별 평균 경비율을 인정해 주는 <strong>추계신고</strong> 제도가 있습니다. 여기서 명운이 갈립니다.
        </p>
        <p>
          직전 연도 수입이 2,400만 원(업종별 상이) 미만이라면 <strong>'단순경비율'</strong>이 적용됩니다. 예를 들어 수입이 2,000만 원이고 단순경비율이 60%라면, 실제로 돈을 썼는지 묻지 않고 1,200만 원을 경비로 인정해 세금을 대폭 깎아줍니다. 환급받을 확률이 매우 높습니다.
        </p>
        <p>
          하지만 수입이 기준선을 초과하면 <strong>'기준경비율'</strong> 대상자가 됩니다. 기준경비율은 인정 비율이 10~20%대로 처참하게 낮습니다. 기준경비율 대상자가 무턱대고 추계신고를 하면 막대한 세금 폭탄을 맞게 되므로, 영수증을 모아 <strong>간편장부</strong>를 작성하여 실제 경비를 인정받아야 합니다.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl my-8">
          <h3 className="text-emerald-800 mt-0">💡 올해 나는 세금을 토해낼까, 돌려받을까?</h3>
          <p className="mb-4 text-sm text-slate-700">
            총 수입과 경비, 주요 소득공제를 입력하여 5월 종합소득세 확정 신고 시 예상되는 환급액 또는 납부액을 미리 계산해 보세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link aria-label="Navigation link" href="/tools/tax/comprehensive-income-tax" className="inline-block bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
              종합소득세 계산기
            </Link>
            <Link aria-label="Navigation link" href="/tools/tax/vat" className="inline-block bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px] glassmorphism glass-panel">
              부가가치세 계산기
            </Link>
          </div>
        </div>

        <h2>3. 근로자 연말정산과 다른 프리랜서 절세 팁</h2>
        <p>
          프리랜서는 직장인들이 열광하는 '신용카드 소득공제, 의료비/교육비 세액공제, 월세 세액공제'를 <strong>전혀 받을 수 없습니다.</strong> 
          대신 사업과 관련된 지출을 '경비'로 털어내야 합니다.
        </p>
        <ul>
          <li><strong>업무용 비용 증빙:</strong> 휴대폰 요금, 교통비, 차량 유지비, 접대비, 소모품 등 업무와 연관성 있는 지출은 모두 사업용 카드나 현금영수증을 통해 적격 증빙을 남겨야 장부 작성 시 경비로 인정받습니다.</li>
          <li><strong>인적 공제 챙기기:</strong> 소득이 없는 부모님, 배우자, 자녀를 부양가족으로 올리면 1인당 150만 원의 과세표준을 낮출 수 있습니다.</li>
          <li><strong>노란우산공제 및 연금저축:</strong> 소상공인 공제부금(노란우산)과 연금저축계좌 세액공제는 프리랜서가 합법적으로 세액을 깎을 수 있는 가장 강력한 금융 상품입니다. 적극 활용하세요.</li>
        </ul>

      </article>
    </main>
  );
}