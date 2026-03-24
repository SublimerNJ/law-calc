---
phase: 13-court-legal-audit
plan: "01"
subsystem: court-calculators
tags: [legal-audit, court, civil-mediation, family-court, launcelot-lawyer]
dependency_graph:
  requires: []
  provides: [civil-mediation-audited, family-court-audited]
  affects: [court-calculator-accuracy]
tech_stack:
  added: []
  patterns: [Math.floor-100-unit-truncation, SERVICE_FEE_UNIT-constant]
key_files:
  created: []
  modified:
    - src/app/tools/court/civil-mediation/page.tsx
    - src/app/tools/court/family-court/page.tsx
decisions:
  - "송달료 단가 5,500원 적용 (lawsuit-cost와 통일, 2026년 기준)"
  - "조정 송달료 10회분 예납 적용 (법원실무 기준)"
  - "가사사건 송달료 10회분 예납 적용 (가사소송규칙 제7조)"
metrics:
  duration: "15m"
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 13 Plan 01: 민사조정·가사소송 계산기 법률 감사 Summary

민사조정·가사소송 2개 계산기를 /Launcelot-Lawyer로 법령 원문 대조 감사하여 인지액 버림 처리, 송달료 단가/회수, 법령 조문 오류 총 9건 수정.

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | 민사조정 비용 계산기 법률 감사 및 수정 | 0147f91 | src/app/tools/court/civil-mediation/page.tsx |
| 2 | 가사소송 비용 계산기 법률 감사 및 수정 | f5f05d3 | src/app/tools/court/family-court/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 인지액 100원 미만 올림 → 버림 (civil-mediation)**
- **Found during:** Task 1
- **Issue:** `Math.ceil(fee / 100) * 100` — 100원 미만 올림
- **Fix:** `Math.floor(fee / 100) * 100` — 민사소송등인지법 제2조 제3항: "100원 미만의 단수는 버린다"
- **Files modified:** src/app/tools/court/civil-mediation/page.tsx
- **Commit:** 0147f91

**2. [Rule 1 - Bug] 조정인지대 올림 → 버림 (civil-mediation)**
- **Found during:** Task 1
- **Issue:** `Math.ceil((lawsuitStampFee * 0.2) / 100) * 100` — 올림 처리
- **Fix:** `Math.floor(...)` — 동일 법령 기준
- **Files modified:** src/app/tools/court/civil-mediation/page.tsx
- **Commit:** 0147f91

**3. [Rule 1 - Bug] 송달료 단가 오류 (civil-mediation)**
- **Found during:** Task 1
- **Issue:** 4,500원/회 — 구 기준
- **Fix:** 5,500원/회 — 2026년 기준 (lawsuit-cost 참조 일치)
- **Files modified:** src/app/tools/court/civil-mediation/page.tsx
- **Commit:** 0147f91

**4. [Rule 1 - Bug] 조정 송달료 회수 오류 (civil-mediation)**
- **Found during:** Task 1
- **Issue:** 5회 예납 — 법원실무와 불일치
- **Fix:** 10회 예납 — 법원실무 기준
- **Files modified:** src/app/tools/court/civil-mediation/page.tsx
- **Commit:** 0147f91

**5. [Rule 1 - Bug] 법령 근거 조문 오류 (civil-mediation)**
- **Found during:** Task 1
- **Issue:** `민사조정법 제37조` — 존재하지 않는 조문
- **Fix:** `민사조정법 제7조` (비용 규정), 민사소송등인지법 제2조, 민사소송규칙 제19조
- **Files modified:** src/app/tools/court/civil-mediation/page.tsx
- **Commit:** 0147f91

**6. [Rule 1 - Bug] 인지액 100원 미만 올림 → 버림 (family-court)**
- **Found during:** Task 2
- **Issue:** `Math.ceil(fee / 100) * 100` — 올림 처리
- **Fix:** `Math.floor(fee / 100) * 100` — 민사소송등인지법 제2조 제3항
- **Files modified:** src/app/tools/court/family-court/page.tsx
- **Commit:** f5f05d3

**7. [Rule 1 - Bug] 송달료 단가 오류 (family-court)**
- **Found during:** Task 2
- **Issue:** 4,500원/회 — 구 기준
- **Fix:** 5,500원/회 — 2026년 기준
- **Files modified:** src/app/tools/court/family-court/page.tsx
- **Commit:** f5f05d3

**8. [Rule 1 - Bug] 가사 송달료 회수 오류 (family-court)**
- **Found during:** Task 2
- **Issue:** 5회 예납
- **Fix:** 10회 예납 — 가사소송규칙 제7조
- **Files modified:** src/app/tools/court/family-court/page.tsx
- **Commit:** f5f05d3

**9. [Rule 2 - Enhancement] 사건별 법령 근거 명시 (family-court)**
- **Found during:** Task 2
- **Issue:** 법령 근거가 단일 문구로만 표시됨 — 사건유형별 정확한 조문 불명시
- **Fix:** CASE_OPTIONS에 legalBasis 필드 추가, 결과 UI에서 각 사건유형별 법령 근거 표시
- **Files modified:** src/app/tools/court/family-court/page.tsx
- **Commit:** f5f05d3

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/court/civil-mediation/page.tsx — FOUND
- src/app/tools/court/family-court/page.tsx — FOUND
- Commit 0147f91 — verified
- Commit f5f05d3 — verified
- npx tsc --noEmit — 0 errors
