'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'severance-pay')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function getDaysInRange(start: Date, end: Date): number {
  return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function getThreeMonthDays(exitDate: Date): number {
  const d = new Date(exitDate);
  const end = new Date(d);
  const start = new Date(d);
  start.setMonth(start.getMonth() - 3);
  return getDaysInRange(start, end);
}

export default function SeverancePayPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalWage, setTotalWage] = useState('');
  const [result, setResult] = useState<{
    severancePay: number;
    totalDays: number;
    years: number;
    dailyAvgWage: number;
    threeMonthDays: number;
    eligible: boolean;
  } | null>(null);

  const handleCalculate = () => {
    if (!startDate || !endDate || !totalWage) return;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const wage = parseInt(totalWage.replace(/[^0-9]/g, ''), 10);
    if (!wage || wage <= 0) return;

    const totalDays = getDaysInRange(start, end);
    if (totalDays <= 0) return;

    const eligible = totalDays >= 365;
    const threeMonthDays = getThreeMonthDays(end);
    const dailyAvgWage = wage / threeMonthDays;
    const severancePay = eligible
      ? Math.floor(dailyAvgWage * 30 * (totalDays / 365))
      : 0;

    setResult({
      severancePay,
      totalDays,
      years: Math.floor((totalDays / 365) * 100) / 100,
      dailyAvgWage: Math.floor(dailyAvgWage),
      threeMonthDays,
      eligible,
    });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setTotalWage(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">입사일</label>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">퇴사일</label>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">퇴직 전 3개월 총 임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={totalWage ? parseInt(totalWage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 9,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
          {totalWage && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(totalWage).toLocaleString('ko-KR')}원 (기본급 + 수당 합계)
            </p>
          )}
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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          {!result.eligible ? (
            <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-400">
                재직기간이 1년 미만(총 {formatNumber(result.totalDays)}일)으로 퇴직금이 발생하지 않습니다.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">퇴직금</p>
                <p className="text-2xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.severancePay)}원
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">재직일수</p>
                  <p className="text-lg text-white">{formatNumber(result.totalDays)}일</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">재직연수</p>
                  <p className="text-lg text-white">{result.years}년</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">1일 평균임금</p>
                  <p className="text-lg text-white">{formatNumber(result.dailyAvgWage)}원</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">3개월 일수</p>
                  <p className="text-lg text-white">{result.threeMonthDays}일</p>
                </div>
              </div>
            </>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 근로자퇴직급여 보장법 제8조 제1항 - 퇴직금은 계속근로기간 1년에 대하여 30일분 이상의 평균임금을 퇴직금으로 지급하여야 합니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
