'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import {
  calculateAccidentInsuranceLimit,
  type AccidentInsuranceLimitResult,
} from '@/lib/calc/accident-settlement';

const tool = TOOLS.find((item) => item.id === 'accident-settlement')!;
const category = CATEGORIES.find((item) => item.id === 'traffic')!;

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function AccidentSettlementPage() {
  const [documentedDamage, setDocumentedDamage] = useState('');
  const [injuryGrade, setInjuryGrade] = useState('');
  const [disabilityGrade, setDisabilityGrade] = useState('0');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<AccidentInsuranceLimitResult | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const damage = parseMoney(documentedDamage);
    const injury = Number(injuryGrade);
    const disability = Number(disabilityGrade);

    if (!documentedDamage.trim() || damage <= 0) {
      setError('확인된 인적 손해액을 입력해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isInteger(injury) || injury < 1 || injury > 14) {
      setError('진단서에 적힌 상해급수를 선택해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isInteger(disability) || disability < 0 || disability > 14) {
      setError('후유장애급수를 확인해주세요. 후유장애가 없으면 없음을 선택하세요.');
      setResult(null);
      return;
    }
    if (damage > 10_000_000_000) {
      setWarning('입력 손해액이 100억원을 초과합니다. 원본 자료와 입력값을 확인해주세요.');
    }

    setResult(
      calculateAccidentInsuranceLimit({
        documentedDamage: damage,
        injuryGrade: injury,
        disabilityGrade: disability,
      }),
    );
  };

  const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentedDamage(event.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">대인배상Ⅰ 한도 참고 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          치료비·소득손실 등 자료로 확인된 인적 손해액과 진단서의 급수를 입력하면
          자동차손해배상 보장법 시행령상 책임보험금 한도 안의 참고액을 계산합니다.
          사건별 합의금이나 위자료를 추정하지 않습니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="accident-documented-damage">
            확인된 인적 손해액 (원) *
          </label>
          <input
            id="accident-documented-damage"
            type="text"
            inputMode="numeric"
            value={documentedDamage ? formatNumber(parseMoney(documentedDamage)) : ''}
            onChange={handleMoneyChange}
            placeholder="예: 5,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">
            영수증·소득자료 등으로 확인된 손해를 합산하세요. 치료일수만으로 위자료나 휴업손해를 자동 산정하지 않습니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="accident-injury-grade">
            자동차손해배상 보장법 시행령상 상해급수 *
          </label>
          <select
            id="accident-injury-grade"
            value={injuryGrade}
            onChange={(event) => setInjuryGrade(event.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
          >
            <option value="">진단서 기준 상해급수를 선택하세요</option>
            {Array.from({ length: 14 }, (_, index) => index + 1).map((grade) => (
              <option key={grade} value={grade}>
                {grade}급
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="accident-disability-grade">
            후유장애급수
          </label>
          <select
            id="accident-disability-grade"
            value={disabilityGrade}
            onChange={(event) => setDisabilityGrade(event.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ef4444] focus:outline-none glassmorphism glass-panel"
          >
            <option value="0">없음</option>
            {Array.from({ length: 14 }, (_, index) => index + 1).map((grade) => (
              <option key={grade} value={grade}>
                {grade}급
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            치료 후 증상이 고정된 후유장애가 진단서 등으로 확인된 경우에만 선택하세요.
          </p>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button
          type="button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          책임보험금 한도 계산하기
        </button>
      </div>

      {result !== null && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">대인배상Ⅰ 책임보험금 한도 참고 결과</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-600">입력한 인적 손해액</span>
              <span className="text-slate-900">{formatNumber(result.documentedDamage)}원</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-600">상해급별 책임보험금 한도</span>
              <span className="text-slate-900">{formatNumber(result.injuryLimit)}원</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-600">후유장애급별 책임보험금 한도</span>
              <span className="text-slate-900">{formatNumber(result.disabilityLimit)}원</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
              <span className="text-sm text-slate-600">책임보험금 합산 한도</span>
              <span className="text-slate-900 font-semibold">{formatNumber(result.totalLimit)}원</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-1">한도 내 참고액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.payableWithinLiabilityLimit)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-1">입력 손해액 중 책임보험 한도 초과분</p>
            <p className="text-xl font-semibold text-slate-900">{formatNumber(result.excessDamage)}원</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 whitespace-pre-wrap glassmorphism glass-panel">
{`상해급별 한도 + 후유장애급별 한도 = 책임보험금 합산 한도
min(입력 인적 손해액, 책임보험금 합산 한도) = 한도 내 참고액`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              이 결과는 대인배상Ⅰ의 법정 한도와 입력 손해액만 비교한 참고값입니다. 대인배상Ⅱ, 대물배상,
              자기신체사고, 형사합의, 과실비율 및 보험사의 실제 지급 판단은 포함하지 않습니다.
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산에 포함하지 않는 항목</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>입원·통원 일수만으로 위자료를 정액 산정하지 않습니다.</li>
          <li>일실수입·휴업손해·향후치료비는 소득, 치료 필요성, 증빙과 사건별 기준이 필요하므로 자동 추정하지 않습니다.</li>
          <li>과실비율은 사고 상황별 공식 인정기준과 증거를 대조해야 하며, 이 화면에서 임의의 비율을 정하지 않습니다.</li>
          <li>상해급수와 후유장애급수는 진단서와 의료 판단을 기준으로 확인하세요.</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-gray-500 space-y-2">
          <p>
            공식 원문:{' '}
            <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsId=004594&ancYnChk=0" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">
              자동차손해배상 보장법 시행령(현행 본문·부칙)
            </a>
          </p>
          <p>
            <a href="https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=169111681&bylClsCd=110201" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">
              시행령 별표 1 상해 한도 PDF
            </a>{' '}
            ·{' '}
            <a href="https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=169111793&bylClsCd=110201" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">
              시행령 별표 2 후유장애 한도 PDF
            </a>
          </p>
          <p>
            과실비율 참고:{' '}
            <a href="https://accident.knia.or.kr/fault-ratio" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">
              손해보험협회 자동차사고 과실비율 인정기준
            </a>
          </p>
        </div>
      </section>
    </CalculatorLayout>
  );
}
