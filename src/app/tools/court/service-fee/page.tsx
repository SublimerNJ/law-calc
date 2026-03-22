'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const UNIT_COST = 4500;

const COURT_LEVELS = [
  { label: '1심', rounds: 10 },
  { label: '항소심', rounds: 8 },
  { label: '상고심', rounds: 5 },
] as const;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function ServiceFeePage() {
  const tool = TOOLS.find((t) => t.id === 'service-fee')!;
  const category = CATEGORIES.find((c) => c.id === 'court')!;

  const [parties, setParties] = useState(2);
  const [manualMode, setManualMode] = useState(false);
  const [manualRounds, setManualRounds] = useState(10);

  const results = manualMode
    ? [{ label: '직접 입력', rounds: manualRounds, fee: parties * manualRounds * UNIT_COST }]
    : COURT_LEVELS.map((level) => ({
        label: level.label,
        rounds: level.rounds,
        fee: parties * level.rounds * UNIT_COST,
      }));

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-6">
        {/* Input */}
        <div className="premium-card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-white">송달료 계산</h2>
          <p className="text-xs text-gray-500">
            민사소송규칙 제19조, 대법원 규칙 기준 (2026년 기준 4,500원/회)
          </p>

          <div>
            <label className="block text-sm text-gray-400 mb-1">당사자 수 (원고+피고 합산)</label>
            <input
              type="number"
              min={2}
              value={parties}
              onChange={(e) => setParties(Math.max(2, Number(e.target.value)))}
              className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-brand-primary)]"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="manualMode"
              checked={manualMode}
              onChange={(e) => setManualMode(e.target.checked)}
              className="accent-[var(--color-brand-primary)]"
            />
            <label htmlFor="manualMode" className="text-sm text-gray-400">
              송달 회수 직접 입력
            </label>
          </div>

          {manualMode && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">송달 예정 회수</label>
              <input
                type="number"
                min={1}
                value={manualRounds}
                onChange={(e) => setManualRounds(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-lg bg-[var(--color-surface-200)] border border-[var(--color-border-default)] px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-brand-primary)]"
              />
              <p className="text-xs text-gray-600 mt-1">
                민사 1심 기본 10회, 항소심 8회 권장
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="premium-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">계산 결과</h2>

          {results.map((r) => (
            <div
              key={r.label}
              className="rounded-lg bg-[var(--color-surface-200)] p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{r.label}</span>
                <span className="text-xl font-bold text-white">
                  {formatNumber(r.fee)}원
                </span>
              </div>
              <p className="text-xs text-gray-500">
                1인당 송달료: {formatNumber(r.rounds * UNIT_COST)}원
              </p>
              <p className="text-xs text-gray-600">
                계산식: {parties}명 x {r.rounds}회 x {formatNumber(UNIT_COST)}원 = {formatNumber(r.fee)}원
              </p>
            </div>
          ))}
        </div>

        {/* Guide */}
        {!manualMode && (
          <div className="premium-card p-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">심급별 기본 송달 회수 안내</h3>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>1심: 10회 (민사소송 기본)</li>
              <li>항소심: 8회</li>
              <li>상고심: 5회</li>
            </ul>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
