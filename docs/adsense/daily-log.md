# law-calc 일일 작업 일지

## 2026-10-13
- 완료: B2-03 `damages-general` 재작성 — 치료비·수리비·자료로 확인된 일실이익·기타 확인액을 항목별로 입력해 중복을 확인하고, 입력 과실비율만 적용하도록 계산 함수·페이지·메타데이터·품질 블록을 개편함 (commit 2972124)
- 법령 대조: 민법 제750조·제393조·제396조·제751조·제763조 현행 조문 페이지 [시행 2026. 3. 17.] 재확인. 새 법정 수치·산식은 추가하지 않고 2026-10-06 본문·부칙 대조 범위를 유지함.
- TDD·검증: RED(항목별 합산·함수 검산 예시 API 부재) → GREEN. `npx vitest run` 14개 파일·55개 테스트, `npm run lint`, `npm run build`, `git diff --check` 통과. 로컬 `/tools/damages/damages-general`·`/sitemap.xml` 200, 네 항목·5,600,000원 함수 검산·기존 위자료 기준액 문구 부재 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 48→48, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (`verify:adsense` 기존 tool-quality 템플릿 marker·소스 정규화 중복 FAIL, `audit:live` 실서버 정규화 중복 64개 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 179클릭·최근 28일 66클릭, 월 1,000×2개월 미충족) G3 ✗(62.6%, 112/179) G4 ✓(backlog 법령 `[?]` 0개·재량 금액 추정 0개) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개·template marker 170개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(2026-08 1회·2026-09 4회·2026-10 12회 실제 콘텐츠 변경으로 8월 기준 미달)
- 막힌 점/다음 할 일: 기존 `tool-quality.ts` 공통 템플릿 marker·중복이 G5를 계속 차단함. 다음 backlog는 B2-04 `forced-heirship` 재작성. 사용자 결정 필요 사항 없음.

## 2026-10-12
- 완료: B2-02 `accident-settlement` 재작성 — 상해·후유장애 1~14급 선택지에 별표 한도금액을 표시하고, 상해·후유장애 한도 합산·초과분을 순수 함수로 다시 계산하는 검산 예시와 자료 확인 순서를 추가함. 계산 결과는 선택 등급을 결과 객체에 보존해 입력 변경 후에도 표시가 어긋나지 않게 함 (commit 5f3b281)
- 법령 대조: 자동차손해배상 보장법 시행령 현행 본문·부칙 [시행 2026. 9. 15.] 제3조와 별표 1·2 PDF를 국가법령정보센터에서 다시 직접 열어 대조. 1~14급 한도 및 부상 후 후유장애 한도 합산 구조를 확인하고 `law-verification.md`에 기록함.
- TDD·검증: RED(등급별 한도 조회·함수 검산 예시 export 부재) → GREEN. `npx vitest run` 14개 파일·54개 테스트, `npm run lint`, `npm run build`, `git diff --check` 통과. 로컬 `/tools/traffic/accident-settlement`·`/sitemap.xml` 200 및 검산 예시·등급별 금액·sitemap lastmod 원문 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 48→48, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 template marker·소스 정규화 중복 FAIL, `audit:live` 실서버 정규화 중복 64개 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 179클릭·최근 28일 66클릭, 월 1,000×2개월 미충족) G3 ✗(62.6%, 112/179) G4 ✓(backlog 법령 `[?]` 0개·재량 금액 추정 0개) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개·template marker 170개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(2026-08 1회·2026-09 4회·2026-10 11회 실제 콘텐츠 변경으로 8월 기준 미달)
- 막힌 점/다음 할 일: 기존 `tool-quality.ts` 공통 템플릿 marker·중복이 G5를 계속 차단함. 다음 backlog는 B2-03 `damages-general` 재작성. 사용자 결정 필요 사항 없음.

