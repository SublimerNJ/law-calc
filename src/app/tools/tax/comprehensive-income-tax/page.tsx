'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'comprehensive-income-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

/** 산출세액 (소득세법 제55조, 2026년 세율) */
function calcTax(taxBase: number): { tax: number; rate: string } {
  if (taxBase <= 14_000_000) return { tax: taxBase * 0.06, rate: '6%' };
  if (taxBase <= 50_000_000) return { tax: 840_000 + (taxBase - 14_000_000) * 0.15, rate: '15%' };
  if (taxBase <= 88_000_000) return { tax: 6_240_000 + (taxBase - 50_000_000) * 0.24, rate: '24%' };
  if (taxBase <= 150_000_000) return { tax: 15_360_000 + (taxBase - 88_000_000) * 0.35, rate: '35%' };
  if (taxBase <= 300_000_000) return { tax: 37_060_000 + (taxBase - 150_000_000) * 0.38, rate: '38%' };
  if (taxBase <= 500_000_000) return { tax: 94_060_000 + (taxBase - 300_000_000) * 0.40, rate: '40%' };
  if (taxBase <= 1_000_000_000) return { tax: 174_060_000 + (taxBase - 500_000_000) * 0.42, rate: '42%' };
  return { tax: 384_060_000 + (taxBase - 1_000_000_000) * 0.45, rate: '45%' };
}

const INCOME_TYPES = [
  { id: 'earned', label: '근로소득' },
  { id: 'business', label: '사업소득' },
  { id: 'interest', label: '이자소득' },
  { id: 'dividend', label: '배당소득' },
  { id: 'pension', label: '연금소득' },
  { id: 'other', label: '기타소득' },
] as const;

interface Result {
  totalIncome: number;
  basicDeduction: number;
  pensionDeduction: number;
  healthDeduction: number;
  totalDeduction: number;
  taxBase: number;
  rate: string;
  computedTax: number;
  standardCredit: number;
  determinedTax: number;
  localTax: number;
  totalTax: number;
  bracketInfo: string;
}

function calculate(
  totalIncome: number,
  dependents: number,
  pensionPaid: number,
  healthPaid: number,
  hasEarnedIncome: boolean,
): Result {
  const basicDeduction = dependents * 1_500_000;
  const pensionDeduction = pensionPaid;
  const healthDeduction = healthPaid;
  const totalDeduction = basicDeduction + pensionDeduction + healthDeduction;
  const taxBase = Math.max(totalIncome - totalDeduction, 0);

  const { tax, rate } = calcTax(taxBase);
  const computedTax = Math.floor(tax);

  const standardCredit = hasEarnedIncome ? 130_000 : 70_000;
  const determinedTax = Math.max(computedTax - standardCredit, 0);
  const localTax = Math.floor(determinedTax * 0.1);
  const totalTax = determinedTax + localTax;

  // Bracket info
  let bracketInfo: string;
  if (taxBase <= 14_000_000) bracketInfo = '1,400만원 이하 구간 (6%)';
  else if (taxBase <= 50_000_000) bracketInfo = '1,400만~5,000만원 구간 (15%)';
  else if (taxBase <= 88_000_000) bracketInfo = '5,000만~8,800만원 구간 (24%)';
  else if (taxBase <= 150_000_000) bracketInfo = '8,800만~1.5억원 구간 (35%)';
  else if (taxBase <= 300_000_000) bracketInfo = '1.5억~3억원 구간 (38%)';
  else if (taxBase <= 500_000_000) bracketInfo = '3억~5억원 구간 (40%)';
  else if (taxBase <= 1_000_000_000) bracketInfo = '5억~10억원 구간 (42%)';
  else bracketInfo = '10억원 초과 구간 (45%)';

  return {
    totalIncome,
    basicDeduction,
    pensionDeduction,
    healthDeduction,
    totalDeduction,
    taxBase,
    rate,
    computedTax,
    standardCredit,
    determinedTax,
    localTax,
    totalTax,
    bracketInfo,
  };
}

