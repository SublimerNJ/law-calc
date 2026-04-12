# Phase 47: Subpage Enrichment - Context

**Gathered:** 2026-04-12
**Status:** In progress

<domain>
## Phase Boundary

프로젝트 내 의미 있는 하위 페이지(특히 계산기 상세 페이지, 가이드 목록/상세, 지원 페이지)를 얇은 템플릿 상태에서 벗어나도록 정보 밀도 중심으로 보강한다.

핵심 목표:
- 계산기 상세 페이지 전반의 해석/실행 가이드 강화
- 내부 링크, 다음 단계, 체크리스트, 주의사항을 구조화
- 신뢰 신호(E-E-A-T) 및 업데이트/검토 맥락 보강
- 정책/지원 페이지의 실무 유용성 강화
</domain>

<decisions>
## Implementation Decisions

1. **Document-first**
   - 코드 변경 전 phase 문서(컨텍스트/계획)를 먼저 생성한다.

2. **Phase-by-phase execution**
   - Phase A: 계산기 상세 공통 레이아웃 보강 (전 calculator family 공통 반영)
   - Phase B: 가이드 허브 및 지원성 페이지(about/editorial/privacy/terms) 보강
   - Phase C: 검증/빌드/정리 및 보고

3. **Legal content safety rail (Korean law)**
   - 한국 법률 절차를 단정적 확정 사실로 서술하지 않는다.
   - “사안별 차이”, “관할 기관/법원 판단 가능성”, “전문가 확인 권장” 문구를 일관 적용한다.

4. **Design-system preservation**
   - 기존 Tailwind 토큰, 카드/섹션 패턴, 라이트 테마 컨벤션 유지.
   - 색상/간격/컴포넌트 스타일은 기존 코드 규칙에 맞춘다.
</decisions>

<code_context>
## Existing Code Insights

- 핵심 공통 상세 레이아웃: `src/components/ui/CalculatorLayout.tsx`
- 동적 상세 엔트리: `src/app/tools/[category]/[tool]/page.tsx`
- 서브 허브/지원 페이지:
  - `src/app/guides/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/editorial-policy/page.tsx`
  - `src/app/privacy/page.tsx`
  - `src/app/terms/page.tsx`
</code_context>

<specifics>
## Specific Enrichment Targets

- Practical next-step guidance
- Contextual interpretation help
- Caveats and mistake-prevention bullets
- Internal links to related pages
- Update/review context and safe-reference notes
</specifics>
