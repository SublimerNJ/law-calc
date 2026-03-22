'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'capital-gains-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type AssetType = 'house' | 'land' | 'commercial' | 'stock';
type HouseCount = '1' | '2' | '3+';

/** 기본세율 (소득세법 제55조, 2026년) */
function calcBasicTax(taxBase: number): number {
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return 840_000 + (taxBase - 14_000_000) * 0.15;
  if (taxBase <= 88_000_000) return 6_240_000 + (taxBase - 50_000_000) * 0.24;
  if (taxBase <= 150_000_000) return 15_360_000 + (taxBase - 88_000_000) * 0.35;
  if (taxBase <= 300_000_000) return 37_060_000 + (taxBase - 150_000_000) * 0.38;
  if (taxBase <= 500_000_000) return 94_060_000 + (taxBase - 300_000_000) * 0.40;
  if (taxBase <= 1_000_000_000) return 174_060_000 + (taxBase - 500_000_000) * 0.42;
  return 384_060_000 + (taxBase - 1_000_000_000) * 0.45;
}

/** 장기보유특별공제율 (1세대1주택) */
function getLongTermRate(years: number): number {
  if (years < 3) return 0;
  if (years < 4) return 0.12;
  if (years < 5) return 0.16;
  if (years < 6) return 0.20;
  if (years < 7) return 0.24;
  if (years < 8) return 0.28;
  if (years < 9) return 0.32;
  if (years < 10) return 0.36;
  return 0.40;
}

/** 일반 장기보유특별공제율 (비1세대1주택) */
function getGeneralLongTermRate(years: number): number {
  if (years < 3) return 0;
  if (years < 4) return 0.06;
  if (years < 5) return 0.08;
  if (years < 6) return 0.10;
  if (years < 7) return 0.12;
  if (years < 8) return 0.14;
  if (years < 9) return 0.16;
  if (years < 10) return 0.18;
  if (years < 11) return 0.20;
  if (years < 12) return 0.22;
  if (years < 13) return 0.24;
  if (years < 14) return 0.26;
  if (years < 15) return 0.28;
  return 0.30;
}

interface Result {
  gain: number;
  holdingYears: number;
  longTermDeduction: number;
  basicDeduction: number;
  taxBase: number;
  taxRate: string;
  computedTax: number;
  localTax: number;
  totalTax: number;
  exemptionNote: string | null;
  surchargeNote: string | null;
}

function calculate(
  acquisitionPrice: number,
  transferPrice: number,
  acquisitionDate: string,
  transferDate: string,
  assetType: AssetType,
  isSingleHouse: boolean,
  houseCount: HouseCount,
): Result {
  const gain = transferPrice - acquisitionPrice;
  const acqMs = new Date(acquisitionDate).getTime();
  const trnMs = new Date(transferDate).getTime();
  const holdingYears = Math.floor((trnMs - acqMs) / (365 * 24 * 60 * 60 * 1000));

  // 1세대1주택 비과세 판단
  let exemptionNote: string | null = null;
  let taxableGain = gain;

  if (isSingleHouse && holdingYears >= 2 && gain > 0) {
    const EXEMPTION_LIMIT = 1_200_000_000;
    if (transferPrice <= EXEMPTION_LIMIT) {
      // 양도가액 12억 이하: 전액 비과세
      exemptionNote = '1세대1주택 비과세 적용 (양도가액 12억 이하 전액 비과세)';
      taxableGain = 0;
    } else {
      // 양도가액 12억 초과: 초과분에 비례하여 과세
      const taxableRatio = (transferPrice - EXEMPTION_LIMIT) / transferPrice;
      taxableGain = Math.floor(gain * taxableRatio);
      exemptionNote = `1세대1주택 비과세 일부 적용 (12억 초과분 ${(taxableRatio * 100).toFixed(1)}%에 대해 과세)`;
    }
  }

  // Long-term holding deduction
  let longTermRate: number;
  if (assetType === 'stock') {
    longTermRate = 0;
  } else if (isSingleHouse) {
    longTermRate = getLongTermRate(holdingYears);
  } else {
    longTermRate = getGeneralLongTermRate(holdingYears);
  }
  const longTermDeduction = Math.floor(taxableGain > 0 ? taxableGain * longTermRate : 0);

  const basicDeduction = 2_500_000;
  const taxBase = Math.max(taxableGain - longTermDeduction - basicDeduction, 0);

  // Tax rate determination
  let computedTax: number;
  let taxRate: string;
  let surchargeNote: string | null = null;

  if (assetType !== 'stock' && holdingYears < 1) {
    taxRate = '70% (1년 미만 보유)';
    computedTax = Math.floor(taxBase * 0.70);
  } else if (assetType !== 'stock' && holdingYears < 2) {
    taxRate = '60% (1~2년 보유)';
    computedTax = Math.floor(taxBase * 0.60);
  } else {
    computedTax = Math.floor(calcBasicTax(taxBase));
    taxRate = '기본세율 (6~45%)';

    if (assetType === 'house' && houseCount === '2') {
      surchargeNote = '2주택 중과: 조정대상지역 내 +20%p 추가 세율 적용 가능';
    } else if (assetType === 'house' && houseCount === '3+') {
      surchargeNote = '3주택 이상 중과: 조정대상지역 내 +30%p 추가 세율 적용 가능';
    }
  }

  const localTax = Math.floor(computedTax * 0.1);
  const totalTax = computedTax + localTax;

  return {
    gain,
    holdingYears,
    longTermDeduction,
    basicDeduction,
    taxBase,
    taxRate,
    computedTax,
    localTax,
    totalTax,
    exemptionNote,
    surchargeNote,
  };
}

