import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/comprehensive-property-tax';

export const metadata: Metadata = {
  title: '종합부동산세·재산세 계산기 - 무료 계산',
  description: '종합부동산세법 및 지방세법에 따라 매년 6월 1일 기준 부동산 보유자에게 부과되는 재산세(지방세)와 종합부동산세(국세)를 계산합니다. 공시가격·공정시장가액비율·세율·재산세 중복분 공제를 모두 반영합니다.',
  keywords: ['종합부동산세 계산', '재산세 계산', '종부세 계산기', '부동산 보유세', '공시가격 종부세', '1세대 1주택 종부세', '종합부동산세법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '종합부동산세·재산세 계산기 | law-calc.kr',
    description: '종합부동산세법 및 지방세법에 따라 매년 6월 1일 기준 부동산 보유자에게 부과되는 재산세(지방세)와 종합부동산세(국세)를 계산합니다. 공시가격·공정시장가액비율·세율·재산세 중복분 공제를 모두 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합부동산세·재산세 계산기 | law-calc.kr',
    description: '종합부동산세법 및 지방세법에 따라 매년 6월 1일 기준 부동산 보유자에게 부과되는 재산세(지방세)와 종합부동산세(국세)를 계산합니다. 공시가격·공정시장가액비율·세율·재산세 중복분 공제를 모두 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
