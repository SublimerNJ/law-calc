'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'registration-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type RegistrationType =
  | 'ownership-transfer'
  | 'ownership-preservation'
  | 'mortgage'
  | 'corporation-establishment'
  | 'corporation-branch'
  | 'ship'
  | 'aircraft'
  | 'license';

const REGISTRATION_TYPES: { value: RegistrationType; label: string; rateLabel: string; amountLabel: string }[] = [
  { value: 'ownership-transfer', label: '부동산 소유권 이전 (유상)', rateLabel: '2.0%', amountLabel: '취득가액 (원)' },
  { value: 'ownership-preservation', label: '부동산 소유권 보존', rateLabel: '0.8%', amountLabel: '취득가액 (원)' },
  { value: 'mortgage', label: '부동산 저당권 설정', rateLabel: '0.2%', amountLabel: '채권금액 (원)' },
  { value: 'corporation-establishment', label: '법인 설립/증자', rateLabel: '0.4%', amountLabel: '납입자본금 (원)' },
  { value: 'corporation-branch', label: '법인 지점 설치 (대도시)', rateLabel: '0.4%', amountLabel: '납입자본금 (원)' },
  { value: 'ship', label: '선박', rateLabel: '0.02%', amountLabel: '선가 (원)' },
  { value: 'aircraft', label: '항공기', rateLabel: '0.01%', amountLabel: '가액 (원)' },
  { value: 'license', label: '면허 (정액세)', rateLabel: '정액', amountLabel: '' },
];

const RATE_MAP: Record<Exclude<RegistrationType, 'license'>, number> = {
  'ownership-transfer': 0.02,
  'ownership-preservation': 0.008,
  'mortgage': 0.002,
  'corporation-establishment': 0.004,
  'corporation-branch': 0.004,
  'ship': 0.0002,
  'aircraft': 0.0001,
};

type RegionType = 'metro' | 'city' | 'county';

// 지방세법 제34조, 별표: 면허 종별·지역별 등록면허세
const LICENSE_FEES: Record<RegionType, { grade: number; label: string; fee: number }[]> = {
  metro: [
    { grade: 1, label: '1종', fee: 67_500 },
    { grade: 2, label: '2종', fee: 54_000 },
    { grade: 3, label: '3종', fee: 40_500 },
    { grade: 4, label: '4종', fee: 27_000 },
    { grade: 5, label: '5종', fee: 18_000 },
  ],
  city: [
    { grade: 1, label: '1종', fee: 45_000 },
    { grade: 2, label: '2종', fee: 34_000 },
    { grade: 3, label: '3종', fee: 22_500 },
    { grade: 4, label: '4종', fee: 15_000 },
    { grade: 5, label: '5종', fee: 7_500 },
  ],
  county: [
    { grade: 1, label: '1종', fee: 27_000 },
    { grade: 2, label: '2종', fee: 18_000 },
    { grade: 3, label: '3종', fee: 12_000 },
    { grade: 4, label: '4종', fee: 9_000 },
    { grade: 5, label: '5종', fee: 4_500 },
  ],
};

const MINIMUM_TAX = 6000;

