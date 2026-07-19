import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/severance-pay';

export const metadata: Metadata = {
  title: '퇴직금 계산기 - 무료 계산',
  description: '근로자퇴직급여 보장법 제8조에 따라 최근 3개월 평균임금을 산정하고 계속근로연수를 반영하여 퇴직금을 계산합니다. 1년 이상 근속한 근로자에게 지급되며, 주휴수당·연장근로수당 등 모든 임금 항목을 포함합니다.',
  keywords: ['퇴직금 계산', '평균임금 계산', '퇴직금 산정', '퇴직금 지급 기준', '근로자퇴직급여보장법', '1년 퇴직금', '퇴직금 청구'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '퇴직금 계산기 | law-calc.kr',
    description: '근로자퇴직급여 보장법 제8조에 따라 최근 3개월 평균임금을 산정하고 계속근로연수를 반영하여 퇴직금을 계산합니다. 1년 이상 근속한 근로자에게 지급되며, 주휴수당·연장근로수당 등 모든 임금 항목을 포함합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '퇴직금 계산기 | law-calc.kr',
    description: '근로자퇴직급여 보장법 제8조에 따라 최근 3개월 평균임금을 산정하고 계속근로연수를 반영하여 퇴직금을 계산합니다. 1년 이상 근속한 근로자에게 지급되며, 주휴수당·연장근로수당 등 모든 임금 항목을 포함합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
