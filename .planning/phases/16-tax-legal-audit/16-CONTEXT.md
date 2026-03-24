# Phase 16: 세금 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

10개 세금 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. capital-gains-tax (양도소득세 계산기) — 소득세법
2. comprehensive-income-tax (종합소득세 계산기) — 소득세법 제55조
3. acquisition-tax (취득세 계산기) — 지방세법 제11조
4. comprehensive-property-tax (종합부동산세 계산기) — 종합부동산세법
5. registration-tax (등록면허세 계산기) — 지방세법
6. vat (부가가치세 계산기) — 부가가치세법
7. securities-tax (증권거래세 계산기) — 증권거래세법
8. four-insurances (4대보험 계산기) — 국민건강보험법, 국민연금법 등
9. rent-tax-credit (월세 세액공제 계산기) — 조세특례제한법
10. year-end-tax (연말정산 계산기) — 소득세법

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 계산기의 소스코드를 읽고 법령 원문(law.go.kr)과 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### 검증 범위
- 세율 구간/비율/금액이 현행 세법과 일치하는지
- 공제 한도/기준이 최신 기준과 일치하는지
- 4대보험료율이 2025/2026년 적용 기준과 일치하는지
- 법령 명칭·조문 번호가 정확한지

### Claude's Discretion
- Phase 13/14/15에서 확립된 패턴 따름

</decisions>

<code_context>
## Existing Code Insights

### Established Patterns
- 각 계산기: 'use client' + useState + 계산 함수 + 결과 표시
- Math.floor(버림), 경계값 < (미만)

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/tax/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 세금 계산기는 누진세율 구간이 많아 각 구간 경계값·세율 정밀 대조 필요
- 4대보험은 매년 요율 변경되므로 최신 고시 확인 필수

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
