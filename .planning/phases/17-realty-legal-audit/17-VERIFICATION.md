---
phase: 17-realty-legal-audit
verified: 2026-03-24T04:00:00Z
status: passed
score: 7/7 must-haves verified
re_verification: false
---

# Phase 17: Realty Legal Audit Verification Report

**Phase Goal:** 7개 부동산 계산기가 주택임대차보호법·금융감독규정 현행 기준으로 정확하게 작동한다
**Verified:** 2026-03-24T04:00:00Z
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                             | Status     | Evidence                                                                                           |
| --- | ------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| 1   | 보증금 반환 계산기의 우선변제 기준이 주택임대차보호법 원문과 일치한다                            | ✓ VERIFIED | 법적 근거: 주택임대차보호법 제3조/제3조의2 + 민법 제379조(법정이율 연 5%) — 조문 정확히 명시됨    |
| 2   | 전월세 전환율 상한이 주택임대차보호법 시행령 기준(기준금리+2%)과 일치한다                        | ✓ VERIFIED | 기본값 4.75% (기준금리 2.75% + 2%p), 시행령 제9조 명시, 법적 근거 제7조의2 표시                   |
| 3   | 중개보수 요율이 공인중개사법 시행규칙 별표 현행 요율과 일치한다                                  | ✓ VERIFIED | "공인중개사법 시행규칙 제20조 제1항 별표1" 정밀 조문 명시됨                                       |
| 4   | 청약가점 계산기의 가점 항목·배점이 주택공급에관한규칙 별표 원문과 일치한다                       | ✓ VERIFIED | 무주택기간 32점/부양가족 35점/가입기간 17점, 총 84점 — 별표1 제1호·제2호·제3호 조문 번호 명시됨   |
| 5   | DSR 계산기의 규제 기준이 은행업감독규정 현행 기준과 일치한다                                     | ✓ VERIFIED | 은행권 40%/비은행권 50%, 은행업감독규정 제26조의2 명시, 스트레스 DSR 3단계(고시 제2024-11호) 추가  |
| 6   | LTV 계산기의 규제 비율이 은행업감독규정 현행 기준과 일치한다                                     | ✓ VERIFIED | 투기지역 40%(유주택)/50%(무주택), 투기과열지구 50~80%, 조정대상지역 70%/80%(생애최초) — 제26조 명시 |
| 7   | DTI 계산기의 규제 비율이 은행업감독규정 현행 기준과 일치한다                                     | ✓ VERIFIED | 투기지역/투기과열지구 40%, 조정대상지역 50%, 비규제 60% — 제26조의2 명시됨                        |

**Score:** 7/7 truths verified

### Required Artifacts

| Artifact                                               | Expected                     | Status     | Details                                              |
| ------------------------------------------------------ | ---------------------------- | ---------- | ---------------------------------------------------- |
| `src/app/tools/realty/deposit-return/page.tsx`         | 보증금 반환 계산기 법률 감사  | ✓ VERIFIED | Commit e1b0c2c, 민법 제379조 조문 오류 수정          |
| `src/app/tools/realty/rent-conversion/page.tsx`        | 전월세 전환 계산기 법률 감사  | ✓ VERIFIED | Commit e8ec5bc, 기본값 5.5% → 4.75% 수정             |
| `src/app/tools/realty/brokerage-fee/page.tsx`          | 중개보수 계산기 법률 감사     | ✓ VERIFIED | Commit c0fd076, 시행규칙 제20조 제1항 조문 정밀화    |
| `src/app/tools/realty/subscription-score/page.tsx`     | 청약가점 계산기 법률 감사     | ✓ VERIFIED | Commit d93402d, 별표1 제1~3호 조문 번호 추가          |
| `src/app/tools/realty/dsr/page.tsx`                    | DSR 계산기 법률 감사          | ✓ VERIFIED | Commit 0519dd5, 은행업감독규정 제26조의2 정확 명시   |
| `src/app/tools/realty/ltv/page.tsx`                    | LTV 계산기 법률 감사          | ✓ VERIFIED | Commit 64cee24, 조정대상지역 50% → 70%, 7개 구간 세분화 |
| `src/app/tools/realty/dti/page.tsx`                    | DTI 계산기 법률 감사          | ✓ VERIFIED | Commit 7e444f6, 은행업감독규정 제26조의2 조문 정확화 |

### Key Link Verification

