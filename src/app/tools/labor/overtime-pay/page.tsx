'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'overtime-pay')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface OvertimeResult {
  hourlyWage: number;
  overtimePay: number;
  nightPay: number;
  holidayPay: number;
  total: number;
}

function calculate(
  monthlyWage: number,
  weeklyHours: number,
  overtimeHours: number,
  nightHours: number,
  holidayHours: number,
  holidayOvertimeHours: number,
): OvertimeResult {
  const monthlyBase = weeklyHours === 40 ? 209 : 226;
  const hourlyWage = Math.floor(monthlyWage / monthlyBase);
  const overtimePay = Math.floor(hourlyWage * overtimeHours * 1.5);
  const nightPay = Math.floor(hourlyWage * nightHours * 0.5);
  const holidayPay = Math.floor(hourlyWage * holidayHours * 1.5) + Math.floor(hourlyWage * holidayOvertimeHours * 2.0);
  const total = overtimePay + nightPay + holidayPay;

  return { hourlyWage, overtimePay, nightPay, holidayPay, total };
}

export default function OvertimePayPage() {
  const [monthlyWage, setMonthlyWage] = useState('');
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [overtimeHours, setOvertimeHours] = useState('');
  const [nightHours, setNightHours] = useState('');
  const [holidayHours, setHolidayHours] = useState('');
  const [holidayOvertimeHours, setHolidayOvertimeHours] = useState('');
  const [result, setResult] = useState<OvertimeResult | null>(null);

  const handleCalculate = () => {
    const wage = parseInt(monthlyWage.replace(/,/g, ''), 10);
    if (!wage || wage <= 0) return;
    const ot = parseFloat(overtimeHours) || 0;
    const nt = parseFloat(nightHours) || 0;
    const hd = parseFloat(holidayHours) || 0;
    const hdo = parseFloat(holidayOvertimeHours) || 0;
    setResult(calculate(wage, weeklyHours, ot, nt, hd, hdo));
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleDecimalChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9.]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">월 통상임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setMonthlyWage)}
            placeholder="예: 2,090,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">1주 소정근로시간</label>
          <div className="flex gap-4">
            {[
              { value: 40, label: '40시간제' },
              { value: 44, label: '44시간제' },
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

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">이번 달 연장근로 시간 (최대 52시간)</label>
          <input
            type="text"
            inputMode="decimal"
            value={overtimeHours}
            onChange={handleDecimalChange(setOvertimeHours)}
            placeholder="예: 10"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">이번 달 야간근로 시간 (22:00~06:00)</label>
          <input
            type="text"
            inputMode="decimal"
            value={nightHours}
            onChange={handleDecimalChange(setNightHours)}
            placeholder="예: 5"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">이번 달 휴일근로 시간 (8시간 이내)</label>
          <input
            type="text"
            inputMode="decimal"
            value={holidayHours}
            onChange={handleDecimalChange(setHolidayHours)}
            placeholder="예: 8"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">이번 달 휴일 연장근로 시간 (8시간 초과분)</label>
          <input
            type="text"
            inputMode="decimal"
            value={holidayOvertimeHours}
            onChange={handleDecimalChange(setHolidayOvertimeHours)}
            placeholder="예: 2"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
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

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">수당 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">연장근로수당</p>
              <p className="text-lg text-white">{formatNumber(result.overtimePay)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">야간근로수당</p>
              <p className="text-lg text-white">{formatNumber(result.nightPay)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">휴일근로수당</p>
              <p className="text-lg text-white">{formatNumber(result.holidayPay)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">시간당 통상임금</p>
              <p className="text-lg text-white">{formatNumber(result.hourlyWage)}원</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">계산식</p>
            <pre className="text-xs text-gray-300 bg-[#0d1424] p-3 rounded-lg whitespace-pre-wrap font-mono">
{`시간급 = ${monthlyWage ? formatNumber(parseInt(monthlyWage)) : '0'} ÷ ${weeklyHours === 40 ? 209 : 226} = ${formatNumber(result.hourlyWage)}원
${result.overtimePay > 0 ? `\n연장근로 = ${formatNumber(result.hourlyWage)} × ${overtimeHours}h × 1.5배 = ${formatNumber(result.overtimePay)}원` : ''}${result.nightPay > 0 ? `\n야간근로 = ${formatNumber(result.hourlyWage)} × ${nightHours}h × 0.5배(가산) = ${formatNumber(result.nightPay)}원` : ''}${result.holidayPay > 0 ? `\n휴일근로 = ${formatNumber(result.hourlyWage)} × ${holidayHours}h × 1.5배${holidayOvertimeHours && parseFloat(holidayOvertimeHours) > 0 ? ` + ${formatNumber(result.hourlyWage)} × ${holidayOvertimeHours}h × 2.0배` : ''} = ${formatNumber(result.holidayPay)}원` : ''}`}
            </pre>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-3">수당 배율 기준</p>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-[#1e2d4a]/50"><td className="py-2 text-gray-300">연장근로</td><td className="py-2 text-right text-gray-400">통상시급 × 1.5배</td></tr>
                <tr className="border-b border-[#1e2d4a]/50"><td className="py-2 text-gray-300">야간근로 (22~06시)</td><td className="py-2 text-right text-gray-400">통상시급 × 0.5배 (가산)</td></tr>
                <tr className="border-b border-[#1e2d4a]/50"><td className="py-2 text-gray-300">휴일근로 (8h 이내)</td><td className="py-2 text-right text-gray-400">통상시급 × 1.5배</td></tr>
                <tr><td className="py-2 text-gray-300">휴일 연장 (8h 초과)</td><td className="py-2 text-right text-gray-400">통상시급 × 2.0배</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 제56조 | 야간수당은 기본급에 이미 포함된 시간의 추가분(0.5배)만 가산
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-white mb-4">수당 미지급 시</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>1</span>
            <span className="text-sm text-gray-300">사업주에게 서면 청구</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>2</span>
            <span className="text-sm text-gray-300">고용노동부 신고 (1350)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>3</span>
            <span className="text-sm text-gray-300">3년 이내 미지급 수당 소급 가능</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#f59e0b' }}>4</span>
            <span className="text-sm text-gray-300">근로기준법 위반 시 형사처벌 가능</span>
          </li>
        </ol>
      </div>
    </CalculatorLayout>
  );
}
