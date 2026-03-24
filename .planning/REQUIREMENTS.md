# Requirements: v1.5 전체 계산기 논리적 오류 및 UX 흐름 감사

**Defined:** 2026-03-25
**Core Value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구 제공

## v1.5 Requirements

### 입력값 검증 (INPUT)

- [ ] **INPUT-01**: 모든 계산기에서 음수 입력 시 적절한 에러 메시지 또는 차단
- [ ] **INPUT-02**: 필수 입력 필드가 비어있을 때 계산 버튼 비활성화 또는 안내
- [ ] **INPUT-03**: 비현실적 값(소가 999조원 등) 입력 시 경고 또는 상한 안내
- [ ] **INPUT-04**: 숫자 필드에 문자 입력 방지 및 적절한 포맷팅

### 결과 표시 (RESULT)

- [ ] **RESULT-01**: 계산 결과가 0원 또는 음수일 때 의미 있는 안내 제공
- [ ] **RESULT-02**: 큰 금액의 원 단위 표시 시 가독성 확보 (천 단위 콤마 등)
- [ ] **RESULT-03**: 결과 항목 간 합산이 맞는지 (부분합 = 총합)

### UX 흐름 (FLOW)

- [ ] **FLOW-01**: 초기 상태에서 불필요한 0원 결과가 표시되지 않음
- [ ] **FLOW-02**: 입력 변경 시 결과가 즉시 또는 명확한 타이밍에 업데이트
- [ ] **FLOW-03**: 필수/선택 필드 구분이 시각적으로 명확

### 일관성 (CONSIST)

- [ ] **CONSIST-01**: 동일 개념(급여, 기간, 이율)의 입력 방식이 계산기 간 통일
- [ ] **CONSIST-02**: 결과 표시 형식(원, %, 기간)이 계산기 간 통일
- [ ] **CONSIST-03**: 에러 메시지 스타일과 톤이 일관적

### 엣지 케이스 (EDGE)

- [ ] **EDGE-01**: 경계값(0, 최소값, 최대값)에서 계산 결과가 논리적
- [ ] **EDGE-02**: 날짜 관련 입력에서 미래/과거 날짜 제한이 적절
- [ ] **EDGE-03**: 계산 공식의 나누기 0 등 수학적 예외 처리

## Out of Scope

| Feature | Reason |
|---------|--------|
| 법률 정확성 재검증 | v1.3에서 완료, 이번은 UX/논리만 |
| 새로운 계산기 추가 | 기존 51개 품질 개선에 집중 |
| 디자인/테마 변경 | v1.2에서 확정, 이번은 기능 논리만 |
| 성능 최적화 | 별도 마일스톤으로 분리 |

## Traceability

Each v1.5 requirement applies to ALL phases (24-32). Every phase audits all 16 requirements for its calculator category.

| Requirement | Phases | Status |
|-------------|--------|--------|
| INPUT-01 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| INPUT-02 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| INPUT-03 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| INPUT-04 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| RESULT-01 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| RESULT-02 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| RESULT-03 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| FLOW-01 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| FLOW-02 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| FLOW-03 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| CONSIST-01 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| CONSIST-02 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| CONSIST-03 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| EDGE-01 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| EDGE-02 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |
| EDGE-03 | 24, 25, 26, 27, 28, 29, 30, 31, 32 | Pending |

**Coverage:**
- v1.5 requirements: 16 total
- All 16 requirements apply to each of 9 phases (24-32)
- Coverage: 16/16 ✓

---
*Requirements defined: 2026-03-25*
*Last updated: 2026-03-25 — traceability mapped to Phases 24-32*
