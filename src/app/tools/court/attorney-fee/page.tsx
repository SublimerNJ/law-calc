'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'attorney-fee')!;
const category = CATEGORIES.find(c => c.id === 'court')!;

function calculateAttorneyFee(amount: number, level: number): number {
  let fee: number;

  if (amount <= 20_000_000) {
    fee = amount * 0.1;
    if (fee < 100_000) fee = 100_000;
  } else if (amount <= 50_000_000) {
    fee = 2_000_000 + (amount - 20_000_000) * 0.08;
  } else if (amount <= 100_000_000) {
    fee = 4_400_000 + (amount - 50_000_000) * 0.06;
  } else if (amount <= 150_000_000) {
    fee = 7_400_000 + (amount - 100_000_000) * 0.04;
  } else if (amount <= 200_000_000) {
    fee = 9_400_000 + (amount - 150_000_000) * 0.02;
  } else if (amount <= 500_000_000) {
    fee = 10_400_000 + (amount - 200_000_000) * 0.01;
  } else if (amount <= 1_000_000_000) {
    fee = 13_400_000 + (amount - 500_000_000) * 0.005;
  } else {
    fee = 15_900_000 + (amount - 1_000_000_000) * 0.001;
    if (fee > 30_000_000) fee = 30_000_000;
  }

  // 2심: 1.5배
  if (level === 2) fee = fee * 1.5;
  // 3심: 동일 (산입 비율 동일 적용)

  return Math.floor(fee);
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function AttorneyFeePage() {
  const [amount, setAmount] = useState('');
  const [level, setLevel] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const val = parseInt(amount.replace(/,/g, ''), 10);
    if (!val || val <= 0) return;
    setResult(calculateAttorneyFee(val, level));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAmount(raw);
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-white mb-4">계산 정보 입력</h2>

        <div className="mb-2 p-3 rounded-lg bg-[#0d1424] border border-[#1e2d4a]">
          <p className="text-xs text-gray-400">
            💡 이 계산기는 <strong className="text-gray-300">변호사 선임 비용</strong>이 아닌, 소송에서 이겨서 상대방에게 청구할 수 있는 <strong className="text-gray-300">변호사보수 소송비용 산입 한도</strong>를 계산합니다.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">소가 (원)</label>
          <p className="text-xs text-gray-500 mb-1">소가 = 소송에서 청구하는 금액</p>
          <input
            type="text"
            inputMode="numeric"
            value={amount ? parseInt(amount).toLocaleString('ko-KR') : ''}
            onChange={handleAmountChange}
            placeholder="예: 50,000,000"
            className="w-full bg-[#0d1424] border border-[#1e2d4a] rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
          />
          {amount && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(amount).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">심급 선택</label>
          <div className="flex gap-4">
            {[
              { value: 1, label: '1심' },
              { value: 2, label: '2심 (1.5배)' },
              { value: 3, label: '3심' },
            ].map(opt => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="level"
                  checked={level === opt.value}
                  onChange={() => setLevel(opt.value)}
                  className="accent-[#3b82f6]"
                />
                <span className="text-sm text-gray-300">{opt.label}</span>
              </label>
            ))}
          </div>
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

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">산입 가능 변호사 보수</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">소가</p>
            <p className="text-lg text-white">
              {amount ? formatNumber(parseInt(amount)) : '0'}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">심급</p>
            <p className="text-lg text-white">
              {level === 1 ? '1심' : level === 2 ? '2심 (1.5배 적용)' : '3심'}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#1e2d4a]">
            <p className="text-xs text-gray-500">
              법적 근거: 민사소송법 제109조, 변호사보수의 소송비용 산입에 관한 규칙 (대법원 예규)
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
