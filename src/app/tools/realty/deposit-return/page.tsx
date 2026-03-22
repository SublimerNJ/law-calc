'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'deposit-return')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

interface Result {
  deposit: number;
  interest: number;
  total: number;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DepositReturnPage() {
  const [deposit, setDeposit] = useState('');
  const [days, setDays] = useState('');
  const [rate, setRate] = useState('5');
  const [result, setResult] = useState<Result | null>(null);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDeposit(raw);
  };

  const handleCalculate = () => {
    const depositVal = parseInt(deposit, 10);
    const daysVal = parseInt(days, 10);
    const rateVal = parseFloat(rate);
    if (!depositVal || depositVal <= 0 || !daysVal || daysVal <= 0 || !rateVal || rateVal <= 0) return;

    const interest = Math.floor(depositVal * (rateVal / 100) * (daysVal / 365));
    setResult({
      deposit: depositVal,
      interest,
      total: depositVal + interest,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">보증금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={deposit ? parseInt(deposit).toLocaleString('ko-KR') : ''}
            onChange={handleDepositChange}
            placeholder="예: 100,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
          {deposit && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(deposit).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">반환 지연일수 (일)</label>
          <input
            type="number"
            value={days}
            onChange={e => setDays(e.target.value)}
            placeholder="예: 30"
            min="1"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">연체이자율 (%)</label>
          <input
            type="number"
            value={rate}
            onChange={e => setRate(e.target.value)}
            step="0.1"
            min="0"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">주택임대차보호법상 법정이자율: 연 5%</p>
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
            <p className="text-sm text-gray-400 mb-1">보증금 원금</p>
            <p className="text-lg text-white">{formatNumber(result.deposit)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">지연이자</p>
            <p className="text-lg text-white">{formatNumber(result.interest)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">합계 반환액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 주택임대차보호법 제3조의2, 민법 제387조
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
