# Phase 25: 가사/가족법 UX·논리 감사 - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

가사/가족법 카테고리 6개 계산기에서 사용자가 정상적으로 사용할 때 논리적으로 이상하다고 느낄 수 있는 모든 포인트를 찾아 수정한다. 16개 요구사항(INPUT, RESULT, FLOW, CONSIST, EDGE)을 각 계산기에 적용.

</domain>

<decisions>
## Implementation Decisions

### 감사 기준 및 심각도
- **D-01:** 발견 문제를 3단계로 분류: Critical (잘못된 결과 출력), Warning (UX 혼란 유발), Info (개선 권장)
- **D-02:** Critical은 반드시 수정, Warning은 가능하면 수정, Info는 기록만

### 수정 방식
- **D-03:** 발견 즉시 수정 (v1.3 법률 감사에서 검증된 패턴 유지)
- **D-04:** 각 계산기별로 감사 → 수정 → 다음 계산기 순서

### 공통 패턴 처리
- **D-05:** 여러 계산기에서 동일 문제 발견 시 공통 유틸리티/헬퍼 추출 가능
- **D-06:** 단, 과도한 추상화 지양 — 3개 이상 계산기에서 동일 패턴일 때만 추출

### 엣지 케이스 테스트
- **D-07:** 코드 리뷰 기반으로 논리 흐름 추적 (자동화 테스트 작성은 이번 범위 아님)
- **D-08:** 각 계산기마다 대표 엣지 케이스 시나리오를 정의하고 코드에서 처리 확인

### Claude's Discretion
- 에러 메시지 문구의 구체적 표현
- 입력 필드 순서 최적화
- 결과 표시 레이아웃 미세 조정

</decisions>

<canonical_refs>
## Canonical References

No external specs — requirements are fully captured in REQUIREMENTS.md and decisions above.

### 프로젝트 요구사항
- `.planning/REQUIREMENTS.md` — 16개 검증 항목 (INPUT-01~04, RESULT-01~03, FLOW-01~03, CONSIST-01~03, EDGE-01~03)
- `.planning/ROADMAP.md` — Phase 25 success criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CalculatorLayout` (src/components/ui/CalculatorLayout.tsx): 모든 계산기가 공유하는 레이아웃 래퍼
- `formatNumber()`: 각 계산기에 로컬 정의 — 통일 가능한 후보
- `handleNumberChange()`: 숫자만 입력 헬퍼 — 다른 계산기에도 적용 가능

### Established Patterns
- `useState` + `handleCalculate` 버튼 클릭 패턴 (실시간 계산 아님)
- 에러 상태: 일부 계산기는 `error` state 사용, 일부는 조용히 `return` (불일관)
- 숫자 입력: `parseInt(value.replace(/,/g, ''), 10)` 패턴 공통

### Integration Points
- 각 계산기는 독립적 — 공유 state 없음
- `TOOLS`, `CATEGORIES`를 tools-data.ts에서 import

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. v1.3의 법률 감사와 동일한 phase-by-phase 접근법 사용.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 25-ux*
*Context gathered: 2026-03-25*
