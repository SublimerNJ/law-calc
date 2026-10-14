import { describe, expect, it } from 'vitest';
import {
  calculateForcedHeirship,
  calculateForcedHeirshipVerificationExample,
  getForcedRatio,
  FORCED_HEIRSHIP_VERIFICATION_INPUT,
} from './forced-heirship';

describe('forced-heirship calculation', () => {
  it('uses the current Civil Act ratios for descendants, spouses, and ascendants', () => {
    expect(getForcedRatio('child')).toBe(1 / 2);
    expect(getForcedRatio('spouse')).toBe(1 / 2);
    expect(getForcedRatio('parent')).toBe(1 / 3);
  });

  it('adds only the entered included gifts and subtracts all entered debts', () => {
    expect(calculateForcedHeirship({
      estateAtDeath: 100_000_000,
      includedGifts: 20_000_000,
      debts: 10_000_000,
      claimantType: 'child',
      statutorySharePct: 50,
      actualReceived: 15_000_000,
    })).toEqual({
      baseEstate: 110_000_000,
      statutoryShareAmount: 55_000_000,
      forcedHeirshipAmount: 27_500_000,
      actualReceived: 15_000_000,
      shortfall: 12_500_000,
      forcedRatio: 1 / 2,
    });
  });

  it('applies one third to an ascendant and never returns a negative shortfall', () => {
    expect(calculateForcedHeirship({
      estateAtDeath: 90_000_000,
      includedGifts: 0,
      debts: 0,
      claimantType: 'parent',
      statutorySharePct: 33.33,
      actualReceived: 20_000_000,
    })).toEqual({
      baseEstate: 90_000_000,
      statutoryShareAmount: 29_997_000,
      forcedHeirshipAmount: 9_999_000,
      actualReceived: 20_000_000,
      shortfall: 0,
      forcedRatio: 1 / 3,
    });
  });

  it('normalizes invalid numeric values to safe currency and percentage bounds', () => {
    expect(calculateForcedHeirship({
      estateAtDeath: -1,
      includedGifts: Number.NaN,
      debts: 2_000,
      claimantType: 'spouse',
      statutorySharePct: 140,
      actualReceived: -500,
    })).toEqual({
      baseEstate: 0,
      statutoryShareAmount: 0,
      forcedHeirshipAmount: 0,
      actualReceived: 0,
      shortfall: 0,
      forcedRatio: 1 / 2,
    });
  });

  it('uses the same function for the page verification example', () => {
    const example = calculateForcedHeirshipVerificationExample();

    expect(example.input).toEqual(FORCED_HEIRSHIP_VERIFICATION_INPUT);
    expect(example.result).toEqual(calculateForcedHeirship(example.input));
    expect(example.result.shortfall).toBe(12_500_000);
  });
});
