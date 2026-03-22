'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'brokerage-fee')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

type TransactionType = 'sale' | 'lease';
type LeaseType = 'jeonse' | 'wolse';

interface Result {
  transactionAmount: number;
  rate: number;
  fee: number;
  vat: number;
  total: number;
}

function getSaleRate(amount: number): { rate: number; cap?: number } {
  if (amount < 50_000_000) return { rate: 0.006, cap: 250_000 };
  if (amount < 200_000_000) return { rate: 0.005, cap: 800_000 };
  if (amount < 900_000_000) return { rate: 0.004 };
  if (amount < 1_200_000_000) return { rate: 0.005 };
  if (amount < 1_500_000_000) return { rate: 0.006 };
  return { rate: 0.007 };
}

function getLeaseRate(amount: number): { rate: number; cap?: number } {
  if (amount < 50_000_000) return { rate: 0.005, cap: 200_000 };
  if (amount < 100_000_000) return { rate: 0.004, cap: 300_000 };
  if (amount < 300_000_000) return { rate: 0.003 };
  if (amount < 600_000_000) return { rate: 0.004 };
  return { rate: 0.005 };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function BrokerageFeePage() {
  const [txType, setTxType] = useState<TransactionType>('sale');
  const [leaseType, setLeaseType] = useState<LeaseType>('jeonse');
  const [amount, setAmount] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    const amountVal = parseInt(amount, 10);
    if (!amountVal || amountVal <= 0) return;

    let transactionAmount = amountVal;
    let rateInfo: { rate: number; cap?: number };

    if (txType === 'sale') {
      rateInfo = getSaleRate(amountVal);
    } else {
      if (leaseType === 'wolse') {
        const rentVal = parseInt(monthlyRent, 10);
        if (!rentVal || rentVal <= 0) return;
        // 환산보증금 = 보증금 + 월세 x 100
        transactionAmount = amountVal + rentVal * 100;
      }
      rateInfo = getLeaseRate(transactionAmount);
    }

    let fee = Math.floor(transactionAmount * rateInfo.rate);
    if (rateInfo.cap !== undefined) {
      fee = Math.min(fee, rateInfo.cap);
    }

    const vat = Math.floor(fee * 0.1);

    setResult({
      transactionAmount,
      rate: rateInfo.rate,
      fee,
      vat,
      total: fee + vat,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">거래유형</label>
          <div className="flex gap-4">
            {([
              { value: 'sale' as TransactionType, label: '매매/교환' },
              { value: 'lease' as TransactionType, label: '임대차' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="txType"
                  checked={txType === opt.value}
                  onChange={() => { setTxType(opt.value); setResult(null); }}
                  className="accent-[#8b5cf6]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {txType === 'lease' && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">임대차 구분</label>
            <div className="flex gap-4">
              {([
                { value: 'jeonse' as LeaseType, label: '전세' },
                { value: 'wolse' as LeaseType, label: '월세' },
              ]).map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="leaseType"
                    checked={leaseType === opt.value}
                    onChange={() => { setLeaseType(opt.value); setResult(null); }}
                    className="accent-[#8b5cf6]"
                  />
                  <span className="text-sm text-gray-300">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            {txType === 'sale' ? '거래금액 (원)' : '보증금 (원)'}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setAmount)}
            placeholder="예: 300,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
          />
        </div>

        {txType === 'lease' && leaseType === 'wolse' && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">월세 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              value={monthlyRent ? parseInt(monthlyRent).toLocaleString('ko-KR') : ''}
              onChange={handleNumberChange(setMonthlyRent)}
              placeholder="예: 500,000"
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#8b5cf6] focus:outline-none"
            />
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

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">
              {txType === 'lease' && leaseType === 'wolse' ? '환산보증금' : '거래금액'}
            </p>
            <p className="text-lg text-white">{formatNumber(result.transactionAmount)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">적용 요율</p>
            <p className="text-lg text-white">{(result.rate * 100).toFixed(1)}%</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">중개보수</p>
            <p className="text-lg text-white">{formatNumber(result.fee)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">부가세 (10%)</p>
            <p className="text-lg text-white">{formatNumber(result.vat)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">총 중개보수 (부가세 포함)</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 공인중개사법 시행규칙 별표1
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
