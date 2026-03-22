---
phase: 05-tax-calculators
plan: 04
subsystem: calculators
tags: [year-end-tax, four-insurances, rent-tax-credit, korean-tax-law]

requires:
  - phase: 01-foundation
    provides: CalculatorLayout, tools-data, routing structure
provides:
  - Year-end tax settlement calculator (TAX-10)
  - Four social insurances calculator (TAX-11)
  - Rent tax credit calculator (TAX-12)
affects: []

tech-stack:
  added: []
  patterns: [progressive-tax-brackets, eligibility-checklist-ui, employee-employer-table]

key-files:
  created:
    - src/app/tools/tax/year-end-tax/page.tsx
    - src/app/tools/tax/four-insurances/page.tsx
    - src/app/tools/tax/rent-tax-credit/page.tsx
  modified: []

decisions:
  - "Year-end tax uses simplified card deduction (credit card excess first, then debit)"
  - "Four insurances uses 150-person-under general employer rates with manufacturing avg for industrial"
  - "Rent credit uses checkbox UX for homeless/market-value eligibility"

metrics:
  duration: 137s
  completed: "2026-03-23"
  tasks: 3
  files: 3
---

# Phase 05 Plan 04: Tax Calculators Batch 4 Summary

Year-end tax settlement, four social insurances, and rent tax credit calculators with 2026 Korean tax law rates

## What Was Built

### Task 1: Year-End Tax Settlement Calculator (TAX-10)
Comprehensive calculator with 3 input sections (income, deductions, credits). Implements full 2026 progressive brackets (6-45%), earned income deduction table, credit card deduction with usage threshold (25% of gross), and 6 tax credits (earned income, child, medical, education, donation, rent). Displays refund or additional payment prominently.

**Commit:** 522ea31

### Task 2: Four Social Insurances Calculator (TAX-11)
2026 rates: pension 4.5% (cap 6.17M), health 3.545%, long-term care 12.95% of health, employment 0.9%/1.65%, industrial 1.47% (employer only). Two-column employee/employer table with highlighted totals.

**Commit:** 8aba1fd

### Task 3: Rent Tax Credit Calculator (TAX-12)
Eligibility checklist UI (green/red indicators) for income cap (80M), homeless household head, market value (4B). Credit rates: 20% (under 55M gross) or 17% (55M-80M). Annual rent cap 10M.

**Commit:** b20bc7a

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.
