'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'four-insurances')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseAmount(s: string): number {
  const v = parseInt(s.replace(/[^0-9]/g, ''), 10);
  return isNaN(v) ? 0 : v;
}

// 2026 rates
const PENSION_RATE = 0.045; // each side
const PENSION_CAP = 6_170_000; // monthly salary cap
const HEALTH_RATE = 0.03545; // each side
const LONGTERM_RATE = 0.1295; // of health insurance premium
const EMPLOYMENT_EMPLOYEE = 0.009;
const EMPLOYMENT_EMPLOYER = 0.0165; // 150인 미만 일반사업장
const INDUSTRIAL_RATE = 0.0147; // manufacturing average

interface InsuranceRow {
  name: string;
  employee: number;
  employer: number;
}

export default function FourInsurancesPage() {
  const [salary, setSalary] = useState('');
  const [result, setResult] = useState<{
    rows: InsuranceRow[];
    totalEmployee: number;
    totalEmployer: number;
  } | null>(null);

  const handleCalculate = () => {
    const monthlySalary = parseAmount(salary);
    if (monthlySalary <= 0) return;

    const pensionBase = Math.min(monthlySalary, PENSION_CAP);
    const pensionEmployee = Math.floor(pensionBase * PENSION_RATE);
    const pensionEmployer = Math.floor(pensionBase * PENSION_RATE);

    const healthEmployee = Math.floor(monthlySalary * HEALTH_RATE);
    const healthEmployer = Math.floor(monthlySalary * HEALTH_RATE);

    const longTermEmployee = Math.floor(healthEmployee * LONGTERM_RATE);
    const longTermEmployer = Math.floor(healthEmployer * LONGTERM_RATE);

    const employmentEmployee = Math.floor(monthlySalary * EMPLOYMENT_EMPLOYEE);
    const employmentEmployer = Math.floor(monthlySalary * EMPLOYMENT_EMPLOYER);

    const industrialEmployee = 0;
    const industrialEmployer = Math.floor(monthlySalary * INDUSTRIAL_RATE);

    const rows: InsuranceRow[] = [
      { name: '국민연금', employee: pensionEmployee, employer: pensionEmployer },
      { name: '건강보험', employee: healthEmployee, employer: healthEmployer },
      { name: '장기요양보험', employee: longTermEmployee, employer: longTermEmployer },
      { name: '고용보험', employee: employmentEmployee, employer: employmentEmployer },
      { name: '산재보험', employee: industrialEmployee, employer: industrialEmployer },
    ];

    const totalEmployee = rows.reduce((s, r) => s + r.employee, 0);
    const totalEmployer = rows.reduce((s, r) => s + r.employer, 0);

    setResult({ rows, totalEmployee, totalEmployer });
  };

  const inputClass = 'w-full px-3 py-2.5 bg-surface-50 border border-border-default rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary text-sm';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-4">
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">급여 정보 입력</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">월 급여 (원)</label>
            <input type="text" className={inputClass} placeholder="예: 3,000,000" value={salary} onChange={e => setSalary(e.target.value)} />
          </div>
          <p className="mt-2 text-xs text-gray-600">* 150인 미만 일반사업장 기준. 산재보험료율은 제조업 평균(1.47%)이며 업종별로 상이합니다.</p>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundColor: category.color }}
        >
          4대보험료 계산하기
        </button>

        {result && (
          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-gray-400 font-medium">항목</th>
                    <th className="text-right py-2 text-gray-400 font-medium">근로자 부담</th>
                    <th className="text-right py-2 text-gray-400 font-medium">사용자 부담</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map(row => (
                    <tr key={row.name} className="border-b border-white/5">
                      <td className="py-2.5 text-gray-300">{row.name}</td>
                      <td className="py-2.5 text-right text-white">{formatNumber(row.employee)}원</td>
                      <td className="py-2.5 text-right text-white">{formatNumber(row.employer)}원</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-white/20">
                    <td className="py-3 font-bold text-white">합계</td>
                    <td className="py-3 text-right font-bold" style={{ color: category.color }}>{formatNumber(result.totalEmployee)}원</td>
                    <td className="py-3 text-right font-bold" style={{ color: category.color }}>{formatNumber(result.totalEmployer)}원</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-surface-50 text-center">
                <p className="text-xs text-gray-500 mb-1">실수령 공제액 (근로자)</p>
                <p className="text-xl font-bold text-white">{formatNumber(result.totalEmployee)}원</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-50 text-center">
                <p className="text-xs text-gray-500 mb-1">사업주 부담 총액</p>
                <p className="text-xl font-bold text-white">{formatNumber(result.totalEmployer)}원</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-surface-50 text-xs text-gray-500">
              <p className="font-semibold text-gray-400 mb-1">법적 근거</p>
              <p>국민연금법, 국민건강보험법, 고용보험법, 산업재해보상보험법 (2026년 요율). 국민연금 상한 월 617만원. 실제 보험료와 다를 수 있으며, 참고용으로만 활용하시기 바랍니다.</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
