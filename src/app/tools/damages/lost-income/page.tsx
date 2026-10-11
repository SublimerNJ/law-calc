'use client';

import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import {
  calculateLostIncome,
  type DiscountMethod,
  type LostIncomeResult,
} from '@/lib/calc/lost-income';

const tool = TOOLS.find((item) => item.id === 'lost-income')!;
const category = CATEGORIES.find((item) => item.id === 'damages')!;

type RetirementOption = '60' | '65' | 'custom';

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function methodLabel(method: DiscountMethod): string {
  return method === 'hoffman' ? '호프만식(월 단리)' : '라이프니츠식(월 복리)';
}

function parseInteger(value: string): number {
  return Number.parseInt(value.replace(/,/g, ''), 10);
}

function parseDecimal(value: string): number {
  return Number.parseFloat(value);
}

export default function LostIncomePage() {
  const [age, setAge] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [retirementOption, setRetirementOption] = useState<RetirementOption>('65');
  const [customRetirementAge, setCustomRetirementAge] = useState('');
  const [treatmentMonths, setTreatmentMonths] = useState('');
  const [disabilityRate, setDisabilityRate] = useState('');
  const [faultRate, setFaultRate] = useState('');
  const [method, setMethod] = useState<DiscountMethod>('hoffman');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LostIncomeResult | null>(null);

  // The example is rendered from the same pure function used by the form.
  const verificationExample = calculateLostIncome({
    age: 40,
    monthlyIncome: 3_000_000,
    retirementAge: 65,
    treatmentMonths: 6,
    disabilityRate: 20,
    faultRate: 10,
    method: 'hoffman',
  });

  const handleCalculate = () => {
    setError(null);

    const ageValue = parseInteger(age);
    const incomeValue = parseInteger(monthlyIncome);
    const retirementAge = retirementOption === 'custom'
      ? parseInteger(customRetirementAge)
      : parseInteger(retirementOption);
    const treatmentMonthsValue = treatmentMonths.trim() === ''
      ? 0
      : parseInteger(treatmentMonths);
    const disabilityRateValue = parseDecimal(disabilityRate);
    const faultRateValue = faultRate.trim() === '' ? 0 : parseDecimal(faultRate);

    if (!Number.isInteger(ageValue) || ageValue <= 0) {
      setError('사고 당시 나이를 입력해주세요.');
      setResult(null);
      return;
    }
    if (ageValue > 100) {
      setError('나이는 100세 이하로 입력해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isInteger(incomeValue) || incomeValue <= 0) {
      setError('월 순수입을 입력해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isInteger(retirementAge) || retirementAge <= 0) {
      setError('가동연한 종료 나이를 입력해주세요.');
      setResult(null);
      return;
    }
    if (retirementAge > 120) {
      setError('가동연한 종료 나이는 120세 이하로 입력해주세요.');
      setResult(null);
      return;
    }
    if (ageValue >= retirementAge) {
      setError(`사고 당시 나이(${ageValue}세)가 가동연한(${retirementAge}세) 이상입니다. 나이 또는 가동연한을 확인해주세요.`);
      setResult(null);
      return;
    }
    if (!Number.isInteger(treatmentMonthsValue) || treatmentMonthsValue < 0) {
      setError('취업불능 기간은 0개월 이상으로 입력해주세요.');
      setResult(null);
      return;
    }
    if (disabilityRate.trim() === '' || !Number.isFinite(disabilityRateValue)) {
      setError('노동능력 상실률을 입력해주세요.');
      setResult(null);
      return;
    }
    if (disabilityRateValue < 0 || disabilityRateValue > 100) {
      setError('노동능력 상실률은 0~100%로 입력해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isFinite(faultRateValue) || faultRateValue < 0 || faultRateValue > 100) {
      setError('과실비율은 0~100%로 입력해주세요.');
      setResult(null);
      return;
    }

    setResult(
      calculateLostIncome({
        age: ageValue,
        monthlyIncome: incomeValue,
        retirementAge,
        treatmentMonths: treatmentMonthsValue,
        disabilityRate: disabilityRateValue,
        faultRate: faultRateValue,
        method,
      }),
    );
  };

  const handleNumberChange = (setter: (value: string) => void) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setter(event.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-age">
            사고 당시 나이 (세) *
          </label>
          <input
            id="lost-income-age"
            type="text"
            inputMode="numeric"
            value={age}
            onChange={handleNumberChange(setAge)}
            placeholder="예: 40"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-monthly">
            월 순수입 (원, 세후 실수령액) *
          </label>
          <input
            id="lost-income-monthly"
            type="text"
            inputMode="numeric"
            value={monthlyIncome ? formatNumber(parseInteger(monthlyIncome)) : ''}
            onChange={handleNumberChange(setMonthlyIncome)}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
          {monthlyIncome && (
            <p className="text-xs text-gray-500 mt-1">{formatNumber(parseInteger(monthlyIncome))}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-retirement">
            가동연한 종료 나이
          </label>
          <select
            id="lost-income-retirement"
            value={retirementOption}
            onChange={(event) => setRetirementOption(event.target.value as RetirementOption)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            <option value="65">65세 (대법원 전원합의체 판결 기준, 2018다248909)</option>
            <option value="60">60세 (구 기준)</option>
            <option value="custom">직접 입력</option>
          </select>
          {retirementOption === 'custom' && (
            <input
              id="lost-income-custom-retirement"
              type="text"
              inputMode="numeric"
              value={customRetirementAge}
              onChange={handleNumberChange(setCustomRetirementAge)}
              placeholder="가동연한 나이 입력"
              className="w-full mt-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
            />
          )}
          <p className="text-xs text-gray-500 mt-1">
            직업·연령·건강상태 등 구체적 사정에 따라 법원이 다르게 인정할 수 있습니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-treatment">
            취업불능 기간 (개월, 치료기간)
          </label>
          <input
            id="lost-income-treatment"
            type="text"
            inputMode="numeric"
            value={treatmentMonths}
            onChange={handleNumberChange(setTreatmentMonths)}
            placeholder="예: 6"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">
            치료기간은 전부 취업불능으로, 그 뒤 기간은 입력한 노동능력 상실률로 분리합니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-disability">
            노동능력 상실률 (%, 완전 상실 = 100) *
          </label>
          <input
            id="lost-income-disability"
            type="text"
            inputMode="decimal"
            value={disabilityRate}
            onChange={(event) => setDisabilityRate(event.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 20"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-fault">
            과실비율 (피해자, %)
          </label>
          <input
            id="lost-income-fault"
            type="text"
            inputMode="decimal"
            value={faultRate}
            onChange={(event) => setFaultRate(event.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 0"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="lost-income-method">
            현재가 환산 방식
          </label>
          <select
            id="lost-income-method"
            value={method}
            onChange={(event) => setMethod(event.target.value as DiscountMethod)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            <option value="hoffman">호프만식 — 월 5/12% 단리, 계수 240 상한</option>
            <option value="leibniz">라이프니츠식 — 월 5/12% 복리</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            사건의 적용 방식은 법원·보험약관·당사자 주장에 따라 달라질 수 있어 두 방식을 비교할 수 있게 했습니다.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="button"
          aria-label="일실수입 계산"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">함수로 다시 계산한 검산 예시</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          아래 금액은 설명에 적어 둔 결과를 복사한 값이 아니라, 입력값을 순수 계산 함수에 다시 넣어 화면에 렌더링한 값입니다.
        </p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-2">
            40세 · 월 순수입 3,000,000원 · 가동연한 65세 · 치료 6개월 · 장해 20% · 과실 10% · {methodLabel(verificationExample.method)}
          </p>
          <dl className="grid gap-2 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">치료기간 손해</dt>
              <dd className="font-medium">{formatNumber(verificationExample.treatmentLossBeforeFault)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">치료 후 장해분</dt>
              <dd className="font-medium">{formatNumber(verificationExample.disabilityLossBeforeFault)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">과실상계 전 합계</dt>
              <dd className="font-medium">{formatNumber(verificationExample.lostIncomeBeforeFault)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">과실상계 후</dt>
              <dd className="font-medium">{formatNumber(verificationExample.lostIncomeAfterFault)}원</dd>
            </div>
          </dl>
        </div>
      </div>

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.lostIncomeAfterFault === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-teal-50 border border-blue-200">
              <p className="text-sm text-teal-800">일실수입이 0원으로 계산되었습니다. 입력한 기간·상실률·과실비율을 확인해주세요.</p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 mb-5">
            <div>
              <p className="text-sm text-slate-600 mb-1">현재가 환산 방식</p>
              <p className="text-lg text-slate-900">{methodLabel(result.method)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">잔여 가동기간</p>
              <p className="text-lg text-slate-900">
                {result.remainingMonths}개월 ({(result.remainingMonths / 12).toFixed(1)}년)
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">월 순소득 (생활비 1/3 공제)</p>
              <p className="text-lg text-slate-900">{formatNumber(result.monthlyNetIncome)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">전체 기간 계수</p>
              <p className="text-lg text-slate-900">{result.totalCoefficient.toFixed(4)}</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 divide-y divide-slate-200">
            <div className="p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold text-slate-900">1단계 · 치료·취업불능 기간</p>
                <p className="font-semibold text-slate-900">{formatNumber(result.treatmentLossBeforeFault)}원</p>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {result.treatmentMonths}개월 × 월 순소득 × {result.treatmentCoefficient.toFixed(4)} 계수
              </p>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold text-slate-900">2단계 · 치료 후 노동능력 상실분</p>
                <p className="font-semibold text-slate-900">{formatNumber(result.disabilityLossBeforeFault)}원</p>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {result.residualDisabilityMonths}개월 × 월 순소득 × {result.disabilityRate}% × {result.residualDisabilityCoefficient.toFixed(4)} 계수
              </p>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-semibold text-slate-900">3단계 · 과실상계 전 합계</p>
                <p className="font-semibold text-slate-900">{formatNumber(result.lostIncomeBeforeFault)}원</p>
              </div>
              <p className="text-sm text-slate-600 mt-1">1단계 + 2단계</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-1">과실상계 후 일실수입 참고액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.lostIncomeAfterFault)}원
            </p>
            <p className="text-xs text-slate-500 mt-1">과실비율 {result.faultRate}% 적용 · 원 미만 버림</p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">단계별 산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap glassmorphism glass-panel">
{`월 순소득 = 월 순수입 × (1 - 생활비 1/3)
1단계 = 월 순소득 × 치료기간 현재가 계수
2단계 = 월 순소득 × 노동능력상실률 × (전체기간 계수 - 치료기간 계수)
최종 = (1단계 + 2단계) × (1 - 피해자 과실비율)
호프만식: Σ 1/(1 + 0.05/12 × k), 라이프니츠식: Σ 1/(1 + 0.05/12)^k`}
            </pre>
            <p className="text-xs text-gray-500 leading-relaxed">
              민법 제763조는 불법행위 손해배상에 민법 제393조·제396조 등을 준용합니다. 호프만식 240 상한, 생계비 3분의 1 공제, 가동연한은 각 판례·사실관계와 연결해 확인해야 하며 이 화면이 법원의 최종 산정을 대신하지 않습니다.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">관련 계산기</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="text-teal-800 hover:underline" href="/tools/damages/damages-general">
            확인된 재산상 손해와 과실비율
          </Link>
          <Link className="text-teal-800 hover:underline" href="/tools/damages/accident-settlement">
            교통사고 책임보험 한도
          </Link>
          <Link className="text-teal-800 hover:underline" href="/tools/damages/medical-malpractice">
            의료사고 재산상 손해
          </Link>
        </div>
      </div>

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="lost-income" amount={result.lostIncomeAfterFault} />
        </div>
      )}
    </CalculatorLayout>
  );
}
