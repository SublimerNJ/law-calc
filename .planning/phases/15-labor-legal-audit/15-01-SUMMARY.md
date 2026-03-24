---
phase: 15-labor-legal-audit
plan: "01"
subsystem: labor-calculators
tags: [legal-audit, labor-law, severance-pay, dismissal-notice, shutdown-allowance]
dependency_graph:
  requires: []
  provides: [LABOR-01, LABOR-02, LABOR-12]
  affects: [labor calculators]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit, law.go.kr verification]
key_files:
  created: []
  modified:
    - src/app/tools/labor/severance-pay/page.tsx
    - src/app/tools/labor/dismissal-notice/page.tsx
decisions:
  - "휴업수당(shutdown-allowance)은 오류 없음 - 근로기준법 제46조 공식(max(평균임금×70%, 통상임금)) 정확히 구현"
  - "해고예고수당 dailyWage = 월통상임금/30 방식은 월급제 실무 관행상 유지"
metrics:
  duration: "6m"
  completed: "2026-03-24T03:07:00Z"
  tasks_completed: 3
  files_modified: 2
---

# Phase 15 Plan 01: 노동 계산기 법률 감사 (퇴직금·해고예고수당·휴업수당) Summary

**One-liner:** 근로자퇴직급여보장법 제8조·근로기준법 제26조·제35조·제46조 기준으로 3개 노동 계산기 법률 감사 완료 - 법령 명칭 오류 및 해고예고 제외 대상 누락 수정

## Tasks Completed

| Task | Description | Commit | Status |
|------|-------------|--------|--------|
| 1 | severance-pay 퇴직금 계산기 법률 감사 | 0eb12c7 | Fixed |
| 2 | dismissal-notice 해고예고수당 계산기 법률 감사 | c00094b | Fixed |
| 3 | shutdown-allowance 휴업수당 계산기 법률 감사 | (no changes) | Verified |

## Legal Audit Results

### Task 1: severance-pay (퇴직금)

**법령 기준:** 근로자퇴직급여보장법 제8조, 근로기준법 제2조 제1항 제6호

**검증 결과:**
- 퇴직금 산정 공식: `1일 평균임금 × 30 × (총 근속일수 / 365)` - 법령 일치
- 평균임금 산정: `3개월 총임금 / 3개월 역일수` - 법령 일치
- 1년 이상 조건 (`totalDays >= 365`) - 정확
- Math.floor 적용 - 버림 처리 정확

**수정 사항:**
- 법령 명칭 띄어쓰기 오류: `근로자퇴직급여 보장법` → `근로자퇴직급여보장법`

### Task 2: dismissal-notice (해고예고수당)

**법령 기준:** 근로기준법 제26조, 제35조

**검증 결과:**
- 해고예고수당 산정: `(30 - 예고일수) × 1일 통상임금` - 법령 일치
- Math.floor 적용 - 버림 처리 정확

**수정 사항:**
- 해고예고 적용 제외 대상 확장 (근로기준법 제35조 전체 반영)
  - 기존: "계속근로기간 3개월 미만" 만 언급
  - 수정: 7가지 제외 대상 모두 추가
    1. 일용근로자 3개월 미만
    2. 2개월 이내 기간제
    3. 월급 근로자 6개월 미만
    4. 계절적 업무 6개월 이내
    5. 수습 중 근로자 (3개월 이내)
    6. 천재·사변 등 부득이한 사유
    7. 근로자 고의 손해

### Task 3: shutdown-allowance (휴업수당)

**법령 기준:** 근로기준법 제46조

**검증 결과:**
- 휴업수당 공식: `max(평균임금×70%, 통상임금) × 휴업일수` - 법령 일치
- 노동위원회 승인 시 70% 미만 지급 가능 특례 - 반영됨
- 법령 조문 "근로기준법 제46조" - 정확

**수정 사항:** 없음 (법령과 완전 일치)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Functionality] 해고예고 제외 대상 누락**
- **Found during:** Task 2
- **Issue:** 근로기준법 제35조의 해고예고 적용 제외 대상 7가지 중 "계속근로기간 3개월 미만" 1가지만 안내됨
- **Fix:** 제35조 전체 7가지 제외 대상 모두 UI에 추가
- **Files modified:** src/app/tools/labor/dismissal-notice/page.tsx
- **Commit:** c00094b

## Self-Check: PASSED

- src/app/tools/labor/severance-pay/page.tsx: EXISTS
- src/app/tools/labor/dismissal-notice/page.tsx: EXISTS
- Commit 0eb12c7: FOUND
- Commit c00094b: FOUND
- TypeScript check: PASSED (no errors)
