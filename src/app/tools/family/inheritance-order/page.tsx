'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'inheritance-order')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

interface HeirGroup {
  rank: number;
  label: string;
  count: number;
  share: string;
  isInheriting: boolean;
  reason: string;
}

function determineOrder(
  hasSpouse: boolean,
  numChildren: number,
  numGrandchildren: number,
  numParents: number,
  numSiblings: number,
  hasExtended: boolean
): HeirGroup[] {
  const results: HeirGroup[] = [];
  let inheritingRank = 0;

  // 1순위: 직계비속 (children + grandchildren by representation)
  const firstPriorityCount = numChildren + numGrandchildren;
  if (firstPriorityCount > 0) {
    inheritingRank = 1;
    // Children share: each child gets 1 portion, spouse gets 1.5 portions
    const spousePortions = hasSpouse ? 1.5 : 0;
    const totalPortions = firstPriorityCount + spousePortions;

    if (numChildren > 0) {
      results.push({
        rank: 1,
        label: `자녀 (${numChildren}명)`,
        count: numChildren,
        share: `각 ${formatFraction(1, totalPortions)}`,
        isInheriting: true,
        reason: '1순위 상속인',
      });
    }
    if (numGrandchildren > 0) {
      results.push({
        rank: 1,
        label: `손자녀 - 대습상속 (${numGrandchildren}명)`,
        count: numGrandchildren,
        share: `각 ${formatFraction(1, totalPortions)}`,
        isInheriting: true,
        reason: '대습상속 (사망한 자녀의 자리를 대신 상속)',
      });
    }
    if (hasSpouse) {
      results.push({
        rank: 1,
        label: '배우자',
        count: 1,
        share: formatFraction(1.5, totalPortions),
        isInheriting: true,
        reason: '1순위와 공동상속 (1.5배 가산)',
      });
    }
  }

  // 2순위: 직계존속
  if (numParents > 0) {
    if (inheritingRank === 0) {
      inheritingRank = 2;
      const spousePortions = hasSpouse ? 1.5 : 0;
      const totalPortions = numParents + spousePortions;
      results.push({
        rank: 2,
        label: `부모 (${numParents}명)`,
        count: numParents,
        share: `각 ${formatFraction(1, totalPortions)}`,
        isInheriting: true,
        reason: '2순위 상속인',
      });
      if (hasSpouse && firstPriorityCount === 0) {
        results.push({
          rank: 2,
          label: '배우자',
          count: 1,
          share: formatFraction(1.5, totalPortions),
          isInheriting: true,
          reason: '2순위와 공동상속 (1.5배 가산)',
        });
      }
    } else {
      results.push({
        rank: 2,
        label: `부모 (${numParents}명)`,
        count: numParents,
        share: '-',
        isInheriting: false,
        reason: '선순위(1순위) 상속인이 있어 상속 제외',
      });
    }
  }

  // Spouse alone: if no 1st or 2nd priority
  if (hasSpouse && inheritingRank === 0) {
    inheritingRank = -1; // special: spouse alone
    results.push({
      rank: 0,
      label: '배우자 (단독상속)',
      count: 1,
      share: '전부',
      isInheriting: true,
      reason: '1순위, 2순위 상속인이 없어 단독 상속',
    });
  }

  // 3순위: 형제자매
  if (numSiblings > 0) {
    const inheriting = inheritingRank === 0;
    if (inheriting) inheritingRank = 3;
    results.push({
      rank: 3,
      label: `형제자매 (${numSiblings}명)`,
      count: numSiblings,
      share: inheriting ? `각 ${formatFraction(1, numSiblings)}` : '-',
      isInheriting: inheriting,
      reason: inheriting ? '3순위 상속인' : '선순위 상속인이 있어 상속 제외',
    });
  }

  // 4순위: 4촌 이내 방계혈족
  if (hasExtended) {
    const inheriting = inheritingRank === 0;
    if (inheriting) inheritingRank = 4;
    results.push({
      rank: 4,
      label: '4촌 이내 방계혈족',
      count: 1,
      share: inheriting ? '전부' : '-',
      isInheriting: inheriting,
      reason: inheriting ? '4순위 상속인' : '선순위 상속인이 있어 상속 제외',
    });
  }

  // No heirs at all
  if (results.length === 0) {
    results.push({
      rank: 0,
      label: '상속인 없음',
      count: 0,
      share: '-',
      isInheriting: false,
      reason: '상속인이 존재하지 않습니다 (국가 귀속)',
    });
  }

  return results;
}

function formatFraction(numerator: number, denominator: number): string {
  // Display as simplified fraction-like string
  if (denominator === 0) return '-';
  const pct = ((numerator / denominator) * 100).toFixed(1);
  return `${numerator}/${denominator} (${pct}%)`;
}

