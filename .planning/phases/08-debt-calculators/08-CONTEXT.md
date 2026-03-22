# Phase 8: 채권/이자 계산기 (4개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary
채권/이자 관련 4개 계산기. `src/app/tools/debt/[slug]/page.tsx`.
</domain>

<decisions>
## Implementation Decisions

### 4개 계산기
1. **법정이자** (`legal-interest`) — DEBT-01: 법정이율(연 5%) 기반 이자
2. **지연손해금** (`delay-damages`) — DEBT-02: 지연이자(소송촉진법 12%) 계산
3. **대여금 이자** (`loan-interest`) — DEBT-03: 이자제한법 범위 내 이자 계산
4. **부당이득 반환** (`unjust-enrichment`) — DEBT-04: 부당이득 원금+이자 반환액

### Claude's Discretion
- 2026년 법정이율 기준 적용
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
