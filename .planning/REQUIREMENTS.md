# Requirements: 법률 계산기 (Legal Calculator Hub)

**Defined:** 2026-04-10
**Core Value:** 법률 관련 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구를 제공하여, 사용자가 머무르고 반복 방문하게 만든다 (= 애드센스 수익 극대화).

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Action Data Generation (대응 팁 및 템플릿 데이터 작성)

- [ ] **DATA-01**: 소송/법원(Court) 계산기 13종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-02**: 가사/가족법(Family) 계산기 4종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-03**: 노동/근로(Labor) 계산기 6종 실무 대응 팁 및 텍스트 템플릿 작성 (기존 3종 제외)
- [x] **DATA-04**: 세금(Tax) 계산기 5종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-05**: 부동산(Realty) 계산기 7종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-06**: 교통/형사(Traffic) 계산기 4종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-07**: 채권/이자(Debt) 계산기 3종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-08**: 손해배상(Damages) 계산기 4종 실무 대응 팁 및 텍스트 템플릿 작성
- [x] **DATA-09**: 기타(Misc) 계산기 4종 실무 대응 팁 및 텍스트 템플릿 작성

### Component Integration (ActionInsight 컴포넌트 연동)

- [ ] **COMP-01**: 소송/법원(Court) 계산기 13종 결과 화면에 ActionInsight 연동
- [x] **COMP-02**: 가사/가족법(Family) 계산기 4종 결과 화면에 ActionInsight 연동
- [x] **COMP-03**: 노동/근로(Labor) 계산기 6종 결과 화면에 ActionInsight 연동
- [x] **COMP-04**: 세금(Tax) 계산기 5종 결과 화면에 ActionInsight 연동
- [x] **COMP-05**: 부동산(Realty) 계산기 7종 결과 화면에 ActionInsight 연동
- [x] **COMP-06**: 교통/형사(Traffic) 계산기 4종 결과 화면에 ActionInsight 연동
- [x] **COMP-07**: 채권/이자(Debt) 계산기 3종 결과 화면에 ActionInsight 연동
- [x] **COMP-08**: 손해배상(Damages) 계산기 4종 결과 화면에 ActionInsight 연동
- [x] **COMP-09**: 기타(Misc) 계산기 4종 결과 화면에 ActionInsight 연동

### Quality Assurance (품질 검증 및 렌더링 확인)

- [x] **QA-01**: 전체 53개 계산기 ActionInsight 내용 및 UI 정상 노출 확인 (모바일/PC)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Personalization (개인화 기능)

- **PERS-01**: 사용자가 작성한 템플릿 임시 저장 기능 (로컬 스토리지 활용)
- **PERS-02**: 계산 결과와 대응 팁을 포함한 PDF 다운로드 기능

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| 백엔드/DB 연동 저장 | 서버 유지비용 절감 및 익명성 보장, 클라이언트 사이드 유지 |
| 맞춤형 법률 상담 연동 | 법률 자문을 제공하는 것이 아니므로, 정보 제공 역할에만 충실 |
| 다국어 지원 | 한국 법률/세율 전용이므로 다른 언어 제공은 불필요 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 41 | Pending |
| DATA-02 | Phase 42 | Complete |
| DATA-03 | Phase 42 | Complete |
| DATA-04 | Phase 43 | Complete |
| DATA-05 | Phase 43 | Complete |
| DATA-06 | Phase 44 | Complete |
| DATA-07 | Phase 44 | Complete |
| DATA-08 | Phase 45 | Complete |
| DATA-09 | Phase 45 | Complete |
| COMP-01 | Phase 41 | Pending |
| COMP-02 | Phase 42 | Complete |
| COMP-03 | Phase 42 | Complete |
| COMP-04 | Phase 43 | Complete |
| COMP-05 | Phase 43 | Complete |
| COMP-06 | Phase 44 | Complete |
| COMP-07 | Phase 44 | Complete |
| COMP-08 | Phase 45 | Complete |
| COMP-09 | Phase 45 | Complete |
| QA-01 | Phase 46 | Complete |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-10*
*Last updated: 2026-04-10 after initial definition*
