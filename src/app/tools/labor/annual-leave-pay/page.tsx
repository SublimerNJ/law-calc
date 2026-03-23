'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'annual-leave-pay')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

const WORK_HOUR_OPTIONS = [
  { value: 40, label: '40시간 (주5일)', monthlyHours: 209 },
  { value: 44, label: '44시간 (주6일)', monthlyHours: 226 },
];

export default function AnnualLeavePayPage() {
  const [unusedDays, setUnusedDays] = useState('');
  const [monthlyWage, setMonthlyWage] = useState('');
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [result, setResult] = useState<{
    totalPay: number;
    dailyWage: number;
    hourlyWage: number;
    monthlyBaseHours: number;
    days: number;
  } | null>(null);

  const handleCalculate = () => {
    const wage = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
    const days = parseInt(unusedDays, 10);
    if (!wage || wage <= 0 || !days || days <= 0) return;

    const option = WORK_HOUR_OPTIONS.find(o => o.value === weeklyHours)!;
    const monthlyBaseHours = option.monthlyHours;
    const hourlyWage = Math.floor(wage / monthlyBaseHours);
    const dailyWage = hourlyWage * 8;
    const totalPay = dailyWage * days;

    setResult({ totalPay, dailyWage, hourlyWage, monthlyBaseHours, days });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setMonthlyWage(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">미사용 연차일수 (일)</label>
          <input
            type="number"
            min="1"
            value={unusedDays}
            onChange={e => setUnusedDays(e.target.value)}
            placeholder="예: 5"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">월 통상임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 2,090,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
          {monthlyWage && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(monthlyWage).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">1주 소정근로시간</label>
          <div className="flex gap-4">
            {WORK_HOUR_OPTIONS.map(opt => (
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
            <p className="text-sm text-gray-400 mb-1">연차수당 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.totalPay)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">1일 통상임금</p>
              <p className="text-lg text-white">{formatNumber(result.dailyWage)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">시간당 통상임금</p>
              <p className="text-lg text-white">{formatNumber(result.hourlyWage)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">미사용 연차일수</p>
              <p className="text-lg text-white">{result.days}일</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">월 기준시간</p>
              <p className="text-lg text-white">{result.monthlyBaseHours}시간</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">계산식</p>
            <pre className="text-xs text-gray-300 bg-[#0d1424] p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`시급 × 8시간 × 미사용일수 = 연차수당

시급 = 월 통상임금 ÷ 월 기준시간
     = ${formatNumber(parseInt(monthlyWage))}원 ÷ ${result.monthlyBaseHours}시간 = ${formatNumber(result.hourlyWage)}원/시간
1일 통상임금 = ${formatNumber(result.hourlyWage)}원 × 8시간 = ${formatNumber(result.dailyWage)}원
연차수당 합계 = ${formatNumber(result.dailyWage)}원 × ${result.days}일 = ${formatNumber(result.totalPay)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 제60조(연차 유급휴가), 제61조(연차휴가의 사용 촉진) - 사용자는 근로자의 미사용 연차휴가에 대하여 통상임금을 지급하여야 합니다.
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-white mb-4">연차수당 미지급 시</h2>
        <ol className="space-y-3">
          {[
            { color: '#f59e0b', text: '사업주에게 서면 청구' },
            { color: '#ef4444', text: '고용노동부 신고 (1350)' },
            { color: '#10b981', text: '3년 이내 소급 청구 가능' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-gray-300">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </CalculatorLayout>
  );
}
