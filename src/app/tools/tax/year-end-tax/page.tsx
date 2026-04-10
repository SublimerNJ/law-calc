'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';
import { ActionInsight } from '@/components/ui/ActionInsight';

const tool = TOOLS.find(t => t.id === 'year-end-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseAmount(s: string): number {
  const v = parseInt(s.replace(/[^0-9]/g, ''), 10);
  return isNaN(v) ? 0 : v;
}

/** 근로소득공제 (소득세법 제47조 제1항, 한도 2,000만원) */
function earnedIncomeDeduction(gross: number): number {
  let deduction: number;
  if (gross <= 5_000_000) deduction = gross * 0.7;
  else if (gross <= 15_000_000) deduction = 3_500_000 + (gross - 5_000_000) * 0.4;
  else if (gross <= 45_000_000) deduction = 7_500_000 + (gross - 15_000_000) * 0.15;
  else if (gross <= 100_000_000) deduction = 12_450_000 + (gross - 45_000_000) * 0.05;
  else deduction = 14_750_000 + (gross - 100_000_000) * 0.02;
  // 한도: 2,000만원 (소득세법 제47조 제1항 단서)
  return Math.min(deduction, 20_000_000);
}

/** 소득세 산출세액 (2026 누진세율) */
function incomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const brackets: [number, number][] = [
    [14_000_000, 0.06],
    [50_000_000, 0.15],
    [88_000_000, 0.24],
    [150_000_000, 0.35],
    [300_000_000, 0.38],
    [500_000_000, 0.40],
    [1_000_000_000, 0.42],
    [Infinity, 0.45],
  ];
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of brackets) {
    const chunk = Math.min(taxableIncome, limit) - prev;
    if (chunk <= 0) break;
    tax += chunk * rate;
    prev = limit;
  }
  return Math.floor(tax);
}

/**
 * 근로소득세액공제 (소득세법 제59조)
 * 한도는 총급여액 기준: 3,300만원 이하 74만원, 7,000만원 이하 66만원, 초과 50만원
 */
function earnedIncomeTaxCredit(computed: number, grossPay: number): number {
  if (computed <= 0) return 0;
  let credit: number;
  if (computed <= 1_300_000) {
    credit = computed * 0.55;
  } else {
    credit = 715_000 + (computed - 1_300_000) * 0.3;
  }
  // 한도 (총급여액 기준, 소득세법 제59조 제2항)
  if (grossPay <= 33_000_000) return Math.min(credit, 740_000);
  if (grossPay <= 70_000_000) return Math.min(credit, 660_000);
  return Math.min(credit, 500_000);
}

