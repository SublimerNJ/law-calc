# Phase 4: 노동/근로 계산기 (14개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

노동/근로 관련 14개 계산기를 구현. `src/app/tools/labor/[slug]/page.tsx`.

</domain>

<decisions>
## Implementation Decisions

### 14개 계산기
1. **퇴직금** (`severance-pay`) — LABOR-01: 근속연수 × 30일 평균임금
2. **해고예고수당** (`dismissal-notice`) — LABOR-02: 30일분 통상임금
3. **연차수당** (`annual-leave-pay`) — LABOR-03: 미사용 연차 × 통상임금
4. **연장근로수당** (`overtime-pay`) — LABOR-04: 통상임금 × 1.5배
5. **주휴수당** (`weekly-holiday`) — LABOR-05: 주 15시간 이상 근무시
6. **최저임금 위반** (`minimum-wage`) — LABOR-06: 2026년 최저임금 기준 위반 여부
7. **부당해고 보상금** (`unfair-dismissal`) — LABOR-07: 해고기간 임금상당액
8. **산재보험급여** (`industrial-accident`) — LABOR-08: 요양/휴업/장해급여
9. **출산휴가급여** (`maternity-leave`) — LABOR-09: 90일(다태아 120일) 급여
10. **육아휴직급여** (`parental-leave`) — LABOR-10: 통상임금 80% (상한/하한)
11. **실업급여** (`unemployment`) — LABOR-11: 퇴직 전 평균임금 60% × 소정급여일수
12. **통상임금** (`ordinary-wage`) — LABOR-12: 기본급+고정수당 시급 환산
13. **평균임금** (`average-wage`) — LABOR-13: 3개월 총임금 ÷ 총일수
14. **휴업수당** (`suspension-pay`) — LABOR-14: 평균임금의 70%

### Claude's Discretion
- 2026년 최저임금, 고용보험 기준 적용
- 입력 UX 및 결과 표시

</decisions>

<code_context>
## Existing Code Insights
Same pattern as Phase 2-3. Use CalculatorLayout, tools-data.ts labor category.
</code_context>

<specifics>
No specific requirements — follow established pattern.
</specifics>

<deferred>
None
</deferred>
