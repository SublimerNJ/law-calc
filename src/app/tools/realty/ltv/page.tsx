'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'ltv')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

// 은행업감독규정 제26조 및 금융위원회 「주택담보대출 LTV 규제 완화」(2022.8 시행) 기준
// 투기지역: 40%(유주택), 투기과열지구: 50%(유주택 40%), 조정대상지역: 70%, 비규제: 70%
const REGIONS = [
  { value: 'speculative', label: '투기지역 (유주택자)', limit: 40 },
  { value: 'speculative_none', label: '투기지역 (무주택자)', limit: 50 },
  { value: 'overheated', label: '투기과열지구 (유주택자)', limit: 50 },
  { value: 'overheated_none', label: '투기과열지구 (무주택자)', limit: 60 },
  { value: 'overheated_first', label: '투기과열지구 (생애최초)', limit: 80 },
  { value: 'regulated', label: '조정대상지역', limit: 70 },
  { value: 'regulated_first', label: '조정대상지역 (생애최초)', limit: 80 },
  { value: 'general', label: '비규제지역', limit: 70 },
];

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function LtvPage() {
  const [housePrice, setHousePrice] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [region, setRegion] = useState('regulated');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<{
    ltv: number;
    regulationLimit: number;
    maxLoan: number;
    isOver: boolean;
  } | null>(null);

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const price = parseInt(housePrice, 10);
    const loan = parseInt(loanAmount, 10);

    if (!housePrice || !price || price <= 0) {
      setError('주택 가격을 입력해주세요.');
      setResult(null);
      return;
    }
    if (!loanAmount || !loan || loan <= 0) {
      setError('대출 희망 금액을 입력해주세요.');
      setResult(null);
      return;
    }

    if (price > 5_000_000_000) {
      setWarning('주택 가격이 50억원을 초과합니다. 입력값을 확인해주세요.');
    } else if (loan > price) {
      setWarning('대출 희망 금액이 주택 가격을 초과합니다. LTV가 100%를 넘을 수 있습니다.');
    }

    const selectedRegion = REGIONS.find(r => r.value === region)!;
    const ltv = (loan / price) * 100;
    const maxLoan = Math.floor(price * selectedRegion.limit / 100);

    setResult({
      ltv: Math.round(ltv * 10) / 10,
      regulationLimit: selectedRegion.limit,
      maxLoan,
      isOver: ltv > selectedRegion.limit,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">주택 가격 (원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={housePrice ? parseInt(housePrice).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setHousePrice)}
            placeholder="예: 500,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
          {housePrice && (
            <p className="text-xs text-gray-500 mt-1">
              {formatNumber(parseInt(housePrice))}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">대출 희망 금액 (원) <span className="text-red-500">*</span></label>
          <input
            type="text"
            inputMode="numeric"
            value={loanAmount ? parseInt(loanAmount).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setLoanAmount)}
            placeholder="예: 200,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          />
          {loanAmount && (
            <p className="text-xs text-gray-500 mt-1">
              {formatNumber(parseInt(loanAmount))}원
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">지역 구분</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#8b5cf6] focus:outline-none"
          >
            {REGIONS.map(r => (
              <option key={r.value} value={r.value}>{r.label} (LTV {r.limit}%)</option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}
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
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">현재 LTV</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {result.ltv.toFixed(1)}%
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">규제 기준 LTV</p>
            <p className="text-lg text-slate-900">{result.regulationLimit}%</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">규제 기준 내 최대 대출 가능액</p>
            <p className="text-lg text-slate-900">{formatNumber(result.maxLoan)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">적합 여부</p>
            {result.isOver ? (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                초과 - 규제 기준을 초과합니다
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                적합 - 규제 기준 이내입니다
              </span>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`주택가격 × LTV비율 = 최대 대출가능액

현재 LTV = 대출금액 ÷ 주택가격 × 100
최대 대출가능액 = 주택가격 × 규제 LTV(${result.regulationLimit}%) ÷ 100
              = ${formatNumber(result.maxLoan)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 은행업감독규정 제26조(담보인정비율), 금융위원회 「주택담보대출 LTV·DTI 규제 완화」 2022년 8월 시행. 생애최초 주택구입자 LTV 80% 우대(지역 무관), 서민·실수요자 우대 LTV 별도 조건 적용.
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">대출 한도 높이는 방법</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>1</span>
            <span className="text-sm text-slate-600">일반지역 주택 선택 (LTV 70%)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>2</span>
            <span className="text-sm text-slate-600">생애최초 주택구입 우대</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>3</span>
            <span className="text-sm text-slate-600">서민·실수요자 요건 충족 시 우대 LTV</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#8b5cf6' }}>4</span>
            <span className="text-sm text-slate-600">은행별 LTV 차이 비교</span>
          </li>
        </ol>
      </div>
    </CalculatorLayout>
  );
}
