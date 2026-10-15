import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/court/attorney-fee';

export const metadata: Metadata = {
  title: '변호사보수 소송비용 산입 참고 계산기 - 현행 기준',
  description: '민사소송법 제109조와 변호사보수의 소송비용 산입에 관한 규칙 제3조부터 제6조·별표에 따라 한 심급의 산입 한도를 참고로 계산합니다.',
  keywords: ['변호사보수 산입 계산기', '소송비용 변호사보수', '소송비용 산입 한도', '실제 지급 보수액', '가압류 변호사보수', '소송비용액 확정'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '변호사보수 소송비용 산입 참고 계산기 | law-calc.kr',
    description: '민사소송법 제109조와 변호사보수 규칙의 별표를 기준으로 한 심급의 산입 한도와 실제 보수액을 비교합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '변호사보수 소송비용 산입 참고 계산기 | law-calc.kr',
    description: '민사소송법 제109조와 변호사보수 규칙의 별표를 기준으로 한 심급의 산입 한도와 실제 보수액을 비교합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
