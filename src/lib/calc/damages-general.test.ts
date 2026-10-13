import { describe, expect, it } from 'vitest';
import {
  calculateGeneralDamages,
  calculateGeneralDamagesVerificationExample,
} from './damages-general';

describe('calculateGeneralDamages', () => {
  it('sums each documented damage category before applying the entered fault ratio', () => {
    expect(
      calculateGeneralDamages({
        treatmentCost: 1_000_000,
        repairCost: 2_000_000,
        lostIncome: 3_000_000,
        otherPropertyDamage: 500_000,
        faultRatio: 20,
      }),
    ).toEqual({
      treatmentCost: 1_000_000,
      repairCost: 2_000_000,
      lostIncome: 3_000_000,
      otherPropertyDamage: 500_000,
      documentedDamage: 6_500_000,
      faultRatio: 20,
      faultReduction: 1_300_000,
      adjustedDamage: 5_200_000,
    });
  });

  it('rounds each money result down to whole won', () => {
    expect(
      calculateGeneralDamages({
        treatmentCost: 301,
        repairCost: 0,
        lostIncome: 0,
        otherPropertyDamage: 0,
        faultRatio: 33.3,
      }),
    ).toMatchObject({
      documentedDamage: 301,
      faultRatio: 33.3,
      faultReduction: 101,
      adjustedDamage: 200,
    });
  });

  it('keeps the verification example tied to the same pure calculation', () => {
    const example = calculateGeneralDamagesVerificationExample();

    expect(example.input).toEqual({
      treatmentCost: 1_500_000,
      repairCost: 2_000_000,
      lostIncome: 3_000_000,
      otherPropertyDamage: 500_000,
      faultRatio: 20,
    });
    expect(example.result).toMatchObject({
      documentedDamage: 7_000_000,
      faultReduction: 1_400_000,
      adjustedDamage: 5_600_000,
    });
  });

  it('does not invent a consolation amount or other discretionary result', () => {
    const result = calculateGeneralDamages({
      treatmentCost: 1_000_000,
      repairCost: 0,
      lostIncome: 0,
      otherPropertyDamage: 0,
      faultRatio: 0,
    });

    expect(Object.keys(result)).toEqual([
      'treatmentCost',
      'repairCost',
      'lostIncome',
      'otherPropertyDamage',
      'documentedDamage',
      'faultRatio',
      'faultReduction',
      'adjustedDamage',
    ]);
  });

  it('normalizes invalid inputs without estimating a result', () => {
    expect(
      calculateGeneralDamages({
        treatmentCost: -1,
        repairCost: Number.NaN,
        lostIncome: Number.POSITIVE_INFINITY,
        otherPropertyDamage: 0,
        faultRatio: Number.NaN,
      }),
    ).toEqual({
      treatmentCost: 0,
      repairCost: 0,
      lostIncome: 0,
      otherPropertyDamage: 0,
      documentedDamage: 0,
      faultRatio: 0,
      faultReduction: 0,
      adjustedDamage: 0,
    });
  });
});
