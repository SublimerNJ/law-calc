'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'lawsuit-cost')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

type FilingMethod = 'offline' | 'ecourt';

const SERVICE_FEE_UNIT = 4_500;
const SERVICE_ROUNDS = { 1: 10, 2: 8, 3: 5 } as const;

function calculateStampFee(amount: number): number {
  let fee: number;
  if (amount <= 10_000_000) {
    fee = amount * 0.005;
    if (fee < 1_000) fee = 1_000;
  } else if (amount <= 100_000_000) {
    fee = amount * 0.0045 + 5_000;
  } else if (amount <= 1_000_000_000) {
    fee = amount * 0.004 + 55_000;
  } else {
    fee = amount * 0.0035 + 555_000;
  }
  return Math.ceil(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface CalcResult {
  // 오프라인
  offlineStampFee: number;
  offlineServiceFee: number;
  offlineTotal: number;
  // 전자소송
  ecourtStampFee: number;
  ecourtDiscount: number;
  ecourtServiceFee: number;
  ecourtTotal: number;
  // 공통
  serviceRounds: number;
  parties: number;
  savings: number;
  levelLabel: string;
}

export default function LawsuitCostPage() {
  const [amount, setAmount] = useState('');
  const [partyCount, setPartyCount] = useState('2');
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [filingMethod, setFilingMethod] = useState<FilingMethod>('offline');
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    const parties = parseInt(partyCount, 10);
    if (!val || val <= 0 || !parties || parties < 2) return;

    let baseStampFee = calculateStampFee(val);
    // 항소심/상고심: 인지대 1.5배
    if (level >= 2) baseStampFee = Math.ceil((baseStampFee * 1.5) / 100) * 100;

    const serviceRounds = SERVICE_ROUNDS[level];

    // 오프라인
    const offlineStampFee = baseStampFee;
    const offlineServiceFee = parties * serviceRounds * SERVICE_FEE_UNIT;
    const offlineTotal = offlineStampFee + offlineServiceFee;

    // 전자소송: 인지대 10% 할인
    let ecourtStampFee = Math.ceil((baseStampFee * 0.9) / 100) * 100;
    if (ecourtStampFee < 1_000) ecourtStampFee = 1_000;
    const ecourtDiscount = offlineStampFee - ecourtStampFee;
    const ecourtServiceFee = offlineServiceFee; // 송달료는 동일 (전자송달 별도)
    const ecourtTotal = ecourtStampFee + ecourtServiceFee;

    const savings = offlineTotal - ecourtTotal;
    const levelLabel = level === 1 ? '1심' : level === 2 ? '항소심' : '상고심';

    setResult({
      offlineStampFee, offlineServiceFee, offlineTotal,
      ecourtStampFee, ecourtDiscount, ecourtServiceFee, ecourtTotal,
      serviceRounds, parties, savings, levelLabel,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">소가 (원)</label>
          <p className="text-xs text-gray-500 mb-1">소가 = 소송에서 청구하는 금액</p>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleAmountChange}
            placeholder="예: 50,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">당사자 수 (원고 + 피고)</label>
          <input
            type="number"
            min={2}
            value={partyCount}
            onChange={e => setPartyCount(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {([
              { value: 1 as const, label: '1심' },
              { value: 2 as const, label: '항소심 (인지대 1.5배)' },
              { value: 3 as const, label: '상고심 (인지대 1.5배)' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  checked={level === opt.value}
                  onChange={() => setLevel(opt.value)}
                  className="accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">접수 방법</label>
          <div className="flex gap-4">
            {([
              { value: 'offline' as FilingMethod, label: '오프라인 (법원 창구)' },
              { value: 'ecourt' as FilingMethod, label: '전자소송 (인터넷)' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="filingMethod"
                  checked={filingMethod === opt.value}
                  onChange={() => setFilingMethod(opt.value)}
                  className="accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
          {filingMethod === 'ecourt' && (
            <p className="text-xs text-gray-500 mt-1">전자소송 이용 시 인지대 10% 할인 (ecfs.scourt.go.kr)</p>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <>
          {/* 선택한 방법의 결과 */}
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              {filingMethod === 'ecourt' ? '전자소송' : '오프라인'} 소송비용 ({result.levelLabel})
            </h2>

            <table className="w-full mb-4">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-sm text-slate-600">인지대</td>
                  <td className="py-3 text-right text-slate-900 font-medium">
                    {formatNumber(filingMethod === 'ecourt' ? result.ecourtStampFee : result.offlineStampFee)}원
                  </td>
                </tr>
                {filingMethod === 'ecourt' && result.ecourtDiscount > 0 && (
                  <tr className="border-b border-slate-200">
                    <td className="py-3 text-sm text-green-400">전자소송 할인 (-10%)</td>
                    <td className="py-3 text-right text-green-400 font-medium">
                      -{formatNumber(result.ecourtDiscount)}원
                    </td>
                  </tr>
                )}
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-sm text-slate-600">
                    송달료 ({result.parties}명 × {result.serviceRounds}회 × {formatNumber(SERVICE_FEE_UNIT)}원)
                  </td>
                  <td className="py-3 text-right text-slate-900 font-medium">
                    {formatNumber(filingMethod === 'ecourt' ? result.ecourtServiceFee : result.offlineServiceFee)}원
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-sm font-semibold text-slate-900">합계</td>
                  <td className="py-3 text-right text-2xl font-bold" style={{ color: category.color }}>
                    {formatNumber(filingMethod === 'ecourt' ? result.ecourtTotal : result.offlineTotal)}원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 비교표 */}
          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">오프라인 vs 전자소송 비교</h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs text-gray-500 py-2">항목</th>
                  <th className="text-right text-xs text-gray-500 py-2">오프라인</th>
                  <th className="text-right text-xs text-gray-500 py-2">전자소송</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200/50">
                  <td className="py-2.5 text-slate-600">인지대</td>
                  <td className={`py-2.5 text-right ${filingMethod === 'offline' ? 'font-semibold' : 'text-slate-600'}`}>
                    {formatNumber(result.offlineStampFee)}원
                  </td>
                  <td className={`py-2.5 text-right ${filingMethod === 'ecourt' ? 'font-semibold' : 'text-slate-600'}`}>
                    {formatNumber(result.ecourtStampFee)}원
                  </td>
                </tr>
                <tr className="border-b border-slate-200/50">
                  <td className="py-2.5 text-slate-600">송달료</td>
                  <td className={`py-2.5 text-right ${filingMethod === 'offline' ? 'font-semibold' : 'text-slate-600'}`}>
                    {formatNumber(result.offlineServiceFee)}원
                  </td>
                  <td className={`py-2.5 text-right ${filingMethod === 'ecourt' ? 'font-semibold' : 'text-slate-600'}`}>
                    {formatNumber(result.ecourtServiceFee)}원
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 font-semibold text-slate-900">합계</td>
                  <td className="py-2.5 text-right font-semibold" style={{ color: filingMethod === 'offline' ? category.color : '#9ca3af' }}>
                    {formatNumber(result.offlineTotal)}원
                  </td>
                  <td className="py-2.5 text-right font-semibold" style={{ color: filingMethod === 'ecourt' ? category.color : '#9ca3af' }}>
                    {formatNumber(result.ecourtTotal)}원
                  </td>
                </tr>
              </tbody>
            </table>

            {result.savings > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-green-400">
                  전자소송 이용 시 절약: {formatNumber(result.savings)}원
                </p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-gray-500">
                인지대: 민사소송등인지법 별표 기준 | 전자소송 할인: 민사소송 등에서의 전자문서 이용 등에 관한 법률
              </p>
              <p className="text-xs text-gray-500 mt-1">
                송달료: 2026년 기준 1회 {formatNumber(SERVICE_FEE_UNIT)}원 | 심급별 회수: 1심 10회, 항소심 8회, 상고심 5회
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}
