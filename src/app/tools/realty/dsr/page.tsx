'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'dsr')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseNum(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function DsrPage() {
  const [income, setIncome] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [credit, setCredit] = useState('');
  const [other, setOther] = useState('');
  const [result, setResult] = useState<{
    dsr: number;
    annualRepayment: number;
    annualIncome: number;
    bankOk: boolean;
    nonBankOk: boolean;
  } | null>(null);

  const handleNumberInput = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const displayValue = (raw: string) => raw ? parseInt(raw).toLocaleString('ko-KR') : '';

  const handleCalculate = () => {
    const annualIncome = parseNum(income);
    if (annualIncome <= 0) return;

    const monthlyTotal = parseNum(mortgage) + parseNum(credit) + parseNum(other);
    const annualRepayment = monthlyTotal * 12;
    const dsr = (annualRepayment / annualIncome) * 100;

    setResult({
      dsr: Math.round(dsr * 10) / 10,
      annualRepayment,
      annualIncome,
      bankOk: dsr <= 40,
      nonBankOk: dsr <= 50,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">DSR 계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">연소득 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(income)}
            onChange={handleNumberInput(setIncome)}
            placeholder="예: 60,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
          {income && <p className="text-xs text-gray-500 mt-1">{formatNumber(parseNum(income))}원</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">주택담보대출 월 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(mortgage)}
            onChange={handleNumberInput(setMortgage)}
            placeholder="없으면 0"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">신용대출 월 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(credit)}
            onChange={handleNumberInput(setCredit)}
            placeholder="없으면 0"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">기타 대출 월 상환액 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={displayValue(other)}
            onChange={handleNumberInput(setOther)}
            placeholder="없으면 0"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
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

          <div className="mb-6 text-center">
            <p className="text-sm text-slate-600 mb-1">DSR (총부채원리금상환비율)</p>
            <p className="text-4xl font-bold" style={{ color: category.color }}>
              {result.dsr}%
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <div className={`flex-1 rounded-lg p-3 text-center ${result.bankOk ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
              <p className="text-xs text-slate-600 mb-1">은행권 (40%)</p>
              <p className={`text-sm font-semibold ${result.bankOk ? 'text-green-400' : 'text-red-400'}`}>
                {result.bankOk ? '적합' : '초과'}
              </p>
            </div>
            <div className={`flex-1 rounded-lg p-3 text-center ${result.nonBankOk ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
              <p className="text-xs text-slate-600 mb-1">비은행권 (50%)</p>
              <p className={`text-sm font-semibold ${result.nonBankOk ? 'text-green-400' : 'text-red-400'}`}>
                {result.nonBankOk ? '적합' : '초과'}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">연소득</span>
              <span className="text-slate-900">{formatNumber(result.annualIncome)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">연간 원리금 상환액</span>
              <span className="text-slate-900">{formatNumber(result.annualRepayment)}원</span>
            </div>
          </div>

          <div className="mb-4 p-4 rounded-lg bg-white" style={{ borderLeft: `3px solid ${category.color}` }}>
            <p className="text-xs text-slate-600 mb-1">추가 대출 가능 월 상환액 (은행권 40% 기준)</p>
            <p className="text-lg font-bold" style={{ color: category.color }}>
              {formatNumber(Math.max(0, Math.floor(result.annualIncome * 0.4 / 12 - result.annualRepayment / 12)))}원/월
            </p>
            <p className="text-xs text-gray-500 mt-1">
              연소득의 40%까지 상환 가능 → 현재 상환액 차감 = 추가 가능분
            </p>
          </div>

          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-xs font-semibold text-amber-700 mb-1">DSR 규제 적용 기준 안내</p>
            <p className="text-xs text-amber-600">
              • 총대출액 1억원 초과 차주에게 적용 (은행업감독규정 제26조의2)<br/>
              • 스트레스 DSR 3단계(2024.9.1 시행): 주택담보대출에 가산금리 적용<br/>
              • 실제 대출 가능 여부는 금융기관 개별 심사 기준에 따라 달라질 수 있음
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`연간 원리금 상환액  ${formatNumber(result.annualRepayment)}원
÷ 연소득           ${formatNumber(result.annualIncome)}원
× 100
────────────────────────────────
DSR                ${result.dsr}%

은행권 기준 (40%):  ${result.bankOk ? '적합' : '초과'}
비은행권 기준 (50%): ${result.nonBankOk ? '적합' : '초과'}`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500 mb-1">
              법적 근거: 은행업감독규정 제26조의2(차주단위 DSR 관리기준), 금융위원회 고시
            </p>
            <p className="text-xs text-gray-400">
              • 은행권 DSR 40%: 은행업감독규정 제26조의2 제1항 (총대출액 1억원 초과 차주)<br/>
              • 비은행권 DSR 50%: 여신전문금융업감독규정 등 업권별 규정<br/>
              • 스트레스 DSR: 2024.9.1 시행, 가산금리 적용 (금융위원회 고시 제2024-11호)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
