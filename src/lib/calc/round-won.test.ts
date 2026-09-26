import { describe, expect, it } from "vitest";
import { roundWon } from "./round-won";

describe("roundWon", () => {
  it("원 단위로 반올림한다", () => {
    expect(roundWon(1234.5)).toBe(1235);
  });
});
