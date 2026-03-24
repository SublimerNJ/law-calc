# Requirements: 법률 계산기 — v1.3 전체 계산기 법률 정확성 감사

**Defined:** 2026-03-24
**Core Value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구 제공

## v1.3 Requirements

/Launcelot-Lawyer 스킬을 사용하여 각 계산기의 법률 정확성을 검증하고, 발견된 오류를 수정한다.

### 소송/법원 (COURT)

- [x] **COURT-01**: 소송비용 계산기 (lawsuit-cost) — 인지대·송달료 산정 기준 법령 원문 대조 검증 및 오류 수정
- [x] **COURT-02**: 소액사건 재판비용 계산기 (small-claims) — 소액사건심판법 기준 검증 및 오류 수정
- [x] **COURT-03**: 지급명령 비용 계산기 (payment-order) — 독촉절차 비용 기준 검증 및 오류 수정
- [x] **COURT-04**: 민사조정 비용 계산기 (civil-mediation) — 민사조정법 기준 검증 및 오류 수정
- [x] **COURT-05**: 가사소송 비용 계산기 (family-court) — 가사소송법 비용 기준 검증 및 오류 수정
- [x] **COURT-06**: 전자소송 비용 계산기 (e-court) — 전자소송 할인 기준 검증 및 오류 수정

### 가사/가족법 (FAMILY)

- [x] **FAMILY-01**: 위자료 계산기 (alimony) — 판례 기반 산정 기준 검증 및 오류 수정
- [x] **FAMILY-02**: 양육비 계산기 (child-support) — 양육비 산정기준표 검증 및 오류 수정
- [x] **FAMILY-03**: 재산분할 계산기 (property-division) — 민법 기반 분할 기준 검증 및 오류 수정
- [x] **FAMILY-04**: 상속세·증여세 계산기 (inheritance-tax) — 상속세및증여세법 세율·공제 검증 및 오류 수정
- [x] **FAMILY-05**: 유류분 계산기 (forced-heirship) — 민법 유류분 비율 검증 및 오류 수정
- [x] **FAMILY-06**: 상속순위·법정상속분 판별기 (inheritance-order) — 민법 상속순위·상속분 검증 및 오류 수정

### 노동/근로 (LABOR)

- [x] **LABOR-01**: 퇴직금 계산기 (severance-pay) — 근로자퇴직급여보장법 기준 검증 및 오류 수정
- [x] **LABOR-02**: 해고예고수당 계산기 (dismissal-notice) — 근로기준법 제26조 기준 검증 및 오류 수정
- [x] **LABOR-03**: 연차수당 계산기 (annual-leave-pay) — 근로기준법 연차유급휴가 기준 검증 및 오류 수정
- [x] **LABOR-04**: 연장근로수당 계산기 (overtime-pay) — 근로기준법 통상임금·가산율 검증 및 오류 수정
- [x] **LABOR-05**: 주휴수당 계산기 (weekly-holiday-pay) — 근로기준법 주휴일 기준 검증 및 오류 수정
- [x] **LABOR-06**: 최저임금 위반 계산기 (minimum-wage-check) — 최저임금법 기준 검증 및 오류 수정
- [x] **LABOR-07**: 부당해고 보상금 계산기 (unfair-dismissal) — 근로기준법 부당해고 구제 기준 검증 및 오류 수정
- [x] **LABOR-08**: 산재보험급여 계산기 (industrial-accident) — 산업재해보상보험법 기준 검증 및 오류 수정
- [ ] **LABOR-09**: 출산휴가급여 계산기 (maternity-leave) — 남녀고용평등법 기준 검증 및 오류 수정
- [ ] **LABOR-10**: 육아휴직급여 계산기 (parental-leave) — 남녀고용평등법 기준 검증 및 오류 수정
- [ ] **LABOR-11**: 실업급여 계산기 (unemployment-benefit) — 고용보험법 기준 검증 및 오류 수정
- [x] **LABOR-12**: 휴업수당 계산기 (shutdown-allowance) — 근로기준법 제46조 기준 검증 및 오류 수정

### 세금 (TAX)

