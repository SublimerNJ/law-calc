# Phase 19: 채권/이자 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

3개 채권/이자 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. late-payment (지연이자 계산기) — 소송촉진 등에 관한 특례법 제3조
2. loan-interest (대출이자 계산기) — 이자제한법 제2조
3. unjust-enrichment (부당이득 반환 계산기) — 민법 제741조~제749조

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 계산기의 소스코드를 읽고 법령 원문(law.go.kr)과 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### Claude's Discretion
- Phase 13~18에서 확립된 패턴 따름

</decisions>

<code_context>
## Existing Code Insights

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/debt/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 소송촉진특례법 법정이율은 대통령령으로 수시 변경 가능 — 현행 12% 확인 필수

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
