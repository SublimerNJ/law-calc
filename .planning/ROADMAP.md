# ROADMAP: Milestone v1.2 (UI/UX 개편)

## Phases

- [ ] **Phase 11: 라이트 테마 전환 및 디자인 시스템 개편** - 전문적인 법률 도구의 신뢰감을 주는 밝은 톤의 라이트 테마 전면 적용
- [ ] **Phase 12: 패럴랙스 UI 적용 및 고도화** - 성능 최적화된 패럴랙스 효과 적용 및 반응형(모바일/접근성) 대응

## Phase Details

### Phase 11: 라이트 테마 전환 및 디자인 시스템 개편
**Goal**: 전문적인 법률 도구의 신뢰감을 주는 밝은 톤의 디자인 시스템과 UI를 전면 적용한다.
**Depends on**: Milestone v1.1 완료
**Requirements**: REVAMP-01, REVAMP-03
**Success Criteria**:
  1. 기존의 다크 테마(네이비/골드)가 완전히 제거되고, 신뢰감을 주는 라이트 테마가 기본으로 적용된다.
  2. AI 생성 느낌이 나는 기존 UI 요소들이 정돈된 전문 법률 서비스 디자인으로 개편된다.
  3. 모든 70개의 계산기 페이지와 공통 레이아웃이 새로운 디자인 시스템 하에 시각적 오류 없이 정상적으로 렌더링된다.
**Plans**: 3 plans
- [x] 11-01-PLAN.md — Foundation & Theme Configuration (다크 모드 제거 및 라이트 테마 전역 설정)
- [x] 11-02-PLAN.md — Core Components & Sections Light Theme Update (공통 UI 및 레이아웃 업데이트)
- [ ] 11-03-PLAN.md — Calculators UI Migration (70개 계산기 페이지 일괄 변환 및 검증)

### Phase 12: 패럴랙스 UI 적용 및 고도화
**Goal**: 성능 최적화된 패럴랙스 효과를 적용하여 사용자 경험을 고도화하고 다양한 기기 환경에 대응한다.
**Depends on**: Phase 11
**Requirements**: REVAMP-02, REVAMP-04
**Success Criteria**:
  1. 스크롤 기반 섹션에 transform과 opacity 속성만을 활용한 60fps 최적화 패럴랙스 애니메이션이 적용된다.
  2. 모바일 디바이스 화면(viewport 기준)에서는 무거운 패럴랙스 애니메이션이 자동으로 비활성화된다.
  3. 사용자의 OS 설정에서 '움직임 줄이기(prefers-reduced-motion)'가 활성화되어 있을 때 모든 패럴랙스 효과가 생략된다.
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 11. 라이트 테마 전환 | 2/3 | In Progress|  |
| 12. 패럴랙스 UI 적용 | 0/0 | Not started | - |
