'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'legal-aid')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

// 2026년 기준 중위소득 125% (가구원 수별, 원/월)
const INCOME_THRESHOLDS_125: Record<number, number> = {
  1: 2_784_000,
  2: 4_612_000,
  3: 5_914_000,
  4: 7_208_000,
  5: 8_447_000,
  6: 9_681_000,
};

type SupportType = 'litigation' | 'consultation' | 'criminal';

interface Result {
  eligible: boolean;
  threshold: number;
  excessAmount: number | null;
  reason: string;
}

export default function LegalAidPage() {
  const [householdSize, setHouseholdSize] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [totalAssets, setTotalAssets] = useState('');
  const [supportType, setSupportType] = useState<SupportType>('litigation');
  const [result, setResult] = useState<Result | null>(null);

  const formatNumber = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    return num ? Number(num).toLocaleString('ko-KR') : '';
  };

  const parseNumber = (val: string) => Number(val.replace(/[^0-9]/g, '')) || 0;

  const calculate = () => {
    const income = parseNumber(monthlyIncome);
    const assets = parseNumber(totalAssets);
    const base = INCOME_THRESHOLDS_125[householdSize] || INCOME_THRESHOLDS_125[6];

    // 법률상담은 150% = 125% * 1.2
    const threshold = supportType === 'consultation' ? Math.round(base * 1.2) : base;
    const assetLimit = 500_000_000;

    const incomeOk = income <= threshold;
    const assetsOk = assets <= assetLimit;

    if (incomeOk && assetsOk) {
      setResult({
        eligible: true,
        threshold,
        excessAmount: null,
        reason: `월 소득 ${income.toLocaleString('ko-KR')}원이 기준(${threshold.toLocaleString('ko-KR')}원) 이하이며, 재산이 5억 이하로 지원 대상입니다.`,
      });
    } else {
      const excess = !incomeOk ? income - threshold : assets - assetLimit;
      const reasons: string[] = [];
      if (!incomeOk) reasons.push(`월 소득이 기준(${threshold.toLocaleString('ko-KR')}원)보다 ${(income - threshold).toLocaleString('ko-KR')}원 초과`);
      if (!assetsOk) reasons.push(`재산이 기준(5억)보다 ${(assets - assetLimit).toLocaleString('ko-KR')}원 초과`);
      setResult({
        eligible: false,
        threshold,
        excessAmount: excess,
        reason: `${reasons.join(', ')}하여 지원 대상이 아닙니다.`,
      });
    }
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">가구원 수</label>
            <select
              value={householdSize}
              onChange={e => setHouseholdSize(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}{n === 6 ? '인 이상' : '인'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">월 소득 (원)</label>
            <input
              type="text"
              value={monthlyIncome}
              onChange={e => setMonthlyIncome(formatNumber(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">재산 총액 (원)</label>
            <input
              type="text"
              value={totalAssets}
              onChange={e => setTotalAssets(formatNumber(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">지원 유형</label>
            <select
              value={supportType}
              onChange={e => setSupportType(e.target.value as SupportType)}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            >
              <option value="litigation">소송대리 (무료법률구조)</option>
              <option value="consultation">법률상담</option>
              <option value="criminal">형사변호</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: category.color }}
        >
          확인하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">판정 결과</h3>
          <div className={`p-4 rounded-lg mb-4 ${result.eligible ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
            <p className={`text-lg font-bold ${result.eligible ? 'text-green-400' : 'text-red-400'}`}>
              {result.eligible ? '지원 가능' : '지원 불가'}
            </p>
          </div>
          <p className="text-sm text-gray-300 mb-3">{result.reason}</p>

          {result.eligible && (
            <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
              <p className="text-sm text-blue-300">
                신청 방법: 대한법률구조공단(132) 또는 가까운 지부 방문
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">법적 근거: 법률구조법 제7조, 법률구조법 시행령</p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
