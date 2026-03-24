---
phase: 15-labor-legal-audit
plan: "04"
subsystem: labor-calculators
tags: [legal-audit, employment-insurance, maternity-leave, parental-leave, unemployment-benefit]
dependency_graph:
  requires: []
  provides: [LABOR-09, LABOR-10, LABOR-11]
  affects: [maternity-leave, parental-leave, unemployment-benefit]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit]
key_files:
  created: []
  modified:
    - src/app/tools/labor/maternity-leave/page.tsx
    - src/app/tools/labor/parental-leave/page.tsx
    - src/app/tools/labor/unemployment-benefit/page.tsx
decisions:
  - "출산휴가급여 상한액 2,035,640원은 오류 - 현행 고시 기준 월 2,100,000원 적용"
  - "육아휴직급여 2024.1.1 개정 반영: 전 기간 80% 단일 요율, 사후지급금 제도 폐지"
  - "실업급여 하한액 최저임금 2026년 기준 10,320원 적용 (10,030원 오류 수정)"
metrics:
  duration: "8 minutes"
  completed: "2026-03-24"
  tasks: 3
  files: 3
---

# Phase 15 Plan 04: 고용보험 급여 계산기 법률 감사 Summary

출산휴가급여(상한액 오류), 육아휴직급여(2024 개정 미반영), 실업급여(최저임금 오류) 3건 수정 완료

## What Was Done

### Task 1: 출산휴가급여 계산기 (LABOR-09)

- 급여 상한액 수정: 2,035,640원 → 2,100,000원 (고용보험법 시행령 제101조 고시 기준 월 210만원)
- 대기업 다태아 사업주 부담일수 설명 보완: 단태아 60일 / 다태아 75일 명시
- 법적 근거: 근로기준법 제74조(출산전후휴가), 고용보험법 제76조

**Commit:** 4b6fdd3

### Task 2: 육아휴직급여 계산기 (LABOR-10)

- 급여율 수정: 4개월 이후 50% → 80% (2024.1.1 고용보험법 시행령 제95조 개정)
- 상한액 수정: 1~3개월 200만원→150만원 / 4개월~ 120만원→150만원 (전 기간 150만원 상한)
- 사후지급금(25%) 제도 폐지 반영 (2024.1.1 시행): 전액 즉시 지급으로 수정
- 법령 조문 수정: 제70조 → 제73조 (시행령 제95조)
- 한부모/장애아동 첫 3개월 300만원 상한 유지 (시행령 제95조제3항)

Note: 이 파일의 변경은 병렬 실행된 15-03 에이전트(commit 96a0005)와 동일하게 반영됨

### Task 3: 실업급여 계산기 (LABOR-11)

- 구직급여 하한액 최저임금 수정: 10,030원 → 10,320원/시간 (2026년 고용노동부 고시)
- 법령 조문 추가: 제45조(기초일액), 제46조(구직급여일액), 제50조(소정급여일수) 명시
- 소정급여일수 표 (120~270일), 상한액 66,000원/일 이상 없음 확인

**Commit:** 92eb399

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 출산휴가급여 상한액 오류**
- Found during: Task 1
- Issue: MATERNITY_UPPER = 2,035,640원으로 설정되어 있었으나, 현행 고시 기준은 월 210만원
- Fix: 2,100,000원으로 수정
- Files modified: src/app/tools/labor/maternity-leave/page.tsx
- Commit: 4b6fdd3

**2. [Rule 1 - Bug] 육아휴직급여 2024 개정법 미반영**
- Found during: Task 2
- Issue: 구 기준(1~3개월 80%/200만원, 4개월~ 50%/120만원, 사후지급 25%)이 2024.1.1 개정 전 기준
- Fix: 전 기간 80%/150만원 단일 요율, 사후지급금 제도 폐지 반영
- Files modified: src/app/tools/labor/parental-leave/page.tsx
- Commit: 96a0005 (병렬 에이전트 15-03 처리)

**3. [Rule 1 - Bug] 실업급여 하한액 최저임금 구버전**
- Found during: Task 3
- Issue: 2025년 최저임금(10,030원) 기준 사용 - 2026년 기준(10,320원) 미반영
- Fix: 10,320원으로 수정
- Files modified: src/app/tools/labor/unemployment-benefit/page.tsx
- Commit: 92eb399

## Known Stubs

None.

## Self-Check: PASSED

- src/app/tools/labor/maternity-leave/page.tsx: FOUND
- src/app/tools/labor/parental-leave/page.tsx: FOUND
- src/app/tools/labor/unemployment-benefit/page.tsx: FOUND
- Commit 4b6fdd3: FOUND
- Commit 92eb399: FOUND
