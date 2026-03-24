---
gsd_state_version: 1.0
milestone: v1.3
milestone_name: 전체 계산기 법률 정확성 감사
status: Phase complete — ready for verification
last_updated: "2026-03-24T03:09:07.260Z"
progress:
  total_phases: 9
  completed_phases: 3
  total_plans: 9
  completed_plans: 9
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-24)

**Core value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구 제공
**Current focus:** Phase 15 — labor-legal-audit

## Current Position

Phase: 15 (labor-legal-audit) — EXECUTING
Plan: 4 of 4

## Accumulated Context

- **Decisions**:
  - v1.2 에서는 기존 다크/AI 느낌의 테마를 벗어나 전문적인 라이트 테마를 기본으로 사용.
  - 패럴랙스 효과는 성능(Performance First)과 접근성(reduced-motion)을 고려하여 transform/opacity만 사용하고 모바일에서는 비활성화.
  - attorney-fee 계산기에서 별표 구간 오류, 심급 배율 오류, 법령 명칭 오류 등 6건 발견 → 전체 감사 필요 (v1.3 착수 계기)
  - v1.3 각 phase는 /Launcelot-Lawyer 스킬을 사용하여 법령 원문(law.go.kr) 대조 기반으로 검증 후 오류 수정
  - e-court: 소가 경계값 미만(<), 100원 미만 버림(floor), 송달료 5,500원/심급별 회수 적용
  - 유류분 기산기간: 제3자 증여 1년 이내, 상속인 증여 기간 제한 없음 (민법 제1114조)
  - 대습상속 근거: 제1001조 (대습상속 규정), 제1010조는 대습상속인의 상속분 규정
  - 양육비 법적 근거: 민법 제833조(부부협조)는 오류, 민법 제837조(양육책임)가 정확
  - 2026년 최저임금 10,320원 확정 적용 (고용노동부 고시 제2025-38호) — minimum-wage-check, industrial-accident 반영
  - 연장근로 레이블 '52시간'은 오류: 연장근로 한도는 1주 12시간(제53조 제1항), 52시간은 주 총근로시간 합산
  - 제61조 사용촉진 조항은 수당 면제 예외이므로 계산기에 명시 필요
  - 출산휴가급여 상한액 2,035,640원→2,100,000원 수정 (고용보험법 시행령 제101조 고시)
  - 육아휴직급여 2024.1.1 개정 반영: 전 기간 80%/150만원 단일 요율, 사후지급금 제도 폐지
  - 실업급여 하한액 최저임금 2025 기준→2026 기준(10,320원) 수정
- **Blockers**:
  - None

## Session Continuity

- **Last Session**: 2026-03-24
- **Stopped At**: Completed 15-04-PLAN.md (parallel agent)
- **완료**: attorney-fee(이전 세션), lawsuit-cost, small-claims, payment-order, civil-mediation, family-court(13-01), e-court(13-02)
- **남은**: Phase 14~21
- **발견된 공통 오류 패턴**: 인지액 올림→버림, 소가 경계값 이하→미만, 송달료 단가/회수 불일치, 심급별 배율 오류
