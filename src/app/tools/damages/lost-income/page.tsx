'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'lost-income')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

type RetirementOption = '60' | '65' | 'custom';
// 생활비 공제율: 판례상 통상 1/3 (대법원 실무 기준)
const LIVING_EXPENSE_DEDUCTION = 1 / 3;

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
  livingExpenseDeduction: number;
}

export default function LostIncomePage() {
  const [age, setAge] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [retirementOption, setRetirementOption] = useState<RetirementOption>('65');
  const [customRetirementAge, setCustomRetirementAge] = useState('');
  const [treatmentMonths, setTreatmentMonths] = useState('');
  const [disabilityRate, setDisabilityRate] = useState('');
  const [faultRate, setFaultRate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    setError(null);
    const ageVal = parseInt(age, 10);
    const income = parseInt(monthlyIncome.replace(/,/g, ''), 10);
    const retAge = retirementOption === 'custom'
      ? parseInt(customRetirementAge, 10)
      : parseInt(retirementOption, 10);
    const treatMonths = parseInt(treatmentMonths, 10) || 0;
    const disRate = parseFloat(disabilityRate) || 0;
    const fRate = parseFloat(faultRate) || 0;

    // INPUT-02: 나이 필수
    if (!age || !ageVal || ageVal <= 0) {
      setError('사고 당시 나이를 입력해주세요.');
      setResult(null);
      return;
    }
    if (ageVal > 100) {
      setError('나이는 100세 이하로 입력해주세요.');
      setResult(null);
      return;
    }
    // INPUT-02: 월순수입 필수
    if (!monthlyIncome || !income || income <= 0) {
      setError('월 순수입을 입력해주세요.');
      setResult(null);
      return;
    }
    // INPUT-02: 가동연한 custom 시 검증
    if (retirementOption === 'custom' && (!customRetirementAge || !retAge || retAge <= 0)) {
      setError('가동연한 종료 나이를 입력해주세요.');
      setResult(null);
      return;
    }
    // EDGE-01: 나이 >= 가동연한
    if (ageVal >= retAge) {
      setError(`사고 당시 나이(${ageVal}세)가 가동연한(${retAge}세) 이상입니다. 나이 또는 가동연한을 확인해주세요.`);
      setResult(null);
      return;
    }

    const remainingMonths = (retAge - ageVal) * 12;
    const hoffmanCoeff = calculateHoffmanCoefficient(remainingMonths);

    // 생활비 공제 적용: 월소득 × (1 - 생활비공제율) × 노동능력상실률 × 호프만계수
    // 대법원 판례: 일실수입 산정 시 생활비 1/3 공제 (피해자 자신의 생활비용 제외)
    const netIncome = income * (1 - LIVING_EXPENSE_DEDUCTION);
    const lostIncomeBeforeFault = Math.floor(netIncome * (disRate / 100) * hoffmanCoeff);
    // 치료기간 취업불능 손해도 생활비 공제 적용
    const treatmentLoss = Math.floor(netIncome * treatMonths);
    const totalBeforeFault = lostIncomeBeforeFault + treatmentLoss;
    const lostIncomeAfterFault = Math.floor(totalBeforeFault * (1 - fRate / 100));

    setResult({
      remainingMonths,
      hoffmanCoeff,
      lostIncomeBeforeFault: totalBeforeFault,
      treatmentLoss,
      lostIncomeAfterFault,
      livingExpenseDeduction: LIVING_EXPENSE_DEDUCTION,
    });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">사고 당시 나이 (세) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={age}
            onChange={handleNumberChange(setAge)}
            placeholder="예: 40"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">월 순수입 (원, 세후 실수령액) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyIncome ? parseInt(monthlyIncome).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setMonthlyIncome)}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          {monthlyIncome && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(monthlyIncome).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">가동연한 종료 나이</label>
          <select
            value={retirementOption}
            onChange={(e) => setRetirementOption(e.target.value as RetirementOption)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          >
            <option value="65">65세 (대법원 전원합의체 판결 기준, 2018다248909)</option>
            <option value="60">60세 (구 기준)</option>
            <option value="custom">직접 입력</option>
          </select>
          {retirementOption === 'custom' && (
            <input
              type="text"
              inputMode="numeric"
              value={customRetirementAge}
              onChange={handleNumberChange(setCustomRetirementAge)}
              placeholder="가동연한 나이 입력"
              className="w-full mt-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">취업불능 기간 (개월, 치료기간)</label>
          <input
            type="text"
            inputMode="numeric"
            value={treatmentMonths}
            onChange={handleNumberChange(setTreatmentMonths)}
            placeholder="예: 6"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">노동능력 상실률 (%, 완전 상실 = 100) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={disabilityRate}
            onChange={(e) => setDisabilityRate(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 100"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">과실비율 (피해자, %)</label>
          <input
            type="text"
            inputMode="numeric"
            value={faultRate}
            onChange={(e) => setFaultRate(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 0"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

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

          {result.lostIncomeAfterFault === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">일실수입이 0원으로 계산되었습니다. 노동능력상실률 또는 과실비율을 확인해주세요.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">잔여 가동기간</p>
            <p className="text-lg text-slate-900">
              {result.remainingMonths}개월 ({(result.remainingMonths / 12).toFixed(1)}년)
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">호프만 계수</p>
            <p className="text-lg text-slate-900">{result.hoffmanCoeff.toFixed(4)}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">생활비 공제율</p>
            <p className="text-lg text-slate-900">1/3 ({(result.livingExpenseDeduction * 100).toFixed(1)}%) — 대법원 판례 기준</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">일실수입 (과실상계 전)</p>
            <p className="text-lg text-slate-900">{formatNumber(result.lostIncomeBeforeFault)}원</p>
          </div>

          {result.treatmentLoss > 0 && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">치료기간 취업불능 손해 (포함)</p>
              <p className="text-lg text-slate-900">{formatNumber(result.treatmentLoss)}원</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">과실상계 후 일실수입</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.lostIncomeAfterFault)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap glassmorphism glass-panel">
{`월소득 × (1-생활비공제율1/3) × 노동능력상실률 × 호프만계수 = 일실수입
(호프만계수 = Σ 1/(1+0.05/12×k), k=1~잔여개월)
총액 × (1 - 과실비율) = 과실상계 후 일실수입`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제379조(법정이율 연 5%), 대법원 1989.3.28 선고 88다카21219(호프만식 채택), 대법원 2019.2.21 선고 2018다248909 전원합의체 판결(가동연한 65세), 대법원 2020.9.3 선고 2016다244188(생활비 공제율 1/3)
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">호프만식 계산이란?</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              미래에 받을 소득을 <strong className="text-slate-600">현재 가치</strong>로 할인하는 방법입니다.
              예를 들어, 10년 후 받을 100만원은 현재 약 60만원의 가치입니다 (연 5% 할인율 적용).
              이 때문에 <strong className="text-slate-600">단순히 월급 × 개월수로 계산하는 것보다 금액이 낮습니다</strong>.
              한국 법원은 호프만식(단리 할인)을 표준으로 사용합니다.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              소득 증빙: 근로소득원천징수영수증, 사업소득 신고서, 국세청 소득금액증명원 등
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="lost-income" amount={result.lostIncomeAfterFault} />
        </div>
      )}
    </CalculatorLayout>
  );
}
