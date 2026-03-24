---
phase: 15-labor-legal-audit
verified: 2026-03-24T04:00:00Z
status: passed
score: 12/12 must-haves verified
re_verification: false
---

# Phase 15: Labor Legal Audit Verification Report

**Phase Goal:** 12개 노동/근로 계산기가 근로기준법·노동 관련 법령 기준으로 정확하게 작동한다
**Verified:** 2026-03-24T04:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | 퇴직금 산정 공식이 근로자퇴직급여보장법 제8조 (평균임금×30×근속일수/365)와 일치한다 | VERIFIED | `severance-pay/page.tsx:93` `Math.floor(dailyAvgWage * 30 * (totalDays / 365))` |
| 2 | 해고예고수당이 근로기준법 제26조·제35조 기준(30일분 통상임금, 7가지 제외 대상)과 일치한다 | VERIFIED | `dismissal-notice/page.tsx` 제35조 7가지 제외 대상 모두 반영 (commit c00094b) |
| 3 | 휴업수당이 근로기준법 제46조 기준 max(평균임금×70%, 통상임금)와 일치한다 | VERIFIED | `shutdown-allowance/page.tsx:36` `Math.max(avgWage70, dailyOrdinaryWage)` |
| 4 | 연장근로수당 가산율(연장 1.5배, 야간 0.5배 가산, 휴일 8h이내 1.5배/초과 2.0배)이 근로기준법 제56조와 일치한다 | VERIFIED | `overtime-pay/page.tsx:32-34` 각 배율 확인, 법적 근거에 제53조·제56조·제3항 명시 |
| 5 | 주휴수당 계산기가 근로기준법 제55조 기준(주 15시간 미만 제외, 개근 조건)과 일치한다 | VERIFIED | `weekly-holiday-pay/page.tsx:21` `weeklyHours >= 15 && fullAttendance` |
| 6 | 연차수당 계산기가 근로기준법 제60조·제61조 기준(최대 25일, 사용촉진 면제 명시)과 일치한다 | VERIFIED | `annual-leave-pay/page.tsx:66,158` 제60조 일수 기준 및 제61조 면제 조건 명시 |
| 7 | 최저임금 검증기의 기준 시급이 2026년 최저임금(10,320원)과 일치한다 | VERIFIED | `minimum-wage-check/page.tsx:12` `MINIMUM_WAGE_2026 = 10320` (고용노동부 고시 제2025-38호) |
| 8 | 부당해고 구제 계산기가 근로기준법 제28조·제30조·제33조 기준(5인 이상, 3개월 이내 신청)과 일치한다 | VERIFIED | `unfair-dismissal/page.tsx` 제28조 구제신청 근거 및 5인 이상 조건 명시 (commit 9c889f6) |
| 9 | 산재보상 계산기의 휴업급여 최저보상기준이 2026년 최저임금 기준(10,320원×0.8×8=66,048원)과 일치한다 | VERIFIED | `industrial-accident/page.tsx:31` `MIN_WAGE_80_DAILY = 10_320 * 0.8 * 8` |
| 10 | 출산휴가급여 계산기의 급여 상한액이 현행 고시(월 2,100,000원)와 일치한다 | VERIFIED | `maternity-leave/page.tsx:14` `MATERNITY_UPPER = 2_100_000` |
| 11 | 육아휴직급여 계산기가 2024.1.1 개정 기준(전 기간 80%, 상한 150만원, 사후지급 폐지)과 일치한다 | VERIFIED | `parental-leave/page.tsx:14` `rate: 0.8, upper: 1_500_000`, 사후지급 제도 폐지 반영 |
| 12 | 실업급여 계산기의 구직급여 산정(평균임금 60%, 상한 66,000원/일, 하한 2026년 최저임금 기준)과 고용보험법이 일치한다 | VERIFIED | `unemployment-benefit/page.tsx:10,59` `DAILY_UPPER = 66_000`, `10_320 * 0.8 * dailyHours` |

