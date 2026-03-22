'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'family-court')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

type CaseType = 'divorce' | 'consolation' | 'custody' | 'support' | 'inheritance';

interface CaseOption {
  value: CaseType;
  label: string;
  fixedFee: number | null;
  needsAmount: boolean;
  description: string;
}

const CASE_OPTIONS: CaseOption[] = [
  { value: 'divorce', label: '이혼 (나류)', fixedFee: 20_000, needsAmount: false, description: '가사소송 나류 — 이혼, 혼인취소, 친생자관계 확인, 입양취소/파양' },
  { value: 'consolation', label: '위자료/재산분할 (가류)', fixedFee: null, needsAmount: true, description: '가사소송 가류 — 재산관계 소송, 일반 민사소송 인지액 산정식 적용' },
  { value: 'custody', label: '양육비/친권 (라류)', fixedFee: 5_000, needsAmount: false, description: '가사비송 라류 — 친권/양육권 지정, 양육비 심판' },
  { value: 'support', label: '부양료 심판 (마류)', fixedFee: 5_000, needsAmount: false, description: '가사비송 마류 — 부양료 심판, 성년후견 등' },
  { value: 'inheritance', label: '상속재산 분할', fixedFee: null, needsAmount: true, description: '상속재산 분할 심판 — 청구금액 기준 일반 계산식 적용' },
];

function calculateStampFee(amount: number): number {
  let fee: number;
  if (amount <= 10_000_000) {
    fee = amount * 0.005;
    if (fee < 1_000) fee = 1_000;
  } else if (amount <= 100_000_000) {
    fee = amount * 0.0045 + 5_000;
  } else if (amount <= 1_000_000_000) {
    fee = amount * 0.004 + 55_000;
  } else {
    fee = amount * 0.0035 + 555_000;
  }
  return Math.ceil(fee / 100) * 100;
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
}

export default function FamilyCourtPage() {
  const [caseType, setCaseType] = useState<CaseType>('divorce');
  const [amount, setAmount] = useState('');
  const [parties, setParties] = useState(2);
  const [result, setResult] = useState<Result | null>(null);

  const selectedCase = CASE_OPTIONS.find(c => c.value === caseType)!;

  const handleCalculate = () => {
    let stampFee: number;

    if (selectedCase.fixedFee !== null) {
      stampFee = selectedCase.fixedFee;
    } else {
      const val = parseInt(amount.replace(/,/g, ''), 10);
      if (!val || val <= 0) return;
      stampFee = calculateStampFee(val);
    }

    const serviceFee = parties * 5 * 4_500;
    const total = stampFee + serviceFee;

    setResult({
      stampFee,
      serviceFee,
      total,
      caseLabel: selectedCase.label,
      caseDescription: selectedCase.description,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">사건 유형</label>
          <select
            value={caseType}
            onChange={e => { setCaseType(e.target.value as CaseType); setResult(null); }}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          >
            {CASE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">{selectedCase.description}</p>
        </div>

        {selectedCase.needsAmount && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">청구금액 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
              onChange={handleAmountChange}
              placeholder="예: 50,000,000"
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
            />
            {amount && (
              <p className="text-xs text-gray-500 mt-1">
                {formatNumber(parseInt(amount))}원
              </p>
            )}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">당사자 수</label>
          <input
            type="number"
            min={2}
            value={parties}
            onChange={e => setParties(Math.max(2, parseInt(e.target.value) || 2))}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">적용 유형</p>
              <p className="text-base text-white">{result.caseLabel}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">인지대</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.stampFee)}원
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">송달료 ({parties}명 x 5회 x 4,500원)</p>
              <p className="text-lg text-white">{formatNumber(result.serviceFee)}원</p>
            </div>

            <div className="pt-4 border-t border-[#1e2d4a]">
              <p className="text-sm text-gray-400 mb-1">합계</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.total)}원
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1e2d4a]">
            <p className="text-sm font-semibold text-gray-400 mb-2">계산식</p>
            <pre className="font-mono text-xs text-gray-300 bg-[#0d1424] rounded-lg p-3 whitespace-pre-wrap">
{`사건유형: ${result.caseLabel}
인지대: ${formatNumber(result.stampFee)}원
+ 송달료: ${formatNumber(result.serviceFee)}원
= 합계: ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">
              법적 근거: 가사소송법, 가사소송규칙 별표
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {result.caseDescription}
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
