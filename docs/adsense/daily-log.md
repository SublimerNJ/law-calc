# law-calc 일일 작업 일지

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
