import os
import json

base_dir = '/Volumes/NJ SSD 4T/Coding/sonolbot_gemini/tasks/chat_7574658426/ui_ux_plans'
os.makedirs(base_dir, exist_ok=True)

groups = [
    {
        "id": "01",
        "name": "base-pages-1",
        "files": [
            "src/app/page.tsx",
            "src/app/about/page.tsx",
            "src/app/privacy/page.tsx"
        ]
    },
    {
        "id": "02",
        "name": "base-pages-2",
        "files": [
            "src/app/terms/page.tsx",
            "src/app/editorial-policy/page.tsx",
            "src/app/tools/[category]/[tool]/page.tsx"
        ]
    },
    {
        "id": "03",
        "name": "traffic-tools",
        "files": [
            "src/app/tools/traffic/bail/page.tsx",
            "src/app/tools/traffic/drunk-driving/page.tsx",
            "src/app/tools/traffic/accident-settlement/page.tsx",
            "src/app/tools/traffic/fine-penalty/page.tsx"
        ]
    },
    {
        "id": "04",
        "name": "misc-tools",
        "files": [
            "src/app/tools/misc/certified-letter/page.tsx",
            "src/app/tools/misc/public-defender/page.tsx",
            "src/app/tools/misc/legal-aid/page.tsx",
            "src/app/tools/misc/statute-of-limitations/page.tsx"
        ]
    },
    {
        "id": "05",
        "name": "damages-tools",
        "files": [
            "src/app/tools/damages/damages-general/page.tsx",
            "src/app/tools/damages/defamation/page.tsx",
            "src/app/tools/damages/medical-malpractice/page.tsx",
            "src/app/tools/damages/lost-income/page.tsx"
        ]
    },
    {
        "id": "06",
        "name": "court-tools",
        "files": [
            "src/app/tools/court/civil-mediation/page.tsx",
            "src/app/tools/court/family-court/page.tsx",
            "src/app/tools/court/lawsuit-cost/page.tsx",
            "src/app/tools/court/attorney-fee/page.tsx",
            "src/app/tools/court/payment-order/page.tsx"
        ]
    },
    {
        "id": "07",
        "name": "realty-tools-1",
        "files": [
            "src/app/tools/realty/dti/page.tsx",
            "src/app/tools/realty/ltv/page.tsx",
            "src/app/tools/realty/subscription-score/page.tsx",
            "src/app/tools/realty/dsr/page.tsx"
        ]
    },
    {
        "id": "08",
        "name": "realty-tools-2",
        "files": [
            "src/app/tools/realty/deposit-return/page.tsx",
            "src/app/tools/realty/brokerage-fee/page.tsx",
            "src/app/tools/realty/rent-conversion/page.tsx"
        ]
    },
    {
        "id": "09",
        "name": "family-tools-1",
        "files": [
            "src/app/tools/family/property-division/page.tsx",
            "src/app/tools/family/inheritance-order/page.tsx",
            "src/app/tools/family/forced-heirship/page.tsx"
        ]
    },
    {
        "id": "10",
        "name": "family-tools-2",
        "files": [
            "src/app/tools/family/alimony/page.tsx",
            "src/app/tools/family/child-support/page.tsx",
            "src/app/tools/family/inheritance-tax/page.tsx"
        ]
    },
    {
        "id": "11",
        "name": "tax-tools-1",
        "files": [
            "src/app/tools/tax/comprehensive-property-tax/page.tsx",
            "src/app/tools/tax/registration-tax/page.tsx",
            "src/app/tools/tax/four-insurances/page.tsx",
            "src/app/tools/tax/year-end-tax/page.tsx"
        ]
    },
    {
        "id": "12",
        "name": "tax-tools-2",
        "files": [
            "src/app/tools/tax/capital-gains-tax/page.tsx",
            "src/app/tools/tax/rent-tax-credit/page.tsx",
            "src/app/tools/tax/vat/page.tsx"
        ]
    },
    {
        "id": "13",
        "name": "tax-tools-3",
        "files": [
            "src/app/tools/tax/securities-tax/page.tsx",
            "src/app/tools/tax/acquisition-tax/page.tsx",
            "src/app/tools/tax/comprehensive-income-tax/page.tsx"
        ]
    },
    {
        "id": "14",
        "name": "debt-tools",
        "files": [
            "src/app/tools/debt/loan-interest/page.tsx",
            "src/app/tools/debt/unjust-enrichment/page.tsx",
            "src/app/tools/debt/late-payment/page.tsx"
        ]
    },
    {
        "id": "15",
        "name": "labor-tools-1",
        "files": [
            "src/app/tools/labor/minimum-wage-check/page.tsx",
            "src/app/tools/labor/weekly-holiday-pay/page.tsx",
            "src/app/tools/labor/overtime-pay/page.tsx",
            "src/app/tools/labor/annual-leave-pay/page.tsx"
        ]
    },
    {
        "id": "16",
        "name": "labor-tools-2",
        "files": [
            "src/app/tools/labor/unemployment-benefit/page.tsx",
            "src/app/tools/labor/dismissal-notice/page.tsx",
            "src/app/tools/labor/parental-leave/page.tsx",
            "src/app/tools/labor/severance-pay/page.tsx"
        ]
    },
    {
        "id": "17",
        "name": "labor-tools-3",
        "files": [
            "src/app/tools/labor/industrial-accident/page.tsx",
            "src/app/tools/labor/maternity-leave/page.tsx",
            "src/app/tools/labor/unfair-dismissal/page.tsx",
            "src/app/tools/labor/shutdown-allowance/page.tsx"
        ]
    },
    {
        "id": "18",
        "name": "guides-1",
        "files": [
            "src/app/guides/understanding-severance-pay/page.tsx",
            "src/app/guides/how-to-calculate-attorney-fee/page.tsx",
            "src/app/guides/minimum-wage-penalty/page.tsx",
            "src/app/guides/industrial-accident-compensation/page.tsx"
        ]
    },
    {
        "id": "19",
        "name": "guides-2",
        "files": [
            "src/app/guides/comprehensive-income-tax-freelancer/page.tsx",
            "src/app/guides/civil-mediation-vs-lawsuit/page.tsx",
            "src/app/guides/unfair-dismissal-relief/page.tsx"
        ]
    },
    {
        "id": "20",
        "name": "guides-3",
        "files": [
            "src/app/guides/capital-gains-tax-exemption/page.tsx",
            "src/app/guides/defamation-sns/page.tsx",
            "src/app/guides/deposit-return-dispute/page.tsx",
            "src/app/guides/page.tsx"
        ]
    }
]

