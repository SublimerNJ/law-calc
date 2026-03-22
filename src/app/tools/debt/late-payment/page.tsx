'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'late-payment')!;
const category = CATEGORIES.find(c => c.id === 'debt')!;

function calculateLatePayment(principal: number, days: number, ratePercent: number): number {
  return Math.floor(principal * (ratePercent / 100) * (days / 365));
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export default function LatePaymentPage() {
  const [principal, setPrincipal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(getToday());
  const [isLawsuit, setIsLawsuit] = useState(false);
  const [result, setResult] = useState<{
    principal: number;
    days: number;
    civilInterest: number;
    lawsuitInterest: number;
  } | null>(null);
  const [error, setError] = useState('');

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipal(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    setError('');
    const p = parseInt(principal, 10);
    if (!p || p <= 0 || !startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setError('종료일은 시작일 이후여야 합니다.');
      setResult(null);
      return;
    }

    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    setResult({
      principal: p,
      days,
      civilInterest: calculateLatePayment(p, days, 5),
      lawsuitInterest: calculateLatePayment(p, days, 12),
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">원금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={principal ? parseInt(principal).toLocaleString('ko-KR') : ''}
            onChange={handlePrincipalChange}
            placeholder="예: 10,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
          />
          {principal && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(principal).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">지연 시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">지연 종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isLawsuit}
              onChange={(e) => setIsLawsuit(e.target.checked)}
              className="w-4 h-4 accent-[#06b6d4]"
            />
            <span className="text-sm text-gray-300">소송 제기 여부 (소송촉진법 이율 강조)</span>
          </label>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

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

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">민사 법정이자 (연 5%)</p>
              <p className={`text-2xl font-bold ${isLawsuit ? 'text-gray-400' : ''}`} style={!isLawsuit ? { color: category.color } : undefined}>
                {formatNumber(result.civilInterest)}원
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">소송촉진법 지연이자 (연 12%)</p>
              <p className={`text-2xl font-bold ${!isLawsuit ? 'text-gray-400' : ''}`} style={isLawsuit ? { color: category.color } : undefined}>
                {formatNumber(result.lawsuitInterest)}원
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">원금</p>
              <p className="text-lg text-white">{formatNumber(result.principal)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">지연일수</p>
              <p className="text-lg text-white">{formatNumber(result.days)}일</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제397조(이행지체), 소송촉진 등에 관한 특례법 제3조(연 12%)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
