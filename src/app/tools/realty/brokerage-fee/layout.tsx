import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/brokerage-fee';

export const metadata: Metadata = {
  title: '중개보수 계산기 - 무료 계산',
  description: '공인중개사법 제32조 및 시·도 조례에 따라 주택(매매·전세·월세)·상가·토지별 중개보수 요율 한도와 실제 지급액을 계산합니다. 2021년 개정 요율표(주택 매매 0.4~0.7%)를 반영합니다.',
  keywords: ['중개보수 계산', '복비 계산기', '부동산 중개수수료', '공인중개사법 32조', '주택 중개보수율', '아파트 복비', '중개수수료 상한'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '중개보수 계산기 | law-calc.kr',
    description: '공인중개사법 제32조 및 시·도 조례에 따라 주택(매매·전세·월세)·상가·토지별 중개보수 요율 한도와 실제 지급액을 계산합니다. 2021년 개정 요율표(주택 매매 0.4~0.7%)를 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '중개보수 계산기 | law-calc.kr',
    description: '공인중개사법 제32조 및 시·도 조례에 따라 주택(매매·전세·월세)·상가·토지별 중개보수 요율 한도와 실제 지급액을 계산합니다. 2021년 개정 요율표(주택 매매 0.4~0.7%)를 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
