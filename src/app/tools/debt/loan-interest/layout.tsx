import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/debt/loan-interest';

export const metadata: Metadata = {
  title: '대여금 이자 계산기 - 무료 계산',
  description: '민법 제598조 소비대차 및 이자제한법에 따라 대여원금·약정이율·기간을 입력해 이자액과 원리금 합계를 계산합니다. 최고이자율(연 20%)·복리 제한 규정도 반영합니다.',
  keywords: ['대여금 이자 계산기', '사인간 이자 계산', '이자제한법 최고이자율', '소비대차 이자', '원리금 계산', '대출 이자 계산', '이자제한법 20%'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '대여금 이자 계산기 | law-calc.kr',
    description: '민법 제598조 소비대차 및 이자제한법에 따라 대여원금·약정이율·기간을 입력해 이자액과 원리금 합계를 계산합니다. 최고이자율(연 20%)·복리 제한 규정도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '대여금 이자 계산기 | law-calc.kr',
    description: '민법 제598조 소비대차 및 이자제한법에 따라 대여원금·약정이율·기간을 입력해 이자액과 원리금 합계를 계산합니다. 최고이자율(연 20%)·복리 제한 규정도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
