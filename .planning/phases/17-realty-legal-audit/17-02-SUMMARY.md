---
phase: 17-realty-legal-audit
plan: "02"
subsystem: realty-calculators
tags: [legal-audit, subscription-score, dsr, 주택공급규칙, 은행업감독규정]
dependency_graph:
  requires: []
  provides: [REALTY-04, REALTY-05]
  affects: [subscription-score, dsr]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer 법령 대조 검증]
key_files:
  created: []
  modified:
    - src/app/tools/realty/subscription-score/page.tsx
    - src/app/tools/realty/dsr/page.tsx
decisions:
  - 청약가점 배점(32+35+17=84점)은 현행 주택공급에 관한 규칙 별표1과 일치 확인
  - DSR 은행권 40%·비은행권 50% 기준은 현행 은행업감독규정 제26조의2와 일치 확인
  - 스트레스 DSR 고시 번호: 금융위원회 고시 제2024-11호 (2024.9.1 시행)
metrics:
  duration: 4min
  completed_date: "2026-03-24T03:31:25Z"
  tasks_completed: 2
  files_modified: 2
---

# Phase 17 Plan 02: 청약가점·DSR 계산기 법률 감사 Summary

One-liner: 주택공급에 관한 규칙 별표1·은행업감독규정 제26조의2 기준으로 청약가점·DSR 계산기 법령 조문 정확성 검증 및 누락 정보 보완

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | subscription-score 청약가점 계산기 법률 감사 | d93402d | subscription-score/page.tsx |
| 2 | DSR 계산기 법률 감사 | 0519dd5 | dsr/page.tsx |

## What Was Built

### Task 1: 청약가점 계산기 (subscription-score)

/Launcelot-Lawyer 스킬로 주택공급에 관한 규칙 별표1 원문과 대조 검증:

**검증 결과 (정확한 항목):**
- 무주택기간 가점(최대 32점): 17개 구간, 만 30세 미만 미혼 0점~15년 이상 32점 — 별표1 제1호와 일치 ✓
- 부양가족수 가점(최대 35점): 0명 5점~6명 이상 35점, 5점씩 증가 — 별표1 제2호와 일치 ✓
- 청약통장 가입기간 가점(최대 17점): 6개월 미만 1점~15년 이상 17점 — 별표1 제3호와 일치 ✓
- 총점 84점 만점 (32+35+17) ✓

**수정 사항:**
- 법적 근거에 별표1 제1호·제2호·제3호 세부 조문 번호 추가
- 부양가족 인정 기준 안내 섹션 신설 (배우자, 직계존비속, 동거요건 등)

### Task 2: DSR 계산기

/Launcelot-Lawyer 스킬로 은행업감독규정 제26조의2 원문 대조 검증:

**검증 결과 (정확한 항목):**
- DSR 공식: 연간 원리금 상환액 ÷ 연소득 × 100 — 은행업감독규정 제26조의2와 일치 ✓
- 은행권 DSR 40% 기준 ✓
- 비은행권 DSR 50% 기준 ✓

**수정 사항:**
- 법적 근거: "금융위원회 DSR 규제" → 은행업감독규정 제26조의2(차주단위 DSR 관리기준) 정확히 명시
- 총대출액 1억원 초과 차주 적용 기준 안내 추가
- 스트레스 DSR 3단계(2024.9.1 시행, 금융위원회 고시 제2024-11호) 정보 추가
- 비은행권 DSR 50% 법적 근거(여신전문금융업감독규정) 명시

## Deviations from Plan

None — plan executed exactly as written. 두 계산기 모두 배점/수치 자체는 현행 법령과 정확히 일치하여, 법령 조문 명칭 정확화 및 누락 안내 보완에 집중.

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/realty/subscription-score/page.tsx — FOUND ✓
- src/app/tools/realty/dsr/page.tsx — FOUND ✓
- Commit d93402d — FOUND ✓
- Commit 0519dd5 — FOUND ✓
- Project-wide TypeScript check: PASSED (npx tsc --noEmit — no output)
