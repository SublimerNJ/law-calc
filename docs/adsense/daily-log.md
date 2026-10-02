# law-calc 일일 작업 일지

## 2026-10-02
- 완료: A2-3 bail — 국가법령정보센터 형사소송법 제94조~제104조 본문·부칙을 대조하고, 사건별 보석금 표·범위·산식 근거가 없어 `형사 보석 요건 확인` 점검표로 전환. 금액 입력·출력·예상 범위·금액 발송 템플릿 제거 (commit faf809e)
- 법령 대조: 형사소송법 [시행 2026. 10. 2.] [법률 제21857호, 2026. 8. 4., 일부개정]의 제94조 청구권자, 제95조 필요적 보석 예외, 제98조 조건, 제99조 고려사항·자금능력 제한, 제102조 취소, 제103조 몰취, 제104조 환부 및 부칙 시행일을 공식 원문으로 확인. 사건별 보석금 정액표·예상 범위·산식은 확인되지 않아 금액을 산출하지 않음.
- TDD·검증: RED(보석 요건·금액 출력 제거 테스트 실패) → GREEN, 전체 Vitest 6개 파일·23개 테스트, lint, build 통과. 로컬 렌더링에서 새 제목·법정 체크리스트와 구 금액 문구·`{{AMOUNT}}` 부재 확인.
- ratchet: sourceNormalizedRepeats 39→39, sourceExamplesWithoutDigits 89→89, sourceMarkerHits 190→186, localNormalizedRepeats 65→65, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, 사용자 사전 승인 및 G5 통과 전이라 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 미충족) G3 ✗(66.7%, 112/168) G4 ✗(A2-4~A2-7 재량 금액 항목 4개 미완료) G5 ✗(`verify:adsense` FAIL·기존 템플릿 중복 39개, `audit:live` FAIL·실서버 정규화 중복 68개) G6 ✗(최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복으로 push하지 않음. 다음 backlog 항목은 A2-4 medical-malpractice 금액 산출 근거 분리. 사용자 결정 필요 사항 없음.

## 2026-10-01
- 완료: A2-2 alimony — 공식 법령·판례에 없는 하드코딩 위자료 금액표·예상 범위·금액 템플릿을 제거하고, 유책행위·혼인기간·가족관계·증거를 정리하는 판단요소 점검표로 전환 (commit be59429)
- 법령 대조: 민법 제806조·제843조 현행 본문·부칙 목록 [시행 2026. 3. 17.], 대법원 87므5·87므6 및 2024므11526·11533 공식 원문 확인. 법원은 사건의 모든 사정을 종합해 판단하며 일반 위자료 정액표·단일 산식은 확인되지 않아 금액 출력을 제거함.
- TDD·검증: RED(모듈 없음) → GREEN, alimony 2개 테스트 통과. 전체 Vitest 6개 파일·20개 테스트, lint, build 통과.
- ratchet: sourceNormalizedRepeats 39→39, sourceExamplesWithoutDigits 89→89, sourceMarkerHits 194→190, localNormalizedRepeats 65→65, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 템플릿 중복 FAIL·`audit:live` 정규화 중복 68개 FAIL)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 미충족) G3 ✗(66.7%, 112/168) G4 ✗(A2-3~A2-7 재량 금액 항목 5개 미완료) G5 ✗(`verify:adsense` FAIL·소스 템플릿 중복, `audit:live` FAIL·정규화 중복 68개) G6 ✗(최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복으로 push하지 않음. 다음 backlog 항목은 A2-3 bail 보석금 금액표 근거 확인.

## 2026-09-30
- 완료: A2-1 defamation — 하드코딩 금액표·예상 위자료 출력 제거, 사건별 손해배상 결정요소 점검표로 전환하고 메타데이터·FAQ·전문·잔여 금액 템플릿을 정리 (commit 0cb45be)
- 법령 대조: 민법 제751조, 형법 제307조·제309조·제310조·제311조, 정보통신망법 제70조 및 대법원 「불법행위 유형별 적정한 위자료 산정방안」 원문 확인. 법정형·사법부 산정방안은 민사 손해배상 자동 계산식으로 사용하지 않음.
- TDD·검증: RED(모듈 없음) → GREEN, Vitest 5개 파일·18개 테스트 통과, lint 통과, build 통과.
- ratchet: sourceNormalizedRepeats 42→39, sourceExamplesWithoutDigits 89→89, sourceMarkerHits 198→194, localNormalizedRepeats 68→65, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`·`audit:live` 기존 템플릿 중복 실패)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 근거 없음) G3 ✗(66.7%, 112/168) G4 ✗(A2-2~A2-7 재량 금액 항목 6개 미완료) G5 ✗(`verify:adsense` FAIL·소스 중복 39개, `audit:live` FAIL·정규화 중복 68개) G6 ✗(최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: G5 기존 템플릿 중복으로 push하지 않음. 다음 backlog 항목은 A2-2 alimony 위자료 금액표 근거 확인.

## 2026-09-29
- 완료: A1-3 child-support — 서울가정법원 2021년 양육비산정기준표 공식 게시글·첨부 PDF 대조, `2025 개정` 표기를 2021년 공표·2022. 3. 1. 시행으로 정정, 공식 11개 소득구간·6개 연령구간 계산 로직과 대표 셀 6개 테스트 추가 (commit faac73b)
- 법령 대조: 서울가정법원은 2021. 12. 22. 기준표를 공표하고 2022. 3. 1.부터 시행. 표의 자녀 1인 평균양육비를 코드에 반영하고, 자녀 수·지역·재산·치료비·교육비 가산·감산은 법원 판단 요소로 명시.
- TDD·검증: RED(모듈 없음) → GREEN, Vitest 4개 파일·16개 테스트 통과, lint 통과, build 통과.
- ratchet: sourceNormalizedRepeats 42→42, sourceExamplesWithoutDigits 89→89, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`·`audit:live` 기존 템플릿 중복 실패)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 근거 없음) G3 ✗(66.7%, 112/168) G4 ✗(A2-1~A2-7 재량 금액 항목 미완료) G5 ✗(`verify:adsense` FAIL, `audit:live` FAIL·정규화 중복 68개) G6 ✗(최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복으로 push하지 않음. 다음 backlog 항목은 A2-1 defamation 금액표 근거 확인·체크리스트 전환.

## 2026-09-28
- 완료: A1-2 rent-conversion — 주택임대차보호법 제7조의2·시행령 제9조, 상가건물 임대차보호법 제12조·시행령 제5조 및 한국은행 기준금리 원문 대조. 기준금리(연 3.00%, 2026-08-27 적용일) 상수화, 주택 전환율 계산 로직 분리, 상가 4.5배 산식 테스트 추가 (commit bddd90c)
- 법령 대조: 주택은 기준금리+연 2%p와 연 10% 중 낮은 비율, 상가는 기준금리×4.5배와 연 12% 중 낮은 비율임을 현행 본문·부칙과 한국은행 공시표에서 확인.
- ratchet: sourceNormalizedRepeats 42→42, sourceExamplesWithoutDigits 89→89, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`·`audit:live` 기존 템플릿 중복 실패)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 근거 없음) G3 ✗(66.7%, 112/168) G4 ✗(A1-3 및 A2-1~A2-7 미완료) G5 ✗(`verify:adsense` FAIL, `audit:live` FAIL) G6 ✗(최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복으로 push하지 않음. 다음 backlog 항목은 A1-3 child-support 공식 기준표 대조.

## 2026-09-27
- 완료: A1-1 bail — 형사소송법 제94조 원문 기준 보석 청구권자 수정 및 관련 숫자 예시 정합성 테스트 추가 (commit dcc843d)
- 법령 대조: 형사소송법 제94조 — 국가법령정보센터 현행 본문 [시행 2026. 7. 1.]과 부칙 확인. 폐지된 호주를 제거하고 형제자매·가족·동거인·고용주를 반영함.
- ratchet: sourceNormalizedRepeats 42→42, sourceExamplesWithoutDigits 89→89, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`·`audit:live` 기존 템플릿 중복 실패)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 176클릭, 월 1,000×2개월 근거 없음) G3 ✗(68%) G4 ✗(A1-2·A1-3 및 재량 금액 항목 미완료) G5 ✗(`verify:adsense` FAIL, `audit:live` FAIL) G6 ✗(최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복이 G5를 계속 막아 push하지 않음. 다음 backlog 항목은 A1-2 rent-conversion 원문·기준금리 대조.

## 2026-09-26
- 근거 재조사 완료 (`evidence-2026-09-26.md`), 계획 v2 수립
- 가드레일(`verify:adsense`, `audit:live`)과 ratchet 기준선 기록: sourceNormalizedRepeats 42, sourceExamplesWithoutDigits 89, sourceMarkerHits 198, local/liveNormalizedRepeats 68
- 사용자 결정: 운영자 실명·도메인 메일 표기 안 함, 게이트 통과 시 자동 배포 허용, 수요 없는 중복 도구 통합/noindex 허용
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 176클릭, 월 1,000×2개월 근거 없음) G3 ✗(68%) G4 ✗(법령 항목·재량 금액 처리 미완료) G5 ✗(verify:adsense FAIL, audit:live FAIL) G6 ✗(최근 3개월 각 4회 변경 기록 없음)

## 2026-09-26
- 완료: A0 vitest 설치·`test` 스크립트·계산 순수 함수 첫 테스트 추가 (commit 18866bf)
- 법령 대조: 해당 없음(A0 테스트 기반 작업)
- ratchet: sourceNormalizedRepeats 42→42, sourceExamplesWithoutDigits 89→89, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, G5 실패로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 176클릭, 월 1,000×2개월 근거 없음) G3 ✗(68%) G4 ✗(법령 항목·재량 금액 처리 미완료) G5 ✗(verify:adsense FAIL, audit:live FAIL) G6 ✗(최근 3개월 각 4회 변경 기록 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복으로 `verify:adsense`와 `audit:live`가 각각 FAIL. 다음 backlog 항목은 A1-1 bail 법령 원문 대조.
