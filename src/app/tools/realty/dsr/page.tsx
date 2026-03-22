'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'dsr')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseNum(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function DsrPage() {
  const [income, setIncome] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [credit, setCredit] = useState('');
  const [other, setOther] = useState('');
  const [result, setResult] = useState<{
    dsr: number;
    annualRepayment: number;
    annualIncome: number;
    bankOk: boolean;
    nonBankOk: boolean;
  } | null>(null);

  const handleNumberInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  const handleCalculate = () => {
    const annualIncome = parseNum(income);
    if (annualIncome <= 0) return;

    const monthlyTotal = parseNum(mortgage) + parseNum(credit) + parseNum(other);
    const annualRepayment = monthlyTotal * 12;
    const dsr = (annualRepayment / annualIncome) * 100;

    setResult({
      dsr: Math.round(dsr * 10) / 10,
      annualRepayment,
      annualIncome,
      bankOk: dsr <= 40,
      nonBankOk: dsr <= 50,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">DSR 계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">연소득 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(income)}
            onChange={handleNumberInput(setIncome)}
            placeholder="예: 60,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
          {income && <p className="text-xs text-gray-500 mt-1">{formatNumber(parseNum(income))}원</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">주택담보대출 월 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(mortgage)}
            onChange={handleNumberInput(setMortgage)}
            placeholder="없으면 0"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">신용대출 월 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(credit)}
            onChange={handleNumberInput(setCredit)}
            placeholder="없으면 0"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">기타 대출 월 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(other)}
            onChange={handleNumberInput(setOther)}
            placeholder="없으면 0"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
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

          <div className="mb-6 text-center">
            <p className="text-sm text-gray-400 mb-1">DSR (총부채원리금상환비율)</p>
            <p className="text-4xl font-bold" style={{ color: category.color }}>
              {result.dsr}%
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <div className={`flex-1 rounded-lg p-3 text-center ${result.bankOk ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
              <p className="text-xs text-gray-400 mb-1">은행권 (40%)</p>
              <p className={`text-sm font-semibold ${result.bankOk ? 'text-green-400' : 'text-red-400'}`}>
                {result.bankOk ? '적합' : '초과'}
              </p>
            </div>
            <div className={`flex-1 rounded-lg p-3 text-center ${result.nonBankOk ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
              <p className="text-xs text-gray-400 mb-1">비은행권 (50%)</p>
              <p className={`text-sm font-semibold ${result.nonBankOk ? 'text-green-400' : 'text-red-400'}`}>
                {result.nonBankOk ? '적합' : '초과'}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">연소득</span>
              <span className="text-white">{formatNumber(result.annualIncome)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">연간 원리금 상환액</span>
              <span className="text-white">{formatNumber(result.annualRepayment)}원</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 금융위원회 DSR 규제 (2026년 현행 기준)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
