'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'gift-tax')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type Relationship = '배우자' | '직계존속' | '직계비속' | '기타친족';

const EXCLUSIONS: Record<string, number> = {
  '배우자': 600_000_000,
  '직계존속_성인': 50_000_000,
  '직계존속_미성년': 20_000_000,
  '직계비속': 50_000_000,
  '기타친족': 10_000_000,
};

const TAX_BRACKETS = [
  { limit: 100_000_000, rate: 0.10, deduction: 0 },
  { limit: 500_000_000, rate: 0.20, deduction: 10_000_000 },
  { limit: 1_000_000_000, rate: 0.30, deduction: 60_000_000 },
  { limit: 3_000_000_000, rate: 0.40, deduction: 160_000_000 },
  { limit: Infinity, rate: 0.50, deduction: 460_000_000 },
];

function progressiveTax(taxable: number): { tax: number; rate: number; deduction: number } {
  if (taxable <= 0) return { tax: 0, rate: 0, deduction: 0 };
  for (const bracket of TAX_BRACKETS) {
    if (taxable <= bracket.limit) {
      return {
        tax: Math.floor(taxable * bracket.rate - bracket.deduction),
        rate: bracket.rate,
        deduction: bracket.deduction,
      };
    }
  }
  const last = TAX_BRACKETS[TAX_BRACKETS.length - 1];
  return {
    tax: Math.floor(taxable * last.rate - last.deduction),
    rate: last.rate,
    deduction: last.deduction,
  };
}

function getExclusion(relationship: Relationship, isMinor: boolean): number {
  if (relationship === '직계존속') {
    return isMinor ? EXCLUSIONS['직계존속_미성년'] : EXCLUSIONS['직계존속_성인'];
  }
  return EXCLUSIONS[relationship] ?? 10_000_000;
}

interface GiftTaxResult {
  giftAmount: number;
  exclusion: number;
  combined: number;
  taxableAmount: number;
  rate: number;
  finalTax: number;
}

function calculateGiftTax(
  giftAmount: number,
  priorGifts: number,
  relationship: Relationship,
  isMinor: boolean
): GiftTaxResult {
  const exclusion = getExclusion(relationship, isMinor);
  const combined = giftAmount + priorGifts;
  const taxableAmount = Math.max(0, combined - exclusion);
  const { tax, rate } = progressiveTax(taxableAmount);
  const priorTaxable = Math.max(0, priorGifts - exclusion);
  const { tax: priorTax } = progressiveTax(priorTaxable);
  const finalTax = Math.max(0, tax - priorTax);

  return { giftAmount, exclusion, combined, taxableAmount, rate, finalTax };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function GiftTaxPage() {
  const [amount, setAmount] = useState('');
  const [relationship, setRelationship] = useState<Relationship>('직계존속');
  const [isMinor, setIsMinor] = useState(false);
  const [priorGifts, setPriorGifts] = useState('');
  const [result, setResult] = useState<GiftTaxResult | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;
    const prior = parseInt((priorGifts || '0').replace(/,/g, ''), 10) || 0;
    setResult(calculateGiftTax(val, prior, relationship, isMinor));
  };

  const handleNumberChange = (
    setter: (v: string) => void
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">증여재산가액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setAmount)}
            placeholder="예: 100,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
          />
          {amount && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(amount).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">수증자와 증여자의 관계</label>
          <select
            value={relationship}
            onChange={e => {
              setRelationship(e.target.value as Relationship);
              if (e.target.value !== '직계존속') setIsMinor(false);
            }}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
          >
            <option value="배우자">배우자</option>
            <option value="직계존속">직계존속 (부모 → 자녀)</option>
            <option value="직계비속">직계비속 (자녀 → 부모)</option>
            <option value="기타친족">기타 친족</option>
          </select>
        </div>

        {relationship === '직계존속' && (
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isMinor}
                onChange={e => setIsMinor(e.target.checked)}
                className="accent-[#ec4899]"
              />
              <span className="text-sm text-slate-600">수증자가 미성년자</span>
            </label>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">
            10년 이내 동일인 사전증여 합계 (원)
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={priorGifts ? parseInt(priorGifts).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setPriorGifts)}
            placeholder="없으면 비워두세요"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none"
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

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">증여재산가액</span>
              <span className="text-slate-900">{formatNumber(result.giftAmount)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">증여재산공제</span>
              <span className="text-slate-900">-{formatNumber(result.exclusion)}원</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3">
              <span className="text-sm text-slate-600">과세표준</span>
              <span className="text-slate-900 font-semibold">{formatNumber(result.taxableAmount)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">적용세율</span>
              <span className="text-slate-900">{result.rate > 0 ? `${result.rate * 100}%` : '-'}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3">
              <span className="text-sm text-slate-600">납부세액</span>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.finalTax)}원
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 mt-4">
            <div className="p-3 rounded-lg bg-[#1a1025] border border-[#2a1a3a]">
              <p className="text-xs text-slate-600 mb-1">실수령액 (증여액 - 세금)</p>
              <p className="text-lg font-bold" style={{ color: category.color }}>
                {formatNumber(result.giftAmount - result.finalTax)}원
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#1a1025] border border-[#2a1a3a]">
              <p className="text-xs text-slate-600 mb-1">실효세율</p>
              <p className="text-lg text-slate-900">
                {result.giftAmount > 0 ? ((result.finalTax / result.giftAmount) * 100).toFixed(2) : '0'}%
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap">
{`증여액: ${formatNumber(result.giftAmount)}원
- 공제: ${formatNumber(result.exclusion)}원
= 과세표준: ${formatNumber(result.taxableAmount)}원
× 세율: ${result.rate > 0 ? `${result.rate * 100}%` : '0%'}
= 납부세액: ${formatNumber(result.finalTax)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              법적 근거: 상속세 및 증여세법 제53조~제56조
            </p>
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-600">
              본 계산기는 참고용입니다. 실제 신고 시 세무사 상담을 권장합니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
