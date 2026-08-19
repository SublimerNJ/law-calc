import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/securities-tax';

export const metadata: Metadata = {
  title: '증권거래세 계산기 - 무료 계산',
  description: '증권거래세법에 따라 주권(주식)의 양도·거래 시 부과되는 증권거래세를 계산합니다. 이 계산기는 2026.1.1. 코드 기준으로 코스피 0.05%+농특세 0.15%, 코스닥 0.20%, 코넥스 0.10%, 비상장 0.35%를 적용합니다.',
  keywords: ['증권거래세 계산', '주식 거래세', '코스피 거래세', '코스닥 거래세', '증권거래세법', '주식 매도 세금', '비상장주식 거래세'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '증권거래세 계산기 | law-calc.kr',
    description: '증권거래세법에 따라 주권(주식)의 양도·거래 시 부과되는 증권거래세를 계산합니다. 이 계산기는 2026.1.1. 코드 기준으로 코스피 0.05%+농특세 0.15%, 코스닥 0.20%, 코넥스 0.10%, 비상장 0.35%를 적용합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '증권거래세 계산기 | law-calc.kr',
    description: '증권거래세법에 따라 주권(주식)의 양도·거래 시 부과되는 증권거래세를 계산합니다. 이 계산기는 2026.1.1. 코드 기준으로 코스피 0.05%+농특세 0.15%, 코스닥 0.20%, 코넥스 0.10%, 비상장 0.35%를 적용합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
