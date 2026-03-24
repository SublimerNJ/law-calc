# Requirements: v1.4 중복 계산기 정리 및 코드 클린업

**Defined:** 2026-03-24
**Core Value:** 법률 비전문가가 복잡한 법률 비용/금액을 빠르고 정확하게 계산할 수 있는 신뢰성 있는 도구 제공

## CLEANUP — 삭제 파일 정리

- [ ] **CLEANUP-01**: 이미 통합 완료된 삭제 파일 13개가 git에서 커밋되어 코드베이스에 남지 않는다
- [ ] **CLEANUP-02**: tools-data.ts에서 삭제된 계산기 참조가 없고, 모든 등록된 route에 대응하는 page.tsx가 존재한다

## MERGE — 계산기 통합

- [ ] **MERGE-01**: small-claims 기능이 lawsuit-cost에 "소액사건" 모드로 통합되어, 소가 3,000만원 이하 시 자동으로 소액사건 송달료(10회) 적용된다
- [ ] **MERGE-02**: e-court 기능이 lawsuit-cost의 전자소송 비교 기능으로 흡수되어 별도 계산기가 불필요하다
- [ ] **MERGE-03**: small-claims, e-court page.tsx가 삭제되고 tools-data.ts에서 제거된다
- [ ] **MERGE-04**: 삭제된 계산기의 기존 URL로 접근 시 lawsuit-cost로 리다이렉트된다

## UX — 경계선 계산기 UI 개선

- [ ] **UX-01**: public-defender와 legal-aid가 하나의 "법률 지원 자격 확인기" 페이지에 탭으로 통합된다
- [ ] **UX-02**: dsr 페이지에 dti와의 차이 설명 + dti 링크가 표시되고, dti 페이지에도 동일하게 dsr 링크가 표시된다
- [ ] **UX-03**: dismissal-notice와 unfair-dismissal 페이지에 상호 링크 + 차이 안내가 추가된다

## VERIFY — 검증

- [ ] **VERIFY-01**: TypeScript 빌드가 에러 없이 통과한다
- [ ] **VERIFY-02**: 최종 계산기 수가 tools-data.ts 등록 수와 실제 page.tsx 파일 수가 일치한다

## Future Requirements

- public-defender + legal-aid 완전 통합 (현재는 탭만, 추후 통합 로직 가능)

## Out of Scope

- dsr/dti 계산 로직 통합 — 규제 기준이 별개
- dismissal-notice/unfair-dismissal 통합 — 법적 근거와 계산 목적이 다름

## Traceability

| REQ-ID | Phase |
|--------|-------|
| CLEANUP-01, CLEANUP-02 | Phase 22 |
| MERGE-01~04 | Phase 22 |
| UX-01~03 | Phase 23 |
| VERIFY-01~02 | Phase 23 |
