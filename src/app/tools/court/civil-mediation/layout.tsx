import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/court/civil-mediation';

export const metadata: Metadata = {
  title: '민사조정 비용 계산기 - 무료 계산',
  description: '민사조정법에 따른 조정 신청 시 인지대(소송 인지액의 1/5)와 송달료를 계산합니다. 조정이 성립하면 확정판결과 동일한 효력이 발생하며, 소송보다 빠르고 비용이 저렴한 분쟁 해결 방법입니다.',
  keywords: ['민사조정 비용', '조정신청 인지대', '민사조정법', '분쟁해결 비용', '조정 vs 소송', '조정 성립 효력', '법원 조정'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '민사조정 비용 계산기 | law-calc.kr',
    description: '민사조정법에 따른 조정 신청 시 인지대(소송 인지액의 1/5)와 송달료를 계산합니다. 조정이 성립하면 확정판결과 동일한 효력이 발생하며, 소송보다 빠르고 비용이 저렴한 분쟁 해결 방법입니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '민사조정 비용 계산기 | law-calc.kr',
    description: '민사조정법에 따른 조정 신청 시 인지대(소송 인지액의 1/5)와 송달료를 계산합니다. 조정이 성립하면 확정판결과 동일한 효력이 발생하며, 소송보다 빠르고 비용이 저렴한 분쟁 해결 방법입니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
