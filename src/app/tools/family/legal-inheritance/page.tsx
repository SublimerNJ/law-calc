'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'legal-inheritance')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

interface HeirShare {
  type: string;
  count: number;
  sharePerPerson: number;
  totalShare: number;
  amount: number | null;
}

interface ShareResult {
  priority: string;
  heirs: HeirShare[];
}

function calculateShares(
  hasSpouse: boolean,
  numChildren: number,
  numParents: number,
  numSiblings: number,
  estate: number | null
): ShareResult | null {
  const heirs: HeirShare[] = [];

  // 1순위: 직계비속 (+ 배우자)
  if (numChildren > 0) {
    const totalUnits = numChildren * 1 + (hasSpouse ? 1.5 : 0);
    if (hasSpouse) {
      heirs.push({
        type: '배우자',
        count: 1,
        sharePerPerson: 1.5 / totalUnits,
        totalShare: 1.5 / totalUnits,
        amount: estate ? Math.floor(estate * (1.5 / totalUnits)) : null,
      });
    }
    const childShare = 1 / totalUnits;
    heirs.push({
      type: '자녀',
      count: numChildren,
      sharePerPerson: childShare,
      totalShare: childShare * numChildren,
      amount: estate ? Math.floor(estate * childShare) : null,
    });
    return { priority: '1순위 (직계비속)', heirs };
  }

  // 2순위: 직계존속 (+ 배우자)
  if (numParents > 0) {
    const totalUnits = numParents * 1 + (hasSpouse ? 1.5 : 0);
    if (hasSpouse) {
      heirs.push({
        type: '배우자',
        count: 1,
        sharePerPerson: 1.5 / totalUnits,
        totalShare: 1.5 / totalUnits,
        amount: estate ? Math.floor(estate * (1.5 / totalUnits)) : null,
      });
    }
    const parentShare = 1 / totalUnits;
    heirs.push({
      type: '부모',
      count: numParents,
      sharePerPerson: parentShare,
      totalShare: parentShare * numParents,
      amount: estate ? Math.floor(estate * parentShare) : null,
    });
    return { priority: '2순위 (직계존속)', heirs };
  }

  // 배우자 단독
  if (hasSpouse) {
    heirs.push({
      type: '배우자',
      count: 1,
      sharePerPerson: 1,
      totalShare: 1,
      amount: estate,
    });
    return { priority: '배우자 단독상속', heirs };
  }

  // 3순위: 형제자매
  if (numSiblings > 0) {
    const share = 1 / numSiblings;
    heirs.push({
      type: '형제자매',
      count: numSiblings,
      sharePerPerson: share,
      totalShare: 1,
      amount: estate ? Math.floor(estate * share) : null,
    });
    return { priority: '3순위 (형제자매)', heirs };
  }

  return null;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function formatPercent(n: number): string {
  return (n * 100).toFixed(2) + '%';
}

function formatFraction(n: number, totalUnits: number): string {
  // Try to express as simple fraction
  const numerator = Math.round(n * totalUnits * 10) / 10;
  const denominator = totalUnits;
  if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
    return `${numerator}/${denominator}`;
  }
  return formatPercent(n);
}

export default function LegalInheritancePage() {
  const [hasSpouse, setHasSpouse] = useState(false);
  const [numChildren, setNumChildren] = useState(0);
  const [numParents, setNumParents] = useState(0);
  const [numSiblings, setNumSiblings] = useState(0);
  const [estate, setEstate] = useState('');
  const [result, setResult] = useState<ShareResult | null>(null);

  const handleCalculate = () => {
    const estateVal = estate ? parseInt(estate.replace(/[^0-9]/g, ''), 10) : null;
    const res = calculateShares(hasSpouse, numChildren, numParents, numSiblings, estateVal && estateVal > 0 ? estateVal : null);
    setResult(res);
  };

  const handleEstateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstate(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasSpouse}
              onChange={e => setHasSpouse(e.target.checked)}
              className="accent-[#ec4899] w-4 h-4"
            />
            <span className="text-sm text-gray-300">배우자 생존</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">자녀 수</label>
          <input
            type="number"
            min={0}
            max={10}
            value={numChildren}
            onChange={e => setNumChildren(Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">부모 생존 수 (자녀 없을 때 적용)</label>
          <input
            type="number"
            min={0}
            max={2}
            value={numParents}
            onChange={e => setNumParents(Math.min(2, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">형제자매 수 (자녀/부모 없을 때 적용)</label>
          <input
            type="number"
            min={0}
            max={10}
            value={numSiblings}
            onChange={e => setNumSiblings(Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">상속재산 총액 (원, 선택)</label>
          <input
            type="text"
            inputMode="numeric"
            value={estate ? parseInt(estate).toLocaleString('ko-KR') : ''}
            onChange={handleEstateChange}
            placeholder="금액 입력 시 상속금액도 표시됩니다"
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

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">적용 순위</p>
            <p className="text-lg font-semibold" style={{ color: category.color }}>
              {result.priority}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e2d4a]">
                  <th className="text-left text-gray-400 py-2 pr-4">상속인</th>
                  <th className="text-left text-gray-400 py-2 pr-4">인원</th>
                  <th className="text-right text-gray-400 py-2 pr-4">1인당 비율</th>
                  <th className="text-right text-gray-400 py-2 pr-4">합계 비율</th>
                  {result.heirs.some(h => h.amount !== null) && (
                    <th className="text-right text-gray-400 py-2">1인당 상속금액</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {result.heirs.map((heir, i) => (
                  <tr key={i} className="border-b border-[#1e2d4a]/50">
                    <td className="text-white py-3 pr-4">{heir.type}</td>
                    <td className="text-white py-3 pr-4">{heir.count}명</td>
                    <td className="text-right text-white py-3 pr-4">{formatPercent(heir.sharePerPerson)}</td>
                    <td className="text-right text-white py-3 pr-4">{formatPercent(heir.totalShare)}</td>
                    {heir.amount !== null && (
                      <td className="text-right font-semibold py-3" style={{ color: category.color }}>
                        {formatNumber(heir.amount)}원
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제1000조, 제1003조, 제1009조
            </p>
          </div>

          <div className="mt-3 p-3 bg-[#1a1025] border border-[#2a1a3a] rounded-lg">
            <p className="text-xs text-gray-400">
              본 계산기는 참고용입니다. 실제 상속 시 법률 전문가 상담을 권장합니다.
            </p>
          </div>
        </div>
      )}

      {result === null && numChildren === 0 && numParents === 0 && numSiblings === 0 && !hasSpouse && (
        <div className="premium-card p-6">
          <p className="text-sm text-gray-400 text-center">
            상속인 정보를 입력하고 계산하기를 눌러주세요.
          </p>
        </div>
      )}
    </CalculatorLayout>
  );
}
