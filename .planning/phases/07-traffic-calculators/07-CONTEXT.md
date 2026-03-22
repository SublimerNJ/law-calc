# Phase 7: 교통/형사 계산기 (6개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary
교통/형사 관련 6개 계산기. `src/app/tools/traffic/[slug]/page.tsx`.
</domain>

<decisions>
## Implementation Decisions

### 6개 계산기
1. **교통사고 합의금** (`accident-settlement`) — TRAFFIC-01: 치료비/위자료/휴업손해 등
2. **교통사고 과실비율** (`fault-ratio`) — TRAFFIC-02: 사고유형별 과실비율 판단
3. **음주운전 처벌** (`dui-penalty`) — TRAFFIC-03: 혈중알코올농도별 처벌 기준
4. **속도위반 벌금** (`speeding-fine`) — TRAFFIC-04: 초과속도별 벌점/범칙금
5. **벌금/과태료** (`fine-calculator`) — TRAFFIC-05: 각종 벌금/과태료 계산
6. **형사 보석금** (`bail`) — TRAFFIC-06: 보석금 산정 기준

### Claude's Discretion
- 2026년 법률 기준 적용
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
