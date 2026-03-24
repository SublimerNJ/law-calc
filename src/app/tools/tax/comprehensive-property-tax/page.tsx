'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'comprehensive-property-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

type HouseCount = '1' | '2plus';

interface CompTaxResult {
  totalAssessedValue: number;
  deduction: number;
  taxBase: number;
  calculatedTax: number;
  seniorDeduction: number;
  finalTax: number;
  ruralSpecialTax: number;
  total: number;
  exempt: boolean;
}

function calculateComprehensivePropertyTax(
  assessedValue: number,
  houseCount: HouseCount,
  singleHousehold: boolean,
  age: number,
): CompTaxResult {
  const deduction = singleHousehold ? 1_200_000_000 : 900_000_000;
  const fairMarketRatio = 0.6;
  const taxBase = Math.max(0, Math.floor((assessedValue - deduction) * fairMarketRatio));

  if (taxBase <= 0) {
    return {
      totalAssessedValue: assessedValue,
      deduction,
      taxBase: 0,
      calculatedTax: 0,
      seniorDeduction: 0,
      finalTax: 0,
      ruralSpecialTax: 0,
      total: 0,
      exempt: true,
    };
  }

  // Progressive tax rates (2-house or less, general)
  let tax: number;
  if (taxBase <= 300_000_000) {
    tax = taxBase * 0.005;
  } else if (taxBase <= 600_000_000) {
    tax = 1_500_000 + (taxBase - 300_000_000) * 0.007;
  } else if (taxBase <= 1_200_000_000) {
    tax = 3_600_000 + (taxBase - 600_000_000) * 0.01;
  } else if (taxBase <= 2_500_000_000) {
    tax = 9_600_000 + (taxBase - 1_200_000_000) * 0.013;
  } else if (taxBase <= 5_000_000_000) {
    tax = 26_500_000 + (taxBase - 2_500_000_000) * 0.015;
  } else if (taxBase <= 9_400_000_000) {
    tax = 64_000_000 + (taxBase - 5_000_000_000) * 0.02;
  } else {
    tax = 152_000_000 + (taxBase - 9_400_000_000) * 0.027;
  }

  tax = Math.floor(tax);

  // Senior deduction (single household only)
  let seniorDeductionRate = 0;
  if (singleHousehold) {
    if (age >= 70) seniorDeductionRate = 0.4;
    else if (age >= 65) seniorDeductionRate = 0.3;
    else if (age >= 60) seniorDeductionRate = 0.2;
  }

  const seniorDeduction = Math.floor(tax * seniorDeductionRate);
  const finalTax = Math.max(0, tax - seniorDeduction);
  const ruralSpecialTax = Math.floor(finalTax * 0.2);

  return {
    totalAssessedValue: assessedValue,
    deduction,
    taxBase,
    calculatedTax: tax,
    seniorDeduction,
    finalTax,
    ruralSpecialTax,
    total: finalTax + ruralSpecialTax,
    exempt: false,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function ComprehensivePropertyTaxPage() {
  const [assessedValue, setAssessedValue] = useState('');
  const [houseCount, setHouseCount] = useState<HouseCount>('1');
  const [singleHousehold, setSingleHousehold] = useState(false);
  const [age, setAge] = useState('');
  const [result, setResult] = useState<CompTaxResult | null>(null);

  const handleCalculate = () => {
    const val = parseInt(assessedValue.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;
    const ageVal = parseInt(age, 10) || 0;
    setResult(calculateComprehensivePropertyTax(val, houseCount, singleHousehold, ageVal));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssessedValue(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">주택 공시가격 합산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={assessedValue ? parseInt(assessedValue).toLocaleString('ko-KR') : ''}
            onChange={handleValueChange}
            placeholder="예: 1,500,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#10b981] focus:outline-none"
          />
          {assessedValue && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(assessedValue).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">보유 주택 수</label>
          <div className="flex gap-2">
            {[
              { value: '1' as HouseCount, label: '1주택' },
              { value: '2plus' as HouseCount, label: '2주택 이상' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setHouseCount(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  houseCount === opt.value
                    ? 'border-[#10b981] bg-[#10b981]/10 text-slate-900'
                    : 'border-slate-200 text-slate-600 hover:border-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={singleHousehold}
              onChange={e => setSingleHousehold(e.target.checked)}
              className="accent-[#10b981]"
            />
            <span className="text-sm text-slate-600">1세대 1주택자</span>
          </label>
        </div>

        {singleHousehold && (
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">연령 (세) - 고령자공제용 (1세대1주택 거주용만 적용)</label>
            <input
              type="text"
              inputMode="numeric"
              value={age}
              onChange={e => setAge(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="예: 65"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#10b981] focus:outline-none"
            />
          </div>
        )}

        <div className="mb-6 p-3 rounded-lg bg-white border border-slate-200">
          <p className="text-xs text-gray-500">
            * 장기보유공제는 보유기간에 따라 별도 적용됩니다 (5~15년: 20~50%).
            정확한 공제액은 관할 세무서에 문의하세요.
          </p>
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.exempt ? (
            <div className="p-4 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30 mb-4">
              <p className="text-[#10b981] font-semibold">비과세</p>
              <p className="text-sm text-slate-600 mt-1">
                공시가격 합산이 공제금액({formatNumber(result.deduction)}원) 이하로 종합부동산세가 부과되지 않습니다.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">공시가격 합산</span>
                  <span className="text-slate-900">{formatNumber(result.totalAssessedValue)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">공제금액</span>
                  <span className="text-slate-900">{formatNumber(result.deduction)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">과세표준 (공시가 x 60% - 공제)</span>
                  <span className="text-slate-900">{formatNumber(result.taxBase)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">산출세액</span>
                  <span className="text-slate-900">{formatNumber(result.calculatedTax)}원</span>
                </div>
                {result.seniorDeduction > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">고령자공제</span>
                    <span className="text-red-400">-{formatNumber(result.seniorDeduction)}원</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">종합부동산세</span>
                  <span className="text-slate-900">{formatNumber(result.finalTax)}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">농어촌특별세 (20%)</span>
                  <span className="text-slate-900">{formatNumber(result.ruralSpecialTax)}원</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 mb-4">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-slate-900">합계 세액</span>
                  <span className="text-xl font-bold" style={{ color: category.color }}>
                    {formatNumber(result.total)}원
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`(공시가격 × 60% - 공제액) = 과세표준
과세표준 × 세율 = 산출세액
산출세액 - 고령자공제 = 종합부동산세
종합부동산세 × 20% = 농어촌특별세`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 종합부동산세법 제8조(과세표준·공제), 제9조(세율), 제10조(세액공제)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
