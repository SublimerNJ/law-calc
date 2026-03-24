---
phase: 16-tax-legal-audit
plan: "04"
subsystem: tax
tags: [legal-audit, four-insurances, employment-insurance, 4대보험]
dependency_graph:
  requires: []
  provides: [TAX-09]
  affects: [four-insurances calculator]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit]
key_files:
  created: []
  modified:
    - src/app/tools/tax/four-insurances/page.tsx
decisions:
  - "고용보험 사용자 요율: 1.65% → 1.15% (실업급여 0.9% + 고용안정·직업능력개발 0.25%, 150인 미만 기준)"
metrics:
  duration: "15m"
  completed_date: "2026-03-24"
  tasks_completed: 1
  files_modified: 1
---

# Phase 16 Plan 04: four-insurances 법률 감사 Summary

**One-liner:** 고용보험 사업주 요율 1.65% → 1.15% 수정 (고용보험법 시행령 150인 미만 기준 재적용)

## What Was Built

4대보험료 계산기(four-insurances)에 대해 /Launcelot-Lawyer 스킬로 2025/2026년 적용 요율 전체 대조 검증을 실시하였다.

## Verification Results

| 항목 | 검증 내용 | 결과 |
|------|----------|------|
| 국민연금 | 국민연금법 제88조: 9% (각 4.5%) | 정확 |
| 국민연금 상한 | 617만원 (2025/2026년 동일) | 정확 |
| 건강보험 | 국민건강보험법 시행령: 7.09% (각 3.545%) | 정확 |
| 장기요양보험 | 건강보험료의 12.95% | 정확 |
| 고용보험 근로자 | 실업급여 0.9% | 정확 |
| 고용보험 사용자 | 실업급여 0.9% + 고용안정 0.25% = 1.15% | **오류 발견 → 수정** |
| 산재보험 | 평균 1.47% (업종별 상이) | 정확 |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 고용보험 사용자 요율 오류 (1.65% → 1.15%)**
- **Found during:** Task 1
- **Issue:** `EMPLOYMENT_EMPLOYER = 0.0165` (1.65%)로 설정되어 있었으나, 이는 잘못된 값. 150인 미만 사업장의 고용보험 사업주 부담은 실업급여 0.9% + 고용안정·직업능력개발 0.25% = 1.15%
- **법적 근거:** 고용보험 및 산업재해보상보험의 보험료징수 등에 관한 법률 시행령 별표1
- **Fix:** `EMPLOYMENT_EMPLOYER = 0.0115`, 레이블 '1.65%' → '1.15%', 주석 개선
- **Files modified:** `src/app/tools/tax/four-insurances/page.tsx`
- **Commit:** 0f25e80

## Self-Check: PASSED

- `src/app/tools/tax/four-insurances/page.tsx` — FOUND
- Commit `0f25e80` — FOUND
- TypeScript type check — PASSED (no errors)
