---
phase: 06-realty-calculators
plan: 03
subsystem: ui
tags: [react, nextjs, ltv, dti, realty, calculator]

requires:
  - phase: 01-scaffold
    provides: CalculatorLayout component, tools-data registry
provides:
  - LTV calculator page at /tools/realty/ltv
  - DTI calculator page at /tools/realty/dti
affects: []

tech-stack:
  added: []
  patterns: [region-select LTV/DTI regulation lookup]

key-files:
  created:
    - src/app/tools/realty/ltv/page.tsx
    - src/app/tools/realty/dti/page.tsx
  modified: []

key-decisions:
  - "LTV regions: speculative 40%, regulated 50%, general 70% per 2022.8 regulation"
  - "DTI regions: speculative 40%, regulated 50%, general 60% per FSC guidelines"

patterns-established:
  - "Region-based regulation select pattern for financial ratio calculators"

requirements-completed: [REALTY-06, REALTY-07]

duration: 1min
completed: 2026-03-23
---

# Phase 6 Plan 3: LTV/DTI Calculators Summary

**LTV and DTI calculators with region-based regulation limits (40-70%) and pass/fail compliance badges**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-23T03:23:40Z
- **Completed:** 2026-03-23T03:24:47Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- LTV calculator: house price / loan amount / region input with regulation compliance check
- DTI calculator: income / mortgage payment / other interest / region with DTI% and compliance
- Both calculators show max limits, pass/fail badges, and legal basis references

## Task Commits

1. **Task 1: LTV calculator** - `fc29160` (feat)
2. **Task 2: DTI calculator** - `ddcb18c` (feat)

## Files Created/Modified
- `src/app/tools/realty/ltv/page.tsx` - LTV ratio calculator with region regulation limits
- `src/app/tools/realty/dti/page.tsx` - DTI ratio calculator with DSR comparison note

## Decisions Made
- LTV regulation limits: speculative 40%, regulated 50%, general 70% (2022.8 금융위원회 기준)
- DTI regulation limits: speculative 40%, regulated 50%, general 60% (금융감독원 여신심사 가이드라인)
- Included DTI vs DSR difference explanation as plan required

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 7 realty calculators complete (deposit-return, rent-conversion, brokerage-fee, subscription-score, dsr, ltv, dti)

---
*Phase: 06-realty-calculators*
*Completed: 2026-03-23*

## Self-Check: PASSED
