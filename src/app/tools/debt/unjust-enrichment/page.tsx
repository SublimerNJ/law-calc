'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'unjust-enrichment')!;
const category = CATEGORIES.find(c => c.id === 'debt')!;

function calculateUnjustEnrichment(principal: number, acquiredDate: Date, returnDate: Date) {
  const days = Math.floor((returnDate.getTime() - acquiredDate.getTime()) / (1000 * 60 * 60 * 24));
  const interest = Math.floor(principal * 0.05 * (days / 365));
  const total = principal + interest;
  return { principal, interest, total, days };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function UnjustEnrichmentPage() {
  const [principal, setPrincipal] = useState('');
  const [acquiredDate, setAcquiredDate] = useState('');
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
  const [beneficiaryType, setBeneficiaryType] = useState<'good' | 'bad'>('bad');
  const [result, setResult] = useState<ReturnType<typeof calculateUnjustEnrichment> | null>(null);
  const [error, setError] = useState('');

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setPrincipal(raw);
  };

  const handleCalculate = () => {
    setError('');
    const p = parseInt(principal, 10);
    if (!p || p <= 0 || !acquiredDate || !returnDate) return;

    const acq = new Date(acquiredDate);
    const ret = new Date(returnDate);

    if (acq > ret) {
      setError('취득일이 반환 기준일보다 늦을 수 없습니다.');
      setResult(null);
      return;
    }

    setResult(calculateUnjustEnrichment(p, acq, ret));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">부당이득 금액 (원)</label>
          <p className="text-xs text-gray-500 mb-1">상대방이 부당하게 취득한 금액 (예: 초과 지급액, 착오 송금액)</p>
          <input
            type="text"
            inputMode="numeric"
            value={principal ? parseInt(principal).toLocaleString('ko-KR') : ''}
            onChange={handlePrincipalChange}
            placeholder="예: 10,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
          />
          {principal && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(principal).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">부당이득 취득일</label>
          <input
            type="date"
            value={acquiredDate}
            onChange={e => setAcquiredDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">반환 기준일</label>
          <input
            type="date"
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#06b6d4] focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">수익자 유형</label>
          <div className="flex gap-4">
            {[
              { value: 'good' as const, label: '선의(善意) 수익자' },
              { value: 'bad' as const, label: '악의(惡意) 수익자' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="beneficiaryType"
                  checked={beneficiaryType === opt.value}
                  onChange={() => setBeneficiaryType(opt.value)}
                  className="accent-[#06b6d4]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>

        {error && (
          <p className="mt-3 text-sm text-red-400 font-semibold">{error}</p>
        )}
      </div>

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">부당이득 원금</p>
            <p className="text-lg text-white">{formatNumber(result.principal)}원</p>
          </div>

          {beneficiaryType === 'bad' && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">법정이자 (연 5%)</p>
              <p className="text-lg text-white">{formatNumber(result.interest)}원</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">반환 합계</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(beneficiaryType === 'bad' ? result.total : result.principal)}원
            </p>
            {beneficiaryType === 'good' && (
              <p className="text-xs text-gray-500 mt-1">선의 수익자는 현존이익 한도 내 반환 (이자 미포함)</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">기간</p>
            <p className="text-lg text-white">{formatNumber(result.days)}일</p>
          </div>

          <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: beneficiaryType === 'good' ? '#06b6d41a' : '#ef44441a' }}>
            {beneficiaryType === 'good' ? (
              <p className="text-sm text-cyan-400">
                선의 수익자는 현존이익 한도 내에서 반환하며, 이자 반환의무가 없을 수 있습니다.
              </p>
            ) : (
              <p className="text-sm text-red-400 font-semibold">
                악의 수익자는 받은 이익 전부 + 이자 + 손해를 반환해야 합니다.
              </p>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">원금 × 5% × 일수/365 = 이자</p>
            <p className="text-xs text-gray-500 font-mono mt-1">원금 + 이자 = 합계</p>
          </div>
          <div className="mt-3 pt-3 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제741조(부당이득의 내용), 제748조(수익자의 반환범위)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
