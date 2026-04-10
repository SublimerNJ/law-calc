# Phase 45: Damages & Misc ActionInsight 연동 - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

<domain>
## Phase Boundary

손해배상 및 기타 법률 도구에서 사용자가 실전 대응 팁과 템플릿을 확인할 수 있도록 ActionInsight 데이터를 작성하고 UI에 연동한다.
</domain>

<decisions>
## Implementation Decisions

### 데이터 구조 (Data Structure)
- `action-data.ts` 단일 파일 유지
- 손해배상 청구 및 기타 안내문 템플릿 작성

### 컴포넌트 연동 (Component Integration)
- ActionInsight 영역의 위치는 계산 결과 박스 하단
- 데이터 누락 시 렌더링 생략 방침 유지

### UI 패턴 (UI Patterns)
- 기존 파란색 테마 및 alert 피드백 유지
- 모바일 가독성 확보

### Claude's Discretion
- 도메인 특화 법률/실무 팁 문구 작성 재량권 활용
</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/ActionInsight.tsx`: 컴포넌트
- `src/lib/action-data.ts`: 데이터

### Integration Points
- `src/app/tools/damages/*/page.tsx`
- `src/app/tools/misc/*/page.tsx`
</code_context>

<specifics>
## Specific Ideas

No specific requirements
</specifics>

<deferred>
## Deferred Ideas

None
</deferred>