export default function ComprehensiveIncomeTaxPage() {
  const [totalIncome, setTotalIncome] = useState('');
  const [incomeTypes, setIncomeTypes] = useState<Set<string>>(new Set(['earned']));
  const [dependents, setDependents] = useState('1');
  const [pensionPaid, setPensionPaid] = useState('');
  const [healthPaid, setHealthPaid] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const toggleIncomeType = (id: string) => {
    setIncomeTypes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCalculate = () => {
    const income = parseInt(totalIncome.replace(/,/g, ''), 10);
    if (!income || income <= 0) return;
    const pension = parseInt((pensionPaid || '0').replace(/,/g, ''), 10) || 0;
    const health = parseInt((healthPaid || '0').replace(/,/g, ''), 10) || 0;
    setResult(calculate(income, parseInt(dependents) || 1, pension, health, incomeTypes.has('earned')));
  };

  const numInput = (value: string, setter: (v: string) => void, placeholder: string) => ({
    type: 'text' as const,
    inputMode: 'numeric' as const,
    value: value ? parseInt(value).toLocaleString('ko-KR') : '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value.replace(/[^0-9]/g, '')),
    placeholder,
    className: 'w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none',
  });

  const rows: { label: string; value: number }[] = result
    ? [
        { label: '종합소득금액', value: result.totalIncome },
        { label: '소득공제 합계', value: result.totalDeduction },
        { label: '  - 기본공제', value: result.basicDeduction },
        { label: '  - 국민연금공제', value: result.pensionDeduction },
        { label: '  - 건강보험료공제', value: result.healthDeduction },
        { label: '과세표준', value: result.taxBase },
        { label: '산출세액', value: result.computedTax },
        { label: '표준세액공제', value: result.standardCredit },
        { label: '결정세액', value: result.determinedTax },
        { label: '지방소득세', value: result.localTax },
        { label: '총 납부세액', value: result.totalTax },
      ]
    : [];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">종합소득금액 (원)</label>
          <input {...numInput(totalIncome, setTotalIncome, '예: 80,000,000')} />
          {totalIncome && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(totalIncome).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">소득 종류 (해당 항목 모두 선택)</label>
          <div className="flex flex-wrap gap-3">
            {INCOME_TYPES.map(it => (
              <label key={it.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incomeTypes.has(it.id)}
                  onChange={() => toggleIncomeType(it.id)}
                  className="accent-[#10b981] w-4 h-4"
                />
                <span className="text-sm text-slate-600">{it.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">인적공제 대상 인원수 (본인 포함)</label>
          <input
            type="number"
            min="1"
            value={dependents}
            onChange={e => setDependents(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">국민연금보험료 납부액 (원)</label>
          <input {...numInput(pensionPaid, setPensionPaid, '예: 4,500,000')} />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">건강보험료 납부액 (원)</label>
          <input {...numInput(healthPaid, setHealthPaid, '예: 3,000,000')} />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-4 p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30">
            <p className="text-sm text-[#10b981]">
              적용세율: {result.rate} | {result.bracketInfo}
            </p>
          </div>

          <div className="space-y-3">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between items-center ${i === rows.length - 1 ? 'pt-3 border-t border-slate-200' : ''}`}
              >
                <span className={`text-sm ${row.label.startsWith('  ') ? 'text-gray-500 pl-2' : 'text-slate-600'}`}>
                  {row.label.trim()}
                </span>
                <span
                  className={`font-semibold ${i === rows.length - 1 ? 'text-xl' : 'text-base text-slate-900'}`}
                  style={i === rows.length - 1 ? { color: category.color } : undefined}
                >
                  {formatNumber(row.value)}원
                </span>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`종합소득금액        ${formatNumber(result.totalIncome)}원
(-) 소득공제 합계   ${formatNumber(result.totalDeduction)}원
    기본공제        ${formatNumber(result.basicDeduction)}원
    국민연금공제    ${formatNumber(result.pensionDeduction)}원
    건강보험료공제  ${formatNumber(result.healthDeduction)}원
────────────────────────────────
과세표준           ${formatNumber(result.taxBase)}원
× 세율             ${result.rate}
= 산출세액         ${formatNumber(result.computedTax)}원
(-) 표준세액공제   ${formatNumber(result.standardCredit)}원
= 결정세액         ${formatNumber(result.determinedTax)}원
(+) 지방소득세     ${formatNumber(result.localTax)}원
────────────────────────────────
총 납부세액        ${formatNumber(result.totalTax)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 소득세법 제14조(종합소득), 제55조(세율), 제56조(세액공제)
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">절세 방법</h2>
        <ul className="space-y-3">
          {[
            { num: '1', text: '필요경비 증빙 철저히 (사업소득)' },
            { num: '2', text: '기장의무 이행 시 세액공제 20%' },
            { num: '3', text: '성실신고확인 대상자 의료비/교육비 공제 가능' },
            { num: '4', text: '5월 신고 기한 엄수 (가산세 방지)' },
          ].map(item => (
            <li key={item.num} className="flex items-start gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: category.color }}
              >
                {item.num}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </CalculatorLayout>
  );
}
