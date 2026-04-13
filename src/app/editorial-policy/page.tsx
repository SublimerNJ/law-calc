import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '편집 및 검증 정책 | law-calc.kr',
  description: 'law-calc.kr의 법률 정보 편집 정책, 검증 절차, 그리고 데이터 신뢰성 확보 원칙에 대해 안내합니다.',
};

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">편집 및 데이터 검증 정책</h1>
        <p className="text-lg text-slate-600">
          Editorial & Verification Policy
        </p>
      </div>

      <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">원칙 1: 객관적이고 공인된 출처(Sources) 활용</h2>
          <p className="mb-3">
            law-calc.kr에서 제공하는 모든 계산식, 법률 가이드, 그리고 FAQ의 내용은 반드시 대한민국 국가 기관에서 발행한 
            공식 문헌과 성문법에 기초합니다. 개인의 자의적 해석이나 검증되지 않은 민간의 주장은 철저히 배제합니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-slate-50 p-5 rounded-lg border border-slate-100 glassmorphism glass-panel">
            <li><strong>법령:</strong> 국가법령정보센터(law.go.kr)에 등록된 현행 법률, 시행령, 시행규칙, 대법원규칙</li>
            <li><strong>판례:</strong> 대한민국 대법원 종합법률정보 판례 (전원합의체 등 확정 판례 기준)</li>
            <li><strong>행정 규칙:</strong> 국세청 예규·고시, 고용노동부 행정해석 및 지침, 금융위원회 보도자료</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">원칙 2: 정기적 검토 및 최신성(Currency) 유지</h2>
          <p className="mb-3">
            법률과 세법, 노무 기준(예: 최신 최저임금, 기준금리 변동 등)은 매년 혹은 수시로 개정됩니다. 
            당사의 법률 데이터 분석팀은 다음과 같은 주기로 데이터를 갱신합니다.
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <strong>상시 검토:</strong> 중요 세법 개정안 통과, 노동법 개정, 대법원 판례 변경 시 1주일 이내 알고리즘 반영.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <strong>연간 일괄 업데이트:</strong> 매년 말(12월)부터 이듬해 초(1월)에 걸쳐 당해 연도 귀속 최저임금, 건강보험료율, 세금 공제 한도 등 고시성 지표 일괄 업데이트.
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">원칙 3: 계산 로직의 투명성(Transparency) 공개</h2>
          <p>
            law-calc.kr은 "결과 값"만 제시하는 블랙박스 시스템을 지양합니다. 
            사용자가 결과의 근거를 명확히 이해할 수 있도록, <strong>결과 도출에 사용된 공식과 적용 구간, 
            관련 법령의 조항 번호를 화면에 반드시 함께 출력</strong>하는 것을 원칙으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">원칙 4: 전문가의 한계 고지 (Disclaimer)</h2>
          <p>
            우리의 콘텐츠와 도구는 높은 정확성을 추구하지만, 변호사 등 자격을 갖춘 법조인의 '법률 자문(Legal Advice)'을 
            대체할 수 없습니다. 모든 사용자의 개별적이고 구체적인 사실관계를 알고리즘이 100% 반영할 수는 없으므로, 
            실제 소송 제기나 법적 계약 전에는 반드시 전문가의 조력을 받을 것을 강력히 권고합니다.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link aria-label="Navigation link" href="/about" className="text-blue-600 hover:underline font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
            ← 사이트 소개 페이지로 돌아가기
          </Link>
        </div>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">원칙 5: 표현 안전장치 (Legal Safety Language)</h2>
          <p className="mb-3">
            한국 법률 절차는 사실관계와 관할 기관 판단에 따라 달라질 수 있으므로, 본 사이트는 특정 결과를 단정적으로 보장하는 표현을 지양합니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-slate-50 p-5 rounded-lg border border-slate-100 glassmorphism glass-panel">
            <li>"반드시", "무조건", "확정"과 같은 단정 표현 최소화</li>
            <li>"사안별로 달라질 수 있음", "최신 기준 확인 필요" 문구 병행</li>
            <li>실행 전 전문가 확인 권고를 기본 정책으로 유지</li>
          </ul>
        </section>

      </div>
    </main>
  );
}