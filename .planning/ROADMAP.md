# Roadmap: 법률 도구 (Legal Tools)

**Created:** 2026-03-23
**Milestone:** v1.0 — 70개 법률 계산기 통합 웹사이트

## Phase Overview

| Phase | Name | Requirements | Est. Complexity |
|-------|------|-------------|-----------------|
| 1 | 4/4 | Complete   | 2026-03-22 |
| 2 | 2/3 | In Progress|  |
| 3 | 3/3 | Complete   | 2026-03-22 |
| 4 | 5/5 | Complete   | 2026-03-22 |
| 5 | 4/4 | Complete   | 2026-03-22 |
| 6 | 부동산 계산기 | REALTY-01~07 | Medium |
| 7 | 1/2 | In Progress|  |
| 8 | 채권/이자 계산기 | DEBT-01~04 | Low |
| 9 | 손해배상 계산기 | DAMAGES-01~06 | Medium |
| 10 | 1/2 | In Progress|  |

## Phase 1: 프로젝트 기반 & 디자인 시스템

**Goal:** Next.js 프로젝트 scaffolding, 패럴랙스 히어로, 공통 컴포넌트, 카테고리 데이터 구조 완성

**Requirements:** INFRA-01~06, DESIGN-01~05

**Success Criteria:**
- `npm run dev`로 로컬 실행 가능
- 패럴랙스 히어로 섹션이 스크롤 시 동작
- 카테고리별 빈 섹션이 메인 페이지에 표시
- 다크/라이트 테마 전환 동작
- 공통 계산기 레이아웃 컴포넌트 존재


**Plans:** 4/4 plans complete

Plans:
- [x] 01-01-PLAN.md — Next.js scaffolding, design tokens, tools-data (70 tools)
- [x] 01-02-PLAN.md — Header, Footer, ThemeToggle, layout wiring
- [x] 01-03-PLAN.md — Parallax hero, scroll animations
- [x] 01-04-PLAN.md — Main page assembly, Card, CalculatorLayout, SEO

## Phase 2: 소송/법원 계산기 (9개)

**Goal:** 소송 관련 비용 계산기 9개 구현

**Requirements:** COURT-01~09

**Success Criteria:**
- 9개 페이지 각각 독립 라우트로 접근 가능
- 입력값에 따른 정확한 계산 결과 출력
- 메인 페이지 카테고리에서 링크 동작

**Plans:** 2/3 plans executed

Plans:
- [x] 02-01-PLAN.md — attorney-fee, lawsuit-cost, stamp-fee (COURT-01~03)
- [x] 02-02-PLAN.md — service-fee, small-claims, payment-order (COURT-04~06)
- [x] 02-03-PLAN.md — civil-mediation, family-court, e-court (COURT-07~09)

## Phase 3: 가사/가족법 계산기 (8개)

**Goal:** 가사/가족법 관련 계산기 8개 구현

**Requirements:** FAMILY-01~08

**Success Criteria:**
- 8개 계산기 각각 독립 라우트
- 한국 법률 기준 정확한 계산

**Plans:** 3/3 plans complete

Plans:
- [x] 03-01-PLAN.md — alimony, child-support, property-division (FAMILY-01~03)
- [x] 03-02-PLAN.md — inheritance-tax, legal-inheritance, forced-heirship (FAMILY-04~06)
- [x] 03-03-PLAN.md — gift-tax, inheritance-order (FAMILY-07~08)

## Phase 4: 노동/근로 계산기 (14개)

**Goal:** 노동/근로 관련 계산기 14개 구현

**Requirements:** LABOR-01~14

**Success Criteria:**
- 14개 계산기 각각 독립 라우트
- 2026년 최저임금 등 최신 기준 반영

**Plans:** 5/5 plans complete

