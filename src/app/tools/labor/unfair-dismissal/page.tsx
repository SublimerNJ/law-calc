'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'unfair-dismissal')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface Result {
  dismissalDays: number;
  dailyAvgWage: number;
  grossCompensation: number;
  interimDeduction: number;
  netCompensation: number;
}

export default function UnfairDismissalPage() {
  const [monthlyWage, setMonthlyWage] = useState('');
  const [useDate, setUseDate] = useState(true);
  const [dismissalDate, setDismissalDate] = useState('');
  const [reinstatementDate, setReinstatementDate] = useState('');
  const [dismissalMonths, setDismissalMonths] = useState('');
  const [interimIncome, setInterimIncome] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const wage = parseInt(monthlyWage.replace(/,/g, ''), 10);
    if (!wage || wage <= 0) return;

    let days: number;
    if (useDate) {
      if (!dismissalDate || !reinstatementDate) return;
      const start = new Date(dismissalDate);
      const end = new Date(reinstatementDate);
      days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      if (days <= 0) return;
    } else {
      const months = parseFloat(dismissalMonths);
      if (!months || months <= 0) return;
      days = Math.round(months * 30);
    }

    const dailyAvgWage = Math.floor((wage * 12) / 365);
    const grossCompensation = dailyAvgWage * days;
    const interim = parseInt((interimIncome || '0').replace(/,/g, ''), 10) || 0;
    const netCompensation = Math.max(0, grossCompensation - interim);

    setResult({
      dismissalDays: days,
      dailyAvgWage,
      grossCompensation,
      interimDeduction: interim,
      netCompensation,
    });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        {/* Monthly wage */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">퇴직 전 3개월 평균 월임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setMonthlyWage)}
            placeholder="예: 3,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Date or months toggle */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">해고기간 입력 방식</label>
          <div className="flex gap-2">
            <button
              onClick={() => setUseDate(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                useDate ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              날짜 입력
            </button>
            <button
              onClick={() => setUseDate(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useDate ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              개월수 입력
            </button>
          </div>
        </div>

        {useDate ? (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">해고 시작일</label>
              <input
                type="date"
                value={dismissalDate}
                onChange={e => setDismissalDate(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">판정/복직 예상일</label>
              <input
                type="date"
                value={reinstatementDate}
                onChange={e => setReinstatementDate(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">해고 경과 개월수</label>
            <input
              type="text"
              inputMode="numeric"
              value={dismissalMonths}
              onChange={e => setDismissalMonths(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="예: 6"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        )}

        {/* Interim income (optional) */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">중간수입 (다른 직장 수입, 선택사항)</label>
          <input
            type="text"
            inputMode="numeric"
            value={interimIncome ? parseInt(interimIncome).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setInterimIncome)}
            placeholder="예: 5,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 hover:bg-[#d97706] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="bg-white rounded-xl p-5 mb-4 text-center">
            <p className="text-sm text-slate-600 mb-1">보상금 예상액</p>
            <p className="text-3xl font-bold text-[#f59e0b]">{formatNumber(result.netCompensation)}원</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">해고기간</span>
              <span className="text-slate-900">{formatNumber(result.dismissalDays)}일</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">1일 평균임금</span>
              <span className="text-slate-900">{formatNumber(result.dailyAvgWage)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">임금상당액 (총액)</span>
              <span className="text-slate-900">{formatNumber(result.grossCompensation)}원</span>
            </div>
            {result.interimDeduction > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">중간수입 공제액</span>
                <span className="text-red-400">-{formatNumber(result.interimDeduction)}원</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="font-mono text-xs text-slate-600 bg-white rounded-lg p-3 whitespace-pre-wrap">
{`1일 평균임금: ${formatNumber(result.dailyAvgWage)}원
× 미복직일수: ${formatNumber(result.dismissalDays)}일
= 임금상당액: ${formatNumber(result.grossCompensation)}원
- 중간수입: ${formatNumber(result.interimDeduction)}원
= 보상금 예상액: ${formatNumber(result.netCompensation)}원`}
            </pre>
          </div>

          <div className="mt-4 p-4 bg-slate-100/50 rounded-lg">
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-600">법적 근거:</strong> 근로기준법 제28조(부당해고 구제신청, 3개월 이내), 제30조(구제명령 등), 제33조(이행강제금)
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">부당해고 구제 신청 방법</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '구제신청서 작성', desc: '해고일로부터 3개월 이내에 지방노동위원회에 신청 (근로기준법 제28조, 상시 5인 이상 사업장 적용)' },
              { step: '2', title: '필요 서류', desc: '근로계약서, 급여명세서, 해고통보서, 재직증명서 등' },
              { step: '3', title: '심판 진행', desc: '신청 후 60일 이내 판정 (조사→심문→판정)' },
              { step: '4', title: '판정 결과', desc: '복직명령 또는 금전보상명령 (사용자 불이행 시 이행강제금)' },
              { step: '5', title: '불복 시', desc: '중앙노동위원회 재심 → 행정소송 가능' },
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
          <p className="text-xs text-gray-500 mt-4">문의: 고용노동부 (국번 없이 1350) | 노동위원회 (www.nlrc.go.kr)</p>
        </div>
      )}

      <div className="premium-card p-4 mt-4">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">해고예고를 받지 못하셨나요?</strong> 해고예고수당(30일분 통상임금)은 부당해고 보상금과 별개입니다.
          해고 30일 전 예고 없이 해고된 경우 해고예고수당도 청구할 수 있습니다.
        </p>
        <Link href="/tools/labor/dismissal-notice" className="mt-2 inline-block text-sm font-medium hover:underline" style={{ color: category.color }}>
          → 해고예고수당 계산기로 이동
        </Link>
      </div>
    </CalculatorLayout>
  );
}
