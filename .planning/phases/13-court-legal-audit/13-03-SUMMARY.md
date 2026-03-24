---
phase: 13-court-legal-audit
plan: "03"
subsystem: court-calculators
tags: [legal-audit, stamp-fee, boundary-fix, civil-mediation, family-court]
dependency_graph:
  requires: []
  provides: [COURT-04, COURT-05]
  affects: [civil-mediation, family-court]
tech_stack:
  added: []
  patterns: [boundary-operator-fix]
key_files:
  modified:
    - src/app/tools/court/civil-mediation/page.tsx
    - src/app/tools/court/family-court/page.tsx
decisions:
  - "민사소송등인지법 별표 1의 소가 구간 기준은 '미만'(<)이므로 경계값 연산자를 <= → < 로 수정"
metrics:
  duration: "5m"
  completed: "2026-03-24"
  tasks: 2
  files: 2
---

# Phase 13 Plan 03: Civil-Mediation & Family-Court 경계값 수정 Summary

**One-liner:** civil-mediation, family-court 인지대 소가 구간 경계값 연산자를 <= (이하)에서 < (미만)으로 수정하여 민사소송등인지법 별표 1 준수

## What Was Built

민사조정(civil-mediation)과 가사소송(family-court) 두 계산기의 인지대 계산 함수에서 소가 구간 경계값 비교 연산자를 수정했다. 민사소송등인지법 별표 1은 각 구간의 상한을 "미만"(미만, less than)으로 규정하므로 `<=`(이하)가 아닌 `<`(미만)을 사용해야 한다.

소가가 정확히 경계값(1,000만원 / 1억원 / 10억원)일 때 기존 코드는 하위 구간 공식을 적용했으나, 법령 기준으로는 상위 구간 공식을 적용해야 한다.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | civil-mediation 경계값 수정 | 52ba3e7 | src/app/tools/court/civil-mediation/page.tsx |
| 2 | family-court 경계값 수정 | aebdcb0 | src/app/tools/court/family-court/page.tsx |

## Changes Made

### civil-mediation/page.tsx — calculateLawsuitStampFee()
- Line 21: `amount <= 10_000_000` → `amount < 10_000_000`
- Line 24: `amount <= 100_000_000` → `amount < 100_000_000`
- Line 26: `amount <= 1_000_000_000` → `amount < 1_000_000_000`

### family-court/page.tsx — calculateStampFee()
- Line 78: `amount <= 10_000_000` → `amount < 10_000_000`
- Line 81: `amount <= 100_000_000` → `amount < 100_000_000`
- Line 83: `amount <= 1_000_000_000` → `amount < 1_000_000_000`

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/court/civil-mediation/page.tsx: 0 instances of `amount <=`, 3 instances of `amount <`
- src/app/tools/court/family-court/page.tsx: 0 instances of `amount <=`, 3 instances of `amount <`
- Commits 52ba3e7 and aebdcb0 confirmed in git log
