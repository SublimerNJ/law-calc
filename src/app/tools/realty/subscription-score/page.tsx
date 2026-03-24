'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'subscription-score')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

interface ScoreOption {
  label: string;
  score: number;
}

const homelessOptions: ScoreOption[] = [
  { label: '만 30세 미만 미혼', score: 0 },
  { label: '1년 미만', score: 2 },
  { label: '1년 이상 ~ 2년 미만', score: 4 },
  { label: '2년 이상 ~ 3년 미만', score: 6 },
  { label: '3년 이상 ~ 4년 미만', score: 8 },
  { label: '4년 이상 ~ 5년 미만', score: 10 },
  { label: '5년 이상 ~ 6년 미만', score: 12 },
  { label: '6년 이상 ~ 7년 미만', score: 14 },
  { label: '7년 이상 ~ 8년 미만', score: 16 },
  { label: '8년 이상 ~ 9년 미만', score: 18 },
  { label: '9년 이상 ~ 10년 미만', score: 20 },
  { label: '10년 이상 ~ 11년 미만', score: 22 },
  { label: '11년 이상 ~ 12년 미만', score: 24 },
  { label: '12년 이상 ~ 13년 미만', score: 26 },
  { label: '13년 이상 ~ 14년 미만', score: 28 },
  { label: '14년 이상 ~ 15년 미만', score: 30 },
  { label: '15년 이상', score: 32 },
];

const dependentOptions: ScoreOption[] = [
  { label: '0명', score: 5 },
  { label: '1명', score: 10 },
  { label: '2명', score: 15 },
  { label: '3명', score: 20 },
  { label: '4명', score: 25 },
  { label: '5명', score: 30 },
  { label: '6명 이상', score: 35 },
];

const savingsOptions: ScoreOption[] = [
  { label: '6개월 미만', score: 1 },
  { label: '6개월 이상 ~ 1년 미만', score: 2 },
  { label: '1년 이상 ~ 2년 미만', score: 3 },
  { label: '2년 이상 ~ 3년 미만', score: 4 },
  { label: '3년 이상 ~ 4년 미만', score: 5 },
  { label: '4년 이상 ~ 5년 미만', score: 6 },
  { label: '5년 이상 ~ 6년 미만', score: 7 },
  { label: '6년 이상 ~ 7년 미만', score: 8 },
  { label: '7년 이상 ~ 8년 미만', score: 9 },
  { label: '8년 이상 ~ 9년 미만', score: 10 },
  { label: '9년 이상 ~ 10년 미만', score: 11 },
  { label: '10년 이상 ~ 11년 미만', score: 12 },
  { label: '11년 이상 ~ 12년 미만', score: 13 },
  { label: '12년 이상 ~ 13년 미만', score: 14 },
  { label: '13년 이상 ~ 14년 미만', score: 15 },
  { label: '14년 이상 ~ 15년 미만', score: 16 },
  { label: '15년 이상', score: 17 },
];

export default function SubscriptionScorePage() {
  const [homelessIdx, setHomelessIdx] = useState(0);
  const [dependentIdx, setDependentIdx] = useState(0);
  const [savingsIdx, setSavingsIdx] = useState(0);
  const [result, setResult] = useState<{ homeless: number; dependent: number; savings: number; total: number } | null>(null);

  const handleCalculate = () => {
    const homeless = homelessOptions[homelessIdx].score;
    const dependent = dependentOptions[dependentIdx].score;
    const savings = savingsOptions[savingsIdx].score;
    setResult({ homeless, dependent, savings, total: homeless + dependent + savings });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">청약가점 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">무주택기간 (최대 32점) <span className="text-red-500">*</span></label>
          <select
            value={homelessIdx}
            onChange={e => setHomelessIdx(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {homelessOptions.map((opt, i) => (
              <option key={i} value={i}>{opt.label} ({opt.score}점)</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">부양가족수 (최대 35점) <span className="text-red-500">*</span></label>
          <select
            value={dependentIdx}
            onChange={e => setDependentIdx(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {dependentOptions.map((opt, i) => (
              <option key={i} value={i}>{opt.label} ({opt.score}점)</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">청약통장 가입기간 (최대 17점) <span className="text-red-500">*</span></label>
          <select
            value={savingsIdx}
            onChange={e => setSavingsIdx(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {savingsOptions.map((opt, i) => (
              <option key={i} value={i}>{opt.label} ({opt.score}점)</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-1">총 청약가점</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {result.total}점 <span className="text-base font-normal text-gray-500">/ 84점</span>
            </p>
          </div>

          <div className="space-y-1 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-slate-200">
                  <th className="text-left py-2 font-medium">항목</th>
                  <th className="text-right py-2 font-medium">배점</th>
                  <th className="text-right py-2 font-medium">점수</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-slate-200">
                  <td className="py-2">무주택기간</td>
                  <td className="text-right py-2">32점</td>
                  <td className="text-right py-2 font-semibold text-slate-900">{result.homeless}점</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2">부양가족수</td>
                  <td className="text-right py-2">35점</td>
                  <td className="text-right py-2 font-semibold text-slate-900">{result.dependent}점</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2">청약통장 가입기간</td>
                  <td className="text-right py-2">17점</td>
                  <td className="text-right py-2 font-semibold text-slate-900">{result.savings}점</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-slate-900">합계</td>
                  <td className="text-right py-2">84점</td>
                  <td className="text-right py-2 font-bold" style={{ color: category.color }}>{result.total}점</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">무주택기간 + 부양가족 + 청약통장 = 총점</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 주택공급에 관한 규칙 별표1 (청약가점제 점수산정 기준표) — 제1호(무주택기간), 제2호(부양가족수), 제3호(입주자저축 가입기간)
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">부양가족 인정 기준</h2>
        <p className="text-xs text-slate-600 mb-2">주택공급에 관한 규칙 별표1 제2호에 따른 부양가족 인정 기준:</p>
        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
          <li>배우자 (주민등록 별도 등재 가능)</li>
          <li>직계존속(부모·조부모 등): 세대원으로 등재된 자로서 3년 이상 계속 동거한 자</li>
          <li>직계비속(자녀 등): 세대원으로 등재된 미혼 자녀</li>
          <li>직계존속의 배우자(배우자의 부모 포함): 동거 요건 동일 적용</li>
        </ul>
        <p className="text-xs text-gray-400 mt-2">※ 입주자 본인은 부양가족 수에 미포함</p>
      </div>

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">청약 가점 높이는 방법</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>1</span>
            <span className="text-sm text-slate-600">청약통장 장기 유지 (최대 17점, 15년+)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>2</span>
            <span className="text-sm text-slate-600">부양가족 등록 확인</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>3</span>
            <span className="text-sm text-slate-600">무주택 기간 확인 (세대주 기준)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>4</span>
            <span className="text-sm text-slate-600">청약홈 (applyhome.co.kr)에서 예비당첨 확인</span>
          </li>
        </ol>
      </div>
    </CalculatorLayout>
  );
}
