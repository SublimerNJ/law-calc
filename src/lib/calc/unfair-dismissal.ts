export interface UnfairDismissalWageInput {
  dailyAverageWage: number;
  dismissalDays: number;
}

export interface UnfairDismissalWageResult {
  dailyAverageWage: number;
  dismissalDays: number;
  wageEquivalent: number;
}

function nonNegativeFinite(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/**
 * Calculates only the wage-equivalent amount for the entered dismissal period.
 * It does not estimate any discretionary additional compensation or deductions.
 */
export function calculateUnfairDismissalWage({
  dailyAverageWage,
  dismissalDays,
}: UnfairDismissalWageInput): UnfairDismissalWageResult {
  const normalizedDailyAverageWage = Math.floor(nonNegativeFinite(dailyAverageWage));
  const normalizedDismissalDays = Math.floor(nonNegativeFinite(dismissalDays));

  return {
    dailyAverageWage: normalizedDailyAverageWage,
    dismissalDays: normalizedDismissalDays,
    wageEquivalent: normalizedDailyAverageWage * normalizedDismissalDays,
  };
}
