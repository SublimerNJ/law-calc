---
phase: 02-court-calculators
plan: "02"
subsystem: ui
tags: [react, nextjs, calculator, court, korean-law]

requires:
  - phase: 01-foundation
    provides: CalculatorLayout component, tools-data structure, CSS theme tokens
provides:
  - Service fee calculator (송달료) at /tools/court/service-fee
  - Small claims cost calculator (소액사건) at /tools/court/small-claims
  - Payment order cost calculator (지급명령) at /tools/court/payment-order
affects: [02-court-calculators]

tech-stack:
  added: []
  patterns: [stamp-fee-formula reuse across calculators, formatNumber locale helper]

key-files:
  created:
    - src/app/tools/court/service-fee/page.tsx
    - src/app/tools/court/small-claims/page.tsx
    - src/app/tools/court/payment-order/page.tsx
  modified: []

key-decisions:
  - "Payment order service fee uses totalParties (creditor + debtors) not just debtors"
  - "Small claims calculator clamps to 30M KRW with warning rather than blocking input"

patterns-established:
  - "calcStampFee helper pattern for stamp fee tiers with 100-won ceiling"

requirements-completed: [COURT-04, COURT-05, COURT-06]

duration: 4min
completed: 2026-03-23
---

# Phase 02 Plan 02: Court Calculators Batch 2 Summary

**3 court calculators: service fee (party x rounds x 4,500), small claims (stamp + service for <=30M), payment order (1/10 stamp fee with savings comparison)**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-23T08:06:47Z
- **Completed:** 2026-03-23T08:10:47Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Service fee calculator with auto/manual mode and court level presets (1심/항소심/상고심)
- Small claims calculator with 30M KRW validation and stamp fee computation
- Payment order calculator with 1/10 stamp fee ratio and savings vs regular lawsuit display

## Task Commits

1. **Task 1: 송달료 계산기** - `6ce330a` (feat)
2. **Task 2: 소액사건 재판비용 계산기** - `6d4f873` (feat)
3. **Task 3: 지급명령 비용 계산기** - `439b52b` (feat)

## Files Created/Modified
- `src/app/tools/court/service-fee/page.tsx` - Service fee calculator with party/round inputs
- `src/app/tools/court/small-claims/page.tsx` - Small claims cost calculator with 30M cap
- `src/app/tools/court/payment-order/page.tsx` - Payment order cost calculator with savings display

## Decisions Made
- Payment order uses totalParties (1 creditor + N debtors) for service fee calculation, matching court filing practice
- Small claims clamps input to 30M rather than rejecting, showing a warning for better UX

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 3 more court calculators ready; remaining court calculators can follow same pattern
- calcStampFee formula reusable for future calculators needing stamp fee tiers

---
*Phase: 02-court-calculators*
*Completed: 2026-03-23*
