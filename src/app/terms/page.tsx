import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | law-calc.kr 법률 계산기',
  description: 'law-calc.kr 법률 계산기의 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">이용약관</h1>
      <p className="text-sm text-slate-500 mb-10">최종 수정일: 2026년 3월 25일</p>

      <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">1. 서비스 이용 목적</h2>
          <p>
            law-calc.kr(이하 &quot;서비스&quot;)은 대한민국 법률 기준에 따른 각종 법률 계산을 보조하는
            무료 온라인 도구를 제공합니다. 이용자는 본 서비스를 개인적·비상업적 목적으로 이용할 수 있습니다.
          </p>
          <p className="mt-3">
            본 서비스를 이용하면 아래의 이용약관에 동의한 것으로 간주합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">2. 면책조항</h2>
          <p>
            본 서비스가 제공하는 모든 계산 결과는{' '}
            <strong className="text-slate-900">참고용이며, 법률 자문을 대체하지 않습니다.</strong>
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-slate-600">
            <li>계산 결과의 정확성을 법적으로 보장하지 않습니다.</li>
            <li>계산 기준일, 적용 법령, 개별 사실관계에 따라 실제 금액과 차이가 있을 수 있습니다.</li>
            <li>계산 결과를 근거로 한 법적 행위 또는 의사결정에 대해 서비스 운영자는 책임을 지지 않습니다.</li>
            <li>실제 법률 문제에 대해서는 반드시 변호사 등 관련 전문가와 상담하시기 바랍니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">3. 지적재산권</h2>
          <p>
            본 서비스의 디자인, 소스코드, 텍스트, 로고 등 모든 콘텐츠에 대한 지적재산권은
            서비스 운영자에게 귀속됩니다.
          </p>
          <p className="mt-3">
            이용자는 서비스 운영자의 사전 서면 동의 없이 본 서비스의 콘텐츠를 복제, 배포, 수정,
            상업적으로 이용하거나 제3자에게 제공할 수 없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">4. 서비스 변경 및 중단</h2>
          <p>
            서비스 운영자는 서비스의 내용, 제공 방식, 계산 기준 등을 사전 고지 없이 변경하거나
            일시적으로 중단할 수 있습니다.
          </p>
          <p className="mt-3">
            서비스 변경 또는 중단으로 인해 이용자에게 발생한 손해에 대해 서비스 운영자는
            고의 또는 중과실이 없는 한 책임을 지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">5. 준거법 및 관할</h2>
          <p>
            본 이용약관은 <strong className="text-slate-900">대한민국 법률</strong>을 준거법으로 하며,
            서비스 이용과 관련한 분쟁은 대한민국 법원의 관할로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">6. 문의</h2>
          <p>
            본 이용약관에 대한 문의사항이 있으시면 아래로 연락해주시기 바랍니다.
          </p>
          <p className="mt-2 text-slate-600">
            이메일: sublimernj@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}
