'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'attorney-fee')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

const BRACKETS = [
  { max: 20_000_000, label: '2,000만원 이하', rate: 0.1, base: 0, prevMax: 0, note: '소가의 10% (최소 10만원)' },
  { max: 50_000_000, label: '2,000만원 초과 ~ 5,000만원', rate: 0.08, base: 2_000_000, prevMax: 20_000_000, note: '200만 + 초과액의 8%' },
  { max: 100_000_000, label: '5,000만원 초과 ~ 1억원', rate: 0.06, base: 4_400_000, prevMax: 50_000_000, note: '440만 + 초과액의 6%' },
  { max: 150_000_000, label: '1억원 초과 ~ 1.5억원', rate: 0.04, base: 7_400_000, prevMax: 100_000_000, note: '740만 + 초과액의 4%' },
  { max: 200_000_000, label: '1.5억원 초과 ~ 2억원', rate: 0.02, base: 9_400_000, prevMax: 150_000_000, note: '940만 + 초과액의 2%' },
  { max: 500_000_000, label: '2억원 초과 ~ 5억원', rate: 0.01, base: 10_400_000, prevMax: 200_000_000, note: '1,040만 + 초과액의 1%' },
  { max: 1_000_000_000, label: '5억원 초과 ~ 10억원', rate: 0.005, base: 13_400_000, prevMax: 500_000_000, note: '1,340만 + 초과액의 0.5%' },
  { max: Infinity, label: '10억원 초과', rate: 0.001, base: 15_900_000, prevMax: 1_000_000_000, note: '1,590만 + 초과액의 0.1% (상한 3,000만원)' },
];

interface CalcResult {
  limit: number;
  actualFee: number | null;
  recoverable: number;
  bracketIndex: number;
  formula: string;
  levelMultiplier: number;
}

function calculateAttorneyFee(amount: number, level: number, actualFee: number | null): CalcResult {
  let bracketIndex = 0;
  let fee = 0;

  for (let i = 0; i < BRACKETS.length; i++) {
    if (amount <= BRACKETS[i].max || i === BRACKETS.length - 1) {
      bracketIndex = i;
      const b = BRACKETS[i];
      fee = b.base + (amount - b.prevMax) * b.rate;
      if (i === 0 && fee < 100_000) fee = 100_000;
      if (i === BRACKETS.length - 1 && fee > 30_000_000) fee = 30_000_000;
      break;
    }
  }

  const levelMultiplier = level === 2 ? 1.5 : 1;
  const limit = Math.floor(fee * levelMultiplier);

  const b = BRACKETS[bracketIndex];
  const excessAmount = amount - b.prevMax;
  let formula: string;
  if (bracketIndex === 0) {
    formula = `${formatNumber(amount)} × ${b.rate * 100}% = ${formatNumber(Math.floor(amount * b.rate))}`;
  } else {
    formula = `${formatNumber(b.base)} + (${formatNumber(amount)} - ${formatNumber(b.prevMax)}) × ${b.rate * 100}%\n= ${formatNumber(b.base)} + ${formatNumber(excessAmount)} × ${b.rate * 100}%\n= ${formatNumber(Math.floor(fee))}`;
  }
  if (level === 2) {
    formula += `\n× 1.5 (2심) = ${formatNumber(limit)}`;
  }

  const recoverable = actualFee !== null ? Math.min(actualFee, limit) : limit;

  return { limit, actualFee, recoverable, bracketIndex, formula, levelMultiplier };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function AttorneyFeePage() {
  const [amount, setAmount] = useState('');
  const [actualFeeInput, setActualFeeInput] = useState('');
  const [level, setLevel] = useState(1);
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;
    const actualFee = actualFeeInput ? parseInt(actualFeeInput.replace(/,/g, ''), 10) || null : null;
    setResult(calculateAttorneyFee(val, level, actualFee));
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4 p-3 rounded-lg bg-white border border-slate-200">
          <p className="text-xs text-slate-600">
            💡 소송에서 이겨서 상대방에게 <strong className="text-slate-600">소송비용으로 청구할 수 있는 변호사 보수의 상한</strong>을 계산합니다. 실제 변호사 선임비용과 다릅니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">소가 (원)</label>
          <p className="text-xs text-gray-500 mb-1">소가 = 소송에서 청구하는 금액</p>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(amount)}
            onChange={handleNumberChange(setAmount)}
            placeholder="예: 50,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">실제 지급한 변호사 보수 (원, 선택)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(actualFeeInput)}
            onChange={handleNumberChange(setActualFeeInput)}
            placeholder="입력하면 실제 돌려받을 금액도 표시됩니다"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">비워두면 산입 한도만 표시됩니다</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {[
              { value: 1, label: '1심' },
              { value: 2, label: '2심 (1.5배)' },
              { value: 3, label: '3심' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  checked={level === opt.value}
                  onChange={() => setLevel(opt.value)}
                  className="accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
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

      {result !== null && (
        <>
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">소송비용 산입 한도</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.limit)}원
              </p>
              <p className="text-xs text-gray-500 mt-1">
                이 금액까지 상대방에게 청구할 수 있습니다
              </p>
            </div>

            {result.actualFee !== null && (
              <>
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-1">실제 변호사 보수</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.actualFee)}원</p>
                </div>

                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: `${category.color}15`, borderLeft: `3px solid ${category.color}` }}>
                  <p className="text-sm text-slate-600 mb-1">실제 돌려받을 수 있는 금액</p>
                  <p className="text-2xl font-bold" style={{ color: category.color }}>
                    {formatNumber(result.recoverable)}원
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.actualFee <= result.limit
                      ? '실제 보수가 산입 한도 이내이므로 전액 청구 가능'
                      : `산입 한도 초과분 ${formatNumber(result.actualFee - result.limit)}원은 본인 부담`}
                  </p>
                </div>
              </>
            )}

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">적용 구간</p>
              <p className="text-sm text-slate-600">{BRACKETS[result.bracketIndex].label}</p>
              <p className="text-xs text-gray-500 mt-1">{BRACKETS[result.bracketIndex].note}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">계산식</p>
              <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
                {result.formula}
              </pre>
            </div>
          </div>

          {/* 전 구간 기준표 */}
          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">변호사보수 소송비용 산입 기준표</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-xs text-gray-500 py-2 pr-4">소가 구간</th>
                    <th className="text-right text-xs text-gray-500 py-2">산입 기준</th>
                  </tr>
                </thead>
                <tbody>
                  {BRACKETS.map((b, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-200/50 ${i === result.bracketIndex ? 'bg-[#3b82f6]/10' : ''}`}
                    >
                      <td className="text-slate-600 py-2.5 pr-4">{b.label}</td>
                      <td
                        className="text-right text-xs py-2.5"
                        style={{ color: i === result.bracketIndex ? category.color : '#9ca3af' }}
                      >
                        {b.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-gray-500">
                법적 근거: 민사소송법 제109조, 변호사보수의 소송비용 산입에 관한 규칙 (대법원 예규)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                2심은 1심 기준의 1.5배, 3심은 1심과 동일한 기준 적용
              </p>
              <p className="text-xs text-gray-500 mt-1">
                산입 한도 내에서 실제 지급한 변호사 보수만큼 청구 가능 (실비 한도)
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}
