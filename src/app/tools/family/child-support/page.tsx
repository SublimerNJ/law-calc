'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'child-support')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type ChildCount = '1' | '2' | '3';
type AgeGroup = 'infant' | 'elementary' | 'teen';

function getBasePerChild(combinedIncome: number): number {
  // combinedIncome in 만원
  if (combinedIncome < 200) return 400_000;
  if (combinedIncome < 400) return 600_000;
  if (combinedIncome < 600) return 800_000;
  if (combinedIncome < 800) return 1_000_000;
  if (combinedIncome < 1000) return 1_200_000;
  if (combinedIncome < 1500) return 1_400_000;
  return 1_600_000;
}

function getMultiChildTotal(childCount: ChildCount, basePerChild: number): number {
  switch (childCount) {
    case '1': return basePerChild * 1.0;
    case '2': return basePerChild * 1.8;
    case '3': return basePerChild * 2.4;
  }
}

function getAgeFactor(age: AgeGroup): number {
  switch (age) {
    case 'infant': return 0.9;
    case 'elementary': return 1.0;
    case 'teen': return 1.1;
  }
}

interface ChildSupportResult {
  monthlyTotal: number;
  noncustodialPayment: number;
  custodialPayment: number;
  combinedIncome: number;
  noncustodialShare: number;
}

function calculateChildSupport(
  childCount: ChildCount,
  custodialIncome: number,
  noncustodialIncome: number,
  ageGroup: AgeGroup,
): ChildSupportResult {
  const combinedIncome = custodialIncome + noncustodialIncome;
  const basePerChild = getBasePerChild(combinedIncome);
  const totalBase = getMultiChildTotal(childCount, basePerChild);
  const ageFactor = getAgeFactor(ageGroup);
  const monthlyTotal = Math.floor(totalBase * ageFactor);

  const noncustodialShare = combinedIncome > 0
    ? noncustodialIncome / combinedIncome
    : 0.5;

  const noncustodialPayment = Math.floor(monthlyTotal * noncustodialShare);
  const custodialPayment = monthlyTotal - noncustodialPayment;

  return { monthlyTotal, noncustodialPayment, custodialPayment, combinedIncome, noncustodialShare };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

const CHILD_COUNT_LABELS: Record<ChildCount, string> = {
  '1': '1명',
  '2': '2명',
  '3': '3명 이상',
};

const AGE_LABELS: Record<AgeGroup, string> = {
  infant: '영유아 (0~6세)',
  elementary: '초등 (7~12세)',
  teen: '중고등 (13~18세)',
};

export default function ChildSupportPage() {
  const [childCount, setChildCount] = useState<ChildCount>('1');
  const [custodialIncome, setCustodialIncome] = useState('');
  const [noncustodialIncome, setNoncustodialIncome] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('elementary');
  const [result, setResult] = useState<ChildSupportResult | null>(null);

  const handleCalculate = () => {
    const ci = parseInt(custodialIncome, 10);
    const ni = parseInt(noncustodialIncome, 10);
    if (isNaN(ci) || isNaN(ni) || ci < 0 || ni < 0) return;
    setResult(calculateChildSupport(childCount, ci, ni, ageGroup));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">자녀 수</label>
          <select
            value={childCount}
            onChange={e => setChildCount(e.target.value as ChildCount)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          >
            {(Object.entries(CHILD_COUNT_LABELS) as [ChildCount, string][]).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">양육자(청구인) 월 소득 (만원)</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={custodialIncome}
            onChange={e => setCustodialIncome(e.target.value)}
            placeholder="예: 300"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">비양육자(상대방) 월 소득 (만원)</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={noncustodialIncome}
            onChange={e => setNoncustodialIncome(e.target.value)}
            placeholder="예: 500"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">자녀 나이대</label>
          <div className="flex flex-col gap-2">
            {(Object.entries(AGE_LABELS) as [AgeGroup, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ageGroup"
                  checked={ageGroup === key}
                  onChange={() => setAgeGroup(key)}
                  className="accent-[#ec4899]"
                />
                <span className="text-sm text-gray-300">{label}</span>
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
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">월 양육비</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.monthlyTotal)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">비양육자 부담분</p>
            <p className="text-lg text-white">
              {formatNumber(result.noncustodialPayment)}원 ({(result.noncustodialShare * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">양육자 부담분</p>
            <p className="text-lg text-white">
              {formatNumber(result.custodialPayment)}원 ({((1 - result.noncustodialShare) * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">합산 소득</p>
            <p className="text-lg text-white">{formatNumber(result.combinedIncome)}만원</p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제833조, 서울가정법원 양육비산정기준표(2026)
            </p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">
              본 계산기는 참고용이며, 실제 법원 결정과 다를 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
