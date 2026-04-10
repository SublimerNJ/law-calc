'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'bail')!;
const category = CATEGORIES.find(c => c.id === 'traffic')!;

interface CrimeType {
  id: string;
  name: string;
  minBail: number;
  maxBail: number;
}

const CRIME_TYPES: CrimeType[] = [
  { id: 'fraud', name: '사기죄 (형법 제347조)', minBail: 3_000_000, maxBail: 30_000_000 },
  { id: 'embezzlement', name: '횡령/배임죄', minBail: 3_000_000, maxBail: 30_000_000 },
  { id: 'assault', name: '폭행/상해죄', minBail: 1_000_000, maxBail: 10_000_000 },
  { id: 'theft', name: '절도죄', minBail: 1_000_000, maxBail: 5_000_000 },
  { id: 'drunk-driving-injury', name: '음주운전 치사상', minBail: 5_000_000, maxBail: 50_000_000 },
  { id: 'drugs', name: '마약범죄', minBail: 10_000_000, maxBail: 100_000_000 },
  { id: 'sex-crime', name: '성범죄', minBail: 5_000_000, maxBail: 50_000_000 },
  { id: 'attempted-murder', name: '살인미수', minBail: 30_000_000, maxBail: 100_000_000 },
  { id: 'other', name: '기타', minBail: 1_000_000, maxBail: 10_000_000 },
];

type PriorRecord = 'none' | 'one' | 'two-plus';
type RiskLevel = 'low' | 'medium' | 'high';

interface BailResult {
  baseBail: number;
  assetBased: number;
  priorMultiplier: number;
  flightMultiplier: number;
  evidenceMultiplier: number;
  finalBail: number;
  rangeLow: number;
  rangeHigh: number;
}

