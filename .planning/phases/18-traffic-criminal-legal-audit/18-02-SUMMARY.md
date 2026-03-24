---
phase: 18-traffic-criminal-legal-audit
plan: "02"
subsystem: traffic-calculators
tags: [legal-audit, fine-penalty, bail, 도로교통법, 형사소송법]
dependency_graph:
  requires: []
  provides: [fine-penalty-audited, bail-audited]
  affects: [src/app/tools/traffic/fine-penalty/page.tsx, src/app/tools/traffic/bail/page.tsx]
tech_stack:
  added: []
  patterns: [Launcelot-Lawyer legal audit, law.go.kr verification]
key_files:
  created: []
  modified:
    - src/app/tools/traffic/fine-penalty/page.tsx
    - src/app/tools/traffic/bail/page.tsx
decisions:
  - 보험 미가입은 과태료가 아닌 형사처벌 대상 (자동차손해배상보장법 제46조 제2항)
  - 보석금 상한 5억원은 법정 규정 아닌 실무상 참고치 (형사소송법에 상한 없음)
  - 범칙금 계산기에 속도위반 구간별 4개 항목 추가 (20이하, 20-40, 40-60, 60초과)
metrics:
  duration: "15min"
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_modified: 2
---

# Phase 18 Plan 02: 범칙금·과태료 및 보석 계산기 법률 감사 Summary

**One-liner:** 범칙금 계산기에 속도위반 구간 추가 및 보험 미가입 형사처벌 수정, 보석 계산기에 형사소송법 제94~103조 조문 완전 명시

## What Was Built

/Launcelot-Lawyer 스킬로 2개 계산기를 법령 원문과 대조 검증하고 발견된 오류를 수정했다.

### Task 1: fine-penalty(범칙금·과태료) 계산기 (TRAFFIC-03)

**검증 결과 및 수정 사항:**

1. **[오류 수정] 보험 미가입 운행**: 과태료 150,000원으로 표시되어 있었으나, 자동차손해배상보장법 제46조 제2항에 따르면 1년 이하 징역 또는 1,000만원 이하 벌금의 **형사처벌 대상**. 음주운전처럼 `fine: null, penalty: null, note: '형사처벌...'`로 수정.

2. **[누락 항목 추가] 속도위반 구간별 4개 항목 추가**: 도로교통법 시행령 별표 8·10의 핵심 항목인 속도위반이 전혀 없었음. 승용차 기준으로 추가:
   - 20km/h 이하: 범칙금 30,000원 / 과태료 40,000원
   - 20~40km/h: 범칙금 60,000원 / 과태료 70,000원
   - 40~60km/h: 범칙금 90,000원 / 과태료 100,000원
   - 60km/h 초과: 범칙금 120,000원 / 과태료 130,000원

3. **[항목 추가] 음주운전 0.08% 이상**: 0.03~0.08% 항목만 있었고 0.08% 초과 항목 누락. 추가.

4. **[법령 명칭 보완]** 하단 법적 근거에 도로교통법 시행령 별표 번호, 질서위반행위규제법 조문, 자동차관리법, 자동차손해배상보장법 명시.

**정확성 확인 (변경 없음):**
- 신호위반 승용차 범칙금 6만원 / 과태료 7만원: 정확
- 중앙선침범, 안전벨트, 휴대폰 사용 금액: 정확
- 불법 주정차 일반/소방 구역: 정확
- 정기검사 미이행 30,000원/115,000원: 정확
- 자진신고 20% 감경: 질서위반행위규제법 제18조 정확
- 가산금 월 3%: 질서위반행위규제법 제24조의3 정확

### Task 2: bail(보석) 계산기 (TRAFFIC-04)

**검증 결과 및 수정 사항:**

1. **[법령 조문 보완]** 기존 "형사소송법 제94조, 제99조"만 표시 → 관련 조문 전체 명시:
   - 제94조(보석), 제95조(필요적 보석), 제96조(임의적 보석)
   - 제99조(보석 조건), 제102조(보석 취소), 제103조(보증금 몰취)
   - 계산 근거 섹션과 신청 안내 섹션 양쪽 모두 수정

2. **[설명 명확화]** 보석금 상한 5억원: 형사소송법에 보석금 상한 명문 규정 없음 → "실무상 참고 상한 5억원 (법정 상한 없음)"으로 수정. 코드 주석도 추가.

**정확성 확인 (변경 없음):**
- 보석금 산정 방식(죄종별 범위, 재산 기준, 전과·도주·증거인멸 위험 가중): 형사소송법 제99조의 실무 기준에 부합
- 죄종별 보석금 범위(사기 300~3천만, 마약 1천~1억 등): 실무 수준에 적합
- 법원 재량 경고문: 적절히 표시되어 있음

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing] 속도위반 구간별 항목 누락**
- **Found during:** Task 1
- **Issue:** 도로교통법 시행령 별표 8·10의 핵심 항목인 속도위반(4단계 구간)이 전혀 없음
- **Fix:** 승용차 기준 속도위반 4개 항목 추가 (금액 도로교통법 시행령 별표 기준)
- **Files modified:** src/app/tools/traffic/fine-penalty/page.tsx
- **Commit:** 7fb091f

**2. [Rule 1 - Bug] 보험 미가입 과태료 오류**
- **Found during:** Task 1
- **Issue:** 보험 미가입을 과태료 150,000원으로 표시 — 실제로는 자동차손해배상보장법 제46조 제2항의 형사처벌 대상
- **Fix:** fine: null, penalty: null로 변경, 형사처벌 내용 note에 명시
- **Files modified:** src/app/tools/traffic/fine-penalty/page.tsx
- **Commit:** 7fb091f

## Known Stubs

None.

## Self-Check: PASSED
