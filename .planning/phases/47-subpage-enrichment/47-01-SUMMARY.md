---
phase: 47-subpage-enrichment
plan: 01
subsystem: content
tags: [content, enrichment, subpages, eeat]
tech_stack:
  added: []
  patterns: ["shared-layout-enrichment", "support-page-depth"]
key_files:
  created:
    - .planning/phases/47-subpage-enrichment/47-CONTEXT.md
    - .planning/phases/47-subpage-enrichment/47-01-PLAN.md
  modified:
    - src/components/ui/CalculatorLayout.tsx
    - src/app/guides/page.tsx
    - src/app/about/page.tsx
    - src/app/editorial-policy/page.tsx
    - src/app/privacy/page.tsx
    - src/app/terms/page.tsx
metrics:
  completed_date: "2026-04-12"
---

# Phase 47 Plan 01 Summary

## What was enriched

### 1) Calculator/detail subpage family (all `/tools/*/*` via shared layout)
- Added **결과 해석 가이드** block (interpretation help + non-final-result caveat)
- Added **실무 다음 단계 체크리스트** block (category-aware practical next steps)
- Added **자주 생기는 해석 실수** content (category-aware pitfalls)
- Added **내부 링크 허브** to guides/editorial/about/terms/privacy
- Maintained existing E-E-A-T signals (reviewer, updated date, legal citations, FAQ, related tools)

### 2) Supporting/detail pages
- `guides/page.tsx`
  - Added **빠른 활용 흐름** section
  - Added cross-links to policy/support pages
- `about/page.tsx`
  - Added practical **서비스 활용 체크리스트**
- `editorial-policy/page.tsx`
  - Added **표현 안전장치 (Legal Safety Language)** section
- `privacy/page.tsx`
  - Added browser-side data handling and safe-use guidance section
- `terms/page.tsx`
  - Added practical usage order section for safe decision flow

## Legal-content safety handling
- Avoided deterministic/procedural certainty language.
- Repeatedly framed outputs as reference/first-pass estimates.
- Added reminders that outcomes vary by facts, evidence, and competent authority review.

## Verification performed
- `npm run build` passed successfully (Next.js production build, TS check, static generation complete).
- No compile/type errors from enrichment changes.

## Manual review still recommended
- Visual QA (mobile + desktop) for these pages:
  - Representative calculators: `/tools/court/attorney-fee`, `/tools/labor/severance-pay`, `/tools/tax/capital-gains-tax`, `/tools/realty/deposit-return`
  - Support pages: `/guides`, `/about`, `/editorial-policy`, `/privacy`, `/terms`
- Korean copy style consistency pass (tone compactness across newly added blocks).
