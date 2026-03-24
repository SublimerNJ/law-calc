---
phase: 19-debt-legal-audit
plan: "01"
subsystem: debt-calculators
tags: [legal-audit, debt, interest, late-payment, loan-interest, unjust-enrichment]
dependency_graph:
  requires: []
  provides: [DEBT-01, DEBT-02, DEBT-03]
  affects: [src/app/tools/debt/late-payment/page.tsx, src/app/tools/debt/loan-interest/page.tsx, src/app/tools/debt/unjust-enrichment/page.tsx]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer 법령 원문 대조 검증, Math.floor 금액 끝수 처리]
key_files:
  modified:
    - src/app/tools/debt/late-payment/page.tsx
    - src/app/tools/debt/loan-interest/page.tsx
    - src/app/tools/debt/unjust-enrichment/page.tsx
decisions:
  - 지연손해금 계산기에 상법 제54조 상사 법정이율(연 6%) 항목 신규 추가
  - 소송촉진특례법 제3조 적용 시점(소장 부본 송달일 다음날) 안내 추가
  - 부당이득 이자 기산점 판례 기준 명시 (악의: 취득일, 선의: 청구일)
metrics:
  duration: ~10min
  completed_date: "2026-03-24"
  tasks_completed: 3
  files_modified: 3
---

# Phase 19 Plan 01: 채권/이자 계산기 법률 감사 Summary

소송촉진특례법·이자제한법·민법 기반 3개 채권/이자 계산기를 /Launcelot-Lawyer 스킬로 검증하여 법령 오류 수정 및 누락 조문 보완 완료.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | late-payment 지연손해금 법률 감사 | 67a5de7 | src/app/tools/debt/late-payment/page.tsx |
| 2 | loan-interest 대여금 이자 법률 감사 | 1d58688 | src/app/tools/debt/loan-interest/page.tsx |
| 3 | unjust-enrichment 부당이득 반환 법률 감사 | e64b0ce | src/app/tools/debt/unjust-enrichment/page.tsx |

## Verification Results

- TypeScript 전체 빌드: 통과 (npx tsc --noEmit 오류 없음)
- 3개 계산기 모두 법령 원문 대조 검증 완료
- 발견된 오류 및 누락 항목 전부 수정

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] 지연손해금 상사 법정이율 누락**
- **Found during:** Task 1
- **Issue:** 상법 제54조 상사 법정이율(연 6%)이 전혀 구현되지 않음
- **Fix:** 상사 채권 체크박스 추가 및 연 6% 항목 표시
- **Files modified:** src/app/tools/debt/late-payment/page.tsx
- **Commit:** 67a5de7

**2. [Rule 1 - Bug] 법적 근거 조문 오류 (민법 제397조)**
- **Found during:** Task 1
- **Issue:** 법적 근거에 `민법 제397조(이행지체)` 인용 — 지연손해금 이율 근거는 `민법 제379조(법정이율)`
- **Fix:** 민법 제397조 → 민법 제379조로 수정
- **Files modified:** src/app/tools/debt/late-payment/page.tsx
- **Commit:** 67a5de7

**3. [Rule 2 - Missing Critical Functionality] 이자제한법 제3조 선이자 공제 안내 누락**
- **Found during:** Task 2
- **Issue:** 이자제한법 제3조 선이자 공제 규정이 전혀 안내되지 않음
- **Fix:** 법적 근거 조문 및 안내 항목에 이자제한법 제3조 추가
- **Files modified:** src/app/tools/debt/loan-interest/page.tsx
- **Commit:** 1d58688

**4. [Rule 2 - Missing Critical Functionality] 부당이득 이자 기산점 안내 누락**
- **Found during:** Task 3
- **Issue:** 악의/선의 수익자의 이자 기산점(판례 기준) 안내 없음
- **Fix:** 악의 수익자(취득일부터), 선의 수익자(반환청구일부터) 기산점 명시
- **Files modified:** src/app/tools/debt/unjust-enrichment/page.tsx
- **Commit:** e64b0ce

## Known Stubs

None — 모든 계산 로직이 실제 법정 이율로 구현됨.

## Self-Check: PASSED
