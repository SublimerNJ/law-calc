'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'stamp-fee')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

type CaseType = 'property' | 'non-property';
type CourtLevel = 1 | 2 | 3;
type FilingMethod = 'offline' | 'ecourt';

const LEVEL_LABELS: Record<CourtLevel, string> = { 1: '1심', 2: '항소심', 3: '상고심' };
const LEVEL_MULTIPLIERS: Record<CourtLevel, number> = { 1: 1, 2: 1.5, 3: 2 };

const NON_PROPERTY_FEES: Record<CourtLevel, number> = { 1: 20_000, 2: 30_000, 3: 40_000 };

const BRACKETS = [
  { max: 10_000_000, label: '1,000만원 이하', formula: '소가 × 0.5%', rate: 0.005, base: 0, prevMax: 0 },
  { max: 100_000_000, label: '1,000만원 초과 ~ 1억원', formula: '소가 × 0.45% + 5,000원', rate: 0.0045, base: 5_000, prevMax: 0 },
  { max: 1_000_000_000, label: '1억원 초과 ~ 10억원', formula: '소가 × 0.4% + 55,000원', rate: 0.004, base: 55_000, prevMax: 0 },
  { max: Infinity, label: '10억원 초과', formula: '소가 × 0.35% + 555,000원', rate: 0.0035, base: 555_000, prevMax: 0 },
];