export default function InheritanceOrderPage() {
  const [hasSpouse, setHasSpouse] = useState(false);
  const [numChildren, setNumChildren] = useState(0);
  const [numGrandchildren, setNumGrandchildren] = useState(0);
  const [numParents, setNumParents] = useState(0);
  const [numSiblings, setNumSiblings] = useState(0);
  const [hasExtended, setHasExtended] = useState(false);
  const [results, setResults] = useState<HeirGroup[] | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleDetermine = () => {
    setError('');
    setWarning('');

    if (numChildren < 0 || numGrandchildren < 0 || numParents < 0 || numSiblings < 0) {
      setError('상속인 수는 0 이상이어야 합니다.');
      setResults(null);
      return;
    }

    const totalHeirs = numChildren + numGrandchildren + numParents + numSiblings;
    if (totalHeirs > 20) {
      setWarning('상속인이 20명을 초과합니다. 입력값을 확인해주세요.');
    }

    setResults(
      determineOrder(hasSpouse, numChildren, numGrandchildren, numParents, numSiblings, hasExtended)
    );
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">가족 구성 입력</h2>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasSpouse}
              onChange={e => setHasSpouse(e.target.checked)}
              className="accent-[#ec4899]"
            />
            <span className="text-sm text-slate-600">배우자 생존 <span className="text-xs text-slate-400">(선택)</span></span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">자녀 수 <span className="text-xs text-slate-400">(선택, 기본 0)</span></label>
            <input
              type="number"
              min={0}
              max={10}
              value={numChildren}
              onChange={e => setNumChildren(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">
              손자녀 수 <span className="text-xs text-gray-600">(대습상속)</span> <span className="text-xs text-slate-400">(선택, 기본 0)</span>
            </label>
            <input
              type="number"
              min={0}
              max={10}
              value={numGrandchildren}
              onChange={e => setNumGrandchildren(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">부모 생존 수 <span className="text-xs text-slate-400">(선택, 기본 0)</span></label>
            <input
              type="number"
              min={0}
              max={2}
              value={numParents}
              onChange={e => setNumParents(Math.max(0, Math.min(2, parseInt(e.target.value) || 0)))}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">형제자매 수 <span className="text-xs text-slate-400">(선택, 기본 0)</span></label>
            <input
              type="number"
              min={0}
              max={10}
              value={numSiblings}
              onChange={e => setNumSiblings(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasExtended}
              onChange={e => setHasExtended(e.target.checked)}
              className="accent-[#ec4899]"
            />
            <span className="text-sm text-slate-600">4촌 이내 방계혈족 존재 <span className="text-xs text-slate-400">(선택)</span></span>
          </label>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {warning && (
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-500">{warning}</p>
          </div>
        )}

        <button
          onClick={handleDetermine}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          상속순위 확인
        </button>
      </div>

      {results !== null && (
        <div className="premium-card p-6 mb-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">상속순위 결과</h2>

          <div className="space-y-3">
            {results.map((heir, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg${!heir.isInheriting && heir.label === '상속인 없음' ? ' border border-orange-200 bg-orange-50' : ''}`}
                style={heir.label !== '상속인 없음' ? {
                  backgroundColor: heir.isInheriting ? `${category.color}15` : 'rgba(107,114,128,0.1)',
                  borderLeft: `3px solid ${heir.isInheriting ? category.color : '#4b5563'}`,
                } : undefined}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {heir.rank > 0 && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: heir.isInheriting ? category.color : '#4b5563',
                          color: '#fff',
                        }}
                      >
                        {heir.rank}순위
                      </span>
                    )}
                    <span className={`text-sm font-semibold ${heir.isInheriting ? 'text-slate-900' : heir.label === '상속인 없음' ? 'text-orange-600' : 'text-gray-500'}`}>
                      {heir.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{heir.reason}</p>
                </div>
                {heir.label !== '상속인 없음' && (
                  <div className="text-right">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: heir.isInheriting ? category.color : '#6b7280' }}
                    >
                      {heir.share}
                    </span>
                    <p className="text-xs mt-0.5" style={{ color: heir.isInheriting ? '#34d399' : '#ef4444' }}>
                      {heir.isInheriting ? '상속' : '제외'}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제1000조(상속순위), 제1003조(배우자상속), 제1009조(법정상속분), 제1001조(대습상속)
            </p>
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-600">
              본 판별기는 참고용입니다. 실제 상속 문제는 변호사 상담을 권장합니다.
            </p>
          </div>
        </div>
      )}

      {/* Static reference section */}
      <div className="premium-card p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">상속순위 안내</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <p><strong className="text-slate-600">1순위:</strong> 직계비속 (자녀, 손자녀) - 배우자와 공동상속 (배우자 1.5배 가산)</p>
          <p><strong className="text-slate-600">2순위:</strong> 직계존속 (부모, 조부모) - 배우자와 공동상속 (배우자 1.5배 가산)</p>
          <p><strong className="text-slate-600">3순위:</strong> 형제자매</p>
          <p><strong className="text-slate-600">4순위:</strong> 4촌 이내 방계혈족</p>
          <p className="pt-2 border-t border-slate-200">
            <strong className="text-slate-600">대습상속이란?</strong> 상속인이 될 직계비속이 상속 개시 전에 사망한 경우,
            그 직계비속(손자녀 등)이 사망한 상속인의 순위를 대신하여 상속받는 제도입니다 (민법 제1001조).
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
