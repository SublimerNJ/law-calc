---
phase: 15-labor-legal-audit
plan: "02"
subsystem: labor-calculators
tags: [labor-law, overtime-pay, weekly-holiday-pay, annual-leave-pay, legal-audit]

requires:
  - phase: 15-labor-legal-audit
    provides: audit framework from 15-01

provides:
  - 연장근로수당 계산기 법률 감사 완료 (근로기준법 제56조 준수 확인)
  - 주휴수당 계산기 법률 감사 완료 (근로기준법 제55조, 제18조 제3항 준수 확인)
  - 연차수당 계산기 법률 감사 완료 (근로기준법 제60조, 제61조 준수 확인)

affects: [phase-16, phase-17, phase-18, phase-19, phase-20, phase-21]

tech-stack:
  added: []
  patterns:
    - "법령 조문 번호 정확 표기 (제XX조 제X항)"
    - "사용촉진 등 예외 조항은 명시적으로 설명하여 사용자 오해 방지"

key-files:
  created: []
  modified:
    - src/app/tools/labor/overtime-pay/page.tsx
    - src/app/tools/labor/annual-leave-pay/page.tsx

key-decisions:
  - "연장근로 한도는 1주 12시간(제53조 제1항)이며, '52시간'은 주 총근로시간 한도(기본40+연장12)이므로 레이블 수정"
  - "제61조 사용촉진 조항은 수당 면제 조건을 명시해야 오해 없음"
  - "주휴수당 계산기는 법령 완전 준수 - 변경 불필요"

patterns-established:
  - "연장근로 관련 안내 레이블에는 주 단위 한도를 명시"

requirements-completed: [LABOR-04, LABOR-05, LABOR-03]

duration: 15min
completed: 2026-03-24
---

# Phase 15 Plan 02: Labor Legal Audit (Overtime/Holiday/Annual Leave) Summary

**근로기준법 제53조·제56조·제55조·제60조·제61조 대조로 연장근로·주휴·연차수당 3개 계산기 법률 감사 완료 및 안내 오류 2건 수정**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-24T03:10:00Z
- **Completed:** 2026-03-24T03:25:00Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- 연장근로수당 계산기: 가산율(연장 1.5배, 야간 0.5배 가산, 휴일 8h이내 1.5배/초과 2.0배) 모두 제56조와 일치 확인. 연장근로 한도 레이블 오류(52시간→1주 12시간) 수정
- 주휴수당 계산기: 주 15시간 미만 제외(제18조 제3항), 주휴시간 비례계산, 개근 조건(제55조, 시행령 제30조) 모두 정확. 수정 불필요
- 연차수당 계산기: 연차 일수 기준 안내(제60조) 추가 및 제61조 사용촉진 후 수당 면제 조건 명시

## Task Commits

Each task was committed atomically:

1. **Task 1: overtime-pay 연장근로수당 계산기 법률 감사** - `585c7c8` (fix)
2. **Task 2: weekly-holiday-pay 주휴수당 계산기 법률 감사** - (no changes - already legally accurate)
3. **Task 3: annual-leave-pay 연차수당 계산기 법률 감사** - `02dbe7e` (fix)

## Files Created/Modified
- `src/app/tools/labor/overtime-pay/page.tsx` - 연장근로 한도 레이블 수정(52시간→1주 12시간), 법적 근거에 제53조 제1항·제56조 제3항 추가
- `src/app/tools/labor/annual-leave-pay/page.tsx` - 연차 일수 기준 안내 추가, 제61조 사용촉진 수당 면제 조건 명시

## Decisions Made
- 연장근로 한도 레이블 "최대 52시간"은 법령 오해를 유발하는 오류: 52시간은 1주 총근로시간(기본 40+연장 12)의 합산이고, 연장근로 자체 한도는 1주 12시간(제53조 제1항)
- 주휴수당 코드는 단시간근로자 비례계산까지 완벽 구현됨 - 고용노동부 행정해석과 동일
- 제61조는 수당 면제 예외 조항이므로 명시하지 않으면 사용자가 "항상 수당 지급"으로 오해 가능

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 연장근로 레이블 '최대 52시간' 오류**
- **Found during:** Task 1 (overtime-pay 법률 감사)
- **Issue:** 52시간은 주 총근로시간 한도이지 연장근로 시간의 한도가 아님 (연장근로 한도는 1주 12시간)
- **Fix:** 레이블을 "1주 최대 12시간"으로 수정, 법적 근거에 제53조 제1항 추가
- **Files modified:** src/app/tools/labor/overtime-pay/page.tsx
- **Verification:** TypeScript 타입 체크 통과
- **Committed in:** 585c7c8 (Task 1 commit)

**2. [Rule 2 - Missing Critical] 연차 계산기 제61조 사용촉진 면제 설명 누락**
- **Found during:** Task 3 (annual-leave-pay 법률 감사)
- **Issue:** 제61조를 법적 근거로 나열하면서 사용촉진 후 수당 면제 조건 설명 없어 오해 유발
- **Fix:** 사용촉진 조치 시 수당 지급 의무 면제 가능 명시, 연차 일수 기준 안내 추가
- **Files modified:** src/app/tools/labor/annual-leave-pay/page.tsx
- **Verification:** TypeScript 타입 체크 통과
- **Committed in:** 02dbe7e (Task 3 commit)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 missing critical info)
**Impact on plan:** 법령 정확성 개선. 계산 로직 자체는 3개 모두 정확했으며, UI 안내 문구 오류 수정.

## Issues Encountered
- 주휴수당 계산기는 법령 완전 준수로 변경 불필요 (Task 2는 감사 후 no-op)

## Next Phase Readiness
- Phase 15 계속 진행 가능
- 3개 수당 계산기(LABOR-03, LABOR-04, LABOR-05) 법률 감사 완료

---
*Phase: 15-labor-legal-audit*
*Completed: 2026-03-24*

## Self-Check: PASSED
- src/app/tools/labor/overtime-pay/page.tsx: FOUND (modified)
- src/app/tools/labor/annual-leave-pay/page.tsx: FOUND (modified)
- Commit 585c7c8: verified in git log
- Commit 02dbe7e: verified in git log
