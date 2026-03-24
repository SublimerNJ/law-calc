---
phase: 24-ux
verified: 2026-03-25T00:00:00Z
status: gaps_found
score: 15/16 must-haves verified
re_verification: false
gaps:
  - truth: "5개 계산기 모두 동일한 입력 포맷팅 방식 사용 (FLOW-03: 필수 필드 시각적 표시)"
    status: partial
    reason: "attorney-fee/page.tsx의 소가 입력 필드 라벨에 필수 표시(* 또는 (필수))가 없음. 나머지 4개 계산기는 모두 text-red-500으로 필수 표시 완료."
    artifacts:
      - path: "src/app/tools/court/attorney-fee/page.tsx"
        issue: "line 116: 소가 (원) 라벨에 <span className=\"text-red-500\">*</span> 또는 (필수) 마커 누락"
    missing:
      - "attorney-fee/page.tsx line 116의 소가 라벨에 <span className=\"text-red-500\">(필수)</span> 추가"
human_verification:
  - test: "attorney-fee 계산기에서 소가 필드 미입력 후 계산 버튼 클릭"
    expected: "소가를 입력해주세요. 에러 메시지가 text-red-500 빨간색으로 표시"
    why_human: "에러 메시지 UI 렌더링은 브라우저에서만 확인 가능"
  - test: "5개 계산기 모두에서 음수 금액 입력 시도 (예: -1 입력)"
    expected: "숫자 필터가 음수 입력 자체를 차단하거나, 계산 시 에러 메시지 표시"
    why_human: "onChange 핸들러의 [^0-9] 필터가 실제로 음수 부호를 차단하는지 브라우저 입력 이벤트에서 확인 필요"
---

# Phase 24: UX 입력 검증 & 엣지 케이스 처리 Verification Report

