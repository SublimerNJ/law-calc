import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/rent-tax-credit';

export const metadata: Metadata = {
  title: '월세 세액공제 계산기 - 무료 계산',
  description: '소득세법 제59조의4 제4항에 따라 무주택 세대주 근로자·종합소득자가 납부한 월세에 대해 총급여 5,500만 원 이하 17%, 7,000만 원 이하 15% 세액공제(한도 연 1,000만 원)를 계산합니다.',
  keywords: ['월세 세액공제 계산', '월세 세금 환급', '월세 공제 조건', '무주택 월세 공제', '소득세법 59조', '연말정산 월세', '월세 공제 한도'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '월세 세액공제 계산기 | law-calc.kr',
    description: '소득세법 제59조의4 제4항에 따라 무주택 세대주 근로자·종합소득자가 납부한 월세에 대해 총급여 5,500만 원 이하 17%, 7,000만 원 이하 15% 세액공제(한도 연 1,000만 원)를 계산합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '월세 세액공제 계산기 | law-calc.kr',
    description: '소득세법 제59조의4 제4항에 따라 무주택 세대주 근로자·종합소득자가 납부한 월세에 대해 총급여 5,500만 원 이하 17%, 7,000만 원 이하 15% 세액공제(한도 연 1,000만 원)를 계산합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
