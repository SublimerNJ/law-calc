'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'lawsuit-cost')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

type FilingMethod = 'offline' | 'ecourt';

const SERVICE_FEE_UNIT = 5_500;
const SERVICE_ROUNDS = { 1: 15, 2: 12, 3: 8 } as const;
const SMALL_CLAIMS_LIMIT = 30_000_000;
const SMALL_CLAIMS_ROUNDS = 10;
const UNREALISTIC_LIMIT = 100_000_000_000;

function calculateStampFee(amount: number): number {
  let fee: number;
  if (amount < 10_000_000) {
    fee = amount * 0.005;
  } else if (amount < 100_000_000) {
    fee = amount * 0.0045 + 5_000;
  } else if (amount < 1_000_000_000) {
    fee = amount * 0.004 + 55_000;
  } else {
    fee = amount * 0.0035 + 555_000;
  }
  if (fee < 1_000) return 1_000;
  return Math.floor(fee / 100) * 100;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

interface CalcResult {
  offlineStampFee: number;
  offlineServiceFee: number;
  offlineTotal: number;
  ecourtStampFee: number;
  ecourtDiscount: number;
  ecourtServiceFee: number;
  ecourtTotal: number;
  serviceRounds: number;
  plaintiffs: number;
  defendants: number;
  savings: number;
  levelLabel: string;
  isSmallClaims: boolean;
}

export default function LawsuitCostPage() {
  const [amount, setAmount] = useState('');
  const [plaintiffCount, setPlaintiffCount] = useState('1');
  const [defendantCount, setDefendantCount] = useState('1');
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [filingMethod, setFilingMethod] = useState<FilingMethod>('offline');
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');

  const handleCalculate = () => {
    setError('');
    setWarning('');
    const val = parseInt(amount.replace(/,/g, ''), 10);
    const plaintiffs = parseInt(plaintiffCount, 10);
    const defendants = parseInt(defendantCount, 10);

    if (!amount || isNaN(val)) {
      setError('소가를 입력해주세요.');
      setResult(null);
      return;
    }
    if (val <= 0) {
      setError('금액은 0보다 커야 합니다.');
      setResult(null);
      return;
    }
    if (!plaintiffs || plaintiffs < 1) {
      setError('원고는 최소 1명 이상이어야 합니다.');
      setResult(null);
      return;
    }
    if (!defendants || defendants < 1) {
      setError('피고는 최소 1명 이상이어야 합니다.');
      setResult(null);
      return;
    }

    if (val > UNREALISTIC_LIMIT) {
      setWarning('입력값이 비현실적으로 큽니다. 확인해주세요.');
    }

    const totalParties = plaintiffs + defendants;
    const isSmallClaims = val <= SMALL_CLAIMS_LIMIT && level === 1;

    let baseStampFee = calculateStampFee(val);
    if (level === 2) baseStampFee = Math.floor((baseStampFee * 1.5) / 100) * 100;
    else if (level === 3) baseStampFee = Math.floor((baseStampFee * 2) / 100) * 100;

    const serviceRounds = isSmallClaims ? SMALL_CLAIMS_ROUNDS : SERVICE_ROUNDS[level];

    // 오프라인: 전체 당사자 수 × 회분
    const offlineStampFee = baseStampFee;
    const offlineServiceFee = totalParties * serviceRounds * SERVICE_FEE_UNIT;
    const offlineTotal = offlineStampFee + offlineServiceFee;

    // 전자소송: 인지대 10% 할인, 송달료는 피고(상대방) 수만 계산
    let ecourtStampFee = Math.floor((baseStampFee * 0.9) / 100) * 100;
    if (ecourtStampFee < 1_000) ecourtStampFee = 1_000;
    const ecourtDiscount = offlineStampFee - ecourtStampFee;
    const ecourtServiceFee = defendants * serviceRounds * SERVICE_FEE_UNIT;
    const ecourtTotal = ecourtStampFee + ecourtServiceFee;

    const savings = offlineTotal - ecourtTotal;
    const levelLabel = level === 1 ? '1심' : level === 2 ? '항소심' : '상고심';

    setResult({
      offlineStampFee, offlineServiceFee, offlineTotal,
      ecourtStampFee, ecourtDiscount, ecourtServiceFee, ecourtTotal,
      serviceRounds, plaintiffs, defendants, savings, levelLabel, isSmallClaims,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  const displayAmount = amount ? parseInt(amount, 10).toLocaleString('ko-KR') : '';

  const currentTotal = result
    ? (filingMethod === 'ecourt' ? result.ecourtTotal : result.offlineTotal)
    : null;

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">
            소가 (원) <span className="text-red-500">(필수)</span>
          </label>
          <p className="text-xs text-gray-500 mb-1">소가 = 소송에서 청구하는 금액</p>
          <input
            type="text"
            inputMode="numeric"
            value={displayAmount}
            onChange={handleAmountChange}
            placeholder="예: 50,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">원고 수</label>
            <input
              type="number"
              min={1}
              value={plaintiffCount}
              onChange={e => setPlaintiffCount(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">피고 수</label>
            <input
              type="number"
              min={1}
              value={defendantCount}
              onChange={e => setDefendantCount(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {([
              { value: 1 as const, label: '1심' },
              { value: 2 as const, label: '항소심 (인지대 1.5배)' },
              { value: 3 as const, label: '상고심 (인지대 2배)' },
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
            <p className="text-xs text-gray-500 mt-1">전자소송: 인지대 10% 할인 + 송달료 피고 수만 산정 (ecfs.scourt.go.kr)</p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}
        {warning && (
          <div className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
            <p className="text-sm text-orange-500">{warning}</p>
          </div>
        )}

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
          {result.isSmallClaims && (
            <div className="premium-card p-4 mb-4 bg-blue-50 border border-blue-200">
              <p className="text-sm font-semibold text-blue-800">소액사건 자동 적용</p>
              <p className="text-xs text-blue-600 mt-1">소가 3,000만원 이하 → 소액사건심판법 적용, 송달료 {SMALL_CLAIMS_ROUNDS}회 기준 산정</p>
            </div>
          )}
          <div className="premium-card p-6 mb-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              {filingMethod === 'ecourt' ? '전자소송' : '오프라인'} 소송비용 ({result.levelLabel})
            </h2>

            {currentTotal === 0 && (
              <div className="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-600">해당 조건에서는 비용이 발생하지 않습니다.</p>
              </div>
            )}

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
                    <td className="py-3 text-sm text-green-600">전자소송 할인 (-10%)</td>
                    <td className="py-3 text-right text-green-600 font-medium">
                      -{formatNumber(result.ecourtDiscount)}원
                    </td>
                  </tr>
                )}
                <tr className="border-b border-slate-200">
                  <td className="py-3 text-sm text-slate-600">
                    송달료 (
                    {filingMethod === 'ecourt'
                      ? `피고 ${result.defendants}명`
                      : `${result.plaintiffs + result.defendants}명`
                    } × {result.serviceRounds}회 × {formatNumber(SERVICE_FEE_UNIT)}원)
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
                  <td className="py-2.5 text-slate-600">
                    송달료
                  </td>
                  <td className={`py-2.5 text-right ${filingMethod === 'offline' ? 'font-semibold' : 'text-slate-600'}`}>
                    {formatNumber(result.offlineServiceFee)}원
                    <span className="block text-xs text-gray-400">{result.plaintiffs + result.defendants}명 × {result.serviceRounds}회</span>
                  </td>
                  <td className={`py-2.5 text-right ${filingMethod === 'ecourt' ? 'font-semibold' : 'text-slate-600'}`}>
                    {formatNumber(result.ecourtServiceFee)}원
                    <span className="block text-xs text-gray-400">피고 {result.defendants}명 × {result.serviceRounds}회</span>
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
              <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-700">
                  전자소송 이용 시 절약: {formatNumber(result.savings)}원
                </p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-gray-500">
                인지대: 민사소송등인지법 별표 기준 | 전자소송 할인: 민사소송 등에서의 전자문서 이용 등에 관한 법률
              </p>
              <p className="text-xs text-gray-500 mt-1">
                송달료: 2026년 기준 1회 {formatNumber(SERVICE_FEE_UNIT)}원 | 심급별 회수: 1심 15회(소액 10회), 항소심 12회, 상고심 8회
              </p>
              <p className="text-xs text-gray-500 mt-1">
                전자소송 송달료: 피고(상대방) 수만 산정 | 오프라인: 전체 당사자 수 산정
              </p>
              <p className="text-xs text-gray-500 mt-1">
                본 계산기는 참고용이며, 실제 소송비용은 법원의 판단에 따릅니다
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorLayout>
  );
}