function calculatePropertyStampFee(amount: number): { fee: number; bracketIdx: number; formulaDetail: string } {
  for (let i = 0; i < BRACKETS.length; i++) {
    if (amount <= BRACKETS[i].max || i === BRACKETS.length - 1) {
      const b = BRACKETS[i];
      let fee = amount * b.rate + b.base;
      if (i === 0 && fee < 1_000) fee = 1_000;
      fee = Math.ceil(fee / 100) * 100;

      const formulaDetail = b.base > 0
        ? `${formatNumber(amount)} × ${b.rate * 100}% + ${formatNumber(b.base)} = ${formatNumber(fee)}`
        : `${formatNumber(amount)} × ${b.rate * 100}% = ${formatNumber(fee)}`;

      return { fee, bracketIdx: i, formulaDetail };
    }
  }
  return { fee: 0, bracketIdx: 0, formulaDetail: '' };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface CalcResult {
  caseType: CaseType;
  baseFee: number;
  levelMultiplier: number;
  levelFee: number;
  ecourtFee: number;
  ecourtDiscount: number;
  bracketIdx: number;
  formulaDetail: string;
  allLevels: { level: CourtLevel; label: string; offlineFee: number; ecourtFee: number }[];
}

export default function StampFeePage() {
  const [amount, setAmount] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('property');
  const [level, setLevel] = useState<CourtLevel>(1);
  const [filingMethod, setFilingMethod] = useState<FilingMethod>('offline');
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleCalculate = () => {
    if (caseType === 'non-property') {
      const allLevels = ([1, 2, 3] as CourtLevel[]).map(l => {
        const offlineFee = NON_PROPERTY_FEES[l];
        const ecourtFee = Math.max(1_000, Math.ceil(offlineFee * 0.9 / 100) * 100);
        return { level: l, label: LEVEL_LABELS[l], offlineFee, ecourtFee };
      });
      const selected = allLevels.find(l => l.level === level)!;
      setResult({
        caseType: 'non-property',
        baseFee: NON_PROPERTY_FEES[1],
        levelMultiplier: 1,
        levelFee: selected.offlineFee,
        ecourtFee: selected.ecourtFee,
        ecourtDiscount: selected.offlineFee - selected.ecourtFee,
        bracketIdx: -1,
        formulaDetail: `비재산권 소송 ${LEVEL_LABELS[level]} 고정 인지대: ${formatNumber(selected.offlineFee)}원`,
        allLevels,
      });
      return;
    }

    const val = parseInt(amount.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;

    const { fee: baseFee, bracketIdx, formulaDetail: baseFormula } = calculatePropertyStampFee(val);

    const allLevels = ([1, 2, 3] as CourtLevel[]).map(l => {
      const offlineFee = Math.ceil((baseFee * LEVEL_MULTIPLIERS[l]) / 100) * 100;
      const ecourtFee = Math.max(1_000, Math.ceil(offlineFee * 0.9 / 100) * 100);
      return { level: l, label: LEVEL_LABELS[l], offlineFee, ecourtFee };
    });

    const selected = allLevels.find(l => l.level === level)!;
    let formulaDetail = baseFormula;
    if (level > 1) {
      formulaDetail += `\n× ${LEVEL_MULTIPLIERS[level]} (${LEVEL_LABELS[level]}) = ${formatNumber(selected.offlineFee)}`;
    }

    setResult({
      caseType: 'property',
      baseFee,
      levelMultiplier: LEVEL_MULTIPLIERS[level],
      levelFee: selected.offlineFee,
      ecourtFee: selected.ecourtFee,
      ecourtDiscount: selected.offlineFee - selected.ecourtFee,
      bracketIdx,
      formulaDetail,
      allLevels,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">사건 유형</label>
          <div className="flex gap-4">
            {([
              { value: 'property' as CaseType, label: '재산권 소송', desc: '금전·부동산 등 재산 관련' },
              { value: 'non-property' as CaseType, label: '비재산권 소송', desc: '이혼·친권·확인소송 등' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="caseType"
                  checked={caseType === opt.value}
                  onChange={() => { setCaseType(opt.value); setResult(null); }}
                  className="accent-[#3b82f6]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {caseType === 'property'
              ? '소가(청구금액)에 따라 인지대가 달라집니다'
              : '사건 유형에 관계없이 심급별 고정 금액입니다'}
          </p>
        </div>

        {caseType === 'property' && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">소가 (원)</label>
            <p className="text-xs text-gray-500 mb-1">소가 = 소송에서 청구하는 금액 (원금 기준)</p>
            <input
              type="text"
              inputMode="numeric"
              value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
              onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="예: 50,000,000"
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">심급</label>
          <div className="flex gap-4">
            {([1, 2, 3] as CourtLevel[]).map(l => (
              <label key={l} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="level" checked={level === l} onChange={() => setLevel(l)} className="accent-[#3b82f6]" />
                <span className="text-sm text-gray-300">
                  {LEVEL_LABELS[l]}{caseType === 'property' && l > 1 ? ` (×${LEVEL_MULTIPLIERS[l]})` : ''}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">접수 방법</label>
          <div className="flex gap-4">
            {([
              { value: 'offline' as FilingMethod, label: '오프라인 (법원 창구)' },
              { value: 'ecourt' as FilingMethod, label: '전자소송 (인터넷, -10%)' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="filing" checked={filingMethod === opt.value} onChange={() => setFilingMethod(opt.value)} className="accent-[#3b82f6]" />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: category.color }}>
          계산하기
        </button>
      </div>

      {result && (
        <>
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">{LEVEL_LABELS[level]} 인지대 ({filingMethod === 'ecourt' ? '전자소송' : '오프라인'})</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(filingMethod === 'ecourt' ? result.ecourtFee : result.levelFee)}원
              </p>
            </div>

            {filingMethod === 'ecourt' && result.ecourtDiscount > 0 && (
              <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-green-400">
                  전자소송 할인: -{formatNumber(result.ecourtDiscount)}원 (오프라인 대비)
                </p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">계산식</p>
              <pre className="text-xs text-gray-300 bg-[#0d1424] p-3 rounded-lg whitespace-pre-wrap font-mono">
                {result.formulaDetail}
                {filingMethod === 'ecourt' ? `\n× 0.9 (전자소송 10% 할인) = ${formatNumber(result.ecourtFee)}` : ''}
              </pre>
            </div>

            {result.bracketIdx >= 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-400 mb-1">적용 구간</p>
                <p className="text-sm text-gray-300">{BRACKETS[result.bracketIdx].label}</p>
              </div>
            )}
          </div>

          {/* 전 심급 비교 */}
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-white mb-4">전 심급 인지대 비교</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e2d4a]">
                  <th className="py-2 text-left text-xs text-gray-500">심급</th>
                  {caseType === 'property' && <th className="py-2 text-left text-xs text-gray-500">배율</th>}
                  <th className="py-2 text-right text-xs text-gray-500">오프라인</th>
                  <th className="py-2 text-right text-xs text-gray-500">전자소송</th>
                </tr>
              </thead>
              <tbody>
                {result.allLevels.map(row => (
                  <tr key={row.level} className={`border-b border-[#1e2d4a]/50 ${row.level === level ? 'bg-[#3b82f6]/10' : ''}`}>
                    <td className="py-3 text-gray-300">{row.label}</td>
                    {caseType === 'property' && <td className="py-3 text-gray-400">×{LEVEL_MULTIPLIERS[row.level]}</td>}
                    <td className="py-3 text-right" style={{ color: row.level === level && filingMethod === 'offline' ? category.color : '#e5e7eb' }}>
                      {formatNumber(row.offlineFee)}원
                    </td>
                    <td className="py-3 text-right" style={{ color: row.level === level && filingMethod === 'ecourt' ? category.color : '#e5e7eb' }}>
                      {formatNumber(row.ecourtFee)}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 인지대 기준표 (재산권만) */}
          {caseType === 'property' && (
            <div className="premium-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">인지대 기준표 (1심 기준)</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e2d4a]">
                    <th className="py-2 text-left text-xs text-gray-500">소가 구간</th>
                    <th className="py-2 text-right text-xs text-gray-500">계산식</th>
                  </tr>
                </thead>
                <tbody>
                  {BRACKETS.map((b, i) => (
                    <tr key={i} className={`border-b border-[#1e2d4a]/50 ${i === result.bracketIdx ? 'bg-[#3b82f6]/10' : ''}`}>
                      <td className="py-2.5 text-gray-300">{b.label}</td>
                      <td className="py-2.5 text-right text-xs" style={{ color: i === result.bracketIdx ? category.color : '#9ca3af' }}>{b.formula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
                <p className="text-xs text-gray-500">법적 근거: 민사소송등인지법 별표 | 100원 미만 올림 | 최소 1,000원</p>
                <p className="text-xs text-gray-500 mt-1">전자소송 할인: 민사소송 등에서의 전자문서 이용 등에 관한 법률</p>
              </div>
            </div>
          )}

          {caseType === 'non-property' && (
            <div className="premium-card p-6">
              <h2 className="text-lg font-semibold text-white mb-4">비재산권 소송 인지대 안내</h2>
              <p className="text-xs text-gray-400 mb-3">비재산권 소송은 소가에 관계없이 심급별 고정 인지대가 적용됩니다.</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>1심: {formatNumber(NON_PROPERTY_FEES[1])}원</li>
                <li>항소심: {formatNumber(NON_PROPERTY_FEES[2])}원</li>
                <li>상고심: {formatNumber(NON_PROPERTY_FEES[3])}원</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">해당 사건: 이혼, 친권, 확인소송, 비금전적 청구 등</p>
              <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
                <p className="text-xs text-gray-500">법적 근거: 민사소송등인지법 제2조제4항</p>
              </div>
            </div>
          )}
        </>
      )}
    </CalculatorLayout>
  );
}
