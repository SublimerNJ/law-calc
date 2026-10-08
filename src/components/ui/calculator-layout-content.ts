import type { Tool } from '@/lib/tools-data';
import type { ToolExample, ToolQuality } from '@/lib/tool-quality';

const CONTACT_EMAIL = 'sublimernj@gmail.com';

export function getDistinctQualityExamples(
  tool: Pick<Tool, 'faqItems'>,
  quality: Pick<ToolQuality, 'examples'>,
): ToolExample[] {
  const faqQuestions = new Set((tool.faqItems ?? []).map((faq) => faq.question.trim()));
  const faqAnswers = new Set((tool.faqItems ?? []).map((faq) => faq.answer.trim()));

  return quality.examples.filter(
    (example) =>
      !faqQuestions.has(example.setup.trim()) &&
      !faqAnswers.has(example.result.trim()),
  );
}

export function getDistinctQualityEdges(
  tool: Pick<Tool, 'faqItems'>,
  quality: Pick<ToolQuality, 'edges'>,
): string[] {
  const faqQuestions = (tool.faqItems ?? []).map((faq) => faq.question.trim());
  const faqAnswers = (tool.faqItems ?? []).map((faq) => faq.answer.trim());

  return quality.edges.filter(
    (edge) =>
      !faqQuestions.some((question) => edge.includes(question)) &&
      !faqAnswers.some((answer) => edge.includes(answer)),
  );
}

export function buildCalculatorDisclaimer(
  tool: Pick<Tool, 'description'>,
  reviewedAt: string,
): string {
  return `면책: 이 페이지는 ${tool.description}. 결과와 설명은 입력값과 표시된 근거를 바탕으로 한 참고 정보이며 법률·노무·세무 자문을 대체하지 않습니다. 적용 조문과 시행일은 출처 링크·국가법령정보센터에서 직접 확인하세요. 개인 운영 · 내용 확인일 ${reviewedAt} · 오류 제보: ${CONTACT_EMAIL}`;
}
