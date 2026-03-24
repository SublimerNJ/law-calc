---
phase: 20-damages-legal-audit
plan: "01"
subsystem: damages-calculators
tags: [legal-audit, damages, defamation, civil-law]
dependency_graph:
  requires: []
  provides: [damages-general-audited, defamation-audited]
  affects: []
tech_stack:
  added: []
  patterns: [launcelot-lawyer-audit]
key_files:
  created: []
  modified:
    - src/app/tools/damages/damages-general/page.tsx
    - src/app/tools/damages/defamation/page.tsx
decisions:
  - "민법 제763조는 준용규정이며 과실상계 실질 근거는 제396조임을 명시"
  - "소멸시효: 안 날부터 3년(제766조 제1항) + 불법행위일부터 10년(제766조 제2항) 모두 표기"
  - "defamation: 민법 제751조(위자료 직접 근거) 및 형법 제309조(출판물 명예훼손) 법적 근거 추가"
metrics:
  duration: "15min"
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 20 Plan 01: Damages Legal Audit Summary

민법 불법행위 손해배상(제750조~제766조) 및 명예훼손 위자료 2개 계산기의 법적 근거 조문을 법령 원문 대조 후 수정 완료.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | damages-general 법률 감사 | 18798d6 | src/app/tools/damages/damages-general/page.tsx |
| 2 | defamation 법률 감사 | d03bf23 | src/app/tools/damages/defamation/page.tsx |

## Fixes Applied

### damages-general (일반 손해배상)

**[Rule 1 - Bug] 민법 제763조 조문 오류 수정**
- 법적 근거에 `제763조(과실상계)`로 표기되어 있었으나, 제763조는 "준용규정" 조문이고 실제 과실상계 조문은 제396조임
- 수정: `제750조(불법행위의 내용), 제751조(재산 이외의 손해배상), 제393조(손해배상의 범위) 및 제396조(과실상계) 준용(제763조)` 명시
- Commit: 18798d6

**[Rule 2 - Missing] 소멸시효 제766조 제2항 추가**
- "안 날부터 3년"만 표기되어 민법 제766조 제2항 "불법행위일부터 10년"이 누락됨
- 수정: 양쪽 기간 모두 명시
- Commit: 18798d6

### defamation (명예훼손 위자료)

**[Rule 2 - Missing] 민법 제751조 및 형법 제309조 추가**
- 위자료 직접 근거인 민법 제751조(재산 이외의 손해배상)가 법적 근거에 누락됨
- 방송 매체 가중 처벌 근거인 형법 제309조(출판물 등에 의한 명예훼손)가 누락됨
- Commit: d03bf23

## Verification

- damages-general: 민법 제750조~제766조 원문 대조 완료, 오류 2건 수정
- defamation: 형법 제307조·제309조·제311조, 정보통신망법 제70조, 민법 제750조·제751조 대조 완료, 누락 조문 2건 추가
- TypeScript 빌드: 통과 (npx tsc --noEmit)

## Known Stubs

None.

## Self-Check: PASSED
- src/app/tools/damages/damages-general/page.tsx: FOUND
- src/app/tools/damages/defamation/page.tsx: FOUND
- Commit 18798d6: FOUND
- Commit d03bf23: FOUND
