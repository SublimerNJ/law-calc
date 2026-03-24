---
phase: 24-ux
plan: "03"
subsystem: court-calculators
tags: [ux, validation, consistency, error-handling]
dependency_graph:
  requires: [24-01, 24-02]
  provides: [attorney-fee-validation, court-calculators-consistency]
  affects: [src/app/tools/court]
tech_stack:
  added: []
  patterns: [setError-pattern, error-block-above-button]
key_files:
  created: []
  modified:
    - src/app/tools/court/attorney-fee/page.tsx
    - src/app/tools/court/civil-mediation/page.tsx
    - src/app/tools/court/family-court/page.tsx
decisions:
  - attorney-fee silent return 제거, setError/setWarning 방식으로 통일
  - 에러 표시 위치: 계산 버튼 바로 위 블록 (5개 계산기 통일)
  - civil-mediation/family-court 인라인 에러 방식 → 버튼 위 블록 방식으로 이전
metrics:
  duration: "15min"
  completed: "2026-03-25"
  tasks_completed: 2
  files_modified: 3
---

# Phase 24 Plan 03: attorney-fee 감사 + 5개 계산기 일관성 통일 Summary

**One-liner:** attorney-fee silent return 제거 + 5개 court 계산기 에러 표시 방식 완전 통일 (버튼 위 red/orange 블록)

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | attorney-fee 계산기 UX·논리 감사 및 수정 | 77a1e50 | attorney-fee/page.tsx |
| 2 | 5개 계산기 일관성 통일 패스 (CONSIST-01/02/03) | af08656 | civil-mediation/page.tsx, family-court/page.tsx |

## What Was Done

### Task 1: attorney-fee 수정
- `if (!val || val <= 0) return;` → `setError('소가를 입력해주세요.')` / `setError('금액은 0보다 커야 합니다.')` 방식으로 변경
- `error`, `warning` useState 추가
- 비현실적 값(>1000억) 경고 추가
- 에러/경고 블록 JSX (bg-red-50/bg-orange-50) 버튼 위에 추가

### Task 2: 일관성 통일
- civil-mediation: 인라인 에러 표시 제거 → 버튼 위 블록으로 이전
- family-court: 인라인 에러 표시 제거 → 버튼 위 블록으로 이전
- 5개 모두 동일 패턴: 버튼 위 `bg-red-50 border-red-200 text-red-500` / `bg-orange-50 border-orange-200 text-orange-500`

## Verification

- `grep -c "0보다 커야|입력해주세요|비현실적|text-red-500|text-orange-500"` → 5개 모두 5+ 매치
- `npx tsc --noEmit` → 에러 없음
- `npm run build` → 성공

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED

- Commits 77a1e50 and af08656 exist in git log
- All 3 files modified contain required patterns
- Build successful
