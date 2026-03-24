'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'public-defender')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

type CaseType = 'mandatory' | 'investigative' | 'discretionary' | 'other';

// 형사소송법 제33조 제1항 필요적 국선변호 사유 (6가지)
const MANDATORY_GROUNDS = [
  { label: '구속된 피고인', desc: '제1호: 구속된 피고인이 변호인이 없는 때' },
  { label: '미성년자', desc: '제2호: 미성년자인 피고인이 변호인이 없는 때' },
  { label: '70세 이상', desc: '제3호: 70세 이상인 피고인이 변호인이 없는 때' },
  { label: '농아자', desc: '제4호: 듣거나 말하는 데 모두 장애가 있는 피고인이 변호인이 없는 때' },
  { label: '심신장애 의심', desc: '제5호: 심신장애가 있는 것으로 의심되는 피고인이 변호인이 없는 때' },
  { label: '중요 사건 (단기 3년 이상)', desc: '제6호: 사형·무기 또는 단기 3년 이상의 징역·금고에 해당하는 사건에서 변호인이 없는 때' },
];

interface Result {
  eligible: boolean;
  type: string;
  reason: string;
  grounds?: string[];
}

export default function PublicDefenderPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [totalAssets, setTotalAssets] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('mandatory');
  const [mandatoryGround, setMandatoryGround] = useState<number>(0);
  const [result, setResult] = useState<Result | null>(null);

  const formatNumber = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    return num ? Number(num).toLocaleString('ko-KR') : '';
  };

  const parseNumber = (val: string) => Number(val.replace(/[^0-9]/g, '')) || 0;

  const calculate = () => {
    // 형사소송법 제33조 제1항: 필요적 국선변호
    if (caseType === 'mandatory') {
      const ground = MANDATORY_GROUNDS[mandatoryGround];
      setResult({
        eligible: true,
        type: '필요적 국선변호인 (형사소송법 제33조 제1항)',
        reason: `${ground.desc} — 법원은 직권으로 국선변호인을 선정하여야 합니다. 소득·재산 요건 없이 당연히 선정됩니다.`,
      });
      return;
    }

    // 형사소송법 제33조 제2항: 빈곤 등 사유 청구 시 필요적 선정
    if (caseType === 'investigative') {
      setResult({
        eligible: true,
        type: '청구에 의한 국선변호인 (형사소송법 제33조 제2항)',
        reason: '피고인이 빈곤이나 그 밖의 사유로 변호인을 선임할 수 없는 경우 피고인의 청구가 있으면 법원은 변호인을 선정하여야 합니다.',
      });
      return;
    }

    // 형사소송법 제33조 제3항: 재량적 국선변호
    if (caseType === 'discretionary') {
      const income = parseNumber(monthlyIncome);
      const assets = parseNumber(totalAssets);
      const incomeOk = income <= 2_500_000;
      const assetsOk = assets <= 500_000_000;

      if (incomeOk && assetsOk) {
        setResult({
          eligible: true,
          type: '재량적 국선변호인 (형사소송법 제33조 제3항)',
          reason: `월 소득 ${income.toLocaleString('ko-KR')}원 (기준: 250만원 이하), 재산 ${assets.toLocaleString('ko-KR')}원 (기준: 5억 이하)으로 자격 요건을 충족합니다. 법원의 재량으로 선정됩니다.`,
        });
      } else {
        const reasons: string[] = [];
        if (!incomeOk) reasons.push(`월 소득 ${income.toLocaleString('ko-KR')}원이 기준(250만원)을 초과`);
        if (!assetsOk) reasons.push(`재산 ${assets.toLocaleString('ko-KR')}원이 기준(5억)을 초과`);
        setResult({
          eligible: false,
          type: '재량적 국선변호인 (형사소송법 제33조 제3항)',
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
            <label className="block text-sm text-slate-600 mb-1">국선변호 유형</label>
            <select
              value={caseType}
              onChange={e => setCaseType(e.target.value as CaseType)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              <option value="mandatory">필요적 국선 (제33조 제1항 — 당연 선정)</option>
              <option value="investigative">청구에 의한 국선 (제33조 제2항 — 빈곤 등 사유)</option>
              <option value="discretionary">재량적 국선 (제33조 제3항 — 법원 직권)</option>
              <option value="other">기타 (해당 없음)</option>
            </select>
          </div>

          {caseType === 'mandatory' && (
            <div>
              <label className="block text-sm text-slate-600 mb-1">해당 사유 (형사소송법 제33조 제1항)</label>
              <select
                value={mandatoryGround}
                onChange={e => setMandatoryGround(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                {MANDATORY_GROUNDS.map((g, i) => (
                  <option key={i} value={i}>{g.label}</option>
                ))}
              </select>
            </div>
          )}

          {caseType === 'discretionary' && (
            <>
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
            </>
          )}
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
              {result.eligible ? '선정 대상' : '선정 비대상'}
            </p>
            <p className="text-sm text-slate-600 mt-1">{result.type}</p>
          </div>
          <p className="text-sm text-slate-600">{result.reason}</p>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">법적 근거: 형사소송법 제33조 (국선변호인), 국선변호인 선정 등에 관한 예규</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-semibold text-slate-600 mb-3">국선변호인 신청 방법</p>
            <ul className="text-xs text-slate-600 space-y-2">
              <li><strong className="text-slate-600">빈곤 등 사유 (제33조 제2항):</strong> 법원 접수창구에서 국선변호인 선정 청구</li>
              <li><strong className="text-slate-600">검찰 단계:</strong> 검찰청 민원실에서 신청</li>
              <li><strong className="text-slate-600">재판 단계:</strong> 법원 접수창구에서 국선변호인 선정 신청</li>
              <li><strong className="text-slate-600">필요 서류:</strong> 신분증, 소득증빙(건강보험료 납부확인서 등), 재산증빙</li>
              <li><strong className="text-slate-600">처리 기간:</strong> 통상 3~7일 내 선정 통지</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">문의: 대한법률구조공단 (국번 없이 132)</p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">형사소송법 제33조 요약</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">제1항 — 필요적 국선 (6가지 사유, 당연 선정)</p>
            <ol className="text-xs text-slate-600 list-decimal ml-4 space-y-1">
              {MANDATORY_GROUNDS.map((g, i) => (
                <li key={i}>{g.desc.replace(/^제\d+호: /, '')}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">제2항 — 청구에 의한 국선 (빈곤 등 사유, 피고인 청구 시 필수 선정)</p>
            <p className="text-xs text-slate-600">피고인이 빈곤이나 그 밖의 사유로 변호인을 선임할 수 없는 경우 피고인의 청구가 있으면 법원이 선정하여야 함</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-1">제3항 — 재량적 국선 (법원 직권)</p>
            <p className="text-xs text-slate-600">피고인의 나이·지능 및 교육 정도 등을 참작하여 권리보호를 위하여 필요하다고 인정하면 피고인의 명시적 의사에 반하지 않는 범위에서 선정 가능</p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
