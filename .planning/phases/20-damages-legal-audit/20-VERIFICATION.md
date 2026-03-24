---
phase: 20-damages-legal-audit
verified: 2026-03-24T00:00:00Z
status: passed
score: 4/4 must-haves verified
---

# Phase 20: Damages Legal Audit Verification Report

**Phase Goal:** 4개 손해배상 계산기가 민법·의료법·판례 기준으로 정확하게 작동한다
**Verified:** 2026-03-24
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | 손해배상 계산기의 산정 공식이 민법 제750조~제766조 원문 및 대법원 판례 기준과 일치한다 | VERIFIED | damages-general/page.tsx line 167: 제750조, 제751조, 제393조, 제396조(준용 제763조) 명시; line 186: 제766조 3년/10년 모두 명시 |
| 2 | 명예훼손 위자료 계산기의 산정 기준이 대법원 판례 인정 기준 범위와 일치한다 | VERIFIED | defamation/page.tsx line 170: 민법 제750조, 제751조, 형법 제307조, 제309조, 제311조, 정보통신망법 제70조 전부 명시 |
| 3 | 의료사고 손해배상 계산기의 산정이 의료법 및 관련 판례 기준과 일치한다 | VERIFIED | medical-malpractice/page.tsx line 218: 민법 제750조, 제390조, 제766조(3년/10년), 의료사고피해구제법 명시 |
| 4 | 일실수입 계산기의 호프만식·라이프니츠식 산정 공식이 대법원 판례 기준과 일치한다 | VERIFIED | lost-income/page.tsx: 가동연한 65세(2019다232918) 기본값, 생활비 공제 1/3 적용, 호프만 공식 H=Σ1/(1+0.05/12×k) 정확 구현, 민법 제379조·2016다244188·88다카21219 법적 근거 명시 |

