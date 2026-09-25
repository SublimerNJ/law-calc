# law-calc 일일 개선 작업 절차 (cron 전용)

이 파일은 매일 10:00 cron 작업이 따르는 절차다. cron 프롬프트는 이 파일을 읽으라고만 한다. 절차를 바꾸려면 이 파일을 고친다.

## 0. 위치와 원칙

- 작업 저장소: `/Volumes/NJ SSD/Coding/law-calc` (main 브랜치). 경로가 없거나 브랜치가 main이 아니면 **즉시 중단**하고 불일치만 보고한다. 다른 경로로 추정 이동하지 않는다.
- 근거: `docs/adsense/evidence-2026-09-26.md`
- 계획: `docs/superpowers/plans/2026-09-26-adsense-plan-v2.md` (Global Constraints를 반드시 따른다)
- 작업 목록: `docs/adsense/backlog.md` (위에서부터 `[ ]` 첫 항목부터 진행)
- 일지: `docs/adsense/daily-log.md` (매일 한 섹션 추가)
- Node: 기본 `node`. `libllhttp` 오류로 죽으면 `PATH='/opt/homebrew/opt/node@24/bin:/usr/bin:/bin:/usr/sbin:/sbin'`로 다시 실행한다.
- 사용자 결정: **운영자 실명 표기 안 함, 도메인 메일 만들지 않음.** 연락처는 기존 `sublimernj@gmail.com` 유지.
- 금지: AdSense 검토 요청 버튼, GSC 색인 요청·설정 변경, 여러 페이지 문구를 스크립트·AI로 일괄 생성, 템플릿을 다른 템플릿으로 교체, 법령 원문 대조 없이 수치 변경, 실제 검토하지 않은 페이지의 검토일·lastmod 변경, `git push --force`, 히스토리 재작성.

## 1. 시작 점검

1. `git status --short`가 비어 있어야 한다. 비어 있지 않으면 건드리지 말고 보고 후 종료.
2. `git pull --ff-only origin main`. 실패하면 보고 후 종료.
3. `npm ci` (package-lock 변경 시에만), `npx vitest run` (vitest가 설치된 뒤부터), `npm run build`가 통과해야 한다. 시작 시점에 이미 깨져 있으면 오늘은 그것만 고친다.

## 2. 오늘 할 일 고르기

- `docs/adsense/backlog.md`에서 `[ ]` 첫 항목부터, **하루 최대 3개 항목 또는 2시간 분량**까지.
- 항목이 법령 수치 확인을 요구하면: 국가법령정보센터(law.go.kr) 원문 본문+부칙과 시행일, 또는 명시된 공식 기관 자료를 web_extract/브라우저로 직접 열어 대조한다. 원문을 열지 못하면 **수정하지 말고** 그 항목을 `[?]`로 바꾸고 이유를 적는다.
- 대조 결과는 `docs/adsense/law-verification.md`에 `| 날짜 | 계산기 | 조문/출처 | URL | 확인 내용 |`로 한 줄씩 남긴다.

## 3. 구현 규칙 (TDD)

- 계산 로직을 고칠 때: `src/lib/calc/<id>.ts` 순수 함수 + `src/lib/calc/<id>.test.ts`. 실패하는 테스트 먼저 → RED 확인 → 구현 → GREEN.
- 페이지 설명은 그 계산기에만 해당하는 내용만 쓴다. 입력 설명은 실제 폼 필드와 1:1, 숫자 예시는 계산 함수 호출 결과로 렌더링(하드코딩 금지).
- 한 페이지에 FAQ는 한 번만.
- 실제로 내용을 바꾼 계산기만 `reviewedAt`/`updatedAt`을 오늘 날짜로 바꾼다.
- 수치·조문이 바뀌면 `/changelog` 데이터에 한 줄 추가 (changelog가 생긴 뒤부터).

## 4. 검증 게이트 (전부 통과해야 push)

```bash
npx vitest run            # vitest 설치 후
npm run lint
npm run build
node scripts/adsense-ratchet.mjs --local --update
```

- ratchet은 템플릿 지표(소스 중복·숫자 없는 예시·마커·빌드 결과 중복)가 **하나라도 늘면 실패**한다. 실패하면 push하지 않는다.
- 게이트 실패 시: 원인을 고치거나, 오늘 변경을 `git stash`/`git checkout -- .`로 되돌리고 원인만 보고한다. 절대 게이트를 우회하거나 스크립트를 느슨하게 고치지 않는다(가드레일 스크립트 수정 금지).

## 5. 배포 (사용자 사전 승인: 게이트 통과 시 자동 배포)

1. 계산기·항목별로 커밋. 메시지 예: `fix(law): bail 청구권자 형사소송법 제94조 원문 반영`.
2. `docs/adsense/ratchet.json`, `backlog.md`, `daily-log.md`, `law-verification.md` 갱신 커밋.
3. `git push origin main`.
4. 배포 확인: 3~5분 대기 후 바꾼 페이지 URL을 `curl`로 받아 새 문구가 실서버에 있는지 확인. 없으면 10분까지 재시도. 그래도 없으면 "배포 미확인"으로 보고.
5. 배포 확인 후 `node scripts/adsense-ratchet.mjs --live --update`로 실서버 지표 기록.

## 6. 신청 준비 판정 (매일)

`docs/adsense/metrics.md`의 최신 GSC 값(주간 지표 cron이 기록)과 오늘 상태로 게이트를 판정한다.

| 게이트 | 기준 |
|---|---|
| G1 운영 기간 | 오늘 ≥ 2026-12-25 |
| G2 자연 유입 | GSC 월 클릭 ≥ 1,000, 최근 2개월 연속 |
| G3 유입 분산 | 상위 1개 페이지 클릭 비중 < 50% |
| G4 법령 | backlog의 법령 항목 전부 `[x]`, `[?]` 0개, 재량 금액 추정 계산기 0개 |
| G5 템플릿 | `npm run verify:adsense` PASS, `npm run audit:live` PASS |
| G6 운영 이력 | 최근 3개월 각 달 changelog/daily-log 실제 콘텐츠 변경 ≥ 4회 |

- **6개 전부 충족한 날**: 보고 첫 줄에 `🟢 AdSense 재신청 준비 완료`를 쓰고 게이트별 근거 수치를 표로 붙인다. 검토 요청은 하지 않는다(사용자가 직접 누른다).
- 그 외: 게이트별 현재값과 미충족 항목만 한 줄씩.

## 7. 일지와 보고

`docs/adsense/daily-log.md`에 추가:

```
## YYYY-MM-DD
- 완료: <항목> (commit <sha>)
- 법령 대조: <조문> — <결과>
- ratchet: sourceNormalizedRepeats a→b, sourceExamplesWithoutDigits a→b, liveNormalizedRepeats a→b
- 배포: 확인/미확인 (<URL>)
- 게이트: G1 ✗(d-90) G2 ✗(월 62) G3 ✗(68%) G4 ✗(남은 3) G5 ✗ G6 ✗
- 막힌 점/다음 할 일
```

최종 보고(Telegram)는 한국어로 짧게: 오늘 완료 항목, 배포 확인 여부, 지표 변화, 게이트 현황, 사용자 결정이 필요한 것. backlog가 전부 끝났으면 "backlog 소진 — 다음 작업 목록 필요"를 쓴다.
