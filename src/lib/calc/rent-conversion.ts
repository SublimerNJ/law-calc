export const CURRENT_BASE_RATE = {
  value: 3,
  effectiveDate: "2026-08-27",
} as const;

export const HOUSING_RATE_ADDEND = 2;
export const HOUSING_ANNUAL_CAP = 10;
export const COMMERCIAL_BASE_RATE_MULTIPLIER = 4.5;
export const COMMERCIAL_ANNUAL_CAP = 12;

export function calculateHousingLegalRate(baseRate: number): number {
  return Math.min(baseRate + HOUSING_RATE_ADDEND, HOUSING_ANNUAL_CAP);
}

export function calculateCommercialLegalRate(baseRate: number): number {
  return Math.min(
    baseRate * COMMERCIAL_BASE_RATE_MULTIPLIER,
    COMMERCIAL_ANNUAL_CAP,
  );
}

export function jeonseToWolse(
  jeonse: number,
  deposit: number,
  annualRate: number,
): number {
  return Math.floor((jeonse - deposit) * (annualRate / 100) / 12);
}

export function wolseToJeonse(
  deposit: number,
  wolse: number,
  annualRate: number,
): number {
  return Math.floor(deposit + wolse * 12 / (annualRate / 100));
}
