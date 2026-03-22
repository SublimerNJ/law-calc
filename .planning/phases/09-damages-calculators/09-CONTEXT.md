# Phase 9: 손해배상 계산기 (6개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary
손해배상 관련 6개 계산기. `src/app/tools/damages/[slug]/page.tsx`.
</domain>

<decisions>
## Implementation Decisions

### 6개 계산기
1. **손해배상** (`general-damages`) — DAMAGES-01: 일반 손해배상액 산정
2. **명예훼손 손해배상** (`defamation`) — DAMAGES-02: 명예훼손 위자료 산정
3. **의료사고 손해배상** (`medical-malpractice`) — DAMAGES-03: 의료과실 배상액
4. **일실수입** (`lost-income`) — DAMAGES-04: 기대여명/수입 기반 일실수입
5. **장해등급 보상금** (`disability-compensation`) — DAMAGES-05: 장해등급별 보상금
6. **제조물책임 손해배상** (`product-liability`) — DAMAGES-06: 제조물책임법 배상액

### Claude's Discretion
- 한국 판례 기준 적용
</decisions>

<code_context>
Same pattern. Use CalculatorLayout.
</code_context>

<specifics>
No specific requirements.
</specifics>

<deferred>
None
</deferred>
