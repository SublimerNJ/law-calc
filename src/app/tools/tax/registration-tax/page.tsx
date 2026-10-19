'use client';

import { useState, type ChangeEvent } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { CATEGORIES, TOOLS } from '@/lib/tools-data';
import {
  calculateRegistrationTax,
  LICENSE_TAX_RATES,
  type LicenseGrade,
  type LicenseRegion,
  type RegistrationTaxInput,
  type RegistrationTaxResult,
} from '@/lib/calc/registration-tax';

const tool = TOOLS.find(item => item.id === 'registration-tax')!;
const category = CATEGORIES.find(item => item.id === 'tax')!;

type RegistrationType = RegistrationTaxInput['kind'];

type RegistrationTypeOption = {
  value: RegistrationType;
  label: string;
  rateLabel: string;
  amountLabel: string;
};

type DisplayResult = RegistrationTaxResult & {
  typeLabel: string;
  rateDisplay: string;
};

const REGISTRATION_TYPES: RegistrationTypeOption[] = [
  {
    value: 'real-estate-mortgage',
    label: '부동산 저당권 설정',
    rateLabel: '채권금액의 0.20%',
    amountLabel: '채권금액 (원)',
  },
  {
    value: 'corporation-capital',
    label: '영리법인 설립·자본 증가',
    rateLabel: '0.40% · 최저 112,500원',
    amountLabel: '납입한 주식금액·출자금액 (원)',
  },
  {
    value: 'corporation-branch',
    label: '법인 지점·분사무소 설치',
    rateLabel: '건당 40,200원 · 해당 시 대도시 3배',
    amountLabel: '',
  },
  {
    value: 'license',
    label: '면허 (지역·종별 정액)',
    rateLabel: '지방세법 제34조 정액',
    amountLabel: '',
  },
];

const REGION_LABELS: Record<LicenseRegion, string> = {
  metro: '인구 50만 명 이상 시·특별시·광역시',
  city: '그 밖의 시',
  county: '군',
};

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

function formatRate(value: number | null): string {
  return value === null ? '정액' : `${value.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}%`;
}

