---
phase: 25-ux
plan: "03"
subsystem: family-calculators
tags: [consistency, error-style, ux, tailwind]
dependency_graph:
  requires: [25-01, 25-02]
  provides: [CONSIST-01, CONSIST-02, CONSIST-03]
  affects: [family/alimony, family/child-support, family/property-division, family/inheritance-tax, family/forced-heirship, family/inheritance-order]
tech_stack:
  added: []
  patterns: [text-red-500 text-sm mb-3, text-orange-500 text-sm mb-3]
key_files:
  created: []
  modified:
    - src/app/tools/family/inheritance-tax/page.tsx
    - src/app/tools/family/forced-heirship/page.tsx
    - src/app/tools/family/inheritance-order/page.tsx
decisions:
  - "Unified error style to inline p tag (text-red-500 text-sm mb-3) rather than styled div — matches alimony/child-support/property-division pattern from Wave 1"
metrics:
  duration: "10 minutes"
  completed: "2026-03-25"
  tasks_completed: 1
  files_modified: 3
---

# Phase 25 Plan 03: Family Calculator Consistency Pass Summary

One-liner: Unified error/warning message styles across 6 family calculators by replacing block-styled div containers with inline text classes matching the Wave 1 standard.

## What Was Done

Wave 2 consistency audit of the 6 family/family-law calculators (alimony, child-support, property-division, inheritance-tax, forced-heirship, inheritance-order).

### Audit Results

**CONSIST-01 (입력 방식 통일):** All 5 money-field calculators already had `inputMode="numeric"` and numeric-only onChange handlers. No changes needed.

**CONSIST-02 (결과 표시 통일):** All calculators use `formatNumber()` (wrapping `toLocaleString('ko-KR')`) with "원" suffix. No changes needed.

**CONSIST-03 (에러 메시지 스타일):** Three calculators (inheritance-tax, forced-heirship, inheritance-order) used block-style error containers:
```tsx
<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
  <p className="text-sm text-red-500">{error}</p>
</div>
```
While alimony, child-support, property-division used the standard inline style:
```tsx
{error && <p className="text-red-500 text-sm mb-3">{error}</p>}
```
Fixed by replacing block-style containers with inline text in all 3 files.

## Commits

- `c451bfb` feat(25-ux-03): unify error/warning message style across 6 family calculators

## Deviations from Plan

None — plan executed exactly as written. Wave 1 had already applied CONSIST-01 and CONSIST-02 correctly; only CONSIST-03 required fixes in 3 files.

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/family/inheritance-tax/page.tsx: modified, error style unified
- src/app/tools/family/forced-heirship/page.tsx: modified, error style unified
- src/app/tools/family/inheritance-order/page.tsx: modified, error style unified
- commit c451bfb: verified in git log
- npx tsc --noEmit: passed with no errors
