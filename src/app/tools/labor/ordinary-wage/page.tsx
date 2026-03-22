'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'ordinary-wage')!;
const category = CATEGORIES.find(c => c.id === 'labor')!;

interface WageItem {
  id: number;
  name: string;
  amount: string;
  included: boolean;
}

const BASE_HOURS: Record<number, number> = {
  40: 209,
  44: 226,
};

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

let nextId = 2;

export default function OrdinaryWagePage() {
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [items, setItems] = useState<WageItem[]>([
    { id: 1, name: '기본급', amount: '', included: true },
  ]);
  const [result, setResult] = useState<{
    total: number;
    hourly: number;
    daily: number;
    baseHours: number;
  } | null>(null);

  const addItem = () => {
    setItems(prev => [...prev, { id: nextId++, name: '', amount: '', included: true }]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof WageItem, value: string | boolean) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const handleCalculate = () => {
    const baseHours = BASE_HOURS[weeklyHours];
    const total = items.reduce((sum, item) => {
      if (!item.included) return sum;
      const val = parseInt(item.amount.replace(/[^0-9]/g, ''), 10);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);

    if (total <= 0) return;

    const hourly = Math.floor(total / baseHours);
    const daily = hourly * 8;

    setResult({ total, hourly, daily, baseHours });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">1주 소정근로시간</label>
          <div className="flex gap-4">
            {[40, 44].map(h => (
              <label key={h} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="weeklyHours"
                  checked={weeklyHours === h}
                  onChange={() => setWeeklyHours(h)}
                  className="accent-[#f59e0b]"
                />
                <span className="text-sm text-gray-300">{h}시간제 (월 {BASE_HOURS[h]}시간)</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">임금 항목</label>
          <p className="text-xs text-gray-500 mb-3">
            정기적/일률적/고정적으로 지급되는 항목만 체크하세요. 성과급, 변동수당 등은 체크 해제합니다.
          </p>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.included}
                  onChange={e => updateItem(item.id, 'included', e.target.checked)}
                  className="accent-[#f59e0b] w-4 h-4 shrink-0"
                />
                <input
                  type="text"
                  value={item.name}
                  onChange={e => updateItem(item.id, 'name', e.target.value)}
                  placeholder="항목명"
                  className="flex-1 bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#f59e0b] focus:outline-none"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  value={item.amount ? parseInt(item.amount.replace(/[^0-9]/g, '') || '0').toLocaleString('ko-KR') : ''}
                  onChange={e => updateItem(item.id, 'amount', e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="금액 (원)"
                  className="w-36 bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-3 py-2 text-sm text-white text-right focus:border-[#f59e0b] focus:outline-none"
                />
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-400 text-lg shrink-0"
                    title="삭제"
                  >
                    x
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="mt-2 text-sm text-[#f59e0b] hover:underline"
          >
            + 항목 추가
          </button>
        </div>

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

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">1일 통상임금</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.daily)}원
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">통상임금 합계 (월)</p>
              <p className="text-lg text-white">{formatNumber(result.total)}원</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">시간급 통상임금</p>
              <p className="text-lg text-white">{formatNumber(result.hourly)}원</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">월 기준시간</p>
            <p className="text-lg text-white">{result.baseHours}시간</p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">항목별 내역</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-[#1e2d4a]">
                    <th className="py-2 text-left">항목명</th>
                    <th className="py-2 text-right">금액</th>
                    <th className="py-2 text-center">포함</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const val = parseInt(item.amount.replace(/[^0-9]/g, '') || '0', 10);
                    return (
                      <tr key={item.id} className="border-b border-[#1e2d4a]/50">
                        <td className="py-2 text-gray-300">{item.name || '-'}</td>
                        <td className="py-2 text-right text-white">{formatNumber(val)}원</td>
                        <td className="py-2 text-center">
                          {item.included ? (
                            <span className="text-green-400">O</span>
                          ) : (
                            <span className="text-gray-500">X</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 근로기준법 시행령 제6조(통상임금), 대법원 2013다4969 전원합의체 판결
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
