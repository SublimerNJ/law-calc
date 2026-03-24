---
phase: 21
plan: "02"
subsystem: misc-legal-audit
tags: [legal-audit, public-defender, statute-of-limitations, criminal-law, civil-law]
dependency_graph:
  requires: []
  provides: [MISC-03, MISC-04]
  affects: []
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit, Korean law article verification]
key_files:
  created: []
  modified:
    - src/app/tools/misc/public-defender/page.tsx
    - src/app/tools/misc/statute-of-limitations/page.tsx
decisions:
  - "형사소송법 제33조 제1항 필요적 국선 7가지 사유 모두 UI에 표시"
  - "소멸시효 민법 제163조(3년)와 제164조(1년) 항목 분리"
  - "불법행위 손해배상 10년 제척기간(민법 제766조 제2항) 유의사항으로 추가"
  - "시효 중단 4번 항목을 시효이익 포기(완성 후)에서 민법 제168조 제3호 승인으로 수정"
metrics:
  duration: "3분"
  completed_date: "2026-03-24T04:10:56Z"
  tasks_completed: 2
  files_modified: 2
---

# Phase 21 Plan 02: misc-legal-audit (public-defender, statute-of-limitations) Summary

형사소송법 제33조 전체 구조 반영 및 민법 제163조·164조 분리로 국선변호인·소멸시효 2개 도구 법률 정확성 완성

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | public-defender 법률 감사 (MISC-03) | 6538b6c | src/app/tools/misc/public-defender/page.tsx |
| 2 | statute-of-limitations 법률 감사 (MISC-04) | ca6acdc | src/app/tools/misc/statute-of-limitations/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 국선변호인 필요적 사유 7가지 중 6가지 누락**
- **Found during:** Task 1
- **Issue:** 기존 코드는 형사소송법 제33조 제1항의 7가지 사유 중 제6호(사형·무기·단기 3년 이상)만 설명하고 나머지 6가지(구속, 미성년, 70세 이상, 농아자, 심신장애, 빈곤)가 모두 누락됨
- **Fix:** 7가지 사유를 MANDATORY_GROUNDS 배열로 정의하고 select에 표시. 각 사유별 조문 번호 정확히 명시
- **Files modified:** src/app/tools/misc/public-defender/page.tsx
- **Commit:** 6538b6c

**2. [Rule 1 - Bug] 제33조 제3항 피의자 국선변호인 완전 누락**
- **Found during:** Task 1
- **Issue:** 수사 단계 피의자 국선변호인(형사소송법 제33조 제3항) 항목 없음
- **Fix:** 'investigative' CaseType 추가 및 관련 설명 구현
- **Files modified:** src/app/tools/misc/public-defender/page.tsx
- **Commit:** 6538b6c

**3. [Rule 1 - Bug] 소멸시효 민법 제163조(3년)와 제164조(1년) 혼용 오류**
- **Found during:** Task 2
- **Issue:** CLAIM_TYPES에서 '단기채권 (음식·숙박·의료·교육)'을 민법 제163조~제164조로 묶어 1년 처리. 의료비(제163조 제2호)는 3년인데 1년으로 잘못 분류됨
- **Fix:** 3년 단기(민법 제163조 — 이자·의료비·수업료 등)와 1년 단기(민법 제164조 — 숙박료·음식료 등) 항목 분리
- **Files modified:** src/app/tools/misc/statute-of-limitations/page.tsx
- **Commit:** ca6acdc

**4. [Rule 1 - Bug] 불법행위 10년 제척기간(민법 제766조 제2항) 누락**
- **Found during:** Task 2
- **Issue:** 불법행위 손해배상을 3년(인지일 기산)만 안내하고 불법행위일로부터 10년 제척기간(민법 제766조 제2항) 언급 없음
- **Fix:** 해당 ClaimType의 note 필드에 10년 제척기간 병기
- **Files modified:** src/app/tools/misc/statute-of-limitations/page.tsx
- **Commit:** ca6acdc

**5. [Rule 1 - Bug] 시효 중단 4번 항목 오류 (시효이익 포기 혼동)**
- **Found during:** Task 2
- **Issue:** "시효 완성 후에도 채무자가 인정하면 유효"를 시효 중단 사유로 표시. 이는 민법 제184조의 시효이익 포기(완성 후)로 중단이 아닌 다른 법적 효과
- **Fix:** 4번을 민법 제168조 제3호 승인(일부 변제·이자 지급·담보 제공 포함)으로 수정하고, 민법 제184조 내용은 별도 설명으로 이동
- **Files modified:** src/app/tools/misc/statute-of-limitations/page.tsx
- **Commit:** ca6acdc

## Known Stubs

None.

## Self-Check: PASSED
