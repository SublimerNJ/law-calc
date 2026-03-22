'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'e-court')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

type CourtLevel = 1 | 2 | 3;
type CaseType = 'civil' | 'payment-order' | 'mediation';

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
  return Math.ceil(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface Result {
  baseStampFee: number;
  levelMultiplier: number;
  caseMultiplier: number;
  regularStampFee: number;
  eCourtStampFee: number;
  discount: number;
  serviceFee: number;
  total: number;
  savings: number;
}

export default function ECourtPage() {
  const [amount, setAmount] = useState('');
  const [level, setLevel] = useState<CourtLevel>(1);
  const [caseType, setCaseType] = useState<CaseType>('civil');
  const [parties, setParties] = useState(2);
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;

    const baseStampFee = calculateStampFee(val);

    // Court level multiplier
    const levelMultiplier = level === 2 ? 1.5 : level === 3 ? 2 : 1;

    // Case type multiplier
    let caseMultiplier = 1;
    if (caseType === 'payment-order') caseMultiplier = 0.1;
    else if (caseType === 'mediation') caseMultiplier = 0.2;

    // Regular (non-e-court) stamp fee
    let regularStampFee = Math.ceil((baseStampFee * levelMultiplier * caseMultiplier) / 100) * 100;
    if (regularStampFee < 1_000) regularStampFee = 1_000;

    // E-court 10% discount
    let eCourtStampFee = Math.ceil((regularStampFee * 0.9) / 100) * 100;
    if (eCourtStampFee < 1_000) eCourtStampFee = 1_000;

    const discount = regularStampFee - eCourtStampFee;
    const serviceFee = parties * 10 * 4_500;
    const total = eCourtStampFee + serviceFee;
    const regularTotal = regularStampFee + serviceFee;
    const savings = regularTotal - total;

    setResult({
      baseStampFee,
      levelMultiplier,
      caseMultiplier,
      regularStampFee,
      eCourtStampFee,
      discount,
      serviceFee,
      total,
      savings,
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
          {amount && (
            <p className="text-xs text-gray-500 mt-1">
              {formatNumber(parseInt(amount))}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">소송 유형</label>
          <select
            value={caseType}
            onChange={e => setCaseType(e.target.value as CaseType)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          >
            <option value="civil">일반 민사</option>
            <option value="payment-order">지급명령 (인지대 1/10)</option>
            <option value="mediation">민사조정 (인지대 1/5)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {([
              { value: 1 as CourtLevel, label: '1심' },
              { value: 2 as CourtLevel, label: '항소심 (x1.5)' },
              { value: 3 as CourtLevel, label: '상고심 (x2)' },
            ]).map(opt => (
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

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">당사자 수</label>
          <input
            type="number"
            min={2}
            value={parties}
            onChange={e => setParties(Math.max(2, parseInt(e.target.value) || 2))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
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

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">일반 소송 인지대</p>
              <p className="text-lg text-white">{formatNumber(result.regularStampFee)}원</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">전자소송 할인 (-10%)</p>
              <p className="text-lg font-semibold text-green-400">
                -{formatNumber(result.discount)}원
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">전자소송 인지대</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.eCourtStampFee)}원
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">송달료 ({parties}명 x 10회 x 4,500원)</p>
              <p className="text-lg text-white">{formatNumber(result.serviceFee)}원</p>
            </div>

            <div className="pt-4 border-t border-[#1e2d4a]">
              <p className="text-sm text-gray-400 mb-1">합계</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.total)}원
              </p>
            </div>

            <div className="pt-4 border-t border-[#1e2d4a]">
              <p className="text-sm text-gray-400 mb-1">전자소송 절약액</p>
              <p className="text-lg font-semibold text-green-400">
                -{formatNumber(result.savings)}원
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              전자소송 이용 시 전자적 송달이 가능하여 송달료가 추가 절감될 수 있습니다.
            </p>
            <p className="text-xs text-gray-500">
              전자소송 이용: ecfs.scourt.go.kr
            </p>
            <p className="text-xs text-gray-500 mt-2">
              법적 근거: 민사소송 등에서의 전자문서 이용 등에 관한 법률
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
