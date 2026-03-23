import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | Law-Calc.com 법률 계산기',
  description: 'Law-Calc.com 법률 계산기의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">개인정보처리방침</h1>
      <p className="text-sm text-slate-500 mb-10">최종 수정일: 2026년 3월 23일</p>

      <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">1. 수집하는 개인정보</h2>
          <p>
            Law-Calc.com은 <strong className="text-slate-900">개인정보를 일절 수집하지 않습니다.</strong>
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1 text-slate-600">
            <li>회원가입 기능이 없습니다.</li>
            <li>로그인 기능이 없습니다.</li>
            <li>이용자가 입력한 계산 데이터는 브라우저에서만 처리되며, 어떤 서버에도 전송되지 않습니다.</li>
            <li>계산 결과는 저장되지 않습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">2. 쿠키 및 추적</h2>
          <p>
            본 사이트는 자체적으로 쿠키를 생성하거나 이용자를 추적하지 않습니다.
            다만, Google AdSense 광고가 게재될 경우 Google이 자체적으로 쿠키를 사용할 수 있습니다.
            이에 대한 자세한 내용은{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Google 광고 정책
            </a>
            을 참고하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">3. 데이터 처리 방식</h2>
          <p>
            모든 계산은 이용자의 웹 브라우저(클라이언트) 내에서 JavaScript로 수행됩니다.
            입력값과 결과값은 서버로 전송되지 않으며, 페이지를 닫으면 모든 데이터가 사라집니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">4. 제3자 제공</h2>
          <p>
            수집하는 개인정보가 없으므로 제3자에게 제공하는 개인정보도 없습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">5. 문의</h2>
          <p>
            본 개인정보처리방침에 대한 문의사항이 있으시면 아래로 연락해주시기 바랍니다.
          </p>
          <p className="mt-2 text-slate-600">
            이메일: contact@law-calc.com
          </p>
        </section>
      </div>
    </main>
  );
}