**Score:** 12/12 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/tools/labor/severance-pay/page.tsx` | 퇴직금 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 0eb12c7 |
| `src/app/tools/labor/dismissal-notice/page.tsx` | 해고예고수당 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit c00094b |
| `src/app/tools/labor/shutdown-allowance/page.tsx` | 휴업수당 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, no changes needed |
| `src/app/tools/labor/overtime-pay/page.tsx` | 연장근로수당 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 585c7c8 |
| `src/app/tools/labor/weekly-holiday-pay/page.tsx` | 주휴수당 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, no changes needed |
| `src/app/tools/labor/annual-leave-pay/page.tsx` | 연차수당 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 02dbe7e |
| `src/app/tools/labor/minimum-wage-check/page.tsx` | 최저임금 검증기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 26bf66f |
| `src/app/tools/labor/unfair-dismissal/page.tsx` | 부당해고 구제 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 9c889f6 |
| `src/app/tools/labor/industrial-accident/page.tsx` | 산재보상 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 96a0005 |
| `src/app/tools/labor/maternity-leave/page.tsx` | 출산휴가급여 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 4b6fdd3 |
| `src/app/tools/labor/parental-leave/page.tsx` | 육아휴직급여 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 96a0005 |
| `src/app/tools/labor/unemployment-benefit/page.tsx` | 실업급여 계산기 법률 감사 완료 | VERIFIED | EXISTS, substantive, commit 92eb399 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| severance-pay 계산 로직 | 근로자퇴직급여보장법 제8조 | 공식 직접 구현 | VERIFIED | `dailyAvgWage * 30 * (totalDays / 365)` |
| dismissal-notice 제외 대상 목록 | 근로기준법 제35조 전문 | UI 안내 텍스트 | VERIFIED | 7가지 제외 대상 완전 반영 |
| shutdown-allowance 비교 로직 | 근로기준법 제46조 | Math.max 구현 | VERIFIED | `Math.max(avgWage70, dailyOrdinaryWage)` |
| overtime-pay 가산율 | 근로기준법 제56조 제1항·제2항·제3항 | 배율 상수 | VERIFIED | 1.5배/0.5배/2.0배 각 조항 일치 |
| minimum-wage-check 기준값 | 고용노동부 고시 제2025-38호 | 상수 MINIMUM_WAGE_2026 | VERIFIED | 10,320원 적용 |
| parental-leave 급여율 | 고용보험법 시행령 제95조 2024.1.1 개정 | 상수 및 주석 | VERIFIED | 전 기간 80%, 상한 150만원, 사후지급 폐지 |
| unemployment-benefit 하한 | 2026년 최저임금 고시 | dailyLower 계산식 | VERIFIED | `10_320 * 0.8 * dailyHours` |
| industrial-accident 최저보상기준 | 산업재해보상보험법 제54조 | MIN_WAGE_80_DAILY 상수 | VERIFIED | `10_320 * 0.8 * 8 = 66,048원` |

### Data-Flow Trace (Level 4)

All 12 calculators implement client-side calculation logic (no API route needed). User inputs flow directly into calculation functions that apply the verified legal formulas and render results to the UI. No disconnected props or static return stubs found.

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| severance-pay | severancePay | user inputs → formula | Yes — live calculation | FLOWING |
| minimum-wage-check | isViolation, hourlyDiff | user inputs → MINIMUM_WAGE_2026 | Yes — live calculation | FLOWING |
| maternity-leave | insuranceBenefit | user inputs → MATERNITY_UPPER | Yes — live calculation | FLOWING |
| parental-leave | monthlyBenefit | user inputs → rate 0.8 / upper 1,500,000 | Yes — live calculation | FLOWING |
| unemployment-benefit | dailyPayment | user inputs → DAILY_UPPER / dailyLower | Yes — live calculation | FLOWING |

### Behavioral Spot-Checks

Step 7b: SKIPPED — calculators are client-side React components requiring a browser; no runnable server entry point to curl.

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| LABOR-01 | 15-01 | 퇴직금 계산기 법률 감사 | SATISFIED | commit 0eb12c7, 법령 명칭 수정 |
| LABOR-02 | 15-01 | 해고예고수당 계산기 법률 감사 | SATISFIED | commit c00094b, 제35조 7가지 제외 대상 추가 |
| LABOR-03 | 15-02 | 연차수당 계산기 법률 감사 | SATISFIED | commit 02dbe7e, 제61조 사용촉진 면제 명시 |
| LABOR-04 | 15-02 | 연장근로수당 계산기 법률 감사 | SATISFIED | commit 585c7c8, 연장근로 한도 레이블 수정 |
| LABOR-05 | 15-02 | 주휴수당 계산기 법률 감사 | SATISFIED | 법령 완전 준수, 변경 불필요 확인 |
| LABOR-06 | 15-03 | 최저임금 검증기 법률 감사 | SATISFIED | commit 26bf66f, 2026년 최저임금 10,320원 수정 |
| LABOR-07 | 15-03 | 부당해고 구제 계산기 법률 감사 | SATISFIED | commit 9c889f6, 제28조 및 5인 이상 조건 추가 |
| LABOR-08 | 15-03 | 산재보상 계산기 법률 감사 | SATISFIED | commit 96a0005, 최저보상기준 2026년 기준 갱신 |
| LABOR-09 | 15-04 | 출산휴가급여 계산기 법률 감사 | SATISFIED | commit 4b6fdd3, 상한액 2,035,640→2,100,000원 수정 |
| LABOR-10 | 15-04 | 육아휴직급여 계산기 법률 감사 | SATISFIED | commit 96a0005, 2024.1.1 개정 반영 |
| LABOR-11 | 15-04 | 실업급여 계산기 법률 감사 | SATISFIED | commit 92eb399, 하한 최저임금 2026년 기준 수정 |
| LABOR-12 | 15-01 | 휴업수당 계산기 법률 감사 | SATISFIED | 법령 완전 준수, 변경 불필요 확인 |

All 12 LABOR requirements satisfied. No orphaned requirements found.

### Anti-Patterns Found

Anti-pattern scan (TODO/FIXME/placeholder/return null/return []) on all 12 files: 0 issues found across all calculators.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | None found | — | — |

### Human Verification Required

The following items require human testing in a browser as they involve UI rendering and calculation UX:

#### 1. 퇴직금 계산 결과 정확성 확인

**Test:** 2024-01-01 입사, 2026-01-01 퇴직, 3개월 평균 월급 300만원 입력
**Expected:** 퇴직금 약 4,931,507원 (일 평균임금 98,630원 × 30 × 730/365)
**Why human:** 날짜 계산 및 렌더링 결과를 브라우저에서 직접 확인 필요

#### 2. 최저임금 위반 판정 UI

**Test:** 시급 9,000원 입력
**Expected:** 위반 판정, 2026년 최저임금 10,320원 대비 1,320원 부족 표시
**Why human:** 위반 여부 색상 표시 및 메시지 렌더링 확인 필요

#### 3. 육아휴직급여 2024 개정 반영 확인

**Test:** 통상임금 월 300만원, 6개월 입력
**Expected:** 전 기간 월 150만원 상한 적용 (80%=240만원이나 상한 150만원), 사후지급 항목 없음
**Why human:** 사후지급금 항목이 UI에서 완전히 제거되었는지 확인 필요

### Gaps Summary

No gaps. All 12 labor calculators passed full verification:
- All 12 files exist and contain substantive calculation logic
- All 9 commits documented in SUMMARYs verified in git log
- All legal formulas verified against referenced statutes
- TypeScript type check passes with no errors
- No anti-patterns found in any file
- All 12 LABOR requirement IDs satisfied and marked complete in REQUIREMENTS.md

Notable corrections made during this phase (evidence of real legal audit work):
1. 최저임금 2025년(10,030원) → 2026년(10,320원) 수정 (3개 파일 영향: minimum-wage-check, industrial-accident, unemployment-benefit)
2. 육아휴직급여 2024.1.1 개정 미반영 수정 (구 기준 50%/120만원 → 현행 80%/150만원)
3. 출산휴가급여 상한액 오류 수정 (2,035,640원 → 2,100,000원)
4. 해고예고수당 제35조 제외 대상 7가지 완전 반영 (기존 1가지만 안내)
5. 연장근로 한도 레이블 오류 수정 (52시간 → 1주 12시간)

---

_Verified: 2026-03-24T04:00:00Z_
_Verifier: Claude (gsd-verifier)_