- [ ] **TAX-01**: 양도소득세 계산기 (capital-gains-tax) — 소득세법 양도소득 세율·공제 검증 및 오류 수정
- [ ] **TAX-02**: 종합소득세 계산기 (comprehensive-income-tax) — 소득세법 종합소득 세율·공제 검증 및 오류 수정
- [ ] **TAX-03**: 취득세 계산기 (acquisition-tax) — 지방세법 취득세율 검증 및 오류 수정
- [ ] **TAX-04**: 종합부동산세·재산세 계산기 (comprehensive-property-tax) — 종합부동산세법·지방세법 검증 및 오류 수정
- [ ] **TAX-05**: 등록면허세 계산기 (registration-tax) — 지방세법 등록면허세 기준 검증 및 오류 수정
- [ ] **TAX-06**: 부가가치세 계산기 (vat) — 부가가치세법 기준 검증 및 오류 수정
- [ ] **TAX-07**: 증권거래세 계산기 (securities-tax) — 증권거래세법 세율 검증 및 오류 수정
- [ ] **TAX-08**: 연말정산 계산기 (year-end-tax) — 소득세법 공제항목·한도 검증 및 오류 수정
- [ ] **TAX-09**: 4대보험료 계산기 (four-insurances) — 각 보험료율 검증 및 오류 수정
- [ ] **TAX-10**: 월세 세액공제 계산기 (rent-tax-credit) — 조세특례제한법 세액공제 기준 검증 및 오류 수정

### 부동산 (REALTY)

- [ ] **REALTY-01**: 임대차 보증금 반환 계산기 (deposit-return) — 주택임대차보호법 기준 검증 및 오류 수정
- [ ] **REALTY-02**: 전월세 전환율 계산기 (rent-conversion) — 주택임대차보호법 전환율 상한 검증 및 오류 수정
- [ ] **REALTY-03**: 중개보수 계산기 (brokerage-fee) — 공인중개사법 중개보수 요율 검증 및 오류 수정
- [ ] **REALTY-04**: 청약가점 계산기 (subscription-score) — 주택공급에관한규칙 가점 기준 검증 및 오류 수정
- [ ] **REALTY-05**: DSR 계산기 (dsr) — 은행업감독규정 DSR 기준 검증 및 오류 수정
- [ ] **REALTY-06**: LTV 계산기 (ltv) — 은행업감독규정 LTV 기준 검증 및 오류 수정
- [ ] **REALTY-07**: DTI 계산기 (dti) — 은행업감독규정 DTI 기준 검증 및 오류 수정

### 교통/형사 (TRAFFIC)

- [ ] **TRAFFIC-01**: 교통사고 합의금 계산기 (accident-settlement) — 과실비율 인정기준 및 합의금 산정 기준 검증 및 오류 수정
- [ ] **TRAFFIC-02**: 음주운전 처벌 계산기 (drunk-driving) — 도로교통법 BAC 기준 및 처벌 기준 검증 및 오류 수정
- [ ] **TRAFFIC-03**: 벌금/과태료 계산기 (fine-penalty) — 도로교통법 범칙금·과태료 기준 검증 및 오류 수정
- [ ] **TRAFFIC-04**: 형사 보석금 계산기 (bail) — 형사소송법 보석 기준 검증 및 오류 수정

### 채권/이자 (DEBT)

- [ ] **DEBT-01**: 지연손해금 계산기 (late-payment) — 소송촉진특례법 법정이율 검증 및 오류 수정
- [ ] **DEBT-02**: 대여금 이자 계산기 (loan-interest) — 이자제한법 최고이자율 검증 및 오류 수정
- [ ] **DEBT-03**: 부당이득 반환 계산기 (unjust-enrichment) — 민법 부당이득 기준 검증 및 오류 수정

### 손해배상 (DAMAGES)

- [ ] **DAMAGES-01**: 손해배상 계산기 (damages-general) — 민법 손해배상 산정 기준 검증 및 오류 수정
- [ ] **DAMAGES-02**: 명예훼손 손해배상 계산기 (defamation) — 명예훼손 판례 기준 검증 및 오류 수정
- [ ] **DAMAGES-03**: 의료사고 손해배상 계산기 (medical-malpractice) — 의료법·판례 기준 검증 및 오류 수정
- [ ] **DAMAGES-04**: 일실수입 계산기 (lost-income) — 일실수입 산정 판례 기준 검증 및 오류 수정

