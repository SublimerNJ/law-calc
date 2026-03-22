# 법률 계산기 (Legal Calculator Hub)

## What This Is

애드센스 수익을 위한 한국 법률 계산기 통합 웹사이트. 소송비용, 가사/가족법, 노동/근로, 세금, 부동산, 교통/형사, 채권/이자, 손해배상 등 70개의 법률 관련 계산기를 하나의 고급스러운 법률 테마 웹사이트에 통합한다. 대한민국 법률 기준으로 정확한 계산을 제공하며, 패럴랙스 디자인으로 신뢰감 있는 전문적 UI를 구현한다.

## Core Value

법률 관련 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구를 제공하여, 사용자가 머무르고 반복 방문하게 만든다 (= 애드센스 수익 극대화).

## Current Milestone: v1.1 계산기 품질 개선

**Goal:** 70개 계산기 전체를 유저 시나리오 기반으로 점검하여 기대-결과 불일치, 계산 정확도, UX 문제를 수정한다.

**Target features:**
- 유저 기대와 실제 결과의 불일치 수정 (이름 vs 제공 기능)
- 계산 정확도 검증 및 수정 (법률 기준 대비)
- UX 개선 (입력 가이드, 결과 이해도, 흐름)

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 통합 랜딩페이지: 카테고리별로 70개 계산기를 탐색할 수 있는 메인 페이지
- [ ] 소송/법원 계산기 9개 (변호사보수 소송비용산입, 소송비용, 인지대, 송달료, 소액사건, 지급명령, 민사조정, 가사소송, 전자소송)
- [ ] 가사/가족법 계산기 8개 (위자료, 양육비, 재산분할, 상속세, 법정상속분, 유류분, 증여세, 상속순위)
- [ ] 노동/근로 계산기 14개 (퇴직금, 해고예고수당, 연차수당, 연장근로수당, 주휴수당, 최저임금위반, 부당해고보상금, 산재보험급여, 출산휴가급여, 육아휴직급여, 실업급여, 통상임금, 평균임금, 휴업수당)
- [ ] 세금 계산기 12개 (소득세, 양도소득세, 종합소득세, 취득세, 종합부동산세, 재산세, 등록면허세, 부가가치세, 증권거래세, 연말정산, 4대보험료, 월세세액공제)
- [ ] 부동산 계산기 7개 (임대차보증금반환, 전월세전환율, 중개보수, 청약가점, DSR, LTV, DTI)
- [ ] 교통/형사 계산기 6개 (교통사고합의금, 과실비율, 음주운전처벌, 속도위반벌금, 벌금/과태료, 보석금)
- [ ] 채권/이자 계산기 4개 (법정이자, 지연손해금, 대여금이자, 부당이득반환)
- [ ] 손해배상 계산기 6개 (손해배상, 명예훼손손해배상, 의료사고손해배상, 일실수입, 장해등급보상금, 제조물책임손해배상)
- [ ] 기타 법률도구 4개 (소멸시효, 국선변호사자격확인, 법률구조대상확인, 내용증명작성도우미)
- [ ] 법률 테마 디자인 (패럴랙스 효과, 고급스러운 전문 UI)
- [ ] SEO 최적화 (각 계산기별 메타태그, sitemap, 구조화 데이터)
- [ ] 애드센스 광고 배치 최적화
- [ ] 반응형 디자인 (모바일/태블릿/데스크탑)

### Out of Scope

- 회원가입/로그인 시스템 — 불필요, 도구 사이트는 익명 접근이 핵심
- 백엔드 API/DB — 모든 계산은 클라이언트 사이드에서 수행
- 법률 상담 기능 — 법률 자문은 제공하지 않음, 계산 도구만 제공
- 다국어 지원 — 한국어 전용, 한국 법률 기준

## Context

- loop creation 1에서 이미 100개의 독립적인 도구 웹사이트를 Next.js로 제작한 경험이 있음
- 이번에는 독립 앱이 아닌 하나의 통합 웹사이트로 구성
- 기존 스택: Next.js 16 + React 19 + Tailwind v4 + TypeScript
- 패럴랙스 디자인 기법 적용하여 고급스러운 법률 사이트 느낌
- 애드센스 승인 및 수익 극대화가 주 목적
- 한국 법률 기준 (2025-2026년 기준 법률/세율 적용)

## Constraints

- **Tech Stack**: Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript (기존과 동일)
- **Rendering**: 모든 계산은 클라이언트 사이드 (서버/DB 없음)
- **Design**: 패럴랙스 효과 적용, 법률 전문 테마, 신뢰감 있는 UI
- **SEO**: 각 계산기별 개별 페이지, 메타태그, sitemap 필수
- **AdSense**: 광고 정책 준수, 적절한 광고 배치
- **Scale**: 70개 계산기 전부 구현

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 통합 웹사이트 (독립 앱 X) | 70개를 하나의 사이트로 관리 용이, SEO 시너지 | — Pending |
| 클라이언트 사이드 계산 | 서버 비용 없음, 빠른 응답, 호스팅 단순화 | — Pending |
| 패럴랙스 디자인 | 법률 사이트의 전문성과 신뢰감 연출 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-23 after milestone v1.1 start — calculator quality improvement*
