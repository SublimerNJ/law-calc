# AdSense "가치가 별로 없는 콘텐츠" 근본 원인 수정 계획

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans 또는 subagent-driven-development. 체크박스(`- [ ]`)로 진행을 추적한다.

**Goal:** law-calc.kr이 "템플릿으로 대량 생산된 계산기 모음"이 아니라 "직접 검산 가능한, 유지관리되는 법률 계산 도구"로 보이게 구조를 바꾼 뒤, 한 번에 제대로 재신청한다.

**Architecture:** (1) 스크립트가 만든 가짜 품질 블록 제거 → (2) 계산기 함수 출력과 일치하는 실제 검산 예시만 노출 → (3) 근거 없는 추정 계산기 정리 → (4) 신뢰·유지관리 신호 보강 → (5) 가드레일 스크립트로 재발 방지 → (6) 색인·유입 확인 후 재신청.

**Tech Stack:** Next.js 16.2.1 / React 19 / TypeScript, Vercel, `scripts/verify-adsense-content-quality.js`

---

## 0. 진단 근거 (2026-09-26 실측)

측정 방법: `sitemap.xml`의 72개 URL을 전부 내려받아 `<main>` 텍스트를 줄 단위로 비교.

| 발견 | 수치 | 의미 |
|---|---|---|
| 숫자 예시 섹션 제목이 `"{계산기명} 기본 검산"` / `"{계산기명} 조건 변경"` | **55개 중 50개** | 예시에 숫자가 없음. 본문은 FAQ 1·2번을 그대로 복사함 |
| `「FAQ 1번」의 일반론을 본인 사안에 그대로 대입하면 안 됩니다` | 50개 | `build-adsense-quality.py` 177행이 자동 생성함 |
| "입력값 정의"가 카테고리 공용 목록 | 9개 카테고리 전부 | 중개보수에 "대출 조건", 내용증명에 "중단·정지 사유", 보석금에 "혈중알코올·벌점" 등 계산기와 맞지 않는 항목 |
| 모든 계산기 페이지에 동일 문장 5종 | 55/55 | 면책·주의·다음 단계 보일러플레이트 |
| FAQ가 한 페이지에 2번 노출됨 | 50개 | "숫자 예시"와 FAQ 섹션에 같은 문장 |
| 검토일·sitemap lastmod | 72개 전부 2026-08-18/19 하루 | 일괄 스크립트 갱신 흔적 |
| 계산기 페이지 본문 | 평균 약 2,500자, 그중 상당량이 위 반복 | 계산 UI를 빼면 실제 고유 정보가 적음 |
| 가이드 | 10개, 1,100~2,500자, 마지막 게시 2026-04 | 꾸준한 운영 신호가 약함 |
| 운영 주체 | "law-calc.kr 편집팀", gmail, 실명·자격 없음 | YMYL(법률·세금) 분야에서 신뢰 신호가 약함 |
| 재량 판단 결과를 숫자로 출력 | 보석금·위자료·명예훼손·의료사고·교통사고 합의금·부당해고 보상금 등 | 법원 재량 사안에 근거 없는 금액 → 오도성·저가치 판정 위험 |

### 근본 원인

1. **대량 생산 흔적 (핵심)**: 7/31·8/19 수정이 "반복 문구 제거"를 목표로 했지만 **다른 템플릿으로 바꿨을 뿐**이다. 계산기명만 바꿔 끼운 섹션 구조가 55페이지에 그대로 남아 있다. Google 품질 분류기와 검토자에게는 여전히 scaled content로 보인다.
2. **YMYL 신뢰 부족**: 익명 편집팀과 gmail 운영, 근거 없는 재량 금액 추정.
3. **사용자 관심 증거 부족**: 검토 기준 3번("실제적인 사용자 관심")을 판단할 유입 데이터가 확인되지 않았다. Task 1에서 확인한다.
4. **작은 수정 뒤 반복 재신청**: 구조가 그대로면 같은 판정이 반복된다.

## Global Constraints

- 새 문구를 AI나 스크립트로 55개에 일괄 생성하지 않는다. 템플릿을 다른 템플릿으로 교체하는 방식은 금지한다.
- 예시 숫자는 **해당 계산기의 실제 계산 함수 출력과 테스트로 일치**해야 한다.
- 법령 수치는 국가법령정보센터 원문(본문+부칙, 시행일)과 한 줄씩 대조하고, 미검증 항목은 "검증 완료"로 표시하지 않는다.
- 이 계획의 모든 Task를 끝내고, Task 6의 대기 조건을 충족하기 전에는 AdSense 검토를 요청하지 않는다.
- 배포는 GitHub main → Vercel. 배포 후 실제 URL 응답으로 확인한다.

