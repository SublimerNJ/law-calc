export interface BailReviewItem {
  id: string;
  title: string;
  description: string;
  legalBasis: string;
}

export const BAIL_REVIEW_ITEMS: BailReviewItem[] = [
  {
    id: "detained-defendant",
    title: "구속된 피고인인지 확인",
    description:
      "보석은 구속된 피고인을 대상으로 합니다. 피고인 본인뿐 아니라 변호인·법정대리인·배우자·직계친족·형제자매·가족·동거인 또는 고용주가 청구할 수 있습니다.",
    legalBasis: "형사소송법 제94조",
  },
  {
    id: "mandatory-bail-exceptions",
    title: "필요적 보석의 예외 확인",
    description:
      "사형·무기 또는 장기 10년이 넘는 징역이나 금고에 해당하는 죄, 누범·상습범, 증거인멸 우려, 도주 우려, 불분명한 주거, 피해자·증인·그 친족에 대한 위해 우려가 있는지 확인합니다.",
    legalBasis: "형사소송법 제95조",
  },
  {
    id: "evidence-and-flight",
    title: "증거와 도주 위험 자료 정리",
    description:
      "증거를 보전할 수 있는 사정, 출석을 보장할 주거·연락처, 출국이나 도주 우려를 낮추는 자료를 사실과 증거로 나누어 정리합니다.",
    legalBasis: "형사소송법 제95조·제98조",
  },
  {
    id: "victim-safety",
    title: "피해자·증인 보호와 피해 회복 확인",
    description:
      "피해자·증인 및 그 친족에 대한 접근·연락 위험과 피해 회복·배상 등 범행 후 정황을 확인하고, 필요한 보호 조건을 구분합니다.",
    legalBasis: "형사소송법 제98조제4호·제7호, 제99조제1항제4호",
  },
  {
    id: "court-conditions",
    title: "법원이 정할 보석 조건 확인",
    description:
      "출석과 증거인멸 방지 서약, 주거 제한, 접근 금지, 출석보증서, 출국 제한, 피해 회복을 위한 공탁·담보, 보증금·담보 제공 등 가능한 조건을 확인합니다.",
    legalBasis: "형사소송법 제98조",
  },
  {
    id: "court-considerations",
    title: "법원이 고려할 사정 정리",
    description:
      "범죄의 성질과 죄상, 증거의 증명력, 피고인의 전과·성격·환경·자산, 피해자에 대한 배상 등 범행 후 정황을 정리합니다. 자금능력이나 자산으로 이행할 수 없는 조건은 정할 수 없습니다.",
    legalBasis: "형사소송법 제99조",
  },
  {
    id: "after-release",
    title: "허가 후 조건과 취소 사유 확인",
    description:
      "도주·불출석·증거인멸·피해자 위해 또는 법원이 정한 조건 위반이 발생하면 보석이나 구속 집행정지가 취소될 수 있음을 확인합니다.",
    legalBasis: "형사소송법 제100조·제102조",
  },
  {
    id: "return-or-forfeiture",
    title: "담보의 몰취·환부 절차 확인",
    description:
      "조건 위반이나 도주 등으로 담보가 몰취될 수 있는 경우와, 몰취되지 않은 보증금·담보의 환부를 청구할 절차를 구분해 확인합니다.",
    legalBasis: "형사소송법 제103조·제104조",
  },
];
