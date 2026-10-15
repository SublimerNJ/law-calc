'use client';

import Link from 'next/link';
import { useState, type ChangeEvent } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import {
  ATTORNEY_FEE_BRACKETS,
  calculateAttorneyFee,
  calculateAttorneyFeeVerificationExample,
  type AttorneyFeeCaseType,
  type AttorneyFeeReduction,
  type AttorneyFeeResult,
} from '@/lib/calc/attorney-fee';

const tool = TOOLS.find((item) => item.id === 'attorney-fee')!;
const category = CATEGORIES.find((item) => item.id === 'court')!;

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function parseMoney(value: string): number {
  return Number.parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
}

function displayMoney(value: string): string {
  return value ? formatNumber(parseMoney(value)) : '';
}

function formatRate(rate: number): string {
  return `${rate * 100}%`;
}

function getBaseFormula(result: AttorneyFeeResult): string {
  const bracket = ATTORNEY_FEE_BRACKETS[result.bracketIndex]!;
  if (result.bracketIndex === 0) {
    return `300만원까지 부분 = 30만원`;
  }

  return `${formatNumber(bracket.base)}원 + (${formatNumber(result.litigationValue)}원 - ${formatNumber(bracket.previousMax)}원) × ${formatRate(bracket.rate)} = ${formatNumber(result.baseLimit)}원`;
}