| From                     | To                                      | Via                            | Status     | Details                                                             |
| ------------------------ | --------------------------------------- | ------------------------------ | ---------- | ------------------------------------------------------------------- |
| deposit-return/page.tsx  | 주택임대차보호법 제3조/제3조의2, 민법 제379조  | 법적 근거 UI 표시        | ✓ WIRED   | 소스코드에 조문 번호 명시, 지연이자 5% 계산 로직 구현               |
| rent-conversion/page.tsx | 주택임대차보호법 제7조의2, 시행령 제9조     | 기본값 및 법적 근거 표시  | ✓ WIRED   | 4.75% 기본값, 기준금리+2%p 산식 UI에 표시                           |
| brokerage-fee/page.tsx   | 공인중개사법 시행규칙 제20조 제1항 별표1   | 법적 근거 UI 표시        | ✓ WIRED   | 정밀 조문 명시됨                                                     |
| subscription-score/page.tsx | 주택공급에 관한 규칙 별표1 제1~3호       | 배점 데이터 + 법적 근거  | ✓ WIRED   | 32/35/17점 배열 데이터, 조문 번호 UI 표시                           |
| dsr/page.tsx             | 은행업감독규정 제26조의2                  | 규제 비율 로직 + 근거 표시 | ✓ WIRED  | 40%/50% 하드코딩 비교 로직, 조문 UI 표시                            |
| ltv/page.tsx             | 은행업감독규정 제26조                     | 규제 비율 데이터 + 근거   | ✓ WIRED   | 8개 지역구분 LTV 비율 배열, 조문 UI 표시                            |
| dti/page.tsx             | 은행업감독규정 제26조의2                  | 규제 비율 데이터 + 근거   | ✓ WIRED   | 3개 지역구분 DTI 비율 배열, 조문 UI 표시                            |

### Data-Flow Trace (Level 4)

These calculators are pure client-side computation tools with no server-side data fetching. All inputs come from user form fields; outputs are computed synchronously. There are no API routes or database queries to trace. Level 4 data-flow tracing is not applicable — legal values are correctly embedded as constants in source code matching statutory references.

### Behavioral Spot-Checks

Step 7b: SKIPPED (pure client-side React calculators; no server or runnable entry points to invoke without a browser)

### Requirements Coverage

| Requirement | Source Plan | Description                                                         | Status       | Evidence                                                    |
| ----------- | ----------- | ------------------------------------------------------------------- | ------------ | ----------------------------------------------------------- |
| REALTY-01   | 17-01       | deposit-return — 주택임대차보호법 기준 검증 및 오류 수정             | ✓ SATISFIED  | 민법 제379조 조문 오류 수정 확인, 법적 근거 UI 명시          |
| REALTY-02   | 17-01       | rent-conversion — 주택임대차보호법 전환율 상한 검증 및 오류 수정    | ✓ SATISFIED  | 5.5% → 4.75% 수정, 시행령 제9조 명시 확인                   |
| REALTY-03   | 17-01       | brokerage-fee — 공인중개사법 중개보수 요율 검증 및 오류 수정        | ✓ SATISFIED  | 제20조 제1항 별표1 정밀 조문 확인                            |
| REALTY-04   | 17-02       | subscription-score — 주택공급에관한규칙 가점 기준 검증 및 오류 수정 | ✓ SATISFIED  | 32+35+17=84점 배점 확인, 별표1 제1~3호 조문 번호 추가 확인  |
| REALTY-05   | 17-02       | dsr — 은행업감독규정 DSR 기준 검증 및 오류 수정                     | ✓ SATISFIED  | 은행권 40%/비은행권 50%, 제26조의2, 스트레스 DSR 고시 확인  |
| REALTY-06   | 17-03       | ltv — 은행업감독규정 LTV 기준 검증 및 오류 수정                     | ✓ SATISFIED  | 조정대상 70% 수정, 7구간 세분화, 제26조 명시 확인            |
| REALTY-07   | 17-03       | dti — 은행업감독규정 DTI 기준 검증 및 오류 수정                     | ✓ SATISFIED  | 투기/조정/비규제 비율 확인, 제26조의2 명시 확인              |

### Anti-Patterns Found

No blockers or warnings found. All 7 calculator files:
- Contain substantive calculation logic (no placeholder returns)
- Reference correct statutory articles in UI
- Have no TODO/FIXME/placeholder comments in modified sections
- Pass TypeScript type check (npx tsc --noEmit — no output)

### Human Verification Required

The following items require human testing in a browser since they involve UI rendering and calculation accuracy:

#### 1. 전월세 전환율 계산 결과 확인

**Test:** 전세금 3억원 → 보증금 5천만원 전환 시 월세 = (3억 - 5천만) × 4.75% ÷ 12 = 990,417원 계산 확인
**Expected:** 월세 약 990,417원 표시
**Why human:** UI 렌더링 및 입력 인터랙션 필요

#### 2. LTV 조정대상지역 규제 판정

**Test:** 주택가격 5억원, 대출금 3.5억원, 조정대상지역 선택 → LTV 70% (규제 70% 이내) 적합 판정
**Expected:** LTV 70.0%, 규제 기준 70%, "적합" 표시
**Why human:** UI 렌더링 필요

#### 3. 청약가점 총점 계산

**Test:** 무주택 15년(32점), 부양가족 3명(20점), 청약통장 10년(12점) 선택
**Expected:** 총 64점 / 84점 표시
**Why human:** UI 드롭다운 선택 인터랙션 필요

### Gaps Summary

No gaps. All 7 must-have truths are verified. All 7 artifacts exist, are substantive (no stubs), and are wired (legal constants and article citations embedded in source). All 7 commits confirmed in git log. TypeScript check passes with no errors. REQUIREMENTS.md marks all 7 requirements as complete (checked).

---

_Verified: 2026-03-24T04:00:00Z_
_Verifier: Claude (gsd-verifier)_
