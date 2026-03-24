---
phase: 16-tax-legal-audit
verified: 2026-03-24T04:00:00Z
status: passed
score: 10/10 must-haves verified
re_verification: false
---

# Phase 16: Tax Legal Audit Verification Report

**Phase Goal:** 10개 세금 계산기가 소득세법·지방세법·조세특례제한법 현행 기준으로 정확하게 작동한다
**Verified:** 2026-03-24T04:00:00Z
**Status:** PASSED
**Re-verification:** No — initial verification (retroactive)

---

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|----------|
| 1  | 양도소득세 세율 구간·장기보유특별공제율이 소득세법 원문과 일치한다 | VERIFIED | `getLongTermRate(holdingYears, residenceYears)` 구현, 보유 4%×년수(최대 40%) + 거주 4%×년수(최대 40%) 합산, 소득세법 제95조 제2항 별표2 일치. 기본세율 조문 제104조로 수정됨. |
| 2  | 종합소득세 누진세율 구간이 소득세법 제55조 원문과 일치한다 | VERIFIED | 8단계 6%~45% 세율 코드와 법령 원문 완전 일치 확인. 표준세액공제 조문 제59조의4로 정정됨. |
| 3  | 연말정산 계산기의 공제항목·한도가 소득세법 원문과 일치한다 | VERIFIED | 근로소득공제 상한 2,000만원(`Math.min(deduction, 20_000_000)`) 적용, `earnedIncomeTaxCredit(computed, grossPay)` 총급여 기준 한도 수정, 의료비세액공제 700만원 한도 적용 확인. |
| 4  | 취득세 계산기의 세율이 지방세법 제11조 현행 요율과 일치한다 | VERIFIED | 2주택 비조정지역 6~9억 보간법 공식 `0.01 + (price - 600_000_000) / 300_000_000 * 0.02` 수정 확인. |
| 5  | 종합부동산세 계산기의 세율·공제가 종합부동산세법 원문과 일치한다 | VERIFIED | 기본공제 9억/12억, 공정시장가액비율 60%, 세율 0.5%~2.7% 정확. 조문 번호 제8조(과세표준)/제9조(세율)/제10조(세액공제) 수정됨. |
| 6  | 등록면허세 계산기의 세율이 지방세법 원문과 일치한다 | VERIFIED | 소유권 이전(유상) 세율 1.5%→2.0%(20/1000) 수정 확인. |
| 7  | 부가가치세 계산기의 세율·신고 기준이 부가가치세법 원문과 일치한다 | VERIFIED | 세율 10%(0.1), 매입세액 공제 로직 정확. 법령 원문 대조에서 오류 없음 확인. |
| 8  | 증권거래세 계산기의 세율이 2025년 증권거래세법 원문과 일치한다 | VERIFIED | 코스피 증권거래세 0%(+농어촌특별세 0.15%), 코스닥 0.15%, 코넥스 0.10%, K-OTC 0.15%, 비상장 0.35% 전면 수정 확인. |
| 9  | 4대보험료 계산기의 보험료율이 2025년 적용 기준과 일치한다 | VERIFIED | `EMPLOYMENT_EMPLOYER = 0.0115` (1.15%, 150인 미만 기준) 수정 확인. 건강보험 7.09%, 국민연금 9%, 장기요양 12.95% 정확. |
| 10 | 월세 세액공제 계산기의 공제 기준이 조세특례제한법 원문과 일치한다 | VERIFIED | 공제율 총급여 5,500만원 이하 17%, 초과~8,000만원 이하 15% 적용. 법적 근거 조세특례제한법 제95조의2 정정. |

**Score:** 10/10 truths verified

---

### Required Artifacts

