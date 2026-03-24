---
phase: 32-ux
plan: 02
subsystem: ui
tags: [react, tailwind, light-theme, error-handling, ux]

# Dependency graph
requires: []
provides:
  - statute-of-limitations: 기산일 필수 에러, 미래기산일 경고, 남은기간 light 색상, 기산일 라벨 *
  - public-defender: 결과 박스 light 색상, 재량 국선 판정기준 필드 명시
  - legal-aid: 결과/안내 박스 light 색상, 소득·재산 판정기준 필드 명시
  - certified-letter: 필수 4개 필드 에러 처리, * 표시, 미래 발신일 경고
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "error state (text-red-500) + warning state (text-orange-500) 분리 — 기타 법률도구에도 동일 패턴 적용"
    - "dark 테마 잔재 (bg-*-900/30, text-*-400) → light 테마 (bg-*-50, text-*-700) 전환"

key-files:
  created: []
  modified:
    - src/app/tools/misc/statute-of-limitations/page.tsx
    - src/app/tools/misc/public-defender/page.tsx
    - src/app/tools/misc/legal-aid/page.tsx
    - src/app/tools/misc/certified-letter/page.tsx

key-decisions:
  - "기산일·발신일 미래 날짜는 차단하지 않고 경고만 표시 — 계약 만료일 등 미래 기산도 법적으로 유효"
  - "소득·재산 0원 입력은 에러 아닌 유효값 (무직/무재산) — 에러 없이 판정 진행"

patterns-established:
  - "필드 판정기준 명시: 소득·재산 라벨에 '(판정 기준)' 텍스트 포함"

requirements-completed: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, CONSIST-01, CONSIST-02, CONSIST-03, EDGE-01, EDGE-02, EDGE-03]

# Metrics
duration: 10min
completed: 2026-03-25
---

# Phase 32 Plan 02: 기타 법률도구 4개 UX·색상 감사 Summary

**4개 기타 법률도구(소멸시효·국선변호인·법률구조공단·내용증명)에 dark 테마 색상 잔재 제거, 필수 필드 에러 처리, * 표시를 일괄 적용하여 라이트 테마 가독성 완전 확보**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-25T00:00:00Z
- **Completed:** 2026-03-25T00:10:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- statute-of-limitations: 기산일 미입력 에러 처리, 미래기산일 경고, 남은기간 text-red-600/text-green-600 light 색상, 기산일 라벨 *
- public-defender: 결과 박스 bg-green-50/bg-red-50, text-green-700/text-red-700으로 light 전환, 재량 국선 필드 판정기준 명시
- legal-aid: 결과 박스 + 신청 안내 박스 전체 light 색상(bg-blue-50, text-blue-700, text-orange-600), 판정기준 필드 명시
- certified-letter: handlePreview에 4개 필수 필드 순차 검증, 미래 발신일 경고, 라벨 * 표시

## Task Commits

1. **Task 1: statute-of-limitations + public-defender** - `a49de4d` (feat)
2. **Task 2: legal-aid + certified-letter** - `f6b203c` (feat)

## Files Created/Modified
- `src/app/tools/misc/statute-of-limitations/page.tsx` - error/warning state 추가, 기산일 에러, light 색상
- `src/app/tools/misc/public-defender/page.tsx` - 결과 박스 light 색상, 판정기준 라벨
- `src/app/tools/misc/legal-aid/page.tsx` - 결과/안내 박스 light 색상, 판정기준 라벨
- `src/app/tools/misc/certified-letter/page.tsx` - 필수 필드 에러 처리, *, 미래 발신일 경고

## Decisions Made
- 기산일·발신일 미래 날짜는 차단하지 않고 경고(text-orange-500)만 표시 — 계약 만료일 등 미래 기산도 법적으로 유효
- 소득·재산 0원 입력은 에러 아닌 유효값(무직/무재산)으로 처리

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- 4개 기타 법률도구 모두 CONSIST-01~03 충족, light 테마 완전 전환 완료
- Phase 32 plan 03 진행 가능

---
*Phase: 32-ux*
*Completed: 2026-03-25*
