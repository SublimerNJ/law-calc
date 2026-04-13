import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SNS 인터넷 명예훼손의 성립 요건과 위자료 산정 기준 | law-calc.kr',
  description: '사이버 명예훼손(정보통신망법)의 사실적시/허위사실 적시 처벌 수위와 민사상 위자료 손해배상 청구 기준을 해설합니다.',
};

export default function DefamationGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SNS 인터넷 명예훼손의 성립 요건과 위자료 산정 기준',
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 형사/손해배상 분석팀'
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link aria-label="Navigation link" href="/guides" className="text-orange-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">손해배상</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        SNS 인터넷 명예훼손 성립 요건과 위자료 산정
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 형사/손해배상 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          "내 돈 떼먹고 도망간 사람 인스타에 댓글 달았더니 고소당했습니다." 
          온라인상에서 억울함을 호소하거나 상대를 비난했다가 역으로 명예훼손 전과자가 되고 수백만 원의 민사 손해배상까지 물어주는 사례가 빈번합니다. 사이버 명예훼손의 무서운 진실을 알아봅니다.
        </p>

        <h2>1. 진실을 말해도 감옥에 갈 수 있다 (사실 적시 명예훼손)</h2>
        <p>
          우리나라 법은 <strong>'오직 공공의 이익'</strong>을 위한 목적이 인정되지 않는 한, 진실한 사실을 인터넷에 올리더라도 명예훼손으로 처벌합니다.
        </p>
        <p>
          특히 인터넷, SNS, 단톡방 등 전파성이 높은 공간에 글을 올리면 일반 형법이 아닌 <strong>『정보통신망 이용촉진 및 정보보호 등에 관한 법률(정보통신망법)』</strong>이 적용됩니다. 
          사실을 적시한 경우 3년 이하 징역 또는 3,000만 원 이하 벌금, 허위사실을 적시한 경우 7년 이하 징역 또는 5,000만 원 이하 벌금이라는 매우 무거운 가중 처벌을 받습니다.
        </p>

        <h2>2. 사이버 명예훼손 3대 성립 요건</h2>
        <p>
          경찰에 고소장이 접수되어 처벌되기 위해서는 다음 3가지 요건이 충족되어야 합니다.
        </p>
        <ul>
          <li><strong>비방할 목적:</strong> 정보통신망법 명예훼손의 핵심 요건입니다. 공공의 이익(소비자 알 권리 등)이 우선한다면 비방 목적이 부정될 수 있으나, 사적인 보복(불륜 폭로, 채무 폭로 등)은 비방 목적이 100% 인정됩니다.</li>
          <li><strong>특정성:</strong> 피해자가 누구인지 알 수 있어야 합니다. 실명을 쓰지 않았더라도 이니셜, 초성, 정황상 주위 사람들이 그 사람이 누구인지 추측할 수 있다면 특정성이 인정됩니다.</li>
          <li><strong>공연성:</strong> 단톡방, 공개 게시판 등 불특정 다수가 볼 수 있는 곳이어야 합니다. 1:1 메시지는 원칙적으로 공연성이 없으나, 그 1명이 다른 곳에 소문을 낼 가능성(전파 가능성)이 있다면 공연성이 인정될 수 있습니다.</li>
        </ul>

        <div className="bg-orange-50 border border-orange-100 p-6 rounded-xl my-8">
          <h3 className="text-orange-800 mt-0">💡 명예훼손 위자료는 얼마일까?</h3>
          <p className="mb-4 text-sm text-slate-700">
            형사 처벌과 별개로 민사상 정신적 고통(위자료)을 배상해야 합니다. 허위사실 유무, 전파성, 사과 여부 등을 입력하여 법원 실무 기준에 따른 위자료 예상액을 확인해 보세요.
          </p>
          <div className="flex gap-3">
            <Link aria-label="Navigation link" href="/tools/damages/defamation" className="inline-block bg-orange-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
              명예훼손 손해배상 계산기
            </Link>
            <Link aria-label="Navigation link" href="/tools/damages/damages-general" className="inline-block bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px] glassmorphism glass-panel">
              일반 손해배상 계산기
            </Link>
          </div>
        </div>

        <h2>3. 형사합의와 민사 손해배상(위자료)</h2>
        <p>
          명예훼손은 '반의사불벌죄'입니다. 즉, 가해자가 처벌받기 전 피해자와 <strong>'형사합의'</strong>를 하고 피해자가 처벌불원서(고소 취하)를 제출하면 수사기관은 사건을 종결하고 처벌할 수 없습니다. 
          따라서 가해자는 전과를 피하기 위해 통상적인 민사 위자료보다 훨씬 높은 금액을 주고 형사합의를 시도하는 경우가 많습니다.
        </p>
        <p>
          만약 합의가 결렬되어 가해자가 벌금형 등을 받았다면, 피해자는 그 유죄 판결문을 증거로 삼아 <strong>민사 손해배상(위자료) 청구 소송</strong>을 제기할 수 있습니다. 
          통상적인 사실 적시 명예훼손 위자료는 100만 원~300만 원 선이나, 악의적인 허위사실 유포로 피해자의 생업이 망가졌다면 1,000만 원 이상의 위자료가 선고되기도 합니다.
        </p>

        <h2>마치며</h2>
        <p>
          순간의 분노를 참지 못하고 누른 '전송' 버튼 하나가 형사 처벌과 거액의 손해배상이라는 부메랑으로 돌아올 수 있습니다. 온라인 공간에서는 항상 사실 관계 확인과 타인에 대한 존중이 필요합니다.
        </p>
      </article>
    </main>
  );
}