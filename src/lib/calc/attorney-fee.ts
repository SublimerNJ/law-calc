export type AttorneyFeeCaseType = 'main' | 'preservation';
export type AttorneyFeeReduction = 'none' | 'half';

export interface AttorneyFeeBracket {
  max: number;
  label: string;
  rate: number;
  base: number;
  previousMax: number;
  formula: string;
}

export interface AttorneyFeeInput {
  litigationValue: number;
  actualFee: number | null;
  caseType: AttorneyFeeCaseType;
  preservationHadHearing?: boolean;
  reduction: AttorneyFeeReduction;
  burdenSharePct: number | null;
}

export interface AttorneyFeeResult {
  litigationValue: number;
  actualFee: number | null;
  caseType: AttorneyFeeCaseType;
  preservationHadHearing: boolean;
  reduction: AttorneyFeeReduction;
  bracketIndex: number;
  baseLimit: number;
  isEligible: boolean;
  caseTypeLimit: number;
  adjustedLimit: number;
  burdenSharePct: number | null;
  recoverableBeforeBurden: number | null;
  recoverableAfterBurden: number | null;
}

export interface AttorneyFeeVerificationExample {
  input: AttorneyFeeInput;
  result: AttorneyFeeResult;
}

export const ATTORNEY_FEE_BRACKETS: AttorneyFeeBracket[] = [
  {
    max: 3_000_000,
    label: '300만원까지',
    rate: 0,
    base: 300_000,
    previousMax: 0,
    formula: '30만원',
  },
  {
    max: 20_000_000,
    label: '300만원 초과 ~ 2,000만원',
    rate: 0.1,
    base: 300_000,
    previousMax: 3_000_000,
    formula: '30만원 + 초과액의 10%',
  },
  {
    max: 50_000_000,
    label: '2,000만원 초과 ~ 5,000만원',
    rate: 0.08,
    base: 2_000_000,
    previousMax: 20_000_000,
    formula: '200만원 + 초과액의 8%',
  },
  {
    max: 100_000_000,
    label: '5,000만원 초과 ~ 1억원',
    rate: 0.06,
    base: 4_400_000,
    previousMax: 50_000_000,
    formula: '440만원 + 초과액의 6%',
  },
  {
    max: 150_000_000,
    label: '1억원 초과 ~ 1억5,000만원',
    rate: 0.04,
    base: 7_400_000,
    previousMax: 100_000_000,
    formula: '740만원 + 초과액의 4%',
  },
  {
    max: 200_000_000,
    label: '1억5,000만원 초과 ~ 2억원',
    rate: 0.02,
    base: 9_400_000,
    previousMax: 150_000_000,
    formula: '940만원 + 초과액의 2%',
  },
  {
    max: 500_000_000,
    label: '2억원 초과 ~ 5억원',
    rate: 0.01,
    base: 10_400_000,
    previousMax: 200_000_000,
    formula: '1,040만원 + 초과액의 1%',
  },
  {
    max: Number.POSITIVE_INFINITY,
    label: '5억원 초과',
    rate: 0.005,
    base: 13_400_000,
    previousMax: 500_000_000,
    formula: '1,340만원 + 초과액의 0.5%',
  },
];

export const ATTORNEY_FEE_VERIFICATION_INPUT: AttorneyFeeInput = {
  litigationValue: 60_000_000,
  actualFee: 6_000_000,
  caseType: 'main',
  preservationHadHearing: true,
  reduction: 'none',
  burdenSharePct: 60,
};

function normalizeCurrency(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

function normalizeOptionalCurrency(value: number | null): number | null {
  if (value === null || value === undefined) return null;
  return normalizeCurrency(value);
}

function normalizePercentage(value: number | null): number | null {
  if (value === null || value === undefined) return null;
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

function getBaseLimit(litigationValue: number): { bracketIndex: number; limit: number } {
  const normalizedValue = normalizeCurrency(litigationValue);
  const bracketIndex = ATTORNEY_FEE_BRACKETS.findIndex((bracket) => normalizedValue <= bracket.max);
  const safeIndex = bracketIndex === -1 ? ATTORNEY_FEE_BRACKETS.length - 1 : bracketIndex;
  const bracket = ATTORNEY_FEE_BRACKETS[safeIndex];
  const rawLimit = safeIndex === 0
    ? bracket.base
    : bracket.base + (normalizedValue - bracket.previousMax) * bracket.rate;

  return {
    bracketIndex: safeIndex,
    limit: normalizedValue === 0 ? 0 : Math.floor(rawLimit),
  };
}

/**
 * Calculates the statutory reference amount from user-verified case facts.
 *
 * Civil Procedure Act Article 109 and the Attorney Fee Inclusion Rule Articles
 * 3–6 set the cap, the per-instance treatment, the preservation-order half
 * amount, the half reduction for specified procedures, and judicial discretion.
 * This function does not decide the litigation value, payment evidence, court
 * cost allocation, or any discretionary increase/decrease.
 */
export function calculateAttorneyFee(input: AttorneyFeeInput): AttorneyFeeResult {
  const litigationValue = normalizeCurrency(input.litigationValue);
  const actualFee = normalizeOptionalCurrency(input.actualFee);
  const burdenSharePct = normalizePercentage(input.burdenSharePct);
  const caseType = input.caseType === 'preservation' ? 'preservation' : 'main';
  const preservationHadHearing = caseType === 'preservation'
    ? input.preservationHadHearing === true
    : true;
  const reduction = input.reduction === 'half' ? 'half' : 'none';
  const { bracketIndex, limit: baseLimit } = getBaseLimit(litigationValue);
  const isEligible = caseType === 'main' || preservationHadHearing;
  const caseTypeLimit = isEligible
    ? Math.floor(baseLimit * (caseType === 'preservation' ? 0.5 : 1))
    : 0;
  const adjustedLimit = Math.floor(caseTypeLimit * (reduction === 'half' ? 0.5 : 1));
  const recoverableBeforeBurden = actualFee === null
    ? null
    : Math.min(actualFee, adjustedLimit);
  const recoverableAfterBurden = recoverableBeforeBurden === null || burdenSharePct === null
    ? null
    : Math.floor(recoverableBeforeBurden * burdenSharePct / 100);

  return {
    litigationValue,
    actualFee,
    caseType,
    preservationHadHearing,
    reduction,
    bracketIndex,
    baseLimit,
    isEligible,
    caseTypeLimit,
    adjustedLimit,
    burdenSharePct,
    recoverableBeforeBurden,
    recoverableAfterBurden,
  };
}

export function calculateAttorneyFeeVerificationExample(): AttorneyFeeVerificationExample {
  return {
    input: ATTORNEY_FEE_VERIFICATION_INPUT,
    result: calculateAttorneyFee(ATTORNEY_FEE_VERIFICATION_INPUT),
  };
}
