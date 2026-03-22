'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'forced-heirship')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type ClaimantType = 'child' | 'spouse' | 'parent' | 'sibling';

interface ForcedHeirshipResult {
  baseEstate: number;
  statutoryShareAmount: number;
  forcedHeirshipAmount: number;
  actualReceived: number;
  shortfall: number;
  forcedRatio: number;
}

function getForcedRatio(type: ClaimantType): number {
  switch (type) {
    case 'child':
    case 'spouse':
      return 1 / 2;
    case 'parent':
    case 'sibling':
      return 1 / 3;
  }
}

function getClaimantLabel(type: ClaimantType): string {
  switch (type) {
    case 'child': return '직계비속(자녀)';
    case 'spouse': return '배우자';
    case 'parent': return '직계존속(부모)';
    case 'sibling': return '형제자매';
  }
}

function calculateForcedHeirship(
  estateAtDeath: number,
  giftsWithinYear: number,
  debts: number,
  claimantType: ClaimantType,
  statutorySharePct: number,
  actualReceived: number
): ForcedHeirshipResult {
  // 유류분 기초재산
  const baseEstate = Math.max(0, estateAtDeath + giftsWithinYear - debts);

  // 법정상속분액
  const statutoryShareAmount = Math.floor(baseEstate * (statutorySharePct / 100));

  // 유류분 비율
  const forcedRatio = getForcedRatio(claimantType);

  // 유류분액
  const forcedHeirshipAmount = Math.floor(statutoryShareAmount * forcedRatio);

  // 유류분 부족액
  const shortfall = Math.max(0, forcedHeirshipAmount - actualReceived);

  return {
    baseEstate,
    statutoryShareAmount,
    forcedHeirshipAmount,
    actualReceived,
    shortfall,
    forcedRatio,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseInput(value: string): number {
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

export default function ForcedHeirshipPage() {
  const [estateAtDeath, setEstateAtDeath] = useState('');
  const [giftsWithinYear, setGiftsWithinYear] = useState('');
  const [debts, setDebts] = useState('');
  const [claimantType, setClaimantType] = useState<ClaimantType>('child');
  const [statutorySharePct, setStatutorySharePct] = useState('');
  const [actualReceived, setActualReceived] = useState('');
  const [result, setResult] = useState<ForcedHeirshipResult | null>(null);

  const handleNumberInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  const handleCalculate = () => {
    const estate = parseInput(estateAtDeath);
    if (estate <= 0) return;
    const pct = parseFloat(statutorySharePct);
    if (isNaN(pct) || pct <= 0 || pct > 100) return;

    setResult(calculateForcedHeirship(
      estate,
      parseInput(giftsWithinYear),
      parseInput(debts),
      claimantType,
      pct,
      parseInput(actualReceived)
    ));
  };

  const claimantOptions: { value: ClaimantType; label: string }[] = [
    { value: 'child', label: '직계비속(자녀)' },
    { value: 'spouse', label: '배우자' },
    { value: 'parent', label: '직계존속(부모)' },
    { value: 'sibling', label: '형제자매' },
  ];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">상속 개시 시 재산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(estateAtDeath)}
            onChange={handleNumberInput(setEstateAtDeath)}
            placeholder="예: 1,000,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">1년 이내 생전증여 합계 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(giftsWithinYear)}
            onChange={handleNumberInput(setGiftsWithinYear)}
            placeholder="선택 입력"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">상속채무 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(debts)}
            onChange={handleNumberInput(setDebts)}
            placeholder="선택 입력"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">청구인 유형</label>
          <div className="grid grid-cols-2 gap-2">
            {claimantOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="claimantType"
                  checked={claimantType === opt.value}
                  onChange={() => setClaimantType(opt.value)}
                  className="accent-[#ec4899]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">청구인 법정상속분 (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={statutorySharePct}
            onChange={e => setStatutorySharePct(e.target.value)}
            placeholder="예: 42.86"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            법정상속분 계산기로 먼저 확인하세요
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">청구인 실제 취득액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(actualReceived)}
            onChange={handleNumberInput(setActualReceived)}
            placeholder="수증재산 + 상속받은 금액"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
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
              <p className="text-sm text-gray-400 mb-1">유류분 기초재산</p>
              <p className="text-lg text-white">{formatNumber(result.baseEstate)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">청구인 법정상속분액</p>
              <p className="text-lg text-white">{formatNumber(result.statutoryShareAmount)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">
                유류분액 (법정상속분 x {result.forcedRatio === 1/2 ? '1/2' : '1/3'})
              </p>
              <p className="text-lg text-white">{formatNumber(result.forcedHeirshipAmount)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">실제 취득액</p>
              <p className="text-lg text-white">{formatNumber(result.actualReceived)}원</p>
            </div>
            <div className={result.shortfall > 0 ? 'p-3 bg-[#2a1525] border border-[#ec4899]/30 rounded-lg' : ''}>
              <p className="text-sm text-gray-400 mb-1">유류분 부족액 (반환청구 가능액)</p>
              <p className="text-2xl font-bold" style={{ color: result.shortfall > 0 ? category.color : '#9ca3af' }}>
                {formatNumber(result.shortfall)}원
              </p>
              {result.shortfall > 0 && (
                <p className="text-xs mt-1" style={{ color: category.color }}>
                  유류분 침해가 인정되어 반환청구가 가능합니다.
                </p>
              )}
              {result.shortfall === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  유류분 침해가 없습니다.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제1112조~제1118조
            </p>
          </div>

          <div className="mt-3 p-3 bg-[#1a1025] border border-[#2a1a3a] rounded-lg">
            <p className="text-xs text-gray-400">
              본 계산기는 참고용입니다. 실제 유류분 청구 시 법률 전문가 상담을 권장합니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
