'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'stamp-fee')!;
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

function getAppliedBracket(amount: number): string {
  if (amount <= 10_000_000) return '소가 1,000만원 이하 구간 (소가 x 0.5%)';
  if (amount <= 100_000_000) return '소가 1,000만원 초과 ~ 1억원 이하 구간 (소가 x 0.45% + 5,000원)';
  if (amount <= 1_000_000_000) return '소가 1억원 초과 ~ 10억원 이하 구간 (소가 x 0.4% + 55,000원)';
  return '소가 10억원 초과 구간 (소가 x 0.35% + 555,000원)';
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type CourtLevel = 1 | 2 | 3;

const LEVEL_LABELS: Record<CourtLevel, string> = {
  1: '1심',
  2: '항소심',
  3: '상고심',
};

const LEVEL_MULTIPLIERS: Record<CourtLevel, number> = {
  1: 1,
  2: 1.5,
  3: 2,
};

export default function StampFeePage() {
  const [amount, setAmount] = useState('');
  const [level, setLevel] = useState<CourtLevel>(1);
  const [result, setResult] = useState<{
    baseFee: number;
    selectedFee: number;
    allLevels: { level: CourtLevel; label: string; fee: number }[];
    bracket: string;
  } | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;

    const baseFee = calculateStampFee(val);
    const allLevels = ([1, 2, 3] as CourtLevel[]).map(l => ({
      level: l,
      label: LEVEL_LABELS[l],
      fee: Math.ceil((baseFee * LEVEL_MULTIPLIERS[l]) / 100) * 100,
    }));

    setResult({
      baseFee,
      selectedFee: allLevels.find(l => l.level === level)!.fee,
      allLevels,
      bracket: getAppliedBracket(val),
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
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleAmountChange}
            placeholder="예: 50,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {([1, 2, 3] as CourtLevel[]).map(l => (
              <label key={l} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  checked={level === l}
                  onChange={() => setLevel(l)}
                  className="accent-[#3b82f6]"
                />
                <span className="text-sm text-gray-300">
                  {LEVEL_LABELS[l]}
                  {l > 1 && ` (x${LEVEL_MULTIPLIERS[l]})`}
                </span>
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
        <>
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">{LEVEL_LABELS[level]} 인지대</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.selectedFee)}원
              </p>
            </div>

            <div className="mb-2">
              <p className="text-sm text-gray-400 mb-1">적용 구간</p>
              <p className="text-sm text-gray-300">{result.bracket}</p>
            </div>
          </div>

          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">전 심급 인지대 비교</h2>

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e2d4a]">
                  <th className="py-2 text-left text-xs text-gray-500 font-medium">심급</th>
                  <th className="py-2 text-left text-xs text-gray-500 font-medium">배율</th>
                  <th className="py-2 text-right text-xs text-gray-500 font-medium">인지대</th>
                </tr>
              </thead>
              <tbody>
                {result.allLevels.map(row => (
                  <tr
                    key={row.level}
                    className={`border-b border-[#1e2d4a] ${
                      row.level === level ? 'bg-[#3b82f6]/10' : ''
                    }`}
                  >
                    <td className="py-3 text-sm text-gray-300">{row.label}</td>
                    <td className="py-3 text-sm text-gray-400">x{LEVEL_MULTIPLIERS[row.level]}</td>
                    <td
                      className="py-3 text-right text-sm font-medium"
                      style={{ color: row.level === level ? category.color : '#e5e7eb' }}
                    >
                      {formatNumber(row.fee)}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
              <p className="text-xs text-gray-500">
                법적 근거: 민사소송등인지법 별표, 100원 미만 올림 적용
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}
