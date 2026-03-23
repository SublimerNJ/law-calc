'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'lost-income')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

type RetirementOption = '60' | '65' | 'custom';

function calculateHoffmanCoefficient(months: number): number {
  // 월 단위 호프만 계수: H = sum_{k=1}^{N} 1/(1 + 0.05/12 * k)
  let h = 0;
  const monthlyRate = 0.05 / 12;
  for (let k = 1; k <= months; k++) {
    h += 1 / (1 + monthlyRate * k);
  }
  return h;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface Result {
  remainingMonths: number;
  hoffmanCoeff: number;
  lostIncomeBeforeFault: number;
  treatmentLoss: number;
  lostIncomeAfterFault: number;
}

export default function LostIncomePage() {
  const [age, setAge] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [retirementOption, setRetirementOption] = useState<RetirementOption>('60');
  const [customRetirementAge, setCustomRetirementAge] = useState('');
  const [treatmentMonths, setTreatmentMonths] = useState('');
  const [disabilityRate, setDisabilityRate] = useState('');
  const [faultRate, setFaultRate] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const ageVal = parseInt(age, 10);
    const income = parseInt(monthlyIncome.replace(/,/g, ''), 10);
    const retAge = retirementOption === 'custom'
      ? parseInt(customRetirementAge, 10)
      : parseInt(retirementOption, 10);
    const treatMonths = parseInt(treatmentMonths, 10) || 0;
    const disRate = parseFloat(disabilityRate) || 0;
    const fRate = parseFloat(faultRate) || 0;

    if (!ageVal || !income || !retAge || ageVal >= retAge) return;

    const remainingMonths = (retAge - ageVal) * 12;
    const hoffmanCoeff = calculateHoffmanCoefficient(remainingMonths);

    const lostIncomeBeforeFault = Math.floor(income * (disRate / 100) * hoffmanCoeff);
    const treatmentLoss = Math.floor(income * treatMonths);
    const totalBeforeFault = lostIncomeBeforeFault + treatmentLoss;
    const lostIncomeAfterFault = Math.floor(totalBeforeFault * (1 - fRate / 100));

    setResult({
      remainingMonths,
      hoffmanCoeff,
      lostIncomeBeforeFault: totalBeforeFault,
      treatmentLoss,
      lostIncomeAfterFault,
    });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">사고 당시 나이 (세)</label>
          <input
            type="text"
            inputMode="numeric"
            value={age}
            onChange={handleNumberChange(setAge)}
            placeholder="예: 40"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">월 순수입 (원, 세후 실수령액)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyIncome ? parseInt(monthlyIncome).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setMonthlyIncome)}
            placeholder="예: 3,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
          {monthlyIncome && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(monthlyIncome).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">가동연한 종료 나이</label>
          <select
            value={retirementOption}
            onChange={(e) => setRetirementOption(e.target.value as RetirementOption)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            <option value="60">60세 (일반직)</option>
            <option value="65">65세 (전문직/자영업)</option>
            <option value="custom">직접 입력</option>
          </select>
          {retirementOption === 'custom' && (
            <input
              type="text"
              inputMode="numeric"
              value={customRetirementAge}
              onChange={handleNumberChange(setCustomRetirementAge)}
              placeholder="가동연한 나이 입력"
              className="w-full mt-2 bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">취업불능 기간 (개월, 치료기간)</label>
          <input
            type="text"
            inputMode="numeric"
            value={treatmentMonths}
            onChange={handleNumberChange(setTreatmentMonths)}
            placeholder="예: 6"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">노동능력 상실률 (%, 완전 상실 = 100)</label>
          <input
            type="text"
            inputMode="numeric"
            value={disabilityRate}
            onChange={(e) => setDisabilityRate(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 100"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">과실비율 (피해자, %)</label>
          <input
            type="text"
            inputMode="numeric"
            value={faultRate}
            onChange={(e) => setFaultRate(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 0"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">잔여 가동기간</p>
            <p className="text-lg text-white">
              {result.remainingMonths}개월 ({(result.remainingMonths / 12).toFixed(1)}년)
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">호프만 계수</p>
            <p className="text-lg text-white">{result.hoffmanCoeff.toFixed(4)}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">일실수입 (과실상계 전)</p>
            <p className="text-lg text-white">{formatNumber(result.lostIncomeBeforeFault)}원</p>
          </div>

          {result.treatmentLoss > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">치료기간 취업불능 손해 (포함)</p>
              <p className="text-lg text-white">{formatNumber(result.treatmentLoss)}원</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">과실상계 후 일실수입</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.lostIncomeAfterFault)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`월소득 × 노동능력상실률 × 호프만계수 = 일실수입
(호프만계수 = Σ 1/(1+0.05/12×k), k=1~잔여개월)
총액 × (1 - 과실비율) = 과실상계 후 일실수입`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 대법원 1989.3.28 선고 88다카21219
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-sm font-semibold text-gray-400 mb-2">호프만식 계산이란?</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              미래에 받을 소득을 <strong className="text-gray-300">현재 가치</strong>로 할인하는 방법입니다.
              예를 들어, 10년 후 받을 100만원은 현재 약 60만원의 가치입니다 (연 5% 할인율 적용).
              이 때문에 <strong className="text-gray-300">단순히 월급 × 개월수로 계산하는 것보다 금액이 낮습니다</strong>.
              한국 법원은 호프만식(단리 할인)을 표준으로 사용합니다.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              소득 증빙: 근로소득원천징수영수증, 사업소득 신고서, 국세청 소득금액증명원 등
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
