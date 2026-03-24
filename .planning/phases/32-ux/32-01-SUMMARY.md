---
phase: 32-ux
plan: 01
subsystem: ui
tags: [react, typescript, nextjs, tailwind, validation, damages]

# Dependency graph
requires: []
provides:
  - damages-general 계산기: 재산손해액 필수 에러, 100억 경고, 0원 안내, * 표시, type=text 과실비율
  - defamation 계산기: 유포기간 음수 차단, type=text 변경, 선택 명시
  - medical-malpractice 계산기: 과실비율 필수 에러, 장해율 상한 에러, 100억 경고, 0원 안내, type=text
  - lost-income 계산기: 나이/소득 필수 에러, 나이>=가동연한 에러, 0원 안내, * 표시
affects: [32-ux-02, 32-ux-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "error state (text-red-500) / warning state (text-orange-500) 분리: 에러는 계산 차단, 경고는 허용"
    - "필수 필드 라벨에 * 추가, type=number → type=text+inputMode=decimal 교체"
    - "0원 결과 안내: bg-blue-50 border-blue-200 블록"
    - "에러/경고 표시: 버튼 바로 위 plain <p> 패턴"

key-files:
  created: []
  modified:
    - src/app/tools/damages/damages-general/page.tsx
    - src/app/tools/damages/defamation/page.tsx
    - src/app/tools/damages/medical-malpractice/page.tsx
    - src/app/tools/damages/lost-income/page.tsx

key-decisions:
  - "damages 4종 계산기에도 error/warning 분리 패턴 적용 (기존 노동/세금/부동산 패턴과 동일)"
  - "defamation은 select 기반이므로 별도 에러 state 불필요, type=text+음수차단만 적용"
  - "lost-income은 노동능력상실률을 실질 필수로 간주, * 표시 추가"

patterns-established:
  - "damages 카테고리 계산기 error/warning 패턴: setError+setWarning, text-red-500/text-orange-500, 버튼 위 표시"

requirements-completed: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, CONSIST-01, CONSIST-02, CONSIST-03, EDGE-01, EDGE-02, EDGE-03]

# Metrics
duration: 15min
completed: 2026-03-25
---

# Phase 32 Plan 01: damages 4종 계산기 UX 감사 및 수정 Summary

**손해배상 4개 계산기(damages-general, defamation, medical-malpractice, lost-income)에 에러/경고 state, 필수 필드 표시, type=text 변환, 0원 결과 안내 추가로 16개 UX 요구사항 충족**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-25T00:00:00Z
- **Completed:** 2026-03-25T00:15:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- damages-general: 재산손해액 필수 에러(INPUT-02), 100억 초과 경고(INPUT-03), 총배상액 0원 안내(RESULT-01), 필수 * 표시(FLOW-03), 과실비율 type=text+inputMode=decimal(INPUT-04)
- defamation: 유포기간 음수 차단 및 type=text+inputMode=decimal(INPUT-01/04), 라벨 선택 명시(FLOW-03)
- medical-malpractice: 과실비율 필수 에러, 100% 초과 에러(INPUT-02), 후유장해율 100 초과 에러(EDGE-01), 치료비 100억 경고(INPUT-03), 0원 안내(RESULT-01), doctorFault·disabilityRate type=text(INPUT-04)
- lost-income: 나이/월순수입/가동연한 필수 에러(INPUT-02), 나이>=가동연한 에러(EDGE-01), 일실수입 0원 안내(RESULT-01), 3개 필수 라벨 * 표시(FLOW-03)

## Task Commits

Each task was committed atomically:

1. **Task 1: damages-general + defamation 계산기 UX·논리 감사 및 수정** - `4d0aeb2` (feat)
2. **Task 2: medical-malpractice + lost-income 계산기 UX·논리 감사 및 수정** - `8808f0b` (feat)

## Files Created/Modified
- `src/app/tools/damages/damages-general/page.tsx` - error/warning state 추가, 필수 검증, type=text 전환, 0원 안내
- `src/app/tools/damages/defamation/page.tsx` - 유포기간 type=text, 음수 차단, 선택 명시
- `src/app/tools/damages/medical-malpractice/page.tsx` - error/warning state 추가, 과실비율·장해율 검증, type=text 전환
- `src/app/tools/damages/lost-income/page.tsx` - error state 추가, 나이/소득/가동연한 검증, 0원 안내, * 표시

## Decisions Made
- damages 4종 계산기에도 기존 노동/세금/부동산 계산기와 동일한 error/warning 분리 패턴 적용
- defamation은 select 위주이므로 별도 error state 없이 type=text+replace만으로 INPUT-01/04 처리
- lost-income의 노동능력상실률은 0이면 결과도 0이므로 실질 필수로 간주해 * 표시 추가

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- 손해배상 4종 계산기 16개 UX 요구사항 전부 충족 완료
- Phase 32 Plan 02로 진행 가능

---
*Phase: 32-ux*
*Completed: 2026-03-25*
