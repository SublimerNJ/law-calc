---
phase: 35-actioninsight
plan: 01
subsystem: labor-calculators
tags: [actioninsight, data, labor]
requires: []
provides: [ACTION-03]
affects: [src/lib/action-data.ts]
tech-stack:
  added: []
  patterns: [action-insight-data]
key-files:
  created: []
  modified:
    - src/lib/action-data.ts
decisions:
  - 노무사 톤으로 실무적인 대처 방안(팁 3개)과 카톡 협상용 템플릿 추가 구성
metrics:
  duration: 1
  completed: 2026-04-10
---

# Phase 35 Plan 01: 노동/근로 계산기 9종 ActionInsight 데이터 추가 Summary

노동/근로 카테고리 내 나머지 9개 계산기(해고예고, 연차, 연장근로, 주휴, 최저임금, 휴업, 출산휴가, 육아휴직, 실업급여)에 대한 ActionInsight 팁과 대응 템플릿을 `action-data.ts`에 추가함.

## Completed Tasks

1. **Task 1: action-data.ts에 노동/근로 9개 계산기 데이터 추가**
   - 9개의 계산기(`dismissal-notice`, `annual-leave-pay`, `overtime-pay`, `weekly-holiday-pay`, `minimum-wage-check`, `shutdown-allowance`, `maternity-leave`, `parental-leave`, `unemployment-benefit`)에 대하여 노무사의 조언 톤을 적용한 팁과 카톡용 템플릿 추가
   - Typescript 타입 검사 통과 확인 (`tsc --noEmit`)
   - Commit: 0ac8a82

## Deviations from Plan
- None - plan executed exactly as written.

## Known Stubs
- None

## Self-Check: PASSED
