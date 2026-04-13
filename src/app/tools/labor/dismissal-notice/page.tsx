'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'dismissal-notice')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DismissalNoticePage() {
  const [monthlyWage, setMonthlyWage] = useState('');
  const [noticeDays, setNoticeDays] = useState('');
  const [result, setResult] = useState<{
    allowance: number;
    dailyWage: number;
    unpaidDays: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const wage = parseInt(monthlyWage.replace(/[^0-9]/g, ''), 10);
    if (!wage || wage <= 0) {
      setError('월 통상임금을 입력해주세요.');
      setResult(null);
      return;
    }

    if (!noticeDays && noticeDays !== '0') {
      setError('해고예고일수를 입력해주세요.');
      setResult(null);
      return;
    }

    const days = parseInt(noticeDays, 10);
    if (isNaN(days) || days < 0) {
      setError('해고예고일수를 올바르게 입력해주세요.');
      setResult(null);
      return;
    }

    if (days >= 30) {
      setError('해고예고일수는 0~29일 사이여야 합니다. 30일 이상 예고 시 해고예고수당이 발생하지 않습니다.');
      setResult(null);
      return;
    }

    if (wage > 100_000_000) {
      setWarning('월 통상임금이 1억원을 초과합니다. 확인해주세요.');
    }

    const dailyWage = Math.floor(wage / 30);
    const unpaidDays = Math.max(0, 30 - days);
    const allowance = dailyWage * unpaidDays;

    setResult({ allowance, dailyWage, unpaidDays });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setMonthlyWage(raw);
  };

  const handleNoticeDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoticeDays(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">월 통상임금 (원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          {monthlyWage && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(monthlyWage).toLocaleString('ko-KR')}원 (기본급 + 고정수당)
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">해고예고일수 (0~29일) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={noticeDays}
            onChange={handleNoticeDaysChange}
            placeholder="0 = 즉시해고"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">실제 받은 예고 기간. 0 = 예고 없이 즉시해고 (30일분 수당 전액 지급)</p>
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
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.allowance === 0 && (
            <div className="mb-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700">
                해고예고수당이 발생하지 않습니다 (30일 이상 예고). 사용자가 30일 이상의 예고를 한 경우 수당 지급 의무가 없습니다.
              </p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">해고예고수당</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.allowance)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">미지급 예고일수</p>
              <p className="text-lg text-slate-900">{result.unpaidDays}일</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">1일 통상임금</p>
              <p className="text-lg text-slate-900">{formatNumber(result.dailyWage)}원</p>
            </div>
          </div>

          <div className="mb-4 p-4 rounded-lg bg-blue-600/10 border border-[#f59e0b]/30">
            <p className="text-sm font-semibold text-[#f59e0b] mb-2">해고예고 적용 제외 (근로기준법 제35조)</p>
            <ul className="space-y-1 text-sm text-slate-600 list-disc list-inside">
              <li>일용근로자로서 3개월을 계속 근무하지 아니한 자</li>
              <li>2개월 이내의 기간을 정하여 사용된 근로자</li>
              <li>월급 근로자로서 6개월이 되지 못한 자</li>
              <li>계절적 업무에 6개월 이내의 기간을 정하여 사용된 근로자</li>
              <li>수습 중인 근로자(3개월 이내)</li>
              <li>천재·사변, 그 밖의 부득이한 사유로 사업을 계속하는 것이 불가능한 경우</li>
              <li>근로자가 고의로 사업에 막대한 지장을 초래하거나 재산상 손해를 끼친 경우</li>
            </ul>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap glassmorphism glass-panel">
{`통상임금: ${monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : 0}원
÷ 30 = 1일 통상임금: ${formatNumber(result.dailyWage)}원
× (30 - ${noticeDays}일) = 미지급 ${result.unpaidDays}일
= 해고예고수당: ${formatNumber(result.allowance)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              법적 근거: 근로기준법 제26조 - 사용자는 근로자를 해고하려면 적어도 30일 전에 예고를 하여야 하고, 30일 전에 예고를 하지 아니하였을 때에는 30일분 이상의 통상임금을 지급하여야 합니다.
            </p>
          </div>
          <ActionInsight calculatorId="dismissal-notice" amount={result.allowance} />
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">해고예고수당 미지급 시</h2>
        <ol className="space-y-3">
          {[
            { color: '#f59e0b', text: '사업주에게 서면 청구' },
            { color: '#ef4444', text: '지방고용노동청 신고 (1350)' },
            { color: '#10b981', text: '3년 이내 미지급 임금 청구 가능' },
            { color: '#8b5cf6', text: '근로기준법 제26조 위반 시 2년 이하 징역 또는 2,000만원 이하 벌금' },
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

      <div className="premium-card p-4 mt-4">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">부당해고를 당하셨나요?</strong> 해고예고수당과 부당해고 보상금은 다릅니다.
          부당해고 시 받을 수 있는 보상금은 별도 계산이 필요합니다.
        </p>
        <Link aria-label="Navigation link" href="/tools/labor/unfair-dismissal" className="mt-2 inline-block text-sm font-medium hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]" style={{ color: category.color }}>
          → 부당해고 보상금 계산기로 이동
        </Link>
      </div>
    </CalculatorLayout>
  );
}
