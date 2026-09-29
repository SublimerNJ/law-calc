# law-calc 일일 작업 일지

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
