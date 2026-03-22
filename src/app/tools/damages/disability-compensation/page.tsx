'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'disability-compensation')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

interface GradeInfo {
  grade: number;
  days: number;
  pensionDays: number | null; // annual pension days, null if not eligible
  description: string;
}

const DISABILITY_GRADES: GradeInfo[] = [
  { grade: 1, days: 1474, pensionDays: 329, description: '두 눈 실명, 두 팔 또는 두 다리 상실 등 (가장 중증)' },
  { grade: 2, days: 1309, pensionDays: 291, description: '한 눈 실명 + 다른 눈 시력 0.02 이하, 두 팔을 손목관절 이상에서 상실 등' },
  { grade: 3, days: 1155, pensionDays: 257, description: '두 눈 시력 0.06 이하, 신경계통 기능에 노동이 불가능한 장해 등' },
  { grade: 4, days: 1012, pensionDays: 224, description: '두 귀 청력 완전 상실, 한 팔을 팔꿈치관절 이상에서 상실 등' },
  { grade: 5, days: 869, pensionDays: 193, description: '한 팔을 손목관절 이상에서 상실, 한 다리를 무릎관절 이상에서 상실 등' },
  { grade: 6, days: 737, pensionDays: 164, description: '두 손의 손가락 모두 상실, 척추에 고도의 장해 등' },
  { grade: 7, days: 616, pensionDays: 138, description: '한 눈 실명 + 다른 눈 시력 0.6 이하, 한 손 손가락 모두 상실 등' },
  { grade: 8, days: 495, pensionDays: null, description: '한 다리에 가관절이 남은 경우, 한 발의 발가락 모두 상실 등' },
  { grade: 9, days: 385, pensionDays: null, description: '한 눈 시력 0.06 이하, 신경계통 기능에 노동이 상당히 제한되는 장해 등' },
  { grade: 10, days: 297, pensionDays: null, description: '한 눈 시력 0.1 이하, 한 손의 엄지손가락 상실 등' },
  { grade: 11, days: 220, pensionDays: null, description: '두 귀 청력이 1m 이상에서 보통 말소리를 해득하지 못하는 경우 등' },
  { grade: 12, days: 154, pensionDays: null, description: '한 눈의 안구에 조절기능에 현저한 장해, 쇄골·흉골 등에 기형이 남은 경우 등' },
  { grade: 13, days: 99, pensionDays: null, description: '한 눈 시력 0.6 이하, 한 손의 새끼손가락 상실 등' },
  { grade: 14, days: 55, pensionDays: null, description: '한 손의 엄지손가락 제1지절 이상 결손, 한 귀 청력이 1m 이상 해득 불가 등' },
];

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface Result {
  grade: GradeInfo;
  lumpSum: number;
  annualPension: number | null;
  monthlyPension: number | null;
}

export default function DisabilityCompensationPage() {
  const [selectedGrade, setSelectedGrade] = useState(7);
  const [dailyWage, setDailyWage] = useState('');
  const [paymentType, setPaymentType] = useState<'lump' | 'pension'>('lump');
  const [result, setResult] = useState<Result | null>(null);

  const gradeInfo = DISABILITY_GRADES.find(g => g.grade === selectedGrade)!;
  const hasPensionOption = gradeInfo.pensionDays !== null;

  const handleCalculate = () => {
    const wage = parseInt(dailyWage.replace(/,/g, ''), 10);
    if (!wage || wage <= 0) return;

    const lumpSum = wage * gradeInfo.days;
    let annualPension: number | null = null;
    let monthlyPension: number | null = null;

    if (gradeInfo.pensionDays) {
      annualPension = wage * gradeInfo.pensionDays;
      monthlyPension = Math.floor(annualPension / 12);
    }

    setResult({ grade: gradeInfo, lumpSum, annualPension, monthlyPension });
  };

  const handleWageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDailyWage(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">장해등급 (1급~14급)</label>
          <select
            value={selectedGrade}
            onChange={(e) => {
              const g = parseInt(e.target.value, 10);
              setSelectedGrade(g);
              const info = DISABILITY_GRADES.find(gi => gi.grade === g)!;
              if (!info.pensionDays) setPaymentType('lump');
            }}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          >
            {DISABILITY_GRADES.map(g => (
              <option key={g.grade} value={g.grade}>
                {g.grade}급 — {g.description.substring(0, 30)}...
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-2">{gradeInfo.description}</p>
          <p className="text-xs text-gray-500 mt-1">지급일수: {gradeInfo.days}일</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">평균임금 (일액, 원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={dailyWage ? parseInt(dailyWage).toLocaleString('ko-KR') : ''}
            onChange={handleWageChange}
            placeholder="예: 100,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
          {dailyWage && (
            <p className="text-xs text-gray-500 mt-1">
              사고 전 3개월 평균임금 일액: {parseInt(dailyWage).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">지급 방식</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                checked={paymentType === 'lump'}
                onChange={() => setPaymentType('lump')}
                className="accent-[#f97316]"
              />
              <span className="text-sm text-gray-300">일시금</span>
            </label>
            <label className={`flex items-center gap-2 ${hasPensionOption ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}>
              <input
                type="radio"
                name="paymentType"
                checked={paymentType === 'pension'}
                onChange={() => hasPensionOption && setPaymentType('pension')}
                disabled={!hasPensionOption}
                className="accent-[#f97316]"
              />
              <span className="text-sm text-gray-300">연금 {!hasPensionOption && '(1~7급만 해당)'}</span>
            </label>
          </div>
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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">장해등급</p>
            <p className="text-lg text-white">{result.grade.grade}급</p>
            <p className="text-xs text-gray-500">{result.grade.description}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">장해보상 일시금</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.lumpSum)}원
            </p>
            <p className="text-xs text-gray-500">평균임금 {dailyWage ? formatNumber(parseInt(dailyWage)) : '0'}원 x {result.grade.days}일</p>
          </div>

          {result.annualPension !== null && result.monthlyPension !== null && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">연금 선택 시</p>
              <p className="text-lg text-white">연액: {formatNumber(result.annualPension)}원</p>
              <p className="text-lg text-white">월액: {formatNumber(result.monthlyPension)}원</p>
              <p className="text-xs text-gray-500">연금 지급일수: {result.grade.pensionDays}일/년</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 산업재해보상보험법 제57조, 별표 2. 본 계산은 참고용이며 실제 지급액은 근로복지공단 심사에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
