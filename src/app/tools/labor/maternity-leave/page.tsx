'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'maternity-leave')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

const MATERNITY_UPPER = 2_200_000; // 고용보험법 시행령 제101조 고시 기준 월 220만원 (2026.1.1 인상)
const MIN_WAGE_MONTHLY = 2_156_880; // 10,320 x 209 (2026년 최저임금 기준)

type BirthType = 'single' | 'multiple';
type CompanySize = 'sme' | 'large';

interface Result {
  totalLeaveDays: number;
  insuranceDays: number;
  employerDays: number;
  dailyOrdinaryWage: number;
  dailyInsuranceCap: number;
  dailyPayment: number;
  insuranceTotal: number;
  employerTotal: number;
  grandTotal: number;
  capApplied: boolean;
}

export default function MaternityLeavePage() {
  const [birthType, setBirthType] = useState<BirthType>('single');
  const [companySize, setCompanySize] = useState<CompanySize>('sme');
  const [monthlyWage, setMonthlyWage] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const wage = parseInt(monthlyWage.replace(/,/g, ''), 10);
    if (!wage || wage <= 0) return;

    const totalLeaveDays = birthType === 'single' ? 90 : 120;

    let insuranceDays: number;
    let employerDays: number;
    if (companySize === 'sme') {
      insuranceDays = totalLeaveDays;
      employerDays = 0;
    } else {
      // Large: employer pays first 60 (single) or 75 (multiple), rest is insurance
      employerDays = birthType === 'single' ? 60 : 75;
      insuranceDays = totalLeaveDays - employerDays;
    }

    const dailyOrdinaryWage = Math.floor(wage / 30);
    const dailyInsuranceCap = Math.floor(MATERNITY_UPPER / 30);
    const dailyPayment = Math.min(dailyOrdinaryWage, dailyInsuranceCap);
    const capApplied = dailyOrdinaryWage > dailyInsuranceCap;

    const insuranceTotal = dailyPayment * insuranceDays;
    const employerTotal = dailyOrdinaryWage * employerDays;
    const grandTotal = insuranceTotal + employerTotal;

    setResult({
      totalLeaveDays,
      insuranceDays,
      employerDays,
      dailyOrdinaryWage,
      dailyInsuranceCap,
      dailyPayment,
      insuranceTotal,
      employerTotal,
      grandTotal,
      capApplied,
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyWage(e.target.value.replace(/[^0-9]/g, ''));
  };

  const tabClass = (active: boolean) =>
    `flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
    }`;

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        {/* Birth type */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">출산 유형</label>
          <div className="flex gap-2">
            <button onClick={() => setBirthType('single')} className={tabClass(birthType === 'single')}>단태아</button>
            <button onClick={() => setBirthType('multiple')} className={tabClass(birthType === 'multiple')}>다태아</button>
          </div>
        </div>

        {/* Company size */}
        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">기업 규모</label>
          <div className="flex gap-2">
            <button onClick={() => setCompanySize('sme')} className={tabClass(companySize === 'sme')}>우선지원대상기업 (중소)</button>
            <button onClick={() => setCompanySize('large')} className={tabClass(companySize === 'large')}>대기업</button>
          </div>
        </div>

        {/* Monthly ordinary wage */}
        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">월 통상임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange}
            placeholder="예: 2,500,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">2026 고용보험 상한: 월 {formatNumber(MATERNITY_UPPER)}원 / 최저임금 기준: 월 {formatNumber(MIN_WAGE_MONTHLY)}원</p>
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
            <p className="text-sm text-slate-600 mb-1">고용보험 지급액</p>
            <p className="text-3xl font-bold text-[#f59e0b]">{formatNumber(result.insuranceTotal)}원</p>
          </div>

          {result.employerTotal > 0 && (
            <div className="bg-white rounded-xl p-4 mb-4 text-center">
              <p className="text-sm text-slate-600 mb-1">사업주 부담액</p>
              <p className="text-2xl font-bold text-slate-900">{formatNumber(result.employerTotal)}원</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">총 출산휴가일수</span>
              <span className="text-slate-900">{result.totalLeaveDays}일</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">고용보험 지급일수</span>
              <span className="text-slate-900">{result.insuranceDays}일</span>
            </div>
            {result.employerDays > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">사업주 부담일수</span>
                <span className="text-slate-900">{result.employerDays}일</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">1일 통상임금</span>
              <span className="text-slate-900">{formatNumber(result.dailyOrdinaryWage)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">1일 지급액 (고용보험)</span>
              <span className="text-slate-900">{formatNumber(result.dailyPayment)}원</span>
            </div>
            {result.capApplied && (
              <p className="text-xs text-yellow-500">* 고용보험 상한(월 {formatNumber(MATERNITY_UPPER)}원) 적용</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-slate-100/50 rounded-lg">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`[고용보험 지급] min(1일 통상임금, 상한액) × 고용보험 지급일수
[사업주 부담] 1일 통상임금 × 사업주 부담일수
(대기업: 단태아 첫 60일·다태아 첫 75일 사업주 부담, 나머지 고용보험 지급)`}
            </pre>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-600">법적 근거:</strong> 근로기준법 제74조(출산전후휴가), 고용보험법 제76조
            </p>
            <p className="text-xs text-gray-500 mt-2">
              * 실제 지급액은 고용보험 심사에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">급여 수령 및 신청 방법</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '고용보험 급여', desc: '휴가 종료 후 고용센터에 신청, 약 14일 내 지급' },
              { step: '2', title: '사업주 부담분', desc: '휴가 기간 중 통상임금으로 지급 (월급처럼)' },
              { step: '3', title: '우선지원대상기업', desc: '전액 고용보험에서 지급' },
              { step: '4', title: '신청방법', desc: '고용보험 홈페이지 또는 고용센터 방문' },
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
          <p className="text-xs text-gray-500 mt-4">온라인 신청: 고용보험 홈페이지 (www.ei.go.kr) | 고용센터 (1350)</p>
        </div>
      )}
    </CalculatorLayout>
  );
}
