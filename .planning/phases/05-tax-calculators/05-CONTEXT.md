# Phase 5: 세금 계산기 (12개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary
세금 관련 12개 계산기를 구현. `src/app/tools/tax/[slug]/page.tsx`.
</domain>

<decisions>
## Implementation Decisions

### 12개 계산기
1. **소득세** (`income-tax`) — TAX-01: 근로소득세 간이세액표 기준
2. **양도소득세** (`capital-gains`) — TAX-02: 부동산/주식 양도차익 과세
3. **종합소득세** (`comprehensive-income`) — TAX-03: 종합소득 과세표준 × 세율
4. **취득세** (`acquisition-tax`) — TAX-04: 부동산 취득가액 × 세율
5. **종합부동산세** (`property-holding-tax`) — TAX-05: 공시가격 합산 초과분
6. **재산세** (`property-tax`) — TAX-06: 과세표준 × 세율
7. **등록면허세** (`registration-tax`) — TAX-07: 등록/면허 종류별 세율
8. **부가가치세** (`vat`) — TAX-08: 매출세액 - 매입세액
9. **증권거래세** (`securities-tax`) — TAX-09: 양도가액 × 세율
10. **연말정산** (`year-end-tax`) — TAX-10: 소득공제/세액공제 종합 계산
11. **4대보험료** (`social-insurance`) — TAX-11: 국민연금/건강/고용/산재
12. **월세 세액공제** (`rent-deduction`) — TAX-12: 월세 세액공제 요건/금액

### Claude's Discretion
- 2026년 세율/공제 기준 적용
- 입력 UX 및 결과 표시
</decisions>

<code_context>
Same pattern as Phase 2-4. Use CalculatorLayout, tools-data.ts tax category.
</code_context>

<specifics>
No specific requirements — follow established pattern.
</specifics>

<deferred>
None
</deferred>
