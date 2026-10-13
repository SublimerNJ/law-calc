'use client';

import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import {
  calculateGeneralDamages,
  calculateGeneralDamagesVerificationExample,
  type GeneralDamagesInput,
  type GeneralDamagesResult,
} from '@/lib/calc/damages-general';

const tool = TOOLS.find((item) => item.id === 'damages-general')!;
const category = CATEGORIES.find((item) => item.id === 'damages')!;

type DamageAmountKey = Exclude<keyof GeneralDamagesInput, 'faultRatio'>;

type DamageField = {
  key: DamageAmountKey;
  id: string;
  label: string;
  description: string;
  placeholder: string;
};

const damageFields: DamageField[] = [
  {
    key: 'treatmentCost',
    id: 'damages-general-treatment-cost',
    label: '기지출 치료비',
    description: '진료비 계산서·영수증으로 실제 지급액을 확인한 금액만 입력하세요.',
    placeholder: '예: 1,500,000',
  },
  {
    key: 'repairCost',
    id: 'damages-general-repair-cost',
    label: '수리비·복구비',
    description: '수리 견적서·정산서와 사고 전후 상태를 대조한 금액을 입력하세요.',
    placeholder: '예: 2,000,000',
  },
  {
    key: 'lostIncome',
    id: 'damages-general-lost-income',
    label: '자료로 확인된 일실이익',
    description: '소득자료와 일을 하지 못한 기간으로 확인된 손해만 입력하세요. 추정값은 제외합니다.',
    placeholder: '예: 3,000,000',
  },
  {
    key: 'otherPropertyDamage',
    id: 'damages-general-other-property-damage',
    label: '기타 확인된 재산상 손해',
    description: '위 세 항목과 겹치지 않고 증빙으로 금액을 확인할 수 있는 항목만 입력하세요.',
    placeholder: '없으면 비워두세요',
  },
];

const emptyAmounts: Record<DamageAmountKey, string> = {
  treatmentCost: '',
  repairCost: '',
  lostIncome: '',
  otherPropertyDamage: '',
};

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return Number.parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

