import { describe, expect, it } from 'vitest';
import { calculateRegistrationTax, LICENSE_TAX_RATES } from './registration-tax';

describe('registration tax calculator', () => {
  it('calculates real-estate mortgage registration tax and registration-based local education tax separately', () => {
    const result = calculateRegistrationTax({
      kind: 'real-estate-mortgage',
      taxBase: 100_000_000,
    });

    expect(result).toMatchObject({
      ratePercent: 0.2,
      registrationTax: 200_000,
      educationTax: 40_000,
      totalTax: 240_000,
      minimumApplied: false,
    });
  });

  it('does not apply the metropolitan-registration minimum to a standard mortgage registration', () => {
    const result = calculateRegistrationTax({
      kind: 'real-estate-mortgage',
      taxBase: 1_000_000,
    });

    expect(result).toMatchObject({
      registrationTax: 2_000,
      educationTax: 400,
      totalTax: 2_400,
      minimumApplied: false,
    });
  });

  it('does not charge local education tax on a county fifth-grade license', () => {
    const result = calculateRegistrationTax({
      kind: 'license',
      region: 'county',
      grade: 5,
    });

    expect(result).toMatchObject({
      ratePercent: null,
      registrationTax: 4_500,
      educationTax: 0,
      totalTax: 4_500,
      minimumApplied: false,
    });
  });

  it('matches all 15 statutory license fees by region group and grade', () => {
    const expected = {
      metro: [67_500, 54_000, 40_500, 27_000, 18_000],
      city: [45_000, 34_000, 22_500, 15_000, 7_500],
      county: [27_000, 18_000, 12_000, 9_000, 4_500],
    } as const;

    for (const region of ['metro', 'city', 'county'] as const) {
      for (const grade of [1, 2, 3, 4, 5] as const) {
        expect(LICENSE_TAX_RATES[region][grade]).toBe(expected[region][grade - 1]);
        const result = calculateRegistrationTax({ kind: 'license', region, grade });
        expect(result.registrationTax).toBe(expected[region][grade - 1]);
        expect(result.educationTax).toBe(0);
      }
    }
  });

  it('applies the statutory minimum to an eligible for-profit corporation capital registration', () => {
    const result = calculateRegistrationTax({
      kind: 'corporation-capital',
      taxBase: 10_000_000,
      metropolitanHeavy: false,
    });

    expect(result).toMatchObject({
      ratePercent: 0.4,
      registrationTax: 112_500,
      educationTax: 22_500,
      totalTax: 135_000,
      minimumApplied: true,
    });
  });

  it('applies the threefold rate when metropolitan heavy taxation is confirmed for a corporation capital registration', () => {
    const result = calculateRegistrationTax({
      kind: 'corporation-capital',
      taxBase: 100_000_000,
      metropolitanHeavy: true,
    });

    expect(result).toMatchObject({
      ratePercent: 1.2,
      registrationTax: 1_200_000,
      educationTax: 240_000,
      totalTax: 1_440_000,
      minimumApplied: false,
    });
  });

  it('uses the fixed registration fee for a corporation branch installation', () => {
    const result = calculateRegistrationTax({ kind: 'corporation-branch' });

    expect(result).toMatchObject({
      ratePercent: null,
      registrationTax: 40_200,
      educationTax: 8_040,
      totalTax: 48_240,
      minimumApplied: false,
    });
  });

  it('triples a corporation branch installation fee when metropolitan heavy taxation is confirmed', () => {
    const result = calculateRegistrationTax({
      kind: 'corporation-branch',
      metropolitanHeavy: true,
    });

    expect(result).toMatchObject({
      registrationTax: 120_600,
      educationTax: 24_120,
      totalTax: 144_720,
    });
  });
});
