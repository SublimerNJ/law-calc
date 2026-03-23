'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'parental-leave')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

const PARENTAL_CAPS = {
  first3: { upper: 2_000_000, lower: 700_000, rate: 0.8 },
  rest: { upper: 1_200_000, lower: 700_000, rate: 0.5 },
};

const SINGLE_PARENT_FIRST3_UPPER = 3_000_000;

function calcMonthlyBenefit(
  monthlyWage: number,
  month: number,
  isSingleParent: boolean
): number {
  const cap = month <= 3 ? PARENTAL_CAPS.first3 : PARENTAL_CAPS.rest;
  const upper = month <= 3 && isSingleParent ? SINGLE_PARENT_FIRST3_UPPER : cap.upper;
  const raw = monthlyWage * cap.rate;
  return Math.min(Math.max(raw, cap.lower), upper);
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function ParentalLeavePage() {
  const [wage, setWage] = useState('');
  const [months, setMonths] = useState(6);
  const [type, setType] = useState<'normal' | 'single'>('normal');
  const [result, setResult] = useState<{
    monthly: { month: number; rate: number; amount: number }[];
    totalImmediate: number;
    totalDeferred: number;
    total: number;
  } | null>(null);

  const handleCalculate = () => {
    const w = parseInt(wage.replace(/[^0-9]/g, ''), 10);
    if (!w || w <= 0) return;

    const isSingleParent = type === 'single';
    const monthly: { month: number; rate: number; amount: number }[] = [];
    let totalBenefit = 0;

    for (let m = 1; m <= months; m++) {
      const amount = calcMonthlyBenefit(w, m, isSingleParent);
      const rate = m <= 3 ? PARENTAL_CAPS.first3.rate : PARENTAL_CAPS.rest.rate;
      monthly.push({ month: m, rate, amount });
      totalBenefit += amount;
    }

    const totalDeferred = Math.floor(totalBenefit * 0.25);
    const totalImmediate = totalBenefit - totalDeferred;

    setResult({ monthly, totalImmediate, totalDeferred, total: totalBenefit });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWage(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">월 통상임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={wage ? parseInt(wage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 3,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">육아휴직 기간 (개월)</label>
          <select
            value={months}
            onChange={e => setMonths(Number(e.target.value))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}개월</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">유형 선택</label>
          <div className="flex gap-4">
            {[
              { value: 'normal' as const, label: '일반' },
              { value: 'single' as const, label: '한부모/장애아동 (첫 3개월 상한 300만원)' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  checked={type === opt.value}
                  onChange={() => setType(opt.value)}
                  className="accent-[#f59e0b]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">총 예상 급여 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">즉시지급분 (75%)</p>
              <p className="text-lg text-white">{formatNumber(result.totalImmediate)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">사후지급분 (25%)</p>
              <p className="text-lg text-white">{formatNumber(result.totalDeferred)}원</p>
              <p className="text-xs text-gray-500">복직 후 6개월 계속근무 시 일시 지급</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">월별 상세</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-[#1e2d4a]">
                    <th className="py-2 text-left">월</th>
                    <th className="py-2 text-right">급여율</th>
                    <th className="py-2 text-right">월 급여액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthly.map(row => (
                    <tr key={row.month} className="border-b border-[#1e2d4a]/50">
                      <td className="py-2 text-gray-300">{row.month}개월차</td>
                      <td className="py-2 text-right text-gray-400">{(row.rate * 100).toFixed(0)}%</td>
                      <td className="py-2 text-right text-white">{formatNumber(row.amount)}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`1~3개월: 월급 × 80% (상한 200만원, 하한 70만원)
4개월~: 월급 × 50% (상한 120만원, 하한 70만원)
월 급여액 합계의 25%는 복직 후 사후지급`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 고용보험법 제70조(육아휴직급여), 제73조의2(육아기 근로시간 단축급여) | 2026년 기준
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-white mb-4">육아휴직 신청 방법</h2>
        <ol className="space-y-3">
          {[
            { color: '#f59e0b', text: '사업주에게 30일 전 서면 신청' },
            { color: '#10b981', text: '고용보험 홈페이지에서 급여 신청' },
            { color: '#3b82f6', text: '필요서류: 육아휴직확인서, 통장사본' },
            { color: '#f97316', text: '문의: 고용보험 (1350)' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-gray-300">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </CalculatorLayout>
  );
}
