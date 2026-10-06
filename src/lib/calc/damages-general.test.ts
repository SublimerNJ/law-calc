import { describe, expect, it } from 'vitest';
import { calculateGeneralDamages } from './damages-general';

describe('calculateGeneralDamages', () => {
  it('applies the entered fault ratio only to documented property damage', () => {
    expect(
      calculateGeneralDamages({
        documentedDamage: 10_000_000,
        faultRatio: 25,
      }),
    ).toEqual({
      documentedDamage: 10_000_000,
      faultReduction: 2_500_000,
      adjustedDamage: 7_500_000,
    });
  });

  it('rounds the adjusted amount down to whole won', () => {
    expect(
      calculateGeneralDamages({
        documentedDamage: 301,
        faultRatio: 33.3,
      }),
    ).toEqual({
      documentedDamage: 301,
      faultReduction: 101,
      adjustedDamage: 200,
    });
  });

  it('does not invent a consolation amount or other discretionary result', () => {
    const result = calculateGeneralDamages({
      documentedDamage: 1_000_000,
      faultRatio: 0,
    });

    expect(Object.keys(result)).toEqual([
      'documentedDamage',
      'faultReduction',
      'adjustedDamage',
    ]);
  });

  it('normalizes invalid inputs without estimating a result', () => {
    expect(
      calculateGeneralDamages({
        documentedDamage: -1,
        faultRatio: Number.NaN,
      }),
    ).toEqual({
      documentedDamage: 0,
      faultReduction: 0,
      adjustedDamage: 0,
    });
  });
});
