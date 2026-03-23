'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'industrial-accident')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

// 장해등급별 일시금 일수
const DISABILITY_LUMP_DAYS: Record<number, number> = {
  1: 1474, 2: 1309, 3: 1155, 4: 1012, 5: 869, 6: 737, 7: 616,
  8: 495, 9: 385, 10: 297, 11: 220, 12: 154, 13: 99, 14: 55,
};

// 장해등급별 연금 일수 (1~7급만)
const DISABILITY_PENSION_DAYS: Record<number, number> = {
  1: 329, 2: 291, 3: 257, 4: 224, 5: 193, 6: 164, 7: 138,
};

// 2026 간병급여
const NURSING_DAILY = { fullTime: 41_170, partTime: 27_450 };

// 최저임금 80% 기준 (시급 10,030 * 0.8 * 8시간)
const MIN_WAGE_80_DAILY = 10_030 * 0.8 * 8; // = 64,192

type BenefitType = 'absence' | 'disability' | 'nursing';
type PaymentType = 'lump' | 'pension';
type NursingType = 'fullTime' | 'partTime';

interface AbsenceResult { type: 'absence'; dailyBenefit: number; totalDays: number; total: number; minApplied: boolean }
interface DisabilityResult { type: 'disability'; grade: number; paymentType: PaymentType; dailyWage: number; days: number; total: number; monthlyPension?: number }
interface NursingResult { type: 'nursing'; nursingType: NursingType; dailyAmount: number; totalDays: number; total: number }
type Result = AbsenceResult | DisabilityResult | NursingResult;

