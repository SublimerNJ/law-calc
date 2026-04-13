'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'loan-interest')!;
const category = CATEGORIES.find(c => c.id === 'debt')!;

function calculateLoanInterest(principal: number, agreedRatePercent: number, days: number) {
  const effectiveRate = Math.min(agreedRatePercent, 20);
  const interest = Math.floor(principal * (effectiveRate / 100) * (days / 365));
  const excessInterest = agreedRatePercent > 20
    ? Math.floor(principal * ((agreedRatePercent - 20) / 100) * (days / 365))
    : 0;
  return { interest, effectiveRate, excessInterest, isExceeded: agreedRatePercent > 20 };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function LoanInterestPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateLoanInterest> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setPrincipal(raw);
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);
    const p = parseInt(principal, 10);
    const r = parseFloat(rate);
    const d = parseInt(days, 10);

    if (!principal || !p || p <= 0) {
      setError('대여 원금을 입력해주세요.');
      setResult(null);
      return;
    }

    if (!rate || rate.trim() === '' || isNaN(r)) {
      setError('약정 이율을 입력해주세요.');
      setResult(null);
      return;
    }

    if (r < 0) {
      setError('이율은 0% 이상이어야 합니다.');
      setResult(null);
      return;
    }

    if (!days || days.trim() === '' || isNaN(d) || d < 1) {
      setError('대여 기간을 1일 이상으로 입력해주세요.');
      setResult(null);
      return;
    }

    if (p > 999_000_000_000_000) {
      setWarning('원금이 999조원을 초과합니다. 입력값을 확인해주세요.');
    }

    setResult(calculateLoanInterest(p, r, d));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">대여 원금 (원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={principal ? parseInt(principal).toLocaleString('ko-KR') : ''}
            onChange={handlePrincipalChange}
            placeholder="예: 10,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          {principal && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(principal).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">약정 이율 (%) *</label>
          <input
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={e => setRate(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="예: 15"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">대여 기간 (일) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={days}
            onChange={e => setDays(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 365"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
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
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.isExceeded && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600 font-semibold">
                약정이율이 이자제한법 최고이율(20%)을 초과합니다. 초과 부분은 무효입니다.
              </p>
            </div>
          )}

          {result.interest === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">이자액이 0원으로 계산되었습니다. 이율 또는 기간을 확인해주세요.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">적용 이율</p>
            <p className="text-lg text-slate-900">
              {result.effectiveRate}%
              {result.isExceeded && (
                <span className="text-sm text-slate-600 ml-2">
                  (약정 {parseFloat(rate)}% → 제한 20%)
                </span>
              )}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">이자액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.interest)}원
            </p>
          </div>

          {result.isExceeded && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">이자제한법 위반 초과이자</p>
              <p className="text-lg font-semibold" style={{ color: '#ef4444' }}>
                {formatNumber(result.excessInterest)}원 (무효)
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">원금 × 이자율 × 기간/365 = 이자</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 이자제한법 제2조 제1항(최고이자율 연 20%), 제2조 제3항(초과이자 무효), 제3조(선이자 공제 시 원금 산입)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ※ 대부업자는 대부업 등의 등록 및 금융이용자 보호에 관한 법률 제8조(최고금리 연 20%) 동일 적용
            </p>
          </div>
        </div>
      )}


      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">이자 과다 청구 시</h2>
        <ol className="space-y-3">
          {[
            { color: '#06b6d4', text: '이자제한법 제2조 제3항: 초과 이자 약정은 초과 부분 무효 (연 20% 상한)' },
            { color: '#3b82f6', text: '이자제한법 제3조: 선이자 공제 시 공제액은 원금에서 제한 (실제 수령액이 원금)' },
            { color: '#f59e0b', text: '초과 지급한 이자는 원금에 충당, 원금 완제 후 반환 청구 가능' },
            { color: '#ef4444', text: '대부업자는 대부업법 제8조 위반 시 금융감독원 신고 가능' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>
      {result !== null && (
        <div className="mt-6">
          <ActionInsight
            calculatorId="loan-interest"
            amount={result.isExceeded ? result.excessInterest : result.interest}
          />
        </div>
      )}

    </CalculatorLayout>
  );
}
