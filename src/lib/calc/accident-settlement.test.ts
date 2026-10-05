import { describe, expect, it } from 'vitest';
import { calculateAccidentInsuranceLimit } from './accident-settlement';

describe('calculateAccidentInsuranceLimit', () => {
  it('caps documented damage at the statutory injury-grade limit', () => {
    expect(
      calculateAccidentInsuranceLimit({
        documentedDamage: 1_000_000,
        injuryGrade: 14,
        disabilityGrade: 0,
      }),
    ).toEqual({
      documentedDamage: 1_000_000,
      injuryLimit: 500_000,
      disabilityLimit: 0,
      totalLimit: 500_000,
      payableWithinLiabilityLimit: 500_000,
      excessDamage: 500_000,
    });
  });

  it('adds the statutory disability-grade limit when a residual disability is confirmed', () => {
    expect(
      calculateAccidentInsuranceLimit({
        documentedDamage: 200_000_000,
        injuryGrade: 1,
        disabilityGrade: 1,
      }),
    ).toEqual({
      documentedDamage: 200_000_000,
      injuryLimit: 30_000_000,
      disabilityLimit: 150_000_000,
      totalLimit: 180_000_000,
      payableWithinLiabilityLimit: 180_000_000,
      excessDamage: 20_000_000,
    });
  });

  it('does not invent a daily solatium or lost-income amount', () => {
    const result = calculateAccidentInsuranceLimit({
      documentedDamage: 5_000_000,
      injuryGrade: 12,
      disabilityGrade: 0,
    });

    expect(result).toEqual({
      documentedDamage: 5_000_000,
      injuryLimit: 1_200_000,
      disabilityLimit: 0,
      totalLimit: 1_200_000,
      payableWithinLiabilityLimit: 1_200_000,
      excessDamage: 3_800_000,
    });
    expect(Object.keys(result)).not.toContain('hospitalizationSolatium');
    expect(Object.keys(result)).not.toContain('lostWages');
  });

  it('treats invalid damage and grade values as zero rather than estimating them', () => {
    expect(
      calculateAccidentInsuranceLimit({
        documentedDamage: -1,
        injuryGrade: 99,
        disabilityGrade: Number.NaN,
      }),
    ).toEqual({
      documentedDamage: 0,
      injuryLimit: 0,
      disabilityLimit: 0,
      totalLimit: 0,
      payableWithinLiabilityLimit: 0,
      excessDamage: 0,
    });
  });
});
