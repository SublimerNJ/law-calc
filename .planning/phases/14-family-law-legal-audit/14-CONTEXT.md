# Phase 14: 가사/가족법 계산기 법률 감사 - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

6개 가사/가족법 계산기의 법률 정확성을 /Launcelot-Lawyer 스킬로 검증하고 오류를 수정한다.

대상 계산기:
1. alimony (위자료 계산기) — 대법원 판례 기반 위자료 산정
2. child-support (양육비 계산기) — 서울가정법원 양육비 산정기준표
3. property-division (재산분할 계산기) — 민법 및 판례 기준
4. inheritance-tax (상속세 계산기) — 상속세및증여세법
5. forced-heirship (유류분 계산기) — 민법 제1112조~제1118조
6. inheritance-order (상속순위 계산기) — 민법 제1000조~제1003조

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
- Phase 13에서 확립된 패턴 따름 (Math.floor 끝수처리, 미만(<) 경계값 등)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- CalculatorLayout 공통 레이아웃 컴포넌트
- TOOLS, CATEGORIES 데이터 (src/lib/tools-data.ts)

### Established Patterns
- 각 계산기: 'use client' + useState + 계산 함수 + 결과 표시
- Phase 13에서 확립: Math.floor(버림), 경계값 < (미만), 송달료 5,500원 기준

### Integration Points
- 각 계산기는 독립적 페이지 (src/app/tools/family/[name]/page.tsx)

</code_context>

<specifics>
## Specific Ideas

- Phase 13에서 발견된 공통 오류 유형: Math.ceil→Math.floor, 경계값 <=→<, 송달료 단가 갱신, 법령 조문 오류
- 가사/가족법 계산기는 판례 기반 기준이 많아 법률 텍스트뿐 아니라 대법원 판례·양육비 산정기준표 대조 필요

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
