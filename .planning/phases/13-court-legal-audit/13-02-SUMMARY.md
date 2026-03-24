---
phase: 13-court-legal-audit
plan: 02
subsystem: court-calculators
tags: [legal-audit, e-court, stamp-fee, delivery-fee, bug-fix]
dependency_graph:
  requires: []
  provides: [e-court-calculator-verified]
  affects: [src/app/tools/court/e-court/page.tsx]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit, floor-rounding for stamp fee]
key_files:
  created: []
  modified:
    - src/app/tools/court/e-court/page.tsx
decisions:
  - "소가 경계값은 이하(<=)가 아닌 미만(<) 기준 — 민사소송등인지법 별표 원문과 일치"
  - "인지대 끝수처리는 올림(ceil)이 아닌 버림(floor) — 100원 미만 버림"
  - "송달료 단가 4,500원은 구기준 — 현행(2026) 5,500원으로 수정"
  - "송달료 회수는 고정 10회가 아닌 심급별(1심 15회, 항소심 12회, 상고심 8회)"
metrics:
  duration: "15 minutes"
  completed: "2026-03-24"
  tasks: 1
  files: 1
---

# Phase 13 Plan 02: e-court 전자소송 비용 계산기 법률 감사 Summary

**One-liner:** e-court 계산기에서 소가 경계값 오류(이하→미만), 올림→버림 오류, 송달료 단가/회수 오류 6건 수정

## What Was Built

/Launcelot-Lawyer 스킬로 전자소송(e-court) 비용 계산기를 법령 원문과 대조 감사하고, 발견된 6건의 법률 오류를 모두 수정했다.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | e-court 법률 감사 및 오류 수정 | 650ffc5 | src/app/tools/court/e-court/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] calculateStampFee 소가 경계값 이하→미만 수정**
- **Found during:** Task 1 (Launcelot-Lawyer 감사)
- **Issue:** `amount <= 10_000_000` 등 경계값에서 이하(<=) 사용 — 민사소송등인지법 별표는 미만(<) 기준
- **Fix:** `<=` → `<` 로 수정 (3개 구간 경계값)
- **Files modified:** src/app/tools/court/e-court/page.tsx
- **Commit:** 650ffc5

**2. [Rule 1 - Bug] calculateStampFee Math.ceil → Math.floor**
- **Found during:** Task 1
- **Issue:** 인지액 100원 미만을 올림(ceil) 처리 — 법령은 버림(floor) 기준
- **Fix:** `Math.ceil(fee / 100) * 100` → `Math.floor(fee / 100) * 100`
- **Files modified:** src/app/tools/court/e-court/page.tsx
- **Commit:** 650ffc5

**3. [Rule 1 - Bug] regularStampFee Math.ceil → Math.floor**
- **Found during:** Task 1
- **Issue:** 심급배율 적용 후 올림 처리
- **Fix:** `Math.ceil` → `Math.floor`
- **Files modified:** src/app/tools/court/e-court/page.tsx
- **Commit:** 650ffc5

**4. [Rule 1 - Bug] eCourtStampFee Math.ceil → Math.floor**
- **Found during:** Task 1
- **Issue:** 전자소송 10% 할인 후 올림 처리
- **Fix:** `Math.ceil` → `Math.floor`
- **Files modified:** src/app/tools/court/e-court/page.tsx
- **Commit:** 650ffc5

**5. [Rule 1 - Bug] 송달료 단가 4,500원 → 5,500원**
- **Found during:** Task 1
- **Issue:** 구기준(4,500원) 사용 — 현행(2026) 송달료규칙 제2조 기준 5,500원
- **Fix:** `4_500` → `5_500`, `SERVICE_FEE_UNIT` 상수로 분리
- **Files modified:** src/app/tools/court/e-court/page.tsx
- **Commit:** 650ffc5

**6. [Rule 1 - Bug] 송달료 회수 고정 10회 → 심급별 회수**
- **Found during:** Task 1
- **Issue:** 모든 심급에 10회 고정 — 실제 기준은 1심 15회, 항소심 12회, 상고심 8회
- **Fix:** `SERVICE_ROUNDS` 상수 추가, 심급별 동적 계산
- **Files modified:** src/app/tools/court/e-court/page.tsx
- **Commit:** 650ffc5

## Known Stubs

None — 모든 계산 로직이 실제 법령 기준으로 구현됨.

## Self-Check: PASSED
