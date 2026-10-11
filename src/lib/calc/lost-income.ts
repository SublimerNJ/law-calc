export type DiscountMethod = 'hoffman' | 'leibniz';

export interface LostIncomeInput {
  age: number;
  monthlyIncome: number;
  retirementAge: number;
  treatmentMonths: number;
  disabilityRate: number;
  faultRate: number;
  method: DiscountMethod;
}

export interface LostIncomeResult {
  method: DiscountMethod;
  remainingMonths: number;
  treatmentMonths: number;
  residualDisabilityMonths: number;
  monthlyNetIncome: number;
  totalCoefficient: number;
  treatmentCoefficient: number;
  residualDisabilityCoefficient: number;
  treatmentLossBeforeFault: number;
  disabilityLossBeforeFault: number;
  lostIncomeBeforeFault: number;
  lostIncomeAfterFault: number;
  disabilityRate: number;
  faultRate: number;
  livingExpenseDeduction: number;
}

const ANNUAL_DISCOUNT_RATE = 0.05;
const MONTHLY_DISCOUNT_RATE = ANNUAL_DISCOUNT_RATE / 12;
const LIVING_EXPENSE_DEDUCTION = 1 / 3;
const HOFFMAN_COEFFICIENT_CAP = 240;

function nonNegativeFinite(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function wholeNonNegative(value: number): number {
  return Math.floor(nonNegativeFinite(value));
}

function boundedPercentage(value: number): number {
  return Math.min(100, nonNegativeFinite(value));
}

/**
 * Returns the present-value coefficient for monthly payments beginning one
 * month after the reference date. Korean court calculations commonly use
 * monthly Hoffman (simple) discounting; Leibniz uses monthly compound
 * discounting. The Hoffman coefficient is capped at 240 under Supreme Court
 * precedent when the uncapped table value exceeds 240.
 */
export function calculatePresentValueCoefficient(
  months: number,
  method: DiscountMethod,
): number {
  const normalizedMonths = wholeNonNegative(months);
  if (normalizedMonths === 0) {
    return 0;
  }

  let coefficient = 0;
  for (let month = 1; month <= normalizedMonths; month += 1) {
    coefficient += method === 'leibniz'
      ? 1 / (1 + MONTHLY_DISCOUNT_RATE) ** month
      : 1 / (1 + MONTHLY_DISCOUNT_RATE * month);
  }

  return method === 'hoffman'
    ? Math.min(coefficient, HOFFMAN_COEFFICIENT_CAP)
    : coefficient;
}

/**
 * Calculates only the income-loss components that can be tied to entered
 * income, work incapacity, residual disability and an entered fault ratio.
 * It does not estimate consolation money, medical costs, or a court outcome.
 */
export function calculateLostIncome(input: LostIncomeInput): LostIncomeResult {
  const method: DiscountMethod = input.method === 'leibniz' ? 'leibniz' : 'hoffman';
  const age = wholeNonNegative(input.age);
  const retirementAge = wholeNonNegative(input.retirementAge);
  const monthlyIncome = nonNegativeFinite(input.monthlyIncome);
  const disabilityRate = boundedPercentage(input.disabilityRate);
  const faultRate = boundedPercentage(input.faultRate);
  const potentialMonths = age > 0 && retirementAge > age
    ? (retirementAge - age) * 12
    : 0;
  const treatmentMonths = Math.min(
    wholeNonNegative(input.treatmentMonths),
    potentialMonths,
  );
  const residualDisabilityMonths = potentialMonths - treatmentMonths;
  const monthlyNetIncome = potentialMonths > 0
    ? Math.floor(monthlyIncome * (1 - LIVING_EXPENSE_DEDUCTION))
    : 0;

  const totalCoefficient = calculatePresentValueCoefficient(potentialMonths, method);
  const treatmentCoefficient = calculatePresentValueCoefficient(treatmentMonths, method);
  const residualDisabilityCoefficient = Math.max(
    0,
    totalCoefficient - treatmentCoefficient,
  );
  const treatmentLossBeforeFault = Math.floor(
    monthlyNetIncome * treatmentCoefficient,
  );
  const disabilityLossBeforeFault = Math.floor(
    monthlyNetIncome * (disabilityRate / 100) * residualDisabilityCoefficient,
  );
  const lostIncomeBeforeFault = treatmentLossBeforeFault + disabilityLossBeforeFault;
  const lostIncomeAfterFault = Math.floor(
    lostIncomeBeforeFault * (1 - faultRate / 100),
  );

  return {
    method,
    remainingMonths: potentialMonths,
    treatmentMonths,
    residualDisabilityMonths,
    monthlyNetIncome,
    totalCoefficient,
    treatmentCoefficient,
    residualDisabilityCoefficient,
    treatmentLossBeforeFault,
    disabilityLossBeforeFault,
    lostIncomeBeforeFault,
    lostIncomeAfterFault,
    disabilityRate,
    faultRate,
    livingExpenseDeduction: LIVING_EXPENSE_DEDUCTION,
  };
}
