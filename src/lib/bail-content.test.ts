import { describe, expect, it } from "vitest";
import { TOOLS } from "./tools-data";
import { TOOL_QUALITY } from "./tool-quality";

const ARTICLE_94_CLAIMANTS =
  "피고인·피고인의 변호인·법정대리인·배우자·직계친족·형제자매·가족·동거인 또는 고용주";

describe("보석 청구권자 법령 데이터", () => {
  it("형사소송법 제94조의 현행 청구권자 목록을 FAQ에 반영한다", () => {
    const bail = TOOLS.find((tool) => tool.id === "bail");
    const faq = bail?.faqItems?.find((item) => item.question.includes("누가 신청"));

    expect(faq?.answer).toContain(ARTICLE_94_CLAIMANTS);
    expect(faq?.answer).not.toContain("호주");
  });

  it("계산기 숫자 예시에도 같은 현행 청구권자 목록을 반영한다", () => {
    const example = TOOL_QUALITY.bail.examples.find((item) => item.setup.includes("누가 신청"));

    expect(example?.result).toContain(ARTICLE_94_CLAIMANTS);
    expect(example?.result).not.toContain("호주");
  });
});
