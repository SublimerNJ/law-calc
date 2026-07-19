import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/tax/comprehensive-income-tax';

export const metadata: Metadata = {
  title: '종합소득세 계산기 - 무료 계산',
  description: '소득세법 제4조에 따라 이자·배당·사업·근로·연금·기타소득을 합산하여 종합소득세를 계산합니다. 각종 소득공제·세액공제 적용 후 6~45% 누진세율로 산출하며 5월 확정신고 기준을 반영합니다.',
  keywords: ['종합소득세 계산', '종합소득세 신고', '사업소득세', '프리랜서 세금', '종합소득세 세율', '소득공제 종합소득', '5월 종합소득세 신고'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '종합소득세 계산기 | law-calc.kr',
    description: '소득세법 제4조에 따라 이자·배당·사업·근로·연금·기타소득을 합산하여 종합소득세를 계산합니다. 각종 소득공제·세액공제 적용 후 6~45% 누진세율로 산출하며 5월 확정신고 기준을 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '종합소득세 계산기 | law-calc.kr',
    description: '소득세법 제4조에 따라 이자·배당·사업·근로·연금·기타소득을 합산하여 종합소득세를 계산합니다. 각종 소득공제·세액공제 적용 후 6~45% 누진세율로 산출하며 5월 확정신고 기준을 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