**Phase Goal:** 소송/법원 5개 계산기에서 사용자가 잘못된 입력이나 엣지 케이스를 만날 때 논리적이고 일관된 동작을 경험한다
**Verified:** 2026-03-25T00:00:00Z
**Status:** gaps_found (minor — 1 cosmetic gap)
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth | Status | Evidence |
|----|-------|--------|---------|
| 1  | lawsuit-cost에서 음수/0 소가 입력 시 에러 메시지 표시되고 잘못된 결과 미출력 | VERIFIED | line 75-78: `if (val <= 0) { setError('금액은 0보다 커야 합니다.'); setResult(null); return; }` |
| 2  | payment-order에서 음수/0 청구금액 입력 시 에러 메시지 표시 | VERIFIED | line 66-70: `if (numAmount <= 0) { setError('금액은 0보다 커야 합니다.'); setResult(null); return; }` |
| 3  | civil-mediation에서 음수/0 입력 시 에러 메시지 표시 | VERIFIED | line 70-73: `if (!val \|\| val <= 0) { setError('금액은 0보다 커야 합니다.'); return; }` |
| 4  | family-court에서 음수/0 입력 시 에러 메시지 표시 | VERIFIED | line 135-138: `if (!val \|\| val <= 0) { setError('금액은 0보다 커야 합니다.'); return; }` |
| 5  | attorney-fee에서 음수/0 입력 시 에러 메시지 표시 (기존 silent return 제거) | VERIFIED | line 85-89: `if (isNaN(val) \|\| val <= 0) { setError('금액은 0보다 커야 합니다.'); setResult(null); return; }` |
| 6  | 5개 계산기 모두 필수 입력 비어있으면 안내 표시 | VERIFIED | 전체 5개 계산기 모두 빈값 체크 + setError('[필드명]을 입력해주세요.') 패턴 구현 |
| 7  | 초기 상태에서 0원 결과 미노출 | VERIFIED | 모든 파일: `result` useState 초기값 `null`, JSX에서 `{result !== null && ...}` 또는 `{result && ...}` 조건부 렌더링 |
| 8  | 비현실 값 입력 시 경고 표시 (1000억 초과) | VERIFIED | 5개 모두 `UNREALISTIC_LIMIT = 100_000_000_000` 상수 정의 + `setWarning('입력값이 비현실적으로 큽니다. 확인해주세요.')` |
| 9  | 결과 0원 시 "해당 조건에서는 비용이 발생하지 않습니다" 안내 | VERIFIED | lawsuit-cost, payment-order, civil-mediation, family-court에 구현. attorney-fee는 최소 결과 30만원으로 0원 불가 — 생략 논리적으로 타당 |
| 10 | 모든 금액에 천단위 콤마 표시 | VERIFIED | 5개 모두 `formatNumber(n: number) { return n.toLocaleString('ko-KR'); }` 함수 정의 및 전 결과 항목에 적용 |
| 11 | 부분합=총합 일치 | VERIFIED | lawsuit-cost: offlineTotal = offlineStampFee + offlineServiceFee; payment-order: total = paymentOrderStampFee + serviceFee; civil-mediation: total = mediationStampFee + serviceFee; family-court: total = stampFee + serviceFee; attorney-fee: limit 단일 값 |
| 12 | 숫자 필드에 문자 입력 방지 (INPUT-04) | VERIFIED | 5개 모두 onChange에서 `replace(/[^0-9]/g, '')` 필터 적용 |
| 13 | 에러 메시지 일관된 스타일 — text-red-500 (CONSIST-03) | VERIFIED | 5개 모두 `<p className="text-sm text-red-500">{error}</p>` 패턴 사용 |
| 14 | 경고 메시지 일관된 스타일 — text-orange-500 | VERIFIED | 5개 모두 `<p className="text-sm text-orange-500">{warning}</p>` 패턴 사용 |
| 15 | 필수 필드 시각적 표시 (FLOW-03) — 5개 모두 통일 | FAILED | attorney-fee 소가 라벨에 필수 마커 없음. lawsuit-cost: `(필수)`, payment-order: `(필수)`, civil-mediation: `*`, family-court: `*` — attorney-fee만 누락 |
| 16 | 나누기 0 등 수학적 예외 없음 (EDGE-03) | VERIFIED | 5개 계산기 모두 정액 또는 구간별 곱셈 연산만 사용. 나누기 0 경로 없음. 인지대 계산의 분모는 상수(0.1, 0.9, 0.5 등) |