function calculateBail(
  crimeId: string,
  assets: number,
  priorRecord: PriorRecord,
  flightRisk: RiskLevel,
  evidenceRisk: RiskLevel
): BailResult | null {
  const crime = CRIME_TYPES.find(c => c.id === crimeId);
  if (!crime) return null;

  // Base bail: midpoint of min-max
  const baseBail = Math.round((crime.minBail + crime.maxBail) / 2);

  // Asset-based: 10-30% of assets depending on crime severity
  const severityFactor = crime.maxBail >= 50_000_000 ? 0.3 : crime.maxBail >= 10_000_000 ? 0.2 : 0.1;
  const assetBased = Math.round(assets * severityFactor);

  // Use the higher of base or asset-based
  let amount = Math.max(baseBail, assetBased);

  // Prior record multiplier
  const priorMultiplier = priorRecord === 'two-plus' ? 2.0 : priorRecord === 'one' ? 1.5 : 1.0;

  // Flight risk multiplier
  const flightMultiplier = flightRisk === 'high' ? 1.8 : flightRisk === 'medium' ? 1.3 : 1.0;

  // Evidence destruction risk multiplier
  const evidenceMultiplier = evidenceRisk === 'high' ? 1.5 : evidenceRisk === 'medium' ? 1.2 : 1.0;

  let finalBail = Math.round(amount * priorMultiplier * flightMultiplier * evidenceMultiplier);

  // Cap at 500M (실무상 참고치 — 형사소송법에 보석금 상한 명문 규정 없음)
  const CAP = 500_000_000;
  if (finalBail > CAP) finalBail = CAP;

  // Range: 80% ~ 120%
  const rangeLow = Math.round(finalBail * 0.8);
  const rangeHigh = Math.min(Math.round(finalBail * 1.2), CAP);

  return {
    baseBail,
    assetBased,
    priorMultiplier,
    flightMultiplier,
    evidenceMultiplier,
    finalBail,
    rangeLow,
    rangeHigh,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function BailPage() {
  const [crimeId, setCrimeId] = useState(CRIME_TYPES[0].id);
  const [assets, setAssets] = useState('');
  const [priorRecord, setPriorRecord] = useState<PriorRecord>('none');
  const [flightRisk, setFlightRisk] = useState<RiskLevel>('low');
  const [evidenceRisk, setEvidenceRisk] = useState<RiskLevel>('low');
  const [result, setResult] = useState<BailResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);
    const assetVal = parseInt(assets.replace(/,/g, ''), 10) || 0;

    // INPUT-03: 재산 100억 초과 경고
    if (assets && assetVal > 10_000_000_000) {
      setWarning('재산이 100억원을 초과합니다. 입력값을 확인해주세요.');
    }

    setResult(calculateBail(crimeId, assetVal, priorRecord, flightRisk, evidenceRisk));
  };

  const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAssets(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">죄의 종류</label>
          <select
            value={crimeId}
            onChange={e => setCrimeId(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          >
            {CRIME_TYPES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">피의자/피고인 재산 (원, 선택)</label>
          <input
            type="text"
            inputMode="numeric"
            value={assets ? parseInt(assets).toLocaleString('ko-KR') : ''}
            onChange={handleAssetsChange}
            placeholder="예: 100,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">재산이 없거나 불명확한 경우 비워두면 죄종 기준값으로 계산합니다.</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">전과 여부</label>
          <div className="flex gap-4 flex-wrap">
            {([
              { value: 'none' as const, label: '없음' },
              { value: 'one' as const, label: '동종 전과 1회' },
              { value: 'two-plus' as const, label: '동종 전과 2회 이상' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priorRecord"
                  checked={priorRecord === opt.value}
                  onChange={() => setPriorRecord(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">도주 위험성</label>
          <div className="flex gap-4">
            {([
              { value: 'low' as const, label: '낮음' },
              { value: 'medium' as const, label: '보통' },
              { value: 'high' as const, label: '높음' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="flightRisk"
                  checked={flightRisk === opt.value}
                  onChange={() => setFlightRisk(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">증거인멸 위험</label>
          <div className="flex gap-4">
            {([
              { value: 'low' as const, label: '낮음' },
              { value: 'medium' as const, label: '보통' },
              { value: 'high' as const, label: '높음' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="evidenceRisk"
                  checked={evidenceRisk === opt.value}
                  onChange={() => setEvidenceRisk(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">예상 보석금 범위</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.rangeLow)}원 ~ {formatNumber(result.rangeHigh)}원
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-2">
              <p className="text-sm text-slate-600 font-semibold mb-2">산정 근거</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-slate-600">기준 보석금 (죄종 중간값)</span>
                <span className="text-slate-900 text-right">{formatNumber(result.baseBail)}원</span>
                <span className="text-slate-600">재산 기준값</span>
                <span className="text-slate-900 text-right">{formatNumber(result.assetBased)}원</span>
                <span className="text-slate-600">전과 가중</span>
                <span className="text-slate-900 text-right">x{result.priorMultiplier}</span>
                <span className="text-slate-600">도주 위험 가중</span>
                <span className="text-slate-900 text-right">x{result.flightMultiplier}</span>
                <span className="text-slate-600">증거인멸 위험 가중</span>
                <span className="text-slate-900 text-right">x{result.evidenceMultiplier}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-700 font-semibold">
                실제 보석금은 법원의 재량에 따라 크게 다를 수 있습니다. 이 계산기는 실무상 참고 기준에 따른 예상치이며, 법적 효력이 없습니다.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`기본보석금(죄종 중간값) vs 재산기준값 → 높은 값 선택
× 전과 가중배율 × 도주위험 배율 × 증거인멸 배율
= 예상 보석금 (실무상 참고 상한 5억원 — 법정 상한 없음)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 형사소송법 제94조(보석), 제95조(필요적 보석), 제96조(임의적 보석), 제99조(보석 조건), 제102조(보석 취소), 제103조(보증금 몰취). 보석금은 법원이 피고인의 자력, 범죄의 성질과 정상, 피해자 위해 가능성 등을 고려하여 결정합니다(제99조 제1항).
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">보석 신청 안내</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '신청', desc: '변호인 또는 본인이 법원에 보석허가청구서 제출' },
              { step: '2', title: '법원 고려 요소', desc: '도주 위험, 증거 인멸 우려, 피해자 위해 가능성' },
              { step: '3', title: '보석 거부 가능', desc: '중범죄, 도주 위험 높은 경우 법원이 보석을 거부할 수 있음' },
              { step: '4', title: '보석 허가 시', desc: '조건부 석방 (출국금지, 주거제한 등)' },
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
          <p className="text-xs text-gray-500 mt-4">법적 근거: 형사소송법 제94조(보석), 제95조(필요적 보석), 제96조(임의적 보석), 제99조(보석 조건), 제102조(보석 취소), 제103조(보증금 몰취) | 보석 관련 문의는 담당 변호인과 상담하세요</p>
        </div>
      )}

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="bail" />
        </div>
      )}
    </CalculatorLayout>
  );
}