export default function YearEndTaxPage() {
  // 소득
  const [grossPay, setGrossPay] = useState('');
  const [withheldTax, setWithheldTax] = useState('');

  // 소득공제
  const [dependents, setDependents] = useState('1');
  const [creditCardUsage, setCreditCardUsage] = useState('');
  const [debitCardUsage, setDebitCardUsage] = useState('');
  const [pensionPaid, setPensionPaid] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');

  // 세액공제
  const [medicalExpense, setMedicalExpense] = useState('');
  const [educationExpense, setEducationExpense] = useState('');
  const [donation, setDonation] = useState('');
  const [rentPaid, setRentPaid] = useState('');
  const [childrenUnder20, setChildrenUnder20] = useState('0');

  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [result, setResult] = useState<{
    grossPay: number;
    earnedDeduction: number;
    earnedIncome: number;
    basicDeduction: number;
    cardDeduction: number;
    taxableIncome: number;
    computedTax: number;
    earnedCredit: number;
    childCredit: number;
    medicalCredit: number;
    educationCredit: number;
    donationCredit: number;
    rentCredit: number;
    totalCredit: number;
    finalTax: number;
    withheld: number;
    refund: number;
  } | null>(null);

  const handleCalculate = () => {
    setError(null);
    setWarning(null);

    const gross = parseAmount(grossPay);
    const withheld = parseAmount(withheldTax);

    if (gross <= 0) {
      setError('총급여액을 입력해주세요.');
      setResult(null);
      return;
    }

    if (gross > 500_000_000) {
      setWarning('총급여액이 5억원을 초과합니다. 입력값을 확인해주세요.');
    }

    const deps = parseInt(dependents, 10) || 1;
    const creditCard = parseAmount(creditCardUsage);
    const debitCard = parseAmount(debitCardUsage);
    const pension = parseAmount(pensionPaid);
    const health = parseAmount(healthInsurance);
    const medical = parseAmount(medicalExpense);
    const education = parseAmount(educationExpense);
    const don = parseAmount(donation);
    const rent = parseAmount(rentPaid);
    const children = parseInt(childrenUnder20, 10) || 0;

    // 근로소득공제
    const earnedDeduction = Math.floor(earnedIncomeDeduction(gross));
    const earnedIncome = gross - earnedDeduction;

    // 기본공제
    const basicDeduction = deps * 1_500_000;

    // 신용카드 소득공제
    const threshold = gross * 0.25;
    const totalCardUsage = creditCard + debitCard;
    let cardDeduction = 0;
    if (totalCardUsage > threshold) {
      const excess = totalCardUsage - threshold;
      // 비율 적용: 신용카드 15%, 체크카드/현금 30%
      const creditCardExcess = Math.min(creditCard, excess) * 0.15;
      const remainExcess = Math.max(0, excess - creditCard);
      const debitExcess = Math.min(debitCard, remainExcess) * 0.3;
      cardDeduction = Math.floor(creditCardExcess + debitExcess);
      // 한도
      let limit: number;
      if (gross <= 70_000_000) limit = 3_000_000;
      else if (gross <= 120_000_000) limit = 2_500_000;
      else limit = 2_000_000;
      cardDeduction = Math.min(cardDeduction, limit);
    }

    // 과세표준
    const taxableIncome = Math.max(0, earnedIncome - basicDeduction - cardDeduction - pension - health);

    // 산출세액
    const computedTax = incomeTax(taxableIncome);

    // 세액공제들
    const earnedCredit = earnedIncomeTaxCredit(computedTax, gross);

    let childCredit = 0;
    if (children === 1) childCredit = 250_000;
    else if (children === 2) childCredit = 550_000;
    else if (children >= 3) childCredit = 550_000 + (children - 2) * 400_000;

    // 의료비세액공제: 총급여 3% 초과분의 15%, 일반의료비 한도 700만원 (소득세법 제59조의4 제2항)
    const medicalOver = medical - gross * 0.03;
    const medicalCredit = medicalOver > 0 ? Math.min(Math.floor(medicalOver * 0.15), 700_000) : 0;

    const educationCredit = Math.floor(education * 0.15);

    let donationCredit = 0;
    if (don <= 10_000_000) {
      donationCredit = Math.floor(don * 0.15);
    } else {
      donationCredit = Math.floor(10_000_000 * 0.15 + (don - 10_000_000) * 0.3);
    }

    let rentCredit = 0;
    if (gross <= 80_000_000 && rent > 0) {
      const annualRent = rent * 12;
      const cappedRent = Math.min(annualRent, 10_000_000);
      const rate = gross <= 55_000_000 ? 0.17 : 0.15;
      rentCredit = Math.floor(cappedRent * rate);
    }

    const totalCredit = earnedCredit + childCredit + medicalCredit + educationCredit + donationCredit + rentCredit;
    const finalTax = Math.max(0, computedTax - totalCredit);
    const refund = withheld - finalTax;

    setResult({
      grossPay: gross,
      earnedDeduction,
      earnedIncome,
      basicDeduction,
      cardDeduction,
      taxableIncome,
      computedTax,
      earnedCredit,
      childCredit,
      medicalCredit,
      educationCredit,
      donationCredit,
      rentCredit,
      totalCredit,
      finalTax,
      withheld,
      refund,
    });
  };

  const inputClass = 'w-full px-3 py-2.5 bg-surface-50 border border-border-default rounded-lg text-slate-900 placeholder-gray-600 focus:outline-none focus:border-brand-primary text-sm';
  const labelClass = 'block text-sm text-slate-600 mb-1';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-4">
        {/* 소득 */}
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">1. 소득 정보</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>총급여액 (원) *</label>
              <input type="text" className={inputClass} placeholder="예: 50,000,000" value={grossPay} onChange={e => setGrossPay(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>기납부 원천징수세액 (원)</label>
              <input type="text" className={inputClass} placeholder="예: 2,000,000" value={withheldTax} onChange={e => setWithheldTax(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
          </div>
        </div>

        {/* 소득공제 */}
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">2. 소득공제 항목</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>부양가족 수 (본인 포함)</label>
              <input type="text" inputMode="numeric" className={inputClass} value={dependents} onChange={e => setDependents(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>신용카드 사용액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={creditCardUsage} onChange={e => setCreditCardUsage(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>체크카드/현금영수증 사용액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={debitCardUsage} onChange={e => setDebitCardUsage(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>국민연금 납입액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={pensionPaid} onChange={e => setPensionPaid(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>건강보험료 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={healthInsurance} onChange={e => setHealthInsurance(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
          </div>
        </div>

        {/* 세액공제 */}
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">3. 세액공제 항목</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>의료비 지출액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={medicalExpense} onChange={e => setMedicalExpense(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>교육비 지출액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={educationExpense} onChange={e => setEducationExpense(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>기부금 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={donation} onChange={e => setDonation(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>월세 납부액 (월, 원)</label>
              <input type="text" className={inputClass} placeholder="0" value={rentPaid} onChange={e => setRentPaid(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
            <div>
              <label className={labelClass}>20세 이하 자녀 수</label>
              <input type="text" inputMode="numeric" className={inputClass} value={childrenUnder20} onChange={e => setChildrenUnder20(e.target.value.replace(/[^0-9]/g, ''))} />
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {warning && <p className="text-orange-500 text-sm mb-3">{warning}</p>}

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-xl font-semibold text-slate-900 transition-all"
          style={{ backgroundColor: category.color }}
        >
          연말정산 계산하기
        </button>

        {result && (
          <div className="premium-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">계산 결과</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>총급여액</span>
                <span className="text-slate-900">{formatNumber(result.grossPay)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 근로소득공제</span>
                <span className="text-slate-900">{formatNumber(result.earnedDeduction)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>근로소득금액</span>
                <span className="text-slate-900">{formatNumber(result.earnedIncome)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between text-slate-600">
                <span>(-) 기본공제</span>
                <span className="text-slate-900">{formatNumber(result.basicDeduction)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 신용카드 소득공제</span>
                <span className="text-slate-900">{formatNumber(result.cardDeduction)}원</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-600">
                <span>과세표준</span>
                <span className="text-slate-900">{formatNumber(result.taxableIncome)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between font-semibold text-slate-600">
                <span>산출세액</span>
                <span className="text-slate-900">{formatNumber(result.computedTax)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between text-slate-600">
                <span>(-) 근로소득세액공제</span>
                <span className="text-slate-900">{formatNumber(result.earnedCredit)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 자녀세액공제</span>
                <span className="text-slate-900">{formatNumber(result.childCredit)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 의료비세액공제</span>
                <span className="text-slate-900">{formatNumber(result.medicalCredit)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 교육비세액공제</span>
                <span className="text-slate-900">{formatNumber(result.educationCredit)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 기부금세액공제</span>
                <span className="text-slate-900">{formatNumber(result.donationCredit)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) 월세세액공제</span>
                <span className="text-slate-900">{formatNumber(result.rentCredit)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>세액공제 합계</span>
                <span className="text-slate-900">{formatNumber(result.totalCredit)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between font-semibold text-slate-600">
                <span>결정세액</span>
                <span className="text-slate-900">{formatNumber(result.finalTax)}원</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>기납부세액 (원천징수)</span>
                <span className="text-slate-900">{formatNumber(result.withheld)}원</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl text-center ${result.refund >= 0 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <p className="text-sm text-slate-600 mb-1">
                {result.refund >= 0 ? '예상 환급액' : '추가 납부액'}
              </p>
              <p className={`text-3xl font-bold ${result.refund >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {result.refund >= 0 ? '+' : ''}{formatNumber(result.refund)}원
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-2">계산식</p>
              <pre className="text-xs text-slate-600 bg-white p-3 rounded-lg whitespace-pre-wrap font-mono">
                {`총급여액            ${formatNumber(result.grossPay)}원
(-) 근로소득공제    ${formatNumber(result.earnedDeduction)}원
= 근로소득금액      ${formatNumber(result.earnedIncome)}원
(-) 기본공제        ${formatNumber(result.basicDeduction)}원
(-) 카드소득공제    ${formatNumber(result.cardDeduction)}원
────────────────────────────────
과세표준            ${formatNumber(result.taxableIncome)}원
= 산출세액          ${formatNumber(result.computedTax)}원
(-) 세액공제 합계   ${formatNumber(result.totalCredit)}원
    근로소득세액공제 ${formatNumber(result.earnedCredit)}원
    자녀세액공제    ${formatNumber(result.childCredit)}원
    의료비세액공제  ${formatNumber(result.medicalCredit)}원
    교육비세액공제  ${formatNumber(result.educationCredit)}원
    기부금세액공제  ${formatNumber(result.donationCredit)}원
    월세세액공제    ${formatNumber(result.rentCredit)}원
────────────────────────────────
결정세액            ${formatNumber(result.finalTax)}원
(-) 기납부세액      ${formatNumber(result.withheld)}원
= 환급/추가납부     ${result.refund >= 0 ? '+' : ''}${formatNumber(result.refund)}원`}
              </pre>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-surface-50 text-xs text-gray-500">
              <p className="font-semibold text-slate-600 mb-1">법적 근거</p>
              <p>소득세법 제47조(근로소득공제), 제50조(기본공제), 제55조(세율), 제59조(근로소득세액공제), 제59조의2(자녀세액공제), 제59조의4(의료비·교육비·월세세액공제), 제137조~제140조(연말정산). 2026년 기준. 참고용으로만 활용하시기 바랍니다.</p>
            </div>
          </div>
        )}

        {result && (
          <ActionInsight calculatorId="year-end-tax" amount={Math.abs(result.finalTax)} />
        )}

        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">환급 극대화 팁</h2>
          <ul className="space-y-3">
            {[
              { num: '1', text: '신용카드/체크카드 사용비율 최적화 (체크카드 공제율 30% > 신용 15%)' },
              { num: '2', text: '의료비/교육비 영수증 빠짐없이 수집' },
              { num: '3', text: '월세 세액공제 놓치지 않기' },
              { num: '4', text: 'IRP/연금저축 세액공제 활용 (최대 900만원 한도)' },
            ].map(item => (
              <li key={item.num} className="flex items-start gap-3">
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-slate-900"
                  style={{ backgroundColor: category.color }}
                >
                  {item.num}
                </span>
                <span className="text-sm text-slate-600">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
