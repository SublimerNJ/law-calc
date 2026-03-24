'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'rent-tax-credit')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseAmount(s: string): number {
  const v = parseInt(s.replace(/[^0-9]/g, ''), 10);
  return isNaN(v) ? 0 : v;
}

interface EligibilityItem {
  label: string;
  met: boolean;
  reason: string;
}

export default function RentTaxCreditPage() {
  const [annualGross, setAnnualGross] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [isHomeless, setIsHomeless] = useState(false);
  const [exceedsMarketValue, setExceedsMarketValue] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    eligible: boolean;
    items: EligibilityItem[];
    rate: number;
    annualRent: number;
    cappedRent: number;
    credit: number;
  } | null>(null);

  const handleCalculate = () => {
    setError(null);

    const gross = parseAmount(annualGross);
    const rent = parseAmount(monthlyRent);

    if (gross <= 0) {
      setError('연간 총급여를 입력해주세요.');
      setResult(null);
      return;
    }

    if (rent <= 0) {
      setError('월세 납부액을 입력해주세요.');
      setResult(null);
      return;
    }

    const items: EligibilityItem[] = [
      {
        label: '총급여 8,000만원 이하',
        met: gross > 0 && gross <= 80_000_000,
        reason: gross > 80_000_000 ? '총급여가 8,000만원을 초과합니다' : gross <= 0 ? '총급여를 입력해 주세요' : '충족',
      },
      {
        label: '무주택 세대주',
        met: isHomeless,
        reason: isHomeless ? '충족' : '무주택 세대주 확인이 필요합니다',
      },
      {
        label: '주택 기준시가 4억원 이하',
        met: !exceedsMarketValue,
        reason: exceedsMarketValue ? '기준시가 4억원 초과 주택은 공제 불가' : '충족',
      },
    ];

    const eligible = items.every(i => i.met) && rent > 0;

    let rate = 0;
    let annualRent = 0;
    let cappedRent = 0;
    let credit = 0;

    if (eligible) {
      // 조세특례제한법 제95조의2: 총급여 5,500만원 이하 17%, 5,500만원 초과~8,000만원 이하 15%
      rate = gross <= 55_000_000 ? 0.17 : 0.15;
      annualRent = rent * 12;
      cappedRent = Math.min(annualRent, 10_000_000);
      credit = Math.floor(cappedRent * rate);
    }

    setResult({ eligible, items, rate, annualRent, cappedRent, credit });
  };

  const inputClass = 'w-full px-3 py-2.5 bg-surface-50 border border-border-default rounded-lg text-slate-900 placeholder-gray-600 focus:outline-none focus:border-brand-primary text-sm';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-4">
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">기본 정보 입력</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1">연간 총급여 (원) *</label>
              <input type="text" className={inputClass} placeholder="예: 45,000,000" value={annualGross} onChange={e => setAnnualGross(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">월세 월 납부액 (원) *</label>
              <input type="text" className={inputClass} placeholder="예: 500,000" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isHomeless}
                onChange={e => setIsHomeless(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 bg-surface-50"
              />
              <span className="text-sm text-slate-600">무주택 세대주입니다</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={exceedsMarketValue}
                onChange={e => setExceedsMarketValue(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500 bg-surface-50"
              />
              <span className="text-sm text-slate-600">주택 기준시가 4억원 초과</span>
            </label>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-xl font-semibold text-slate-900 transition-all"
          style={{ backgroundColor: category.color }}
        >
          월세 세액공제 계산하기
        </button>

        {result && (
          <div className="premium-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">공제 요건 확인</h2>

            <div className="space-y-2">
              {result.items.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${item.met ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                  <span className={`text-lg ${item.met ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.met ? '\u2713' : '\u2717'}
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${item.met ? 'text-emerald-600' : 'text-red-600'}`}>{item.label}</p>
                    {!item.met && <p className="text-xs text-gray-500 mt-0.5">{item.reason}</p>}
                  </div>
                </div>
              ))}
            </div>

            {result.eligible ? (
              <>
                <hr className="border-white/10" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>적용 공제율</span>
                    <span className="text-slate-900">{(result.rate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>연간 월세액</span>
                    <span className="text-slate-900">{formatNumber(result.annualRent)}원</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>공제 대상 금액 (한도 1,000만원)</span>
                    <span className="text-slate-900">{formatNumber(result.cappedRent)}원</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <p className="text-sm text-slate-600 mb-1">예상 세액공제액</p>
                  <p className="text-3xl font-bold text-emerald-600">{formatNumber(result.credit)}원</p>
                </div>
              </>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-center">
                <p className="text-sm text-red-600">공제 요건을 충족하지 않아 세액공제를 받을 수 없습니다.</p>
              </div>
            )}

            <div className="mt-4 p-3 rounded-lg bg-surface-50 text-xs text-gray-500">
              <p className="font-semibold text-slate-600 mb-1">계산식</p>
              <pre className="font-mono text-slate-600 bg-white rounded p-2 mb-3 whitespace-pre-wrap">
{`min(월세 × 12, 1,000만원) × 공제율 = 세액공제액
(총급여 5,500만원 이하: 17%, 5,500만원 초과~8,000만원 이하: 15%)`}
              </pre>
              <p className="font-semibold text-slate-600 mb-1">법적 근거</p>
              <p>조세특례제한법 제95조의2 (월세액에 대한 세액공제). 2026년 기준. 실제 공제 결과와 다를 수 있으며, 참고용으로만 활용하시기 바랍니다.</p>
            </div>
          </div>
        )}

        {result && (
          <div className="premium-card p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">신청 시 필요 서류</h2>
            <div className="space-y-3">
              {[
                { step: '1', title: '임대차계약서 사본', desc: '임대인과 체결한 계약서 사본' },
                { step: '2', title: '월세 납입증명', desc: '계좌이체 내역 또는 현금영수증' },
                { step: '3', title: '주민등록등본', desc: '전입신고 확인용' },
                { step: '4', title: '신청시기', desc: '연말정산 시 회사에 제출 또는 5월 종합소득세 신고 시' },
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
            <p className="text-xs text-gray-500 mt-4">국세청 홈택스 (www.hometax.go.kr) | 문의: 국세청 (126)</p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
