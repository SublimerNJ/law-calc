import { describe, expect, it } from "vitest";
import { TOOLS } from "./tools-data";
import { TOOL_QUALITY } from "./tool-quality";
import { actionData } from "./action-data";
import { BAIL_REVIEW_ITEMS } from "./calc/bail";

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

describe("보석 요건 확인 도구", () => {
  it("보석금 계산·예상 범위 대신 법정 요건을 안내한다", () => {
    const bail = TOOLS.find((tool) => tool.id === "bail");
    const quality = TOOL_QUALITY.bail;

    expect(bail?.name).toBe("형사 보석 요건 확인");
    expect(bail?.description).toContain("요건");
    expect(bail?.longDescription).toContain("금액을 산출하지 않습니다");
    expect(quality.formula).toContain("금액을 산출하지 않습니다");
    expect(quality.formula).not.toContain("예상 범위");
  });

  it("체크 항목은 형사소송법 제95조·제98조·제99조의 판단 요소를 포함한다", () => {
    const text = BAIL_REVIEW_ITEMS.map((item) => `${item.title} ${item.description}`).join(" ");

    expect(BAIL_REVIEW_ITEMS.length).toBeGreaterThanOrEqual(6);
    expect(text).toContain("구속된 피고인");
    expect(text).toContain("도주");
    expect(text).toContain("증거");
    expect(text).toContain("자산");
    expect(text).toContain("피해자");
  });

  it("보석금 숫자 템플릿과 발송용 금액 문구를 노출하지 않는다", () => {
    const bailAction = actionData.bail;
    const actionText = [bailAction?.title, ...(bailAction?.tips ?? [])].join(" ");

    expect(bailAction?.scriptTemplate).toBeUndefined();
    expect(actionText).not.toMatch(/\{\{AMOUNT\}\}|수천만|억 단위|예상 금액/);
  });
});
