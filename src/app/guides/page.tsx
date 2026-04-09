import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '법률 가이드 및 칼럼 | law-calc.kr 법률 계산기',
  description: '복잡한 법률 문제를 쉽게 풀어주는 실무 중심의 법률 가이드와 칼럼을 제공합니다.',
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
      id: 'understanding-severance-pay',
      category: '노동/근로',
      title: "법정 퇴직금 산정의 핵심: '평균임금'과 '계속근로기간'",
      description: '퇴직금은 어떻게 계산될까요? 3개월 평균임금의 중요성과 통상임금과의 비교, 1년 미만 근로자의 권리, 그리고 소멸시효에 대해 상세히 정리했습니다.',
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
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">법률 가이드 & 칼럼</h1>
        <p className="text-lg text-slate-600">
          복잡한 계산식 뒤에 숨겨진 진짜 법률 지식을 알기 쉽게 설명해 드립니다.
        </p>
      </div>

      <div className="space-y-6">
        {guides.map(guide => (
          <Link 
            href={`/guides/${guide.id}`} 
            key={guide.id}
            className="block p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-semibold ${guide.color}`}>{guide.category}</span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-slate-500">{guide.date}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
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
    </main>
  );
}