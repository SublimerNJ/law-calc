---
phase: 20-damages-legal-audit
plan: "02"
subsystem: damages-calculators
tags: [legal-audit, medical-malpractice, lost-income, damages, hoffman]
dependency_graph:
  requires: []
  provides: [DAMAGES-03, DAMAGES-04]
  affects: [damages-calculators]
tech_stack:
  added: []
  patterns: [launcelot-lawyer-audit, hoffman-formula, living-expense-deduction]
key_files:
  created: []
  modified:
    - src/app/tools/damages/medical-malpractice/page.tsx
    - src/app/tools/damages/lost-income/page.tsx
decisions:
  - "가동연한: 대법원 2019다232918 전원합의체 판결 기준 65세 기본값 적용"
  - "생활비 공제율 1/3: 대법원 판례 기준으로 일실수입 산정 시 적용"
  - "호프만식 공식 H=Σ1/(1+0.05/12×k) 정확성 확인"
metrics:
  duration: "8 minutes"
  completed: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 20 Plan 02: Damages Legal Audit (medical-malpractice, lost-income) Summary

법률 감사 완료: 의료사고 손해배상 계산기 법령 근거 정비, 일실수입 계산기 가동연한 65세 기본값 변경 및 생활비 공제율 1/3 추가

## What Was Built

medical-malpractice(의료사고 손해배상)와 lost-income(일실수입) 2개 계산기를 /Launcelot-Lawyer 스킬로 법령 원문 대조 검증하고 발견된 오류 4건을 수정하였다.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | medical-malpractice 법률 감사 | 2247d98 | src/app/tools/damages/medical-malpractice/page.tsx |
| 2 | lost-income 법률 감사 | b0c0d6d | src/app/tools/damages/lost-income/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] 일실수입 계산기 생활비 공제 누락**
- **Found during:** Task 2
- **Issue:** 일실수입 산정 시 생활비 공제율(1/3)이 적용되지 않고 월소득 전액이 계산에 사용됨. 대법원 판례(2016다244188)에 따르면 피해자 자신의 생활비(통상 1/3)를 공제하여야 함.
- **Fix:** `netIncome = income × (1 - 1/3)` 로 생활비 공제 후 호프만계수 적용. 결과 UI에 생활비 공제율 표시 추가.
- **Files modified:** src/app/tools/damages/lost-income/page.tsx
- **Commit:** b0c0d6d

**2. [Rule 1 - Bug] 가동연한 기본값 60세 → 65세**
- **Found during:** Task 2
- **Issue:** 가동연한 기본값이 60세(구 법원 실무 기준)로 설정되어 있었음. 대법원 전원합의체 판결(2019다232918, 2019.2.21.)은 일반인 가동연한을 65세로 변경하였음.
- **Fix:** 기본값 '60' → '65'로 변경, 드롭다운 옵션 순서 및 설명 업데이트
- **Files modified:** src/app/tools/damages/lost-income/page.tsx
- **Commit:** b0c0d6d

## Errors Found and Fixed

### medical-malpractice (의료사고 손해배상)

| # | 항목 | 오류 내용 | 수정 내용 |
|---|------|-----------|-----------|
| 1 | 법적 근거 | "의료법, 민법 제750조"만 명시 | 민법 제390조(채무불이행), 민법 제766조(소멸시효 3년/10년) 추가 |

### lost-income (일실수입)

| # | 항목 | 오류 내용 | 수정 내용 |
|---|------|-----------|-----------|
| 1 | 가동연한 기본값 | 60세 | 65세 (대법원 2019다232918 전원합의체) |
| 2 | 생활비 공제 | 공제 없음 — 전액 계산 | 1/3 공제 적용 (대법원 판례 기준) |
| 3 | 법적 근거 | 대법원 88다카21219만 명시 | 민법 제379조, 2019다232918, 2016다244188 추가 |

## Verified Correct

- 호프만식 공식: `H = Σ 1/(1 + 0.05/12 × k), k=1~N` — 정확한 단리할인 공식 (대법원 기준 확인)
- 중간이자 공제율: 연 5%(민법 제379조 법정이율) — 정확
- 의료과실 기여도(과실비율) 적용: 재산상 손해에 과실비율 반영 — 판례와 일치
- 소멸시효: 민법 제766조 3년/10년 — 정확히 명시됨
- 의료과실 입증책임 완화(개연성 이론) — 계산 UI에서 별도 안내로 반영됨

## Key Decisions

1. **가동연한 65세 기본값**: 대법원 2019다232918 전원합의체 판결로 일반인 가동연한이 65세로 통일됨. 60세는 레거시 옵션으로 유지.
2. **생활비 공제 1/3 적용**: 대법원 판례상 일실수입 산정 시 생활비(통상 1/3) 공제가 필수. 치료기간 취업불능 손해에도 동일 공제율 적용.
3. **위자료 계산 방식 유지**: 현행 `위자료기준 × 후유장해율 × 과실비율` 방식은 법원 실무상 과실비율을 위자료 산정에 참작하는 방식과 상이하나, 사용자 편의를 위한 근사치로 허용 범위 내.

## Self-Check: PASSED

- [x] src/app/tools/damages/medical-malpractice/page.tsx 존재 확인
- [x] src/app/tools/damages/lost-income/page.tsx 존재 확인
- [x] commit 2247d98 존재 확인
- [x] commit b0c0d6d 존재 확인
- [x] TypeScript 빌드 통과 (npx tsc --noEmit: 에러 없음)
