'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'drunk-driving')!;
const category = CATEGORIES.find(c => c.id === 'traffic')!;

type MeasurementMethod = 'breath' | 'blood';
type PriorRecord = 'none' | 'once' | 'twice-plus';

interface PenaltyResult {
  bac: number;
  level: string;
  levelColor: string;
  adminPenalty: string;
  criminalPenalty: string;
  priorWarning: string | null;
  accidentWarning: string | null;
}

function getPenalty(
  bac: number,
  method: MeasurementMethod,
  hasInjury: boolean,
  hasPropertyDamage: boolean,
  priorRecord: PriorRecord,
): PenaltyResult {
  let level: string;
  let levelColor: string;
  let adminPenalty: string;
  let criminalPenalty: string;

  if (bac < 0.03) {
    level = '처벌 없음';
    levelColor = '#10b981';
    adminPenalty = '해당 없음';
    criminalPenalty = '해당 없음';
  } else if (bac < 0.08) {
    level = '면허정지';
    levelColor = '#f59e0b';
    adminPenalty = '면허정지 (벌점 100점)';
    criminalPenalty = '1년 이하 징역 또는 500만원 이하 벌금';
  } else if (bac < 0.2) {
    level = '면허취소';
    levelColor = '#ef4444';
    adminPenalty = '면허취소 (결격기간 1년)';
    criminalPenalty = '1년 이상 2년 이하 징역 또는 500만원 이상 1,000만원 이하 벌금';
  } else {
    level = '면허취소 (가중)';
    levelColor = '#991b1b';
    adminPenalty = '면허취소 (결격기간 2년)';
    criminalPenalty = '2년 이상 5년 이하 징역 또는 1,000만원 이상 2,000만원 이하 벌금';
  }

  let priorWarning: string | null = null;
  if (priorRecord === 'once') {
    priorWarning = '1회 전력: 가중처벌 대상입니다. 형사처벌이 상향될 수 있습니다.';
  } else if (priorRecord === 'twice-plus') {
    priorWarning = '2회 이상 전력: 특정범죄가중처벌법 적용 대상입니다. 2년 이상 5년 이하 징역 또는 1,000만원 이상 2,000만원 이하 벌금이 부과됩니다.';
    if (bac >= 0.03) {
      criminalPenalty = '2년 이상 5년 이하 징역 또는 1,000만원 이상 2,000만원 이하 벌금 (가중)';
      levelColor = '#991b1b';
    }
  }

  let accidentWarning: string | null = null;
  if (hasInjury && bac >= 0.03) {
    accidentWarning = '인사사고 발생: 특정범죄가중처벌법(위험운전치상) 적용. 1년 이상 15년 이하 징역 또는 1,000만원 이상 3,000만원 이하 벌금.';
    levelColor = '#991b1b';
  } else if (hasPropertyDamage && bac >= 0.03) {
    accidentWarning = '재물손괴 발생: 도로교통법상 음주운전 + 교통사고처리특례법 적용. 형사처벌이 가중될 수 있습니다.';
  }

  return {
    bac,
    level,
    levelColor,
    adminPenalty,
    criminalPenalty,
    priorWarning,
    accidentWarning,
  };
}

export default function DrunkDrivingPage() {
  const [bac, setBac] = useState('');
  const [method, setMethod] = useState<MeasurementMethod>('breath');
  const [hasInjury, setHasInjury] = useState(false);
  const [hasPropertyDamage, setHasPropertyDamage] = useState(false);
  const [priorRecord, setPriorRecord] = useState<PriorRecord>('none');
  const [result, setResult] = useState<PenaltyResult | null>(null);

  const handleCalculate = () => {
    const bacValue = parseFloat(bac);
    if (isNaN(bacValue) || bacValue < 0 || bacValue > 0.4) return;
    setResult(getPenalty(bacValue, method, hasInjury, hasPropertyDamage, priorRecord));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">혈중알코올농도 BAC (%)</label>
          <input
            type="number"
            step="0.001"
            min="0"
            max="0.400"
            value={bac}
            onChange={(e) => setBac(e.target.value)}
            placeholder="예: 0.050"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#ef4444] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">0.001 ~ 0.400 범위로 입력하세요</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">측정 방법</label>
          <div className="flex gap-4">
            {[
              { value: 'breath' as MeasurementMethod, label: '호흡측정' },
              { value: 'blood' as MeasurementMethod, label: '혈액검사' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  checked={method === opt.value}
                  onChange={() => setMethod(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">사고 여부</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasInjury}
                onChange={(e) => setHasInjury(e.target.checked)}
                className="accent-[#ef4444] w-4 h-4"
              />
              <span className="text-sm text-gray-300">인사사고 발생</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasPropertyDamage}
                onChange={(e) => setHasPropertyDamage(e.target.checked)}
                className="accent-[#ef4444] w-4 h-4"
              />
              <span className="text-sm text-gray-300">재물손괴</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">음주운전 전력</label>
          <div className="flex gap-4 flex-wrap">
            {[
              { value: 'none' as PriorRecord, label: '없음' },
              { value: 'once' as PriorRecord, label: '1회 전력' },
              { value: 'twice-plus' as PriorRecord, label: '2회 이상 전력' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="prior"
                  checked={priorRecord === opt.value}
                  onChange={() => setPriorRecord(opt.value)}
                  className="accent-[#ef4444]"
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
          <h2 className="text-lg font-semibold text-white mb-4">처벌 기준 결과</h2>

          <div className="mb-4">
            <span
              className="inline-block px-4 py-2 rounded-full text-white font-bold text-sm"
              style={{ backgroundColor: result.levelColor }}
            >
              {result.level}
            </span>
            <p className="text-sm text-gray-400 mt-2">혈중알코올농도: {result.bac.toFixed(3)}%</p>
          </div>

          <div className="space-y-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">행정처분</p>
              <p className="text-white">{result.adminPenalty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">형사처벌</p>
              <p className="text-white">{result.criminalPenalty}</p>
            </div>
          </div>

          {result.priorWarning && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-300 font-semibold mb-1">전력 가중</p>
              <p className="text-sm text-red-200">{result.priorWarning}</p>
            </div>
          )}

          {result.accidentWarning && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-300 font-semibold mb-1">사고 가중</p>
              <p className="text-sm text-red-200">{result.accidentWarning}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 도로교통법 제44조, 제148조의2 (2026년 기준)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
