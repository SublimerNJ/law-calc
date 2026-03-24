# Phase 21: 기타 법률도구 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

4개 기타 법률도구의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. certified-letter (내용증명 도구) — 우편법, 민사소송법
2. legal-aid (법률구조 자격 확인 도구) — 법률구조법, 대한법률구조공단 기준
3. public-defender (국선변호인 선정 기준 도구) — 형사소송법 제33조
4. statute-of-limitations (소멸시효 계산기) — 민법 제162조~제184조, 상법

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 도구의 소스코드를 읽고 법령 원문(law.go.kr)과 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### Claude's Discretion
- Phase 13~20에서 확립된 패턴 따름

</decisions>

<code_context>
## Existing Code Insights

### Integration Points
- 각 도구는 독립적 페이지 (src/app/tools/misc/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 법률구조 소득 기준은 매년 변경 가능 — 최신 기준 확인 필요
- 소멸시효 기간은 권리 유형별로 다양하므로 모든 유형 대조 필요

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
