import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/family/inheritance-tax';

export const metadata: Metadata = {
  title: '상속세·증여세 계산기 - 무료 계산',
  description: '상속세 및 증여세법에 따라 상속 재산 공제(기초공제·배우자공제 등) 및 증여 공제를 적용한 후 누진세율(10~50%)로 세액을 계산합니다. 10년 내 사전증여재산 합산 규정도 반영합니다.',
  keywords: ['상속세 계산', '증여세 계산', '상속세율', '증여세 공제', '배우자 상속공제', '사전증여 합산', '상속세법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '상속세·증여세 계산기 | law-calc.kr',
    description: '상속세 및 증여세법에 따라 상속 재산 공제(기초공제·배우자공제 등) 및 증여 공제를 적용한 후 누진세율(10~50%)로 세액을 계산합니다. 10년 내 사전증여재산 합산 규정도 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '상속세·증여세 계산기 | law-calc.kr',
    description: '상속세 및 증여세법에 따라 상속 재산 공제(기초공제·배우자공제 등) 및 증여 공제를 적용한 후 누진세율(10~50%)로 세액을 계산합니다. 10년 내 사전증여재산 합산 규정도 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
