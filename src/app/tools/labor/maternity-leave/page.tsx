'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'maternity-leave')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

const MATERNITY_UPPER = 2_035_640; // 2026 monthly cap
const MIN_WAGE_MONTHLY = 2_096_270; // 10,030 x 209

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
      active ? 'bg-[#f59e0b] text-black' : 'bg-[#1e2d4a] text-gray-400 hover:text-white'
    }`;

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        {/* Birth type */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">출산 유형</label>
          <div className="flex gap-2">
            <button onClick={() => setBirthType('single')} className={tabClass(birthType === 'single')}>단태아</button>
            <button onClick={() => setBirthType('multiple')} className={tabClass(birthType === 'multiple')}>다태아</button>
          </div>
        </div>

        {/* Company size */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">기업 규모</label>
          <div className="flex gap-2">
            <button onClick={() => setCompanySize('sme')} className={tabClass(companySize === 'sme')}>우선지원대상기업 (중소)</button>
            <button onClick={() => setCompanySize('large')} className={tabClass(companySize === 'large')}>대기업</button>
          </div>
        </div>

        {/* Monthly ordinary wage */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">월 통상임금 (원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={monthlyWage ? parseInt(monthlyWage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange}
            placeholder="예: 2,500,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">2026 고용보험 상한: 월 {formatNumber(MATERNITY_UPPER)}원 / 최저임금 기준: 월 {formatNumber(MIN_WAGE_MONTHLY)}원</p>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold py-3 rounded-lg transition-colors"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="bg-[#0d1424] rounded-xl p-5 mb-4 text-center">
            <p className="text-sm text-gray-400 mb-1">고용보험 지급액</p>
            <p className="text-3xl font-bold text-[#f59e0b]">{formatNumber(result.insuranceTotal)}원</p>
          </div>

          {result.employerTotal > 0 && (
            <div className="bg-[#0d1424] rounded-xl p-4 mb-4 text-center">
              <p className="text-sm text-gray-400 mb-1">사업주 부담액</p>
              <p className="text-2xl font-bold text-white">{formatNumber(result.employerTotal)}원</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">총 출산휴가일수</span>
              <span className="text-white">{result.totalLeaveDays}일</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">고용보험 지급일수</span>
              <span className="text-white">{result.insuranceDays}일</span>
            </div>
            {result.employerDays > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">사업주 부담일수</span>
                <span className="text-white">{result.employerDays}일</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">1일 통상임금</span>
              <span className="text-white">{formatNumber(result.dailyOrdinaryWage)}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">1일 지급액 (고용보험)</span>
              <span className="text-white">{formatNumber(result.dailyPayment)}원</span>
            </div>
            {result.capApplied && (
              <p className="text-xs text-yellow-500">* 고용보험 상한(월 {formatNumber(MATERNITY_UPPER)}원) 적용</p>
            )}
          </div>

          <div className="mt-6 p-4 bg-[#1e2d4a]/50 rounded-lg">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`[고용보험 지급] min(1일 통상임금, 상한액) × 고용보험 지급일수
[사업주 부담] 1일 통상임금 × 사업주 부담일수
(대기업: 첫 60일 사업주 부담, 나머지 고용보험 지급)`}
            </pre>
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">법적 근거:</strong> 근로기준법 제74조(출산전후휴가), 고용보험법 제76조
            </p>
            <p className="text-xs text-gray-500 mt-2">
              * 실제 지급액은 고용보험 심사에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
