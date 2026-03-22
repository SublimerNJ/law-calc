'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'statute-of-limitations')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

interface ClaimType {
  label: string;
  years: number;
  description: string;
}

const CLAIM_TYPES: ClaimType[] = [
  { label: '일반채권', years: 10, description: '민법 제162조 제1항' },
  { label: '상사채권', years: 5, description: '상법 제64조' },
  { label: '불법행위 손해배상', years: 3, description: '민법 제766조 (피해자 인지일 기산)' },
  { label: '임금채권', years: 3, description: '근로기준법 제49조' },
  { label: '단기채권 (음식·숙박·의료·교육)', years: 1, description: '민법 제163조~제164조' },
  { label: '어음채권', years: 3, description: '어음법 제70조' },
  { label: '수표채권', years: 1, description: '수표법 제51조' },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function diffDescription(from: Date, to: Date): string {
  if (to <= from) return '이미 소멸';

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}년`);
  if (months > 0) parts.push(`${months}개월`);
  if (days > 0) parts.push(`${days}일`);
  return parts.length > 0 ? parts.join(' ') : '오늘 만료';
}

interface Result {
  period: string;
  expiryDate: Date;
  remaining: string;
  expired: boolean;
  legalBasis: string;
}

export default function StatuteOfLimitationsPage() {
  const [claimTypeIdx, setClaimTypeIdx] = useState<number>(0);
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const calculate = () => {
    if (!startDate) return;
    const claim = CLAIM_TYPES[claimTypeIdx];
    const start = new Date(startDate);
    const expiry = new Date(start);
    expiry.setFullYear(expiry.getFullYear() + claim.years);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expired = expiry <= today;

    setResult({
      period: `${claim.years}년`,
      expiryDate: expiry,
      remaining: diffDescription(today, expiry),
      expired,
      legalBasis: claim.description,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">청구권 유형</label>
            <select
              value={claimTypeIdx}
              onChange={e => setClaimTypeIdx(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            >
              {CLAIM_TYPES.map((ct, i) => (
                <option key={i} value={i}>{ct.label} ({ct.years}년)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">기산일 (권리 발생일 또는 피해 인지일)</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a] text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">계산 결과</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">소멸시효 기간</span>
              <span className="text-white font-semibold">{result.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">만료일</span>
              <span className="text-white font-semibold">{formatDate(result.expiryDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">남은 기간</span>
              <span className={`font-semibold ${result.expired ? 'text-red-400' : 'text-green-400'}`}>
                {result.remaining}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">법적 근거: {result.legalBasis}, 민법 제162조~제164조, 상법 제64조</p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
