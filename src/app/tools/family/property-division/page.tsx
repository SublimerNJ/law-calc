'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'property-division')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

interface DivisionResult {
  claimantShare: number;
  paymentFromOpponent: number;
  totalAssets: number;
  contributionRate: number;
}

function calculateDivision(
  totalAssets: number,
  claimantAssets: number,
  opponentAssets: number,
  contributionRate: number,
): DivisionResult {
  const claimantShare = Math.floor(totalAssets * (contributionRate / 100));
  const paymentFromOpponent = Math.max(0, claimantShare - claimantAssets);

  return { claimantShare, paymentFromOpponent, totalAssets, contributionRate };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseKoreanNumber(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function PropertyDivisionPage() {
  const [totalAssets, setTotalAssets] = useState('');
  const [claimantAssets, setClaimantAssets] = useState('');
  const [opponentAssets, setOpponentAssets] = useState('');
  const [contribution, setContribution] = useState('50');
  const [marriageYears, setMarriageYears] = useState('');
  const [result, setResult] = useState<DivisionResult | null>(null);

  const handleNumberInput = (
    setter: (v: string) => void,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setter(raw);
  };

  const getDisplayValue = (raw: string): string => {
    if (!raw) return '';
    return parseInt(raw).toLocaleString('ko-KR');
  };

  const handleCalculate = () => {
    const total = parseKoreanNumber(totalAssets);
    const claimant = parseKoreanNumber(claimantAssets);
    const contribRate = parseInt(contribution, 10);

    if (total <= 0 || isNaN(contribRate) || contribRate < 20 || contribRate > 80) return;

    // Auto-fill opponent assets if empty
    const opponent = opponentAssets
      ? parseKoreanNumber(opponentAssets)
      : total - claimant;

    setResult(calculateDivision(total, claimant, opponent, contribRate));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">혼인 중 형성된 총 재산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={getDisplayValue(totalAssets)}
            onChange={handleNumberInput(setTotalAssets)}
            placeholder="예: 500,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
          {totalAssets && (
            <p className="text-xs text-gray-500 mt-1">
              {getDisplayValue(totalAssets)}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">청구인 명의 재산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={getDisplayValue(claimantAssets)}
            onChange={handleNumberInput(setClaimantAssets)}
            placeholder="예: 100,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">상대방 명의 재산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={getDisplayValue(opponentAssets)}
            onChange={handleNumberInput(setOpponentAssets)}
            placeholder="비워두면 자동 계산 (총재산 - 청구인 명의)"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">청구인 기여도 (%)</label>
          <input
            type="number"
            inputMode="numeric"
            min="20"
            max="80"
            value={contribution}
            onChange={e => setContribution(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">범위: 20% ~ 80% (기본값: 50%)</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">혼인기간 (년)</label>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={marriageYears}
            onChange={e => setMarriageYears(e.target.value)}
            placeholder="예: 15"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">참고 정보 (법원 판단에 영향)</p>
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
            <p className="text-sm text-gray-400 mb-1">청구인 취득 예상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.claimantShare)}원
            </p>
            <p className="text-xs text-gray-500 mt-1">
              총 재산 {formatNumber(result.totalAssets)}원 x 기여도 {result.contributionRate}%
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">상대방 지급액</p>
            <p className="text-lg text-white" style={{ color: result.paymentFromOpponent > 0 ? category.color : undefined }}>
              {formatNumber(result.paymentFromOpponent)}원
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {result.paymentFromOpponent > 0
                ? '청구인 취득 예상액에서 청구인 명의 재산을 뺀 금액'
                : '청구인 명의 재산이 취득 예상액 이상이므로 추가 지급 없음'}
            </p>
          </div>

          {marriageYears && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">혼인기간 참고</p>
              <p className="text-lg text-white">{marriageYears}년</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">계산식</p>
            <pre className="text-xs text-gray-300 bg-[#0d1424] p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`총재산             ${formatNumber(result.totalAssets)}원
× 기여도           ${result.contributionRate}%
────────────────────────────────
취득예상액          ${formatNumber(result.claimantShare)}원
(-) 청구인 명의재산 ${formatNumber(result.claimantShare - result.paymentFromOpponent)}원
= 상대방 지급액     ${formatNumber(result.paymentFromOpponent)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제839조의2 (재산분할청구권)
            </p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">
              본 계산기는 참고용이며, 실제 법원 결정과 다를 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
