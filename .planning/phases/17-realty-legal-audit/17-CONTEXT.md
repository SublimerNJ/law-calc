# Phase 17: 부동산 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

7개 부동산 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. deposit-return (보증금 반환 계산기) — 주택임대차보호법
2. rent-conversion (전월세 전환 계산기) — 주택임대차보호법 시행령
3. brokerage-fee (중개보수 계산기) — 공인중개사법 시행규칙
4. subscription-score (청약 가점 계산기) — 주택공급에관한규칙
5. dsr (DSR 계산기) — 은행업감독규정
6. ltv (LTV 계산기) — 은행업감독규정
7. dti (DTI 계산기) — 은행업감독규정

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 계산기의 소스코드를 읽고 법령 원문(law.go.kr)과 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### 검증 범위
- 비율/요율/금액이 현행 법령·규정과 일치하는지
- 법령 명칭·조문 번호가 정확한지
- 구간 경계값이 올바른지
- 금융 규제 기준(DSR/LTV/DTI)이 현행 은행업감독규정과 일치하는지

### Claude's Discretion
- Phase 13~16에서 확립된 패턴 따름

</decisions>

<code_context>
## Existing Code Insights

### Established Patterns
- 각 계산기: 'use client' + useState + 계산 함수 + 결과 표시
- Math.floor(버림), 경계값 < (미만)

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/realty/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 부동산 계산기는 금융 규제 기준이 수시로 변경되므로 최신 은행업감독규정 확인 필수
- 전월세 전환율은 기준금리에 연동되므로 현행 기준금리 확인 필요

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
