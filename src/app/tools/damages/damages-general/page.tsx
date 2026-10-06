'use client';

import { useState, type ChangeEvent } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import {
  calculateGeneralDamages,
  type GeneralDamagesResult,
} from '@/lib/calc/damages-general';

const tool = TOOLS.find((item) => item.id === 'damages-general')!;
const category = CATEGORIES.find((item) => item.id === 'damages')!;

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function DamagesGeneralPage() {
  const [documentedDamage, setDocumentedDamage] = useState('');
  const [faultRatio, setFaultRatio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<GeneralDamagesResult | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const damage = parseMoney(documentedDamage);
    const fault = Number(faultRatio || 0);

    if (!documentedDamage.trim() || damage <= 0) {
      setError('자료로 확인된 재산상 손해액을 입력해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isFinite(fault) || fault < 0 || fault > 100) {
      setError('입력 과실비율은 0~100 사이 숫자여야 합니다.');
      setResult(null);
      return;
    }
    if (damage > 10_000_000_000) {
      setWarning('입력 손해액이 100억원을 초과합니다. 원본 자료와 입력값을 확인해주세요.');
    }

    setResult(
      calculateGeneralDamages({
        documentedDamage: damage,
        faultRatio: fault,
      }),
    );
  };

  const handleMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDocumentedDamage(event.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">확인된 손해 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          영수증·수리비 명세서·소득자료 등으로 확인된 재산상 손해액에 입력한 과실비율만 적용합니다.
          위자료·개호비·장해 등 사건별 판단이 필요한 항목은 산출하지 않습니다.
        </p>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="damages-general-documented-damage">
            확인된 재산상 손해액 (치료비·수리비·일실이익 등, 원) *
          </label>
          <input
            id="damages-general-documented-damage"
            type="text"
            inputMode="numeric"
            value={documentedDamage ? formatNumber(parseMoney(documentedDamage)) : ''}
            onChange={handleMoneyChange}
            placeholder="예: 10,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#f97316] focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">
            동일한 비용을 여러 항목에 중복 입력하지 말고, 이미 지급받은 금액은 별도로 대조하세요.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2" htmlFor="damages-general-fault-ratio">
            입력 과실비율 (%)
          </label>
          <input
            id="damages-general-fault-ratio"
            type="text"
            inputMode="decimal"
            value={faultRatio}
            onChange={(event) => setFaultRatio(event.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="0 ~ 100 (없으면 0)"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#f97316] focus:outline-none glassmorphism glass-panel"
          />
          <p className="text-xs text-gray-500 mt-1">
            이 값은 사용자가 입력하는 가정값입니다. 법원이나 기관이 사고자료로 정하는 과실비율을 대신하지 않습니다.
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
          재산상 손해 참고액 계산하기
        </button>
      </div>

      {result !== null && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">재산상 손해 참고 결과</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-600">확인된 재산상 손해액</span>
              <span className="text-slate-900">{formatNumber(result.documentedDamage)}원</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-600">입력 과실비율 반영 차감액</span>
              <span className="text-slate-900">{formatNumber(result.faultReduction)}원</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-1">과실상계 후 재산상 손해 참고액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.adjustedDamage)}원
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 whitespace-pre-wrap glassmorphism glass-panel">
{`확인된 재산상 손해액 × (1 - 입력 과실비율) = 과실상계 후 참고액
${formatNumber(result.documentedDamage)} × (1 - ${faultRatio || 0}%) = ${formatNumber(result.adjustedDamage)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              이 결과는 입력한 자료와 과실비율 가정으로 계산한 참고액입니다. 법원·조정기관의 손해 인정 범위,
              과실비율, 위자료·개호비·장해 판단은 포함하지 않습니다.
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산에 포함하지 않는 항목</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li>민법 제751조의 재산 이외 손해인 위자료는 사건별 사정을 정액표로 환산하지 않습니다.</li>
          <li>개호비·장해·향후 손해의 인정 여부와 범위는 의료자료·소득자료·감정 등 별도 검토가 필요합니다.</li>
          <li>제조물 결함, 인과관계, 책임 주체와 실제 배상액은 이 계산기가 판단하지 않습니다.</li>
          <li>입력 과실비율은 사고자료에 따른 법원·조정기관의 판단과 다를 수 있습니다.</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-gray-500 space-y-2">
          <p>
            공식 원문:{' '}
            <a
              href="https://www.law.go.kr/법령/민법/제750조"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 hover:underline"
            >
              민법 제750조(불법행위의 내용)
            </a>{' '}
            ·{' '}
            <a
              href="https://www.law.go.kr/법령/민법/제763조"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 hover:underline"
            >
              제763조(준용규정)
            </a>
          </p>
          <p>
            과실상계 원문:{' '}
            <a
              href="https://www.law.go.kr/법령/민법/제396조"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 hover:underline"
            >
              민법 제396조(과실상계)
            </a>{' '}
            · 손해 범위:{' '}
            <a
              href="https://www.law.go.kr/법령/민법/제393조"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 hover:underline"
            >
              제393조(손해배상의 범위)
            </a>
          </p>
        </div>
      </section>
    </CalculatorLayout>
  );
}