---

### Task 1: 기준선 데이터 수집 (사용자 계정 필요)

**Files:** Create `docs/adsense/baseline-2026-09.md`

- [ ] GSC 최근 3개월: 총 클릭·노출, 색인된 페이지 수/72, "크롤링됨-현재 색인 생성 안 됨" 목록
- [ ] GA4 최근 3개월: 페이지별 사용자·참여시간·자연검색 비율
- [ ] AdSense 신청·거절 이력(날짜, 사유) 정리
- [ ] 판단 규칙: 월 자연검색 클릭이 매우 적으면(예: 수십 건 이하) Task 6 대기 기간을 늘리고 유입 확보를 먼저 한다.

### Task 2: 가드레일 먼저 작성 (실패 테스트 → RED)

**Files:** Modify `scripts/verify-adsense-content-quality.js`

- [ ] **Step 1: 템플릿 흔적 검출 규칙을 추가한다.**

```js
const quality = read('src/lib/tool-quality.ts');
const banned = [
  / 기본 검산"/, / 조건 변경"/,
  /의 일반론을 본인 사안에 그대로 대입하면 안 됩니다/,
  /에 넣는 /,                       // 카테고리 공용 입력 목록
];
for (const re of banned) if (re.test(quality)) failures.push(`template marker remains: ${re}`);

// 예시는 반드시 숫자를 포함
for (const m of quality.matchAll(/setup: "([^"]*)"/g)) {
  if (!/\d/.test(m[1])) failures.push(`example without numbers: ${m[1].slice(0, 40)}`);
}
```

- [ ] **Step 2: 배포 결과 검사 스크립트를 추가한다.** `scripts/audit-live-duplication.py`: sitemap URL 전부 → `<main>` 텍스트 → 3개 이상 페이지에 반복되는 15자 이상 줄 목록과 페이지별 고유 텍스트 길이를 출력하고, 반복 줄이 허용 목록(면책 1줄) 밖에 있으면 exit 1.
- [ ] **Step 3:** `npm run verify:adsense` 실행 → **FAIL**(현재 50개 위반)을 확인한다.
- [ ] **Step 4:** 커밋 `test(adsense): fail on templated quality blocks`

### Task 3: 계산기 55개를 등급 분류하고 정리

**Files:** Create `docs/adsense/tool-triage.md`, Modify `src/lib/tools-data.ts`, `src/app/sitemap.ts`, 대상 `layout.tsx`

- [ ] 각 계산기를 분류한다.
  - **A: 법령 공식 계산.** 인지대·송달료, 퇴직금, 연차·주휴·연장수당, 4대보험, 취득세, 양도세, 중개보수, 지연손해금, 실업·육아·출산급여 등. 유지·강화한다.
  - **B: 공식은 있으나 입력 판단이 큼.** 양육비 기준표, 유류분, 상속분, 일실수입. 유지하고 한계 설명을 구체화한다.
  - **C: 법원·기관 재량 결과를 금액으로 추정.** 보석금, 위자료, 명예훼손, 의료사고, 교통사고 합의금, 부당해고 보상금, 손해배상 일반. 결정 필요.
- [ ] C등급 처리 방안(사용자 결정):
  - ① 금액 출력을 없애고 "절차·요건 체크리스트 + 공개 판결 범위 안내"로 전환한다. 판결 출처를 명시한다.
  - ② 재신청 전까지 `noindex` + sitemap 제외. 승인 뒤 개선해서 복귀한다.
- [ ] 계산 기능이 없는 도구(내용증명 도우미, 국선·법률구조 확인기)는 입력-출력이 실질적인지 점검한다. 약하면 가이드로 흡수한다.
- [ ] 커밋 `refactor(tools): triage calculators by legal determinacy`

### Task 4: 자동 생성 품질 블록 제거 → 계산기별 실제 검산 예시

**Files:** Delete `scripts/build-adsense-quality.py` 산출물 의존, Modify `src/lib/tool-quality.ts`, `src/components/ui/CalculatorLayout.tsx`, 각 `src/app/tools/**/page.tsx`

