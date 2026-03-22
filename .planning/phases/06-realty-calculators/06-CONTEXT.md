# Phase 6: 부동산 계산기 (7개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary
부동산 관련 7개 계산기. `src/app/tools/realty/[slug]/page.tsx`.
</domain>

<decisions>
## Implementation Decisions

### 7개 계산기
1. **임대차 보증금 반환** (`deposit-return`) — REALTY-01: 보증금 반환 시기/금액
2. **전월세 전환율** (`jeonse-conversion`) — REALTY-02: 전세↔월세 전환 계산
3. **중개보수(복비)** (`broker-fee`) — REALTY-03: 거래금액별 요율 적용
4. **청약가점** (`subscription-score`) — REALTY-04: 무주택기간/부양가족/청약통장
5. **DSR** (`dsr`) — REALTY-05: 총부채원리금상환비율
6. **LTV** (`ltv`) — REALTY-06: 주택담보인정비율
7. **DTI** (`dti`) — REALTY-07: 총부채상환비율

### Claude's Discretion
- 2026년 기준 적용, 입력 UX 및 결과 표시
</decisions>

<code_context>
Same pattern as previous phases. Use CalculatorLayout.
</code_context>

<specifics>
No specific requirements.
</specifics>

<deferred>
None
</deferred>
