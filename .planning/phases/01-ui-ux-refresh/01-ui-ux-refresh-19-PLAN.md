---
phase: 01-ui-ux-refresh
plan: 19
type: execute
wave: 1
depends_on: []
files_modified: ["src/app/guides/comprehensive-income-tax-freelancer/page.tsx", "src/app/guides/civil-mediation-vs-lawsuit/page.tsx", "src/app/guides/unfair-dismissal-relief/page.tsx"]
autonomous: true
requirements: [UX-01]

must_haves:
  truths:
    - "User can view data-dense dashboard layout with minimal padding"
    - "Charts and KPI cards are clearly visible above the fold"
    - "UI uses Primary #3B82F6 and Fira Code typography"
  artifacts:
    - path: "src/app/guides/comprehensive-income-tax-freelancer/page.tsx"
      provides: "Data-Dense Dashboard UI"
    - path: "src/app/guides/civil-mediation-vs-lawsuit/page.tsx"
      provides: "Data-Dense Dashboard UI"
    - path: "src/app/guides/unfair-dismissal-relief/page.tsx"
      provides: "Data-Dense Dashboard UI"

  key_links: []
---

<objective>
Update UI/UX to Data-Dense Dashboard style based on ui-ux-pro-max skill.
Purpose: Enhance readability and data visibility for dashboard components.
Output: Refactored page.tsx files using Grid layout, Fira Code, and accessible contrast.
</objective>

<execution_context>
@$HOME/.gemini/skills/ui-ux-pro-max/SKILL.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
</context>

<tasks>
<task type="auto">
  <name>Task 1: Update comprehensive-income-tax-freelancer/page.tsx</name>
  <files>src/app/guides/comprehensive-income-tax-freelancer/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/guides/comprehensive-income-tax-freelancer/page.tsx" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>
<task type="auto">
  <name>Task 2: Update civil-mediation-vs-lawsuit/page.tsx</name>
  <files>src/app/guides/civil-mediation-vs-lawsuit/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/guides/civil-mediation-vs-lawsuit/page.tsx" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>
<task type="auto">
  <name>Task 3: Update unfair-dismissal-relief/page.tsx</name>
  <files>src/app/guides/unfair-dismissal-relief/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/guides/unfair-dismissal-relief/page.tsx" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>

</tasks>

<verification>
Check that there are no emojis used as icons, all interactive elements have cursor-pointer, hover transitions are 150-300ms, and light mode text contrast is at least 4.5:1.
</verification>

<success_criteria>
Pages reflect Data-Dense Dashboard structure with accessible colors and drill-down pattern.
</success_criteria>

<output>
After completion, create `.planning/phases/01-ui-ux-refresh/01-ui-ux-refresh-19-SUMMARY.md`
</output>
