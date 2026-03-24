'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'alimony')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type FaultType = 'affair' | 'violence' | 'abandonment' | 'other';
type AssetLevel = 'high' | 'mid' | 'low';

const FAULT_LABELS: Record<FaultType, string> = {
  affair: '외도/불륜',
  violence: '가정폭력',
  abandonment: '유기/악의적 유기',
  other: '성격차이/기타',
};

const FAULT_MULTIPLIERS: Record<FaultType, number> = {
  affair: 1.5, violence: 1.3, abandonment: 1.2, other: 0.7,
};

const ASSET_LABELS: Record<AssetLevel, string> = {
  high: '상위 (3억 이상)', mid: '중위 (1~3억)', low: '하위 (1억 미만)',
};

const ASSET_FACTORS: Record<AssetLevel, number> = {
  high: 1.2, mid: 1.0, low: 0.9,
};

// 판례 경향 기반 기본 범위 (일반적 상한 3,000만~5,000만원, 특별한 사정 시 초과 가능)
const BASE_RANGES: { maxYears: number; label: string; min: number; max: number }[] = [
  { maxYears: 1, label: '1년 미만', min: 3_000_000, max: 10_000_000 },
  { maxYears: 5, label: '1~5년', min: 5_000_000, max: 20_000_000 },
  { maxYears: 10, label: '5~10년', min: 10_000_000, max: 30_000_000 },
  { maxYears: 20, label: '10~20년', min: 15_000_000, max: 50_000_000 },
  { maxYears: Infinity, label: '20년 이상', min: 20_000_000, max: 50_000_000 },
];

function getBaseRange(years: number): { idx: number; min: number; max: number } {
  for (let i = 0; i < BASE_RANGES.length; i++) {
    if (years < BASE_RANGES[i].maxYears || i === BASE_RANGES.length - 1) {
      return { idx: i, min: BASE_RANGES[i].min, max: BASE_RANGES[i].max };
    }
  }
  return { idx: 0, min: BASE_RANGES[0].min, max: BASE_RANGES[0].max };
}

interface AlimonyResult {
  estimate: number;
  minRange: number;
  maxRange: number;
  baseRangeIdx: number;
  faultMult: number;
  assetFact: number;
  childFact: number;
  baseMin: number;
  baseMax: number;
}

function calculateAlimony(years: number, fault: FaultType, asset: AssetLevel, hasChildren: boolean): AlimonyResult {
  const { idx, min: baseMin, max: baseMax } = getBaseRange(years);
  const faultMult = FAULT_MULTIPLIERS[fault];
  const assetFact = ASSET_FACTORS[asset];
  const childFact = hasChildren ? 1.1 : 1.0;

  const minRange = Math.floor(baseMin * faultMult * assetFact * childFact);
  const maxRange = Math.floor(baseMax * faultMult * assetFact * childFact);
  const estimate = Math.floor((minRange + maxRange) / 2);

  return { estimate, minRange, maxRange, baseRangeIdx: idx, faultMult, assetFact, childFact, baseMin, baseMax };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function formatWon(n: number): string {
  if (n >= 100_000_000) return `${(n / 100_000_000).toFixed(1)}억`;
  if (n >= 10_000) return `${(n / 10_000).toFixed(0)}만`;
  return formatNumber(n);
}

export default function AlimonyPage() {
  const [years, setYears] = useState('');
  const [fault, setFault] = useState<FaultType>('affair');
  const [asset, setAsset] = useState<AssetLevel>('mid');
  const [hasChildren, setHasChildren] = useState(false);
  const [result, setResult] = useState<AlimonyResult | null>(null);

  const handleCalculate = () => {
    const y = parseInt(years, 10);
    if (isNaN(y) || y < 0) return;
    setResult(calculateAlimony(y, fault, asset, hasChildren));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-600">
            💡 위자료는 법원이 개별 사안을 종합적으로 판단합니다. 이 계산기는 <strong className="text-slate-600">판례 기반 예상 범위</strong>를 제공하며, 실제 법원 결정과 차이가 있을 수 있습니다.
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
          <label className="block text-sm text-slate-600 mb-2">주요 유책사유</label>
          <div className="flex flex-col gap-2">
            {(Object.entries(FAULT_LABELS) as [FaultType, string][]).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="fault" checked={fault === key} onChange={() => setFault(key)} className="accent-[#ec4899]" />
                <span className="text-sm text-slate-600">{label}</span>
                <span className="text-xs text-gray-500">(×{FAULT_MULTIPLIERS[key]})</span>
              </label>
            ))}
          </div>
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
            <span className="text-xs text-gray-500">(있으면 ×1.1)</span>
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

적용 배율:
  유책사유 (${FAULT_LABELS[fault]}): ×${result.faultMult}
  재산규모 (${ASSET_LABELS[asset]}): ×${result.assetFact}${hasChildren ? `\n  미성년 자녀: ×${result.childFact}` : ''}

최종 범위:
  ${formatWon(result.baseMin)} × ${result.faultMult} × ${result.assetFact}${hasChildren ? ` × ${result.childFact}` : ''} = ${formatNumber(result.minRange)}
  ${formatWon(result.baseMax)} × ${result.faultMult} × ${result.assetFact}${hasChildren ? ` × ${result.childFact}` : ''} = ${formatNumber(result.maxRange)}`}
              </pre>
            </div>
          </div>

          {/* 혼인기간별 기본 범위표 */}
          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">혼인기간별 위자료 기본 범위 (판례 기준)</h2>

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
                      {formatWon(r.min)}원
                    </td>
                    <td className="py-2.5 text-right" style={{ color: i === result.baseRangeIdx ? category.color : '#9ca3af' }}>
                      {formatWon(r.max)}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-gray-500">
                법적 근거: 민법 제843조, 제806조 (손해배상). 기본 범위는 판례 분석 기반 참고 수치입니다.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                실제 법원은 혼인기간, 유책 정도, 경제적 상황, 자녀 유무, 정신적 고통 등을 종합 고려합니다.
              </p>
            </div>
          </div>
        </>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">위자료 청구 방법</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '협의이혼 시', desc: '이혼숙려기간 중 위자료 합의 → 양육비/위자료 합의서 작성' },
              { step: '2', title: '재판이혼 시', desc: '가정법원에 이혼소송 + 위자료 청구 병합' },
              { step: '3', title: '필요서류', desc: '혼인관계증명서, 유책행위 증거 (사진/메시지/녹음 등)' },
              { step: '4', title: '시효', desc: '이혼 확정일로부터 3년 이내' },
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
          <p className="text-xs text-gray-500 mt-4">문의: 대법원 전자가족관계등록시스템 (www.efamily.scourt.go.kr) | 가정법원</p>
        </div>
      )}
    </CalculatorLayout>
  );
}
