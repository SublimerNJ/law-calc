# Phase 43: Tax & Realty ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

세금 및 부동산 관련 계산기에서 사용자가 절세 및 계약 관련 실무 대응 팁과 템플릿을 확인할 수 있도록 ActionInsight 데이터를 작성하고 UI에 연동한다.
</domain>

<decisions>
## Implementation Decisions

### 데이터 구조 (Data Structure)
- `action-data.ts` 단일 파일 유지
- 세금 및 부동산 관련 실무 팁과 템플릿 작성

### 컴포넌트 연동 (Component Integration)
- ActionInsight 영역의 위치는 계산 결과 박스 하단
- 데이터가 누락된 경우 렌더링을 생략하여 오류 방지

### UI 패턴 (UI Patterns)
- 기존 파란색(bg-blue-50 등) 테마 유지
- 기존 `alert` 기반 클립보드 복사 피드백 유지

### Claude's Discretion
- 템플릿 및 팁 내용은 도메인(세금/부동산)의 특성에 맞게 전문적으로 작성
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx`: ActionInsight UI 컴포넌트
- `src/lib/action-data.ts`: 모든 데이터를 담고 있는 단일 객체

### Integration Points
- `src/app/tools/tax/*/page.tsx`
- `src/app/tools/realty/*/page.tsx`
</code_context>

<specifics>
## Specific Ideas

No specific requirements
</specifics>

<deferred>
## Deferred Ideas

None
</deferred>