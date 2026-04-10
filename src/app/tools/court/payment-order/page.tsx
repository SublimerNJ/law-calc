'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const UNIT_COST = 5_500;
const UNREALISTIC_LIMIT = 100_000_000_000;

function calcStampFee(amount: number): number {
  let fee: number;
  if (amount < 10_000_000) {
    fee = amount * 0.005;
  } else if (amount < 100_000_000) {
    fee = amount * 0.0045 + 5000;
  } else if (amount < 1_000_000_000) {
    fee = amount * 0.004 + 55000;
  } else {
    fee = amount * 0.0035 + 555000;
  }
  if (fee < 1000) return 1000;
  return Math.floor(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface CalcResult {
  paymentOrderStampFee: number;
  lawsuitStampFee: number;
  serviceFee: number;
  total: number;
  savings: number;
  totalParties: number;
  debtors: number;
}

export default function PaymentOrderPage() {
  const tool = TOOLS.find((t) => t.id === 'payment-order')!;
  const category = CATEGORIES.find((c) => c.id === 'court')!;

  const [amountRaw, setAmountRaw] = useState('');
  const [debtors, setDebtors] = useState('1');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmountRaw(raw);
  };

  const handleCalculate = () => {
    setError('');
    setWarning('');

    const numAmount = parseInt(amountRaw, 10);
    const numDebtors = parseInt(debtors, 10);

    if (!amountRaw || isNaN(numAmount)) {
      setError('청구금액을 입력해주세요.');
      setResult(null);
      return;
    }
    if (numAmount <= 0) {
      setError('금액은 0보다 커야 합니다.');
      setResult(null);
      return;
    }
    if (isNaN(numDebtors) || numDebtors < 1) {
      setError('채무자 수는 최소 1명 이상이어야 합니다.');
      setResult(null);
      return;
    }

    if (numAmount > UNREALISTIC_LIMIT) {
      setWarning('입력값이 비현실적으로 큽니다. 확인해주세요.');
    }

    const lawsuitStampFee = calcStampFee(numAmount);
    const paymentOrderStampFee = Math.max(
      Math.floor((lawsuitStampFee * 0.1) / 100) * 100,
      1000
    );
    // 당사자 수 = 채권자(1) + 채무자 수
    const totalParties = 1 + numDebtors;
    const serviceFee = totalParties * 6 * UNIT_COST;
    const total = paymentOrderStampFee + serviceFee;
    const savings = lawsuitStampFee - paymentOrderStampFee;

    setResult({ paymentOrderStampFee, lawsuitStampFee, serviceFee, total, savings, totalParties, debtors: numDebtors });
  };

  const displayAmount = amountRaw ? parseInt(amountRaw, 10).toLocaleString('ko-KR') : '';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-6">
        {/* Input */}
        <div className="premium-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">지급명령 비용 계산</h2>
          <p className="text-xs text-gray-500">
            민사소송법 제462조 이하 독촉절차 기준
          </p>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              청구금액 (원) <span className="text-red-500">(필수)</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={displayAmount}
              onChange={handleAmountChange}
              placeholder="예: 10,000,000"
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">채무자 수</label>
            <input
              type="number"
              min={1}
              value={debtors}
              onChange={(e) => setDebtors(e.target.value)}
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
            <p className="text-xs text-gray-600 mt-1">
              지급명령은 채무자별 별도 신청
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          {warning && (
            <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-sm text-orange-500">{warning}</p>
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

        {/* Results */}
        {result && (
          <>
            <div className="premium-card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">계산 결과</h2>

              {result.total === 0 && (
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-sm text-gray-600">해당 조건에서는 비용이 발생하지 않습니다.</p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">지급명령 인지대 (소송 인지대의 1/10)</span>
                  <span className="text-slate-900">{formatNumber(result.paymentOrderStampFee)}원</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>참고: 소송 인지대</span>
                  <span>{formatNumber(result.lawsuitStampFee)}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">송달료 ({result.totalParties}명 x 6회 x {formatNumber(UNIT_COST)}원)</span>
                  <span className="text-slate-900">{formatNumber(result.serviceFee)}원</span>
                </div>
                <hr className="border-[var(--color-border-subtle)]" />
                <div className="flex justify-between">
                  <span className="text-slate-900 font-semibold">합계</span>
                  <span className="text-xl font-bold text-[var(--color-brand-primary)]">
                    {formatNumber(result.total)}원
                  </span>
                </div>
              </div>

              {/* Savings */}
              <div className="rounded-lg bg-[var(--color-surface-200)] p-4">
                <p className="text-sm text-green-600">
                  일반 소송 대비 인지대 절약액: {formatNumber(result.savings)}원
                </p>
              </div>
            </div>

            {/* Formula */}
            <div className="premium-card p-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-600">계산식</h3>
              <pre className="font-mono text-xs text-slate-600 bg-[var(--color-surface-200)] rounded-lg p-3 whitespace-pre-wrap">
{`소송인지대: ${formatNumber(result.lawsuitStampFee)}원
× 1/10 = 지급명령인지대: ${formatNumber(result.paymentOrderStampFee)}원
+ 송달료: ${formatNumber(result.serviceFee)}원
= 합계: ${formatNumber(result.total)}원`}
              </pre>
            </div>
            
            <ActionInsight calculatorId="payment-order" amount={Number(amountRaw)} />
          </>
        )}

        {/* Info */}
        <div className="premium-card p-6 space-y-3">
          <h3 className="text-sm font-semibold text-slate-600">지급명령 안내</h3>
          <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
            <li>지급명령 이의 시 소송으로 전환, 차액 인지대 납부 필요</li>
            <li>채무자가 이의신청하지 않으면 확정판결과 동일한 효력</li>
            <li>금전 기타 대체물, 유가증권의 일정 수량 지급 청구에 한함</li>
            <li>송달료: 당사자 1인당 6회분 (송달료규칙 별표)</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            본 계산기는 참고용이며, 실제 비용은 법원의 판단에 따릅니다
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
