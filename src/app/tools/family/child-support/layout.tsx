import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/child-support';

export const metadata: Metadata = {
  title: '양육비 계산기 - 무료 계산',
  description: '서울가정법원 양육비 산정 기준표(2021년 개정)를 기반으로 부모 합산 소득과 자녀 나이·수를 입력해 표준 양육비와 부모 각자의 분담액을 계산합니다. 민법 제837조 및 양육비이행확보법이 적용됩니다.',
  keywords: ['양육비 계산', '양육비 산정 기준표', '이혼 양육비', '자녀 양육비', '양육비 청구', '비양육자 양육비', '양육비이행확보법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '양육비 계산기 | law-calc.kr',
    description: '서울가정법원 양육비 산정 기준표(2021년 개정)를 기반으로 부모 합산 소득과 자녀 나이·수를 입력해 표준 양육비와 부모 각자의 분담액을 계산합니다. 민법 제837조 및 양육비이행확보법이 적용됩니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '양육비 계산기 | law-calc.kr',
    description: '서울가정법원 양육비 산정 기준표(2021년 개정)를 기반으로 부모 합산 소득과 자녀 나이·수를 입력해 표준 양육비와 부모 각자의 분담액을 계산합니다. 민법 제837조 및 양육비이행확보법이 적용됩니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
