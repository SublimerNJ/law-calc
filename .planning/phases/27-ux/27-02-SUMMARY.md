---
phase: 27-ux
plan: 02
subsystem: ui
tags: [react, nextjs, tailwind, labor-calculators, input-validation, ux]

requires: []
provides:
  - parental-leave 계산기 에러/경고 state, 계산식 주석 수정 (상한 150→250/200/160만원)
  - unemployment-benefit 계산기 에러/경고 state, 필수 필드 * 표시
  - shutdown-allowance 계산기 에러/경고 state, 필수 필드 * 표시, 복수 입력 검증
affects: [27-ux-03]

tech-stack:
  added: []
  patterns:
    - "에러(text-red-500)/경고(text-orange-500) plain <p> 패턴 — 노동 계산기 3종 추가 적용"
    - "계산 시작 시 setError(null)/setWarning(null) 클리어 패턴"
    - "필수 필드 라벨에 * suffix 패턴"

key-files:
  created: []
  modified:
    - src/app/tools/labor/parental-leave/page.tsx
    - src/app/tools/labor/unemployment-benefit/page.tsx
    - src/app/tools/labor/shutdown-allowance/page.tsx

key-decisions:
  - "shutdown-allowance는 calculated boolean 플래그 유지 (result state 전환은 과도한 리팩터링)"
  - "shutdown-allowance 복수 경고는 단일 문자열 연결로 처리 (배열 대신)"

patterns-established:
  - "에러: 계산 차단 + setResult(null) / 경고: 계산 허용, 1억원/500,000원 기준"

requirements-completed: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, CONSIST-01, CONSIST-02, CONSIST-03, EDGE-01, EDGE-02, EDGE-03]

duration: 3min
completed: 2026-03-25
---

# Phase 27 Plan 02: Labor Calculator UX Audit Summary

**parental-leave/unemployment-benefit/shutdown-allowance 3개 노동 계산기에 에러/경고 state, 필수 필드 * 표시, parental-leave 계산식 주석 수정(상한 150→250/200/160만원 단계별) 적용**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-24T22:35:35Z
- **Completed:** 2026-03-24T22:38:33Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- parental-leave: error/warning state 추가, 임금 미입력 에러, 1억 초과 경고, 계산식 주석 수정 (상한 150만원 → 1~3개월 250/4~6개월 200/7개월~ 160만원), 필수 필드 * 표시
- unemployment-benefit: error/warning state 추가, 월임금 미입력 에러, 1억 초과 경고, 필수 필드 * 표시
- shutdown-allowance: error/warning state 추가, 평균임금/휴업일수 개별 미입력 에러, 승인 지급률 미입력 에러, 비현실값 경고, 필수 필드 * 표시

## Task Commits

1. **Task 1: parental-leave 계산기 UX·논리 감사 및 수정** - `d941fa8` (feat)
2. **Task 2: unemployment-benefit 계산기 UX·논리 감사 및 수정** - `d0f5e49` (feat)
3. **Task 3: shutdown-allowance 계산기 UX·논리 감사 및 수정** - `4eeac55` (feat)

## Files Created/Modified

- `src/app/tools/labor/parental-leave/page.tsx` - error/warning state, 계산식 주석 수정, 필수 * 표시
- `src/app/tools/labor/unemployment-benefit/page.tsx` - error/warning state, 필수 * 표시
- `src/app/tools/labor/shutdown-allowance/page.tsx` - error/warning state, 복수 입력 검증, 필수 * 표시

## Decisions Made

- shutdown-allowance `calculated` boolean 플래그는 유지 — result state 방식 전환은 과도한 리팩터링이므로 에러 state를 추가하는 최소 변경 방식 선택
- shutdown-allowance 복수 경고(평균임금 + 휴업일수 동시 초과) 시 문자열 연결로 단일 warning state에 처리

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## Known Stubs

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 3개 노동 계산기 에러/경고/필수 표시 완료, Phase 27-03으로 진행 가능
- TypeScript 컴파일 에러 없음 확인

---
*Phase: 27-ux*
*Completed: 2026-03-25*

## Self-Check: PASSED

- `src/app/tools/labor/parental-leave/page.tsx` — FOUND
- `src/app/tools/labor/unemployment-benefit/page.tsx` — FOUND
- `src/app/tools/labor/shutdown-allowance/page.tsx` — FOUND
- Commits d941fa8, d0f5e49, 4eeac55 — FOUND
