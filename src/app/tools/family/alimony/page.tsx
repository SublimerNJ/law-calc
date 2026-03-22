'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'alimony')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type FaultType = 'affair' | 'violence' | 'abandonment' | 'other';
type AssetLevel = 'high' | 'mid' | 'low';

interface AlimonyResult {
  estimate: number;
  minRange: number;
  maxRange: number;
}

function getBaseRange(years: number): [number, number] {
  if (years < 1) return [5_000_000, 20_000_000];
  if (years < 5) return [10_000_000, 50_000_000];
  if (years < 10) return [20_000_000, 80_000_000];
  if (years < 20) return [30_000_000, 100_000_000];
  return [50_000_000, 150_000_000];
}

function getFaultMultiplier(fault: FaultType): number {
  switch (fault) {
    case 'affair': return 1.5;
    case 'violence': return 1.3;
    case 'abandonment': return 1.2;
    case 'other': return 0.7;
  }
}

function getAssetFactor(asset: AssetLevel): number {
  switch (asset) {
    case 'high': return 1.2;
    case 'mid': return 1.0;
    case 'low': return 0.9;
  }
}

function calculateAlimony(years: number, fault: FaultType, asset: AssetLevel): AlimonyResult {
  const [baseMin, baseMax] = getBaseRange(years);
  const faultMult = getFaultMultiplier(fault);
  const assetFact = getAssetFactor(asset);

  const minRange = Math.floor(baseMin * faultMult * assetFact);
  const maxRange = Math.floor(baseMax * faultMult * assetFact);
  const estimate = Math.floor((minRange + maxRange) / 2);

  return { estimate, minRange, maxRange };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

const FAULT_LABELS: Record<FaultType, string> = {
  affair: '외도/불륜',
  violence: '가정폭력',
  abandonment: '유기/악의적 유기',
  other: '성격차이/기타',
};

export default function AlimonyPage() {
  const [years, setYears] = useState('');
  const [fault, setFault] = useState<FaultType>('affair');
  const [asset, setAsset] = useState<AssetLevel>('mid');
  const [result, setResult] = useState<AlimonyResult | null>(null);

  const handleCalculate = () => {
    const y = parseInt(years, 10);
    if (isNaN(y) || y < 0) return;
    setResult(calculateAlimony(y, fault, asset));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4 p-3 rounded-lg bg-[#1a1025] border border-[#2a1a3a]">
          <p className="text-xs text-gray-400">
            💡 위자료는 법원이 개별 사안을 종합적으로 판단하여 결정합니다. 이 계산기는 <strong className="text-gray-300">판례 기반 예상 범위</strong>를 제공하며, 실제 법원 결정과 차이가 있을 수 있습니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">혼인기간 (년)</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={years}
            onChange={e => setYears(e.target.value)}
            placeholder="예: 10"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">주요 유책사유</label>
          <div className="flex flex-col gap-2">
            {(Object.entries(FAULT_LABELS) as [FaultType, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="fault"
                  checked={fault === key}
                  onChange={() => setFault(key)}
                  className="accent-[#ec4899]"
                />
                <span className="text-sm text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">상대방 재산 규모</label>
          <div className="flex flex-col gap-2">
            {[
              { value: 'high' as AssetLevel, label: '상위 (3억 이상)' },
              { value: 'mid' as AssetLevel, label: '중위 (1~3억)' },
              { value: 'low' as AssetLevel, label: '하위 (1억 미만)' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="asset"
                  checked={asset === opt.value}
                  onChange={() => setAsset(opt.value)}
                  className="accent-[#ec4899]"
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

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">예상 위자료</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.estimate)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">예상 범위</p>
            <p className="text-lg text-white">
              {formatNumber(result.minRange)}원 ~ {formatNumber(result.maxRange)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">혼인기간</p>
            <p className="text-lg text-white">{years}년</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">유책사유</p>
            <p className="text-lg text-white">{FAULT_LABELS[fault]}</p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제843조, 제806조 (손해배상)
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
