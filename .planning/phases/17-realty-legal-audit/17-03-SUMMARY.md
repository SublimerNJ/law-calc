---
phase: 17
plan: "03"
subsystem: realty-calculators
tags: [legal-audit, ltv, dti, banking-supervision-regulations]
dependency_graph:
  requires: []
  provides: [ltv-legal-audit, dti-legal-audit]
  affects: [realty-calculators]
tech_stack:
  added: []
  patterns: [launcelot-lawyer-verification, banking-regulation-compliance]
key_files:
  created: []
  modified:
    - src/app/tools/realty/ltv/page.tsx
    - src/app/tools/realty/dti/page.tsx
decisions:
  - "LTV 조정대상지역 비율: 50% → 70% (2022.8 금융위원회 완화 기준 반영)"
  - "LTV 지역 구분 세분화: 투기지역/투기과열지구를 주택보유 여부 및 생애최초 여부로 분리"
  - "DTI 법적 근거: 은행업감독규정 제26조의2(총부채상환비율) 정확한 조문 명시"
  - "LTV 법적 근거: 은행업감독규정 제26조(담보인정비율) 정확한 조문 명시"
metrics:
  duration: "15분"
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 17 Plan 03: LTV·DTI 계산기 법률 감사 Summary

은행업감독규정 제26조(LTV), 제26조의2(DTI) 기반 2개 금융규제 계산기를 /Launcelot-Lawyer 스킬로 법령 원문 대조 검증하여 오류 수정 완료.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | LTV 계산기 법률 감사 (REALTY-06) | 64cee24 | src/app/tools/realty/ltv/page.tsx |
| 2 | DTI 계산기 법률 감사 (REALTY-07) | 7e444f6 | src/app/tools/realty/dti/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] LTV 조정대상지역 비율 오류 수정**
- **Found during:** Task 1
- **Issue:** 조정대상지역 LTV가 50%로 설정되어 있었으나, 금융위원회 2022년 8월 규제 완화 이후 현행 기준은 70%임
- **Fix:** 조정대상지역 LTV 50% → 70%로 수정
- **Files modified:** src/app/tools/realty/ltv/page.tsx
- **Commit:** 64cee24

**2. [Rule 1 - Bug] LTV 지역 구분 단순화 오류**
- **Found during:** Task 1
- **Issue:** 투기지역과 투기과열지구를 하나로 합쳐 40%로 설정했으나, 현행 기준상 투기지역 40%(유주택자)/50%(무주택자), 투기과열지구 50%(유주택자)/60%(무주택자)/80%(생애최초)로 구분됨
- **Fix:** 주택보유 여부 및 생애최초 여부에 따라 세분화된 7개 옵션으로 확장
- **Files modified:** src/app/tools/realty/ltv/page.tsx
- **Commit:** 64cee24

**3. [Rule 2 - Missing] LTV 법적 근거 불명확**
- **Found during:** Task 1
- **Issue:** "금융위원회 LTV 규제 (2022.8 이후 기준)"은 정확한 법령 근거가 아님
- **Fix:** 은행업감독규정 제26조(담보인정비율) 조문 명시, 생애최초 우대 및 서민·실수요자 특례 설명 추가
- **Files modified:** src/app/tools/realty/ltv/page.tsx
- **Commit:** 64cee24

**4. [Rule 2 - Missing] DTI 법적 근거 불명확**
- **Found during:** Task 2
- **Issue:** "금융위원회 DTI 규제 (금융감독원 여신심사 가이드라인)"은 정확한 법령 근거가 아님
- **Fix:** 은행업감독규정 제26조의2(총부채상환비율) 조문 명시
- **Files modified:** src/app/tools/realty/dti/page.tsx
- **Commit:** 7e444f6

## Verification

- LTV 계산기: TypeScript 타입 체크 통과 (`npx tsc --noEmit` 오류 없음)
- DTI 계산기: TypeScript 타입 체크 통과
- 은행업감독규정 제26조 (LTV) 법령 원문 대조 완료
- 은행업감독규정 제26조의2 (DTI) 법령 원문 대조 완료
- DTI 공식 `(주담대 연간 원리금 + 기타대출 연간 이자) / 연소득 × 100` 정확함

## Known Stubs

없음 — 모든 계산 로직이 현행 법령과 일치하도록 수정 완료.

## Self-Check: PASSED

- src/app/tools/realty/ltv/page.tsx — 존재 확인
- src/app/tools/realty/dti/page.tsx — 존재 확인
- 64cee24 — git log에서 확인됨
- 7e444f6 — git log에서 확인됨
