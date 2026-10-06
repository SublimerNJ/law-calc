export interface GeneralDamagesInput {
  documentedDamage: number;
  faultRatio: number;
}

export interface GeneralDamagesResult {
  documentedDamage: number;
  faultReduction: number;
  adjustedDamage: number;
}

function nonNegativeFinite(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Applies the entered fault ratio to documented property damage only.
 * It does not estimate consolation money, lost income, or a court outcome.
 */
export function calculateGeneralDamages({
  documentedDamage,
  faultRatio,
}: GeneralDamagesInput): GeneralDamagesResult {
  const normalizedDamage = nonNegativeFinite(documentedDamage);
  const normalizedFaultRatio = Math.min(100, nonNegativeFinite(faultRatio));
  const adjustedDamage = Math.floor(
    normalizedDamage * (1 - normalizedFaultRatio / 100),
  );

  return {
    documentedDamage: normalizedDamage,
    faultReduction: normalizedDamage - adjustedDamage,
    adjustedDamage,
  };
}
