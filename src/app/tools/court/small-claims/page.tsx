'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const UNIT_COST = 4500;
const MAX_AMOUNT = 30_000_000;

function calcStampFee(amount: number): number {
  let fee: number;
  if (amount <= 10_000_000) {
    fee = amount * 0.005;
  } else {
    fee = amount * 0.0045 + 5000;
  }
  fee = Math.max(fee, 1000);
  return Math.ceil(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function SmallClaimsPage() {
  const tool = TOOLS.find((t) => t.id === 'small-claims')!;
  const category = CATEGORIES.find((c) => c.id === 'court')!;

  const [amount, setAmount] = useState('10000000');
  const [parties, setParties] = useState(2);

  const numAmount = parseInt(amount, 10) || 0;
  const isOverLimit = numAmount > MAX_AMOUNT;
  const clampedAmount = Math.min(numAmount, MAX_AMOUNT);

  const stampFee = calcStampFee(clampedAmount);
  const serviceFee = parties * 10 * UNIT_COST;
  const total = stampFee + serviceFee;

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-6">
        {/* Input */}
        <div className="premium-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">소액사건 재판비용 계산</h2>
          <p className="text-xs text-gray-500">
            소액사건심판법 기준 (소가 3,000만원 이하)
          </p>

          <div>
            <label className="block text-sm text-gray-400 mb-1">청구금액 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="예: 10,000,000"
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
            {isOverLimit && (
              <p className="text-xs text-red-400 mt-1">
                소액사건은 3,000만원 이하 사건입니다. 3,000만원 기준으로 계산합니다.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">당사자 수</label>
            <input
              type="number"
              min={2}
              value={parties}
              onChange={(e) => setParties(Math.max(2, Number(e.target.value)))}
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="premium-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">계산 결과</h2>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">인지대</span>
              <span className="text-white">{formatNumber(stampFee)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">송달료 ({parties}명 x 10회 x {formatNumber(UNIT_COST)}원)</span>
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
        </div>

        {/* Formula */}
        <div className="premium-card p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400">계산식</h3>
          <pre className="font-mono text-xs text-gray-300 bg-[var(--color-surface-200)] rounded-lg p-3 whitespace-pre-wrap">
{`인지대: ${formatNumber(stampFee)}원
+ 송달료: ${formatNumber(serviceFee)}원
= 합계: ${formatNumber(total)}원`}
          </pre>
        </div>

        {/* Info */}
        <div className="premium-card p-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400">소액사건 안내</h3>
          <p className="text-xs text-gray-500">
            소액사건심판법에 따른 간이 절차 비용입니다.
          </p>
          <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
            <li>소액사건은 변호사 없이 본인이 직접 진행할 수 있습니다</li>
            <li>1회 변론으로 종결하는 것이 원칙입니다</li>
            <li>이행권고결정 제도를 통해 간편하게 해결할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
