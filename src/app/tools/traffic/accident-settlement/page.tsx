'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'accident-settlement')!;
const category = CATEGORIES.find(c => c.id === 'traffic')!;

const DISABILITY_SOLATIUM: Record<number, number> = {
  1: 80_000_000, 2: 70_000_000, 3: 60_000_000, 4: 50_000_000,
  5: 40_000_000, 6: 30_000_000, 7: 25_000_000, 8: 20_000_000,
  9: 15_000_000, 10: 12_000_000, 11: 9_000_000, 12: 6_000_000,
  13: 5_500_000, 14: 5_000_000,
};

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface CalculationResult {
  medicalCost: number;
  lostWages: number;
  hospitalizationSolatium: number;
  outpatientSolatium: number;
  disabilitySolatium: number;
  totalSolatium: number;
  subtotal: number;
  faultDeduction: number;
  finalAmount: number;
  faultPercent: number;
}

export default function AccidentSettlementPage() {
  const [medicalCost, setMedicalCost] = useState('');
  const [hospitalizationDays, setHospitalizationDays] = useState('');
  const [outpatientDays, setOutpatientDays] = useState('');
  const [disabilityGrade, setDisabilityGrade] = useState(0);
  const [lostWages, setLostWages] = useState('');
  const [faultPercent, setFaultPercent] = useState('0');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const medical = parseInt(medicalCost.replace(/[^0-9]/g, ''), 10) || 0;

    // INPUT-02: 치료비 필수
    if (!medicalCost || medical <= 0) {
      setError('치료비를 입력해주세요.');
      setResult(null);
      return;
    }

    // INPUT-03: 치료비 100억 초과 경고 (계산 허용)
    if (medical > 10_000_000_000) {
      setWarning('치료비가 100억원을 초과합니다. 입력값을 확인해주세요.');
    }

    const hospDays = parseInt(hospitalizationDays, 10) || 0;
    const outDays = parseInt(outpatientDays, 10) || 0;
    const fault = Math.min(100, Math.max(0, parseInt(faultPercent, 10) || 0));

    const lost = parseInt(lostWages.replace(/[^0-9]/g, ''), 10) || 0;
    const hospitalizationSolatium = 85_000 * hospDays;
    const outpatientSolatium = 45_000 * outDays;
    const disabilitySolatium = disabilityGrade > 0 ? (DISABILITY_SOLATIUM[disabilityGrade] || 0) : 0;
    const totalSolatium = hospitalizationSolatium + outpatientSolatium + disabilitySolatium;
    const subtotal = medical + lost + totalSolatium;
    const faultDeduction = Math.floor(subtotal * (fault / 100));
    const finalAmount = subtotal - faultDeduction;

    setResult({
      medicalCost: medical,
      lostWages: lost,
      hospitalizationSolatium,
      outpatientSolatium,
      disabilitySolatium,
      totalSolatium,
      subtotal,
      faultDeduction,
      finalAmount,
      faultPercent: fault,
    });
  };

  const handleNumberInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">치료비 (원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={medicalCost ? parseInt(medicalCost).toLocaleString('ko-KR') : ''}
            onChange={handleNumberInput(setMedicalCost)}
            placeholder="예: 5,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">일실수입 / 휴업손해 (원, 선택)</label>
          <input
            type="text"
            inputMode="numeric"
            value={lostWages ? parseInt(lostWages).toLocaleString('ko-KR') : ''}
            onChange={handleNumberInput(setLostWages)}
            placeholder="사고로 못 번 소득 (없으면 비워두세요)"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">월급 ÷ 30 × 치료일수로 계산. 자영업자는 매출 감소분.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">입원일수 (일) *</label>
            <input
              type="text"
              inputMode="numeric"
              value={hospitalizationDays}
              onChange={handleNumberInput(setHospitalizationDays)}
              placeholder="0"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">통원일수 (일) *</label>
            <input
              type="text"
              inputMode="numeric"
              value={outpatientDays}
              onChange={handleNumberInput(setOutpatientDays)}
              placeholder="0"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">후유장해 등급</label>
          <select
            value={disabilityGrade}
            onChange={(e) => setDisabilityGrade(parseInt(e.target.value, 10))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
          >
            <option value={0}>없음</option>
            {Array.from({ length: 14 }, (_, i) => i + 1).map(grade => (
              <option key={grade} value={grade}>
                {grade}급 (위자료 {formatNumber(DISABILITY_SOLATIUM[grade])}원)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">
            피해자 과실비율: {faultPercent}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={faultPercent}
            onChange={(e) => setFaultPercent(e.target.value)}
            className="w-full accent-[#ef4444]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button aria-label="Action button"
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

          {result.finalAmount === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">합의금이 0원으로 계산되었습니다. 과실비율 또는 손해항목을 확인해주세요.</p>
            </div>
          )}

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">치료비</span>
              <span className="text-slate-900">{formatNumber(result.medicalCost)}원</span>
            </div>
            {result.lostWages > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">일실수입 (휴업손해)</span>
                <span className="text-slate-900">{formatNumber(result.lostWages)}원</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">입원 위자료 (85,000원/일)</span>
              <span className="text-slate-900">{formatNumber(result.hospitalizationSolatium)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">통원 위자료 (45,000원/일)</span>
              <span className="text-slate-900">{formatNumber(result.outpatientSolatium)}원</span>
            </div>
            {result.disabilitySolatium > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">후유장해 위자료</span>
                <span className="text-slate-900">{formatNumber(result.disabilitySolatium)}원</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-3">
              <span className="text-sm text-slate-600">소계</span>
              <span className="text-slate-900 font-semibold">{formatNumber(result.subtotal)}원</span>
            </div>
            {result.faultPercent > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">과실상계 (-{result.faultPercent}%)</span>
                <span className="text-red-600">-{formatNumber(result.faultDeduction)}원</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-1">최종 합의금 (예상)</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.finalAmount)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">치료비 + 위자료 - 과실상계 = 합의금</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 자동차손해배상 보장법 제3조(운행자 책임), 민법 제396조(과실상계), 민법 제750조(불법행위 손해배상)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              위자료 기준액은 2026년 참고 기준이며, 실제 합의금은 상해 정도, 후유장해, 과실 등에 따라 크게 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="accident-settlement" />
        </div>
      )}
    </CalculatorLayout>
  );
}
