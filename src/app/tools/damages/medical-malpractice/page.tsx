'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import {
  calculateMedicalPropertyDamage,
  type MedicalPropertyDamageResult,
} from '@/lib/calc/medical-malpractice';

const tool = TOOLS.find((t) => t.id === 'medical-malpractice')!;
const category = CATEGORIES.find((c) => c.id === 'damages')!;

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function MedicalMalpracticePage() {
  const [treatmentCost, setTreatmentCost] = useState('');
  const [futureTreatmentCost, setFutureTreatmentCost] = useState('');
  const [lostIncome, setLostIncome] = useState('');
  const [responsibilityRate, setResponsibilityRate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<MedicalPropertyDamageResult | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const treatment = parseMoney(treatmentCost);
    const future = parseMoney(futureTreatmentCost);
    const lost = parseMoney(lostIncome);
    const rate = Number(responsibilityRate);

    if (!responsibilityRate.trim()) {
      setError('손해에 반영할 책임비율을 입력해주세요. (0~100%)');
      setResult(null);
      return;
    }
    if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
      setError('책임비율은 0~100% 사이로 입력해주세요.');
      setResult(null);
      return;
    }
    if (treatment + future > 10_000_000_000) {
      setWarning('치료비 합계가 100억원을 초과합니다. 입력값을 확인해주세요.');
    }

    setResult(
      calculateMedicalPropertyDamage({
        treatmentCost: treatment,
        futureTreatmentCost: future,
        lostIncome: lost,
        responsibilityRate: rate,
      }),
    );
  };

  const handleNumberChange = (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value.replace(/[^0-9]/g, ''));
    };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">재산상 손해 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          정액 위자료를 추정하지 않고, 자료로 확인할 재산상 손해 항목만 입력해 책임비율 반영액을 계산합니다.
          입력한 책임비율은 사용자의 가정값이며 법원이나 조정중재원의 판단을 확정하지 않습니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="medical-treatment-cost">
            기지출 치료비 (원)
          </label>
          <input
            id="medical-treatment-cost"
            type="text"
            inputMode="numeric"
            value={treatmentCost ? formatNumber(parseMoney(treatmentCost)) : ''}
            onChange={handleNumberChange(setTreatmentCost)}
            placeholder="예: 5,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="medical-future-treatment-cost">
            향후 치료비 (원)
          </label>
          <input
            id="medical-future-treatment-cost"
            type="text"
            inputMode="numeric"
            value={futureTreatmentCost ? formatNumber(parseMoney(futureTreatmentCost)) : ''}
            onChange={handleNumberChange(setFutureTreatmentCost)}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="medical-lost-income">
            일실수입 (원)
          </label>
          <input
            id="medical-lost-income"
            type="text"
            inputMode="numeric"
            value={lostIncome ? formatNumber(parseMoney(lostIncome)) : ''}
            onChange={handleNumberChange(setLostIncome)}
            placeholder="예: 10,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="medical-responsibility-rate">
            손해에 반영할 책임비율 (%) *
          </label>
          <input
            id="medical-responsibility-rate"
            type="text"
            inputMode="decimal"
            value={responsibilityRate}
            onChange={(event) => setResponsibilityRate(event.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="0 ~ 100"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-2">
            과실·인과관계·환자 측 사정은 사건별로 판단되므로, 확정된 법원·조정 결과가 아니라면 가정값으로 표시하세요.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button
          type="button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          재산상 손해 계산하기
        </button>
      </div>

      {result !== null && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">재산상 손해 계산 결과</h2>

          {result.allocatedDamage === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-teal-50 border border-blue-200">
              <p className="text-sm text-teal-800">입력한 책임비율을 반영한 금액이 0원입니다. 입력값과 자료를 확인해주세요.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">입력한 재산상 손해 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.documentedDamage)}원
            </p>
          </div>

          <div className="mb-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-1">입력 책임비율 반영액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.allocatedDamage)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap glassmorphism glass-panel">
{`기지출 치료비 + 향후 치료비 + 일실수입 = 입력 재산상 손해 합계
입력 재산상 손해 합계 × 입력 책임비율 = 책임비율 반영액`}
            </pre>
            <p className="text-xs text-gray-500">
              참고 근거: 민법 제750조(불법행위), 제751조(재산 이외의 손해), 제763조(준용규정),
              의료사고 피해구제 및 의료분쟁 조정 등에 관한 법률 제35조(배상금의 결정).
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산하지 않는 항목과 분쟁 준비</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>위자료는 민법 제751조의 재산 이외 손해에 해당하지만 사건별 판단 요소를 정액표로 환산하지 않습니다.</li>
          <li>개호비·장해·향후 치료의 필요성과 인과관계는 진료기록, 감정 및 사건별 자료가 필요해 이 계산에 포함하지 않습니다.</li>
          <li>진료기록·검사 결과·영수증·소득 자료를 원본 또는 발급기관 자료로 보전하고, 손해와 의료행위 사이의 인과관계를 구분해 정리하세요.</li>
          <li>한국의료분쟁조정중재원 조정 신청과 민사소송은 요건·효과가 다르므로 신청 전 절차와 현행 조문을 확인하세요.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-4">
          한국의료분쟁조정중재원 상담: 1670-2545 ·{' '}
          <a href="https://www.k-medi.or.kr/" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">
            공식 홈페이지
          </a>
        </p>
      </section>
    </CalculatorLayout>
  );
}
