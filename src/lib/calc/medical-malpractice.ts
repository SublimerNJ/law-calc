export interface MedicalPropertyDamageInput {
  treatmentCost: number;
  futureTreatmentCost: number;
  lostIncome: number;
  responsibilityRate: number;
}

export interface MedicalPropertyDamageResult {
  documentedDamage: number;
  allocatedDamage: number;
}

function nonNegativeFinite(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Calculates only the property-damage portion from user-entered evidence values.
 * It does not estimate consolation money, future-care costs, or a court outcome.
 */
export function calculateMedicalPropertyDamage({
  treatmentCost,
  futureTreatmentCost,
  lostIncome,
  responsibilityRate,
}: MedicalPropertyDamageInput): MedicalPropertyDamageResult {
  const documentedDamage =
    nonNegativeFinite(treatmentCost) +
    nonNegativeFinite(futureTreatmentCost) +
    nonNegativeFinite(lostIncome);
  const rate = Math.min(100, Math.max(0, nonNegativeFinite(responsibilityRate)));

  return {
    documentedDamage,
    allocatedDamage: Math.floor(documentedDamage * (rate / 100)),
  };
}
