# Phase 10: 기타 법률도구 & 마무리 (4개) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary
기타 법률도구 4개 + 전체 QA + SEO 마무리. `src/app/tools/misc/[slug]/page.tsx`.
</domain>

<decisions>
## Implementation Decisions

### 4개 도구
1. **소멸시효** (`statute-of-limitations`) — MISC-01: 채권/권리별 소멸시효 기간
2. **국선변호사 자격 확인** (`public-defender`) — MISC-02: 소득기준 국선변호사 자격
3. **법률구조 대상 확인** (`legal-aid`) — MISC-03: 법률구조공단 지원 대상 확인
4. **내용증명 작성 도우미** (`certified-letter`) — MISC-04: 내용증명 양식/가이드

### 마무리 작업
- sitemap.ts 생성 (전체 70개 도구 URL)
- 전체 빌드 확인 (`npm run build`)

### Claude's Discretion
- 도구별 구현 방식 자유
</decisions>

<code_context>
Same pattern. Use CalculatorLayout.
</code_context>

<specifics>
No specific requirements.
</specifics>

<deferred>
None
</deferred>
