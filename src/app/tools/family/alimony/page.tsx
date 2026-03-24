'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'alimony')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type FaultType = 'affair' | 'violence' | 'abandonment' | 'economic' | 'other';
type AssetLevel = 'high' | 'mid' | 'low';

interface FaultInfo {
  label: string;
  desc: string;
  // 단독 유책사유일 때의 실무 위자료 범위 (혼인 10년 기준, 만원)
  soloMin: number;
  soloMax: number;
  // 내부 가중치 (상한 쪽 이동 비율, 0~1)
  weight: number;
}

const FAULTS: Record<FaultType, FaultInfo> = {
  affair:      { label: '외도/불륜',       desc: '부정행위, 간통', soloMin: 2000, soloMax: 3000, weight: 1.0 },
  violence:    { label: '가정폭력',        desc: '폭행, 상해, 협박', soloMin: 1000, soloMax: 3000, weight: 0.85 },
  abandonment: { label: '유기/악의적 유기', desc: '가출, 연락두절, 생활비 미지급', soloMin: 1000, soloMax: 2000, weight: 0.6 },
  economic:    { label: '경제적 학대',      desc: '재산 은닉, 생활비 통제, 도박', soloMin: 800, soloMax: 2000, weight: 0.5 },
  other:       { label: '성격차이/기타',    desc: '잦은 다툼, 시가갈등 등', soloMin: 500, soloMax: 1500, weight: 0.3 },
};

const FAULT_KEYS = Object.keys(FAULTS) as FaultType[];

const ASSET_LABELS: Record<AssetLevel, string> = {
  high: '상위 (순자산 3억 이상)', mid: '중위 (1~3억)', low: '하위 (1억 미만)',
};

// 혼인기간별 기본 범위 (만원, 판례 경향 기반)
// 일반적 상한 3,000만~5,000만원, 극단적 사안 시 1억 이상 가능
const BASE_RANGES: { maxYears: number; label: string; min: number; max: number }[] = [
  { maxYears: 1,        label: '1년 미만',  min: 300,  max: 1000 },
  { maxYears: 5,        label: '1~5년',     min: 500,  max: 2000 },
  { maxYears: 10,       label: '5~10년',    min: 1000, max: 3000 },
  { maxYears: 20,       label: '10~20년',   min: 1500, max: 5000 },
  { maxYears: Infinity, label: '20년 이상',  min: 2000, max: 5000 },
];

function getBaseRange(years: number) {
  for (let i = 0; i < BASE_RANGES.length; i++) {
    if (years < BASE_RANGES[i].maxYears || i === BASE_RANGES.length - 1) {
      return { idx: i, ...BASE_RANGES[i] };
    }
  }
  return { idx: 0, ...BASE_RANGES[0] };
}

/**
 * 실무 반영 위자료 산정 로직
 *
 * 법원은 유책사유를 "합산"하지 않습니다.
 * 모든 사정을 종합적으로 고려하여 하나의 금액을 정합니다.
 *
 * 이 계산기에서는:
 * 1. 혼인기간으로 기본 범위(min~max)를 결정
 * 2. 가장 무거운 유책사유의 가중치로 범위 내 위치를 결정
 * 3. 추가 유책사유가 있으면 상한 쪽으로 10~20%p씩 이동 (체감 적용)
 * 4. 재산·자녀 요소로 최종 조정
 *
 * 이렇게 하면 외도(3,000만) + 폭력(3,000만) = 6,000만이 아니라,
 * 외도+폭력 복합 = 3,000만~5,000만 상한 쪽으로 반영됩니다.
 */
