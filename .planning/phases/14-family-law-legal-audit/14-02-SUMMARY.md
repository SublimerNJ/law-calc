---
phase: 14-family-law-legal-audit
plan: "02"
subsystem: family-calculators
tags: [legal-audit, inheritance-tax, forced-heirship, inheritance-order, launcelot-lawyer]
dependency_graph:
  requires: []
  provides: [FAMILY-04, FAMILY-05, FAMILY-06]
  affects: [inheritance-tax, forced-heirship, inheritance-order]
tech_stack:
  added: []
  patterns: [launcelot-lawyer-audit, law-citation-accuracy]
key_files:
  created: []
  modified:
    - src/app/tools/family/inheritance-tax/page.tsx
    - src/app/tools/family/forced-heirship/page.tsx
    - src/app/tools/family/inheritance-order/page.tsx
decisions:
  - 상속세 법적 근거 조문을 구체적 개별 조문으로 명시 (제18조·제19조·제21조·제26조)
  - 유류분 기산기간 설명에 민법 제1114조 반영 (상속인 증여 = 기간 제한 없음)
  - 대습상속 근거 조문을 제1010조에서 제1001조로 수정
metrics:
  duration: 3min
  completed_date: "2026-03-24T02:54:14Z"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 3
---

# Phase 14 Plan 02: 상속 관련 계산기 법률 감사 Summary

**One-liner:** 상속세·유류분·상속순위 3개 계산기 법령 조문 정확도 감사 완료 (제1001조·제1114조 등 3건 수정)

## Tasks Completed

| Task | Name | Commit | Key Changes |
|------|------|--------|-------------|
| 1 | inheritance-tax 법률 감사 | 826d86c | 법적 근거 조문 구체화 (제25조→제18조·제19조·제21조·제26조) |
| 2 | forced-heirship 법률 감사 | fa7f480 | 생전증여 기산기간 설명 수정 (민법 제1114조 반영) |
| 3 | inheritance-order 법률 감사 | d82fc4f | 대습상속 근거 조문 수정 (제1010조→제1001조), 제1009조 추가 |

## Legal Audit Results

### Task 1: 상속세 계산기 (FAMILY-04)

**검증 항목:**
- 세율 구간 (상속세및증여세법 제26조): 10%/20%/30%/40%/50% — **정확**
- 기초공제 2억원 (제18조): **정확**
- 일괄공제 5억원 (제21조): **정확**
- 배우자공제 최소 5억·최대 30억 (제19조): **정확**
- 장례비 공제 한도 15,000,000원: **정확** (시행령 제9조 봉안·자연장지 합산 기준)
- 과세표준 산정 (과세가액 - 공제): **정확**
- Math.floor 적용: **정확**

**수정사항:** 법적 근거 표기를 "제25조~제27조"에서 각 기능별 조문(제18조·제19조·제21조·제26조)으로 구체화

### Task 2: 유류분 계산기 (FAMILY-05)

**검증 항목:**
- 유류분 비율 (민법 제1112조): 직계비속 1/2, 배우자 1/2, 직계존속 1/3, 형제자매 1/3 — **정확**
- 기초재산 계산 (제1113조): 상속재산 + 증여 - 채무 — **정확**
- 유류분 반환청구 절차 설명 (제1115조~제1118조): **정확**
- 소멸시효 1년/10년: **정확**

**수정사항:** 민법 제1114조 반영 — 생전증여 레이블에 "제3자: 1년 이내 / 상속인: 기간 제한 없음" 설명 추가 (기존 "1년 이내"만 표기는 부정확)

### Task 3: 상속순위 계산기 (FAMILY-06)

**검증 항목:**
- 상속순위 (민법 제1000조): 1순위 직계비속, 2순위 직계존속, 3순위 형제자매, 4순위 4촌 이내 방계혈족 — **정확**
- 배우자 상속 (제1003조): 1·2순위 공동상속, 없으면 단독상속 — **정확**
- 법정상속분 (제1009조): 동순위 균등분, 배우자 5할 가산 — **정확**
- 대습상속 (제1001조): 직계비속 사전사망 시 그 비속이 대습상속 — **정확**

**수정사항:** 법적 근거 조문 오류 수정 — 대습상속 근거를 제1010조(대습상속인의 상속분)에서 제1001조(대습상속 규정 자체)로 수정, 제1009조 추가 명시

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 상속세 법적 근거 조문 오류**
- **Found during:** Task 1
- **Issue:** "제25조~제27조"는 연부연납·물납 조항으로 세율 근거가 아님
- **Fix:** 각 공제·세율 해당 조문(제18조·제19조·제21조·제26조)으로 수정
- **Files modified:** src/app/tools/family/inheritance-tax/page.tsx
- **Commit:** 826d86c

**2. [Rule 2 - Missing Critical Info] 유류분 생전증여 기산기간 불완전**
- **Found during:** Task 2
- **Issue:** "1년 이내 생전증여"로만 표기 시 상속인에 대한 증여(기간 제한 없음, 제1114조)가 누락
- **Fix:** 레이블에 두 경우 모두 명시
- **Files modified:** src/app/tools/family/forced-heirship/page.tsx
- **Commit:** fa7f480

**3. [Rule 1 - Bug] 대습상속 법적 근거 조문 오류**
- **Found during:** Task 3
- **Issue:** 제1010조는 "대습상속인의 상속분"을 규정하며, 대습상속 제도 자체는 제1001조
- **Fix:** 제1001조로 수정, 제1009조 추가
- **Files modified:** src/app/tools/family/inheritance-order/page.tsx
- **Commit:** d82fc4f

## Self-Check: PASSED

- src/app/tools/family/inheritance-tax/page.tsx: FOUND
- src/app/tools/family/forced-heirship/page.tsx: FOUND
- src/app/tools/family/inheritance-order/page.tsx: FOUND
- Commits 826d86c, fa7f480, d82fc4f: FOUND
- TypeScript: passes (0 errors)
