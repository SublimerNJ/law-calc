---
phase: 28-ux
plan: 01
subsystem: ui
tags: [react, typescript, tailwind, tax-calculator, validation, ux]

# Dependency graph
requires: []
provides:
  - capital-gains-tax 계산기 error/warning state + 날짜 역전 방지 + 비현실값 경고 + 양도차익 0 안내 + 필수 필드 *
  - comprehensive-income-tax 계산기 error/warning state + 소득 미입력 에러 + 10억 경고 + 과세표준 0 안내 + 필수 필드 *
affects: [29-ux, future-tax-calculator-plans]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "error/warning 분리 패턴: setError(text-red-500 계산 차단) + setWarning(text-orange-500 계산 허용)"
    - "handleCalculate 시작 시 setError(null)/setWarning(null) 초기화"
    - "에러/경고 표시 위치: 계산하기 버튼 바로 위 plain <p> 태그"
    - "number 입력 필드: type=text + inputMode=numeric + replace(/[^0-9]/g, '')"

key-files:
  created: []
  modified:
    - src/app/tools/tax/capital-gains-tax/page.tsx
    - src/app/tools/tax/comprehensive-income-tax/page.tsx

key-decisions:
  - "에러(text-red-500)와 경고(text-orange-500) 분리 패턴을 세금 2종 계산기에 동일 적용 (기존 28-ux 결정 준수)"
  - "양도일 <= 취득일 날짜 역전은 에러로 처리 (계산 차단), 비현실값(100억/10억 초과)은 경고로 처리 (계산 허용)"

patterns-established:
  - "세금 계산기 공통 UX 패턴: error/warning state + plain <p> 표시 + 버튼 바로 위 위치"

requirements-completed: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, EDGE-01, EDGE-02, EDGE-03]

# Metrics
duration: 15min
completed: 2026-03-25
---

# Phase 28 Plan 01: Tax Calculator UX Audit Summary

**capital-gains-tax·comprehensive-income-tax 2개 계산기에 입력 검증, 날짜 역전 방지, 비현실값 경고, 양도차익/과세표준 0원 안내, 필수 필드 * 표시 완료**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-25T00:00:00Z
- **Completed:** 2026-03-25T00:15:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- capital-gains-tax: error/warning state 추가, 취득가액/양도가액 미입력 에러, 날짜 역전(양도일 <= 취득일) 에러, 100억 초과 경고, 양도차익 0 이하 안내, residenceYears type=text 수정, 필수 필드 * 표시
- comprehensive-income-tax: error/warning state 추가, 종합소득금액 미입력/0 에러, 10억 초과 경고, 공제액 > 소득 경고, 과세표준 0원 안내, dependents type=text 수정, 필수 필드 * 표시
- TypeScript 컴파일 에러 없음 (npx tsc --noEmit 통과)

## Task Commits

1. **Task 1: capital-gains-tax 계산기 UX 감사 및 수정** - `d9c34e0` (feat)
2. **Task 2: comprehensive-income-tax 계산기 UX 감사 및 수정** - `c5ad838` (feat)

## Files Created/Modified
- `src/app/tools/tax/capital-gains-tax/page.tsx` - error/warning state, 날짜 역전 방지, 필수 필드 *, 양도차익 0 안내
- `src/app/tools/tax/comprehensive-income-tax/page.tsx` - error/warning state, 소득 미입력 에러, 10억 경고, 과세표준 0 안내, 필수 필드 *

## Decisions Made
- 에러/경고 분리 패턴(text-red-500/text-orange-500)은 이전 Phase 26~27 결정을 동일하게 적용
- 양도일 <= 취득일: 계산 차단 에러 (논리적으로 보유기간이 0 이하가 되어 세율 계산 불가)
- 100억/10억 초과: 계산 허용 경고 (비현실적이지만 계산 자체는 가능)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- 세금 2종 계산기 UX 표준화 완료, 28-02 다음 계산기 그룹으로 진행 가능

---
*Phase: 28-ux*
*Completed: 2026-03-25*
