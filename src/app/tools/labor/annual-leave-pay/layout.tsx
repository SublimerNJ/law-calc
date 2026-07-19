import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/labor/annual-leave-pay';

export const metadata: Metadata = {
  title: '연차수당 계산기 - 무료 계산',
  description: '근로기준법 제60조에 따른 연차유급휴가 발생 일수와 미사용 연차에 대한 수당을 계산합니다. 1년 미만 근로자의 월별 발생 연차, 1년 이상 근로자의 출근율 기반 연차, 통상임금 기준 수당을 산정합니다.',
  keywords: ['연차수당 계산', '미사용 연차', '연차유급휴가 수당', '연차 발생 기준', '근로기준법 60조', '연차 소멸', '연차 청구'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '연차수당 계산기 | law-calc.kr',
    description: '근로기준법 제60조에 따른 연차유급휴가 발생 일수와 미사용 연차에 대한 수당을 계산합니다. 1년 미만 근로자의 월별 발생 연차, 1년 이상 근로자의 출근율 기반 연차, 통상임금 기준 수당을 산정합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '연차수당 계산기 | law-calc.kr',
    description: '근로기준법 제60조에 따른 연차유급휴가 발생 일수와 미사용 연차에 대한 수당을 계산합니다. 1년 미만 근로자의 월별 발생 연차, 1년 이상 근로자의 출근율 기반 연차, 통상임금 기준 수당을 산정합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
