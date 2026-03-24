# Roadmap: 법률 도구 (Legal Calculator Hub)

**Created:** 2026-03-23
**Milestone:** v1.3 전체 계산기 법률 정확성 감사

## Milestones

- ✅ **v1.0** — 초기 프로젝트 셋업 (shipped)
- ✅ **v1.1 계산기 품질 개선** — Phases 1-10 (shipped 2026-03-23)
- ✅ **v1.2 UI/UX 개편 및 라이트 테마 적용** — Phases 11-12 (shipped 2026-03-23)
- 🚧 **v1.3 전체 계산기 법률 정확성 감사** — Phases 13-21 (active)

## Phases

<details>
<summary>✅ v1.1 계산기 품질 개선 (Phases 1-10) — SHIPPED 2026-03-23</summary>

- [x] Phase 1: 프로젝트 기반 & 디자인 시스템 (4/4 plans)
- [x] Phase 2: 소송/법원 계산기 (3/3 plans)
- [x] Phase 3: 가사/가족법 계산기 (3/3 plans)
- [x] Phase 4: 노동/근로 계산기 (5/5 plans)
- [x] Phase 5: 세금 계산기 (4/4 plans)
- [x] Phase 6: 부동산 계산기 (3/3 plans)
- [x] Phase 7: 교통/형사 계산기 (2/2 plans)
- [x] Phase 8: 채권/이자 계산기 (2/2 plans)
- [x] Phase 9: 손해배상 계산기 (2/2 plans)
- [x] Phase 10: 기타 법률도구 & 마무리 (2/2 plans)

</details>

<details>
<summary>✅ v1.2 UI/UX 개편 및 라이트 테마 적용 (Phases 11-12) — SHIPPED 2026-03-23</summary>

- [x] Phase 11: 라이트 테마 전환 및 디자인 시스템 개편 (3/3 plans)
- [x] Phase 12: 패럴랙스 UI 적용 및 고도화 (2/2 plans)

</details>

### 🚧 v1.3 전체 계산기 법률 정확성 감사 (Phases 13-21)

- [x] **Phase 13: 소송/법원 계산기 법률 감사** — 6개 계산기 법령 원문 대조 검증 및 오류 수정 (completed 2026-03-24)
- [x] **Phase 14: 가사/가족법 계산기 법률 감사** — 6개 계산기 민법·가사소송법 기준 검증 및 오류 수정 (completed 2026-03-24)
- [x] **Phase 15: 노동/근로 계산기 법률 감사** — 12개 계산기 근로기준법·노동법령 기준 검증 및 오류 수정 (completed 2026-03-24)
- [x] **Phase 16: 세금 계산기 법률 감사** — 10개 계산기 세법·지방세법 기준 검증 및 오류 수정 (completed 2026-03-24)
- [x] **Phase 17: 부동산 계산기 법률 감사** — 7개 계산기 주택임대차보호법·감독규정 기준 검증 및 오류 수정 (completed 2026-03-24)
- [ ] **Phase 18: 교통/형사 계산기 법률 감사** — 4개 계산기 도로교통법·형사소송법 기준 검증 및 오류 수정
- [ ] **Phase 19: 채권/이자 계산기 법률 감사** — 3개 계산기 이자제한법·소송촉진특례법 기준 검증 및 오류 수정
- [ ] **Phase 20: 손해배상 계산기 법률 감사** — 4개 계산기 민법·판례 기준 검증 및 오류 수정
- [ ] **Phase 21: 기타 법률도구 법률 감사** — 4개 계산기 우편법·형사소송법·민법 기준 검증 및 오류 수정

## Phase Details

