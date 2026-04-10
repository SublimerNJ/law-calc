# Phase 41: Court ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

소송/법원 관련 계산기 13종에서 사용자가 실전 대응 팁과 템플릿을 확인할 수 있도록 ActionInsight 데이터를 작성하고 UI에 연동한다.
</domain>

<decisions>
## Implementation Decisions

### 데이터 구조 (Data Structure)
- `action-data.ts` 단일 파일로 유지 (현재 규모에서 관리에 무리 없음)
- 누락된 Court 도메인 8개 계산기의 대응 팁은 기존 양식(tips 3개, scriptTemplate)에 맞춰 생성

### 컴포넌트 연동 (Component Integration)
- ActionInsight 영역의 위치는 계산 결과 박스 바로 아래, 하단 안내문 위로 일관성 있게 배치
- 데이터가 누락되거나 없는 경우 해당 섹션 렌더링 생략 (오류 방지)

### UI 패턴 (UI Patterns)
- 기존 ActionInsight 디자인(예: bg-blue-50 등 기본 파란색 계열)을 유지하여 전체 통일성 확보
- 복사 완료 피드백은 기존의 `alert` "클립보드에 복사되었습니다" 방식을 유지

### Claude's Discretion
- 실제 법률 팁과 템플릿의 문구(어투, 뉘앙스) 작성은 기존 Court 관련 팁(`lawsuit-cost`, `payment-order` 등)을 참고하여 재량껏 작성한다.
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx`: 기존 퇴직금, 산재보험 등에 사용된 UI 컴포넌트 (존재 여부 확인 필요, 또는 기존 계산기 코드 내 인라인 컴포넌트)
- `src/lib/action-data.ts`: 모든 ActionInsight 데이터를 담고 있는 단일 객체

### Established Patterns
- 기존 `severance-pay`, `industrial-accident` 등의 계산기를 참조하여 ActionInsight 연동 위치 및 방식 파악

### Integration Points
- `src/app/tools/court/*/page.tsx`: 각 계산기의 `page.tsx` 또는 `client.tsx`의 렌더링 결과부
</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.
</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.
</deferred>