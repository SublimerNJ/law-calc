'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'statute-of-limitations')!;
const category = CATEGORIES.find(c => c.id === 'misc')!;

interface ClaimType {
  label: string;
  years: number;
  description: string;
  note?: string;
}

// 소멸시효 기간 유형 — 민법·상법·특별법 원문 기준
const CLAIM_TYPES: ClaimType[] = [
  {
    label: '일반채권',
    years: 10,
    description: '민법 제162조 제1항',
    note: '채권은 10년간 행사하지 않으면 소멸시효 완성',
  },
  {
    label: '상사채권 (상행위로 인한 채권)',
    years: 5,
    description: '상법 제64조',
    note: '상행위로 인한 채권은 5년간 행사하지 않으면 소멸시효 완성',
  },
  {
    label: '불법행위 손해배상 — 피해자 인지일 기산 (민법 제766조 제1항)',
    years: 3,
    description: '민법 제766조 제1항',
    note: '피해자 또는 법정대리인이 손해 및 가해자를 안 날로부터 3년. 단, 불법행위일로부터 10년(제2항, 제척기간)도 적용 — 먼저 도래하는 기간 기준',
  },
  {
    label: '임금채권',
    years: 3,
    description: '근로기준법 제49조',
    note: '임금채권은 3년간 행사하지 않으면 소멸시효 완성',
  },
  {
    label: '3년 단기소멸시효 (이자·의료비·수업료 등)',
    years: 3,
    description: '민법 제163조',
    note: '이자, 부양료, 급료, 사용료, 도급보수, 의사·조산사·간호사의 치료비·조산료, 약사의 약값, 수업료, 교사의 교육비 등 (각 호 참조)',
  },
  {
    label: '1년 단기소멸시효 (숙박료·음식료·입장료 등)',
    years: 1,
    description: '민법 제164조',
    note: '여관·음식점·대석·오락장의 숙박료·음식료·대석료·입장료, 소매상의 외상대금, 노역인·연예인의 임금 등 (각 호 참조)',
  },
  {
    label: '어음채권 (환어음·약속어음 소지인)',
    years: 3,
    description: '어음법 제70조 제1항',
    note: '소지인의 인수인·발행인에 대한 청구권은 만기로부터 3년',
  },
  {
    label: '수표채권 (소지인)',
    years: 1,
    description: '수표법 제51조 제1항',
    note: '소지인의 발행인 등에 대한 소구권은 제시기간 경과 후 1년',
  },
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
  note?: string;
}

export default function StatuteOfLimitationsPage() {
  const [claimTypeIdx, setClaimTypeIdx] = useState<number>(0);
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const calculate = () => {
    setError(null);
    setWarning(null);
    // INPUT-02: 기산일 필수
    if (!startDate) {
      setError('기산일을 선택해주세요.');
      setResult(null);
      return;
    }
    const claim = CLAIM_TYPES[claimTypeIdx];
    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // EDGE-02: 미래 기산일 경고 (차단하지는 않음 — 계약 만료일 등 미래 기산도 유효)
    if (start > today) {
      setWarning('기산일이 오늘 이후입니다. 미래 기산일인 경우 그대로 계산합니다.');
    }
    const expiry = new Date(start);
    expiry.setFullYear(expiry.getFullYear() + claim.years);
    const expired = expiry <= today;

    setResult({
      period: `${claim.years}년`,
      expiryDate: expiry,
      remaining: diffDescription(today, expiry),
      expired,
      legalBasis: claim.description,
      note: claim.note,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">청구권 유형</label>
            <select
              value={claimTypeIdx}
              onChange={e => setClaimTypeIdx(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            >
              {CLAIM_TYPES.map((ct, i) => (
                <option key={i} value={i}>{ct.label} ({ct.years}년)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">기산일 (권리 행사 가능일 또는 피해 인지일 — 민법 제166조) *</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3 mb-0">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mt-3 mb-0">{warning}</p>}
        <button
          onClick={calculate}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-slate-900"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">소멸시효 기간</span>
              <span className="text-slate-900 font-semibold">{result.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">만료일</span>
              <span className="text-slate-900 font-semibold">{formatDate(result.expiryDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">남은 기간</span>
              <span className={`font-semibold ${result.expired ? 'text-red-600' : 'text-green-600'}`}>
                {result.remaining}
              </span>
            </div>
          </div>

          {result.note && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-600 mb-1">유의사항</p>
              <p className="text-xs text-slate-500">{result.note}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">기산일 + 시효기간 = 만료일</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">법적 근거: {result.legalBasis}, 민법 제166조(기산점)</p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">시효 중단 사유 (민법 제168조)</h2>
        <ol className="space-y-3">
          {[
            { color: '#3b82f6', text: '청구 — 재판상 청구, 파산절차 참가, 지급명령 신청, 화해를 위한 소환 등 (민법 제168조 제1호, 제170조~제173조)' },
            { color: '#f59e0b', text: '최고(내용증명) — 6개월 내 재판상 청구 등을 하지 않으면 중단 효력 없음 (민법 제174조)' },
            { color: '#10b981', text: '압류·가압류·가처분 (민법 제168조 제2호)' },
            { color: '#8b5cf6', text: '채무자의 승인 — 일부 변제, 이자 지급, 담보 제공 포함 (민법 제168조 제3호)' },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: item.color }}
              >
                {i + 1}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            중단 후: 시효는 새로이 진행하기 시작합니다 (민법 제178조, 제179조). 시효완성 전에는 시효이익을 포기할 수 없으나, 완성 후에는 포기 가능합니다 (민법 제184조).
          </p>
        </div>
      </div>

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="statute-of-limitations" />
        </div>
      )}
    </CalculatorLayout>
  );
}
