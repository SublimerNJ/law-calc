export type LicenseRegion = 'metro' | 'city' | 'county';
export type LicenseGrade = 1 | 2 | 3 | 4 | 5;

export type RegistrationTaxInput =
  | { kind: 'real-estate-mortgage'; taxBase: number }
  | { kind: 'license'; region: LicenseRegion; grade: LicenseGrade }
  | { kind: 'corporation-capital'; taxBase: number; metropolitanHeavy: boolean }
  | { kind: 'corporation-branch'; metropolitanHeavy?: boolean };

export interface RegistrationTaxResult {
  kind: RegistrationTaxInput['kind'];
  taxBase: number;
  ratePercent: number | null;
  registrationTax: number;
  educationTax: number;
  totalTax: number;
  minimumApplied: boolean;
}

function normalizeAmount(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export const LICENSE_TAX_RATES: Record<LicenseRegion, Record<LicenseGrade, number>> = {
  metro: { 1: 67_500, 2: 54_000, 3: 40_500, 4: 27_000, 5: 18_000 },
  city: { 1: 45_000, 2: 34_000, 3: 22_500, 4: 15_000, 5: 7_500 },
  county: { 1: 27_000, 2: 18_000, 3: 12_000, 4: 9_000, 5: 4_500 },
};

/** Calculates registration-based cases and fixed license fees covered by the form. */
export function calculateRegistrationTax(
  input: RegistrationTaxInput,
): RegistrationTaxResult {
  if (input.kind === 'license') {
    const registrationTax = LICENSE_TAX_RATES[input.region][input.grade];

    return {
      kind: input.kind,
      taxBase: 0,
      ratePercent: null,
      registrationTax,
      educationTax: 0,
      totalTax: registrationTax,
      minimumApplied: false,
    };
  }

  if (input.kind === 'corporation-branch') {
    const registrationTax = 40_200 * (input.metropolitanHeavy ? 3 : 1);
    const educationTax = Math.floor(registrationTax * 0.2);

    return {
      kind: input.kind,
      taxBase: 0,
      ratePercent: null,
      registrationTax,
      educationTax,
      totalTax: registrationTax + educationTax,
      minimumApplied: false,
    };
  }

  if (input.kind === 'corporation-capital') {
    const taxBase = normalizeAmount(input.taxBase);
    const calculatedTax = Math.floor(taxBase * 0.004);
    const minimumApplied = taxBase > 0 && calculatedTax < 112_500;
    const baseTax = taxBase > 0 ? Math.max(calculatedTax, 112_500) : 0;
    const multiplier = input.metropolitanHeavy ? 3 : 1;
    const registrationTax = baseTax * multiplier;
    const educationTax = Math.floor(registrationTax * 0.2);

    return {
      kind: input.kind,
      taxBase,
      ratePercent: input.metropolitanHeavy ? 1.2 : 0.4,
      registrationTax,
      educationTax,
      totalTax: registrationTax + educationTax,
      minimumApplied,
    };
  }

  const taxBase = normalizeAmount(input.taxBase);
  const registrationTax = Math.floor(taxBase * 0.002);
  const educationTax = Math.floor(registrationTax * 0.2);

  return {
    kind: input.kind,
    taxBase,
    ratePercent: 0.2,
    registrationTax,
    educationTax,
    totalTax: registrationTax + educationTax,
    minimumApplied: false,
  };
}