### Phase 13: 소송/법원 계산기 법률 감사
**Goal**: 6개 소송/법원 계산기가 현행 법령 원문 기준으로 정확하게 작동한다
**Depends on**: Nothing (first phase of v1.3)
**Requirements**: COURT-01, COURT-02, COURT-03, COURT-04, COURT-05, COURT-06
**Success Criteria** (what must be TRUE):
  1. lawsuit-cost 계산기의 인지대·송달료 계산이 민사소송등 인지법 및 송달료 규칙 원문과 일치한다
  2. small-claims 계산기가 소액사건심판법의 소가 기준(3,000만원 이하) 및 비용 산정 기준과 일치한다
  3. payment-order, civil-mediation, family-court, e-court 각 계산기의 비용 산정이 해당 법령 원문과 일치한다
  4. 전자소송 할인율이 현행 전자소송 촉진에 관한 규정 기준과 일치한다
  5. 발견된 모든 오류가 코드에서 수정되고 수정 내용이 검증된다
**Plans:** 3/3 plans complete
Plans:
- [x] 13-01-PLAN.md — civil-mediation + family-court 법률 감사 (COURT-01~05)
- [x] 13-02-PLAN.md — e-court 법률 감사 (COURT-06)

### Phase 14: 가사/가족법 계산기 법률 감사
**Goal**: 6개 가사/가족법 계산기가 민법·가사소송법·상속세및증여세법 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: FAMILY-01, FAMILY-02, FAMILY-03, FAMILY-04, FAMILY-05, FAMILY-06
**Success Criteria** (what must be TRUE):
  1. alimony 계산기의 위자료 산정 기준이 대법원 판례 기반 산정 기준과 일치한다
  2. child-support 계산기가 서울가정법원 양육비 산정기준표(최신판) 금액과 일치한다
  3. property-division 계산기의 재산분할 비율이 민법 및 판례 기준과 일치한다
  4. inheritance-tax 계산기의 상속세·증여세 세율 및 공제 한도가 상속세및증여세법 원문과 일치한다
  5. forced-heirship 유류분 비율과 inheritance-order 상속순위·상속분이 민법 제1000조~제1118조 원문과 일치한다
**Plans:** 2/2 plans complete
Plans:
- [x] 14-01-PLAN.md — alimony, child-support, property-division 법률 감사
- [x] 14-02-PLAN.md — inheritance-tax, forced-heirship, inheritance-order 법률 감사

### Phase 15: 노동/근로 계산기 법률 감사
**Goal**: 12개 노동/근로 계산기가 근로기준법·노동 관련 법령 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: LABOR-01, LABOR-02, LABOR-03, LABOR-04, LABOR-05, LABOR-06, LABOR-07, LABOR-08, LABOR-09, LABOR-10, LABOR-11, LABOR-12
**Success Criteria** (what must be TRUE):
  1. severance-pay 계산기가 근로자퇴직급여보장법의 퇴직금 산정 공식(평균임금 × 30일 × 근속연수/365)과 일치한다
  2. overtime-pay, weekly-holiday-pay, annual-leave-pay 계산기의 가산율이 근로기준법 원문(50%, 100% 등)과 일치한다
  3. minimum-wage-check 계산기의 기준 시급이 고용노동부 고시 최저임금(2025년 10,030원)과 일치한다
  4. maternity-leave, parental-leave, unemployment-benefit 계산기의 급여 상·하한액이 현행 법령·고시와 일치한다
  5. industrial-accident, unfair-dismissal, dismissal-notice, shutdown-allowance 계산기의 산정 기준이 해당 법령 원문과 일치한다
**Plans:** 4/4 plans complete
Plans:
- [x] 15-01-PLAN.md — severance-pay, dismissal-notice, shutdown-allowance 법률 감사
- [x] 15-02-PLAN.md — overtime-pay, weekly-holiday-pay, annual-leave-pay 법률 감사
- [x] 15-03-PLAN.md — minimum-wage-check, unfair-dismissal, industrial-accident 법률 감사
- [x] 15-04-PLAN.md — maternity-leave, parental-leave, unemployment-benefit 법률 감사

