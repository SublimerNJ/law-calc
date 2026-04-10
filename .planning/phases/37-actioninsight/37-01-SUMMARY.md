---
phase: 37-actioninsight
plan: 1
subsystem: realty-calculators
tags: [action-insight, realty, data]
dependency_graph:
  requires: []
  provides: ["ACTION-05"]
  affects: ["src/lib/action-data.ts"]
tech_stack:
  added: []
  patterns: ["ActionInsight data format"]
key_files:
  created: []
  modified: ["src/lib/action-data.ts"]
decisions:
  - "부동산 관련 7개 도구에 대해 전문가 조언 톤으로 ActionInsight 데이터를 추가함"
metrics:
  duration: 15
  completed_date: "2026-04-10T05:30:15Z"
---

# Phase 37 Plan 1: 부동산 7종 ActionInsight 데이터 추가 Summary

부동산 도구(보증금 반환, 전월세 전환율, 중개보수, 청약가점, DSR, LTV, DTI) 7개에 대한 ActionInsight 데이터를 추가했습니다.

## Execution Results

- `deposit-return`: 임대인 반환 독촉 템플릿 및 팁 추가
- `rent-conversion`: 법정 전환율 초과 이의 제기 템플릿 및 팁 추가
- `brokerage-fee`: 법정 한도 초과 요구 방어 템플릿 및 팁 추가
- `subscription-score`: 부적격 소명 자료 제출 안내 템플릿 및 팁 추가
- `dsr`: 추가 한도 및 예외 적용 문의 템플릿 및 팁 추가
- `ltv`: 우대 LTV 및 방공제 면제 요청 템플릿 및 팁 추가
- `dti`: 소득 증빙 서류 보완 및 심사 요청 템플릿 및 팁 추가
- 모두 `actionData` 객체에 올바르게 통합되었으며, 빌드(npm run build) 검증을 통과함.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED
- `src/lib/action-data.ts` 수정 완료 (FOUND)
- 커밋 확인 완료 (6b37bcd)
