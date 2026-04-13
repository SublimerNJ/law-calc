import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 (Terms of Service) | law-calc.kr 법률 계산기',
  description: 'law-calc.kr 법률 계산기 서비스의 이용약관 및 법적 면책 조항을 규정합니다.',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 sm:py-32">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">이용약관 (Terms of Service)</h1>
        <p className="text-sm text-slate-500">최종 수정일: 2026년 4월 8일</p>
      </div>

      <div className="space-y-12 text-slate-700 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제1조 (목적)</h2>
          <p>
            본 약관은 <strong>law-calc.kr</strong> (이하 "서비스")이 제공하는 모든 법률 계산기 및 
            법률 정보 콘텐츠의 이용 조건, 서비스 운영자와 이용자의 권리, 의무, 면책 사항을 명확히 규정함을 목적으로 합니다. 
            이용자가 본 서비스에 접속하고 이용함으로써 본 약관에 전적으로 동의한 것으로 간주합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제2조 (서비스의 본질과 법적 조력의 한계)</h2>
          <p className="mb-3">
            본 서비스가 제공하는 모든 계산 결과, 법률 가이드, FAQ 등의 콘텐츠는 대한민국 현행 법령, 판례, 정부 고시 등을 
            바탕으로 한 <strong>일반적인 정보 제공 및 참고 목적</strong>으로만 제공됩니다.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 bg-red-50/50 p-6 rounded-xl border border-red-100">
            <li>본 서비스의 결과물은 어떠한 경우에도 대한변호사협회 등에 등록된 전문 변호사, 노무사, 세무사 등의 <strong>'법률 자문(Legal Advice)'</strong>을 대체할 수 없습니다.</li>
            <li>소송 제기, 합의, 세금 신고, 계약 체결 등 법적 구속력이 발생하는 중대한 결정 전에는 <strong>반드시 유자격 전문가와 직접 상담</strong>하시기 바랍니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제3조 (절대적 면책 조항)</h2>
          <p>
            서비스 운영자는 데이터의 정확성과 최신성을 유지하기 위해 상시 노력(데이터 검증 정책 참조)하고 있으나, 
            법령의 빈번한 개정, 대법원 판례의 변경, 개별 사건의 독특한 사실관계 등에 따라 실제 법원의 판결이나 
            관공서의 행정처분 결과와 차이가 발생할 수 있습니다. 
          </p>
          <p className="mt-3 font-medium text-slate-900">
            따라서 서비스 운영자는 다음 각 호의 사항에 대해 법적 책임을 지지 아니하며, 어떠한 손해배상 의무도 부담하지 않습니다.
          </p>
          <ol className="list-decimal list-inside mt-3 space-y-2 text-slate-600 pl-2">
            <li>본 서비스의 오류, 지연, 누락, 부정확성으로 인해 이용자에게 발생한 직·간접적인 재산상 손해</li>
            <li>본 서비스의 결과를 증빙 자료나 법적 근거로 제출하여 발생한 소송 패소, 가산세 부과, 계약 파기 등의 결과</li>
            <li>서비스 점검, 서버 오류, 디도스(DDoS) 공격 등 불가항력적인 사유로 인한 서비스 접속 장애</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제4조 (지식재산권 및 이용 제한)</h2>
          <p>
            본 서비스의 웹사이트 디자인, 소스코드, UI/UX 구조, 자체 작성된 법률 가이드 콘텐츠 등에 대한 
            모든 저작권 및 지식재산권은 <strong>law-calc.kr 운영자</strong>에게 귀속됩니다.
          </p>
          <p className="mt-3">
            이용자는 본 서비스를 <strong>개인적인 정보 취득 및 비상업적 목적</strong>으로만 사용하여야 합니다. 
            운영자의 사전 서면 동의 없이 자동화된 봇(Bot), 크롤러(Crawler) 등을 이용해 대량의 데이터를 수집하거나, 
            당사의 산식 및 콘텐츠를 무단 복제하여 타 상업용 사이트에 배포하는 행위는 엄격히 금지되며 민형사상 처벌의 대상이 될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제5조 (광고의 게재)</h2>
          <p>
            본 서비스는 무료 운영을 위해 구글 애드센스(Google AdSense) 등 제3자가 제공하는 광고를 게재할 수 있습니다. 
            서비스 운영자는 제3자 광고주가 제공하는 광고의 내용, 신뢰성, 또는 해당 광고를 통해 연결된 타 웹사이트에서의 
            개인정보 수집 행위에 대해 보증하거나 책임지지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제6조 (관할 법원)</h2>
          <p>
            본 약관 및 서비스 이용과 관련하여 분쟁이 발생할 경우, 대한민국 법률을 준거법으로 하며, 
            민사소송법에 따른 관할 법원을 제1심 전속적 합의 관할 법원으로 합니다.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">제7조 (실무 이용 가이드)</h2>
          <p className="mb-3">
            이용자는 서비스 결과를 최종 법적 결론이 아닌 참고 자료로 사용해야 하며, 아래 순서로 활용하는 것을 권장합니다.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-100 glassmorphism glass-panel">
            <li>입력값의 출처(계약서·고지서·명세서)를 먼저 확인</li>
            <li>계산 결과를 내부 의사결정용 1차 수치로 사용</li>
            <li>실제 제출 문서/절차 진행 전 전문가 검토 및 최신 규정 확인</li>
          </ol>
        </section>

      </div>
    </main>
  );
}
