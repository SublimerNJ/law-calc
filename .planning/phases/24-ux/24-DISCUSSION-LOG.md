# Phase 24: 소송/법원 UX·논리 감사 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-25
**Phase:** 24-소송/법원 UX·논리 감사
**Areas discussed:** 감사 기준, 수정 범위, 공통 패턴, 엣지 케이스
**Mode:** --auto (all decisions auto-selected as recommended defaults)

---

## 감사 기준/심각도

| Option | Description | Selected |
|--------|-------------|----------|
| 3단계 (Critical/Warning/Info) | 심각도별 분류 후 우선순위 수정 | ✓ |
| 2단계 (Fix/Skip) | 단순 수정 여부만 판단 | |
| 전부 수정 | 발견 즉시 모두 수정 | |

**User's choice:** [auto] 3단계 (Critical/Warning/Info) — recommended default

---

## 수정 방식

| Option | Description | Selected |
|--------|-------------|----------|
| 발견 즉시 수정 | 각 계산기 감사하며 바로 수정 | ✓ |
| 전체 감사 후 일괄 수정 | 먼저 전체 목록 작성 후 수정 | |

**User's choice:** [auto] 발견 즉시 수정 — v1.3에서 검증된 패턴

---

## 공통 패턴 처리

| Option | Description | Selected |
|--------|-------------|----------|
| 공통 유틸리티 추출 | 3개 이상 동일 패턴 시 추출 | ✓ |
| 개별 수정만 | 각 파일에서 독립 수정 | |

**User's choice:** [auto] 공통 유틸리티 추출 (3개+ 동일 패턴 시) — recommended default

---

## 엣지 케이스 테스트

| Option | Description | Selected |
|--------|-------------|----------|
| 코드 리뷰 기반 | 코드에서 논리 추적 | ✓ |
| 자동화 테스트 작성 | Jest 등으로 테스트 추가 | |

**User's choice:** [auto] 코드 리뷰 기반 — recommended default

## Claude's Discretion

- 에러 메시지 문구 표현
- 입력 필드 순서
- 결과 표시 레이아웃 미세 조정

## Deferred Ideas

None
