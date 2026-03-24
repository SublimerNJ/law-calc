---
phase: 21-misc-legal-audit
plan: "01"
subsystem: misc-tools
tags: [legal-audit, certified-letter, legal-aid, postal-law, legal-aid-law]
dependency_graph:
  requires: []
  provides: [MISC-01, MISC-02]
  affects: [src/app/tools/misc/certified-letter/page.tsx, src/app/tools/misc/legal-aid/page.tsx]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer 법령 원문 대조 검증]
key_files:
  created: []
  modified:
    - src/app/tools/misc/certified-letter/page.tsx
    - src/app/tools/misc/legal-aid/page.tsx
decisions:
  - 내용증명 법적 효력: 민법 제111조(도달주의) + 제174조(최고 후 6개월 내 재판상 청구) 명시
  - 법률구조 법적 근거: 제7조(방법 조항) 오류 → 제5조(대상자) + 시행령 제4조(자력기준) 정정
  - 기준중위소득 125%: 보건복지부 고시 기준으로 수치 보정
metrics:
  duration: "15 minutes"
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 21 Plan 01: Misc Legal Audit Summary

내용증명(certified-letter) 및 법률구조(legal-aid) 2개 도구의 /Launcelot-Lawyer 법령 원문 대조 감사 및 오류 수정 — 우편법 시행규칙·민법·법률구조법 조문 정확화

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | certified-letter 법률 감사 | b9680ce | src/app/tools/misc/certified-letter/page.tsx |
| 2 | legal-aid 법률 감사 | 0019f55 | src/app/tools/misc/legal-aid/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 내용증명 미리보기 텍스트 불가시 버그 수정**
- **Found during:** Task 1
- **Issue:** 미리보기 박스가 `bg-white text-white`로 설정되어 흰색 배경에 흰색 텍스트 → 내용이 전혀 보이지 않음
- **Fix:** `text-white` → `text-slate-900` 및 배경 스타일 개선
- **Files modified:** src/app/tools/misc/certified-letter/page.tsx
- **Commit:** b9680ce

**2. [Rule 2 - Missing Critical] 내용증명 법적 효력 안내 누락**
- **Found during:** Task 1
- **Issue:** 민법 제111조(도달주의), 민법 제174조(최고와 소멸시효 — 6개월 내 재판상 청구) 설명 전혀 없음
- **Fix:** 법적 효력 안내 섹션 추가 (도달주의, 시효중단 6개월 요건 명시)
- **Files modified:** src/app/tools/misc/certified-letter/page.tsx
- **Commit:** b9680ce

**3. [Rule 1 - Bug] 법률구조법 조문 번호 오류**
- **Found during:** Task 2
- **Issue:** 법적 근거로 `법률구조법 제7조(법률구조의 방법)`를 표기 — 제7조는 법률구조 방법 규정이고, 대상자 요건은 `제5조(법률구조대상자)` + `시행령 제4조(자력기준)`
- **Fix:** 법적 근거 정정 → 법률구조법 제5조 + 시행령 제4조
- **Files modified:** src/app/tools/misc/legal-aid/page.tsx
- **Commit:** 0019f55

**4. [Rule 1 - Bug] 기준중위소득 125% 수치 부정확**
- **Found during:** Task 2
- **Issue:** 보건복지부 고시 기준 2026년 기준중위소득 125% 수치가 다수 부정확 (2인, 3인, 4인, 5인, 6인 모두 차이)
- **Fix:** 보건복지부 고시 기준으로 수정: 2인 4,603,000 / 3인 5,893,000 / 4인 7,162,000 / 5인 8,379,000 / 6인 9,592,000
- **Files modified:** src/app/tools/misc/legal-aid/page.tsx
- **Commit:** 0019f55

**5. [Rule 2 - Missing Critical] 형사변호 지원 별도 기준 안내 누락**
- **Found during:** Task 2
- **Issue:** 형사변호 지원은 소송대리와 동일한 125% 기준을 적용하나, 실제로 별도 심사 기준 존재 — 사용자 오해 유발 가능
- **Fix:** 형사변호 선택 시 별도 심사 기준 적용 안내 추가
- **Files modified:** src/app/tools/misc/legal-aid/page.tsx
- **Commit:** 0019f55

## Decisions Made

1. 내용증명 도구에 민법 제111조(도달주의) + 제174조(최고 후 6개월 내 재판상 청구 요건) 명시 — 사용자가 내용증명만 보내고 소송 제기를 잊는 오류 방지
2. 법률구조 대상자 조항: 제7조(법률구조방법) 오류 → 제5조(법률구조대상자) + 시행령 제4조(자력기준)로 정정
3. 기준중위소득 125% 수치: 보건복지부 고시 제2025-211호 기준 반올림 적용값으로 수정

## Known Stubs

None.

## Self-Check: PASSED
