---
phase: 18-traffic-criminal-legal-audit
plan: "01"
subsystem: traffic-calculators
tags: [legal-audit, traffic, accident-settlement, drunk-driving, launcelot-lawyer]
dependency_graph:
  requires: []
  provides: [TRAFFIC-01, TRAFFIC-02]
  affects: [src/app/tools/traffic/accident-settlement/page.tsx, src/app/tools/traffic/drunk-driving/page.tsx]
tech_stack:
  added: []
  patterns: [launcelot-lawyer-audit, law-go-kr-verification]
key_files:
  created: []
  modified:
    - src/app/tools/traffic/accident-settlement/page.tsx
    - src/app/tools/traffic/drunk-driving/page.tsx
decisions:
  - 음주운전 재범 가중처벌 근거법령: 특정범죄가중처벌법이 아닌 도로교통법 제148조의2 제1항
  - 교통사고 합의금 법적 근거: 교통사고처리특례법(형사특례)이 아닌 자배법 제3조 + 민법 제396조/750조(민사배상)
metrics:
  duration: 10m
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 18 Plan 01: Traffic Legal Audit Summary

교통사고 합의금 계산기(accident-settlement)와 음주운전 처벌 계산기(drunk-driving) 2개에 대해 /Launcelot-Lawyer 스킬로 법령 원문 대조 검증 후 총 4건 오류 수정.

## Decisions Made

- **음주운전 재범 가중처벌 법령명**: "특정범죄가중처벌법"이 아닌 "도로교통법 제148조의2 제1항" (10년 이내 2회 이상 전력 시 적용)
- **교통사고 합의금 법적 근거**: 교통사고처리특례법은 형사처벌 특례법이므로 민사 합의금 산정 근거로 부적절 → 자동차손해배상 보장법 제3조 + 민법 제396조/제750조로 수정

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | accident-settlement 법률 감사 | c014021 | src/app/tools/traffic/accident-settlement/page.tsx |
| 2 | drunk-driving 법률 감사 | 22b0bb8 | src/app/tools/traffic/drunk-driving/page.tsx |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] 교통사고 합의금 법적 근거 법령명 오류**
- Found during: Task 1
- Issue: 법적 근거로 "교통사고처리특례법"이 표시됨. 교통사고처리특례법은 형사처벌 특례(공소권 없음 등)를 규정하는 법으로, 민사 합의금(손해배상액) 산정 근거가 아님
- Fix: 자동차손해배상 보장법 제3조(운행자 책임), 민법 제396조(과실상계), 민법 제750조(불법행위 손해배상)로 수정
- Files modified: src/app/tools/traffic/accident-settlement/page.tsx
- Commit: c014021

**2. [Rule 1 - Bug] 음주운전 재범 가중형량 오류**
- Found during: Task 2
- Issue: 2회 이상 전력 가중형량이 "2년 이상 5년 이하 징역 또는 1,000만원 이상 2,000만원 이하 벌금"으로 표시됨. 도로교통법 제148조의2 제1항은 10년 이내 2회 이상 위반 시 2년 이상 6년 이하 징역 또는 1,000만원 이상 3,000만원 이하 벌금
- Fix: 6년 이하 징역, 3,000만원 이하 벌금으로 수정
- Files modified: src/app/tools/traffic/drunk-driving/page.tsx
- Commit: 22b0bb8

**3. [Rule 1 - Bug] 음주운전 재범 가중처벌 법령명 오류**
- Found during: Task 2
- Issue: "특정범죄가중처벌법 적용 대상"으로 표시됨. 음주운전 재범 가중처벌은 도로교통법 제148조의2 제1항 적용 (특가법 아님)
- Fix: "도로교통법 제148조의2 제1항 가중처벌"로 수정, 10년 이내 2회 이상 전력 조건 명시
- Files modified: src/app/tools/traffic/drunk-driving/page.tsx
- Commit: 22b0bb8

**4. [Rule 2 - Missing] BAC 기준표 측정거부 항목 누락**
- Found during: Task 2
- Issue: BAC 기준표에 음주측정 거부 처벌 기준이 없음. 도로교통법 제148조의2 제1항에서 측정거부 시 1년 이상 6년 이하 징역 또는 500만원 이상 3,000만원 이하 벌금 규정
- Fix: 기준표에 "측정거부" 행 추가
- Files modified: src/app/tools/traffic/drunk-driving/page.tsx
- Commit: 22b0bb8

## Verified Legal Accuracy

### accident-settlement (교통사고 합의금)
- 과실상계: 민법 제396조 기반, Math.floor 버림 적용 — 정확
- 무과실책임: 자배법 제3조 원칙 반영 — 정확
- 후유장해 14등급 위자료 테이블 — 판례 인정 범위 내
- 법적 근거: 자동차손해배상 보장법 제3조, 민법 제396조, 제750조 — 수정 완료

### drunk-driving (음주운전 처벌)
- BAC 처벌 구간 0.03%/0.08%/0.2%: 도로교통법 제44조, 제148조의2 원문과 일치
- 형사처벌 기준: 모든 구간 법령 원문과 일치
- 재범 가중처벌: 도로교통법 제148조의2 제1항 기준으로 수정 완료
- 측정거부: 기준표에 추가 완료

## Known Stubs

없음.

## Self-Check: PASSED

- c014021 존재 확인
- 22b0bb8 존재 확인
- accident-settlement/page.tsx 수정 확인
- drunk-driving/page.tsx 수정 확인
