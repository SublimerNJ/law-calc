---
phase: 16-tax-legal-audit
plan: "02"
subsystem: tax-calculators
tags: [legal-audit, tax, acquisition-tax, comprehensive-property-tax, registration-tax]
dependency_graph:
  requires: []
  provides: [TAX-03, TAX-04, TAX-05]
  affects: [tax calculators]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit]
key_files:
  created: []
  modified:
    - src/app/tools/tax/acquisition-tax/page.tsx
    - src/app/tools/tax/comprehensive-property-tax/page.tsx
    - src/app/tools/tax/registration-tax/page.tsx
decisions:
  - "등록면허세 소유권이전: 유상 2.0%(제28조), 무상 1.5% 별도 구분 필요"
  - "종합부동산세 조문: 제8조(과세표준), 제9조(세율), 제10조(세액공제) 명확화"
metrics:
  duration: "15m"
  completed_date: "2026-03-24"
  tasks_completed: 3
  files_modified: 3
---

# Phase 16 Plan 02: 취득세·종합부동산세·등록면허세 법률 감사 Summary

취득세 구간세율 계산식 오류, 종합부동산세 조문 번호 오류, 등록면허세 유상이전 세율 오류 3건 수정 완료.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | 취득세 계산기 법률 감사 (TAX-03) | d119ff0 | acquisition-tax/page.tsx |
| 2 | 종합부동산세 계산기 법률 감사 (TAX-04) | e9bb8cf | comprehensive-property-tax/page.tsx |
| 3 | 등록면허세 계산기 법률 감사 (TAX-05) | 35ee77a | registration-tax/page.tsx |

## Legal Audit Results

### Task 1: 취득세 (TAX-03) — 지방세법 제11조

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| 1주택 세율 (6억/9억 구간) | 통과 | 보간법 적용 정확 |
| 2주택 조정지역 8% | 통과 | 지방세법 제13조의2 |
| 3주택 조정지역 12%, 비조정 8% | 통과 | |
| 농어촌특별세 (85m² 기준) | 통과 | 농어촌특별세법 제5조 |
| 지방교육세 20% | 통과 | |
| **2주택 비조정 6~9억 구간 공식** | **오류 수정** | 잘못된 산술식 → 보간법으로 수정 |

### Task 2: 종합부동산세 (TAX-04) — 종합부동산세법

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| 기본공제 (1세대1주택 12억, 일반 9억) | 통과 | 제8조 제1항 |
| 공정시장가액비율 60% | 통과 | 시행령 제2조의4 |
| 세율 구간 (0.5%~2.7%) | 통과 | 제9조 제1항 |
| 고령자공제 (60세~, 20/30/40%) | 통과 | 제9조의2 |
| **조문 번호 표기** | **오류 수정** | 제8조(세율)→제8조(과세표준), 제9조(세액공제)→제9조(세율) 수정 |

### Task 3: 등록면허세 (TAX-05) — 지방세법 제28조·제34조

| 검증 항목 | 결과 | 비고 |
|-----------|------|------|
| 소유권 보존 0.8% | 통과 | 지방세법 제28조 제1항 제1호 가목 |
| 저당권 설정 0.2% | 통과 | 제28조 제1항 제2호 |
| 면허세 1~5종 정액 | 통과 | 제34조 제1항 |
| 지방교육세 20% | 통과 | |
| **소유권 이전 세율** | **오류 수정** | 1.5%(무상)→2.0%(유상 20/1000) 수정 |
| **법적 근거 조문 표기** | **오류 수정** | 제28조, 제34조 명시 |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 취득세 2주택 비조정 6~9억 구간 계산식 오류**
- Found during: Task 1
- Issue: `((price / 100_000_000) - 3) * (1 / 3) / 100` — 수식이 지방세법 제11조의 보간법과 불일치
- Fix: `0.01 + (price - 600_000_000) / 300_000_000 * 0.02` (1주택과 동일한 보간법)
- Files modified: src/app/tools/tax/acquisition-tax/page.tsx
- Commit: d119ff0

**2. [Rule 1 - Bug] 종합부동산세 법령 조문 번호 오류**
- Found during: Task 2
- Issue: "제8조(세율), 제9조(세액공제)" — 제8조는 과세표준·공제, 제9조는 세율
- Fix: "제8조(과세표준·공제), 제9조(세율), 제10조(세액공제)"로 수정
- Files modified: src/app/tools/tax/comprehensive-property-tax/page.tsx
- Commit: e9bb8cf

**3. [Rule 1 - Bug] 등록면허세 소유권 이전 세율 오류**
- Found during: Task 3
- Issue: 1.5%(무상이전 세율)이 적용됨 — 유상이전은 20/1000(2.0%)
- Fix: 0.015 → 0.02, 레이블 "부동산 소유권 이전 (유상)" 명시
- Files modified: src/app/tools/tax/registration-tax/page.tsx
- Commit: 35ee77a

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/tax/acquisition-tax/page.tsx: FOUND
- src/app/tools/tax/comprehensive-property-tax/page.tsx: FOUND
- src/app/tools/tax/registration-tax/page.tsx: FOUND
- Commit d119ff0: FOUND
- Commit e9bb8cf: FOUND
- Commit 35ee77a: FOUND
- TypeScript: 0 errors in audited files
