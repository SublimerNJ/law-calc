import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '변호사보수 소송비용 산입의 원칙과 실무적 이해 | law-calc.kr',
  description: '소송에서 이겼을 때 상대방에게 변호사 비용을 얼마나 청구할 수 있는지, 대법원 규칙과 소송비용 확정 절차를 상세히 안내합니다.',
};

export default function AttorneyFeeGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '변호사보수 소송비용 산입의 원칙과 실무적 이해',
    datePublished: '2026-04-08',
    author: {
      '@type': 'Organization',
      name: 'law-calc.kr 법률 데이터 분석팀'
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
        변호사보수 소송비용 산입의 원칙과 실무적 이해
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 법률 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          "소송에서 이기면 변호사 비용도 다 돌려받을 수 있나요?" 민사소송 상담 시 의뢰인들이 가장 많이 묻는 질문입니다. 
          결론부터 말씀드리면 <strong>"일부는 맞고 일부는 틀리다"</strong>입니다.
        </p>

        <h2>소송비용 패소자 부담의 원칙</h2>
        <p>
          민사소송법 제98조는 "소송비용은 패소한 당사자가 부담한다"고 규정하고 있습니다. 
          따라서 전부 승소했다면 내가 지출한 소송비용(인지대, 송달료, 감정료, 변호사 보수 등)을 상대방에게 청구할 수 있는 것은 사실입니다.
        </p>

        <h2>변호사 보수는 왜 전액을 돌려받지 못할까?</h2>
        <p>
          당사자가 변호사에게 착수금 1,000만 원, 성공보수 1,000만 원 등 총 2,000만 원을 지급했다고 가정해 봅시다. 
          이 금액을 전부 패소자에게 청구할 수 있다면, 돈이 많은 사람이 무조건 비싼 변호사를 선임하여 상대방에게 금전적 타격을 가하는 이른바 '남소(소송 남용)'와 '패소자의 과도한 경제적 파탄' 문제가 발생합니다.
        </p>
        <p>
          이를 방지하기 위해 대법원은 <strong>『변호사보수의 소송비용 산입에 관한 규칙』</strong>을 제정하여, 
          소송목적의 값(소가) 구간별로 상대방에게 청구할 수 있는 변호사 보수의 <strong>'상한선(한도액)'</strong>을 엄격히 규정하고 있습니다.
        </p>

        <h2>산입 한도액 계산 원리</h2>
        <p>
          소가가 5,000만 원인 사건의 경우 산입 한도액은 다음과 같이 계산됩니다:
        </p>
        <ul>
          <li>2,000만 원까지: 200만 원</li>
          <li>나머지 3,000만 원(5천만 - 2천만)에 대하여 8% 적용: 240만 원</li>
          <li><strong>총 한도액: 440만 원</strong></li>
        </ul>
        <p>
          만약 이 사건에서 변호사에게 실제로 500만 원을 지급했다면 한도액인 440만 원까지만 돌려받을 수 있고, 
          실제로 300만 원만 지급했다면 한도액 이내이므로 300만 원만 돌려받을 수 있습니다. 
          (실비 보상의 원칙)
        </p>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl my-8">
          <h3 className="text-blue-800 mt-0">💡 관련 도구로 바로 확인하기</h3>
          <p className="mb-4 text-sm text-slate-700">
            복잡한 구간별 이율을 직접 계산하실 필요 없이, 소가만 입력하면 대법원 최신 규칙이 적용된 산입 한도액을 즉시 확인할 수 있습니다.
          </p>
          <Link aria-label="Navigation link" href="/tools/court/attorney-fee" className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
            변호사보수 소송비용산입 계산기 가기
          </Link>
        </div>

        <h2>일부 승소의 경우 주의사항</h2>
        <p>
          1억 원을 청구했는데 6,000만 원만 승소(인용) 판결을 받았다면, 법원은 판결문 주문에 
          <em>"소송비용 중 40%는 원고가, 60%는 피고가 부담한다"</em>는 식으로 비율을 정해줍니다.
        </p>
        <p>
          이때는 각자가 지출한 총 소송비용을 이 비율에 따라 상계(정산)하는 복잡한 절차를 거쳐야 하므로, 
          청구 취지를 무리하게 높게 잡는 것은 결국 자신이 부담할 소송비용을 늘리는 결과가 될 수 있음을 명심해야 합니다.
        </p>

        <h2>소송비용액 확정결정 신청</h2>
        <p>
          판결이 확정되었다고 해서 상대방이 알아서 변호사 비용을 입금해 주는 경우는 거의 없습니다. 
          제1심 법원에 <strong>'소송비용액 확정결정'</strong>을 별도로 신청하여 결정문을 받아야만, 
          그 결정문을 집행권원으로 하여 상대방의 재산에 강제집행을 할 수 있습니다. 
          이때 변호사에게 실제 지급했다는 세금계산서, 현금영수증, 무통장입금 내역 등이 반드시 증빙으로 첨부되어야 합니다.
        </p>
      </article>
    </main>
  );
}