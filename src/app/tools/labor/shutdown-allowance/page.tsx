'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
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

  const avgWage = parseNum(dailyAvgWage);
  const ordinaryWageMonthly = parseNum(monthlyOrdinaryWage);
  const days = parseNum(shutdownDays);

  const dailyOrdinaryWage = Math.floor(ordinaryWageMonthly / 30);
  const avgWage70 = Math.floor(avgWage * 0.7);

  // Which base to apply
  const effectiveDaily = laborBoardApproval
    ? Math.floor(avgWage * (parseFloat(approvedRate) || 70) / 100)
    : Math.max(avgWage70, dailyOrdinaryWage);

  const totalByAvg70 = avgWage70 * days;
  const totalByOrdinary = dailyOrdinaryWage * days;
  const totalAllowance = effectiveDaily * days;

  const higherBase = avgWage70 >= dailyOrdinaryWage ? '평균임금 70%' : '통상임금';

  const handleCalculate = () => {
    if (avgWage <= 0 || days <= 0) return;
    setCalculated(true);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">1일 평균임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={dailyAvgWage ? parseNum(dailyAvgWage).toLocaleString('ko-KR') : ''}
            onChange={e => setDailyAvgWage(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="평균임금 계산기에서 산출한 금액"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">월 통상임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyOrdinaryWage ? parseNum(monthlyOrdinaryWage).toLocaleString('ko-KR') : ''}
            onChange={e => setMonthlyOrdinaryWage(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="비교 기준 통상임금"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
          {ordinaryWageMonthly > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              1일 통상임금: {formatNumber(dailyOrdinaryWage)}원 (월통상임금 / 30)
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">휴업일수 (일)</label>
          <input
            type="text"
            inputMode="numeric"
            value={shutdownDays ? parseNum(shutdownDays).toLocaleString('ko-KR') : ''}
            onChange={e => setShutdownDays(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="휴업 기간의 일수"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
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
            <span className="text-sm text-gray-300">노동위원회 승인 (특수사정에 의한 지급률 조정)</span>
          </label>
        </div>

        {laborBoardApproval && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">승인 지급률 (%)</label>
            <input
              type="text"
              inputMode="numeric"
              value={approvedRate}
              onChange={e => setApprovedRate(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="60"
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              노동위원회 승인 시 평균임금의 70% 미만으로 지급 가능
            </p>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 mt-2"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {calculated && avgWage > 0 && days > 0 && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">총 휴업수당</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(totalAllowance)}원
            </p>
            <p className="text-xs text-gray-500 mt-1">
              1일 {formatNumber(effectiveDaily)}원 x {formatNumber(days)}일
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#0d1424] rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">평균임금 70% 기준</p>
              <p className="text-lg text-white">{formatNumber(avgWage70)}원/일</p>
              <p className="text-sm text-gray-400">{formatNumber(totalByAvg70)}원 (총액)</p>
            </div>
            <div className="bg-[#0d1424] rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">통상임금 기준</p>
              <p className="text-lg text-white">{formatNumber(dailyOrdinaryWage)}원/일</p>
              <p className="text-sm text-gray-400">{formatNumber(totalByOrdinary)}원 (총액)</p>
            </div>
          </div>

          {!laborBoardApproval && ordinaryWageMonthly > 0 && (
            <div className="mb-4 bg-[#0d1424] rounded-lg p-3">
              <p className="text-sm text-gray-400 mb-1">적용 기준</p>
              <p className="text-sm text-white">
                {higherBase} 적용 ({avgWage70 >= dailyOrdinaryWage
                  ? `평균임금 70%(${formatNumber(avgWage70)}원) >= 통상임금(${formatNumber(dailyOrdinaryWage)}원)`
                  : `통상임금(${formatNumber(dailyOrdinaryWage)}원) > 평균임금 70%(${formatNumber(avgWage70)}원)`
                })
              </p>
            </div>
          )}

          {laborBoardApproval && (
            <div className="mb-4 bg-[#0d1424] rounded-lg p-3">
              <p className="text-sm text-gray-400 mb-1">노동위원회 승인 지급률</p>
              <p className="text-sm text-white">
                평균임금의 {approvedRate}% = {formatNumber(effectiveDaily)}원/일
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`max(평균임금×70%, 통상임금) × 휴업일수 = 총 휴업수당`}
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

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-white mb-4">휴업수당 청구 방법</h2>
        <ul className="space-y-3">
          {[
            { num: '1', text: '사업주에게 서면 청구' },
            { num: '2', text: '미지급 시 고용노동부 신고 (1350)' },
            { num: '3', text: '노동위원회 승인 시 감액 가능 (60~70%)' },
            { num: '4', text: '3년 이내 미지급분 소급 청구' },
          ].map(item => (
            <li key={item.num} className="flex items-start gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: category.color }}
              >
                {item.num}
              </span>
              <span className="text-sm text-gray-300">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </CalculatorLayout>
  );
}
