'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'fine-penalty')!;
const category = CATEGORIES.find(c => c.id === 'traffic')!;

interface Violation {
  id: string;
  name: string;
  group: string;
  fine: number | null;       // range penalty (현장)
  penalty: number | null;    // automated penalty (과태료)
  note?: string;
}

const VIOLATIONS: Violation[] = [
  // 속도위반 (도로교통법 시행령 별표 8, 별표 10)
  { id: 'speed-20', name: '속도위반 20km/h 이하 (승용차)', group: '속도위반', fine: 30_000, penalty: 40_000 },
  { id: 'speed-20-40', name: '속도위반 20~40km/h (승용차)', group: '속도위반', fine: 60_000, penalty: 70_000 },
  { id: 'speed-40-60', name: '속도위반 40~60km/h (승용차)', group: '속도위반', fine: 90_000, penalty: 100_000 },
  { id: 'speed-60', name: '속도위반 60km/h 초과 (승용차)', group: '속도위반', fine: 120_000, penalty: 130_000 },
  // 교통 위반 (도로교통법 시행령 별표 8, 별표 10)
  { id: 'signal', name: '신호위반 (승용차)', group: '교통 위반', fine: 60_000, penalty: 70_000 },
  { id: 'center-line', name: '중앙선침범', group: '교통 위반', fine: 60_000, penalty: 70_000 },
  { id: 'seatbelt-driver', name: '안전벨트 미착용 (운전자)', group: '교통 위반', fine: 30_000, penalty: null },
  { id: 'seatbelt-passenger', name: '안전벨트 미착용 (동승자)', group: '교통 위반', fine: null, penalty: 30_000 },
  { id: 'phone-driving', name: '휴대폰 사용 운전 중', group: '교통 위반', fine: 60_000, penalty: 70_000 },
  { id: 'illegal-parking', name: '불법 주정차 (일반구역)', group: '교통 위반', fine: null, penalty: 40_000 },
  { id: 'illegal-parking-fire', name: '불법 주정차 (소방/장애인)', group: '교통 위반', fine: null, penalty: 80_000 },
  { id: 'inspection-30', name: '정기검사 미이행 (30일 이내)', group: '교통 위반', fine: null, penalty: 30_000, note: '자동차관리법 시행규칙 별표 16 적용' },
  { id: 'inspection-115', name: '정기검사 미이행 (30일 초과)', group: '교통 위반', fine: null, penalty: 115_000, note: '자동차관리법 시행규칙 별표 16 적용' },
  // 음주/약물 (도로교통법 제148조의2 — 형사처벌 대상, 범칙금·과태료 없음)
  { id: 'drunk-003-008', name: '음주운전 (0.03~0.08%)', group: '음주/약물', fine: null, penalty: null, note: '형사처벌 대상 (도로교통법 제148조의2 제3항): 1년 이상 2년 이하 징역 또는 500만원 이상 1,000만원 이하 벌금' },
  { id: 'drunk-008-plus', name: '음주운전 (0.08% 이상)', group: '음주/약물', fine: null, penalty: null, note: '형사처벌 대상 (도로교통법 제148조의2 제1항): 1년 이상 5년 이하 징역 또는 500만원 이상 2,000만원 이하 벌금' },
  { id: 'no-insurance', name: '보험 미가입 운행', group: '음주/약물', fine: null, penalty: null, note: '형사처벌 대상 (자동차손해배상보장법 제46조 제2항): 1년 이하 징역 또는 1,000만원 이하 벌금 — 과태료 아님' },
  // 생활 불편
  { id: 'smoking-zone', name: '흡연 금지구역 흡연', group: '생활 불편', fine: null, penalty: 100_000 },
  { id: 'illegal-dump', name: '쓰레기 불법투기', group: '생활 불편', fine: null, penalty: 100_000 },
];

type EnforcementType = 'police' | 'camera' | 'self-report';

interface FinePenaltyResult {
  violation: Violation;
  baseFine: number | null;
  basePenalty: number | null;
  discount: number;
  surcharge: number;
  finalAmount: number;
  enforcement: EnforcementType;
  unpaidMonths: number;
}

