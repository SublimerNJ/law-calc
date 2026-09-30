export type DefamationType = "fact" | "false-fact" | "insult";
export type MediaType = "online" | "broadcast" | "newspaper" | "verbal";
export type VictimType = "private" | "public";
export type SeverityType = "mild" | "moderate" | "severe";

export interface DefamationChecklistInput {
  defamationType: DefamationType;
  mediaType: MediaType;
  victimType: VictimType;
  durationMonths: number | null;
  severity: SeverityType;
}

export interface DefamationChecklistItem {
  id: "expression" | "publicity" | "impact" | "mitigation" | "evidence";
  title: string;
  detail: string;
}

const MEDIA_LABELS: Record<MediaType, string> = {
  online: "온라인·SNS",
  broadcast: "방송",
  newspaper: "신문·잡지",
  verbal: "대화·구두",
};

const VICTIM_LABELS: Record<VictimType, string> = {
  private: "일반인",
  public: "공적 인물 또는 유명인",
};

const SEVERITY_LABELS: Record<SeverityType, string> = {
  mild: "경미하다고 느끼는 경우",
  moderate: "보통이라고 느끼는 경우",
  severe: "심각하다고 느끼는 경우",
};

export function buildDefamationChecklist({
  defamationType,
  mediaType,
  victimType,
  durationMonths,
  severity,
}: DefamationChecklistInput): DefamationChecklistItem[] {
  const expressionDetail = {
    fact: "사실 적시라면 내용의 진실성, 적시 목적, 진실한 사실이라도 오로지 공공의 이익에 관한 것인지 확인하세요.",
    "false-fact": "허위 사실 적시라면 어떤 부분이 허위인지, 허위임을 뒷받침하는 자료와 비방 목적이 있었는지 확인하세요.",
    insult: "모욕이라면 구체적인 사실을 적시했는지와 표현이 단순한 의견·감정인지, 상대방을 특정할 수 있는지를 구분하세요.",
  }[defamationType];

  const durationDetail = durationMonths !== null && Number.isFinite(durationMonths) && durationMonths > 0
    ? `유포 매체는 ${MEDIA_LABELS[mediaType]}이고 입력한 기간은 ${durationMonths}개월입니다. 실제 접근자, 재게시·공유 경로, 게시 지속 여부를 확인하세요.`
    : `유포 매체는 ${MEDIA_LABELS[mediaType]}입니다. 실제 접근자, 재게시·공유 경로, 게시 지속 여부와 전파 가능성을 확인하세요.`;

  return [
    {
      id: "expression",
      title: "표현의 내용과 위법성",
      detail: expressionDetail,
    },
    {
      id: "publicity",
      title: "공연성·전파 범위",
      detail: durationDetail,
    },
    {
      id: "impact",
      title: "피해자의 구체적 영향",
      detail: `${VICTIM_LABELS[victimType]}에게 발생한 직업·사회생활·대인관계의 변화를 ${SEVERITY_LABELS[severity]}라는 느낌만으로 단정하지 말고, 실제 손해와 인과관계 자료로 정리하세요.`,
    },
    {
      id: "mitigation",
      title: "삭제·정정·사과 등 사후 조치",
      detail: "게시물 삭제·정정·사과 여부, 추가 확산을 막기 위한 조치, 당사자 사이의 관계와 분쟁 경위를 시간순으로 기록하세요.",
    },
    {
      id: "evidence",
      title: "증거와 절차 선택",
      detail: "게시물 원문과 URL·작성 시각이 보이는 캡처, 원본 파일, 녹음·목격자·조회 및 재게시 자료를 보전하고 형사·민사·삭제 요청 중 경로를 구분해 검토하세요.",
    },
  ];
}