template = """---
phase: 01-ui-ux-refresh
plan: {id}
type: execute
wave: 1
depends_on: []
files_modified: {files_list}
autonomous: true
requirements: [UX-01]

must_haves:
  truths:
    - "User can view data-dense dashboard layout with minimal padding"
    - "Charts and KPI cards are clearly visible above the fold"
    - "UI uses Primary #3B82F6 and Fira Code typography"
  artifacts:
{artifacts_yaml}
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
{tasks_xml}
</tasks>

<verification>
Check that there are no emojis used as icons, all interactive elements have cursor-pointer, hover transitions are 150-300ms, and light mode text contrast is at least 4.5:1.
</verification>

<success_criteria>
Pages reflect Data-Dense Dashboard structure with accessible colors and drill-down pattern.
</success_criteria>

<output>
After completion, create `.planning/phases/01-ui-ux-refresh/01-ui-ux-refresh-{id}-SUMMARY.md`
</output>
"""

for g in groups:
    files_list = json.dumps(g['files'])
    
    artifacts_yaml = ""
    for f in g['files']:
        artifacts_yaml += f"    - path: \"{f}\"\n      provides: \"Data-Dense Dashboard UI\"\n"
        
    tasks_xml = ""
    for i, f in enumerate(g['files'], 1):
        tasks_xml += f"""<task type="auto">
  <name>Task {i}: Update {os.path.basename(os.path.dirname(f))}/{os.path.basename(f)}</name>
  <files>{f}</files>
  <action>
Refactor UI to match Data-Dense Dashboard style.
- Use Fira Code / Fira Sans for typography.
- Implement minimal padding, grid layouts, and KPI cards above the fold.
- Ensure colors use Primary #3B82F6, CTA #F97316, and accessible text #1E293B.
- Replace emojis with SVG icons (Heroicons/Lucide).
- Add cursor-pointer and hover transitions (150-300ms) on all interactive elements.
  </action>
  <verify>
    <automated>grep -q "Fira Code\\|grid\\|#3B82F6" "{f}" || echo "Verification warning"</automated>
  </verify>
  <done>Page reflects data-dense dashboard style and passes contrast checks</done>
</task>
"""
    
    plan_content = template.format(
        id=g['id'],
        files_list=files_list,
        artifacts_yaml=artifacts_yaml,
        tasks_xml=tasks_xml
    )
    
    file_path = os.path.join(base_dir, f"01-ui-ux-refresh-{g['id']}-PLAN.md")
    with open(file_path, "w") as f_out:
        f_out.write(plan_content)

print(f"Generated {len(groups)} plan files in {base_dir}")