## 2026-10-11
- 완료: B2-01 `lost-income` 재작성 — 기존 인라인 계산을 순수 함수·테스트로 분리하고, 호프만식(월 단리·240 상한)과 라이프니츠식(월 복리)을 선택해 치료·취업불능 기간과 치료 후 노동능력상실분을 단계별로 계산하도록 개편함. 소득·가동연한·치료기간·상실률·과실비율의 입력 설명, 공식 판례 출처, 관련 계산기 링크와 함수 호출로 렌더링되는 검산 예시를 추가함 (commit 164e8ce)
- 법령 대조: 민법 제763조 및 부칙 [시행 2026. 3. 17.], 대법원 2018다248909(가동연한), 94다30065(호프만 계수 240 상한), 89다카27949(생계비 3분의 1), 국가법령정보센터의 호프만·라이프니츠 적용 판결 원문을 직접 확인하고 `law-verification.md`에 기록함.
- TDD·검증: RED(계산 모듈 부재) → GREEN. `npx vitest run` 14개 파일·52개 테스트, `npm run lint`, `npm run build` 통과. 로컬 `/tools/damages/lost-income`·`/sitemap.xml` 200, raw HTML에서 단계별 산식·판례·함수 검산 예시와 계산 결과 렌더링 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 48→48, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 template marker·소스 정규화 중복 FAIL, `audit:live` 실서버 정규화 중복 64개 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭·최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✓(backlog 법령 `[?]` 0개·재량 금액 추정 0개) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개·template marker 170개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(2026-08 1회·2026-09 4회·2026-10 10회 실제 콘텐츠 변경으로 8월 기준 미달)
- 막힌 점/다음 할 일: 기존 `tool-quality.ts` 공통 템플릿 marker·중복이 G5를 계속 차단함. 다음 backlog는 B2-02 `accident-settlement` 재작성. 사용자 결정 필요 사항 없음.

## 2026-10-10
- 완료: B1-3 `/changelog` 페이지와 실제 변경 기록 데이터 추가. 2026-08-19 육아휴직급여 시행령 제95조 수치 변경부터 2026-10-09 분야별 허브까지 실제 Git 커밋 14개와 공식 출처를 날짜·변경 전후 범위·커밋 링크로 공개하고, sitemap·푸터에 연결함 (commit 5685f86)
- 법령 대조: 해당 없음(오늘 새 법령 수치 변경 없음; 기존 Phase A 대조 기록과 `docs/adsense/law-verification.md`의 공식 출처를 변경 이력에 연결함)
- TDD·검증: RED(`src/lib/changelog.ts` 모듈 부재) → GREEN. Vitest 13개 파일·48개 테스트, lint, build 통과. 로컬 `/changelog`·`/sitemap.xml`·`/tools` 200, `/tools/no-such-category` 404, changelog 14개 기록·sitemap `/changelog` 포함 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 48→48, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 template marker·소스 중복 FAIL, `audit:live` 실서버 정규화 중복 64개 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭·최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✓(법령 `[?]` 0개·재량 금액 추정 0개) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개·template marker 170개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(changelog 실제 변경 2026-08 1회·2026-09 4회·2026-10 9회로 8월 기준 미달)
- 막힌 점/다음 할 일: 기존 `tool-quality.ts` 템플릿 중복이 G5를 계속 차단함. 다음 backlog는 B2-01 `lost-income` 재작성. 사용자 결정 필요 사항 없음.

