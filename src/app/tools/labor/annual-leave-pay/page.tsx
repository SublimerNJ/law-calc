'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
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
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const wage = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
    if (!wage || wage <= 0) {
      setError('월 통상임금을 입력해주세요.');
      setResult(null);
      return;
    }

    const days = parseInt(unusedDays, 10);
    if (!unusedDays || isNaN(days) || days <= 0) {
      setError('미사용 연차일수를 입력해주세요.');
      setResult(null);
      return;
    }

    const newWarnings: string[] = [];
    if (days > 25) {
      newWarnings.push('미사용 연차일수가 25일을 초과합니다. 근로기준법상 연차 한도(최대 25일)를 확인해주세요.');
    }
    if (wage > 100_000_000) {
      newWarnings.push('월 통상임금이 1억원을 초과합니다. 확인해주세요.');
    }
    if (newWarnings.length > 0) {
      setWarning(newWarnings.join(' '));
    }

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

  const handleUnusedDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnusedDays(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">미사용 연차일수 (일) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={unusedDays}
            onChange={handleUnusedDaysChange}
            placeholder="예: 5"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            연차 일수 기준 (근로기준법 제60조): 1년 미만 월 개근 시 1일(최대 11일), 1년 이상 80% 출근 시 15일, 3년 이상 매 2년마다 1일 추가(최대 25일)
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">월 통상임금 (원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 2,090,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          {monthlyWage && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(monthlyWage).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">1주 소정근로시간</label>
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
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

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

          {result.totalPay === 0 && (
            <div className="mb-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-sm text-yellow-700">
                연차수당이 0원입니다. 임금 정보를 확인해주세요.
              </p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">연차수당 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.totalPay)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">1일 통상임금</p>
              <p className="text-lg text-slate-900">{formatNumber(result.dailyWage)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">시간당 통상임금</p>
              <p className="text-lg text-slate-900">{formatNumber(result.hourlyWage)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">미사용 연차일수</p>
              <p className="text-lg text-slate-900">{result.days}일</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">월 기준시간</p>
              <p className="text-lg text-slate-900">{result.monthlyBaseHours}시간</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`시급 × 8시간 × 미사용일수 = 연차수당

시급 = 월 통상임금 ÷ 월 기준시간
     = ${formatNumber(parseInt(monthlyWage))}원 ÷ ${result.monthlyBaseHours}시간 = ${formatNumber(result.hourlyWage)}원/시간
1일 통상임금 = ${formatNumber(result.hourlyWage)}원 × 8시간 = ${formatNumber(result.dailyWage)}원
연차수당 합계 = ${formatNumber(result.dailyWage)}원 × ${result.days}일 = ${formatNumber(result.totalPay)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 제60조(연차 유급휴가) - 사용자는 근로자의 미사용 연차휴가에 대하여 통상임금을 지급하여야 합니다. 단, 제61조(연차휴가의 사용 촉진)에 따라 사용자가 적법한 사용촉진 조치를 취한 경우에는 미사용 수당 지급 의무가 면제될 수 있습니다.
            </p>
          </div>
          <ActionInsight calculatorId="annual-leave-pay" amount={result.totalPay} />
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">연차수당 미지급 시</h2>
        <ol className="space-y-3">
          {[
            { color: '#f59e0b', text: '사업주에게 서면 청구' },
            { color: '#ef4444', text: '고용노동부 신고 (1350)' },
            { color: '#10b981', text: '3년 이내 소급 청구 가능' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </CalculatorLayout>
  );
}
