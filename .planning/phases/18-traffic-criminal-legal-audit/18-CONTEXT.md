# Phase 18: 교통/형사 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

4개 교통/형사 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. accident-settlement (교통사고 합의금 계산기) — 금융감독원 과실비율 인정기준
2. drunk-driving (음주운전 처벌 계산기) — 도로교통법 제44조, 제148조의2
3. fine-penalty (범칙금·과태료 계산기) — 도로교통법 별표
4. bail (보석 계산기) — 형사소송법 제94조~제102조

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 계산기의 소스코드를 읽고 법령 원문(law.go.kr)과 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### Claude's Discretion
- Phase 13~17에서 확립된 패턴 따름

</decisions>

<code_context>
## Existing Code Insights

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/traffic/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 음주운전 BAC 구간은 2019년 강화된 기준(0.03%) 적용 여부 확인 필요

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
