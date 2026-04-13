---
phase: 01-ui-ux-refresh
plan: 15
type: execute
wave: 1
depends_on: []
files_modified: ["src/app/tools/labor/minimum-wage-check/page.tsx", "src/app/tools/labor/weekly-holiday-pay/page.tsx", "src/app/tools/labor/overtime-pay/page.tsx", "src/app/tools/labor/annual-leave-pay/page.tsx"]
autonomous: true
requirements: [UX-01]

must_haves:
  truths:
    - "User can view data-dense dashboard layout with minimal padding"
    - "Charts and KPI cards are clearly visible above the fold"
    - "UI uses Primary #3B82F6 and Fira Code typography"
  artifacts:
    - path: "src/app/tools/labor/minimum-wage-check/page.tsx"
      provides: "Data-Dense Dashboard UI"
    - path: "src/app/tools/labor/weekly-holiday-pay/page.tsx"
      provides: "Data-Dense Dashboard UI"
    - path: "src/app/tools/labor/overtime-pay/page.tsx"
      provides: "Data-Dense Dashboard UI"
    - path: "src/app/tools/labor/annual-leave-pay/page.tsx"
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
  <name>Task 1: Update minimum-wage-check/page.tsx</name>
  <files>src/app/tools/labor/minimum-wage-check/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/tools/labor/minimum-wage-check/page.tsx" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>
<task type="auto">
  <name>Task 2: Update weekly-holiday-pay/page.tsx</name>
  <files>src/app/tools/labor/weekly-holiday-pay/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/tools/labor/weekly-holiday-pay/page.tsx" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>
<task type="auto">
  <name>Task 3: Update overtime-pay/page.tsx</name>
  <files>src/app/tools/labor/overtime-pay/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/tools/labor/overtime-pay/page.tsx" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>
<task type="auto">
  <name>Task 4: Update annual-leave-pay/page.tsx</name>
  <files>src/app/tools/labor/annual-leave-pay/page.tsx</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\|grid\|#3B82F6" "src/app/tools/labor/annual-leave-pay/page.tsx" || echo "Verification warning"</automated>
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
After completion, create `.planning/phases/01-ui-ux-refresh/01-ui-ux-refresh-15-SUMMARY.md`
</output>
