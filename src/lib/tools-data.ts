export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  route: string;
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
  // ⚖️ 소송/법원 (7) — stamp-fee, service-fee → lawsuit-cost로 통합
  { id: "attorney-fee", name: "변호사보수 소송비용산입 계산기", description: "변호사보수의 소송비용 산입액을 계산합니다", icon: "\uD83D\uDC68\u200D\u2696\uFE0F", category: "court", route: "/tools/court/attorney-fee" },
  { id: "lawsuit-cost", name: "소송비용 계산기", description: "인지대와 송달료를 포함한 소송비용을 계산합니다", icon: "\uD83D\uDCB8", category: "court", route: "/tools/court/lawsuit-cost" },
  { id: "small-claims", name: "소액사건 재판비용 계산기", description: "소액사건의 재판비용을 간편하게 계산합니다", icon: "\uD83D\uDCB1", category: "court", route: "/tools/court/small-claims" },
  { id: "payment-order", name: "지급명령 비용 계산기", description: "독촉절차(지급명령) 신청 비용을 계산합니다", icon: "\uD83D\uDCDD", category: "court", route: "/tools/court/payment-order" },
  { id: "civil-mediation", name: "민사조정 비용 계산기", description: "민사조정 신청에 필요한 비용을 계산합니다", icon: "\uD83E\uDD1D", category: "court", route: "/tools/court/civil-mediation" },
  { id: "family-court", name: "가사소송 비용 계산기", description: "가사소송 및 가사비송 비용을 계산합니다", icon: "\uD83C\uDFDB\uFE0F", category: "court", route: "/tools/court/family-court" },
  { id: "e-court", name: "전자소송 비용 계산기", description: "전자소송 이용 시 비용 할인액을 계산합니다", icon: "\uD83D\uDCBB", category: "court", route: "/tools/court/e-court" },

  // 👨‍👩‍👧 가사/가족법 (6) — legal-inheritance→inheritance-order, gift-tax→inheritance-tax로 통합
  { id: "alimony", name: "위자료 계산기", description: "이혼 시 위자료 예상 금액을 계산합니다", icon: "\uD83D\uDC94", category: "family", route: "/tools/family/alimony" },
  { id: "child-support", name: "양육비 계산기", description: "자녀 양육비 산정 기준표에 따라 계산합니다", icon: "\uD83D\uDC76", category: "family", route: "/tools/family/child-support" },
  { id: "property-division", name: "재산분할 계산기", description: "이혼 시 재산분할 비율과 금액을 계산합니다", icon: "\uD83C\uDFE0", category: "family", route: "/tools/family/property-division" },
  { id: "inheritance-tax", name: "상속세·증여세 계산기", description: "상속재산 및 증여재산에 대한 세금을 계산합니다", icon: "\uD83D\uDCDC", category: "family", route: "/tools/family/inheritance-tax" },
  { id: "forced-heirship", name: "유류분 계산기", description: "유류분 침해액과 반환청구액을 계산합니다", icon: "\uD83D\uDCCA", category: "family", route: "/tools/family/forced-heirship" },
  { id: "inheritance-order", name: "상속순위·법정상속분 판별기", description: "민법에 따른 상속순위와 상속분을 확인합니다", icon: "\uD83D\uDC65", category: "family", route: "/tools/family/inheritance-order" },

  // 💼 노동/근로 (12) — ordinary-wage→overtime-pay, average-wage→severance-pay로 통합
  { id: "severance-pay", name: "퇴직금 계산기", description: "평균임금 산정 및 퇴직금을 계산합니다", icon: "\uD83D\uDCB0", category: "labor", route: "/tools/labor/severance-pay" },
  { id: "dismissal-notice", name: "해고예고수당 계산기", description: "해고예고 미이행 시 수당을 계산합니다", icon: "\u26A0\uFE0F", category: "labor", route: "/tools/labor/dismissal-notice" },
  { id: "annual-leave-pay", name: "연차수당 계산기", description: "미사용 연차에 대한 수당을 계산합니다", icon: "\uD83C\uDFD6\uFE0F", category: "labor", route: "/tools/labor/annual-leave-pay" },
  { id: "overtime-pay", name: "연장근로수당 계산기", description: "통상임금 산정 및 연장·야간·휴일 근로수당을 계산합니다", icon: "\u23F0", category: "labor", route: "/tools/labor/overtime-pay" },
  { id: "weekly-holiday-pay", name: "주휴수당 계산기", description: "주휴수당 발생 여부와 금액을 계산합니다", icon: "\uD83D\uDCC5", category: "labor", route: "/tools/labor/weekly-holiday-pay" },
  { id: "minimum-wage-check", name: "최저임금 위반 계산기", description: "최저임금 위반 여부와 차액을 계산합니다", icon: "\uD83D\uDCCF", category: "labor", route: "/tools/labor/minimum-wage-check" },
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