function calculateFinePenalty(
  violationId: string,
  enforcement: EnforcementType,
  unpaidMonths: number
): FinePenaltyResult | null {
  const violation = VIOLATIONS.find(v => v.id === violationId);
  if (!violation) return null;

  const baseFine = violation.fine;
  const basePenalty = violation.penalty;

  // Determine which amount applies
  let baseAmount = 0;
  if (enforcement === 'police' && baseFine !== null) {
    baseAmount = baseFine;
  } else if (basePenalty !== null) {
    baseAmount = basePenalty;
  } else if (baseFine !== null) {
    baseAmount = baseFine;
  }

  // Self-report: 20% discount on penalty
  let discount = 0;
  if (enforcement === 'self-report' && basePenalty !== null) {
    baseAmount = basePenalty;
    discount = Math.round(baseAmount * 0.2);
  }

  // Surcharge for late payment: 3% per month
  let surcharge = 0;
  if (unpaidMonths > 0) {
    surcharge = Math.round((baseAmount - discount) * 0.03 * unpaidMonths);
  }

  const finalAmount = Math.max(0, baseAmount - discount + surcharge);

  return {
    violation,
    baseFine,
    basePenalty,
    discount,
    surcharge,
    finalAmount,
    enforcement,
    unpaidMonths,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function FinePenaltyPage() {
  const [violationId, setViolationId] = useState(VIOLATIONS[0].id);
  const [enforcement, setEnforcement] = useState<EnforcementType>('police');
  const [unpaidMonths, setUnpaidMonths] = useState('0');
  const [result, setResult] = useState<FinePenaltyResult | null>(null);

  const handleCalculate = () => {
    const months = parseInt(unpaidMonths, 10) || 0;
    setResult(calculateFinePenalty(violationId, enforcement, months));
  };

  // Group violations for select
  const groups = Array.from(new Set(VIOLATIONS.map(v => v.group)));

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">위반 항목</label>
          <select
            value={violationId}
            onChange={e => setViolationId(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          >
            {groups.map(group => (
              <optgroup key={group} label={group}>
                {VIOLATIONS.filter(v => v.group === group).map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">단속 방법</label>
          <div className="flex gap-4 flex-wrap">
            {([
              { value: 'police' as const, label: '경찰 현장단속' },
              { value: 'camera' as const, label: '무인카메라' },
              { value: 'self-report' as const, label: '자진신고' },
            ]).map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="enforcement"
                  checked={enforcement === opt.value}
                  onChange={() => setEnforcement(opt.value)}
                  className="accent-[#ef4444]"
                />
                <span className="text-sm text-slate-600">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">미납 기간 (개월, 0이면 기한 내)</label>
          <input
            type="text"
            inputMode="numeric"
            value={unpaidMonths}
            onChange={e => setUnpaidMonths(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="0"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none"
          />
        </div>

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

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">위반 항목</p>
              <p className="text-lg font-bold text-slate-900">{result.violation.name}</p>
            </div>

            {result.violation.note && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{result.violation.note}</p>
              </div>
            )}

            {result.finalAmount === 0 && result.violation.note && (
              <div className="mb-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-600">이 위반 항목은 범칙금/과태료가 없는 형사처벌 대상입니다. 납부 금액이 없습니다.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">범칙금 (현장단속)</p>
                <p className="text-lg text-slate-900">
                  {result.baseFine !== null ? `${formatNumber(result.baseFine)}원` : '해당 없음'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">과태료 (무인/자진)</p>
                <p className="text-lg text-slate-900">
                  {result.basePenalty !== null ? `${formatNumber(result.basePenalty)}원` : '해당 없음'}
                </p>
              </div>
            </div>

            {result.discount > 0 && (
              <div>
                <p className="text-sm text-slate-600 mb-1">자진신고 감경 (20%)</p>
                <p className="text-lg text-green-400">-{formatNumber(result.discount)}원</p>
              </div>
            )}

            {result.surcharge > 0 && (
              <div>
                <p className="text-sm text-slate-600 mb-1">가산금 (월 3% x {result.unpaidMonths}개월)</p>
                <p className="text-lg text-red-600">+{formatNumber(result.surcharge)}원</p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200">
              <p className="text-sm text-slate-600 mb-1">최종 납부 금액</p>
              <p className="text-2xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.finalAmount)}원
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-2 font-semibold">납부 방법 안내</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>- 이파인 (efine.go.kr) 온라인 납부</li>
                <li>- 가상계좌 이체</li>
                <li>- 가까운 은행/우체국 방문 납부</li>
                <li>- 카드 납부 (이파인 또는 ARS)</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <p className="text-xs text-gray-500 font-mono">벌금/과태료 구간 적용 → 자진신고 20% 감경 → 미납 월 3% 가산</p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 도로교통법 시행령 별표 8(범칙금), 별표 10(과태료) | 질서위반행위규제법 제18조(자진납부 감경), 제24조의3(가산금) | 자동차관리법(정기검사) | 자동차손해배상보장법(보험). 실제 금액은 위반 상황에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">벌금/과태료 미납 시 불이익</h2>
        <ul className="space-y-3">
          {[
            { num: '1', text: '납부기한 후 3% 가산금 매월 부과' },
            { num: '2', text: '체납 60일 초과 시 번호판 영치' },
            { num: '3', text: '300만원 초과 체납 시 신용불량 등록' },
            { num: '4', text: '자진납부 시 20% 감경 혜택' },
          ].map(item => (
            <li key={item.num} className="flex items-start gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                style={{ backgroundColor: category.color }}
              >
                {item.num}
              </span>
              <span className="text-sm text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="fine-penalty" amount={result.finalAmount} />
        </div>
      )}
    </CalculatorLayout>
  );
}
