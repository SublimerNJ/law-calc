'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'damages-general')!;
const category = CATEGORIES.find(c => c.id === 'damages')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DamagesGeneralPage() {
  const [propertyDamage, setPropertyDamage] = useState('');
  const [faultRatio, setFaultRatio] = useState('');
  const [includeConsolation, setIncludeConsolation] = useState(false);
  const [consolationType, setConsolationType] = useState<'death' | 'severe' | 'custom'>('severe');
  const [customConsolation, setCustomConsolation] = useState('');
  const [result, setResult] = useState<{
    adjustedProperty: number;
    consolation: number;
    total: number;
  } | null>(null);

  const getConsolationBase = (): number => {
    if (consolationType === 'death') return 100_000_000;
    if (consolationType === 'severe') return 30_000_000;
    return parseInt(customConsolation.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const handleCalculate = () => {
    const property = parseInt(propertyDamage.replace(/[^0-9]/g, ''), 10) || 0;
    const fault = parseFloat(faultRatio) || 0;
    if (property <= 0) return;

    const adjustedProperty = Math.floor(property * (1 - fault / 100));
    let consolation = 0;
    if (includeConsolation) {
      consolation = Math.floor(getConsolationBase() * (1 - fault / 100));
    }
    const total = adjustedProperty + consolation;

    setResult({ adjustedProperty, consolation, total });
  };

  const handleNumberChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">재산상 손해액 (치료비 + 일실이익 + 기타, 원)</label>
          <input
            type="text"
            inputMode="numeric"
            value={propertyDamage ? parseInt(propertyDamage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setPropertyDamage)}
            placeholder="예: 10,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
          {propertyDamage && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(propertyDamage).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">피해자 과실비율 (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={faultRatio}
            onChange={(e) => setFaultRatio(e.target.value)}
            placeholder="0 ~ 100"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeConsolation}
              onChange={(e) => setIncludeConsolation(e.target.checked)}
              className="accent-[#f97316]"
            />
            <span className="text-sm text-gray-300">위자료 청구 포함</span>
          </label>
        </div>

        {includeConsolation && (
          <div className="mb-4 ml-6">
            <label className="block text-sm text-gray-400 mb-2">위자료 기준액</label>
            <select
              value={consolationType}
              onChange={(e) => setConsolationType(e.target.value as 'death' | 'severe' | 'custom')}
              className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none mb-2"
            >
              <option value="death">사망 (1억원)</option>
              <option value="severe">중상해 (3,000만원)</option>
              <option value="custom">직접 입력</option>
            </select>
            {consolationType === 'custom' && (
              <input
                type="text"
                inputMode="numeric"
                value={customConsolation ? parseInt(customConsolation).toLocaleString('ko-KR') : ''}
                onChange={handleNumberChange(setCustomConsolation)}
                placeholder="위자료 기준액 입력"
                className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#f97316] focus:outline-none"
              />
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

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">계산 결과</h2>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">재산상 손해 (과실상계 후)</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.adjustedProperty)}원
            </p>
          </div>

          {includeConsolation && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">위자료 (과실상계 후)</p>
              <p className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.consolation)}원
              </p>
            </div>
          )}

          <div className="mb-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-sm text-gray-400 mb-1">총 배상액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-2">계산식</p>
            <pre className="text-xs text-gray-300 bg-[#0d1424] p-3 rounded-lg whitespace-pre-wrap font-mono">
{`재산손해 = ${formatNumber(parseInt(propertyDamage) || 0)} × (1 - ${faultRatio || 0}%) = ${formatNumber(result.adjustedProperty)}원${includeConsolation ? `\n위자료 = ${formatNumber(getConsolationBase())} × (1 - ${faultRatio || 0}%) = ${formatNumber(result.consolation)}원` : ''}
총 배상액 = ${formatNumber(result.adjustedProperty)}${includeConsolation ? ` + ${formatNumber(result.consolation)}` : ''} = ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제750조(불법행위), 제763조(과실상계)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
