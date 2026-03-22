# Phase 2: 소송/법원 계산기 (9개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

소송/법원 관련 9개 계산기를 구현한다. 각 계산기는 독립 라우트(`/tools/court/[tool]`)로 접근 가능하며, Phase 1에서 만든 CalculatorLayout 컴포넌트를 사용한다.

</domain>

<decisions>
## Implementation Decisions

### Calculator Implementation Pattern
- 각 계산기는 `src/app/tools/court/[slug]/page.tsx`에 구현
- CalculatorLayout 컴포넌트로 감싸서 일관된 UI 제공
- 모든 계산은 클라이언트 사이드 ('use client')
- 입력폼 → 계산 → 결과 표시 패턴
- recharts로 필요시 차트/그래프 표시

### 9개 계산기 상세
1. **변호사보수 소송비용산입** (`attorney-fee`): 소가 기준 변호사 보수 산입액 계산 (대한변협 기준)
2. **소송비용** (`lawsuit-cost`): 인지대 + 송달료 합산 계산
3. **인지대** (`stamp-fee`): 소가별 인지대 계산 (민사소송등인지법 기준)
4. **송달료** (`service-fee`): 당사자 수 × 회수 × 단가
5. **소액사건 재판비용** (`small-claims`): 소액사건(3천만원 이하) 특례 비용
6. **지급명령 비용** (`payment-order`): 독촉절차 인지대(소송 1/10) + 송달료
7. **민사조정 비용** (`mediation`): 조정신청 인지대 + 송달료
8. **가사소송 비용** (`family-court`): 가사소송/비송 인지대 기준
9. **전자소송 비용** (`e-litigation`): 전자소송 할인(인지대 10% 감면) 반영

### Claude's Discretion
- 한국 법률 기준 정확한 계산 로직 구현
- 입력 필드 구성 및 UX 흐름
- 계산 결과 표시 형태 (표, 차트 등)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/CalculatorLayout.tsx` — 공통 계산기 레이아웃
- `src/components/ui/Card.tsx` — 카드 컴포넌트
- `src/lib/tools-data.ts` — 도구 데이터 (라우트 매핑)

### Established Patterns
- Next.js App Router 동적 라우팅
- Tailwind CSS 4 + 법률 테마 토큰
- 'use client' 클라이언트 컴포넌트

### Integration Points
- `src/app/tools/[category]/[tool]/page.tsx` — 동적 도구 페이지
- tools-data.ts의 court 카테고리 도구 목록

</code_context>

<specifics>
## Specific Ideas

- 한국 법률 기준 2026년 최신 세율/기준 적용
- 인지대는 민사소송등인지법 별표 기준
- 변호사보수는 대한변호사협회 보수기준

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