## 2026-10-09
- 완료: B1-2 `/tools` 디렉터리와 9개 분야별 `/tools/<category>` 허브를 추가하고, 분야별 선택 기준·입력자료 설명·계산기 연결을 직접 작성함. Header/Footer의 분야 링크와 sitemap에도 반영함 (commit 32f87c1)
- 법령 대조: 해당 없음(새 허브 정보 구조·콘텐츠 연결 작업; 법령 수치 변경 없음)
- TDD·검증: RED(`category-hubs` 모듈 부재) → GREEN. Vitest 12개 파일·44개 테스트, lint, build 통과. 로컬 sitemap 82개 URL·새 허브 10개 응답·오류 0개, 알 수 없는 분야 404 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 48→48, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` FAIL·`audit:live` FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭·최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✓(A1·A2 완료, `[?]` 0개, 재량 금액 추정 0개) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개·template marker 170개, 로컬 정규화 중복 48개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(changelog 없음·최근 3개월 각 4회 실제 콘텐츠 변경 없음)
- 막힌 점/다음 할 일: 기존 `tool-quality.ts` 템플릿 마커·공통 quality 문구가 G5를 계속 막음. 다음 backlog 항목은 B1-3 `/changelog` 페이지 생성. 사용자 결정 필요 사항 없음.

## 2026-10-08
- 완료: B1-1 CalculatorLayout 공통 반복 문구 정리 — 결과 해석 주의점·실무 다음 단계·조문 원문 안내·반복 바이라인을 도구별 한 줄 면책으로 통합하고, FAQ와 겹치는 quality 예시·조건을 한 번만 노출함 (commit 674ea16)
- 법령 대조: 해당 없음(공통 레이아웃·중복 콘텐츠 정리)
- TDD·검증: RED(공통 콘텐츠 모듈·FAQ 조건 필터 미존재) → GREEN. Vitest 11개 파일·42개 테스트, lint, TypeScript, build 통과. 로컬 72개 sitemap 페이지를 오류 없이 받아 대표 계산기에서 면책 1개·FAQ 질문 1개와 제거 문구 부재 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 60→48, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`와 `audit:live` 실패로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭·최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✓(A1·A2 완료, `[?]` 0개, 재량 금액 추정 0개) G5 ✗(`verify:adsense` FAIL·source 정규화 중복 34개·template marker 170개, 로컬 정규화 중복 48개, `audit:live` FAIL·실서버 64개) G6 ✗(changelog 없음·최근 3개월 각 4회 실제 콘텐츠 변경 없음)
- 막힌 점/다음 할 일: 기존 `tool-quality.ts` 템플릿 마커·공통 quality 문구가 G5를 계속 막음. 다음 backlog 항목은 B1-2 `/tools` 및 분야별 허브 페이지 생성. 사용자 결정 필요 사항 없음.

