'use client';

import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import {
  calculateForcedHeirship,
  calculateForcedHeirshipVerificationExample,
  type ForcedHeirshipClaimantType,
  type ForcedHeirshipResult,
} from '@/lib/calc/forced-heirship';

const tool = TOOLS.find((item) => item.id === 'forced-heirship')!;
const category = CATEGORIES.find((item) => item.id === 'family')!;

const claimantOptions: { value: ForcedHeirshipClaimantType; label: string }[] = [
  { value: 'child', label: '직계비속(자녀)' },
  { value: 'spouse', label: '배우자' },
  { value: 'parent', label: '직계존속(부모)' },
];

function getClaimantLabel(type: ForcedHeirshipClaimantType): string {
  return claimantOptions.find((option) => option.value === type)?.label ?? type;
}

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return Number.parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

function displayMoney(value: string): string {
  return value ? formatNumber(parseMoney(value)) : '';
}

function formatRatio(value: number): string {
  return value === 1 / 3 ? '1/3' : '1/2';
}

export default function ForcedHeirshipPage() {
  const [estateAtDeath, setEstateAtDeath] = useState('');
  const [includedGifts, setIncludedGifts] = useState('');
  const [debts, setDebts] = useState('');
  const [claimantType, setClaimantType] = useState<ForcedHeirshipClaimantType>('child');
  const [statutorySharePct, setStatutorySharePct] = useState('');
  const [actualReceived, setActualReceived] = useState('');
  const [result, setResult] = useState<ForcedHeirshipResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const verificationExample = calculateForcedHeirshipVerificationExample();

  const handleMoneyChange = (setter: (value: string) => void) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setter(event.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    if (estateAtDeath === '') {
      setError('상속 개시 당시 피상속인 재산을 입력해주세요.');
      setResult(null);
      return;
    }

    const estate = parseMoney(estateAtDeath);
    if (estate <= 0) {
      setError('상속 개시 당시 피상속인 재산은 0보다 커야 합니다.');
      setResult(null);
      return;
    }

    if (statutorySharePct.trim() === '') {
      setError('청구인의 법정상속분을 입력해주세요.');
      setResult(null);
      return;
    }

    const share = Number(statutorySharePct);
    if (!Number.isFinite(share) || share <= 0 || share > 100) {
      setError('청구인의 법정상속분은 0%보다 크고 100% 이하여야 합니다.');
      setResult(null);
      return;
    }

    const input = {
      estateAtDeath: estate,
      includedGifts: parseMoney(includedGifts),
      debts: parseMoney(debts),
      claimantType,
      statutorySharePct: share,
      actualReceived: parseMoney(actualReceived),
    };
    const calculated = calculateForcedHeirship(input);

    if (calculated.baseEstate > 1_000_000_000_000) {
      setWarning('기초재산이 1조원을 초과합니다. 재산·증여·채무 원본과 입력값을 다시 대조해주세요.');
    }

    setResult(calculated);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <section className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">유류분 산정에 쓸 자료 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          법적으로 산입된다고 확인한 금액만 나누어 입력합니다. 이 화면은 가족관계·유언·증여의 법적 성격을 판정하지 않고,
          입력한 기초재산과 법정상속분으로 유류분 부족액의 참고값을 계산합니다.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="forced-heirship-estate">
              상속 개시 당시 피상속인 재산 (원) <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              id="forced-heirship-estate"
              type="text"
              inputMode="numeric"
              value={displayMoney(estateAtDeath)}
              onChange={handleMoneyChange(setEstateAtDeath)}
              placeholder="예: 100,000,000"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none glassmorphism glass-panel"
            />
            <p className="text-xs text-gray-500 mt-1">
              민법 제1113조의 상속 개시 시 재산입니다. 부동산·예금 등 평가 자료를 따로 확인하세요.
            </p>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="forced-heirship-gifts">
              유류분 산입 대상으로 확인한 증여재산 (원)
            </label>
            <input
              id="forced-heirship-gifts"
              type="text"
              inputMode="numeric"
              value={displayMoney(includedGifts)}
              onChange={handleMoneyChange(setIncludedGifts)}
              placeholder="확인된 금액이 없으면 비워두세요"
              aria-describedby="forced-heirship-gifts-description"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none glassmorphism glass-panel"
            />
            <p id="forced-heirship-gifts-description" className="text-xs text-gray-500 mt-1">
              상속 개시 전 1년 이내 증여, 또는 공동상속인의 특별수익 등 산입 근거를 확인한 금액만 입력합니다. 오래된 증여를 자동으로 모두 더하지 않습니다.
            </p>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="forced-heirship-debts">
              상속채무 (원)
            </label>
            <input
              id="forced-heirship-debts"
              type="text"
              inputMode="numeric"
              value={displayMoney(debts)}
              onChange={handleMoneyChange(setDebts)}
              placeholder="확인된 채무가 없으면 비워두세요"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none glassmorphism glass-panel"
            />
            <p className="text-xs text-gray-500 mt-1">민법 제1113조에 따라 확인된 채무 전액을 기초재산에서 공제합니다.</p>
          </div>

          <fieldset>
            <legend className="block text-sm text-slate-600 mb-2">청구인 유형</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {claimantOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                  <input
                    type="radio"
                    name="forced-heirship-claimant-type"
                    checked={claimantType === option.value}
                    onChange={() => setClaimantType(option.value)}
                    className="accent-[#ec4899]"
                  />
                  <span className="text-sm text-slate-600">{option.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              형제자매는 현행 민법 제1112조 제4호가 삭제되어 이 계산 대상에 넣지 않습니다.
            </p>
          </fieldset>

          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="forced-heirship-statutory-share">
              청구인 법정상속분 (%) <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              id="forced-heirship-statutory-share"
              type="text"
              inputMode="decimal"
              value={statutorySharePct}
              onChange={(event) => setStatutorySharePct(event.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="예: 50 또는 33.33"
              aria-describedby="forced-heirship-statutory-share-description"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none glassmorphism glass-panel"
            />
            <p id="forced-heirship-statutory-share-description" className="text-xs text-gray-500 mt-1">
              배우자·자녀·부모가 함께 상속하는지에 따라 달라집니다. 가족관계를 정리한 뒤{' '}
              <Link href="/tools/family/inheritance-order" className="text-teal-800 underline hover:opacity-80">
                상속순위·법정상속분 판별기
              </Link>
              로 먼저 확인하세요.
            </p>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="forced-heirship-received">
              청구인이 이미 받은 상속·유증·증여액 (원)
            </label>
            <input
              id="forced-heirship-received"
              type="text"
              inputMode="numeric"
              value={displayMoney(actualReceived)}
              onChange={handleMoneyChange(setActualReceived)}
              placeholder="확인된 금액이 없으면 비워두세요"
              aria-describedby="forced-heirship-received-description"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#ec4899] focus:outline-none glassmorphism glass-panel"
            />
            <p id="forced-heirship-received-description" className="text-xs text-gray-500 mt-1">
              청구인에게 실제로 귀속된 재산을 원본 자료와 대조해 입력합니다. 이 값이 유류분액보다 적은 차이를 부족액 참고값으로 표시합니다.
            </p>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mt-4">{warning}</p>}

        <button
          type="button"
          onClick={handleCalculate}
          className="w-full py-3 mt-5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          유류분 부족액 참고값 계산하기
        </button>
      </section>

      <section className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">같은 함수로 계산한 검산 예시</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          설명에 적은 숫자를 복사한 것이 아니라, 입력 화면과 같은 순수 함수에 예시 입력을 넣어 결과를 렌더링합니다.
        </p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-3">
            재산 {formatNumber(verificationExample.input.estateAtDeath)}원 · 산입 증여 {formatNumber(verificationExample.input.includedGifts)}원 ·
            채무 {formatNumber(verificationExample.input.debts)}원 · {getClaimantLabel(verificationExample.input.claimantType)} ·
            법정상속분 {verificationExample.input.statutorySharePct}% · 이미 받은 금액 {formatNumber(verificationExample.input.actualReceived)}원
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">유류분 기초재산</dt>
              <dd className="font-medium">{formatNumber(verificationExample.result.baseEstate)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">청구인 유류분액</dt>
              <dd className="font-medium">{formatNumber(verificationExample.result.forcedHeirshipAmount)}원</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-slate-500">입력상 부족액 참고값</dt>
              <dd className="text-xl font-semibold" style={{ color: category.color }}>
                {formatNumber(verificationExample.result.shortfall)}원
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {result !== null && (
        <section className="premium-card p-6 mb-4" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">입력값 기준 유류분 결과</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            아래 금액은 입력한 증여 산입 범위·법정상속분·실제 취득액에 따른 참고값입니다. 법원이 산입 여부와 평가액을 다시 판단하면 결과가 달라질 수 있습니다.
          </p>

          <dl className="space-y-3 mb-5">
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">유류분 기초재산</dt>
              <dd className="text-slate-900">{formatNumber(result.baseEstate)}원</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">청구인 법정상속분액 ({statutorySharePct}%)</dt>
              <dd className="text-slate-900">{formatNumber(result.statutoryShareAmount)}원</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">적용 유류분 비율 ({getClaimantLabel(claimantType)})</dt>
              <dd className="text-slate-900">{formatRatio(result.forcedRatio)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">청구인 유류분액</dt>
              <dd className="text-slate-900">{formatNumber(result.forcedHeirshipAmount)}원</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">청구인이 이미 받은 금액</dt>
              <dd className="text-slate-900">{formatNumber(result.actualReceived)}원</dd>
            </div>
          </dl>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-1">입력상 유류분 부족액 참고값</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.shortfall)}원
            </p>
            <p className="text-xs text-gray-500 mt-2">
              민법 제1115조는 부족한 한도에서 재산 가액의 지급을 청구할 수 있다고 정합니다. 이 화면은 청구의 성립·상대방·지급 범위를 확정하지 않습니다.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">단계별 계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-3 whitespace-pre-wrap glassmorphism glass-panel">
{`1단계: 기초재산 = 상속 개시 시 재산 + 산입 증여 - 상속채무
${formatNumber(result.baseEstate)}원 = ${formatNumber(parseMoney(estateAtDeath))}원 + ${formatNumber(parseMoney(includedGifts))}원 - ${formatNumber(parseMoney(debts))}원
2단계: 법정상속분액 = 기초재산 × ${statutorySharePct}% = ${formatNumber(result.statutoryShareAmount)}원
3단계: 유류분액 = 법정상속분액 × ${formatRatio(result.forcedRatio)} = ${formatNumber(result.forcedHeirshipAmount)}원
4단계: 부족액 참고값 = 유류분액 - 이미 받은 금액 = ${formatNumber(result.shortfall)}원`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              계산기는 원 단위로 표시하기 위해 각 단계에서 원 미만을 버립니다. 실제 재산 평가·특별수익·기여분은 원본 자료와 법원 판단을 별도로 확인하세요.
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">입력 전 유류분 자료 검산</h2>
        <ol className="space-y-4 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>1</span>
            <span><strong className="text-slate-900">상속 개시일을 먼저 확인:</strong> 민법 제1115조의 2026년 개정된 가액 지급 규정은 부칙에 따라 2026년 3월 17일 이후 상속 개시부터 적용됩니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>2</span>
            <span><strong className="text-slate-900">증여의 성격을 분리:</strong> 1년 이내 증여인지, 공동상속인의 특별수익인지, 유류분권리자를 해할 의사를 전제로 한 오래된 증여인지 자료별로 확인하고 산입액만 입력합니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>3</span>
            <span><strong className="text-slate-900">법정상속분과 실제 취득액을 따로 대조:</strong> 가족관계증명서·유언·등기·금융자료를 구분해 확인하고, 증여·유증과 상속으로 받은 금액을 청구인별로 중복 입력하지 않습니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>4</span>
            <span><strong className="text-slate-900">기간과 반환 순서를 확인:</strong> 유증을 먼저 반환한 뒤 증여에 대해 청구하는 구조와, 안 날부터 1년·상속 개시부터 10년의 제1117조 기간을 별도로 확인합니다.</span>
          </li>
        </ol>

        <div className="mt-5 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">이 계산기가 자동으로 판단하지 않는 항목</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>증여·유증의 법적 성격, 상속 개시 당시 재산 평가액, 채무의 존재와 범위를 판단하지 않습니다.</li>
            <li>법정상속분은 가족관계·대습상속·상속 결격 등에 따라 달라질 수 있어 별도 입력값으로 받습니다.</li>
            <li>민법 제1008조의 특별수익과 제1008조의2의 기여분 관계, 상속권 상실 사유는 사건 자료와 법원 판단을 따로 확인해야 합니다.</li>
            <li>반환 상대방·원물 반환 여부·소송 결과·실제 지급액을 확정하지 않습니다.</li>
          </ul>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 text-xs text-gray-500 space-y-2">
          <p>
            현행 원문:{' '}
            <a href="https://www.law.go.kr/법령/민법/제1112조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">민법 제1112조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제1113조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1113조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제1114조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1114조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제1115조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1115조</a>
          </p>
          <p>
            적용·기간 참고:{' '}
            <a href="https://www.law.go.kr/법령/민법/제1116조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1116조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제1117조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1117조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제1118조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1118조</a>
            {' · '}
            <a href="https://www.law.go.kr/법령/민법/제1008조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">제1008조 특별수익</a>
            {' · '}
            <a href="https://www.law.go.kr/LSW/lsRvsDocListP.do?lsId=001706&chrClsCd=010202&lsRvsGubun=all" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">민법 2026년 개정문·부칙</a>
          </p>
        </div>
      </section>
    </CalculatorLayout>
  );
}
