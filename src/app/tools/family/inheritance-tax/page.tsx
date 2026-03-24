'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'inheritance-tax')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

interface TaxResult {
  taxableBase: number;
  totalDeduction: number;
  taxableAmount: number;
  tax: number;
  rate: string;
}

function progressiveTax(amount: number): { tax: number; rate: string } {
  if (amount <= 0) return { tax: 0, rate: '0%' };
  if (amount <= 100_000_000) return { tax: amount * 0.1, rate: '10%' };
  if (amount <= 500_000_000) return { tax: 10_000_000 + (amount - 100_000_000) * 0.2, rate: '20%' };
  if (amount <= 1_000_000_000) return { tax: 60_000_000 + (amount - 500_000_000) * 0.3, rate: '30%' };
  if (amount <= 3_000_000_000) return { tax: 160_000_000 + (amount - 1_000_000_000) * 0.4, rate: '40%' };
  return { tax: 460_000_000 + (amount - 3_000_000_000) * 0.5, rate: '50%' };
}

function calculateInheritanceTax(
  grossEstate: number,
  hasSpouse: boolean,
  funeralExpenses: number,
  debts: number
): TaxResult {
  // 1. 과세가액
  // 장례비 공제: 기본 한도 1,000만원 (봉안/자연장지 시 +500만원은 별도 — 상속세및증여세법 제14조 제5항)
  const cappedFuneral = Math.min(funeralExpenses, 10_000_000);
  const taxableBase = Math.max(0, grossEstate - debts - cappedFuneral);

  // 2. 공제
  const basicDeduction = 200_000_000;
  const lumpSumDeduction = 500_000_000; // 일괄공제
  const spouseDeduction = hasSpouse
    ? Math.max(500_000_000, Math.min(grossEstate * 0.5, 3_000_000_000))
    : 0;

  // 일괄공제 vs 기초공제 중 큰 것
  const totalDeduction = Math.max(lumpSumDeduction, basicDeduction) + spouseDeduction;
  const taxableAmount = Math.max(0, taxableBase - totalDeduction);

  // 3. 세율 적용
  const { tax, rate } = progressiveTax(taxableAmount);

  return { taxableBase, totalDeduction, taxableAmount, tax: Math.floor(tax), rate };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseInput(value: string): number {
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

export default function InheritanceTaxPage() {
  const [grossEstate, setGrossEstate] = useState('');
  const [hasSpouse, setHasSpouse] = useState(false);
  const [funeralExpenses, setFuneralExpenses] = useState('');
  const [debts, setDebts] = useState('');
  const [result, setResult] = useState<TaxResult | null>(null);

  const handleNumberInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  const handleCalculate = () => {
    const estate = parseInput(grossEstate);
    if (estate <= 0) return;
    setResult(calculateInheritanceTax(estate, hasSpouse, parseInput(funeralExpenses), parseInput(debts)));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">총 상속재산가액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(grossEstate)}
            onChange={handleNumberInput(setGrossEstate)}
            placeholder="예: 1,000,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
          />
          {grossEstate && <p className="text-xs text-gray-500 mt-1">{displayValue(grossEstate)}원</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasSpouse}
              onChange={e => setHasSpouse(e.target.checked)}
              className="accent-[#ec4899] w-4 h-4"
            />
            <span className="text-sm text-slate-600">배우자 생존</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">장례비 (원, 최대 공제 1,000만원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(funeralExpenses)}
            onChange={handleNumberInput(setFuneralExpenses)}
            placeholder="선택 입력"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">채무/공과금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(debts)}
            onChange={handleNumberInput(setDebts)}
            placeholder="선택 입력"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">과세가액</p>
              <p className="text-lg text-slate-900">{formatNumber(result.taxableBase)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">공제 합계</p>
              <p className="text-lg text-slate-900">{formatNumber(result.totalDeduction)}원</p>
              <p className="text-xs text-gray-500 mt-1">
                일괄공제 5억원{hasSpouse ? ` + 배우자공제 ${formatNumber(Math.max(500_000_000, Math.min(parseInput(grossEstate) * 0.5, 3_000_000_000)))}원` : ''} 적용
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">과세표준</p>
              <p className="text-lg text-slate-900">{formatNumber(result.taxableAmount)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">적용세율</p>
              <p className="text-lg text-slate-900">{result.rate}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">산출세액</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.tax)}원
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-[#1a1025] border border-[#2a1a3a]">
              <p className="text-xs text-slate-600 mb-1">실효세율</p>
              <p className="text-lg text-slate-900">{parseInput(grossEstate) > 0 ? ((result.tax / parseInput(grossEstate)) * 100).toFixed(2) : '0'}%</p>
              <p className="text-xs text-gray-500">총 재산 대비</p>
            </div>
            <div className="p-3 rounded-lg bg-[#1a1025]" style={{ borderLeft: `3px solid ${category.color}` }}>
              <p className="text-xs text-slate-600 mb-1">세후 상속재산</p>
              <p className="text-lg font-bold" style={{ color: category.color }}>{formatNumber(Math.max(0, parseInput(grossEstate) - parseInput(debts) - result.tax))}원</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`총 상속재산가액     ${formatNumber(parseInput(grossEstate))}원
(-) 채무/장례비    ${formatNumber(parseInput(debts) + Math.min(parseInput(funeralExpenses), 15_000_000))}원
= 과세가액         ${formatNumber(result.taxableBase)}원
(-) 공제 합계      ${formatNumber(result.totalDeduction)}원
    일괄공제       500,000,000원${hasSpouse ? `\n    배우자공제     ${formatNumber(result.totalDeduction - 500_000_000)}원` : ''}
────────────────────────────────
과세표준           ${formatNumber(result.taxableAmount)}원
× 세율             ${result.rate}
────────────────────────────────
산출세액           ${formatNumber(result.tax)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 상속세 및 증여세법 제18조(기초공제), 제19조(배우자공제), 제21조(일괄공제), 제26조(세율)
            </p>
          </div>

          <div className="mt-3 p-3 bg-[#1a1025] border border-[#2a1a3a] rounded-lg">
            <p className="text-xs text-slate-600">
              본 계산기는 참고용입니다. 실제 신고 시 세무사 상담을 권장합니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