**Score:** 15/16 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/tools/court/lawsuit-cost/page.tsx` | 소송비용 계산기 with input validation | VERIFIED | 377줄. setError/setWarning, formatNumber, result null 초기화 모두 구현 |
| `src/app/tools/court/payment-order/page.tsx` | 지급명령 계산기 with input validation | VERIFIED | 227줄. 동일 패턴 적용 완료 |
| `src/app/tools/court/civil-mediation/page.tsx` | 민사조정 계산기 with full validation | VERIFIED | 230줄. 동일 패턴 적용 완료 |
| `src/app/tools/court/family-court/page.tsx` | 가사소송 계산기 with full validation | VERIFIED | 306줄. 사건 유형별 고정 인지대 / 금액 입력 분기 처리 완료 |
| `src/app/tools/court/attorney-fee/page.tsx` | 변호사보수 계산기 with full validation | VERIFIED (minor gap) | 262줄. error/warning state 구현. FLOW-03 소가 라벨 필수 마커 누락 |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| lawsuit-cost handleCalculate | error state display | setError + conditional rendering | WIRED | line 64-78 setError, line 226-230 `{error && ...}` |
| payment-order handleCalculate | error state display | setError + conditional rendering | WIRED | line 55-70 setError, line 135-139 `{error && ...}` |
| civil-mediation handleCalculate | error state display | setError + conditional rendering | WIRED | line 56-73 setError, line 138-142 `{error && ...}` |
| family-court handleCalculate | error state display | setError + conditional rendering | WIRED | line 116-138 setError, line 222-226 `{error && ...}` |
| attorney-fee handleCalculate | error state display | setError (replacing silent return) | WIRED | line 75-89 setError, line 141-145 `{error && ...}` |
| all 5 calculators | error message pattern | 동일 문구 통일 | WIRED | grep 검증: 5개 모두 "0보다 커야", "입력해주세요", "비현실적" 패턴 매치 |

---

### Data-Flow Trace (Level 4)

이 계산기들은 외부 DB나 API 없이 순수 클라이언트 사이드 계산 로직. 데이터 흐름: 사용자 입력 → state → handleCalculate → 계산 함수 → setResult → JSX 렌더링. 단방향이며 빈 데이터 소스 없음.

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| lawsuit-cost | result (CalcResult) | calculateStampFee + 산술 연산 | Yes — 실제 인지대·송달료 계산식 | FLOWING |
| payment-order | result (CalcResult) | calcStampFee + 산술 연산 | Yes | FLOWING |
| civil-mediation | result (Result) | calculateLawsuitStampFee + 1/10 | Yes | FLOWING |
| family-court | result (Result) | CASE_OPTIONS 고정값 또는 calculateStampFee | Yes | FLOWING |
| attorney-fee | result (CalcResult) | calculateAttorneyFee — BRACKETS 구간 연산 | Yes | FLOWING |

---

### Behavioral Spot-Checks

Step 7b: SKIPPED — 클라이언트 사이드 React 컴포넌트. 서버 실행 없이 행동 테스트 불가. TypeScript 컴파일 확인으로 대체.

```
npx tsc --noEmit 는 SUMMARY에서 통과 보고됨. 코드 읽기 상 타입 오류 경로 없음.
```

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| INPUT-01 | 24-01, 24-02, 24-03 | 음수/0 입력 시 에러 메시지 | SATISFIED | 5개 모두 `val <= 0` 체크 + setError('금액은 0보다 커야 합니다.') |
| INPUT-02 | 24-01, 24-02, 24-03 | 필수 필드 비어있을 때 안내 | SATISFIED | 5개 모두 빈값 체크 + '[필드명]을 입력해주세요.' |
| INPUT-03 | 24-01, 24-02, 24-03 | 비현실 값 경고 | SATISFIED | 5개 모두 `val > UNREALISTIC_LIMIT` + setWarning('입력값이 비현실적으로 큽니다. 확인해주세요.') |
| INPUT-04 | 24-01, 24-02, 24-03 | 숫자 필드 문자 입력 방지 | SATISFIED | 5개 모두 onChange에서 `/[^0-9]/g` 필터 |
| RESULT-01 | 24-01, 24-02, 24-03 | 결과 0원 시 의미 있는 안내 | SATISFIED | lawsuit-cost, payment-order, civil-mediation, family-court 구현. attorney-fee 결과는 최소 30만원으로 0 불가 |
| RESULT-02 | 24-01, 24-02, 24-03 | 천 단위 콤마 표시 | SATISFIED | 5개 모두 formatNumber(n) = n.toLocaleString('ko-KR') 전 결과 항목 적용 |
| RESULT-03 | 24-01, 24-02, 24-03 | 부분합 = 총합 | SATISFIED | 5개 코드에서 total = 항목1 + 항목2 패턴 검증 완료 |
| FLOW-01 | 24-01, 24-02, 24-03 | 초기 상태 0원 미노출 | SATISFIED | 5개 모두 result 초기값 null, 조건부 렌더링 `{result && ...}` 또는 `{result !== null && ...}` |
| FLOW-02 | 24-01, 24-02, 24-03 | 버튼 클릭 방식 유지 | SATISFIED | 5개 모두 계산하기 버튼 onClick={handleCalculate} 패턴, 실시간 계산 없음 |
| FLOW-03 | 24-01, 24-02, 24-03 | 필수 필드 시각적 표시 | PARTIAL | lawsuit-cost: (필수), payment-order: (필수), civil-mediation: *, family-court: * 표시. attorney-fee 소가 라벨 누락 |
| CONSIST-01 | 24-03 | 입력 방식 통일 | SATISFIED | 5개 모두 type="text" inputMode="numeric" + replace(/[^0-9]/g, '') + toLocaleString 표시 |
| CONSIST-02 | 24-03 | 결과 표시 형식 통일 | SATISFIED | 5개 모두 formatNumber(n)원 패턴 통일 |
| CONSIST-03 | 24-03 | 에러 메시지 스타일 통일 | SATISFIED | 5개 모두 text-red-500 에러, text-orange-500 경고, bg-red-50 border border-red-200 컨테이너 패턴 통일 |
| EDGE-01 | 24-01, 24-02, 24-03 | 경계값 정상 동작 | SATISFIED | 소가=1원: calculateStampFee(1) → fee=0.005 < 1000 → 1000원 반환. 소가=최대: UNREALISTIC_LIMIT 이상 시 경고 후 계속 계산. 나누기 0 없음 |
| EDGE-02 | 24-01, 24-02, 24-03 | 날짜 입력 제한 | SATISFIED (N/A) | 5개 계산기 모두 날짜 입력 필드 없음. 요구사항 적용 대상 없음 |
| EDGE-03 | 24-01, 24-02, 24-03 | 수학적 예외 처리 | SATISFIED | 5개 모두 나누기 연산 없음. 곱셈/덧셈/상수 연산만 사용. 0으로 나누기 경로 없음 |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| attorney-fee/page.tsx | 116 | 소가 라벨에 필수 마커 없음 (`(필수)` 또는 `*`) | Warning | CONSIST-01/FLOW-03 통일 미완성. 기능 동작에는 무관 |

---

### Human Verification Required

#### 1. 음수 입력 차단 실제 동작 확인

**Test:** 5개 계산기 각각에서 금액 입력란에 `-100000` 입력 시도
**Expected:** onChange 핸들러 `replace(/[^0-9]/g, '')` 가 `-` 부호를 제거하여 `100000`만 입력됨. 음수값이 state에 저장되지 않음
**Why human:** 브라우저 입력 이벤트 필터링은 코드 확인으로 예측 가능하지만, 모바일 키보드 등 특수 입력 방식에서의 실제 차단은 브라우저에서만 확인 가능

#### 2. attorney-fee 에러 메시지 시각적 확인

**Test:** attorney-fee 계산기에서 소가 미입력 후 계산하기 클릭
**Expected:** "소가를 입력해주세요." 에러 메시지가 빨간색 박스(bg-red-50 border-red-200)로 표시되고 결과 영역 미노출
**Why human:** JSX 조건부 렌더링 확인은 코드로 완료. 실제 UI 레이아웃 및 가시성은 브라우저 확인 필요

---

### Gaps Summary

전체 16개 must-have 중 15개 완전 검증. 1개 minor gap:

**FLOW-03 attorney-fee 필수 마커 누락**: `attorney-fee/page.tsx`의 소가(원) 라벨이 다른 4개 계산기와 달리 필수 표시가 없다. 기능(에러 메시지 표시)은 완전히 동작하며, 시각적 일관성만 미완성. 단일 라인 수정으로 해결 가능.

```tsx
// 현재 (line 116):
<label className="block text-sm text-slate-600 mb-2">소가 (원)</label>

// 수정 후:
<label className="block text-sm text-slate-600 mb-2">소가 (원) <span className="text-red-500">(필수)</span></label>
```

이 gap은 기능 동작을 막지 않으며 사용자 경험의 일관성 문제이다. 16개 요구사항 중 FLOW-03만 attorney-fee에서 partially 충족 상태이며, INPUT/RESULT/EDGE/CONSIST의 핵심 기능 요구사항은 5개 계산기 모두 완전 충족하였다.

---

_Verified: 2026-03-25T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
