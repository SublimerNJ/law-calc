# Phase 3: 가사/가족법 계산기 (8개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

가사/가족법 관련 8개 계산기를 구현한다. 각 계산기는 `src/app/tools/family/[slug]/page.tsx`에 구현.

</domain>

<decisions>
## Implementation Decisions

### 8개 계산기 상세
1. **위자료** (`alimony`): 혼인기간, 유책사유, 재산상태 등 기반 위자료 산정
2. **양육비** (`child-support`): 양육비산정기준표(2026) 기반, 부모 소득 고려
3. **재산분할** (`property-division`): 혼인 중 형성재산 기여도 기반 분할
4. **상속세** (`inheritance-tax`): 상속재산가액, 공제, 세율 적용
5. **법정상속분** (`legal-heir-share`): 민법 기준 법정상속분 계산
6. **유류분** (`reserved-portion`): 유류분 비율 및 반환청구액
7. **증여세** (`gift-tax`): 증여재산가액, 공제, 세율 적용
8. **상속순위** (`inheritance-order`): 상속순위 판별 (배우자, 직계비속/존속, 형제자매)

### Claude's Discretion
- 한국 민법/상속세 및 증여세법 기준 정확한 계산
- 2026년 기준 세율/공제 적용
- 입력 UX 및 결과 표시 형태

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/CalculatorLayout.tsx`
- Phase 2 계산기들의 구현 패턴 참고

### Integration Points
- tools-data.ts의 family 카테고리

</code_context>

<specifics>
## Specific Ideas
No specific requirements — follow established calculator pattern from Phase 2.
</specifics>

<deferred>
## Deferred Ideas
None
</deferred>
