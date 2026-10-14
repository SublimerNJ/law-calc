export type ForcedHeirshipClaimantType = 'child' | 'spouse' | 'parent';

export interface ForcedHeirshipInput {
  estateAtDeath: number;
  includedGifts: number;
  debts: number;
  claimantType: ForcedHeirshipClaimantType;
  statutorySharePct: number;
  actualReceived: number;
}

export interface ForcedHeirshipResult {
  baseEstate: number;
  statutoryShareAmount: number;
  forcedHeirshipAmount: number;
  actualReceived: number;
  shortfall: number;
  forcedRatio: number;
}

export interface ForcedHeirshipVerificationExample {
  input: ForcedHeirshipInput;
  result: ForcedHeirshipResult;
}

// The displayed example is calculated again by the same function used by the form.
export const FORCED_HEIRSHIP_VERIFICATION_INPUT: ForcedHeirshipInput = {
  estateAtDeath: 80_000_000,
  includedGifts: 20_000_000,
  debts: 10_000_000,
  claimantType: 'child',
  statutorySharePct: 50,
  actualReceived: 10_000_000,
};

export function getForcedRatio(type: ForcedHeirshipClaimantType): number {
  return type === 'parent' ? 1 / 3 : 1 / 2;
}

function wholeNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function boundedPercentage(value: number): number {
  return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
}

/**
 * Calculates a reference shortfall from figures the user has already verified.
 *
 * Civil Act Articles 1112–1114 set the ratio and the basic estate's structure,
 * while Article 1118 applies Articles 1001, 1008, and 1010. This function does
 * not decide which gifts are legally included, the claimant's legal share, or
 * the validity of a will; those are explicit inputs for separate review.
 */
export function calculateForcedHeirship({
  estateAtDeath,
  includedGifts,
  debts,
  claimantType,
  statutorySharePct,
  actualReceived,
}: ForcedHeirshipInput): ForcedHeirshipResult {
  const normalizedEstateAtDeath = wholeNonNegative(estateAtDeath);
  const normalizedIncludedGifts = wholeNonNegative(includedGifts);
  const normalizedDebts = wholeNonNegative(debts);
  const normalizedStatutorySharePct = boundedPercentage(statutorySharePct);
  const normalizedActualReceived = wholeNonNegative(actualReceived);
  const baseEstate = Math.max(
    0,
    normalizedEstateAtDeath + normalizedIncludedGifts - normalizedDebts,
  );
  const statutoryShareAmount = Math.floor(
    baseEstate * normalizedStatutorySharePct / 100,
  );
  const forcedRatio = getForcedRatio(claimantType);
  const forcedHeirshipAmount = Math.floor(statutoryShareAmount * forcedRatio);
  const shortfall = Math.max(0, forcedHeirshipAmount - normalizedActualReceived);

  return {
    baseEstate,
    statutoryShareAmount,
    forcedHeirshipAmount,
    actualReceived: normalizedActualReceived,
    shortfall,
    forcedRatio,
  };
}

export function calculateForcedHeirshipVerificationExample(): ForcedHeirshipVerificationExample {
  return {
    input: FORCED_HEIRSHIP_VERIFICATION_INPUT,
    result: calculateForcedHeirship(FORCED_HEIRSHIP_VERIFICATION_INPUT),
  };
}