### Phase 16: 세금 계산기 법률 감사
**Goal**: 10개 세금 계산기가 소득세법·지방세법·조세특례제한법 현행 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: TAX-01, TAX-02, TAX-03, TAX-04, TAX-05, TAX-06, TAX-07, TAX-08, TAX-09, TAX-10
**Success Criteria** (what must be TRUE):
  1. capital-gains-tax 계산기의 양도소득세 세율 구간 및 장기보유특별공제율이 소득세법 원문과 일치한다
  2. comprehensive-income-tax 계산기의 종합소득세 누진세율 구간이 소득세법 제55조 원문과 일치한다
  3. acquisition-tax 계산기의 취득세율이 지방세법 제11조 현행 요율과 일치한다
  4. comprehensive-property-tax, registration-tax, vat, securities-tax 각 계산기의 세율이 해당 현행 세법과 일치한다
  5. four-insurances 계산기의 4대보험료율이 2025년 적용 보험료율(건강보험 7.09%, 국민연금 9% 등)과 일치한다
**Plans:** 4/4 plans complete
Plans:
- [x] 16-01-PLAN.md — capital-gains-tax, comprehensive-income-tax, year-end-tax 소득세법 감사
- [x] 16-02-PLAN.md — acquisition-tax, comprehensive-property-tax, registration-tax 지방세·종부세 감사
- [x] 16-03-PLAN.md — vat, securities-tax, rent-tax-credit 부가세·증권세·월세공제 감사
- [x] 16-04-PLAN.md — four-insurances 4대보험료 감사

### Phase 17: 부동산 계산기 법률 감사
**Goal**: 7개 부동산 계산기가 주택임대차보호법·금융감독규정 현행 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: REALTY-01, REALTY-02, REALTY-03, REALTY-04, REALTY-05, REALTY-06, REALTY-07
**Success Criteria** (what must be TRUE):
  1. deposit-return 계산기가 주택임대차보호법의 보증금 반환 우선순위 및 기준과 일치한다
  2. rent-conversion 계산기의 전월세 전환율 상한이 주택임대차보호법 시행령 기준(기준금리+2%)과 일치한다
  3. brokerage-fee 계산기의 중개보수 요율이 공인중개사법 시행규칙 별표 현행 요율과 일치한다
  4. subscription-score 계산기의 청약 가점 항목·배점이 주택공급에관한규칙 별표 원문과 일치한다
  5. dsr, ltv, dti 계산기의 규제 기준이 은행업감독규정 현행 기준과 일치한다
**Plans:** 3/3 plans complete
Plans:
- [x] 17-01-PLAN.md — deposit-return, rent-conversion, brokerage-fee 법률 감사
- [x] 17-02-PLAN.md — subscription-score, dsr 법률 감사
- [x] 17-03-PLAN.md — ltv, dti 법률 감사

### Phase 18: 교통/형사 계산기 법률 감사
**Goal**: 4개 교통/형사 계산기가 도로교통법·형사소송법 현행 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: TRAFFIC-01, TRAFFIC-02, TRAFFIC-03, TRAFFIC-04
**Success Criteria** (what must be TRUE):
  1. accident-settlement 계산기의 과실비율 기준이 금융감독원 과실비율 인정기준 원문과 일치한다
  2. drunk-driving 계산기의 BAC 처벌 구간(0.03%, 0.08%, 0.2%)이 도로교통법 제44조 및 제148조의2 원문과 일치한다
  3. fine-penalty 계산기의 범칙금·과태료 금액이 도로교통법 별표 현행 기준과 일치한다
  4. bail 계산기의 보석 기준이 형사소송법 제94조~제102조 원문과 일치한다
**Plans**: TBD

### Phase 19: 채권/이자 계산기 법률 감사
**Goal**: 3개 채권/이자 계산기가 소송촉진특례법·이자제한법·민법 현행 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: DEBT-01, DEBT-02, DEBT-03
**Success Criteria** (what must be TRUE):
  1. late-payment 계산기의 법정이율이 소송촉진 등에 관한 특례법 제3조 현행 이율(연 12%)과 일치한다
  2. loan-interest 계산기의 최고이자율 상한이 이자제한법 제2조 현행 기준(연 20%)과 일치한다
  3. unjust-enrichment 계산기의 부당이득 반환 이자 산정 기준이 민법 제741조~제749조 원문과 일치한다
  4. 발견된 모든 오류가 코드에서 수정되고 수정 내용이 검증된다
