import { describe, expect, it } from "vitest";
import {
  buildAlimonyChecklist,
  type AlimonyChecklistItem,
} from "./alimony";

describe("이혼 위자료 판단요소 점검표", () => {
  it("returns case-specific factors without producing a monetary estimate", () => {
    const checklist = buildAlimonyChecklist({
      years: 12,
      faults: ["affair", "violence"],
      asset: "mid",
      hasChildren: true,
    });

    expect(checklist).toHaveLength(5);
    expect(checklist.map(({ id }) => id)).toEqual([
      "fault",
      "marriage",
      "circumstances",
      "evidence",
      "procedure",
    ]);
    expect(checklist.map(({ detail }) => detail).join(" ")).not.toMatch(/\d[\d,]*\s*(원|만원|억)/);
  });

  it("describes selected fault facts, family circumstances, and evidence", () => {
    const checklist: AlimonyChecklistItem[] = buildAlimonyChecklist({
      years: 3,
      faults: ["abandonment"],
      asset: "low",
      hasChildren: false,
    });

    expect(checklist.find(({ id }) => id === "fault")?.detail).toContain("유기·악의적 유기");
    expect(checklist.find(({ id }) => id === "circumstances")?.detail).toContain("재산 상태");
    expect(checklist.find(({ id }) => id === "evidence")?.detail).toContain("문자");
    expect(checklist.find(({ id }) => id === "procedure")?.detail).toContain("민법 제843조");
  });
});
