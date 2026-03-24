---
phase: 17-realty-legal-audit
plan: "01"
subsystem: realty-calculators
tags: [legal-audit, realty, housing-lease, brokerage]
dependency_graph:
  requires: []
  provides: [REALTY-01, REALTY-02, REALTY-03]
  affects: [deposit-return, rent-conversion, brokerage-fee]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer 법령 원문 대조]
key_files:
  created: []
  modified:
    - src/app/tools/realty/deposit-return/page.tsx
    - src/app/tools/realty/rent-conversion/page.tsx
    - src/app/tools/realty/brokerage-fee/page.tsx
decisions:
  - "전월세 전환율 기본값을 법정 상한(4.75%)으로 수정 — 5.5%는 현행 법정 상한 초과"
  - "보증금 반환 지연이자 근거: 민법 제387조(이행기) → 제379조(법정이율)"
metrics:
  duration: "~15min"
  completed_date: "2026-03-24"
  tasks_completed: 3
  files_modified: 3
---

# Phase 17 Plan 01: Realty Legal Audit Summary

**One-liner:** 부동산 3개 계산기(보증금반환·전월세전환·중개보수)를 주택임대차보호법·공인중개사법 시행규칙 원문과 대조하여 법령 조문 오류 3건 수정

## What Was Built

주택임대차보호법·공인중개사법 기반 3개 부동산 계산기를 /Launcelot-Lawyer 스킬로 법령 원문 대조 감사 완료. 발견된 법령 조문 오류 및 기본값 오류 총 3건 수정.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | deposit-return 법률 감사 | e1b0c2c | src/app/tools/realty/deposit-return/page.tsx |
| 2 | rent-conversion 법률 감사 | e8ec5bc | src/app/tools/realty/rent-conversion/page.tsx |
| 3 | brokerage-fee 법률 감사 | c0fd076 | src/app/tools/realty/brokerage-fee/page.tsx |

## Decisions Made

- 전월세 전환율 기본값 5.5% → 4.75%: 2026년 3월 기준 한국은행 기준금리 2.75% + 2%p = 4.75%가 법정 상한 (주택임대차보호법 시행령 제9조)
- 보증금 반환 지연이자 근거 조문: 민법 제387조(이행기와 이행지체) → 민법 제379조(법정이율 연 5%)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] deposit-return 법적 근거 조문 오류**
- **Found during:** Task 1
- **Issue:** 민법 제387조(이행기 조항)가 지연이자 근거로 표시됨 — 법정이율 근거는 민법 제379조
- **Fix:** 법적 근거 표시를 주택임대차보호법 제3조/제3조의2 + 민법 제379조로 수정
- **Files modified:** src/app/tools/realty/deposit-return/page.tsx
- **Commit:** e1b0c2c

**2. [Rule 1 - Bug] rent-conversion 전환율 기본값 초과 및 시행령 조문 누락**
- **Found during:** Task 2
- **Issue:** 기본값 5.5%는 현행 법정 상한(4.75%)을 초과; 시행령 제9조 미명시
- **Fix:** 기본값 4.75%로 수정, 법령 표시에 시행령 제9조 및 현행 기준금리 명시
- **Files modified:** src/app/tools/realty/rent-conversion/page.tsx
- **Commit:** e8ec5bc

**3. [Rule 1 - Bug] brokerage-fee 법적 근거 불완전**
- **Found during:** Task 3
- **Issue:** "공인중개사법 시행규칙 별표1"만 표시 — 제20조 제1항 조문 미명시
- **Fix:** "공인중개사법 시행규칙 제20조 제1항 별표1"로 정밀화
- **Files modified:** src/app/tools/realty/brokerage-fee/page.tsx
- **Commit:** c0fd076

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/realty/deposit-return/page.tsx: FOUND
- src/app/tools/realty/rent-conversion/page.tsx: FOUND
- src/app/tools/realty/brokerage-fee/page.tsx: FOUND
- Commit e1b0c2c: FOUND
- Commit e8ec5bc: FOUND
- Commit c0fd076: FOUND
- TypeScript check: PASSED (no errors)