export default function RegistrationTaxPage() {
  const [regType, setRegType] = useState<RegistrationType>('real-estate-mortgage');
  const [amount, setAmount] = useState('');
  const [licenseGrade, setLicenseGrade] = useState<LicenseGrade>(1);
  const [licenseRegion, setLicenseRegion] = useState<LicenseRegion>('metro');
  const [metropolitanHeavy, setMetropolitanHeavy] = useState(false);
  const [result, setResult] = useState<DisplayResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const isLicense = regType === 'license';
  const currentType = REGISTRATION_TYPES.find(item => item.value === regType)!;
  const needsAmount = regType === 'real-estate-mortgage' || regType === 'corporation-capital';
  const needsMetropolitanCheck = regType === 'corporation-capital' || regType === 'corporation-branch';

  const clearCalculation = () => {
    setResult(null);
    setError(null);
    setWarning(null);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value.replace(/[^0-9]/g, ''));
    clearCalculation();
  };

  const handleCalculate = () => {
    clearCalculation();

    let calculation: RegistrationTaxResult;
    let rateDisplay: string;

    if (isLicense) {
      calculation = calculateRegistrationTax({
        kind: 'license',
        region: licenseRegion,
        grade: licenseGrade,
      });
      rateDisplay = `${REGION_LABELS[licenseRegion]} · ${licenseGrade}종 정액`;
    } else if (regType === 'corporation-branch') {
      calculation = calculateRegistrationTax({
        kind: 'corporation-branch',
        metropolitanHeavy,
      });
      rateDisplay = metropolitanHeavy ? '건당 120,600원 (대도시 3배)' : '건당 40,200원';
    } else {
      const taxBase = Number(amount);
      if (!Number.isFinite(taxBase) || taxBase <= 0) {
        setError('과세표준 또는 채권금액을 입력해주세요.');
        return;
      }
      if (taxBase > 10_000_000_000) {
        setWarning('입력 금액이 100억원을 초과합니다. 과세표준을 확인해주세요.');
      }

      if (regType === 'corporation-capital') {
        calculation = calculateRegistrationTax({
          kind: 'corporation-capital',
          taxBase,
          metropolitanHeavy,
        });
        rateDisplay = `${formatRate(calculation.ratePercent)}${metropolitanHeavy ? ' (대도시 3배)' : ''}`;
      } else {
        calculation = calculateRegistrationTax({
          kind: 'real-estate-mortgage',
          taxBase,
        });
        rateDisplay = formatRate(calculation.ratePercent);
      }
    }

    setResult({ ...calculation, typeLabel: currentType.label, rateDisplay });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>
        <p className="text-sm text-slate-600 mb-5">
          지방세법 제23조에 따라 취득을 원인으로 하는 일반 소유권 등기(매매·상속·증여·신축 등)는 이 계산기에서 다루지 않습니다. 등록면허세 등록분으로 과세되는 예외는 별도 확인이 필요합니다.
        </p>

        <div className="mb-4">
          <label htmlFor="registration-type" className="block text-sm text-slate-600 mb-2">등록 유형</label>
          <select
            id="registration-type"
            value={regType}
            onChange={event => {
              setRegType(event.target.value as RegistrationType);
              setAmount('');
              setMetropolitanHeavy(false);
              clearCalculation();
            }}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
          >
            {REGISTRATION_TYPES.map(item => (
              <option key={item.value} value={item.value}>{item.label} ({item.rateLabel})</option>
            ))}
          </select>
        </div>

        {isLicense ? (
          <div className="mb-6 space-y-4">
            <div>
              <label htmlFor="license-region" className="block text-sm text-slate-600 mb-2">지역 구분 (지방세법 제34조)</label>
              <select
                id="license-region"
                value={licenseRegion}
                onChange={event => {
                  setLicenseRegion(event.target.value as LicenseRegion);
                  clearCalculation();
                }}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
              >
                <option value="metro">인구 50만 명 이상 시·특별시·광역시</option>
                <option value="city">그 밖의 시</option>
                <option value="county">군</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">특별자치시·도농복합시 등은 지역별 적용 조례에 따라 구분을 확인하세요.</p>
            </div>
            <div>
              <p className="block text-sm text-slate-600 mb-2">면허 종별</p>
              <div className="space-y-2">
                {([1, 2, 3, 4, 5] as const).map(grade => (
                  <label key={grade} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="licenseGrade"
                      checked={licenseGrade === grade}
                      onChange={() => {
                        setLicenseGrade(grade);
                        clearCalculation();
                      }}
                      className="accent-[#10b981]"
                    />
                    <span className="text-slate-900">{grade}종</span>
                    <span className="text-gray-500 text-sm">({formatNumber(LICENSE_TAX_RATES[licenseRegion][grade])}원)</span>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">면허분 정액 세액입니다. 이 계산기는 면허 종별 자체를 판정하지 않습니다.</p>
            </div>
          </div>
        ) : (
          <div className="mb-6 space-y-4">
            {needsAmount && (
              <div>
                <label htmlFor="tax-base" className="block text-sm text-slate-600 mb-2">{currentType.amountLabel} *</label>
                <input
                  id="tax-base"
                  type="text"
                  inputMode="numeric"
                  value={amount ? Number(amount).toLocaleString('ko-KR') : ''}
                  onChange={handleAmountChange}
                  placeholder="예: 300,000,000"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-teal-700 focus:outline-none glassmorphism glass-panel"
                />
              </div>
            )}

            {needsMetropolitanCheck && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <label className="flex items-start gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={metropolitanHeavy}
                    onChange={event => {
                      setMetropolitanHeavy(event.target.checked);
                      clearCalculation();
                    }}
                    className="mt-1 accent-[#10b981]"
                  />
                  <span>대도시 설립·지점 설치 중과 요건을 확인했고, 제외 업종이 아니어서 3배 세율을 적용합니다.</span>
                </label>
                <p className="mt-2 text-xs text-gray-600">주소·등기 시기·법인 유형·중과 제외 업종을 이 계산기는 판정하지 않습니다. 요건을 확인한 경우에만 선택하세요.</p>
              </div>
            )}
          </div>
        )}

        {error && <p role="alert" className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-600 text-sm mb-3">{warning}</p>}
        <button
          type="button"
          aria-label="Action button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <>
          <div className="premium-card p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">등록 유형</p>
                <p className="text-lg text-slate-900">{result.typeLabel}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">적용 세율</p>
                <p className="text-lg text-slate-900">{result.rateDisplay}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">등록면허세</span>
                <span className="text-base text-slate-900">{formatNumber(result.registrationTax)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">지방교육세{isLicense ? ' (면허분: 해당 없음)' : ' (등록분 20%)'}</span>
                <span className="text-base text-slate-900">{formatNumber(result.educationTax)}원</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-slate-900">합계 세액</span>
                <span className="text-xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.totalTax)}원
                </span>
              </div>
            </div>

            {result.minimumApplied && (
              <p className="text-xs text-gray-600 mb-3">법정 최저 등록면허세가 적용되었습니다.</p>
            )}

            {needsMetropolitanCheck && (
              <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="text-sm text-yellow-700">
                  {metropolitanHeavy
                    ? '대도시 중과 3배를 계산에 반영했습니다. 대상 여부와 제외 업종은 별도 확인이 필요합니다.'
                    : '대도시 중과를 반영하지 않은 기본 세액입니다. 해당 요건을 확인하지 않았다면 최종 납부액으로 단정하지 마세요.'}
                </p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
              <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap glassmorphism glass-panel">
{isLicense
  ? '지방세법 제34조 지역·종별 정액 = 등록면허세\n면허분에는 지방교육세를 계산하지 않음'
  : '과세표준 × 유형별 세율 = 등록면허세\n등록분 등록면허세 × 20% = 지방교육세\n합계 = 등록면허세 + 지방교육세'}
              </pre>
              <p className="text-xs text-gray-500">
                법적 근거: 지방세법 제23조(정의), 제28조(등록분 세율), 제34조(면허분 세율), 제151조제1항제2호(등록분 지방교육세).
                {' '}<a className="underline" href="https://www.law.go.kr/LSW/lsInfoP.do?lsId=001649&amp;ancYnChk=0" target="_blank" rel="noreferrer">국가법령정보센터 원문</a>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                입력한 값에 따른 참고 계산입니다. 이 계산기는 과세표준·감면·관할 조례와 대도시 중과 요건을 판정하지 않습니다. 신고 전 관할 지방자치단체와 등기 자료를 확인하세요.
              </p>
            </div>
          </div>
          <ActionInsight calculatorId="registration-tax" amount={result.totalTax} />
        </>
      )}
    </CalculatorLayout>
  );
}
