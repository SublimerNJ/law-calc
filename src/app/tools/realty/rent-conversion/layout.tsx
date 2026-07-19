import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/rent-conversion';

export const metadata: Metadata = {
  title: '전월세 전환율 계산기 - 무료 계산',
  description: '주택임대차보호법 제7조의2에 따른 전월세 전환율(한국은행 기준금리+2%p, 연 5% 상한) 기준으로 전세보증금을 월세로 또는 월세를 전세금으로 전환하는 금액을 계산합니다.',
  keywords: ['전월세 전환율 계산', '전세 월세 전환', '월세 전환 계산기', '전환율 상한', '주택임대차보호법 7조', '보증금 월세 환산', '전세 월세 비교'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '전월세 전환율 계산기 | law-calc.kr',
    description: '주택임대차보호법 제7조의2에 따른 전월세 전환율(한국은행 기준금리+2%p, 연 5% 상한) 기준으로 전세보증금을 월세로 또는 월세를 전세금으로 전환하는 금액을 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '전월세 전환율 계산기 | law-calc.kr',
    description: '주택임대차보호법 제7조의2에 따른 전월세 전환율(한국은행 기준금리+2%p, 연 5% 상한) 기준으로 전세보증금을 월세로 또는 월세를 전세금으로 전환하는 금액을 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
