import { describe, expect, it } from "vitest";
import {
  COMMERCIAL_ANNUAL_CAP,
  COMMERCIAL_BASE_RATE_MULTIPLIER,
  HOUSING_ANNUAL_CAP,
  HOUSING_RATE_ADDEND,
  CURRENT_BASE_RATE,
  calculateCommercialLegalRate,
  calculateHousingLegalRate,
  jeonseToWolse,
  wolseToJeonse,
} from "./rent-conversion";

describe("rent conversion legal rates", () => {
  it("keeps the current Bank of Korea base rate and effective date together", () => {
    expect(CURRENT_BASE_RATE).toEqual({
      value: 3,
      effectiveDate: "2026-08-27",
    });
  });

  it("calculates the housing statutory ceiling as base rate plus 2%p, capped at 10%", () => {
    expect(HOUSING_RATE_ADDEND).toBe(2);
    expect(HOUSING_ANNUAL_CAP).toBe(10);
    expect(calculateHousingLegalRate(3)).toBe(5);
    expect(calculateHousingLegalRate(9)).toBe(10);
  });

  it("uses the commercial lease 4.5-times base-rate formula, capped at 12%", () => {
    expect(COMMERCIAL_BASE_RATE_MULTIPLIER).toBe(4.5);
    expect(COMMERCIAL_ANNUAL_CAP).toBe(12);
    expect(calculateCommercialLegalRate(2)).toBe(9);
    expect(calculateCommercialLegalRate(3)).toBe(12);
  });
});

describe("rent conversion calculations", () => {
  it("converts jeonse to monthly rent using the deposit difference", () => {
    expect(jeonseToWolse(300_000_000, 50_000_000, 5)).toBe(1_041_666);
  });

  it("converts monthly rent to jeonse using the same annual rate", () => {
    expect(wolseToJeonse(50_000_000, 500_000, 5)).toBe(170_000_000);
  });
});
