---
phase: 15-labor-legal-audit
plan: "03"
subsystem: labor-calculators
tags: [legal-audit, minimum-wage, unfair-dismissal, industrial-accident, labor-law]
dependency_graph:
  requires: []
  provides: [LABOR-06, LABOR-07, LABOR-08]
  affects: [minimum-wage-check, unfair-dismissal, industrial-accident]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal verification, Korean labor law audit]
key_files:
  modified:
    - src/app/tools/labor/minimum-wage-check/page.tsx
    - src/app/tools/labor/unfair-dismissal/page.tsx
    - src/app/tools/labor/industrial-accident/page.tsx
decisions:
  - "2026년 최저임금 10,320원 확정 적용 (고용노동부 고시 제2025-38호)"
  - "산재보상 휴업급여 최저보상기준 2026년 최저임금 기준으로 갱신"
  - "부당해고 법적 근거에 제28조(구제신청 요건) 명시"
metrics:
  duration: "15 minutes"
  completed_date: "2026-03-24"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 3
---

# Phase 15 Plan 03: 최저임금·부당해고·산재보상 계산기 법률 감사 Summary

One-liner: 2026년 최저임금(10,320원) 반영 및 산재 최저보상기준 갱신으로 3개 노동 계산기 법률 정확성 확보

## What Was Built

최저임금 검증기(LABOR-06), 부당해고 구제 계산기(LABOR-07), 산재보상 계산기(LABOR-08) 3개 계산기를 /Launcelot-Lawyer 스킬 방식으로 법령 원문과 대조 검증하고 발견된 오류를 수정했다.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | minimum-wage-check 법률 감사 | 26bf66f | src/app/tools/labor/minimum-wage-check/page.tsx |
| 2 | unfair-dismissal 법률 감사 | 9c889f6 | src/app/tools/labor/unfair-dismissal/page.tsx |
| 3 | industrial-accident 법률 감사 | 96a0005 | src/app/tools/labor/industrial-accident/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 최저임금 검증기: 2026년 최저임금 금액 오류**
- **Found during:** Task 1
- **Issue:** `MINIMUM_WAGE_2026 = 10030` 이지만 2026년 최저임금은 10,320원임. 2025년 최저임금(10,030원)을 2026년으로 잘못 표기
- **Fix:** 상수값을 10,320원으로 수정. 2025/2026년 고시 주석 추가. 법적 근거 텍스트에 고시 번호(제2025-38호) 명시
- **Files modified:** src/app/tools/labor/minimum-wage-check/page.tsx
- **Commit:** 26bf66f

**2. [Rule 2 - Missing Info] 부당해고 구제 계산기: 근로기준법 제28조 누락**
- **Found during:** Task 2
- **Issue:** 법적 근거에 제30조, 제33조만 있고 구제신청 요건 근거인 제28조 누락. 5인 이상 사업장 적용조건 미표시
- **Fix:** 법적 근거에 제28조(부당해고 구제신청, 3개월 이내) 추가. 구제신청 안내에 상시 5인 이상 사업장 조건 명시
- **Files modified:** src/app/tools/labor/unfair-dismissal/page.tsx
- **Commit:** 9c889f6

**3. [Rule 1 - Bug] 산재보상 계산기: 휴업급여 최저보상기준 구버전 최저임금 적용**
- **Found during:** Task 3
- **Issue:** `MIN_WAGE_80_DAILY = 10,030 × 0.8 × 8 = 64,192원` — 2025년 최저임금 기준. 2026년 기준(10,320원)으로 갱신 필요. 간병급여 고시 출처 미표시
- **Fix:** MIN_WAGE_80_DAILY를 10,320 × 0.8 × 8 = 66,048원으로 수정. 간병급여 고시 출처 및 최저보상기준 조항(제54조) 주석 추가
- **Files modified:** src/app/tools/labor/industrial-accident/page.tsx
- **Commit:** 96a0005

## Verification Results

- TypeScript 타입 체크: 전체 통과 (`npx tsc --noEmit` — 출력 없음)
- 최저임금 법령 대조: 2026년 최저임금 10,320원 (고용노동부 고시 제2025-38호) 정확히 반영
- 부당해고 법령 대조: 근로기준법 제28조(구제신청)·제30조(구제명령)·제33조(이행강제금) 모두 명시
- 산재보상 법령 대조: 산업재해보상보험법 제52조(휴업급여)·제54조(최저보상기준)·제57조(장해급여)·제61조(간병급여) 정확히 반영

## Known Stubs

None — all calculators have live calculation logic with verified legal parameters.

## Self-Check: PASSED

Files verified:
- FOUND: src/app/tools/labor/minimum-wage-check/page.tsx
- FOUND: src/app/tools/labor/unfair-dismissal/page.tsx
- FOUND: src/app/tools/labor/industrial-accident/page.tsx

Commits verified:
- FOUND: 26bf66f
- FOUND: 9c889f6
- FOUND: 96a0005
