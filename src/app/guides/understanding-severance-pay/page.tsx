import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '법정 퇴직금 산정의 핵심: 평균임금과 계속근로기간 | law-calc.kr',
  description: '법정 퇴직금이 어떻게 계산되는지, 3개월 평균임금의 의미와 계속근로기간의 조건, 소멸시효에 대해 알아봅니다.',
};

export default function SeverancePayGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: "법정 퇴직금 산정의 핵심: '평균임금'과 '계속근로기간'",
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 노동법 데이터 분석팀'
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link aria-label="Navigation link" href="/guides" className="text-amber-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">노동/근로</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        법정 퇴직금 산정의 핵심: '평균임금'과 '계속근로기간'
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 노동법 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          퇴사할 때 누구나 기대하는 '퇴직금'. 하지만 정확히 얼마를 받을 수 있는지, 
          자신이 수급 조건을 만족하는지 헷갈려 하는 분들이 많습니다. 
          근로자퇴직급여 보장법에 따른 퇴직금 산정의 두 가지 핵심 축인 <strong>'계속근로기간'</strong>과 <strong>'평균임금'</strong>에 대해 상세히 정리해 드립니다.
        </p>

        <h2>1. 퇴직금 발생 조건: 1주 15시간, 1년 이상</h2>
        <p>
          대한민국에서 근로자가 법정 퇴직금을 받기 위한 조건은 단 두 가지입니다.
        </p>
        <ul>
          <li><strong>계속근로기간이 1년 이상일 것</strong></li>
          <li><strong>4주간을 평균하여 1주간의 소정근로시간이 15시간 이상일 것</strong></li>
        </ul>
        <p>
          이 조건만 충족한다면 정규직, 계약직, 아르바이트, 일용직 등 <strong>고용 형태나 5인 미만 사업장 여부와 무관하게</strong> 퇴직금을 무조건 받을 수 있습니다. 
          사용자가 근로계약서에 "퇴직금은 없다"고 명시했더라도 이는 강행법규 위반으로 원천 무효입니다.
        </p>

        <h2>2. 퇴직금 산정의 기초: 평균임금</h2>
        <p>
          퇴직금은 <code>(1일 평균임금 × 30일) × (계속근로기간 / 365)</code> 공식으로 산출됩니다. 
          여기서 가장 중요한 것이 <strong>'1일 평균임금'</strong>입니다.
        </p>
        <p>
          평균임금이란 <strong>'퇴직한 날 이전 3개월 동안에 그 근로자에게 지급된 임금의 총액을 그 기간의 총 일수로 나눈 금액'</strong>을 말합니다.
          기본급뿐만 아니라 연장근로수당, 직책수당, 식대 등 고정적·일률적으로 지급된 임금이 모두 포함됩니다.
        </p>
        <p>
          <strong>주의할 점:</strong> 연차수당이나 상여금처럼 1년에 한두 번 지급되는 금액은 퇴직 전 3개월에 지급되었다고 해서 
          전액 산입되는 것이 아니라, <strong>1년치 지급액의 3/12 (즉, 1/4)</strong>만 평균임금 산정 기초에 산입해야 합니다.
        </p>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl my-8">
          <h3 className="text-amber-800 mt-0">💡 관련 도구로 바로 확인하기</h3>
          <p className="mb-4 text-sm text-slate-700">
            입사일과 퇴사일, 최근 3개월 급여만 입력하면 복잡한 평균임금과 퇴직금을 한 번에 계산해 드립니다.
          </p>
          <Link aria-label="Navigation link" href="/tools/labor/severance-pay" className="inline-block bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
            퇴직금 계산기 가기
          </Link>
        </div>

        <h2>3. 평균임금이 통상임금보다 적을 때의 보호장치</h2>
        <p>
          만약 퇴사 직전 3개월 동안 회사가 어려워져서 무급 휴직을 했거나, 개인적인 질병으로 급여를 제대로 받지 못했다면 어떻게 될까요? 
          평균임금이 비정상적으로 낮게 산출되어 퇴직금이 깎이는 억울한 상황이 발생할 수 있습니다.
        </p>
        <p>
          이를 방지하기 위해 근로기준법 제2조 제2항은 <strong>"산출된 평균임금이 그 근로자의 통상임금보다 적으면 그 통상임금액을 평균임금으로 한다"</strong>고 규정하여 근로자를 보호하고 있습니다.
        </p>

        <h2>4. 퇴직금 중간정산과 소멸시효</h2>
        <p>
          무주택자의 주택 구입, 전세자금 부담, 본인이나 부양가족의 6개월 이상 요양, 파산선고 등 
          법령이 엄격하게 정한 특별한 사유가 아니면 <strong>퇴직금의 중간정산은 법적으로 원천 무효</strong>입니다. 
          회사가 매월 급여에 퇴직금을 포함해서 지급했다고 주장하더라도 법원은 이를 인정하지 않으며, 회사는 퇴직 시 별도로 퇴직금을 다시 지급해야 합니다.
        </p>
        <p>
          퇴직금은 퇴직한 날로부터 14일 이내에 지급되어야 하며, 이를 어길 시 연 20%의 무거운 지연이자가 부과됩니다. 
          또한 퇴직금 청구권은 퇴직일로부터 <strong>3년이 지나면 소멸시효가 완성</strong>되므로, 미지급 시 지체 없이 고용노동청에 임금체불 진정을 제기해야 합니다.
        </p>
      </article>
    </main>
  );
}