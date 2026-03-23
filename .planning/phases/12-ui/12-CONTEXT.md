# Phase 12: 패럴랙스 UI 적용 및 고도화 - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

성능 최적화된 패럴랙스 효과를 적용하여 사용자 경험을 고도화하고 다양한 기기 환경에 대응한다. 메인 페이지(HeroSection, CategorySection) 등 시각적 몰입감이 필요한 곳에 성능 최적화된 패럴랙스 애니메이션을 추가하며, 모바일과 reduced-motion 환경에서는 접근성을 위해 비활성화한다.
</domain>

<decisions>
## Implementation Decisions

### Animation Strategy
- Use `requestAnimationFrame` and CSS `transform: translate3d()` / `opacity` for 60fps GPU-accelerated scrolling.
- Avoid animating layout-triggering properties (`top`, `margin`, `width`, etc.).

### Responsive & Accessibility
- Disable parallax effects completely on mobile viewports (< 768px).
- Respect `prefers-reduced-motion: reduce` OS settings.

### Visual Scope
- HeroSection: Layered subtle moving background or floating elements matching the new Light Theme (deep blue & brass).
- CategorySection: Gentle staggered fade-in/translate-up on scroll using `IntersectionObserver`.

### Claude's Discretion
- Exact easing curves, speed multipliers, and IntersectionObserver thresholds are left to Claude's discretion to achieve a "premium" feel.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ParallaxLayer.tsx`: Exists but might need an update to strictly use `transform` and adhere to `prefers-reduced-motion` and viewport checks.
- `src/components/sections/HeroSection.tsx`: Flattened in Phase 11; needs to integrate the updated `ParallaxLayer`.
- `src/components/sections/CategorySection.tsx`: Can integrate `IntersectionObserver` for staggered reveals.

### Established Patterns
- Client components (`"use client"`) for UI interactions.
- Tailwind CSS utility classes.

### Integration Points
- `src/app/page.tsx`
</code_context>

<specifics>
## Specific Ideas

Follow the `parallax-playbook` 5-core principles: Performance First, Keep It Essential, Predictable Scrolling, Responsive & Accessible, Less is More.
</specifics>

<deferred>
## Deferred Ideas

None.
</deferred>