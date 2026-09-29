import { describe, expect, it } from "vitest";
import {
  CHILD_SUPPORT_STANDARD,
  calculateChildSupport,
  getStandardChildSupport,
} from "./child-support";

describe("서울가정법원 2021년 양육비 산정기준표", () => {
  it("records the official publication and effective dates", () => {
    expect(CHILD_SUPPORT_STANDARD).toEqual({
      version: "2021",
      announcedDate: "2021-12-22",
      effectiveDate: "2022-03-01",
    });
  });

  it.each([
    ["0-2", 0, 621_000],
    ["3-5", 250, 759_000],
    ["6-8", 450, 1_140_000],
    ["9-11", 650, 1_494_000],
    ["12-14", 850, 1_984_000],
    ["15-18", 1_100, 2_540_000],
  ] as const)(
    "returns the official cell for age %s and combined income %d만원",
    (ageGroup, combinedIncome, expected) => {
      expect(getStandardChildSupport(ageGroup, combinedIncome)).toBe(expected);
    },
  );
});

describe("양육비 계산", () => {
  it("uses the official per-child amount and income share", () => {
    expect(
      calculateChildSupport({
        childCount: "2",
        custodialIncome: 180,
        noncustodialIncome: 270,
        ageGroup: "6-8",
      }),
    ).toMatchObject({
      combinedIncome: 450,
      standardPerChild: 1_140_000,
      monthlyTotal: 2_280_000,
      noncustodialShare: 0.6,
      noncustodialPayment: 1_368_000,
    });
  });
});
