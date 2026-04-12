import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: '소개 및 편집 정책 | law-calc.kr 법률 계산기',
  description: 'law-calc.kr(법률 계산기)의 설립 목적, 운영 팀, 그리고 법률 정보 검증 및 편집 정책에 대해 안내합니다.',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">law-calc.kr 소개</h1>
        <p className="text-lg text-slate-600">
          복잡한 법률 비용과 세금, 노무 계산을 투명하고 정확하게 제공하는 무료 법률 정보 플랫폼
        </p>
      </div>

      <div className="space-y-12 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">01.</span> 서비스 미션 (Mission)
          </h2>
          <p className="mb-3">
            일반 시민들이 일상생활에서 마주하는 법적 분쟁, 세금 납부, 임금 체불 등의 문제에서 
            가장 먼저 부딪히는 장벽은 "그래서 도대체 비용이나 권리가 정확히 얼마인가?"를 파악하는 것입니다.
          </p>
          <p>
            <strong>law-calc.kr</strong>은 변호사나 노무사, 세무사를 만나기 전 스스로 본인의 권리와 
            비용을 예측할 수 있도록, 대한민국 법령과 대법원 판례 기준을 코드로 구현한 
            무료 법률 계산기 플랫폼입니다. 우리는 법률 정보의 정보 비대칭을 해소하고, 투명한 사법 접근성(Access to Justice)을 높이는 것을 목표로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">02.</span> 전문성 및 데이터 검증 체계 (E-E-A-T)
          </h2>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-4">
            <h3 className="font-semibold text-slate-900 mb-2">법률 데이터 분석팀의 엄격한 검토</h3>
            <p className="text-sm">
              모든 계산 로직과 법률 가이드는 <strong>law-calc.kr 법률 데이터 분석팀</strong>에 의해 기획, 검토, 지속적으로 유지보수됩니다. 
              국가법령정보센터의 최신 개정 법률, 대법원 전원합의체 판례, 국세청 고시 및 고용노동부 지침을 
              정기적(월 1회 이상)으로 모니터링하여 알고리즘에 반영합니다.
            </p>
          </div>
          <p className="text-sm text-slate-600">
            당사는 YMYL(Your Money or Your Life) 정보의 중대성을 인지하고 있으며, 
            모든 툴 하단에 적용된 법령 조항 및 계산식을 명확히 공개하여 정보의 신뢰성을 증명합니다. 
            더 자세한 내용은 <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 정책(Editorial Policy)</Link>을 참고해 주십시오.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-blue-600">03.</span> 주요 제공 도구
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/#${cat.id}`}
                className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{cat.name}</p>
                  <p className="text-xs text-slate-500">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            총 <strong>55개의 법률 계산기</strong>가 있으며, 별도의 회원가입이나 개인정보 입력 없이 즉시 이용 가능합니다.
          </p>
        </section>

        <section className="bg-slate-900 text-white p-8 rounded-2xl">
          <h2 className="text-lg font-bold mb-3">연락처 및 제휴 문의</h2>
          <p className="text-slate-300 mb-4 text-sm">
            계산 로직 오류 신고, 최신 판례 반영 요청, 제휴 및 기타 문의 사항이 있으시면 아래 이메일로 연락해 주시기 바랍니다. 
            영업일 기준 48시간 이내에 법률 데이터 분석팀이 확인 후 답변 및 업데이트를 진행합니다.
          </p>
          <p className="font-mono text-blue-300">
            📧 sublimernj@gmail.com
          </p>
        </section>
        <section className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-slate-900 mb-3">서비스 활용 체크리스트</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
            <li>먼저 관련 계산기로 1차 추정값을 만든 뒤, 근거 문서(계약서·명세서·고지서)를 대조하세요.</li>
            <li>가이드 문서에서 절차와 리스크를 확인하고, 기한·시효가 있는 사안은 일정부터 관리하세요.</li>
            <li>실제 신고·청구·소송 전에는 전문가 검토를 통해 사건별 사실관계를 점검하세요.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}