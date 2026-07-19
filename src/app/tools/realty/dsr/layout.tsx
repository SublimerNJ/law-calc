import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/realty/dsr';

export const metadata: Metadata = {
  title: 'DSR 계산기 - 무료 계산',
  description: '금융위원회 가계대출 규제에 따라 연간 총부채원리금상환액을 연소득으로 나눈 DSR(총부채원리금상환비율)을 계산합니다. 규제지역 주택담보대출 DSR 40% 한도(1금융권 기준)를 기준으로 대출 가능액을 산출합니다.',
  keywords: ['DSR 계산기', '총부채원리금상환비율', 'DSR 40%', '주택담보대출 한도', '대출 가능금액', '금융위원회 DSR 규제', '소득 대비 대출'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: 'DSR 계산기 | law-calc.kr',
    description: '금융위원회 가계대출 규제에 따라 연간 총부채원리금상환액을 연소득으로 나눈 DSR(총부채원리금상환비율)을 계산합니다. 규제지역 주택담보대출 DSR 40% 한도(1금융권 기준)를 기준으로 대출 가능액을 산출합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSR 계산기 | law-calc.kr',
    description: '금융위원회 가계대출 규제에 따라 연간 총부채원리금상환액을 연소득으로 나눈 DSR(총부채원리금상환비율)을 계산합니다. 규제지역 주택담보대출 DSR 40% 한도(1금융권 기준)를 기준으로 대출 가능액을 산출합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
