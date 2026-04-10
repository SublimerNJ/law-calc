'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'rent-conversion')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

type Mode = 'jeonse-to-wolse' | 'wolse-to-jeonse';

interface Result {
  mode: Mode;
  amount: number;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function RentConversionPage() {
  const [mode, setMode] = useState<Mode>('jeonse-to-wolse');
  const [jeonse, setJeonse] = useState('');
  const [deposit, setDeposit] = useState('');
  const [wolse, setWolse] = useState('');
  const [conversionRate, setConversionRate] = useState('4.50');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const rateVal = parseFloat(conversionRate);
    if (!conversionRate || isNaN(rateVal) || rateVal <= 0) {
      setError('전환율을 입력해주세요.');
      setResult(null);
      return;
    }
    if (rateVal > 100) {
      setError('전환율은 100% 이하여야 합니다.');
      setResult(null);
      return;
    }

    if (mode === 'jeonse-to-wolse') {
      const jeonseVal = parseInt(jeonse, 10);
      const depositVal = parseInt(deposit, 10);

      if (!jeonse || isNaN(jeonseVal) || jeonseVal <= 0) {
        setError('전세금을 입력해주세요.');
        setResult(null);
        return;
      }
      if (!isNaN(depositVal) && depositVal >= jeonseVal) {
        setError('전환 후 보증금이 전세금 이상이면 전환할 금액이 없습니다.');
        setResult(null);
        return;
      }

      if (jeonseVal > 1_000_000_000) {
        setWarning('전세금이 10억원을 초과합니다. 입력값을 확인해주세요.');
      }

      const monthly = Math.floor((jeonseVal - (isNaN(depositVal) ? 0 : depositVal)) * (rateVal / 100) / 12);
      setResult({ mode, amount: monthly });
    } else {
      const depositVal = parseInt(deposit, 10);
      const wolseVal = parseInt(wolse, 10);

      if (!wolse || isNaN(wolseVal) || wolseVal <= 0) {
        setError('월세를 입력해주세요.');
        setResult(null);
        return;
      }

      if (wolseVal > 10_000_000) {
        setWarning('월세가 1,000만원을 초과합니다. 입력값을 확인해주세요.');
      }

      const jeonseAmount = Math.floor((isNaN(depositVal) ? 0 : depositVal) + wolseVal * 12 / (rateVal / 100));
      setResult({ mode, amount: jeonseAmount });
    }
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">전환 모드</label>
          <div className="flex gap-4">
            {([
              { value: 'jeonse-to-wolse' as Mode, label: '전세 → 월세' },
              { value: 'wolse-to-jeonse' as Mode, label: '월세 → 전세' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === opt.value}
                  onChange={() => { setMode(opt.value); setResult(null); setError(null); setWarning(null); }}
                  className="accent-[#8b5cf6]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {mode === 'jeonse-to-wolse' && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">전세금 (원) *</label>
              <input
                type="text"
                inputMode="numeric"
                value={jeonse ? parseInt(jeonse).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setJeonse)}
                placeholder="예: 300,000,000"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">전환 후 보증금 (원)</label>
              <input
                type="text"
                inputMode="numeric"
                value={deposit ? parseInt(deposit).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setDeposit)}
                placeholder="예: 50,000,000"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </>
        )}

        {mode === 'wolse-to-jeonse' && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">보증금 (원)</label>
              <input
                type="text"
                inputMode="numeric"
                value={deposit ? parseInt(deposit).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setDeposit)}
                placeholder="예: 50,000,000"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">월세 (원) *</label>
              <input
                type="text"
                inputMode="numeric"
                value={wolse ? parseInt(wolse).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setWolse)}
                placeholder="예: 500,000"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </>
        )}

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">전환율 (%) *</label>
          <input
            type="text"
            inputMode="decimal"
            value={conversionRate}
            onChange={e => setConversionRate(e.target.value.replace(/[^0-9.]/g, ''))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">법정 상한 전환율: 한국은행 기준금리(2.50%) + 2%p = 4.50% (주택임대차보호법 시행령 제9조)</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

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

          {result.mode === 'jeonse-to-wolse' && result.amount === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">전환 월세가 0원입니다. 전환할 금액 차이가 매우 작거나 전환율이 낮습니다.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">
              {result.mode === 'jeonse-to-wolse' ? '전환 월세' : '전환 전세금'}
            </p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.amount)}원
              {result.mode === 'jeonse-to-wolse' && <span className="text-sm font-normal text-slate-600"> /월</span>}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
{result.mode === 'jeonse-to-wolse'
  ? `월세 = (전세금 - 보증금) × 전환율 ÷ 12\n  = (${formatNumber(parseInt(jeonse))} - ${formatNumber(parseInt(deposit) || 0)}) × ${conversionRate}% ÷ 12\n  = ${formatNumber(result.amount)}원/월`
  : `전세금 = 보증금 + (월세 × 12 ÷ 전환율)\n  = ${formatNumber(parseInt(deposit) || 0)} + (${formatNumber(parseInt(wolse))} × 12 ÷ ${conversionRate}%)\n  = ${formatNumber(result.amount)}원`}
            </pre>
          </div>

          {result.mode === 'jeonse-to-wolse' && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">연간 월세 합계</p>
              <p className="text-lg text-slate-900">{formatNumber(result.amount * 12)}원/년</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 주택임대차보호법 제7조의2, 동법 시행령 제9조 | 법정 상한: 기준금리(2.50%) + 2%p = 4.50%
            </p>
          </div>

          <ActionInsight
            calculatorId="rent-conversion"
            amount={result.amount}
          />
        </div>
      )}
    </CalculatorLayout>
  );
}
