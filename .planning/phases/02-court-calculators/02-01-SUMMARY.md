---
phase: "02"
plan: "01"
subsystem: court-calculators
tags: [court, calculator, attorney-fee, lawsuit-cost, stamp-fee]
dependency_graph:
  requires: [CalculatorLayout, tools-data]
  provides: [attorney-fee-page, lawsuit-cost-page, stamp-fee-page]
  affects: [court-category-routes]
tech_stack:
  added: []
  patterns: [bracket-calculation, 100won-ceiling-rounding, level-multiplier]
key_files:
  created:
    - src/app/tools/court/attorney-fee/page.tsx
    - src/app/tools/court/lawsuit-cost/page.tsx
    - src/app/tools/court/stamp-fee/page.tsx
  modified: []
decisions:
  - "Attorney fee uses 8-tier bracket with 30M cap per Supreme Court rules"
  - "Stamp fee uses Math.ceil(fee/100)*100 for 100won ceiling rounding"
  - "Lawsuit cost combines stamp fee + service fee (parties x 15 x 4500)"
metrics:
  duration: "~1 min"
  completed: "2026-03-23"
---

# Phase 02 Plan 01: Court Calculators (3 Core) Summary

3 court cost calculators with Korean civil procedure law formulas: attorney fee inclusion, lawsuit cost breakdown, and stamp fee with tri-level comparison table.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | 변호사보수 소송비용산입 계산기 | 1e65f2a | src/app/tools/court/attorney-fee/page.tsx |
| 2 | 소송비용 계산기 | 1213492 | src/app/tools/court/lawsuit-cost/page.tsx |
| 3 | 인지대 계산기 | c5d4be9 | src/app/tools/court/stamp-fee/page.tsx |

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all calculators are fully functional with real calculation logic wired to UI.