| Artifact | Plan | Status | Details |
|----------|------|--------|---------|
| `src/app/tools/tax/capital-gains-tax/page.tsx` | 16-01 | VERIFIED | 존재, 실질적 계산 로직, commit 4b9703a |
| `src/app/tools/tax/comprehensive-income-tax/page.tsx` | 16-01 | VERIFIED | 존재, 실질적 계산 로직, commit 04537cf |
| `src/app/tools/tax/year-end-tax/page.tsx` | 16-01 | VERIFIED | 존재, 실질적 계산 로직, commit 5136dcf |
| `src/app/tools/tax/acquisition-tax/page.tsx` | 16-02 | VERIFIED | 존재, 실질적 계산 로직, commit d119ff0 |
| `src/app/tools/tax/comprehensive-property-tax/page.tsx` | 16-02 | VERIFIED | 존재, 실질적 계산 로직, commit e9bb8cf |
| `src/app/tools/tax/registration-tax/page.tsx` | 16-02 | VERIFIED | 존재, 실질적 계산 로직, commit 35ee77a |
| `src/app/tools/tax/vat/page.tsx` | 16-03 | VERIFIED | 존재, 실질적 계산 로직, 오류 없음 확인 |
| `src/app/tools/tax/securities-tax/page.tsx` | 16-03 | VERIFIED | 존재, 실질적 계산 로직, commit 568c46b |
| `src/app/tools/tax/rent-tax-credit/page.tsx` | 16-03 | VERIFIED | 존재, 실질적 계산 로직, commit 79877d6 |
| `src/app/tools/tax/four-insurances/page.tsx` | 16-04 | VERIFIED | 존재, 실질적 계산 로직, commit 0f25e80 |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| capital-gains-tax/page.tsx | 소득세법 제95조·제104조 | 코드 상수·조문 주석 | WIRED | `getLongTermRate` 함수, 조문 번호 명시 |
| comprehensive-income-tax/page.tsx | 소득세법 제55조 | 누진세율 상수 | WIRED | 8단계 세율 직접 구현, 제55조 인용 |
| year-end-tax/page.tsx | 소득세법 제47·59·59의4조 | 함수 구현·상수 | WIRED | 근로소득공제, 세액공제, 의료비 한도 조문 명시 |
| acquisition-tax/page.tsx | 지방세법 제11·13의2조 | 세율 상수·계산 로직 | WIRED | 보간법 공식, 중과세율 구현 |
| comprehensive-property-tax/page.tsx | 종합부동산세법 제8·9·10조 | 세율 상수 | WIRED | 조문 번호 정확 명시 |
| registration-tax/page.tsx | 지방세법 제28·34조 | 세율 상수 | WIRED | 유상이전 2.0% 정확 구현 |
| vat/page.tsx | 부가가치세법 제30·38조 | 세율 상수 | WIRED | 10% 세율, 매입세액 공제 |
| securities-tax/page.tsx | 증권거래세법 제8조, 농어촌특별세법 제5조 | MARKETS 배열 | WIRED | 2025년 기준 전 시장 세율 구현 |
| rent-tax-credit/page.tsx | 조세특례제한법 제95조의2 | 공제율 상수 | WIRED | 17%/15% 조문 인용 일치 |
| four-insurances/page.tsx | 고용보험 및 산재보험료징수법 시행령 | 보험료율 상수 | WIRED | `EMPLOYMENT_EMPLOYER = 0.0115` |

---

### Data-Flow Trace (Level 4)

모든 계산기는 클라이언트 사이드 순수 함수형 계산기(DB 없음). 사용자 입력값 → 계산 함수 → 결과 렌더링 구조로, 외부 데이터 소스 없이 법령 상수를 직접 코드에 내장하여 계산함. 데이터 흐름 단절 위험 없음.

---

### Behavioral Spot-Checks

Step 7b: SKIPPED — 클라이언트 전용 계산기로 서버 엔드포인트 없음. TypeScript 타입 체크로 대체 검증.

TypeScript `--noEmit` 결과: tax/ 디렉터리 전체 오류 0건 (npx tsc --noEmit 출력에서 tax/ 경로 없음 확인).

---

### Requirements Coverage

