---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
last_updated: "2026-03-22T16:56:53.022Z"
progress:
  total_phases: 10
  completed_phases: 4
  total_plans: 19
  completed_plans: 16
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-23)

**Core value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산
**Current focus:** Phase 05 — tax-calculators

## Current Phase

- **Phase:** 5
- **Status:** Executing Phase 05
- **Plans:** 4/4 [COMPLETE]

## Decisions

- Route pattern `/tools/{category}/{id}` for all 70 calculators
- Navy #0a0f1c background with gold #c9a84c accent for legal trust feel
- Per-category color accents in Category interface
- Gold #c9a84c used consistently in parallax hero (not reference #d4af37)
- IntersectionObserver one-shot pattern for scroll animations
- [Phase 01]: Gold LT logo with category dropdown nav pattern
- [Phase 01]: Light theme via .light CSS class overrides
- [Phase 01]: CategorySection wrapper pattern for scroll-animated category grids
- [Phase 01]: CalculatorLayout shell pattern: breadcrumbs + header + 2-col + sidebar for all calculators
- [Phase 02]: Attorney fee 8-tier bracket with 30M cap; stamp fee 100won ceiling rounding
- [Phase 02]: Payment order uses totalParties (creditor+debtors) for service fee
- [Phase 02]: Reused stamp fee formula across civil-mediation, family-court, e-court calculators
- [Phase 03]: Gift tax prior-gift credit subtracts tax on prior gifts from combined tax
- [Phase 03]: Alimony uses midpoint of adjusted range as estimate
- [Phase 03]: Child support uses simplified 2026 7-bracket income table
- [Phase 03]: 2026 inheritance tax 5-bracket progressive rates with spouse/lump-sum deductions
- [Phase 04]: Severance pay uses actual calendar days for 3-month period
- [Phase 04]: Annual leave pay supports 40h (209h) and 44h (226h) weekly schedules
- [Phase 04]: 2026 minimum wage 10,030won constant; holiday overtime 8h split at 1.5x/2.0x
- [Phase 04]: Industrial accident tab UI for 3 benefit types; disability pension 1-7 grades only
- [Phase 04]: 2026 parental leave multi-tier caps with single-parent override
- [Phase 04]: Average wage uses calendar days (역일수) per 근로기준법 제2조
- [Phase 04]: Shutdown allowance shows both avg70% and ordinary wage side-by-side
- [Phase 05]: Registration tax minimum 6,000 won floor per local tax law
- [Phase 05]: VAT dual mode: supply-based vs total-price-based calculation
- [Phase 05]: KOSPI agriculture tax 0.03% separate from securities tax 0.03%

## Session Log

| Date | Phase | Action | Outcome |
|------|-------|--------|---------|
| 2026-03-23 | — | Project initialized | PROJECT.md, REQUIREMENTS.md, ROADMAP.md created |
| 2026-03-23 | 01 | Plan 01-01 executed | Next.js scaffold + 70-tool data structure |
| 2026-03-23 | 01 | Plan 01-03 executed | Parallax hero + scroll-animated category sections |
| 2026-03-23 | 01 | Plan 01-04 executed | Main page assembly + CalculatorLayout + 70 static tool pages |
