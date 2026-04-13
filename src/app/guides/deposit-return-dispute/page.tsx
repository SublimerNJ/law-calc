import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '전세금 미반환 대처법: 내용증명부터 임차권등기명령까지 | law-calc.kr',
  description: '역전세난이나 깡통전세로 임대차 보증금을 돌려받지 못할 때, 세입자가 취해야 할 법적 조치와 임차권등기명령 절차를 안내합니다.',
};

export default function DepositReturnGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '전세금 미반환 대처법: 내용증명부터 임차권등기명령까지',
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 부동산법 데이터 분석팀'
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link aria-label="Navigation link" href="/guides" className="text-purple-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">부동산</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        전세금 미반환 대처법: 내용증명부터 임차권등기명령까지
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 부동산법 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          "새 세입자가 들어와야 돈을 빼줄 수 있다." 부동산 시장 침체기에 임대인들로부터 가장 많이 듣게 되는 말입니다. 
          하지만 법적으로 임대인은 계약이 종료되는 즉시 보증금을 반환할 절대적 의무가 있습니다. 
          보증금을 돌려받지 못하고 있는 세입자가 소중한 전세금을 지키기 위해 밟아야 할 필수적인 법적 대응 절차를 안내합니다.
        </p>

        <h2>1단계: 명확한 계약 해지 통보와 내용증명 발송</h2>
        <p>
          모든 법적 절차의 대전제는 <strong>"임대차 계약이 적법하게 종료되었음"</strong>을 증명하는 것입니다. 
          주택임대차보호법상 임차인은 계약 종료 2개월 전까지 갱신 거절의 의사를 통지해야 합니다. 
          (이 기한을 놓치면 '묵시적 갱신'이 되어버릴 수 있습니다.)
        </p>
        <p>
          통지는 카카오톡이나 문자메시지, 통화 녹음으로도 가능하지만, 가장 확실한 법적 증거를 남기고 임대인에게 강력한 심리적 압박을 가하기 위해서는 <strong>'내용증명 우편'</strong>을 발송하는 것이 좋습니다. 내용증명에는 계약 만료일, 보증금 반환 요청액, 미반환 시 임차권등기명령 및 지연이자 청구 등의 법적 조치를 취하겠다는 의사를 명확히 기재해야 합니다.
        </p>

        <h2>2단계: 절대 이사 가면 안 됩니다! 임차권등기명령 신청</h2>
        <p>
          전세 대출 만기가 다가오거나 새 집을 구해서 부득이하게 이사를 가야 하는 상황이 올 수 있습니다. 
          이때 가장 주의해야 할 점은 <strong>보증금을 받기 전에 전출신고(주민등록 이전)를 하거나 짐을 빼면 절대로 안 된다</strong>는 것입니다. 
          전출을 하는 순간 주택임대차보호법상 우선변제권과 대항력이 상실되어 다른 채권자들에게 순위가 밀리게 됩니다.
        </p>
        <p>
          이사를 가야만 한다면 반드시 관할 법원에 <strong>'임차권등기명령'</strong>을 신청해야 합니다. 
          법원의 결정에 따라 부동산 등기부등본에 임차권이 등재된 것을 확인(보통 신청 후 2~3주 소요)한 이후에 전출과 이사를 해야 기존의 대항력과 우선변제권 순위가 그대로 유지됩니다.
        </p>

        <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl my-8">
          <h3 className="text-purple-800 mt-0">💡 관련 도구로 바로 확인하기</h3>
          <p className="mb-4 text-sm text-slate-700">
            임차권등기를 마친 후 이사를 나간 다음 날부터는 막대한 지연이자를 임대인에게 청구할 수 있습니다. 지연손해금이 얼마나 되는지 미리 계산해보세요.
          </p>
          <div className="flex gap-3">
            <Link aria-label="Navigation link" href="/tools/realty/deposit-return" className="inline-block bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
              임대차 보증금 반환 계산기
            </Link>
            <Link aria-label="Navigation link" href="/tools/misc/certified-letter" className="inline-block bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px] glassmorphism glass-panel">
              내용증명 작성 도우미
            </Link>
          </div>
        </div>

        <h2>3단계: 지연이자 청구와 보증금 반환 소송</h2>
        <p>
          임차권등기명령을 설정하고 주택을 비워주었음에도 임대인이 보증금을 반환하지 않는다면 어떻게 될까요? 
          임차인이 목적물(주택)을 인도한 날의 다음 날부터는 민법에 따라 <strong>연 5%의 지연손해금</strong>을 청구할 수 있습니다.
        </p>
        <p>
          더 나아가 법원에 '지급명령 신청'이나 '보증금 반환 청구 소송'을 제기하여 소장 부본이 임대인에게 송달된 다음 날부터는 
          소송촉진 등에 관한 특례법에 따라 무려 <strong>연 12%의 고율 지연이자</strong>가 적용됩니다. 
          이는 임대인에게 엄청난 경제적 압박으로 작용하여 보증금 반환을 앞당기는 핵심 지렛대가 됩니다.
        </p>

        <h2>마치며</h2>
        <p>
          보증금 미반환 사태는 초기 대응이 결과의 90%를 좌우합니다. 감정적인 호소보다는 내용증명 발송과 임차권등기명령이라는 냉정하고 합법적인 무기를 사용하여 권리를 지키시길 바랍니다.
        </p>
      </article>
    </main>
  );
}