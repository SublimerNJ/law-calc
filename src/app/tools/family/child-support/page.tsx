'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import {
  CHILD_SUPPORT_AGE_OPTIONS,
  CHILD_SUPPORT_INCOME_BRACKETS,
  CHILD_SUPPORT_SOURCE_URL,
  calculateChildSupport,
  getStandardChildSupport,
  type AgeGroup,
  type ChildCount,
  type ChildSupportResult,
} from '@/lib/calc/child-support';

const tool = TOOLS.find(t => t.id === 'child-support')!;
const category = CATEGORIES.find(c => c.id === 'family')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

const CHILD_COUNT_LABELS: Record<ChildCount, string> = {
  '1': '1명',
  '2': '2명',
  '3': '3명 이상',
};

export default function ChildSupportPage() {
  const [childCount, setChildCount] = useState<ChildCount>('1');
  const [custodialIncome, setCustodialIncome] = useState('');
  const [noncustodialIncome, setNoncustodialIncome] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('6-8');
  const [result, setResult] = useState<ChildSupportResult | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleNumberInput = (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value.replace(/[^0-9]/g, ''));
    };

  const handleCalculate = () => {
    setError('');
    setWarning('');

    // INPUT-02: 소득 필드 빈값 체크
    if (custodialIncome === '' && noncustodialIncome === '') {
      setError('소득 정보를 입력해주세요.');
      setResult(null);
      return;
    }

    const ci = custodialIncome === '' ? 0 : parseInt(custodialIncome, 10);
    const ni = noncustodialIncome === '' ? 0 : parseInt(noncustodialIncome, 10);

    if (isNaN(ci) || isNaN(ni) || ci < 0 || ni < 0) {
      setError('소득 값이 올바르지 않습니다.');
      setResult(null);
      return;
    }

    // INPUT-01: 두 소득 모두 0이면 에러
    if (ci === 0 && ni === 0) {
      setError('소득 정보를 입력해주세요. 양육자 또는 비양육자 소득 중 하나 이상이 필요합니다.');
      setResult(null);
      return;
    }

    // INPUT-03: 합산 소득 3,000만원 초과 경고
    const combinedIncome = ci + ni;
    if (combinedIncome > 30_000) {
      setWarning('소득 합산이 3,000만원을 초과합니다. 입력 단위(만원)를 확인해주세요.');
    }

    setResult(calculateChildSupport({
      childCount,
      custodialIncome: ci,
      noncustodialIncome: ni,
      ageGroup,
    }));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        {/* FLOW-03: 자녀 수 필수 표시 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">자녀 수 <span className="text-red-500">*</span></label>
          <select
            value={childCount}
            onChange={e => setChildCount(e.target.value as ChildCount)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            {(Object.entries(CHILD_COUNT_LABELS) as [ChildCount, string][]).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* FLOW-03: 소득 필수 표시 + INPUT-04: 숫자만 허용 */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">양육자 월 소득 (만원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={custodialIncome}
            onChange={handleNumberInput(setCustodialIncome)}
            placeholder="예: 300"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">비양육자 월 소득 (만원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={noncustodialIncome}
            onChange={handleNumberInput(setNoncustodialIncome)}
            placeholder="예: 500"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          />
        </div>

        {/* FLOW-03: 자녀 나이대 필수 표시 */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">자녀 나이대 <span className="text-red-500">*</span></label>
          <div className="flex flex-col gap-2">
            {CHILD_SUPPORT_AGE_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="ageGroup"
                  checked={ageGroup === value}
                  onChange={() => setAgeGroup(value)}
                  className="accent-[#ec4899]"
                />
                <span className="text-sm text-slate-600">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 에러/경고 표시 (버튼 위) */}
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

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">월 양육비</p>
            {result.monthlyTotal === 0 ? (
              <p className="text-sm text-slate-500">양육비가 산정되지 않았습니다.</p>
            ) : (
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.monthlyTotal)}원
              </p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">비양육자 부담분</p>
            <p className="text-lg text-slate-900">
              {formatNumber(result.noncustodialPayment)}원 ({(result.noncustodialShare * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">양육자 부담분</p>
            <p className="text-lg text-slate-900">
              {formatNumber(result.custodialPayment)}원 ({((1 - result.noncustodialShare) * 100).toFixed(1)}%)
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">합산 소득</p>
            <p className="text-lg text-slate-900">{formatNumber(result.combinedIncome)}만원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">연간 양육비</p>
            <p className="text-lg text-slate-900">{formatNumber(result.monthlyTotal * 12)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">산출 근거</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono glassmorphism glass-panel">
{`합산소득: ${formatNumber(result.combinedIncome)}만원 → 기준표 1인당: ${formatNumber(result.standardPerChild)}원
자녀 수: ${result.childCountValue}명

월 양육비 참고 합계 = ${formatNumber(result.standardPerChild)} × ${result.childCountValue} = ${formatNumber(result.monthlyTotal)}원
비양육자 부담 = ${formatNumber(result.monthlyTotal)} × ${(result.noncustodialShare * 100).toFixed(1)}% = ${formatNumber(result.noncustodialPayment)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-3">양육비 산정 기준표 (합산소득별 1인당)</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-left text-xs text-gray-500">합산 월소득</th>
                  <th className="py-2 text-right text-xs text-gray-500">자녀 1인 기준</th>
                </tr>
              </thead>
              <tbody>
                {CHILD_SUPPORT_INCOME_BRACKETS.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-200/50 ${i === result.incomeTableIdx ? 'bg-[#ec4899]/10' : ''}`}>
                    <td className="py-2 text-slate-600">{row.label}</td>
                    <td className="py-2 text-right" style={{ color: i === result.incomeTableIdx ? category.color : '#9ca3af' }}>
                      {formatNumber(getStandardChildSupport(ageGroup, row.min))}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제837조, 가사소송법 제2조, 서울가정법원 양육비산정기준표(2021년 공표·2022. 3. 1. 시행)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              기준표는 양육자녀 2인 4인가구의 자녀 1인 평균입니다. 자녀 수·거주지역·재산·치료비·교육비 등 가산·감산 요소는 법원이 별도로 판단하므로, 본 계산기는 같은 연령 자녀의 단순 합계만 참고로 표시합니다.{' '}
              <a href={CHILD_SUPPORT_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">서울가정법원 공식 원문</a>
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <ActionInsight calculatorId="child-support" amount={result.monthlyTotal} />
      )}

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">양육비 청구 방법</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#ec4899' }}>1</span>
            <span className="text-sm text-slate-600">협의: 양육비 이행확인서 작성 (공증)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#ec4899' }}>2</span>
            <span className="text-sm text-slate-600">비협조 시: 가정법원 양육비 심판 청구</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#ec4899' }}>3</span>
            <span className="text-sm text-slate-600">미지급 시: 양육비이행관리원 (1644-6621)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#ec4899' }}>4</span>
            <span className="text-sm text-slate-600">강제집행: 급여 압류, 출국금지 가능</span>
          </li>
        </ol>
      </div>
    </CalculatorLayout>
  );
}
