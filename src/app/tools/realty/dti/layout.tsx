import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/dti';

export const metadata: Metadata = {
  title: 'DTI 계산기 - 무료 계산',
  description: '연간 주택담보대출 원리금 상환액에 기타 대출 이자를 합산한 금액을 연소득으로 나눈 DTI(총부채상환비율)를 계산합니다. 규제지역 DTI 40~50% 한도를 기준으로 주택담보대출 가능액을 산출합니다.',
  keywords: ['DTI 계산기', '총부채상환비율', 'DTI 40%', '주택담보대출 소득비율', '대출 소득 기준', 'DTI DSR 차이', '주택대출 한도 계산'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: 'DTI 계산기 | law-calc.kr',
    description: '연간 주택담보대출 원리금 상환액에 기타 대출 이자를 합산한 금액을 연소득으로 나눈 DTI(총부채상환비율)를 계산합니다. 규제지역 DTI 40~50% 한도를 기준으로 주택담보대출 가능액을 산출합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DTI 계산기 | law-calc.kr',
    description: '연간 주택담보대출 원리금 상환액에 기타 대출 이자를 합산한 금액을 연소득으로 나눈 DTI(총부채상환비율)를 계산합니다. 규제지역 DTI 40~50% 한도를 기준으로 주택담보대출 가능액을 산출합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