export default function RegistrationTaxPage() {
  const [regType, setRegType] = useState<RegistrationType>('ownership-transfer');
  const [amount, setAmount] = useState('');
  const [licenseGrade, setLicenseGrade] = useState(1);
  const [licenseRegion, setLicenseRegion] = useState<RegionType>('metro');
  const [result, setResult] = useState<{
    regType: string;
    rateDisplay: string;
    registrationTax: number;
    educationTax: number;
    total: number;
    metroNote?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const isLicense = regType === 'license';
  const currentType = REGISTRATION_TYPES.find(t => t.value === regType)!;

  const handleCalculate = () => {
    setError(null);
    setWarning(null);
    let registrationTax: number;
    let rateDisplay: string;
    let metroNote: string | undefined;

    if (isLicense) {
      const licenseInfo = LICENSE_FEES[licenseRegion].find(l => l.grade === licenseGrade)!;
      registrationTax = licenseInfo.fee;
      const regionLabel = licenseRegion === 'metro' ? '인구50만+시' : licenseRegion === 'city' ? '그 밖의 시' : '군';
      rateDisplay = `${licenseInfo.label} 정액 (${regionLabel})`;
    } else {
      const raw = parseInt(amount.replace(/[^0-9]/g, ''), 10);
      if (!raw || raw <= 0) {
        setError('금액을 입력해주세요.');
        setResult(null);
        return;
      }
      if (raw > 10_000_000_000) {
        setWarning('입력 금액이 100억원을 초과합니다. 확인해주세요.');
      }
      const rate = RATE_MAP[regType as Exclude<RegistrationType, 'license'>];
      registrationTax = Math.floor(raw * rate);
      rateDisplay = `${(rate * 100).toFixed(2)}%`;

      if (regType === 'corporation-establishment' || regType === 'corporation-branch') {
        metroNote = '대도시 내 설립/증자/지점 설치 시 3배 중과 (1.2%) 적용 가능';
      }
    }

    // Minimum 6,000 won
    if (registrationTax < MINIMUM_TAX) {
      registrationTax = MINIMUM_TAX;
    }

    const educationTax = Math.floor(registrationTax * 0.2);
    const total = registrationTax + educationTax;

    setResult({
      regType: currentType.label,
      rateDisplay,
      registrationTax,
      educationTax,
      total,
      metroNote,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">등록 유형</label>
          <select
            value={regType}
            onChange={e => { setRegType(e.target.value as RegistrationType); setResult(null); setError(null); setWarning(null); }}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          >
            {REGISTRATION_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label} ({t.rateLabel})</option>
            ))}
          </select>
        </div>

        {isLicense ? (
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">지역 구분 (지방세법 제34조)</label>
              <select
                value={licenseRegion}
                onChange={e => setLicenseRegion(e.target.value as RegionType)}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              >
                <option value="metro">인구 50만 이상 시 (서울·부산·대구 등)</option>
                <option value="city">그 밖의 시</option>
                <option value="county">군</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">면허 종류</label>
              <div className="space-y-2">
                {LICENSE_FEES[licenseRegion].map(l => (
                  <label key={l.grade} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="licenseGrade"
                      checked={licenseGrade === l.grade}
                      onChange={() => setLicenseGrade(l.grade)}
                      className="accent-[#10b981]"
                    />
                    <span className="text-slate-900">{l.label}</span>
                    <span className="text-gray-500 text-sm">({formatNumber(l.fee)}원)</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-2">{currentType.amountLabel} *</label>
            <input
              type="text"
              inputMode="numeric"
              value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
              onChange={handleAmountChange}
              placeholder="예: 300,000,000"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
            {amount && (
              <p className="text-xs text-gray-500 mt-1">{parseInt(amount).toLocaleString('ko-KR')}원</p>
            )}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}
        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">등록 유형</p>
              <p className="text-lg text-slate-900">{result.regType}</p>
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
              <span className="text-sm text-slate-600">지방교육세 (20%)</span>
              <span className="text-base text-slate-900">{formatNumber(result.educationTax)}원</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-slate-900">합계 세액</span>
              <span className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.total)}원
              </span>
            </div>
          </div>

          {result.metroNote && (
            <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-sm text-yellow-600">{result.metroNote}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 mb-1">계산식</p>
            <pre className="text-xs font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`과세표준 × 세율 = 등록면허세
등록면허세 × 20% = 지방교육세
합계 = 등록면허세 + 지방교육세 (최소 6,000원)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 지방세법 제28조(등록면허세 세율), 제34조(면허에 대한 등록면허세) - 부동산 소유권 이전(유상) 20/1000, 소유권 보존 8/1000, 저당권 설정 2/1000. 최소 세액 6,000원.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
