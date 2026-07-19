import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/damages/lost-income';

export const metadata: Metadata = {
  title: '일실수입 계산기 - 무료 계산',
  description: '대법원 판례(호프만 계수법 또는 라이프니츠 계수법)에 따라 사고로 인한 가동능력 상실 기간 동안의 일실수입을 현가로 환산합니다. 노동능력상실률(맥브라이드 기준)과 가동연령(만 65세)을 반영합니다.',
  keywords: ['일실수입 계산기', '손해배상 일실수입', '호프만 계수', '라이프니츠 계수', '노동능력상실률', '맥브라이드 기준', '가동연령 65세'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '일실수입 계산기 | law-calc.kr',
    description: '대법원 판례(호프만 계수법 또는 라이프니츠 계수법)에 따라 사고로 인한 가동능력 상실 기간 동안의 일실수입을 현가로 환산합니다. 노동능력상실률(맥브라이드 기준)과 가동연령(만 65세)을 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '일실수입 계산기 | law-calc.kr',
    description: '대법원 판례(호프만 계수법 또는 라이프니츠 계수법)에 따라 사고로 인한 가동능력 상실 기간 동안의 일실수입을 현가로 환산합니다. 노동능력상실률(맥브라이드 기준)과 가동연령(만 65세)을 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
