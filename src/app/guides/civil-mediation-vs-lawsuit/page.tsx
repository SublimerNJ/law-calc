import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '민사조정과 정식 소송의 차이점 및 비용 비교 | law-calc.kr',
  description: '민사조정 제도의 실무적 장점, 소송 대비 1/5 수준의 인지대, 확정판결과 동일한 강력한 효력에 대해 안내합니다.',
};

export default function CivilMediationGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '민사조정과 정식 소송의 차이점 및 비용 비교',
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 민사법 데이터 분석팀'
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link aria-label="Navigation link" href="/guides" className="text-blue-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">소송/법원</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        민사조정과 정식 소송의 차이점 및 비용 비교
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 민사법 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          돈을 돌려받거나 손해를 배상받기 위해 무조건 정식 소송(민사소송)부터 제기하는 것이 정답일까요? 
          소송은 기본적으로 수개월에서 수년이 걸리며 막대한 변호사 비용과 스트레스를 동반합니다. 
          이럴 때 가장 현실적인 대안이 되는 것이 바로 <strong>'민사조정'</strong> 제도입니다.
        </p>

        <h2>1. 민사조정 제도의 핵심: "판결이 아닌 타협"</h2>
        <p>
          민사소송이 판사가 법에 따라 누구 말이 맞는지 엄격하게 승패를 가리는 과정이라면, 
          민사조정은 판사나 조정위원회의 중재 아래 양 당사자가 양보와 타협으로 원만하게 합의를 도출하는 과정입니다. 
          비공개로 진행되어 비밀이 유지되며, 감정 대립을 최소화할 수 있습니다.
        </p>

        <h2>2. 소송 대비 파격적인 비용 절감</h2>
        <p>
          민사조정의 가장 큰 매력은 <strong>비용</strong>입니다.
        </p>
        <ul>
          <li><strong>인지대:</strong> 정식 민사소송을 제기할 때 납부하는 수수료(인지대)의 정확히 <strong>1/5 (20%)</strong> 수준입니다.</li>
          <li><strong>송달료:</strong> 소송의 절반 수준인 당사자 1인당 5회분만 예납하면 됩니다.</li>
        </ul>
        <p>
          예를 들어 청구금액이 1억 원일 때 일반 소송의 인지대는 약 45만 원이지만, 조정 신청은 약 9만 원에 불과합니다. 
          전자소송을 이용하면 여기서 10%가 추가로 할인됩니다.
        </p>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl my-8">
          <h3 className="text-blue-800 mt-0">💡 소송과 조정 비용을 비교해 보세요</h3>
          <p className="mb-4 text-sm text-slate-700">
            청구금액(소가)만 입력하면 정식 소송과 민사조정의 인지대, 송달료 차이를 명확하게 비교해 드립니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link aria-label="Navigation link" href="/tools/court/civil-mediation" className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
              민사조정 비용 계산기
            </Link>
            <Link aria-label="Navigation link" href="/tools/court/lawsuit-cost" className="inline-block bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px] glassmorphism glass-panel">
              일반 소송비용 계산기
            </Link>
          </div>
        </div>

        <h2>3. 확정판결과 동일한 강력한 효력</h2>
        <p>
          "타협이라니, 나중에 상대방이 마음을 바꿔 돈을 안 주면 어떡하나요?"라는 걱정을 하실 수 있습니다.
        </p>
        <p>
          하지만 조정기일에서 양 당사자가 합의하여 <strong>'조정이 성립'</strong>되거나, 합의가 안 되어 판사가 내린 <strong>'조정에 갈음하는 결정(강제조정)'</strong>에 대해 2주 내에 이의를 제기하지 않으면, 
          그 결정문은 대법원 확정판결과 <strong>100% 동일한 효력</strong>을 갖습니다. 상대방이 약속한 날짜에 돈을 주지 않으면 곧바로 통장이나 부동산을 압류(강제집행)할 수 있습니다.
        </p>

        <h2>4. 조정이 결렬되면 어떻게 되나요?</h2>
        <p>
          상대방이 끝까지 조정에 불출석하거나, 강제조정 결정에 이의를 제기하면 조정은 불성립됩니다. 
          하지만 이 경우 사건은 자동으로 '정식 민사소송'으로 전환됩니다.
        </p>
        <p>
          이때 신청인은 처음 냈던 조정 인지대를 뺀 나머지 4/5의 인지대만 추가로 납부하면 되므로, 
          결과적으로 <strong>조정을 먼저 거쳤다고 해서 금전적으로 손해 보는 것은 전혀 없습니다.</strong>
        </p>

        <h2>결론</h2>
        <p>
          이웃 간의 분쟁, 층간소음, 임대차 보증금, 소규모 대여금 등 서로 어느 정도 타협의 여지가 있는 사안이라면, 
          막대한 비용과 시간을 들여 소송으로 직행하기 전에 민사조정 제도를 적극 활용해 보시길 권장합니다.
        </p>
      </article>
    </main>
  );
}