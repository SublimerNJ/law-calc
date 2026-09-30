import { describe, expect, it } from "vitest";
import { buildDefamationChecklist } from "./defamation";

describe("명예훼손 손해배상 결정요소 점검표", () => {
  it("returns decision factors without producing a monetary estimate", () => {
    const checklist = buildDefamationChecklist({
      defamationType: "false-fact",
      mediaType: "online",
      victimType: "private",
      durationMonths: 3,
      severity: "severe",
    });

    expect(checklist).toHaveLength(5);
    expect(checklist.map(({ id }) => id)).toEqual([
      "expression",
      "publicity",
      "impact",
      "mitigation",
      "evidence",
    ]);
    expect(checklist.map(({ detail }) => detail).join(" ")).not.toMatch(/\d+\s*원/);
  });

  it("calls out public-interest review for facts and deletion or apology for mitigation", () => {
    const checklist = buildDefamationChecklist({
      defamationType: "fact",
      mediaType: "broadcast",
      victimType: "public",
      durationMonths: null,
      severity: "mild",
    });

    expect(checklist.find(({ id }) => id === "expression")?.detail).toContain("공공의 이익");
    expect(checklist.find(({ id }) => id === "mitigation")?.detail).toContain("삭제");
    expect(checklist.find(({ id }) => id === "evidence")?.detail).toContain("원문");
  });
});
