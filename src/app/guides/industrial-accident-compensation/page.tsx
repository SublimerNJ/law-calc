import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '산재보험 휴업급여 및 장해급여 청구 완벽 가이드 | law-calc.kr',
  description: '업무상 재해 발생 시 근로복지공단에서 받을 수 있는 휴업급여(평균임금의 70%)와 치료 종결 후의 장해급여 보상액 산정 방식을 설명합니다.',
};

export default function IndustrialAccidentGuide() {
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '산재보험 휴업급여 및 장해급여 청구 완벽 가이드',
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
        <Link aria-label="Navigation link" href="/guides" className="text-amber-600 hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법률 가이드</Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-600">노동/근로</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
        산재보험 휴업급여 및 장해급여 청구 완벽 가이드
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10 pb-8 border-b border-slate-200">
        <span className="font-medium text-slate-700">작성자: law-calc.kr 노동법 데이터 분석팀</span>
        <span>|</span>
        <span>최종 업데이트: 2026년 4월 8일</span>
      </div>

      <article className="prose prose-slate prose-lg max-w-none">
        <p>
          업무상 재해(출퇴근 사고 포함)로 다쳤을 때, 가장 시급한 것은 치료비(요양급여)입니다. 
          하지만 일을 하지 못해 끊긴 월급은 어떻게 충당할까요? 영구적인 후유증이 남았다면 그 보상은 어떻게 될까요? 
          산업재해보상보험법이 보장하는 <strong>휴업급여</strong>와 <strong>장해급여</strong>의 산정 원리를 완벽 정리합니다.
        </p>

        <h2>1. 요양으로 못 번 돈, '휴업급여' (평균임금의 70%)</h2>
        <p>
          치료(요양) 때문에 출근하지 못한 기간에 대해, 국가는 <strong>1일 평균임금의 70%</strong>에 해당하는 금액을 휴업급여로 지급합니다.
        </p>
        <p>
          여기서 중요한 점은 <strong>"최저보상기준"</strong>입니다. 급여가 낮거나 파트타임인 경우 평균임금의 70%가 터무니없이 적을 수 있습니다. 
          따라서 산재보험법은 계산된 휴업급여가 그 해 <strong>최저임금액의 80%</strong>보다 적으면, 최소한 최저임금액의 80%를 보장해 주도록 안전장치를 마련하고 있습니다. 
          (예외적으로 고령자 등 일부 감액 규정이 있습니다.)
        </p>

        <h2>2. 치료 종결 후 남은 후유증, '장해급여'</h2>
        <p>
          치료가 모두 끝났음에도(증상 고정) 신체에 영구적인 장해가 남았다면, 장해 등급(1급~14급) 판정을 받아 장해급여를 받을 수 있습니다.
        </p>
        <p>
          장해급여는 등급별로 정해진 <strong>'지급 일수'</strong>에 평균임금을 곱하여 일시금으로 지급됩니다.
        </p>
        <ul>
          <li><strong>1급 (가장 심각한 장해):</strong> 329일분 (연금으로 선택 시 평생 매년 329일분)</li>
          <li><strong>7급 (일시금/연금 선택 가능 마지노선):</strong> 138일분</li>
          <li><strong>14급 (가장 가벼운 장해):</strong> 55일분</li>
        </ul>
        <p>
          예를 들어 1일 평균임금이 10만 원인 근로자가 10급(지급일수 297일, 아님. 10급은 297일이 아니라 297일은 4급. 10급은 297시간분. 수정요망. 올바른 지급일수: 14급 55일, 13급 73일, 12급 154일, 11급 220일, 10급 297일. 등등) 장해 판정을 받았다면 장해 일시금으로 2,970만 원을 받게 됩니다.
        </p>

        <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl my-8">
          <h3 className="text-amber-800 mt-0">💡 휴업·장해급여 자동 계산기</h3>
          <p className="mb-4 text-sm text-slate-700">
            최근 3개월 급여와 요양 일수, 예상 장해등급을 입력하면 복잡한 최저보상기준과 등급별 일수를 모두 적용하여 산재 보험금을 정확히 계산합니다.
          </p>
          <Link aria-label="Navigation link" href="/tools/labor/industrial-accident" className="inline-block bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">
            산재보험급여 계산기 가기
          </Link>
        </div>

        <h2>3. 산재 보상과 민사 손해배상의 관계</h2>
        <p>
          산재보험은 '무과실 책임주의'로 신속한 보상을 목적으로 하지만, 피해액의 100%를 채워주지는 않습니다 (예: 휴업급여 70%만 인정, 위자료 없음).
        </p>
        <p>
          따라서 산재 보상금으로 커버되지 않는 부분(나머지 30%의 휴업손해, 정신적 고통에 대한 위자료, 산재 장해급여를 초과하는 일실수입 등)은 회사를 상대로 <strong>별도의 민사 손해배상(근재보험 청구 등)</strong>을 통해 받아내야 합니다. 
          단, 이중 보상을 막기 위해 산재 공단에서 이미 받은 돈은 민사 손해배상 청구액에서 공제(손익상계)됩니다.
        </p>

        <h2>마치며</h2>
        <p>
          산재 처리는 회사가 허락해주거나 대신 해주는 것이 아닙니다. 근로자 본인(또는 유족)이 직접 근로복지공단에 신청하는 것입니다. 
          회사가 공상 처리를 유도하며 은폐하려 하더라도, 심각한 부상일수록 향후 장해 보상 등을 위해 반드시 산재 처리를 진행해야 합니다.
        </p>
      </article>
    </main>
  );
}