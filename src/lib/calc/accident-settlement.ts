export interface AccidentInsuranceLimitInput {
  documentedDamage: number;
  injuryGrade: number;
  disabilityGrade: number;
}

export interface AccidentInsuranceLimitResult {
  documentedDamage: number;
  injuryLimit: number;
  disabilityLimit: number;
  totalLimit: number;
  payableWithinLiabilityLimit: number;
  excessDamage: number;
}

// 자동차손해배상 보장법 시행령 [별표 1]의 상해급별 한도금액.
const INJURY_LIMITS: Record<number, number> = {
  1: 30_000_000,
  2: 15_000_000,
  3: 12_000_000,
  4: 10_000_000,
  5: 9_000_000,
  6: 7_000_000,
  7: 5_000_000,
  8: 3_000_000,
  9: 2_400_000,
  10: 2_000_000,
  11: 1_600_000,
  12: 1_200_000,
  13: 800_000,
  14: 500_000,
};

// 자동차손해배상 보장법 시행령 [별표 2]의 후유장애급별 한도금액.
const DISABILITY_LIMITS: Record<number, number> = {
  1: 150_000_000,
  2: 135_000_000,
  3: 120_000_000,
  4: 105_000_000,
  5: 90_000_000,
  6: 75_000_000,
  7: 60_000_000,
  8: 45_000_000,
  9: 38_000_000,
  10: 27_000_000,
  11: 23_000_000,
  12: 19_000_000,
  13: 15_000_000,
  14: 10_000_000,
};

function nonNegativeFinite(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function limitForGrade(table: Record<number, number>, grade: number): number {
  return Number.isInteger(grade) && grade >= 1 && grade <= 14 ? table[grade] : 0;
}

/**
 * Calculates only the statutory 대인배상Ⅰ limit reference.
 * It does not estimate a settlement, solatium, lost income, or a fault ratio.
 */
export function calculateAccidentInsuranceLimit({
  documentedDamage,
  injuryGrade,
  disabilityGrade,
}: AccidentInsuranceLimitInput): AccidentInsuranceLimitResult {
  const normalizedDamage = nonNegativeFinite(documentedDamage);
  const injuryLimit = limitForGrade(INJURY_LIMITS, injuryGrade);
  const disabilityLimit = limitForGrade(DISABILITY_LIMITS, disabilityGrade);
  const totalLimit = injuryLimit + disabilityLimit;
  const payableWithinLiabilityLimit = Math.min(normalizedDamage, totalLimit);

  return {
    documentedDamage: normalizedDamage,
    injuryLimit,
    disabilityLimit,
    totalLimit,
    payableWithinLiabilityLimit,
    excessDamage: Math.max(0, normalizedDamage - totalLimit),
  };
}
