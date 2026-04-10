---
phase: 36-actioninsight
plan: 01
subsystem: Tax Calculators
tags:
  - actioninsight
  - tax
  - template
dependency_graph:
  requires: []
  provides: ["Tax calculator action data"]
  affects: ["Tax tools UI"]
tech_stack:
  added: []
  patterns: ["Action data structure"]
key_files:
  created: []
  modified:
    - "src/lib/action-data.ts"
key_decisions:
  - "세금 10개 종(취득세, 양도소득세 등)에 대하여 전문가 팁과 문자/카톡용 템플릿 데이터를 추가하여 사용자에게 실질적 행동 지침 제공"
metrics:
  tasks_completed: 1
  total_tasks: 1
  duration_seconds: 60
  completed_at: "2026-04-10T05:00:00Z"
---

# Phase 36 Plan 01: Tax Action Data Summary

세금 관련 10개 계산기 도구(`acquisition-tax`, `capital-gains-tax`, `comprehensive-income-tax`, `comprehensive-property-tax`, `four-insurances`, `registration-tax`, `rent-tax-credit`, `securities-tax`, `vat`, `year-end-tax`)를 위해 ActionInsight 객체 데이터를 추가했습니다.

## Completed Tasks
- [x] Task 1: `actionData`에 10개 세금 도구 추가

## Deviations from Plan
- None - plan executed exactly as written.

## Self-Check: PASSED
- [x] `src/lib/action-data.ts` modified successfully
- [x] TypeScript compilation successful
- [x] Data successfully committed
