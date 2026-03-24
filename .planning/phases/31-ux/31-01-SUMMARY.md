---
phase: 31-ux
plan: 01
subsystem: ui
tags: [react, tailwind, error-handling, ux, validation, traffic-calculators]

requires:
  - phase: 30-ux
    provides: 부동산 계산기 CONSIST-01~03 완료, error/warning 분리 패턴 확립

provides:
  - accident-settlement: 치료비 필수 에러, 100억 경고, 합의금 0원 안내, 필수 * 표시
  - drunk-driving: BAC 에러 처리, type=text+inputMode=decimal, light theme 경고 박스
  - fine-penalty: 형사처벌 항목 0원 안내, note 박스 light theme 수정
  - bail: 재산 100억 초과 경고, 안내 박스 light theme 수정

affects: [31-ux-02, 31-ux-03]

tech-stack:
  added: []
  patterns:
    - "error/warning 분리: setError(계산 차단) + setWarning(계산 허용) + plain <p> 표시"
    - "dark 테마 잔재 수정: bg-red-900/30→bg-red-50, bg-yellow-900/30→bg-yellow-50, text-red-300→text-red-600, text-yellow-400→text-yellow-700"
    - "BAC 입력: type=number→type=text+inputMode=decimal, replace(/[^0-9.]/g,'')"

key-files:
  created: []
  modified:
    - src/app/tools/traffic/accident-settlement/page.tsx
    - src/app/tools/traffic/drunk-driving/page.tsx
    - src/app/tools/traffic/fine-penalty/page.tsx
    - src/app/tools/traffic/bail/page.tsx

key-decisions:
  - "BAC type=number → type=text+inputMode=decimal: 모바일 UX 개선, 문자 입력 제한은 replace로 처리"
  - "형사처벌 항목 0원 안내: 'finalAmount===0 && violation.note' 조건으로 범칙금 없음 별도 안내"
  - "교통/형사 계산기 dark 테마 잔재(bg-red-900/30, bg-yellow-900/30) → light 테마로 통일"

patterns-established:
  - "에러(text-red-500)/경고(text-orange-500) 분리 패턴: 4개 교통/형사 계산기에 동일 적용"
  - "결과 0원 안내: bg-blue-50 border border-blue-200 박스, text-blue-600 텍스트"

requirements-completed: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, CONSIST-01, CONSIST-02, CONSIST-03, EDGE-01, EDGE-02, EDGE-03]

duration: 15min
completed: 2026-03-25
---

# Phase 31 Plan 01: 교통/형사 계산기 UX 감사 Summary

**4개 교통/형사 계산기에 에러/경고 state 추가, BAC type=text+inputMode=decimal 변경, dark 테마 잔재(bg-red-900/30, bg-yellow-900/30) → light 테마 전면 수정**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-25T00:00:00Z
- **Completed:** 2026-03-25T00:15:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- accident-settlement: 치료비 필수 검증(에러), 100억 초과 경고, 합의금 0원 안내 박스, 필수 필드 * 표시 완료
- drunk-driving: BAC 빈값/초과 에러 처리, type=text+inputMode=decimal로 모바일 UX 개선, 경고 박스 light 색상 수정
- fine-penalty: 형사처벌 항목 선택 시 0원 별도 안내, note 박스 bg-red-50 light 색상 수정
- bail: 재산 100억 초과 경고, 안내 박스 bg-yellow-50/text-yellow-700 수정

## Task Commits

1. **Task 1: accident-settlement 계산기 UX·논리 감사 및 수정** - `f509f58` (feat)
2. **Task 2: drunk-driving + fine-penalty + bail 계산기 UX·논리 감사 및 수정** - `3f0e0c2` (feat)

## Files Created/Modified

- `src/app/tools/traffic/accident-settlement/page.tsx` - error/warning state, 치료비 필수, 0원 안내, 필수 * 추가
- `src/app/tools/traffic/drunk-driving/page.tsx` - error state, BAC 에러 처리, type=text+inputMode=decimal, light theme 경고 박스
- `src/app/tools/traffic/fine-penalty/page.tsx` - 형사처벌 0원 안내, note 박스 light 색상
- `src/app/tools/traffic/bail/page.tsx` - warning state, 100억 경고, 안내 박스 light 색상, 재산 라벨 (선택) 명시

## Decisions Made

- BAC 입력 필드를 type=number에서 type=text+inputMode=decimal로 변경 — 모바일에서 소수점 입력이 자연스럽고, 문자 입력은 replace(/[^0-9.]/g,'')로 제한
- fine-penalty의 형사처벌 항목은 결과 0원이 논리적으로 맞지만 사용자 혼란을 줄이기 위해 bg-blue-50 별도 안내 추가

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - TypeScript 컴파일 에러 없음, 모든 acceptance criteria 충족.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 4개 교통/형사 계산기 error/warning 패턴 적용 완료
- 31-ux-02, 31-ux-03 진행 가능

---
*Phase: 31-ux*
*Completed: 2026-03-25*
