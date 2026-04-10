'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'unemployment-benefit')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

const DAILY_UPPER = 68_100; // 2026.1.1 인상 (고용보험법 시행령 개정)

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
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
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
    setError(null);
    setWarning(null);

    const w = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
    if (!w || w <= 0) {
      setError('퇴직 전 3개월 평균 월임금을 입력해주세요.');
      setResult(null);
      return;
    }

    if (w > 100_000_000) {
      setWarning('월임금이 1억원을 초과합니다. 입력값을 확인해주세요.');
    }

    const dailyLower = Math.floor(10_320 * 0.8 * dailyHours); // 2026년 최저임금 10,320원/시간 (고용노동부 고시)
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
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">퇴직 전 3개월 평균 월임금 (세전, 원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={e => setMonthlyWage(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">피보험기간 (고용보험 가입기간)</label>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {PERIOD_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">연령/장애 구분</label>
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
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">1일 소정근로시간</label>
          <select
            value={dailyHours}
            onChange={e => setDailyHours(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {HOURS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-[#d97706] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">총 실업급여 예상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white">
              <p className="text-xs text-slate-600 mb-1">수령 기간</p>
              <p className="text-lg text-slate-900 font-semibold">{Math.floor(result.days / 30)}개월</p>
              <p className="text-xs text-gray-500">({result.days}일)</p>
            </div>
            <div className="p-3 rounded-lg bg-white">
              <p className="text-xs text-slate-600 mb-1">월 수령액 (약)</p>
              <p className="text-lg text-slate-900 font-semibold">{formatNumber(result.dailyPayment * 30)}원</p>
            </div>
            <div className="p-3 rounded-lg bg-white">
              <p className="text-xs text-slate-600 mb-1">1일 지급액</p>
              <p className="text-lg text-slate-900">{formatNumber(result.dailyPayment)}원</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">기초일액 (평균임금 60%)</p>
              <p className="text-lg text-slate-900">{formatNumber(result.dailyBase)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">적용 여부</p>
              <p className="text-sm text-slate-900">
                {result.upperApplied && (
                  <span className="text-yellow-600">상한 적용 ({formatNumber(DAILY_UPPER)}원/일)</span>
                )}
                {result.lowerApplied && (
                  <span className="text-yellow-600">하한 적용 ({formatNumber(result.dailyLower)}원/일)</span>
                )}
                {!result.upperApplied && !result.lowerApplied && (
                  <span className="text-green-600">상한/하한 미적용</span>
                )}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">월 환산 금액 (약)</p>
            <p className="text-lg text-slate-900">{formatNumber(result.dailyPayment * 30)}원/월</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
{`기초일액 = (월급 × 12) ÷ 365 × 60%
  = (${monthlyWage ? formatNumber(parseInt(monthlyWage)) : '0'} × 12) ÷ 365 × 0.6
  = ${formatNumber(result.dailyBase)}원/일

1일 지급액 = ${result.upperApplied ? `상한 적용 → ${formatNumber(DAILY_UPPER)}원` : result.lowerApplied ? `하한 적용 → ${formatNumber(result.dailyLower)}원` : `${formatNumber(result.dailyPayment)}원 (상한·하한 미적용)`}

총 실업급여 = ${formatNumber(result.dailyPayment)} × ${result.days}일 = ${formatNumber(result.total)}원`}
            </pre>
          </div>

          {/* 소정급여일수 기준표 */}
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">소정급여일수 기준표</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-2 text-left text-gray-500">피보험기간</th>
                    <th className="py-2 text-right text-gray-500">50세 미만</th>
                    <th className="py-2 text-right text-gray-500">50세 이상</th>
                  </tr>
                </thead>
                <tbody>
                  {PERIOD_OPTIONS.map(p => {
                    const isActive = p.value === period;
                    return (
                      <tr key={p.value} className={`border-b border-slate-200/50 ${isActive ? 'bg-blue-600/10' : ''}`}>
                        <td className="py-2 text-slate-600">{p.label}</td>
                        <td className="py-2 text-right" style={{ color: isActive && ageGroup === 'under50' ? category.color : '#9ca3af' }}>
                          {BENEFIT_DAYS.under50[p.value]}일
                        </td>
                        <td className="py-2 text-right" style={{ color: isActive && ageGroup === 'over50' ? category.color : '#9ca3af' }}>
                          {BENEFIT_DAYS.over50[p.value]}일
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 고용보험법 제45조(구직급여 기초일액), 제46조(구직급여일액), 제50조(소정급여일수) | 2026년 기준 상한 {formatNumber(DAILY_UPPER)}원/일, 하한 최저임금(10,320원) × 80% × 소정근로시간
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <ActionInsight 
          calculatorId="unemployment-benefit" 
          amount={result.total} 
        />
      )}
    </CalculatorLayout>
  );
}
