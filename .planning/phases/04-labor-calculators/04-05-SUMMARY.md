---
phase: 04-labor-calculators
plan: 05
subsystem: ui
tags: [react, nextjs, labor-law, average-wage, shutdown-allowance]

requires:
  - phase: 01-scaffold
    provides: CalculatorLayout, tools-data, globals.css
provides:
  - Average wage calculator (평균임금) page
  - Shutdown allowance calculator (휴업수당) page
affects: []

tech-stack:
  added: []
  patterns: [3-month wage breakdown input, dual-basis comparison display]

key-files:
  created:
    - src/app/tools/labor/average-wage/page.tsx
    - src/app/tools/labor/shutdown-allowance/page.tsx
  modified: []

key-decisions:
  - "Average wage uses calendar days (역일수) not working days per 근로기준법 제2조"
  - "Shutdown allowance shows both avg70% and ordinary wage side-by-side for transparency"

patterns-established:
  - "Multi-month input pattern: array of MonthEntry with start/end dates and amounts"
  - "Dual-basis comparison: side-by-side cards showing different calculation methods"

requirements-completed: [LABOR-13, LABOR-14]

duration: 2min
completed: 2026-03-23
---

# Phase 04 Plan 05: Average Wage & Shutdown Allowance Summary

**3-month average wage calculator with bonus inclusion and shutdown allowance with dual-basis (avg70% vs ordinary wage) comparison**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-23T05:05:29Z
- **Completed:** 2026-03-23T05:07:06Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Average wage calculator with 3-month breakdown, date range per month, base pay + allowances + bonus inclusion
- Shutdown allowance calculator comparing 평균임금 70% vs 통상임금, with labor board approval option

## Task Commits

1. **Task 1: 평균임금 계산기 (LABOR-13)** - `8a2d117` (feat)
2. **Task 2: 휴업수당 계산기 (LABOR-14)** - `099b11e` (feat)

## Files Created/Modified
- `src/app/tools/labor/average-wage/page.tsx` - 3-month wage input with bonus, calculates daily average wage
- `src/app/tools/labor/shutdown-allowance/page.tsx` - Shutdown allowance with avg70% vs ordinary wage comparison

## Decisions Made
- Average wage uses calendar days (역일수) per 근로기준법 제2조제1항제6호
- Shutdown allowance displays both calculation bases side-by-side so users understand the legal floor
- Labor board approval allows custom rate below 70%

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 14 labor calculator pages complete (plans 01-05)
- Phase 04 ready for transition

## Self-Check: PASSED

- FOUND: src/app/tools/labor/average-wage/page.tsx
- FOUND: src/app/tools/labor/shutdown-allowance/page.tsx
- FOUND: commit 8a2d117
- FOUND: commit 099b11e

---
*Phase: 04-labor-calculators*
*Completed: 2026-03-23*
