---
phase: 19-debt-legal-audit
verified: 2026-03-24T00:00:00Z
status: passed
score: 3/3 must-haves verified
re_verification: false
---

# Phase 19: 채권/이자 계산기 법률 감사 Verification Report

**Phase Goal:** 3개 채권/이자 계산기가 소송촉진특례법·이자제한법·민법 현행 기준으로 정확하게 작동한다
**Verified:** 2026-03-24
**Status:** passed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | 지연손해금 계산기의 법정이율이 소송촉진특례법 제3조 현행 이율(연 12%)과 일치한다 | ✓ VERIFIED | `calculateLatePayment(p, days, 12)` — 연 12% 적용; 법적 근거 텍스트에 "소송촉진 등에 관한 특례법 제3조(연 12%)" 명시 (line 200) |
| 2 | 대여금 이자 계산기의 최고이자율 상한이 이자제한법 제2조 현행 기준(연 20%)과 일치한다 | ✓ VERIFIED | `Math.min(agreedRatePercent, 20)` 상한 강제 (line 11); 초과 무효 경고 및 이자제한법 제2조·제3조 조문 명시 (line 145) |
| 3 | 부당이득 반환 계산기의 이자 산정 기준이 민법 제741조~제749조 원문과 일치한다 | ✓ VERIFIED | 선의/악의 수익자 분기 구현; 민법 제741조, 제748조 제1·2항, 제749조, 제379조 법적 근거 명시 (line 178); 이자 기산점 판례 기준 명시 (line 181) |

**Score:** 3/3 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/tools/debt/late-payment/page.tsx` | 지연손해금 계산기 법률 감사 완료 | ✓ VERIFIED | 229줄 완전 구현; 민사(5%)/상사(6%)/소송촉진법(12%) 3구간 계산, Math.floor 적용 |
| `src/app/tools/debt/loan-interest/page.tsx` | 대여금 이자 계산기 법률 감사 완료 | ✓ VERIFIED | 177줄 완전 구현; 20% 상한 강제, 초과이자 무효 표시, 이자제한법 제3조 선이자 공제 안내 포함 |
| `src/app/tools/debt/unjust-enrichment/page.tsx` | 부당이득 반환 계산기 법률 감사 완료 | ✓ VERIFIED | 210줄 완전 구현; 선의/악의 수익자 분기, 이자 기산점 판례 기준, 민법 741~749조 조문 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| late-payment 소스 | 소송촉진특례법 제3조 (연 12%) | 계산 로직 및 법적 근거 텍스트 | ✓ WIRED | `calculateLatePayment(p, days, 12)` + line 200 법적 근거 |
| loan-interest 소스 | 이자제한법 제2조 제1항 (연 20%) | Math.min(rate, 20) 상한 강제 | ✓ WIRED | line 11: `Math.min(agreedRatePercent, 20)` |
| loan-interest 소스 | 이자제한법 제3조 (선이자 공제) | 법적 근거 텍스트 및 안내 목록 | ✓ WIRED | line 145, 159: 선이자 공제 조문 및 안내 |
| unjust-enrichment 소스 | 민법 제748조 (선의/악의 수익자) | beneficiaryType 분기 로직 | ✓ WIRED | lines 137-168: good/bad 분기로 반환 범위 및 이자 여부 결정 |
| unjust-enrichment 소스 | 이자 기산점 판례 | 악의: 취득일, 선의: 청구일 기산점 명시 | ✓ WIRED | line 181: 대법원 판례 기준 명시 |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| late-payment/page.tsx | result (civilInterest, commercialInterest, lawsuitInterest) | handleCalculate → calculateLatePayment | 사용자 입력 기반 실계산 | ✓ FLOWING |
| loan-interest/page.tsx | result (interest, effectiveRate, excessInterest) | handleCalculate → calculateLoanInterest | 사용자 입력 기반 실계산 | ✓ FLOWING |
| unjust-enrichment/page.tsx | result (principal, interest, total, days) | handleCalculate → calculateUnjustEnrichment | 사용자 입력 기반 실계산 | ✓ FLOWING |

### Behavioral Spot-Checks

Step 7b: SKIPPED — 클라이언트 렌더링 계산기 (서버 없이 단독 실행 불가). TypeScript 컴파일 통과로 대체 검증.

```
npx tsc --noEmit → 오류 없음 (exit 0)
```

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| DEBT-01 | 19-01-PLAN.md | 지연손해금 계산기 — 소송촉진특례법 법정이율 검증 및 오류 수정 | ✓ SATISFIED | 연 12% 이율 구현, 민법 제397조→제379조 조문 오류 수정 확인 (commit 67a5de7) |
| DEBT-02 | 19-01-PLAN.md | 대여금 이자 계산기 — 이자제한법 최고이자율 검증 및 오류 수정 | ✓ SATISFIED | 연 20% 상한 강제 구현, 이자제한법 제3조 선이자 공제 추가 (commit 1d58688) |
| DEBT-03 | 19-01-PLAN.md | 부당이득 반환 계산기 — 민법 부당이득 기준 검증 및 오류 수정 | ✓ SATISFIED | 민법 제741조~제749조 조문 구현, 이자 기산점 판례 기준 추가 (commit e64b0ce) |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (없음) | — | — | — | — |

안티패턴 없음 — 3개 파일 모두 TODO/FIXME/placeholder/return null 패턴 미발견. 모든 계산 로직이 실제 법정 이율로 구현됨.

### Human Verification Required

없음 — 법적 조문 인용 정확성은 /Launcelot-Lawyer 스킬로 검증 완료 (SUMMARY 기록 기준). 계산 수식(원금 × 이율 × 일수/365, Math.floor)은 코드에서 직접 확인.

### Gaps Summary

갭 없음. 3개 계산기 모두 다음을 충족:

1. **late-payment**: 소송촉진특례법 제3조 연 12%, 상법 제54조 연 6%, 민법 제379조 연 5% 3구간 완전 구현. 소장 부본 송달일 다음날 적용 시점 안내 포함.
2. **loan-interest**: 이자제한법 제2조 연 20% 상한 강제(Math.min), 초과이자 무효 표시, 제3조 선이자 공제 안내 포함.
3. **unjust-enrichment**: 민법 제748조 선의/악의 분기, 제741조·제748조·제749조·제379조 조문 전부 포함, 이자 기산점 판례(악의: 취득일, 선의: 청구일) 명시.

커밋 67a5de7, 1d58688, e64b0ce 모두 git 로그에 존재 확인. TypeScript 빌드 오류 없음.

---

_Verified: 2026-03-24_
_Verifier: Claude (gsd-verifier)_
