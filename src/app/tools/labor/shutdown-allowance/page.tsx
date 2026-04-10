'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'shutdown-allowance')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseNum(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function ShutdownAllowancePage() {
  const [dailyAvgWage, setDailyAvgWage] = useState('');
  const [monthlyOrdinaryWage, setMonthlyOrdinaryWage] = useState('');
  const [shutdownDays, setShutdownDays] = useState('');
  const [laborBoardApproval, setLaborBoardApproval] = useState(false);
  const [approvedRate, setApprovedRate] = useState('60');
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const avgWage = parseNum(dailyAvgWage);
  const ordinaryWageMonthly = parseNum(monthlyOrdinaryWage);
  const days = parseNum(shutdownDays);

  const dailyOrdinaryWage = Math.floor(ordinaryWageMonthly / 30);
  const avgWage70 = Math.floor(avgWage * 0.7);

  // 근로기준법 제46조 제1항:
  // 원칙: 평균임금의 70% 이상 지급
  // 단서: 평균임금의 70%가 통상임금을 초과하면 통상임금을 지급할 수 있음 (상한 제한)
  const effectiveDaily = laborBoardApproval
    ? Math.floor(avgWage * (parseFloat(approvedRate) || 70) / 100)
    : (avgWage70 > dailyOrdinaryWage && dailyOrdinaryWage > 0)
      ? dailyOrdinaryWage
      : avgWage70;

  const totalByAvg70 = avgWage70 * days;
  const totalByOrdinary = dailyOrdinaryWage * days;
  const totalAllowance = effectiveDaily * days;

  const higherBase = avgWage70 >= dailyOrdinaryWage ? '평균임금 70%' : '통상임금';

  const handleCalculate = () => {
    setError(null);
    setWarning(null);
    setCalculated(false);

    if (avgWage <= 0) {
      setError('1일 평균임금을 입력해주세요.');
      return;
    }
    if (days <= 0) {
      setError('휴업일수를 입력해주세요.');
      return;
    }
    if (laborBoardApproval) {
      const rate = parseFloat(approvedRate);
      if (!approvedRate || isNaN(rate) || rate <= 0) {
        setError('승인 지급률(%)을 입력해주세요.');
        return;
      }
    }

    let warn = '';
    if (avgWage > 500_000) {
      warn = '1일 평균임금이 50만원을 초과합니다. 확인해주세요.';
    }
    if (days > 365) {
      const extra = '휴업일수가 1년을 초과합니다. 확인해주세요.';
      warn = warn ? warn + ' ' + extra : extra;
    }
    if (warn) setWarning(warn);

    setCalculated(true);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">1일 평균임금 (원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={dailyAvgWage ? parseNum(dailyAvgWage).toLocaleString('ko-KR') : ''}
            onChange={e => setDailyAvgWage(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="평균임금 계산기에서 산출한 금액"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">월 통상임금 (원, 선택사항)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyOrdinaryWage ? parseNum(monthlyOrdinaryWage).toLocaleString('ko-KR') : ''}
            onChange={e => setMonthlyOrdinaryWage(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="비교 기준 통상임금"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          {ordinaryWageMonthly > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              1일 통상임금: {formatNumber(dailyOrdinaryWage)}원 (월통상임금 / 30)
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">휴업일수 (일) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={shutdownDays ? parseNum(shutdownDays).toLocaleString('ko-KR') : ''}
            onChange={e => setShutdownDays(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="휴업 기간의 일수"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={laborBoardApproval}
              onChange={e => setLaborBoardApproval(e.target.checked)}
              className="accent-[#f59e0b] w-4 h-4"
            />
            <span className="text-sm text-slate-600">노동위원회 승인 (특수사정에 의한 지급률 조정)</span>
          </label>
        </div>

        {laborBoardApproval && (
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">승인 지급률 (%) *</label>
            <input
              type="text"
              inputMode="numeric"
              value={approvedRate}
              onChange={e => setApprovedRate(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="60"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              노동위원회 승인 시 평균임금의 70% 미만으로 지급 가능
            </p>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-[#d97706] text-white font-semibold py-3 rounded-lg transition-colors mt-2"
        >
          계산하기
        </button>
      </div>

      {calculated && avgWage > 0 && days > 0 && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">총 휴업수당</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(totalAllowance)}원
            </p>
            <p className="text-xs text-gray-500 mt-1">
              1일 {formatNumber(effectiveDaily)}원 x {formatNumber(days)}일
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">평균임금 70% 기준</p>
              <p className="text-lg text-slate-900">{formatNumber(avgWage70)}원/일</p>
              <p className="text-sm text-slate-600">{formatNumber(totalByAvg70)}원 (총액)</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">통상임금 기준</p>
              <p className="text-lg text-slate-900">{formatNumber(dailyOrdinaryWage)}원/일</p>
              <p className="text-sm text-slate-600">{formatNumber(totalByOrdinary)}원 (총액)</p>
            </div>
          </div>

          {!laborBoardApproval && ordinaryWageMonthly > 0 && (
            <div className="mb-4 bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-1">적용 기준</p>
              <p className="text-sm text-slate-900">
                {higherBase} 적용 ({avgWage70 >= dailyOrdinaryWage
                  ? `평균임금 70%(${formatNumber(avgWage70)}원) >= 통상임금(${formatNumber(dailyOrdinaryWage)}원)`
                  : `통상임금(${formatNumber(dailyOrdinaryWage)}원) > 평균임금 70%(${formatNumber(avgWage70)}원)`
                })
              </p>
            </div>
          )}

          {laborBoardApproval && (
            <div className="mb-4 bg-white rounded-lg p-3">
              <p className="text-sm text-slate-600 mb-1">노동위원회 승인 지급률</p>
              <p className="text-sm text-slate-900">
                평균임금의 {approvedRate}% = {formatNumber(effectiveDaily)}원/일
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`평균임금×70% × 휴업일수 = 총 휴업수당
(단, 평균임금 70%가 통상임금 초과 시 통상임금 적용)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 제46조 (휴업수당)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              * 사용자 귀책사유 없는 휴업(천재지변 등)은 노동위원회 승인 후 지급률 조정 가능
            </p>
          </div>
        </div>
      )}

      {calculated && avgWage > 0 && days > 0 && (
        <ActionInsight 
          calculatorId="shutdown-allowance" 
          amount={totalAllowance} 
        />
      )}
    </CalculatorLayout>
  );
}
