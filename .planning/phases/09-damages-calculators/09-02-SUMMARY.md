---
phase: 09-damages-calculators
plan: 02
subsystem: ui
tags: [react, nextjs, hoffman-coefficient, industrial-accident, product-liability, korean-law]

requires:
  - phase: 09-damages-calculators
    provides: CalculatorLayout component, tools-data entries for damages category
provides:
  - Lost income calculator with Hoffman coefficient (DAMAGES-04)
  - Disability compensation calculator with 14-grade system (DAMAGES-05)
  - Product liability damages calculator with punitive damages (DAMAGES-06)
affects: [damages-calculators, tools-index]

tech-stack:
  added: []
  patterns: [hoffman-coefficient-monthly-calculation, disability-grade-data-table, punitive-damages-toggle]

key-files:
  created:
    - src/app/tools/damages/lost-income/page.tsx
    - src/app/tools/damages/disability-compensation/page.tsx
    - src/app/tools/damages/product-liability/page.tsx
  modified: []

decisions:
  - Used monthly Hoffman coefficient formula (sum 1/(1+0.05/12*k)) for accuracy over annual approximation
  - Disability pension days from Industrial Accident Compensation Act Schedule 2 (grades 1-7 pension eligible)
  - Punitive damages capped at 3x per Product Liability Act Article 3-2

metrics:
  duration: ~2min
  completed: 2026-03-23
  tasks_completed: 3
  tasks_total: 3
  files_created: 3
  files_modified: 0
---

# Phase 09 Plan 02: Advanced Damages Calculators (DAMAGES-04~06) Summary

Three advanced damages calculators with Korean legal formulas: lost income via Hoffman coefficient, disability compensation per Industrial Accident Act 14-grade schedule, and product liability with punitive damages toggle.

## What Was Built

### Task 1: Lost Income Calculator (DAMAGES-04)
- Hoffman coefficient calculation using monthly rate (5%/12 per month)
- Inputs: age, monthly income, retirement age (60/65/custom), treatment period, disability rate, fault rate
- Fault offset applied to total (lost income + treatment loss)
- Legal reference: Supreme Court 88다카21219
- **Commit:** cb0b75d

### Task 2: Disability Compensation Calculator (DAMAGES-05)
- Full 14-grade disability data with payment days per Schedule 2
- Lump-sum calculation: daily wage x grade days
- Pension calculation for grades 1-7 with annual pension days
- Grade descriptions in select dropdown
- **Commit:** aa04f79

### Task 3: Product Liability Damages Calculator (DAMAGES-06)
- Three defect types: manufacturing, design, warning
- Property damage + medical + lost income with manufacturer fault ratio
- Consolation damages by scale (minor/medium/large)
- Punitive damages toggle (3x max, Article 3-2)
- Victim type distinction (individual vs business)
- **Commit:** 3c6fd52

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None - all calculators have complete calculation logic wired to UI.

## Self-Check: PASSED
