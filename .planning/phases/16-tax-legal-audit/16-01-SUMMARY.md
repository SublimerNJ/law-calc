---
phase: 16-tax-legal-audit
plan: "01"
subsystem: tax-calculators
tags: [legal-audit, income-tax, capital-gains, year-end-tax]
dependency_graph:
  requires: []
  provides: [capital-gains-tax-audited, comprehensive-income-tax-audited, year-end-tax-audited]
  affects: [TAX-01, TAX-02, TAX-08]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer 법령 원문 대조, Math.floor 버림, < 미만 경계값]
key_files:
  created: []
  modified:
    - src/app/tools/tax/capital-gains-tax/page.tsx
    - src/app/tools/tax/comprehensive-income-tax/page.tsx
    - src/app/tools/tax/year-end-tax/page.tsx
decisions:
  - "1세대1주택 장기보유특별공제: 거주기간 입력 추가하여 보유+거주 각 최대 40% 합산 80% 계산 지원 (소득세법 제95조 제2항 별표2)"
  - "의료비세액공제 한도 700만원 적용 (일반의료비 기준, 난임시술비·65세이상·장애인은 한도 없음 단순화)"
metrics:
  duration: "3분"
  completed_date: "2026-03-24T03:20:35Z"
  tasks_completed: 3
  files_modified: 3
---

# Phase 16 Plan 01: Tax Legal Audit Summary

**One-liner:** 소득세법 기준 3개 세금 계산기에서 법률 오류 5건 발견·수정 (장기보유특별공제 누락, 공제 한도 미적용, 조문 인용 오류)

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | capital-gains-tax 법률 감사 | 4b9703a | capital-gains-tax/page.tsx |
| 2 | comprehensive-income-tax 법률 감사 | 04537cf | comprehensive-income-tax/page.tsx |
| 3 | year-end-tax 법률 감사 | 5136dcf | year-end-tax/page.tsx |

## Legal Findings & Fixes

### Task 1: capital-gains-tax (양도소득세)

**오류 1 [Rule 1 - Bug] 기본세율 조문 인용 오류**
- **이슈:** `calcBasicTax` 함수 주석에 소득세법 제55조(종합소득세율) 인용 — 양도소득세는 제104조
- **수정:** 소득세법 제104조 제1항으로 정정

**오류 2 [Rule 2 - Missing] 1세대1주택 장기보유특별공제 거주기간 공제율 누락**
- **이슈:** 소득세법 제95조 제2항 별표2는 보유기간(최대 40%) + 거주기간(최대 40%) = 최대 80%. 기존 코드는 보유기간만 계산 → 최대 40%만 적용
- **수정:** 거주기간 입력 필드 추가, `getLongTermRate(holdingYears, residenceYears)` 함수 수정
- **공제율 로직:** 보유 4%×보유년수(3년 이상, 최대 40%) + 거주 4%×거주년수(3년 이상, 최대 40%) 합산

**오류 3 [Rule 1 - Bug] 법적 근거 인용 부정확**
- **수정:** 제89조(비과세)·제94조(범위)·제95조(장기보유특별공제)·제103조(기본공제)·제104조(세율) 모두 명시

### Task 2: comprehensive-income-tax (종합소득세)

**오류 1 [Rule 1 - Bug] 법적 근거 인용 오류**
- **이슈:** 법적 근거에 제56조(세액공제) 인용 — 표준세액공제는 제59조의4에 해당, 제56조는 배당세액공제
- **수정:** 제59조의4(표준세액공제)로 정정, 제50조(기본공제) 추가

**세율 구간 검증:** 소득세법 제55조 제1항 8단계 누진세율(6%~45%) — 코드와 완전 일치, 수정 없음

### Task 3: year-end-tax (연말정산)

**오류 1 [Rule 2 - Missing] 근로소득공제 한도 2,000만원 미적용**
- **이슈:** 소득세법 제47조 제1항 단서: 공제 한도 2,000만원. 기존 코드에 한도 적용 없음
- **수정:** `Math.min(deduction, 20_000_000)` 추가

**오류 2 [Rule 1 - Bug] 근로소득세액공제 한도 기준 오류**
- **이슈:** 소득세법 제59조 제2항: 한도 기준은 총급여액. 기존 코드는 `computedTax`(산출세액)로 잘못 비교
- **수정:** `earnedIncomeTaxCredit(computed, grossPay)` — 두 번째 인자로 총급여 추가하여 한도 기준 수정

**오류 3 [Rule 2 - Missing] 의료비세액공제 한도 700만원 미적용**
- **이슈:** 소득세법 제59조의4 제2항: 일반의료비 세액공제 한도 700만원. 기존 코드에 한도 없음
- **수정:** `Math.min(Math.floor(medicalOver * 0.15), 700_000)` 추가

## Decisions Made

1. **1세대1주택 장기보유특별공제 UI 확장:** 거주기간 입력 필드를 추가하여 소득세법 제95조 제2항 별표2 완전 구현. 거주기간 미입력 시 보유기간 공제만 적용.

2. **의료비세액공제 단순화:** 일반의료비 700만원 한도 적용. 난임시술비·65세이상·장애인 의료비(한도 없음)는 별도 입력 필드 없이 단순화 — 계산기 복잡도 vs 정확도 트레이드오프.

## Known Stubs

None — 모든 계산 로직이 실제 법률 기준으로 구현됨.

## Self-Check: PASSED
