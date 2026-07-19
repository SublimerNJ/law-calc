import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/capital-gains-tax';

export const metadata: Metadata = {
  title: '양도소득세 계산기 - 무료 계산',
  description: '소득세법 제94조 이하에 따라 부동산·주식 등 자산 양도 시 발생하는 양도소득세를 계산합니다. 1세대 1주택 비과세, 장기보유특별공제(최대 80%), 중과세율(조정대상지역 2주택 이상) 등을 모두 반영합니다.',
  keywords: ['양도소득세 계산', '부동산 양도세', '1세대 1주택 비과세', '장기보유특별공제', '양도세 중과세', '조정대상지역 양도세', '주식 양도소득세'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '양도소득세 계산기 | law-calc.kr',
    description: '소득세법 제94조 이하에 따라 부동산·주식 등 자산 양도 시 발생하는 양도소득세를 계산합니다. 1세대 1주택 비과세, 장기보유특별공제(최대 80%), 중과세율(조정대상지역 2주택 이상) 등을 모두 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '양도소득세 계산기 | law-calc.kr',
    description: '소득세법 제94조 이하에 따라 부동산·주식 등 자산 양도 시 발생하는 양도소득세를 계산합니다. 1세대 1주택 비과세, 장기보유특별공제(최대 80%), 중과세율(조정대상지역 2주택 이상) 등을 모두 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
