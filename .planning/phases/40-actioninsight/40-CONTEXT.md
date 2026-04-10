# Phase 40: 손해배상/기타 도구 ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

손해배상 및 기타 법률도구 8개 계산기/판별기 하단에 ActionInsight 기반 실전 대응 팁 및 액션 플랜 템플릿 제공

</domain>

<decisions>
## Implementation Decisions

### Content Structure
- 팁의 어조(Tone): 단호하고 전문적인 '전문가 조언' 톤 — 신뢰감 부여
- 카톡 템플릿의 범위: 당사자 간의 원만한 협상/요구 목적 텍스트 — 법적 분쟁 전 단계 (예: 내용증명 발송 전 합의 요구, 손해배상 청구 등)
- 팁의 개수: 핵심 3가지 팁으로 제한 — 인지 과부하 방지

### Claude's Discretion
- UI 통합 방식과 템플릿 데이터 관리 구조는 기존 계산기와 일관성을 유지하며 재량껏 설계
- 손해배상/기타 도구 목록 (일반 손해배상, 명예훼손, 의료사고, 일실수입, 내용증명, 법률구조, 국선변호인, 소멸시효 등 8개)에 맞는 실전 팁을 데이터 객체에 추가하고 UI 반영

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx` 컴포넌트
- `src/lib/action-data.ts` (템플릿 저장소)

### Established Patterns
- 기존 계산기 (소송/법원, 가족법, 노동/근로, 세금, 부동산, 교통/형사, 채권/이자) 전반에 걸쳐 적용된 ActionInsight 연동 방식 유지

### Integration Points
- `src/app/tools/misc/*/page.tsx` 및 `src/app/tools/damages/*/page.tsx` 등 내 하단부 렌더링

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