### 기타 (MISC)

- [ ] **MISC-01**: 내용증명 작성 도구 (certified-letter) — 우편법·민사소송법 기준 검증 및 오류 수정
- [ ] **MISC-02**: 법률구조 자격 확인 (legal-aid) — 법률구조법 기준 검증 및 오류 수정
- [ ] **MISC-03**: 국선변호인 선정 기준 확인 (public-defender) — 형사소송법 국선변호인 기준 검증 및 오류 수정
- [ ] **MISC-04**: 소멸시효 계산기 (statute-of-limitations) — 민법·상법 소멸시효 기준 검증 및 오류 수정

## Out of Scope

| Feature | Reason |
|---------|--------|
| 새 계산기 추가 | 이번 마일스톤은 기존 계산기 감사에 집중 |
| UI/UX 변경 | 법률 정확성 감사만 수행, 디자인 변경 없음 |
| 성능 최적화 | v1.2에서 완료됨 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| COURT-01 | Phase 13 | Complete |
| COURT-02 | Phase 13 | Complete |
| COURT-03 | Phase 13 | Complete |
| COURT-04 | Phase 13 | Complete |
| COURT-05 | Phase 13 | Complete |
| COURT-06 | Phase 13 | Complete |
| FAMILY-01 | Phase 14 | Complete |
| FAMILY-02 | Phase 14 | Complete |
| FAMILY-03 | Phase 14 | Complete |
| FAMILY-04 | Phase 14 | Complete |
| FAMILY-05 | Phase 14 | Complete |
| FAMILY-06 | Phase 14 | Complete |
| LABOR-01 | Phase 15 | Complete |
| LABOR-02 | Phase 15 | Complete |
| LABOR-03 | Phase 15 | Complete |
| LABOR-04 | Phase 15 | Complete |
| LABOR-05 | Phase 15 | Complete |
| LABOR-06 | Phase 15 | Complete |
| LABOR-07 | Phase 15 | Complete |
| LABOR-08 | Phase 15 | Complete |
| LABOR-09 | Phase 15 | Pending |
| LABOR-10 | Phase 15 | Pending |
| LABOR-11 | Phase 15 | Pending |
| LABOR-12 | Phase 15 | Complete |
| TAX-01 | Phase 16 | Pending |
| TAX-02 | Phase 16 | Pending |
| TAX-03 | Phase 16 | Pending |
| TAX-04 | Phase 16 | Pending |
| TAX-05 | Phase 16 | Pending |
| TAX-06 | Phase 16 | Pending |
| TAX-07 | Phase 16 | Pending |
| TAX-08 | Phase 16 | Pending |
| TAX-09 | Phase 16 | Pending |
| TAX-10 | Phase 16 | Pending |
| REALTY-01 | Phase 17 | Pending |
| REALTY-02 | Phase 17 | Pending |
| REALTY-03 | Phase 17 | Pending |
| REALTY-04 | Phase 17 | Pending |
| REALTY-05 | Phase 17 | Pending |
| REALTY-06 | Phase 17 | Pending |
| REALTY-07 | Phase 17 | Pending |
| TRAFFIC-01 | Phase 18 | Pending |
| TRAFFIC-02 | Phase 18 | Pending |
| TRAFFIC-03 | Phase 18 | Pending |
| TRAFFIC-04 | Phase 18 | Pending |
| DEBT-01 | Phase 19 | Pending |
| DEBT-02 | Phase 19 | Pending |
| DEBT-03 | Phase 19 | Pending |
| DAMAGES-01 | Phase 20 | Pending |
| DAMAGES-02 | Phase 20 | Pending |
| DAMAGES-03 | Phase 20 | Pending |
| DAMAGES-04 | Phase 20 | Pending |
| MISC-01 | Phase 21 | Pending |
| MISC-02 | Phase 21 | Pending |
| MISC-03 | Phase 21 | Pending |
| MISC-04 | Phase 21 | Pending |

**Coverage:**
- v1.3 requirements: 56 total
- Mapped to phases: 56/56 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-24*
*Last updated: 2026-03-24 — Traceability populated after roadmap creation*
