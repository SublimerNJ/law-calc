import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://law-calc.kr';
const PATH = '/tools/traffic/accident-settlement';

export const metadata: Metadata = {
  title: '교통사고 합의금 계산기 - 무료 계산',
  description: '교통사고처리특례법 및 자동차손해배상보장법에 따라 과실비율·치료비·위자료·일실수입·후유장해를 종합해 교통사고 합의금 예상액을 계산합니다. 대법원 손해배상 산정 기준을 반영합니다.',
  keywords: ['교통사고 합의금', '교통사고 위자료', '과실비율 계산', '교통사고 보상금', '자동차보험 합의', '치료비 배상', '교통사고처리특례법'],
  alternates: {
    canonical: `${BASE_URL}${PATH}`,
  },
  openGraph: {
    title: '교통사고 합의금 계산기 | law-calc.kr',
    description: '교통사고처리특례법 및 자동차손해배상보장법에 따라 과실비율·치료비·위자료·일실수입·후유장해를 종합해 교통사고 합의금 예상액을 계산합니다. 대법원 손해배상 산정 기준을 반영합니다.',
    type: 'website',
    url: `${BASE_URL}${PATH}`,
    siteName: 'law-calc.kr',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '교통사고 합의금 계산기 | law-calc.kr',
    description: '교통사고처리특례법 및 자동차손해배상보장법에 따라 과실비율·치료비·위자료·일실수입·후유장해를 종합해 교통사고 합의금 예상액을 계산합니다. 대법원 손해배상 산정 기준을 반영합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ToolPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
