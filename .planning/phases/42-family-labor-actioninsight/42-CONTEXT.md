# Phase 42: Family & Labor ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

가사/가족법 및 노동/근로 관련 계산기에서 사용자가 실전 대응 팁과 템플릿을 확인할 수 있도록 ActionInsight 데이터를 작성하고 UI에 연동한다.
</domain>

<decisions>
## Implementation Decisions

### 데이터 구조 (Data Structure)
- `action-data.ts` 단일 파일로 유지.
- 누락된 계산기의 대응 팁은 기존 양식(tips 3개, scriptTemplate)에 맞춰 생성.

### 컴포넌트 연동 (Component Integration)
- ActionInsight 영역의 위치는 계산 결과 박스 바로 아래, 하단 안내문 위로 일관성 있게 배치.
- 데이터가 없는 경우 해당 섹션 렌더링 생략.

### UI 패턴 (UI Patterns)
- 기존 ActionInsight 디자인 유지.
- 복사 완료 피드백은 기존의 `alert` 방식 유지.

### Claude's Discretion
- 실제 법률 팁과 템플릿 문구 작성은 기존 팁을 참고하여 재량껏 작성한다.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx`: 기존 UI 컴포넌트
- `src/lib/action-data.ts`: 모든 ActionInsight 데이터를 담고 있는 단일 객체

### Integration Points
- `src/app/tools/family/*/page.tsx`
- `src/app/tools/labor/*/page.tsx`
</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.
</specifics>

<deferred>
## Deferred Ideas

None.
</deferred>