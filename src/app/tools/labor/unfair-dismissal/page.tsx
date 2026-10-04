'use client';

import { useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import {
  calculateUnfairDismissalWage,
  type UnfairDismissalWageResult,
} from '@/lib/calc/unfair-dismissal';

const tool = TOOLS.find((item) => item.id === 'unfair-dismissal')!;
const category = CATEGORIES.find((item) => item.id === 'labor')!;
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

function calculateCalendarDays(startDate: string, endDate: string): number {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  return Math.round((end.getTime() - start.getTime()) / MILLISECONDS_PER_DAY);
}

export default function UnfairDismissalPage() {
  const [dailyAverageWage, setDailyAverageWage] = useState('');
  const [dismissalDate, setDismissalDate] = useState('');
  const [calculationEndDate, setCalculationEndDate] = useState('');
  const [result, setResult] = useState<UnfairDismissalWageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);

    const dailyWage = parseMoney(dailyAverageWage);
    if (!dailyWage) {
      setError('계산에 사용할 1일 기준 임금을 입력해주세요.');
      setResult(null);
      return;
    }

    if (!dismissalDate || !calculationEndDate) {
      setError('해고일과 계산 종료일을 모두 입력해주세요.');
      setResult(null);
      return;
    }

    const dismissalDays = calculateCalendarDays(dismissalDate, calculationEndDate);
    if (dismissalDays <= 0) {
      setError('계산 종료일은 해고일보다 뒤인 날짜를 입력해주세요.');
      setResult(null);
      return;
    }

    setResult(
      calculateUnfairDismissalWage({
        dailyAverageWage: dailyWage,
        dismissalDays,
      }),
    );
  };

  const handleMoneyChange = (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value.replace(/[^0-9]/g, ''));
    };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">임금상당액 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          근로기준법 제30조의 해고기간 임금상당액을, 입력한 1일 기준 임금과 기간으로 계산합니다.
          위로금·추가 금전보상·중간수입 공제·해고예고수당·퇴직금은 계산하지 않습니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="unfair-dismissal-daily-wage">
            1일 기준 임금 (원) *
          </label>
          <input
            id="unfair-dismissal-daily-wage"
            type="text"
            inputMode="numeric"
            value={dailyAverageWage ? formatNumber(parseMoney(dailyAverageWage)) : ''}
            onChange={handleMoneyChange(setDailyAverageWage)}
            placeholder="예: 100,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-2">
            근로기준법상 평균임금은 사유 발생 전 3개월 임금 총액을 그 기간의 총일수로 나누어 산정합니다.
            사건에 적용할 1일 기준 임금을 확인해 입력하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="unfair-dismissal-start-date">
              해고일 *
            </label>
            <input
              id="unfair-dismissal-start-date"
              type="date"
              value={dismissalDate}
              onChange={(event) => setDismissalDate(event.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="unfair-dismissal-end-date">
              계산 종료일(판정일·복직일 등) *
            </label>
            <input
              id="unfair-dismissal-end-date"
              type="date"
              value={calculationEndDate}
              onChange={(event) => setCalculationEndDate(event.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="button"
          onClick={handleCalculate}
          className="w-full bg-teal-700 hover:bg-teal-900 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          임금상당액 계산하기
        </button>
      </div>

      {result && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">임금상당액 계산 결과</h2>

          <div className="bg-white rounded-xl p-5 mb-4 text-center glassmorphism glass-panel">
            <p className="text-sm text-slate-600 mb-1">입력 기간 임금상당액</p>
            <p className="text-3xl font-bold text-[#0f766e]">{formatNumber(result.wageEquivalent)}원</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">1일 기준 임금</span>
              <span className="text-slate-900">{formatNumber(result.dailyAverageWage)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">입력 해고기간</span>
              <span className="text-slate-900">{formatNumber(result.dismissalDays)}일</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap glassmorphism glass-panel">
{`1일 기준 임금: ${formatNumber(result.dailyAverageWage)}원
× 입력 해고기간: ${formatNumber(result.dismissalDays)}일
= 입력 기간 임금상당액: ${formatNumber(result.wageEquivalent)}원`}
            </pre>
          </div>

          <div className="mt-4 p-4 bg-slate-100/50 rounded-lg glassmorphism glass-panel">
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-600">법적 근거:</strong> 근로기준법 제2조 제1항 제6호(평균임금),
              제28조(부당해고등의 구제신청), 제30조 제3항·제4항(임금 상당액에 해당하는 금품의 지급명령).
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">부당해고 구제신청 확인사항</h2>
        <div className="space-y-3">
          {[
            {
              step: '1',
              title: '신청 기간',
              desc: '부당해고가 있었던 날부터 3개월 이내에 관할 지방노동위원회에 구제를 신청해야 합니다(근로기준법 제28조).',
            },
            {
              step: '2',
              title: '서면 통지',
              desc: '해고사유와 해고시기를 서면으로 통지했는지 확인하세요(근로기준법 제27조).',
            },
            {
              step: '3',
              title: '자료 준비',
              desc: '근로계약서, 임금명세서, 해고 통지서, 출퇴근·업무 자료를 해고일과 임금 항목별로 보전하세요.',
            },
            {
              step: '4',
              title: '금전보상 신청',
              desc: '원직복직을 원하지 않는 경우 금전보상명령을 신청할 수 있지만, 추가 금품의 액수는 사건 자료와 노동위원회 판단에 따라 달라집니다.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: category.color, color: '#fff' }}
              >
                {item.step}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          중앙노동위원회 공식 안내: 노동위원회 온라인사건신청에서 절차와 서식을 확인하세요.
        </p>
      </section>

      <div className="premium-card p-4 mt-4">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">해고예고수당을 확인하려면?</strong> 해고예고수당은 임금상당액과
          별도 쟁점입니다. 해고 30일 전 예고 여부와 통상임금 자료를 따로 확인하세요.
        </p>
        <Link
          aria-label="Navigation link"
          href="/tools/labor/dismissal-notice"
          className="mt-2 inline-block text-sm font-medium hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px]"
          style={{ color: category.color }}
        >
          → 해고예고수당 계산기로 이동
        </Link>
      </div>
    </CalculatorLayout>
  );
}
