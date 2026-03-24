# Phase 15: 노동/근로 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

12개 노동/근로 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. severance-pay (퇴직금 계산기) — 근로자퇴직급여보장법
2. overtime-pay (연장근로수당 계산기) — 근로기준법 제56조
3. weekly-holiday-pay (주휴수당 계산기) — 근로기준법 제55조
4. annual-leave-pay (연차수당 계산기) — 근로기준법 제60조
5. minimum-wage-check (최저임금 검증기) — 최저임금법
6. maternity-leave (출산휴가 급여 계산기) — 근로기준법 제74조, 고용보험법
7. parental-leave (육아휴직 급여 계산기) — 남녀고용평등법, 고용보험법
8. unemployment-benefit (실업급여 계산기) — 고용보험법
9. industrial-accident (산재보상 계산기) — 산업재해보상보험법
10. unfair-dismissal (부당해고 구제 계산기) — 근로기준법 제28조~
11. dismissal-notice (해고예고수당 계산기) — 근로기준법 제26조
12. shutdown-allowance (휴업수당 계산기) — 근로기준법 제46조

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
- 구간 경계값이 올바른지 (Phase 13에서 확립: 미만(<) 사용)
- 설명 텍스트가 법적으로 정확한지
- 2025년 기준 최저임금·상한액·하한액 등 고시 금액 최신화

### Claude's Discretion
- Phase 13/14에서 확립된 패턴 따름 (Math.floor 끝수처리, 미만(<) 경계값 등)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- CalculatorLayout 공통 레이아웃 컴포넌트
- TOOLS, CATEGORIES 데이터 (src/lib/tools-data.ts)

### Established Patterns
- 각 계산기: 'use client' + useState + 계산 함수 + 결과 표시
- Phase 13/14에서 확립: Math.floor(버림), 경계값 < (미만)

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/labor/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- 노동 계산기는 금액 기준(최저임금, 상한액, 하한액)이 매년 변경되므로 2025년 기준 최신화 필수
- 가산율(50%, 100%)은 근로기준법 명시 사항이므로 정확한 조문 대조 필요

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
