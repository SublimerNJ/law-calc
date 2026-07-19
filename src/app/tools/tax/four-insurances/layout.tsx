import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/four-insurances';

export const metadata: Metadata = {
  title: '4대보험료 계산기 - 무료 계산',
  description: '국민건강보험법·국민연금법·고용보험법·산업재해보상보험법에 따라 근로자와 사업주가 각각 부담하는 4대 사회보험료(건강보험·국민연금·고용보험·산재보험)를 월급 기준으로 계산합니다.',
  keywords: ['4대보험료 계산', '건강보험료 계산', '국민연금 보험료', '고용보험료 계산', '산재보험료', '4대보험 사업주 부담', '급여에서 공제되는 보험료'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '4대보험료 계산기 | law-calc.kr',
    description: '국민건강보험법·국민연금법·고용보험법·산업재해보상보험법에 따라 근로자와 사업주가 각각 부담하는 4대 사회보험료(건강보험·국민연금·고용보험·산재보험)를 월급 기준으로 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '4대보험료 계산기 | law-calc.kr',
    description: '국민건강보험법·국민연금법·고용보험법·산업재해보상보험법에 따라 근로자와 사업주가 각각 부담하는 4대 사회보험료(건강보험·국민연금·고용보험·산재보험)를 월급 기준으로 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
