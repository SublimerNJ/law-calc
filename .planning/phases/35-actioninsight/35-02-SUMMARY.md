---
phase: 35-actioninsight
plan: 02
subsystem: labor-calculators
tags: ["action-insight", "ui", "labor"]
dependency_graph:
  requires: ["35-01"]
  provides: ["해고예고수당 ActionInsight UI 통합", "연차수당 ActionInsight UI 통합", "연장근로수당 ActionInsight UI 통합"]
  affects: [
    "src/app/tools/labor/dismissal-notice/page.tsx",
    "src/app/tools/labor/annual-leave-pay/page.tsx",
    "src/app/tools/labor/overtime-pay/page.tsx"
  ]
tech_stack:
  added: []
  patterns: ["Component Integration"]
key_files:
  created: []
  modified: [
    "src/app/tools/labor/dismissal-notice/page.tsx",
    "src/app/tools/labor/annual-leave-pay/page.tsx",
    "src/app/tools/labor/overtime-pay/page.tsx"
  ]
key_decisions:
  - "각 계산기 페이지의 결과 블록(result !== null) 내부 하단에 ActionInsight 컴포넌트를 삽입하여 결과가 있을 때만 보이도록 함"
metrics:
  tasks_completed: 3
  files_modified: 3
  completed_at: 2026-04-10
---

# Phase 35 Plan 02: 노동/근로 계산기 3종 ActionInsight 연동 Summary

해고예고수당, 연차수당, 연장근로수당 계산기 3종에 `ActionInsight` 컴포넌트를 연동하여 계산 결과 하단에 실전 대응 팁과 액션 템플릿을 표시하도록 구현했습니다.

## Tasks Completed
1. 해고예고수당 계산기(dismissal-notice)에 ActionInsight 연동 (id: dismissal-notice, amount: result.allowance)
2. 연차수당 계산기(annual-leave-pay)에 ActionInsight 연동 (id: annual-leave-pay, amount: result.totalPay)
3. 연장근로수당 계산기(overtime-pay)에 ActionInsight 연동 (id: overtime-pay, amount: result.total)

## Deviations from Plan
None - plan executed exactly as written.

## Self-Check: PASSED
- `src/app/tools/labor/dismissal-notice/page.tsx` 수정됨
- `src/app/tools/labor/annual-leave-pay/page.tsx` 수정됨
- `src/app/tools/labor/overtime-pay/page.tsx` 수정됨
- 모든 페이지에서 `ActionInsight` 렌더링 확인
- `npx tsc --noEmit` 통과