function calculateAlimony(
  years: number,
  faults: FaultType[],
  asset: AssetLevel,
  hasChildren: boolean,
) {
  const { idx, min: baseMin, max: baseMax } = getBaseRange(years);
  const range = baseMax - baseMin;

  // 유책사유 가중치 정렬 (높은 순)
  const sortedFaults = [...faults].sort((a, b) => FAULTS[b].weight - FAULTS[a].weight);
  const primaryFault = sortedFaults[0];

  // 기본 위치: 가장 무거운 유책사유의 weight
  let position = primaryFault ? FAULTS[primaryFault].weight : 0.3;

  // 추가 유책사유: 체감적으로 상한 쪽 이동 (남은 거리의 15%씩)
  for (let i = 1; i < sortedFaults.length; i++) {
    const remaining = 1.0 - position;
    position += remaining * 0.15;
  }

  // position은 0~1, 범위 내 위치 결정
  const baseEstimate = baseMin + Math.floor(range * position);

  // 재산 보정
  const assetMult = asset === 'high' ? 1.2 : asset === 'low' ? 0.85 : 1.0;
  // 자녀 보정
  const childMult = hasChildren ? 1.1 : 1.0;

  const estimate = Math.floor(baseEstimate * assetMult * childMult);
  // 예상 범위 (±20%)
  const minRange = Math.floor(estimate * 0.8);
  const maxRange = Math.floor(estimate * 1.2);

  return {
    estimate: estimate * 10_000,
    minRange: minRange * 10_000,
    maxRange: maxRange * 10_000,
    baseRangeIdx: idx,
    baseMin: baseMin * 10_000,
    baseMax: baseMax * 10_000,
    position: Math.round(position * 100),
    faultCount: faults.length,
    primaryFault,
    assetMult,
    childMult,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function formatWon(n: number): string {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억`;
  if (n >= 10_000) return `${Math.round(n / 10_000).toLocaleString('ko-KR')}만`;
  return formatNumber(n);
}

export default function AlimonyPage() {
  const [years, setYears] = useState('');
  const [faults, setFaults] = useState<FaultType[]>(['affair']);
  const [asset, setAsset] = useState<AssetLevel>('mid');
  const [hasChildren, setHasChildren] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateAlimony> | null>(null);

  const toggleFault = (key: FaultType) => {
    setFaults(prev => {
      if (prev.includes(key)) {
        const next = prev.filter(f => f !== key);
        return next.length === 0 ? prev : next; // 최소 1개
      }
      return [...prev, key];
    });
  };

  const handleCalculate = () => {
    const y = parseInt(years, 10);
    if (isNaN(y) || y < 0 || faults.length === 0) return;
    setResult(calculateAlimony(y, faults, asset, hasChildren));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-600">
            위자료는 법원이 개별 사안을 <strong>종합적으로</strong> 판단합니다.
            이 계산기는 판례 분석 기반 <strong>예상 범위</strong>를 제공하며, 실제 법원 결정과 차이가 있을 수 있습니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">혼인기간 (년)</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={years}
            onChange={e => setYears(e.target.value)}
            placeholder="예: 10"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">유책사유 (복수 선택 가능)</label>
          <div className="flex flex-col gap-2">
            {FAULT_KEYS.map(key => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={faults.includes(key)}
                  onChange={() => toggleFault(key)}
                  className="accent-[#ec4899] w-4 h-4"
                />
                <span className="text-sm text-slate-600">{FAULTS[key].label}</span>
                <span className="text-xs text-gray-400">{FAULTS[key].desc}</span>
              </label>
            ))}
          </div>
          {faults.length > 1 && (
            <p className="text-xs text-amber-600 mt-2">
              {faults.length}개 유책사유 선택 — 복합 사유는 단순 합산이 아닌 종합 반영됩니다
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">상대방 재산 규모</label>
          <div className="flex flex-col gap-2">
            {(Object.entries(ASSET_LABELS) as [AssetLevel, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="asset" checked={asset === key} onChange={() => setAsset(key)} className="accent-[#ec4899]" />
                <span className="text-sm text-slate-600">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} className="accent-[#ec4899] w-4 h-4" />
            <span className="text-sm text-slate-600">미성년 자녀 있음</span>
          </label>
        </div>

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: category.color }}>
          계산하기
        </button>
      </div>

      {result !== null && (
        <>
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">예상 위자료</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.estimate)}원
              </p>
            </div>

            <div className="mb-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">예상 범위</p>
              <p className="text-lg text-slate-900">
                {formatNumber(result.minRange)}원 ~ {formatNumber(result.maxRange)}원
              </p>
            </div>

            {/* 산출 근거 */}
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">산출 근거</p>
              <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
{`기본 범위 (혼인 ${years}년, ${BASE_RANGES[result.baseRangeIdx].label}):
  ${formatWon(result.baseMin)} ~ ${formatWon(result.baseMax)}

유책사유: ${faults.map(f => FAULTS[f].label).join(' + ')}${result.faultCount > 1 ? ` (${result.faultCount}개 복합)` : ''}
  → 범위 내 위치: 하한 기준 ${result.position}% 지점

보정: 재산규모 ×${result.assetMult}${hasChildren ? `, 미성년자녀 ×${result.childMult}` : ''}
최종 예상: ${formatNumber(result.estimate)}원 (±20%)`}
              </pre>
            </div>

            {/* 복합 유책사유 안내 */}
            {result.faultCount > 1 && (
              <div className="mb-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm font-semibold text-amber-800 mb-2">복수 유책사유는 왜 단순 합산이 아닌가요?</p>
                <div className="text-xs text-amber-700 space-y-1.5">
                  <p>
                    법원은 위자료를 유책사유별로 따로 계산해서 더하지 않습니다.
                    <strong> 모든 사정을 종합적으로 고려하여 하나의 금액을 정합니다</strong> (대법원 87므5 판결).
                  </p>
                  <p>
                    예를 들어, 외도 단독이면 2,000~3,000만원, 폭력 단독이면 1,000~3,000만원이지만,
                    외도+폭력이 겹쳐도 5,000~6,000만원이 되는 것이 아니라
                    <strong> 3,000~5,000만원 상한 쪽으로 반영</strong>되는 것이 일반적입니다.
                  </p>
                  <p>
                    이는 위자료가 개별 불법행위의 손해배상이 아니라,
                    혼인관계 파탄으로 인한 <strong>정신적 고통 전체</strong>에 대한 포괄적 배상이기 때문입니다.
                    유책사유가 많을수록 금액이 높아지지만, 단순 합산이 아닌 체감적으로 반영됩니다.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 유책사유별 실무 참고 범위 */}
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">유책사유별 실무 위자료 범위 (참고)</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-left text-xs text-gray-500">유책사유</th>
                  <th className="py-2 text-right text-xs text-gray-500">실무 범위 (단독)</th>
                </tr>
              </thead>
              <tbody>
                {FAULT_KEYS.map(key => (
                  <tr key={key} className={`border-b border-slate-200/50 ${faults.includes(key) ? 'bg-[#ec4899]/10' : ''}`}>
                    <td className="py-2.5 text-slate-600">{FAULTS[key].label}</td>
                    <td className="py-2.5 text-right" style={{ color: faults.includes(key) ? category.color : '#9ca3af' }}>
                      {formatWon(FAULTS[key].soloMin * 10_000)} ~ {formatWon(FAULTS[key].soloMax * 10_000)}원
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td className="py-2.5 text-slate-600 font-semibold">복합 사유 (극단적)</td>
                  <td className="py-2.5 text-right text-slate-600 font-semibold">5,000만 ~ 1억원</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3">
              혼인기간 10년 내외, 중위 재산 기준. 혼인기간·재산·자녀 등에 따라 달라집니다.
            </p>
          </div>

          {/* 혼인기간별 기본 범위표 */}
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">혼인기간별 위자료 기본 범위</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-left text-xs text-gray-500">혼인기간</th>
                  <th className="py-2 text-right text-xs text-gray-500">최소</th>
                  <th className="py-2 text-right text-xs text-gray-500">최대</th>
                </tr>
              </thead>
              <tbody>
                {BASE_RANGES.map((r, i) => (
                  <tr key={i} className={`border-b border-slate-200/50 ${i === result.baseRangeIdx ? 'bg-[#ec4899]/10' : ''}`}>
                    <td className="py-2.5 text-slate-600">{r.label}</td>
                    <td className="py-2.5 text-right" style={{ color: i === result.baseRangeIdx ? category.color : '#9ca3af' }}>
                      {formatWon(r.min * 10_000)}원
                    </td>
                    <td className="py-2.5 text-right" style={{ color: i === result.baseRangeIdx ? category.color : '#9ca3af' }}>
                      {formatWon(r.max * 10_000)}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-gray-500">
                법적 근거: 민법 제843조, 제806조 (이혼 시 손해배상), 대법원 87므5 판결 (종합 고려 원칙)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                실제 법원은 혼인기간, 유책 정도, 경제적 상황, 자녀 유무, 정신적 고통 등을 종합 고려합니다.
              </p>
            </div>
          </div>
        </>
      )}

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">위자료 청구 방법</h2>
        <div className="space-y-3">
          {[
            { step: '1', title: '협의이혼 시', desc: '이혼숙려기간 중 위자료 합의 → 양육비/위자료 합의서 작성' },
            { step: '2', title: '재판이혼 시', desc: '가정법원에 이혼소송 + 위자료 청구 병합' },
            { step: '3', title: '필요서류', desc: '혼인관계증명서, 유책행위 증거 (사진/메시지/녹음 등)' },
            { step: '4', title: '시효', desc: '이혼 확정일로부터 3년 이내 (민법 제843조, 제766조)' },
          ].map(item => (
            <div key={item.step} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: category.color, color: '#fff' }}>
                {item.step}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">문의: 대법원 전자가족관계등록시스템 (efamily.scourt.go.kr) | 가정법원</p>
      </div>
    </CalculatorLayout>
  );
}
