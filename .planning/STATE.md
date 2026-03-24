---
gsd_state_version: 1.0
milestone: v1.5
milestone_name: 전체 계산기 논리적 오류 및 UX 흐름 감사
status: Ready to plan
last_updated: "2026-03-24T22:42:48.038Z"
progress:
  total_phases: 20
  completed_phases: 13
  total_plans: 35
  completed_plans: 35
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-24)

**Core value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구 제공
**Current focus:** Phase 27 — ux

## Current Position

Phase: 28
Plan: Not started

## Accumulated Context

- **Decisions**:
  - v1.2 에서는 기존 다크/AI 느낌의 테마를 벗어나 전문적인 라이트 테마를 기본으로 사용.
  - 패럴랙스 효과는 성능(Performance First)과 접근성(reduced-motion)을 고려하여 transform/opacity만 사용하고 모바일에서는 비활성화.
  - v1.3 전체 법률 정확성 감사 완료 (28건 수정)
  - v1.4 중복 계산기 정리 완료 (51개로 정리)
  - v1.5 감사 범위: UX/논리 오류만, 법률 정확성 재검증 제외
  - payment-order 실시간 계산 → 버튼 클릭 방식 전환 (FLOW-01/02 일관성)
  - attorney-fee silent return 제거, 5개 court 계산기 에러 표시 방식 버튼 위 블록으로 통일
  - 에러(text-red-500)와 경고(text-orange-500) 분리: 에러는 계산 차단, 경고는 계산 허용 (상속 3종 계산기 공통)
  - 에러(text-red-500)/경고(text-orange-500) 분리 패턴을 노동 3종 계산기에도 동일 적용 (26-ux-01)
  - 에러/경고 래퍼 div 제거, plain <p> 패턴으로 6개 노동 계산기 통일 (26-ux-03, CONSIST-03)
  - Phase 26 전체 완료: 6개 노동/근로 계산기 CONSIST-01~03 충족
  - error/warning 분리 패턴을 unfair-dismissal·industrial-accident·maternity-leave 3개 계산기에 적용 (27-ux-01)
  - 산재보험 간병급여 계산식 주석 금액 수정: 41,170→53,060원, 27,450→35,370원 (코드 상수 일치)
  - 계산 버튼 스타일을 style={{ backgroundColor: category.color }}에서 bg-blue-600 클래스 방식으로 6개 노동 계산기 통일 (27-ux-03)
- **Blockers**:
  - None

## Session Continuity

- **Last Session**: 2026-03-25
- **Stopped At**: Completed 27-ux-03-PLAN.md (Phase 27 완료)
