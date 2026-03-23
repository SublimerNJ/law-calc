# Phase 11: 라이트 테마 전환 및 디자인 시스템 개편 - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

전문적인 법률 도구의 신뢰감을 주는 밝은 톤의 디자인 시스템과 UI를 전면 적용한다. 기존 네이비/골드 톤의 다크 테마 위주의 UI에서 AI 느낌을 완전히 탈피하고, 신뢰감 있고 깔끔한 라이트 테마로 전환하는 것을 목표로 한다.
</domain>

<decisions>
## Implementation Decisions

### Theme Strategy
- Drop dark mode completely for a consistent, professional legal aesthetic

### Color Palette
- Deep blue for trust, brass accent for authority, crisp white backgrounds

### UI Style
- Clean, solid borders, flat design, minimal shadows (removes AI/glassmorphism feel)

### Claude's Discretion
- Implementation of specific typography sizing, spacing, and micro-interactions within the clean & solid bounds.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/globals.css`: Contains CSS variables and `.light` theme overrides.
- `src/components/ui/ThemeToggle.tsx`: Used to toggle themes (to be removed/refactored).
- `src/components/ui/Card.tsx`, `src/components/ui/CalculatorLayout.tsx`: Need style updates.

### Established Patterns
- Next.js App Router layout structure.
- Tailwind CSS v4 variables mapped in `globals.css` with `@theme`.

### Integration Points
- `src/app/layout.tsx` (theme provider configuration)
- Base components in `src/components/ui/`
</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.
</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.
</deferred>