## 2026-10-07
- 완료: A3 운영 표기 정리 — about, CalculatorLayout 바이라인, GuideShell, 메타데이터·JSON-LD author/publisher와 도구 데이터의 "편집팀" 표기를 "개인 운영"으로 통일. 법률 자격 없음·정정 절차·기존 sublimernj@gmail.com 연락처는 유지함 (commit fc49c07)
- 법령 대조: 해당 없음(운영 주체 표기 변경)
- TDD·검증: 계산 로직 변경 없음. Vitest 10개 파일·39개 테스트, lint, TypeScript, build 통과. 로컬 /about·가이드·계산기 응답에서 "개인 운영" 표시와 "편집팀" 부재 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 81→81, sourceMarkerHits 170→170, localNormalizedRepeats 60→60, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 템플릿 마커·34개 정규화 중복 FAIL, `audit:live` 실서버 64개 정규화 중복 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭·최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✓(A1·A2 법령·재량 금액 항목 완료, [?] 0) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(changelog 없음·최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복이 G5를 계속 막아 push하지 않음. 다음 backlog 항목은 B1-1 CalculatorLayout 공통 반복 문구 정리. 사용자 결정 필요 사항 없음.

## 2026-10-06
- 완료: A2-7 damages-general — 자료로 확인된 치료비·수리비·일실이익 등 재산상 손해액에 입력 과실비율만 적용하는 순수 함수·테스트·페이지로 개편. 위자료·개호비·장해·제조물 결함·인과관계·실제 배상액 추정을 제거하고 민법 공식 원문 링크를 표기함 (commit 3fdddc1)
- 법령 대조: 국가법령정보센터 민법 [시행 2026. 3. 17.] 제750조·제393조·제396조·제751조·제763조 본문·부칙 목록과 제조물책임법 [시행 2018. 4. 19.] 제3조 본문·부칙을 직접 확인. 불법행위 손해배상·손해 범위·과실상계·재산 이외 손해·준용 구조를 확인했으나 사건별 위자료 정액표·과실비율 자동 산식은 확인되지 않아 계산에서 제외함.
- TDD·검증: RED(계산 모듈 없음) → GREEN, 전체 Vitest 10개 파일·39개 테스트 통과, lint, TypeScript, build 통과. 로컬 빌드 응답에서 새 입력·공식 원문 링크와 기존 위자료 기준액·금액 발송 템플릿 부재를 확인.
- ratchet: sourceNormalizedRepeats 34→34, sourceExamplesWithoutDigits 83→81, sourceMarkerHits 174→170, localNormalizedRepeats 60→60, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 템플릿 마커·34개 정규화 중복 FAIL, `audit:live` 실서버 64개 정규화 중복 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭·최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✓(A1·A2 법령·재량 금액 항목 완료, [?] 0) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 34개, `audit:live` FAIL·실서버 정규화 중복 64개) G6 ✗(changelog 없음·최근 3개월 각 4회 실제 변경 근거 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복이 G5를 계속 막아 push하지 않음. 다음 backlog 항목은 A3 운영 표기 정리. 사용자 결정 필요 사항 없음.

## 2026-10-05
- 완료: A2-6 accident-settlement — 자동차손해배상 보장법 시행령 별표 1·2의 상해·후유장애급별 책임보험금 한도와 확인된 인적 손해액만 비교하도록 순수 함수·테스트·페이지를 개편. 입원·통원 일수 기반 위자료, 후유장애 정액 추정, 일실수입·향후치료비·과실비율·합의금 추정을 제거하고 국가법령정보센터·손해보험협회·금융감독원 공식 출처를 표기함 (commit 8d279c7)
- 법령 대조: 자동차손해배상 보장법 시행령 현행 본문·부칙 [시행 2026. 9. 15.] 제3조와 별표 1·2 PDF [별표 개정 2021. 1. 5.]를 직접 확인. 별표 1 상해급별 1~14급 한도와 별표 2 후유장애급별 1~14급 한도를 코드 상수와 대조하고, 제3조 제2항 제2호의 부상·후유장애 한도 합산을 확인. 손해보험협회 과실비율 인정기준·금융감독원 자동차보험 표준약관 원문도 확인했으나 사고별 과실비율·약관상 위자료·일실수입은 단일 산식으로 확정하지 않음.
- TDD·검증: RED(계산 모듈 없음) → GREEN, 전체 Vitest 9개 파일·35개 테스트, TypeScript 검사, lint, build 통과. 로컬 빌드 앱에서 확인된 손해액 200,000,000원·상해 1급·후유장애 1급 입력 → 상해 한도 30,000,000원 + 후유장애 한도 150,000,000원 = 합산 한도·한도 내 참고액 180,000,000원, 초과분 20,000,000원 확인. 기존 일당 위자료·과실비율 UI 부재도 확인.
- ratchet: sourceNormalizedRepeats 38→34, sourceExamplesWithoutDigits 85→83, sourceMarkerHits 178→174, localNormalizedRepeats 64→60, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense` 기존 템플릿 마커·34개 정규화 중복 FAIL, `audit:live` 실서버 64개 정규화 중복 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 187클릭, 최근 28일 73클릭, 월 1,000×2개월 미충족) G3 ✗(64.2%, 120/187) G4 ✗(A2-7 damages-general 미완료) G5 ✗(`verify:adsense` 기존 템플릿 FAIL, `audit:live` 64개 중복 FAIL) G6 ✗(최근 3개월 각 4회 실제 변경 근거 및 changelog 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복이 G5를 계속 막아 push하지 않음. 다음 backlog 항목은 A2-7 damages-general 공식 산식만 유지. 사용자 결정 필요 사항 없음.

## 2026-10-04
- 완료: A2-5 unfair-dismissal — 보상금·위로금 추정을 제거하고, 입력한 1일 기준 임금 × 해고기간 일수로 임금상당액만 계산하는 순수 함수·페이지로 전환. 중간수입 공제, 금전보상명령의 추가 금품, 해고예고수당·퇴직금은 계산하지 않도록 분리하고 관련 템플릿·문구를 제거 (commit 1c9ee88)
- 법령 대조: 국가법령정보센터 근로기준법 현행 본문·부칙 [시행 2026. 10. 2.]의 제2조 제1항 제6호·제2항(평균임금), 제23조, 제27조, 제28조, 제30조 제3항·제4항을 확인. 중앙노동위원회 공식 구제 절차, 찾기쉬운 생활법령정보의 노동위원회규칙 제65조 금전보상 산정기간, 대법원 2019두52386 판결 원문도 대조함.
- TDD·검증: RED(계산 모듈 없음) → GREEN, 전체 Vitest 8개 파일·31개 테스트, lint, build 통과. 로컬 브라우저에서 1일 기준 임금 100,000원·2026-01-01~2026-06-30 입력 → 180일·18,000,000원과 산식을 확인.
- ratchet: sourceNormalizedRepeats 38→38, sourceExamplesWithoutDigits 87→85, sourceMarkerHits 182→178, localNormalizedRepeats 64→64, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`·`audit:live` 기존 템플릿 중복 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 미충족) G3 ✗(66.7%, 112/168) G4 ✗(A2-6~A2-7 재량 금액 항목 2개 미완료) G5 ✗(`verify:adsense` FAIL·소스 정규화 중복 38개, `audit:live` FAIL·실서버 정규화 중복 68개) G6 ✗(최근 3개월 각 4회 실제 변경 근거 및 changelog 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복이 G5를 계속 막아 push하지 않음. 다음 backlog 항목은 A2-6 accident-settlement 공식 기준 대조. 사용자 결정 필요 사항 없음.

## 2026-10-03
- 완료: A2-4 medical-malpractice — 치료비·향후 치료비·일실수입 합계에 입력 책임비율만 적용하는 순수 계산 함수로 분리하고, 근거 없는 위자료·개호비·장해 정액 추정과 배상 통보 템플릿을 제거 (commit 237ba24)
- 법령 대조: 민법 제750조·제751조·제763조와 부칙 [시행 2026. 3. 17.], 의료사고 피해구제 및 의료분쟁 조정 등에 관한 법률 제1조·제27조·제35조와 부칙 [시행 2025. 6. 21.]의 현행 본문·부칙을 국가법령정보센터에서 확인. 제35조가 손해·보건의료기관개설자 또는 보건의료인의 과실 정도·환자 귀책사유를 고려하도록 하므로 사건별 위자료 정액 추정을 유지하지 않음. 한국의료분쟁조정중재원 공식 홈페이지의 상담번호 1670-2545도 대조.
- TDD·검증: RED(계산 모듈 없음) → GREEN, 전체 Vitest 7개 파일·27개 테스트, lint, build 통과. 로컬 렌더링에서 새 제목·재산상 손해 계산식·공식 기관 링크와 구 위자료 프리셋·`{{AMOUNT}}` 부재 확인.
- ratchet: sourceNormalizedRepeats 39→38, sourceExamplesWithoutDigits 89→87, sourceMarkerHits 186→182, localNormalizedRepeats 65→64, liveNormalizedRepeats 68→68
- 배포: 미확인·미배포 (https://law-calc.kr, `verify:adsense`·`audit:live` 기존 템플릿 중복 FAIL으로 push하지 않음)
- 게이트: G1 ✗(2026-12-25 전) G2 ✗(최근 3개월 168클릭, 최근 28일 48클릭, 월 1,000×2개월 미충족) G3 ✗(66.7%, 112/168) G4 ✗(A2-5~A2-7 재량 금액 항목 3개 미완료) G5 ✗(`verify:adsense` FAIL·정규화 중복 38개, `audit:live` FAIL·실서버 정규화 중복 68개) G6 ✗(최근 3개월 각 4회 실제 변경 근거 및 changelog 없음)
- 막힌 점/다음 할 일: 기존 템플릿 중복으로 push하지 않음. 다음 backlog 항목은 A2-5 unfair-dismissal 임금상당액 산식만 유지. 사용자 결정 필요 사항 없음.

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
