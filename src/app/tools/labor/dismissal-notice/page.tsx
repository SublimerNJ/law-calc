'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'dismissal-notice')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DismissalNoticePage() {
  const [monthlyWage, setMonthlyWage] = useState('');
  const [noticeDays, setNoticeDays] = useState('');
  const [result, setResult] = useState<{
    allowance: number;
    dailyWage: number;
    unpaidDays: number;
  } | null>(null);

  const handleCalculate = () => {
    const wage = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
    const days = parseInt(noticeDays, 10);
    if (!wage || wage <= 0 || isNaN(days) || days < 0) return;

    const dailyWage = Math.floor(wage / 30);
    const unpaidDays = Math.max(0, 30 - days);
    const allowance = dailyWage * unpaidDays;

    setResult({ allowance, dailyWage, unpaidDays });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setMonthlyWage(raw);
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
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 3,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
          {monthlyWage && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(monthlyWage).toLocaleString('ko-KR')}원 (기본급 + 고정수당)
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">해고예고일수 (0~29일)</label>
          <input
            type="number"
            min="0"
            max="29"
            value={noticeDays}
            onChange={e => setNoticeDays(e.target.value)}
            placeholder="0 = 즉시해고"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">실제 받은 예고 기간. 0 = 예고 없이 즉시해고 (30일분 수당 전액 지급)</p>
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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">해고예고수당</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.allowance)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">미지급 예고일수</p>
              <p className="text-lg text-white">{result.unpaidDays}일</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">1일 통상임금</p>
              <p className="text-lg text-white">{formatNumber(result.dailyWage)}원</p>
            </div>
          </div>

          <div className="mb-4 p-4 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-[#f59e0b]">참고:</span> 계속근로기간이 3개월 미만인 근로자, 천재지변 등 부득이한 사유로 사업을 계속하는 것이 불가능한 경우에는 해고예고 의무가 면제됩니다.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-sm font-semibold text-gray-400 mb-2">계산식</p>
            <pre className="font-mono text-xs text-gray-300 bg-[#0d1424] rounded-lg p-3 whitespace-pre-wrap">
{`통상임금: ${monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : 0}원
÷ 30 = 1일 통상임금: ${formatNumber(result.dailyWage)}원
× (30 - ${noticeDays}일) = 미지급 ${result.unpaidDays}일
= 해고예고수당: ${formatNumber(result.allowance)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              법적 근거: 근로기준법 제26조 - 사용자는 근로자를 해고하려면 적어도 30일 전에 예고를 하여야 하고, 30일 전에 예고를 하지 아니하였을 때에는 30일분 이상의 통상임금을 지급하여야 합니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
