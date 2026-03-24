---
phase: 27-ux
plan: "01"
subsystem: labor-calculators
tags: [ux, error-handling, validation, labor-law]
dependency_graph:
  requires: []
  provides: [unfair-dismissal-error-ux, industrial-accident-error-ux, maternity-leave-error-ux]
  affects: [src/app/tools/labor]
tech_stack:
  added: []
  patterns: [error-state-pattern, warning-state-pattern, silent-return-removal]
key_files:
  created: []
  modified:
    - src/app/tools/labor/unfair-dismissal/page.tsx
    - src/app/tools/labor/industrial-accident/page.tsx
    - src/app/tools/labor/maternity-leave/page.tsx
decisions:
  - "error(text-red-500)/warning(text-orange-500) 분리 패턴을 3개 노동 계산기에 동일 적용"
  - "산재보험 간병급여 계산식 주석 금액 53,060/35,370으로 수정 (코드 상수 일치)"
metrics:
  duration: "~10 minutes"
  completed: "2026-03-25"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 3
---

# Phase 27 Plan 01: 노동 3종 계산기 UX·논리 감사 및 수정 Summary

**One-liner:** error/warning state 추가로 unfair-dismissal·industrial-accident·maternity-leave 3개 계산기의 silent return 제거, 필수 필드 * 표시, 간병급여 주석 금액 수정 완료

## What Was Built

3개 노동 계산기(부당해고·산재보험·출산휴가급여)에 16개 요구사항(INPUT, RESULT, FLOW, EDGE) 감사 및 수정 완료.

**공통 패턴 적용:**
- `error`/`warning` state 추가 (`useState<string | null>(null)`)
- `handleCalculate` 시작 시 `setError(null); setWarning(null);`
- 에러: `text-red-500` — 계산 차단, 경고: `text-orange-500` — 계산 허용
- 에러/경고 표시 위치: 계산 버튼 바로 위 `<p>` 태그
- 필수 필드 라벨에 `*` 시각적 표시

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | unfair-dismissal UX 감사 및 수정 | ce37320 | unfair-dismissal/page.tsx |
| 2 | industrial-accident UX 감사 및 수정 | fff5ea5 | industrial-accident/page.tsx |
| 3 | maternity-leave UX 감사 및 수정 | 1cf93e6 | maternity-leave/page.tsx |

## Key Changes Per File

### unfair-dismissal/page.tsx (ce37320)
- 월임금 미입력/0 → `setError('퇴직 전 3개월 평균 월임금을 입력해주세요.')`
- 월임금 > 1억 → `setWarning(...)` (계산 허용)
- 날짜 역전(복직일 < 해고일) → `setError('판정/복직 예상일이 해고 시작일보다 앞설 수 없습니다.')`
- 개월수 0 이하 → `setError('해고 경과 개월수를 입력해주세요.')`
- 보상금 0원 시 안내 문구 (`text-yellow-500`)
- 필수 필드 라벨 `*`: 월임금, 해고 시작일, 판정/복직 예상일, 해고 경과 개월수

### industrial-accident/page.tsx (fff5ea5)
- 탭 전환 함수 `handleTabChange` 추가 → `setError(null); setWarning(null)` 포함
- 휴업급여: 평균임금/요양일수 미입력 에러, 50만원/1095일 초과 경고
- 장해급여: 평균임금 미입력 에러, 연금 8급 이상 코드 가드
- 간병급여: 간병일수 미입력 에러, 1095일 초과 경고
- **Critical fix:** 간병급여 계산식 주석 `41,170/27,450` → `53,060/35,370` (코드 상수와 일치)
- 필수 필드 라벨 `*`: 각 탭별 평균임금, 요양일수, 간병일수

### maternity-leave/page.tsx (1cf93e6)
- 월 통상임금 미입력/0 → `setError('월 통상임금을 입력해주세요.')`
- 월 통상임금 > 1억 → `setWarning(...)` (계산 허용)
- 필수 필드 라벨 `*`: 월 통상임금

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Self-Check: PASSED

- `ce37320` exists: confirmed
- `fff5ea5` exists: confirmed
- `1cf93e6` exists: confirmed
- `unfair-dismissal/page.tsx` grep setError: match confirmed
- `industrial-accident/page.tsx` grep 53,060: match confirmed
- `maternity-leave/page.tsx` grep text-red-500: match confirmed
- TypeScript errors in 3 files: 0
