'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const UNIT_COST = 4500;

function calcStampFee(amount: number): number {
  let fee: number;
  if (amount <= 10_000_000) {
    fee = amount * 0.005;
  } else if (amount <= 100_000_000) {
    fee = amount * 0.0045 + 5000;
  } else if (amount <= 1_000_000_000) {
    fee = amount * 0.004 + 55000;
  } else {
    fee = amount * 0.0035 + 555000;
  }
  fee = Math.max(fee, 1000);
  return Math.ceil(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function PaymentOrderPage() {
  const tool = TOOLS.find((t) => t.id === 'payment-order')!;
  const category = CATEGORIES.find((c) => c.id === 'court')!;

  const [amount, setAmount] = useState(10_000_000);
  const [debtors, setDebtors] = useState(1);

  const lawsuitStampFee = calcStampFee(amount);
  const paymentOrderStampFee = Math.max(
    Math.ceil((lawsuitStampFee * 0.1) / 100) * 100,
    1000
  );
  // 당사자 수 = 채권자(1) + 채무자 수
  const totalParties = 1 + debtors;
  const serviceFee = totalParties * 3 * UNIT_COST;
  const total = paymentOrderStampFee + serviceFee;
  const savings = lawsuitStampFee - paymentOrderStampFee;

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-6">
        {/* Input */}
        <div className="premium-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">지급명령 비용 계산</h2>
          <p className="text-xs text-gray-500">
            민사소송법 제462조 이하 독촉절차 기준
          </p>

          <div>
            <label className="block text-sm text-gray-400 mb-1">청구금액 (원)</label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">채무자 수</label>
            <input
              type="number"
              min={1}
              value={debtors}
              onChange={(e) => setDebtors(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
            <p className="text-xs text-gray-600 mt-1">
              지급명령은 채무자별 별도 신청
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="premium-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">계산 결과</h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">지급명령 인지대 (소송 인지대의 1/10)</span>
              <span className="text-white">{formatNumber(paymentOrderStampFee)}원</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>참고: 소송 인지대</span>
              <span>{formatNumber(lawsuitStampFee)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">송달료 ({totalParties}명 x 3회 x {formatNumber(UNIT_COST)}원)</span>
              <span className="text-white">{formatNumber(serviceFee)}원</span>
            </div>
            <hr className="border-[var(--color-border-subtle)]" />
            <div className="flex justify-between">
              <span className="text-white font-semibold">합계</span>
              <span className="text-xl font-bold text-[var(--color-brand-primary)]">
                {formatNumber(total)}원
              </span>
            </div>
          </div>

          {/* Savings */}
          <div className="rounded-lg bg-[var(--color-surface-200)] p-4">
            <p className="text-sm text-green-400">
              일반 소송 대비 인지대 절약액: {formatNumber(savings)}원
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="premium-card p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400">지급명령 안내</h3>
          <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
            <li>지급명령 이의 시 소송으로 전환, 차액 인지대 납부 필요</li>
            <li>채무자가 이의신청하지 않으면 확정판결과 동일한 효력</li>
            <li>금전 기타 대체물, 유가증권의 일정 수량 지급 청구에 한함</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
