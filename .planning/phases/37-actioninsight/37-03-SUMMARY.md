---
phase: 37-actioninsight
plan: 3
subsystem: realty-calculators
tags: [actioninsight, dsr, ltv, dti, ui-integration]
dependency_graph:
  requires: ["37-01", "37-02"]
  provides: ["ActionInsight in DSR, LTV, DTI calculators"]
  affects: [
    "src/app/tools/realty/dsr/page.tsx",
    "src/app/tools/realty/ltv/page.tsx",
    "src/app/tools/realty/dti/page.tsx"
  ]
tech_stack:
  added: []
  patterns: ["Component integration"]
key_files:
  created: []
  modified: [
    "src/app/tools/realty/dsr/page.tsx",
    "src/app/tools/realty/ltv/page.tsx",
    "src/app/tools/realty/dti/page.tsx"
  ]
metrics:
  duration: 2m
  completed_date: "2026-04-10"
key_decisions:
  - "Integrated ActionInsight component at the bottom of the result block for DSR, LTV, and DTI calculators"
---

# Phase 37 Plan 3: DSR, LTV, DTI 계산기 ActionInsight 연동 Summary

**Integrated ActionInsight component into the DSR, LTV, and DTI calculators**

## Key Achievements

- **DSR, LTV, DTI Calculators Integration:** 
  - Added `ActionInsight` component rendering within the result section of `dsr/page.tsx`, `ltv/page.tsx`, and `dti/page.tsx`.
  - Passed respective calculated amounts (`result.dsr`, `result.ltv`, `result.dti`) to the `amount` prop for tailored insights.

## Deviations from Plan

- None - plan executed exactly as written.

## Known Stubs

- None

## Self-Check: PASSED