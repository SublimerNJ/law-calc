'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'brokerage-fee')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

type TransactionType = 'sale' | 'lease';
type LeaseType = 'jeonse' | 'wolse';

interface Result {
  transactionAmount: number;
  rate: number;
  cap?: number;
  fee: number;
  capApplied: boolean;
  vat: number;
  total: number;
  formula: string;
}

const SALE_TABLE = [
  { max: 50_000_000, label: '5천만원 미만', rate: '0.6%', cap: '25만원' },
  { max: 200_000_000, label: '5천만~2억원', rate: '0.5%', cap: '80만원' },
  { max: 900_000_000, label: '2억~9억원', rate: '0.4%', cap: '없음' },
  { max: 1_200_000_000, label: '9억~12억원', rate: '0.5%', cap: '없음' },
  { max: 1_500_000_000, label: '12억~15억원', rate: '0.6%', cap: '없음' },
  { max: Infinity, label: '15억원 이상', rate: '0.7%', cap: '없음' },
];

const LEASE_TABLE = [
  { max: 50_000_000, label: '5천만원 미만', rate: '0.5%', cap: '20만원' },
  { max: 100_000_000, label: '5천만~1억원', rate: '0.4%', cap: '30만원' },
  { max: 300_000_000, label: '1억~3억원', rate: '0.3%', cap: '없음' },
  { max: 600_000_000, label: '3억~6억원', rate: '0.4%', cap: '없음' },
  { max: Infinity, label: '6억원 이상', rate: '0.5%', cap: '없음' },
];

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
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const amountVal = parseInt(amount, 10);
    if (!amount || isNaN(amountVal) || amountVal <= 0) {
      setError('거래금액(보증금)을 입력해주세요.');
      setResult(null);
      return;
    }

    if (amountVal > 5_000_000_000) {
      setWarning('거래금액이 50억원을 초과합니다. 입력값을 확인해주세요.');
    }

    let transactionAmount = amountVal;
    let rateInfo: { rate: number; cap?: number };

    if (txType === 'sale') {
      rateInfo = getSaleRate(amountVal);
    } else {
      if (leaseType === 'wolse') {
        const rentVal = parseInt(monthlyRent, 10);
        if (!monthlyRent || isNaN(rentVal) || rentVal <= 0) {
          setError('월세를 입력해주세요.');
          setResult(null);
          return;
        }
        if (rentVal > 10_000_000) {
          setWarning('월세가 1,000만원을 초과합니다. 입력값을 확인해주세요.');
        }
        // 환산보증금 = 보증금 + 월세 x 100
        transactionAmount = amountVal + rentVal * 100;
      }
      rateInfo = getLeaseRate(transactionAmount);
    }

    const rawFee = Math.floor(transactionAmount * rateInfo.rate);
    const capApplied = rateInfo.cap !== undefined && rawFee > rateInfo.cap;
    const fee = capApplied ? rateInfo.cap! : rawFee;

    const vat = Math.floor(fee * 0.1);

    let formula = `${formatNumber(transactionAmount)} × ${(rateInfo.rate * 100).toFixed(1)}% = ${formatNumber(rawFee)}원`;
    if (capApplied) {
      formula += `\n→ 상한 ${formatNumber(rateInfo.cap!)}원 적용`;
    }
    if (txType === 'lease' && leaseType === 'wolse') {
      formula = `환산보증금 = ${formatNumber(amountVal)} + ${formatNumber(parseInt(monthlyRent, 10))} × 100 = ${formatNumber(transactionAmount)}원\n${formula}`;
    }

    setResult({
      transactionAmount,
      rate: rateInfo.rate,
      cap: rateInfo.cap,
      fee,
      capApplied,
      vat,
      total: fee + vat,
      formula,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">거래유형</label>
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
                  onChange={() => { setTxType(opt.value); setResult(null); setError(null); setWarning(null); }}
                  className="accent-[#8b5cf6]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {txType === 'lease' && (
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">임대차 구분</label>
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
                    onChange={() => { setLeaseType(opt.value); setResult(null); setError(null); setWarning(null); }}
                    className="accent-[#8b5cf6]"
                  />
                  <span className="text-sm text-slate-600">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            {txType === 'sale' ? '거래금액 (원) *' : '보증금 (원) *'}
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setAmount)}
            placeholder="예: 300,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        {txType === 'lease' && leaseType === 'wolse' && (
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">월세 (원) *</label>
            <input
              type="text"
              inputMode="numeric"
              value={monthlyRent ? parseInt(monthlyRent).toLocaleString('ko-KR') : ''}
              onChange={handleNumberChange(setMonthlyRent)}
              placeholder="예: 500,000"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button aria-label="Action button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 mt-2"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.fee === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">거래금액이 매우 작아 중개보수가 0원으로 계산되었습니다.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">
              {txType === 'lease' && leaseType === 'wolse' ? '환산보증금' : '거래금액'}
            </p>
            <p className="text-lg text-slate-900">{formatNumber(result.transactionAmount)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">적용 요율</p>
            <p className="text-lg text-slate-900">{(result.rate * 100).toFixed(1)}%</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">중개보수</p>
            <p className="text-lg text-slate-900">{formatNumber(result.fee)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">부가세 (10%)</p>
            <p className="text-lg text-slate-900">{formatNumber(result.vat)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">총 중개보수 (부가세 포함)</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono glassmorphism glass-panel">
              {result.formula}
            </pre>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-xs text-yellow-700">
              부가세는 법인 중개사무소만 부과됩니다. 개인 공인중개사는 부가세 면제 대상입니다.
            </p>
          </div>

          {/* 요율 기준표 */}
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">{txType === 'sale' ? '매매' : '임대차'} 중개보수 요율표</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-left text-gray-500">거래금액</th>
                  <th className="py-2 text-right text-gray-500">상한요율</th>
                  <th className="py-2 text-right text-gray-500">한도액</th>
                </tr>
              </thead>
              <tbody>
                {(txType === 'sale' ? SALE_TABLE : LEASE_TABLE).map((row, i) => {
                  const isActive = result.transactionAmount < row.max && (i === 0 || result.transactionAmount >= (txType === 'sale' ? SALE_TABLE : LEASE_TABLE)[i-1]?.max || 0);
                  return (
                    <tr key={i} className={`border-b border-slate-200/50 ${isActive ? 'bg-[#8b5cf6]/10' : ''}`}>
                      <td className="py-2 text-slate-600">{row.label}</td>
                      <td className="py-2 text-right" style={{ color: isActive ? category.color : '#9ca3af' }}>{row.rate}</td>
                      <td className="py-2 text-right" style={{ color: isActive ? category.color : '#9ca3af' }}>{row.cap}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 공인중개사법 시행규칙 제20조 제1항 별표1 | 월세 환산보증금: 보증금 + (월세 × 100)
            </p>
          </div>

          <ActionInsight
            calculatorId="brokerage-fee"
            amount={result.fee}
          />
        </div>
      )}
    </CalculatorLayout>
  );
}
