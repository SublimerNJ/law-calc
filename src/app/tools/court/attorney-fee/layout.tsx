import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/court/attorney-fee';

export const metadata: Metadata = {
  title: '변호사보수 소송비용산입 계산기 - 무료 계산',
  description: '민사소송규칙 제116조 및 변호사보수의 소송비용 산입에 관한 규칙에 따라 소가 구간별 산입 한도액을 자동 계산합니다. 승소 후 상대방에게 청구할 수 있는 변호사비용 산입액을 정확히 파악할 수 있습니다.',
  keywords: ['변호사보수 소송비용', '변호사비용 청구', '소송비용 산입', '변호사보수 산입 규칙', '소가별 변호사비', '패소자 부담 변호사비', '소송비용 환수'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '변호사보수 소송비용산입 계산기 | law-calc.kr',
    description: '민사소송규칙 제116조 및 변호사보수의 소송비용 산입에 관한 규칙에 따라 소가 구간별 산입 한도액을 자동 계산합니다. 승소 후 상대방에게 청구할 수 있는 변호사비용 산입액을 정확히 파악할 수 있습니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '변호사보수 소송비용산입 계산기 | law-calc.kr',
    description: '민사소송규칙 제116조 및 변호사보수의 소송비용 산입에 관한 규칙에 따라 소가 구간별 산입 한도액을 자동 계산합니다. 승소 후 상대방에게 청구할 수 있는 변호사비용 산입액을 정확히 파악할 수 있습니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
