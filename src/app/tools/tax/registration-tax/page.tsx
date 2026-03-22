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
  { value: 'ownership-transfer', label: '부동산 소유권 이전', rateLabel: '1.5%', amountLabel: '취득가액 (원)' },
  { value: 'ownership-preservation', label: '부동산 소유권 보존', rateLabel: '0.8%', amountLabel: '취득가액 (원)' },
  { value: 'mortgage', label: '부동산 저당권 설정', rateLabel: '0.2%', amountLabel: '채권금액 (원)' },
  { value: 'corporation-establishment', label: '법인 설립/증자', rateLabel: '0.4%', amountLabel: '납입자본금 (원)' },
  { value: 'corporation-branch', label: '법인 지점 설치 (대도시)', rateLabel: '0.4%', amountLabel: '납입자본금 (원)' },
  { value: 'ship', label: '선박', rateLabel: '0.02%', amountLabel: '선가 (원)' },
  { value: 'aircraft', label: '항공기', rateLabel: '0.01%', amountLabel: '가액 (원)' },
  { value: 'license', label: '면허 (정액세)', rateLabel: '정액', amountLabel: '' },
];

const RATE_MAP: Record<Exclude<RegistrationType, 'license'>, number> = {
  'ownership-transfer': 0.015,
  'ownership-preservation': 0.008,
  'mortgage': 0.002,
  'corporation-establishment': 0.004,
  'corporation-branch': 0.004,
  'ship': 0.0002,
  'aircraft': 0.0001,
};

const LICENSE_FEES: { grade: number; label: string; fee: number }[] = [
  { grade: 1, label: '1종', fee: 67500 },
  { grade: 2, label: '2종', fee: 54000 },
  { grade: 3, label: '3종', fee: 40500 },
  { grade: 4, label: '4종', fee: 27000 },
  { grade: 5, label: '5종', fee: 18000 },
];

const MINIMUM_TAX = 6000;

export default function RegistrationTaxPage() {
  const [regType, setRegType] = useState<RegistrationType>('ownership-transfer');
  const [amount, setAmount] = useState('');
  const [licenseGrade, setLicenseGrade] = useState(1);
  const [result, setResult] = useState<{
    regType: string;
    rateDisplay: string;
    registrationTax: number;
    educationTax: number;
    total: number;
    metroNote?: string;
  } | null>(null);

  const isLicense = regType === 'license';
  const currentType = REGISTRATION_TYPES.find(t => t.value === regType)!;

  const handleCalculate = () => {
    let registrationTax: number;
    let rateDisplay: string;
    let metroNote: string | undefined;

    if (isLicense) {
      const licenseInfo = LICENSE_FEES.find(l => l.grade === licenseGrade)!;
      registrationTax = licenseInfo.fee;
      rateDisplay = `${licenseInfo.label} 정액`;
    } else {
      const raw = parseInt(amount.replace(/[^0-9]/g, ''), 10);
      if (!raw || raw <= 0) return;
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
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">등록 유형</label>
          <select
            value={regType}
            onChange={e => { setRegType(e.target.value as RegistrationType); setResult(null); }}
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#10b981] focus:outline-none"
          >
            {REGISTRATION_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label} ({t.rateLabel})</option>
            ))}
          </select>
        </div>

        {isLicense ? (
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">면허 종류</label>
            <div className="space-y-2">
              {LICENSE_FEES.map(l => (
                <label key={l.grade} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="licenseGrade"
                    checked={licenseGrade === l.grade}
                    onChange={() => setLicenseGrade(l.grade)}
                    className="accent-[#10b981]"
                  />
                  <span className="text-white">{l.label}</span>
                  <span className="text-gray-500 text-sm">({formatNumber(l.fee)}원)</span>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">{currentType.amountLabel}</label>
            <input
              type="text"
              inputMode="numeric"
              value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
              onChange={handleAmountChange}
              placeholder="예: 300,000,000"
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#10b981] focus:outline-none"
            />
            {amount && (
              <p className="text-xs text-gray-500 mt-1">{parseInt(amount).toLocaleString('ko-KR')}원</p>
            )}
          </div>
        )}

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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">등록 유형</p>
              <p className="text-lg text-white">{result.regType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">적용 세율</p>
              <p className="text-lg text-white">{result.rateDisplay}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">등록면허세</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.registrationTax)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">지방교육세 (20%)</p>
              <p className="text-lg text-white">{formatNumber(result.educationTax)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">합계</p>
              <p className="text-lg font-bold text-white">{formatNumber(result.total)}원</p>
            </div>
          </div>

          {result.metroNote && (
            <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-sm text-yellow-400">{result.metroNote}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs font-semibold text-gray-400 mb-1">계산식</p>
            <pre className="text-xs font-mono text-gray-300 bg-[#0d1424] rounded p-2 mb-3 whitespace-pre-wrap">
{`과세표준 × 세율 = 등록면허세
등록면허세 × 20% = 지방교육세
합계 = 등록면허세 + 지방교육세 (최소 6,000원)`}
            </pre>
            <p className="text-xs text-gray-500">
              법적 근거: 지방세법 제23조~제36조(등록면허세) - 등록에 대한 등록면허세는 등록 당시의 가액 또는 채권금액 등을 과세표준으로 하여 해당 세율을 적용합니다. 최소 세액은 6,000원입니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
