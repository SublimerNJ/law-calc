---
phase: 05-tax-calculators
plan: 03
subsystem: ui
tags: [tax, registration-tax, vat, securities-tax, react, calculator]

requires:
  - phase: 01-foundation
    provides: CalculatorLayout, tools-data, global styles
provides:
  - 등록면허세 계산기 (8 registration types + license grades)
  - 부가가치세 계산기 (dual mode supply/total)
  - 증권거래세 계산기 (5 market types with agriculture tax)
affects: [05-tax-calculators]

tech-stack:
  added: []
  patterns: [select-based type switching, radio mode selection, conditional agriculture tax]

key-files:
  created:
    - src/app/tools/tax/registration-tax/page.tsx
    - src/app/tools/tax/vat/page.tsx
    - src/app/tools/tax/securities-tax/page.tsx
  modified: []

key-decisions:
  - "Registration tax minimum 6,000 won floor per local tax law"
  - "VAT dual mode: supply-based (sales-purchase) vs total-price-based (divide by 1.1)"
  - "KOSPI agriculture tax 0.03% separate from securities tax 0.03%"

patterns-established:
  - "Select-driven rate lookup pattern for multi-type tax calculators"

requirements-completed: [TAX-07, TAX-08, TAX-09]

duration: 2min
completed: 2026-03-23
---

# Phase 05 Plan 03: Indirect Tax Calculators Summary

**Registration tax (8 types + license), VAT (dual supply/total mode), and securities transaction tax (5 market types with KOSPI agriculture surcharge) calculators with 2026 rates.**

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | 등록면허세 계산기 | 7c9666d | src/app/tools/tax/registration-tax/page.tsx |
| 2 | 부가가치세 계산기 | fbf1ab6 | src/app/tools/tax/vat/page.tsx |
| 3 | 증권거래세 계산기 | faf04ca | src/app/tools/tax/securities-tax/page.tsx |

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED
