---
phase: 30-ux
plan: "02"
subsystem: realty-calculators
tags: [ux, validation, error-handling, theme-fix, input-validation]
dependency_graph:
  requires: []
  provides: [subscription-score-ux, dsr-ux, ltv-ux, dti-ux]
  affects: [realty-calculators]
tech_stack:
  added: []
  patterns: [error-warning-split, light-theme-badges, required-field-asterisk]
key_files:
  created: []
  modified:
    - src/app/tools/realty/subscription-score/page.tsx
    - src/app/tools/realty/dsr/page.tsx
    - src/app/tools/realty/ltv/page.tsx
    - src/app/tools/realty/dti/page.tsx
decisions:
  - "DSR warning 중복 방지: 10억 초과 경고 먼저 체크, 이후 월상환>월소득 경고는 !warning 조건으로 단일 경고만 표시"
  - "LTV 경고 우선순위: 50억 초과 경고 먼저, 대출>주택가격 경고는 else if로 처리"
  - "DTI mortgage=0 허용: !monthlyMortgage(빈 문자열) 에러, mortgage<0 에러, mortgage=0은 허용"
metrics:
  duration_seconds: 172
  completed_date: "2026-03-25"
  tasks_completed: 2
  files_modified: 4
---

# Phase 30 Plan 02: Realty 4 Calculators UX Audit Summary

**One-liner:** subscription-score/dsr/ltv/dti 4개 부동산 계산기에 error/warning 분리 패턴 적용, dark 테마 잔재 색상 → light 테마, 필수 필드 * 표시

## What Was Built

4개 부동산 계산기(청약가점, DSR, LTV, DTI)에 대한 16개 UX 요구사항(INPUT, RESULT, FLOW, CONSIST, EDGE) 감사 및 수정 완료.

### subscription-score
- FLOW-03: 3개 select 라벨(무주택기간/부양가족수/청약통장)에 red `*` 추가
- 나머지 요구사항: select 기반 입력으로 자연 충족, FLOW-01(result null 초기값), RESULT-03(합산 정확) 모두 기존 OK

### DSR
- error/warning state 추가 (`useState<string | null>`)
- INPUT-02: 연소득 미입력 시 "연소득을 입력해주세요." 에러 + `setResult(null)` + return
- INPUT-03: 연소득 10억 초과 시 경고 (계산 허용)
- 월 상환액 > 월 소득 초과 시 경고 (계산 허용)
- FLOW-03: 연소득 라벨에 `*` 추가
- CONSIST-03: dark 테마 박스 색상 → `bg-green-50 border-green-300 text-green-700` / `bg-red-50 border-red-300 text-red-600`
- 에러/경고 `<p>` 버튼 바로 위 표시

### LTV
- error/warning state 추가
- INPUT-02: 주택가격/대출금액 각각 미입력 에러
- EDGE-01: 대출금액 > 주택가격 시 "LTV 100% 초과" 경고
- INPUT-03: 주택가격 50억 초과 경고 (우선순위 높음)
- FLOW-03: 주택가격/대출금액 라벨에 `*` 추가
- CONSIST-03: dark 배지 → `bg-green-100 text-green-700` / `bg-red-100 text-red-700`

### DTI
- error/warning state 추가
- INPUT-02: 연소득 미입력 에러
- **버그 수정(Rule 1)**: `!mortgage || mortgage < 0` 조건 — `!monthlyMortgage`(빈 문자열)는 에러, `mortgage < 0`은 에러, `mortgage === 0`은 허용
- INPUT-02: 주담대 월 원리금 빈 입력 시 에러 (0 입력 안내 포함)
- INPUT-03: 연소득 10억 초과 경고
- EDGE-01: 연간 상환액 > 연소득 시 경고
- FLOW-03: 연소득/원리금 라벨에 `*` 추가
- CONSIST-03: dark 배지 → `bg-green-100 text-green-700` / `bg-red-100 text-red-700`

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | subscription-score 필수 * 추가 | 0bf643c | subscription-score/page.tsx |
| 2 | dsr/ltv/dti 에러/경고/색상 수정 | 100547b | dsr/page.tsx, ltv/page.tsx, dti/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] DTI dark 테마 배지 색상 수정 (계획에 명시 안 됨)**
- **Found during:** Task 2
- **Issue:** DTI 결과 적합/초과 배지도 `bg-red-500/20 text-red-400`, `bg-green-500/20 text-green-400` dark 잔재
- **Fix:** `bg-red-100 text-red-700`, `bg-green-100 text-green-700`으로 수정
- **Files modified:** src/app/tools/realty/dti/page.tsx
- **Commit:** 100547b

**2. [Rule 1 - Bug] DSR warning 중복 방지**
- **Found during:** Task 2
- **Issue:** 10억 초과 경고와 월상환>월소득 경고가 동시 설정될 수 있음
- **Fix:** `!warning` 조건으로 단일 경고만 표시
- **Files modified:** src/app/tools/realty/dsr/page.tsx
- **Commit:** 100547b

## Known Stubs

None — 모든 계산기가 실제 데이터를 처리하며 stub 없음.

## Self-Check: PASSED

- src/app/tools/realty/subscription-score/page.tsx: FOUND
- src/app/tools/realty/dsr/page.tsx: FOUND
- src/app/tools/realty/ltv/page.tsx: FOUND
- src/app/tools/realty/dti/page.tsx: FOUND
- Commit 0bf643c: FOUND
- Commit 100547b: FOUND
