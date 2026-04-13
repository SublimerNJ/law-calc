import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '최저임금 위반 시 대처법과 미지급 차액 청구 절차 | law-calc.kr',
  description: '수당을 포함한 최저임금 산입 범위, 수습 기간 감액 요건, 최저임금 미달 시 미지급 차액을 노동청에 청구하는 방법을 안내합니다.',
};

export default function MinimumWageGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '최저임금 위반 시 대처법과 미지급 차액 청구 절차',
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
        최저임금 위반 시 대처법과 미지급 차액 청구 절차
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 노동법 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          "사장님이 최저임금보다 적게 줬는데, 서명한 근로계약서 때문에 어쩔 수 없나요?" 
          아닙니다. 최저임금법은 강행법규이므로 당사자가 동의했더라도 최저임금 미달 약정은 원천 무효이며, 사용자는 3년 이하 징역 등 무거운 형사처벌을 받습니다.
        </p>

        <h2>1. 내 월급, 정말 최저임금 위반일까? (산입 범위의 마법)</h2>
        <p>
          단순히 '총 급여 ÷ 일한 시간'으로 최저임금 위반을 따질 수는 없습니다. 핵심은 <strong>어떤 수당이 최저임금에 포함(산입)되느냐</strong>입니다.
        </p>
        <p>
          과거에는 기본급 위주로 판단했지만, 법 개정으로 2024년부터는 매월 지급되는 <strong>상여금 전액</strong>과 식대, 교통비 등 <strong>복리후생비 전액</strong>이 모두 최저임금에 포함됩니다. 
          반면, 연장/야간/휴일근로수당(가산수당)이나 연차수당은 산입 범위에서 제외됩니다.
        </p>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl my-8">
          <h3 className="text-amber-800 mt-0">💡 내 급여 명세서로 직접 확인해 보세요</h3>
          <p className="mb-4 text-sm text-slate-700">
            기본급과 수당을 분리하여 입력하면, 복잡한 산입 범위 규정을 적용하여 최저임금 위반 여부와 미지급 차액을 정확하게 계산해 드립니다.
          </p>
          <Link aria-label="Navigation link" href="/tools/labor/minimum-wage-check" className="inline-block bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
            최저임금 위반 계산기 가기
          </Link>
        </div>

        <h2>2. 수습 기간이니까 10% 깎아도 합법? 엄격한 예외 요건</h2>
        <p>
          편의점, 카페, 피시방 알바를 할 때 "수습 3개월간은 최저임금의 90%만 지급한다"는 말을 자주 듣습니다. 이것이 합법이 되려면 <strong>다음 3가지 조건</strong>을 모두 동시에 충족해야 합니다.
        </p>
        <ol>
          <li><strong>계약 기간:</strong> 근로계약 기간이 1년 이상이어야 합니다. (방학 알바 등 1년 미만 단기 계약은 첫날부터 무조건 100% 지급)</li>
          <li><strong>근무 기간:</strong> 수습을 시작한 날부터 3개월 이내여야 합니다.</li>
          <li><strong>직종 제한:</strong> 한국표준직업분류상 '단순노무업무(대분류 9)'가 <strong>아니어야</strong> 합니다. 
              (주유원, 편의점 계산원, 청소원, 경비원, 패스트푸드원 등 단순노무직은 수습 기간 감액이 전면 금지되어 무조건 100%를 받아야 합니다.)</li>
        </ol>

        <h2>3. 미지급 차액 청구 절차 (3년의 소멸시효)</h2>
        <p>
          내가 받은 돈이 최저임금에 미달한다는 것을 알았다면 어떻게 해야 할까요?
        </p>
        <p>
          퇴사 후라도 지난 3년간 덜 받은 금액(차액)을 모두 합산하여 <strong>관할 고용노동청에 임금체불 진정</strong>을 제기할 수 있습니다. 
          근로기준법상 임금 채권의 소멸시효는 3년이므로, 발생일로부터 3년이 지나기 전이라면 언제든 권리를 주장할 수 있습니다.
        </p>
        <p>
          진정을 제기할 때는 매월 받은 급여 통장 내역, 근로계약서, 출퇴근 기록(교통카드 내역이나 카톡 대화 등)을 증거로 제출하면 근로감독관이 사실관계를 조사하여 사용자에게 지급을 명령합니다.
        </p>

        <h2>마치며</h2>
        <p>
          사용자가 "너도 동의하고 사인했잖아"라고 압박해도 전혀 두려워할 필요가 없습니다. 
          최저임금 위반은 국가가 정한 최소한의 생존권 침해이므로 타협의 대상이 될 수 없음을 기억하시기 바랍니다.
        </p>
      </article>
    </main>
  );
}