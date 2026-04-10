'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import { ActionInsight } from '@/components/ui/ActionInsight';

const tool = TOOLS.find(t => t.id === 'vat')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

type CalcMode = 'supply' | 'total';

export default function VatPage() {
  const [mode, setMode] = useState<CalcMode>('supply');
  const [salesAmount, setSalesAmount] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [result, setResult] = useState<{
    mode: CalcMode;
    // Mode 1
    salesSupply?: number;
    salesVat?: number;
    purchaseSupply?: number;
    purchaseVat?: number;
    payableTax?: number;
    isRefund?: boolean;
    // Mode 2
    supplyTotal?: number;
    supplyBase?: number;
    supplyVat?: number;
  } | null>(null);

  const parseAmount = (v: string) => parseInt(v.replace(/[^0-9]/g, ''), 10) || 0;

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    if (mode === 'supply') {
      const sales = parseAmount(salesAmount);
      const purchase = parseAmount(purchaseAmount);

      if (sales <= 0 && purchase <= 0) {
        setError('매출 또는 매입 공급가액 중 하나 이상을 입력해주세요.');
        setResult(null);
        return;
      }

      if (sales > 50_000_000_000 || purchase > 50_000_000_000) {
        setWarning('입력 금액이 500억원을 초과합니다. 입력값을 확인해주세요.');
      }

      const salesVat = Math.floor(sales * 0.1);
      const purchaseVat = Math.floor(purchase * 0.1);
      const payableTax = salesVat - purchaseVat;

      setResult({
        mode: 'supply',
        salesSupply: sales,
        salesVat,
        purchaseSupply: purchase,
        purchaseVat,
        payableTax,
        isRefund: payableTax < 0,
      });
    } else {
      const total = parseAmount(totalPrice);

      if (total <= 0) {
        setError('공급대가(VAT 포함 금액)를 입력해주세요.');
        setResult(null);
        return;
      }

      if (total > 50_000_000_000) {
        setWarning('입력 금액이 500억원을 초과합니다. 입력값을 확인해주세요.');
      }

      const supplyBase = Math.floor(total / 1.1);
      const supplyVat = total - supplyBase;

      setResult({
        mode: 'total',
        supplyTotal: total,
        supplyBase,
        supplyVat,
      });
    }
  };

  const handleChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value.replace(/[^0-9]/g, ''));
  };

  const formatInput = (v: string) => v ? parseInt(v).toLocaleString('ko-KR') : '';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">계산 모드</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                checked={mode === 'supply'}
                onChange={() => { setMode('supply'); setResult(null); setError(null); setWarning(null); }}
                className="accent-[#10b981]"
              />
              <span className="text-slate-900 text-sm">공급가액으로 계산</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mode"
                checked={mode === 'total'}
                onChange={() => { setMode('total'); setResult(null); setError(null); setWarning(null); }}
                className="accent-[#10b981]"
              />
              <span className="text-slate-900 text-sm">공급대가(VAT 포함)로 계산</span>
            </label>
          </div>
        </div>

        {mode === 'supply' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm text-slate-600 mb-2">매출 공급가액 (원) *</label>
              <input
                type="text"
                inputMode="numeric"
                value={formatInput(salesAmount)}
                onChange={handleChange(setSalesAmount)}
                placeholder="예: 50,000,000"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-slate-600 mb-2">매입 공급가액 (원)</label>
              <input
                type="text"
                inputMode="numeric"
                value={formatInput(purchaseAmount)}
                onChange={handleChange(setPurchaseAmount)}
                placeholder="예: 30,000,000"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </>
        ) : (
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-2">공급대가 (VAT 포함 금액, 원) *</label>
            <input
              type="text"
              inputMode="numeric"
              value={formatInput(totalPrice)}
              onChange={handleChange(setTotalPrice)}
              placeholder="예: 55,000,000"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
            />
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

          {result.mode === 'supply' ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">매출 공급가액</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.salesSupply!)}원</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">매출세액 (10%)</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.salesVat!)}원</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">매입 공급가액</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.purchaseSupply!)}원</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">매입세액 (10%)</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.purchaseVat!)}원</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-1">
                  {result.isRefund ? '환급세액' : '납부세액'}
                </p>
                <p className="text-2xl font-bold" style={{ color: result.isRefund ? '#3b82f6' : category.color }}>
                  {formatNumber(Math.abs(result.payableTax!))}원
                  {result.isRefund && <span className="text-sm ml-2 text-blue-600">(환급)</span>}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">공급대가 (VAT 포함)</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.supplyTotal!)}원</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">공급가액</p>
                  <p className="text-lg text-slate-900">{formatNumber(result.supplyBase!)}원</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-1">부가가치세</p>
                <p className="text-2xl font-bold" style={{ color: category.color }}>
                  {formatNumber(result.supplyVat!)}원
                </p>
              </div>
            </>
          )}

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {result.mode === 'supply'
                ? `공급가액 × 10% = 부가가치세

매출세액 = ${formatNumber(result.salesSupply!)}원 × 10% = ${formatNumber(result.salesVat!)}원
매입세액 = ${formatNumber(result.purchaseSupply!)}원 × 10% = ${formatNumber(result.purchaseVat!)}원
${result.isRefund ? '환급세액' : '납부세액'} = 매출세액 - 매입세액 = ${formatNumber(Math.abs(result.payableTax!))}원`
                : `총액 ÷ 1.1 = 공급가액

공급가액 = ${formatNumber(result.supplyTotal!)}원 ÷ 1.1 = ${formatNumber(result.supplyBase!)}원
부가가치세 = ${formatNumber(result.supplyTotal!)}원 - ${formatNumber(result.supplyBase!)}원 = ${formatNumber(result.supplyVat!)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 부가가치세법 제30조(세율 10%), 제38조(매입세액 공제) - 부가가치세의 세율은 10%이며, 매출세액에서 매입세액을 공제하여 납부세액을 산출합니다.
            </p>
          </div>
        </div>
      )}

      {result && (
        <ActionInsight
          calculatorId="vat"
          amount={result.mode === 'supply' ? Math.abs(result.payableTax!) : result.supplyVat!}
        />
      )}
    </CalculatorLayout>
  );
}
