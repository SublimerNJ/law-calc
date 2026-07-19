import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/debt/unjust-enrichment';

export const metadata: Metadata = {
  title: '부당이득 반환 계산기 - 무료 계산',
  description: '민법 제741조 부당이득 반환청구권에 따라 법률상 원인 없이 취득한 이익의 반환액을 계산합니다. 악의 수익자(연 5% 이상 이자 가산)와 선의 수익자의 반환 범위 차이도 안내합니다.',
  keywords: ['부당이득 반환', '부당이득 계산기', '민법 741조', '잘못 송금 반환', '이중지급 반환', '부당이득 이자', '법률상 원인 없이'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '부당이득 반환 계산기 | law-calc.kr',
    description: '민법 제741조 부당이득 반환청구권에 따라 법률상 원인 없이 취득한 이익의 반환액을 계산합니다. 악의 수익자(연 5% 이상 이자 가산)와 선의 수익자의 반환 범위 차이도 안내합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부당이득 반환 계산기 | law-calc.kr',
    description: '민법 제741조 부당이득 반환청구권에 따라 법률상 원인 없이 취득한 이익의 반환액을 계산합니다. 악의 수익자(연 5% 이상 이자 가산)와 선의 수익자의 반환 범위 차이도 안내합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
