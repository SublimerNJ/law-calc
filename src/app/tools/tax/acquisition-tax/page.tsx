'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'acquisition-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

type PropertyType = 'house' | 'land' | 'building' | 'commercial';
type HouseCount = '1' | '2' | '3plus';

interface AcquisitionResult {
  acquisitionPrice: number;
  taxRate: number;
  acquisitionTax: number;
  ruralSpecialTax: number;
  localEducationTax: number;
  total: number;
}

function calculateAcquisitionTax(
  price: number,
  propertyType: PropertyType,
  houseCount: HouseCount,
  areaOver85: boolean,
  adjustedArea: boolean,
): AcquisitionResult {
  let taxRate: number;

  if (propertyType !== 'house') {
    // Land, building, commercial: flat 4%
    taxRate = 0.04;
  } else {
    // Housing
    if (houseCount === '1') {
      if (price <= 600_000_000) {
        taxRate = 0.01;
      } else if (price <= 900_000_000) {
        // Linear interpolation 1%~3%
        taxRate = 0.01 + (price - 600_000_000) / 300_000_000 * 0.02;
        // Clamp
        if (taxRate < 0.01) taxRate = 0.01;
        if (taxRate > 0.03) taxRate = 0.03;
      } else {
        taxRate = 0.03;
      }
    } else if (houseCount === '2') {
      if (adjustedArea) {
        taxRate = 0.08;
      } else {
        // Non-adjusted: normal rate (same as 1-house, 지방세법 제11조 제1항 제7호의2)
        if (price <= 600_000_000) {
          taxRate = 0.01;
        } else if (price <= 900_000_000) {
          // Linear interpolation 1%~3% (동일 구간세율 적용)
          taxRate = 0.01 + (price - 600_000_000) / 300_000_000 * 0.02;
          if (taxRate < 0.01) taxRate = 0.01;
          if (taxRate > 0.03) taxRate = 0.03;
        } else {
          taxRate = 0.03;
        }
      }
    } else {
      // 3+ houses
      if (adjustedArea) {
        taxRate = 0.12;
      } else {
        taxRate = 0.08;
      }
    }
  }

  const acquisitionTax = Math.floor(price * taxRate);

  // Rural special tax: housing <= 85sqm exempt, else 10% of acquisition tax
  let ruralSpecialTax = 0;
  if (propertyType === 'house') {
    if (areaOver85) {
      ruralSpecialTax = Math.floor(acquisitionTax * 0.1);
    }
  } else {
    ruralSpecialTax = Math.floor(acquisitionTax * 0.1);
  }

  // Local education tax: 20% of acquisition tax
  const localEducationTax = Math.floor(acquisitionTax * 0.2);

  return {
    acquisitionPrice: price,
    taxRate,
    acquisitionTax,
    ruralSpecialTax,
    localEducationTax,
    total: acquisitionTax + ruralSpecialTax + localEducationTax,
  };
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function AcquisitionTaxPage() {
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('house');
  const [houseCount, setHouseCount] = useState<HouseCount>('1');
  const [areaOver85, setAreaOver85] = useState(false);
  const [adjustedArea, setAdjustedArea] = useState(false);
  const [result, setResult] = useState<AcquisitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);
    const val = parseInt(price.replace(/,/g, ''), 10);
    if (!val || val <= 0) {
      setError('취득가액을 입력해주세요.');
      setResult(null);
      return;
    }
    if (val > 10_000_000_000) {
      setWarning('취득가액이 100억원을 초과합니다. 입력값을 확인해주세요.');
    }
    setResult(calculateAcquisitionTax(val, propertyType, houseCount, areaOver85, adjustedArea));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setPrice(raw);
  };

  const propertyTypes = [
    { value: 'house' as PropertyType, label: '주택' },
    { value: 'land' as PropertyType, label: '토지' },
    { value: 'building' as PropertyType, label: '건물' },
    { value: 'commercial' as PropertyType, label: '상가' },
  ];

  const houseCounts = [
    { value: '1' as HouseCount, label: '1주택' },
    { value: '2' as HouseCount, label: '2주택' },
    { value: '3plus' as HouseCount, label: '3주택 이상' },
  ];

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">취득가액 (원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={price ? parseInt(price).toLocaleString('ko-KR') : ''}
            onChange={handlePriceChange}
            placeholder="예: 500,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none glassmorphism glass-panel"
          />
          {price && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(price).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">부동산 유형</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {propertyTypes.map(opt => (
              <button aria-label="Action button"
                key={opt.value}
                onClick={() => setPropertyType(opt.value)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  propertyType === opt.value
                    ? 'border-[#10b981] bg-[#10b981]/10 text-slate-900'
                    : 'border-slate-200 text-slate-600 hover:border-gray-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {propertyType === 'house' && (
          <>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">주택 보유 수</label>
              <div className="flex gap-2">
                {houseCounts.map(opt => (
                  <button aria-label="Action button"
                    key={opt.value}
                    onClick={() => setHouseCount(opt.value)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                      houseCount === opt.value
                        ? 'border-[#10b981] bg-[#10b981]/10 text-slate-900'
                        : 'border-slate-200 text-slate-600 hover:border-gray-500'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={areaOver85}
                  onChange={e => setAreaOver85(e.target.checked)}
                  className="accent-[#10b981]"
                />
                <span className="text-sm text-slate-600">85m2 초과</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adjustedArea}
                  onChange={e => setAdjustedArea(e.target.checked)}
                  className="accent-[#10b981]"
                />
                <span className="text-sm text-slate-600">조정대상지역</span>
              </label>
            </div>
          </>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}
        <button aria-label="Action button"
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: category.color }}
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <>
          <div className="premium-card p-6 mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">취득가액</span>
              <span className="text-slate-900">{formatNumber(result.acquisitionPrice)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">적용 세율</span>
              <span className="text-slate-900">{(result.taxRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">취득세</span>
              <span className="text-slate-900">{formatNumber(result.acquisitionTax)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">농어촌특별세</span>
              <span className="text-slate-900">{formatNumber(result.ruralSpecialTax)}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">지방교육세</span>
              <span className="text-slate-900">{formatNumber(result.localEducationTax)}원</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 mb-4">
            <div className="flex justify-between">
              <span className="text-base font-semibold text-slate-900">합계 세액</span>
              <span className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.total)}원
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-white glassmorphism glass-panel">
              <p className="text-xs text-slate-600 mb-1">실효 부담률</p>
              <p className="text-lg text-slate-900">{(result.total / result.acquisitionPrice * 100).toFixed(2)}%</p>
            </div>
            <div className="p-3 rounded-lg bg-white glassmorphism glass-panel" style={{ borderLeft: `3px solid ${category.color}` }}>
              <p className="text-xs text-slate-600 mb-1">총 매입비용 (취득가 + 세금)</p>
              <p className="text-lg font-bold" style={{ color: category.color }}>
                {formatNumber(result.acquisitionPrice + result.total)}원
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono glassmorphism glass-panel">
{`취득세 = ${formatNumber(result.acquisitionPrice)} × ${(result.taxRate * 100).toFixed(1)}% = ${formatNumber(result.acquisitionTax)}원
농특세 = ${result.ruralSpecialTax > 0 ? `${formatNumber(result.acquisitionTax)} × 10% = ${formatNumber(result.ruralSpecialTax)}원` : '면제 (85m² 이하 주택)'}
교육세 = ${formatNumber(result.acquisitionTax)} × 20% = ${formatNumber(result.localEducationTax)}원
합계 = ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 지방세법 제11조, 농어촌특별세법 제5조, 지방교육세법 제5조
            </p>
            <p className="text-xs text-gray-500 mt-1">
              1주택 6~9억: 보간세율 적용 | 2주택 조정지역 8% | 3주택+ 조정지역 12%
            </p>
          </div>
        </div>
        <ActionInsight calculatorId="acquisition-tax" amount={result.total} />
        </>
      )}
    </CalculatorLayout>
  );
}
