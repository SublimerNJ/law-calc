'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'dti')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

// 은행업감독규정 제26조의2(총부채상환비율) 및 금융위원회 「주택담보대출 LTV·DTI 규제 완화」(2022.8 시행) 기준
const REGIONS = [
  { value: 'speculative', label: '투기지역/투기과열지구', limit: 40 },
  { value: 'regulated', label: '조정대상지역', limit: 50 },
  { value: 'general', label: '기타 지역 (비규제)', limit: 60 },
];

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DtiPage() {
  const [annualIncome, setAnnualIncome] = useState('');
  const [monthlyMortgage, setMonthlyMortgage] = useState('');
  const [monthlyOtherInterest, setMonthlyOtherInterest] = useState('');
  const [region, setRegion] = useState('speculative');
  const [result, setResult] = useState<{
    dti: number;
    regulationLimit: number;
    annualMortgage: number;
    annualOtherInterest: number;
    isOver: boolean;
  } | null>(null);

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    const income = parseInt(annualIncome, 10);
    const mortgage = parseInt(monthlyMortgage, 10);
    if (!income || income <= 0 || !mortgage || mortgage < 0) return;

    const otherInterest = parseInt(monthlyOtherInterest, 10) || 0;
    const annualMortgage = mortgage * 12;
    const annualOther = otherInterest * 12;
    const dti = ((annualMortgage + annualOther) / income) * 100;
    const selectedRegion = REGIONS.find(r => r.value === region)!;

    setResult({
      dti: Math.round(dti * 10) / 10,
      regulationLimit: selectedRegion.limit,
      annualMortgage,
      annualOtherInterest: annualOther,
      isOver: dti > selectedRegion.limit,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">연소득 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={annualIncome ? parseInt(annualIncome).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setAnnualIncome)}
            placeholder="예: 60,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
          {annualIncome && (
            <p className="text-xs text-gray-500 mt-1">
              {formatNumber(parseInt(annualIncome))}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">주택담보대출 월 원리금 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyMortgage ? parseInt(monthlyMortgage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setMonthlyMortgage)}
            placeholder="예: 1,500,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
          {monthlyMortgage && (
            <p className="text-xs text-gray-500 mt-1">
              월 {formatNumber(parseInt(monthlyMortgage))}원 (연 {formatNumber(parseInt(monthlyMortgage) * 12)}원)
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">기타 대출 월 이자 상환액 (원, 없으면 0)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyOtherInterest ? parseInt(monthlyOtherInterest).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setMonthlyOtherInterest)}
            placeholder="예: 200,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
          {monthlyOtherInterest && parseInt(monthlyOtherInterest) > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              월 {formatNumber(parseInt(monthlyOtherInterest))}원 (연 {formatNumber(parseInt(monthlyOtherInterest) * 12)}원)
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">지역 구분</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          >
            {REGIONS.map(r => (
              <option key={r.value} value={r.value}>{r.label} (DTI {r.limit}%)</option>
            ))}
          </select>
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

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">현재 DTI</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {result.dti.toFixed(1)}%
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">규제 기준 DTI</p>
            <p className="text-lg text-slate-900">{result.regulationLimit}%</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">연간 주담대 원리금</p>
              <p className="text-slate-900">{formatNumber(result.annualMortgage)}원</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">연간 기타 이자</p>
              <p className="text-slate-900">{formatNumber(result.annualOtherInterest)}원</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">적합 여부</p>
            {result.isOver ? (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-400">
                초과 - 규제 기준을 초과합니다
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400">
                적합 - 규제 기준 이내입니다
              </span>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`연간 원리금 ÷ 연소득 = DTI%

DTI = (주담대 연간 원리금 + 기타대출 연간 이자) ÷ 연소득 × 100
    = (${formatNumber(result.annualMortgage)}원 + ${formatNumber(result.annualOtherInterest)}원) ÷ ${formatNumber(parseInt(annualIncome))}원 × 100
    = ${result.dti.toFixed(1)}%  (규제기준: ${result.regulationLimit}%)`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500 mb-2">
              법적 근거: 은행업감독규정 제26조의2(총부채상환비율), 금융위원회 「주택담보대출 LTV·DTI 규제 완화」 2022년 8월 시행
            </p>
            <p className="text-xs text-gray-500">
              DTI vs DSR 차이: DTI는 기타 대출의 이자만 포함하지만, DSR은 모든 대출의 원금+이자 상환액을 포함합니다. 2024년 이후 대부분 금융기관에서 DSR 규제를 적용하고 있으나, DTI는 여전히 보완적 심사 기준으로 활용됩니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
