'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'average-wage')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

interface MonthEntry {
  startDate: string;
  endDate: string;
  basePay: string;
  allowances: string;
}

function getDaysInRange(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

function getDefaultMonths(): MonthEntry[] {
  const today = new Date();
  const entries: MonthEntry[] = [];
  for (let i = 3; i >= 1; i--) {
    const endMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
    const startMonth = new Date(endMonth.getFullYear(), endMonth.getMonth(), 1);
    entries.push({
      startDate: startMonth.toISOString().slice(0, 10),
      endDate: endMonth.toISOString().slice(0, 10),
      basePay: '',
      allowances: '',
    });
  }
  return entries;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseNum(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function AverageWagePage() {
  const [baseDate, setBaseDate] = useState(new Date().toISOString().slice(0, 10));
  const [months, setMonths] = useState<MonthEntry[]>(getDefaultMonths);
  const [bonusAmount, setBonusAmount] = useState('');
  const [bonusCycle, setBonusCycle] = useState(6);
  const [calculated, setCalculated] = useState(false);

  const updateMonth = (idx: number, field: keyof MonthEntry, value: string) => {
    setMonths(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const totalDays = months.reduce((sum, m) => sum + getDaysInRange(m.startDate, m.endDate), 0);
  const totalWages = months.reduce((sum, m) => sum + parseNum(m.basePay) + parseNum(m.allowances), 0);
  const bonusInclusion = parseNum(bonusAmount) > 0 ? parseNum(bonusAmount) * (3 / bonusCycle) : 0;
  const grandTotal = totalWages + bonusInclusion;
  const dailyAvgWage = totalDays > 0 ? grandTotal / totalDays : 0;

  const periodStart = months[0]?.startDate || '';
  const periodEnd = months[months.length - 1]?.endDate || '';

  const handleCalculate = () => {
    if (totalDays <= 0 || totalWages <= 0) return;
    setCalculated(true);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">산정 기준일 (퇴직일, 재해일 등)</label>
          <input
            type="date"
            value={baseDate}
            onChange={e => setBaseDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-3">직전 3개월 임금 내역</label>
          <div className="space-y-4">
            {months.map((m, idx) => (
              <div key={idx} className="bg-[#0d1424] rounded-lg p-4 border border-[#1e2d4a]">
                <p className="text-xs text-gray-500 mb-2">{idx + 1}번째 월</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">시작일</label>
                    <input
                      type="date"
                      value={m.startDate}
                      onChange={e => updateMonth(idx, 'startDate', e.target.value)}
                      className="w-full bg-[#0a0f1c] border border-[#1e2d4a] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">종료일</label>
                    <input
                      type="date"
                      value={m.endDate}
                      onChange={e => updateMonth(idx, 'endDate', e.target.value)}
                      className="w-full bg-[#0a0f1c] border border-[#1e2d4a] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">기본급 (원)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={m.basePay ? parseNum(m.basePay).toLocaleString('ko-KR') : ''}
                      onChange={e => updateMonth(idx, 'basePay', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="3,000,000"
                      className="w-full bg-[#0a0f1c] border border-[#1e2d4a] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">각종 수당 (원)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={m.allowances ? parseNum(m.allowances).toLocaleString('ko-KR') : ''}
                      onChange={e => updateMonth(idx, 'allowances', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="0"
                      className="w-full bg-[#0a0f1c] border border-[#1e2d4a] rounded px-3 py-2 text-sm text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  기간: {getDaysInRange(m.startDate, m.endDate)}일 | 소계: {formatNumber(parseNum(m.basePay) + parseNum(m.allowances))}원
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">정기상여금 (선택)</label>
          <input
            type="text"
            inputMode="numeric"
            value={bonusAmount ? parseNum(bonusAmount).toLocaleString('ko-KR') : ''}
            onChange={e => setBonusAmount(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="해당 기간 지급된 정기상여금"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">상여금 지급주기</label>
          <select
            value={bonusCycle}
            onChange={e => setBonusCycle(Number(e.target.value))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          >
            <option value={1}>1개월</option>
            <option value={2}>2개월</option>
            <option value={3}>3개월</option>
            <option value={6}>6개월</option>
            <option value={12}>12개월</option>
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

      {calculated && dailyAvgWage > 0 && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">1일 평균임금</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(Math.floor(dailyAvgWage))}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">3개월 임금총액</p>
              <p className="text-lg text-white">{formatNumber(grandTotal)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">3개월 총 역일수</p>
              <p className="text-lg text-white">{totalDays}일</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">산정 기간</p>
            <p className="text-lg text-white">
              {periodStart.replace(/-/g, '.')} ~ {periodEnd.replace(/-/g, '.')}
            </p>
          </div>

          {bonusInclusion > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">상여금 산입액</p>
              <p className="text-lg text-white">
                {formatNumber(Math.floor(bonusInclusion))}원
                <span className="text-xs text-gray-500 ml-2">
                  ({formatNumber(parseNum(bonusAmount))}원 x 3/{bonusCycle})
                </span>
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`3개월 총임금 ÷ 3개월 역일수 = 1일 평균임금`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 제2조제1항제6호 (평균임금 정의), 제6조 (균등처우)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              * 평균임금이 통상임금보다 낮을 경우, 퇴직금 등 일부 산정에서 통상임금을 적용합니다 (근로기준법 제2조제2항).
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-white mb-4">평균임금이 사용되는 곳</h2>
        <ul className="space-y-3">
          {[
            { num: '1', text: '퇴직금 산정 (30일분 × 근속연수)' },
            { num: '2', text: '산재보상 (휴업급여, 장해급여)' },
            { num: '3', text: '해고예고수당' },
            { num: '4', text: '연차수당' },
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
        <p className="mt-4 text-xs text-gray-500 border-t border-[#1e2d4a] pt-3">
          통상임금보다 낮으면 통상임금 적용
        </p>
      </div>
    </CalculatorLayout>
  );
}
