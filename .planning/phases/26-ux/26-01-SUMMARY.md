---
phase: 26-ux
plan: 01
subsystem: ui
tags: [react, typescript, nextjs, validation, labor-calculators]

# Dependency graph
requires: []
provides:
  - severance-pay 계산기 입력 검증, 에러/경고 표시, 필수 필드 * 표시
  - dismissal-notice 계산기 입력 검증, 에러/경고 표시, 필수 필드 * 표시
  - annual-leave-pay 계산기 입력 검증, 에러/경고 표시, 필수 필드 * 표시
affects: [26-ux]

# Tech tracking
tech-stack:
  added: []
  patterns: [error state with text-red-500, warning state with text-orange-500, setError/setWarning pattern, type=text+inputMode=numeric for numeric fields]

key-files:
  created: []
  modified:
    - src/app/tools/labor/severance-pay/page.tsx
    - src/app/tools/labor/dismissal-notice/page.tsx
    - src/app/tools/labor/annual-leave-pay/page.tsx

key-decisions:
  - "에러(text-red-500)와 경고(text-orange-500) 분리: 에러는 계산 차단, 경고는 계산 허용 — 노동 3종 계산기에도 동일 패턴 적용"
  - "type=number 필드를 type=text+inputMode=numeric으로 교체하여 INPUT-04 일관성 확보"

patterns-established:
  - "필수 입력 필드 라벨에 <span class=text-red-500>*</span> 표시"
  - "handleCalculate 시작 시 setError(null)/setWarning(null) 초기화"
  - "에러 발생 시 setResult(null)으로 이전 결과 숨김"

requirements-completed: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, EDGE-01, EDGE-02, EDGE-03]

# Metrics
duration: 15min
completed: 2026-03-25
---

# Phase 26 Plan 01: Labor Calculators UX Audit Summary

**퇴직금·해고예고수당·연차수당 3개 노동 계산기에 에러/경고 state, 입력 검증, 필수 필드 표시, 엣지케이스 처리 표준화 완료**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-25T00:00:00Z
- **Completed:** 2026-03-25T00:15:00Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- 3개 계산기 모두 silent return 제거, 에러 메시지 표시로 대체
- 에러(text-red-500)/경고(text-orange-500) 분리 패턴 적용
- type=number 필드를 type=text+inputMode=numeric으로 교체 (INPUT-04)
- 필수 필드 라벨에 * 표시 (FLOW-03)
- 초기 상태에서 result=null로 0원 결과 미노출 확인 (FLOW-01)

## Task Commits

1. **Task 1: severance-pay 계산기 UX·논리 감사 및 수정** - `356eeaf` (feat)
2. **Task 2: dismissal-notice 계산기 UX·논리 감사 및 수정** - `20bd02e` (feat)
3. **Task 3: annual-leave-pay 계산기 UX·논리 감사 및 수정** - `6cc5c4b` (feat)

## Files Created/Modified
- `src/app/tools/labor/severance-pay/page.tsx` - error/warning state, 날짜 검증, 임금 검증, 필수 * 표시
- `src/app/tools/labor/dismissal-notice/page.tsx` - error/warning state, 예고일수 범위 검증, 수당 0원 안내, 필수 * 표시
- `src/app/tools/labor/annual-leave-pay/page.tsx` - error/warning state, 연차 25일 초과 경고, 임금 검증, 필수 * 표시

## Decisions Made
- 에러(text-red-500)/경고(text-orange-500) 분리 패턴: 노동 3종 계산기에도 기존 상속 계산기와 동일하게 적용 (STATE.md decision과 일관)
- dismissal-notice의 noticeDays 및 annual-leave-pay의 unusedDays를 type=text+inputMode=numeric으로 교체 — 음수 입력 차단 및 모바일 UX 개선

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 노동 계산기 3종 입력 검증 완료, 26-02/26-03 계획 진행 준비
- 모든 TypeScript 컴파일 에러 없음 확인

---
*Phase: 26-ux*
*Completed: 2026-03-25*
