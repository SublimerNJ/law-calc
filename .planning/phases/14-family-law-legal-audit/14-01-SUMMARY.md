---
phase: 14-family-law-legal-audit
plan: "01"
subsystem: family-calculators
tags: [legal-audit, family-law, alimony, child-support, property-division]
dependency_graph:
  requires: []
  provides: [FAMILY-01, FAMILY-02, FAMILY-03]
  affects: [src/app/tools/family/alimony/page.tsx, src/app/tools/family/child-support/page.tsx, src/app/tools/family/property-division/page.tsx]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit, Math.floor rounding, 미만(<) boundary]
key_files:
  created: []
  modified:
    - src/app/tools/family/alimony/page.tsx
    - src/app/tools/family/child-support/page.tsx
decisions:
  - "양육비 법적 근거: 민법 제833조(부부협조)는 오류, 민법 제837조(양육책임)가 정확"
  - "양육비 산정기준표 연도: 2026 미발표, 2024 개정판이 현행"
  - "위자료 계산기: 법적 근거·경계값·배율 모두 판례 기준 부합"
  - "재산분할 계산기: 민법 제839조의2 정확, 기여도 범위 20~80% 판례 기준 부합"
metrics:
  duration: "~15 minutes"
  completed_date: "2026-03-24"
  tasks_completed: 3
  files_modified: 2
---

# Phase 14 Plan 01: 가사 계산기 법률 감사 (위자료·양육비·재산분할) Summary

위자료, 양육비, 재산분할 3개 가사 계산기를 /Launcelot-Lawyer 스킬로 법령 원문 대조 검증하여 양육비 법령 조문 오류(제833조→제837조) 및 UI 색상 잔재를 수정 완료.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | 위자료 계산기 법률 감사 | 2c09633 | src/app/tools/family/alimony/page.tsx |
| 2 | 양육비 계산기 법률 감사 | 8c9ffd3 | src/app/tools/family/child-support/page.tsx |
| 3 | 재산분할 계산기 법률 감사 | (no change needed) | src/app/tools/family/property-division/page.tsx |

## Legal Audit Results

### Task 1: 위자료(Alimony) 계산기

**법적 근거**: 민법 제843조 (재판상 이혼 위자료), 제806조 (손해배상) — 정확

**검증 결과**:
- 혼인기간별 기본 범위: 판례 분석 기반으로 합리적 (500만~1억5000만원 범위)
- 경계값: `years < maxYears` — 미만(<) 올바르게 적용됨
- 유책사유 배율: 외도×1.5, 가정폭력×1.3, 유기×1.2, 기타×0.7 — 판례 경향 반영
- 재산규모 팩터: 상위×1.2, 중위×1.0, 하위×0.9 — 합리적
- Math.floor 적용: 올바름
- 시효 안내 "이혼 확정일로부터 3년 이내": 정확 (민법 제766조)

**수정 사항**: 다크테마 잔여 색상 2곳 수정 (bg-[#1a1025] → bg-slate-50, border-[#2a1a3a] → border-slate-200)

---

### Task 2: 양육비(Child Support) 계산기

**법적 근거 오류 발견 및 수정**:
- 오류: 민법 제833조 (부부간 협조의무) — 양육비와 무관한 조문
- 수정: 민법 제837조 (이혼과 자의 양육책임) + 가사소송법 제2조
- 연도 표기: (2026) → (2024 개정) (2026년 기준표는 미발표)

**검증 결과**:
- 소득 구간별 기준금액: 서울가정법원 2024 양육비산정기준표 근사값으로 합리적
- 다자녀 배율 (×1.8, ×2.4): 법원 실무 경향 반영한 합리적 단순화
- 연령 배율 (영유아×0.9, 초등×1.0, 중고등×1.1): 판례 비용 증가 패턴 반영
- 소득 비례 분담 방식: 실무 기준 부합
- Math.floor 적용: 올바름

---

### Task 3: 재산분할(Property Division) 계산기

**법적 근거**: 민법 제839조의2 (재산분할청구권) — 정확

**검증 결과**:
- 기여도 범위 20~80%: 판례상 드물게 20%까지 인정되므로 보수적 범위 적절
- 기여도 참고표: 맞벌이 50%, 외벌이 30~40%, 혼인기간 20년+ 상향 경향 — 판례 기준 부합
- 총재산 × 기여도 = 취득예상액 공식: 정확
- "혼인 중 형성된 총 재산" 입력: 특유재산 자동 제외 처리로 적절
- Math.floor 적용: 올바름

**수정 사항 없음**: 법률 감사 통과

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing accuracy] 양육비 계산기 법령 조문 오류 수정**
- Found during: Task 2
- Issue: 민법 제833조(부부간 협조의무)는 양육비 청구 근거가 아님. 올바른 조문은 제837조(이혼과 자의 양육책임)
- Fix: 제833조 → 제837조로 수정, 가사소송법 제2조 추가, 연도 수정
- Files modified: src/app/tools/family/child-support/page.tsx
- Commit: 8c9ffd3

**2. [Rule 1 - Bug] 위자료 계산기 다크테마 잔여 색상**
- Found during: Task 1
- Issue: bg-[#1a1025], border-[#2a1a3a] 등 다크테마 색상이 라이트테마 페이지에 남아있음
- Fix: bg-slate-50, border-slate-200으로 교체 (2곳)
- Files modified: src/app/tools/family/alimony/page.tsx
- Commit: 2c09633

## Known Stubs

None — all three calculators have complete implementations with actual calculation logic.

## Self-Check: PASSED

- src/app/tools/family/alimony/page.tsx: exists, modified
- src/app/tools/family/child-support/page.tsx: exists, modified
- src/app/tools/family/property-division/page.tsx: exists, audited (no changes needed)
- Commit 2c09633: verified in git log
- Commit 8c9ffd3: verified in git log
- TypeScript: npx tsc --noEmit passed with no errors