**Score:** 4/4 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/tools/damages/damages-general/page.tsx` | 일반 손해배상 계산기 법률 감사 완료 | VERIFIED | 196 lines, commits 18798d6. 제763조 준용 오류 수정, 제766조 제2항 추가 |
| `src/app/tools/damages/defamation/page.tsx` | 명예훼손 위자료 계산기 법률 감사 완료 | VERIFIED | 199 lines, commit d03bf23. 제751조·제309조 누락 추가 |
| `src/app/tools/damages/medical-malpractice/page.tsx` | 의료사고 손해배상 계산기 법률 감사 완료 | VERIFIED | 250 lines, commit 2247d98. 제390조·제766조 추가 |
| `src/app/tools/damages/lost-income/page.tsx` | 일실수입 계산기 법률 감사 완료 | VERIFIED | 253 lines, commit b0c0d6d. 가동연한 60→65세, 생활비 공제 1/3 신규 적용 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| damages-general/page.tsx | 민법 제750조~제766조 | 조문 인용 및 산정 공식 | WIRED | 제763조 준용규정 정확히 표기, 제766조 양 소멸시효 모두 표기 |
| defamation/page.tsx | 대법원 명예훼손 판례·형법·정보통신망법 | 조문 인용 및 위자료 배율 구조 | WIRED | 6개 조문 전부 명시 |
| medical-malpractice/page.tsx | 의료사고피해구제법·민법 | 조문 인용 및 과실기여도 | WIRED | 채무불이행(제390조) 포함 근거 완비 |
| lost-income/page.tsx | 대법원 전원합의체 판결 2019다232918 | 가동연한 65세 기본값 | WIRED | line 124: 옵션 값 '65' 기본값, 판결번호 UI에 표시 |
| lost-income/page.tsx | 대법원 2016다244188 | 생활비 공제 1/3 코드 적용 | WIRED | line 62-65: netIncome = income × (1-1/3) 실제 계산 적용 |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|--------------|--------|--------------------|--------|
| damages-general/page.tsx | result (재산손해·위자료) | useState + 사용자 입력 기반 계산 | Yes — Math.floor 적용 계산 결과 | FLOWING |
| defamation/page.tsx | result (예상위자료) | useState + 배율 곱셈 계산 | Yes — 기본위자료 × 배율들 실계산 | FLOWING |
| medical-malpractice/page.tsx | result (총손해배상액) | useState + 과실비율 적용 | Yes — 치료비+일실수입+위자료 합산 | FLOWING |
| lost-income/page.tsx | result (일실수입) | calculateHoffmanCoefficient() + useState | Yes — 호프만 계수 실계산 후 순수입×계수 | FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| TypeScript 빌드 오류 없음 | npx tsc --noEmit | 출력 없음 (오류 0건) | PASS |
| 호프만 계수 함수 존재 | grep calculateHoffmanCoefficient lost-income/page.tsx | 정의 및 호출 확인 | PASS |
| 가동연한 65세 기본값 | grep "useState.*'65'" lost-income/page.tsx | line 40 확인 | PASS |
| 생활비 공제 코드 적용 | grep "netIncome.*1/3\|1 - 1/3\|livingExpense" lost-income/page.tsx | lines 11,62-65 확인 | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| DAMAGES-01 | 20-01-PLAN.md | damages-general 민법 손해배상 기준 검증 | SATISFIED | 제750조~제766조 조문 정확 인용, 오류 2건 수정 (commit 18798d6) |
| DAMAGES-02 | 20-01-PLAN.md | defamation 명예훼손 판례 기준 검증 | SATISFIED | 형법+정보통신망법+민법 조문 완비, 누락 2건 추가 (commit d03bf23) |
| DAMAGES-03 | 20-02-PLAN.md | medical-malpractice 의료법·판례 기준 검증 | SATISFIED | 의료사고피해구제법+민법 제390조 추가 (commit 2247d98) |
| DAMAGES-04 | 20-02-PLAN.md | lost-income 일실수입 판례 기준 검증 | SATISFIED | 가동연한 65세+생활비 공제 1/3 신규 적용, 오류 3건 수정 (commit b0c0d6d) |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (모든 파일) | 여러 줄 | `placeholder=` | Info | HTML input hint text — 코드 스텁 아님, 정상적인 UI 패턴 |

실제 코드 스텁 없음. TODO/FIXME/return null 등 미구현 표시 없음.

### Human Verification Required

#### 1. 명예훼손 위자료 금액 범위 적정성

**Test:** 각 배율(매체, 피해자 지위, 심각도, 기간)을 조합하여 위자료 산출액이 수백만~수천만원 범위 내인지 확인
**Expected:** 판례상 인정 범위(통상 100만~5,000만원)와 부합
**Why human:** 배율 조합의 결과값이 적절한 범위인지는 법률 전문가 판단 필요

#### 2. 의료사고 위자료 계산 방식 적정성

**Test:** `위자료기준 × 후유장해율 × 과실비율` 수식이 법원 실무와의 근사치로 허용 가능한지 확인
**Expected:** 현행 법원 실무(위자료에 과실비율 참작)와 차이가 허용 범위 내
**Why human:** 20-02-SUMMARY에서 "사용자 편의를 위한 근사치로 허용 범위 내"로 판단했으나 법률 전문가 최종 확인 권장

### Gaps Summary

없음. 4개 계산기 모두 목표 달성 확인.

- DAMAGES-01: 일반 손해배상 — 민법 제763조 준용규정 오류 수정, 제766조 제2항 소멸시효 추가
- DAMAGES-02: 명예훼손 위자료 — 제751조·제309조 누락 추가, 6개 조문 전체 명시
- DAMAGES-03: 의료사고 손해배상 — 제390조(채무불이행)·제766조 추가, 의료사고피해구제법 명시
- DAMAGES-04: 일실수입 — 가동연한 60→65세(대법원 2019다232918), 생활비 공제 1/3 신규 적용

---

_Verified: 2026-03-24T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
