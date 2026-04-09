import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '부당해고 구제신청의 골든타임과 금전보상제도 | law-calc.kr',
  description: '5인 이상 사업장에서 억울하게 해고를 당했을 때, 3개월 이내 노동위원회 구제신청 절차와 원직복직을 대체하는 금전보상제도에 대해 설명합니다.',
};

export default function UnfairDismissalGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '부당해고 구제신청의 골든타임과 금전보상제도',
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 노동법 데이터 분석팀'
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link href="/guides" className="text-amber-600 hover:underline">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">노동/근로</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        부당해고 구제신청의 골든타임과 금전보상제도
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 노동법 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          "내일부터 나오지 마세요." 사용자의 말 한마디에 직장을 잃었다면 당황스러울 수밖에 없습니다. 
          상시 근로자 5인 이상 사업장에서 <strong>정당한 이유 없는 해고</strong>를 당했다면, 민사소송보다 훨씬 빠르고 비용이 적게 드는 노동위원회 구제신청 제도를 이용해야 합니다.
        </p>

        <h2>1. 해고의 서면 통지: 가장 확실한 부당해고 판정 기준</h2>
        <p>
          해고가 정당한지 따지기 전에 <strong>'절차적 정당성'</strong>부터 확인해야 합니다. 근로기준법 제27조에 따라 사용자는 해고 사유와 해고 시기를 반드시 <strong>'서면(종이 문서 또는 요건을 갖춘 이메일)'</strong>으로 통지해야 합니다.
        </p>
        <p>
          만약 구두(말)나 일반적인 카카오톡, 문자메시지로만 해고를 통보했다면? 
          그 근로자가 아무리 큰 잘못을 저질렀다 하더라도, <strong>절차 위반으로 100% 무효인 부당해고</strong>가 됩니다. 이것이 구제신청에서 근로자가 승소하는 가장 흔한 이유 중 하나입니다.
        </p>

        <h2>2. 구제신청의 골든타임: '3개월' 제척기간</h2>
        <p>
          부당해고 구제신청에서 가장 치명적인 함정이 바로 '기간'입니다. 
          근로기준법 제28조 제2항에 따라, 부당해고 구제신청은 해고가 있었던 날부터 반드시 <strong>3개월 이내</strong>에 관할 지방노동위원회에 제기해야 합니다.
        </p>
        <p>
          이 3개월은 소멸시효가 아니라 <strong>제척기간</strong>이므로 단 하루라도 지나면 노동위원회는 아예 사건을 들여다보지도 않고 각하합니다. 
          회사와 합의를 기다리며 차일피일 미루다 이 기간을 넘겨 구제받을 권리를 영원히 상실하는 경우가 매우 많습니다.
        </p>

        <h2>3. 복직하기 싫다면? '금전보상명령' 제도의 활용</h2>
        <p>
          부당해고로 인정받으면 원칙적으로 '원직복직(원래 자리로 돌아감)' 명령과 함께 '해고 기간 동안 받지 못한 임금상당액(백페이)'을 받게 됩니다.
        </p>
        <p>
          하지만 이미 얼굴을 붉히고 법적 다툼까지 간 회사로 돌아가고 싶은 근로자는 거의 없습니다. 
          이럴 때 근로자는 복직 대신 <strong>'금전보상명령'</strong>을 신청할 수 있습니다. 
          노동위원회가 부당해고를 인정하면, 임금상당액(백페이)에 더하여 근로자의 고통과 재취업 기간을 고려한 소정의 <strong>'위로금(통상 통상임금의 1~3개월분)'</strong>을 추가로 지급하도록 명합니다.
        </p>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl my-8">
          <h3 className="text-amber-800 mt-0">💡 내 부당해고 보상금은 얼마일까?</h3>
          <p className="mb-4 text-sm text-slate-700">
            해고일과 노동위원회 판정일까지의 예상 기간, 급여를 입력하면 받을 수 있는 임금상당액(백페이)과 금전보상(위로금) 예상액을 계산해 드립니다.
          </p>
          <div className="flex gap-3">
            <Link href="/tools/labor/unfair-dismissal" className="inline-block bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
              부당해고 보상금 계산기
            </Link>
            <Link href="/tools/labor/dismissal-notice" className="inline-block bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              해고예고수당 계산기
            </Link>
          </div>
        </div>

        <h2>4. 해고예고수당과의 중복 청구</h2>
        <p>
          회사가 30일 전에 해고 예고를 하지 않았다면, 부당해고 구제신청과 <strong>별개로</strong> 30일분의 통상임금인 '해고예고수당'을 노동청에 즉시 청구할 수 있습니다. 
          이는 해고의 정당성(부당해고 여부)과 무관하게, 단순히 "30일 전 예고 절차"를 지키지 않은 것에 대한 금전적 보상입니다.
        </p>
      </article>
    </main>
  );
}