import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '편집 및 검증 정책',
  description:
    'law-calc.kr의 법률 정보 출처, 검토 주기, 계산 로직 투명성, 표현 안전장치, 정정 절차를 안내합니다.',
  alternates: {
    canonical: 'https://law-calc.kr/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">편집 및 데이터 검증 정책</h1>
        <p className="text-lg text-slate-600">Editorial &amp; Verification Policy · 최종 업데이트 2026-07-19</p>
      </div>

      <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">1. 출처 (Sources)</h2>
          <p className="mb-3">
            계산식·가이드·FAQ는 대한민국 공적 출처를 우선합니다. 검증되지 않은 민간 주장이나 개별 사례를
            일반 규칙처럼 제시하지 않습니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-slate-50 p-5 rounded-lg border border-slate-100">
            <li>
              <strong>법령:</strong> 국가법령정보센터(law.go.kr) 현행 법률·시행령·시행규칙·대법원규칙
            </li>
            <li>
              <strong>판례:</strong> 대법원 종합법률정보 등 확정·공개 판례 (일반론 설명 목적)
            </li>
            <li>
              <strong>행정 자료:</strong> 국세청 고시·예규, 고용노동부 지침, 금융·행정 기관 공개 자료
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">2. 검토 주기 (Currency)</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                1
              </span>
              <div>
                <strong>수시:</strong> 최저임금, 세율, 송달료, 인지 등 수치 고시 변경 시 가능한 한 빠르게 반영
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                2
              </span>
              <div>
                <strong>정기:</strong> 연말·연초 일괄 점검 (세법·보험료율·공제 한도 등)
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                3
              </span>
              <div>
                <strong>이용자 제보:</strong> 오류 메일은 영업일 기준 48시간 이내 확인 후 필요 시 수정
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. 투명성 (Transparency)</h2>
          <p>
            결과 숫자만 보여 주는 블랙박스를 지양합니다. 가능하면 산정 구간, 적용 조문, FAQ, 상세 가이드를
            같은 페이지에 배치합니다. 각 계산기 페이지의 &quot;최근 검토일&quot;은 해당 도구 데이터 점검
            시점을 의미합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">4. 자격·표현에 대한 정직성</h2>
          <p className="mb-3">
            law-calc.kr 편집팀은 <strong>법률사무소가 아니며</strong>, 페이지에 허구의 &quot;자문 변호사
            팀&quot;·&quot;공인노무사 자문단&quot; 등을 내세우지 않습니다. 자격 명칭이 필요한 자문은 이용자가
            별도로 전문가에게 받아야 합니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-slate-50 p-5 rounded-lg border border-slate-100">
            <li>&quot;반드시&quot;, &quot;무조건 승소&quot;, &quot;확정 금액&quot; 등 단정 표현 최소화</li>
            <li>사안별 차이·최신 기준 확인 필요 문구 병행</li>
            <li>중요 조치 전 전문가 확인 권고를 기본 정책으로 유지</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">5. 정정 및 문의</h2>
          <p className="mb-3">
            계산 오류·오해 소지 문구·깨진 링크는 아래 채널로 제보해 주세요. 확인된 오류는 수정 후 해당 페이지
            검토일을 갱신합니다.
          </p>
          <p>
            <Link href="/contact" className="text-teal-800 hover:underline font-medium">
              문의·오류 제보 페이지
            </Link>
            {' · '}
            <a href="mailto:sublimernj@gmail.com" className="text-teal-800 hover:underline">
              sublimernj@gmail.com
            </a>
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-4">
          <Link href="/about" className="text-teal-800 hover:underline font-medium">
            ← 사이트 소개
          </Link>
          <Link href="/privacy" className="text-teal-800 hover:underline font-medium">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="text-teal-800 hover:underline font-medium">
            이용약관
          </Link>
        </div>
      </div>
    </main>
  );
}
