'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'legal-aid')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

// 2026년 기준 중위소득 125% (가구원 수별, 원/월)
// 보건복지부 고시 제2025-135호(2026년 기준중위소득) 기준
// 1인: 2,564,238 × 1.25 = 3,205,298
const INCOME_THRESHOLDS_125: Record<number, number> = {
  1: 3_205_000,
  2: 5_249_000,
  3: 6_699_000,
  4: 8_118_000,
  5: 9_500_000,
  6: 10_846_000,
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
      <div className="flex rounded-lg overflow-hidden mb-4 border border-slate-200">
        <Link href="/tools/misc/public-defender" className="flex-1 py-3 text-center text-sm font-medium bg-white text-slate-500 hover:bg-slate-50 transition-colors">국선변호인</Link>
        <div className="flex-1 py-3 text-center text-sm font-semibold bg-slate-900 text-white">법률구조공단</div>
      </div>
      <div className="premium-card p-6 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">가구원 수</label>
            <select
              value={householdSize}
              onChange={e => setHouseholdSize(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}{n === 6 ? '인 이상' : '인'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">월 소득 (원, 판정 기준)</label>
            <input
              type="text"
              value={monthlyIncome}
              onChange={e => setMonthlyIncome(formatNumber(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">재산 총액 (원, 판정 기준)</label>
            <input
              type="text"
              value={totalAssets}
              onChange={e => setTotalAssets(formatNumber(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">지원 유형</label>
            <select
              value={supportType}
              onChange={e => setSupportType(e.target.value as SupportType)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="litigation">소송대리 (무료법률구조)</option>
              <option value="consultation">법률상담</option>
              <option value="criminal">형사변호</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-slate-900"
          style={{ backgroundColor: category.color }}
        >
          확인하기
        </button>
      </div>

      {result && (
        <>
        <div className="premium-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">판정 결과</h3>
          <div className={`p-4 rounded-lg mb-4 ${result.eligible ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className={`text-lg font-bold ${result.eligible ? 'text-green-700' : 'text-red-700'}`}>
              {result.eligible ? '지원 가능' : '지원 불가'}
            </p>
          </div>
          <p className="text-sm text-slate-600 mb-3">{result.reason}</p>

          {result.eligible && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700">
                신청 방법: 대한법률구조공단(132) 또는 가까운 지부 방문
              </p>
              {supportType === 'criminal' && (
                <p className="text-xs text-orange-600 mt-2">
                  ※ 형사변호 지원은 사안에 따라 별도 심사 기준이 적용됩니다. 반드시 공단에 문의하세요.
                </p>
              )}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">월소득 vs 기준중위소득 125% 비교</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">법적 근거: 법률구조법 제5조(법률구조대상자), 법률구조법 시행령 제4조(자력기준)</p>
          </div>
        </div>

        <ActionInsight calculatorId="legal-aid" />
        </>
      )}

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">법률구조 신청 방법</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '상담 신청', desc: '대한법률구조공단 방문 또는 전화 상담 (132)' },
              { step: '2', title: '필요서류', desc: '신분증, 주민등록등본, 건강보험료 납부확인서, 재산세 과세증명' },
              { step: '3', title: '심사기간', desc: '약 1~2주' },
              { step: '4', title: '승인 시', desc: '소송비용 전액 또는 일부 지원' },
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
          <p className="text-xs text-gray-500 mt-4">대한법률구조공단 (www.klac.or.kr) | 전화: 132</p>
        </div>
      )}
    </CalculatorLayout>
  );
}
