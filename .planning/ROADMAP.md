# Roadmap

## Phases

- [ ] **Phase 41: Court ActionInsight 연동** - 소송/법원 계산기 13종 대응 팁 작성 및 UI 연동
- [x] **Phase 42: Family & Labor ActionInsight 연동** - 가사/가족법 4종, 노동/근로 6종 대응 팁 작성 및 UI 연동 (completed 2026-04-10)
- [ ] **Phase 43: Tax & Realty ActionInsight 연동** - 세금 5종, 부동산 7종 대응 팁 작성 및 UI 연동
- [ ] **Phase 44: Traffic & Debt ActionInsight 연동** - 교통/형사 4종, 채권/이자 3종 대응 팁 작성 및 UI 연동
- [ ] **Phase 45: Damages & Misc ActionInsight 연동** - 손해배상 4종, 기타 4종 대응 팁 작성 및 UI 연동
- [ ] **Phase 46: 전체 ActionInsight 품질 검증** - 53개 계산기 ActionInsight UI/UX 크로스 브라우징 및 렌더링 검증

## Phase Details

### Phase 41: Court ActionInsight 연동
**Goal**: 소송/법원 관련 계산기 13종에서 사용자가 실전 대응 팁과 템플릿을 확인할 수 있다
**Depends on**: None
**Requirements**: DATA-01, COMP-01
**Success Criteria**:
  1. 13개 소송/법원 계산기 결과 화면 하단에 ActionInsight 영역이 표시된다
  2. 각 계산기 특성에 맞는 법률/실무 대응 팁이 제공된다
  3. 사용자가 카톡/문서 발송용 템플릿을 확인하고 복사할 수 있다
**Plans**: TBD
**UI hint**: yes

### Phase 42: Family & Labor ActionInsight 연동
**Goal**: 가사/가족법 및 노동/근로 관련 계산기에서 사용자가 실전 대응 팁과 템플릿을 확인할 수 있다
**Depends on**: Phase 41
**Requirements**: DATA-02, COMP-02, DATA-03, COMP-03
**Success Criteria**:
  1. 가사 4종, 노동 6종 계산기 결과 화면 하단에 ActionInsight 영역이 표시된다
  2. 이혼, 상속, 임금 등 도메인에 특화된 대응 팁이 제공된다
  3. 사용자가 관련 문서 템플릿을 확인하고 복사할 수 있다
**Plans**: 1 plans
- [x] 42-01-PLAN.md — child-support 계산기에 ActionInsight 연동 (가사/노동 계산기 적용 마무리)
**UI hint**: yes

### Phase 43: Tax & Realty ActionInsight 연동
**Goal**: 세금 및 부동산 관련 계산기에서 사용자가 절세 및 계약 관련 실무 대응 팁과 템플릿을 확인할 수 있다
**Depends on**: Phase 42
**Requirements**: DATA-04, COMP-04, DATA-05, COMP-05
**Success Criteria**:
  1. 세금 5종, 부동산 7종 계산기 결과 화면 하단에 ActionInsight 영역이 표시된다
  2. 절세, 부동산 거래 등에 관한 실무 팁이 제공된다
  3. 사용자가 세금 신고나 계약 관련 템플릿을 확인할 수 있다
**Plans**: TBD
**UI hint**: yes

### Phase 44: Traffic & Debt ActionInsight 연동
**Goal**: 교통/형사 및 채권/이자 관련 계산기에서 사용자가 합의 및 추심 관련 실무 대응 팁과 템플릿을 확인할 수 있다
**Depends on**: Phase 43
**Requirements**: DATA-06, COMP-06, DATA-07, COMP-07
**Success Criteria**:
  1. 교통 4종, 채권 3종 계산기 결과 화면 하단에 ActionInsight 영역이 표시된다
  2. 합의, 내용증명, 채권 추심에 특화된 실전 대응 팁이 제공된다
  3. 사용자가 내용증명, 합의서 등 관련 템플릿을 확인할 수 있다
**Plans**: TBD
**UI hint**: yes

### Phase 45: Damages & Misc ActionInsight 연동
**Goal**: 손해배상 및 기타 법률 도구에서 사용자가 실전 대응 팁과 템플릿을 확인할 수 있다
**Depends on**: Phase 44
**Requirements**: DATA-08, COMP-08, DATA-09, COMP-09
**Success Criteria**:
  1. 손해배상 4종, 기타 4종 계산기 결과 화면 하단에 ActionInsight 영역이 표시된다
  2. 각 도메인 특성에 맞는 실전 대응 팁이 제공된다
  3. 사용자가 청구서, 안내문 등 관련 템플릿을 확인할 수 있다
**Plans**: TBD
**UI hint**: yes

### Phase 46: 전체 ActionInsight 품질 검증
**Goal**: 53개 모든 계산기에서 ActionInsight 기능이 정상적으로 노출되고 동작하는지 검증한다
**Depends on**: Phase 45
**Requirements**: QA-01
**Success Criteria**:
  1. 모바일 및 PC 환경에서 ActionInsight UI가 깨짐 없이 렌더링된다
  2. 모든 계산기에서 대응 팁과 템플릿 텍스트가 정상적으로 표시된다
  3. 복사 기능 등 ActionInsight의 인터랙션이 오류 없이 동작한다
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 41. Court ActionInsight 연동 | 0/0 | Not started | - |
| 42. Family & Labor ActionInsight 연동 | 1/1 | Complete   | 2026-04-10 |
| 43. Tax & Realty ActionInsight 연동 | 0/0 | Not started | - |
| 44. Traffic & Debt ActionInsight 연동 | 0/0 | Not started | - |
| 45. Damages & Misc ActionInsight 연동 | 0/0 | Not started | - |
| 46. 전체 ActionInsight 품질 검증 | 0/0 | Not started | - |