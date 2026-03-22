'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'legal-interest')!;
const category = CATEGORIES.find(c => c.id === 'debt')!;

function calculateLegalInterest(principal: number, ratePercent: number, days: number): number {
  return Math.floor(principal * (ratePercent / 100) * (days / 365));
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type Preset = 'civil' | 'commercial' | 'custom';

export default function LegalInterestPage() {
  const [principal, setPrincipal] = useState('');
  const [ratePercent, setRatePercent] = useState('5');
  const [days, setDays] = useState('');
  const [preset, setPreset] = useState<Preset>('civil');
  const [result, setResult] = useState<{ interest: number; principal: number; rate: number; days: number } | null>(null);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipal(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handlePreset = (p: Preset) => {
    setPreset(p);
    if (p === 'civil') setRatePercent('5');
    else if (p === 'commercial') setRatePercent('6');
  };

  const handleCalculate = () => {
    const p = parseInt(principal, 10);
    const r = parseFloat(ratePercent);
    const d = parseInt(days, 10);
    if (!p || p <= 0 || isNaN(r) || r < 0 || !d || d <= 0) return;
    setResult({
      interest: calculateLegalInterest(p, r, d),
      principal: p,
      rate: r,
      days: d,
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
          <label className="block text-sm text-gray-400 mb-2">연이율 (%)</label>
          <div className="flex gap-2 mb-2">
            {([
              { key: 'civil' as Preset, label: '민사 5%' },
              { key: 'commercial' as Preset, label: '상사 6%' },
              { key: 'custom' as Preset, label: '직접입력' },
            ]).map(opt => (
              <button
                key={opt.key}
                onClick={() => handlePreset(opt.key)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: preset === opt.key ? category.color : 'transparent',
                  color: preset === opt.key ? '#fff' : '#9ca3af',
                  border: preset === opt.key ? 'none' : '1px solid #1e2d4a',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={ratePercent}
            onChange={(e) => { setRatePercent(e.target.value); setPreset('custom'); }}
            disabled={preset !== 'custom'}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none disabled:opacity-50"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">기간 (일)</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="예: 365"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
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
            <p className="text-sm text-gray-400 mb-1">이자액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.interest)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">원금</p>
              <p className="text-lg text-white">{formatNumber(result.principal)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">적용 이율</p>
              <p className="text-lg text-white">연 {result.rate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">기간</p>
              <p className="text-lg text-white">{formatNumber(result.days)}일</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">연환산 이자율</p>
              <p className="text-lg text-white">연 {result.rate}%</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제379조 (법정이율 연 5%), 상사법정이율 연 6%
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
