# Phase 37: 부동산 도구 ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

부동산 관련 7개 계산기 하단에 ActionInsight 기반 실전 대응 팁 및 액션 플랜 템플릿 제공

</domain>

<decisions>
## Implementation Decisions

### Content Structure
- 팁의 어조(Tone): 단호하고 전문적인 '전문가 조언' 톤 — 신뢰감 부여
- 카톡 템플릿의 범위: 당사자 간의 원만한 협상/요구 목적 텍스트 — 법적 분쟁 전 단계 (예: 임대인에게 보증금 반환 요청)
- 팁의 개수: 핵심 3가지 팁으로 제한 — 인지 과부하 방지

### Claude's Discretion
- UI 통합 방식과 템플릿 데이터 관리 구조는 기존 계산기와 일관성을 유지하며 재량껏 설계
- 부동산 계산기 목록 (보증금 반환, 전월세 전환율, 중개보수, 청약가점, DSR, LTV, DTI 등 7개)에 맞는 실전 팁을 데이터 객체에 추가하고 UI 반영

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx` 컴포넌트
- `src/lib/action-data.ts` (템플릿 저장소)

### Established Patterns
- 기존 소송/법원, 가족법, 노동/근로, 세금 계산기에 적용된 ActionInsight 연동 방식 유지

### Integration Points
- `src/app/tools/realty/*/page.tsx` 내 하단부 렌더링

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>
