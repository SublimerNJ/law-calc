'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'civil-mediation')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

// 2026년 기준 송달료 단가
const SERVICE_FEE_UNIT = 5_500;
// 조정사건 송달료 예납 회수: 당사자 1인당 5회분 (송달료규칙 업무처리요령 별표 1)
const MEDIATION_SERVICE_ROUNDS = 5;
// 소송사건 송달료 예납 회수 (비교용): 1심 15회분
const LAWSUIT_SERVICE_ROUNDS = 15;
// 비현실적 금액 기준 (1000억원)
const MAX_AMOUNT = 100_000_000_000;

// 소송 인지대 계산 (민사소송등인지법 별표 1)
// 100원 미만 버림: 민사소송등인지법 제2조 제3항
function calculateLawsuitStampFee(amount: number): number {
  let fee: number;
  if (amount < 10_000_000) {
    fee = amount * 0.005;
    if (fee < 1_000) fee = 1_000;
  } else if (amount < 100_000_000) {
    fee = amount * 0.0045 + 5_000;
  } else if (amount < 1_000_000_000) {
    fee = amount * 0.004 + 55_000;
  } else {
    fee = amount * 0.0035 + 555_000;
  }
  // 민사소송등인지법 제2조 제3항: 100원 미만 버림
  return Math.floor(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface Result {
  lawsuitStampFee: number;
  mediationStampFee: number;
  serviceFee: number;
  total: number;
  savings: number;
}

export default function CivilMediationPage() {
  const [amount, setAmount] = useState('');
  const [parties, setParties] = useState(2);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleCalculate = () => {
    setError('');
    setWarning('');
    setResult(null);

    // INPUT-02: 필수 필드 비어있으면 안내
    if (!amount.trim()) {
      setError('조정 신청 금액을 입력해주세요.');
      return;
    }

    const val = parseInt(amount.replace(/,/g, ''), 10);

    // INPUT-01: 음수/0 → 에러
    if (!val || val <= 0) {
      setError('금액은 0보다 커야 합니다.');
      return;
    }

    // INPUT-03: 비현실 값 경고
    if (val > MAX_AMOUNT) {
      setWarning('입력값이 비현실적으로 큽니다. 확인해주세요.');
    }

    const lawsuitStampFee = calculateLawsuitStampFee(val);

    // 조정 인지대 = 소송 인지대의 1/10 (민사조정규칙 제3조 제1항)
    // 100원 미만 버림: 민사소송등인지법 제2조 제3항
    let mediationStampFee = Math.floor((lawsuitStampFee * 0.1) / 100) * 100;
    if (mediationStampFee < 1_000) mediationStampFee = 1_000;

    const serviceFee = parties * MEDIATION_SERVICE_ROUNDS * SERVICE_FEE_UNIT;
    const total = mediationStampFee + serviceFee;
    const lawsuitServiceFee = parties * LAWSUIT_SERVICE_ROUNDS * SERVICE_FEE_UNIT;
    const lawsuitTotal = lawsuitStampFee + lawsuitServiceFee;
    const savings = lawsuitTotal - total;

    setResult({ lawsuitStampFee, mediationStampFee, serviceFee, total, savings });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
    setError('');
    setWarning('');
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            조정 신청 금액 (원) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleAmountChange}
            placeholder="예: 50,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          {amount && !error && (
            <p className="text-xs text-gray-500 mt-1">
              {formatNumber(parseInt(amount))}원
            </p>
          )}
          {error && (
            <p className="text-xs text-red-500 mt-1">{error}</p>
          )}
          {warning && (
            <p className="text-xs text-orange-500 mt-1">{warning}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">당사자 수</label>
          <input
            type="number"
            min={2}
            value={parties}
            onChange={e => setParties(Math.max(2, parseInt(e.target.value) || 2))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">조정신청 인지대 (소송인지의 1/10)</p>
              {result.mediationStampFee === 0 ? (
                <p className="text-base text-slate-600">해당 조건에서는 비용이 발생하지 않습니다.</p>
              ) : (
                <p className="text-2xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.mediationStampFee)}원
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1">송달료 ({parties}명 × {MEDIATION_SERVICE_ROUNDS}회 × {formatNumber(SERVICE_FEE_UNIT)}원)</p>
              <p className="text-lg text-slate-900">{formatNumber(result.serviceFee)}원</p>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-1">합계</p>
              {result.total === 0 ? (
                <p className="text-base text-slate-600">해당 조건에서는 비용이 발생하지 않습니다.</p>
              ) : (
                <p className="text-2xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.total)}원
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-1">소송 대비 절약액</p>
              <p className="text-lg font-semibold text-green-600">
                -{formatNumber(result.savings)}원
              </p>
              <p className="text-xs text-gray-500 mt-1">
                일반 소송 인지대: {formatNumber(result.lawsuitStampFee)}원
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap">
{`소송인지대: ${formatNumber(result.lawsuitStampFee)}원
× 1/10 = 조정인지대: ${formatNumber(result.mediationStampFee)}원
+ 송달료: ${formatNumber(result.serviceFee)}원 (${parties}명 × ${MEDIATION_SERVICE_ROUNDS}회 × ${formatNumber(SERVICE_FEE_UNIT)}원)
= 합계: ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500">
              조정 성립 시 재판상 화해와 동일한 효력(집행권원)
            </p>
            <p className="text-xs text-gray-500">
              조정 불성립 시 소송으로 이행, 차액 인지대 추가 납부
            </p>
            <p className="text-xs text-gray-500 mt-2">
              법적 근거: 민사조정규칙 제3조, 민사소송등인지법 제2조
            </p>
            <p className="text-xs text-gray-500">
              송달료: 2026년 기준 1회 {formatNumber(SERVICE_FEE_UNIT)}원 | 조정사건 {MEDIATION_SERVICE_ROUNDS}회분 예납
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
