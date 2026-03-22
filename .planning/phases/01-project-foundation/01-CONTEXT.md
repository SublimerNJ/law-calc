# Phase 1: 프로젝트 기반 & 디자인 시스템 - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Next.js 16 프로젝트 scaffolding, 패럴랙스 히어로 섹션, 공통 레이아웃/컴포넌트, 카테고리 데이터 구조, 다크/라이트 테마를 완성한다. 기존 "도구 월드(loop creation)" 프로젝트의 구조를 참고하되 법률 특화 디자인으로 새로 구축.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — infrastructure phase.
- 기존 loop creation 프로젝트의 스택/패턴을 최대한 참고
- Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript
- Pretendard 한글 폰트
- 법률 테마: 네이비/골드 톤, 신뢰감 있는 디자인
- 패럴랙스 효과: 히어로 섹션 + 스크롤 기반 섹션 애니메이션

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- 기존 loop creation의 tool-collection 프로젝트 구조 참고 가능
- HeroSection, Card, Header, Footer, AdBanner 컴포넌트 패턴
- tools-data.ts 카테고리/도구 데이터 구조

### Established Patterns
- App Router (src/app/) 디렉토리 구조
- next-themes 다크/라이트 테마
- Pretendard 폰트 CDN

### Integration Points
- src/app/layout.tsx — 루트 레이아웃
- src/app/page.tsx — 메인 페이지
- src/lib/tools-data.ts — 도구 데이터

</code_context>

<specifics>
## Specific Ideas

- 패럴랙스 효과 적용 (parallax-playbook 스킬 참고)
- 미니멀 디자인, 법률 전문 사이트 느낌
- 9개 카테고리: 소송/법원, 가사/가족법, 노동/근로, 세금, 부동산, 교통/형사, 채권/이자, 손해배상, 기타 법률도구

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>
