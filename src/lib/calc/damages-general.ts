export interface GeneralDamagesInput {
  treatmentCost: number;
  repairCost: number;
  lostIncome: number;
  otherPropertyDamage: number;
  faultRatio: number;
}

export interface GeneralDamagesResult {
  treatmentCost: number;
  repairCost: number;
  lostIncome: number;
  otherPropertyDamage: number;
  documentedDamage: number;
  faultRatio: number;
  faultReduction: number;
  adjustedDamage: number;
}

export interface GeneralDamagesVerificationExample {
  input: GeneralDamagesInput;
  result: GeneralDamagesResult;
}

// The displayed example is intentionally kept beside the calculation so the
// page cannot drift from the function used by the form.
export const GENERAL_DAMAGES_VERIFICATION_INPUT: GeneralDamagesInput = {
  treatmentCost: 1_500_000,
  repairCost: 2_000_000,
  lostIncome: 3_000_000,
  otherPropertyDamage: 500_000,
  faultRatio: 20,
};

function wholeNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function boundedPercentage(value: number): number {
  return Number.isFinite(value) && value > 0
    ? Math.min(100, value)
    : 0;
}

/**
 * Sums only documented property-loss categories and applies the entered fault
 * ratio. It does not estimate consolation money, disability care, causation,
 * or a court outcome.
 */
export function calculateGeneralDamages({
  treatmentCost,
  repairCost,
  lostIncome,
  otherPropertyDamage,
  faultRatio,
}: GeneralDamagesInput): GeneralDamagesResult {
  const normalizedTreatmentCost = wholeNonNegative(treatmentCost);
  const normalizedRepairCost = wholeNonNegative(repairCost);
  const normalizedLostIncome = wholeNonNegative(lostIncome);
  const normalizedOtherPropertyDamage = wholeNonNegative(otherPropertyDamage);
  const normalizedFaultRatio = boundedPercentage(faultRatio);
  const documentedDamage =
    normalizedTreatmentCost
    + normalizedRepairCost
    + normalizedLostIncome
    + normalizedOtherPropertyDamage;
  const adjustedDamage = Math.floor(
    documentedDamage * (1 - normalizedFaultRatio / 100),
  );

  return {
    treatmentCost: normalizedTreatmentCost,
    repairCost: normalizedRepairCost,
    lostIncome: normalizedLostIncome,
    otherPropertyDamage: normalizedOtherPropertyDamage,
    documentedDamage,
    faultRatio: normalizedFaultRatio,
    faultReduction: documentedDamage - adjustedDamage,
    adjustedDamage,
  };
}

export function calculateGeneralDamagesVerificationExample(): GeneralDamagesVerificationExample {
  return {
    input: GENERAL_DAMAGES_VERIFICATION_INPUT,
    result: calculateGeneralDamages(GENERAL_DAMAGES_VERIFICATION_INPUT),
  };
}
