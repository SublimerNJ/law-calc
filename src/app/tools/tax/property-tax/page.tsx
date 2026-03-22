'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'property-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

type PropertyType = 'house' | 'building' | 'land-general' | 'land-separate';

interface PropertyTaxResult {
  standardValue: number;
  fairMarketRatio: number;
  taxBase: number;
  propertyTax: number;
  urbanAreaTax: number;
  localEducationTax: number;
  total: number;
}

function calculatePropertyTax(
  standardValue: number,
  propertyType: PropertyType,
  isUrbanArea: boolean,
): PropertyTaxResult {
  let fairMarketRatio: number;
  switch (propertyType) {
    case 'house': fairMarketRatio = 0.6; break;
    case 'building': fairMarketRatio = 0.7; break;
    case 'land-general': fairMarketRatio = 1.0; break;
    case 'land-separate': fairMarketRatio = 0.7; break;
  }

  const taxBase = Math.floor(standardValue * fairMarketRatio);
  let propertyTax: number;

  if (propertyType === 'house') {
    if (taxBase <= 60_000_000) {
      propertyTax = taxBase * 0.001;
    } else if (taxBase <= 150_000_000) {
      propertyTax = 60_000 + (taxBase - 60_000_000) * 0.0015;
    } else if (taxBase <= 300_000_000) {
      propertyTax = 195_000 + (taxBase - 150_000_000) * 0.0025;
    } else {
      propertyTax = 570_000 + (taxBase - 300_000_000) * 0.004;
    }
  } else if (propertyType === 'building') {
    propertyTax = taxBase * 0.0025;
  } else if (propertyType === 'land-general') {
    // Comprehensive aggregate land
    if (taxBase <= 50_000_000) {
      propertyTax = taxBase * 0.002;
    } else if (taxBase <= 100_000_000) {
      propertyTax = 100_000 + (taxBase - 50_000_000) * 0.003;
    } else {
      propertyTax = 250_000 + (taxBase - 100_000_000) * 0.005;
    }
  } else {
    // Separate aggregate land
    if (taxBase <= 200_000_000) {
      propertyTax = taxBase * 0.002;
    } else if (taxBase <= 1_000_000_000) {
      propertyTax = 400_000 + (taxBase - 200_000_000) * 0.003;
    } else {
      propertyTax = 2_800_000 + (taxBase - 1_000_000_000) * 0.004;
    }
  }

  propertyTax = Math.floor(propertyTax);

  const urbanAreaTax = isUrbanArea ? Math.floor(taxBase * 0.0014) : 0;
  const localEducationTax = Math.floor(propertyTax * 0.2);

  return {
    standardValue,
    fairMarketRatio,
    taxBase,
    propertyTax,
    urbanAreaTax,
    localEducationTax,
    total: propertyTax + urbanAreaTax + localEducationTax,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function PropertyTaxPage() {
  const [standardValue, setStandardValue] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('house');
  const [isUrbanArea, setIsUrbanArea] = useState(true);
  const [result, setResult] = useState<PropertyTaxResult | null>(null);

  const handleCalculate = () => {
    const val = parseInt(standardValue.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;
    setResult(calculatePropertyTax(val, propertyType, isUrbanArea));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStandardValue(e.target.value.replace(/[^0-9]/g, ''));
  };

  const propertyTypes = [
    { value: 'house' as PropertyType, label: '주택' },
    { value: 'building' as PropertyType, label: '건물' },
    { value: 'land-general' as PropertyType, label: '토지 (종합합산)' },
    { value: 'land-separate' as PropertyType, label: '토지 (별도합산)' },
  ];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">시가표준액 (공시가격, 원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={standardValue ? parseInt(standardValue).toLocaleString('ko-KR') : ''}
            onChange={handleValueChange}
            placeholder="예: 300,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#10b981] focus:outline-none"
          />
          {standardValue && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(standardValue).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">재산 유형</label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(opt => (
              <button
                key={opt.value}
                onClick={() => setPropertyType(opt.value)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  propertyType === opt.value
                    ? 'border-[#10b981] bg-[#10b981]/10 text-white'
                    : 'border-[#1e2d4a] text-gray-400 hover:border-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isUrbanArea}
              onChange={e => setIsUrbanArea(e.target.checked)}
              className="accent-[#10b981]"
            />
            <span className="text-sm text-gray-300">도시지역 (도시지역분 0.14% 적용)</span>
          </label>
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
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">시가표준액</span>
              <span className="text-white">{formatNumber(result.standardValue)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">공정시장가액비율</span>
              <span className="text-white">{(result.fairMarketRatio * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">과세표준</span>
              <span className="text-white">{formatNumber(result.taxBase)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">재산세</span>
              <span className="text-white">{formatNumber(result.propertyTax)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">도시지역분</span>
              <span className="text-white">{formatNumber(result.urbanAreaTax)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">지방교육세 (20%)</span>
              <span className="text-white">{formatNumber(result.localEducationTax)}원</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1e2d4a] mb-4">
            <div className="flex justify-between">
              <span className="text-base font-semibold text-white">합계 세액</span>
              <span className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.total)}원
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 지방세법 제110조(과세표준), 제111조(세율)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
