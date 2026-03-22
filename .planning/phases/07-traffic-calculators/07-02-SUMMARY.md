---
phase: 07-traffic-calculators
plan: 02
subsystem: ui
tags: [nextjs, react, traffic-law, korean-law, calculator]

requires:
  - phase: 01-scaffold
    provides: CalculatorLayout, tools-data, Next.js app structure
provides:
  - Speeding fine calculator at /tools/traffic/speeding-fine
  - Fine/penalty calculator at /tools/traffic/fine-penalty
  - Bail calculator at /tools/traffic/bail
affects: []

tech-stack:
  added: []
  patterns: [violation-data-driven-select, risk-multiplier-chain, grouped-optgroup-select]

key-files:
  created:
    - src/app/tools/traffic/speeding-fine/page.tsx
    - src/app/tools/traffic/fine-penalty/page.tsx
    - src/app/tools/traffic/bail/page.tsx
  modified: []

key-decisions:
  - "Speeding fine uses tiered bracket system matching 도로교통법 시행령 별표 8"
  - "Fine/penalty uses inline violation data array with optgroup grouping"
  - "Bail calculator uses midpoint of crime-type range as base, with multiplicative risk factors"

patterns-established:
  - "Grouped select pattern: optgroup for violation categories in fine-penalty"
  - "Multi-factor multiplier chain: base x prior x flight x evidence for bail"

requirements-completed: [TRAFFIC-04, TRAFFIC-05, TRAFFIC-06]

duration: 3min
completed: 2026-03-22
---

# Phase 07 Plan 02: Traffic/Criminal Calculators (3 of 6) Summary

**Three traffic/criminal calculators: speeding fine with zone/vehicle multipliers, fine/penalty with 13 violation types and surcharge logic, bail estimator with 9 crime types and 4-factor risk weighting**

## Tasks Completed

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Speeding fine calculator | ad54010 | src/app/tools/traffic/speeding-fine/page.tsx |
| 2 | Fine/penalty calculator | ec4a6ee | src/app/tools/traffic/fine-penalty/page.tsx |
| 3 | Bail calculator | dcc2fb2 | src/app/tools/traffic/bail/page.tsx |

## Implementation Details

### Speeding Fine (TRAFFIC-04)
- 9 speed limits, 6 excess-speed brackets with fines/demerit points
- Vehicle multiplier (bus/truck 1.2x), zone multiplier (protection zone 2x)
- Criminal penalty warning for 80km/h+ excess
- License suspension/revocation threshold display

### Fine/Penalty (TRAFFIC-05)
- 13 violations across 3 groups (traffic, alcohol, lifestyle)
- Police/camera/self-report enforcement modes
- Self-report 20% discount, late payment 3%/month surcharge
- Payment method guidance (e-fine, virtual account, bank, card)

### Bail (TRAFFIC-06)
- 9 crime types with min-max bail ranges
- Asset-based calculation with crime-severity factor (10-30%)
- 4-factor multiplicative weighting: prior record, flight risk, evidence risk
- 500M cap, 80-120% range display, court discretion disclaimer

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Verification

- TypeScript: `npx tsc --noEmit` passed with no errors
- Build: `npm run build` succeeded
- All 3 routes created and accessible

## Self-Check: PASSED
