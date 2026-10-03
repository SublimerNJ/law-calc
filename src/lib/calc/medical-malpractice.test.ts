import { describe, expect, it } from 'vitest';
import { calculateMedicalPropertyDamage } from './medical-malpractice';

describe('calculateMedicalPropertyDamage', () => {
  it('calculates the documented property damage and applies the entered responsibility rate', () => {
    expect(
      calculateMedicalPropertyDamage({
        treatmentCost: 5_000_000,
        futureTreatmentCost: 3_000_000,
        lostIncome: 10_000_000,
        responsibilityRate: 60,
      }),
    ).toEqual({
      documentedDamage: 18_000_000,
      allocatedDamage: 10_800_000,
    });
  });

  it('rounds the allocated amount down to whole won', () => {
    expect(
      calculateMedicalPropertyDamage({
        treatmentCost: 100,
        futureTreatmentCost: 100,
        lostIncome: 101,
        responsibilityRate: 33.3,
      }).allocatedDamage,
    ).toBe(100);
  });

  it('returns no discretionary consolation amount', () => {
    const result = calculateMedicalPropertyDamage({
      treatmentCost: 1_000_000,
      futureTreatmentCost: 0,
      lostIncome: 0,
      responsibilityRate: 100,
    });

    expect(Object.keys(result)).toEqual(['documentedDamage', 'allocatedDamage']);
  });

  it('returns zero when the entered damage is zero', () => {
    expect(
      calculateMedicalPropertyDamage({
        treatmentCost: 0,
        futureTreatmentCost: 0,
        lostIncome: 0,
        responsibilityRate: 0,
      }),
    ).toEqual({ documentedDamage: 0, allocatedDamage: 0 });
  });
});
