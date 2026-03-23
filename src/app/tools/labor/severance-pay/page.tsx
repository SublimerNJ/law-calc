'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'severance-pay')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

type WageMode = 'monthly' | 'total';

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function getDaysInRange(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function getThreeMonthDays(exitDate: Date): number {
  const end = new Date(exitDate);
  const start = new Date(exitDate);
  start.setMonth(start.getMonth() - 3);
  return getDaysInRange(start, end);
}

// 퇴직소득세 간이 계산 (근속연수공제 + 환산급여 기준)
function estimateRetirementTax(severance: number, years: number): number {
  if (severance <= 0 || years <= 0) return 0;
  // 근속연수공제
  const fullYears = Math.max(1, Math.floor(years));
  let deduction: number;
  if (fullYears <= 5) deduction = fullYears * 1_000_000;
  else if (fullYears <= 10) deduction = 5_000_000 + (fullYears - 5) * 2_000_000;
  else if (fullYears <= 20) deduction = 15_000_000 + (fullYears - 10) * 2_500_000;
  else deduction = 40_000_000 + (fullYears - 20) * 3_000_000;

  const taxBase = Math.max(0, severance - deduction);
  // 환산급여 = (과세표준 / 근속연수) × 12
  const converted = (taxBase / fullYears) * 12;
  // 환산세액 계산 (기본세율 적용)
  let tax: number;
  if (converted <= 14_000_000) tax = converted * 0.06;
  else if (converted <= 50_000_000) tax = 840_000 + (converted - 14_000_000) * 0.15;
  else if (converted <= 88_000_000) tax = 6_240_000 + (converted - 50_000_000) * 0.24;
  else tax = 15_360_000 + (converted - 88_000_000) * 0.35;
  // 실제 세액 = (환산세액 / 12) × 근속연수
  const actualTax = Math.floor((tax / 12) * fullYears);
  return actualTax;
}

interface CalcResult {
  severancePay: number;
  totalDays: number;
  years: number;
  dailyAvgWage: number;
  threeMonthDays: number;
  threeMonthTotal: number;
  eligible: boolean;
  retirementTax: number;
  netSeverance: number;
}

export default function SeverancePayPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [wageMode, setWageMode] = useState<WageMode>('monthly');
  const [monthlyWage, setMonthlyWage] = useState('');
  const [totalWage, setTotalWage] = useState('');
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleCalculate = () => {
    if (!startDate || !endDate) return;
    const start = new Date(startDate);
    const end = new Date(endDate);

    let threeMonthTotal: number;
    if (wageMode === 'monthly') {
      const monthly = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
      if (!monthly || monthly <= 0) return;
      threeMonthTotal = monthly * 3;
    } else {
      threeMonthTotal = parseInt(totalWage.replace(/[^0-9]/g, ''), 10);
      if (!threeMonthTotal || threeMonthTotal <= 0) return;
    }

    const totalDays = getDaysInRange(start, end);
    if (totalDays <= 0) return;

    const eligible = totalDays >= 365;
    const threeMonthDays = getThreeMonthDays(end);
    const dailyAvgWage = threeMonthTotal / threeMonthDays;
    const severancePay = Math.floor(dailyAvgWage * 30 * (totalDays / 365));
    const years = totalDays / 365;
    const retirementTax = estimateRetirementTax(severancePay, years);
    const netSeverance = severancePay - retirementTax;

    setResult({
      severancePay,
      totalDays,
      years: Math.floor(years * 100) / 100,
      dailyAvgWage: Math.floor(dailyAvgWage),
      threeMonthDays,
      threeMonthTotal,
      eligible,
      retirementTax,
      netSeverance,
    });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  const inputClass = 'w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">입사일</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">퇴사일</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">임금 입력 방식</label>
          <div className="flex gap-4">
            {([
              { value: 'monthly' as WageMode, label: '월급으로 입력' },
              { value: 'total' as WageMode, label: '3개월 합계로 입력' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="wageMode" checked={wageMode === opt.value} onChange={() => setWageMode(opt.value)} className="accent-[#f59e0b]" />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {wageMode === 'monthly' ? (
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-2">월 급여 (세전, 원)</label>
            <input type="text" inputMode="numeric" value={displayValue(monthlyWage)} onChange={handleNumberChange(setMonthlyWage)} placeholder="예: 3,000,000" className={inputClass} />
            <p className="text-xs text-gray-500 mt-1">기본급 + 고정수당 포함 (세전 월급)</p>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-2">퇴직 전 3개월 총 임금 (세전, 원)</label>
            <input type="text" inputMode="numeric" value={displayValue(totalWage)} onChange={handleNumberChange(setTotalWage)} placeholder="예: 9,000,000" className={inputClass} />
            <p className="text-xs text-gray-500 mt-1">매월 급여가 다른 경우 (잔업수당 변동 등) 3개월 합계 직접 입력</p>
          </div>
        )}

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: category.color }}>
          퇴직금 계산하기
        </button>
      </div>

      {result !== null && (
        <>
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

            {!result.eligible && (
              <div className="mb-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-sm text-yellow-400">
                  재직기간 1년 미만({formatNumber(result.totalDays)}일). 법정 퇴직금은 1년 이상 근무 시 발생하나, 취업규칙에 따라 비례 퇴직금이 지급될 수 있습니다.
                </p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">{result.eligible ? '퇴직금 (세전)' : '비례 퇴직금 (참고용, 세전)'}</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.severancePay)}원
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-white">
                <p className="text-xs text-slate-600 mb-1">예상 퇴직소득세</p>
                <p className="text-lg text-red-400">-{formatNumber(result.retirementTax)}원</p>
              </div>
              <div className="p-3 rounded-lg bg-white" style={{ borderLeft: `3px solid ${category.color}` }}>
                <p className="text-xs text-slate-600 mb-1">예상 실수령액</p>
                <p className="text-lg font-bold" style={{ color: category.color }}>{formatNumber(result.netSeverance)}원</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-600 mb-1">재직기간</p>
                <p className="text-sm text-slate-900">{formatNumber(result.totalDays)}일 ({result.years}년)</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">1일 평균임금</p>
                <p className="text-sm text-slate-900">{formatNumber(result.dailyAvgWage)}원</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">3개월 총임금</p>
                <p className="text-sm text-slate-900">{formatNumber(result.threeMonthTotal)}원</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">3개월 역일수</p>
                <p className="text-sm text-slate-900">{result.threeMonthDays}일</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-6">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono mb-4">
{`[퇴직금]
3개월 총임금: ${formatNumber(result.threeMonthTotal)}원${wageMode === 'monthly' ? ` (월 ${displayValue(monthlyWage)} × 3)` : ''}
1일 평균임금 = ${formatNumber(result.threeMonthTotal)} ÷ ${result.threeMonthDays}일 = ${formatNumber(result.dailyAvgWage)}원
퇴직금 = ${formatNumber(result.dailyAvgWage)} × 30 × (${formatNumber(result.totalDays)} ÷ 365)
       = ${formatNumber(result.severancePay)}원

[퇴직소득세 (간이)]
퇴직소득세: ${formatNumber(result.retirementTax)}원
실수령액: ${formatNumber(result.severancePay)} - ${formatNumber(result.retirementTax)} = ${formatNumber(result.netSeverance)}원`}
            </pre>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-gray-500">
                법적 근거: 근로자퇴직급여 보장법 제8조 | 퇴직소득세: 소득세법 제48조
              </p>
              <p className="text-xs text-gray-500 mt-1">
                퇴직소득세는 간이 계산이며, 실제 세액과 다를 수 있습니다.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}
