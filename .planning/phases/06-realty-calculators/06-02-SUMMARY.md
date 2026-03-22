---
phase: 06-realty-calculators
plan: 02
subsystem: ui
tags: [react, nextjs, calculator, realty, subscription-score, dsr]

requires:
  - phase: 01-scaffold
    provides: CalculatorLayout component, tools-data.ts with realty tools
provides:
  - 청약가점 계산기 page at /tools/realty/subscription-score
  - DSR 계산기 page at /tools/realty/dsr
affects: []

tech-stack:
  added: []
  patterns: [select-based score lookup for multi-tier scoring tables]

key-files:
  created:
    - src/app/tools/realty/subscription-score/page.tsx
    - src/app/tools/realty/dsr/page.tsx
  modified: []

key-decisions:
  - "Select dropdowns with pre-scored options for subscription score (not free-form year input)"
  - "DSR boundary check uses <= for both 40% and 50% thresholds"

patterns-established:
  - "Select-based score lookup: dropdown options carry score values directly, avoiding runtime bracket calculation"

requirements-completed: [REALTY-04, REALTY-05]

duration: 2min
completed: 2026-03-23
---

# Phase 6 Plan 2: Subscription Score & DSR Calculators Summary

**청약가점 3-category scoring (max 84pts) with breakdown table, and DSR calculator with bank/non-bank compliance badges**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-23T07:03:38Z
- **Completed:** 2026-03-23T07:05:45Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Subscription score calculator with 3 select inputs covering all scoring tiers per 주택공급에 관한 규칙 별표1
- DSR calculator with income + 3 loan type inputs, percentage display, and bank/non-bank threshold badges
- Both pages use CalculatorLayout with realty category color (#8b5cf6)

## Task Commits

1. **Task 1: 청약가점 계산기** - `590b2c1` (feat)
2. **Task 2: DSR 계산기** - `7bbf2fe` (feat)

## Files Created/Modified
- `src/app/tools/realty/subscription-score/page.tsx` - Subscription score calculator with 3 selects and breakdown table
- `src/app/tools/realty/dsr/page.tsx` - DSR calculator with compliance badges

## Decisions Made
- Used select dropdowns with pre-scored options for subscription score rather than free-form year input (simpler UX, no calculation errors)
- DSR boundary uses <= for threshold checks (40% exactly is "적합" for bank)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 2 realty calculators complete, ready for remaining realty tools (LTV, DTI)

---
*Phase: 06-realty-calculators*
*Completed: 2026-03-23*