| Requirement | Plan | Description | Status | Evidence |
|-------------|------|-------------|--------|----------|
| TAX-01 | 16-01 | 양도소득세 계산기 소득세법 검증 | SATISFIED | commit 4b9703a, 세율·공제율 수정 |
| TAX-02 | 16-01 | 종합소득세 계산기 소득세법 검증 | SATISFIED | commit 04537cf, 조문 인용 수정 |
| TAX-03 | 16-02 | 취득세 계산기 지방세법 검증 | SATISFIED | commit d119ff0, 보간법 수정 |
| TAX-04 | 16-02 | 종합부동산세 계산기 종합부동산세법 검증 | SATISFIED | commit e9bb8cf, 조문 번호 수정 |
| TAX-05 | 16-02 | 등록면허세 계산기 지방세법 검증 | SATISFIED | commit 35ee77a, 세율 수정 |
| TAX-06 | 16-03 | 부가가치세 계산기 부가가치세법 검증 | SATISFIED | 법령 대조 오류 없음 확인 |
| TAX-07 | 16-03 | 증권거래세 계산기 증권거래세법 검증 | SATISFIED | commit 568c46b, 2025년 세율 전면 수정 |
| TAX-08 | 16-01 | 연말정산 계산기 소득세법 공제 검증 | SATISFIED | commit 5136dcf, 한도 3건 수정 |
| TAX-09 | 16-04 | 4대보험료 계산기 보험료율 검증 | SATISFIED | commit 0f25e80, 고용보험 사용자 요율 수정 |
| TAX-10 | 16-03 | 월세 세액공제 조세특례제한법 검증 | SATISFIED | commit 79877d6, 공제율 수정 |

REQUIREMENTS.md 체크박스: TAX-01 ~ TAX-10 전체 `[x]` 완료 표시 확인.

---

### Anti-Patterns Found

반복 검색 결과: TODO/FIXME/XXX/HACK/PLACEHOLDER — 해당 없음.
`placeholder` 속성: 모두 HTML input 필드 안내 텍스트 (구현 스텁 아님).
빈 구현체(`return null`, `return []`, `return {}`) — 해당 없음.
모든 파일에서 실질적인 계산 로직 확인됨.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (없음) | — | — | — | — |

---

### Human Verification Required

#### 1. 취득세 2주택 비조정지역 6~9억 구간 계산 결과 확인

**Test:** 취득가액 7.5억, 2주택, 비조정지역 조건으로 계산
**Expected:** 취득세율 ≈ 2.0% (보간법: 0.01 + (750_000_000 - 600_000_000) / 300_000_000 * 0.02 = 2.0%)
**Why human:** UI 입력·출력 조합 결과는 브라우저에서만 확인 가능

#### 2. 양도소득세 1세대1주택 거주기간 공제 적용 확인

**Test:** 보유 10년, 거주 5년, 1세대1주택으로 계산
**Expected:** 장기보유특별공제 = 보유 40% + 거주 20% = 60%
**Why human:** residenceYears 입력 필드 신규 추가분 — UI에서 직접 확인 필요

#### 3. 증권거래세 코스피 세목 분리 표시 확인

**Test:** 코스피 1억원 매도
**Expected:** 증권거래세 0원, 농어촌특별세 150,000원 별도 표시
**Why human:** agriTax 별도 항목 렌더링 확인은 UI에서만 가능

---

### Gaps Summary

갭 없음. 10개 계산기 모두 법률 감사 완료, 총 11건 법률 오류 발견 및 수정됨:

- Plan 01 (소득세법): 5건 수정 — 양도소득세 거주기간 공제 누락, 기본세율 조문 오류, 연말정산 근로소득공제 한도·세액공제 기준·의료비 한도
- Plan 02 (지방세법·종합부동산세법): 3건 수정 — 취득세 보간법, 종합부동산세 조문 번호, 등록면허세 유상이전 세율
- Plan 03 (증권거래세법·조세특례제한법): 2건 수정 — 증권거래세 2025년 세율 전면, 월세 세액공제율
- Plan 04 (고용보험 시행령): 1건 수정 — 고용보험 사용자 요율

모든 수정사항 git commit으로 기록됨 (9개 커밋 전체 존재 확인).

---

_Verified: 2026-03-24T04:00:00Z_
_Verifier: Claude (gsd-verifier)_
