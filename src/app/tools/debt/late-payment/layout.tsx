import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/debt/late-payment';

export const metadata: Metadata = {
  title: '지연손해금 계산기 - 무료 계산',
  description: '민법 제379조(법정이율 연 5%), 상법 제54조(상사이율 연 6%), 소송촉진 등에 관한 특례법 제3조(소송촉진법 이율 연 12%)를 기간별로 구분 적용해 지연손해금을 자동 계산합니다.',
  keywords: ['지연손해금 계산기', '법정이자 계산', '소송촉진법 이자', '연 12% 지연이자', '민사 지연손해금', '채무 이행 지체', '법정이율 연 5%'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '지연손해금 계산기 | law-calc.kr',
    description: '민법 제379조(법정이율 연 5%), 상법 제54조(상사이율 연 6%), 소송촉진 등에 관한 특례법 제3조(소송촉진법 이율 연 12%)를 기간별로 구분 적용해 지연손해금을 자동 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '지연손해금 계산기 | law-calc.kr',
    description: '민법 제379조(법정이율 연 5%), 상법 제54조(상사이율 연 6%), 소송촉진 등에 관한 특례법 제3조(소송촉진법 이율 연 12%)를 기간별로 구분 적용해 지연손해금을 자동 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
