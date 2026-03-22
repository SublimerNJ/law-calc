---
phase: 06-realty-calculators
plan: 01
subsystem: ui
tags: [react, nextjs, realty, calculator, korean-law]

requires:
  - phase: 01-scaffold
    provides: CalculatorLayout, tools-data, route structure
provides:
  - 임대차 보증금 반환 계산기 (deposit-return)
  - 전월세 전환율 계산기 (rent-conversion)
  - 중개보수 계산기 (brokerage-fee)
affects: []

tech-stack:
  added: []
  patterns: [realty calculator pattern with category.color #8b5cf6]

key-files:
  created:
    - src/app/tools/realty/deposit-return/page.tsx
    - src/app/tools/realty/rent-conversion/page.tsx
    - src/app/tools/realty/brokerage-fee/page.tsx
  modified: []

key-decisions:
  - "Deposit return uses floor() for interest calculation per standard Korean practice"
  - "Brokerage fee uses converted deposit (보증금+월세x100) for rate determination on wolse transactions"

patterns-established:
  - "Realty calculator pattern: radio mode selection + dynamic field display + legal basis footer"

requirements-completed: [REALTY-01, REALTY-02, REALTY-03]

duration: 2min
completed: 2026-03-23
---

# Phase 06 Plan 01: Realty Calculators Summary

**3 realty calculators: deposit return with delay interest, bidirectional jeonse/wolse conversion, and tiered brokerage fee with VAT**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-22T17:03:32Z
- **Completed:** 2026-03-22T17:05:29Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Deposit return calculator with configurable interest rate (default 5% per Housing Lease Protection Act)
- Bidirectional rent conversion (jeonse-to-wolse and wolse-to-jeonse) with legal cap reference
- Brokerage fee calculator with 6-tier sale rates, 5-tier lease rates, wolse conversion formula, and VAT

## Task Commits

Each task was committed atomically:

1. **Task 1: deposit-return calculator** - `8a14ae8` (feat)
2. **Task 2: rent-conversion calculator** - `395c8e9` (feat)
3. **Task 3: brokerage-fee calculator** - `3702170` (feat)

## Files Created/Modified
- `src/app/tools/realty/deposit-return/page.tsx` - Deposit return with delay interest calculation
- `src/app/tools/realty/rent-conversion/page.tsx` - Bidirectional jeonse/wolse conversion
- `src/app/tools/realty/brokerage-fee/page.tsx` - Brokerage fee with tiered rates and VAT

## Decisions Made
- Deposit return uses Math.floor() for interest (standard Korean financial rounding)
- Brokerage fee wolse conversion: deposit + monthly_rent * 100 for rate bracket determination

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 3 realty calculators complete, remaining realty tools (subscription-score, dsr, ltv, dti) available for next plan
- All calculators follow established CalculatorLayout pattern

---
*Phase: 06-realty-calculators*
*Completed: 2026-03-23*

## Self-Check: PASSED
