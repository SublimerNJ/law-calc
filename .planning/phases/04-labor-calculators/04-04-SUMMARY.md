---
phase: 04-labor-calculators
plan: 04
subsystem: ui
tags: [react, nextjs, labor-law, parental-leave, unemployment, ordinary-wage]

requires:
  - phase: 01-foundation
    provides: CalculatorLayout, tools-data, globals.css
provides:
  - Parental leave benefit calculator (LABOR-10)
  - Unemployment benefit calculator (LABOR-11)
  - Ordinary wage calculator (LABOR-12)
affects: []

tech-stack:
  added: []
  patterns: [dynamic-row-inputs, multi-tier-benefit-caps, benefit-days-lookup-table]

key-files:
  created:
    - src/app/tools/labor/parental-leave/page.tsx
    - src/app/tools/labor/unemployment-benefit/page.tsx
    - src/app/tools/labor/ordinary-wage/page.tsx
  modified: []

decisions:
  - 2026 parental leave caps: 1-3mo 80% (2M upper), 4mo+ 50% (1.2M upper), single-parent 3M first 3mo
  - Unemployment daily lower = min-wage 10030 * 0.8 * daily-hours (supports part-time)
  - Ordinary wage uses dynamic rows with checkbox inclusion pattern

metrics:
  duration: ~4min
  completed: "2026-03-22T16:49:00Z"
---

# Phase 04 Plan 04: Parental Leave, Unemployment Benefit, Ordinary Wage Calculators Summary

Three labor calculators covering parental support benefits and wage base computation per 2026 Korean employment insurance and labor standards law.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Parental leave benefit calculator | 29e7072 | src/app/tools/labor/parental-leave/page.tsx |
| 2 | Unemployment benefit calculator | ffd23f1 | src/app/tools/labor/unemployment-benefit/page.tsx |
| 3 | Ordinary wage calculator | 5326728 | src/app/tools/labor/ordinary-wage/page.tsx |

## What Was Built

**Parental Leave (LABOR-10):** 2026 employment insurance law rates -- months 1-3 at 80% (cap 2M, single-parent 3M), months 4+ at 50% (cap 1.2M), floor 700K. Calculates immediate (75%) vs deferred (25%) payment with monthly breakdown table.

**Unemployment Benefit (LABOR-11):** Daily benefit = avg monthly wage * 12 / 365 * 60%, capped at 66K/day upper and min-wage-based lower (64,192 for 8hr). Benefit days lookup by age group x insured period. Supports part-time workers (4/6/8hr).

**Ordinary Wage (LABOR-12):** Dynamic wage item rows (add/remove) with inclusion checkboxes. Calculates monthly total, hourly rate (total / base hours), daily rate (hourly * 8). Supports 40h (209hr/mo) and 44h (226hr/mo) systems.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED
