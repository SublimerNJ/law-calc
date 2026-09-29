export type ChildCount = "1" | "2" | "3";
export type AgeGroup = "0-2" | "3-5" | "6-8" | "9-11" | "12-14" | "15-18";

export const CHILD_SUPPORT_STANDARD = {
  version: "2021",
  announcedDate: "2021-12-22",
  effectiveDate: "2022-03-01",
} as const;

export const CHILD_SUPPORT_SOURCE_URL =
  "https://slfamily.scourt.go.kr/dcboard/new/DcNewsViewAction.work?seqnum=9654&gubun=41";

export const CHILD_SUPPORT_AGE_OPTIONS: readonly {
  value: AgeGroup;
  label: string;
}[] = [
  { value: "0-2", label: "만 0~2세" },
  { value: "3-5", label: "만 3~5세" },
  { value: "6-8", label: "만 6~8세" },
  { value: "9-11", label: "만 9~11세" },
  { value: "12-14", label: "만 12~14세" },
  { value: "15-18", label: "만 15~18세" },
];

export interface ChildSupportIncomeBracket {
  min: number;
  max: number;
  label: string;
}

export const CHILD_SUPPORT_INCOME_BRACKETS: readonly ChildSupportIncomeBracket[] = [
  { min: 0, max: 200, label: "0~199만원" },
  { min: 200, max: 300, label: "200~299만원" },
  { min: 300, max: 400, label: "300~399만원" },
  { min: 400, max: 500, label: "400~499만원" },
  { min: 500, max: 600, label: "500~599만원" },
  { min: 600, max: 700, label: "600~699만원" },
  { min: 700, max: 800, label: "700~799만원" },
  { min: 800, max: 900, label: "800~899만원" },
  { min: 900, max: 1_000, label: "900~999만원" },
  { min: 1_000, max: 1_200, label: "1,000~1,199만원" },
  { min: 1_200, max: Number.POSITIVE_INFINITY, label: "1,200만원 이상" },
];

// 서울가정법원 2021년 표의 부모합산소득·자녀 연령별 1인당 평균양육비.
// 이 표는 전국의 양육자녀 2인 4인가구를 기준으로 한다.
const STANDARD_CHILD_SUPPORT_TABLE: Record<AgeGroup, readonly number[]> = {
  "0-2": [
    621_000, 752_000, 945_000, 1_098_000, 1_245_000, 1_401_000,
    1_582_000, 1_789_000, 1_997_000, 2_095_000, 2_207_000,
  ],
  "3-5": [
    631_000, 759_000, 949_000, 1_113_000, 1_266_000, 1_422_000,
    1_598_000, 1_807_000, 2_017_000, 2_116_000, 2_245_000,
  ],
  "6-8": [
    648_000, 767_000, 959_000, 1_140_000, 1_292_000, 1_479_000,
    1_614_000, 1_850_000, 2_065_000, 2_137_000, 2_312_000,
  ],
  "9-11": [
    667_000, 782_000, 988_000, 1_163_000, 1_318_000, 1_494_000,
    1_630_000, 1_887_000, 2_137_000, 2_180_000, 2_405_000,
  ],
  "12-14": [
    679_000, 790_000, 998_000, 1_280_000, 1_423_000, 1_598_000,
    1_711_000, 1_984_000, 2_159_000, 2_223_000, 2_476_000,
  ],
  "15-18": [
    703_000, 957_000, 1_227_000, 1_402_000, 1_604_000, 1_794_000,
    1_964_000, 2_163_000, 2_246_000, 2_540_000, 2_883_000,
  ],
};

export function getIncomeBracketIndex(combinedIncome: number): number {
  if (!Number.isFinite(combinedIncome) || combinedIncome < 0) {
    throw new RangeError("합산소득은 0 이상의 유한한 숫자여야 합니다.");
  }

  const index = CHILD_SUPPORT_INCOME_BRACKETS.findIndex(
    ({ min, max }) => combinedIncome >= min && combinedIncome < max,
  );
  return index === -1 ? CHILD_SUPPORT_INCOME_BRACKETS.length - 1 : index;
}

export function getStandardChildSupport(
  ageGroup: AgeGroup,
  combinedIncome: number,
): number {
  return STANDARD_CHILD_SUPPORT_TABLE[ageGroup][getIncomeBracketIndex(combinedIncome)];
}

export interface ChildSupportCalculationInput {
  childCount: ChildCount;
  custodialIncome: number;
  noncustodialIncome: number;
  ageGroup: AgeGroup;
}

export interface ChildSupportResult {
  monthlyTotal: number;
  noncustodialPayment: number;
  custodialPayment: number;
  combinedIncome: number;
  noncustodialShare: number;
  standardPerChild: number;
  incomeTableIdx: number;
  childCountValue: number;
}

export function calculateChildSupport({
  childCount,
  custodialIncome,
  noncustodialIncome,
  ageGroup,
}: ChildSupportCalculationInput): ChildSupportResult {
  if (!Number.isFinite(custodialIncome) || custodialIncome < 0) {
    throw new RangeError("양육자 소득은 0 이상의 유한한 숫자여야 합니다.");
  }
  if (!Number.isFinite(noncustodialIncome) || noncustodialIncome < 0) {
    throw new RangeError("비양육자 소득은 0 이상의 유한한 숫자여야 합니다.");
  }

  const combinedIncome = custodialIncome + noncustodialIncome;
  const incomeTableIdx = getIncomeBracketIndex(combinedIncome);
  const standardPerChild = getStandardChildSupport(ageGroup, combinedIncome);
  const childCountValue = Number(childCount);
  const monthlyTotal = standardPerChild * childCountValue;
  const noncustodialShare = combinedIncome > 0
    ? noncustodialIncome / combinedIncome
    : 0.5;
  const noncustodialPayment = Math.floor(monthlyTotal * noncustodialShare);

  return {
    monthlyTotal,
    noncustodialPayment,
    custodialPayment: monthlyTotal - noncustodialPayment,
    combinedIncome,
    noncustodialShare,
    standardPerChild,
    incomeTableIdx,
    childCountValue,
  };
}
