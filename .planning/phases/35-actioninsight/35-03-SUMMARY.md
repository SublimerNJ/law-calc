---
phase: 35-actioninsight
plan: 03
subsystem: labor-calculators
tags:
  - action-insight
  - ui-integration
  - weekly-holiday-pay
  - minimum-wage-check
  - shutdown-allowance
requires:
  - 35-01
provides:
  - UI-03
affects:
  - src/app/tools/labor/weekly-holiday-pay/page.tsx
  - src/app/tools/labor/minimum-wage-check/page.tsx
  - src/app/tools/labor/shutdown-allowance/page.tsx
tech-stack:
  added: []
  patterns:
    - ActionInsight component rendering on result
key-files:
  modified:
    - src/app/tools/labor/weekly-holiday-pay/page.tsx
    - src/app/tools/labor/minimum-wage-check/page.tsx
    - src/app/tools/labor/shutdown-allowance/page.tsx
key-decisions:
  - replaced existing hardcoded tips sections with dynamic ActionInsight component where applicable
  - minimum-wage-check ActionInsight displays only when violation occurs
metrics:
  duration: 5m
  completed_date: "2026-04-10"
---

# Phase 35 Plan 03: ActionInsight 연동 (주휴/최저/휴업) Summary

## Goal
노동/근로 계산기 3종 (주휴수당, 최저임금, 휴업수당) 하단에 `ActionInsight` 컴포넌트를 연동하여 실무 적용력을 높임.

## Actions Taken
- `src/app/tools/labor/weekly-holiday-pay/page.tsx`: 계산 결과 생성 시 `ActionInsight` 노출 (amount: 주휴수당 금액)
- `src/app/tools/labor/minimum-wage-check/page.tsx`: 최저임금 위반 시에만 `ActionInsight` 노출 및 기존 하드코딩된 안내사항 교체
- `src/app/tools/labor/shutdown-allowance/page.tsx`: 계산 결과 생성 시 `ActionInsight` 노출 및 기존 하드코딩된 안내사항 교체
- `import { ActionInsight } from '@/components/ui/ActionInsight'`로 Named Import 수정

## Deviations from Plan
### Auto-fixed Issues
**1. [Rule 3 - Issue] ActionInsight Import Error Fixed**
- **Found during:** Task 1-3 Verification
- **Issue:** `ActionInsight` 컴포넌트를 Default Import로 가져와 타입 에러 발생.
- **Fix:** Named Import(`import { ActionInsight }`)로 수정하여 해결.

## Self-Check: PASSED