import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/court/payment-order';

export const metadata: Metadata = {
  title: '지급명령 비용 계산기 - 무료 계산',
  description: '민사소송법 제462조 이하 독촉절차에 따른 지급명령 신청 시 인지대(일반 소송의 1/10)와 송달료를 계산합니다. 채권 회수를 위한 가장 저렴하고 빠른 법적 절차로, 채무자 이의 시 소송으로 전환됩니다.',
  keywords: ['지급명령 신청비용', '독촉절차 비용', '지급명령 인지대', '채권회수 비용', '지급명령 송달료', '민사소송법 462조', '간이 채권회수'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '지급명령 비용 계산기 | law-calc.kr',
    description: '민사소송법 제462조 이하 독촉절차에 따른 지급명령 신청 시 인지대(일반 소송의 1/10)와 송달료를 계산합니다. 채권 회수를 위한 가장 저렴하고 빠른 법적 절차로, 채무자 이의 시 소송으로 전환됩니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '지급명령 비용 계산기 | law-calc.kr',
    description: '민사소송법 제462조 이하 독촉절차에 따른 지급명령 신청 시 인지대(일반 소송의 1/10)와 송달료를 계산합니다. 채권 회수를 위한 가장 저렴하고 빠른 법적 절차로, 채무자 이의 시 소송으로 전환됩니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
