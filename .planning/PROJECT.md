# 법률 계산기 (Legal Calculator Hub)

## What This Is

애드센스 수익을 위한 한국 법률 계산기 통합 웹사이트. 소송비용, 가사/가족법, 노동/근로, 세금, 부동산, 교통/형사, 채권/이자, 손해배상 등 57개의 법률 관련 계산기를 하나의 고급스러운 라이트 테마 기반 법률 웹사이트에 통합한다. 대한민국 법률 기준으로 정확한 계산을 제공하며, 성능 최적화된 패럴랙스 디자인으로 신뢰감 있는 전문적 UI를 구현한다.

## Core Value

법률 관련 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구를 제공하여, 사용자가 머무르고 반복 방문하게 만든다 (= 애드센스 수익 극대화).

## Current Milestone: v1.3 전체 계산기 법률 정확성 감사

**Goal:** /Launcelot-Lawyer 스킬을 사용하여 57개 전체 계산기의 법률 정확성을 검증하고, 발견된 오류를 수정한다.

**Target features:**
- 소송/법원 계산기 7개 법률 검증 및 오류 수정
- 가사/가족법 계산기 6개 법률 검증 및 오류 수정
- 노동/근로 계산기 12개 법률 검증 및 오류 수정
- 세금 계산기 10개 법률 검증 및 오류 수정
- 부동산 계산기 7개 법률 검증 및 오류 수정
- 교통/형사 계산기 4개 법률 검증 및 오류 수정
- 채권/이자 계산기 3개 법률 검증 및 오류 수정
- 손해배상 계산기 4개 법률 검증 및 오류 수정
- 기타 법률도구 4개 법률 검증 및 오류 수정

## Requirements

### Validated

- ✓ 통합 랜딩페이지: 카테고리별로 계산기를 탐색할 수 있는 메인 페이지 — v1.1
- ✓ 소송/법원 계산기 — v1.1
- ✓ 가사/가족법 계산기 — v1.1
- ✓ 노동/근로 계산기 — v1.1
- ✓ 세금 계산기 — v1.1
- ✓ 부동산 계산기 — v1.1
- ✓ 교통/형사 계산기 — v1.1
- ✓ 채권/이자 계산기 — v1.1
- ✓ 손해배상 계산기 — v1.1
- ✓ 기타 법률도구 — v1.1
- ✓ SEO 최적화 — v1.1
- ✓ 반응형 디자인 — v1.1
- ✓ 전면 라이트 테마 적용 — v1.2
- ✓ 성능 최적화된 패럴랙스 스크롤링 — v1.2
- ✓ AI 느낌 탈피 및 전문적인 법률 도구 UI 디자인 개편 — v1.2

### Active

- [ ] 전체 57개 계산기 법률 정확성 감사 (/Launcelot-Lawyer 스킬 기반)
- [ ] 발견된 법률 오류 수정

### Out of Scope

- 회원가입/로그인 시스템 — 불필요, 도구 사이트는 익명 접근이 핵심
- 백엔드 API/DB — 모든 계산은 클라이언트 사이드에서 수행
- 법률 상담 기능 — 법률 자문은 제공하지 않음, 계산 도구만 제공
- 다국어 지원 — 한국어 전용, 한국 법률 기준
- 다크 테마 — 전문적이고 일관된 법률 문서 스타일을 위해 라이트 테마로 통합 (v1.2)

## Context

- 57개 계산기 전체 구축 완료 (v1.1)
- UI/UX 라이트 테마 및 패럴랙스 성능 최적화 개편 완료 (v1.2)
- attorney-fee 계산기 법률 검증에서 6건의 중대 오류 발견됨 (v1.3 착수 계기)
- 기존 스택: Next.js 16 + React 19 + Tailwind v4 + TypeScript
- 애드센스 승인 및 수익 극대화가 주 목적
- 한국 법률 기준 (2025-2026년 기준 법률/세율 적용)

## Constraints

- **Tech Stack**: Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript
- **Rendering**: 모든 계산은 클라이언트 사이드 (서버/DB 없음)
- **Design**: 패럴랙스 효과 적용, 법률 전문 테마 (라이트 톤), 신뢰감 있는 UI
- **SEO**: 각 계산기별 개별 페이지, 메타태그, sitemap 필수
- **AdSense**: 광고 정책 준수, 적절한 광고 배치
- **법률 검증**: 반드시 /Launcelot-Lawyer 스킬을 사용하여 법령 원문 대조 기반으로 검증

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 통합 웹사이트 (독립 앱 X) | 70개를 하나의 사이트로 관리 용이, SEO 시너지 | ✓ Good |
| 클라이언트 사이드 계산 | 서버 비용 없음, 빠른 응답, 호스팅 단순화 | ✓ Good |
| 라이트 테마 & 깔끔한 UI 전면 적용 | AI 생성 느낌을 지우고 법률 서비스의 신뢰감을 줌 | ✓ Good |
| 성능 최적화된 패럴랙스 | 모바일 비활성화 및 CSS transform으로 60fps 보장 | ✓ Good |
| /Launcelot-Lawyer 스킬 기반 법률 감사 | attorney-fee에서 6건 중대 오류 발견, 전체 감사 필수 | v1.3 |

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
*Last updated: 2026-03-24 — v1.3 milestone started*
