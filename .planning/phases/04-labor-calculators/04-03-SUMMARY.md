---
phase: 04-labor-calculators
plan: 03
subsystem: ui
tags: [labor-law, unfair-dismissal, industrial-accident, maternity-leave, calculator]

requires:
  - phase: 01-foundation
    provides: CalculatorLayout, tools-data, globals.css
provides:
  - Unfair dismissal compensation calculator (LABOR-07)
  - Industrial accident insurance benefit calculator (LABOR-08)
  - Maternity leave pay calculator (LABOR-09)
affects: []

tech-stack:
  added: []
  patterns: [tab-based benefit type switching, date/month input toggle]

key-files:
  created:
    - src/app/tools/labor/unfair-dismissal/page.tsx
    - src/app/tools/labor/industrial-accident/page.tsx
    - src/app/tools/labor/maternity-leave/page.tsx
  modified: []

key-decisions:
  - Industrial accident calculator uses tab UI for 3 benefit types (absence/disability/nursing)
  - Disability pension option disabled for grades 8-14 (law only allows 1-7)
  - Maternity leave uses daily wage = monthly/30 for insurance calculation

metrics:
  duration: 133s
  completed: "2026-03-22T16:47:22Z"
  tasks: 3
  files: 3
---

# Phase 04 Plan 03: Labor Calculators (Dismissal, Accident, Maternity) Summary

Three labor law calculators covering unfair dismissal compensation with date/month toggle and interim income deduction, industrial accident insurance with 3 benefit types and all 14 disability grades, and maternity leave pay with SME/large company insurance split and 2026 cap of 2,035,640 KRW/month.

## Task Completion

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Unfair dismissal compensation calculator | f343577 | src/app/tools/labor/unfair-dismissal/page.tsx |
| 2 | Industrial accident insurance calculator | 1585931 | src/app/tools/labor/industrial-accident/page.tsx |
| 3 | Maternity leave pay calculator | 47ec29b | src/app/tools/labor/maternity-leave/page.tsx |

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all calculators are fully functional with real formulas.
