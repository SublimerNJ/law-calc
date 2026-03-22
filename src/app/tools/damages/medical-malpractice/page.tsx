'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'medical-malpractice')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type ConsolationPreset = 'death' | 'severe' | 'mild' | 'custom';

const CONSOLATION_PRESETS: Record<Exclude<ConsolationPreset, 'custom'>, number> = {
  'death': 100_000_000,
  'severe': 30_000_000,
  'mild': 10_000_000,
};

export default function MedicalMalpracticePage() {
  const [treatmentCost, setTreatmentCost] = useState('');
  const [futureTreatmentCost, setFutureTreatmentCost] = useState('');
  const [lostIncome, setLostIncome] = useState('');
  const [doctorFault, setDoctorFault] = useState('');
  const [hasDisability, setHasDisability] = useState(false);
  const [disabilityRate, setDisabilityRate] = useState('');
  const [consolationPreset, setConsolationPreset] = useState<ConsolationPreset>('severe');
  const [customConsolation, setCustomConsolation] = useState('');
  const [result, setResult] = useState<{
    propertyDamage: number;
    consolation: number;
    total: number;
  } | null>(null);

  const getConsolationBase = (): number => {
    if (consolationPreset === 'custom') {
      return parseInt(customConsolation.replace(/[^0-9]/g, ''), 10) || 0;
    }
    return CONSOLATION_PRESETS[consolationPreset];
  };

  const handleCalculate = () => {
    const treatment = parseInt(treatmentCost.replace(/[^0-9]/g, ''), 10) || 0;
    const future = parseInt(futureTreatmentCost.replace(/[^0-9]/g, ''), 10) || 0;
    const lost = parseInt(lostIncome.replace(/[^0-9]/g, ''), 10) || 0;
    const fault = parseFloat(doctorFault) || 0;

    if (fault <= 0) return;

    const propertyDamage = Math.floor((treatment + future + lost) * (fault / 100));

    let consolation = 0;
    if (hasDisability) {
      const disRate = parseFloat(disabilityRate) || 0;
      consolation = Math.floor(getConsolationBase() * (disRate / 100) * (fault / 100));
    }

    const total = propertyDamage + consolation;
    setResult({ propertyDamage, consolation, total });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">기지출 치료비 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={treatmentCost ? parseInt(treatmentCost).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setTreatmentCost)}
            placeholder="예: 5,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">향후 치료비 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={futureTreatmentCost ? parseInt(futureTreatmentCost).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setFutureTreatmentCost)}
            placeholder="예: 3,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">일실수입 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={lostIncome ? parseInt(lostIncome).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setLostIncome)}
            placeholder="예: 10,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">의사 과실비율 (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={doctorFault}
            onChange={(e) => setDoctorFault(e.target.value)}
            placeholder="0 ~ 100"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasDisability}
              onChange={(e) => setHasDisability(e.target.checked)}
              className="accent-[#f97316]"
            />
            <span className="text-sm text-gray-300">후유장해 있음</span>
          </label>
        </div>

        {hasDisability && (
          <div className="mb-4 ml-6 space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">후유장해율 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={disabilityRate}
                onChange={(e) => setDisabilityRate(e.target.value)}
                placeholder="0 ~ 100"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">위자료 기준액</label>
              <select
                value={consolationPreset}
                onChange={(e) => setConsolationPreset(e.target.value as ConsolationPreset)}
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
              >
                <option value="death">사망 (1억원)</option>
                <option value="severe">중상해 (3,000만원)</option>
                <option value="mild">경상해 (1,000만원)</option>
                <option value="custom">직접 입력</option>
              </select>
            </div>
            {consolationPreset === 'custom' && (
              <input
                type="text"
                inputMode="numeric"
                value={customConsolation ? parseInt(customConsolation).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setCustomConsolation)}
                placeholder="위자료 기준액 입력"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
              />
            )}
          </div>
        )}

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
            <p className="text-sm text-gray-400 mb-1">재산상 손해 배상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.propertyDamage)}원
            </p>
          </div>

          {hasDisability && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">후유장해 위자료</p>
              <p className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.consolation)}원
              </p>
            </div>
          )}

          <div className="mb-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-sm text-gray-400 mb-1">총 배상액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 의료법, 민법 제750조, 의료사고 피해구제 및 의료분쟁 조정 등에 관한 법률
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
