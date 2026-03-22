'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'lawsuit-cost')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

function calculateStampFee(amount: number): number {
  let fee: number;

  if (amount <= 10_000_000) {
    fee = amount * 0.005;
    if (fee < 1_000) fee = 1_000;
  } else if (amount <= 100_000_000) {
    fee = amount * 0.0045 + 5_000;
  } else if (amount <= 1_000_000_000) {
    fee = amount * 0.004 + 55_000;
  } else {
    fee = amount * 0.0035 + 555_000;
  }

  // 100원 단위 올림
  return Math.ceil(fee / 100) * 100;
}

function calculateServiceFee(partyCount: number, rounds: number): number {
  return partyCount * rounds * 4_500;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function LawsuitCostPage() {
  const [amount, setAmount] = useState('');
  const [partyCount, setPartyCount] = useState('2');
  const [level, setLevel] = useState(1);
  const [result, setResult] = useState<{
    stampFee: number;
    serviceFee: number;
    serviceRounds: number;
    total: number;
  } | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    const parties = parseInt(partyCount, 10);
    if (!val || val <= 0 || !parties || parties < 2) return;

    let stampFee = calculateStampFee(val);
    // 항소심/상고심: 인지대 1.5배
    if (level >= 2) stampFee = Math.ceil((stampFee * 1.5) / 100) * 100;

    const serviceRounds = level === 1 ? 10 : level === 2 ? 8 : 5;
    const serviceFee = calculateServiceFee(parties, serviceRounds);
    setResult({
      stampFee,
      serviceFee,
      serviceRounds,
      total: stampFee + serviceFee,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">소가 (원)</label>
          <p className="text-xs text-gray-500 mb-1">소가 = 소송에서 청구하는 금액</p>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleAmountChange}
            placeholder="예: 50,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">당사자 수 (원고 + 피고)</label>
          <input
            type="number"
            min={2}
            value={partyCount}
            onChange={e => setPartyCount(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {[
              { value: 1, label: '1심' },
              { value: 2, label: '항소심 (인지대 1.5배)' },
              { value: 3, label: '상고심 (인지대 1.5배)' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  checked={level === opt.value}
                  onChange={() => setLevel(opt.value)}
                  className="accent-[#3b82f6]"
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

          <table className="w-full mb-4">
            <tbody>
              <tr className="border-b border-[#1e2d4a]">
                <td className="py-3 text-sm text-gray-400">인지대</td>
                <td className="py-3 text-right text-white font-medium">
                  {formatNumber(result.stampFee)}원
                </td>
              </tr>
              <tr className="border-b border-[#1e2d4a]">
                <td className="py-3 text-sm text-gray-400">송달료 ({partyCount}명 x {result.serviceRounds}회 x 4,500원)</td>
                <td className="py-3 text-right text-white font-medium">
                  {formatNumber(result.serviceFee)}원
                </td>
              </tr>
              <tr>
                <td className="py-3 text-sm font-semibold text-white">합계 소송비용</td>
                <td className="py-3 text-right text-2xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.total)}원
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              인지대: 민사소송등인지법 별표 기준 | 송달료: 당사자 수 x 15회 x 4,500원 (2026년 기준)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
