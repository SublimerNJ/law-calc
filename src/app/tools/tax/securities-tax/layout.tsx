import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/securities-tax';

export const metadata: Metadata = {
  title: '증권거래세 계산기 - 무료 계산',
  description: '증권거래세법에 따라 주권(주식)의 양도·거래 시 부과되는 증권거래세를 계산합니다. 유가증권시장(코스피 0.03%), 코스닥(0.18%), 비상장주식(0.35%) 등 시장별 세율과 농어촌특별세를 반영합니다.',
  keywords: ['증권거래세 계산', '주식 거래세', '코스피 거래세', '코스닥 거래세', '증권거래세법', '주식 매도 세금', '비상장주식 거래세'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '증권거래세 계산기 | law-calc.kr',
    description: '증권거래세법에 따라 주권(주식)의 양도·거래 시 부과되는 증권거래세를 계산합니다. 유가증권시장(코스피 0.03%), 코스닥(0.18%), 비상장주식(0.35%) 등 시장별 세율과 농어촌특별세를 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '증권거래세 계산기 | law-calc.kr',
    description: '증권거래세법에 따라 주권(주식)의 양도·거래 시 부과되는 증권거래세를 계산합니다. 유가증권시장(코스피 0.03%), 코스닥(0.18%), 비상장주식(0.35%) 등 시장별 세율과 농어촌특별세를 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
