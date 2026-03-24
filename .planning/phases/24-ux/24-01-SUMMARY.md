---
phase: 24-ux
plan: "01"
subsystem: court-calculators
tags: [input-validation, ux, edge-cases, lawsuit-cost, payment-order]
dependency_graph:
  requires: []
  provides: [INPUT-01, INPUT-02, INPUT-03, INPUT-04, RESULT-01, RESULT-02, RESULT-03, FLOW-01, FLOW-02, FLOW-03, EDGE-01, EDGE-02, EDGE-03]
  affects: [src/app/tools/court/lawsuit-cost/page.tsx, src/app/tools/court/payment-order/page.tsx]
tech_stack:
  added: []
  patterns: [button-click-calculate, null-result-guard, formatNumber-toLocaleString, setError-setWarning]
key_files:
  modified:
    - src/app/tools/court/lawsuit-cost/page.tsx
    - src/app/tools/court/payment-order/page.tsx
decisions:
  - "payment-order를 실시간 계산에서 버튼 클릭 방식으로 전환 (FLOW-02 일관성)"
  - "에러: text-red-500, 경고: text-orange-500 색상 표준화"
  - "필수 필드에 (필수) 텍스트 표시 방식 채택"
metrics:
  duration_minutes: 10
  completed_date: "2026-03-24"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 2
---

# Phase 24 Plan 01: lawsuit-cost·payment-order UX 감사 및 수정 Summary

**One-liner:** lawsuit-cost와 payment-order 두 계산기에 입력 검증(음수/0/빈값/비현실값), 초기상태 정리, 에러/경고 메시지, 필수 필드 표시, 버튼 클릭 방식 전환을 적용하여 UX 표준화 완료.

## What Was Built

- **lawsuit-cost/page.tsx**: 기존에 partial 검증만 있던 계산기에 전체 요구사항 적용
  - 음수/0 소가 → "금액은 0보다 커야 합니다." (text-red-500)
  - 빈 소가 → "소가를 입력해주세요." (text-red-500)
  - 1000억 초과 → "입력값이 비현실적으로 큽니다. 확인해주세요." (text-orange-500)
  - warning 상태 추가 (setWarning)
  - 소가 라벨에 (필수) 표시
  - result=null 초기 상태 이미 존재, 유지

- **payment-order/page.tsx**: 실시간 계산에서 버튼 클릭 방식으로 전면 전환
  - amount 기본값 '10000000' 제거 → '' (초기 결과 미노출)
  - result state 추가 (CalcResult | null)
  - handleCalculate 함수 추가 — 모든 validation 포함
  - 에러/경고 state 추가
  - 결과 영역 {result && ...} 조건부 렌더링
  - 청구금액 라벨에 (필수) 표시
  - 절약액 색상 green-400 → green-600 (가독성)

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 6f581c4 | feat(24-ux-01): lawsuit-cost 입력 검증 및 UX 개선 |
| 2 | d2eb91d | feat(24-ux-01): payment-order 입력 검증 및 UX 개선 |

## Acceptance Criteria Verification

| Criteria | Status |
|----------|--------|
| "0보다 커야" in lawsuit-cost | PASS |
| "입력해주세요" in lawsuit-cost | PASS |
| "비현실적" in lawsuit-cost | PASS |
| toLocaleString/formatNumber in lawsuit-cost | PASS |
| result null check in lawsuit-cost (FLOW-01) | PASS |
| "0보다 커야" in payment-order | PASS |
| "입력해주세요" in payment-order | PASS |
| "비현실적" in payment-order | PASS |
| toLocaleString/formatNumber in payment-order | PASS |
| TypeScript compilation errors | NONE |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] payment-order 실시간 계산 → 버튼 클릭 방식 전환**
- **Found during:** Task 2 분석
- **Issue:** payment-order가 실시간 계산 방식이어서 초기 렌더링 시 amount='10000000' 기본값으로 결과가 즉시 표시됨 (FLOW-01 위반). 버튼 클릭 방식으로 전환하지 않으면 FLOW-01/FLOW-02 요구사항 달성 불가.
- **Fix:** useState 기본값 제거, CalcResult | null result state 추가, handleCalculate 함수 구현, 조건부 결과 렌더링
- **Files modified:** src/app/tools/court/payment-order/page.tsx
- **Commit:** d2eb91d

**2. [Rule 2 - Missing] payment-order 절약액 색상 가독성 개선**
- **Found during:** Task 2 코드 검토
- **Issue:** 절약액 텍스트가 text-green-400 (연한 색)으로 가독성 낮음
- **Fix:** text-green-600으로 변경
- **Files modified:** src/app/tools/court/payment-order/page.tsx
- **Commit:** d2eb91d

## Known Stubs

None.

## Self-Check: PASSED
