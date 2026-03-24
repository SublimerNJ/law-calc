# Phase 13: 소송/법원 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

6개 소송/법원 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. lawsuit-cost (소송비용 계산기) — 인지대·송달료 산정
2. small-claims (소액사건 재판비용 계산기) — 소액사건심판법 기준
3. payment-order (지급명령 비용 계산기) — 독촉절차 비용
4. civil-mediation (민사조정 비용 계산기) — 민사조정법 기준
5. family-court (가사소송 비용 계산기) — 가사소송법 기준
6. e-court (전자소송 비용 계산기) — 전자소송 할인 기준

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 계산기의 소스코드를 읽고 법령 원문(law.go.kr)과 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### 검증 범위
- 계산 공식/비율/금액이 현행 법령과 일치하는지
- 법령 명칭·조문 번호가 정확한지
- 구간 경계값이 올바른지
- 설명 텍스트가 법적으로 정확한지

### Claude's Discretion
- 면책 고지 문구 추가 여부는 attorney-fee 사례를 따름

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- CalculatorLayout 공통 레이아웃 컴포넌트
- TOOLS, CATEGORIES 데이터 (src/lib/tools-data.ts)

### Established Patterns
- 각 계산기: 'use client' + useState + 계산 함수 + 결과 표시
- BRACKETS 배열로 구간별 기준 정의

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/court/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- attorney-fee에서 발견된 오류 유형 참고: 별표 구간 누락/추가, 법령 명칭 오류, 심급 배율 오류, 최소/상한 금액 오류
- 동일한 패턴의 오류가 다른 계산기에도 있을 가능성 높음

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
