# Milestones

## v1.5 전체 계산기 논리적 오류 및 UX 흐름 감사 (Shipped: 2026-03-25)

**Phases completed:** 18 phases, 50 plans, 74 tasks

**Key accomplishments:**

- 1. [Rule 1 - Bug] 인지액 100원 미만 올림 → 버림 (civil-mediation)
- One-liner:
- One-liner:
- 법적 근거
- One-liner:
- One-liner:
- 근로기준법 제53조·제56조·제55조·제60조·제61조 대조로 연장근로·주휴·연차수당 3개 계산기 법률 감사 완료 및 안내 오류 2건 수정
- 1. [Rule 1 - Bug] 최저임금 검증기: 2026년 최저임금 금액 오류
- 1. [Rule 1 - Bug] 출산휴가급여 상한액 오류
- One-liner:
- 1. [Rule 1 - Bug] 취득세 2주택 비조정 6~9억 구간 계산식 오류
- One-liner:
- One-liner:
- One-liner:
- 1. [Rule 1 - Bug] LTV 조정대상지역 비율 오류 수정
- 1. [Rule 1 - Bug] 교통사고 합의금 법적 근거 법령명 오류
- One-liner:
- 1. [Rule 2 - Missing Critical Functionality] 지연손해금 상사 법정이율 누락
- [Rule 1 - Bug] 민법 제763조 조문 오류 수정
- 1. [Rule 2 - Missing Critical] 일실수입 계산기 생활비 공제 누락
- 1. [Rule 1 - Bug] 내용증명 미리보기 텍스트 불가시 버그 수정
- 1. [Rule 1 - Bug] 국선변호인 필요적 사유 7가지 중 6가지 누락
- One-liner:
- One-liner:
- One-liner:
- One-liner:
- CONSIST-01 (입력 방식 통일):
- 퇴직금·해고예고수당·연차수당 3개 노동 계산기에 에러/경고 state, 입력 검증, 필수 필드 표시, 엣지케이스 처리 표준화 완료
- overtime-pay·weekly-holiday-pay·minimum-wage-check 3개 계산기에 에러/경고 state, 필수 입력 검증, 비현실값 경고, 색상 구분 일괄 적용
- 6개 노동/근로 계산기 CONSIST-01~03 교차 감사 완료 — overtime-pay·weekly-holiday-pay·minimum-wage-check 에러/경고 스타일 plain `<p>` 패턴 통일 및 overtime-pay 이중 setWarning 버그 수정
- One-liner:
- 6개 노동 계산기 CONSIST-01~03 최종 감사 완료 — 계산 버튼 클래스 3개 파일 통일 및 TypeScript 컴파일 에러 없음 확인
- 5개 세금 계산기 focus 스타일 통일(blue-600) 및 registration-tax 결과 합계 계층 구조 수정으로 CONSIST-01~03 최종 충족
- 연말정산·4대보험·월세세액공제 3개 계산기에 에러/경고 state, type=text 전환, 요율 표시 버그(4.5%→4.75% 등 3건) 수정 완료
- 라이트 테마 기준 색상 통일 — emerald/red/blue -400 계열을 -600 계열로 교체하여 year-end-tax·rent-tax-credit·vat 3개 계산기 가독성 확보
- 3개 부동산 계산기에 error/warning 분리 패턴, type=text+inputMode 숫자 입력 표준화, 비현실값 경고, 부가세 박스 라이트 색상 수정 적용
- One-liner:
- 7개 부동산 계산기 CONSIST-01~03 최종 충족 — focus:border-blue-600 4개 통일, deposit-return % 필드 inputMode decimal 수정, Phase 30 완료
- 4개 교통/형사 계산기에 에러/경고 state 추가, BAC type=text+inputMode=decimal 변경, dark 테마 잔재(bg-red-900/30, bg-yellow-900/30) → light 테마 전면 수정
- 7개 교통/채권 계산기 dark 테마 잔재(bg-red-500/10) 제거 및 text-red-400→text-red-600 수정으로 라이트 테마 일관성 완전 확보, TypeScript 0 에러 확인
- 손해배상 4개 계산기(damages-general, defamation, medical-malpractice, lost-income)에 에러/경고 state, 필수 필드 표시, type=text 변환, 0원 결과 안내 추가로 16개 UX 요구사항 충족
- 8개 계산기/도구 전체 CONSIST-01~03 충족 최종 검증 — certified-letter hover 다크 테마 잔재 1건 제거, TypeScript 빌드 통과

---

## v1.3 전체 계산기 법률 정확성 감사 (Shipped: 2026-03-24)

**Phases completed:** 9 phases, 23 plans, 28 tasks

**Key accomplishments:**

- 1. [Rule 1 - Bug] 인지액 100원 미만 올림 → 버림 (civil-mediation)
- One-liner:
- One-liner:
- 법적 근거
- One-liner:
- One-liner:
- 근로기준법 제53조·제56조·제55조·제60조·제61조 대조로 연장근로·주휴·연차수당 3개 계산기 법률 감사 완료 및 안내 오류 2건 수정
- 1. [Rule 1 - Bug] 최저임금 검증기: 2026년 최저임금 금액 오류
- 1. [Rule 1 - Bug] 출산휴가급여 상한액 오류
- One-liner:
- 1. [Rule 1 - Bug] 취득세 2주택 비조정 6~9억 구간 계산식 오류
- One-liner:
- One-liner:
- One-liner:
- 1. [Rule 1 - Bug] LTV 조정대상지역 비율 오류 수정
- 1. [Rule 1 - Bug] 교통사고 합의금 법적 근거 법령명 오류
- One-liner:
- 1. [Rule 2 - Missing Critical Functionality] 지연손해금 상사 법정이율 누락
- [Rule 1 - Bug] 민법 제763조 조문 오류 수정
- 1. [Rule 2 - Missing Critical] 일실수입 계산기 생활비 공제 누락
- 1. [Rule 1 - Bug] 내용증명 미리보기 텍스트 불가시 버그 수정
- 1. [Rule 1 - Bug] 국선변호인 필요적 사유 7가지 중 6가지 누락

---

## v1.2 UI/UX 개편 및 라이트 테마 적용 (Shipped: 2026-03-23)

**Phases completed:** 2 phases, 5 plans, 2 tasks

**Key accomplishments:**

- One-Liner:
- High-performance `ParallaxLayer` with GPU-accelerated `translate3d` and staggered fade-in reveals for `CategorySection`

---
