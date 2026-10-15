import { describe, expect, it } from 'vitest';
import {
  ATTORNEY_FEE_BRACKETS,
  calculateAttorneyFee,
  calculateAttorneyFeeVerificationExample,
  type AttorneyFeeInput,
} from './attorney-fee';

const baseInput: AttorneyFeeInput = {
  litigationValue: 60_000_000,
  actualFee: null,
  caseType: 'main',
  preservationHadHearing: true,
  reduction: 'none',
  burdenSharePct: null,
};

describe('attorney-fee calculation', () => {
  it('matches every current official table boundary', () => {
    const values = [
      3_000_000,
      20_000_000,
      50_000_000,
      100_000_000,
      150_000_000,
      200_000_000,
      500_000_000,
    ];
    const limits = [
      300_000,
      2_000_000,
      4_400_000,
      7_400_000,
      9_400_000,
      10_400_000,
      13_400_000,
    ];

    values.forEach((litigationValue, index) => {
      const result = calculateAttorneyFee({ ...baseInput, litigationValue });
      expect(result.baseLimit).toBe(limits[index]);
      expect(result.bracketIndex).toBe(index);
    });

    expect(ATTORNEY_FEE_BRACKETS).toHaveLength(8);
    expect(calculateAttorneyFee({ ...baseInput, litigationValue: 1_000_000_000 }).baseLimit)
      .toBe(15_900_000);
  });

  it('limits a documented payment to the official cap without inventing a recovery amount', () => {
    const withoutPayment = calculateAttorneyFee(baseInput);
    expect(withoutPayment.adjustedLimit).toBe(5_000_000);
    expect(withoutPayment.recoverableBeforeBurden).toBeNull();
    expect(withoutPayment.recoverableAfterBurden).toBeNull();

    const withPayment = calculateAttorneyFee({ ...baseInput, actualFee: 6_000_000 });
    expect(withPayment.recoverableBeforeBurden).toBe(5_000_000);
    expect(withPayment.recoverableAfterBurden).toBeNull();
  });

  it('applies the half amount for a preservation order after a hearing', () => {
    const result = calculateAttorneyFee({
      ...baseInput,
      caseType: 'preservation',
      actualFee: 3_000_000,
    });

    expect(result.baseLimit).toBe(5_000_000);
    expect(result.caseTypeLimit).toBe(2_500_000);
    expect(result.adjustedLimit).toBe(2_500_000);
    expect(result.recoverableBeforeBurden).toBe(2_500_000);
  });

  it('does not include a preservation-order fee when no hearing occurred', () => {
    const result = calculateAttorneyFee({
      ...baseInput,
      caseType: 'preservation',
      preservationHadHearing: false,
      actualFee: 3_000_000,
    });

    expect(result.isEligible).toBe(false);
    expect(result.caseTypeLimit).toBe(0);
    expect(result.adjustedLimit).toBe(0);
    expect(result.recoverableBeforeBurden).toBe(0);
  });

  it('applies the rule 5 half reduction and the court-ordered cost burden share separately', () => {
    const result = calculateAttorneyFee({
      ...baseInput,
      actualFee: 3_000_000,
      reduction: 'half',
      burdenSharePct: 60,
    });

    expect(result.baseLimit).toBe(5_000_000);
    expect(result.adjustedLimit).toBe(2_500_000);
    expect(result.recoverableBeforeBurden).toBe(2_500_000);
    expect(result.recoverableAfterBurden).toBe(1_500_000);
  });

  it('normalizes unsafe values and uses the same function for the page example', () => {
    const result = calculateAttorneyFee({
      ...baseInput,
      litigationValue: -1,
      actualFee: -500,
      burdenSharePct: 140,
    });

    expect(result.baseLimit).toBe(0);
    expect(result.adjustedLimit).toBe(0);
    expect(result.recoverableBeforeBurden).toBe(0);
    expect(result.burdenSharePct).toBe(100);

    const example = calculateAttorneyFeeVerificationExample();
    expect(example.result).toEqual(calculateAttorneyFee(example.input));
    expect(example.result.baseLimit).toBe(5_000_000);
    expect(example.result.recoverableAfterBurden).toBe(3_000_000);
  });
});
