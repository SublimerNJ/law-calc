export type AlimonyFaultType =
  | "affair"
  | "violence"
  | "abandonment"
  | "economic"
  | "other";
export type AlimonyAssetLevel = "high" | "mid" | "low";

export interface AlimonyChecklistInput {
  years: number;
  faults: AlimonyFaultType[];
  asset: AlimonyAssetLevel;
  hasChildren: boolean;
}

export interface AlimonyChecklistItem {
  id: "fault" | "marriage" | "circumstances" | "evidence" | "procedure";
  title: string;
  detail: string;
}

const FAULT_LABELS: Record<AlimonyFaultType, string> = {
  affair: "외도·부정행위",
  violence: "가정폭력",
  abandonment: "유기·악의적 유기",
  economic: "경제적 통제·학대",
  other: "기타 혼인관계 파탄 사유",
};

const ASSET_LABELS: Record<AlimonyAssetLevel, string> = {
  high: "상대방의 재산 상태가 큰 편이라고 입력한 경우",
  mid: "상대방의 재산 상태가 중간 정도라고 입력한 경우",
  low: "상대방의 재산 상태가 크지 않다고 입력한 경우",
};

export function buildAlimonyChecklist({
  years,
  faults,
  asset,
  hasChildren,
}: AlimonyChecklistInput): AlimonyChecklistItem[] {
  const faultSummary = faults.length > 0
    ? faults.map((fault) => FAULT_LABELS[fault]).join(", ")
    : "선택된 유책사유 없음";
  const childSummary = hasChildren
    ? "미성년 자녀의 존재와 양육 상황도 함께 기록하세요."
    : "미성년 자녀가 없다면 그 사실도 가족관계 자료로 확인하세요.";

  return [
    {
      id: "fault",
      title: "유책행위와 혼인관계 파탄 책임",
      detail: `선택한 사유는 ${faultSummary}입니다. 각 행위의 시기·내용·반복성, 혼인관계가 실제로 어떻게 파탄되었는지, 상대방의 책임과 인과관계를 구체적인 사실로 정리하세요.`,
    },
    {
      id: "marriage",
      title: "혼인기간과 파탄에 이른 경과",
      detail: `입력한 혼인기간은 ${years}년입니다. 혼인 시작부터 별거·갈등·이혼 절차에 이르기까지 중요한 사건을 시간순으로 정리하고, 파탄 이후 최종 이혼에 이르기까지의 사정도 빠뜨리지 마세요.`,
    },
    {
      id: "circumstances",
      title: "당사자와 가족의 구체적 사정",
      detail: `${ASSET_LABELS[asset]}이라는 입력은 결론을 정하는 기준표가 아닙니다. 배우자의 연령과 재산 상태, 가족관계, ${childSummary} 법원은 변론에 나타난 사정을 종합해 판단합니다.`,
    },
    {
      id: "evidence",
      title: "사실과 증거의 보전",
      detail: "혼인관계증명서·주민등록 자료와 함께 문자·메신저·사진·녹음·진료기록·신고자료·목격자 등 원본과 작성 시각이 확인되는 자료를 보전하세요. 불법 수집이나 편집으로 증거의 신빙성을 훼손하지 않도록 주의하세요.",
    },
    {
      id: "procedure",
      title: "청구 경로와 적용 조문 확인",
      detail: "재판상 이혼에 따른 손해배상책임은 민법 제843조가 제806조를 준용합니다. 협의 가능성, 조정·소송 여부, 위자료 청구와 재산분할·양육 관련 청구의 관계를 구분하고 현행 조문과 관할 법원의 안내를 확인하세요.",
    },
  ];
}
