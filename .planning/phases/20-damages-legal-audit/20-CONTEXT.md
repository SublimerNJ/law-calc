# Phase 20: 손해배상 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

4개 손해배상 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. damages-general (일반 손해배상 계산기) — 민법 제750조~제766조
2. defamation (명예훼손 위자료 계산기) — 대법원 판례 기준
3. medical-malpractice (의료사고 손해배상 계산기) — 의료법, 판례
4. lost-income (일실수입 계산기) — 호프만식/라이프니츠식 판례

</domain>

<decisions>
## Implementation Decisions

### 검증 방법
- 반드시 /Launcelot-Lawyer 스킬을 사용하여 검증 (자체 판단 금지)
- 각 계산기의 소스코드를 읽고 법령 원문(law.go.kr) 및 대법원 판례와 대조
- 발견된 오류는 즉시 수정
- 수정 후 TypeScript 타입 체크 통과 확인

### Claude's Discretion
- Phase 13~19에서 확립된 패턴 따름

</decisions>

<code_context>
## Existing Code Insights

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/damages/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 손해배상 계산기는 판례 기반이므로 대법원 판결 번호 인용 정확성 확인 필요
- 호프만식/라이프니츠식 공식의 수학적 정확성 검증

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
