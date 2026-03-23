'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'public-defender')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

type CaseType = 'mandatory' | 'discretionary' | 'other';

interface Result {
  eligible: boolean;
  type: string;
  reason: string;
}

export default function PublicDefenderPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [totalAssets, setTotalAssets] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('mandatory');
  const [result, setResult] = useState<Result | null>(null);

  const formatNumber = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    return num ? Number(num).toLocaleString('ko-KR') : '';
  };

  const parseNumber = (val: string) => Number(val.replace(/[^0-9]/g, '')) || 0;

  const calculate = () => {
    const income = parseNumber(monthlyIncome);
    const assets = parseNumber(totalAssets);

    if (caseType === 'mandatory') {
      setResult({
        eligible: true,
        type: '필수적 국선변호인',
        reason: '사형·무기 또는 단기 3년 이상의 징역·금고에 해당하는 사건으로, 소득·재산과 관계없이 국선변호인이 선정됩니다.',
      });
      return;
    }

    if (caseType === 'discretionary') {
      const incomeOk = income <= 2_500_000;
      const assetsOk = assets <= 500_000_000;

      if (incomeOk && assetsOk) {
        setResult({
          eligible: true,
          type: '재량적 국선변호인',
          reason: `월 소득 ${income.toLocaleString('ko-KR')}원 (기준: 250만원 이하), 재산 ${assets.toLocaleString('ko-KR')}원 (기준: 5억 이하)으로 자격 요건을 충족합니다.`,
        });
      } else {
        const reasons: string[] = [];
        if (!incomeOk) reasons.push(`월 소득 ${income.toLocaleString('ko-KR')}원이 기준(250만원)을 초과`);
        if (!assetsOk) reasons.push(`재산 ${assets.toLocaleString('ko-KR')}원이 기준(5억)을 초과`);
        setResult({
          eligible: false,
          type: '재량적 국선변호인',
          reason: `${reasons.join(', ')}하여 자격 요건을 충족하지 못합니다. 사선 변호인을 선임하시기 바랍니다.`,
        });
      }
      return;
    }

    setResult({
      eligible: false,
      type: '기타 사건',
      reason: '해당 사건 유형은 국선변호인 선정 대상이 아닙니다. 사선 변호인을 선임하시기 바랍니다.',
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">사건 유형</label>
            <select
              value={caseType}
              onChange={e => setCaseType(e.target.value as CaseType)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="mandatory">형사사건 (필수적 국선)</option>
              <option value="discretionary">형사사건 (재량적 국선)</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">월 평균 소득 (원)</label>
            <input
              type="text"
              value={monthlyIncome}
              onChange={e => setMonthlyIncome(formatNumber(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">재산 총액 (원)</label>
            <input
              type="text"
              value={totalAssets}
              onChange={e => setTotalAssets(formatNumber(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
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
        <div className="premium-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">판정 결과</h3>
          <div className={`p-4 rounded-lg mb-4 ${result.eligible ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
            <p className={`text-lg font-bold ${result.eligible ? 'text-green-400' : 'text-red-400'}`}>
              {result.eligible ? '자격 있음' : '자격 없음'}
            </p>
            <p className="text-sm text-slate-600 mt-1">{result.type}</p>
          </div>
          <p className="text-sm text-slate-600">{result.reason}</p>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">법적 근거: 형사소송법 제33조, 국선변호인 선정 등에 관한 예규</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-3">국선변호사 신청 방법</p>
            <ul className="text-xs text-slate-600 space-y-2">
              <li><strong className="text-slate-600">경찰 수사 단계:</strong> 경찰서에서 국선변호인 선정 신청서 작성</li>
              <li><strong className="text-slate-600">검찰 단계:</strong> 검찰청 민원실에서 신청</li>
              <li><strong className="text-slate-600">재판 단계:</strong> 법원 접수창구에서 국선변호인 선정 신청</li>
              <li><strong className="text-slate-600">필요 서류:</strong> 신분증, 소득증빙(건강보험료 납부확인서 등), 재산증빙</li>
              <li><strong className="text-slate-600">처리 기간:</strong> 통상 3~7일 내 선정 통지</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">문의: 대한법률구조공단 (국번 없이 132)</p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
