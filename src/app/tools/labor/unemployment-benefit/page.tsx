'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'unemployment-benefit')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

const DAILY_UPPER = 66_000;

const BENEFIT_DAYS: Record<string, Record<string, number>> = {
  under50: { lt1: 120, lt3: 150, lt5: 180, lt10: 210, gte10: 240 },
  over50:  { lt1: 120, lt3: 180, lt5: 210, lt10: 240, gte10: 270 },
};

const PERIOD_OPTIONS = [
  { value: 'lt1', label: '1년 미만' },
  { value: 'lt3', label: '1년 ~ 3년' },
  { value: 'lt5', label: '3년 ~ 5년' },
  { value: 'lt10', label: '5년 ~ 10년' },
  { value: 'gte10', label: '10년 이상' },
];

const AGE_OPTIONS = [
  { value: 'under50', label: '50세 미만' },
  { value: 'over50', label: '50세 이상 / 장애인' },
];

const HOURS_OPTIONS = [
  { value: 8, label: '8시간 (전일제)' },
  { value: 6, label: '6시간' },
  { value: 4, label: '4시간 (단시간)' },
];

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function UnemploymentBenefitPage() {
  const [monthlyWage, setMonthlyWage] = useState('');
  const [period, setPeriod] = useState('lt5');
  const [ageGroup, setAgeGroup] = useState('under50');
  const [dailyHours, setDailyHours] = useState(8);
  const [result, setResult] = useState<{
    dailyBase: number;
    dailyPayment: number;
    days: number;
    total: number;
    lowerApplied: boolean;
    upperApplied: boolean;
    dailyLower: number;
  } | null>(null);

  const handleCalculate = () => {
    const w = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
    if (!w || w <= 0) return;

    const dailyLower = Math.floor(10_030 * 0.8 * dailyHours);
    const dailyBase = Math.floor((w * 12) / 365 * 0.6);
    let dailyPayment = dailyBase;
    let upperApplied = false;
    let lowerApplied = false;

    if (dailyPayment > DAILY_UPPER) {
      dailyPayment = DAILY_UPPER;
      upperApplied = true;
    }
    if (dailyPayment < dailyLower) {
      dailyPayment = dailyLower;
      lowerApplied = true;
    }

    const days = BENEFIT_DAYS[ageGroup][period];
    const total = dailyPayment * days;

    setResult({ dailyBase, dailyPayment, days, total, lowerApplied, upperApplied, dailyLower });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">퇴직 전 3개월 평균 월임금 (세전, 원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={e => setMonthlyWage(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 3,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">피보험기간</label>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          >
            {PERIOD_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">연령/장애 구분</label>
          <div className="flex gap-4">
            {AGE_OPTIONS.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ageGroup"
                  checked={ageGroup === opt.value}
                  onChange={() => setAgeGroup(opt.value)}
                  className="accent-[#f59e0b]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">1일 소정근로시간</label>
          <select
            value={dailyHours}
            onChange={e => setDailyHours(Number(e.target.value))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          >
            {HOURS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
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

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">총 실업급여 예상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">소정급여일수</p>
              <p className="text-lg text-white">{result.days}일</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">1일 지급액</p>
              <p className="text-lg text-white">{formatNumber(result.dailyPayment)}원</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">기초일액 (평균임금 60%)</p>
              <p className="text-lg text-white">{formatNumber(result.dailyBase)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">적용 여부</p>
              <p className="text-sm text-white">
                {result.upperApplied && (
                  <span className="text-yellow-400">상한 적용 ({formatNumber(DAILY_UPPER)}원/일)</span>
                )}
                {result.lowerApplied && (
                  <span className="text-yellow-400">하한 적용 ({formatNumber(result.dailyLower)}원/일)</span>
                )}
                {!result.upperApplied && !result.lowerApplied && (
                  <span className="text-green-400">상한/하한 미적용</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 고용보험법 제46조(구직급여일액), 제50조(소정급여일수) | 2026년 기준 상한 {formatNumber(DAILY_UPPER)}원/일
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