export default function DamagesGeneralPage() {
  const [amounts, setAmounts] = useState<Record<DamageAmountKey, string>>(emptyAmounts);
  const [faultRatio, setFaultRatio] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<GeneralDamagesResult | null>(null);

  const verificationExample = calculateGeneralDamagesVerificationExample();

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const input: GeneralDamagesInput = {
      treatmentCost: parseMoney(amounts.treatmentCost),
      repairCost: parseMoney(amounts.repairCost),
      lostIncome: parseMoney(amounts.lostIncome),
      otherPropertyDamage: parseMoney(amounts.otherPropertyDamage),
      faultRatio: Number(faultRatio.trim() === '' ? 0 : faultRatio),
    };

    const documentedDamage =
      input.treatmentCost
      + input.repairCost
      + input.lostIncome
      + input.otherPropertyDamage;

    if (documentedDamage <= 0) {
      setError('자료로 확인된 손해액을 하나 이상 입력해주세요.');
      setResult(null);
      return;
    }
    if (!Number.isFinite(input.faultRatio) || input.faultRatio < 0 || input.faultRatio > 100) {
      setError('입력 과실비율은 0~100 사이 숫자여야 합니다.');
      setResult(null);
      return;
    }
    if (documentedDamage > 10_000_000_000) {
      setWarning('입력 손해액이 100억원을 초과합니다. 원본 자료와 입력값을 확인해주세요.');
    }

    setResult(calculateGeneralDamages(input));
  };

  const handleMoneyChange = (field: DamageAmountKey) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setAmounts((current) => ({
      ...current,
      [field]: event.target.value.replace(/[^0-9]/g, ''),
    }));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <section className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">자료별 손해 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          손해액을 한 덩어리로 추정하지 않고, 자료로 확인할 수 있는 항목을 나눠 입력합니다.
          각 금액은 같은 비용이 다른 항목에 들어가지 않았는지 먼저 대조하세요.
        </p>

        <div className="space-y-4">
          {damageFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm text-slate-600 mb-2" htmlFor={field.id}>
                {field.label} (원)
              </label>
              <input
                id={field.id}
                type="text"
                inputMode="numeric"
                value={amounts[field.key] ? formatNumber(parseMoney(amounts[field.key])) : ''}
                onChange={handleMoneyChange(field.key)}
                placeholder={field.placeholder}
                aria-describedby={`${field.id}-description`}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#f97316] focus:outline-none glassmorphism glass-panel"
              />
              <p id={`${field.id}-description`} className="text-xs text-gray-500 mt-1">
                {field.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 mb-6">
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
            aria-describedby="damages-general-fault-ratio-description"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#f97316] focus:outline-none glassmorphism glass-panel"
          />
          <p id="damages-general-fault-ratio-description" className="text-xs text-gray-500 mt-1">
            이 값은 사용자가 자료를 보고 입력하는 가정값입니다. 이 계산기가 사고 경위나 증거를 보고 과실비율을 정하지 않습니다.
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
          자료별 손해 참고액 계산하기
        </button>
      </section>

      <section className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">같은 함수로 계산한 검산 예시</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          아래 숫자는 설명에 적어 둔 결과를 복사한 값이 아니라, 입력 화면과 같은 순수 계산 함수에 다시 넣어 렌더링합니다.
          네 항목 중 증빙이 있는 금액만 합산한 뒤 입력 과실비율을 적용하는 흐름을 확인하세요.
        </p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-3">
            치료비 {formatNumber(verificationExample.input.treatmentCost)}원 · 수리비 {formatNumber(verificationExample.input.repairCost)}원 ·
            일실이익 {formatNumber(verificationExample.input.lostIncome)}원 · 기타 {formatNumber(verificationExample.input.otherPropertyDamage)}원 ·
            과실 {verificationExample.input.faultRatio}%
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">자료로 확인된 손해 합계</dt>
              <dd className="font-medium">{formatNumber(verificationExample.result.documentedDamage)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">입력 과실비율 차감액</dt>
              <dd className="font-medium">{formatNumber(verificationExample.result.faultReduction)}원</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-slate-500">과실상계 후 재산상 손해 참고액</dt>
              <dd className="text-xl font-semibold" style={{ color: category.color }}>
                {formatNumber(verificationExample.result.adjustedDamage)}원
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {result !== null && (
        <section className="premium-card p-6" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">자료별 손해와 과실상계 결과</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            입력한 항목을 먼저 합산하고, 그 합계에 입력 과실비율만 적용했습니다. 아래 금액은 자료 범위와 과실비율 가정에 따른 참고액입니다.
          </p>

          <dl className="space-y-3 mb-5">
            {damageFields.map((field) => (
              <div key={field.key} className="flex justify-between gap-4">
                <dt className="text-sm text-slate-600">{field.label}</dt>
                <dd className="text-slate-900">{formatNumber(result[field.key])}원</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
              <dt className="text-sm text-slate-600">자료로 확인된 손해 합계</dt>
              <dd className="font-semibold text-slate-900">{formatNumber(result.documentedDamage)}원</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">입력 과실비율 차감액 ({result.faultRatio}%)</dt>
              <dd className="text-slate-900">{formatNumber(result.faultReduction)}원</dd>
            </div>
          </dl>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-1">과실상계 후 재산상 손해 참고액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.adjustedDamage)}원
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">단계별 계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 whitespace-pre-wrap glassmorphism glass-panel">
{`1단계: 자료로 확인된 손해 합계 = 치료비 + 수리비·복구비 + 일실이익 + 기타 확인액
2단계: 과실상계 후 참고액 = 손해 합계 × (1 - 입력 과실비율)
${formatNumber(result.documentedDamage)} × (1 - ${result.faultRatio}%) = ${formatNumber(result.adjustedDamage)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              민법 제763조에 따라 제393조·제396조 등이 불법행위 손해배상에 준용되지만, 이 화면은 손해의 발생·범위와 과실비율을 판단하지 않습니다.
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">입력 전 4단계 검산</h2>
        <ol className="space-y-4 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: category.color }}>1</span>
            <span><strong className="text-slate-900">원본을 항목에 연결:</strong> 진료비 계산서·영수증, 수리 견적·정산 자료, 소득자료와 업무 중단 기간을 각각 연결합니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: category.color }}>2</span>
            <span><strong className="text-slate-900">중복과 선지급액 확인:</strong> 같은 영수증이나 수리비를 두 항목에 넣지 말고, 보험·상대방에게 이미 받은 금액은 결과와 별도로 대조합니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: category.color }}>3</span>
            <span><strong className="text-slate-900">과실비율의 출처 확인:</strong> 사고자료·협의서·조정 또는 재판 자료에서 확인한 비율을 입력하고, 화면이 임의의 비율을 추천한다고 해석하지 않습니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: category.color }}>4</span>
            <span><strong className="text-slate-900">결과 범위 고정:</strong> 계산 결과는 입력한 재산상 손해의 비교값이며, 청구 가능액·합의금·법원 인정액을 확정하지 않습니다.</span>
          </li>
        </ol>

        <div className="mt-5 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">이 결과에서 빠지는 판단</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>민법 제751조의 위자료와 정신상 손해는 사건별 사정을 금액표로 환산하지 않습니다.</li>
            <li>개호비·장해·향후 치료비와 향후 손해의 인정 여부는 의료·소득 자료와 별도 판단이 필요합니다.</li>
            <li>제조물 결함, 인과관계, 책임 주체와 실제 배상액은 이 계산기가 판단하지 않습니다.</li>
            <li>입력 과실비율과 증빙의 적정성은 법원·조정기관·보험 절차에서 별도로 확인합니다.</li>
          </ul>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 text-xs text-gray-500 space-y-2">
          <p>
            공식 원문:{' '}
            <a href="https://www.law.go.kr/법령/민법/제750조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">민법 제750조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제393조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제393조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제396조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제396조</a>
          </p>
          <p>
            적용 범위 참고:{' '}
            <a href="https://www.law.go.kr/법령/민법/제751조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제751조(재산 이외의 손해)</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제763조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제763조(준용규정)</a>
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-sm font-semibold text-slate-900 mb-2">다른 손해 항목을 따로 검산하려면</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="text-teal-800 hover:underline" href="/tools/damages/lost-income">
            일실수입 단계별 검산
          </Link>
          <Link className="text-teal-800 hover:underline" href="/tools/damages/medical-malpractice">
            의료사고 재산상 손해
          </Link>
          <Link className="text-teal-800 hover:underline" href="/tools/traffic/accident-settlement">
            교통사고 책임보험 한도
          </Link>
        </div>
      </section>
    </CalculatorLayout>
  );
}
