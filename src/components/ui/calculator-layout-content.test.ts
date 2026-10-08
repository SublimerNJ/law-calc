import { describe, expect, it } from 'vitest';
import type { Tool } from '@/lib/tools-data';
import type { ToolQuality } from '@/lib/tool-quality';
import {
  buildCalculatorDisclaimer,
  getDistinctQualityEdges,
  getDistinctQualityExamples,
} from './calculator-layout-content';

describe('CalculatorLayout 공통 콘텐츠', () => {
  it('FAQ에서 이미 답한 quality 예시는 다시 노출하지 않는다', () => {
    const tool = {
      faqItems: [
        { question: '같은 질문인가요?', answer: 'FAQ에서 이미 답한 내용입니다.' },
      ],
    } satisfies Pick<Tool, 'faqItems'>;
    const quality = {
      examples: [
        {
          title: '중복 예시',
          setup: '같은 질문인가요?',
          result: 'FAQ에서 이미 답한 내용입니다.',
        },
        {
          title: '고유 예시',
          setup: '월 100만 원을 입력합니다.',
          result: '계산 결과는 100만 원입니다.',
        },
      ],
    } satisfies Pick<ToolQuality, 'examples'>;

    expect(getDistinctQualityExamples(tool, quality)).toEqual([quality.examples[1]]);
  });

  it('FAQ 질문을 그대로 인용한 quality 조건은 다시 노출하지 않는다', () => {
    const tool = {
      faqItems: [
        { question: '같은 질문인가요?', answer: 'FAQ에서 이미 답한 내용입니다.' },
      ],
    } satisfies Pick<Tool, 'faqItems'>;
    const quality = {
      edges: [
        '「같은 질문인가요?」의 일반론을 본인 사안에 그대로 대입하면 안 됩니다.',
        '입력일과 기준일을 실제 자료와 다시 확인하세요.',
      ],
    } satisfies Pick<ToolQuality, 'edges'>;

    expect(getDistinctQualityEdges(tool, quality)).toEqual([quality.edges[1]]);
  });

  it('페이지 공통 안내를 한 줄의 도구별 면책으로 만든다', () => {
    const tool = {
      description: '임금상당액을 계산합니다',
    } satisfies Pick<Tool, 'description'>;

    expect(buildCalculatorDisclaimer(tool, '2026-10-08')).toBe(
      '면책: 이 페이지는 임금상당액을 계산합니다. 결과와 설명은 입력값과 표시된 근거를 바탕으로 한 참고 정보이며 법률·노무·세무 자문을 대체하지 않습니다. 적용 조문과 시행일은 출처 링크·국가법령정보센터에서 직접 확인하세요. 개인 운영 · 내용 확인일 2026-10-08 · 오류 제보: sublimernj@gmail.com',
    );
  });
});