**Plans**: TBD

### Phase 20: 손해배상 계산기 법률 감사
**Goal**: 4개 손해배상 계산기가 민법·의료법·판례 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: DAMAGES-01, DAMAGES-02, DAMAGES-03, DAMAGES-04
**Success Criteria** (what must be TRUE):
  1. damages-general 계산기의 손해배상 산정 공식이 민법 제750조~제766조 원문 및 대법원 판례 기준과 일치한다
  2. defamation 계산기의 명예훼손 위자료 산정 기준이 대법원 판례 인정 기준 범위와 일치한다
  3. medical-malpractice 계산기의 의료사고 손해배상 산정이 의료법 및 관련 판례 기준과 일치한다
  4. lost-income 계산기의 일실수입 산정 공식(호프만식·라이프니츠식)이 대법원 판례 기준과 일치한다
**Plans**: TBD

### Phase 21: 기타 법률도구 법률 감사
**Goal**: 4개 기타 법률도구가 우편법·법률구조법·형사소송법·민법 현행 기준으로 정확하게 작동한다
**Depends on**: Nothing
**Requirements**: MISC-01, MISC-02, MISC-03, MISC-04
**Success Criteria** (what must be TRUE):
  1. certified-letter 도구의 내용증명 작성 기준이 우편법 및 민사소송법 원문과 일치한다
  2. legal-aid 도구의 법률구조 자격 소득 기준이 법률구조법 및 대한법률구조공단 현행 기준과 일치한다
  3. public-defender 도구의 국선변호인 선정 기준이 형사소송법 제33조 원문과 일치한다
  4. statute-of-limitations 계산기의 소멸시효 기간 및 기산점이 민법 제162조~제184조 및 상법 원문과 일치한다
**Plans**: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
| ----- | --------- | -------------- | ------ | --------- |
| 1. 프로젝트 기반 | v1.1 | 4/4 | Complete | 2026-03-23 |
| 2. 소송/법원 계산기 | v1.1 | 3/3 | Complete | 2026-03-23 |
| 3. 가사/가족법 계산기 | v1.1 | 3/3 | Complete | 2026-03-23 |
| 4. 노동/근로 계산기 | v1.1 | 5/5 | Complete | 2026-03-23 |
| 5. 세금 계산기 | v1.1 | 4/4 | Complete | 2026-03-23 |
| 6. 부동산 계산기 | v1.1 | 3/3 | Complete | 2026-03-23 |
| 7. 교통/형사 계산기 | v1.1 | 2/2 | Complete | 2026-03-23 |
| 8. 채권/이자 계산기 | v1.1 | 2/2 | Complete | 2026-03-23 |
| 9. 손해배상 계산기 | v1.1 | 2/2 | Complete | 2026-03-23 |
| 10. 기타 법률도구 | v1.1 | 2/2 | Complete | 2026-03-23 |
| 11. 라이트 테마 전환 | v1.2 | 3/3 | Complete | 2026-03-23 |
| 12. 패럴랙스 UI 적용 | v1.2 | 2/2 | Complete | 2026-03-23 |
| 13. 소송/법원 법률 감사 | v1.3 | 3/3 | Complete    | 2026-03-24 |
| 14. 가사/가족법 법률 감사 | v1.3 | 2/2 | Complete    | 2026-03-24 |
| 15. 노동/근로 법률 감사 | v1.3 | 4/4 | Complete    | 2026-03-24 |
| 16. 세금 법률 감사 | v1.3 | 4/4 | Complete   | 2026-03-24 |
| 17. 부동산 법률 감사 | v1.3 | 3/3 | Complete    | 2026-03-24 |
| 18. 교통/형사 법률 감사 | v1.3 | 0/? | Not started | - |
| 19. 채권/이자 법률 감사 | v1.3 | 0/? | Not started | - |
| 20. 손해배상 법률 감사 | v1.3 | 0/? | Not started | - |
| 21. 기타 법률도구 법률 감사 | v1.3 | 0/? | Not started | - |
