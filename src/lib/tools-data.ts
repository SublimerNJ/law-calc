export interface FaqItem {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  route: string;
  longDescription?: string;
  keywords?: string[];
  faqItems?: FaqItem[];
  relatedTools?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "court", name: "소송/법원", icon: "\u2696\uFE0F", description: "소송비용, 변호사보수, 조정비용 계산", color: "#3b82f6" },
  { id: "family", name: "가사/가족법", icon: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67", description: "위자료, 양육비, 상속 계산", color: "#ec4899" },
  { id: "labor", name: "노동/근로", icon: "\uD83D\uDCBC", description: "퇴직금, 수당, 임금 계산", color: "#f59e0b" },
  { id: "tax", name: "세금", icon: "\uD83C\uDFDB\uFE0F", description: "양도세, 취득세, 연말정산 계산", color: "#10b981" },
  { id: "realty", name: "부동산", icon: "\uD83C\uDFE0", description: "보증금, 중개보수, DSR 계산", color: "#8b5cf6" },
  { id: "traffic", name: "교통/형사", icon: "\uD83D\uDE97", description: "합의금, 벌금, 음주운전 계산", color: "#ef4444" },
  { id: "debt", name: "채권/이자", icon: "\uD83D\uDCB0", description: "지연손해금, 대여금이자 계산", color: "#06b6d4" },
  { id: "damages", name: "손해배상", icon: "\uD83D\uDCCB", description: "손해배상, 일실수입 계산", color: "#f97316" },
  { id: "misc", name: "기타 법률도구", icon: "\uD83D\uDD27", description: "소멸시효, 법률구조 확인", color: "#6b7280" },
];

