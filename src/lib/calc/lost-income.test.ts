import { describe, expect, it } from 'vitest';
import {
  calculateLostIncome,
  calculatePresentValueCoefficient,
} from './lost-income';

describe('calculateLostIncome', () => {
  it('separates treatment loss from residual disability loss and applies fault after both stages', () => {
    const result = calculateLostIncome({
      age: 64,
      monthlyIncome: 120_000,
      retirementAge: 65,
      treatmentMonths: 2,
      disabilityRate: 50,
      faultRate: 25,
      method: 'hoffman',
    });

    expect(result).toMatchObject({
      method: 'hoffman',
      remainingMonths: 12,
      treatmentMonths: 2,
      residualDisabilityMonths: 10,
      monthlyNetIncome: 80_000,
      treatmentLossBeforeFault: 159_006,
      disabilityLossBeforeFault: 387_931,
      lostIncomeBeforeFault: 546_937,
      lostIncomeAfterFault: 410_202,
    });
    expect(result.treatmentCoefficient).toBeCloseTo(1.9875861596, 10);
    expect(result.residualDisabilityCoefficient).toBeCloseTo(9.6982759986, 10);
  });

  it('uses compound monthly discounting for the Leibniz method', () => {
    const result = calculateLostIncome({
      age: 64,
      monthlyIncome: 120_000,
      retirementAge: 65,
      treatmentMonths: 2,
      disabilityRate: 50,
      faultRate: 25,
      method: 'leibniz',
    });

    expect(result).toMatchObject({
      method: 'leibniz',
      treatmentLossBeforeFault: 159_005,
      disabilityLossBeforeFault: 387_746,
      lostIncomeBeforeFault: 546_751,
      lostIncomeAfterFault: 410_063,
    });
    expect(result.treatmentCoefficient).toBeCloseTo(1.9875690846, 10);
    expect(result.residualDisabilityCoefficient).toBeCloseTo(9.6936529197, 10);
  });

  it('caps the Hoffman coefficient at 240 and does not double-count treatment months', () => {
    expect(calculatePresentValueCoefficient(600, 'hoffman')).toBe(240);

    const result = calculateLostIncome({
      age: 40,
      monthlyIncome: 3_000_000,
      retirementAge: 65,
      treatmentMonths: 6,
      disabilityRate: 20,
      faultRate: 0,
      method: 'hoffman',
    });

    expect(result).toMatchObject({
      remainingMonths: 300,
      treatmentMonths: 6,
      residualDisabilityMonths: 294,
      treatmentLossBeforeFault: 11_828_097,
      disabilityLossBeforeFault: 75_372_681,
      lostIncomeBeforeFault: 87_200_778,
    });
  });

  it('normalizes invalid numeric inputs to a non-estimating zero result', () => {
    expect(
      calculateLostIncome({
        age: -1,
        monthlyIncome: Number.NaN,
        retirementAge: 65,
        treatmentMonths: -4,
        disabilityRate: 120,
        faultRate: -1,
        method: 'hoffman',
      }),
    ).toMatchObject({
      remainingMonths: 0,
      treatmentMonths: 0,
      residualDisabilityMonths: 0,
      monthlyNetIncome: 0,
      lostIncomeBeforeFault: 0,
      lostIncomeAfterFault: 0,
    });
  });
});