export default function CapitalGainsTaxPage() {
  const [acquisitionPrice, setAcquisitionPrice] = useState('');
  const [transferPrice, setTransferPrice] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [assetType, setAssetType] = useState<AssetType>('house');
  const [isSingleHouse, setIsSingleHouse] = useState(false);
  const [houseCount, setHouseCount] = useState<HouseCount>('1');
  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = () => {
    const acq = parseInt(acquisitionPrice.replace(/,/g, ''), 10);
    const trn = parseInt(transferPrice.replace(/,/g, ''), 10);
    if (!acq || !trn || !acquisitionDate || !transferDate) return;
    setResult(calculate(acq, trn, acquisitionDate, transferDate, assetType, isSingleHouse, houseCount));
  };

  const numInput = (value: string, setter: (v: string) => void) => ({
    type: 'text' as const,
    inputMode: 'numeric' as const,
    value: value ? parseInt(value).toLocaleString('ko-KR') : '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value.replace(/[^0-9]/g, '')),
    className: 'w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none',
  });

  const assetOptions: { value: AssetType; label: string }[] = [
    { value: 'house', label: '주택' },
    { value: 'land', label: '토지' },
    { value: 'commercial', label: '상가' },
    { value: 'stock', label: '주식' },
  ];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">취득가액 (원)</label>
          <input {...numInput(acquisitionPrice, setAcquisitionPrice)} placeholder="예: 300,000,000" />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">양도가액 (원)</label>
          <input {...numInput(transferPrice, setTransferPrice)} placeholder="예: 500,000,000" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">취득일</label>
            <input
              type="date"
              value={acquisitionDate}
              onChange={e => setAcquisitionDate(e.target.value)}
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">양도일</label>
            <input
              type="date"
              value={transferDate}
              onChange={e => setTransferDate(e.target.value)}
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">자산 유형</label>
          <div className="flex flex-wrap gap-3">
            {assetOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="assetType"
                  checked={assetType === opt.value}
                  onChange={() => setAssetType(opt.value)}
                  className="accent-[#10b981]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {assetType === 'house' && (
          <>
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSingleHouse}
                  onChange={e => setIsSingleHouse(e.target.checked)}
                  className="accent-[#10b981] w-4 h-4"
                />
                <span className="text-sm text-gray-300">1세대 1주택 해당</span>
              </label>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">보유 주택 수</label>
              <div className="flex gap-4">
                {([['1', '1주택'], ['2', '2주택'], ['3+', '3주택 이상']] as const).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="houseCount"
                      checked={houseCount === val}
                      onChange={() => setHouseCount(val)}
                      className="accent-[#10b981]"
                    />
                    <span className="text-sm text-gray-300">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
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

          {result.exemptionNote && (
            <div className="mb-4 p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30">
              <p className="text-sm text-[#10b981]">{result.exemptionNote}</p>
            </div>
          )}

          {result.surchargeNote && (
            <div className="mb-4 p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30">
              <p className="text-sm text-[#f59e0b]">{result.surchargeNote}</p>
            </div>
          )}

          <div className="space-y-3">
            {[
              { label: '양도차익', value: result.gain },
              { label: `보유기간 (${result.holdingYears}년)`, value: null },
              { label: '장기보유특별공제', value: result.longTermDeduction },
              { label: '기본공제', value: result.basicDeduction },
              { label: '과세표준', value: result.taxBase },
              { label: `적용세율: ${result.taxRate}`, value: null },
              { label: '양도소득세', value: result.computedTax },
              { label: '지방소득세', value: result.localTax },
              { label: '합계 납부세액', value: result.totalTax },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className={`flex justify-between items-center ${i === arr.length - 1 ? 'pt-3 border-t border-[#1e2d4a]' : ''}`}
              >
                <span className="text-sm text-gray-400">{row.label}</span>
                {row.value !== null ? (
                  <span
                    className={`font-semibold ${i === arr.length - 1 ? 'text-xl' : 'text-base text-white'}`}
                    style={i === arr.length - 1 ? { color: category.color } : undefined}
                  >
                    {formatNumber(row.value)}원
                  </span>
                ) : (
                  <span className="text-sm text-gray-400" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 소득세법 제94~118조, 조세특례제한법 1세대1주택 비과세
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
