# Requirements: v1.7 SEO 완벽 최적화

**Defined:** 2026-03-25
**Core Value:** 구글 검색 유입 극대화 → 애드센스 수익 기반

## v1.7 Requirements

### 콘텐츠 SEO (CONTENT)

- [ ] **CONTENT-01**: 각 계산기 페이지에 200-300자 설명 텍스트 ("이 계산기에 대하여" 섹션)
- [ ] **CONTENT-02**: 각 계산기 페이지에 3-5개 FAQ 항목 (자주 묻는 질문)
- [ ] **CONTENT-03**: tools-data.ts에 longDescription, keywords, faqItems, relatedTools 필드 추가

### 구조화 데이터 (SCHEMA)

- [ ] **SCHEMA-01**: 각 계산기 페이지에 SoftwareApplication JSON-LD 스키마
- [ ] **SCHEMA-02**: FAQ 콘텐츠가 있는 페이지에 FAQPage JSON-LD 스키마
- [ ] **SCHEMA-03**: 홈페이지에 WebSite + SearchAction JSON-LD 스키마

### 메타 최적화 (META)

- [ ] **META-01**: 각 계산기 고유 키워드 메타 태그 (tools-data.ts keywords 기반)
- [ ] **META-02**: Canonical URL 설정 (generateMetadata에 alternates.canonical)
- [ ] **META-03**: OG image 설정 (공통 og-image.png + og:locale ko_KR + og:site_name)
- [ ] **META-04**: Twitter Card 메타 태그 (twitter:card, twitter:site)

### 내부 링크 (LINK)

- [ ] **LINK-01**: tools-data.ts에 relatedTools 필드로 관련 계산기 3-5개 매핑
- [ ] **LINK-02**: CalculatorLayout 사이드바에 관련 계산기 링크 렌더링

### 분석 도구 (ANALYTICS)

- [ ] **ANALYTICS-01**: GA4 스크립트 컴포넌트 준비 (측정 ID는 환경변수로)
- [ ] **ANALYTICS-02**: Google Search Console 메타 태그 준비 (환경변수)

## Out of Scope

| Feature | Reason |
|---------|--------|
| 블로그/콘텐츠 마케팅 | SEO 기술 최적화에 집중 |
| 백링크 전략 | 코드 레벨 작업이 아님 |
| 다국어 SEO | 한국어 전용 사이트 |
| AMP 페이지 | Next.js SSR로 충분 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONTENT-01 | 33 | Pending |
| CONTENT-02 | 33 | Pending |
| CONTENT-03 | 33 | Pending |
| SCHEMA-01 | 34 | Pending |
| SCHEMA-02 | 34 | Pending |
| SCHEMA-03 | 34 | Pending |
| META-01 | 34 | Pending |
| META-02 | 34 | Pending |
| META-03 | 34 | Pending |
| META-04 | 34 | Pending |
| LINK-01 | 35 | Pending |
| LINK-02 | 35 | Pending |
| ANALYTICS-01 | 35 | Pending |
| ANALYTICS-02 | 35 | Pending |

**Coverage:** 14/14 ✓

---
*Requirements defined: 2026-03-25*
