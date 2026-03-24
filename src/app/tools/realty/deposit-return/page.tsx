'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'deposit-return')!;
const category = CATEGORIES.find(c => c.id === 'realty')!;

interface Result {
  deposit: number;
  interest: number;
  total: number;
}

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

export default function DepositReturnPage() {
  const [deposit, setDeposit] = useState('');
  const [days, setDays] = useState('');
  const [rate, setRate] = useState('5');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setDeposit(raw);
  };

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const depositVal = parseInt(deposit, 10);
    const daysVal = parseInt(days, 10);
    const rateVal = parseFloat(rate);

    if (!deposit || isNaN(depositVal) || depositVal <= 0) {
      setError('보증금을 입력해주세요.');
      setResult(null);
      return;
    }
    if (!days || isNaN(daysVal) || daysVal <= 0) {
      setError('반환 지연일수를 입력해주세요.');
      setResult(null);
      return;
    }
    if (!rate || isNaN(rateVal) || rateVal <= 0) {
      setError('연체이자율을 입력해주세요.');
      setResult(null);
      return;
    }

    if (depositVal > 10_000_000_000) {
      setWarning('보증금이 100억원을 초과합니다. 입력값을 확인해주세요.');
    }

    const interest = Math.floor(depositVal * (rateVal / 100) * (daysVal / 365));
    setResult({
      deposit: depositVal,
      interest,
      total: depositVal + interest,
    });
  };

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="premium-card p-6 mb-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">계산 정보 입력</h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">보증금 (원) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={deposit ? parseInt(deposit).toLocaleString('ko-KR') : ''}
            onChange={handleDepositChange}
            placeholder="예: 100,000,000"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          {deposit && (
            <p className="text-xs text-gray-500 mt-1">
              {parseInt(deposit).toLocaleString('ko-KR')}원
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-600 mb-2">반환 지연일수 (일) *</label>
          <input
            type="text"
            inputMode="numeric"
            value={days}
            onChange={e => setDays(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="예: 30"
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-slate-600 mb-2">연체이자율 (%) *</label>
          <input
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={e => setRate(e.target.value.replace(/[^0-9.]/g, ''))}
            className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">민법 제379조 법정이율: 연 5% (보증금 미반환 시)</p>
        </div>

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

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">보증금 원금</p>
            <p className="text-lg text-slate-900">{formatNumber(result.deposit)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">지연이자</p>
            <p className="text-lg text-slate-900">{formatNumber(result.interest)}원</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-1">합계 반환액</p>
            <p className="text-2xl font-bold" style={{ color: category.color }}>
              {formatNumber(result.total)}원
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">계산식</p>
            <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
              {`보증금 반환 계산 (지연이자 포함)

지연이자 = 보증금 × 연체이자율(%) ÷ 100 × 지연일수 ÷ 365
합계 반환액 = 보증금 원금 + 지연이자

예시) 보증금 ${formatNumber(result.deposit)}원 × ${rate}% × ${days}일 ÷ 365
      = 지연이자 ${formatNumber(result.interest)}원
      = 합계 ${formatNumber(result.total)}원`}
            </pre>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500">
              법적 근거: 주택임대차보호법 제3조(대항력), 제3조의2(우선변제권) | 지연이자: 민법 제379조(법정이율 연 5%)
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">보증금 미반환 시 대응 절차</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '내용증명 발송', desc: '반환 요구 내용증명 우편 발송 (우체국)' },
              { step: '2', title: '임차권등기명령', desc: '법원에 신청, 이사 후에도 대항력 유지 (비용 약 3~5만원)' },
              { step: '3', title: '지급명령 신청', desc: '법원 독촉절차, 인지대 소송의 1/10 (2주 내 이의 없으면 확정)' },
              { step: '4', title: '민사소송', desc: '지급명령 이의 시 소송 전환, 보증금 + 지연이자 청구' },
              { step: '5', title: '강제집행', desc: '판결 확정 후 부동산 경매 또는 채권 압류' },
            ].map(item => (
              <div key={item.step} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: category.color, color: '#fff' }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-600">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-white border border-slate-200">
            <p className="text-xs text-slate-600">
              💡 <strong className="text-slate-600">전세보증금반환보증보험</strong>(HUG/SGI)에 가입한 경우, 보증기관에 직접 보증금을 청구할 수 있습니다.
            </p>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