- [ ] **Step 1:** 계산 로직을 page 컴포넌트에서 순수 함수로 분리한다(`src/lib/calc/<id>.ts`). A등급부터 한 번에 1개씩 작업한다.
- [ ] **Step 1-1:** 현재 테스트 러너가 없다(`package.json`에 `test` 스크립트 없음). `npm i -D vitest`를 설치하고 `"test": "vitest run"`을 추가한다.
- [ ] **Step 2:** 예시 값 테스트를 작성한다. 예시 문구의 숫자는 함수 호출 결과로 렌더링하고 하드코딩하지 않는다.

```ts
// src/lib/calc/severance-pay.test.ts
import { calcSeverance } from './severance-pay';
test('3년 근속, 3개월 임금 900만', () => {
  expect(calcSeverance({ wage3m: 9_000_000, days3m: 92, serviceDays: 1095 }).amount)
    .toBe(/* 법령 공식으로 수기 계산한 값 */);
});
```

- [ ] **Step 3:** 페이지 섹션을 다시 설계한다. 템플릿 섹션 7개 대신 **그 계산기에만 있는 내용**을 쓴다.
  - 실제 입력 항목 설명. 계산기 폼 필드와 1:1로 대응한다.
  - 숫자 예시 2~3개. 단계별 산식을 함수 출력으로 보여 준다.
  - 자주 틀리는 입력: 해당 제도 고유 사례만 쓴다. 공용 문장은 넣지 않는다.
  - 조문 원문 인용과 시행일 → 해당 조문 딥링크. 법령 루트 링크는 쓰지 않는다.
  - FAQ는 한 번만 노출한다.
- [ ] **Step 4:** 공용 문장 5종은 페이지당 면책 1줄로 합친다.
- [ ] **Step 5:** 계산기 1개가 끝날 때마다 `npm test && npm run verify:adsense && npm run build` 실행 후 커밋한다. 템플릿 대체를 막기 위해 **하루 목표를 A등급 3~5개**로 제한한다.
- [ ] Task 4 완료 조건: Task 2 가드레일 전부 PASS, `audit-live-duplication.py` 반복 줄이 허용 목록뿐인 상태.

### Task 5: 신뢰·운영 신호

**Files:** `src/app/about/page.tsx`, `src/app/editorial-policy/page.tsx`, Create `src/app/changelog/page.tsx`

- [ ] 운영자를 실명 또는 사업자 정보로 표기하고 도메인 메일(예: `contact@law-calc.kr`)을 쓴다. 자격자 감수가 가능하면 실명·자격번호를 표기한다(없으면 쓰지 않는다).
- [ ] `/changelog`: 계산기별 개정 반영 이력을 기록한다(날짜, 조문, 변경 전후 수치). 기존 git 이력의 실제 수정(육아휴직 시행령 제95조 등)부터 옮긴다.
- [ ] 검토일은 실제로 검토한 계산기만 갱신한다. sitemap `lastModified`도 계산기별 실제 수정일을 쓴다(`tool.updatedAt`).
- [ ] 가이드는 월 2~4개를 직접 작성한다. 계산기 A등급과 연결되는 실무 흐름(예: 퇴직금 미지급 → 진정 → 지연이자 계산)으로 쓰고, 대량 생성은 하지 않는다.

### Task 6: 배포 검증 → 대기 → 재신청

- [ ] 배포 후 `python3 scripts/audit-live-duplication.py` PASS 확인(실서버 기준).
- [ ] `ads.txt`, `robots.txt`, canonical, 무광고 상태에서의 레이아웃·CLS 확인.
- [ ] GSC에서 변경된 URL 색인 재요청 → **2~4주 대기**하며 색인 수와 노출 추이를 확인한다.
- [ ] 재신청 조건: 색인 페이지 대부분 반영 + 노출·클릭이 기준선보다 증가 + 가드레일 PASS.
- [ ] 재신청 후 결과와 날짜를 `docs/adsense/baseline-2026-09.md`에 기록한다.

---

## 사용자 결정 필요

1. C등급 계산기 처리: ① 체크리스트 전환 / ② 임시 noindex
2. 운영자 실명·사업자 표기 가능 여부, 도메인 메일 생성 여부
3. GSC·GA4·AdSense 접근. Task 1 기준선 수집에 필요하다.
