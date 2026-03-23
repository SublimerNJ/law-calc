'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'securities-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type MarketType = 'kospi' | 'kosdaq' | 'konex' | 'kotc' | 'unlisted';

const MARKETS: { value: MarketType; label: string; rate: number; hasAgriTax: boolean }[] = [
  { value: 'kospi', label: '코스피 (유가증권시장)', rate: 0.0003, hasAgriTax: true },
  { value: 'kosdaq', label: '코스닥', rate: 0.0018, hasAgriTax: false },
  { value: 'konex', label: '코넥스', rate: 0.0018, hasAgriTax: false },
  { value: 'kotc', label: 'K-OTC', rate: 0.0018, hasAgriTax: false },
  { value: 'unlisted', label: '비상장 주식', rate: 0.0035, hasAgriTax: false },
];

const AGRI_TAX_RATE = 0.0003;

export default function SecuritiesTaxPage() {
  const [marketType, setMarketType] = useState<MarketType>('kospi');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<{
    transferAmount: number;
    marketLabel: string;
    rate: number;
    securitiesTax: number;
    agriTax: number;
    total: number;
    hasAgriTax: boolean;
  } | null>(null);

  const handleCalculate = () => {
    const raw = parseInt(amount.replace(/[^0-9]/g, ''), 10);
    if (!raw || raw <= 0) return;

    const market = MARKETS.find(m => m.value === marketType)!;
    const securitiesTax = Math.floor(raw * market.rate);
    const agriTax = market.hasAgriTax ? Math.floor(raw * AGRI_TAX_RATE) : 0;
    const total = securitiesTax + agriTax;

    setResult({
      transferAmount: raw,
      marketLabel: market.label,
      rate: market.rate,
      securitiesTax,
      agriTax,
      total,
      hasAgriTax: market.hasAgriTax,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">거래 유형</label>
          <select
            value={marketType}
            onChange={e => { setMarketType(e.target.value as MarketType); setResult(null); }}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#10b981] focus:outline-none"
          >
            {MARKETS.map(m => (
              <option key={m.value} value={m.value}>
                {m.label} (세율 {(m.rate * 100).toFixed(2)}%)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">양도(매도)가액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleAmountChange}
            placeholder="예: 100,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#10b981] focus:outline-none"
          />
          {amount && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(amount).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">양도가액</p>
              <p className="text-lg text-slate-900">{formatNumber(result.transferAmount)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">거래 유형</p>
              <p className="text-lg text-slate-900">{result.marketLabel}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">적용 세율</p>
              <p className="text-lg text-slate-900">{(result.rate * 100).toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">증권거래세</p>
              <p className="text-lg text-slate-900">{formatNumber(result.securitiesTax)}원</p>
            </div>
          </div>

          {result.hasAgriTax && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">농어촌특별세 (0.03%)</p>
              <p className="text-lg text-slate-900">{formatNumber(result.agriTax)}원</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">합계 세액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm text-blue-400">
              2026년 현재 코스피 증권거래세율 0.03% 적용 (농어촌특별세 0.03% 별도)
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`양도금액 × 세율 = 증권거래세
(코스피: 양도금액 × 0.03% 농어촌특별세 별도)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 증권거래세법 제8조(세율) - 증권거래세는 주권 등의 양도가액에 해당 세율을 적용하여 산출합니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
