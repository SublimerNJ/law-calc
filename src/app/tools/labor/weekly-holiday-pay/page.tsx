'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'weekly-holiday-pay')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface HolidayPayResult {
  eligible: boolean;
  weeklyHolidayHours: number;
  amount: number;
}

function calculate(weeklyHours: number, hourlyWage: number, fullAttendance: boolean): HolidayPayResult {
  const eligible = weeklyHours >= 15 && fullAttendance;
  const cappedHours = Math.min(weeklyHours, 40);
  const weeklyHolidayHours = (cappedHours / 40) * 8;
  const amount = eligible ? Math.floor(weeklyHolidayHours * hourlyWage) : 0;

  return { eligible, weeklyHolidayHours, amount };
}

export default function WeeklyHolidayPayPage() {
  const [weeklyHours, setWeeklyHours] = useState('');
  const [hourlyWage, setHourlyWage] = useState('');
  const [fullAttendance, setFullAttendance] = useState(true);
  const [result, setResult] = useState<HolidayPayResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const hours = parseFloat(weeklyHours);
    const wage = parseInt(hourlyWage.replace(/,/g, ''), 10);

    if (!hours || hours <= 0) {
      setError('1주 소정근로시간을 입력해주세요.');
      setResult(null);
      return;
    }

    if (hours < 1) {
      setError('소정근로시간은 1시간 이상이어야 합니다.');
      setResult(null);
      return;
    }

    if (!wage || wage <= 0) {
      setError('시간당 통상임금을 입력해주세요.');
      setResult(null);
      return;
    }

    // 경고: 52시간 초과
    if (hours > 52) {
      setWarning('1주 소정근로시간이 52시간을 초과합니다. 근로기준법 한도(40+연장12시간)를 확인해주세요.');
    }

    // 경고: 비현실적 임금
    if (wage > 1000000) {
      setWarning('시간당 임금이 100만원을 초과합니다. 확인해주세요.');
    }

    setResult(calculate(hours, wage, fullAttendance));
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            1주 소정근로시간 (시간) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 40"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            시간당 통상임금 (원) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={hourlyWage ? parseInt(hourlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setHourlyWage)}
            placeholder="예: 10,030"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">이번 주 개근 여부</label>
          <div className="flex gap-4">
            {[
              { value: true, label: '개근' },
              { value: false, label: '결근 있음' },
            ].map(opt => (
              <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  checked={fullAttendance === opt.value}
                  onChange={() => setFullAttendance(opt.value)}
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

          <div className="mb-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: result.eligible ? `${category.color}1a` : 'rgba(107,114,128,0.2)',
                color: result.eligible ? category.color : '#6b7280',
              }}
            >
              {result.eligible ? '주휴수당 발생' : '주휴수당 미발생'}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">주휴수당 금액</p>
            <p
              className="text-2xl font-bold"
              style={{ color: result.eligible ? category.color : '#6b7280' }}
            >
              {formatNumber(result.amount)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">주휴시간</p>
            <p className="text-lg text-slate-900">{result.weeklyHolidayHours.toFixed(1)}시간</p>
          </div>

          {!result.eligible && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-500 font-semibold mb-1">주휴수당 지급 요건 미충족</p>
              <p className="text-sm text-slate-600">
                {parseFloat(weeklyHours) < 15
                  ? '주 소정근로시간이 15시간 미만이면 주휴수당이 발생하지 않습니다. (주 15시간 이상 근무 및 개근 필요)'
                  : '결근이 있는 경우 해당 주의 주휴수당이 발생하지 않습니다. (주 15시간 이상 근무 및 개근 필요)'}
              </p>
            </div>
          )}

          {result.eligible && (
            <div className="mb-4 p-4 rounded-lg bg-white" style={{ borderLeft: `3px solid ${category.color}` }}>
              <p className="text-xs text-slate-600 mb-1">월 예상 총급여 (기본급 + 주휴수당)</p>
              <p className="text-lg font-bold" style={{ color: category.color }}>
                {formatNumber(Math.floor((parseFloat(weeklyHours) * parseInt(hourlyWage) + result.amount) * 4.33))}원/월
              </p>
              <p className="text-xs text-gray-500 mt-1">
                주 {weeklyHours}시간 × {formatNumber(parseInt(hourlyWage))}원 + 주휴 {formatNumber(result.amount)}원 = 주 {formatNumber(parseFloat(weeklyHours) * parseInt(hourlyWage) + result.amount)}원 × 4.33주
              </p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`주휴시간 = 주근로시간 ÷ 40 × 8
수당 = 주휴시간 × 시간당 통상임금

주휴시간 = min(${weeklyHours}, 40)h ÷ 40 × 8 = ${result.weeklyHolidayHours.toFixed(1)}시간
수당 = ${result.weeklyHolidayHours.toFixed(1)}시간 × ${formatNumber(parseInt(hourlyWage))}원 = ${formatNumber(result.amount)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 제55조(휴일), 시행령 제30조
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <ActionInsight 
          calculatorId="weekly-holiday-pay" 
          amount={result.amount} 
        />
      )}
    </CalculatorLayout>
  );
}
