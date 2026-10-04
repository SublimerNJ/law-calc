import { describe, expect, it } from 'vitest';
import { calculateUnfairDismissalWage } from './unfair-dismissal';

describe('calculateUnfairDismissalWage', () => {
  it('calculates only the entered daily wage equivalent for the entered dismissal period', () => {
    expect(
      calculateUnfairDismissalWage({
        dailyAverageWage: 100_000,
        dismissalDays: 180,
      }),
    ).toEqual({
      dailyAverageWage: 100_000,
      dismissalDays: 180,
      wageEquivalent: 18_000_000,
    });
  });

  it('normalizes fractional inputs to whole-won and whole-day values', () => {
    expect(
      calculateUnfairDismissalWage({
        dailyAverageWage: 123_456.78,
        dismissalDays: 30.9,
      }),
    ).toEqual({
      dailyAverageWage: 123_456,
      dismissalDays: 30,
      wageEquivalent: 3_703_680,
    });
  });

  it('does not include a discretionary additional compensation estimate or deduction', () => {
    const result = calculateUnfairDismissalWage({
      dailyAverageWage: 100_000,
      dismissalDays: 30,
    });

    expect(Object.keys(result)).toEqual([
      'dailyAverageWage',
      'dismissalDays',
      'wageEquivalent',
    ]);
  });

  it('returns zero for invalid or negative inputs', () => {
    expect(
      calculateUnfairDismissalWage({
        dailyAverageWage: -1,
        dismissalDays: Number.NaN,
      }),
    ).toEqual({
      dailyAverageWage: 0,
      dismissalDays: 0,
      wageEquivalent: 0,
    });
  });
});