export default function IndustrialAccidentPage() {
  const [benefitType, setBenefitType] = useState<BenefitType>('absence');
  // Absence
  const [dailyWage, setDailyWage] = useState('');
  const [absenceDays, setAbsenceDays] = useState('');
  // Disability
  const [disabilityGrade, setDisabilityGrade] = useState(10);
  const [paymentType, setPaymentType] = useState<PaymentType>('lump');
  const [disabilityDailyWage, setDisabilityDailyWage] = useState('');
  // Nursing
  const [nursingType, setNursingType] = useState<NursingType>('fullTime');
  const [nursingDays, setNursingDays] = useState('');

  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    if (benefitType === 'absence') {
      const wage = parseInt(dailyWage.replace(/,/g, ''), 10);
      const days = parseInt(absenceDays.replace(/,/g, ''), 10);
      if (!wage || !days || wage <= 0 || days <= 0) return;
      const benefit70 = Math.floor(wage * 0.7);
      const minDaily = Math.floor(MIN_WAGE_80_DAILY);
      const dailyBenefit = Math.max(benefit70, minDaily);
      const minApplied = benefit70 < minDaily;
      setResult({ type: 'absence', dailyBenefit, totalDays: days, total: dailyBenefit * days, minApplied });
    } else if (benefitType === 'disability') {
      const wage = parseInt(disabilityDailyWage.replace(/,/g, ''), 10);
      if (!wage || wage <= 0) return;
      if (paymentType === 'lump') {
        const days = DISABILITY_LUMP_DAYS[disabilityGrade];
        setResult({ type: 'disability', grade: disabilityGrade, paymentType: 'lump', dailyWage: wage, days, total: wage * days });
      } else {
        if (disabilityGrade > 7) return; // pension only for 1-7
        const days = DISABILITY_PENSION_DAYS[disabilityGrade];
        const monthlyPension = Math.floor((wage * days) / 12);
        setResult({ type: 'disability', grade: disabilityGrade, paymentType: 'pension', dailyWage: wage, days, total: wage * days, monthlyPension });
      }
    } else {
      const days = parseInt(nursingDays.replace(/,/g, ''), 10);
      if (!days || days <= 0) return;
      const dailyAmount = NURSING_DAILY[nursingType];
      setResult({ type: 'nursing', nursingType, dailyAmount, totalDays: days, total: dailyAmount * days });
    }
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const tabClass = (active: boolean) =>
    `flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? 'bg-[#f59e0b] text-black' : 'bg-[#1e2d4a] text-gray-400 hover:text-white'
    }`;

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">급여 유형 선택</h2>

        <div className="flex gap-2 mb-6">
          <button onClick={() => { setBenefitType('absence'); setResult(null); }} className={tabClass(benefitType === 'absence')}>
            휴업급여
          </button>
          <button onClick={() => { setBenefitType('disability'); setResult(null); }} className={tabClass(benefitType === 'disability')}>
            장해급여
          </button>
          <button onClick={() => { setBenefitType('nursing'); setResult(null); }} className={tabClass(benefitType === 'nursing')}>
            간병급여
          </button>
        </div>

        {benefitType === 'absence' && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">평균임금 (원/일)</label>
              <input
                type="text" inputMode="numeric"
                value={dailyWage ? parseInt(dailyWage).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setDailyWage)}
                placeholder="예: 100,000"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">요양일수 (일)</label>
              <input
                type="text" inputMode="numeric"
                value={absenceDays}
                onChange={handleNumberChange(setAbsenceDays)}
                placeholder="예: 30"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
          </>
        )}

        {benefitType === 'disability' && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">평균임금 (원/일)</label>
              <input
                type="text" inputMode="numeric"
                value={disabilityDailyWage ? parseInt(disabilityDailyWage).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setDisabilityDailyWage)}
                placeholder="예: 100,000"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">장해등급</label>
              <select
                value={disabilityGrade}
                onChange={e => setDisabilityGrade(parseInt(e.target.value))}
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
              >
                {Array.from({ length: 14 }, (_, i) => i + 1).map(g => (
                  <option key={g} value={g}>{g}급 ({DISABILITY_LUMP_DAYS[g]}일)</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">지급방식</label>
              <div className="flex gap-2">
                <button onClick={() => setPaymentType('lump')} className={tabClass(paymentType === 'lump')}>일시금</button>
                <button
                  onClick={() => { if (disabilityGrade <= 7) setPaymentType('pension'); }}
                  className={`${tabClass(paymentType === 'pension')} ${disabilityGrade > 7 ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  연금 (1~7급)
                </button>
              </div>
            </div>
          </>
        )}

        {benefitType === 'nursing' && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">간병유형</label>
              <div className="flex gap-2">
                <button onClick={() => setNursingType('fullTime')} className={tabClass(nursingType === 'fullTime')}>상시간병</button>
                <button onClick={() => setNursingType('partTime')} className={tabClass(nursingType === 'partTime')}>수시간병</button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">간병일수 (일)</label>
              <input
                type="text" inputMode="numeric"
                value={nursingDays}
                onChange={handleNumberChange(setNursingDays)}
                placeholder="예: 30"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
              />
            </div>
          </>
        )}

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

          {result.type === 'absence' && (
            <>
              <div className="bg-[#0d1424] rounded-xl p-5 mb-4 text-center">
                <p className="text-sm text-gray-400 mb-1">총 휴업급여</p>
                <p className="text-3xl font-bold text-[#f59e0b]">{formatNumber(result.total)}원</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">1일 휴업급여 (평균임금 70%)</span>
                  <span className="text-white">{formatNumber(result.dailyBenefit)}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">요양일수</span>
                  <span className="text-white">{formatNumber(result.totalDays)}일</span>
                </div>
                {result.minApplied && (
                  <p className="text-xs text-yellow-500">* 최저보상기준(최저임금 80%) 적용</p>
                )}
              </div>
            </>
          )}

          {result.type === 'disability' && (
            <>
              <div className="bg-[#0d1424] rounded-xl p-5 mb-4 text-center">
                <p className="text-sm text-gray-400 mb-1">
                  {result.paymentType === 'lump' ? '장해급여 일시금' : '장해급여 연금 (연간)'}
                </p>
                <p className="text-3xl font-bold text-[#f59e0b]">
                  {result.paymentType === 'lump' ? `${formatNumber(result.total)}원` : `${formatNumber(result.total)}원/년`}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">장해등급</span>
                  <span className="text-white">{result.grade}급</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">평균임금</span>
                  <span className="text-white">{formatNumber(result.dailyWage)}원/일</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{result.paymentType === 'lump' ? '일시금 일수' : '연금 일수'}</span>
                  <span className="text-white">{result.days}일</span>
                </div>
                {result.monthlyPension && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">월 연금액</span>
                    <span className="text-white">{formatNumber(result.monthlyPension)}원/월</span>
                  </div>
                )}
              </div>
            </>
          )}

          {result.type === 'nursing' && (
            <>
              <div className="bg-[#0d1424] rounded-xl p-5 mb-4 text-center">
                <p className="text-sm text-gray-400 mb-1">총 간병급여</p>
                <p className="text-3xl font-bold text-[#f59e0b]">{formatNumber(result.total)}원</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">간병유형</span>
                  <span className="text-white">{result.nursingType === 'fullTime' ? '상시간병' : '수시간병'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">1일 간병급여</span>
                  <span className="text-white">{formatNumber(result.dailyAmount)}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">간병일수</span>
                  <span className="text-white">{formatNumber(result.totalDays)}일</span>
                </div>
              </div>
            </>
          )}

          <div className="mt-6 p-4 bg-[#1e2d4a]/50 rounded-lg">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            {result.type === 'absence' && (
              <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`평균임금 × 70% = 1일 휴업급여
(최저임금 80% 미만 시 최저임금 80% 적용)
1일 휴업급여 × 요양일수 = 총 휴업급여`}
              </pre>
            )}
            {result.type === 'disability' && (
              <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`평균임금 × 등급별 일수 = 장해급여 일시금
(연금: 평균임금 × 연금일수 ÷ 12 = 월 연금액)`}
              </pre>
            )}
            {result.type === 'nursing' && (
              <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`정액 간병급여(상시: 41,170원 / 수시: 27,450원) × 간병일수`}
              </pre>
            )}
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">법적 근거:</strong> 산업재해보상보험법 제52조(휴업급여), 제57조(장해급여), 제61조(간병급여)
            </p>
            <p className="text-xs text-gray-500 mt-2">
              * 실제 급여액은 근로복지공단 심사에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">산재보험 신청 방법</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '신청 방법', desc: '사업장 소재지 근로복지공단 지사 방문 또는 온라인 신청' },
              { step: '2', title: '필요서류', desc: '요양급여신청서, 진단서, 근로계약서' },
              { step: '3', title: '처리기간', desc: '접수 후 14일 이내 (복잡 사안 30일)' },
              { step: '4', title: '문의', desc: '근로복지공단 (1588-0075)' },
            ].map(item => (
              <div key={item.step} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: category.color, color: '#fff' }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-300">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">온라인 신청: 근로복지공단 (www.comwel.or.kr)</p>
        </div>
      )}
    </CalculatorLayout>
  );
}
