---
phase: 16-tax-legal-audit
plan: "03"
subsystem: tax-calculators
tags: [legal-audit, vat, securities-tax, rent-tax-credit, tax-law]
dependency_graph:
  requires: []
  provides: [TAX-06, TAX-07, TAX-10]
  affects: [tax/vat, tax/securities-tax, tax/rent-tax-credit]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit, law.go.kr reference]
key_files:
  created: []
  modified:
    - src/app/tools/tax/securities-tax/page.tsx
    - src/app/tools/tax/rent-tax-credit/page.tsx
decisions:
  - "증권거래세 2025년 기준: 코스피 증권거래세 0%, 농어촌특별세 0.15% (증권거래세법 제8조, 농어촌특별세법 제5조 제1항 제6호)"
  - "월세 세액공제율: 총급여 5,500만원 이하 17%, 초과~8,000만원 이하 15% (조세특례제한법 제95조의2)"
  - "법적 근거 조문: 월세 세액공제는 소득세법이 아닌 조세특례제한법 제95조의2"
metrics:
  duration: "5 minutes"
  completed_date: "2026-03-24T03:19:17Z"
  tasks_completed: 3
  files_modified: 2
---

# Phase 16 Plan 03: Tax Legal Audit (VAT, Securities Tax, Rent Tax Credit) Summary

**One-liner:** 증권거래세 2025년 기준 세율 전면 수정 및 월세 세액공제율 조세특례제한법 기준으로 정정

## What Was Built

/Launcelot-Lawyer 스킬로 3개 세금 계산기를 부가가치세법·증권거래세법·조세특례제한법 원문과 대조 검증하고 발견된 오류를 수정했다.

### Task 1: 부가가치세 계산기 (TAX-06)

법령 원문 대조 결과 오류 없음. 확인 사항:
- 부가가치세법 제30조 세율 10%: 정확 (코드 0.1 사용)
- 부가가치세법 제38조 매입세액 공제: 법적 근거 정확히 표시
- 납부세액 계산식 (매출세액 - 매입세액): 정확
- 공급대가 역산 공식 (총액 / 1.1): 정확

### Task 2: 증권거래세 계산기 (TAX-07)

2025년 증권거래세법 제8조 기준과 대조 시 세율 전반 오류 발견 및 수정:

| 시장 | 수정 전 | 수정 후 (2025년 기준) |
|------|---------|---------------------|
| 코스피 증권거래세 | 0.03% | 0% |
| 코스피 농어촌특별세 | 0.03% | 0.15% |
| 코스닥 | 0.18% | 0.15% |
| 코넥스 | 0.18% | 0.10% |
| K-OTC | 0.18% | 0.15% |
| 비상장 | 0.35% | 0.35% (정확) |

법적 근거 조문도 농어촌특별세법 제5조 제1항 제6호 추가.

### Task 3: 월세 세액공제 계산기 (TAX-10)

조세특례제한법 제95조의2와 대조 시 2건 오류 발견 및 수정:

1. **공제율 오류**: 5,500만원 이하 20%→17%, 5,500만원 초과 17%→15%
2. **법적 근거 조문 오류**: 소득세법 제95조의2→조세특례제한법 제95조의2

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 증권거래세 세율 전반 2025년 기준 불일치**
- Found during: Task 2
- Issue: 코스피 증권거래세 0.03% (실제 0%), 코스닥/코넥스 0.18% (실제 0.15%/0.10%), 농어촌특별세 0.03% (실제 0.15%)
- Fix: MARKETS 배열 전체 세율 2025년 증권거래세법 제8조 기준으로 수정, 코스피별 agriRate 필드 추가
- Files modified: src/app/tools/tax/securities-tax/page.tsx
- Commit: 568c46b

**2. [Rule 1 - Bug] 월세 세액공제율 조세특례제한법과 불일치**
- Found during: Task 3
- Issue: 17%/15% 대신 20%/17% 적용 — 조세특례제한법 제95조의2 위반
- Fix: 공제율 수정 및 법적 근거 조문 소득세법→조세특례제한법으로 수정
- Files modified: src/app/tools/tax/rent-tax-credit/page.tsx
- Commit: 79877d6

## Self-Check: PASSED

- src/app/tools/tax/securities-tax/page.tsx: FOUND
- src/app/tools/tax/rent-tax-credit/page.tsx: FOUND
- Commit 568c46b: FOUND
- Commit 79877d6: FOUND
- TypeScript: 수정 파일 타입 오류 없음 (기존 capital-gains-tax 오류는 이 플랜 범위 외)
