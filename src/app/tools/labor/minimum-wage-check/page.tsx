'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'minimum-wage-check')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

const MINIMUM_WAGE_2026 = 10030;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface WageCheckResult {
  actualHourly: number;
  isViolation: boolean;
  hourlyDiff: number;
  monthlyShortage: number;
  annualShortage: number;
  monthlyBaseHours: number;
}

function calculateFromMonthly(monthlySalary: number, weeklyHours: number): WageCheckResult {
  const monthlyBaseHours = weeklyHours === 40 ? 209 : 226;
  const actualHourly = Math.floor(monthlySalary / monthlyBaseHours);
  const isViolation = actualHourly < MINIMUM_WAGE_2026;
  const hourlyDiff = Math.max(0, MINIMUM_WAGE_2026 - actualHourly);
  const monthlyShortage = Math.max(0, hourlyDiff * monthlyBaseHours);
  const annualShortage = monthlyShortage * 12;

  return { actualHourly, isViolation, hourlyDiff, monthlyShortage, annualShortage, monthlyBaseHours };
}

function calculateFromHourly(hourlyWage: number): WageCheckResult {
  const isViolation = hourlyWage < MINIMUM_WAGE_2026;
  const hourlyDiff = Math.max(0, MINIMUM_WAGE_2026 - hourlyWage);
  const monthlyBaseHours = 209;
  const monthlyShortage = Math.max(0, hourlyDiff * monthlyBaseHours);
  const annualShortage = monthlyShortage * 12;

  return { actualHourly: hourlyWage, isViolation, hourlyDiff, monthlyShortage, annualShortage, monthlyBaseHours };
}

export default function MinimumWageCheckPage() {
  const [mode, setMode] = useState<'monthly' | 'hourly'>('monthly');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [hourlyWage, setHourlyWage] = useState('');
  const [result, setResult] = useState<WageCheckResult | null>(null);

  const handleCalculate = () => {
    if (mode === 'monthly') {
      const val = parseInt(monthlySalary.replace(/,/g, ''), 10);
      if (!val || val <= 0) return;
      setResult(calculateFromMonthly(val, weeklyHours));
    } else {
      const val = parseInt(hourlyWage.replace(/,/g, ''), 10);
      if (!val || val <= 0) return;
      setResult(calculateFromHourly(val));
    }
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        {/* Tab toggle */}
        <div className="flex mb-6 bg-[#0d1424] rounded-lg p-1">
          <button
            onClick={() => { setMode('monthly'); setResult(null); }}
            className="flex-1 py-2 rounded-md text-sm font-semibold transition-colors"
            style={{
              backgroundColor: mode === 'monthly' ? category.color : 'transparent',
              color: mode === 'monthly' ? '#ffffff' : '#9ca3af',
            }}
          >
            월급 기준
          </button>
          <button
            onClick={() => { setMode('hourly'); setResult(null); }}
            className="flex-1 py-2 rounded-md text-sm font-semibold transition-colors"
            style={{
              backgroundColor: mode === 'hourly' ? category.color : 'transparent',
              color: mode === 'hourly' ? '#ffffff' : '#9ca3af',
            }}
          >
            시급 기준
          </button>
        </div>

        {mode === 'monthly' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">월 수령액 (원)</label>
              <input
                type="text"
                inputMode="numeric"
                value={monthlySalary ? parseInt(monthlySalary).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setMonthlySalary)}
                placeholder="예: 2,000,000"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                최저임금 산입 임금 기준 (기본급+고정수당, 식대/교통비 월 20만원 초과분 제외)
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">1주 소정근로시간</label>
              <div className="flex gap-4">
                {[
                  { value: 40, label: '40시간제 (월 209시간)' },
                  { value: 44, label: '44시간제 (월 226시간)' },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="weeklyHours"
                      checked={weeklyHours === opt.value}
                      onChange={() => setWeeklyHours(opt.value)}
                      className="accent-[#f59e0b]"
                    />
                    <span className="text-sm text-gray-300">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">실제 시급 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              value={hourlyWage ? parseInt(hourlyWage).toLocaleString('ko-KR') : ''}
              onChange={handleNumberChange(setHourlyWage)}
              placeholder="예: 9,860"
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
            />
          </div>
        )}

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
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: result.isViolation ? 'rgba(239,68,68,0.15)' : `${category.color}1a`,
                color: result.isViolation ? '#ef4444' : category.color,
              }}
            >
              {result.isViolation ? '최저임금 위반' : '적법'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">실제 시급</p>
              <p className="text-2xl font-bold" style={{ color: result.isViolation ? '#ef4444' : category.color }}>
                {formatNumber(result.actualHourly)}원
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">2026년 최저임금</p>
              <p className="text-2xl font-bold text-white">
                {formatNumber(MINIMUM_WAGE_2026)}원
              </p>
            </div>
          </div>

          {result.isViolation && (
            <div className="space-y-3 mb-4 p-4 bg-[#0d1424] rounded-lg">
              <div>
                <p className="text-sm text-gray-400 mb-1">차액 시급</p>
                <p className="text-lg font-semibold text-red-400">{formatNumber(result.hourlyDiff)}원</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">월 미지급 금액</p>
                <p className="text-lg font-semibold text-red-400">{formatNumber(result.monthlyShortage)}원</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">연간 미지급 금액</p>
                <p className="text-lg font-semibold text-red-400">{formatNumber(result.annualShortage)}원</p>
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 최저임금법 제6조, 2026년 최저임금 고시 (10,030원/시간)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
