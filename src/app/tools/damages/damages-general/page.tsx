'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { ActionInsight } from '@/components/ui/ActionInsight';
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
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
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
    setError(null);
    setWarning(null);
    const property = parseInt(propertyDamage.replace(/[^0-9]/g, ''), 10) || 0;
    const fault = parseFloat(faultRatio) || 0;

    // INPUT-02: 재산손해액 필수
    if (!propertyDamage || property <= 0) {
      setError('재산상 손해액을 입력해주세요.');
      setResult(null);
      return;
    }
    // INPUT-03: 100억 초과 경고
    if (property > 10_000_000_000) {
      setWarning('재산손해액이 100억원을 초과합니다. 입력값을 확인해주세요.');
    }
    // 과실비율 범위 검증
    if (fault < 0 || fault > 100) {
      setError('과실비율은 0~100 사이 숫자를 입력해주세요.');
      setResult(null);
      return;
    }

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
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">재산상 손해액 (치료비 + 일실이익 + 기타, 원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={propertyDamage ? parseInt(propertyDamage).toLocaleString('ko-KR') : ''}
            onChange={handleNumberChange(setPropertyDamage)}
            placeholder="예: 10,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          {propertyDamage && (
            <p className="text-xs text-gray-500 mt-1">{parseInt(propertyDamage).toLocaleString('ko-KR')}원</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">피해자 과실비율 (%)</label>
          <input
            type="text"
            inputMode="decimal"
            value={faultRatio}
            onChange={(e) => setFaultRatio(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="0 ~ 100"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
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
            <span className="text-sm text-slate-600">위자료 청구 포함</span>
          </label>
        </div>

        {includeConsolation && (
          <div className="mb-4 ml-6">
            <label className="block text-sm text-slate-600 mb-2">위자료 기준액</label>
            <select
              value={consolationType}
              onChange={(e) => setConsolationType(e.target.value as 'death' | 'severe' | 'custom')}
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none mb-2"
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
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
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

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 결과</h2>

          {result.total === 0 && (
            <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-600">총 배상액이 0원으로 계산되었습니다. 과실비율 또는 손해항목을 확인해주세요.</p>
            </div>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">재산상 손해 (과실상계 후)</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.adjustedProperty)}원
            </p>
          </div>

          {includeConsolation && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">위자료 (과실상계 후)</p>
              <p className="text-xl font-bold" style={{ color: category.color }}>
                {formatNumber(result.consolation)}원
              </p>
            </div>
          )}

          <div className="mb-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-1">총 배상액</p>
            <p className="text-3xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
{`재산손해 = ${formatNumber(parseInt(propertyDamage) || 0)} × (1 - ${faultRatio || 0}%) = ${formatNumber(result.adjustedProperty)}원${includeConsolation ? `\n위자료 = ${formatNumber(getConsolationBase())} × (1 - ${faultRatio || 0}%) = ${formatNumber(result.consolation)}원` : ''}
총 배상액 = ${formatNumber(result.adjustedProperty)}${includeConsolation ? ` + ${formatNumber(result.consolation)}` : ''} = ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 민법 제750조(불법행위의 내용), 제751조(재산 이외의 손해배상), 제393조(손해배상의 범위) 및 제396조(과실상계) 준용(제763조)
            </p>
          </div>
        </div>
      )}

      <div className="premium-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">손해배상 청구 절차</h2>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#f97316' }}>1</span>
            <span className="text-sm text-slate-600">내용증명으로 배상 요구</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#f97316' }}>2</span>
            <span className="text-sm text-slate-600">합의 불성립 시 민사소송 제기</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#f97316' }}>3</span>
            <span className="text-sm text-slate-600">소멸시효: 손해 및 가해자를 안 날부터 3년, 불법행위일부터 10년 (민법 제766조)</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900" style={{ backgroundColor: '#f97316' }}>4</span>
            <span className="text-sm text-slate-600">소송비용: 인지대 + 변호사 비용 별도</span>
          </li>
        </ol>
      </div>

      {result !== null && (
        <div className="mt-6">
          <ActionInsight calculatorId="damages-general" amount={result.total} />
        </div>
      )}
    </CalculatorLayout>
  );
}
