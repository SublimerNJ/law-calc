import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/minimum-wage-check';

export const metadata: Metadata = {
  title: '최저임금 위반 계산기 - 무료 계산',
  description: '최저임금법에 따른 연도별 최저임금(시급)과 실제 지급 임금을 비교하여 위반 여부와 미지급 차액을 계산합니다. 주휴수당 포함 여부, 수습 감액 적용(최저임금의 90%) 등의 변수도 반영합니다.',
  keywords: ['최저임금 위반', '최저임금 계산', '시급 최저임금', '최저임금법', '최저임금 미달', '최저임금 차액', '2025 최저임금'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '최저임금 위반 계산기 | law-calc.kr',
    description: '최저임금법에 따른 연도별 최저임금(시급)과 실제 지급 임금을 비교하여 위반 여부와 미지급 차액을 계산합니다. 주휴수당 포함 여부, 수습 감액 적용(최저임금의 90%) 등의 변수도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '최저임금 위반 계산기 | law-calc.kr',
    description: '최저임금법에 따른 연도별 최저임금(시급)과 실제 지급 임금을 비교하여 위반 여부와 미지급 차액을 계산합니다. 주휴수당 포함 여부, 수습 감액 적용(최저임금의 90%) 등의 변수도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