Plans:
- [x] 04-01-PLAN.md — severance-pay, dismissal-notice, annual-leave-pay (LABOR-01~03)
- [x] 04-02-PLAN.md — overtime-pay, weekly-holiday-pay, minimum-wage-check (LABOR-04~06)
- [x] 04-03-PLAN.md — unfair-dismissal, industrial-accident, maternity-leave (LABOR-07~09)
- [x] 04-04-PLAN.md — parental-leave, unemployment-benefit, ordinary-wage (LABOR-10~12)
- [x] 04-05-PLAN.md — average-wage, shutdown-allowance (LABOR-13~14)

## Phase 5: 세금 계산기 (12개)

**Goal:** 세금 관련 계산기 12개 구현

**Requirements:** TAX-01~12

**Success Criteria:**
- 12개 계산기 각각 독립 라우트
- 2026년 세율 기준 반영

**Plans:** 4/4 plans complete

Plans:
- [x] 05-01-PLAN.md — income-tax, capital-gains-tax, comprehensive-income-tax (TAX-01~03)
- [x] 05-02-PLAN.md — acquisition-tax, comprehensive-property-tax, property-tax (TAX-04~06)
- [x] 05-03-PLAN.md — registration-tax, vat, securities-tax (TAX-07~09)
- [x] 05-04-PLAN.md — year-end-tax, four-insurances, rent-tax-credit (TAX-10~12)

## Phase 6: 부동산 계산기 (7개)

**Goal:** 부동산 관련 계산기 7개 구현

**Requirements:** REALTY-01~07

**Success Criteria:**
- 7개 계산기 각각 독립 라우트
- DSR/LTV/DTI 등 금융 계산 정확성

**Plans:** 3 plans

Plans:
- [x] 06-01-PLAN.md — deposit-return, rent-conversion, brokerage-fee (REALTY-01~03)
- [x] 06-02-PLAN.md — subscription-score, dsr (REALTY-04~05)
- [x] 06-03-PLAN.md — ltv, dti (REALTY-06~07)

## Phase 7: 교통/형사 계산기 (6개)

**Goal:** 교통/형사 관련 계산기 6개 구현

**Requirements:** TRAFFIC-01~06

**Success Criteria:**
- 6개 계산기 각각 독립 라우트
- 음주운전 처벌 기준 등 최신 법률 반영

**Plans:** 1/2 plans executed

Plans:
- [x] 07-01-PLAN.md — accident-settlement, fault-ratio, drunk-driving (TRAFFIC-01~03)
- [x] 07-02-PLAN.md — speeding-fine, fine-penalty, bail (TRAFFIC-04~06)

## Phase 8: 채권/이자 계산기 (4개)

**Goal:** 채권/이자 관련 계산기 4개 구현

**Requirements:** DEBT-01~04

**Success Criteria:**
- 4개 계산기 각각 독립 라우트
- 법정이자율 정확 반영

**Plans:** 2 plans

Plans:
- [x] 08-01-PLAN.md — legal-interest, late-payment (DEBT-01~02)
- [x] 08-02-PLAN.md — loan-interest, unjust-enrichment (DEBT-03~04)

## Phase 9: 손해배상 계산기 (6개)

**Goal:** 손해배상 관련 계산기 6개 구현

**Requirements:** DAMAGES-01~06

**Success Criteria:**
- 6개 계산기 각각 독립 라우트
- 일실수입 등 복잡한 계산 로직 정확

**Plans:** 2 plans

Plans:
- [x] 09-01-PLAN.md — damages-general, defamation, medical-malpractice (DAMAGES-01~03)
- [x] 09-02-PLAN.md — lost-income, disability-compensation, product-liability (DAMAGES-04~06)

## Phase 10: 기타 법률도구 & 마무리 (4개)

**Goal:** 나머지 도구 4개 + 전체 QA + SEO 마무리

**Requirements:** MISC-01~04

**Success Criteria:**
- 4개 도구 구현 완료
- 전체 70개 도구 메인 페이지에서 접근 가능
- sitemap.ts 생성
- 전체 빌드 성공 (`npm run build`)

---
*Roadmap created: 2026-03-23*
