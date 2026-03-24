'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'family-court')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

// 2026년 기준 송달료 단가
const SERVICE_FEE_UNIT = 5_500;
// 가사사건 송달료 예납 회수: 당사자 1인당 10회분 (가사소송규칙 제7조)
const SERVICE_ROUNDS = 10;
// 비현실적 금액 기준 (1000억원)
const MAX_AMOUNT = 100_000_000_000;

type CaseType = 'divorce' | 'consolation' | 'custody' | 'support' | 'inheritance';

interface CaseOption {
  value: CaseType;
  label: string;
  fixedFee: number | null;
  needsAmount: boolean;
  description: string;
  legalBasis: string;
}

// 가사소송수수료규칙 기준 인지액
// 가사소송 가류·나류: 1건당 20,000원 정액 (가사소송수수료규칙 제2조 제1항)
// 가사비송 라류: 5,000원 정액 (가사소송수수료규칙 제3조)
// 가사비송 마류: 5,000원 정액 (가사소송수수료규칙 제3조)
const CASE_OPTIONS: CaseOption[] = [
  {
    value: 'divorce',
    label: '이혼 (나류)',
    fixedFee: 20_000,
    needsAmount: false,
    description: '가사소송 나류 — 이혼, 혼인취소, 친생자관계 확인, 입양취소/파양',
    legalBasis: '가사소송수수료규칙 제2조 제1항: 나류 1건당 20,000원 정액',
  },
  {
    value: 'consolation',
    label: '위자료/재산분할 (가류)',
    fixedFee: 20_000,
    needsAmount: false,
    description: '가사소송 가류 — 재산관계 소송 (가류·나류 동일 정액)',
    legalBasis: '가사소송수수료규칙 제2조 제1항: 가류 1건당 20,000원 정액',
  },
  {
    value: 'custody',
    label: '양육비/친권 (라류)',
    fixedFee: 5_000,
    needsAmount: false,
    description: '가사비송 라류 — 친권/양육권 지정, 양육비 심판',
    legalBasis: '가사소송수수료규칙 제3조: 라류 5,000원 정액',
  },
  {
    value: 'support',
    label: '부양료 심판 (마류)',
    fixedFee: 5_000,
    needsAmount: false,
    description: '가사비송 마류 — 부양료 심판, 성년후견 등',
    legalBasis: '가사소송수수료규칙 제3조: 마류 5,000원 정액',
  },
  {
    value: 'inheritance',
    label: '상속재산 분할',
    fixedFee: null,
    needsAmount: true,
    description: '상속재산 분할 심판 — 청구금액 기준 민사소송 인지액 준용',
    legalBasis: '가사소송수수료규칙 제3조: 민사소송등인지법 제2조 준용 금액의 1/2',
  },
];

// 민사소송 인지대 계산 (민사소송등인지법 별표 1)
// 100원 미만 버림: 민사소송등인지법 제2조 제3항
function calculateStampFee(amount: number): number {
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
  stampFee: number;
  serviceFee: number;
  total: number;
  caseLabel: string;
  caseDescription: string;
  legalBasis: string;
}

export default function FamilyCourtPage() {
  const [caseType, setCaseType] = useState<CaseType>('divorce');
  const [amount, setAmount] = useState('');
  const [parties, setParties] = useState(2);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const selectedCase = CASE_OPTIONS.find(c => c.value === caseType)!;

  const handleCalculate = () => {
    setError('');
    setWarning('');
    setResult(null);

    let stampFee: number;

    if (selectedCase.fixedFee !== null) {
      stampFee = selectedCase.fixedFee;
    } else {
      // INPUT-02: 필수 필드 비어있으면 안내
      if (!amount.trim()) {
        setError('청구금액을 입력해주세요.');
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

      // 상속재산 분할 등: 민사소송등인지법 제2조 준용 금액의 1/2 (가사소송수수료규칙 제3조)
      const baseFee = calculateStampFee(val);
      stampFee = Math.floor((baseFee * 0.5) / 100) * 100;
      if (stampFee < 1_000) stampFee = 1_000;
    }

    const serviceFee = parties * SERVICE_ROUNDS * SERVICE_FEE_UNIT;
    const total = stampFee + serviceFee;

    setResult({
      stampFee,
      serviceFee,
      total,
      caseLabel: selectedCase.label,
      caseDescription: selectedCase.description,
      legalBasis: selectedCase.legalBasis,
    });
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
          <label className="block text-sm text-slate-600 mb-2">사건 유형</label>
          <select
            value={caseType}
            onChange={e => { setCaseType(e.target.value as CaseType); setResult(null); setError(''); setWarning(''); }}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {CASE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">{selectedCase.description}</p>
        </div>

        {selectedCase.needsAmount && (
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">
              청구금액 (원) <span className="text-red-500">*</span>
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
          </div>
        )}

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

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        {warning && (
          <div className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
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

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">적용 유형</p>
              <p className="text-base text-slate-900">{result.caseLabel}</p>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1">인지대</p>
              {result.stampFee === 0 ? (
                <p className="text-base text-slate-600">해당 조건에서는 비용이 발생하지 않습니다.</p>
              ) : (
                <p className="text-2xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.stampFee)}원
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1">송달료 ({parties}명 × {SERVICE_ROUNDS}회 × {formatNumber(SERVICE_FEE_UNIT)}원)</p>
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
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap">
{`사건유형: ${result.caseLabel}
인지대: ${formatNumber(result.stampFee)}원
+ 송달료: ${formatNumber(result.serviceFee)}원 (${parties}명 × ${SERVICE_ROUNDS}회 × ${formatNumber(SERVICE_FEE_UNIT)}원)
= 합계: ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="mt-4 space-y-1">
            <p className="text-xs text-gray-500">
              법적 근거: {result.legalBasis}
            </p>
            <p className="text-xs text-gray-500">
              {result.caseDescription}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              송달료: 2026년 기준 1회 {formatNumber(SERVICE_FEE_UNIT)}원 | 가사사건 {SERVICE_ROUNDS}회분 예납 (가사소송규칙 제7조)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
