import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '법률 가이드 및 칼럼 | law-calc.kr 법률 계산기',
  description: '복잡한 법률 문제를 쉽게 풀어주는 실무 중심의 법률 가이드와 칼럼 10선을 제공합니다.',
};

export default function GuidesPage() {
  const guides = [
    {
      id: 'how-to-calculate-attorney-fee',
      category: '소송/법원',
      title: '변호사보수 소송비용 산입의 원칙과 실무적 이해',
      description: '소송에서 승소했을 때 상대방에게 변호사 비용을 얼마나 돌려받을 수 있을까요? 대법원 규칙에 따른 산입 한도액 계산법과 확정결정 절차를 알아봅니다.',
      date: '2026-04-08',
      color: 'text-blue-600',
    },
    {
      id: 'civil-mediation-vs-lawsuit',
      category: '소송/법원',
      title: '민사조정과 정식 소송의 차이점 및 비용 비교',
      description: '소송 대비 1/5에 불과한 인지대로 확정판결과 동일한 효력을 얻는 민사조정 제도의 실무적 장점과 활용법을 완벽 정리합니다.',
      date: '2026-04-08',
      color: 'text-blue-600',
    },
    {
      id: 'understanding-severance-pay',
      category: '노동/근로',
      title: "법정 퇴직금 산정의 핵심: '평균임금'과 '계속근로기간'",
      description: '퇴직금은 어떻게 계산될까요? 3개월 평균임금의 중요성과 통상임금과의 비교, 1년 미만 근로자의 권리, 그리고 소멸시효에 대해 상세히 정리했습니다.',
      date: '2026-04-08',
      color: 'text-amber-500',
    },
    {
      id: 'minimum-wage-penalty',
      category: '노동/근로',
      title: '최저임금 위반 시 대처법과 미지급 차액 청구 절차',
      description: '식대, 상여금이 최저임금에 포함될까? 수습 기간 10% 감액의 엄격한 요건과 퇴사 후 노동청에 미지급 차액을 청구하는 방법을 안내합니다.',
      date: '2026-04-08',
      color: 'text-amber-500',
    },
    {
      id: 'unfair-dismissal-relief',
      category: '노동/근로',
      title: '부당해고 구제신청의 골든타임과 금전보상제도',
      description: '해고 통지는 반드시 서면으로! 3개월 제척기간 내에 노동위원회에 구제를 신청하는 방법과 복직 대신 위로금을 받는 금전보상명령 제도를 알아봅니다.',
      date: '2026-04-08',
      color: 'text-amber-500',
    },
    {
      id: 'industrial-accident-compensation',
      category: '노동/근로',
      title: '산재보험 휴업급여 및 장해급여 청구 완벽 가이드',
      description: '다쳐서 쉬는 동안 월급의 70%를 보장하는 휴업급여 최저보상기준과, 치료 종결 후 남은 후유증을 보상하는 장해등급별 일시금 계산법을 설명합니다.',
      date: '2026-04-08',
      color: 'text-amber-500',
    },
    {
      id: 'deposit-return-dispute',
      category: '부동산',
      title: '전세금 미반환 대처법: 내용증명부터 임차권등기명령까지',
      description: '역전세난이나 깡통전세로 보증금을 돌려받지 못하고 있다면? 이사 가기 전 반드시 확인해야 할 법적 절차와 지연이자 청구 방법을 단계별로 제공합니다.',
      date: '2026-04-08',
      color: 'text-purple-500',
    },
    {
      id: 'capital-gains-tax-exemption',
      category: '세금',
      title: '1세대 1주택 양도소득세 비과세 요건과 장특공제',
      description: '부동산 매도 시 가장 강력한 절세 무기인 비과세 2년 거주 요건과, 12억 초과 고가주택의 세금 폭탄을 막아주는 최대 80% 장기보유특별공제를 해설합니다.',
      date: '2026-04-08',
      color: 'text-emerald-600',
    },
    {
      id: 'comprehensive-income-tax-freelancer',
      category: '세금',
      title: '프리랜서 3.3% 종합소득세 신고 방법과 환급 절세 팁',
      description: '배달 라이더, 외주 개발자 등 3.3% 원천징수 프리랜서의 5월 종소세 신고 원리와, 단순경비율 추계신고를 통한 세금 환급 팁을 공개합니다.',
      date: '2026-04-08',
      color: 'text-emerald-600',
    },
    {
      id: 'defamation-sns',
      category: '손해배상',
      title: 'SNS 인터넷 명예훼손 성립 요건과 민사 위자료 산정',
      description: '사실을 적시해도 처벌받는 정보통신망법 사이버 명예훼손! 형사 합의금과 민사상 위자료 손해배상이 법원에서 어떻게 결정되는지 알아봅니다.',
      date: '2026-04-08',
      color: 'text-orange-500',
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">법률 가이드 & 칼럼</h1>
        <p className="text-lg text-slate-600">
          복잡한 계산식 뒤에 숨겨진 진짜 법률 지식을 각 분야 데이터 분석팀이 알기 쉽게 설명해 드립니다.
        </p>
      </div>

      <section className="mb-10 bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">빠른 활용 흐름</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
          <li>현재 상황과 가까운 가이드를 먼저 읽어 핵심 변수(기간, 금액, 요건)를 파악하세요.</li>
          <li>관련 계산기로 이동해 1차 추정값을 만든 뒤, 증빙 기준으로 다시 점검하세요.</li>
          <li>실제 신고·청구·소송 전에는 최신 법령 개정 여부와 전문가 검토 필요성을 확인하세요.</li>
        </ol>
        <p className="text-xs text-slate-500 mt-3">
          안내 내용은 일반 정보이며 개별 사건의 결론을 보장하지 않습니다. 사안별 사실관계에 따라 결과는 달라질 수 있습니다.
        </p>
      </section>

      <div className="grid gap-6">
        {guides.map(guide => (
          <Link aria-label="Navigation link" 
            href={`/guides/${guide.id}`} 
            key={guide.id}
            className="block p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group glassmorphism glass-panel"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold px-2 py-1 bg-slate-50 rounded-md ${guide.color} glassmorphism glass-panel`}>{guide.category}</span>
              <span className="text-xs text-slate-300">|</span>
              <span className="text-xs text-slate-500">{guide.date}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
              {guide.title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              {guide.description}
            </p>
            <div className="mt-5 text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform inline-block">
              전문 읽기 &rarr;
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-10 pt-8 border-t border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-3">함께 보면 좋은 페이지</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link aria-label="Navigation link" href="/editorial-policy" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">편집/검증 정책</Link>
          <Link aria-label="Navigation link" href="/about" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">서비스 소개</Link>
          <Link aria-label="Navigation link" href="/terms" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">이용약관</Link>
          <Link aria-label="Navigation link" href="/privacy" className="px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">개인정보처리방침</Link>
        </div>
      </section>
    </main>
  );
}