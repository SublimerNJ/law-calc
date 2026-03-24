---
gsd_state_version: 1.0
milestone: v1.5
milestone_name: 전체 계산기 논리적 오류 및 UX 흐름 감사
status: Ready to execute
last_updated: "2026-03-24T23:31:06.946Z"
progress:
  total_phases: 20
  completed_phases: 16
  total_plans: 47
  completed_plans: 45
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-24)

**Core value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구 제공
**Current focus:** Phase 31 — ux

## Current Position

Phase: 31 (ux) — EXECUTING
Plan: 2 of 3

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
  - registration-tax: isLicense 분기로 면허 유형은 에러 검증 제외 (금액 입력 불필요) (28-ux-02)
  - 세금 계산기 3종(취득세·종합부동산세·등록세)에 error/warning 분리 패턴 적용 완료 (28-ux-02)
  - 에러(text-red-500)/경고(text-orange-500) 분리 패턴을 세금 2종 계산기(capital-gains-tax, comprehensive-income-tax)에 적용, 날짜 역전 방지 포함 (28-ux-01)
  - focus:border-[#10b981] → focus:border-blue-600 통일: 카테고리 색상은 결과 강조에만, 입력 포커스는 blue-600 (28-ux-03)
  - registration-tax 결과 합계 계층 수정: 합계 text-xl font-bold category.color 강조 (28-ux-03)
  - Phase 28 전체 완료: 5개 세금 계산기 CONSIST-01~03 + 전체 16개 UX 요구사항 충족 (28-ux-03)
  - 에러(text-red-500)/경고(text-orange-500) 분리 패턴을 세금 2종 계산기(vat, securities-tax)에 적용, 500억 초과 경고 포함 (29-ux-01)
  - securities-tax 안내 박스 2025년→2026년 기준 텍스트 정정, text-blue-400→text-blue-600 (29-ux-01)
  - 라이트 테마 결과 박스 텍스트: text-*-400 계열 → text-*-600 계열로 통일 (가독성 확보, 29-ux-03)
  - Phase 29 전체 완료: 5개 세금 계산기 CONSIST-01~03, RESULT-02, FLOW-02 충족 (29-ux-03)
  - DSR/LTV/DTI error/warning 분리 패턴 적용: 에러는 계산 차단, 경고는 계산 허용, dark 테마 잔재 → light 테마 수정 (30-ux-02)
  - Phase 30 완료: 7개 부동산 계산기 CONSIST-01~03 충족, focus:border-blue-600 전체 통일 (30-ux-03)
- **Blockers**:
  - None

## Session Continuity

- **Last Session**: 2026-03-25
- **Stopped At**: Completed 30-03-PLAN.md (7개 부동산 계산기 일관성 최종 점검 완료)
