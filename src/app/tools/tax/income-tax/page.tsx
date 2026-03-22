'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'income-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

/** 근로소득공제 (소득세법 제47조) */
function calcEarnedIncomeDeduction(salary: number): number {
  if (salary <= 5_000_000) return salary * 0.7;
  if (salary <= 15_000_000) return 3_500_000 + (salary - 5_000_000) * 0.4;
  if (salary <= 45_000_000) return 7_500_000 + (salary - 15_000_000) * 0.15;
  if (salary <= 100_000_000) return 12_450_000 + (salary - 45_000_000) * 0.05;
  const deduction = 14_950_000 + (salary - 100_000_000) * 0.02;
  return Math.min(deduction, 20_000_000);
}

/** 산출세액 (소득세법 제55조, 2026년 세율) */
function calcTax(taxBase: number): number {
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return 840_000 + (taxBase - 14_000_000) * 0.15;
  if (taxBase <= 88_000_000) return 6_240_000 + (taxBase - 50_000_000) * 0.24;
  if (taxBase <= 150_000_000) return 15_360_000 + (taxBase - 88_000_000) * 0.35;
  if (taxBase <= 300_000_000) return 37_060_000 + (taxBase - 150_000_000) * 0.38;
  if (taxBase <= 500_000_000) return 94_060_000 + (taxBase - 300_000_000) * 0.40;
  if (taxBase <= 1_000_000_000) return 174_060_000 + (taxBase - 500_000_000) * 0.42;
  return 384_060_000 + (taxBase - 1_000_000_000) * 0.45;
}

/** 근로소득세액공제 (소득세법 제59조) */
function calcEarnedIncomeTaxCredit(computedTax: number, salary: number): number {
  let credit: number;
  if (computedTax <= 1_300_000) {
    credit = computedTax * 0.55;
  } else {
    credit = 715_000 + (computedTax - 1_300_000) * 0.30;
  }
  const limit = salary <= 55_000_000 ? 740_000 : 660_000;
  return Math.min(credit, limit);
}

/** 자녀세액공제 */
function calcChildCredit(children: number): number {
  if (children <= 0) return 0;
  if (children === 1) return 150_000;
  if (children === 2) return 350_000;
  return 650_000 + (children - 3) * 300_000;
}

interface Result {
  earnedIncomeDeduction: number;
  earnedIncome: number;
  basicDeduction: number;
  taxBase: number;
  computedTax: number;
  earnedIncomeTaxCredit: number;
  childCredit: number;
  determinedTax: number;
  localTax: number;
  totalTax: number;
}

function calculate(salary: number, dependents: number, children: number): Result {
  const earnedIncomeDeduction = Math.floor(calcEarnedIncomeDeduction(salary));
  const earnedIncome = salary - earnedIncomeDeduction;
  const basicDeduction = dependents * 1_500_000;
  const taxBase = Math.max(earnedIncome - basicDeduction, 0);
  const computedTax = Math.floor(calcTax(taxBase));
  const earnedIncomeTaxCredit = Math.floor(calcEarnedIncomeTaxCredit(computedTax, salary));
  const childCredit = calcChildCredit(children);
  const determinedTax = Math.max(computedTax - earnedIncomeTaxCredit - childCredit, 0);
  const localTax = Math.floor(determinedTax * 0.1);
  const totalTax = determinedTax + localTax;

  return {
    earnedIncomeDeduction,
    earnedIncome,
    basicDeduction,
    taxBase,
    computedTax,
    earnedIncomeTaxCredit,
    childCredit,
    determinedTax,
    localTax,
    totalTax,
  };
}

export default function IncomeTaxPage() {
  const [salary, setSalary] = useState('');
  const [dependents, setDependents] = useState('1');
  const [children, setChildren] = useState('0');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const val = parseInt(salary.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;
    setResult(calculate(val, parseInt(dependents) || 1, parseInt(children) || 0));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value.replace(/[^0-9]/g, ''));
  };

  const rows: { label: string; value: number }[] = result
    ? [
        { label: '근로소득공제', value: result.earnedIncomeDeduction },
        { label: '근로소득금액', value: result.earnedIncome },
        { label: '기본공제', value: result.basicDeduction },
        { label: '과세표준', value: result.taxBase },
        { label: '산출세액', value: result.computedTax },
        { label: '근로소득세액공제', value: result.earnedIncomeTaxCredit },
        { label: '자녀세액공제', value: result.childCredit },
        { label: '결정세액 (소득세)', value: result.determinedTax },
        { label: '지방소득세', value: result.localTax },
        { label: '합계 납부세액', value: result.totalTax },
      ]
    : [];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">연간 총급여액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={salary ? parseInt(salary).toLocaleString('ko-KR') : ''}
            onChange={handleSalaryChange}
            placeholder="예: 50,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
          {salary && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(salary).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">부양가족 수 (본인 포함)</label>
          <input
            type="number"
            min="1"
            value={dependents}
            onChange={e => setDependents(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">20세 이하 자녀 수</label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={e => setChildren(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
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

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="space-y-3">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between items-center ${i === rows.length - 1 ? 'pt-3 border-t border-[#1e2d4a]' : ''}`}
              >
                <span className="text-sm text-gray-400">{row.label}</span>
                <span
                  className={`font-semibold ${i === rows.length - 1 ? 'text-xl' : 'text-base text-white'}`}
                  style={i === rows.length - 1 ? { color: category.color } : undefined}
                >
                  {formatNumber(row.value)}원
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 mt-4 pt-4 border-t border-[#1e2d4a]">
            <div>
              <p className="text-sm text-gray-400 mb-1">월 환산 세금</p>
              <p className="text-lg text-white">{formatNumber(Math.floor(result.totalTax / 12))}원/월</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">실효세율</p>
              <p className="text-lg text-white">
                {salary ? ((result.totalTax / parseInt(salary)) * 100).toFixed(2) : '0'}%
              </p>
            </div>
          </div>

          {/* 세율 구간표 */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-3">2026년 소득세 세율표</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1e2d4a]">
                  <th className="py-2 text-left text-gray-500">과세표준</th>
                  <th className="py-2 text-right text-gray-500">세율</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: '1,400만원 이하', rate: '6%', max: 14_000_000 },
                  { label: '1,400만~5,000만원', rate: '15%', max: 50_000_000 },
                  { label: '5,000만~8,800만원', rate: '24%', max: 88_000_000 },
                  { label: '8,800만~1.5억원', rate: '35%', max: 150_000_000 },
                  { label: '1.5억~3억원', rate: '38%', max: 300_000_000 },
                  { label: '3억~5억원', rate: '40%', max: 500_000_000 },
                  { label: '5억~10억원', rate: '42%', max: 1_000_000_000 },
                  { label: '10억원 초과', rate: '45%', max: Infinity },
                ].map((b, i) => {
                  const isActive = result.taxBase > 0 && (i === 0 ? result.taxBase <= b.max : result.taxBase <= b.max && (i === 0 || result.taxBase > [14_000_000, 50_000_000, 88_000_000, 150_000_000, 300_000_000, 500_000_000, 1_000_000_000][i-1]));
                  return (
                    <tr key={i} className={`border-b border-[#1e2d4a]/50 ${isActive ? 'bg-[#3b82f6]/10' : ''}`}>
                      <td className="py-2 text-gray-300">{b.label}</td>
                      <td className="py-2 text-right" style={{ color: isActive ? category.color : '#9ca3af' }}>{b.rate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 소득세법 제47조(근로소득공제), 제55조(세율), 제59조(세액공제)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
