# law-calc AdSense 개선 backlog

위에서부터 진행한다. `[ ]` 대기, `[x]` 완료(커밋 SHA), `[?]` 원문 확인 불가(이유 기재). 한 항목이 하루를 넘으면 쪼갠다.
근거: `evidence-2026-09-26.md` / 계획: `../superpowers/plans/2026-09-26-adsense-plan-v2.md`

## Phase A — 신뢰 훼손 제거

- [x] A0. vitest 설치(`npm i -D vitest`), `"test": "vitest run"` 스크립트 추가, `src/lib/calc/` 폴더와 첫 테스트 1개로 동작 확인 (commit 18866bf)
- [ ] A1-1. bail: 형사소송법 제94조 원문 대조 → 보석 청구권자 목록 수정(`src/lib/tools-data.ts:1102` FAQ, JSON-LD 동일 데이터 확인). 폐지된 '호주' 삭제
- [ ] A1-2. rent-conversion: 주택임대차보호법 시행령 제9조·상가건물 임대차보호법 시행령 제5조 원문 대조, 한국은행 기준금리 공시값 확인. 기준금리를 적용일과 함께 상수 1곳으로, 상가 산식(배수) 테스트 고정 (`page.tsx:181,234`)
- [ ] A1-3. child-support: 서울가정법원 양육비산정기준표 최신 공식본 대조, 판본 표기 정정(`page.tsx:309` "2025 개정"), 대표 셀 5개 이상 테스트 고정
- [ ] A2-1. defamation: 하드코딩 금액표 출력 제거, 본문(100만~1,000만)과 출력 모순 해소. 공식 기준 없는 금액은 출력하지 않고 금액 결정 요소 체크리스트로 전환
- [ ] A2-2. alimony: 하드코딩 위자료 금액표 근거 확인. 근거 없으면 금액 출력 제거 → 체크리스트
- [ ] A2-3. bail: 보석금 금액표 근거 확인. 근거 없으면 금액 출력 제거, 도구 이름·설명을 '보석 요건 확인' 성격으로 변경
- [ ] A2-4. medical-malpractice: 금액 산출 근거 분리(법정 산식 부분만 유지)
- [ ] A2-5. unfair-dismissal: 임금상당액(산식 있음)만 계산, 근거 없는 보상 추정 제거
- [ ] A2-6. accident-settlement: 자동차보험 약관 기준 등 공식 기준 있는 항목만 계산, 출처 표기 (GSC 수요 2위, 삭제 금지)
- [ ] A2-7. damages-general: 산식 있는 항목만 계산 (GSC 수요 3위, 삭제 금지)
- [ ] A3. 운영 표기 정리(실명·도메인 메일 없음): "편집팀" → 실제 체계에 맞게 "개인 운영"으로 통일(about, CalculatorLayout 바이라인, GuideShell, JSON-LD author/publisher). 법률 자격 없음·정정 절차 유지

## Phase B — 템플릿 제거

- [ ] B1-1. CalculatorLayout 공통 반복 문구(결과 해석 주의점, 실무 다음 단계, 조문 원문 안내, 바이라인 등)를 페이지당 면책 1줄로 통합. FAQ 중복 노출 제거
- [ ] B1-2. `/tools` 및 `/tools/<category>` 허브 페이지 생성(분야별 직접 작성 설명, 계산기 선택 기준). sitemap 반영
- [ ] B1-3. `/changelog` 페이지 생성, git 이력의 실제 수치 변경(육아휴직 시행령 제95조 등)과 Phase A 수정 기록
- [ ] B2-01. lost-income 재작성 (GSC 클릭 1위: 호프만/라이프니츠 단계별 산식, 판례 인용, 검산 예시 함수 렌더링)
- [ ] B2-02. accident-settlement 재작성
- [ ] B2-03. damages-general 재작성
- [ ] B2-04. forced-heirship 재작성
- [ ] B2-05. attorney-fee 재작성
- [ ] B2-06. registration-tax 재작성
- [ ] B2-07. drunk-driving 재작성
- [ ] B2-08. overtime-pay 재작성
- [ ] B2-09. defamation 재작성
- [ ] B2-10. inheritance-order 재작성
- [ ] B2-11. severance-pay 재작성
- [ ] B2-12. lawsuit-cost 재작성
- [ ] B2-13. payment-order 재작성
- [ ] B2-14. civil-mediation 재작성
- [ ] B2-15. family-court 재작성
- [ ] B2-16. property-division 재작성
- [ ] B2-17. inheritance-tax 재작성
- [ ] B2-18. dismissal-notice 재작성
- [ ] B2-19. annual-leave-pay 재작성
- [ ] B2-20. weekly-holiday-pay 재작성
- [ ] B2-21. minimum-wage-check 재작성
- [ ] B2-22. industrial-accident 재작성
- [ ] B2-23. maternity-leave 재작성
- [ ] B2-24. parental-leave 재작성
- [ ] B2-25. unemployment-benefit 재작성
- [ ] B2-26. shutdown-allowance 재작성
- [ ] B2-27. capital-gains-tax 재작성
- [ ] B2-28. comprehensive-income-tax 재작성
- [ ] B2-29. acquisition-tax 재작성
- [ ] B2-30. comprehensive-property-tax 재작성
- [ ] B2-31. year-end-tax 재작성
- [ ] B2-32. rent-tax-credit 재작성
- [ ] B2-33. deposit-return 재작성
- [ ] B2-34. brokerage-fee 재작성
- [ ] B2-35. subscription-score 재작성
- [ ] B2-36. late-payment 재작성
- [ ] B2-37. loan-interest 재작성
- [ ] B2-38. unjust-enrichment 재작성
- [ ] B2-39. statute-of-limitations 재작성
- [ ] B2-40. fine-penalty 재작성
- [ ] B2-41. medical-malpractice 재작성
- [ ] B2-42. public-defender 재작성
- [ ] B2-43. legal-aid 재작성
- [ ] B2-44. certified-letter 재작성
- [ ] B3. 수요 없고 공공 계산기와 겹치는 도구(four-insurances, securities-tax, vat, dsr, ltv, dti) 처리: 사용자 사전 승인 = 통합 또는 noindex 허용. GSC 노출 0 확인 후 통합(관련 계산기로 흡수)하거나 noindex+sitemap 제외. 결정은 `tool-triage.md`에 기록
- [ ] B4. `npm run verify:adsense`와 `npm run audit:live` 모두 PASS 확인

## Phase C — 지속 운영 (반복)

반복 작업은 별도 cron(주간 가이드 초안, 주간 지표, 월간 법령 확인)이 맡는다. backlog가 비면 GSC 검색어 중 노출 대비 클릭이 낮은 주제로 가이드/계산기 개선 항목을 새로 추가한다.
