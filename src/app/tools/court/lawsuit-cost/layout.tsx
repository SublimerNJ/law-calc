import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/court/lawsuit-cost';

export const metadata: Metadata = {
  title: '소송비용 계산기 - 무료 계산',
  description: '민사소송 제기 시 납부해야 할 인지대(민사소송 등 인지법)와 송달료를 소가 기준으로 계산합니다. 전자소송 이용 시 인지액 10% 감액 혜택, 소액사건(3,000만 원 이하) 특례도 반영합니다.',
  keywords: ['소송비용 계산', '인지대 계산', '송달료 계산', '전자소송 인지세 할인', '소액사건 인지대', '민사소송 비용', '법원 수수료'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '소송비용 계산기 | law-calc.kr',
    description: '민사소송 제기 시 납부해야 할 인지대(민사소송 등 인지법)와 송달료를 소가 기준으로 계산합니다. 전자소송 이용 시 인지액 10% 감액 혜택, 소액사건(3,000만 원 이하) 특례도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '소송비용 계산기 | law-calc.kr',
    description: '민사소송 제기 시 납부해야 할 인지대(민사소송 등 인지법)와 송달료를 소가 기준으로 계산합니다. 전자소송 이용 시 인지액 10% 감액 혜택, 소액사건(3,000만 원 이하) 특례도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