export const TOOLS: Tool[] = [
  // ⚖️ 소송/법원 (5) — stamp-fee, service-fee, small-claims, e-court → lawsuit-cost로 통합
  {
    id: "attorney-fee",
    name: "변호사보수 소송비용산입 계산기",
    description: "변호사보수의 소송비용 산입액을 계산합니다",
    icon: "\uD83D\uDC68\u200D\u2696\uFE0F",
    category: "court",
    route: "/tools/court/attorney-fee",
    longDescription: "민사소송규칙 제116조 및 변호사보수의 소송비용 산입에 관한 규칙에 따라 소가 구간별 산입 한도액을 자동 계산합니다. 승소 후 상대방에게 청구할 수 있는 변호사비용 산입액을 정확히 파악할 수 있습니다.",
    keywords: ["변호사보수 소송비용", "변호사비용 청구", "소송비용 산입", "변호사보수 산입 규칙", "소가별 변호사비", "패소자 부담 변호사비", "소송비용 환수"],
    faqItems: [
      { question: "변호사보수 소송비용 산입이란 무엇인가요?", answer: "승소한 당사자가 지출한 변호사보수 중 법원규칙이 정한 한도 내에서 패소자에게 청구할 수 있는 제도입니다. 「변호사보수의 소송비용 산입에 관한 규칙」이 적용됩니다." },
      { question: "실제 변호사비와 산입액이 다른 이유는 무엇인가요?", answer: "산입 한도는 소가 구간별로 상한이 정해져 있어 실제 지급한 변호사비가 한도를 초과하면 초과분은 본인이 부담합니다. 소가가 클수록 한도 비율은 낮아집니다." },
      { question: "항소심·상고심에서는 산입액이 달라지나요?", answer: "네, 심급마다 별도로 계산합니다. 항소심·상고심의 산입 한도는 1심과 다르게 적용되며, 각 심급에서 실제 선임한 변호사에 대해 각각 산정합니다." },
      { question: "소송비용 확정 절차는 어떻게 되나요?", answer: "판결 확정 후 승소자가 소송비용액 확정 신청을 하면 법원이 결정으로 금액을 확정합니다. 확정된 금액은 집행권원이 되어 강제집행이 가능합니다." },
    ],
    relatedTools: ["lawsuit-cost", "payment-order", "civil-mediation", "late-payment"],
  },
  {
    id: "lawsuit-cost",
    name: "소송비용 계산기",
    description: "소액사건 포함 인지대·송달료·전자소송 할인을 계산합니다",
    icon: "\uD83D\uDCB8",
    category: "court",
    route: "/tools/court/lawsuit-cost",
    longDescription: "민사소송 제기 시 납부해야 할 인지대(민사소송 등 인지법)와 송달료를 소가 기준으로 계산합니다. 전자소송 이용 시 인지액 10% 감액 혜택, 소액사건(3,000만 원 이하) 특례도 반영합니다.",
    keywords: ["소송비용 계산", "인지대 계산", "송달료 계산", "전자소송 인지세 할인", "소액사건 인지대", "민사소송 비용", "법원 수수료"],
    faqItems: [
      { question: "인지대는 어떻게 계산되나요?", answer: "「민사소송 등 인지법」에 따라 소가 구간별로 계산됩니다. 소가 1,000만 원 이하는 소가×0.5%, 1,000만~1억 원 구간은 5만 원+(소가-1,000만)×0.45% 방식으로 산정됩니다." },
      { question: "전자소송을 이용하면 얼마나 절약되나요?", answer: "전자소송으로 소장을 제출하면 납부할 인지액의 10%를 감액해 줍니다. 소가가 클수록 절감액도 커지므로 전자소송 이용을 권장합니다." },
      { question: "송달료는 무엇인가요?", answer: "법원이 소송 당사자에게 서류를 보낼 때 드는 우편 비용입니다. 당사자 수와 심급에 따라 다르며, 보통 1회 발송 기준 5,200원(등기우편)으로 계산됩니다." },
      { question: "소액사건은 인지대가 다른가요?", answer: "소가 3,000만 원 이하 소액사건은 일반 민사소송과 동일한 인지세율이 적용되나, 절차가 간소화되어 전체 소송비용이 절약됩니다." },
    ],
    relatedTools: ["attorney-fee", "payment-order", "civil-mediation", "family-court"],
  },
  {
    id: "payment-order",
    name: "지급명령 비용 계산기",
    description: "독촉절차(지급명령) 신청 비용을 계산합니다",
    icon: "\uD83D\uDCDD",
    category: "court",
    route: "/tools/court/payment-order",
    longDescription: "민사소송법 제462조 이하 독촉절차에 따른 지급명령 신청 시 인지대(일반 소송의 1/10)와 송달료를 계산합니다. 채권 회수를 위한 가장 저렴하고 빠른 법적 절차로, 채무자 이의 시 소송으로 전환됩니다.",
    keywords: ["지급명령 신청비용", "독촉절차 비용", "지급명령 인지대", "채권회수 비용", "지급명령 송달료", "민사소송법 462조", "간이 채권회수"],
    faqItems: [
      { question: "지급명령 인지대는 일반 소송과 어떻게 다른가요?", answer: "지급명령 신청 인지액은 소액사건·일반사건 모두 정식 소송 인지액의 1/10입니다. 비용 부담이 훨씬 적어 소액 채권 회수에 효과적입니다." },
      { question: "지급명령 신청 후 절차는 어떻게 되나요?", answer: "법원이 요건을 검토해 지급명령을 발령하면 채무자에게 송달됩니다. 채무자가 2주 내 이의 신청을 하지 않으면 확정되어 강제집행이 가능하고, 이의 시 정식 소송으로 이행됩니다." },
      { question: "지급명령으로 처리할 수 없는 사건이 있나요?", answer: "외국에 주소를 둔 채무자, 주소 불명인 채무자에 대해서는 지급명령 신청이 불가합니다. 또한 금전 외 물건 인도청구 등 일부 청구 유형도 제외됩니다." },
      { question: "지급명령 확정 후에도 채무자가 안 갚으면 어떻게 되나요?", answer: "확정된 지급명령은 집행권원으로서 강제집행의 기초가 됩니다. 채무자 재산(예금, 급여, 부동산 등)에 대해 강제집행을 신청할 수 있습니다." },
    ],
    relatedTools: ["lawsuit-cost", "attorney-fee", "late-payment", "civil-mediation"],
  },
  {
    id: "civil-mediation",
    name: "민사조정 비용 계산기",
    description: "민사조정 신청에 필요한 비용을 계산합니다",
    icon: "\uD83E\uDD1D",
    category: "court",
    route: "/tools/court/civil-mediation",
    longDescription: "민사조정법에 따른 조정 신청 시 인지대(소송 인지액의 1/5)와 송달료를 계산합니다. 조정이 성립하면 확정판결과 동일한 효력이 발생하며, 소송보다 빠르고 비용이 저렴한 분쟁 해결 방법입니다.",
    keywords: ["민사조정 비용", "조정신청 인지대", "민사조정법", "분쟁해결 비용", "조정 vs 소송", "조정 성립 효력", "법원 조정"],
    faqItems: [
      { question: "민사조정 인지대는 소송과 어떻게 다른가요?", answer: "민사조정 신청 인지액은 정식 소송 인지액의 1/5 수준입니다. 「민사조정법」 제3조에 따라 조정부 또는 조정담당판사가 사건을 처리합니다." },
      { question: "조정이 성립하면 어떤 효력이 있나요?", answer: "「민사조정법」 제29조에 따라 조정이 성립하면 재판상 화해와 동일한 효력이 있어 확정판결처럼 강제집행이 가능합니다." },
      { question: "조정이 불성립되면 어떻게 되나요?", answer: "조정이 불성립되면 당사자는 소 제기 의사표시를 통해 정식 소송으로 이행할 수 있습니다. 이때 기납부한 조정 인지액을 소송 인지액에 충당합니다." },
      { question: "어떤 사건이 조정에 적합한가요?", answer: "계속적 거래관계, 이웃 간 분쟁, 임대차 분쟁, 금전 지급 분쟁 등 당사자 간 타협이 가능한 민사사건이 조정에 적합합니다. 합의 가능성이 있다면 소송보다 조정을 먼저 검토하세요." },
    ],
    relatedTools: ["lawsuit-cost", "attorney-fee", "payment-order", "family-court"],
  },
  {
    id: "family-court",
    name: "가사소송 비용 계산기",
    description: "가사소송 및 가사비송 비용을 계산합니다",
    icon: "\uD83C\uDFDB\uFE0F",
    category: "court",
    route: "/tools/court/family-court",
    longDescription: "가사소송법에 따른 이혼·친권·양육권·상속 등 가사소송과 가사비송 신청 시 인지대와 송달료를 계산합니다. 가사소송은 가사소송법 및 가사소송규칙에 따른 별도 비용 체계가 적용됩니다.",
    keywords: ["가사소송 비용", "이혼소송 인지대", "가사비송 비용", "양육권 소송 비용", "친권 소송", "상속 소송 비용", "가사소송법"],
    faqItems: [
      { question: "이혼소송 인지대는 얼마인가요?", answer: "협의이혼이 아닌 재판이혼(이혼 청구 소송)의 인지대는 소가를 기준으로 산정합니다. 가사소송법상 이혼 사건의 소가는 일반적으로 2,000만 원으로 보며, 이에 따라 인지대가 결정됩니다." },
      { question: "가사비송과 가사소송의 차이는 무엇인가요?", answer: "가사소송은 이혼·친생자관계 확인 등 대립하는 당사자 간 소송이고, 가사비송은 상속포기·후견인 선임 등 법원의 확인·허가를 구하는 절차입니다. 비용 체계가 다릅니다." },
      { question: "양육비·위자료 청구는 별도 비용이 드나요?", answer: "이혼 소송에 부수하는 위자료·양육비·재산분할 청구는 주된 이혼 청구에 부대하여 청구할 수 있으며, 해당 금액에 따른 인지대가 별도로 산정됩니다." },
      { question: "가사조정과 가사소송 중 어떤 것을 선택해야 하나요?", answer: "가사사건은 원칙적으로 조정 전치주의(가사소송법 제50조)를 채택하여 소송 전에 조정 절차를 거쳐야 합니다. 조정이 불성립되면 자동으로 심판 또는 소송으로 이행됩니다." },
    ],
    relatedTools: ["alimony", "child-support", "property-division", "civil-mediation", "lawsuit-cost"],
  },

  // 👨‍👩‍👧 가사/가족법 (6) — legal-inheritance→inheritance-order, gift-tax→inheritance-tax로 통합
  {
    id: "alimony",
    name: "위자료 계산기",
    description: "이혼 시 위자료 예상 금액을 계산합니다",
    icon: "\uD83D\uDC94",
    category: "family",
    route: "/tools/family/alimony",
    longDescription: "이혼 시 유책 배우자에게 청구할 수 있는 위자료를 혼인 기간, 유책 사유(외도·폭력·유기 등), 재산 상태 등을 반영해 예상합니다. 민법 제806조·제843조 및 대법원 판례 기준을 토대로 산정합니다.",
    keywords: ["이혼 위자료", "위자료 계산", "유책 배우자 위자료", "이혼 손해배상", "외도 위자료", "폭력 위자료", "민법 843조"],
    faqItems: [
      { question: "위자료는 어떤 기준으로 결정되나요?", answer: "법원은 혼인 기간, 유책 사유의 종류·정도, 쌍방 재산 및 경제력, 미성년 자녀 유무 등을 종합적으로 고려합니다. 대법원 판례(2001므718)에서 판시한 기준이 실무에서 널리 사용됩니다." },
      { question: "외도(불륜)의 경우 위자료는 얼마나 받을 수 있나요?", answer: "외도는 주요 유책 사유로, 법원 실무상 1,000만~5,000만 원 범위에서 결정되는 경우가 많습니다. 혼인 기간이 길고 자녀가 있을수록 인정 금액이 높아지는 경향이 있습니다." },
      { question: "상대방의 재산이 없으면 위자료를 받을 수 없나요?", answer: "위자료 판결을 받더라도 상대방에게 재산이 없으면 실질적 회수가 어려울 수 있습니다. 그러나 추후 상대방이 재산을 취득하면 강제집행이 가능하며, 재판이혼 확정 후 10년간 소멸시효가 진행됩니다." },
      { question: "위자료와 재산분할은 어떻게 다른가요?", answer: "위자료는 정신적 손해에 대한 배상으로 유책 배우자에게만 청구할 수 있고, 재산분할은 혼인 중 형성한 공동재산을 나누는 것으로 유책 여부와 무관하게 청구할 수 있습니다." },
    ],
    relatedTools: ["child-support", "property-division", "family-court", "civil-mediation"],
  },
  {
    id: "child-support",
    name: "양육비 계산기",
    description: "자녀 양육비 산정 기준표에 따라 계산합니다",
    icon: "\uD83D\uDC76",
    category: "family",
    route: "/tools/family/child-support",
    longDescription: "서울가정법원 양육비 산정 기준표(2021년 개정)를 기반으로 부모 합산 소득과 자녀 나이·수를 입력해 표준 양육비와 부모 각자의 분담액을 계산합니다. 민법 제837조 및 양육비이행확보법이 적용됩니다.",
    keywords: ["양육비 계산", "양육비 산정 기준표", "이혼 양육비", "자녀 양육비", "양육비 청구", "비양육자 양육비", "양육비이행확보법"],
    faqItems: [
      { question: "양육비 산정 기준표는 무엇인가요?", answer: "서울가정법원이 부모 소득과 자녀 연령에 따라 표준 양육비를 제시한 지침표입니다. 2021년 기준으로 개정되었으며, 전국 법원에서 양육비 결정의 기초자료로 활용합니다." },
      { question: "양육비는 언제까지 지급해야 하나요?", answer: "원칙적으로 자녀가 성년(만 19세)이 될 때까지 지급해야 합니다. 다만 당사자 합의나 법원 결정으로 대학 졸업 시까지 연장하는 경우도 있습니다." },
      { question: "비양육 부모가 양육비를 안 주면 어떻게 하나요?", answer: "「양육비 이행확보 및 지원에 관한 법률」에 따라 법원에 이행명령을 신청하거나 양육비이행관리원을 통해 강제 징수, 운전면허 정지, 출국금지 등의 조치를 취할 수 있습니다." },
      { question: "소득이 바뀌면 양육비를 다시 조정할 수 있나요?", answer: "네, 당사자의 소득·재산이 현저히 변동되거나 물가 상승 등 사정변경이 있으면 가정법원에 양육비 증감 청구를 할 수 있습니다(민법 제837조 제5항)." },
    ],
    relatedTools: ["alimony", "property-division", "family-court", "inheritance-order"],
  },
  {
    id: "property-division",
    name: "재산분할 계산기",
    description: "이혼 시 재산분할 비율과 금액을 계산합니다",
    icon: "\uD83C\uDFE0",
    category: "family",
    route: "/tools/family/property-division",
    longDescription: "이혼 시 민법 제839조의2에 따른 재산분할 청구권을 행사할 때 분할 대상 재산과 기여도 비율을 반영해 예상 분할액을 계산합니다. 특유재산과 공동재산을 구분하고 혼인 기간별 기여 비율을 산정합니다.",
    keywords: ["재산분할 계산", "이혼 재산분할", "재산분할 비율", "혼인 중 재산", "특유재산 재산분할", "민법 839조", "이혼 재산"],
    faqItems: [
      { question: "재산분할 대상 재산은 무엇인가요?", answer: "혼인 중 부부가 협력하여 형성한 재산(공동재산)이 분할 대상입니다. 결혼 전부터 보유하거나 상속·증여로 취득한 특유재산은 원칙적으로 분할 대상에서 제외됩니다(민법 제830조)." },
      { question: "재산분할 비율은 어떻게 정해지나요?", answer: "법원은 재산 형성에 대한 기여도를 기준으로 하며, 전업주부의 경우도 가사 기여를 인정하여 통상 30~50% 수준의 분할을 인정합니다. 혼인 기간이 길수록 기여 비율이 높아지는 경향이 있습니다." },
      { question: "이혼 후 재산분할 청구 기한이 있나요?", answer: "이혼한 날로부터 2년 이내에 재산분할 청구를 해야 합니다(민법 제839조의2 제3항). 이 기간이 지나면 청구권이 소멸하므로 주의해야 합니다." },
      { question: "빚(채무)도 재산분할에 포함되나요?", answer: "혼인 중 공동생활을 위해 부담한 채무는 재산분할 시 소극재산으로 고려됩니다. 다만 배우자 일방의 개인 채무는 상대방에게 분담을 요구하기 어렵습니다." },
    ],
    relatedTools: ["alimony", "child-support", "family-court", "inheritance-tax"],
  },
  {
    id: "inheritance-tax",
    name: "상속세·증여세 계산기",
    description: "상속재산 및 증여재산에 대한 세금을 계산합니다",
    icon: "\uD83D\uDCDC",
    category: "family",
    route: "/tools/family/inheritance-tax",
    longDescription: "상속세 및 증여세법에 따라 상속 재산 공제(기초공제·배우자공제 등) 및 증여 공제를 적용한 후 누진세율(10~50%)로 세액을 계산합니다. 10년 내 사전증여재산 합산 규정도 반영합니다.",
    keywords: ["상속세 계산", "증여세 계산", "상속세율", "증여세 공제", "배우자 상속공제", "사전증여 합산", "상속세법"],
    faqItems: [
      { question: "상속세 기초공제는 얼마인가요?", answer: "상속세 기초공제는 2억 원이며, 인적공제(자녀·미성년자·노인 등)와 일괄공제 5억 원 중 큰 금액을 선택할 수 있습니다. 배우자 법정상속분까지는 배우자 공제가 별도로 적용됩니다." },
      { question: "10년 내 사전증여재산은 어떻게 합산되나요?", answer: "피상속인이 사망 전 10년 이내에 상속인에게 증여한 재산, 5년 이내에 상속인 외 자에게 증여한 재산은 상속재산에 합산하여 상속세를 계산합니다(상속세 및 증여세법 제13조)." },
      { question: "증여세 면제 한도는 얼마인가요?", answer: "10년간 배우자로부터 6억 원, 성인 자녀로부터 5,000만 원(미성년자 2,000만 원), 기타 친족으로부터 1,000만 원까지 증여세 없이 받을 수 있습니다." },
      { question: "상속세와 증여세 세율은 어떻게 되나요?", answer: "과세표준 1억 원 이하 10%, 5억 원 이하 20%, 10억 원 이하 30%, 30억 원 이하 40%, 30억 원 초과 50%의 5단계 누진세율이 적용됩니다." },
    ],
    relatedTools: ["forced-heirship", "inheritance-order", "property-division", "capital-gains-tax"],
  },
  {
    id: "forced-heirship",
    name: "유류분 계산기",
    description: "유류분 침해액과 반환청구액을 계산합니다",
    icon: "\uD83D\uDCCA",
    category: "family",
    route: "/tools/family/forced-heirship",
    longDescription: "민법 제1112조 이하 유류분 규정에 따라 피상속인의 유증·증여로 침해된 유류분액을 계산하고 반환 청구 가능 금액을 산정합니다. 직계비속·배우자의 법정상속분 1/2, 직계존속·형제자매의 1/3이 유류분입니다.",
    keywords: ["유류분 계산", "유류분 반환청구", "유류분 침해", "상속 유류분", "민법 1112조", "증여 유류분", "유증 유류분"],
    faqItems: [
      { question: "유류분이란 무엇인가요?", answer: "피상속인이 유언이나 생전 증여로 재산을 처분했더라도 일정 상속인이 최소한 보장받을 수 있는 상속분입니다. 직계비속·배우자는 법정상속분의 1/2, 직계존속·형제자매는 1/3이 유류분입니다(민법 제1112조)." },
      { question: "유류분 반환 청구 기한은 얼마인가요?", answer: "유류분 반환청구권은 상속 개시 및 반환해야 할 증여·유증을 안 날로부터 1년, 상속 개시일로부터 10년 이내에 행사해야 합니다(민법 제1117조). 기한 도과 시 소멸합니다." },
      { question: "생전 증여도 유류분 산정에 포함되나요?", answer: "피상속인의 공동상속인에 대한 생전 증여는 원칙적으로 기간 제한 없이, 제3자에 대한 증여는 상속 개시 1년 전까지의 것을 유류분 산정 기초재산에 포함합니다(민법 제1114조)." },
      { question: "유류분 청구를 받은 수증자는 어떻게 해야 하나요?", answer: "유류분 반환 청구를 받으면 해당 재산 자체를 반환하거나 가액으로 상환할 수 있습니다. 법원은 원물 반환을 원칙으로 하되, 분할이 불가능한 경우 가액 배상을 명할 수 있습니다." },
    ],
    relatedTools: ["inheritance-order", "inheritance-tax", "family-court", "property-division"],
  },
  {
    id: "inheritance-order",
    name: "상속순위·법정상속분 판별기",
    description: "민법에 따른 상속순위와 상속분을 확인합니다",
    icon: "\uD83D\uDC65",
    category: "family",
    route: "/tools/family/inheritance-order",
    longDescription: "민법 제1000조~제1010조에 따라 상속인의 순위(직계비속→직계존속→형제자매→4촌 이내 방계혈족)와 법정상속분을 판별합니다. 배우자의 가산 상속분(50% 가산) 및 대습상속 규정도 반영합니다.",
    keywords: ["상속순위 확인", "법정상속분", "상속인 순위", "배우자 상속분", "대습상속", "민법 1000조", "상속 계산"],
    faqItems: [
      { question: "법정상속 순위는 어떻게 되나요?", answer: "1순위: 직계비속(자녀·손자녀), 2순위: 직계존속(부모·조부모), 3순위: 형제자매, 4순위: 4촌 이내 방계혈족 순입니다. 배우자는 1·2순위 상속인과 공동 상속하며, 상속인이 없으면 단독 상속합니다(민법 제1000조)." },
      { question: "배우자의 상속분은 어떻게 계산되나요?", answer: "배우자는 공동상속인 상속분에 50%를 가산합니다. 예컨대 배우자와 자녀 2명이 공동 상속하면 배우자 3/7, 자녀 각 2/7의 법정상속분이 됩니다(민법 제1009조)." },
      { question: "대습상속이란 무엇인가요?", answer: "상속인이 될 직계비속 또는 형제자매가 상속 개시 전에 사망하거나 결격된 경우, 그 사람의 직계비속과 배우자가 그 순위로 대신 상속하는 제도입니다(민법 제1001조)." },
      { question: "상속 포기와 한정승인의 차이는 무엇인가요?", answer: "상속 포기는 상속재산과 채무 모두를 거부하는 것이고, 한정승인은 상속재산 한도 내에서만 채무를 변제하는 조건부 승인입니다. 둘 다 상속 개시를 안 날로부터 3개월 이내에 신청해야 합니다." },
    ],
    relatedTools: ["forced-heirship", "inheritance-tax", "family-court", "property-division"],
  },

  // 💼 노동/근로 (12) — ordinary-wage→overtime-pay, average-wage→severance-pay로 통합
  {
    id: "severance-pay",
    name: "퇴직금 계산기",
    description: "평균임금 산정 및 퇴직금을 계산합니다",
    icon: "\uD83D\uDCB0",
    category: "labor",
    route: "/tools/labor/severance-pay",
    longDescription: "근로자퇴직급여 보장법 제8조에 따라 최근 3개월 평균임금을 산정하고 계속근로연수를 반영하여 퇴직금을 계산합니다. 1년 이상 근속한 근로자에게 지급되며, 주휴수당·연장근로수당 등 모든 임금 항목을 포함합니다.",
    keywords: ["퇴직금 계산", "평균임금 계산", "퇴직금 산정", "퇴직금 지급 기준", "근로자퇴직급여보장법", "1년 퇴직금", "퇴직금 청구"],
    faqItems: [
      { question: "퇴직금은 어떻게 계산되나요?", answer: "퇴직금 = (퇴직 전 3개월 평균임금) × 30일 × (계속근로연수)로 계산합니다. 평균임금은 임금 총액을 해당 기간 총 일수로 나눈 금액입니다(근로자퇴직급여 보장법 제8조)." },
      { question: "1년 미만 근무자도 퇴직금을 받을 수 있나요?", answer: "계속근로기간이 1년 이상이어야 퇴직금 지급 의무가 생깁니다. 단, 1년 미만이어도 당사자 간 합의로 지급할 수 있으며, 법적 의무는 없습니다." },
      { question: "퇴직금 지급 기한은 언제인가요?", answer: "사용자는 근로자가 퇴직한 날로부터 14일 이내에 퇴직금을 지급해야 합니다(근로자퇴직급여 보장법 제9조). 당사자 합의 시 연장 가능하며, 지연 시 연 20%의 지연이자가 발생합니다." },
      { question: "퇴직연금(DC형·DB형)에 가입된 경우에도 퇴직금을 받나요?", answer: "퇴직연금에 가입되어 있으면 퇴직 시 퇴직연금 계좌에 적립된 금액을 수령합니다. DC형은 근로자 운용, DB형은 사용자가 운용하며 최소 법정 퇴직금 이상 보장됩니다." },
    ],
    relatedTools: ["dismissal-notice", "annual-leave-pay", "overtime-pay", "minimum-wage-check"],
  },
  {
    id: "dismissal-notice",
    name: "해고예고수당 계산기",
    description: "해고예고 미이행 시 수당을 계산합니다",
    icon: "\u26A0\uFE0F",
    category: "labor",
    route: "/tools/labor/dismissal-notice",
    longDescription: "근로기준법 제26조에 따라 사용자가 해고 30일 전 예고를 하지 않은 경우 지급해야 할 해고예고수당(통상임금 30일분)을 계산합니다. 일용직·단기 근로자 등 예고 예외 대상 여부도 함께 확인할 수 있습니다.",
    keywords: ["해고예고수당", "해고예고 미이행", "해고예고 계산", "근로기준법 26조", "즉시해고 수당", "30일 해고예고", "해고 통보"],
    faqItems: [
      { question: "해고예고수당은 언제 받을 수 있나요?", answer: "사용자가 해고 30일 전에 예고하지 않고 즉시 해고한 경우 통상임금 30일분을 해고예고수당으로 청구할 수 있습니다(근로기준법 제26조)." },
      { question: "해고예고 의무가 없는 경우는 어떤 경우인가요?", answer: "일용 근로자로 3개월 미만 근무, 2개월 이하 기간을 정한 근로자, 월급 근로자로 6개월 미만 근무, 계절적 업무 3개월 미만, 수습 중인 근로자는 예고 의무에서 제외됩니다(근로기준법 제26조 단서)." },
      { question: "해고예고수당과 퇴직금은 별개인가요?", answer: "네, 해고예고수당은 예고 의무 위반에 대한 별도 수당으로 퇴직금과 별개로 청구할 수 있습니다. 두 금액 모두 퇴직 시 청구 가능합니다." },
      { question: "해고예고수당 청구 소멸시효는 얼마인가요?", answer: "해고예고수당은 임금에 해당하므로 3년의 소멸시효가 적용됩니다(근로기준법 제49조). 해고일로부터 3년 이내에 청구해야 합니다." },
    ],
    relatedTools: ["severance-pay", "unfair-dismissal", "overtime-pay", "minimum-wage-check"],
  },
  {
    id: "annual-leave-pay",
    name: "연차수당 계산기",
    description: "미사용 연차에 대한 수당을 계산합니다",
    icon: "\uD83C\uDFD6\uFE0F",
    category: "labor",
    route: "/tools/labor/annual-leave-pay",
    longDescription: "근로기준법 제60조에 따른 연차유급휴가 발생 일수와 미사용 연차에 대한 수당을 계산합니다. 1년 미만 근로자의 월별 발생 연차, 1년 이상 근로자의 출근율 기반 연차, 통상임금 기준 수당을 산정합니다.",
    keywords: ["연차수당 계산", "미사용 연차", "연차유급휴가 수당", "연차 발생 기준", "근로기준법 60조", "연차 소멸", "연차 청구"],
    faqItems: [
      { question: "연차휴가는 몇 일이나 발생하나요?", answer: "1년 미만 근로자는 매월 1일씩 최대 11일, 1년간 80% 이상 출근한 근로자는 15일이 발생합니다. 3년 이상 계속 근무 시 2년마다 1일씩 가산하여 최대 25일까지 받을 수 있습니다(근로기준법 제60조)." },
      { question: "미사용 연차는 언제까지 쓸 수 있나요?", answer: "연차유급휴가는 발생일로부터 1년간 사용할 수 있습니다. 1년이 지나도록 사용하지 않으면 소멸하는 대신 연차수당을 청구할 수 있습니다. 단, 사용자가 촉진 의무를 이행한 경우 수당 청구가 제한될 수 있습니다." },
      { question: "연차수당 소멸시효는 얼마인가요?", answer: "연차수당은 임금이므로 3년의 소멸시효가 적용됩니다(근로기준법 제49조). 수당 청구권이 발생한 날부터 3년 이내에 청구해야 합니다." },
      { question: "5인 미만 사업장에도 연차가 적용되나요?", answer: "5인 미만 사업장은 근로기준법 제60조 연차유급휴가 규정이 적용되지 않습니다. 다만 당사자 합의나 취업규칙으로 부여하는 경우에는 해당 기준에 따릅니다." },
    ],
    relatedTools: ["severance-pay", "overtime-pay", "weekly-holiday-pay", "minimum-wage-check"],
  },
  {
    id: "overtime-pay",
    name: "연장근로수당 계산기",
    description: "통상임금 산정 및 연장·야간·휴일 근로수당을 계산합니다",
    icon: "\u23F0",
    category: "labor",
    route: "/tools/labor/overtime-pay",
    longDescription: "근로기준법 제56조에 따라 통상임금을 기준으로 연장근로(50% 가산), 야간근로(오후 10시~오전 6시, 50% 가산), 휴일근로(8시간 이내 50%, 초과 100% 가산)수당을 정확히 계산합니다.",
    keywords: ["연장근로수당", "야간근로수당", "휴일근로수당", "통상임금 계산", "근로기준법 56조", "시간외 수당", "초과근무 수당"],
    faqItems: [
      { question: "연장·야간·휴일 근로수당의 가산율은 어떻게 되나요?", answer: "연장근로(1주 40시간 초과)와 야간근로(오후 10시~오전 6시)는 통상임금의 50% 가산, 휴일근로는 8시간 이내 50%, 8시간 초과분은 100% 가산됩니다(근로기준법 제56조)." },
      { question: "통상임금이란 무엇인가요?", answer: "통상임금은 근로자에게 정기적·일률적·고정적으로 지급하기로 한 임금입니다. 기본급 외에 직무수당·자격수당 등 고정 수당도 포함되며, 대법원 판례(2013다4374 전원합의체)가 기준이 됩니다." },
      { question: "5인 미만 사업장에도 수당이 적용되나요?", answer: "5인 미만 사업장은 근로기준법 제56조 가산수당 규정이 적용되지 않습니다. 단 야간·휴일이라는 이유만으로 추가 가산은 없으나, 최저임금 이상은 지급해야 합니다." },
      { question: "연장근로 한도를 초과하면 어떻게 되나요?", answer: "1주 12시간을 초과한 연장근로는 근로기준법 위반으로 사용자에게 2년 이하 징역 또는 2,000만 원 이하 벌금이 부과될 수 있습니다(근로기준법 제110조)." },
    ],
    relatedTools: ["severance-pay", "weekly-holiday-pay", "annual-leave-pay", "minimum-wage-check"],
  },
  {
    id: "weekly-holiday-pay",
    name: "주휴수당 계산기",
    description: "주휴수당 발생 여부와 금액을 계산합니다",
    icon: "\uD83D\uDCC5",
    category: "labor",
    route: "/tools/labor/weekly-holiday-pay",
    longDescription: "근로기준법 제55조 및 시행령 제30조에 따라 1주 15시간 이상 근무하고 소정근로일을 개근한 근로자에게 발생하는 주휴수당을 계산합니다. 아르바이트·파트타임 근로자도 요건 충족 시 청구 가능합니다.",
    keywords: ["주휴수당 계산", "주휴수당 발생 조건", "알바 주휴수당", "주 15시간 주휴", "근로기준법 55조", "유급 주휴일", "주휴수당 청구"],
    faqItems: [
      { question: "주휴수당은 어떤 조건에서 발생하나요?", answer: "1주 소정근로시간이 15시간 이상이고, 해당 주의 소정근로일을 모두 개근한 경우 유급 주휴일(통상 일요일)에 대한 주휴수당이 발생합니다(근로기준법 제55조)." },
      { question: "주휴수당은 얼마인가요?", answer: "1주 근로시간이 40시간인 경우 1일분(8시간) 통상임금이 주휴수당입니다. 소정근로시간이 40시간 미만이면 비례하여 지급됩니다. 예를 들어 주 20시간 근무자는 4시간분 통상임금입니다." },
      { question: "한 주라도 결근하면 주휴수당이 없어지나요?", answer: "해당 주의 소정근로일을 모두 개근하지 않으면 그 주의 주휴수당 청구권이 소멸합니다. 단, 사용자의 승인을 받은 조퇴·지각은 결근으로 보지 않는 경우도 있습니다." },
      { question: "주휴수당을 안 준 경우 어떻게 해야 하나요?", answer: "주휴수당 미지급은 임금 체불에 해당합니다. 노동청에 진정(임금체불 신고)을 제기할 수 있으며, 사용자에게 3년 이하 징역 또는 3,000만 원 이하 벌금이 부과될 수 있습니다." },
    ],
    relatedTools: ["minimum-wage-check", "overtime-pay", "annual-leave-pay", "severance-pay"],
  },
  {
    id: "minimum-wage-check",
    name: "최저임금 위반 계산기",
    description: "최저임금 위반 여부와 차액을 계산합니다",
    icon: "\uD83D\uDCCF",
    category: "labor",
    route: "/tools/labor/minimum-wage-check",
    longDescription: "최저임금법에 따른 연도별 최저임금(시급)과 실제 지급 임금을 비교하여 위반 여부와 미지급 차액을 계산합니다. 주휴수당 포함 여부, 수습 감액 적용(최저임금의 90%) 등의 변수도 반영합니다.",
    keywords: ["최저임금 위반", "최저임금 계산", "시급 최저임금", "최저임금법", "최저임금 미달", "최저임금 차액", "2025 최저임금"],
    faqItems: [
      { question: "2025년 최저임금은 얼마인가요?", answer: "2025년 최저임금은 시간급 10,030원입니다. 월급으로 환산하면 주 40시간 기준(월 209시간) 약 2,096,270원입니다(최저임금위원회 고시)." },
      { question: "수습 근로자는 최저임금 감액이 가능한가요?", answer: "수습 사용 중인 근로자(단순노무 직종 제외)로서 수습 시작 후 3개월 이내인 경우 최저임금의 90%를 지급할 수 있습니다. 1년 미만 계약직에는 수습 감액이 적용되지 않습니다." },
      { question: "최저임금 위반 시 어떤 처벌을 받나요?", answer: "최저임금에 미달하는 임금을 지급한 사용자는 3년 이하 징역 또는 2,000만 원 이하 벌금에 처해질 수 있습니다(최저임금법 제28조)." },
      { question: "최저임금에 포함되는 임금 항목은 무엇인가요?", answer: "기본급은 포함되지만 초과근무 가산수당, 복리후생 수당(식비·교통비 등), 주휴수당(월급제의 경우 통산 포함)은 최저임금 산입 범위에서 제외될 수 있습니다. 2024년부터 복리후생비도 일부 산입됩니다." },
    ],
    relatedTools: ["weekly-holiday-pay", "overtime-pay", "annual-leave-pay", "severance-pay"],
  },
  { id: "unfair-dismissal", name: "부당해고 보상금 계산기", description: "부당해고 시 받을 수 있는 보상금을 계산합니다", icon: "\u274C", category: "labor", route: "/tools/labor/unfair-dismissal" },
  { id: "industrial-accident", name: "산재보험급여 계산기", description: "장해등급 보상금 포함 산업재해 보험급여를 계산합니다", icon: "\uD83C\uDFE5", category: "labor", route: "/tools/labor/industrial-accident" },
  { id: "maternity-leave", name: "출산휴가급여 계산기", description: "출산전후휴가 급여를 계산합니다", icon: "\uD83E\uDD30", category: "labor", route: "/tools/labor/maternity-leave" },
  { id: "parental-leave", name: "육아휴직급여 계산기", description: "육아휴직 급여를 계산합니다", icon: "\uD83D\uDC76", category: "labor", route: "/tools/labor/parental-leave" },
  { id: "unemployment-benefit", name: "실업급여 계산기", description: "실업급여 수급액과 기간을 계산합니다", icon: "\uD83D\uDCCB", category: "labor", route: "/tools/labor/unemployment-benefit" },
  { id: "shutdown-allowance", name: "휴업수당 계산기", description: "사용자 귀책 휴업 시 수당을 계산합니다", icon: "\uD83C\uDFED", category: "labor", route: "/tools/labor/shutdown-allowance" },

  // 🏛️ 세금 (10) — income-tax→year-end-tax, property-tax→comprehensive-property-tax로 통합
  { id: "capital-gains-tax", name: "양도소득세 계산기", description: "부동산·주식 양도소득세를 계산합니다", icon: "\uD83C\uDFE2", category: "tax", route: "/tools/tax/capital-gains-tax" },
  { id: "comprehensive-income-tax", name: "종합소득세 계산기", description: "종합소득세를 계산합니다", icon: "\uD83D\uDCCA", category: "tax", route: "/tools/tax/comprehensive-income-tax" },
  { id: "acquisition-tax", name: "취득세 계산기", description: "부동산 취득세를 계산합니다", icon: "\uD83C\uDFE0", category: "tax", route: "/tools/tax/acquisition-tax" },
  { id: "comprehensive-property-tax", name: "종합부동산세·재산세 계산기", description: "종합부동산세와 재산세를 계산합니다", icon: "\uD83C\uDFD8\uFE0F", category: "tax", route: "/tools/tax/comprehensive-property-tax" },
  { id: "registration-tax", name: "등록면허세 계산기", description: "등록면허세를 계산합니다", icon: "\uD83D\uDCC3", category: "tax", route: "/tools/tax/registration-tax" },
  { id: "vat", name: "부가가치세 계산기", description: "부가가치세를 계산합니다", icon: "\uD83E\uDDFE", category: "tax", route: "/tools/tax/vat" },
  { id: "securities-tax", name: "증권거래세 계산기", description: "증권거래세를 계산합니다", icon: "\uD83D\uDCC8", category: "tax", route: "/tools/tax/securities-tax" },
  { id: "year-end-tax", name: "연말정산 계산기", description: "연말정산 예상 환급액을 계산합니다", icon: "\uD83D\uDCC5", category: "tax", route: "/tools/tax/year-end-tax" },
  { id: "four-insurances", name: "4대보험료 계산기", description: "4대 사회보험료를 계산합니다", icon: "\uD83D\uDEE1\uFE0F", category: "tax", route: "/tools/tax/four-insurances" },
  { id: "rent-tax-credit", name: "월세 세액공제 계산기", description: "월세 세액공제 금액을 계산합니다", icon: "\uD83C\uDFE0", category: "tax", route: "/tools/tax/rent-tax-credit" },

  // 🏠 부동산 (7) — REALTY-01~07
  { id: "deposit-return", name: "임대차 보증금 반환 계산기", description: "임대차 보증금 반환액을 계산합니다", icon: "\uD83D\uDCB0", category: "realty", route: "/tools/realty/deposit-return" },
  { id: "rent-conversion", name: "전월세 전환율 계산기", description: "전세/월세 전환 금액을 계산합니다", icon: "\uD83D\uDD04", category: "realty", route: "/tools/realty/rent-conversion" },
  { id: "brokerage-fee", name: "중개보수 계산기", description: "부동산 중개보수(복비)를 계산합니다", icon: "\uD83E\uDD1D", category: "realty", route: "/tools/realty/brokerage-fee" },
  { id: "subscription-score", name: "청약가점 계산기", description: "주택청약 가점을 계산합니다", icon: "\uD83C\uDFAF", category: "realty", route: "/tools/realty/subscription-score" },
  { id: "dsr", name: "DSR 계산기", description: "총부채원리금상환비율(DSR)을 계산합니다", icon: "\uD83D\uDCCA", category: "realty", route: "/tools/realty/dsr" },
  { id: "ltv", name: "LTV 계산기", description: "담보인정비율(LTV)을 계산합니다", icon: "\uD83C\uDFE6", category: "realty", route: "/tools/realty/ltv" },
  { id: "dti", name: "DTI 계산기", description: "총부채상환비율(DTI)을 계산합니다", icon: "\uD83D\uDCC9", category: "realty", route: "/tools/realty/dti" },

  // 🚗 교통/형사 (4) — fault-ratio→accident-settlement, speeding-fine→fine-penalty로 통합
  { id: "accident-settlement", name: "교통사고 합의금 계산기", description: "과실비율 산정 및 교통사고 합의금을 예상합니다", icon: "\uD83D\uDE97", category: "traffic", route: "/tools/traffic/accident-settlement" },
  { id: "drunk-driving", name: "음주운전 처벌 계산기", description: "혈중알코올농도에 따른 처벌을 확인합니다", icon: "\uD83C\uDF7A", category: "traffic", route: "/tools/traffic/drunk-driving" },
  { id: "fine-penalty", name: "벌금/과태료 계산기", description: "속도위반 포함 각종 벌금과 과태료를 계산합니다", icon: "\uD83D\uDCB8", category: "traffic", route: "/tools/traffic/fine-penalty" },
  { id: "bail", name: "형사 보석금 계산기", description: "형사 보석금 예상 금액을 계산합니다", icon: "\uD83D\uDD13", category: "traffic", route: "/tools/traffic/bail" },

  // 💰 채권/이자 (3) — legal-interest→late-payment로 통합
  { id: "late-payment", name: "지연손해금 계산기", description: "법정이자 포함 지연손해금을 계산합니다", icon: "\u23F3", category: "debt", route: "/tools/debt/late-payment" },
  { id: "loan-interest", name: "대여금 이자 계산기", description: "대여금에 대한 이자를 계산합니다", icon: "\uD83D\uDCB5", category: "debt", route: "/tools/debt/loan-interest" },
  { id: "unjust-enrichment", name: "부당이득 반환 계산기", description: "부당이득 반환액을 계산합니다", icon: "\u21A9\uFE0F", category: "debt", route: "/tools/debt/unjust-enrichment" },

  // 📋 손해배상 (4) — disability-compensation→industrial-accident(labor), product-liability→damages-general로 통합
  { id: "damages-general", name: "손해배상 계산기", description: "제조물책임 포함 일반 손해배상액을 계산합니다", icon: "\uD83D\uDCCB", category: "damages", route: "/tools/damages/damages-general" },
  { id: "defamation", name: "명예훼손 손해배상 계산기", description: "명예훼손 손해배상액을 계산합니다", icon: "\uD83D\uDCE2", category: "damages", route: "/tools/damages/defamation" },
  { id: "medical-malpractice", name: "의료사고 손해배상 계산기", description: "의료사고 손해배상액을 계산합니다", icon: "\uD83C\uDFE5", category: "damages", route: "/tools/damages/medical-malpractice" },
  { id: "lost-income", name: "일실수입 계산기", description: "사고로 인한 일실수입을 계산합니다", icon: "\uD83D\uDCC9", category: "damages", route: "/tools/damages/lost-income" },

  // 🔧 기타 법률도구 (4) — MISC-01~04
  { id: "statute-of-limitations", name: "소멸시효 계산기", description: "각종 청구권의 소멸시효를 계산합니다", icon: "\u23F0", category: "misc", route: "/tools/misc/statute-of-limitations" },
  { id: "public-defender", name: "국선변호사 자격 확인기", description: "국선변호사 선정 자격을 확인합니다", icon: "\uD83D\uDC68\u200D\u2696\uFE0F", category: "misc", route: "/tools/misc/public-defender" },
  { id: "legal-aid", name: "법률구조 대상 확인기", description: "법률구조공단 지원 대상 여부를 확인합니다", icon: "\uD83C\uDD98", category: "misc", route: "/tools/misc/legal-aid" },
  { id: "certified-letter", name: "내용증명 작성 도우미", description: "내용증명 작성을 도와줍니다", icon: "\u2709\uFE0F", category: "misc", route: "/tools/misc/certified-letter" },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return TOOLS.filter((t) => t.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
  );
}

export function getToolByRoute(route: string): Tool | undefined {
  return TOOLS.find((t) => t.route === route);
}
