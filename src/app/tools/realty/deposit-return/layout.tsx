import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/deposit-return';

export const metadata: Metadata = {
  title: '임대차 보증금 반환 계산기 - 무료 계산',
  description: '주택임대차보호법 제3조·제3조의2에 따른 대항력·우선변제권을 분석하고, 보증금 반환 거절 시 임차권등기명령 신청 및 보증금 반환 소송 절차와 예상 반환액을 계산합니다.',
  keywords: ['임대차 보증금 반환', '전세보증금 반환', '임차권등기명령', '주택임대차보호법', '보증금 미반환', '전세 분쟁', '보증금 소송'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '임대차 보증금 반환 계산기 | law-calc.kr',
    description: '주택임대차보호법 제3조·제3조의2에 따른 대항력·우선변제권을 분석하고, 보증금 반환 거절 시 임차권등기명령 신청 및 보증금 반환 소송 절차와 예상 반환액을 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '임대차 보증금 반환 계산기 | law-calc.kr',
    description: '주택임대차보호법 제3조·제3조의2에 따른 대항력·우선변제권을 분석하고, 보증금 반환 거절 시 임차권등기명령 신청 및 보증금 반환 소송 절차와 예상 반환액을 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
