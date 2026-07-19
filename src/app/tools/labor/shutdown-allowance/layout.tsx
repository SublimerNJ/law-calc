import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/shutdown-allowance';

export const metadata: Metadata = {
  title: '휴업수당 계산기 - 무료 계산',
  description: '근로기준법 제46조에 따라 사용자의 귀책사유로 휴업하는 경우 지급해야 하는 평균임금의 70% 이상 휴업수당을 계산합니다. 평균임금의 70%가 통상임금을 초과하는 경우 통상임금을 기준으로 합니다.',
  keywords: ['휴업수당 계산', '사용자 귀책 휴업', '근로기준법 46조', '휴업수당 평균임금 70%', '공장 휴업 수당', '경영상 휴업 수당', '휴업수당 지급 기준'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '휴업수당 계산기 | law-calc.kr',
    description: '근로기준법 제46조에 따라 사용자의 귀책사유로 휴업하는 경우 지급해야 하는 평균임금의 70% 이상 휴업수당을 계산합니다. 평균임금의 70%가 통상임금을 초과하는 경우 통상임금을 기준으로 합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '휴업수당 계산기 | law-calc.kr',
    description: '근로기준법 제46조에 따라 사용자의 귀책사유로 휴업하는 경우 지급해야 하는 평균임금의 70% 이상 휴업수당을 계산합니다. 평균임금의 70%가 통상임금을 초과하는 경우 통상임금을 기준으로 합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
