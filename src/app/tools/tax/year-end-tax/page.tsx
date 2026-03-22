'use client';

import { useState } from 'react';
import CalculatorLayout from '@/components/ui/CalculatorLayout';
import { TOOLS, CATEGORIES } from '@/lib/tools-data';

const tool = TOOLS.find(t => t.id === 'year-end-tax')!;
const category = CATEGORIES.find(c => c.id === 'tax')!;

function formatNumber(n: number): string {
  return n.toLocaleString('ko-KR');
}

function parseAmount(s: string): number {
  const v = parseInt(s.replace(/[^0-9]/g, ''), 10);
  return isNaN(v) ? 0 : v;
}

/** 근로소득공제 */
function earnedIncomeDeduction(gross: number): number {
  if (gross <= 5_000_000) return gross * 0.7;
  if (gross <= 15_000_000) return 3_500_000 + (gross - 5_000_000) * 0.4;
  if (gross <= 45_000_000) return 7_500_000 + (gross - 15_000_000) * 0.15;
  if (gross <= 100_000_000) return 12_450_000 + (gross - 45_000_000) * 0.05;
  return 14_750_000 + (gross - 100_000_000) * 0.02;
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

/** 근로소득세액공제 */
function earnedIncomeTaxCredit(computed: number): number {
  if (computed <= 0) return 0;
  let credit: number;
  if (computed <= 1_300_000) {
    credit = computed * 0.55;
  } else {
    credit = 715_000 + (computed - 1_300_000) * 0.3;
  }
  // 한도
  if (computed <= 33_000_000) return Math.min(credit, 740_000);
  if (computed <= 70_000_000) return Math.min(credit, 660_000);
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
    const gross = parseAmount(grossPay);
    const withheld = parseAmount(withheldTax);
    if (gross <= 0) return;

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
    const earnedCredit = earnedIncomeTaxCredit(computedTax);

    let childCredit = 0;
    if (children === 1) childCredit = 150_000;
    else if (children === 2) childCredit = 350_000;
    else if (children >= 3) childCredit = 650_000 + (children - 3) * 300_000;

    const medicalOver = medical - gross * 0.03;
    const medicalCredit = medicalOver > 0 ? Math.floor(medicalOver * 0.15) : 0;

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
      const rate = gross <= 55_000_000 ? 0.2 : 0.17;
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

  const inputClass = 'w-full px-3 py-2.5 bg-surface-50 border border-border-default rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-brand-primary text-sm';
  const labelClass = 'block text-sm text-gray-400 mb-1';

  return (
    <CalculatorLayout tool={tool} category={category}>
      <div className="space-y-4">
        {/* 소득 */}
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">1. 소득 정보</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>총급여액 (원)</label>
              <input type="text" className={inputClass} placeholder="예: 50,000,000" value={grossPay} onChange={e => setGrossPay(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>기납부 원천징수세액 (원)</label>
              <input type="text" className={inputClass} placeholder="예: 2,000,000" value={withheldTax} onChange={e => setWithheldTax(e.target.value)} />
            </div>
          </div>
        </div>

        {/* 소득공제 */}
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">2. 소득공제 항목</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>부양가족 수 (본인 포함)</label>
              <input type="number" min="1" className={inputClass} value={dependents} onChange={e => setDependents(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>신용카드 사용액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={creditCardUsage} onChange={e => setCreditCardUsage(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>체크카드/현금영수증 사용액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={debitCardUsage} onChange={e => setDebitCardUsage(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>국민연금 납입액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={pensionPaid} onChange={e => setPensionPaid(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>건강보험료 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={healthInsurance} onChange={e => setHealthInsurance(e.target.value)} />
            </div>
          </div>
        </div>

        {/* 세액공제 */}
        <div className="premium-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">3. 세액공제 항목</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>의료비 지출액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={medicalExpense} onChange={e => setMedicalExpense(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>교육비 지출액 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={educationExpense} onChange={e => setEducationExpense(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>기부금 (원)</label>
              <input type="text" className={inputClass} placeholder="0" value={donation} onChange={e => setDonation(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>월세 납부액 (월, 원)</label>
              <input type="text" className={inputClass} placeholder="0" value={rentPaid} onChange={e => setRentPaid(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>20세 이하 자녀 수</label>
              <input type="number" min="0" className={inputClass} value={childrenUnder20} onChange={e => setChildrenUnder20(e.target.value)} />
            </div>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-xl font-semibold text-white transition-all"
          style={{ backgroundColor: category.color }}
        >
          연말정산 계산하기
        </button>

        {result && (
          <div className="premium-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white">계산 결과</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>총급여액</span>
                <span className="text-white">{formatNumber(result.grossPay)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 근로소득공제</span>
                <span className="text-white">{formatNumber(result.earnedDeduction)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>근로소득금액</span>
                <span className="text-white">{formatNumber(result.earnedIncome)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between text-gray-400">
                <span>(-) 기본공제</span>
                <span className="text-white">{formatNumber(result.basicDeduction)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 신용카드 소득공제</span>
                <span className="text-white">{formatNumber(result.cardDeduction)}원</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-300">
                <span>과세표준</span>
                <span className="text-white">{formatNumber(result.taxableIncome)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between font-semibold text-gray-300">
                <span>산출세액</span>
                <span className="text-white">{formatNumber(result.computedTax)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between text-gray-400">
                <span>(-) 근로소득세액공제</span>
                <span className="text-white">{formatNumber(result.earnedCredit)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 자녀세액공제</span>
                <span className="text-white">{formatNumber(result.childCredit)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 의료비세액공제</span>
                <span className="text-white">{formatNumber(result.medicalCredit)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 교육비세액공제</span>
                <span className="text-white">{formatNumber(result.educationCredit)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 기부금세액공제</span>
                <span className="text-white">{formatNumber(result.donationCredit)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>(-) 월세세액공제</span>
                <span className="text-white">{formatNumber(result.rentCredit)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>세액공제 합계</span>
                <span className="text-white">{formatNumber(result.totalCredit)}원</span>
              </div>
              <hr className="border-white/10" />
              <div className="flex justify-between font-semibold text-gray-300">
                <span>결정세액</span>
                <span className="text-white">{formatNumber(result.finalTax)}원</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>기납부세액 (원천징수)</span>
                <span className="text-white">{formatNumber(result.withheld)}원</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl text-center ${result.refund >= 0 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <p className="text-sm text-gray-400 mb-1">
                {result.refund >= 0 ? '예상 환급액' : '추가 납부액'}
              </p>
              <p className={`text-3xl font-bold ${result.refund >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {result.refund >= 0 ? '+' : ''}{formatNumber(result.refund)}원
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">계산식</p>
              <pre className="text-xs text-gray-300 bg-[#0d1424] p-3 rounded-lg whitespace-pre-wrap font-mono">
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
              <p className="font-semibold text-gray-400 mb-1">법적 근거</p>
              <p>소득세법 제137조~제140조 (연말정산). 2026년 기준 세율 및 공제율 적용. 실제 연말정산 결과와 다를 수 있으며, 참고용으로만 활용하시기 바랍니다.</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
