# Requirements: 법률 도구 (Legal Tools)

**Defined:** 2026-03-23
**Core Value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있어야 한다.

## v1 Requirements

### Infrastructure & Layout

- [x] **INFRA-01**: Next.js 16 프로젝트 scaffolding (App Router, TypeScript, Tailwind 4)
- [x] **INFRA-02**: 공통 레이아웃 (Header, Footer, 반응형)
- [x] **INFRA-03**: 카테고리별 도구 데이터 구조 (tools-data.ts)
- [x] **INFRA-04**: 공통 계산기 UI 컴포넌트 (입력폼, 결과표시, 차트)
- [x] **INFRA-05**: 다크/라이트 테마 지원
- [x] **INFRA-06**: SEO 메타데이터 (각 페이지별 title, description, OG)

### Design & UX

- [x] **DESIGN-01**: 패럴랙스 스크롤 히어로 섹션
- [x] **DESIGN-02**: 미니멀 + 법률 신뢰감 디자인 (네이비/골드 톤)
- [x] **DESIGN-03**: 카테고리별 아이콘 및 색상 구분
- [x] **DESIGN-04**: 반응형 그리드 (모바일 2열, 태블릿 3열, 데스크탑 5열)
- [x] **DESIGN-05**: 스크롤 기반 섹션 애니메이션

### 소송/법원 (9개)

- [x] **COURT-01**: 변호사보수 소송비용산입 계산기
- [x] **COURT-02**: 소송비용 계산기 (인지대+송달료)
- [x] **COURT-03**: 인지대 계산기
- [x] **COURT-04**: 송달료 계산기
- [x] **COURT-05**: 소액사건 재판비용 계산기
- [x] **COURT-06**: 지급명령(독촉절차) 비용 계산기
- [x] **COURT-07**: 민사조정 비용 계산기
- [x] **COURT-08**: 가사소송 비용 계산기
- [x] **COURT-09**: 전자소송 비용 계산기

### 가사/가족법 (8개)

- [x] **FAMILY-01**: 위자료 계산기
- [x] **FAMILY-02**: 양육비 계산기
- [x] **FAMILY-03**: 재산분할 계산기
- [x] **FAMILY-04**: 상속세 계산기
- [x] **FAMILY-05**: 법정상속분 계산기
- [x] **FAMILY-06**: 유류분 계산기
- [x] **FAMILY-07**: 증여세 계산기
- [x] **FAMILY-08**: 상속순위 판별기

### 노동/근로 (14개)

- [x] **LABOR-01**: 퇴직금 계산기
- [x] **LABOR-02**: 해고예고수당 계산기
- [x] **LABOR-03**: 연차수당 계산기
- [x] **LABOR-04**: 연장근로수당 계산기
- [x] **LABOR-05**: 주휴수당 계산기
- [x] **LABOR-06**: 최저임금 위반 계산기
- [x] **LABOR-07**: 부당해고 보상금 계산기
- [x] **LABOR-08**: 산재보험급여 계산기
- [x] **LABOR-09**: 출산휴가급여 계산기
- [x] **LABOR-10**: 육아휴직급여 계산기
- [x] **LABOR-11**: 실업급여 계산기
- [x] **LABOR-12**: 통상임금 계산기
- [x] **LABOR-13**: 평균임금 계산기
- [x] **LABOR-14**: 휴업수당 계산기

### 세금 (12개)

- [x] **TAX-01**: 소득세 계산기
- [x] **TAX-02**: 양도소득세 계산기
- [x] **TAX-03**: 종합소득세 계산기
- [x] **TAX-04**: 취득세 계산기
- [x] **TAX-05**: 종합부동산세 계산기
- [x] **TAX-06**: 재산세 계산기
- [x] **TAX-07**: 등록면허세 계산기
- [x] **TAX-08**: 부가가치세 계산기
- [x] **TAX-09**: 증권거래세 계산기
- [x] **TAX-10**: 연말정산 계산기
- [x] **TAX-11**: 4대보험료 계산기
- [x] **TAX-12**: 월세 세액공제 계산기

### 부동산 (7개)

- [x] **REALTY-01**: 임대차 보증금 반환 계산기
- [x] **REALTY-02**: 전월세 전환율 계산기
- [x] **REALTY-03**: 중개보수(복비) 계산기
- [x] **REALTY-04**: 청약가점 계산기
- [x] **REALTY-05**: DSR 계산기
- [x] **REALTY-06**: LTV 계산기
- [x] **REALTY-07**: DTI 계산기

### 교통/형사 (6개)

- [x] **TRAFFIC-01**: 교통사고 합의금 계산기
- [x] **TRAFFIC-02**: 교통사고 과실비율 계산기
- [x] **TRAFFIC-03**: 음주운전 처벌 계산기
- [x] **TRAFFIC-04**: 속도위반 벌금 계산기
- [x] **TRAFFIC-05**: 벌금/과태료 계산기
- [x] **TRAFFIC-06**: 형사 보석금 계산기

### 채권/이자 (4개)

- [x] **DEBT-01**: 법정이자 계산기
- [x] **DEBT-02**: 지연손해금 계산기
- [x] **DEBT-03**: 대여금 이자 계산기
- [x] **DEBT-04**: 부당이득 반환 계산기

### 손해배상 (6개)

- [x] **DAMAGES-01**: 손해배상 계산기
- [x] **DAMAGES-02**: 명예훼손 손해배상 계산기
- [x] **DAMAGES-03**: 의료사고 손해배상 계산기
- [x] **DAMAGES-04**: 일실수입 계산기
- [x] **DAMAGES-05**: 장해등급 보상금 계산기
- [x] **DAMAGES-06**: 제조물책임 손해배상 계산기

### 기타 법률도구 (4개)

- [ ] **MISC-01**: 소멸시효 계산기
- [ ] **MISC-02**: 국선변호사 자격 확인기
- [ ] **MISC-03**: 법률구조 대상 확인기
- [ ] **MISC-04**: 내용증명 작성 도우미

## v2 Requirements

- **AD-01**: 광고 배너 통합 (AdSense)
- **HIST-01**: 계산 결과 저장/히스토리
- **SHARE-01**: 결과 공유 (URL, 이미지)
- **PRINT-01**: 결과 인쇄/PDF 내보내기

## Out of Scope

| Feature | Reason |
|---------|--------|
| 사용자 인증 | v1에서 불필요, 모든 기능 비로그인 |
| 백엔드 API | 클라이언트 사이드 계산으로 충분 |
| 법률 상담 기능 | 법적 책임 이슈, 계산기에 집중 |
| 다국어 지원 | 한국 법률 특화, 한국어만 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01~06 | Phase 1 | Pending |
| DESIGN-01~05 | Phase 1 | Pending |
| COURT-01~09 | Phase 2 | Pending |
| FAMILY-01~08 | Phase 3 | Pending |
| LABOR-01~14 | Phase 4 | Pending |
| TAX-01~12 | Phase 5 | Pending |
| REALTY-01~07 | Phase 6 | Pending |
| TRAFFIC-01~06 | Phase 7 | Pending |
| DEBT-01~04 | Phase 8 | Pending |
| DAMAGES-01~06 | Phase 9 | Pending |
| MISC-01~04 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 81 total
- Mapped to phases: 81
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 after initial definition*
