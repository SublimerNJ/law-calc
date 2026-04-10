# Phase 34: 가사/가족법 도구 ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

가사/가족법 6개 계산기 하단에 ActionInsight 기반 실전 대응 팁 및 액션 플랜 템플릿 제공

</domain>

<decisions>
## Implementation Decisions

### Content Structure
- 팁의 어조(Tone): 단호하고 전문적인 '전문가 조언' 톤 — 신뢰감 부여
- 카톡 템플릿의 범위: 당사자 간의 원만한 협상/요구 목적 텍스트 — 법적 분쟁 전 단계
- 팁의 개수: 핵심 3가지 팁으로 제한 — 인지 과부하 방지

### Claude's Discretion
- UI 통합 방식과 템플릿 데이터 관리(JSON/TS) 구조는 개발 효율성(DRY)을 위해 재량껏 설계

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx` 컴포넌트
- `src/lib/action-data.ts` (템플릿 저장소)

### Established Patterns
- 기존 소송/법원 및 노동 계산기에 적용된 ActionInsight 연동 방식 유지

### Integration Points
- `src/app/tools/family/*/page.tsx` 내 하단부 렌더링

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
