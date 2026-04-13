'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
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
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

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
    setError('');
    setWarning('');

    // INPUT-02: 총재산 빈값 체크
    if (!totalAssets) {
      setError('재산 총액을 입력해주세요.');
      setResult(null);
      return;
    }

    const total = parseKoreanNumber(totalAssets);
    const claimant = parseKoreanNumber(claimantAssets);
    const contribRate = parseInt(contribution, 10);

    // INPUT-01 / EDGE-01: 총재산 0 이하 에러
    if (total <= 0) {
      setError('재산 총액은 0원 초과이어야 합니다.');
      setResult(null);
      return;
    }

    // INPUT-02: 기여율 범위 에러
    if (isNaN(contribRate) || contribRate < 20 || contribRate > 80) {
      setError('기여율은 20~80% 범위에서 입력해주세요.');
      setResult(null);
      return;
    }

    // INPUT-03: 비현실값 경고 (1000억 초과)
    if (total > 100_000_000_000) {
      setWarning('입력값이 비현실적으로 큽니다. 확인해주세요.');
    }

    // Auto-fill opponent assets if empty
    const opponent = opponentAssets
      ? parseKoreanNumber(opponentAssets)
      : total - claimant;

    setResult(calculateDivision(total, claimant, opponent, contribRate));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        {/* FLOW-03: 필수 표시 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">혼인 중 형성된 총 재산 (원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={getDisplayValue(totalAssets)}
            onChange={handleNumberInput(setTotalAssets)}
            placeholder="예: 500,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          {totalAssets && (
            <p className="text-xs text-gray-500 mt-1">
              {getDisplayValue(totalAssets)}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">청구인 명의 재산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={getDisplayValue(claimantAssets)}
            onChange={handleNumberInput(setClaimantAssets)}
            placeholder="예: 100,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">상대방 명의 재산 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={getDisplayValue(opponentAssets)}
            onChange={handleNumberInput(setOpponentAssets)}
            placeholder="비워두면 자동 계산 (총재산 - 청구인 명의)"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        {/* FLOW-03: 기여율 필수 표시 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">청구인 기여도 (%) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={contribution}
            onChange={e => setContribution(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="20~80"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          <div className="mt-2 p-3 rounded-lg bg-white border border-slate-200 glassmorphism glass-panel">
            <p className="text-xs text-slate-600 mb-1">기여도 참고 (판례 기준)</p>
            <ul className="text-xs text-gray-500 space-y-0.5">
              <li>맞벌이 부부: 보통 <strong className="text-slate-600">50%</strong></li>
              <li>외벌이 (가사전담 배우자): 보통 <strong className="text-slate-600">30~40%</strong></li>
              <li>고소득 전문직 배우자: <strong className="text-slate-600">40~50%</strong></li>
              <li>혼인기간 20년+: 기여도 상향 경향</li>
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">혼인기간 (년)</label>
          <input
            type="text"
            inputMode="numeric"
            value={marriageYears}
            onChange={e => setMarriageYears(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 15"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">참고 정보 (법원 판단에 영향)</p>
        </div>

        {/* 에러/경고 표시 (버튼 위) */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button aria-label="Action button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <>
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">청구인 취득 예상액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.claimantShare)}원
            </p>
            <p className="text-xs text-gray-500 mt-1">
              총 재산 {formatNumber(result.totalAssets)}원 x 기여도 {result.contributionRate}%
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">상대방 지급액</p>
            {result.paymentFromOpponent === 0 ? (
              <p className="text-sm text-slate-500">상대방으로부터 받을 금액이 없습니다.</p>
            ) : (
              <p className="text-lg text-slate-900" style={{ color: category.color }}>
                {formatNumber(result.paymentFromOpponent)}원
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {result.paymentFromOpponent > 0
                ? '청구인 취득 예상액에서 청구인 명의 재산을 뺀 금액'
                : '청구인 명의 재산이 취득 예상액 이상이므로 추가 지급 없음'}
            </p>
          </div>

          {marriageYears && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">혼인기간 참고</p>
              <p className="text-lg text-slate-900">{marriageYears}년</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono glassmorphism glass-panel">
              {`총재산             ${formatNumber(result.totalAssets)}원
× 기여도           ${result.contributionRate}%
────────────────────────────────
취득예상액          ${formatNumber(result.claimantShare)}원
(-) 청구인 명의재산 ${formatNumber(result.claimantShare - result.paymentFromOpponent)}원
= 상대방 지급액     ${formatNumber(result.paymentFromOpponent)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제839조의2 (재산분할청구권)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              제척기간: 이혼한 날부터 2년 이내 청구 필요 (민법 제839조의2 제3항)
            </p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-gray-500">
              본 계산기는 참고용이며, 실제 법원 결정과 다를 수 있습니다.
            </p>
          </div>
        </div>

        <ActionInsight calculatorId="property-division" amount={result.claimantShare} />
        </>
      )}
    </CalculatorLayout>
  );
}
