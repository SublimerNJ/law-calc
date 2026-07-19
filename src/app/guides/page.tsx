import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '법률 가이드 | 소송·노동·세금·부동산 실무 정리',
  description:
    '변호사보수 산입, 민사조정, 퇴직금, 최저임금, 부당해고, 산재, 전세금, 양도세, 프리랜서 종소세, SNS 명예훼손 등 실무 중심 법률 가이드.',
  alternates: { canonical: 'https://law-calc.kr/guides' },
};

const guides = [
  {
    id: 'how-to-calculate-attorney-fee',
    category: '소송/법원',
    title: '변호사보수 소송비용 산입의 원칙과 실무적 이해',
    description:
      '산입 한도, 실비 원칙, 일부 승소 비율, 소송비용액 확정결정 신청과 증빙까지 승소 후 비용 회수 실무를 정리합니다.',
    date: '2026-07-19',
    color: 'text-teal-800',
  },
  {
    id: 'civil-mediation-vs-lawsuit',
    category: '소송/법원',
    title: '민사조정과 정식 소송의 차이점 및 비용 비교',
    description:
      '인지·송달료, 성립 효력, 합의 가능성, 불성립 시 이행까지 조정과 소송을 언제 고를지 비교합니다.',
    date: '2026-07-19',
    color: 'text-teal-800',
  },
  {
    id: 'understanding-severance-pay',
    category: '노동/근로',
    title: "법정 퇴직금 산정의 핵심: '평균임금'과 '계속근로기간'",
    description:
      '발생 요건, 상여·연차 산입, 통상임금 하한, 중간정산, 14일 지급·3년 시효, 퇴사 전후 체크리스트를 다룹니다.',
    date: '2026-07-19',
    color: 'text-amber-500',
  },
  {
    id: 'minimum-wage-penalty',
    category: '노동/근로',
    title: '최저임금 위반 시 대처법과 미지급 차액 청구 절차',
    description:
      '산입 임금 범위, 수습 감액 요건, 차액 산정, 노동청 진정·민사 청구 준비 서류를 순서대로 안내합니다.',
    date: '2026-07-19',
    color: 'text-amber-500',
  },
  {
    id: 'unfair-dismissal-relief',
    category: '노동/근로',
    title: '부당해고 구제신청의 골든타임과 금전보상제도',
    description:
      '서면통지, 3개월 제척기간, 원직복직·금전보상, 증거 패키지, 임금·퇴직금 병행 쟁점을 정리합니다.',
    date: '2026-07-19',
    color: 'text-amber-500',
  },
  {
    id: 'industrial-accident-compensation',
    category: '노동/근로',
    title: '산재보험 휴업급여 및 장해급여 청구 실무 가이드',
    description:
      '업무상 재해, 요양·휴업·장해 급여, 사업주 미협조 시 청구, 민사 손해와의 관계를 실무 관점으로 설명합니다.',
    date: '2026-07-19',
    color: 'text-amber-500',
  },
  {
    id: 'deposit-return-dispute',
    category: '부동산',
    title: '전세금 미반환 대처법: 내용증명부터 임차권등기명령까지',
    description:
      '계약 종료 확인, 최고, 임차권등기, 지급명령·소송 선택, 지연이자와 이사 시기 함정을 단계별로 제공합니다.',
    date: '2026-07-19',
    color: 'text-purple-500',
  },
  {
    id: 'capital-gains-tax-exemption',
    category: '세금',
    title: '1세대 1주택 양도소득세 비과세 요건과 장특공제',
    description:
      '세대·보유·거주, 고가주택, 장특공제, 일시적 2주택, 필요경비 증빙과 신고 전 체크리스트를 정리합니다.',
    date: '2026-07-19',
    color: 'text-emerald-600',
  },
  {
    id: 'comprehensive-income-tax-freelancer',
    category: '세금',
    title: '프리랜서 3.3% 종합소득세 신고 방법과 환급 절세 팁',
    description:
      '원천징수 정산, 장부 vs 경비율, 환급·추가납부 패턴, 증빙 폴더 구조와 5월 신고 전 점검을 안내합니다.',
    date: '2026-07-19',
    color: 'text-emerald-600',
  },
  {
    id: 'defamation-sns',
    category: '손해배상',
    title: 'SNS 명예훼손 분쟁: 성립 요건부터 증거 보전까지',
    description:
      '사실 적시·공연성, 증거 보전, 형사·민사·플랫폼 경로, 맞대응 리스크와 위자료 참고 포인트를 정리합니다.',
    date: '2026-07-19',
    color: 'text-rose-600',
  },
];

export default function GuidesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">법률 가이드</h1>
        <p className="text-slate-600 leading-relaxed max-w-2xl">
          계산기만으로는 부족한 절차·시효·실무 함정을 장문으로 정리합니다. 모든 글은 참고용 일반 정보이며 개별
          자문을 대체하지 않습니다. 작성·검토: law-calc.kr 편집팀 · 최종 갱신 2026-07-19
        </p>
      </div>

      <div className="grid gap-5">
        {guides.map((g) => (
          <Link
            key={g.id}
            href={`/guides/${g.id}`}
            className="block p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white hover:border-teal-600 hover:shadow-md transition-all"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-semibold ${g.color}`}>{g.category}</span>
              <span className="text-xs text-slate-400">{g.date}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{g.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{g.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
        계산이 필요하면{' '}
        <Link href="/" className="text-teal-800 hover:underline">
          홈의 55개 법률 계산기
        </Link>
        로, 운영 주체·한계는{' '}
        <Link href="/about" className="text-teal-800 hover:underline">
          소개
        </Link>
        페이지를 참고하세요.
      </div>
    </main>
  );
}
