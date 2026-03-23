'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'fault-ratio')!;
const category = CATEGORIES.find(c => c.id === 'traffic')!;

interface AccidentType {
  id: number;
  label: string;
  offenderFault: number;
  victimFault: number;
}

const ACCIDENT_TYPES: AccidentType[] = [
  { id: 1, label: '신호위반 차량 vs 직진 차량', offenderFault: 80, victimFault: 20 },
  { id: 2, label: '직진 vs 좌회전', offenderFault: 70, victimFault: 30 },
  { id: 3, label: '직진 vs 우회전', offenderFault: 60, victimFault: 40 },
  { id: 4, label: '후진 차량 vs 직진 차량', offenderFault: 90, victimFault: 10 },
  { id: 5, label: '앞차 추돌', offenderFault: 100, victimFault: 0 },
  { id: 6, label: '차선 변경 vs 직진', offenderFault: 70, victimFault: 30 },
  { id: 7, label: '교차로 동방향 직진 vs 직진', offenderFault: 50, victimFault: 50 },
  { id: 8, label: '보행자 횡단 중 충돌', offenderFault: 90, victimFault: 10 },
];

interface Modifier {
  id: string;
  label: string;
  delta: number; // positive = offender fault increases (victim favorable)
}

const MODIFIERS: Modifier[] = [
  { id: 'victim-speeding', label: '피해 차량 과속', delta: -10 },
  { id: 'offender-speeding', label: '가해 차량 현저한 과속', delta: 10 },
  { id: 'night', label: '야간 사고', delta: -5 },
  { id: 'priority-road', label: '우선도로 주행 (피해차량)', delta: 10 },
  { id: 'school-zone', label: '어린이보호구역', delta: 20 },
];

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface FaultResult {
  accidentType: AccidentType;
  baseOffender: number;
  baseVictim: number;
  adjustedOffender: number;
  adjustedVictim: number;
  appliedModifiers: Modifier[];
}

export default function FaultRatioPage() {
  const [selectedType, setSelectedType] = useState(1);
  const [activeModifiers, setActiveModifiers] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<FaultResult | null>(null);

  const toggleModifier = (id: string) => {
    setActiveModifiers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCalculate = () => {
    const accidentType = ACCIDENT_TYPES.find(a => a.id === selectedType)!;
    const appliedModifiers = MODIFIERS.filter(m => activeModifiers.has(m.id));
    const totalDelta = appliedModifiers.reduce((sum, m) => sum + m.delta, 0);

    const adjustedOffender = Math.min(100, Math.max(0, accidentType.offenderFault + totalDelta));
    const adjustedVictim = 100 - adjustedOffender;

    setResult({
      accidentType,
      baseOffender: accidentType.offenderFault,
      baseVictim: accidentType.victimFault,
      adjustedOffender,
      adjustedVictim,
      appliedModifiers,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">사고 유형</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(parseInt(e.target.value, 10))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          >
            {ACCIDENT_TYPES.map(type => (
              <option key={type.id} value={type.id}>
                {type.label} (기본: 가해 {type.offenderFault}% / 피해 {type.victimFault}%)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-3">수정 요소</label>
          <div className="space-y-2">
            {MODIFIERS.map(mod => (
              <label key={mod.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeModifiers.has(mod.id)}
                  onChange={() => toggleModifier(mod.id)}
                  className="accent-[#ef4444] w-4 h-4"
                />
                <span className="text-sm text-slate-600">
                  {mod.label}
                  <span className={`ml-2 text-xs ${mod.delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    (가해 과실 {mod.delta > 0 ? '+' : ''}{mod.delta}%)
                  </span>
                </span>
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">과실비율 결과</h2>

          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-2">사고 유형: {result.accidentType.label}</p>

            {/* Bar visualization */}
            <div className="flex rounded-lg overflow-hidden h-12 mb-4">
              <div
                className="flex items-center justify-center text-slate-900 font-bold text-sm transition-all"
                style={{
                  width: `${result.adjustedOffender}%`,
                  backgroundColor: '#ef4444',
                  minWidth: result.adjustedOffender > 0 ? '40px' : '0',
                }}
              >
                {result.adjustedOffender > 5 ? `${result.adjustedOffender}%` : ''}
              </div>
              <div
                className="flex items-center justify-center text-slate-900 font-bold text-sm transition-all"
                style={{
                  width: `${result.adjustedVictim}%`,
                  backgroundColor: '#3b82f6',
                  minWidth: result.adjustedVictim > 0 ? '40px' : '0',
                }}
              >
                {result.adjustedVictim > 5 ? `${result.adjustedVictim}%` : ''}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-400">가해차량 {result.adjustedOffender}%</span>
              <span className="text-blue-400">피해차량 {result.adjustedVictim}%</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">기본 과실 (가해/피해)</span>
              <span className="text-slate-900">{result.baseOffender}% / {result.baseVictim}%</span>
            </div>
            {result.appliedModifiers.length > 0 && (
              <div>
                <p className="text-sm text-slate-600 mb-1">적용된 수정 요소:</p>
                {result.appliedModifiers.map(m => (
                  <p key={m.id} className="text-sm text-slate-600 ml-2">
                    - {m.label} ({m.delta > 0 ? '+' : ''}{m.delta}%)
                  </p>
                ))}
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-3">
              <span className="text-sm text-slate-600">최종 과실비율 (가해/피해)</span>
              <span className="font-bold" style={{ color: category.color }}>
                {result.adjustedOffender}% / {result.adjustedVictim}%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">기본과실 + 수정요소 = 최종 과실비율</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 교통사고 과실비율 인정기준 (금융감독원/법원)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              표준 과실비율이며, 실제 과실 판정은 블랙박스·목격자·현장 증거에 따라 달라집니다.
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">과실비율 분쟁 시</h2>
        <ol className="space-y-3">
          {[
            { color: '#f59e0b', text: '보험사 사고접수 후 과실 협의' },
            { color: '#3b82f6', text: '합의 불성립 시 손해사정사 의뢰' },
            { color: '#10b981', text: '교통사고 분쟁조정위원회 신청' },
            { color: '#ef4444', text: '최종적으로 민사소송' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </CalculatorLayout>
  );
}
