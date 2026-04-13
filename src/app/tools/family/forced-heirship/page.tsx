'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'forced-heirship')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

type ClaimantType = 'child' | 'spouse' | 'parent' | 'sibling';

interface ForcedHeirshipResult {
  baseEstate: number;
  statutoryShareAmount: number;
  forcedHeirshipAmount: number;
  actualReceived: number;
  shortfall: number;
  forcedRatio: number;
}

function getForcedRatio(type: ClaimantType): number {
  switch (type) {
    case 'child':
    case 'spouse':
      return 1 / 2;
    case 'parent':
    case 'sibling':
      return 1 / 3;
  }
}

function getClaimantLabel(type: ClaimantType): string {
  switch (type) {
    case 'child': return '직계비속(자녀)';
    case 'spouse': return '배우자';
    case 'parent': return '직계존속(부모)';
    case 'sibling': return '형제자매';
  }
}

function calculateForcedHeirship(
  estateAtDeath: number,
  giftsWithinYear: number,
  debts: number,
  claimantType: ClaimantType,
  statutorySharePct: number,
  actualReceived: number
): ForcedHeirshipResult {
  // 유류분 기초재산
  const baseEstate = Math.max(0, estateAtDeath + giftsWithinYear - debts);

  // 법정상속분액
  const statutoryShareAmount = Math.floor(baseEstate * (statutorySharePct / 100));

  // 유류분 비율
  const forcedRatio = getForcedRatio(claimantType);

  // 유류분액
  const forcedHeirshipAmount = Math.floor(statutoryShareAmount * forcedRatio);

  // 유류분 부족액
  const shortfall = Math.max(0, forcedHeirshipAmount - actualReceived);

  return {
    baseEstate,
    statutoryShareAmount,
    forcedHeirshipAmount,
    actualReceived,
    shortfall,
    forcedRatio,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseInput(value: string): number {
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

export default function ForcedHeirshipPage() {
  const [estateAtDeath, setEstateAtDeath] = useState('');
  const [giftsWithinYear, setGiftsWithinYear] = useState('');
  const [debts, setDebts] = useState('');
  const [claimantType, setClaimantType] = useState<ClaimantType>('child');
  const [statutorySharePct, setStatutorySharePct] = useState('');
  const [actualReceived, setActualReceived] = useState('');
  const [result, setResult] = useState<ForcedHeirshipResult | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleNumberInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  const handleCalculate = () => {
    setError('');
    setWarning('');

    if (estateAtDeath === '') {
      setError('상속 개시 시 재산을 입력해주세요.');
      setResult(null);
      return;
    }

    const estate = parseInput(estateAtDeath);
    if (estate <= 0) {
      setError('상속 개시 시 재산은 0보다 커야 합니다.');
      setResult(null);
      return;
    }

    if (statutorySharePct === '') {
      setError('법정상속분율을 입력해주세요.');
      setResult(null);
      return;
    }

    const pct = parseFloat(statutorySharePct);
    if (isNaN(pct) || pct <= 0 || pct > 100) {
      setError('법정상속분율은 0%보다 크고 100% 이하여야 합니다.');
      setResult(null);
      return;
    }

    if (estate > 1_000_000_000_000) {
      setWarning('입력값이 1조원을 초과합니다. 입력 단위(원)를 확인해주세요.');
    }

    setResult(calculateForcedHeirship(
      estate,
      parseInput(giftsWithinYear),
      parseInput(debts),
      claimantType,
      pct,
      parseInput(actualReceived)
    ));
  };

  const claimantOptions: { value: ClaimantType; label: string }[] = [
    { value: 'child', label: '직계비속(자녀)' },
    { value: 'spouse', label: '배우자' },
    { value: 'parent', label: '직계존속(부모)' },
    { value: 'sibling', label: '형제자매' },
  ];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            상속 개시 시 재산 (원) <span className="text-red-500 font-semibold">*</span> <span className="text-xs text-slate-400">(필수)</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(estateAtDeath)}
            onChange={handleNumberInput(setEstateAtDeath)}
            placeholder="예: 1,000,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            생전증여 합계 (원) <span className="text-xs text-slate-400">(선택)</span>
            <span className="text-xs text-gray-500 ml-1">(제3자: 1년 이내 / 상속인: 기간 제한 없음)</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(giftsWithinYear)}
            onChange={handleNumberInput(setGiftsWithinYear)}
            placeholder="선택 입력"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">상속채무 (원) <span className="text-xs text-slate-400">(선택)</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(debts)}
            onChange={handleNumberInput(setDebts)}
            placeholder="선택 입력"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">청구인 유형</label>
          <div className="grid grid-cols-2 gap-2">
            {claimantOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="claimantType"
                  checked={claimantType === opt.value}
                  onChange={() => setClaimantType(opt.value)}
                  className="accent-[#ec4899]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            청구인 법정상속분 (%) <span className="text-red-500 font-semibold">*</span> <span className="text-xs text-slate-400">(필수)</span>
          </label>
          <input
            type="number"
            min={0}
            max={100}
            step="0.01"
            value={statutorySharePct}
            onChange={e => setStatutorySharePct(e.target.value)}
            placeholder="예: 42.86"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">
            <a aria-label="Link" href="/tools/family/legal-inheritance" className="text-[#ec4899] underline hover:opacity-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]">법정상속분 계산기</a>로 먼저 확인하세요
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">청구인 실제 취득액 (원) <span className="text-xs text-slate-400">(선택)</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(actualReceived)}
            onChange={handleNumberInput(setActualReceived)}
            placeholder="수증재산 + 상속받은 금액"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

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

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">유류분 기초재산</p>
              <p className="text-lg text-slate-900">{formatNumber(result.baseEstate)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">청구인 법정상속분액</p>
              <p className="text-lg text-slate-900">{formatNumber(result.statutoryShareAmount)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">
                유류분액 (법정상속분 x {result.forcedRatio === 1/2 ? '1/2' : '1/3'})
              </p>
              <p className="text-lg text-slate-900">{formatNumber(result.forcedHeirshipAmount)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">실제 취득액</p>
              <p className="text-lg text-slate-900">{formatNumber(result.actualReceived)}원</p>
            </div>
            <div className={result.shortfall > 0 ? 'p-3 bg-[#2a1525] border border-[#ec4899]/30 rounded-lg' : ''}>
              <p className="text-sm text-slate-600 mb-1">유류분 부족액 (반환청구 가능액)</p>
              {result.shortfall === 0 ? (
                <>
                  <p className="text-2xl font-bold" style={{ color: '#9ca3af' }}>
                    {formatNumber(result.shortfall)}원
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    유류분 부족액이 없습니다 (이미 충분히 수령하였습니다)
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold" style={{ color: category.color }}>
                    {formatNumber(result.shortfall)}원
                  </p>
                  <p className="text-xs mt-1" style={{ color: category.color }}>
                    유류분 침해가 인정되어 반환청구가 가능합니다.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap glassmorphism glass-panel">
{`기초재산: ${formatNumber(result.baseEstate)}원
× 법정상속분: ${statutorySharePct}%
= 법정상속분액: ${formatNumber(result.statutoryShareAmount)}원
× 유류분비율: ${result.forcedRatio === 1/2 ? '1/2' : '1/3'} (${getClaimantLabel(claimantType)})
= 유류분액: ${formatNumber(result.forcedHeirshipAmount)}원
- 실제취득액: ${formatNumber(result.actualReceived)}원
= 유류분 부족액: ${formatNumber(result.shortfall)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              법적 근거: 민법 제1112조~제1118조
            </p>
          </div>

          <div className="mt-3 p-3 bg-[#1a1025] border border-[#2a1a3a] rounded-lg">
            <p className="text-xs text-slate-600">
              본 계산기는 참고용입니다. 실제 유류분 청구 시 법률 전문가 상담을 권장합니다.
            </p>
          </div>
        </div>

        <ActionInsight calculatorId="forced-heirship" amount={result.shortfall} />
        </>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">유류분 반환 청구 절차</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '내용증명 발송', desc: '다른 상속인에게 내용증명으로 반환 요구' },
              { step: '2', title: '소송 제기', desc: '합의 불성립 시 가정법원에 유류분반환청구 소송' },
              { step: '3', title: '시효', desc: '상속 개시와 반환 청구 대상을 안 날부터 1년, 상속 개시일로부터 10년' },
              { step: '4', title: '변호사 선임 권장', desc: '유류분 산정이 복잡하므로 전문가 조력 권장' },
            ].map(item => (
              <div key={item.step} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: category.color, color: '#fff' }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">법적 근거: 민법 제1112조~제1118조 | 대한법률구조공단 (132)</p>
        </div>
      )}
    </CalculatorLayout>
  );
}
