import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 (Privacy Policy) | law-calc.kr 법률 계산기',
  description: 'law-calc.kr 법률 계산기의 개인정보처리방침입니다. 구글 애드센스 쿠키 및 광고 게재에 대한 안내를 포함합니다.',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">개인정보처리방침 (Privacy Policy)</h1>
        <p className="text-sm text-slate-500">최종 수정일: 2026년 4월 8일</p>
      </div>

      <div className="space-y-12 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제1조 (개인정보의 처리 목적)</h2>
          <p>
            law-calc.kr (이하 "본 사이트")은 법률 계산기 서비스 제공을 목적으로 운영됩니다. 
            본 사이트는 <strong>이용자의 민감한 개인정보를 별도로 수집하거나 데이터베이스에 저장하지 않습니다.</strong> 
            모든 계산은 이용자의 브라우저 내에서 클라이언트 사이드 스크립트(JavaScript)를 통해 처리되며, 
            입력된 금액, 소득, 사실관계 등의 데이터는 서버로 전송되거나 기록되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제2조 (Google 애드센스 및 광고 게재와 쿠키 사용)</h2>
          <p className="mb-3">
            본 사이트는 무료 서비스 유지를 위해 Google AdSense를 비롯한 제3자 광고 업체의 광고를 게재할 수 있습니다. 
            이 과정에서 맞춤형 광고 제공을 위해 쿠키(Cookie) 및 웹 비컨(Web Beacons)이 사용될 수 있습니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <li>Google을 포함한 제3자 공급업체는 쿠키를 사용하여 사용자가 본 사이트 또는 다른 웹사이트를 이전에 방문한 이력을 기반으로 광고를 게재합니다.</li>
            <li>Google은 <strong>광고 쿠키(DoubleClick DART 쿠키)</strong>를 사용하여 사용자가 인터넷의 다른 사이트를 방문한 내역을 기반으로 사용자와 연관성이 높은 광고를 제공합니다.</li>
            <li>사용자는 <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Google 광고 설정 (My Ad Center)</a>을 방문하여 맞춤 광고에 사용되는 DART 쿠키의 사용을 선택 해제(Opt-out)할 수 있습니다.</li>
            <li>또는 <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">aboutads.info</a> 페이지를 방문하여 제3자 공급업체의 맞춤 광고 쿠키 사용을 해제할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제3조 (웹 로그 분석 및 트래픽 분석)</h2>
          <p>
            본 사이트는 서비스 개선과 트래픽 통계 분석을 위해 Google Analytics와 같은 로그 분석 도구를 사용합니다. 
            이 도구들은 IP 주소, 브라우저 유형, 접속 시간, 방문 페이지 등의 정보를 비식별화된 형태로 수집하며, 
            이는 특정 개인을 식별할 수 없는 데이터입니다. 이용자는 브라우저의 쿠키 설정을 거부함으로써 이러한 정보 수집을 차단할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제4조 (개인정보의 제3자 제공 및 위탁)</h2>
          <p>
            본 사이트는 회원가입을 받지 않으며 식별 가능한 개인정보를 보유하지 않으므로, 
            어떠한 개인정보도 제3자에게 제공하거나 위탁하지 않습니다. 단, 범죄 수사 목적으로 법령에 규정된 절차와 방법에 따라 
            수사기관의 요구가 있는 경우에는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제5조 (이용자의 권리와 의무)</h2>
          <p>
            이용자는 언제든지 자신의 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다. 
            쿠키 저장을 거부할 경우 맞춤형 광고 제공이 제한될 수 있으나, <strong>법률 계산기 기능은 동일하게 무료로 이용할 수 있습니다.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제6조 (개인정보 보호책임자 및 문의처)</h2>
          <p>
            본 사이트의 개인정보 처리와 관련한 불만, 불법 광고 신고, 또는 쿠키 정책에 관한 문의 사항은 아래의 연락처로 접수해 주시기 바랍니다.
          </p>
          <div className="mt-4 p-4 bg-slate-900 text-white rounded-lg">
            <p className="font-medium mb-1">law-calc.kr 서비스 운영팀</p>
            <p className="text-slate-300 font-mono">이메일: sublimernj@gmail.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}