export default function AttorneyFeePage() {
  const [litigationValue, setLitigationValue] = useState('');
  const [actualFee, setActualFee] = useState('');
  const [caseType, setCaseType] = useState<AttorneyFeeCaseType>('main');
  const [preservationHadHearing, setPreservationHadHearing] = useState(true);
  const [reduction, setReduction] = useState<AttorneyFeeReduction>('none');
  const [burdenSharePct, setBurdenSharePct] = useState('');
  const [result, setResult] = useState<AttorneyFeeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const verificationExample = calculateAttorneyFeeVerificationExample();
  const exampleBracket = ATTORNEY_FEE_BRACKETS[verificationExample.result.bracketIndex]!;

  const handleMoneyChange = (setter: (value: string) => void) => (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setter(event.target.value.replace(/[^0-9]/g, ''));
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    if (litigationValue.trim() === '') {
      setError('소송목적의 값 또는 피보전권리의 값을 입력해주세요.');
      setResult(null);
      return;
    }

    const normalizedLitigationValue = parseMoney(litigationValue);
    if (normalizedLitigationValue <= 0) {
      setError('소송목적의 값 또는 피보전권리의 값은 0보다 커야 합니다.');
      setResult(null);
      return;
    }

    const hasActualFee = actualFee.trim() !== '';
    const normalizedActualFee = hasActualFee ? parseMoney(actualFee) : null;
    if (hasActualFee && normalizedActualFee === null) {
      setError('실제 지급하였거나 지급할 보수액을 확인해주세요.');
      setResult(null);
      return;
    }

    const hasBurdenShare = burdenSharePct.trim() !== '';
    const normalizedBurdenShare = hasBurdenShare ? Number(burdenSharePct) : null;
    if (hasBurdenShare && (normalizedBurdenShare === null || !Number.isFinite(normalizedBurdenShare) || normalizedBurdenShare < 0 || normalizedBurdenShare > 100)) {
      setError('상대방 부담비율은 0~100 사이 숫자로 입력해주세요.');
      setResult(null);
      return;
    }
    if (hasBurdenShare && !hasActualFee) {
      setError('상대방 부담비율을 반영하려면 실제 지급하였거나 지급할 보수액을 먼저 입력해주세요.');
      setResult(null);
      return;
    }

    if (normalizedLitigationValue > 10_000_000_000) {
      setWarning('입력한 값이 100억원을 초과합니다. 청구취지·신청취지와 평가자료를 다시 확인해주세요.');
    }

    setResult(calculateAttorneyFee({
      litigationValue: normalizedLitigationValue,
      actualFee: normalizedActualFee,
      caseType,
      preservationHadHearing,
      reduction,
      burdenSharePct: normalizedBurdenShare,
    }));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <section className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">사건 자료 입력</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          법원에 제출한 청구취지·신청취지와 보수계약·지급자료를 대조한 뒤 입력하세요. 이 계산기는 한 심급에서 소송비용에 산입할 수 있는 변호사보수의 참고 한도와, 입력한 실제 보수액·부담비율을 비교합니다.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="attorney-fee-litigation-value">
              소송목적의 값 또는 피보전권리의 값 (원) <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              id="attorney-fee-litigation-value"
              type="text"
              inputMode="numeric"
              value={displayMoney(litigationValue)}
              onChange={handleMoneyChange(setLitigationValue)}
              placeholder="예: 60,000,000"
              aria-describedby="attorney-fee-litigation-value-description"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#3b82f6] focus:outline-none glassmorphism glass-panel"
            />
            <p id="attorney-fee-litigation-value-description" className="text-xs text-gray-500 mt-1">
              본안은 소송목적의 값, 가압류·가처분은 피보전권리의 값입니다. 규칙 제4조와 민사소송 등 인지법 제2조의 산정자료를 확인하세요.
            </p>
          </div>

          <fieldset>
            <legend className="block text-sm text-slate-600 mb-2">사건 유형</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex items-start gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                <input
                  type="radio"
                  name="attorney-fee-case-type"
                  checked={caseType === 'main'}
                  onChange={() => setCaseType('main')}
                  className="mt-1 accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">
                  <strong className="text-slate-900">본안 소송</strong>
                  <span className="block text-xs text-gray-500 mt-1">각 심급의 별표 기준을 적용합니다.</span>
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                <input
                  type="radio"
                  name="attorney-fee-case-type"
                  checked={caseType === 'preservation'}
                  onChange={() => setCaseType('preservation')}
                  className="mt-1 accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">
                  <strong className="text-slate-900">가압류·가처분 명령 신청·이의·취소</strong>
                  <span className="block text-xs text-gray-500 mt-1">규칙 제3조 제2항에 따라 기준액의 1/2을 적용할 수 있습니다.</span>
                </span>
              </label>
            </div>
          </fieldset>

          {caseType === 'preservation' && (
            <fieldset>
              <legend className="block text-sm text-slate-600 mb-2">가압류·가처분 사건의 변론 또는 심문</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                  <input
                    type="radio"
                    name="attorney-fee-preservation-hearing"
                    checked={preservationHadHearing}
                    onChange={() => setPreservationHadHearing(true)}
                    className="accent-[#3b82f6]"
                  />
                  <span className="text-sm text-slate-600">변론 또는 심문을 거침</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                  <input
                    type="radio"
                    name="attorney-fee-preservation-hearing"
                    checked={!preservationHadHearing}
                    onChange={() => setPreservationHadHearing(false)}
                    className="accent-[#3b82f6]"
                  />
                  <span className="text-sm text-slate-600">거치지 않음</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">규칙 제3조 제2항 단서에 따라 신청사건에서 변론 또는 심문을 거치지 않은 경우 산입액을 계산하지 않습니다.</p>
            </fieldset>
          )}

          <fieldset>
            <legend className="block text-sm text-slate-600 mb-2">규칙 제5조의 1/2 감액 사유</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="flex items-start gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                <input
                  type="radio"
                  name="attorney-fee-reduction"
                  checked={reduction === 'none'}
                  onChange={() => setReduction('none')}
                  className="mt-1 accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">해당 없음 또는 확인 전</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-3">
                <input
                  type="radio"
                  name="attorney-fee-reduction"
                  checked={reduction === 'half'}
                  onChange={() => setReduction('half')}
                  className="mt-1 accent-[#3b82f6]"
                />
                <span className="text-sm text-slate-600">
                  <strong className="text-slate-900">해당하는 것으로 확인됨</strong>
                  <span className="block text-xs text-gray-500 mt-1">전부자백·자백간주 판결, 무변론 판결, 이행권고결정</span>
                </span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">사건의 절차와 판결문을 확인해 선택하세요. 계산기가 감액 사유를 판정하지 않습니다.</p>
          </fieldset>

          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="attorney-fee-actual-fee">
              실제 지급하였거나 지급할 변호사 보수액 (원, 선택)
            </label>
            <input
              id="attorney-fee-actual-fee"
              type="text"
              inputMode="numeric"
              value={displayMoney(actualFee)}
              onChange={handleMoneyChange(setActualFee)}
              placeholder="예: 6,000,000"
              aria-describedby="attorney-fee-actual-fee-description"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#3b82f6] focus:outline-none glassmorphism glass-panel"
            />
            <p id="attorney-fee-actual-fee-description" className="text-xs text-gray-500 mt-1">비워두면 별표상 산입 한도만 표시합니다. 계약서·세금계산서·영수증·송금자료와 금액을 대조하세요.</p>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2" htmlFor="attorney-fee-burden-share">
              판결문에 정해진 상대방 부담비율 (%, 선택)
            </label>
            <input
              id="attorney-fee-burden-share"
              type="text"
              inputMode="decimal"
              value={burdenSharePct}
              onChange={(event) => setBurdenSharePct(event.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="예: 60"
              aria-describedby="attorney-fee-burden-share-description"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#3b82f6] focus:outline-none glassmorphism glass-panel"
            />
            <p id="attorney-fee-burden-share-description" className="text-xs text-gray-500 mt-1">일부 승소 등으로 법원이 정한 비율을 그대로 입력합니다. 계산기가 일부 승소 비율이나 소송비용 부담을 판단하지 않습니다.</p>
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
          변호사보수 산입 한도 계산하기
        </button>
      </section>

      <section className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">별표 기준액과 부담비율을 함수로 검산한 예시</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          아래 숫자는 설명에 따로 적어 둔 결과가 아니라, 입력 화면과 같은 순수 함수에 예시 입력을 넣어 렌더링합니다. 실제 지급액과 법원이 정한 부담비율을 입력했을 때의 표시 순서를 확인하세요.
        </p>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 mb-3">
            소송목적의 값 {formatNumber(verificationExample.input.litigationValue)}원 · 본안 소송 · 실제 보수 {formatNumber(verificationExample.input.actualFee ?? 0)}원 · 상대방 부담비율 {verificationExample.input.burdenSharePct}%
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">적용 별표 구간</dt>
              <dd className="font-medium">{exampleBracket.label}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">별표 기준액</dt>
              <dd className="font-medium">{formatNumber(verificationExample.result.baseLimit)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">지급보수액과 비교한 산입액</dt>
              <dd className="font-medium">{formatNumber(verificationExample.result.recoverableBeforeBurden ?? 0)}원</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">부담비율 반영 참고액</dt>
              <dd className="text-xl font-semibold" style={{ color: category.color }}>
                {formatNumber(verificationExample.result.recoverableAfterBurden ?? 0)}원
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {result !== null && (
        <section className="premium-card p-6 mb-4" aria-live="polite">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">입력값 기준 산입 한도</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            아래 금액은 현행 별표와 선택한 사건 유형·절차를 기계적으로 적용한 참고값입니다. 실제 소송비용액은 법원이 사건 자료와 판결 주문을 보고 확정합니다.
          </p>

          {!result.isEligible && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 mb-4 text-sm text-orange-800">
              가압류·가처분 신청에서 변론 또는 심문을 거치지 않은 것으로 선택했으므로, 규칙 제3조 제2항 단서에 따라 산입액을 0원으로 표시합니다.
            </div>
          )}

          <dl className="space-y-3 mb-5">
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">적용 구간</dt>
              <dd className="text-slate-900 text-right">{ATTORNEY_FEE_BRACKETS[result.bracketIndex]!.label}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">별표 기준액</dt>
              <dd className="text-slate-900">{formatNumber(result.baseLimit)}원</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">사건 유형 적용 후</dt>
              <dd className="text-slate-900">{formatNumber(result.caseTypeLimit)}원</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-sm text-slate-600">규칙 제5조 감액 적용 후 산입 한도</dt>
              <dd className="font-semibold text-slate-900">{formatNumber(result.adjustedLimit)}원</dd>
            </div>
            {result.actualFee !== null && (
              <>
                <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
                  <dt className="text-sm text-slate-600">입력한 실제 보수액</dt>
                  <dd className="text-slate-900">{formatNumber(result.actualFee)}원</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-sm text-slate-600">실제 보수액과 한도 중 적은 금액</dt>
                  <dd className="text-slate-900">{formatNumber(result.recoverableBeforeBurden ?? 0)}원</dd>
                </div>
              </>
            )}
            {result.recoverableAfterBurden !== null && (
              <div className="flex justify-between gap-4 border-t border-slate-200 pt-3">
                <dt className="text-sm text-slate-600">부담비율 반영 참고액 ({result.burdenSharePct}%)</dt>
                <dd className="font-semibold" style={{ color: category.color }}>
                  {formatNumber(result.recoverableAfterBurden)}원
                </dd>
              </div>
            )}
          </dl>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-600 mb-1">한 심급에서 산입 가능한 참고 한도</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.adjustedLimit)}원
            </p>
            <p className="text-xs text-gray-500 mt-2">
              민사소송법 제109조는 대법원규칙이 정하는 금액 범위에서 변호사보수를 소송비용으로 인정하도록 정합니다. 심급별로 실제 선임·지급 자료와 판결 주문을 따로 확인하세요.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-2">단계별 계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-3 whitespace-pre-wrap glassmorphism glass-panel">
{`1단계: 별표 기준액 = ${getBaseFormula(result)}
2단계: 사건 유형 적용 = 별표 기준액 × ${result.caseType === 'preservation' ? '1/2' : '1'} = ${formatNumber(result.caseTypeLimit)}원
3단계: 규칙 제5조 감액 적용 = 사건 유형 적용액 × ${result.reduction === 'half' ? '1/2' : '1'} = ${formatNumber(result.adjustedLimit)}원${result.actualFee !== null ? `
4단계: 지급보수액과 비교 = min(${formatNumber(result.actualFee)}원, ${formatNumber(result.adjustedLimit)}원) = ${formatNumber(result.recoverableBeforeBurden ?? 0)}원` : ''}${result.recoverableAfterBurden !== null ? `
5단계: 부담비율 반영 = ${formatNumber(result.recoverableBeforeBurden ?? 0)}원 × ${result.burdenSharePct}% = ${formatNumber(result.recoverableAfterBurden)}원` : ''}`}
            </pre>
            <p className="text-xs text-gray-500 mt-3">
              가압류·가처분 사건은 변론 또는 심문을 거친 경우에만 규칙 제3조 제2항의 1/2 계산을 적용합니다. 규칙 제6조의 법원 재량에 따른 감액·증액은 사건별 판단이므로 자동 계산하지 않습니다.
            </p>
          </div>
        </section>
      )}

      <section className="premium-card p-6 mt-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">입력 전 4단계 자료 검산</h2>
        <ol className="space-y-4 text-sm text-slate-600">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>1</span>
            <span><strong className="text-slate-900">청구취지·신청취지를 확인:</strong> 판결문이나 신청서의 소가·피보전권리 가액과 계산 대상 심급을 분리해 적습니다. 청구취지를 바꿨다면 규칙 제4조 제2항에 따라 변경된 취지를 다시 확인합니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>2</span>
            <span><strong className="text-slate-900">보수계약과 지급자료를 대조:</strong> 규칙 제3조는 지급하였거나 지급할 보수액의 범위에서 산입하도록 하므로 계약서·영수증·송금내역을 한 심급 단위로 모읍니다.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>3</span>
            <span><strong className="text-slate-900">절차상 감액 사유를 판결문과 대조:</strong> 전부자백·자백간주 판결, 무변론 판결, 이행권고결정이면 규칙 제5조의 1/2이 문제될 수 있습니다. 사건 서류를 확인하지 않고 임의로 선택하지 마세요.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: category.color }}>4</span>
            <span><strong className="text-slate-900">소송비용 부담 주문을 따로 확인:</strong> 일부 승소로 부담비율이 정해졌다면 그 비율을 입력합니다. 법원이 비용을 확정하기 전에는 실제 회수액이나 상대방의 지급을 단정하지 않습니다.</span>
          </li>
        </ol>

        <div className="mt-5 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">이 계산기가 자동으로 판단하지 않는 항목</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>소송목적의 값·피보전권리의 값, 실제 지급 여부와 증빙의 진정성을 판단하지 않습니다.</li>
            <li>승소·패소나 일부 승소 비율, 소송비용 부담비율을 예측하지 않습니다.</li>
            <li>규칙 제6조에 따른 법원의 재량 감액·증액과 법원이 최종 확정하는 비용액을 추정하지 않습니다.</li>
            <li>인지대·송달료·감정료 등 다른 소송비용은 이 계산 결과에 포함하지 않습니다.</li>
          </ul>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 text-xs text-gray-500 space-y-2">
          <p>
            현행 공식 원문:{' '}
            <a href="https://www.law.go.kr/법령/민사소송법/제109조" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">민사소송법 제109조</a>
            {' · '}
            <a href="https://www.law.go.kr/LSW/lsInfoP.do?lsId=005866" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">변호사보수의 소송비용 산입에 관한 규칙 본문·부칙</a>
          </p>
          <p>
            별표 원문:{' '}
            <a href="https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=91732731&bylClsCd=110201" target="_blank" rel="noopener noreferrer" className="text-teal-800 hover:underline">국가법령정보센터 별표 PDF</a>
            {' · '}민사소송법은 2026. 10. 2. 시행, 해당 규칙은 2020. 12. 28. 시행 기준입니다.
          </p>
          <p>
            관련 자료:{' '}
            <Link href="/guides/how-to-calculate-attorney-fee" className="text-teal-800 hover:underline">변호사보수 산입 실무 가이드</Link>
            {' · '}
            <Link href="/tools/court/lawsuit-cost" className="text-teal-800 hover:underline">소송비용 계산기</Link>
          </p>
        </div>
      </section>
    </CalculatorLayout>
  );
}
