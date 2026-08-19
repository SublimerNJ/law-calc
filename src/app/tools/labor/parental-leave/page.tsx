'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'parental-leave')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

// 고용보험법 시행령 제95조·제95조의3 (시행 2026.7.1., 대통령령 제36472호)
// 일반: 1~3개월 통상임금 100%(상한 250만), 4~6개월 100%(상한 200만), 7개월~ 80%(상한 160만). 하한 70만.
// 한부모(제95조의3 제3항): 1~3개월 100%(상한 300만), 4~6개월 100%(상한 200만), 7개월~ 80%(상한 160만).
const PARENTAL_LOWER = 700_000;

function getParentalRate(month: number): number {
  return month <= 6 ? 1 : 0.8;
}

function getParentalUpper(month: number, isSingleParent: boolean): number {
  if (isSingleParent && month <= 3) return 3_000_000;
  if (month <= 3) return 2_500_000;
  if (month <= 6) return 2_000_000;
  return 1_600_000;
}

function calcMonthlyBenefit(
  monthlyWage: number,
  month: number,
  isSingleParent: boolean
): number {
  const upper = getParentalUpper(month, isSingleParent);
  const raw = monthlyWage * getParentalRate(month);
  return Math.min(Math.max(raw, PARENTAL_LOWER), upper);
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function ParentalLeavePage() {
  const [wage, setWage] = useState('');
  const [months, setMonths] = useState(6);
  const [type, setType] = useState<'normal' | 'single'>('normal');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<{
    monthly: { month: number; rate: number; amount: number }[];
    totalImmediate: number;
    totalDeferred: number;
    total: number;
  } | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const w = parseInt(wage.replace(/[^0-9]/g, ''), 10);
    if (!w || w <= 0) {
      setError('월 통상임금을 입력해주세요.');
      setResult(null);
      return;
    }

    if (w > 100_000_000) {
      setWarning('월 통상임금이 1억원을 초과합니다. 입력값을 확인해주세요.');
    }

    const isSingleParent = type === 'single';
    const monthly: { month: number; rate: number; amount: number }[] = [];
    let totalBenefit = 0;

    for (let m = 1; m <= months; m++) {
      const amount = calcMonthlyBenefit(w, m, isSingleParent);
      const rate = getParentalRate(m);
      monthly.push({ month: m, rate, amount });
      totalBenefit += amount;
    }

    // 사후지급금 없음: 전액 즉시 지급으로 계산
    const totalDeferred = 0;
    const totalImmediate = totalBenefit;

    setResult({ monthly, totalImmediate, totalDeferred, total: totalBenefit });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWage(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">월 통상임금 (원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={wage ? parseInt(wage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">육아휴직 기간 (개월)</label>
          <select
            value={months}
            onChange={e => setMonths(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}개월</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">유형 선택</label>
          <div className="flex gap-4">
            {[
              { value: 'normal' as const, label: '일반' },
              { value: 'single' as const, label: '한부모가족(시행령 제95조의3 제3항, 첫 3개월 상한 300만 원)' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === opt.value}
                  onChange={() => setType(opt.value)}
                  className="accent-[#f59e0b]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button aria-label="Action button"
          onClick={handleCalculate}
          className="w-full bg-teal-700 hover:bg-teal-900 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">총 예상 급여 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700">※ 사후지급금 없음 — 이 계산기는 급여 전액을 매월 즉시 지급으로 계산합니다</p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">월별 상세</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-slate-200">
                    <th className="py-2 text-left">월</th>
                    <th className="py-2 text-right">급여율</th>
                    <th className="py-2 text-right">월 급여액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthly.map(row => (
                    <tr key={row.month} className="border-b border-slate-200/50">
                      <td className="py-2 text-slate-600">{row.month}개월차</td>
                      <td className="py-2 text-right text-slate-600">{(row.rate * 100).toFixed(0)}%</td>
                      <td className="py-2 text-right text-slate-900">{formatNumber(row.amount)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap glassmorphism glass-panel">
{`1~3개월: 월 통상임금 100% (상한 250만 원, 한부모 300만 원, 하한 70만 원)
4~6개월: 월 통상임금 100% (상한 200만 원, 하한 70만 원)
7개월~: 월 통상임금 80% (상한 160만 원, 하한 70만 원)
근거: 고용보험법 시행령 제95조·제95조의3 (시행 2026.7.1.)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 고용보험법 시행령 제95조·제95조의3 원문 대조 (시행 2026.7.1., 대통령령 제36472호)
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <ActionInsight 
          calculatorId="parental-leave" 
          amount={result.total} 
        />
      )}
    </CalculatorLayout>
  );
}
