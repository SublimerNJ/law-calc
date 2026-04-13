'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
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
const PENSION_RATE = 0.0475; // each side (2026년 인상: 4.5→4.75%)
const PENSION_CAP = 6_370_000; // monthly salary cap (2026년 상한: 617→637만원)
const HEALTH_RATE = 0.03595; // each side (2026년 인상: 3.545→3.595%)
const LONGTERM_RATE = 0.1314; // of health insurance premium (2026년: 약 13.14%)
const EMPLOYMENT_EMPLOYEE = 0.009;
const EMPLOYMENT_EMPLOYER = 0.0115; // 150인 미만: 실업급여 0.9% + 고용안정·직업능력개발 0.25%
const INDUSTRIAL_RATE = 0.0147; // manufacturing average

interface InsuranceRow {
  name: string;
  employee: number;
  employer: number;
  employeeRate: string;
  employerRate: string;
}

export default function FourInsurancesPage() {
  const [salary, setSalary] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<{
    rows: InsuranceRow[];
    totalEmployee: number;
    totalEmployer: number;
  } | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const monthlySalary = parseAmount(salary);

    if (monthlySalary <= 0) {
      setError('월 급여를 입력해주세요.');
      setResult(null);
      return;
    }

    if (monthlySalary > 50_000_000) {
      setWarning('월 급여가 5,000만원을 초과합니다. 입력값을 확인해주세요.');
    }

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
      { name: '국민연금', employee: pensionEmployee, employer: pensionEmployer, employeeRate: '4.75%', employerRate: '4.75%' },
      { name: '건강보험', employee: healthEmployee, employer: healthEmployer, employeeRate: '3.595%', employerRate: '3.595%' },
      { name: '장기요양보험', employee: longTermEmployee, employer: longTermEmployer, employeeRate: '13.14%*', employerRate: '13.14%*' },
      { name: '고용보험', employee: employmentEmployee, employer: employmentEmployer, employeeRate: '0.9%', employerRate: '1.15%' },
      { name: '산재보험', employee: industrialEmployee, employer: industrialEmployer, employeeRate: '-', employerRate: '1.47%' },
    ];

    const totalEmployee = rows.reduce((s, r) => s + r.employee, 0);
    const totalEmployer = rows.reduce((s, r) => s + r.employer, 0);

    setResult({ rows, totalEmployee, totalEmployer });
  };

  const inputClass = 'w-full px-3 py-2.5 bg-surface-50 border border-border-default rounded-lg text-slate-900 placeholder-gray-600 focus:outline-none focus:border-brand-primary text-sm';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-4">
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">급여 정보 입력</h2>
          <div>
            <label className="block text-sm text-slate-600 mb-1">월 급여 (원) *</label>
            <input type="text" className={inputClass} placeholder="예: 3,000,000" value={salary} onChange={e => setSalary(e.target.value.replace(/[^0-9]/g, ''))} />
          </div>
          <p className="mt-2 text-xs text-gray-600">* 150인 미만 사업장 기준 (고용안정·직업능력개발 0.25% 적용). 산재보험료율은 제조업 평균(1.47%)이며 업종별로 상이합니다.</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button aria-label="Action button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-xl font-semibold text-slate-900 transition-all"
          style={{ backgroundColor: category.color }}
        >
          4대보험료 계산하기
        </button>

        {result && (
          <>
          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-slate-600 font-medium">항목</th>
                    <th className="text-right py-2 text-slate-600 font-medium text-xs">요율</th>
                    <th className="text-right py-2 text-slate-600 font-medium">근로자</th>
                    <th className="text-right py-2 text-slate-600 font-medium">사용자</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map(row => (
                    <tr key={row.name} className="border-b border-white/5">
                      <td className="py-2.5 text-slate-600">{row.name}</td>
                      <td className="py-2.5 text-right text-xs text-gray-500">{row.employeeRate}</td>
                      <td className="py-2.5 text-right text-slate-900">{formatNumber(row.employee)}원</td>
                      <td className="py-2.5 text-right text-slate-900">{formatNumber(row.employer)}원</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-white/20">
                    <td className="py-3 font-bold text-slate-900">합계</td>
                    <td className="py-3"></td>
                    <td className="py-3 text-right font-bold" style={{ color: category.color }}>{formatNumber(result.totalEmployee)}원</td>
                    <td className="py-3 text-right font-bold" style={{ color: category.color }}>{formatNumber(result.totalEmployer)}원</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-surface-50 text-center glassmorphism glass-panel">
                <p className="text-xs text-gray-500 mb-1">4대보험 공제액</p>
                <p className="text-lg font-bold text-slate-900">{formatNumber(result.totalEmployee)}원</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-50 text-center glassmorphism glass-panel">
                <p className="text-xs text-gray-500 mb-1">예상 실수령액</p>
                <p className="text-lg font-bold" style={{ color: category.color }}>{formatNumber(parseAmount(salary) - result.totalEmployee)}원</p>
                <p className="text-xs text-gray-600">소득세 별도</p>
              </div>
              <div className="p-3 rounded-lg bg-surface-50 text-center glassmorphism glass-panel">
                <p className="text-xs text-gray-500 mb-1">사업주 총비용</p>
                <p className="text-lg font-bold text-slate-900">{formatNumber(parseAmount(salary) + result.totalEmployer)}원</p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-lg bg-surface-50 glassmorphism glass-panel">
              <p className="text-xs text-gray-500">* 장기요양보험 요율은 건강보험료의 13.14% | 국민연금 월 상한 {formatNumber(PENSION_CAP)}원</p>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-surface-50 text-xs text-gray-500 glassmorphism glass-panel">
              <p className="font-semibold text-slate-600 mb-1">법적 근거</p>
              <p>국민연금법, 국민건강보험법, 고용보험법, 산업재해보상보험법 (2026년 요율). 국민연금 상한 월 637만원. 실제 보험료와 다를 수 있으며, 참고용으로만 활용하시기 바랍니다.</p>
            </div>
          </div>
          <ActionInsight calculatorId="four-insurances" amount={result.totalEmployee} />
          </>
        )}
      </div>
    </CalculatorLayout>
  );
}
